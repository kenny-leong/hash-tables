class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null)
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {

    if (this.count / this.capacity > 0.7) {
      this.resize();
    }

    let hashIndex = this.hashMod(key);
    let currNode = this.data[hashIndex];

    while (currNode && currNode.key !== key) {
      currNode = currNode.next;
    }

    if (currNode) {
      currNode.value = value;
      return;
    }

    let newPair = new KeyValuePair(key, value);

    if (this.data[hashIndex]) {
      newPair.next = this.data[hashIndex];
      this.data[hashIndex] = newPair;
      this.count++;
      return;
    }

    this.data[hashIndex] = newPair;
    this.count++;
  }


  read(key) {

    let hashIndex = this.hashMod(key);
    let currNode = this.data[hashIndex];

    while (currNode && currNode.key !== key) {
      currNode = currNode.next;
    }

    if (currNode) return currNode.value;
  }


  resize() {
    let copiedData = this.data;

    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    copiedData.forEach(element => {
      while (element) {
        this.insert(element.key, element.value);
        element = element.next;
      }
    });
  }


  delete(key) {
    let hashIndex = this.hashMod(key);
    let currNode = this.data[hashIndex];


    //find the node before the to be deleted node
    while (currNode && currNode.key !== key) {
      currNode = currNode.next;
    }

    if (currNode && currNode.next) {
      currNode.key = currNode.next.key
      currNode.value = currNode.next.value;
      currNode.next = currNode.next.next;
      this.count--;
    } else if (currNode && !currNode.next) {
        currNode.key = undefined;
        currNode.value = undefined;
        this.count--;
    } else {
      return `Key not found`
    }
  }
}


module.exports = HashTable;
