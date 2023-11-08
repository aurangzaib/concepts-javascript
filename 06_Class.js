/*

 Description:
 Class
 
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
// - https://javascript.info/mixins

// ==========================================================================================================
// Notes
// ==========================================================================================================
/*

- With get/set, use _ with property name to avoid circular dependency (http://disq.us/p/24bprnk)
- Always use a wrapper function in setTimeout
- Constructor can't be overloaded in javascript
- Constructor is not mandatory in class

- Protected property is NOT a language feature
- Private property is a language feature
- Private property is not inherited by subclass
- Private property can't be accessed from instance
- Private property can be accessed by public/private methods

- Public method can access public, protected, private, static properties
- Static method can access only static property
- Static method can only be called using Class

*/

// ==========================================================================================================
// Definition
// ==========================================================================================================

class Cls {

    // Default Constructor
    public_property = 0;            // Private Property
    #private_property = 0           // Protected Property
    _protected_property = 0         // Public Property
    static static_property = 0;     // Static Property

    // Parameterized Constructor
    constructor(value = 0) {
        this.public_property = value;
        this.#private_property = value * 2;
        this._protected_property = value * 3;
        this.constructor.static_property = value * 4;
    }

    // Private Method
    #get_private_property() {
        return this.#private_property;
    }

    // Public Method (Static access with constructor)
    print() {
        console.log("Public: ", this.public_property);
        console.log("Private: ", this.#get_private_property());
        console.log("Protected: ", this._protected_property);
    }
    access() {
        return {
            public: this.public_property,
            private: this.#private_property,
            static: this.constructor.static_property
        }
    }

    // Static method (Static access without constructor)
    static static_method() {
        return this.static_property;
    }
}

let ins = new Cls(1);
ins._protected_property;
ins.public_property;
ins.print();

console.log(ins instanceof Cls);
console.log(Cls.prototype.isPrototypeOf(ins));

console.log(ins.access());
console.log(Cls.static_method()); // Can't be invoked with an instance

// ==========================================================================================================
// Object / Factory / Constructor / Class
// ==========================================================================================================

// ----------------------------------------------------
// Object                                 - Without new
// ----------------------------------------------------
let MyObject = {
    key: 0,
    setter(key) { this.key = key; },
    getter() { console.log(this.key); }
};
MyObject.setter(1);
MyObject.getter();

// ----------------------------------------------------
// Factory Function         - Without new. Without this
// ----------------------------------------------------
function MyFactory(key) {
    return {
        key: key,
        getter() { console.log(key); }
    }
}
let my_factory = MyFactory(11);
my_factory.getter();

// ----------------------------------------------------
// Constructor Function                      - With new
// ----------------------------------------------------
function MyConstructor(key) {
    this.key = key;
    this.getter = () => { console.log(this.key); }
}
let my_constructor = new MyConstructor(111);
my_constructor.getter();

// ----------------------------------------------------
// Class                                     - With new
// ----------------------------------------------------
class MyClass {
    constructor(key) { this.key = key; }
    getter() { console.log(this.key); };
};
let my_class = new MyClass(1111);
my_class.getter();

// ==========================================================================================================
// Lost *this* 
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

// ==========================================================================================================
// Mixins
// ==========================================================================================================
