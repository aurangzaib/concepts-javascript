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

// ==========================================================================================================
// Link
// ==========================================================================================================
// - https://www.javascripttutorial.net/javascript-factory-functions/
// - https://dev.to/bchau/factory-functions-vs-constructors-500m

// ==========================================================================================================
// Prototypal Inheritance
// ==========================================================================================================

// ----------------------------------------------------
// Defnition
// ----------------------------------------------------
let object1 = { a: 1, b: 2, getter() { return this.a }, setter(a, b) { this.a = a; this.b = b; } };
let object2 = { x: 3, y: 4, getter() { return { x: this.x, y: this.y }; } };
let object3 = { x: 3, y: 4, a: "Hello" };

// ----------------------------------------------------
// Inheritance
// ----------------------------------------------------
Object.setPrototypeOf(object2, object1);                // Recommended
Object.setPrototypeOf(object3, object1);                // Recommended
object2.__proto__ = object1;                            // Deprecated

// ----------------------------------------------------
// Access
// ----------------------------------------------------
// Object 2
console.log(Object.getPrototypeOf(object2).getter());   // Method from Object 1, Properties from Object 2
console.log(object2.getter());                          // Method from Object 2, Properties from Object 2
object2.setter(99, 100);                                // Method from Object 1, Properties from Object 2
// Object3
console.log(object3.getter());                          // Method from Object 1, Properties from Object 3
console.log(object3.a);                                 // Property from Object 3
console.log(Object.getPrototypeOf(object3).a);          // Property from Object 1
object3.setter(99, 100);                                // Method from Object 1, Properties from Object 3

// ----------------------------------------------------
// Iterate all properties
// ----------------------------------------------------
for (const prop in object2) {
    console.log(prop);
}

// ----------------------------------------------------
// Iterate own properties
// ----------------------------------------------------
for (const prop in object2) {
    if (object2.hasOwnProperty(prop)) {
        console.log(prop);
    }
}

// ==========================================================================================================
// Prototypal Composition
// ==========================================================================================================

let object4 = { a: 1, b: 2 };
let object5 = { x: 3, y: 4, obj: object1 };
object5.obj.a = 1