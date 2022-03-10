const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  //Metamask account for this project is for development purposes only.
  //Replace mnemonic phrase below with your personal phrase.
  'air praise perfect woman noise zoo nominee explain radar add globe act',
  'https://rinkeby.infura.io/v3/2cf2bbd4068f45c08aeb064ce51468ed' //Specify the node to use.
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
