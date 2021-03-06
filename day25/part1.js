var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var cucumbers = [];

var width = input[0].length;
var height = input.length;

input.forEach((i, y) => {
    i.split('').forEach((ii, x) => {
        if (ii != '.') {
            cucumbers.push({
                type: ii,
                x: x,
                y: y
            })
        }
    })
});

function isClearToMove(c) {
    if (c.type == '>') {
        var nx = (c.x + 1) % width;
        return cucumbers.filter(cc => cc.x == nx && cc.y == c.y).length == 0;
    } else {
        var ny = (c.y + 1) % height;
        return cucumbers.filter(cc => cc.x == c.x && cc.y == ny).length == 0;
    }
}

console.log(cucumbers);

// east then
// south
var moved = true;
var step = 0;
while(moved) {
    step++;
    console.log(step);
    moved = false;

    var rightMovers = cucumbers.filter(c => c.type == '>' && isClearToMove(c));
    rightMovers.forEach(c => {
        moved = true;
        c.x = (c.x + 1) % width;
    });

    var downMovers = cucumbers.filter(c => c.type == 'v' && isClearToMove(c));
    downMovers.forEach(c => {
        moved = true;
        c.y = (c.y + 1) % height;
    });

    // for(var y = 0; y < height; y++) {
    //     var line = '';
    //     for (var x = 0; x < width; x++) {
    //         var cu = cucumbers.filter(c => c.x == x && c.y == y)[0];
    //         line += cu ? cu.type : '.';
    //     }
    //     console.log(line);
    // }
}

console.log(step);