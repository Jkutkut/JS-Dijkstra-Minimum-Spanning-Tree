class Network {

    constructor(canvasWidth, canvasHeight) {
        this.nodes = new Set();
        this.canvasSize = {w: canvasWidth, h:canvasHeight};

        this.NODESIZE = Math.floor(mainCanvasWidth / 25);
    }
}