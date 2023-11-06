/*

 Description:
 Array
 
 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 21.07.13  01.00  Created												      Siddiqui
 06.11.23  02.00  Updated                                                     Siddiqui
 ---------------------------------------------------------------------------------------

*/

"use strict"

// Arrays have dynamic size
// Parse array: Array where some elements are not defined
// Push/Pop/Shift: Changes array with index update
// Delete:         Changes array without index update

// ----------------------------------------------------
// Create
// ----------------------------------------------------
let arr1 = [1, 2, 3, 4];
let arr2 = new Array(1, 2, 3, 4);

// ----------------------------------------------------
// Access
// ----------------------------------------------------
arr2[1];
arr2.includes(2);

// ----------------------------------------------------
// Push / Pop
// ----------------------------------------------------
arr2.pop();         // Remove element from the end
arr2.push(5, 6, 7); // Add element at the end

// ----------------------------------------------------
// Shift, Unshift
// ----------------------------------------------------
arr2.shift();       // Remove element from the start
arr2.unshift();     // Add element at the start

// ----------------------------------------------------
// Slice
// ----------------------------------------------------
let arr3 = arr2.slice(1, 3);        // No change in array

// ----------------------------------------------------
// Splice
// ----------------------------------------------------
// Arg1: Start Index
// Arg2: Count of delete / replace
// ArgN: Add when Arg2 is 0, otherwise replace
arr3.splice(1, 3);                  // Change in array
arr3.splice(1, 0, 'A');             // Add 'A', delete nothing 
arr3.splice(0, 1, 'B');             // Replace arr3[0]

// ----------------------------------------------------
// Length
// ----------------------------------------------------
arr3.length;

// ----------------------------------------------------
// Concat
// ----------------------------------------------------
let arr4 = arr3.concat(arr1);

// ----------------------------------------------------
// Iteration
// ----------------------------------------------------
arr3.forEach((value, index) => console.log(index, value));

// ----------------------------------------------------
// Object to Array
// ----------------------------------------------------
let obj1 = { 'x': 1, 'y': 2, 'z': 3 };
arr1 = new Array();
Object.keys(obj1).forEach((value) => arr1.push(value));
Object.values(obj1).forEach((value) => arr1.push(value));

// ----------------------------------------------------
// 2D Array
// ----------------------------------------------------
let matrix1 = [[1, 2, 3], ['a', 'b', 'c']];
let row0col0 = matrix1[1][1];
matrix1.forEach(row => {
    row.forEach(column => {
        console.log(column);
    });
});

// ----------------------------------------------------
// Sort
// ----------------------------------------------------
const sorter_ascending = (a, b) => a - b;
const sorter_descending = (a, b) => b - a;
arr1 = [2, 1, 3];
arr1.sort(sorter_ascending);
arr1.sort(sorter_descending);

// ----------------------------------------------------
// Map
// ----------------------------------------------------
// It applies the given function on each element of list
// Mutliply each element by 2
let arr5 = arr4.map(value => value * 2);

// ----------------------------------------------------
// Filter
// ----------------------------------------------------
// It applies given function on each element of list to filter the data
// Get even numbers
let arr6 = arr4.filter(value => value % 2 === 0)

// ----------------------------------------------------
// Split and Join
// ----------------------------------------------------
let str1 = 'A, B, C';
arr1 = str1.split(', ');
let str2 = arr1.join(', ');

return; // Debugger Point

// ----------------------------------------------------
// Destructuring
// ----------------------------------------------------
// https://javascript.info/destructuring-assignment