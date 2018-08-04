pragma solidity ^0.4.22;
import "./ownable.sol";

contract PokemonPlatform is Ownable{
    // Parameters of the Pokemon
    struct Pokemon { // Struct
        string name;
        string url;
        string bio;
        uint32 generation;
        uint32 releaseTimestamp;
    }

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
    mapping(uint => address) ownerToPokemon;

    // given address return the user profile info
    mapping(address => UserProfile) ownerToProfile;
    // store the location of pokemon, byte32 is the hash versioned of the geohash
    mapping(byte32 => uint) lottery;

    // the last access user have. used to GPS check and rate limit
    mapping(address => Access) lastAccess;

    // the generation number and total count
    event NewPokemonGenerationReleased(uint generation, uint totalCount);

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
    function findPokemon(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) external returns(bool) {

    }

    // get the pokemon belong to current owner
    function getMyPokemons() external view returns (Pokemon[]){

    }

    // get all available pokemon that has releaseTimestamp
    function getAllPokemons() external view returns (Pokemon[]) {

    }

    // get the unclaimed pokemon mapping
    function getUnclaimedPokemons() external view returns(Pokemon[]) {
      // front end parse the generation and total count
    }

    // used to populate the list of pokemon
    function populatePokemons(string [] pokemons) public onlyOwner {

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
