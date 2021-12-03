var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\n');

var depth = 0;
var hori = 0;
var aim = 0;

input.forEach(i => {
	var parts = i.split(' ');
	var num = parseInt(parts[1]);
	switch (parts[0]) {
		case 'forward':
			hori += num;
			depth += (aim * num);
			break;
		case 'up':
			aim -= num;
			break;
		case 'down':
			aim += num;
			break;

	}

});

console.log(depth*hori);