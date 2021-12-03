
async function uploadMetaData(_name, _description, _image, _atributes) {
    const { NFTStorage, File, Blob } = require('nft.storage');
    const endpoint = 'https://api.nft.storage';
    const token = process.env.NFT_STORAGE_KEY;
    var metadataURL = "";
    const EXTERNAL_URL = "https://www.mywebsite.com";

    try {
        const storage = new NFTStorage({ endpoint, token });

        const metadata = await storage.store({
            name: _name,
            description: _description,
            image: new File([_image], `${_name}.jpg`, { type: 'image/jpg' }),
            external_url: EXTERNAL_URL,
            attributes: _atributes,
        })

        console.log('IPFS URL for the metadata:', metadata.url);
        metadataURL = metadata.url;
        return metadata.url;
    }
    catch (err) {
        console.log(err)
    };
}

module.exports = uploadMetaData;
