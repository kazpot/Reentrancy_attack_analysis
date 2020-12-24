const Charity = artifacts.require('Charity.sol');
const Wallet1 = artifacts.require('Wallet.sol');
const Wallet2 = artifacts.require('Wallet.sol');

module.exports = (deployer) => {
    deployer.deploy(Charity).then(async () => {
        await deployer.deploy(Wallet1, Charity.address, {value: '150000000000'});
        await deployer.deploy(Wallet2, Charity.address, {value: '150000000000'});
    });
};