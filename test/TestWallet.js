const Wallet = artifacts.require('Wallet');
const Charity = artifacts.require('Charity');

contract('Test Wallet', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const initialFund = web3.utils.toWei('2', 'ether');

    let walletContract1;
    let walletContract2;

    describe('Test wallet functions', () => {
        beforeEach('setup contract', async () => {
            charityContract = await Charity.new({from: account_one});
            walletContract1 = await Wallet.new(charityContract.address, {from: account_one, value: initialFund});
            walletContract2 = await Wallet.new(charityContract.address, {from: account_two, value: initialFund});
        });
    
        it('should return correct wallet balance', async () => {
            let balance = await walletContract1.getBalance.call();
            let balanceInEther = web3.utils.fromWei(balance, 'ether');
            assert.equal(balanceInEther, '2');
        });
    
        it('should return correct donation balance', async () => {
            const donation = web3.utils.toWei('1', 'ether');
            await walletContract1.donate(donation);
            
            let balance = await walletContract1.getDonationBalance.call();        
            let balanceInEther = web3.utils.fromWei(balance, 'ether');
            assert.equal(balanceInEther, '1');
    
            let walletBalance = await walletContract1.getBalance.call();
            let walletBalanceInEther = web3.utils.fromWei(walletBalance, 'ether');
            assert.equal(walletBalanceInEther, '1');
        });
    
        it('attack charity contract', async () => {
            const donation = web3.utils.toWei('1', 'ether');
            await walletContract1.donate(donation);
            await walletContract2.donate(donation);
            
            let balance1 = await walletContract1.getDonationBalance.call();        
            let balanceInEther1 = web3.utils.fromWei(balance1, 'ether');
            assert.equal(balanceInEther1, '1');
    
            let balance2 = await walletContract2.getDonationBalance.call();        
            let balanceInEther2 = web3.utils.fromWei(balance2, 'ether');
            assert.equal(balanceInEther2, '1');

            // reentrant call!!!
            // await walletContract1.withdraw();
        });
    });
});