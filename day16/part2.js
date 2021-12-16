var fs = require('fs');

var bits = [];

fs.readFileSync('./input.txt', 'utf8').split('').forEach(c => {
    var n = 0;
    if(/[A-F]/.test(c)) {
        n = 10 + c.charCodeAt(0) - 'A'.charCodeAt(0);
    } else {
        n = parseInt(c);
    }
    bits.push((n >> 3) & 1);
    bits.push((n >> 2) & 1);
    bits.push((n >> 1) & 1);
    bits.push(n & 1);
});

var index = 0;

function parseVersion() {
    var r = (bits[index] << 2) + (bits[index+1] << 1) + (bits[index+2]);
    index += 3;
    return r;
}

function parseTypeId() {
    var r = (bits[index] << 2) + (bits[index+1] << 1) + (bits[index+2]);
    index += 3;
    return r;
}

function parseLengthTypeId() {
    var r = bits[index];
    index++;
    return r;
}

function parseLiteral() {
    var cont = 0;
    var number = 0;
    do {
        cont = bits[index];
        number = number * 2;
        index++;
        number += bits[index];
        number = number * 2;
        index++;
        number += bits[index];
        number = number * 2;
        index++;
        number += bits[index];
        number = number * 2;
        index++;
        number += bits[index];
        index++;
    } while (cont == 1);
    return number;
}

function parseNumberOfPackets() {
    var num = 0;
    for(var i = 0; i < 11; i++) {
        num = num << 1;
        num += bits[index];
        index++;
    }
    return num;
}

function parseLengthOfPackets() {
    var num = 0;
    for(var i = 0; i < 15; i++) {
        num = num << 1;
        num += bits[index];
        index++;
    }
    return num;
}

function parseOperator(f) {
    var pks = [];
    var lengthTypeId = parseLengthTypeId();
    if (lengthTypeId == 1) {
        // 11 bits = number of packets
        var num = parseNumberOfPackets();
        for (var i = 0; i < num; i++) {
            var p = parsePacket();
            pks.push(p);
        }
    } else {
        // 15 bits = length of all subpackets
        var len = parseLengthOfPackets();
        var start = index;
        while (index - start < len) {
            var p = parsePacket();
            pks.push(p);
        }
    }
    return f(pks);
}

function parsePacket() {
    var version = parseVersion();
    var type = parseTypeId();
    switch (type) {
        case 0: // sum
            return parseOperator((a) => {
                var r = a.reduce((p, c) => {
                    return p + c;
                }, 0);
                return r;
            });
        case 1: // product
            return parseOperator((a) => {
                var r = a.reduce((p, c) => {
                    return p * c;
                }, 1);
                return r;
            });
        case 2: // minimum
            return parseOperator((a) => {
                return Math.min(...a);
            });
        case 3: //maximum
            return parseOperator((a) => {
                return Math.max(...a);
            });
        case 4: 
            var l = parseLiteral();
            return l;
        case 5: // greater than
            return parseOperator((a) => {
                return a[0] > a[1] ? 1 : 0;
            });
        case 6: // less than
            return parseOperator((a) => {
                return a[0] < a[1] ? 1 : 0;
            });
        case 7: // equal to
            return parseOperator((a) => {
                return a[0] == a[1] ? 1 : 0;
            });
    }
}

var val = parsePacket();
console.log(val);