var fs = require('fs');

var chunks = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(l => l.split(''));

var starts = ['(', '[', '{', '<'];
var ends = [')', ']', '}', '>'];
var points = [3, 57, 1197, 25137];

var score = 0;

chunks.forEach(c => {
    var chunk = c;

    var stack = [];

   o: for(var i = 0; i < chunk.length; i++) {
        if(starts.includes(chunk[i])) {
            stack.push(chunk[i]);
        } else {
            var popped = stack.pop();
            var stadex = starts.indexOf(popped);
            var endex = ends.indexOf(chunk[i])
            if (endex != stadex) {
                score += points[endex];
                break o;
            }
        }
    }
})

console.log(score);