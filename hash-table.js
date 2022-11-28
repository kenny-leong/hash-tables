const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(capacity = 4) {
    this.count = 0;
    this.capacity = capacity;
    this.data = new Array(this.capacity).fill(null);

  }

  hash(key) {
    let sha256str = sha256(key);
    let first8 = sha256str.slice(0, 8);
    return parseInt(first8, 16);

  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    let newPair = new KeyValuePair(key, value);

    let hashIndex = this.hashMod(key);

    if (this.data[hashIndex]) {
      throw new Error ('hash collision or same key/value pair already exists!')
    }

    this.data[hashIndex] = newPair;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    let newPair = new KeyValuePair(key, value);
    let hashIndex = this.hashMod(key);

    if (this.data[hashIndex]) {
      let node = this.data[hashIndex];
      newPair.next = node;
      this.data[hashIndex] = newPair;
      this.count++;
      return;
    }

    this.data[hashIndex] = newPair;
    this.count++;
  }

  insert(key, value) {
    let hashIndex = this.hashMod(key);
    let currNode = this.data[hashIndex];

    while (currNode && currNode.key !== key) {
      currNode = currNode.next
    }

    if (currNode) {
      currNode.value = value;
      return;
    }

    this.insertWithHashCollisions(key, value)
  }

}


module.exports = HashTable;
