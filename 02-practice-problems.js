function anagrams(str1, str2) {
  let firstLength = str1.length;
  let secLength = str2.length;

  if (firstLength !== secLength) return false;

  let strList1 = str1.split('');

  let newSet = new Set(strList1);
  let counter = 0;

  for (let letter of str2) {
    if (counter > 0) return false;
    if (!newSet.has(letter)) {
      counter++;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {

  let newSet = new Set(arr1);
  let res = [];

  for (let element of arr2) {
    if (newSet.has(element)) res.push(element);
  }

  return res;
}


function duplicate(arr) {
  let newSet = new Set();
  let dupe;

  for (let element of arr) {
    let initial = newSet.size;
    newSet.add(element);
    let after = newSet.size;

    if (initial == after) dupe = element;
  }
  return dupe;
}


function twoSum(nums, target) {

  let newSet = new Set(nums)

  for (let i=0; i<nums.length; i++) {
    let diff = target - nums[i]
    if (newSet.has(diff) && nums[i] !== diff) return true;
  }

  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  let patternSet = new Set();
  let stringSet = new Set();

  for (let i = 0; i < strings.length; i++) {
    patternSet.add(pattern[i]);
    stringSet.add(strings[i]);

    if(!(patternSet.size === stringSet.size)) {
      return false;
    }
  }
  return true;

}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
