export function getMyPokemons(contract) {
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
