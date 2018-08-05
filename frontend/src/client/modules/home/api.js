/* global web3 */

import Web3 from 'web3';
import Contract from 'truffle-contract';
import abiFile from '../../../../../smartContracts/build/contracts/PokemonPlatform.json';

let web3js;
let contract;
// const CONTRACT_ADDRESS = '0xed52fd3f7de742cc7f6283106d66bb5366885d68';

export const init = () => {
  if (__CLIENT__ && !web3js) {
    // web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/7509a94fe1d14f22bb3a34e3fb5c82e0'));
    web3js = new Web3(web3.currentProvider);
    contract = Contract(abiFile);
    contract.setProvider(web3.currentProvider);
    window.contract = contract;
  }
};

init();

export function getMyPokemons() {
  return contract.methods.getMyPokemons().call()
  .then(function(ids) {
    return Promise.all(ids, function(id) {
      return contract.methods.getPokemon(id).call()
      .then(function(raw) {
        return {
          name: raw[0],
          url: raw[1],
          bio: raw[2],
          generation: raw[3],
          releaseTimestamp: raw[4],
        };
      });
    });
  });
}

export function getAllPokemons() {
    var pokemonInstance;

  return new Promise((res, rej) => {
    web3js.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
        return error;
      }

      var account = accounts[0];

      contract.deployed().then(async function(instance) {
        pokemonInstance = instance;
        var result =  await pokemonInstance.getAllPokemons({ from: account });
        const ids = result.map(n => n.toNumber()).map(id =>
          pokemonInstance.getPokemon(id)
          .then(([name, url, bio, id2, id]) => ({
            name,
            url,
            bio,
            id2: id2.toNumber(),
            id: id.toNumber(),
          }))
        );
        const pokes = await Promise.all(ids);
        res(pokes);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  });
  // return contract.methods.getAllPokemons().call()
  // .then(function(ids) {
  //   console.log('ids', ids);
  //   return Promise.all(ids, function(id) {
  //     return contract.methods.getPokemon(id).call()
  //     .then(function(raw) {
  //       return {
  //         name: raw[0],
  //         url: raw[1],
  //         bio: raw[2],
  //         generation: raw[3],
  //         releaseTimestamp: raw[4],
  //       };
  //     });
  //   });
  // });
}

export function getUnclaimedPokemons() {
  return contract.methods.getUnclaimedPokemons().call()
    .then(function(ids) {
      return Promise.all(ids, function(id) {
        return contract.methods.getPokemon(id).call()
          .then(function(raw) {
            return {
              name: raw[0],
              url: raw[1],
              bio: raw[2],
              generation: raw[3],
              releaseTimestamp: raw[4],
            };
          });
      });
    });
}

export function getProfile() {
  return contract.methods.getProfile().call()
    .then(function([name, userAddress, photoUrl, numPokemon]) {
      console.log(name);
      return {
        name,
        userAddress,
        photoUrl,
        numPokemon,
      };
    });
}

export function populatePokemon(name, url, bio, generation) {
  contract.methods.populatePokemon(name, url, bio, generation)
    .send( { from : "0x05ba9a1d453ed591f70e5884a5eded482400bb62" } )
    .on("receipt", function(receipt) {
      console.log("receipt: " + receipt);
    })
    .on("error", function(error) {
      console.log(error);
    });
}

export function releasePokemon() {
  contract.methods.releasePokemon().send( { from : "0x05ba9a1d453ed591f70e5884a5eded482400bb62" } )
    .on("receipt", function(receipt) {
      console.log("receipt: " + receipt);
    })
    .on("error", function(error) {
      console.log(error);
    });
}
