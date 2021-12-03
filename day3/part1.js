var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\n');

var frequencies = input.reduce((a, c) => {
    for(var i = 0; i < c.trim().length; i++) {
        a[i] = a[i] || { one: 0, zero: 0 };
        a[i].one += (c[i] == '1' ? 1 : 0);
        a[i].zero += (c[i] == '0' ? 1 : 0);
    }
    return a;
}, {});

console.log(frequencies);

var first = 0;
var second = 0;

for(var i = 0; i < Object.keys(frequencies).length; i++) {
    console.log(frequencies[i]);
    first = first << 1;
    first += (frequencies[i].one > frequencies[i].zero ? 1 : 0);
    second = second << 1;
    second += (frequencies[i].one < frequencies[i].zero ? 1 : 0);
}
console.log(first, second, first.toString(2), second.toString(2));

console.log(first*second);
