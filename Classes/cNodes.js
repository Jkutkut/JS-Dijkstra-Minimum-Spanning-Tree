class cNode {
    static PHASE = {
        NORMAL: 0,
        SELECTED: 1,
        VALID: 2
    }
    static PHASESNAMES = [
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

    // ID
    /**
     * Returns the node current ID
     * @returns {any} Current ID
     */
    get id() {
        return this.IDvalue;
    }
    /**
     * Overwrites the current ID of the node. This ID is just visual, so any ID is valid.
     * @param newID {any} New ID
     */
    set id(newID) {
        this.IDvalue = newID;
    } 

    // position
    /**
     * @returns {p5.Vector} Current position of the node as a p5.Vector.
     */
    get pos() {
        return this.position;
    }
    /**
     * Changes the position of the node
     * @param newPos {p5.Vector} New desired position
     * @throws Error if the input is not a valid p5.Vector
     */
    set pos(newPos) {
        if (!newPos instanceof p5.Vector) {
            throw new Error("The new position must be a p5.Vector");
        }
        this.position = newPos;
    }

    // phase
    /**
     * Gets the current phase of the node
     */
    get phase() {
        return this.currentPhase;
    }
    /**
     * Changes the phases of the node
     * @param newPhase {number} int value of the desired phase
     * @throws Error if phase not valid
     */
    set phase(newPhase) {
        if (Number.isInteger(newPhase) && (newPhase > 0 && newPhase < this.PHASES.length)){
            throw new Error("The new phase must be a " + this.constructor.name + ".PHASE.X value");
        }
        this.currentPhase = newPhase;
    }
    get phaseName() {
        return this.constructor.PHASESNAMES[this.phase];
    }

    // physical
    /**
     * Returns current distance in pixels to the selected node.
     * @param {cNode} mateNode desired node
     * @returns Distance in pixels to the selected node
     */
    dist(mateNode) {
        return this.pos.dist(mateNode.pos);
    }

    /**
     * Returns the current color of the node based on it's phase property.
     */
    get color() {
        return this.constructor.COLORS[this.phaseName];
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