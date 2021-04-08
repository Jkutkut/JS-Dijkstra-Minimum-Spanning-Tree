class node {
    constructor (pos, size) {
        this.pos = pos;
        this.size = size;
    }

    draw() {
        push();
            translate(this.pos);
            fill(0);
            ellipse(this.size);
        pop();
    }
}