const Charity = artifacts.require('Charity');

contract('Test Charity', accounts => {

    const account_one = accounts[0];
    
    describe('Charity', () => {
        let charityContract;
        
        beforeEach(async () => {
            charityContract = await Charity.new({from: account_one});
        });

        it('donate test', async () => {
            const donation = web3.utils.toWei('2', 'ether');
            await charityContract.donate({from: account_one, value: donation});
            let balance = await charityContract.getBalance({from: account_one});
            let balanceInEther = web3.utils.fromWei(balance, 'ether');
            assert.equal(balanceInEther, '2');
        });

        it('withdraw test', async () => {
            await charityContract.withdraw({from: account_one});
            let balance = await charityContract.getBalance({from: account_one});
            let balanceInEther = web3.utils.fromWei(balance, 'ether');
            assert.equal(balanceInEther, '0');
        });
    });
});