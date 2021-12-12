var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var connections = {};

input.forEach(i => {
    var parts = i.split('-');

    connections[parts[0]] = (connections[parts[0]] || []);
    connections[parts[0]].push(parts[1]);

    connections[parts[1]] = (connections[parts[1]] || []);
    connections[parts[1]].push(parts[0]);
})

console.log(connections);

var paths = 0;

function explore(next, visited) {
    if (next == 'end') {
        paths++;
        return;
    }
    var newVisited = JSON.parse(JSON.stringify(visited));
    if (visited.v.includes(next)) {
        newVisited.t = true;
    } else {
        if (/[a-z]+/.test(next)) {
            newVisited.v.push(next);
        }
    }

    connections[next].forEach(c => {
        if ((!newVisited.v.includes(c) || !newVisited.t) && c != 'start') {
            explore(c, newVisited);
        }
    })
}

explore('start', { v: [], t: false});

console.log(paths);