const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  networks: {

    // deploy to ganache
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: '*',
      gas: 6000000
    },

    // deploy to rinkeby
    rinkeby: {
        provider: () => new HDWalletProvider(process.env.METAMASK_SEED, `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`),
        network_id: 4,
        gas: 6000000,
        gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
        version: "0.5.0"
    }
  }
}
