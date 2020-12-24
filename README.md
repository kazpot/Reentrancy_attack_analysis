# Re-entrancy attack example

This is an example of re-entrancy attack on single function.

## Version

- Truffle v5.0.8 (core: 5.0.8)
- Solidity - 0.5.0 (solc-js)
- Node v12.2.0
- Ganache CLI v6.12.1 (ganache-core: 2.13.1)

## Test

```
// install and run ganache-cli in the other terminal
$ ganache-cli

$ truffle console
$ truffle(development)> test
```

## Deploy to Rinkeby Testnet

```
// create .env file
INFURA_KEY={infura key}
METAMASK_SEED={matamask seed}

$ truffle migrate --network rinkeby
```

## Execute re-entrancy

```
$ cd exploit

// create .env file
INFURA_KEY={infura key}
METAMASK_SEED={matamask seed}
METAMASK_ACCOUNT={metamask account address}

// wallet1 and wallet2 both donate 1 Gwei to Charity Contract
$ node donate.js

// wallet2 withdraw 2 times so wallet2 maliciously gets 1 Gwei * 2 = 2 Gwei
$ node exploit.js
```

## Prevention

ref: [https://quantstamp.com/blog/what-is-a-re-entrancy-attack](https://quantstamp.com/blog/what-is-a-re-entrancy-attack)

- Use send() or transfer() instead of call.value()
- Update the user balance before the ether transfer

```
contract Charity {
    mapping(address => uint256) public donations;

    function withdraw() public {
        uint256 amount = donations[msg.sender];
        donations[msg.sender] = 0;
        msg.sender.transfer(share);
    }
}
```
