const Migrations = artifacts.require('Migrations');

module.exports = (deployer, network, accounts) => {
  deployer.deploy(Migrations);
};
