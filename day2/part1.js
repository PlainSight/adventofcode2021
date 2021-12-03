var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\n');

var depth = 0;
var hori = 0;

input.forEach(i => {
	var parts = i.split(' ');
	var num = parseInt(parts[1]);
	switch (parts[0]) {
		case 'forward':
			hori += num;
			break;
		case 'up':
			depth -= num;
			break;
		case 'down':
			depth += num;
			break;

	}

});

console.log(depth*hori);