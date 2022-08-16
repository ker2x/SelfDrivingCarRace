class Track {
    // // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    constructor(xl, xr, yt, yb, N_cells) {
        this.voronoi = new Voronoi();
        this.bbox = {xl: xl, xr: xr, yt: yt, yb: yb};
        //console.table(this.bbox);
        this.collisionLine = [xr*0.25, xr*0.25, yb*0.75, yb*0.75]; // x1, x2, y1, y2
        this.N_cells = 10;
    }

    getVerticies(cell) {
        const cells = Array.isArray(cell) ? cell : [cell];
        let vertices = [];
        const edges = [];

        for (const cell of cells) {
            for (const halfedge of cell.halfedges) {
                if (!edges.includes(halfedge.edge)) edges.push(halfedge.edge);
                if (!vertices.includes(halfedge.edge.va)) vertices.push(halfedge.edge.va);
                if (!vertices.includes(halfedge.edge.vb)) vertices.push(halfedge.edge.vb);
            }
        }

        vertices = vertices.filter(function (v) {
            return edges.filter(e => v === e.va || v === e.vb).length == 2;
        });
        //console.table(vertices);

        const offX = -this.bbox.xr / 2,
            offY = -this.bbox.yb / 2;

        return vertices.sort((a, b) => Math.atan2(b.y + offY, b.x + offX) - Math.atan2(a.y + offY, a.x + offX));
    }


    generateTrack() {
        const sites = [];

        for (let i = 0; i < this.N_cells; i ++) {
            sites.push({x: Math.random() * this.bbox.xr, y: Math.random() * this.bbox.yb});
        }

        const diagram = this.voronoi.compute(sites, this.bbox);

        const seeds = diagram.cells.filter(cell => collideLinePoly(...this.collisionLine, this.getVerticies(cell)));
        //return this.getVerticies(seeds).map(v => [v.x, v.y]);
        return this.inflatePolygon(this.getVerticies(seeds).map(v => [v.x, v.y]), -10);

    }


    inflatePolygon(poly, spacing)
    {
        var geoInput = this.vectorCoordinates2JTS(poly);
        geoInput.push(geoInput[0]);

        var geometryFactory = new jsts.geom.GeometryFactory();

        var shell = geometryFactory.createPolygon(geoInput);
        var polygon = shell.buffer(spacing, jsts.operation.buffer.BufferParameters.CAP_FLAT);

        var inflatedCoordinates = [];
        var oCoordinates;
        oCoordinates = polygon._shell._points._coordinates;
        for (let i = 0; i < oCoordinates.length; i++) {
            var oItem;
            oItem = oCoordinates[i];
            inflatedCoordinates.push([oItem.x, oItem.y]);
        }
        return inflatedCoordinates;
    }

    vectorCoordinates2JTS (polygon) {
        var coordinates = [];
        for (var i = 0; i < polygon.length; i++) {
            coordinates.push(new jsts.geom.Coordinate(polygon[i][0], polygon[i][1]));
        }
        return coordinates;
    }

    draw(ctx, track) {
        //console.table(track);
        const poly = this.inflatePolygon(track, 70);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(track[0][0], track[0][1]);
        for (let i = 1; i < track.length; i++) {
            ctx.lineTo(track[i][0], track[i][1]);
        }
        ctx.lineTo(track[0][0], track[0][1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i][0], poly[i][1]);
        }
        ctx.lineTo(poly[0][0], poly[0][1]);
        ctx.stroke();
    }

}