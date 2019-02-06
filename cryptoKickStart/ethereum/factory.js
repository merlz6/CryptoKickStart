import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x378a49368B4A5Ea8E4211bDDa8cc68994daC54dF'
);

export default instance;
