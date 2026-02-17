// dependecies
const fs = require('fs');

// Quotes object - Module scaffolding

const quotes = {};

// Get all the quotes and return them to the user

quotes.allQuotes = function allQuotes() {
    const fileContents = fs.readFileSync(`${__dirname}/quotes.txt`, 'utf8');
    const arrayOfQuotes = fileContents.split(/\r?\n/);
    return arrayOfQuotes;
};

module.exports = quotes;
