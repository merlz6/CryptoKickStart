const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'perfect debris grunt crucial portion fresh inner tackle welcome employ still piano',
  'https://rinkeby.infura.io/v3/12d6b8ae949f41e5a893bc9729229c62'
);

const web3 = new Web3(provider);

const deploy = async () => {
  //get accounts
  const accounts = await web3.eth.getAccounts();
  //using account index 0
  console.log('Attempting to deploy from account' , accounts[0])
  //new instance of the contract
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: '0x' + compiledFactory.bytecode })
      .send({ gas: '1000000', from: accounts[0] });



  console.log('Contract deployed to', result.options.address);

}
deploy();
