var mainCanvasHeight, mainCanvasWidth;
const ELEM = 12;
const R = 200;

const SHAPE = [
    {R: 100, ELEM: 6},
    {R: 200, ELEM: 3},
    {R: 300, ELEM: 12}
]


var nodes;
const NODESIZE = 50;


function setup() {
    mainCanvasWidth = windowWidth;
    mainCanvasHeight = windowWidth * 9 / 16;
    
    if (mainCanvasHeight > windowHeight) {
        mainCanvasWidth = windowHeight * 16 / 9;
        mainCanvasHeight = windowHeight;
    }

    createCanvas(mainCanvasWidth, mainCanvasHeight);


    let center = createVector(mainCanvasWidth / 2, mainCanvasHeight / 2);


    nodes = [];

    nodes.push(new Node(center, 0, NODESIZE));
    nodes[0].addConnection(new Node(createVector(100, 0).add(center), -1, NODESIZE));


    // let deltaTheta = 2 * Math.PI / ELEM;
    let angle, pos;
    let index = 0;

    for (let lvl of SHAPE) {
        for (let deltaTheta = 0; deltaTheta < Math.PI * 2; deltaTheta += 2 * Math.PI / lvl.ELEM) {
            angle = 0 + deltaTheta;

            pos = createVector(lvl.R * Math.cos(angle), lvl.R * Math.sin(angle));

            pos.add(center);

            nodes.push(new Node(pos, index++, NODESIZE))
        }
    }


}



function draw() {
    background(color(200));
    for (let arrow of nodes) {
        arrow.drawConnections();
    }
    for (let node of nodes) {
        node.show();
    }

}