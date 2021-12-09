var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(n => n.split('').map(m => parseInt(m)));


var risk = 0;

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
            risk += (1 + input[y][x]);
        }
    }
}

console.log(risk);