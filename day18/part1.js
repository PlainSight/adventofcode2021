var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(n => JSON.parse(n));

function checkExplode(n) {
    var stack = [];
    var res = [];

    function visit(n) {
        if (Array.isArray(n)) {
            stack.push('d');
            visit(n[0]);
            visit(n[1]);
            stack.push('u');
        } else {
            stack.push(n);
        }
    }

    visit(n);

    var depth = 0;

    var did = false;

ex:    for(var i = 0; i < stack.length; i++) {
        if (depth == 5) {
            did = true;
            var left = stack[i];
            var right = stack[i+1];
ll:         for(var j = i-1; j >= 0; j--) {
                if (stack[j] != 'd' && stack[j] != 'u') {
                    stack[j] += left;
                    break ll;
                }
            }
rr:         for(var j = i+2; j < stack.length; j++) {
                if (stack[j] != 'd' && stack[j] != 'u') {
                    stack[j] += right;
                    break rr;
                }
            }
            stack.splice(i-1, 4, 0);
            break ex;
        } else {
            if (stack[i] == 'd') {
                depth++;
            } else {
                if (stack[i] == 'u') {
                    depth--;
                }
            }
        }
    }

    function construct() {
        var popped = stack.pop();
        while (popped == 'd') {
            popped = stack.pop();
        }
        if (popped == 'u') {
            var r = construct();
            var l = construct();
            return [l, r];
        } else {
            return popped;
        }
    }

    res = construct();

    return { n: res, did: did };
}

function checkSplit(n) {
    if (Array.isArray(n)) {
        var r1 = checkSplit(n[0]);
        if (r1.did) {
            return { did: true, n: [ r1.n, n[1] ] };
        }
        var r2 = checkSplit(n[1]);
        if (r2.did) {
            return { did: true, n: [ n[0], r2.n ] };
        }
        return { did: false, n: n };
    } else {
        if (n < 10) {
            return { did: false, n: n };
        } else {
            return { did: true, n: [Math.floor(n/2), Math.ceil(n/2)] }
        }
    }
}

function red(n) {
    var num = n;
    var anything = false;
    do {
        var didExplode = false;
        do {
            var r = checkExplode(num);
            if (r.did) {
                didExplode = true;
                num = r.n;
            } else {
                didExplode = false;
            }
        } while (didExplode);
        var r = checkSplit(num);
        var didSplit = false;
        if (r.did) {
            didSplit = true;
            num = r.n;
        } else {
            didSplit = false;
        }
        anything = didExplode || didSplit;
    } while(anything);
    return num;
}

function add(n, m) {
    var result = [n, m];
    return red(result);
}

function magnitude(n) {
    if (Array.isArray(n)) {
        return 3*magnitude(n[0]) + 2*magnitude(n[1]);
    } else {
        return n;
    }
}


var sum = input[0];

for(var i = 1; i < input.length; i++) {
    sum = add(sum, input[i]);
}

console.log(magnitude(sum));