const { ethers, utils } = require('ethers');
const dotenv = require('dotenv');
const axios = require('axios').default;
const createImage = require('./createImage.js');
const uploadMetaData = require('./useUploader.js');
//const fs = require('fs');
//const path = require('path');

//pull in .env variables
dotenv.config();

//creates crypto signature for the input using local private key from the API. 
//Proves metadata URL was produced by the API and not faked 
async function createSignature(URL) {
    //create new signing key
    const signingKey = new ethers.utils.SigningKey(process.env.PRIVATE_KEY);

    //computes the KECCAK256 hash of the text bytes.
    const hash = ethers.utils.id(URL);

    //sign the hashed message
    const signature = signingKey.signDigest(hash);
    const joinedSignature = ethers.utils.joinSignature(signature);

    //const expectedAddress = ethers.utils.computeAddress(process.env.PRIVATE_KEY)
    //console.log("Expected:" + expectedAddress);
    //Expected: 0x14791697260E4c9A71f18484C9f997B308e59325

    return joinedSignature;
}

//returns first year the eth address transacted with eth
function getFirstYear(blockNumber) {
    //mainnet numbers
    // if (blockNumber < 778483) {
    //     setFirstYear(2015);
    // }
    // else if (blockNumber < 2912407) {
    //     setFirstYear(2016);
    // }
    // else if (blockNumber < 4832686) {
    //     setFirstYear(2017);
    // }
    // else if (blockNumber < 6988615) {
    //     setFirstYear(2018);
    // }
    // else if (blockNumber < 9193266) {
    //     setFirstYear(2019);
    // }
    // else if (blockNumber < 11565019) {
    //     setFirstYear(2020);
    // }
    // else {
    //     setFirstYear(2021);
    // }

    //Rinkeby block numbers
    if (blockNumber < 1513019) {
        return '2017';
    }
    else if (blockNumber < 3611463) {
        return '2018';
    }
    else if (blockNumber < 5713163) {
        return '2019';
    }
    else if (blockNumber < 7815452) {
        return '2020';
    }
    else {
        return '2021';
    }
}

async function fetchData(account) {
    try {
        const api_url = createEtherscanURL(account)
        const response = await axios.get(api_url);
        const firstTransaction = await response.data;
        const firstBlock = firstTransaction.result[0].blockNumber;
        const firstYear = getFirstYear(parseFloat(firstBlock));

        //get date of transaction
        //const dateObj = new Date((firstTransaction.result[0].timeStamp) * 1000);
        //const humanDate = dateObj.toDateString();

        //create and upload image to IPFS
        const imageBuffer = await createImage(450, 450, firstYear, account);
        //const finalImage = await fs.promises.readFile(path.resolve(__dirname, '../public/images/image.png'));

        const url = await uploadMetaData(
            `NameTest`,
            'A cool description of this item',
            imageBuffer,
            [
                {
                    "display_type": "date",
                    "trait_type": "Year",
                    "value": firstYear
                }
            ],
        );

        //create crypto signature to prove API produced the metadata URL
        const signature = await createSignature(url);
        //const actualAddress = utils.verifyMessage(firstBlock, sig);
        //console.log("Actual:" + actualAddress);
        return { firstBlock: firstBlock, firstYear: firstYear, url: url, signature: signature, image: imageBuffer }
    }
    catch (err) {
        console.log(err)
    };
}

function createEtherscanURL(account) {
    //create Etherscan api URL
    //mainnet
    //const API_BASE_URL = 'https://api.etherscan.io/api?module=account&action=txlist&address=';

    //Rinkeby
    const RINKEBY_API_BASE_URL = 'https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=';

    const API_SECONADRY_BASE_URL = '&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=';

    const etherscanURL =
        RINKEBY_API_BASE_URL + account + API_SECONADRY_BASE_URL +
        process.env.ETHERSCAN_API_KEY;

    return etherscanURL;
}

module.exports = fetchData;

