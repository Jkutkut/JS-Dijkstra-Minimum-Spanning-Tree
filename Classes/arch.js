class Arch {
    constructor(origin, destination, cost) {
        this.origin = origin;
        this.destination = destination;
        this.cost = cost;
    }

    show() {
        let arrowTipSize = this.destination.size / 4;
        let angle = atan2(this.origin.y - this.destination.pos.y, this.origin.x - this.destination.pos.x); //gets the angle of the line
        let offset = createVector(this.destination.size / 2, 0);

        offset.rotate(angle);
        push()
            // if (this.destination.pos.x >= 0) {
            //     offset.x *= -1;
            // }
            // if (this.destination.pos.y >= 0) {
            //     offset.y *= -1;
            // }
            line(this.origin.x, this.origin.y, this.destination.pos.x, this.destination.pos.y)
        pop()
        push() //start new drawing state
            translate(this.destination.pos.x + offset.x, this.destination.pos.y + offset.y); //translates to the destination vertex
            push();
                // rotate(angle);
                beginShape();
                    vertex(0, 0);
                    vertex(-arrowTipSize, arrowTipSize * 0.5);
                    vertex(-arrowTipSize, -arrowTipSize * 0.5);
                    vertex(0, 0);
                endShape();
            pop();
        pop();
    }
}