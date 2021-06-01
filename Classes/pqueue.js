/**
 * Code originally from https://github.com/mourner/flatqueue but adapted to this repository needs.
 */

/**
 * Priority queue using binary heap.
 */
class PQueue {

    constructor() {
        this.elements = [];
        this.values = [];
        this.length = 0;
    }

    /**
     * Clear the Queue.
     * @param 
     */
    clear(fullClear=false) {
        this.length = 0;
        if (fullClear) {
            this.shrink();
        }
    }

    /**
     * Add a new element to the Queue.
     * @param {any} obj - Object to store
     * @param {number} value - priority on the Queue (if a < b => a goes first)
     */
    push(obj, value) {
        let pos = this.length++;
        this.elements[pos] = obj;
        this.values[pos] = value;

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (value >= parentValue) break;
            this.elements[pos] = this.elements[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.elements[pos] = obj;
        this.values[pos] = value;
    }

    /**
     * Removes the object with the highest priority.
     * @returns The removed object.
     */
    pop() {
        if (this.length === 0) return undefined;

        const top = this.elements[0];
        this.length--;

        if (this.length > 0) {
            const obj = this.elements[0] = this.elements[this.length];
            const value = this.values[0] = this.values[this.length];
            const halfLength = this.length >> 1;
            let pos = 0;

            while (pos < halfLength) {
                let left = (pos << 1) + 1;
                const right = left + 1;
                let bestIndex = this.elements[left];
                let bestValue = this.values[left];
                const rightValue = this.values[right];

                if (right < this.length && rightValue < bestValue) {
                    left = right;
                    bestIndex = this.elements[right];
                    bestValue = rightValue;
                }
                if (bestValue >= value) break;

                this.elements[pos] = bestIndex;
                this.values[pos] = bestValue;
                pos = left;
            }

            this.elements[pos] = obj;
            this.values[pos] = value;
        }

        return top;
    }

    /**
     * Updates the priority of the desired obj.
     * @param {any} obj - Object to update.
     * @param {number} newValue - new priority value.
     */
    update(obj, newValue) {
        let parent = function(index) {return Math.floor((index - 1) / 2);}
        for (let i = 0; i < this.length; i++) {
            if (this.elements[i] == obj) {
                this.elements[i] = this.elements[0] + 1; // value of the best candidate + 1

                // shift the node to the root of the heap
                while (i > 0 && this.elements[parent(i)] < this.elements[i]) {
                    // swap parent and current node
                    let temp = this.elements[parent(i)];
                    this.elements[parent(i)] = this.elements[i];
                    this.elements[i] = temp;

                    i = parent(i);
                }

                // Extract the node
                this.pop();

                this.push(obj, newValue);
                break;
            }
        }
    }

    /**
     * Check if the input is on the Queue.
     * @param {any} obj - Desired obj
     * @returns Whenever the obj is or not on the Queue.
     */
    contains(obj) {
        for (let i of this.elements) {
            if (i == obj) {
                return true;
            }
        }
        return false;
    }

    /**
     * @returns The Obj first on the Queue.
     */
    peek() {
        if (this.length === 0) return undefined;
        return this.elements[0];
    }

    /**
     * @returns The value of the first obj on the Queue.
     */
    peekValue() {
        if (this.length === 0) return undefined;
        return this.values[0];
    }

    /**
     * Updates the lenght of the arrays acording to the current length.
     */
    shrink() {
        this.elements.length = this.values.length = this.length;
    }
}