var netWork, djkIterator;

var debuging = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    netWork = new Network(windowWidth, windowHeight); // Create the network, full size

    noLoop(); // No need to update the screen if nothing is changing => manual update
}

function keyPressed(event) {
    if (event.key == " "){ // When space pressed
        if (djkIterator == undefined) { // If dijkstra algo not started
            djkIterator = netWork.dijkstra(); // Start it
        }
        let f = djkIterator.next(); // Go to the next phase of the algo
        if (debuging) { // if debuging, print the value yield by dijkstra
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
}

function mouseClicked() { // if mouse clicked
    let mousePos = createVector(mouseX, mouseY);

    for (let node of netWork.nodes) { // for each node of the network
        if (mousePos.dist(node.pos) <= node.sizeHalf) { // If mouse inside the node
            netWork.reset(); // Reset current state of the nodes and links to normal
            djkIterator = undefined; // Clear the dijkstra iterator
            netWork.updateRootNode(node); // Update the rootnode

            draw(); // update the screen
            break;
        }
    }
}

function draw() {
    background(color(240));
    netWork.show();
}