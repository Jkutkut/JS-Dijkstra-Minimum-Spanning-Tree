class Network {
    static ERRORS = {
        NUMBERINPUT: new Error("The input must be a number");
    };

    constructor(canvasWidth, canvasHeight) {
        this.canvasSize = {w: canvasWidth, h:canvasHeight};
        this.NODESIZE = Math.floor(mainCanvasWidth / 25);

        this.nodes = new Set();
        this.nodes.add(
            new NetworkNode(
                this.createCenteredVector(0, 0),
                0, 
                this.NODESIZE
            )
        );


        console.log("class created")
    }

    show() {
        for (let node of this.nodes) {
            node.show();
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