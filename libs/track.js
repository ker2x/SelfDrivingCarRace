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


        const offX = -this.bbox.xr / 2,
            offY = -this.bbox.yb / 2;

        return vertices.sort((a, b) => Math.atan2(b.y + offY, b.x + offX) - Math.atan2(a.y + offY, a.x + offX));
    }


    generateTrack() {
        const sites = [];

        for (let i = 0; i < this.N_cells; i ++)
            //sites.push({x: new Math.random(this.bbox.xr), y: Math.random(this.bbox.yb)});
            sites.push({x: Math.random() * this.bbox.xr, y: Math.random() * this.bbox.yb});

        const diagram = this.voronoi.compute(sites, this.bbox);
        const seeds = diagram.cells.filter(cell => collideLinePoly(...this.collisionLine, this.getVerticies(cell)));

        return this.getVerticies(seeds).map(v => {v.x, v.y});
    }


    inflatePolygon(poly, spacing)
    {
        var geoInput = vectorCoordinates2JTS(poly);
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
            inflatedCoordinates.push({x: oItem.x, y: oItem.y});
        }
        return inflatedCoordinates;
    }

    vectorCoordinates2JTS (polygon) {
        var coordinates = [];

        for (var i = 0; i < polygon.length; i++) {
            coordinates.push(new jsts.geom.Coordinate(polygon[i].x, polygon[i].y));
        }
        return coordinates;
    }

    draw(ctx) {

    }

}