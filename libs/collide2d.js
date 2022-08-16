// https://github.com/bmoren/p5.collide2D/blob/856526a0d29678a00854ee2cd910b0ad40895d5f/p5.collide2d.js#L386


function collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4,calcIntersection) {

    var intersection;

    // calculate the distance to intersection point
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        if(this._collideDebug || calcIntersection){
            // calc the point where the lines meet
            var intersectionX = x1 + (uA * (x2-x1));
            var intersectionY = y1 + (uA * (y2-y1));
        }

        if(this._collideDebug){
            this.ellipse(intersectionX,intersectionY,10,10);
        }

        if(calcIntersection){
            intersection = {
                "x":intersectionX,
                "y":intersectionY
            }
            return intersection;
        }else{
            return true;
        }
    }
    if(calcIntersection){
        intersection = {
            "x":false,
            "y":false
        }
        return intersection;
    }
    return false;
}


function collideLinePoly(x1, y1, x2, y2, vertices) {

    // go through each of the vertices, plus the next vertex in the list
    var next = 0;
    for (var current=0; current<vertices.length; current++) {

        // get next vertex in list if we've hit the end, wrap around to 0
        next = current+1;
        if (next === vertices.length) next = 0;

        // get the PVectors at our current position extract X/Y coordinates from each
        var x3 = vertices[current].x;
        var y3 = vertices[current].y;
        var x4 = vertices[next].x;
        var y4 = vertices[next].y;

        // do a Line/Line comparison if true, return 'true' immediately and stop testing (faster)
        var hit = this.collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4);
        if (hit) {
            return true;
        }
    }
    // never got a hit
    return false;
}

