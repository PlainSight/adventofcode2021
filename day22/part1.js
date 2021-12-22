var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var cubes = {};

function k(x, y, z) {
    return x+','+y+','+z;
}

input.forEach(i => {
    //on x=10..12,y=10..12,z=10..12
    var parts = /([a-z]+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/.exec(i);
    var on = parts[1] == 'on';
    var xMin = Math.max(parseInt(parts[2]), -50);
    var xMax = Math.min(parseInt(parts[3]), 50);
    var yMin = Math.max(parseInt(parts[4]), -50);
    var yMax = Math.min(parseInt(parts[5]), 50);
    var zMin = Math.max(parseInt(parts[6]), -50);
    var zMax = Math.min(parseInt(parts[7]), 50);

    for(var x = xMin; x <= xMax; x++) {
        for(var y = yMin; y <= yMax; y++) {
            for(var z = zMin; z <= zMax; z++) {
                cubes[k(x, y, z)] = on;
            }
        }
    }
});

console.log(Object.values(cubes).filter(c => c).length);