const Web3 = require('web3');
const compiledCampaignFactory = require('./build/CampaignFactory.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const mnemonicPhrase = process.env.MNEMONIC_PHRASE;

let provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: process.env.INFURA_KOVAN_URL
});

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Account to used for deployment of contract: " + accounts[0]);
    const campaignFactory = await new web3.eth.Contract(compiledCampaignFactory['CampaignFactory'].abi)
        .deploy({data: compiledCampaignFactory['CampaignFactory'].evm.bytecode.object})
        .send({from: accounts[0]});
    console.log("Contract deployed at: " + campaignFactory.options.address);
};
deploy();

provider.engine.stop();