var mainCanvasHeight, mainCanvasWidth;
var netWork, djkIterator;

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

function keyPressed(event) {
    if (event.key == " "){
        if (djkIterator == undefined) {
            djkIterator = netWork.dijkstra();
        }
        let f = djkIterator.next();
        let v = f.value;
        if (v instanceof NetworkNode) {
            console.log(v.id);
        }
        else if (v instanceof PQueue) {
            console.log(v);
        }
        else if (v instanceof NodeLink) {
            console.log(v.toString());
        }
        else {
            console.log(f);
        }
    }
}

function mouseClicked() {
    let mousePos = createVector(mouseX, mouseY);

    for (let node of  netWork.nodes) {
        if (mousePos.dist(node.pos) <= node.sizeHalf) {
            netWork.reset();
            djkIterator = undefined;
            netWork.updateRootNode(node);

            draw();
            break;
        }
    }
}

function draw() {
    background(color(240));
    netWork.show();
    noLoop();
}