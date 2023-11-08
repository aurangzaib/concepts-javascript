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
        this.property = value;
    }
    getter() {
        return this.property;
    }
}

// ==========================================================================================================
// Inheritance
// ==========================================================================================================

class SubClassInheritance extends BaseClass {
    constructor(value1, value2) {   // Sub constructor
        super(value1);              // Base constructor
        this.property_sub = value2;
    }
    getter() {
        this.property += 1;
        return super.getter()       // Base method
    }
    getter_sub() {                  // Sub metho
        return this.property_sub;
    }
}

let sub_ins_inheritance = new SubClassInheritance(103, 203);
console.log(sub_ins_inheritance.getter());
console.log(sub_ins_inheritance.getter_sub());

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

let sub_ins_coposition = new SubClassComposition(new BaseClass(), 33);
console.log(sub_ins_coposition.getter());
console.log(sub_ins_coposition.getter_sub());