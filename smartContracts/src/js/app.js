App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/Kuo1lxDBsFtMnaw6GiN');
      //App.web3Provider = new Web3.providers.HttpProvider('https://localhost:8454');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('PokemonPlatform.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var PokemonArtifact = data;
      App.contracts.Pokemon = TruffleContract(PokemonArtifact);
      // Set the provider for our contract.
      App.contracts.Pokemon.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#populateButton', App.populateButton);
    $(document).on('click', '#releasePokemonsButton', App.releasePokemonsButton);
    $(document).on('click', '#getAllPokemonsButton', App.getAllPokemonsButton);

  },

  releasePokemonsButton: function(event) {
    event.preventDefault();
    var pokemonInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Pokemon.deployed().then(function(instance) {
        pokemonInstance = instance;
        return pokemonInstance.releasePokemon({ from: accounts[0] });

      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getAllPokemonsButton: function(event) {
    event.preventDefault();
    var pokemonInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Pokemon.deployed().then(async function(instance) {
        pokemonInstance = instance;
        await pokemonInstance.createProfile("hackathon", "http://www.aws.com/xsTwtA", { from: accounts[0] });
        var result =  await pokemonInstance.getAllPokemons({ from: accounts[0] });
        console.log(result);
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  populateButton: function(event) {
    event.preventDefault();
    var pokemonInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];


      App.contracts.Pokemon.deployed().then(function(instance) {
        pokemonInstance = instance;
        return pokemonInstance.populatePokemon("364426", "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/364426.png", "Ciao! I'm Kitty #364426. .", 1, { from: accounts[0] })
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
