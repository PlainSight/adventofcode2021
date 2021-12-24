var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var modelNumber = '12996997829399';
var inpIndex = 0;

function inp() {
    var res = parseInt(modelNumber[inpIndex]);
    inpIndex++;
    return res;
}

var vals = {
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0
};

for(var i = 0; i < input.length; i++) {
    var instr = input[i];
    if (!instr) {
        continue;
    }
    var parts = instr.split(' ');

    var part2IsInt = false;
    if(parts[2]) {
        part2IsInt = /\d+/.test(parts[2]);
    }

    if (instr == 'eql x w') {
        //console.log('equal', modelNumber[inpIndex-1], vals);
    }

    switch (parts[0]) {
        case 'inp':
            console.log(inpIndex-1, vals['w'], vals['z']);
            vals[parts[1]] = inp();
            break;
        case 'add':
            vals[parts[1]] = vals[parts[1]] + (part2IsInt ? parseInt(parts[2]) : vals[parts[2]]); 
            break;
        case 'mul':
            vals[parts[1]] = vals[parts[1]] * (part2IsInt ? parseInt(parts[2]) : vals[parts[2]]); 
            break;
        case 'div':
            vals[parts[1]] = Math.floor(vals[parts[1]] / (part2IsInt ? parseInt(parts[2]) : vals[parts[2]])); 
            break;
        case 'mod':
            vals[parts[1]] = vals[parts[1]] % (part2IsInt ? parseInt(parts[2]) : vals[parts[2]]); 
            break;
        case 'eql':
            vals[parts[1]] = vals[parts[1]] == (part2IsInt ? parseInt(parts[2]) : vals[parts[2]]) ? 1 : 0; 
            break;
    }
}

console.log(inpIndex-1, vals['w'], vals['z']);