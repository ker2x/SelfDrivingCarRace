/*
    Credits & stuff
 */


// Create & configure main canvas
const mainCanvas = document.getElementById('mainCanvas');
mainCanvas.height = window.innerHeight;
// noinspection JSSuspiciousNameCombination
mainCanvas.width = mainCanvas.height; // square canvas
const mainCtx = mainCanvas.getContext('2d');

// Start the program
setup();

// setup
function setup() {
    update(); // Call update at least once before calling it in a loop (may be removed in the future)
    setInterval(update, 1000/60); // 60 fps (for now, so that it doesn't run too fast too debug)
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

    // call this function again next frame
    requestAnimationFrame(draw);
}