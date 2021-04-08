class Arch {
    constructor(origin, destination, cost) {
        this.origin = origin;
        this.destination = destination;
        this.cost = cost;

        this.distancia = createVector(this.origin.pos.copy().dist(this.destination.pos) - this.destination.size * 0.5);
        this.angle = atan2(this.origin.pos.y - this.destination.pos.y, this.origin.pos.x - this.destination.pos.x); //gets the angle of the line

        this.arrowTipSize = this.destination.size / 4;

        // let offset = this.origin.pos.copy().sub(this.destination.pos).heading();
        let offsetV = createVector(1, 0);
        offsetV.rotate(this.angle);
        this.lineOffset = {
            start: offsetV.copy().mult(this.origin.size * 0.5),
            end: offsetV.copy().mult(this.destination.size * 0.5)
        }
    }

    show() {
        push();
            line(
                this.origin.pos.x - this.lineOffset.start.x,
                this.origin.pos.y - this.lineOffset.start.y,
                this.destination.pos.x + this.lineOffset.end.x,
                this.destination.pos.y + this.lineOffset.end.y
            )
            translate(this.origin.pos.x, this.origin.pos.y); //translates to the destination vertex
            push();
                rotate(this.angle - PI);
                translate(this.distancia);
                // console.log(this.distancia)
                beginShape();
                    vertex(0, 0);
                    vertex(-this.arrowTipSize, this.arrowTipSize * 0.5);
                    vertex(-this.arrowTipSize, -this.arrowTipSize * 0.5);
                    vertex(0, 0);
                endShape();
            pop();
        pop();
    }
}