var fs = require('fs');

/target area: x=60..94, y=-171..-136/

var xmin = 60;
var xmax = 94;
var ymin = -171;
var ymax = -136;

var ghighy = -100;
var gdx = 0;
var gdy = 0;

for(var dx = 0; dx < xmax; dx++) {
    for (var dy = 0; dy < 500; dy++) {
        var tdx = dx;
        var tdy = dy;
        var highy = ymin;
        var x = 0;
        var y = 0;
pp:     while(true) {
            x += tdx;
            y += tdy;
            if (y > highy) {
                highy = y;
            }
            if (xmin <= x && x <= xmax && ymin <= y && y <= ymax) {
                if (highy > ghighy) {
                    ghighy = highy;
                    gdx = dx;
                    gdy = dy;
                }
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

console.log(ghighy);