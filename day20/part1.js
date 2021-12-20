var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

var iea = input[0].split('');

var inputImage = input[1].split('\r\n').map(n => n.split(''));

var image = inputImage;

function extractPixelNumber(xx, yy, image, mod) {
    var minx = xx-1;
    var maxx = xx+1;
    var miny = yy-1;
    var maxy = yy+1;
    var num = 0;
    for(var y = miny; y <= maxy; y++) {
        for(var x = minx; x <= maxx; x++) {
            if (x < 0 || y < 0 || x >= image[0].length || y >= image.length) {
                num = num << 1;
                num += mod;
            } else {
                num = num << 1;
                num += image[y][x] == '#' ? 1 : 0;
            }
        }
    }
    return num;
}

for(var e = 0; e < 2; e++) {
    var newImage = [];
    for (var y = -3; y < image.length +3; y++) {
        var newImageLine = [];
        for (var x = -3; x < image[0].length +3; x++) {
            var num = extractPixelNumber(x, y, image, e % 2);
            newImageLine.push(iea[num]);
        }
        newImage.push(newImageLine);
    }
    image = newImage;
}

var count = 0;

image.forEach(l => {
    count += l.filter(r => r == '#').length;
    //console.log(l.join(''));
})

console.log(count);