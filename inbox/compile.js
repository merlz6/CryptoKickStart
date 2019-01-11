const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//bc we are only feeding in the source code one source we do ':' normally its "filename": "ContractName" to acces a contract
module.exports = solc.compile(source, 1).contracts[':Inbox'];
