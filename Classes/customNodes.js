class cNode {
    static PHASES = [
        "NORMAL",
        "SELECTED"
    ];
    static COLORS = {
        NORMAL: [54, 235, 255, 120],
        SELECTED: [22, 222, 149, 100]
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



    addConnection(destination, cost) {
        if (this.nodesConnected.has(destination)) {
            console.warn("already in");
            return
        }
        if (this == destination) {
            console.warn("same node as destination")
            return
        }
        this.connections.add(new Arch(this, destination, cost));
        this.nodesConnected.add(destination)
    }

    resetConnections() {
        this.nodesConnected = new Set();
        this.connections = new Set();
    }

    drawConnections() {
        // this code is to make the arrow point
        for (let arrow of this.connections) {
            arrow.show();
        }
    }
}