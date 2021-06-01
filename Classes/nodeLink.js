/**
 * This class creates the connection between two nodes. Keep in mind this conection is one directional.
 */
class NodeLink {
    /**
     * Standar states of the node.
     */
    static STATES = {
        NORMAL: 0,
        VALID: 1
    }
    /**
     * Standar names of the possible states of the link.
     */
    static STATESNAMES = [
        "NORMAL",
        "VALID"
    ]
    /**
     * Colors asociated with each states.
     */
    static COLORS = {
        NORMAL: [0],
        VALID: [90, 247, 17]
    }

    constructor(origin, destination) {
        this.currentState = NodeLink.STATES.NORMAL;

        this._from = origin;
        this._to = destination;

        this.distancia = createVector(this.from.pos.copy().dist(this.to.pos) - this.to.size * 0.5);
        this.angle = atan2(this.from.pos.y - this.to.pos.y, this.from.pos.x - this.to.pos.x); //gets the angle of the line

        this.cost = Math.floor(this.distancia.x / 10);

        this.arrowTipSize = this.to.size / 4;

        let offsetV = createVector(1, 0).rotate(this.angle);
        this.lineOffset = {
            start: offsetV.copy().mult(this.from.size * 0.5),
            end: offsetV.copy().mult(this.to.size * 0.5)
        }
    }

    /**
     * Represent the link on the canvas
     */
    show() {
        push();
            fill(...this.color);
            push(); // Create the line on the arrow
                stroke(...this.color);
                line(
                    this.from.pos.x - this.lineOffset.start.x,
                    this.from.pos.y - this.lineOffset.start.y,
                    this.to.pos.x + this.lineOffset.end.x,
                    this.to.pos.y + this.lineOffset.end.y
                )
            pop();
            translate(this.from.pos.x, this.from.pos.y); //translates to the destination vertex
            push();
                rotate(this.angle - PI);
                translate(this.distancia);
                push(); // Text representing the cost of the link
                    fill(0);
                    translate(this.distancia.copy().mult(-0.45).x, 10);
                    rotate(PI * 0.5);
                    text(this.cost, 0, 0)
                pop();
                stroke(...this.color);
                beginShape(); // Tip of the arrow
                    vertex(0, 0);
                    vertex(-this.arrowTipSize, this.arrowTipSize * 0.5);
                    vertex(-this.arrowTipSize, -this.arrowTipSize * 0.5);
                    vertex(0, 0);
                endShape();
            pop();
        pop();
    }

    /**
     * @returns Node where the link is originated.
     */
    get from() {
        return this._from;
    }
    
    /**
     * @returns Node where the link is aiming at.
     */
    get to() {
        return this._to;
    }

    /**
     * @returns Cost or weight of traveling the link.
     */
    get weight() {
        return this.cost;
    }

    /**
     * Check if the link aims to the selected node
     * @param {Node} node Node to chekc
     * @returns Result of the comparation
     */
    aimsToNode(node) {
        return node == this._to;
    }

    /**
     * @returns Current color of the node
     */
    get color() {
        return NodeLink.COLORS[this.stateName];
    }

    /**
     * Changes the state of the node to the one selected. Also updates the link on the screen.
     */
    set state(newState) {
        this.currentState = newState;
        this.show();
    }

    /**
     * @returns Current state of the link.
     */
    get state() {
        return this.currentState;
    }

    /**
     * @returns Current state of the link.
     */
    get stateName() {
        return NodeLink.STATESNAMES[this.state];
    }

    /**
     * @returns A simple way to visualize the link as a string.
     */
    toString() {
        return this.from.id + " -" + this.cost + "-> " + this.to.id;
    }
}