import { LinkedList } from "./linkedList";

class HashMap {
    constructor () {
        this.bucketsSpace = [];
        this.capacity = 16; // Initial capacity of hash map
        this.loadFactor = 0.75; // Load factor for hash table growth.
        this.createBuckets();
    }

    bucketListSize() {
        return this.bucketsSpace.length;
    }

    createBuckets() {
        // Initialize bucketsSpace to the current capacity.
        for (let counter = 0; counter < this.capacity; counter++) {
            this.bucketsSpace.push([]); // Add empty arrays as buckets.
        }
    }
    growBucketSpace() {
        let growthTriggerEntries = this.capacity * this.loadFactor;
        let entriesCount = this.countNonEmptyEntries(this.bucketsSpace);
    
        // Resize if capacity is reached
        if (entriesCount >= growthTriggerEntries) {
            this.capacity = this.capacity * 2;
    
            // Copy existing entries and clear buckets
            let existingEntries = this.entries();
            this.bucketsSpace = new Array(this.capacity).fill().map(() => []);
    
            // Rehash entries into new buckets
            existingEntries.forEach(([key, value]) => this.set(key, value));
        }

        return;
    }    
    
    countNonEmptyEntries(array, start = 0, end = array.length) {
        // Base case: If the array is not an array or is empty, return 0
        if (!Array.isArray(array) || start >= end) return 0;

        // Base case: If there's only one element in the array, check if it's not empty
        if ((end - start) === 1) return array[start].length > 0 ? 1 : 0;

        // Divide: Split array into two halves.
        const mid = Math.floor((start + end) / 2);

        // Conquer: recursively count non-empty entries in each half
        const leftCount = this.countNonEmptyEntries(array, start, mid);
        const rightCount = this.countNonEmptyEntries(array, mid, end);

        // Combine the sum of these two halves
        return leftCount + rightCount;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    getBucket(key) {
        let hashCode = this.hash(key);
        let bucketIndex = hashCode % this.bucketsSpace.length;
        let targetBucket = this.bucketsSpace[bucketIndex];
        return targetBucket;
    }

    getEntry(bucket, key) {
        for (let entry of bucket) {
            if (entry.key === key) return entry;
        }
        return null;
    }

    set(key, value) {
        let targetBucket = this.getBucket(key);
        let targetEntry = this.getEntry(targetBucket, key);

        // Grow bucket size if need be before adding new entries
        this.growBucketSpace();

        // Check if the bucket is empty
        if (targetBucket.length === 0) {
            targetBucket.push({ key, value }); // Add key-value pair directly
            return;
        }

        // If key exists, overwrite the value
        if (targetEntry) {
            targetEntry.value = value;
            return;
        }

        // If no linked list exists, create one and add current and new key-value pairs
        const linkedList = new LinkedList();
        // Add existing entry to the linked list
        for (let entry of targetBucket) {
            linkedList.append(entry.key, entry.value);
        }
        
        // Now append the new key-value pair
        linkedList.append(key, value);
        // Clear the bucket and push the linked list
        targetBucket.length = 0;
        targetBucket.push(linkedList);
    }

    get(key) {
        let targetBucket = this.getBucket(key);
        
        // Check if the bucket is empty
        if (targetBucket.length === 0) return null;

        // Check if the key is found as a single entry return value.
        let targetEntry = this.getEntry(targetBucket, key);
        if (targetEntry) return targetEntry.value;

        // If bucket contains linkedlist get value from it.
        for (let entry of targetBucket){
            if (entry instanceof LinkedList) {
                return entry.retrieve(key);
            }
        }

        return null;
    }

    has(key) {
        let targetBucket = this.getBucket(key);
        
        // Check if the bucket is empty
        if (targetBucket.length === 0) return false;

        // Loop through bucket check both single key-value pairs and linked lists
        for (let entry of targetBucket) {
            // If it's a direct key-value pair, check the key
            if (entry.key === key) return true;

            // If it's a LinkedList, check if it contains the key
            if (entry instanceof LinkedList) {
                return entry.contains(key);
            }
        }

        return false;
    }

    remove(key) {
        let targetBucket = this.getBucket(key);

        // If bucket is empty, exit.
        if (targetBucket.length === 0) return false;

        // Loop through bucket check both single key-value pairs and linked lists
        for (let entry of targetBucket) {
            // If it's a direct key-value pair, delete it there.
            if (entry.key === key) {
                targetBucket.length = 0;
                return true;
            }

            // If it's a LinkedList, check if it contains the key
            if (entry instanceof LinkedList) {
                let removedStatus = entry.delete(key);
                // If the linked list is empty after removal, clear the bucket
                if (removedStatus && entry.head() === null) targetBucket.length = 0;
                return removedStatus;
            }
        }

        return false;
    }

    clear() {
        this.bucketsSpace.length = 0;
        this.capacity = 16;
        this.createBuckets();
    }

    length() {
        let keysCount = 0;
    
        // Iterate through each bucket in the bucketsSpace
        for (let bucketCounter = 0; bucketCounter < this.bucketsSpace.length; bucketCounter++) {
            let currentBucket = this.bucketsSpace[bucketCounter];
    
            // Check if the bucket is not empty
            if (currentBucket.length === 0) continue;
    
            for (let entry of currentBucket) {
                // If entry is a LinkedList, count its size
                if (entry instanceof LinkedList) {
                    keysCount += entry.size();
                } else {
                    // Count the key-value pair directly
                    keysCount++;
                }
            }
        }
    
        return keysCount;
    }

    keys() {
        let mapKeys = [];
        
        for (let bucketCounter = 0; bucketCounter < this.bucketsSpace.length; bucketCounter++) {
            let currentBucket = this.bucketsSpace[bucketCounter];
            if (currentBucket.length === 0) continue; // Skip empty buckets
    
            for (let entry of currentBucket) {
                if (entry instanceof LinkedList) {
                    mapKeys.push(...entry.getKeys()); // Spread linked list keys into the array
                } else {
                    mapKeys.push(entry.key); // Add single key-value pair key
                }
            }
        }
        
        return mapKeys; // Return the array of keys after processing all buckets
    }

    values() {
        let mapValues = [];

        for (let bucketCounter = 0; bucketCounter < this.bucketsSpace.length; bucketCounter++) {
            let currentBucket = this.bucketsSpace[bucketCounter];
            if (currentBucket.length === 0) continue;
            for (let entry of currentBucket) {
                if (entry instanceof LinkedList) {
                    mapValues.push(...entry.getValues());
                } else {
                    mapValues.push(entry.value);
                }
            }
        }

        return mapValues;
    }

    entries() {
        let mapEntries = [];
    
        for (let bucketCounter = 0; bucketCounter < this.bucketsSpace.length; bucketCounter++) {
            let currentBucket = this.bucketsSpace[bucketCounter];
            if (currentBucket.length === 0) continue; // Skip empty buckets
    
            for (let entry of currentBucket) {
                if (entry instanceof LinkedList) {
                    // If the bucket contains a LinkedList, gather all entries from it
                    mapEntries.push(...entry.getEntries());
                } else if (entry.key !== undefined && entry.value !== undefined) {
                    // Otherwise, push the key-value pair directly
                    mapEntries.push([entry.key, entry.value]);
                }
            }
        }
    
        return mapEntries; // Return the array of entries
    }    
}

export { HashMap };