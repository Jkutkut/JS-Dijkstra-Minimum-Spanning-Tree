function* dijkstra() {
    i = 0;
    // priorityQueue = new BinarySearchTree();
    priorityQueue = new Set();
    focusedNode = nodes[0];
    while (true) {
        focusedNode.phase = cNode.PHASE.VALID;
        yield focusedNode;
        // search new mates and set them to selected
        for (let node of focusedNode.getMates) {
            priorityQueue.add(node);
            node.wayToRoot = focusedNode;
            node.phase = cNode.PHASE.SELECTED;
        }

        if (priorityQueue.size == 0) {
            console.log("Dijkstra done :D");
            return;
        }
        yield priorityQueue.size;

        // search min cost and set that node to valid
        let minCost = Infinity;
        let bestNode = null;
        for (let node of priorityQueue) {
            if (node.cost < minCost) {
                bestNode = node;
                minCost = bestNode.cost;
            }
        }
        bestNode.nodeToRoot = focusedNode;
        focusedNode = bestNode;
        

        // repeat until no more mates
        // yield i++;
    }
}