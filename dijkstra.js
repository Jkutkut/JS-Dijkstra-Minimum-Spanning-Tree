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

    // rootNode.phase = NetworkNode.PHASE.VALID;
    let v = rootNode;
    yield v;

    while (true) {
        for (let l of v.links) {
            let f = l.from, t = l.to; // Nodes

            if (dijkstraOBJ.dist[t.id] > dijkstraOBJ.dist[f.id] + l.weight) {
                dijkstraOBJ.dist[t.id] = dijkstraOBJ.dist[f.id] + l.weight;
                dijkstraOBJ.edgeTo[t.id] = l;

                if (pq.contains(t)) {
                    pq.update(t, dijkstraOBJ.dist[t.id]);
                }
                else {
                    pq.push(t, dijkstraOBJ.dist[t.id]);
                    t.phase = NetworkNode.PHASE.SELECTED;
                }
            }
        }

        if (pq.length == 0) break;

        yield pq;

        v = pq.pop();
        v.phase = NetworkNode.PHASE.VALID;
        dijkstraOBJ.edgeTo[v.id].state = NodeLink.STATES.VALID;
        yield v;
    }
}