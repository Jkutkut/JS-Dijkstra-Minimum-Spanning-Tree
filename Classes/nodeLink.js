class NodeLink {
    static STATES = {
        NORMAL: 0,
        VALID: 1
    }
    static STATESNAMES = [
        "NORMAL",
        "VALID"
    ]
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

    show() {
        push();
            fill(...this.color);
            push()
                stroke(...this.color);
                line(
                    this.from.pos.x - this.lineOffset.start.x,
                    this.from.pos.y - this.lineOffset.start.y,
                    this.to.pos.x + this.lineOffset.end.x,
                    this.to.pos.y + this.lineOffset.end.y
                )
            pop()
            translate(this.from.pos.x, this.from.pos.y); //translates to the destination vertex
            push();
                rotate(this.angle - PI);
                translate(this.distancia);
                push();
                    fill(0);
                    translate(this.distancia.copy().mult(-0.45).x, 10);
                    rotate(PI * 0.5);
                    text(this.cost, 0, 0)
                pop();
                stroke(...this.color);
                beginShape();
                    vertex(0, 0);
                    vertex(-this.arrowTipSize, this.arrowTipSize * 0.5);
                    vertex(-this.arrowTipSize, -this.arrowTipSize * 0.5);
                    vertex(0, 0);
                endShape();
            pop();
        pop();
    }

    get from() {
        return this._from;
    }
    
    get to() {
        return this._to;
    }

    get weight() {
        return this.distancia;
    }

    aimsToNode(node) {
        return node == this._to;
    }

    get color() {
        return NodeLink.COLORS[this.stateName];
    }

    set state(newState) {
        this.currentState = newState;
        this.show();
    }

    get state() {
        return this.currentState;
    }

    get stateName() {
        return NodeLink.STATESNAMES[this.state];
    }

    toString() {
        return this.from.id + " -> " + this.to.id;
    }
}