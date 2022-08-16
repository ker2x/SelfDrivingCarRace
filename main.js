/*
    Credits, thanks & stuff :
    - voronoi lib : https://github.com/gorhill/Javascript-Voronoi
    - main algo for track generation : https://openprocessing.org/sketch/863495/
    - JS topology suite : https://github.com/bjornharrtell/jsts
    - collide2d : https://github.com/bmoren/p5.collide2D/blob/856526a0d29678a00854ee2cd910b0ad40895d5f/p5.collide2d.js#L386
    - convex hull : https://www.nayuki.io/page/convex-hull-algorithm
    - it may be full of jetbrains inspection directives, don't worry about it
 */


// Create & configure main canvas
const mainCanvas = document.getElementById('mainCanvas');
mainCanvas.height = window.innerHeight;
// noinspection JSSuspiciousNameCombination
mainCanvas.width = mainCanvas.height; // square canvas

const mainCtx = mainCanvas.getContext('2d');

let trackGen;
let track;

// Start the program
setup();

// setup
function setup() {
    trackGen = new Track(
        mainCanvas.width * 0.1,
        mainCanvas.width * 0.9,
        mainCanvas.width * 0.1,
        mainCanvas.width * 0.9,
        20);
    track = trackGen.generateTrack();
    //console.table(track);

    update(); // Call update at least once before calling it in a loop (it may be removed in the future)
    setInterval(update, 1000/6); // 60 fps (for now, so that it doesn't run too fast to debug)
    requestAnimationFrame(draw);  // draw every frame
}

// update (potentially, and hopefully, many updates per drawn frame)
// this is not fps independent, it should update as fast as possible regardless of fps
function update() {
    track = trackGen.generateTrack();

}

// draw
function draw() {
    // clear the canvas
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    // draw stuff
    trackGen.draw(mainCtx, track);

    // call this function again next frame
    requestAnimationFrame(draw);
}