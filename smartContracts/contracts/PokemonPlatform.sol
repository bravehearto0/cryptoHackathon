pragma solidity ^0.4.22;

import './zeppelin/Ownable.sol';

contract PokemonPlatform is Ownable {
    // Parameters of the Pokemon
    struct Pokemon { // Struct
        string name;
        string url;
        string bio;
        uint32 generation;
        uint32 releaseTimestamp;
    }

    mapping (uint => Pokemon) public mPokemon;

    uint currentGeneration;
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
    }

    Pokemon [] allPokemons;
    // the ownership of the pokemonId  => owner address
    mapping(uint => address) public ownerToPokemon;

    // given address return the user profile info
    mapping(address => UserProfile) ownerToProfile;
    // store the location of pokemon, byte32 is the hash versioned of the geohash
    mapping(bytes32 => uint) public lottery;

    // the last access user have. used to GPS check and rate limit
    mapping(address => Access) public lastAccess;

    // the generation number and total count
    //event NewPokemonGenerationReleased(uint generation, uint totalCount);

    uint rateLimitInterval;
    uint currentGeneration;
    // gps Int and float are used to prevent gps spoofing.
    uint gpsThresholdInt;
    uint gpsThresholdFloat;
    constructor(uint startGeneration, uint timeInterval, uint gpsInt, uint gpsFloat) public {
      currentGeneration = startGeneration;
      rateLimitInterval = timeInterval;
      gpsThresholdInt = gpsInt;
      gpsThresholdFloat = gpsFloat;
    }

    // TODO: apply ratelimit and GPS spoofing checks
    //function findPokemon(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) external returns(bool) {

    //}

    // get the pokemon belong to current owner - retuns integer array of Pokemon Ids
    function getMyPokemons() external view returns (uint[]){
      // loop through to look for Pokemon belonging to this msg.sender
      uint[] arrayId;
      for (uint i=0; i < allPokemons.length; i++) {
          if(ownerToPokemon[i] == msg.sender){
              arrayId.push(i);
          }
      }
      // copy to fixed-size array
      uint[] memory v = new uint[](arrayId.length);
      for (i=0; i < arrayId.length; i++) {
          v[i] = arrayId[i];
      }
      return v;
    }

    // get all available pokemon that has releaseTimestamp
    function getAllPokemons() external view returns (uint[]) {
      // find all released Pokemon
      uint[] arrayId;
      for (uint i=0; i < allPokemons.length; i++) {
          // release time is earlier than current timestamp -> released Pokemon
          if(allPokemons[i].releaseTimestamp != 0 ){
              arrayId.push(i);
          }
      }

      // copy to fixed-size array
      uint[] memory v = new uint[](arrayId.length);
      for (i=0; i < arrayId.length; i++) {
          v[i] = arrayId[i];
      }
      return v;
    }

    // get the unclaimed pokemon mapping
    function getUnclaimedPokemons() external view returns(uint[]) {
      // front end parse the generation and total count
      // find all released Pokemon
      uint[] arrayId;
      for (uint i=0; i < allPokemons.length; i++) {
          // release time is earlier than current timestamp -> released Pokemon
          if(allPokemons[i].releaseTimestamp == 0){
              arrayId.push(i);
          }
      }

      // copy to fixed-size array
      uint[] memory v = new uint[](arrayId.length);
      for (i=0; i < arrayId.length; i++) {
          v[i] = arrayId[i];
      }
      return v;
    }

    // used to add new pokemons into allPokemons
    function populatePokemons(uint[] pokemons) public onlyOwner() {

    }

    // owner release new pokemon generation
    function releasePokemon() public onlyOwner {

    }

    // create user profile
    function createProfile(string _name, string _photoUrl) external returns (bool){

    }

    // return the user getProfile
    function getProfile() external view returns (userProfile) {


    }



}
