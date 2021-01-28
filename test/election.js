var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
  var electionInstance;

  it("initializes with three options", function() {
    return Election.deployed().then(function(instance) {
      return instance.optionCount();
    }).then(function(count) {
      assert.equal(count, 3);
    });
  });

  it("it initializes the options with the correct values", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.options(1);
    }).then(function(option) {
      assert.equal(option[0], 1, "contains the correct id");
      assert.equal(option[1], "Agree", "contains the correct name");
      assert.equal(option[2], 0, "contains the correct votes count");
      return electionInstance.options(2);
    }).then(function(option) {
      assert.equal(option[0], 2, "contains the correct id");
      assert.equal(option[1], "Disagree", "contains the correct name");
      assert.equal(option[2], 0, "contains the correct votes count");
    });
  });

});
