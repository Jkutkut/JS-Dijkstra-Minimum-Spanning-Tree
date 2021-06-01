var dijkstraOBJ = {dist: {}, edgeTo: {}};
function* dijkstra(network, rootNodeID) {
    let rootNode;
    for (let node of network.nodes) {
        if (node.id == rootNodeID) {
            rootNode = node;
            break;
        }
    }

    if (!network.nodes.has(rootNode)) {
        throw new Error("The rootNode is not on the network");
    }

    
    for (let node of network.nodes) {
        for (let link of node.links) {
            if (link.weight < 0) {
                throw new Error("The weight of all links must be positive");
            }
        }
        dijkstraOBJ.dist[node.id] = Number.POSITIVE_INFINITY;
        dijkstraOBJ.edgeTo[node.id] = undefined;
    }
    dijkstraOBJ.dist[rootNodeID] = 0;

    let pq = new FlatQueue();
    pq.push(rootNode, dijkstraOBJ.dist[rootNodeID]);

    while (pq.size > 0) {
        let v = pq.pop();
    }
}
// function* dijkstra(rootNode) {
//     if (! rootNode instanceof RootNode) {
//         throw new Error("The starting node must be a RootNode");
//     }
    
//     // priorityQueue = new BinarySearchTree();
//     priorityQueue = new Set();
//     focusedNode = rootNode;
//     while (true) {
//         focusedNode.phase = cNode.PHASE.VALID;
//         // console.log("Current node: node" + focusedNode.id);
//         yield focusedNode;
//         // yield;
//         // search new mates and set them to selected
//         for (let node of focusedNode.getMates) {
//             priorityQueue.add(node);
//             node.nodeToRoot = focusedNode;
//             node.phase = cNode.PHASE.SELECTED;
//         }

//         if (priorityQueue.size == 0) {
//             console.log("Dijkstra done :D");
//             alert("Dijkstra done :D");
//             return;
//         }
//         // for(let n of priorityQueue){console.log("Node" + n.id + " -> " + n.cost)}
//         yield priorityQueue;
//         // yield;

//         // search min cost and set that node to valid
//         let minCost = Infinity;
//         let bestNode = null;
//         for (let node of priorityQueue) {
//             if (node.cost < minCost) {
//                 bestNode = node;
//                 minCost = bestNode.cost;
//             }
//         }
//         // bestNode.nodeToRoot = focusedNode;
//         priorityQueue.delete(bestNode);
//         focusedNode = bestNode;
        

//         // repeat until no more mates
//         // yield i++;
//     }
// }