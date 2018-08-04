pragma solidity ^0.4.22;

import './zeppelin/Ownable.sol';
import './gps.sol';

contract PokemonPlatform is Ownable, gps{
    // Parameters of the Pokemon
    struct Pokemon { // Struct
        string name;
        string url;
        string bio;
        uint32 generation;
        uint32 releaseTimestamp;
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

    // modifier
    


    // the generation number and total count
    //event NewPokemonGenerationReleased(uint generation, uint totalCount);
    event GetMyPokemons(uint _numPokemon);
    event AllReleasedPokemons(uint _numReleasedPokemon);
    event UnclaimedPokemons(uint _numUnclaimed);
    event PokemonReleased(uint _currentGeneration);
    event PokemonPopulated(uint _id, string _name, string _url, string _bio, uint32 _generation, uint32 _releaseTimestamp);
    event UserProfileCreated(string _name, address indexed _address, string _photoUrl);
    event UserProfileRetrieved(string _name, address indexed _address, string _photoUrl, uint _num);


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
      Access lastAccess = lastAccess[msg.sender];
      if (lastAccess.isValue) {
        require(
          lastAccess.timestamp + rateLimitInterval < now,
          "user rate limited. rateLimitInterval is " + string(rateLimitInterval)
          );
      }
      _;
    }

    // TODO: apply ratelimit and GPS spoofing checks
    function findPokemon(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeInt) external returns(bool)
      rateLimitCheck,
      gpsCheck(latitudeInt, latitudeFloat, longitudeInt, longitudeInt)
      {



      numClaimedPokemon += 1;
      lastAccess[msg.sender] = block.timestamp;

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
      emit GetMyPokemons(ownerToProfile[msg.sender].numPokemon);
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
      emit AllReleasedPokemons(numReleasedPokemon);
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
      emit UnclaimedPokemons(numUnclaimed);
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
        ownerToProfile[msg.sender] = UserProfile(_name, msg.sender, _photoUrl, 0);
        emit UserProfileCreated(_name, msg.sender, _photoUrl);
        return true;
    }

    // return the user getProfile
    function getProfile() external view returns (string, address, string, uint) {
        UserProfile memory user = ownerToProfile[msg.sender];
        emit UserProfileRetrieved(user.name, user.userAddress, user.photoUrl, user.numPokemon);
        return (user.name, user.userAddress, user.photoUrl, user.numPokemon);
    }



}
