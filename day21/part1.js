var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');


var positions = [5-1, 10-1];
var scores = [0, 0];
var rolls = 0;

var turn = 0;

var dedice = 1;
function roll() {
    rolls++;
    var res = dedice;
    dedice += 1;
    return res;
}

while (scores.filter(s => s >= 1000).length == 0) {
    var move = roll() + roll() + roll();
    positions[turn] = (positions[turn] + move) % 10;
    scores[turn] += (positions[turn]+1);
    turn = (turn+1) % 2;
}

console.log(rolls);
console.log(scores);
console.log(rolls*Math.min(...scores));