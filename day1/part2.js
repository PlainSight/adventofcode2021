var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(n => parseInt(n));

console.log(input);

var increases = 0;
for (var i = 0; i < input.length-3; i++) {
	if (input[i]+input[i+1]+input[i+2] < input[i+1]+input[i+2]+input[i+3]) {
		increases++;
	}
}
console.log(increases);