var netWork, djkIterator;

function setup() {
    createCanvas(windowWidth, windowHeight);
    netWork = new Network(windowWidth, windowHeight);
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