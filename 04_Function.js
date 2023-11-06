
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
