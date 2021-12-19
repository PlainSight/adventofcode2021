var fs = require('fs');
const { off } = require('process');

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

//console.log(scanners);

function permute(beacons) {
    var permutations = [];

    // normal - z is up, x is forward and y is right

    // ['+x', '-x', '+y', '-y', '+z', '-z'];
    // polarity is what we multiply the index value and the non-neg value by
    var upinfo = [
        { index: 2, polarity: 1 },
        { index: 2, polarity: -1 },
        { index: 0, polarity: 1 },
        { index: 0, polarity: -1 },
        { index: 1, polarity: 1 },
        { index: 1, polarity: -1 }
    ];

    //default view                  +x front, +y right, +z up - z up
    //rotate 90 right from default  +y front, -x right, +z up 
    //rotate 180 right from default -x front, -y right, +z up
    //rotate 270 right from default -y front, +x right, +z up
    
    // up is preseverved 
    // other axis are swapped are shifted left and the right is inverted

    // 0, 90, 180, 270

    for(var f = 0; f < upinfo.length; f++) {
        var up = upinfo[f];
        for(var a = 0; a < 4; a++) {
            var angle = a;

            var perm = [];

            beacons.forEach(b => {
                var r = [0, 0, 0];

                r[up.index] = b[up.index]*up.polarity;
                var others = [(up.index+1)%3, (up.index+2)%3];

                var source = [b[others[0]], b[others[1]]];
                var aa = [1, 1, -1, -1];
                var bb = [1, -1, -1, 1];

                r[others[0]] = source[angle%2]*aa[angle];
                r[others[1]] = source[(angle+1)%2]*bb[angle];

                perm.push(r);
            });

            permutations.push(perm);
        }
    }

    return permutations;
}

var dupes = [];

function key(e) {
    return e[0]+','+e[1]+','+e[2];
}

function sub(a, b) {
    return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
}

function add(a, b) {
    return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
}

console.log(permute([[1, 2, 3]]));

scanners.forEach((s1, i) => {
    scanners.forEach((s2, j) => {
        if (i == 1 && j == 4) { // j > i
            var s2perm = permute(s2);

            var s1Map = {};
            s1.forEach(e => {
                s1Map[key(e)] = true;
            });

            //console.log(s1Map);
            var correlationFound = false;
            s2perm.forEach(perm => {
                perm.forEach(a2 => {
                    if (!correlationFound) {
                        s1.forEach(a1 => {
                            // attempt anchors
                            var offset = sub(a1, a2);
    
                            //console.log(a1, a2, offset);
    
                            // hash the positions
                            var hits = 0;
                            var string = '';
    
                            perm.forEach(e => {
                                if (s1Map[key(add(e, offset))]) {
                                    hits++;
                                    if (i == 0 && j == 1) {
                                        string += '   '+(key(add(e, offset)));
                                    }
                                }
                            });
    
                            if (hits > 1) {
                                console.log(i, j, hits, string);
                                correlationFound = true;
                            }
                        });
                    }
                });
            });
        }
    });
});