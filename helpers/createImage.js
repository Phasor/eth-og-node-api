const { resolve } = require('path');


async function createImage(width, height, firstBlockDate, account) {
    const { createCanvas, loadImage } = require('canvas');
    const { Blob } = require('node:buffer');

    const path = require('path');
    const myCanvas = createCanvas(width, height);
    const context = myCanvas.getContext('2d');

    //draw date && address over the top of base image
    const myImage = await loadImage(path.resolve(__dirname, './base.jpg'));
    context.drawImage(myImage, 0, 0, width, height);
    context.fillStyle = '#b0b0b0';
    context.font = '50px Arial';
    context.textAlign = 'center';
    context.fillText(firstBlockDate, width / 2, height / 1.15);
    context.font = '16px Arial';
    context.fillText(account, width / 2, height / 1.05);

    //save image by converting to blob
    const buffer = myCanvas.toBuffer();
    //const arrayBuffer = new Uint8Array(buffer).buffer;
    //const imageBlob = new Blob([arrayBuffer], { type: 'image/jpg' })
    //const imageName = 'public/images/image.png';
    //require('fs').createWriteStream(imageName).write(buffer);
    return buffer;

}

module.exports = createImage;


