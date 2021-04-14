class Network {
    static ERRORS = {
        NUMBERINPUT: new Error("The input must be a number")
    };

    constructor(canvasWidth, canvasHeight) {
        this.canvasSize = {w: canvasWidth, h:canvasHeight};
        this.NODESIZE = Math.floor(mainCanvasWidth / 25);

        this.nodes = new Set();
        this.rootNode = new NetworkNode(
            this.createCenteredVector(0, 0),
            0, 
            this.NODESIZE
        );
        this.nodes.add(this.rootNode);
        
        this.createRandomNodes(40, 3 * this.NODESIZE);

        console.log("class created")
    }

    show() {
        for (let node of this.nodes) {
            node.show();
        }
    }

    // NODE CREATION
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
                    if (otherNode.dist(node) <= R) {
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