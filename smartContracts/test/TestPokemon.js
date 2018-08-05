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

            // access.latitudeInt, access.longitudeInt, access.latitudeFloat, access.longitudeFloat
            const location = await pokemon.getPokemonLocation(releasedPokemon[0].toNumber(), { from: accounts[0] })
            console.log("owner check pokemon location: ", location)

            const claimPokemon = pokemon.ClaimPokemon()
            let pokemonName = new String()
            addPokemon.watch((error, result) => {
                if (!error) {
                    pokemonName = result.args._name
                }
            })

            const notClaimPokemon = pokemon.NoAvailablePokemon()
            let user = '0x0'
            notClaimPokemon.watch((error, result) => {
                if (!error) {
                    user = result.args._user
                }
            })

            // uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat
            await pokemon.findPokemon(location[0].toNumber(), location[2].toNumber(), location[1].toNumber(), location[3].toNumber(), { from: accounts[1] })
            console.log("user address:", user)
            console.log("user claim pokemon with name: ", pokemonName)

            // stop listening to event
            notClaimPokemon.stopWatching()
            claimPokemon.stopWatching()
            addPokemon.stopWatching()
        })
    })
})
