/**
 * Code from https://github.com/mourner/flatqueue and modified
 */
class FlatQueue {

    constructor() {
        this.ids = [];
        this.values = [];
        this.length = 0;
    }

    clear() {
        this.length = 0;
    }

    push(id, value) {
        let pos = this.length++;
        this.ids[pos] = id;
        this.values[pos] = value;

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (value >= parentValue) break;
            this.ids[pos] = this.ids[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.ids[pos] = id;
        this.values[pos] = value;
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.ids[0];
        this.length--;

        if (this.length > 0) {
            const id = this.ids[0] = this.ids[this.length];
            const value = this.values[0] = this.values[this.length];
            const halfLength = this.length >> 1;
            let pos = 0;

            while (pos < halfLength) {
                let left = (pos << 1) + 1;
                const right = left + 1;
                let bestIndex = this.ids[left];
                let bestValue = this.values[left];
                const rightValue = this.values[right];

                if (right < this.length && rightValue < bestValue) {
                    left = right;
                    bestIndex = this.ids[right];
                    bestValue = rightValue;
                }
                if (bestValue >= value) break;

                this.ids[pos] = bestIndex;
                this.values[pos] = bestValue;
                pos = left;
            }

            this.ids[pos] = id;
            this.values[pos] = value;
        }

        return top;
    }

    decreaseKey(id, newValue) {
        for (let i = 0; i < this.length; i++) {
            if (this.ids[i] == id) {
                for (let j = i + 1; j < this.length; j++, i++) { // remove the i'th element
                    this.ids[i] = this.ids[j];
                    this.values[i] = this.values[j];
                }
                // now the last position contains a duplicated element
                this.ids.pop();
                this.values.pop();

                this.push(id, newValue); // Add it with the new value
                break;
            }
        }
    }

    contains(id) {
        for (let i of this.ids) {
            if (i == id) {
                return true;
            }
        }
        return false;
    }

    peek() {
        if (this.length === 0) return undefined;
        return this.ids[0];
    }

    peekValue() {
        if (this.length === 0) return undefined;
        return this.values[0];
    }

    shrink() {
        this.ids.length = this.values.length = this.length;
    }
}