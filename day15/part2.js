const { SSL_OP_TLS_ROLLBACK_BUG } = require('constants');
var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(i => i.split('').map(x => parseInt(x)));

var stack = [];
stack.push({ x: 0, y: 0, d: 0 });

var dirs = [{dx:1, dy:0},{dx:-1, dy:0},{dx:0, dy:-1},{dx:0, dy:1}];
var visited = {};
visited['0,0'] = true;

var xl = input[0].length;
var yl = input.length;

function g(x, y) {
    var xm = Math.floor(x / xl);
    var ym = Math.floor(y / yl);
    var val = (input[y%yl][x%xl] + xm + ym);
    if (val > 9) {
        val -= 9;
    }
    return val;
}

var maxx = xl * 5;
var maxy = yl * 5;

while (stack.length) {
    stack.sort((a, b) => b.d - a.d);
    var top = stack.pop();

    var found = -1;

    dirs.forEach(d => {
        var x = top.x + d.dx;
        var y = top.y + d.dy;

        if (x >= 0 && x < maxx && y >= 0 && y < maxy) {
            if (!visited[x+','+y]) {
                stack.push({ x: x, y: y, d: top.d + g(x, y) });
                visited[x+','+y] = true;
            }
        }
        if(x == maxx-1 && y == maxy-1) {
            found = top.d + g(x, y);
        }
    });

    if (found > 0) {
        console.log(found);
        return;
    }
}