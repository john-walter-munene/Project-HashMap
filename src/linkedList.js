class LinkedList {
    constructor() {
        this.headNode = null;
    }

    head() {
        return this.headNode;
    }

    append(key, value) {
        // If the list is empty, initialize the head node with the key-value pair.
        if (this.headNode === null) {
            this.headNode = new Node(key, value);
        } else {
            let temp = this.headNode;
    
            // Traverse the list and check if the key exists, overwrite the value, and exit.
            while (temp.nextNode !== null) {
                if (temp.pair.key === key) {
                    temp.pair.value = value;
                    return;
                }
                temp = temp.nextNode;
            }
    
            // Append new node to the tail if the key doesn't exist.
            temp.nextNode = new Node(key, value);
        }
    }    
    
    contains(key) {
        let temp = this.headNode;

        while(temp !== null) {
            if (temp.pair.key === key) return true;
            temp = temp.nextNode;
        }

        return false;
    }

    retrieve(key) {
        let temp = this.headNode;
    
        while (temp !== null) {
            if (temp.pair.key === key) return temp.pair.value;
            temp = temp.nextNode;
        }

        return null; // Return null if the key is not found.
    }

    remove(key) {
        // Removing non existent key.
        if (this.headNode === null) return false;

        // If removing the head (index 0)
        if (this.headNode.pair.key === key) {
            this.headNode = this.headNode.nextNode;
            return true;
        }

        // Else traverse the list and find the node before the target key
        let temp = this.headNode;
        while(temp !== null) {
            let nextNodeOnCheck = temp.nextNode;
            if (nextNodeOnCheck !== null && nextNodeOnCheck.pair.key === key) {
                temp.nextNode = nextNodeOnCheck.nextNode;
                return true;
            }
            temp = temp.nextNode;
        }

        return false;
    }
    
}

class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.pair = { key, value };
        this.nextNode = nextNode;
    }
}

export { LinkedList };