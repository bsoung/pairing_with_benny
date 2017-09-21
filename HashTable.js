// Linked List

// Build a linked list node that contains the word and its
// definition (and anything else you need)
// Build a basic linked list class that allows you to:
// Create the list
// Read nodes at a particular index (add a console.log which tracks
//   the crawler's progress or at least returns the number of steps).
//   In the comments, state the Big-O time of this operation.
// Insert nodes at a particular index or, separately, at the end of the
// list (so store a reference to the last node). In the comments, state the
// Big-O time of this operation.

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
  }

  initialize(firstNode = null) {
    this.headNode = firstNode;
    this.lastNode = firstNode;
  }

  addFirstNode(data) {
    this.headNode = new Node(data);
    this.lastNode = this.headNode;
  }

  addNode(data) {
    if (!this.headNode) {
      this.addFirstNode(data);
    } else {
      const node = new Node(data);
      this.lastNode.next = node;
      this.lastNode = node;
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

    node.next = currentNode;
    previousNode.next = node;
  }

  findNode(index) {
    let counter = 0;
    let currentNode = this.headNode;

    while (counter < index) {
      currentNode = currentNode.next;
      ++counter;
    }

    return currentNode;
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
// console.log('empty list?');
// myList.printList();

myList.initialize();
// myList.addNode('hello');

// console.log("should say 'hello'");
// myList.printList();

myList.addNode('my');
myList.addNode('name');
myList.addNode('is');
myList.addNode('Benny');

console.log("--before reverse--'");
myList.printList();

myList.reverse();

console.log("--after reverse--'");
myList.printList();

// myList.addNodeAtIndex('there', 1);
// myList.addNodeAtIndex('first', 3);
// myList.addNodeAtIndex('Song', 100000000000000000);
// myList.addNodeAtIndex('2', 100000000000000001);

// console.log("should say 'hello there my name is benny'");
// myList.printList();

// console.log("should say 'first'", myList.findNode(3));
//
//
// --before reverse--'

/*
########### HASH TABLE ############
 */

class HashTable {
  constructor() {
    this.buckets = [];
    this.bucketLength = this.buckets.length;
  }

  // initialize() {
  //   this.bucke
  //   const linkedList = new LinkedList();


  // }

  hash(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(str[0].toLowerCase());
  }

  insert()
}








