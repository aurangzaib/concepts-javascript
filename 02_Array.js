// Arrays have dynamic size
// Parse array: Array where some elements are not defined
// Push/Pop/Shift: Changes array with index update
// Delete:         Changes array without index update

// ----------------------------------------------------
// Create
// ----------------------------------------------------
var arr1 = [1, 2, 3, 4];
var arr2 = new Array(1, 2, 3, 4);

// ----------------------------------------------------
// Access
// ----------------------------------------------------
arr2[1];

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
var arr4 = arr3.slice(1, 3);        // No change in array

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
var arr4 = arr3.concat(arr1);

// ----------------------------------------------------
// Delete
// ----------------------------------------------------
delete arr3;

// ----------------------------------------------------
// Iteration
// ----------------------------------------------------
arr3.forEach((value, index) => console.log(index, value));

// ----------------------------------------------------
// Object to Array
// ----------------------------------------------------
var obj1 = { 'x': 1, 'y': 2, 'z': 3 };
var arr1 = new Array();
Object.keys(obj1).forEach((value) => arr1.push(value));
Object.values(obj1).forEach((value) => arr1.push(value));

// ----------------------------------------------------
// 2D Array
// ----------------------------------------------------
var matrix1 = [[1, 2, 3], ['a', 'b', 'c']];
var row0col0 = matrix1[1][1];
matrix1.forEach(row => {
    row.forEach(column => {
        console.log(column);
    });
});

// ----------------------------------------------------
// Sort
// ----------------------------------------------------
const ascending = (a, b) => a - b;
const descending = (a, b) => b - a;
var arr1 = [2, 1, 3];
arr1.sort(ascending);
arr1.sort(descending);

return; // Debugger Point