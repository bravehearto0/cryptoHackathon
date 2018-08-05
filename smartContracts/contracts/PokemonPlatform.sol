pragma solidity ^0.4.22;

import './zeppelin/Ownable.sol';
import './gps.sol';

contract PokemonPlatform is Ownable, gps{
    // Parameters of the Pokemon
    struct Pokemon { // Struct
        string name;
        string url;
        string bio;
        uint generation;
        uint releaseTimestamp;
    }
    // array of Pokemon
    Pokemon [] allPokemons;
    // number of total claimed Pokemon
    uint numClaimedPokemon;
    // number of released Pokemon
    uint numReleasedPokemon;

    // latitudeInt is the integer part of the latitude, latitudeFloat is the float part
    struct Access {
      uint timestamp;
      int latitudeInt;
      int longitudeInt;
      uint latitudeFloat;
      uint longitudeFloat;
    }

    struct UserProfile {
      string name;
      address userAddress;
      string photoUrl;
      uint   numPokemon;
    }
    // given address return the user profile info
    mapping(address => UserProfile) ownerToProfile;

    // the ownership of the pokemonId  => owner address
    mapping(uint => address) public pokemonToOwner;

    // store the location of pokemon, byte32 is the hash versioned of the geohash
    mapping(bytes32 => uint) public lottery;

    // the last access user have. used to GPS check and rate limit
    mapping(address => Access) public lastAccess;

    // hacking geoLocations data for dashboard and display
    mapping(uint => Access) public pokemonToLocation;

    // the generation number and total count
    //event NewPokemonGenerationReleased(uint generation, uint totalCount);
    event ClaimPokemon(uint _PokemonId , address indexed _owner, string _name, string _url, string _bio, uint _generation, uint _releaseTimestamp);
    event NoAvailablePokemon(address indexed _user);
    event GpsCheckFailed(uint _num);
    event PokemonReleased(uint _currentGeneration, uint _amount);
    event PokemonPopulated(uint _id, string _name, string _url, string _bio, uint32 _generation, uint32 _releaseTimestamp);
    event UserProfileCreated(string _name, address indexed _address, string _photoUrl);

    uint rateLimitInterval;
    uint nextGeneration = 0;
    // gps Int and float are used to prevent gps spoofing.
    uint gpsThresholdInt;
    uint gpsThresholdFloat;

    constructor() public {
      rateLimitInterval = 1 hours;
      gpsThresholdInt = 1;
      gpsThresholdFloat = 0;
    }

    modifier rateLimitCheck() {
      if (lastAccess[msg.sender].timestamp != 0) {
        require(lastAccess[msg.sender].timestamp + rateLimitInterval < now);
      }
      _;
    }

    function gpsCheck(int latitudeInt, uint latitudeFloat, int longitudeInt, uint longitudeFloat) private view returns(bool) {
      if (latitudeInt >= 180 || latitudeInt <= -180 || longitudeInt >= 180 || longitudeInt <= -180) {
        return false;
      }
      Access memory la = lastAccess[msg.sender];
      if (la.timestamp != 0) {
        uint intDiff;
        uint floatDiff;
        (intDiff, floatDiff) = gpsDifference(la.latitudeInt, la.latitudeFloat, la.longitudeInt, la.longitudeFloat, latitudeInt, latitudeFloat, longitudeInt, longitudeFloat);
        return (intDiff < gpsThresholdInt) || (intDiff == gpsThresholdInt && floatDiff <= gpsThresholdFloat);
      }
      return true;
    }

    modifier hasProfile() {
        require(ownerToProfile[msg.sender].userAddress != address(0), "user has no profile; please call createProfile function");
        _;
    }


    // TODO: apply ratelimit and GPS spoofing checks - user claim ownership of Pokemon
    function findPokemon(int latitudeInt, uint latitudeFloat, int longitudeInt, uint longitudeFloat) external
      returns(bool) {
        //if (!gpsCheck(latitudeInt, latitudeFloat, longitudeInt, longitudeFloat)) {
        //  emit GpsCheckFailed(1);
        //  return false;
        //}
        // log access
        lastAccess[msg.sender].timestamp = block.timestamp;
        lastAccess[msg.sender].latitudeInt = latitudeInt;
        lastAccess[msg.sender].longitudeInt = longitudeInt;
        lastAccess[msg.sender].latitudeFloat = latitudeFloat;
        lastAccess[msg.sender].longitudeFloat = longitudeFloat;

        for (uint generation = 0; generation < nextGeneration; generation++) {
          bytes32 geoHash = generateGeoHash(latitudeInt, latitudeFloat, longitudeInt, longitudeFloat, generation);
          if(lottery[geoHash] != 0) {
            uint pId = lottery[geoHash];
            if (pokemonToOwner[pId] != address(0)) {
                // pokemon has been claimed
                continue;
            }
            pokemonToOwner[pId] = msg.sender;
            ownerToProfile[msg.sender].numPokemon += 1;
            numClaimedPokemon += 1;

            // read Pokemons
            Pokemon storage newPokemon = allPokemons[pId - 1];
            emit ClaimPokemon(pId, msg.sender, newPokemon.name, newPokemon.url,
              newPokemon.bio, newPokemon.generation, newPokemon.releaseTimestamp);
            return true;
          }
        }

        emit NoAvailablePokemon(msg.sender);
        return false;
    }

    function getPokemon(uint _index) external view returns (string, string, string, uint, uint) {
      Pokemon memory p = allPokemons[_index - 1];
      return (p.name, p.url, p.bio, p.generation, p.releaseTimestamp);
    }
    // return name, url, bio, generation, releaseTimestamp, ownerName
    function getPokemonOwnerView(uint _index) external view
        returns (string, string, string, uint, uint, string) {
      Pokemon memory p = allPokemons[_index - 1];
      address ownerAddress = pokemonToOwner[_index];
      string memory name = "";
      if (ownerAddress != address(0)) {
        name = ownerToProfile[ownerAddress].name;
      }
      return (p.name, p.url, p.bio, p.generation, p.releaseTimestamp, name);
    }

    // get the pokemon belong to current owner - retuns integer array of Pokemon Ids
    function getMyPokemons() external view returns (uint[]){
      // loop through to look for Pokemon belonging to this msg.sender
      uint[] memory v = new uint[](ownerToProfile[msg.sender].numPokemon);
      uint k = 0;
      for (uint i=0; i < allPokemons.length; i++) {
          if(pokemonToOwner[i + 1] == msg.sender){
            // pokemon id is index + 1
              v[k] = i + 1;
              k += 1;
          }
      }
      return v;
    }

    // get all available pokemon that has been released
    function getAllPokemons() external view returns (uint[]) {
      // find all released Pokemon
      uint[] memory v = new uint[](numReleasedPokemon);
      uint k = 0;
      for (uint i=0; i < allPokemons.length; i++) {
          // release time is earlier than current timestamp -> released Pokemon
          if(allPokemons[i].releaseTimestamp != 0 ){
              v[k] = i + 1;
              k += 1;
          }
      }
      return v;
    }

    // get the unclaimed pokemon mapping
    function getUnclaimedPokemons() external view  returns(uint[]) {
      // front end parse the generation and total count
      // find all released Pokemon
      uint numUnclaimed = numReleasedPokemon - numClaimedPokemon;
      uint[] memory v = new uint[](numUnclaimed);
      uint k = 0;
      for (uint i=0; i < allPokemons.length; i++) {
          // release time is earlier than current timestamp -> released Pokemon
          if(allPokemons[i].releaseTimestamp > 0 && pokemonToOwner[i + 1] == address(0)){
              v[k] = i + 1;
              k += 1;
          }
      }
      return v;
    }

    // used to add new pokemons into allPokemons
    function populatePokemon(string name, string url, string bio, uint32 generation) public  {
      // increment Id
      uint PokemonId = allPokemons.push(Pokemon(name, url, bio, generation, 0));
      emit PokemonPopulated(PokemonId, name, url, bio, generation, 0);
    }

    // owner release new pokemon generation
    function releasePokemon() public  {
        // release Pokemons with nextGeneration
        uint amount = 0;
        for (uint i=0; i < allPokemons.length; i++) {
            // release time is earlier than current timestamp -> released Pokemon
            if(allPokemons[i].generation <= nextGeneration && allPokemons[i].releaseTimestamp == 0){
                allPokemons[i].releaseTimestamp = block.timestamp;
                numReleasedPokemon += 1;
                amount += 1;
                // add geoHash to pokemonToLocation
                int laInt;
                uint laFloat;
                int loInt;
                uint loFloat;
                (laInt, laFloat, loInt, loFloat) = generateRandomLocation();
                Access memory newAccess = Access(block.timestamp, laInt, loInt, laFloat, loFloat);
                pokemonToLocation[i + 1] = newAccess;
                // add geoHash to lottery
                bytes32 hashcode = generateGeoHash(laInt, laFloat, loInt, loFloat, nextGeneration);
                lottery[hashcode] = i + 1;
            }
        }
        // increment generation counter
        nextGeneration += 1;
        emit PokemonReleased(nextGeneration - 1, amount);
    }

    // create user profile
    function createProfile(string _name, string _photoUrl) external returns (bool){
        // create user profile
        if (ownerToProfile[msg.sender].userAddress != address(0)){
            return false;
        }
        ownerToProfile[msg.sender] = UserProfile(_name, msg.sender, _photoUrl, 0);
        // create access
        lastAccess[msg.sender] = Access(0, 0, 0, 0, 0);
        emit UserProfileCreated(_name, msg.sender, _photoUrl);
        return true;
    }

    function getReleaseNumber() external view returns (uint) {
       return nextGeneration -1;
    }


    // return the user getProfile
    function getProfile() external view hasProfile() returns (string, address, string, uint) {
        UserProfile memory user = ownerToProfile[msg.sender];
        return (user.name, user.userAddress, user.photoUrl, user.numPokemon);
    }

    // get all pokemon locations , this is for system testing and demo only
    function getPokemonLocation(uint pokemonId) public view onlyOwner returns(int, uint, int, uint) {
        Access memory access = pokemonToLocation[pokemonId];
        return (access.latitudeInt, access.latitudeFloat, access.longitudeInt, access.longitudeFloat);
    }

    // transfer ownership
    function changeOwner(address newOwner, uint _index) public {
        pokemonToOwner[_index] = newOwner;
    }

}
