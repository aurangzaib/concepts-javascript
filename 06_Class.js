
// ==========================================================================================================
// Notes
// ==========================================================================================================
/*

- With get/set, use _ with property name to avoid circular dependency (http://disq.us/p/24bprnk)
- Always use arrow functions for class method
- Always use a wrapper function in setTimeout
- Constructor can't be overloaded in javascript
- Constructor is not mandatory in class

*/

// ==========================================================================================================
// Object / Factory / Constructor / Class
// ==========================================================================================================

// ----------------------------------------------------
//  Object
// ----------------------------------------------------
let UserObject = {
    key: 0, standard: 0,
    setter(key, standard) {
        this.key = key;
        this.standard = standard;
    },
    getter() { console.log(`(${this.key}, ${this.standard})`) },
    get key() { return this._key; },        // Note _key is read
    set key(value) { this._key = value; }   // Note _key is written
};
UserObject.setter(1, 2);
UserObject.getter();

// ----------------------------------------------------
//  Factory Function
// ----------------------------------------------------
function UserFactory(key, standard) {
    return {
        key: key,
        standard: standard,
        getter: () => { console.log(`(${key}, ${standard})`); }
    }
}
let user_factory = UserFactory(11, 22);
user_factory.getter();

// ----------------------------------------------------
//  Constructor Function
// ----------------------------------------------------
function UserConstructor(key, standard) {
    this.key = key;
    this.standard = standard;
    this.getter = () => { console.log(`(${this.key}, ${this.standard})`); }
}
let user_constructor = new UserConstructor(111, 222);
user_constructor.getter();

// ----------------------------------------------------
//  Class
// ----------------------------------------------------
class UserClass {
    // Default constructor
    key = 1;
    standard = 3;
    // Parameterized contructor
    constructor(key, standard) {
        this.key = key; this.standard = standard;
    }
    getter = () => { console.log(`(${this.key}, ${this.standard})`); };
    get key() { return this._key; };            // Note _key is read
    set key(value) { this._key = value; };      // Note _key is written
};
let user_class = new UserClass(1111, 2222);
user_class.key = 1001;
user_class.getter();

// ==========================================================================================================
// Losing *this* problem 
// ==========================================================================================================

class Btn {
    constructor(value) { this.value = value; }
    getter() { console.log(this.value); }
    getter2 = () => { console.log(this.value); }
}

let btn = new Btn(5);
btn.getter();                           // Correct this
setTimeout(btn.getter, 1000);           // Lost this
setTimeout(() => btn.getter(), 1000);   // Correct this
setTimeout(btn.getter2, 1000);          // Correct this
