var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

var order = input[0].split(',').map(n => parseInt(n));

var boards = [];

for (var b = 1; b < input.length; b++) {
    boards.push(input[b].split('\r\n').map(l => l.trim().split(/\s+/).map(n => parseInt(n))));
}

var found = false;
for(var r = 0; r < order.length && !found; r++) {
    boards.forEach(b => {
        b.forEach((l, li) => l.forEach((c, ci) => {
                if (c == order[r]) {
                    b[li][ci] = -1;
                }
            })
        );

        var complete = false;
        for(var row = 0; row < 5; row++) {
            var completedColumn = true;
            for(var col = 0; col < 5; col++) {
                if (b[row][col] != -1) {
                    completedColumn = false;
                }
            }
            if (completedColumn) {
                complete = true;
            }
        }

        for(var col = 0; col < 5; col++) {
            var completedRow = true;
            for(var row = 0; row < 5; row++) {
                if (b[row][col] != -1) {
                    completedRow = false;
                }
            }
            if (completedRow) {
                complete = true;
            }
        }
        if (complete) {
            var sum = 0;
            b.forEach((l, li) => l.forEach((c, ci) => {
                if (b[li][ci] != -1) {
                    sum += b[li][ci];
                }
            }));
            console.log(r, sum * order[r], b);
            found = true;
        }
    });
}
