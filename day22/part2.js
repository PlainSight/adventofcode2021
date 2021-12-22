var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var regions = [];

function within(x, x1, x2) {
    return x <= x2 && x >= x1;
}

function overlap(xmin1, xmax1, xmin2, xmax2) {
    return within(xmin1, xmin2, xmax2) || within(xmax1, xmin2, xmax2) || within(xmin2, xmin1, xmax1) || within(xmax2, xmin1, xmax1);
}

function overlapPoints (xmin1, xmax1, xmin2, xmax2) {
    var temp = [xmin1, xmax1, xmin2, xmax2].sort((a, b) => a - b).slice(1, 3);
    return { min: temp[0], max: temp[1] };
}

function splitRegion(region, xSplit, ySplit, zSplit) {
    var newRegions = [];
    var xDivs = [];
    var yDivs = [];
    var zDivs = [];

    xDivs.push(region.xMin);
    yDivs.push(region.yMin);
    zDivs.push(region.zMin);

    // split defines the starting point of each split
    // end is defined by the next element -1

    if (xSplit.min != region.xMin) {
        xDivs.push(xSplit.min);
    }
    if (xSplit.max != region.xMax) {
        xDivs.push(xSplit.max+1);
    }
    if (ySplit.min != region.yMin) {
        yDivs.push(ySplit.min);
    }
    if (ySplit.max != region.yMax) {
        yDivs.push(ySplit.max+1);
    }
    if (zSplit.min != region.zMin) {
        zDivs.push(zSplit.min);
    }
    if (zSplit.max != region.zMax) {
        zDivs.push(zSplit.max+1);
    }

    xDivs.push(region.xMax+1);
    yDivs.push(region.yMax+1);
    zDivs.push(region.zMax+1);

    for(var x = 0; x < xDivs.length-1; x++) {
        for(var y = 0; y < yDivs.length-1; y++) {
            for(var z = 0; z < zDivs.length-1; z++) {
                newRegions.push({
                    xMin: xDivs[x],
                    xMax: xDivs[x+1]-1,
                    yMin: yDivs[y],
                    yMax: yDivs[y+1]-1,
                    zMin: zDivs[z],
                    zMax: zDivs[z+1]-1,
                    on: region.on
                });
            }
        }
    }

    
    // console.log('splits', xSplit, ySplit, zSplit);
    // console.log('chop', region, xDivs, yDivs, zDivs);
    // console.log('new', newRegions);

    return newRegions;
}

input.forEach((i, iter) => {
    console.log('iter', iter);
    //on x=10..12,y=10..12,z=10..12
    var parts = /([a-z]+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/.exec(i);
    var on = parts[1] == 'on';
    var xMin = parseInt(parts[2]);
    var xMax = parseInt(parts[3]);
    var yMin = parseInt(parts[4]);
    var yMax = parseInt(parts[5]);
    var zMin = parseInt(parts[6]);
    var zMax = parseInt(parts[7]);

    var newRegion = {
        xMin,
        xMax,
        yMin,
        yMax,
        zMin,
        zMax,
        on: on
    };

    var stackOfNewRegions = [newRegion];

    while(stackOfNewRegions.length) {
        //console.log('stack', stackOfNewRegions.length, regions.length, regions);
        var top = stackOfNewRegions.pop();

        var noOverlap = true;

looper: for(var rr = 0; rr < regions.length; rr++) {
            var r = regions[rr];

            var xOverlap = overlap(top.xMin, top.xMax, r.xMin, r.xMax);
            var yOverlap = overlap(top.yMin, top.yMax, r.yMin, r.yMax);
            var zOverlap = overlap(top.zMin, top.zMax, r.zMin, r.zMax);

            if (xOverlap && yOverlap && zOverlap) {
                //console.log('overlap', top, r);
                noOverlap = false;
                var xPoints = overlapPoints(top.xMin, top.xMax, r.xMin, r.xMax);
                var yPoints = overlapPoints(top.yMin, top.yMax, r.yMin, r.yMax);
                var zPoints = overlapPoints(top.zMin, top.zMax, r.zMin, r.zMax);

                // chop both the new region and the existing region into points
                var newExistingRegions = splitRegion(r, xPoints, yPoints, zPoints);
                var newRegions = splitRegion(top, xPoints, yPoints, zPoints);

                // trim duplicate existing regions
                newExistingRegions = newExistingRegions.filter(ner => {
                    var ol = false;
                    newRegions.forEach(nr => {
                        if (ner.xMin == nr.xMin &&
                            ner.xMax == nr.xMax &&
                            ner.yMin == nr.yMin &&
                            ner.yMax == nr.yMax &&
                            ner.zMin == nr.zMin &&
                            ner.zMax == nr.zMax) {
                                ol = true;
                            }
                    });
                    return ol == false && ner.on;
                });
                regions.splice(rr, 1);
                //console.log('rrr1', regions)
                regions.push(...newExistingRegions);
                //console.log('rrr2', regions)
                stackOfNewRegions.push(...newRegions);
                
                break looper;
            }
        }

        if (noOverlap && top.on) {
            regions.push(top);
        }
    }
});

console.log('fin', regions.reduce((a, c) => {
    if (c.on) {
        return a + ((1+c.xMax-c.xMin)*(1+c.yMax-c.yMin)*(1+c.zMax-c.zMin));
    }
    return a;
}, 0));