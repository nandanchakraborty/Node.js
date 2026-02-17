// Math object - Module scaffolding

// get a random number between two integer
const math = {};
// Get a random integer between two integers
// Inspired by: http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript

math.getRandomNumber = function getRandomNumber(min, max) {
    let mini = min;
    let maxi = max;

    mini = typeof mini === 'number' ? mini : 0;
    maxi = typeof maxi === 'number' ? maxi : 0;

    return Math.floor(Math.random() * (maxi - mini + 1) + min);
};
// export the library
module.exports = math;
