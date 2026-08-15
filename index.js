/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import fs from 'fs';
inquirer
    .prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Please enter the URL you want to generate a QR code for:'
        }
    ])
    .then((answers) => {
        fs.writeFileSync('url.txt', answers.url);
        // Use user feedback for... whatever!!
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error('Prompt couldn\'t be rendered in the current environment');
        } else {
            console.error('Something else went wrong');
        }
    });