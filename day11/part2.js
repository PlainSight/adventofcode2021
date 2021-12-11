var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(r => r.split('').map(n => parseInt(n)));

var flashes = 0;

function flash(x, y) {
    flashes++;
    input[y][x] = 0;
    var xmin = Math.max(x-1, 0);
    var xmax = Math.min(x+1, 9);
    var ymin = Math.max(y-1, 0);
    var ymax = Math.min(y+1, 9);
    for(var xx = xmin; xx <= xmax; xx++) {
        for(var yy = ymin; yy <= ymax; yy++) {
            if (x != xx || y != yy) {
                if (input[yy][xx] != 0) {
                    input[yy][xx] += 1;
                    if (input[yy][xx] > 9) {
                        flash(xx, yy);
                    }
                }
            }
        }
    }
}

for(var i = 1; true; i++) {
    for(var x = 0; x < 10; x++) {
        for(var y = 0; y < 10; y++) {
            input[y][x] += 1;
        }
    }
    
    for(var x = 0; x < 10; x++) {
        for(var y = 0; y < 10; y++) {
            if(input[y][x] > 9) {
                flash(x, y);
            }
        }
    }

    if (flashes == 100) {
        console.log(i);
        return;
    }
    
    flashes = 0;
}