/*
    Credits, thanks & stuff :
    - voronoi lib : https://github.com/gorhill/Javascript-Voronoi
    - main algo for track generation : https://openprocessing.org/sketch/863495/
    - JS topology suite : https://github.com/bjornharrtell/jsts
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
    trackGen = new Track();
    track = trackGen.generateTrack();
    console.table(track);

    update(); // Call update at least once before calling it in a loop (it may be removed in the future)
    setInterval(update, 1000/60); // 60 fps (for now, so that it doesn't run too fast to debug)
    requestAnimationFrame(draw);  // draw every frame
}

// update (potentially, and hopefully, many updates per drawn frame)
// this is not fps independent, it should update as fast as possible regardless of fps
function update() {

}

// draw
function draw() {
    // clear the canvas
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    // draw stuff
    trackGen.draw(mainCtx, track, mainCanvas.width);

    // call this function again next frame
    requestAnimationFrame(draw);
}