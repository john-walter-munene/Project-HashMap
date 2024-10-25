# Custom Dynamic HashMap Implementation

This project is a custom JavaScript implementation of a HashMap data structure using separate chaining for collision handling and dynamic resizing to ensure optimal performance as the number of elements grows.

## Features

- **Separate Chaining:** Uses linked lists within each bucket to handle hash collisions.
- **Dynamic Resizing:** Automatically resizes and rehashes entries when the load factor exceeds a threshold.
- **Basic Methods:** Supports standard `set`, `get`, `delete`, and `has` operations for adding, retrieving, and removing key-value pairs.
- **Utility Methods:** Includes methods to get all keys, all values, the count of entries, and to clear the HashMap.

## Installation

Clone this repository to your local machine:
```bash
git clone https://github.com/john-walter-munene/Project-HashMap
cd Project-HashMap

npm install
npm run build
```

## Usage

Here’s a quick example demonstrating how to use this HashMap:

```javascript
import { HashMap } from "./app";
// Initialize hashmap
const myHashMap = new HashMap();

// Set key-value pairs
myHashMap.set('apple', 1);
myHashMap.set('banana', 2);

// Get a value
console.log(myHashMap.get('apple')); // Outputs: 1

// Check existence of a key
console.log(myHashMap.has('banana')); // Outputs: true

// Delete a key
myHashMap.delete('banana');

// Get all keys and values
console.log(myHashMap.keys());    // Outputs: ['apple']
console.log(myHashMap.values());  // Outputs: [1]

// Clear the hashmap
myHashMap.clear();
console.log(myHashMap.length());   // Outputs: 0
```

## API Reference

### `set(key, value)`
Adds a key-value pair to the HashMap. If the key already exists, updates its value.

- **Parameters:**
  - `key` (any type): The key to add or update.
  - `value` (any type): The value to associate with the key.
- **Returns:** `void`

### `get(key)`
Retrieves the value associated with the given key.

- **Parameters:**
  - `key` (any type): The key whose value you want to retrieve.
- **Returns:** The value associated with the key, or `null` if the key does not exist.

### `has(key)`
Checks if the HashMap contains the specified key.

- **Parameters:**
  - `key` (any type): The key to check.
- **Returns:** `boolean` indicating the presence of the key.

### `delete(key)`
Removes the key-value pair from the HashMap.

- **Parameters:**
  - `key` (any type): The key to delete.
- **Returns:** `boolean` indicating whether the deletion was successful.

### `clear()`
Removes all entries from the HashMap, resetting its size.

- **Returns:** `void`

### `length()`
Returns the count of non-empty entries currently in the HashMap.

- **Returns:** `number`

### `keys()`
Returns an array of all keys in the HashMap.

- **Returns:** `Array`

### `values()`
Returns an array of all values in the HashMap.

- **Returns:** `Array`

### `entries()`
Returns an array of all key-value pairs in the HashMap as an array of arrays.

- **Returns:** `Array`

### Internal Methods

#### `growBucketSpace()`
Doubles the size of the internal storage (bucket array) and rehashes all current entries. This is called automatically when the load factor exceeds the predefined threshold.

- **Returns:** `void`

#### `countNonEmptyEntries(array, start = 0, end = array.length)`
Counts the number of non-empty entries in a given array (bucket).

- **Parameters:**
  - `array` (Array): The array to check for non-empty entries.
  - `start` (number): The starting index (default is 0).
  - `end` (number): The ending index (default is the length of the array).
- **Returns:** `number`

#### `hash(key)`
Computes the hash code for a given key.

- **Parameters:**
  - `key` (string): The key to hash.
- **Returns:** `number`

## Design Notes

- **Collision Handling:** Implemented via separate chaining, where each bucket uses a linked list to store multiple entries with the same hash index.
- **Resizing and Load Factor:** To maintain performance, the hash map automatically resizes when the load factor exceeds a set threshold.

## Testing

To run tests, use a testing framework like `Jest` or add your test cases to verify the correctness of the methods and resizing behavior.
