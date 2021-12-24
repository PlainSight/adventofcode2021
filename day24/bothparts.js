var fs = require('fs');

var A = [12, 7, 1, 2, 4, 15, 11, 5, 3, 9, 2, 3, 3, 11];
var B = [14, 15, 12, 11, -5, 14, 15, -13, -16, -8, 15, -8, 0, -4];
var divs = B.map(b => b < 9);
var remainingDivs = [7, 7, 7, 7, 6, 6, 6, 5, 4, 3, 3, 2, 1, 0];

var chars = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var validNumbers = [];

function search(w, current, z, i) {
    var nextCurrent = [...current];
    nextCurrent.push(w);

    if (divs[i]) {
        var zmod = (z % 26) + B[i];
        if (zmod < 10 && zmod > 0) {
        } else {
            return;
        }
    }

    var eq = ((z % 26) + B[i]) == w ? 1 : 0;

    if (divs[i]) {
        z = Math.floor(z / 26);
    }

    if (eq) {
        z = z;
    } else {
        z = (26*z) + w + A[i];
    }
    //console.log(i, modelNumber[i], z);
    if (2*Math.pow(26, remainingDivs[i]) < z) {
        // we can't get back to zero
    } else {
        if (i == 13) {
            if (z == 0) {
                validNumbers.push(nextCurrent);
            }
        } else {
            chars.forEach(c => {
                search(c, nextCurrent, z, i+1);
            })
        }
        
    }
}

chars.forEach(c => {
    search(c, [], 0, 0);
});

validNumbers = validNumbers.map(v => parseInt(v.join(''))).sort((a, b) => a - b);

console.log(validNumbers.slice(-1)[0]);
console.log(validNumbers.slice(0, 1)[0]);