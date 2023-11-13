/*

 Description:
 Basic
 
 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 21.07.13  01.00  Created												      Siddiqui
 06.11.23  02.00  Updated                                                     Siddiqui
 ---------------------------------------------------------------------------------------

*/

// ==========================================================================================================
// Notes
// ==========================================================================================================

/*

- Primitive Type: Number, Bool, Null
- Object Type: Object, Array, Function
- int and float are same (Numbers)
- Equality operators:
    ==  With implicit type conversion
    === Without implicit type conversion
- Call Object: Global object used by language to store local variables and functions
- Property Resolution: Searching chain of call objects for a local variable
- Resolution Error: When a local variables is not found in call objects
- Functions have their own internal call objects
- Undefined:  System level, unintended absence of value
- Null:       Program level, intended absence of value
- Date: 0 based months and 1 based days
- Javascript has automatic garbage collection (https://javascript.info/garbage-collection)
- Always use let/const instead of var
- var creates a global variable

*/

'use strict'

let a = 12;

// ==========================================================================================================
// Print
// ==========================================================================================================
console.log('Hello');
console.log(`${a}`);
console.log(a);

// ==========================================================================================================
// Type
// ==========================================================================================================

let variable1 = { 'x': 1 };
typeof (variable1);

// ==========================================================================================================
// Throw Error
// ==========================================================================================================

if (a > 12) {
    throw new Error("Value greater than 10");
}

// ==========================================================================================================
// Exception Handling
// ==========================================================================================================

try {
    let a = 11;
}
catch (exception) {
    console.log(exception);
}
finally {
    // After try as well as catch
}

// ==========================================================================================================
// Object
// ==========================================================================================================

// ----------------------------------------------------
// Creation
// ----------------------------------------------------

// Symbol for private property
let id = Symbol();
// Object
let obj = {
    // Public Properties
    x: 1, y: 2, z: 3,
    // Private Properties (using symbols)
    [id]: 11
};

// ----------------------------------------------------
// Copy
// ----------------------------------------------------

let obj1 = obj                                  // Referece
let obj2 = Object.assign(obj);                  // Reference 
let obj3 = structuredClone(obj);                // Copy (It doesn't work with methods)

// ----------------------------------------------------
// Access
// ----------------------------------------------------

obj.y;                                          // Access
obj.a?.b;                                       // Optional Chaining: Access only if exists
if ('x' in obj) { }                             // Exists
for (let key in obj) { console.log(key); }      // Iterate
console.log(obj[id]);                           // Access private property

// ----------------------------------------------------
// Key, Value
// ----------------------------------------------------

Object.keys(obj);       // Key Array
Object.values(obj);     // Value Array
Object.entries(obj);    // Key, Value Array