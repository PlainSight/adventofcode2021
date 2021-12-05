var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var marked = {};


input.forEach(i => {
    var parts = i.split(' -> ').map(n => n.split(',').map(o => parseInt(o)));

    var dx = parts[1][0] - parts[0][0];
    var dy = parts[1][1] - parts[0][1];
    var ix = dx == 0 ? 0 : dx / Math.abs(dx);
    var iy = dy == 0 ? 0 : dy / Math.abs(dy);

    if (dx == 0 || dy == 0) {
        var iter = Math.max(Math.abs(dx), Math.abs(dy));
        var i = 0;
        var x = parts[0][0];
        var y = parts[0][1];
        while(i <= iter) {
            marked[x+','+y] = (marked[x+','+y] || 0) + 1;
            x += ix;
            y += iy;
            i++;
        }
    }
});

console.log(Object.values(marked).filter(m => m > 1).length);
