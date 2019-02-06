import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCE5873E3adaf0004e811333532CE6DBEb8dD194c'
);

export default instance;
