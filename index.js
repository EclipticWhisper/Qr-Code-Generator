import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Please enter the URL you want to generate a QR code for:'
        }
    ])
    .then((answers) => {
        // 1. Save the URL to a text file
        fs.writeFileSync('url.txt', answers.url);
        console.log('Saved URL to url.txt!');

        // 2. Generate the QR code using the user's input directly
        const qr_svg = qr.image(answers.url, { type: 'svg' });
        qr_svg.pipe(fs.createWriteStream('i_love_qr.svg'));
        console.log('QR Code generated successfully as i_love_qr.svg!');
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error('Prompt couldn\'t be rendered in the current environment');
        } else {
            console.error('Something else went wrong:', error);
        }
    });
