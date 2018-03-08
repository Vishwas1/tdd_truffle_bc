const FundRaise = artifacts.require('./FundRaise.sol')

contract('FundRaise', function () {
    let fundRaise
    let owner   = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    let donor = "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef";
    beforeEach('setup contract for each test', async function () {
        fundRaise = await FundRaise.new()
    })

    it('has an owner', async function () {
        assert.equal(await fundRaise.owner(), owner)
    })

    it('accepts funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })

        const fundRaiseAddress = await fundRaise.address
        console.log("Contract Address : "+ fundRaiseAddress);
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
    })

    
    it('permits owner to receive funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        const ownerBalanceBeforeRemovingFunds = web3.eth.getBalance(owner).toNumber()
        console.log("ownerBalanceBeforeRemovingFunds = "+ ownerBalanceBeforeRemovingFunds);


        const fundRaiseAddress = await fundRaise.address
        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)

        await fundRaise.removeFunds()

        assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)
        assert.isAbove(web3.eth.getBalance(owner).toNumber(), ownerBalanceBeforeRemovingFunds)
    })



    // it('is able to pause and unpause fund activity', async function () {
    //     await fundRaise.pause()

    //     try {
    //         await fundRaise.sendTransaction({ value: 1e+18, from: donor })
    //         assert.fail()
    //     } catch (error) {
    //         assert(error.toString().includes('invalid opcode'), error.toString())
    //     }
    //     const fundRaiseAddress = await fundRaise.address
    //     assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 0)

    //     await fundRaise.unpause()
    //     await fundRaise.sendTransaction({ value: 1e+18, from: donor })
    //     assert.equal(web3.eth.getBalance(fundRaiseAddress).toNumber(), 1e+18)
    // })

})
