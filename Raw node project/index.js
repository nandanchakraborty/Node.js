/* basic node app example */

// Dependecies

const mathLib = require('./lib/math');
const quotesLib = require('./lib/quotes');

// app object : module scaffolding

const app = {};

//  configuration

app.config = {
    timeBetweenQuotes: 1000,
};

app.printAQuote = function printAQuote() {
    // get all the quotes
    const allQuotes = quotesLib.allQuotes();

    // get the length of all quotes
    const numberOfQuotes = allQuotes.length;

    // pick a random number

    const randomNumber = mathLib.getRandomNumber(1, numberOfQuotes);

    // get all quote at that position in the array
    const selectedQuote = allQuotes[randomNumber - 1];

    console.log(selectedQuote);
};

// Function that loops indefinitely, calling the printAQuote function as it goes
app.indefiniteLoop = function indefiniteLoop() {
    // Create the interval, using the config variable defined above
    setInterval(app.printAQuote, app.config.timeBetweenQuotes);
};

app.indefiniteLoop();
