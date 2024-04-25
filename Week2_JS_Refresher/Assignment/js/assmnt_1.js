"use strict";

// 1. Write a JavaScript function to calculate the sum of two numbers.

// function getSum(x, y) {
//   return x + y;
// }

// 2. Write a JavaScript function to check if a given string is a palindrome.

// function isPalindrome(tempString){
//     tempString = tempString.replace(/\W+/g, '');
//     console.log(tempString);
//     let iterations;
//     let flag;
//     if (tempString.length%2 == 0){
//         iterations =  tempString.length/2;
//     } else {
//         iterations =  (tempString.length-1)/2;

//     }
//     for (let i=0; i<iterations; i++){
//         if (tempString[i].toLowerCase()==tempString[tempString.length-1-i].toLowerCase()){
//             flag = true;
//         } else{
//             flag = false;
//             break;
//         }
//     }
//     return flag;
// }
// console.log( isPalindrome('A man, a plan, a canal – Panama'));

// 3. Write a JavaScript program to reverse a given string.

// function reverseString(tempString) {
//   let reversedString = '';
//   console.log(reversedString);
//   for (let i = 0; i < tempString.length; i++) {
//     // reversedString[i]= tempString[tempString.length-1-i]; // ******* DOES NOT WORK ******* : Strings are immutable in JS, you can concat but not change existing chars
//     reversedString+=tempString[tempString.length-1-i]
//   }
//   return reversedString;
// }

// console.log( reverseString('boo'));

// 4. Write a JavaScript function that takes an array of numbers and returns a
// new array with only the even numbers.

// function filterOddOutFromArr(arr) {
//   let tempArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 == 0) {
//       tempArr.push(arr[i]);
//     }
//   }

//   arr = tempArr;
//   return arr;
// }

// console.log(filterOddOutFromArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// 5. Implement a deep clone function in JavaScript that creates a copy of a
// nested object or array without any reference to the original.

// function getDeepClone(obj) {
//   // DOES NOT WORK if obj has methods or classes
//   objClone = JSON.parse(JSON.stringify(obj));
//   return objClone;
// }

// // using lodash

// const _lodash = require("lodash");

// function getDeepCloneLodash(obj) {
//   let objClone = _lodash.cloneDeep(obj);
//   return objClone;
// }

// 6. Implement a function to reverse a string without using the built-in reverse ()
// method.

// function reverseString(tempString) {
//   let reversedString = '';
//   console.log(reversedString);
//   for (let i = 0; i < tempString.length; i++) {
//     // reversedString[i]= tempString[tempString.length-1-i]; // ******* DOES NOT WORK ******* : Strings are immutable in JS, you can concat but not change existing chars
//     reversedString+=tempString[tempString.length-1-i]
//   }
//   return reversedString;
// }

// console.log( reverseString('boo'));

// 7. Implement a function to find the sum of all the numbers in an array.

// function getSumOfArr(arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum;
// }
// console.log(getSumOfArr([1,2,5]));

// 8. Write a function that accepts a number and returns its factorial (e.g.,
// factorial of 5 is 5 x 4 x 3 x 2 x 1).

// function getFactorialOfArr(num) {
//   let factorialOfNum = 1;
//   for (let i = num; i > 0; i--) {
//     factorialOfNum = factorialOfNum * i;
//   }
//   return factorialOfNum;
// }
// console.log(getFactorialOfArr(5));

// 9. Implement a function that returns the average value of numbers in an array.

// function getMean(arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum/arr.length;
// }
// console.log(getMean([1,2,3,9,8]));

// 10. Implement a function that finds the index of a specific element in an array.
// If the element is not found, the function should return -1.

// function getIndex(element, arr) {
//     let index = -1;
//   for (let i = 0; i < arr.length; i++) {
//     if (element == arr[i]){
//         index = i;
//         break;
//     }
//   }
//   return index;
// }
// console.log(getIndex(8, [1,2,3,9,8]));

// 11. How would you check if a number is an integer?

// function isInteger(num) {
//   if ((Math.floor(num) == num) | (num == 0)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// console.log(isInteger(-50.6));

// 12. Create a function that takes the age in years and returns the age in days.

// function getDaysFromYears(age){
// return age*365.242374 
// }

// console.log(getDaysFromYears(55));

// 13. Explain what a callback function is and provide a simple example.

// A callback function is one that gets called in other functions.
// Callback functions are useful for executing functions in a desired order
// when dealing with asynchronous functions.

// function callerFunction(callback){
//     console.log('execute this first');
//     callback();
// }

// callerFunction(()=>{
//     console.log('execute this second');
// })

