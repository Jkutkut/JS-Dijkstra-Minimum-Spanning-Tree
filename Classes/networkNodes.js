class NetworkNode {
    static ERRORS = {
        NODEINPUT: new Error("The input must be a NetworkNode object."),
        P5VECTOR: new Error("The input must be a p5.Vector")
    };
    static PHASE = {
        NORMAL: 0,
        SELECTED: 1,
        VALID: 2,
        ROOT: 3
    }
    static PHASESNAMES = [
        "NORMAL",
        "SELECTED",
        "VALID",
        "ROOT"
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
     * Draws all the connection links to the nodes connected.
     */
    showLinks() {
        for (let link of this.links) {
            link.show();
        }
    }



    // GETTERS AND SETTERS


    // id
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
            throw this.ERRORS.P5VECTOR
        }
        this._pos = newPos;
    }


    // Phase
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
        if (!Number.isInteger(newPhase) || !(newPhase >= 0 && newPhase < NetworkNode.PHASESNAMES.length)){
            throw new Error("The new phase must be a " + this.constructor.name + ".PHASE.X value");
        }
        this.currentPhase = newPhase;
        this.show();
    }

    /**
     * Returns the String equivalent of the current phase of the node.
     */
    get phaseName() {
        return NetworkNode.PHASESNAMES[this.phase];
    }

    /**
     * Returns the current links comming from the node as a set.
     */
    get links() {
        return this._links;
    }

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

    /**
     * Checks if there's a connection to the selected node.
     * @param {Node} node - Node in consideration.
     * @returns Whenever there's a conection form the current node to the destination node.
     */
    connectedToNode(node) {
        return this.nodesConnected.has(node);
    }

    /**
     * Creates a NodeLink from the current node to the selected one.
     * @param {Node} destination - Node wanted to connect to.
     * @returns The link object created.
     */
    addConnection(destination) {
        if (this.nodesConnected.has(destination)) {
            console.warn("already in");
            return
        }
        if (this == destination) {
            console.warn("same node as destination")
            return
        }
        let link = new NodeLink(this, destination)
        this.links.add(link);
        this.nodesConnected.add(destination);
        return link;
    }

    // STATIC METHODS
    /**
     * Creates a copy of the given node.
     * @param {Node} node - Current node to clone
     * @returns The new node
     */
    static clone(node) {
        let newNode = new NetworkNode(
            node.pos,
            node.id,
            node.size
        );
        for (let a of node.nodesConnected) {
            newNode.addConnection(a);
        }
        return newNode;
    }
}