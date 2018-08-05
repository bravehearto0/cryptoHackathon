/* global artifacts */

const Token = artifacts.require('Token.sol')
const Auction = artifacts.require('Auction.sol')
const Pokemon = artifacts.require('PokemonPlatform.sol')


const deployAuction = (deployer) => {
    const tokenAddress = Token.address
    const PokemonAddress = Pokemon.address

    deployer.deploy(
        Auction,
        tokenAddress,
        PokemonAddress
    )
}
module.exports = deployAuction
