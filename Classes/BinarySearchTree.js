class BSTNode {
    constructor(obj, weight) {
        this.data = {obj: obj, weight: weight};
        this.left = null;
        this.right = null;
    }

    /**
     * Compares the current node instance with the one on the input
     * @param {BSTNode} other node to compare to.
     * @returns The result of the comparation
     */
    compareTo(other) {
        let cmp = this.data.weight - other.data.weight;
        if (cmp < 0) {
            return -1;
        }
        else if (cmp == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
}

// Binary Search tree class
class BinarySearchTree {
	constructor() {
		this.root = null; // root of a binary seach tree
        this.size = 0;
	}

	// function to be implemented
	/** 
     * Helper method which creates a new node to be inserted and calls insertNode 
     * */ 
    insert(obj, value) {
        var newNode = new BSTNode(obj, value); // Creating a node and initailising with data
        if(this.root === null) { // root is null then node will be added to the tree and made root.
            this.root = newNode;
        }
        else { // find the correct position in the tree and add the node
            this.insertNode(this.root, newNode);
            this.size++;
        }
    }

    /**
     * Method to insert a node in a tree. It moves over the tree to find the location. To insert a node with a given data
     * */
    insertNode(node, newNode) {
        // if(newNode.data < node.data) { // if the data is less than the node data move left of the tree
        if (newNode.compareTo(data) == -1) {
            if(node.left === null) { // if left is null insert node here
                node.left = newNode;
            }
            else { // if left is not null recur until null is found
                this.insertNode(node.left, newNode);
            }
        }

        else { // if the data is more than the node data move right of the tree
            if(node.right === null) { // if right is null insert node here
                node.right = newNode;
            }
            else { // if right is not null recur until null is found
                this.insertNode(node.right,newNode);
            }
        }
    }

    /**
     * Helper method that calls the removeNode with a given data
     */
    remove(data) {
        // root is re-initialized with root of a modified tree.
        this.root = this.removeNode(this.root, data);
        this.size++;
    }

    
    /**
     * Method to remove node with a given data. It recur over the tree to find the data and removes it
     */
    removeNode(node, nodeToRemove) {
        if(node === null) { // if the root is null then tree is empty
            return null;
        }
        // else if(key < node.data) { // if data to be delete is less than roots data then move to left subtree
        else if(node.compareTo(key) == 1) { // if data to be delete is less than roots data then move to left subtree
            node.left = this.removeNode(node.left, key);
            return node;
        }
        // else if(key > node.data) { // if data to be delete is greater than roots data then move to right subtree
        else if(node.compareTo(key) == -1) { // if data to be delete is greater than roots data then move to right subtree
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else { // if data is similar to the root's data then delete this node
            if(node.left === null && node.right === null) { // deleting node with no children
                node = null;
                return node;
            }

            if(node.left === null) { // deleting node with one children
                node = node.right;
                return node;
            }
            else if(node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting node with two children
            // minumum node of the rigt subtree is stored in aux
            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }

    }


	// Helper function

    /**
     * finds the max depth of the tree (longest branch)
     */
    findDepth(node=null, currentDepth=0) {
        if (node == null && currentDepth == 0) {
            node = this.getRootNode();
        }
        else if (node == null) {
            return 0;
        }

        if (node.left == null && node.right == null) {
            return currentDepth;
        }
        else {
            return Math.max(
                this.findDepth(node.left, currentDepth + 1),
                this.findDepth(node.right, currentDepth + 1)
            )
        }
    }

    /**
     * finds the minimum node in tree searching starts from given node
     * */ 
    findMinNode(node) {
        if(node.left === null) { // if left of a node is null then it must be minimum node
            return node;
        }
        else {
            return this.findMinNode(node.left);
        }
    }

	/**
     * returns root of the tree
     * */ 
    getRootNode() {
        return this.root;
    }



    /**
     * Performs inorder traversal of a tree
     * */
    inorder(node) {
        if(node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

	/**
     * Performs preorder traversal of a tree
     *  */	
    preorder(node) {
        if(node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
		
	/**
     * Performs postorder traversal of a tree
     *  */
    postorder(node) {
        if(node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

	/**
     * search for a node with given data
     * */
    search(node, data) {
        if(node === null) { // if trees is empty return null
            return null;
        }
        else if(data < node.data) { // if data is less than node's data move left
            return this.search(node.left, data);
        }
        else if(data > node.data) { // if data is less than node's data move left
            return this.search(node.right, data);
        }
        else { // if data is equal to the node data return node
            return node;
        }
    }


    // print() {
    //     treeDepth = this.findDepth();
    //     matrixSize = Math.pow(2, treeDepth);
    //     console.log(treeDepth);
    // }

    recursivePrint(node=null, depth=0, t=1){
        if (node == null) {
            if (depth == 0){
                node = this.getRootNode();
            }
            else {
                return "";
            }
        }

        let leftType = (node.right == null)? 0 : 1;

        return this.printLine(node, depth, t) + this.recursivePrint(node.left, depth + 1, leftType) + this.recursivePrint(node.right, depth + 1, 0);
    }

    printLine(node, depth, t) {
        let nodeName;
        if (typeof node.data == 'number'){
            nodeName = "" + node.data;
        }
        else {
            nodeName = node.data.toString();
        }

        let typeConversor = ["└", "├"];
        let nodeLine = typeConversor[t] + "──" + nodeName + "\n";
        for (let i = 0; i < depth; i++) {
            nodeLine = "│  " + nodeLine;
        }
        return nodeLine;
    }

    // toString(node, dephUntilMax) {
    //     let nodeName;
    //     let arms = ["/", "\\"];
    //     let armBase = "_-_";
    //     let armExtension = "_";

    //     extraExtensions = [0, 2, 7, 18, 38];
    //     extraExtensions = [0, 4, 14, 36, 72];
    //     alternative =     [3, 7, 17, 37, 77];

    //     if (typeof node.data == 'number'){
    //         nodeName = "" + node.data;
    //     }
    //     else {
    //         nodeName = node.data.toString();
    //     }

    //     if (node.left == null && node.right == null) {
    //         return nodeName;
    //     }

    //     let extension;
    // }

    printBinaryTree(node, space, height) {
        if (node == null) {
            return;
        }
        space += height;
        this.printBinaryTree(node.right, space, height);
        console.log();

        let str2print = "";
        for (let i = height; i < space; i++) {
            str2print += " ";
        }


        let nodeName;
        if (typeof node.data == 'number'){
            nodeName = "" + node.data;
        }
        else {
            nodeName = node.data.toString();
        }

        str2print += nodeName;
        console.log(str2print);
        this.printBinaryTree(node.left, space, height);
    }
}


function testBinarySearchTree() {
    // create an object for the BinarySearchTree
    var BST = new BinarySearchTree();

    // Inserting nodes to the BinarySearchTree
    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);
                            
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 7 13 22 27
    //	 / \ /
    // 5 9 17

    var root = BST.getRootNode();
                
    // prints 5 7 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with no children
    BST.remove(5);
                
                
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 7 13 22 27
    //	 \ /
    //	 9 17
                
                            
    var root = BST.getRootNode();
                
    // prints 7 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with one child
    BST.remove(7);
                
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 9 13 22 27
    //		 /
    //		 17
                
                
    var root = BST.getRootNode();

    // prints 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with two children
    BST.remove(15);
        
    //		 17
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 9 13 22 27

    var root = BST.getRootNode();
    console.log("inorder traversal");

    // prints 9 10 13 17 22 25 27
    BST.inorder(root);
                
    console.log("postorder traversal");
    BST.postorder(root);
    console.log("preorder traversal");
    BST.preorder(root);
}


if (!module.parent) {
    // create an object for the BinarySearchTree
    var BST = new BinarySearchTree();

    // Inserting nodes to the BinarySearchTree
    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);

    // |      15
    // |     /  \
    // |    10   25
    // |   / \   / \
    // |  7  13 22  27
    // | / \    /
    // |5   9  17 


    // |                  000
    // |           ________-________
    // |          /                 \
    // |        010                 025
    // |      ___-___             ___-___
    // |     /       \           /       \
    // |   007       013       022       027
    // |   _-_       _-_       _-_       _-_ 
    // |  /   \     /   \     /   \     /   \
    // |005   009 017   000 000   000 000   000

    // |                                                                               r                                                                               |
    // |                                         ______________________________________|______________________________________                                         |
    // |                                        /                                      |                                      \                                        |
    // |                                      000                                      |                                      000                                      |
    // |                     __________________|__________________                     |                     __________________|__________________                     |
    // |                    /                                     \                    |                    /                                     \                    |
    // |                  000                  |                  000                  |                  000                  |                  000                  |
    // |           ________|________           |           ________|________           |           ________|________           |           ________|________           |
    // |          /                 \          |          /                 \          |          /                 \          |          /                 \          |
    // |        010                 025        |        010                 025        |        010                 025        |        010                 025        |
    // |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |
    // |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |
    // |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |
    // |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |
    // |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |
    // |005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|



    // |                                                                               r                                                                               |
    // |                                         ______________________________________|______________________________________                                         |
    // |                                        /                                      |                                      \                                        |
    // |                                      000                                      |                                      000                                      |
    // |                     __________________|__________________                     |                     __________________|__________________                     |
    // |                    /                  |                  \                    |                    /                                     \                    |
    // |                  000                  |                  000                  |                  000                  |                  000                  |
    // |           ________|________           |           ________|________           |           ________|________           |           ________|________           |
    // |          /        |        \          |          /                 \          |          /                 \          |          /                 \          |
    // |        010        |        025        |        010                 025        |        010                 025        |        010                 025        |
    // |      ___|___      |      ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |
    // |     /   |   \     |     /   |   \     |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |
    // |   007   |   013   |   022   |   027   |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |
    // |   _|_   |   _|_   |   _|_   |   _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |
    // |  / | \  |  / | \  |  / | \  |  / | \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |
    // |005 | 009|017 | 000|000 | 000|000 | 000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|

    // test();

    // BST.print();
    console.log(BST.recursivePrint());
    BST.printBinaryTree(BST.getRootNode(), 0, 10);
}