const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

// running thru contracts
for ( let contract in output) {
  //outputing to a JSON file
  fs.outputJsonSync(
    // placing file to buildpath , remove the : from the beginning of file name 
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
