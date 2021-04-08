class cNode {
    constructor (pos, id=0, size) {
        this.pos = pos;
        this.id = id;
        this.size = size;
        this.sizeHalf = this.size * 0.5;

        // this.mate = null;
        this.nodesConnected = new Set();
        this.connections = new Set();
    }

    show() {
        push();
            translate(this.pos);
            fill(54, 235, 255, 150);
            ellipse(0, 0, this.size);

            fill(0);
            let offset = - this.size * 0.1;
            text(this.id, offset, offset, this.sizeHalf, this.sizeHalf)
        pop();
    }

    // GETTERS AND SETTERS
    dist(mateNode) {
        return this.pos.dist(mateNode.pos);
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