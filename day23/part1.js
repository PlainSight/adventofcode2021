var fs = require('fs');

var grid = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(l => l.split(''));

var req = {
    'A': 1,
    'B': 10,
    'C': 100,
    'D': 1000
};

var allowedDests = [1, 2, 4, 6, 8, 10, 11];

function findMoves(pieces) {
    var moves = [];
    pieces.forEach((piece, i) => {
        if (!piece.fin) {
            var potentialBlockers = pieces.filter(p => p.moved && !p.fin);
            if (piece.moved) {
                // find moves for moved piece
                var destBlockers = pieces.filter(p => p.x == piece.destCol && piece.letter != p.letter);
                var hallBlockers = potentialBlockers.filter(p => (piece.destCol >= p.x && p.x > piece.x) || (piece.destCol <= p.x && p.x < piece.x));
                if (destBlockers.length == 0 && hallBlockers.length == 0) {
                    // put in destination
                    if (pieces.filter(p => p.x == piece.destCol && p.y == 3 && p.fin).length == 0) {
                        moves.push({ id: i, x: piece.destCol, y: 3, cost: (2+Math.abs(piece.destCol-piece.x))*req[piece.letter] });
                    } else {
                        moves.push({ id: i, x: piece.destCol, y: 2, cost: (1+Math.abs(piece.destCol-piece.x))*req[piece.letter] });
                    }
                }
            } else {
                // find moves for unmoved piece
                if (pieces.filter(p => p.x == piece.x && p.y < piece.y).length == 0) {
                    allowedDests.filter(d => {
                        return potentialBlockers.filter(b => (piece.x < b.x && b.x <= d) || (piece.x > b.x && b.x >= d)).length == 0;
                    }).forEach(d => {
                        moves.push({ id: i, x: d, y: 1, cost: ((piece.y-1)+Math.abs(d - piece.x))*req[piece.letter] });
                    })
                }
            }
        }
    });
    return moves.sort((a, b) => a.cost - b.cost);
}

var leastEnergy = Infinity;

var cache = {};

function k(pieces) {
    var strings = {
        'A': [],
        'B': [],
        'C': [],
        'D': []
    };
    pieces.forEach(p => {
        strings[p.letter].push({ x: p.x, y: p.y });
    })
    return Object.values(strings).map(v => v.sort((a, b) => b.x - a.x ).sort((a, b) => b.y - a.y).map(vv => vv.x+','+vv.y).join(':')).join('|');
}

function explore(pieces, cost, dep) {
    var key = k(pieces);
    if (cost >= leastEnergy) {
        return;
    }
    if (cost >= cache[key]) {
        return;
    } else {
        cache[key] = cost;
    }
    if (pieces.filter(p => !p.fin).length == 0) {
        if (cost < leastEnergy) {
            leastEnergy = cost;
        }
        return;
    }
    var moves = findMoves(pieces);
    var stringified = JSON.stringify(pieces);
    moves.forEach(m => {
        var newPieces = JSON.parse(stringified);
        var ap = newPieces[m.id];
        if (m.x == ap.destCol) {
            ap.fin = true;
            ap.midx = ap.x;
            ap.midy = ap.y;
            ap.endturn = dep;
        } else {
            ap.midturn = dep;
        }
        ap.x = m.x;
        ap.y = m.y;
        ap.moved = true;
        ap.cost += m.cost;
        
        explore(newPieces, cost+m.cost, dep+1);
    })
}

function atDest(p) {
    p.fin = false;
    if (p.x == p.destCol) {
        if (p.y == 3) {
            p.fin = true;
        }
    }
}

{
    var pieces = [];
    for(var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (/[A-D]/.test(grid[y][x])) {
                var tile = /([A-D])/.exec(grid[y][x])[1];
                var destCol = 0;
                switch (tile) {
                    case 'A': 
                        destCol = 3;
                        break;
                    case 'B': 
                        destCol = 5;
                        break;
                    case 'C': 
                        destCol = 7;
                        break;
                    case 'D': 
                        destCol = 9;
                        break;
                }
                var piece = {
                    letter: tile,
                    x: x,
                    y: y,
                    destCol: destCol,
                    moved: false,
                    cost: 0
                };
                atDest(piece);
                pieces.push(piece);
            }
        }
    }

    explore(pieces, 0, 0);

    console.log(leastEnergy);
}

