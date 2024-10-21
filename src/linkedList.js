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
            while (temp !== null) {
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
    
    atIndex(index) {
        let temp = this.headNode;
        let counter = 0;

        while (temp.nextNode !== null) {
            counter++;
            if (counter === index) return temp;
            temp = temp.nextNode;
        }
    }

    find(key) {
        let temp = this.headNode;
        let counter = 0;

        while (temp != null) {
            if (temp.key === key) return counter;
            temp = temp.nextNode;
            counter++;
        }

        return -1;
    }

    toString() {
        let temp = this.value;
        let string = '';

        while (temp != null) {
            string += `( ${temp.value} ) -> `;
            temp = temp.nextNode;
        }

        return string += `null`;
    }

    insertAt(value, index) {
        if (index < 0) return;  // Invalid index, return early.
    
        let temp = this.value;
        let counter = 0;
    
        // If inserting at the head (index 0)
        if (index === 0) {
            this.prepend(value);  // Reuse the prepend method to handle insertion at the head
            return;
        }
    
        // Traverse the list to find the correct position
        while (temp != null) {
            if (counter === index - 1) {  // We stop at the node just before the insertion point
                let newNode = new Node(value);  // Create a new node with the given value
                let currentNodeToEnd = temp.nextNode;  // Save reference to the next node
                newNode.nextNode = currentNodeToEnd;  // Point new node to the next node
                temp.nextNode = newNode;  // Point current node to the new node
                return;
            }
            temp = temp.nextNode;  // Move to the next node in the list
            counter++;
        }
    }

    removeAt(index) {
        if (index < 0 || this.value === null) return;
    
        // If removing the head (index 0)
        if (index === 0) {
            this.value = this.value.nextNode;
            return;  // Exit after removing the head
        }
    
        let temp = this.value;
        let counter = 0;
    
        // Traverse the list to find the node before the one to be removed
        while (temp != null) {
            if (counter === index - 1 && temp.nextNode != null) {
                // Remove the node by updating the pointer
                temp.nextNode = temp.nextNode.nextNode;
                return;
            }
            temp = temp.nextNode;
            counter++;
        }
    }    
    
}

class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.pair = { key, value };
        this.nextNode = nextNode;
    }
}

export { LinkedList };