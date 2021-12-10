var fs = require('fs');

var chunks = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(l => l.split(''));

var starts = ['(', '[', '{', '<'];
var ends = [')', ']', '}', '>'];
var points = [1, 2, 3, 4];

var goodChunks = [];

chunks.forEach(c => {
    var chunk = c;
    var stack = [];
    var good = true;

   o: for(var i = 0; i < chunk.length; i++) {
        if(starts.includes(chunk[i])) {
            stack.push(chunk[i]);
        } else {
            var popped = stack.pop();
            var stadex = starts.indexOf(popped);
            var endex = ends.indexOf(chunk[i])
            if (endex != stadex) {
                good = false;
                break o;
            }
        }
    }

    if (good) {
        var score = 0;

        while(stack.length) {
            var index = starts.indexOf(stack.pop());
            score *= 5;
            score += points[index];
        }

        goodChunks.push(score);
    }
})

goodChunks.sort((a, b) => a - b);

console.log(goodChunks[Math.floor(goodChunks.length/2)]);