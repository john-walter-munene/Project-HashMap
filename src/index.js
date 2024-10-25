import { HashMap } from "./app";

const testHashMap = new HashMap();

// Populate hashmap.
testHashMap.set('apple', 'red')
testHashMap.set('banana', 'yellow')
testHashMap.set('carrot', 'orange')
testHashMap.set('dog', 'brown')
testHashMap.set('elephant', 'gray')
testHashMap.set('frog', 'green')
testHashMap.set('grape', 'purple')
testHashMap.set('hat', 'black')
testHashMap.set('ice cream', 'white')
testHashMap.set('jacket', 'blue')
testHashMap.set('kite', 'pink')
testHashMap.set('lion', 'golden')

console.log(testHashMap.entries());

// Overwrite existing values.
testHashMap.set('apple', 'green');
testHashMap.set('banana', 'red');

console.log(testHashMap.entries());

// Exceeding load factor.
testHashMap.set('moon', 'silver');
console.log(testHashMap.entries());
console.log(testHashMap.length());
// console.log(testHashMap.clear());

// Test collisions:
testHashMap.set('abc', 'value1');
testHashMap.set('acb', 'value2');
testHashMap.set('bac', 'value3');
testHashMap.set('xyz', 'value1');
testHashMap.set('xzy', 'value2');
testHashMap.set('yxz', 'value3');
testHashMap.set('yzx', 'value4');
testHashMap.set('abc', 'updated_value1');
console.log(testHashMap.bucketListSize())// Should show increased size after resizing.
// console.log(testHashMap.remove('xyz'));
console.log(testHashMap.entries());

console.log(testHashMap.has('Munene'));
console.log(testHashMap.get('apple'));
console.log(testHashMap.remove('apple'));
console.log(testHashMap.has('apple'));