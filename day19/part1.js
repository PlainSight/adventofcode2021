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

//console.log(scanners);

function permute(beacons) {
    var permutations = [];

    // normal - z is up, x is forward and y is right

    // ['+x', '-x', '+y', '-y', '+z', '-z'];
    // polarity is what we multiply the index value and the non-neg value by
    var upinfo = [
        { index: 2, polarity: 1 }, // no shift +5 % 3 = 0
        { index: 2, polarity: -1 },
        { index: 0, polarity: 1 }, // left shift +5 % 3 = 1
        { index: 0, polarity: -1 },
        { index: 1, polarity: 1 }, // double left shift +2 % 3= 2
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

                var imapoff = [2, 1 ,0]
                var offset = imapoff[up.index];

                r[(up.index+offset)%3] = b[up.index]*up.polarity;
                var others = [(up.index+1)%3, (up.index+2)%3];

                var source = [b[others[0]], b[others[1]]];
                var aa = [1, 1, -1, -1];
                var bb = [1, -1, -1, 1];

                r[(others[0]+offset)%3] = source[angle%2]*aa[angle];
                r[(others[1]+offset)%3] = source[(angle+1)%2]*bb[angle]*up.polarity;

                perm.push(r);
            });

            permutations.push(perm);
        }
    }

    return permutations;
}

console.log(permute([[1, 2, 3]]));

function key(e) {
    return e[0]+','+e[1]+','+e[2];
}

function sub(a, b) {
    return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
}

function add(a, b) {
    return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
}


var matched = {};

function mkey (i, j) {
    return [i, j].sort((a, b) => b-a).join(',');
}

function tryMatch(s1, i) {
    scanners.forEach((s2, j) => {
        if (i != j && !matched[mkey(i, j)]) { // j > i -- i == 1 && j == 4
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
    
                            perm.forEach(e => {
                                var kk = key(add(e, offset));
                                if (s1Map[kk]) {
                                    hits++;
                                }
                            });
    
                            if (hits > 11) {
                                console.log(i, j, hits);
                                correlationFound = true;
                                scanners[j] = perm.map(ppp => add(ppp, offset));
                                matched[mkey(i, j)] = true;
                                tryMatch(scanners[j], j);
                            }
                        });
                    }
                });
            });
        }
    });
}

tryMatch(scanners[0], 0);

var relToZero = {};

scanners.forEach(s => {
    s.forEach(b => {
        relToZero[key(b)] = true;
    })
})

var scannerCount = Object.values(relToZero).length;

console.log(scannerCount);