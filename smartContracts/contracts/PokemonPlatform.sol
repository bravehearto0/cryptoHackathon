pragma solidity ^0.4.22;


contract PokemonPlatform {
    // Parameters of the Pokemon
    struct Pokemon { // Struct
        string name;
        string url;
        string bio;
        uint32 generation;
        uint32 releaseTimestamp;
    }

    uint currentGeneration;
    // latitudeInt is the integer part of the latitude, latitudeFloat is the float part
    struct Access {
      uint timestamp;
      uint latitudeInt;
      uint longitudeInt;
      uint latitudeFloat;
      uint longitudeFloat;
    }

    Pokemon [] allPokemons;
    // the ownership of the pokemonId  => owner address
    mapping(uint => address) ownerToPokemon;

    // store the location of pokemon, byte32 is the hash versioned of the geohash
    mapping(byte32 => uint) lottery;

    // the last access user have. used to GPS check and rate limit
    mapping(address => Access) lastAccess;

    // the generation number and total count
    event NewPokemonGenerationReleased(uint generation, uint totalCount);

    // TODO: apply ratelimit and GPS spoofing checks
    function findPokemon(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) external returns(bool) {

    }

    // get the pokemon belong to current owner
    function getPokemon() external view returns (Pokemon[]){

    }

    // get all available pokemon that has releaseTimestamp
    function getAllPokemon() external view returns (Pokemon[]) {

    }

    // get the unclaimed pokemon mapping
    function getUnclaimedPokemon() external view returns(Pokemon[]) {
      // front end parse the generation and total count
    }

    // used to populate the list of pokemon
    function populatePokemon(string [] pokemons) public {

    }

    // owner release new pokemon generation
    function releasePokemon() public {

    }



}
