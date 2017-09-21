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

let counter = 0;

class HashTable {
  constructor(limit = 2) {
    this.bucketsArrayLength = 0;
    this.limit = limit;
    this.buckets = [];
  }

  hash(word) {
    console.log(word);
    // let total = 0;
    // for (let i = 0; i < word.length; i++) {
    //   total += word.charCodeAt(i);
    // }
    // return total % this.bucketsArrayLength;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(word[0].toLowerCase()) % this.bucketsArrayLength;
  }

  insert(data) {
    const index = this.hash(data.word);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].initialize();
      this.bucketsArrayLength++;
    }

    this.buckets[index].addNode({ name: data.word, data: data.definition });

    if (this.buckets[index]._length > this.limit) {
      this.balance();
    }
  }

  balance() {
    const size = this.bucketsArrayLength;
    let oldBuckets = this.buckets;
    this.buckets = [];
    // let newBuckets = new Array(size * 2);
    let node;

    counter++;

    // old buckets:
    // [*] [*] [*] [*] [*] [*] [*]
    //
    // newBuckets:
    // [] [] [] [] [] [] [] [] [] [] [] [] [] []
    //
    // filling in every other with old buckets:
    //
    // [*] [] [*] [] [*] [] [*] [] [*] [] [*] [] [*] []
    //
    // initializing empty buckets as LL:
    //
    // [*] [L] [*] [L] [*] [L] [*] [L] [*] [L] [*] [L] [*] [L]
    //
    // start from end of each LL and push to next (+ 1) LL:
    //
    // end result:
    // [*] [*] [*] [*] [*] [*] [*] [*] [*] [*] [*] [*] [*] [*]
    //             (each is half as long now)
    //

    this.bucketsArrayLength = size * 2;

    for (let i = 0; i < 4000; i++) {
      if (oldBuckets[i]) {
        for (let j = 0; j < oldBuckets[i]._length; j++) {
          node = oldBuckets[i].findNodeByIndex(j);
          if (node && node.name && node.data) {
            this.insert({ word: node.name, definition: node.data });
          }
        }
      }
    }

    // this.buckets = newBuckets;
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
const myHash = new HashTable(1);
// let dictionary = fs.readFileSync('./dictionary.json', 'utf8');
// dictionary = JSON.parse(dictionary);
// let keys = Object.keys(dictionary);
// keys.forEach(key => {
//   myHash.insert({ word: key, definition: dictionary[key] });
// });
myHash.insert({ word: 'eIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'jIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'tIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'yIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'gIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'gIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'sIan', definition: 'a totally awesome dude' });
myHash.insert({ word: 'fIan', definition: 'a totally awesome dude' });

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
myHash.renderListLengths();
console.log('called', counter, 'times');

// eIan
// jIan
// tIan
// yIan
// gIan
// gIan
// sIan
// fIan
// ----- Length of list at index 0 -----
// 3
// ----- Length of list at index 1 -----
// 1
// ----- Length of list at index 5 -----
// 2
// ----- Length of list at index 6 -----
// 1
// ----- Average List Length -----
// 0
// called 3 times
