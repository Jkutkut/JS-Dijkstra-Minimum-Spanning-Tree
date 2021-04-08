var mainCanvasHeight, mainCanvasWidth;
const ELEM = 12;
const R = 200;

const SHAPE = [
    {R: 100, ELEM: 6},
    {R: 200, ELEM: 6},
    {R: 300, ELEM: 6}
];


var nodes = [];
var NODESIZE;


function setup() {
    mainCanvasWidth = windowWidth;
    mainCanvasHeight = windowWidth * 9 / 16;
    
    if (mainCanvasHeight > windowHeight) {
        mainCanvasWidth = windowHeight * 16 / 9;
        mainCanvasHeight = windowHeight;
    }

    NODESIZE = Math.floor(mainCanvasWidth / 25);

    createCanvas(mainCanvasWidth, mainCanvasHeight);


    // createNodesFromArray(SHAPE);
    createRandomNodes(40, NODESIZE * 3);
    createCloseConnections(NODESIZE * 5);

    nodes[0].phase = cNode.PHASE.VALID;
}



function draw() {
    background(color(240));
    for (let arrow of nodes) {
        arrow.drawConnections();
    }
    for (let node of nodes) {
        node.show();
    }

}


// create nodes:

function createRandomNodes(N, R) {
    let MAXATTEMPS = 1000;
    let attempt, pos, node;
    let index = 0;
    for (let i = 0; i < N; i++) {
        validNode = false;
        attempt = 0;
        while (!validNode && attempt++ < MAXATTEMPS) {
            validNode = true;
            pos = createVector(
                Math.floor(Math.random() * (mainCanvasWidth - NODESIZE * 2)) + NODESIZE,
                Math.floor(Math.random() * (mainCanvasHeight - NODESIZE * 2)) + NODESIZE
            );
            node = new cNode(pos, index, NODESIZE);
            for (let otherNode of nodes) {
                if (otherNode.dist(node) <= R) {
                    validNode = false;
                    break;
                }
            }
        }
        if (validNode) {
            nodes.push(node);
            index++;
        }
    }
}

function createNodesFromArray(arr) {
    let center = createVector(mainCanvasWidth / 2, mainCanvasHeight / 2);
    nodes = [new cNode(center, 0, NODESIZE)];
    let angle, pos;
    let index = 1;
    let ite = 0;
    for (let lvl of arr) {
        for (let deltaTheta = 0; Math.PI * 2 - deltaTheta >= 0.01; deltaTheta += 2 * Math.PI / lvl.ELEM) {
            angle = (ite * PI / 11) + deltaTheta;

            pos = createVector(lvl.R * Math.cos(angle), lvl.R * Math.sin(angle));

            pos.add(center);

            let nod = new cNode(pos, index++, NODESIZE);
            nodes.push(nod);
        }
        ite++;
    }
}

// create connections:

function createRandomConnections(multiplicator=0.1) {
    for (let node of nodes) {
        let len = getRandomIndex(multiplicator);
        console.log(len);
        for (let i = 0; i < len + 1; i++) {
            do {
                index = getRandomIndex();
            } while (nodes[index] == node)
            node.addConnection(nodes[index]);
        }
    }
}

function getRandomIndex(multiplicator = 1) {
    return Math.floor(Math.random() * nodes.length * multiplicator)
}

function createCloseConnections(maxDistance) {
    for (let node of nodes) {
        for (let mateNode of nodes) {
            if (mateNode == node) {
                continue
            }
            if (node.dist(mateNode) <= maxDistance) {
                node.addConnection(mateNode)
            }
        }
    }
}

// clear functions:

function clearBoard() {
    clearConections();
    clearNodes();
}

function clearNodes() {
    nodes = [];
}

function clearConections() {
    for (let node of nodes) {
        node.resetConnections();
    }
}