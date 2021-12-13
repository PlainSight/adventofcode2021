var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

var dots = input[0].split('\r\n').map(d => {
    var s = d.split(',');
    return {
        x: parseInt(s[0]),
        y: parseInt(s[1])
    };
});
var folds = input[1].split('\r\n').map(f => {
    var r = /fold along ([xy])=(\d+)/.exec(f);
    return { d: r[1], v: parseInt(r[2])};
});

function foldUp (y) {
    dots.filter(d => d.y > y).forEach(d => {
        d.y = d.y - 2*(d.y - y);
    });
}

function foldLeft (x) {
    dots.filter(d => d.x > x).forEach(d => {
        d.x = d.x - 2*(d.x - x);
    });
}

var f = folds[0];
{
    if (f.d == 'x') {
        foldLeft(f.v);
    } else {
        foldUp(f.v);
    }
}


var map = {};

dots.forEach(d => {
    map[d.x+','+d.y] = true;
})

console.log(Object.keys(map).length);