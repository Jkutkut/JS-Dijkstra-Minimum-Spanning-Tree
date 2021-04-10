function* dijkstra() {
    i = 0;
    // priorityQueue = new BinarySearchTree();
    priorityQueue = new Set();
    focusedNode = nodes[0];
    focusedNode.defineCost = 0;
    focusedNode.phase = cNode.PHASE.VALID;
    yield focusedNode;
    while (true) {
        // search new mates and set them to selected
        for (let node of focusedNode.getMates) {
            priorityQueue.add(node);
            node.setCost(focusedNode, focusedNode.costToNode(node));
            node.phase = cNode.PHASE.SELECTED;
        }
        yield priorityQueue.size;
        // search min cost and set that node to valid
        // let minCost = Infinity;
        // let bestNode = null;
        // for (let node of priorityQueue) {
        //     if (node.costToRoot < minCost) {
        //         bestNode = node;
        //         minCost = bestNode.costToRoot;
        //     }
        // }
        // repeat until no more mates
        yield i++;
    }
}