class NetworkNode {
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
        VALID: [22, 242, 140, 250],
        ROOT: [0, 132, 255, 180]
    };

    constructor (pos, id=0, size) {
        this.pos = pos;
        this._id = id;
        this.currentPhase = 0;

        this.size = size;
        this.sizeHalf = this.size * 0.5;
        this.textOffset = - this.size * 0.1;

        // connections
        this.nodesConnected = new Set();
        this._links = new Set();

        //Dijkstra:
        this.wayToRoot = undefined;
    }

    /**
     * Draws the node on the p5.Canvas
     */
    show() {
        push();
            translate(this.pos);
            fill(...this.color);
            ellipse(0, 0, this.size);

            fill(0);
            
            text(this.id, this.textOffset, this.textOffset, this.sizeHalf, this.sizeHalf)
        pop();
    }

    /**
     * Draws all the connections to other nodes
     */
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
        return this._id;
    }

    // position
    /**
     * @returns {p5.Vector} Current position of the node as a p5.Vector.
     */
    get pos() {
        return this._pos;
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
        this._pos = newPos;
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
    // set phase(newPhase) {
    //     if (!Number.isInteger(newPhase) || !(newPhase >= 0 && newPhase < NetworkNode.PHASESNAMES.length)){
    //         throw new Error("The new phase must be a " + this.constructor.name + ".PHASE.X value");
    //     }
    //     this.currentPhase = newPhase;
    //     this.show();
    // }
    /**
     * Returns the String equivalent of the current phase of the node.
     */
    get phaseName() {
        return NetworkNode.PHASESNAMES[this.phase];
    }

    // cost
    /**
     * Returns the cost to reach this node from RootNode
     * @returns the cost or infinity if the nodeToRoot is not defined
     */
    // get cost() {
    //     if (this.nodeToRoot == null) {
    //         return Infinity;
    //     }
    //     return this.nodeToRoot.costToNode(this);
    // }

    /**
     * returns the cost to reach a particular node connected to this one.
     * @param {NetworkNode} nodeToFind 
     * @returns the cost to that node or null if not connected.
     */
    // costToNode(nodeToFind) {
    //     if (!this.connectedToNode(nodeToFind)) {
    //         console.log("Not found");
    //         return null;
    //     }

    //     for (let a of this.connections) {
    //         if (a.aimsToNode(nodeToFind)) {
    //             return this.cost + a.cost;
    //         }
    //     }
    //     throw Error("Node connected but cost not found!");
    // }

    // node
    
    // set nodeToRoot(node) {
    //     if (!this.connectedToNode(node)) {
    //         console.error(this);
    //         console.error(node);
    //         throw new Error("node not connected");
    //     }

    //     if (node.cost + node.costToNode(this) < this.cost) {
    //         this.wayToRoot = node;
    //     }
    // }
    // get nodeToRoot() {
    //     return this.wayToRoot;
    // }

    get links() {
        return this._links;
    }



    // physical
    /**
     * Returns the current color of the node based on it's phase property.
     */
     get color() {
        return NetworkNode.COLORS[this.phaseName];
    }

    /**
     * Returns current distance in pixels to the selected node.
     * @param {NetworkNode} mateNode desired node
     * @returns Distance in pixels to the selected node
     */
    dist(mateNode) {
        return this.pos.dist(mateNode.pos);
    }

    // validateArch(node=null){
    //     if (node == null) {
    //         node = this.nodeToRoot;
    //     }

    //     if (!this.connectedToNode(node)) {
    //         return
    //     }

    //     for(let a of this.connections) {
    //         if (a.aimsToNode(node)) {
    //             a.state = Arch.STATES.VALID;
    //             return
    //         }
    //     }
    //     throw new Error("error");
    // }


    // get getMates() {
    //     // return this.nodesConnected;
    //     let mates = new Set();
    //     for (let node of this.nodesConnected) {
    //         if (node.phase != NetworkNode.PHASE.VALID && node.phase != NetworkNode.PHASE.ROOT) {
    //             mates.add(node);
    //         }
    //     }
    //     return mates;
    // }

    connectedToNode(node) {
        return this.nodesConnected.has(node);
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
        this.links.add(new NodeLink(this, destination));
        this.nodesConnected.add(destination)
    }

    // resetConnections() {
    //     this.nodesConnected = new Set();
    //     this.connections = new Set();
    // }

    // resetNode() {
    //     this.phase = NetworkNode.PHASE.NORMAL;
    //     this.wayToRoot = null;

    //     for (let a of this.connections) {
    //         a.state = Arch.STATES.NORMAL;
    //     }
    // }

    static clone(node, nodeClass) {
        if (!nodeClass.prototype instanceof NetworkNode) {
            throw new Error("nodeClass must be a NetworkNode class instance");
        }
        let newNode = new nodeClass(
            node.pos,
            node.id,
            node.size
        );
        for (let a of node.nodesConnected) {
            newNode.addConnection(a);
        }
        return newNode;
    }

    // changeConnection(oldNode, newNode) {
    //     if (!this.nodesConnected.has(oldNode)) {
    //         throw new Error("OldNode not connected");
    //     }

    //     this.nodesConnected.delete(oldNode);
    //     this.nodesConnected.add(newNode);

    //     for (let a of this.connections) {
    //         if (a.aimsToNode(oldNode)) {
    //             a.changeDestination(newNode);
    //             break;
    //         }
    //     }
    // }

    
}

// class RootNode extends NetworkNode {
//     constructor(...arg) {
//         super(...arg);
//     }

//     // set cost(newCost) {
//     //     return;
//     // }
//     get cost() {
//         return 0;
//     }

//     get color() {
//         return NetworkNode.COLORS.ROOT;
//     }

//     get phase() {
//         return super.phase;
//     }
//     set phase(newPhase) {
//         // pass
//     }

//     static clone(node) {
//         return super.clone(node, RootNode);
//     }
// }

// class NetworkNode extends NetworkNode {
//     constructor(...arg) {
//         super(...arg);
//     }

//     set phase(newPhase) {
//         super.phase = newPhase;
//         if (newPhase == NetworkNode.PHASE.VALID) {
//             this.validateArch();
//             this.nodeToRoot.validateArch(this);
//         }
//     }
//     get phase() {
//         return super.phase;
//     }

//     static clone(node) {
//         return super.clone(node, NetworkNode);
//     }
// }