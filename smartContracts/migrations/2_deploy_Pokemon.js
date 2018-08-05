/* global artifacts */

const Pokemon = artifacts.require('PokemonPlatform.sol')

const pokemon = (deployer) => {
    deployer.deploy(Pokemon)
}

module.exports = pokemon
