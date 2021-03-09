const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const options = { gasLimit: 800000000, allowUnlimitedContractSize: true };
const web3 = new Web3(ganache.provider(options));

const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledCampaignFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let campaignFactory;
let campaign;
let campaignAddress;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
    campaignFactory = await new web3.eth.Contract(compiledCampaignFactory['CampaignFactory'].abi)
        .deploy({data: compiledCampaignFactory['CampaignFactory'].evm.bytecode.object})
        .send({from: accounts[0], gas: '5000000'});
    
    await campaignFactory.methods.createCampaign(100).send({from: accounts[0], gas: 5000000});
    [campaignAddress] = await campaignFactory.methods.getDeployedContracts().call();

    campaign = await new web3.eth.Contract(compiledCampaign['Campaign'].abi, campaignAddress);
});

describe("Developer Test's: ",()=>{
    
    it("Deployment Test",async()=>{
        assert.ok(campaignFactory.options.address);
        assert.ok(campaign.options.address);
    });
    
    it("Multiple Campaign Creation",async()=>{
        await campaignFactory.methods.createCampaign(100).send({from: accounts[1], gas: 5000000});
        await campaignFactory.methods.createCampaign(10000).send({from: accounts[2], gas: 5000000});
        await campaignFactory.methods.createCampaign(0).send({from: accounts[3], gas: 5000000});
        
        const adds = await campaignFactory.methods.getDeployedContracts().call();
        const campaign1 = await new web3.eth.Contract(compiledCampaign['Campaign'].abi, adds[1]);
        const campaign2 = await new web3.eth.Contract(compiledCampaign['Campaign'].abi, adds[2]);
        const campaign3 = await new web3.eth.Contract(compiledCampaign['Campaign'].abi, adds[3]);
        
        assert.strictEqual(await campaign1.methods.manager().call(), accounts[1]);       
        assert.strictEqual(await campaign2.methods.manager().call(), accounts[2]);
        assert.strictEqual(await campaign3.methods.manager().call(), accounts[3]);
    });

    it("Contribution Test", async()=>{
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: 10000
        });
        const isApprover = await campaign.methods.approvers(accounts[0]).call();
        const bal = await web3.eth.getBalance(campaignAddress);
        assert.strictEqual('10000', bal);
        assert(isApprover);
    });

    it("End to End Test", async()=>{
        await campaign.methods.makeRequest("Req1", 2000000000000, accounts[5]).send({
            from: accounts[0],
            gas: 5000000
        });
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: 32000000000000
        });
        await campaign.methods.approveRequest(0).send({
            from: accounts[1]
        });
        const bal0 = await web3.eth.getBalance(accounts[5]);
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0]
        });

        const bal1 = await web3.eth.getBalance(accounts[5]);
        assert(bal1>bal0);
        const diff=String((bal1-bal0));
        console.log(web3.utils.toWei(diff));
    });    
});