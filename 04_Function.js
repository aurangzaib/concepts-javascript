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
// Self Invocation Function
// ==========================================================================================================

const result = (() => {
    let a = 2, b = 3;
    return a + b;
})();

// ==========================================================================================================
// Passing context
// ==========================================================================================================

const outer_function = (self) => {
    console.log(self.prop);
}

const parent = {
    prop: "Hello",
    inner_function() {
        let self = this;
        outer_function(self);
    }
};

parent.inner_function();

// ==========================================================================================================
// Argument Identifier
// ==========================================================================================================
// Note: Arrow functions have no argument identifier
function some_function() {
    console.log(arguments[1]);
    console.log(arguments.length);
}
some_function(1, 2, 3);

// ==========================================================================================================
// Procedure - Function without return value
// ==========================================================================================================

const procedure = () => {
    // Do some task
    // No return value
}

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
func = (a, t) => {
    const id = setInterval(() => { console.log(a) });
    setTimeout(() => { clearInterval(id) }, t);
}
func(1, 1000);

// ----------------------------------------------------
// Repeat Every T seconds for N Times
// ----------------------------------------------------
func = (a, t, n) => {
    let counter = 0;
    // Set Repeater
    const id = setInterval(() => {
        counter += 1; console.log(a);
        // Reset Repeater
        if (counter >= n) { clearInterval(id); }
    }, t);
}
func(3, 1000, 10);

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
// Call vs Apply vs Spread
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
//  Apply (A = Array) - Deprecated
// ----------------------------------------------------
function apply_fn() {
    console.log(this[0]);       // data 1
    console.log(this[1]);       // data 2
    console.log(this[2])        // data 3
}

// ----------------------------------------------------
//  Call (C = Comma) - Deprecated
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
// Currying / Partial Functions
// ==========================================================================================================

// ----------------------------------------------------
//  Function
// ----------------------------------------------------
function print_function(a, b, c) { console.log(a, b, c); }
print_function(1, 2, 3);

// ----------------------------------------------------
//  Currying
// ----------------------------------------------------
// Function(a,b,c) => Function(a)(b)(c)
function curry(f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return f(a, b, c);
            }
        }
    }
}
let print_curry = curry(print_function);
print_curry(1)(2)(3);

// ----------------------------------------------------
//  Partial Function
// ----------------------------------------------------
// Function(a,b,c) => Function(a, c)
function print_partial(a, c) {
    return print_function(a, 2, c);
}
print_partial(1, 3);

// ==========================================================================================================
// Closure
// ==========================================================================================================

// - Definition: Nested function has access to parent function scope even after parent function is terminated
// - Reason:     Function gets the value where they are defined not where they are invoked
// - Benefit:    It is a data hiding mechanism
// - Note:       A parent function depending upon nested function value is not a closure
function parent(outer_value) {
    function child(inner_value) {
        return outer_value + inner_value;
    }
    return child;
}

const a = parent(1);
const b = parent(2);
console.log(a(2));
console.log(b(2));
