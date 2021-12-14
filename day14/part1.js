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

for(var i = 0; i < 10; i++) {
    var newTemplate = [];
    for(var t = 0; t < template.length-1; t++) {
        newTemplate.push(template[t]);
        var rule = rules.filter(r => r.i[0] == template[t] && r.i[1] == template[t+1])[0];
        newTemplate.push(rule.o);
    }
    newTemplate.push(template[template.length-1]);
    template = newTemplate;
}

var freq = template.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
}, {});

var values = Object.values(freq);

console.log(Math.max(...values) - Math.min(...values));
