ethereum.enable();
App = {
  web3Provider: null,
  contracts: {}, // Enables Multiple Contracts to be Done at Once 
  account: '0x0',
  hasVoted: false,




  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
   // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to Ganache.
      App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        //console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {

        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Election.deployed().then(function(instance) {
    electionInstance = instance;
    return electionInstance.electionName();}).then(function(electionName) {
      var displayAgenda = $("#displayAgenda");
      displayAgenda.empty();
      displayAgenda.append(electionName);
    })


    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.optionCount();
    }).then(function(optionCount) {


      
      // electionInstance.electionName().then("fulfilled") {function(i) {this};
    //   var promise = electionInstance.electionName();
    //  console.log(electionInstance.electionName());
      



      var displayResults = $("#displayResults");
      displayResults.empty();
      

      var displayOptions = $('#displayOptions');
      displayOptions.empty();

      //console.log(optionCount);

      for (var i = 1; i <= optionCount; i++) {
        electionInstance.options(i).then(function(option) {
          var id = option[0];
          var description = option[1];
          var voteCount = option[2];

          // Render option Result
          var optionResult = "<tr><td>" + description + "</td><td>" + voteCount + "</td></tr>";
          displayResults.append(optionResult);

          // Render candidate ballot option
          var optionSelect = "<option value='" + id + "' >" + description + "</ option>";
          //alert(optionSelect);
          displayOptions.append(optionSelect);
          // console.log(optionSelect);
  

        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Prevents user from voting again (client end), we have also done so in the SC as well! 
      //console.log(hasVoted);
      $('form').show();
      if(hasVoted[1]) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },


  castVote: function() {
    var optionId = $('#displayOptions').val();
    App.contracts.Election.deployed().then(function(instance) {
      // console.log(typeof(optionId));
      return instance.vote(optionId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
