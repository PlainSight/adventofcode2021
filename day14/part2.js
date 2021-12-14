var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

var template = input[0].split('');
var rules = input[1].split('\r\n').map(r => { 
    var parts = r.split(' -> ');
    return {
        i: parts[0].split(''),
        o: parts[1]
    }
});

var cache = {};

function kg (a, b, d) {
    return a+','+b+':'+d;
}

for(var g = 0; g <= 40; g++) {
    // generate numbers and put into cache
    rules.forEach(r => {
        var key = kg(r.i[0], r.i[1], g);
        var counts = {};
        if (g == 0) {
            counts = [r.i[0], r.i[1]].reduce((a, c) => {
                a[c] = (a[c] || 0) + 1;
                return a;
            }, {});
        } else {
            // get the cached counts and add them together
            var leftCount = cache[kg(r.i[0], r.o, g-1)];
            var rightCount = cache[kg(r.o, r.i[1], g-1)];
            Object.keys(leftCount).forEach(l => {
                counts[l] = (counts[l] || 0) + leftCount[l];
            });
            Object.keys(rightCount).forEach(l => {
                counts[l] = (counts[l] || 0) + rightCount[l];
            });
            counts[r.o] -= 1;
        }
        cache[key] = counts;
    })
}

var finalCounts = {};

for(var t = 0; t < template.length-1; t++) {
    var entry = cache[kg(template[t], template[t+1], 40)];
    Object.keys(entry).forEach(l => {
        finalCounts[l] = (finalCounts[l] || 0) + entry[l];
    });

    if (t != template.length-2) {
        finalCounts[template[t+1]] -= 1;
    }
}

var values = Object.values(finalCounts);

console.log(Math.max(...values) - Math.min(...values));

