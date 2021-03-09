const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contracts = ['Campaign.sol','CampaignFactory.sol'];
const paths = [];
const sources = [];

paths.push(path.resolve(__dirname, "contracts", contracts[0]));
sources.push(fs.readFileSync(paths[0], 'utf8'));

paths.push(path.resolve(__dirname, "contracts", contracts[1]));
sources.push(fs.readFileSync(paths[1], 'utf8'));

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: sources[0]
        },
        'CampaignFactory.sol': {
            content: sources[1]
        }
    },
    settings: {
        outputSelection: {
        '*': {
            '*': ['*']
        }
        }
    }
};

function findImports(path) {
    if (path === contracts[0])
      return {
        contents: sources[0]
      };
    else return { error: 'File not found' };
  }
  
var output = JSON.parse(solc.compile(
    JSON.stringify(input),
    {import: findImports}
));

// console.log(output);

fs.ensureDirSync(buildPath);
for( contract in output.contracts){
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace('.sol','') + '.json'),
        output.contracts[contract]
    );
    // console.log(contract);  
}