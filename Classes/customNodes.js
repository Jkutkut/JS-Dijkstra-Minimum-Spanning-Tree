class cNode {
    static PHASE = {
        NORMAL: 0,
        SELECTED: 1,
        VALID: 2
    }
    static PHASES = [
        "NORMAL",
        "SELECTED",
        "VALID"
    ];
    static COLORS = {
        NORMAL: [54, 235, 255, 180],
        SELECTED: [252, 164, 40],
        VALID: [22, 242, 140, 250]
    };

    constructor (pos, id=0, size) {
        this.pos = pos;
        this.id = id;
        this.phase = 0;

        this.size = size;
        this.sizeHalf = this.size * 0.5;
        this.textOffset = - this.size * 0.1;

        // connections
        this.nodesConnected = new Set();
        this.connections = new Set();

        //Dijkstra:
        this.costToRoot = null;
        this.wayToRoot = null;
    }

    show() {
        push();
            translate(this.pos);
            fill(...this.color);
            ellipse(0, 0, this.size);

            fill(0);
            
            text(this.id, this.textOffset, this.textOffset, this.sizeHalf, this.sizeHalf)
        pop();
    }

    drawConnections() {
        // this code is to make the arrow point
        for (let arrow of this.connections) {
            arrow.show();
        }
    }

    // GETTERS AND SETTERS
    dist(mateNode) {
        return this.pos.dist(mateNode.pos);
    }

    get color() {
        return this.constructor.COLORS[this.phaseName];
    }

    get phaseName() {
        return this.constructor.PHASES[this.phase];
    }

    set newPhase(newP) {
        this.phase = newP;
    }

    get getMates() {
        // return this.nodesConnected;
        let mates = new Set();
        for (let node of this.nodesConnected) {
            if (node.phase == cNode.PHASE.NORMAL) {
                mates.add(node);
            }
        }
        return mates;
    }

    connectedToNode(node) {
        return this.nodesConnected.has(node);
    }

    set defineCost(c) {
        this.costToRoot = c;
    }

    setCost(originNode, extraCost) {
        this.costToRoot = originNode.cost + extraCost;
        this.wayToRoot = originNode;
    }

    costToNode(nodeToFind) {
        if (!this.connectedToNode(nodeToFind)) {
            console.log("Not found");
            return null;
        }

        for (let a of this.connections) {
            if (a.aimsToNode(nodeToFind)) {
                return a.cost;
            }
        }
        return Infinity;

    }

    addConnection(destination) {
        if (this.nodesConnected.has(destination)) {
            console.warn("already in");
            return
        }
        if (this == destination) {
            console.warn("same node as destination")
            return
        }
        this.connections.add(new Arch(this, destination));
        this.nodesConnected.add(destination)
    }

    resetConnections() {
        this.nodesConnected = new Set();
        this.connections = new Set();
    }
}