const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Confirm = require('prompt-confirm');

const fetchURL = 'https://raw.githubusercontent.com/Templarian/MaterialDesign/master/meta.json';

const fetchIcons = () => {
  console.clear();
  axios.get(fetchURL).then((response) => {
    fs.readFile(path.resolve(__dirname, '../src/data/icons.json'), 'UTF-8', (error, icons) => {
      if (error) {
        console.log(error);
      }
      // Existing icons
      const existingIcons = JSON.parse(icons);

      // Fetched icons
      const fetchedIcons = response.data;
      if (JSON.stringify(existingIcons).length < JSON.stringify(fetchedIcons).length) {
        new Confirm('Would like to update icons list?')
        .ask((answer) => {
          if (answer === true) {
            // Answered 'yes'
            fs.writeFile(path.resolve(__dirname, '../src/data/icons.json'), JSON.stringify(response.data, null, 4), (err) => {
              if (err) return console.log(err);
              console.log(
                chalk.green('✓ ') +
                chalk.hex('#FFFFFF').bold(`Saved successfully`)
              );
              return;
            });
            return;
          }
          console.log('denied');
          return;
        });
        return;
      }
      console.log('No one new icons was found. Try again later.');
      return;
    });
  });
};

fetchIcons();