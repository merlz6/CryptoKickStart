import Web3 from 'web3';

let web3;

if( typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ){
  // we are in browser &  meta mask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are not in the browser or the user is not running meta mask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/12d6b8ae949f41e5a893bc9729229c62'
  );
  web3 = new Web3(provider);
}

export default web3;
