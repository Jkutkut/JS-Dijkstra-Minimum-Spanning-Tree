class Node {
    constructor (pos, index=0, size) {
        this.pos = pos;
        this.index = index;
        this.size = size;
        this.sizeHalf = this.size * 0.5;

        this.mate = null;

    }

    show() {
        push();
            translate(this.pos);
            fill(100);
            ellipse(0, 0, this.size);

            fill(255);
            // text(this.index, - this.sizeHalf, - this.sizeHalf, this.sizeHalf, this.sizeHalf)
            let offset = - this.size * 0.1;
            text(this.index, offset, offset, this.sizeHalf, this.sizeHalf)
        pop();
    }

    drawConnections() {
        // this code is to make the arrow point
        if (this.mate == null) {
            return
        }

        let arrowTipSize = this.mate.size / 4;
        let angle = atan2(this.pos.y - this.mate.pos.y, this.pos.x - this.mate.pos.x); //gets the angle of the line
        let offset = createVector(this.mate.size / 2, 0);

        offset.rotate(angle);
        push()
            // if (this.mate.pos.x >= 0) {
            //     offset.x *= -1;
            // }
            // if (this.mate.pos.y >= 0) {
            //     offset.y *= -1;
            // }
            line(this.pos.x, this.pos.y, this.mate.pos.x, this.mate.pos.y)
        pop()
        push() //start new drawing state
            translate(this.mate.pos.x + offset.x, this.mate.pos.y + offset.y); //translates to the destination vertex
            rotate(angle - HALF_PI); //rotates the arrow point
            triangle(- arrowTipSize * 1.5, 0, arrowTipSize * 1.5, arrowTipSize, 0, -arrowTipSize / 2); //draws the arrow point as a triangle
            // triangle(- arrowTipSize * 0.5, arrowTipSize, arrowTipSize * 0.5, arrowTipSize, 0, -arrowTipSize / 2); //draws the arrow point as a triangle
        pop();
    }
}