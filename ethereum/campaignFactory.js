import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(campaignFactory['CampaignFactory'].abi, "0x7a5B691214B9264B4Fa191531e6E07baB980A621");

export default instance;