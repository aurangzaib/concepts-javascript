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

// ==========================================================================================================
// Hoisting
// ==========================================================================================================
// A variable can be used before it is defined
// Only declaration is hoisted, not the initialization
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

return;