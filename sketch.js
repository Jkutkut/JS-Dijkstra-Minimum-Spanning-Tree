var mainCanvasHeight, mainCanvasWidth;
var netWork;

function setup() {
    
    let multiplierW = 0.995;
    let multiplierH = 0.975;
    mainCanvasHeight = windowHeight * multiplierH;
    mainCanvasWidth = windowHeight / 9 * 16 * multiplierW;
    
    if (mainCanvasWidth > windowWidth) {
        mainCanvasHeight = mainCanvasWidth * 9 / 16 * multiplierH;
        mainCanvasWidth = windowWidth * multiplierW;
    }

    
    createCanvas(mainCanvasWidth, mainCanvasHeight);

    netWork = new Network(mainCanvasWidth, mainCanvasHeight);
}



function draw() {
    background(color(240));
    netWork.show();
    noLoop();
}