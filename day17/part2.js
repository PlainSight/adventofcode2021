var fs = require('fs');

/target area: x=60..94, y=-171..-136/

var xmin = 60;
var xmax = 94;
var ymin = -171;
var ymax = -136;

var count = 0;

for(var dx = 10; dx < 95; dx++) {
    for (var dy = -200; dy < 5000; dy++) {
        var tdx = dx;
        var tdy = dy;
        var x = 0;
        var y = 0;
pp:     while(true) {
            x += tdx;
            y += tdy;
            if (xmin <= x && x <= xmax && ymin <= y && y <= ymax) {
                count++;
                break pp;
            }
            if (tdx == 0 && (x < xmin || x > xmax)) {
                break pp;
            }
            if (y < ymin) {
                break pp;
            }
            tdy -= 1;
            if (tdx > 0) {
                tdx -= 1;
            }
            if (tdx < 0) {
                tdx += 1;
            }
        }
    }
}

console.log(count);