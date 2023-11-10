// bind ( )
{
    // its used to bind a function to an object
    // if g() is created by binding f() to object o, then g( ) is a method
    // of o and passing any values to g( ) are passed to f( )
    function internetExplorer(y) {
        return this.x + y; // 'this' is undefined till func is not bound to obj
    }
    var someObject = {
        x: 80
    };
    var chrome = internetExplorer.bind(someObject);
    // chrome is a method of someObject
    //
    console.log(chrome(2)); // 2 is 'y' and 80 is 'this.x', so 80+2
    //
    // OR
    //
    var chrome = internetExplorer.bind(someObject, 2); // currying
    console.log(chrome());
    //
    // call( ) and apply( ) are used to temporarily invoking fn as method
    // but bind is used to create a method from a function
    // here internetExplorer() is a function while chrome( ) is a method
}
// partial application or currying
{
    // when using bind( ) , the arguments after first one are also bound to
    // function, its called partial-application
    function f(y, z) { // a simple function
        return this.x + y + z;
    }
    var o = { // an object to bind with.
        x: 33
    };
    // bind to null
    var m1 = f.bind(null, 2); // this.x is null , y is 2 , z is undefined
    // bind to number
    var m2 = f.bind(4, 2); //  this.x is 4 , y is 2 , z is undefined
    // bind to object
    var m3 = f.bind(o, 2); // this.x is 33, y is 2, z is undefined
    // bind to string
    var m4 = f.bind("google", " ", "chrome"); // this.x=>'google',y=>' ',z=>undefined
    //
    // now invoking the method
    //
    m1(3); // null + 2 + 3 => 5
    m2(3); // 4 + 2 + 3 => 9
    m3(3); // 33 + 2 + 3 => 38
    m4(); // "google chrome"
}
// toString(anyfunction()); // returns sourcecode of anyfunction( )
//
/// function ctor
{
    // function can be created by :
    //
    // function f( ){ } // expression type
    // var f = function( ){ } // declaration type
    // var f = new Function(" ") ; // ctor type
    //
    // function created with expression or declaration type use scope
    // where they are defined but ctor type always use global scope
    //
    someVar = "globalVar";

    function expressionType() { // expression type
        var someVar = "localVar";
        return

        function () {
            return someVar;
        }
    }

    function ctorType() { // ctor type
        var someVar = "localVar";
        return
        new Function("return someVar");
    }
    // invoking both functions
    //
    expressionType()(); // localVar
    ctorType()(); // globalVar
    //
    // its because new Function() creates global-scoped function
    // while expres. or declar. creates local-scope function
}
// callable objects
{
    // as some objects are array-like. some objects are function-like too
    // they are called callable-objects all functions are callable but
    //  not all callable-objects are function.
    // regex objects are callable but are deprecated. dont use them
    // some vendor makes them behave as function, some as object
    function isArrayLike(o) { // check if object is array-like
        return {
            o && "object" === typeof o && // checking null and type
            0 < o.length && Math.pow(2, 32) > o.length && // length range
            Math.floor(o.length) === o.length // integer
    };
}

function isFunctionLike(o) { // check if object is function-like
    return Object.prototype.toString.call(o) === "[object Function]";
}
