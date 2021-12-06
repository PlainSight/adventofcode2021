var fs = require('fs');

var fish = fs.readFileSync('./input.txt', 'utf8').split(',').map(i => parseInt(i)).reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
}, {});

var days = 0;

while(days < 256) {
    // turn 0s into new fish
    var reproducing = fish[0] || 0;

    var newFish = Object.entries(fish).reduce((a, c) => {
        var key = parseInt(c[0]);
        var newKey = ((key == 0) ? 6 : (key - 1));
        a[newKey] = (a[newKey] || 0) + c[1];
        return a;
    }, {});

    if (reproducing) {
        newFish[8] = reproducing;
    }

    fish = newFish;

    days++;
}

console.log(Object.values(fish).reduce((a, c) => a+c, 0));