/*

 Description:
 Object
 
 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 21.07.13  01.00  Created												      Siddiqui
 07.11.23  02.00  Updated                                                     Siddiqui
 ---------------------------------------------------------------------------------------

*/

'use strict';

// ==========================================================================================================
// Definition
// ==========================================================================================================

// ----------------------------------------------------
// Literal Syntax 
// ----------------------------------------------------
let obj1 = { prop: 0, method() { } }

// ----------------------------------------------------
// Constructor Syntax - Recommended
// ----------------------------------------------------
let obj2 = new Object({ prop: 0, method() { } });

// ----------------------------------------------------
// Create Syntax
// ----------------------------------------------------
let obj3 = Object.create({ prop: 0, method() { } });

// ----------------------------------------------------
// Delete
// ----------------------------------------------------
delete obj3.prop;

// ----------------------------------------------------
// Example
// ----------------------------------------------------
obj1 = new Object({
    key: 0,
    setter(key) { this.key = key; },
    getter() { console.log(`(${this.key}`) },
    get key() { return this._key; },        // Note _key is read
    set key(value) { this._key = value; }   // Note _key is written
});

obj1.key = 11;
console.log(obj1.key);

// ==========================================================================================================
// Freeze
// ==========================================================================================================
obj1 = { x: 1 };
Object.freeze(const_object);

// ==========================================================================================================
// Configuration
// ==========================================================================================================

obj1 = { x: 1 };
Object.defineProperty(obj1, "x", {
    value: 33,              // Property value
    writable: false,        // Property can't be changed
    configurable: false,    // Property can't be deleted
    enumerable: false       // Property don't show up in iteration
});

// ==========================================================================================================
// Parse
// ==========================================================================================================
obj1 = { x: 1 };
obj2 = JSON.stringify(obj1);    // Object to JSON
obj1 = JSON.parse(obj2);        // JSON to Object

// ==========================================================================================================
// Inheritance
// ==========================================================================================================

// ----------------------------------------------------
// Definition
// ----------------------------------------------------
obj1 = { a: 1, b: 2, getter() { return this.a }, setter(a, b) { this.a = a; this.b = b; } };
obj2 = { x: 3, y: 4, getter() { return { x: this.x, y: this.y }; } };
obj3 = { x: 3, y: 4, a: "Hello" };

// ----------------------------------------------------
// Inheritance
// ----------------------------------------------------
Object.setPrototypeOf(obj2, obj1);                // Recommended
Object.setPrototypeOf(obj3, obj1);                // Recommended
obj2.__proto__ = obj1;                            // Deprecated

// ----------------------------------------------------
// Access
// ----------------------------------------------------
// Object 2
console.log(Object.getPrototypeOf(obj2).getter());   // Method from Object 1, Properties from Object 2
console.log(obj2.getter());                          // Method from Object 2, Properties from Object 2
obj2.setter(99, 100);                                // Method from Object 1, Properties from Object 2
// Object3
console.log(obj3.getter());                          // Method from Object 1, Properties from Object 3
console.log(obj3.a);                                 // Property from Object 3
console.log(Object.getPrototypeOf(obj3).a);          // Property from Object 1
obj3.setter(99, 100);                                // Method from Object 1, Properties from Object 3

// ----------------------------------------------------
// Iterate all properties
// ----------------------------------------------------
for (const prop in obj2) {
    console.log(prop);
}

// ----------------------------------------------------
// Iterate own properties
// ----------------------------------------------------
for (const prop in obj2) {
    if (obj2.hasOwnProperty(prop)) {
        console.log(prop);
    }
}

// ==========================================================================================================
// Composition
// ==========================================================================================================

let obj4 = { a: 1, b: 2 };
let obj5 = { x: 3, y: 4, obj: obj4 };
obj5.obj.a = 1
