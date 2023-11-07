/*

 Description:
 Function
 
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
// Arrow Functions
// ==========================================================================================================

// Arrow functions can't be called with new

// ----------------------------------------------------
// Default return
// ----------------------------------------------------
var getter = (a, b) => a * b;
console.log(getter(1, 2));

// ----------------------------------------------------
// Object return
// ----------------------------------------------------
getter = (a, b) => ({ 'x': a, 'y': b });    // Note () around object
getter = (a, b) => {
    return { 'x': a, 'y': b }
}
console.log(getter(1, 2));

// ----------------------------------------------------
// No separate internal this
// ----------------------------------------------------
// Arrow functions don't define their own this
let objects = {
    students: [{ name: 'Aisha', class: 2 }, { name: 'Amna', class: 3 }],
    school: 'RoseLand Public School',
    printer() {
        this.students.forEach(student => {
            console.log(`School: ${this.school}`);      // *this* is from outer scope
            console.log(`Student: ${student.name}`);
        });
    }
}
objects.printer();

// ==========================================================================================================
// Timeout and Interval
// ==========================================================================================================

// ----------------------------------------------------
// Start After T seconds
// ----------------------------------------------------
var func = (a, b, t) => {
    setTimeout(() => { console.log(a, b) }, t);
}
func(1, 2, 1000);

// ----------------------------------------------------
// End after T seconds
// ----------------------------------------------------
func = (a, b, t) => {
    const id = setInterval(() => { console.log(a, b) });
    setTimeout(() => { clearInterval(id) }, t);
}
func(1, 2, 1000);

// ----------------------------------------------------
// Repeat Every T seconds for N Times
// ----------------------------------------------------
func = (a, b, t, n) => {
    let counter = 0;
    // Set Repeater
    const id = setInterval(() => {
        counter += 1; console.log(a, b);
        // Reset Repeater
        if (counter >= n) { clearInterval(id); }
    }, t);
}
func(3, 4, 1000, 10);

// ----------------------------------------------------
// Note
// ----------------------------------------------------
// If a function takes longer than setInterval, interpreter waits until function is complete

// ==========================================================================================================
// Spread and Rest Parameters
// ==========================================================================================================

func = (a, b, ...other) => { // var is used to redefine func later, not possible with let
    console.log(a);
    console.log(b);
    console.log(other);         // Rest
    console.log(...other);      // Spread
};

func(1, 2, 3, 4, 5, 6);

// ==========================================================================================================
// Hoisting
// ==========================================================================================================

// Using a variable before it is declared
// Only declaration is hoisted, not the initialization value
func = () => {
    console.log(child_var); // Hoisted value
    var child_var;
    child_var = 55;
    console.log(child_var); // Initialized value
}
func();

// ==========================================================================================================
// Recursion
// ==========================================================================================================

// https://javascript.info/recursion

// ==========================================================================================================
// Decorator
// ==========================================================================================================

let multiplier = (...args) => {
    return args.reduce((a, b) => a * b);
};

// ----------------------------------------------------
// Timer Decorator
// ----------------------------------------------------
const timer = (func) => {
    return (...args) => {               // return wrapper function
        let t1 = Date.now();            // Start time
        let data = func(...args);       // Call decorated function
        let t2 = Date.now();            // End time
        console.log(`${t2 - t1}ms`);
        return data;                    // Return result of decorated function
    }
};

// ----------------------------------------------------
//  Repeater Decorator
// ----------------------------------------------------
const n_times = (n, func) => {
    return (...args) => {
        let counter = 0;
        const id = setInterval(() => {
            // Run the decorated function
            let data = func(...args);
            console.log(`Output: ${data}`);
            // Stop the Interval
            counter += 1;
            if (counter === n) { clearInterval(id); }
        }, 1000);
    };
};
multiplier = n_times(10, multiplier);
multiplier(1, 2, 3);

// ==========================================================================================================
// Call vs Apply vs Function vs Arrow
// ==========================================================================================================

// - Call:
//      - It takes N arguments
//      - First argument binds to this
//      - Other arguments as parameter (spread)
// - Apply:
//      - It takes only one argument (list). List binds to this

let data1 = { x: 1, y: 2, z: 3 };
let data2 = [1, 2, 3];
let data3 = 99

// ----------------------------------------------------
//  Apply (A = Array)
// ----------------------------------------------------
function apply_fn() {
    console.log(this[0]);       // data 1
    console.log(this[1]);       // data 2
    console.log(this[2])        // data 3
}

// ----------------------------------------------------
//  Call (C = Comma)
// ----------------------------------------------------
function call_fn(...args) {
    console.log(this);          // data 1
    console.log(args[0]);       // data 2
    console.log(args[1]);       // data 3
}

// ----------------------------------------------------
//  Arrow Function (Spread) - Recommended
// ----------------------------------------------------
const arrow_fn = (...args) => {
    console.log(args[0]);       // data 1
    console.log(args[1]);       // data 2
    console.log(args[2]);       // data 3 
};

// ----------------------------------------------------
//  Function (Spread)
// ----------------------------------------------------
function func(...args) {
    console.log(args[0]);       // data 1
    console.log(args[1]);       // data 2
    console.log(args[2]);       // data 3   
}

apply_fn.apply([data1, data2, data3]);
call_fn.call(data1, data2, data3);
arrow_fn(data1, data2, data3);
func(data1, data2, data3);

// ==========================================================================================================
// Partial Functions
// ==========================================================================================================
// ....

// ==========================================================================================================
// Closure
// ==========================================================================================================

// - A nested function returned from inside another function
// - It has access to enclosing function scope even after enclosing function is terminated
// - It is a data hiding mechanism
func = () => {
    const a = 3, b = 4;
    return () => {
        return [a, b];
    }
};
let closure = func();
let data = closure();
console.log(...data);
