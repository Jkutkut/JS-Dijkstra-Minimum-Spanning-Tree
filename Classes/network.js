class Network {
    static ERRORS = {
        NUMBERINPUT: new Error("The input must be a number")
    };

    constructor(canvasWidth, canvasHeight) {
        this._canvasSize = {w: canvasWidth, h:canvasHeight};
        this._NODESIZE = Math.floor(canvasWidth / 25);

        this._nodes = new Set();
        this._links = new Set();

        this.createRandomNodes(40, 3 * this.NODESIZE);
        this.createCloseConnections(this.NODESIZE * 5);

        this.dijkstraOBJ = {dist: {}, edgeTo: {}};
        this.rootNode;
    }

    /**
     * Represent the current network.
     */
    show() {
        for (let node of this.nodes) {
            node.show();
            node.showLinks();
        }
    }

    // GETTERS AND SETTERS
    /**
     * Size of the current canvas where the nodes are placed.
     * @returns {w: XXXXX, h:YYYYY} object with the width (XXXXX) and the height (YYYYY) of the canvas in pixels.
     */
    get canvasSize() {
        return this._canvasSize;
    }
    
    /**
     * @returns the intended size of the nodes as a number.
     */
    get NODESIZE() {
        return this._NODESIZE;
    }

    /**
     * @returns the set of NetworkNodes stored on the object.
     */
    get nodes() {
        return this._nodes;
    }

    /**
     * @returns the set with all the links of the network.
     */
    get links() {
        return this._links;
    }


    // DIJKSTRA
    updateRootNode(newRootNode) {
        if (this.rootNode) {
            this.rootNode.phase = NetworkNode.PHASE.NORMAL;
        }
        this.rootNode = newRootNode;
        this.rootNode.phase = NetworkNode.PHASE.ROOT;
    }

    *dijkstra() {
        if (this.rootNode == undefined) {
            console.warn("Root node not selected.");
            return;
        }
    
        if (!this.nodes.has(this.rootNode)) {
            throw new Error("The rootNode is not on the network");
        }
    
        
        for (let node of this.nodes) {
            for (let link of node.links) {
                if (link.weight < 0) {
                    throw new Error("The weight of all links must be positive");
                }
            }
            this.dijkstraOBJ.dist[node.id] = Number.POSITIVE_INFINITY;
            this.dijkstraOBJ.edgeTo[node.id] = undefined;
        }
        this.dijkstraOBJ.dist[this.rootNode.id] = 0;
    
        let pq = new PQueue();

        let v = this.rootNode;
    
        while (true) {
            console.log(v.links);
            for (let l of v.links) {
                let f = l.from, t = l.to; // Nodes
                if (this.dijkstraOBJ.dist[t.id] > this.dijkstraOBJ.dist[f.id] + l.weight) {
                    
                    this.dijkstraOBJ.dist[t.id] = this.dijkstraOBJ.dist[f.id] + l.weight;
                    this.dijkstraOBJ.edgeTo[t.id] = l;

                    if (pq.contains(t)) {
                        pq.update(t, this.dijkstraOBJ.dist[t.id]);
                    }
                    else {
                        pq.push(t, this.dijkstraOBJ.dist[t.id]);
                        t.phase = NetworkNode.PHASE.SELECTED;
                    }
                }
            }

            if (pq.length == 0) break;
            yield pq;
    
            v = pq.pop();
            v.phase = NetworkNode.PHASE.VALID;
            this.dijkstraOBJ.edgeTo[v.id].state = NodeLink.STATES.VALID;
            yield v;
        }
    }




    // ELEMENTS CREATION
    // NODE
    createRandomNodes(N, R) {
        let MAXATTEMPS = 1000;
        let attempt, pos, node, validNode;
        let index = 1;
        for (let i = 0; i < N; i++) {
            validNode = false;
            attempt = 0;
            while (!validNode && attempt++ < MAXATTEMPS) {
                validNode = true;
                pos = createVector(
                    Math.floor(Math.random() * (this.canvasSize.w - this.NODESIZE * 2)) + this.NODESIZE,
                    Math.floor(Math.random() * (this.canvasSize.h - this.NODESIZE * 2)) + this.NODESIZE
                );
                node = new NetworkNode(pos, index, this.NODESIZE);
                for (let otherNode of this.nodes) {
                    if (node.dist(otherNode) <= R) {
                        validNode = false;
                        break;
                    }
                }
            }
            if (validNode) {
                this.nodes.add(node);
                index++;
            }
        }
    }
    // LINK
    createCloseConnections(maxDistance) {
        for (let node of this.nodes) {
            for (let mateNode of this.nodes) {
                if (mateNode == node) {
                    continue
                }
                if (node.dist(mateNode) <= maxDistance) {
                    this.links.add(node.addConnection(mateNode));
                }
            }
        }
    }

    // NODE MANIPULATION
    /**
     * Clear the network
     */
    clearNetwork() {
        this.nodes.clear();
        this.links.clear();
    }

    reset() {
        for (let node of this.nodes) {
            node.phase = NetworkNode.PHASE.NORMAL;
        }
        for (let l of this.links) {
            l.state = NodeLink.STATES.NORMAL;
        }
    }

    // TOOLS
    /**
     * Creates a p5.Vector with the position given from the center of the screen.
     * @param {int} x horizontal position from center
     * @param {int} y vertical position from center
     * @returns p5.Vector with the desired coordinates
     */
    createCenteredVector(x, y) {
        if (typeof x != "number" || typeof y != "number") {
            throw Network.ERRORS.NUMBERINPUT;
        }
        return createVector(
            this.canvasSize.w * 0.5 + x,
            this.canvasSize.h * 0.5 + y
        );
    }
}