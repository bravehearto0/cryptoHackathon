/* global artifacts, assert, contract, describe, it */
/* eslint-disable no-console, max-len */

const Pokemon = artifacts.require('PokemonPlatform.sol')


contract('PokemonPlatform', (accounts) => {
    describe('Test User stories', () => {
        it('Should claim Pokemon', async () => {
            const pokemon = await Pokemon.deployed()

            // listen to the event fired from initiateAccessRequest so that to get access Request Id
            const addPokemon = pokemon.PokemonPopulated()
            let pokemonId = 0x0
            addPokemon.watch((error, result) => {
                if (!error) {
                    pokemonId = result.args._id
                }
            })

            await pokemon.populatePokemon("genesis", "url", "first pokemon", 0, { from: accounts[0] })
            console.log("owner add first pokemon with id:= ", pokemonId.toNumber())

            await pokemon.createProfile("hackathon", "http://www.aws.com/xsTwtA", { from: accounts[1] })
            console.log("user create profile")

            await pokemon.releasePokemon({ from: accounts[0] })
            console.log("owner release the generation = 0 pokemon");

            const releasedPokemon = await pokemon.getAllPokemons({ from: accounts[1] })
            console.log("Id array of released Pokemon: ", releasedPokemon[0].toNumber())

            const info = await pokemon.getPokemon(releasedPokemon[0].toNumber(), { from: accounts[1] })
            console.log("user checks the info of pokemon: ", info)

            // stop listening to event
            addPokemon.stopWatching()
        })
    })
})
