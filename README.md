# Eth OG Node API

This is a backend node.js API for the Ethereum NFT project Eth OG.

The front end dApp send requests to this API which produced a preview of what the NFT image will look like. The user can then decide to mint the NFT or not.

The API handles image created with the node canvas API and uploads the image and its metadata to IPFS. A cruptographically secure signature is provided to tne front end dApp ensure that the metadata URL was in fact produced by this API. This stops users from minting their own tokens in the Ethereum smart contract with their own faked metadata URL.

To start the API: 

`node index.js`

Request format:

`/api/url/?add=[public address]&key=[api key]`

Response format:
`{"firstBlock","firstYear","date","url","signature"}`

## Smart Contract
`verify.sol` is in here for illustrative purposes to show how the crypto signature works. checkSigner() would be required in the mint function of the project.
