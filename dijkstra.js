function* dijkstra() {
    i = 0;
    // priorityQueue = new BinarySearchTree();
    priorityQueue = new Set();
    focusedNode = nodes[0];
    while (true) {
        focusedNode.phase = cNode.PHASE.VALID;
        // console.log("Current node: node" + focusedNode.id);
        // yield focusedNode;
        yield;
        // search new mates and set them to selected
        for (let node of focusedNode.getMates) {
            priorityQueue.add(node);
            node.nodeToRoot = focusedNode;
            node.phase = cNode.PHASE.SELECTED;
        }

        if (priorityQueue.size == 0) {
            console.log("Dijkstra done :D");
            alert("Dijkstra done :D");
            return;
        }
        // for(let n of priorityQueue){console.log("Node" + n.id + " -> " + n.cost)}
        // yield priorityQueue;
        yield;

        // search min cost and set that node to valid
        let minCost = Infinity;
        let bestNode = null;
        for (let node of priorityQueue) {
            if (node.cost < minCost) {
                bestNode = node;
                minCost = bestNode.cost;
            }
        }
        // bestNode.nodeToRoot = focusedNode;
        priorityQueue.delete(bestNode);
        focusedNode = bestNode;
        

        // repeat until no more mates
        // yield i++;
    }
}