// ==========================================================================================================
// Notes
// ==========================================================================================================
/*
- Primtive Type: Number, Bool, Null
- Object Type: Object, Array, Function
- In Javascript, int and float are same
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
*/

// ==========================================================================================================
// Strings
// ==========================================================================================================

// Strings are not object, they are primitive with properties.
// When we access any of string properties, a temp object is created to...
// ... resolve property-reference. After that, wrapper object is discarded

var s = "hello";
s.len = 4;      // wrapper object will be created
var t = s.len;
console.log(t); // undefined, strings are primitive;changes done on wrap obj

// ==========================================================================================================
// With
// ==========================================================================================================
// Note: With is deprecated in ES5
var a = {
    b: {
        c: 1
    }
};
// Without with statement
a.b.c = 11;
// With with statment
with (a.b) {
    console.log(c);
}

// ==========================================================================================================
// Throw Error
// ==========================================================================================================
var a = 12;
if (a > 12) {
    throw new Error("Value greater than 10");
}

// ==========================================================================================================
// Exception Handling
// ==========================================================================================================
try {
    var a = 11;
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
var obj = {
    'x': 1,
    'y': 2,
    'z': 3
};
console.log(obj.y);
for (var key in obj) {
    console.log(key);
}