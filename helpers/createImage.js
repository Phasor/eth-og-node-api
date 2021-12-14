const { resolve } = require('path');

async function createImage(width, height, firstYear, account) {
    const { createCanvas, loadImage } = require('canvas');
    const path = require('path');
    const myCanvas = createCanvas(width, height);
    const context = myCanvas.getContext('2d');
    var myImage = null;

    //draw date && address over the top of base image
    switch (firstYear) {
        case '2015':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2015.jpg'));
            break;
        case '2016':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2016.jpg'));
            break;
        case '2017':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2017.jpg'));
            break;
        case '2018':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2018.jpg'));
            break;
        case '2019':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2019.jpg'));
            break;
        case '2020':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2020.jpg'));
            break;
        case '2021':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2021.jpg'));
            break;
        case '2022':
            myImage = await loadImage(path.resolve(__dirname, '../public/images/2022.jpg'));
            break;
    }
    //const myImage = await loadImage(path.resolve(__dirname, '../public/images/base.jpg'));
    context.drawImage(myImage, 0, 0, width, height);
    context.fillStyle = '#b0b0b0';
    // context.font = '50px Arial';
    context.textAlign = 'center';
    // context.fillText(firstBlockDate, width / 2, height / 1.15);
    context.font = '16px Arial';
    context.fillText('Eth OG', width / 2, height / 1.05);

    //save image by converting to buffer
    const buffer = myCanvas.toBuffer();
    return buffer;
}

module.exports = createImage;


