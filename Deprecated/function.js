// when function is invoked on/thru object, then object is 'this'
// 'this' is called 'invocation context'
// funct for creating obj are ctor, func are 'obj with behaviour'
//
// first class citizen => which can be
//    constructed at runtime,
//    passed as arg,
//    return from func,
//    assign to variable
//
{
    var a = function () { // nameless func, func only definition not invoked
        return 2 * 2;
    },
        b = (function (x) { // func definition and invoc both at once
            return x * x; // definition
        }(2)); // invoc
};
//
// when statement type fn definition used, it creates a local var and assign fn to it
// express type func definition is used when using for single time
//
// func are hoisted i.e. var defined can be used in that func before the
// definition of that var. its only true for declaration statement func and not
// for express type, express fn shld be assigned to var, then it can be hoisted
//
// funct with no return are 'procedures'
//
//declare/statement func can not appear in loop, conditional, with, try/catch
//express func can appear
//
{ // syntax to add property in object
    var myObject = {
        property1: 1,
        property2: 2,
        add: function () {
            this.result = this.property1 + this.property2;
        }
    }
    myObject.add(); // invocation type
    // myObject[ "add" ] // expression type, can be evaluated at runtime
    console.log(myObject.result); // 3
    //
    // method chaining : cascading multiple methods with each other but
    // each method should return 'this' in order to cascade
    // myObject.setX(32).setY(34).setFill(34); // cascaded
}
//
// when 'this' is invoked on "method" then its value is of that of object
// when 'this' is invoked on "fn" then its either global obj(for non-strict)
// or undefined ( for strict js mode )
//
// nested loop cant use 'this' of parent loop. to have value of 'this'
// save it in a var, usually 'self'
//
// using self and this
//
{
    var anObject = {
        // no property, only handling method
        memberFunction: function () {
            var self = this;
            // 'this' has value of obj on which memberFunction( ) called
            console.log(this === anObject); // true, b/c within method
            someFunction(self); // nested loop
        }
    };

    function someFunction(self) {
        console.log(this === anObject);
        // false as nested loop can't have value of 'this'
        console.log(self === anObject);
        // true as value of this was saved in self
        // local var value can be used in nest but not of 'this'
    }
}
//
// ctor dont have return. it implicitly returns newly created
// obj at end of ctor. if return is used with no or primitve value,
// value is ignored and new object is returned
//
// js dont have any checking for type of arguments, it even doesnt check for # of arg.
// sometimes func can be invoked with lesser argu. for e.g
//
{
    function objectToArray(someObject, array) {
        array = array || [];
        for (var property in someObject) { // property is iterating enum-prop of object
            if (Object.prototype.hasOwnProperty(someObject, property)) {
                array.push(property);
            }
        }
    }
    // in this way optional arg can be tackled. remember to make optional arg always
    // 2nd, otherwise user have to provide undefined explicitly to ignore the arg
    // || return 1st value if true, 2nd if false
    var o = {
        1, 2, 3, 4, 5
    };
    objectToArray(o); // func invocation, 2ng arg not provided
}
// identifier 'arguments'
{
    // arguments.length shows actual # of args provided
    // while 'callee.arguments.length' shows expected/intended # of args
    // identifier 'arguments' can be used to know if provided arg are more than
    // intended param. its like array and it accesses arg in array element form
    //
    chrome(a, b); // invocation, 2 param provided

    function chrome() { // definition, no argu intended
        console.log(arguments[1]); // print value of chrome[1] i.e. b
        // 'arguments' iterates on args in element form
    }
    // 'arguments' is not an array but it has length prop
    alert(arguments.length); // 2 in chrome example
    // leaving extra arg ( more than param ) is not problem as js make them
    // undefined but 'arguments' is useful in cases where you expect any # of args

    function greaterNum() { // it shows > #
        var max = Number.NEGATIVE_INFINITY; // near to -(infinity)
        for (var i in arguments) {
            if (max < arguments.i) { // arguments[i]
                max = arguments.i;
            }
        }
        return max; // max has >> # out of all param
    }
    console.log(greaterNum(6, 8, 2, 900, 30, 1000)); // any # of param
    //
    // another use is to notify that param are > arg

    function notifier(a, b, c) { // definition
        if (arguments.length != 3) { // 3 is # of arg
            alert("arguments are " + arguments.length + ", should be 3");
        }
    }
    // function which have variable arg are called 'variadic function' or 'varargs'
    //
    // 'arguments' is object with length prop
    // in non-strict mode changing arguments[element] also changes param

    function non_strict_behaviour_of_arguments(a) { // definition
        arguments[0] = 33; // changing arg value, its unlike array
        return a;
    }
    var someVar = 30;
    non_strict_behaviour_of_arguments(someVar); // invoc
    console.log(someVar); // 33 not 30
    // this is rectified in strictmode as values cant be assigned to arguments
}
// program to add the array-like elements
{
    // checking that they
    // all are # and not undefined or null
    // first check that its an array like :
    //     is object
    //     length > 0 < 2^32
    //     length is integer
    // add elements leaving undefined or null
    function arrayAdder(o) {
        var isArrayLike = function (o) {
            return ("object" === typeof o) && //
            (0 < o.length && Math.pow(2, 32) > o.length) && //
            (Math.floor(o.length) === o.length)
        };

        function addFunction(o) {
            if (isArrayLike(o)) {
                for (var i = 0, sum = 0; i < o.length; i++) {
                    var element = o.i;
                    if (element && isFinite(element)) {
                        sum += element;
                    }
                }
                return sum;
            } else {
                throw new Error("moron! you are not array like");
            }
        }
    }
}
// variadic func which checks for its arg and tries to add them
{
    // arrayAdder( ) worked just for arrayLikeObjects,
    // flexSum( ) works for function( ), number etc
    //
    // first check arguments.element for null,
    // then check if its array,function or number and add a/cly
    // if neither, throw new Error
    function flexSum() {
        // variadic, no arg required, instd use 'arguments'
        var total;
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments.i, // element of 'arguments'
                n; // holds sum of each iteration
            // 'element' can be function, array, null or number
            // and we have to add them accordingly
            //
            // checking for null
            if (element == null) {
                continue;
            }
            // checking for array
            if (isArrayLike(element)) {
                n = flexSum.apply(this, element); // recursive sum
            }
            // checking for function
            else if (typeof element === "function") {
                n = Number(element());
            }
            // otherwise it'll be a #
            else {
                n = Number(element);
            }
            // now checking n
            if (isNan(n)) {
                throw new Error("cant convert to #");
            }
            // add now
            total += n;
        }
        return total;
    }
    // loopsum method instd of recursion for arrayLikeObject addition
    element.forEach(function (value) { // element is array
        (value == null) && (
        continue), (n += value);
        // if value is null then 'continue', else n+= value
    });
}
// function can be assigned to other var
{
    var square = function (x) {
        return x * x;
    }
    var s = square; // now s is equiv to square
    console.log(s(2)); // 4
}
// function used with obj is method
{
    var o = {
        square: function (x) { // method created
            return x * x;
        }
    };
    var a = o.square(2); // prototypal inheritance
    console.log(a); // 4
}
// function can be element of array
{
    var array = [
        function chrome(x) { // 1st element is a function
            return x * x;
        },
        3
    ]; // 2nd element is a number
    chrome(array[1]); // 9
    array[0](array[1]); // 9, same as chrome(a[i]) ;
}
// func can be arg of another func
{
    function multiply(x) {
        return x * x;
    }

    function multiAdd(multiply, d, e) { // func as arg of func
        return multiply(d) + multiply(e);
    }
}
/// function as Namespace
{
    // sometimes you define the var and have to use them in someOther place
    // where you dont know which var are global, so define them in func scope
    // this way only function name is global var but if you even want to hide
    // func global name, make it nameless with immediate invocation
    //
    // only fn name is global :
    var reveal = function () {
        var x = 9; // localVar
        return x * x;
    }
    //
    // no global var, nameless func with immediate invocation :
    var reveal = (function () { // reveal is not global now
        var x = 9; // localVar
        return x * x;
    }()); // immediate invocation
    // notice ( ) wrapping around nameless function
    //
    // 'patched extend( ) function' => skipped
}
/// Lexical(static) scoping and closure :
{
    // f() and g() are two func, if f( ) invokes g() then :
    // lexical scope : f() wont have access to g() localVar as l.scope depends on block
    // dynamic scope : f() have access to g() localVar as d.scope depends on time
    // js has lexical scoping
    //
    // Closure => behaviour carrying data
    //
    // definition and invocation at once :
    {
        myVar = "global";

        function revealDisco() {
            var myVar = "local";

            function f() { // definition
                return myVar;
            }
            return f();
            // invocation within function-local scope
            // nameless version :
            //  return {(function () { return myVar; }())};
        }
    }
    revealDisco();
    // "local", only calling the func
}
// definition in function scope then invocation at global scope
{
    myVar = "global";

    function revealDisco() {
        var myVar = "local";

        function f() { // definition
            return myVar;
        }
        return f; // no invocation
        //  return {(function () { return myVar; })};
    }
    revealDisco()();
    // calling and invoking at global space
    //
    // now think what would be diff in above fn and fn above it.
    //
    // actually they are same even one has definition and invocation at once
    // while other has definition in function chain-scope and invoc in global
    // scope but still 'revealDisco()()' has value "local" because js binds
    // not on scope of invocation but on scope of definition i.e var has value
    // where they are defined not where they are invoc. This is closure
    //
    // i.e. function holds some data as well as behaving on them
    // in other words, behaviour carrying environment
    //
    // closure is a function which returns a function which itself
    // returns data
    //
    { //  proper syntax of closure :
        function iAmClosure(value1) {
            return function (value2) {
                return value1 * value2;
            };
        }
        // to use this closure :
        //
        var someVar = iAmClosure(9 /* value1 */ );
        //
        // now iAmClosure holds data i.e 9 for someVar
        // which will different for different variables
        //
        alert(someVar(8 /* value2 */ ));
        // 9 * 8
    }
}
// another example of closure concept
{
    function addThem(x) {
        return function (y) { // immediate return for nameless function
            return x + y;
        };
    }
    var add5 = addThem(5); // add5 is a "function" with associative data '5', 5 is x
    var add10 = addThem(10); // add10 is a "function" with associative data '10', 10 is x
    alert(add5(2)); // 2 is y // 5+2
    alert(add10(6)); // 6 is y // 10+6
    //
    // closures share same function but have d/f environ( i.e data ) for diff vars
    //
    // closure lets associate some data(environ) with function. similar to oop.
    // so closure can be used where object would have been used but just single fn.
    // problem is "how does nested function execute even after chain-scope
    // doesnt exist anymore
    //
    // in c-type lang. there is no closure as var are at CPU stack
    // so scope-chain is a 'stack of binding' unlike js(list of objects)
}
// call-object and reference binding
{
    // all the 'local var and fn param' bind to call objects, when fn or loc var are out of scope,
    // there is no binding and g.collec is called and eventually call obj is itself g.collec
    // but if fn returns their nested fn or store them externally. then there will be an external
    // reference to that and it wont be g.collec unless that external var is g.collec
}
// A Counter implementation :
{
    /// counter using function properties
    {
        // functions are objects , so they also have
        // properties which can be associated to just that function
        functionCounter.counter = 0;
        // since var are hoisted, so initializing even b/f definition

        function functionCounter() { // keeps track of counter assoc to functionCounter
            var counter;
            return functionCounter.counter++;
        }
    }
    /// counter using closure
    {
        // above version has a bug that anyone can assign 0 to counter
        // so better version is to implement it by closure
        //
        // named function version
        var closureCounter = function (counter) {
            return function f() {
                return counter++;
            }
        };
        //
        // above version of doing counter algo is better than assigning
        // property to function itself.
        //
        // In above case, closureCounter behaves as a closure which is
        // initialized by the return value of f( ) which itself returns
        // the counter incremental value but this time counter and its
        // value are safe as they are only accessible by closure.
        // its called closure as closureCounter( ) can be used by
        // other var too but each will have d/f environ. once closureCounter( )
        // is out of scope, var counter is private to closureCounter only
        //
        var someInstance = closureCounter(23);
        // 23 is associated only to "closureCounter( ) invoked on someInstance"
        someInstance.f(); // someInstance is now 24
    }
    /// counter using object and methods
    {
        // using func as property is prone to bug of reseting the counter,
        // closure is save to implement but limited to just single function,
        // we can use function as Object to avoid these limitations
        function methodCounter() {
            // like factory function
            // its not a class
            var counter, // private property
                countInc: function () { // method to increase property
                    return counter++;
                }, reset: function () { // method to reset
                    return counter = 0;
                }, countDec: function () { // method to decrease property
                    return counter--;
                }
        };
        var firstInstance = methodCounter(0); // initializing counter property by 0
        var secondInstance = methodCounter(10);
        firstInstance.countInc(); // firstInstance.counter = 1 ;
        secondInstance.countDec(); // secondInstance.counter = 9 ;
    }
    /// counter using closure and accessor properties
    {
        function ClosureAccessorCounter(someVar) {
            return {
                get count() {
                    return someVar++;
                }, set count(someArg) {
                    someVar = someArg;
                }
            };
        }
        // this method is closure as function ClosureAccessorCounter( ) itself returns
        // function viz. count( ) getter and setter
        //
        var someInstance = ClosureAccessorCounter(9);
        someInstance.count; // someInstance is 10 now
        someInstance.count = 100; // someInstance is 100 now
        someInstance.count; // someInstance is 101 now
    }
}
/// private property accessor method using closure
{
    // closure have d/f environ with sharing same function.
    // so it can be used to access and set private property
    // privateVariable is only accessible thru get or set
    function closurePrivateAccessor(objectName, propertyName, predicate) {
        var privateVariable;
        objectName["get" + propertyName] = function () { // method to get value
            return privateVariable;
        };
        objectName["set" + propertyName] = function (setValue) { // methed to set value
            if (predicate) {
                privateVariable = setValue;
            } else {
                return TypeError;
            }
        };
    }
    var somePrivateObj = {
        someName: 0 // property
    };
    closurePrivateAccessor(somePrivateObj, someName, (function () { // calling closure
        return x === "string";
    }(x)));
    somePrivateObj.setsomeName("pns Research Center");
    console.log(somePrivateObj.getsomeName());
    somePrivateObj.setsomeName(33);
    // TypeError, only string allowed, as === used, no implicit conversion
    somePrivateObj["setsomeName"]("any thing"); // is it legal ?, expression method
}
/// breaking closure environment
{
    // it means accidently sharing the variable among closures,
    // closures should not share the environment among each other,
    //  they should only share the behaviour
    //
    // consider this example in which array of constant function is create
    // without sharing the environment
    //
    {
        function correctClosure(v) {
            // accepting param i.e. properly creating environment
            //
            return

            function () { // nested loop
                return v;
                // nested function only returning environment
                // and not its own created var
            }
        }
        var correctVar[] = function () {
            for (var i = 0; i < 10; i++) {
                correctVar.i = correctClosure(i);
                // each closure can have different environment
                // in this case as its vars are not dependent on
                // nested loop in function correctClosure( )
            }
        };
        var firstCorrectVar = correctClosure(32);
        var secondCorrectVar = correctClosure(11);
        // above both are correct closure as they have diff environment
    }
    //
    // now consider the case where v not provided by indiv closure but
    // its created within nested loop of func. so whatever be the
    // function, all closure will share same return value as nested
    // loop dont create private vars. i.e. var created in nested loop
    // are not environment, they are just var common to all closures.
    // var defined before nested loop or provided as arg is environment
    //
    {
        function falseClosure() { // no param
            var falseVar[];
            for (var i = 0; i < 10; i++) {
                // this is a problem, but it can be rectified
                // by providing 'i' as argument
                falseVar.i = function () {
                    return i;
                }
                // assigning within nested loop
                // so its not environment, it will be
                // common to all closures
            }
            return falseVar;
        }
    }
    var firstFalseVar = falseClosure(); // no arg
    var secondFalseVar = falseClosure(); // no arg
    //
    // above both var will be same and they dont have their
    // private environment, so it spoils whole closure concept
    //
}
//
// bottom line : closures should not depend upon the variables
// of nested loop otherwise they wont have private environment
//
}
//
// 'this' is only accessible within object
// for e.g. 'this' is usable within method but if method calls
// another func. then 'this' wont be accessible in that func.
//
// to access 'this' in invoked func., 'this' value should be saved
// in some var. same is true for 'arguments'
//
/// function as property, method, and ctor
{
    // length property
    {
        // when length is invoked on arguments within func, it shows actual # of args
        // when length is invoked on function itself , it shows expected # of args
        function argChecker(someArgs) { // func to check args arity
            return someArgs.length === someArgs.callee.length;
        }
        // callee is deprecated in ecma5 strictmode
        // someArgs.length=>actual
        // someArgs.callee.length=>expected

        function anyfunction() {
            if (!argChecker(arguments)) {
                console.log("Bitch! expected and actual args are not same");
            }
        }
    }
    // call( ) and apply( )
    {
        // call( ) and apply( ) are used to invoke a function as it were
        // a method of object. apply( ) is diff from call( ) in sense that
        // it takes arg in array form
        //
        object.prototype.toString.call(someObject)
            .slice(8, -1);
        //
        // their 1st arg is :
        // strictmode : 'this' whether its null/undefined or primitive
        // nonstrict  : for null/undefined=>globalObj, for primitive=>wrapperObj
        // other arguments are the values passed to the function which was
        // indirectly invoked
        //
        // monkey-patching :
        //
        // a way to patch method with additional usage using indir invoc
        // i.e. using call( ) or apply( ).
        //
        var someObject = {
            o: 99
        };

        function someAddition1(a, b, c) {
            return someObject.o + a + b + c; // ok
        }

        function someAddition2(a, b, c) {
            return this.o + a + b + c; // this has no context here
        }
        alert(someAddition1(2, 3, 4)); //ok
        alert(someAddition2(2, 3, 4)); // 'this' is undef
        alert(someAddition2.apply(someObject, [2, 3, 4])); // now ok
        alert(someAddition2.call(someObject, 2, 3, 4)); // now ok
        //
        // note that someAddition2 is still not a method of someObject
        // its just invoked on someObject
        // to make it a method of someObject, we have to
        // use bind( ) instd of call( ) or apply( )
        //
    }
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
    }
}
