var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var cucumbers = {};
var carray = [];

var width = input[0].length;
var height = input.length;

function k(c) {
    return c.x+','+c.y;
}

input.forEach((i, y) => {
    i.split('').forEach((ii, x) => {
        if (ii != '.') {
            var c = {
                type: ii,
                x: x,
                y: y
            };
            carray.push(c);
            cucumbers[k(c)] = true;
        }
    })
});

function isClearToMove(c) {
    if (c.type == '>') {
        var nx = (c.x + 1) % width;
        return !cucumbers[nx+','+c.y];
    } else {
        var ny = (c.y + 1) % height;
        return !cucumbers[c.x+','+ny];
    }
}

// east then
// south
var moved = true;
var step = 0;
while(moved) {
    step++;
    moved = false;

    var rightMovers = carray.filter(c => c.type == '>' && isClearToMove(c));
    rightMovers.forEach(c => {
        cucumbers[k(c)] = false;
        moved = true;
        c.x = (c.x + 1) % width;
        cucumbers[k(c)] = true;
    });

    var downMovers = carray.filter(c => c.type == 'v' && isClearToMove(c));
    downMovers.forEach(c => {
        cucumbers[k(c)] = false;
        moved = true;
        c.y = (c.y + 1) % height;
        cucumbers[k(c)] = true;
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