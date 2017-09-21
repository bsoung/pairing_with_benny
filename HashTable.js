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

  findNodeByIndex(index) {
    let counter = 0;
    let currentNode = this.headNode;

    while (counter < index) {
      currentNode = currentNode.next;
      ++counter;
    }

    return currentNode;
  }

  findNodeByValue(value) {
    let currentNode = this.headNode;
    let counter = 2;

    console.log(`Step ${counter}`);
    while (currentNode && currentNode.data !== value) {
      counter++;
      console.log(`Step ${counter}`);
      currentNode = currentNode.next;
    }

    console.log("Finished searching.");

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

// myList.addNode("my");
// myList.addNode("name");
// myList.addNode("is");
// myList.addNode("Benny");
//
// console.log("--before reverse--'");
// myList.printList();
//
// myList.reverse();
//
// console.log("--after reverse--'");
// myList.printList();

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
  }

  hash(str) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return alphabet.indexOf(str[0].toLowerCase());
  }

  insert(str) {
    const index = this.hash(str);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }
    this.buckets[index].addNode(str);
  }

  find(str) {
    console.log("Step 1 (hashing...)");
    const index = this.hash(str);
    if (!this.buckets[index]) {
      return "not found";
    }
    const result = this.buckets[index].findNodeByValue(str);
    if (!result) {
      return "not found";
    }
    return result.data;
  }

  renderList() {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        console.log(`----- List at index ${i} -----`);
        this.buckets[i].printList();
      }
    }
  }
}

const myHash = new HashTable();

myHash.insert("baby");
myHash.insert("Ian");
myHash.insert("gorilla");
myHash.insert("growth");
myHash.insert("gorgophone");
myHash.insert("ZZZZ");

console.log(myHash.find("Ian"));
// myHash.renderList();
