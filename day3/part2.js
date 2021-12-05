var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\n');

function o(set, pos) {
    var valueInCols = set.reduce((a, c) => {
        if (c[pos] == '1') {
            a.one++;
        } else {
            a.zero++;
        }
        return a;
    }, { zero: 0, one: 0 });
    if (valueInCols.one >= valueInCols.zero) {
        return set.filter(v => v[pos] == '1');
    } else {
        return set.filter(v => v[pos] == '0');
    }
}

function c(set, pos) {
    var valueInCols = set.reduce((a, c) => {
        if (c[pos] == '1') {
            a.one++;
        } else {
            a.zero++;
        }
        return a;
    }, { zero: 0, one: 0 });
    if (valueInCols.one < valueInCols.zero) {
        return set.filter(v => v[pos] == '1');
    } else {
        return set.filter(v => v[pos] == '0');
    }
}

var oset = input.map(i => i);
var oo = 0;
while(oset.length > 1) {
    oset = o(oset, oo);
    oo++;
}

var cset = input.map(i => i);
var cc = 0;
while(cset.length > 1) {
    cset = c(cset, cc);
    cc++;
}

console.log(parseInt(oset[0].trim(), 2) * parseInt(cset[0].trim(), 2));
