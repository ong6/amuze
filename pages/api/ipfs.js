// const { address, abi } = require("./contract.json");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient.create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
});

export async function uploadProposal(text) {
	const added = await ipfs.add(text, (err, ipfsHash) => {
		console.log(err, ipfsHash);
	});
	return added.path;
}

export async function retrieveProposal(proposalHash) {
	return fetch("https://ipfs.infura.io/ipfs/" + proposalHash).then((x) =>
		x.json()
	);
}
