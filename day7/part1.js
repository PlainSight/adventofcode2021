var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split(',').map(c => parseInt(c));

var min = Math.min(...input);
var max = Math.max(...input);

var lowestSum = Infinity;
var lowestPosition = -1;

for(var i = min; i < max; i++) {
    var sum = 0;
    input.forEach(v => {
        sum += Math.abs(v - i);
    });
    if (sum < lowestSum) {
        lowestSum = sum;
        lowestPosition = i;
    }
}

console.log(lowestPosition, lowestSum);