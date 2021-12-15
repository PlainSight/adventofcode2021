const { SSL_OP_TLS_ROLLBACK_BUG } = require('constants');
var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(i => i.split('').map(x => parseInt(x)));

var stack = [];
stack.push({ x: 0, y: 0, d: 0 });

var dirs = [{dx:1, dy:0},{dx:-1, dy:0},{dx:0, dy:-1},{dx:0, dy:1}];
var visited = {};
visited['0,0'] = true;

while (stack.length) {
    stack.sort((a, b) => b.d - a.d);
    var top = stack.pop();

    var found = -1;

    dirs.forEach(d => {
        var x = top.x + d.dx;
        var y = top.y + d.dy;

        if (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
            if (!visited[x+','+y]) {
                stack.push({ x: x, y: y, d: top.d + input[y][x] });
                visited[x+','+y] = true;
            }
        }
        if(x == input[0].length-1 && y == input.length-1) {
            found = (top.d + input[y][x]);
        }
    });

    if (found > 0) {
        console.log(found);
        return;
    }
}