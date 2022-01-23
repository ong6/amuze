require('openzeppelin-test-helpers/configure')({web3})
const {singletons} = require('openzeppelin-test-helpers')

const Muze = artifacts.require('Muze')
const MuzeCustody = artifacts.require('MuzeCustody')
const MuzeTour = artifacts.require('MuzeTour')

module.exports = async function(deployer, _network, accounts) {
  // await singletons.ERC1820Registry(accounts[0]);

  await deployer.deploy(MuzeCustody);

  await deployer.deploy(Muze, 1000, [ accounts[0], MuzeCustody.address ]);
  await deployer.deploy(MuzeTour);

  const deployedCustody = await MuzeCustody.deployed();
  await deployedCustody.setTokenAddress(Muze.address);
  await deployedCustody.setNFTAddress(MuzeTour.address);
}
