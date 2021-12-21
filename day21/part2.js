var fs = require('fs');

var states = [
    { turn: 0, count: 1, finishing: false, scores: [0, 0], positions: [4, 9], key: '4,9:0,0:0' }
];

var rollResults = {};

for(var a = 1; a < 4; a++) {
    for(var b = 1; b < 4; b++) {
        for(var c = 1; c < 4; c++) {
            rollResults[a+b+c] = (rollResults[a+b+c] || 0) + 1;
        }
    }
}

console.log(rollResults);

var finishedStates = [];

function addStates(turn) {
    var newStates = {};

    function addState(scores, positions, t, count) {
        var key = positions.join(',') + ':' + scores.join(',') + ':' + t;

        var existing = newStates[key];

        if (existing) {
            existing.count += count;
        } else {
            var finishing = scores.filter(s => s >= 21).length != 0;
            var winner = scores.findIndex(s => s >= 21);
            var newState = {
                turn: turn,
                count: count,
                finishing: finishing,
                scores: [...scores],
                positions: [...positions]
            }
            if (winner != -1) {
                newState.winner = winner;
            }
            newStates[key] = newState;
        }
    }

    states.filter(s => !s.finishing).forEach(s => {
        // add new states for all existing states
        Object.keys(rollResults).forEach(rr => {
            var move = parseInt(rr);
            var mul = rollResults[rr];

            var newPositions = s.positions.map((p, i) => turn%2 == i ? (p + move) % 10 : p);
            var newScores = s.scores.map((s, i) => turn%2 == i ? s + newPositions[i] + 1 : s);

            addState(newScores, newPositions, turn+1, s.count*mul);
        })
    });

    var newStatesArray = Object.values(newStates);
    finishedStates.push(...newStatesArray.filter(s => s.finishing));
    states = newStatesArray.filter(s => !s.finishing);
}

var turn = 0;
var unfinishedStates = 1;
while (unfinishedStates > 0) {
    addStates(turn);

    turn++;
    unfinishedStates = states.length; 
    console.log(turn, states.length);
}

var results = finishedStates.reduce((a, c) => {
    var res = [...a];
    res[c.winner] += c.count;
    return res;
}, [0, 0]);

console.log(results);