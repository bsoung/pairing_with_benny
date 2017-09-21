const fs = require('fs');

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
    this.lastNode = null;
    this._length = 0;
  }

  initialize(firstNode = null) {
    this.headNode = firstNode;
    this.lastNode = firstNode;
    this._length = 1;
  }

  addFirstNode(data) {
    this.headNode = new Node(data);
    this.lastNode = this.headNode;
    this._length = 1;
  }

  addNode(data) {
    if (!this.headNode) {
      this.addFirstNode(data);
    } else {
      const node = new Node(data);
      this.lastNode.next = node;
      this.lastNode = node;
      this._length++;
    }
  }

  addNodeAtIndex(data, index) {
    let counter = 0;
    let currentNode = this.headNode;
    let previousNode = null;
    const node = new Node(data);

    while (currentNode && counter < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      counter++;
      if (currentNode === null) break;
    }
    this._length++;
    node.next = currentNode;
    previousNode.next = node;
  }

  findNodeByIndex(index) {
    let counter = 0;
    let currentNode = this.headNode;

    while (counter < index) {
      currentNode = currentNode.next;
      ++counter;
    }

    return currentNode;
  }

  findNodeByName(value) {
    let currentNode = this.headNode;
    let counter = 2;

    while (currentNode && currentNode.data.name !== value) {
      counter++;
      currentNode = currentNode.next;
    }
    console.log(` `);
    console.log(`------------------------------------------`);
    console.log(`Finished searching after ${counter} steps`);
    console.log(`------------------------------------------`);
    console.log(` `);

    return !currentNode ? null : currentNode.data.data;
  }

  reverse() {
    // O(n)
    let currentNode = this.headNode;
    let next = null;
    let previousNode = null;

    this.lastNode = this.headNode;

    while (currentNode && currentNode.next) {
      next = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = next;
    }

    currentNode.next = previousNode;
    this.headNode = currentNode;
  }

  printList() {
    let currentNode = this.headNode;
    let previousNode = {};
    previousNode.next = true;

    while (currentNode && previousNode.next !== null) {
      console.log(currentNode.data);
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  }
}

const myList = new LinkedList();
myList.initialize();

// adding node to end
myList.addNode({ name: 'hello', data: 'hello' });
// printing
// myList.printList();

// adding multiple nodes
myList.addNode({ name: 'my', data: 'my' });
myList.addNode({ name: 'name', data: 'name' });
myList.addNode({ name: 'is', data: 'is' });
myList.addNode({ name: 'Benny', data: 'Benny' });

// adding nodes at a chosen index
myList.addNodeAtIndex({ name: 'there', data: 'there' }, 1);
myList.addNodeAtIndex({ name: 'first', data: 'first' }, 3);
// even invalid numbers work (appends to end)
myList.addNodeAtIndex({ name: 'Song', data: 'Song' }, 100000000000000000);
myList.addNodeAtIndex({ name: '2', data: '2' }, 100000000000000001);
// console.log("should say 'hello there my first name is Benny Song 2'");
// myList.printList();

// find a node at index
// console.log("should say 'first'", myList.findNode(3));

// find a node by name
// console.log(myList.findNodeByName("is"));

// console.log(myList._length);

// console.log("--before reverse--'");
// myList.printList();
myList.reverse();
// console.log("--after reverse--'");
// myList.printList();

/*
########### HASH TABLE ############
 */

class HashTable {
  constructor() {
    this.bucketSize = 0;
    this.limit = 2;
    this.buckets = [];
    // this.buckets.length = this.bucketSize
  }

  hash(word) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(word[0].toLowerCase());
  }

  insert(data) {
    const index = this.hash(data.word);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.bucketSize++;
    }

    this.buckets[index].addNode({ name: data.word, data: data.definition });

    if (this.buckets[index]._length > this.limit) {
      this.limit 
    }
  }

  balance() {
    let newBuckets = new Array(this.bucketSize * 2);
    let bucketLength = newBuckets.length;
    let node;

    for (let i = 0, len = this.bucketSize; i < len; i++) {
      for (let j = bucketLength; j > bucketLength / 2; j--) {
        node = this.buckets[i].findNodeByIndex(j);
        // this.buckets[i]
      }
    }

    

    newBuckets[0].

  }

  find(word) {
    const index = this.hash(word);
    if (!this.buckets[index]) {
      return 'not found';
    }

    const result = this.buckets[index].findNodeByName(word);

    if (!result) {
      return 'not found';
    }
    return result;
  }

  renderListLengths() {
    let average = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        console.log(`----- Length of list at index ${i} -----`);
        console.log(this.buckets[i]._length);
        average += this.buckets[i]._length / 26;
      }
    }
    console.log(`----- Average List Length -----`);
    console.log(`${Math.floor(average)}`);
  }

  renderLists() {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        console.log(`----- List at index ${i} -----`);
        this.buckets[i].printList();
      }
    }
  }
}

// O(1)
// O(n/k) where k is length of our array

// insert dictionary
const myHash = new HashTable();
let dictionary = fs.readFileSync('./dictionary.json', 'utf8');
dictionary = JSON.parse(dictionary);
let keys = Object.keys(dictionary);
keys.forEach(key => {
  myHash.insert({ word: key, definition: dictionary[key] });
});
myHash.insert({ word: 'Ian', definition: 'a totally awesome dude' });

// console.log(`Definition:`, myHash.find("car"));
// console.log(` `);
// console.log(`Definition:`, myHash.find("planet"));
// console.log(` `);
// console.log(`Definition:`, myHash.find("fdsghjs"));
// console.log(` `);
// console.log(`Definition:`, myHash.find("a"));
// console.log(` `);
// console.log(`Definition:`, myHash.find("Ian"));
// console.log(` `);

// myHash.renderLists();
// myHash.renderListLengths();
