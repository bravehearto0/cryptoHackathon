// eslint-global web3

import Web3 from 'web3'
import abiFile from './PokemonPlatform.json';

let web3js;
let contract;
const CONTRACT_ADDRESS = '0xe3bf2f428ede719dc1b6f2320f4558cba726cb66';

export const init = () => {
  web3js = new Web3(web3.currentProvider);
  contract = new web3js.eth.Contract(abiFile.abi, CONTRACT_ADDRESS);
};

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
          releaseTimestamp: raw[4]
        };
      });
    });
  });
}

export function getAllPokemons() {
  return contract.methods.getAllPokemons().call()
  .then(function(ids) {
    return Promise.all(ids, function(id) {
      return contract.methods.getPokemon(id).call()
      .then(function(raw) {
        return {
          name: raw[0],
          url: raw[1],
          bio: raw[2],
          generation: raw[3],
          releaseTimestamp: raw[4]
        };
      });
    });
  });
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
          releaseTimestamp: raw[4]
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

init();