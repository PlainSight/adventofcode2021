var fs = require('fs');

var fish = fs.readFileSync('./input.txt', 'utf8').split(',').map(i => parseInt(i));

var days = 0;

while(days < 80) {
    // turn 0s into new fish
    var reproducing = fish.filter(f => f == 0);

    var newFish = fish.map(f => f == 0 ? 6 : f-1);

    reproducing.forEach(r => {
        newFish.push(8);
    })

    fish = newFish;

    days++;
}

console.log(fish.length);