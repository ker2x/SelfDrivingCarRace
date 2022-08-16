class Track {
    constructor() {
        this.voronoi = new Voronoi();
        this.bbox = {xl: 0, xr: 1, yt: 0, yb: 1};
        this.collisionLine = [0.25, 0.5, 0.75, 0.5];
        this.N_cells = 20;
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
            //sites.push({x: new Math.random(this.bbox.xr), y: Math.random(this.bbox.yb)});
            sites.push({x: Math.random() * this.bbox.xr, y: Math.random() * this.bbox.yb});
        }
        //console.table(sites);

        const diagram = this.voronoi.compute(sites, this.bbox);
        //console.table(diagram.cells);

        const seeds = diagram.cells.filter(cell => collideLinePoly(...this.collisionLine, this.getVerticies(cell)));
        //console.table(seeds);
        return this.getVerticies(seeds).map(v => [v.x, v.y]);
        //console.table(test);
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

    draw(ctx, track, size) {
        const poly = this.inflatePolygon(track, 0.1);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(track[0][0] * size, track[0][1]* size);
        for (let i = 1; i < track.length; i++) {
            ctx.lineTo(track[i][0]* size, track[i][1]* size);
        }
        ctx.lineTo(track[0][0]* size, track[0][1]*size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(poly[0][0] * size, poly[0][1]* size);
        for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i][0]* size, poly[i][1]* size);
        }
        ctx.lineTo(poly[0][0]* size, poly[0][1]*size);
        ctx.stroke();
    }

}