var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

var scanners = [];

input.forEach(i => {
    var parts = i.split('\r\n');
    var beacons = [];
    parts.forEach((p, i) => {
        if (i > 0) {
            beacons.push(p.split(',').map(n => parseInt(n)));
        }
    });
    scanners.push(beacons);
})

console.log(scanners);

function permute(beacons) {
    var permutations = [];

    var up = ['+x', '-x', '+y', '-y', '+z', '-z'];
    // polarity is what we multiply the index value and the non-neg value by
    var upinfo = [
        { index: 0, polarity: 1, neg: 1 },
        { index: 0, polarity: -1, neg: 1 },
        { index: 1, polarity: 1 , neg: 2},
        { index: 1, polarity: -1, neg: 2 },
        { index: 2, polarity: 1, neg: 0 },
        { index: 2, polarity: -1, neg: 0 }
    ];

    //default view                  +x front, +y right, +z up
    //rotate 90 right from default  +y front, -x right, +z up
    //rotate 180 right from default -x front, -y right, +z up
    //rotate 270 right from default -y front, +x right, +z up
    
    // up is preseverved 
    // other axis are swapped are shifted left and the right is inverted

    var angles = [0, 1, 2, 3]; // 0, 90, 180, 270

    for(var f = 0; f < up.length; f++) {
        var up = facings[f];
        for(var a = 0; a < angles.length; a++) {
            var angle = angles[a];



        }
    }
}