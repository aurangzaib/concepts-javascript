/*

 Description:
 Control
 
 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 21.07.13  01.00  Created												      Siddiqui
 06.11.23  02.00  Updated                                                     Siddiqui
 ---------------------------------------------------------------------------------------

*/
'use strict';

// ==========================================================================================================
// Hoisting
// ==========================================================================================================
// Using a variable before it is declared
// Only declaration is hoisted, not the initialization value
function hoisting() {
    console.log(child_var); // Hoisted value
    var child_var;
    child_var = 55;
    console.log(child_var); // Initialized value
}
hoisting();

// ==========================================================================================================
// Constructor Function
// ==========================================================================================================

function User(key, standard) {
    this.key = key;
    this.standard = standard;
    this.printer = () => {
        console.log(this.key);
        console.log(this.standard);
    }
}
let user1 = new User(1, 2);
let user2 = new User(11, 22);
user1.printer();

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

//  ----------------------------------------------------
//  Repeater Decorator
//  ----------------------------------------------------

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

//  ----------------------------------------------------
//  Apply (A = Array)
//  ----------------------------------------------------
function apply_fn() {
    console.log(this[0]);       // data 1
    console.log(this[1]);       // data 2
    console.log(this[2])        // data 3
}

//  ----------------------------------------------------
//  Call (C = Comma)
//  ----------------------------------------------------
function call_fn(...args) {
    console.log(this);          // data 1
    console.log(args[0]);       // data 2
    console.log(args[1]);       // data 3
}

//  ----------------------------------------------------
//  Arrow Function (Spread) - Recommended
//  ----------------------------------------------------
const arrow_fn = (...args) => {
    console.log(args[0]);       // data 1
    console.log(args[1]);       // data 2
    console.log(args[2]);       // data 3 
};

//  ----------------------------------------------------
//  Function (Spread)
//  ----------------------------------------------------
function fn(...args) {
    console.log(args[0]);       // data 1
    console.log(args[1]);       // data 2
    console.log(args[2]);       // data 3   
}

apply_fn.apply([data1, data2, data3]);
call_fn.call(data1, data2, data3);
arrow_fn(data1, data2, data3);
fn(data1, data2, data3);
