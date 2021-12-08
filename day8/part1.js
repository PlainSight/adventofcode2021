var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var count = 0;

input.forEach(i => {
    var parts = i.split(' | ')
        .map(v => v.split(' ')
            .map(k => k.split('').sort((a, b) => b < a ? 1 : -1).join('')));

    var one = parts[0].filter(p => p.length == 2)[0];
    var seven = parts[0].filter(p => p.length == 3)[0];
    var four = parts[0].filter(p => p.length == 4)[0];
    var eight = parts[0].filter(p => p.length == 7)[0];
    var nineZero = parts[0].filter(p => 
        p.includes(seven[0]) && 
        p.includes(seven[1]) && 
        p.includes(seven[2]) && 
        p.length == 6);
    var three = parts[0].filter(p => 
        p.length > 4 &&
        p != four &&
        p != eight &&
        p != nineZero[0] &&
        p != nineZero[1] &&
        p.includes(one[0]) && p.includes(one[1]))[0];
    var nine = nineZero.filter(p => {
        var good = true;
        three.split('').forEach(ii => {
            if (!p.includes(ii)) {
                good = false;
            }
        });
        return good;
    })[0];
    var zero = nineZero.filter(p => p != nine)[0];
    var six = parts[0].filter(p => p.length == 6 && p != zero && p !=)[0];
    var twoFive = parts[0].filter(p => 
        p != six &&
        !(p.includes(one[0]) && p.includes(one[1])))
    var two = twoFive.filter(p => {
        var similarities = 0;
        nine.split('').forEach(ii => {
            if (p.includes(ii)) {
                similarities++;
            }
        })
        return similarities == 4;
    })[0];
    var five = twoFive.filter(p => {
        var similarities = 0;
        nine.split('').forEach(ii => {
            if (p.includes(ii)) {
                similarities++;
            }
        })
        return similarities == 5;
    })[0];

    var numbers = [
        zero, one, two, three, four, five, six, seven, eight, nine
    ];
    // console.log(0, zero);
    // console.log(1, one);
    // console.log(2, two);
    // console.log(3, three);
    // console.log(4, four);
    // console.log(5, five);
    // console.log(6, six);
    // console.log(7, seven);
    // console.log(8, eight);
    // console.log(9, nine);
    //console.log(numbers);
    parts[1].forEach(p => {
        //console.log(p)
        var index = numbers.indexOf(p);
        if ([1, 4, 7, 8].includes(index)) {
            count++;
        }
    });

    //throw new Error('a');

});

console.log(count);