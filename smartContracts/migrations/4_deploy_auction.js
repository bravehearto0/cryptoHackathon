/* global artifacts */

const Token = artifacts.require('Token.sol')
const Auction = artifacts.require('Auction.sol')


const deployAuction = (deployer) => {
    const tokenAddress = Token.address

    deployer.deploy(
        Auction,
        tokenAddress
    )
}
module.exports = deployAuction
