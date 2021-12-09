var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(n => n.split('').map(m => parseInt(m)));


var risk = 0;
var basins = [];

for(var x = 0; x < input[0].length; x++) {
    for(var y = 0; y < input.length; y++) {
        var minx = Math.max(x-1, 0);
        var maxx = Math.min(x+1, input[0].length-1);
        var miny = Math.max(y-1, 0);
        var maxy = Math.min(y+1, input.length-1);

        var allHigher = true;

        for(var xx = minx; xx <= maxx; xx++) {
            for (var yy = miny; yy <= maxy; yy++) {
                if ((xx != x || yy != y) && (xx == x || yy == y)) {
                    if(input[y][x] >= input[yy][xx]) {
                        allHigher = false;
                    }
                }
            }
        }

        if (allHigher) {
            basins.push({ x: x, y: y });
        }
    }
}

function explore(x, y) {
    if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) {
        return 0;
    }
    if (input[y][x] < 9) {
        input[y][x] = 10;
        var sum = 0;
        sum += explore(x+1, y);
        sum += explore(x-1, y);
        sum += explore(x, y+1);
        sum += explore(x, y-1);
        return sum + 1;
    }
    return 0;
}

basins.forEach(b => {
    b.size = explore(b.x, b.y);
});

basins.sort((a, b) => b.size - a.size);

console.log(basins[0].size*basins[1].size*basins[2].size);