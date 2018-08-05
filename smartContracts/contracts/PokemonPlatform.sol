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
    // global index of Pokemon
    uint PokemonId = 0;
    // mapping from id to Pokemon struct
    mapping (uint => Pokemon) public mPokemon;
    // array of Pokemon
    Pokemon [] allPokemons;
    // number of total claimed Pokemon
    uint numClaimedPokemon;
    // number of released Pokemon
    uint numReleasedPokemon;

    // latitudeInt is the integer part of the latitude, latitudeFloat is the float part
    struct Access {
      uint timestamp;
      uint latitudeInt;
      uint longitudeInt;
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
    mapping(uint => address) public ownerToPokemon;

    // store the location of pokemon, byte32 is the hash versioned of the geohash
    mapping(bytes32 => uint) public lottery;

    // the last access user have. used to GPS check and rate limit
    mapping(address => Access) public lastAccess;

    // the generation number and total count
    //event NewPokemonGenerationReleased(uint generation, uint totalCount);
    event ClaimPokemon(uint _PokemonId , address indexed _owner, uint _latitudeInt, uint _latitudeFloat, uint _longitudeInt, uint _longitudeFloat);
    event NoAvailablePokemon(address indexed _user, uint _latitudeInt, uint _latitudeFloat, uint _longitudeInt, uint _longitudeFloat);
    event PokemonReleased(uint _currentGeneration);
    event PokemonPopulated(uint _id, string _name, string _url, string _bio, uint32 _generation, uint32 _releaseTimestamp);
    event UserProfileCreated(string _name, address indexed _address, string _photoUrl);


    uint rateLimitInterval;
    uint currentGeneration = 0;
    // gps Int and float are used to prevent gps spoofing.
    uint gpsThresholdInt;
    uint gpsThresholdFloat;

    constructor(uint timeInterval, uint gpsInt, uint gpsFloat) public {
      rateLimitInterval = timeInterval;
      gpsThresholdInt = gpsInt;
      gpsThresholdFloat = gpsFloat;
    }

    modifier rateLimitCheck() {
      if (lastAccess[msg.sender].timestamp != 0) {
        require(lastAccess[msg.sender].timestamp + rateLimitInterval < now);
      }
      _;
    }


    // TODO: apply ratelimit and GPS spoofing checks - user claim ownership of Pokemon
    function findPokemon(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) external
      rateLimitCheck()
      gpsCheck(latitudeInt, latitudeFloat, longitudeInt, longitudeInt)
      returns(bool) {
        for (uint i=0; i < allPokemons.length; i++) {
            // release time is earlier than current timestamp -> released Pokemon
            if(allPokemons[i].generation == currentGeneration && ownerToPokemon[i] == address(0)){
                ownerToPokemon[i] = msg.sender;
                ownerToProfile[msg.sender].numPokemon += 1;
                numClaimedPokemon += 1;
                lastAccess[msg.sender].timestamp = block.timestamp;
                lastAccess[msg.sender].latitudeInt = latitudeInt;
                lastAccess[msg.sender].longitudeInt = longitudeInt;
                lastAccess[msg.sender].latitudeFloat = latitudeFloat;
                lastAccess[msg.sender].longitudeFloat = longitudeFloat;
                emit ClaimPokemon(i, msg.sender, latitudeInt, latitudeFloat, longitudeInt, longitudeFloat);
                return true;
            }
        }

        emit NoAvailablePokemon(msg.sender, latitudeInt, latitudeFloat, longitudeInt, longitudeFloat);
        return false;
    }

    // get the pokemon belong to current owner - retuns integer array of Pokemon Ids
    function getMyPokemons() external view returns (uint[]){
      // loop through to look for Pokemon belonging to this msg.sender
      uint[] memory v = new uint[](ownerToProfile[msg.sender].numPokemon);
      uint k = 0;
      for (uint i=0; i < allPokemons.length; i++) {
          if(ownerToPokemon[i] == msg.sender){
              v[k] = i;
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
              v[k] = i;
              k += 1;
          }
      }
      return v;
    }

    // get the unclaimed pokemon mapping
    function getUnclaimedPokemons() external view returns(uint[]) {
      // front end parse the generation and total count
      // find all released Pokemon
      uint numUnclaimed = allPokemons.length - numClaimedPokemon;
      uint[] memory v = new uint[](numUnclaimed);
      uint k = 0;
      for (uint i=0; i < allPokemons.length; i++) {
          // release time is earlier than current timestamp -> released Pokemon
          if(allPokemons[i].releaseTimestamp == 0){
              v[k] = i;
              k += 1;
          }
      }
      return v;
    }

    // used to add new pokemons into allPokemons
    function populatePokemons(string name, string url, string bio, uint32 generation, uint32 releaseTimestamp) public onlyOwner() {
      // increment Id
      PokemonId += 1;
      mPokemon[PokemonId] = Pokemon(name, url, bio, generation, releaseTimestamp);
      allPokemons.push(mPokemon[PokemonId]);
      emit PokemonPopulated(PokemonId, name, url, bio, generation, releaseTimestamp);
    }

    // owner release new pokemon generation
    function releasePokemon() public onlyOwner {
        // release Pokemons with currentGeneration
        for (uint i=0; i < allPokemons.length; i++) {
            // release time is earlier than current timestamp -> released Pokemon
            if(allPokemons[i].generation == currentGeneration){
                allPokemons[i].releaseTimestamp = block.timestamp;
                numReleasedPokemon += 1;
            }
        }
        // increment generation counter
        currentGeneration += 1;
        emit PokemonReleased(currentGeneration - 1);
    }

    // create user profile
    function createProfile(string _name, string _photoUrl) external returns (bool){
        // create user profile
        ownerToProfile[msg.sender] = UserProfile(_name, msg.sender, _photoUrl, 0);
        // create access
        lastAccess[msg.sender] = Access(0, 0, 0, 0, 0);
        emit UserProfileCreated(_name, msg.sender, _photoUrl);
        return true;
    }

    // return the user getProfile
    function getProfile() external view returns (string, address, string, uint) {
        UserProfile memory user = ownerToProfile[msg.sender];
        return (user.name, user.userAddress, user.photoUrl, user.numPokemon);
    }

}
