/*

 Description:
 Inheritance
 
 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 07.11.23  02.00  Updated                                                     Siddiqui
 ---------------------------------------------------------------------------------------

*/

// ==========================================================================================================
// Link
// ==========================================================================================================

// - https://javascript.info/class-inheritance

// ==========================================================================================================
// Base
// ==========================================================================================================

class BaseClass {
    constructor(value = 99) {
        this.property1 = value;
    }
    getter() {
        return this.property1;
    }
}

// ==========================================================================================================
// Inheritance
// ==========================================================================================================

class SubClassInheritance extends BaseClass {
    constructor(value1, value2) {   // Sub constructor
        super(value1);              // Base constructor
        this.property2 = value2;
    }
    getter() {
        this.property1 += 1;
        return super.getter()       // Base method
    }
    getter_sub() {                  // Sub metho
        return this.property2;
    }
}

let ins_inheritance = new SubClassInheritance(103, 203);
console.log(ins_inheritance.getter());
console.log(ins_inheritance.getter_sub());

// ==========================================================================================================
// Composition (With Dependency Injection)
// ==========================================================================================================

class SubClassComposition {
    constructor(base, value) {   // Sub constructor
        this.base = base;
        this.property_sub = value;
    }
    getter() {
        this.base.property += 1;
        return this.base.getter();
    }
    getter_sub() {
        return this.property_sub;
    }
}

let ins_composition = new SubClassComposition(new BaseClass(), 33);
console.log(ins_composition.getter());
console.log(ins_composition.getter_sub());
