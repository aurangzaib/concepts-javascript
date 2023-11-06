// obj to prim convers
// call and wrapper object, property resolution and resolution error
// creating new property while that property is already present in prototype only sets existing
// global var cant be del using delete operator
// checking for property existance:
{
    var object = {
        property: 0
    };
    if(property in object) {}
    if(object.ownProperty(property)) {}
    if(object.propertyIsEnumerable(property)) {}
    if(object.property !== undefined) {}
}
//skip own property
if(p in o) continue;

//skip own function
if(typeof o.p === "function") continue;

// returning array of property names
object.keys(); // own and enum
object.getOwnPropertyNames(); // own whether enum or not
// object structure
var o = {
    // property
    someProperty: 0,
    // accessor get
    get o() {
        return this;
    },
    // accessor set
    set o(v) {
        this = v;
    },
    // method
    someMethod: function() {
        // blah blah blah
    }
}

// property descriptor
getOwnPropertyDescriptor(object, property);
defineProperty(object, property, {
    changes
});
defineProperties(object, {
    property: {}
});

// for writable:false objects, value can still be changed using :
{
    defineProperty(obj, "prop", {
        value: something
    });
    // OR
    defineProperty(obj, "prop", {
        get func() { // accessor
            return something;
        }
    });
    // condition is 'configurable:true'
}

// both are same :
{
    var o = { // object created
        prop
    };
    Object.defineProperty(o, "prop", { // property defined
        value: 5
    });
    //
    // OR
    //
    var o = defineProperties({}, { // obj creation and prop definition at once
        prop: {
            value: 5
        }
    });
}

// array too have getter and setter and defineProperty can also be used.
// making array length readonly
{
    var array = [1, 2, 3, 4, 5];
    Object.defineProperty(array, "length", {
        writable: false,
        configurable: false
    });
}
// delete deletes array element but doesnt shrinks length i.e. sparsed
//
// removing null or undefined from array
{
    function remover(array) {
        var myarray = [];
        array.filter(function(value) {
            if(value) {
                myarray.push(value);
            }
        });
        return myarray;
    }
    var a = [1, 2, 3, null, '', 4, 5];
    a = remover(a);
    alert(a);​ // 1,2,3,4,5​​​​​
}

// filter, every , some, reduce, reduceRight
//
var array1 = new Array(),
    array2 = new Array(),
    simpleVar;
array2 = array1.filter(function(v) {
    return v < 4; // all <4 elem assign to array2
});
array2 = array1 && array1.every(function(v) {
    return v < 4; // array2=array1 if all elem < 4
});
array2 = array1 && array1.some(function(v) {
    return v < 4; // array2=array1 if any of elem < 4
});
simpleVar = array1.reduce(function(x, y) {
    return x + y; // sum all elem of array1 and assign to simpleVar
}(0));
simpleVar = array1.reduceRight(function(x, y) {
    return x + y; // some all elem of array1 from right,assign to simpleVar
}, 0);
simpleVar = array1.indexOf( /* value to search */ , /* start point */ );

// structure of closure
{
    function Parent(someVar1) {
        return(function(someVar2) {
            return someVar1 + someVar2;
        }(someVar)) // arg
    }

    var iAmClosure = Parent(44);
    iAmClosure(1); // 45
    // closure is a function which returns a function which itself returns a variable
    // closure is a behaviour which carries environment
    // returning value shouldn't be defined in nested loop
}

// making method from function
{
    var func = function() {}
    var object = {};
    var method = function.bind(object);
}
// accessign private property
//

function closurePrivateAccessor(object, property, predicate) {
    var privateProperty;
    object["get" + property] = function() {
        return privateProperty;
    }
    object["set" + property] = function(v) {
        if(predicate) privateProperty = v;
        else throw TypeError;
    }
}

// using call and apply
//


function someFunction(a, b, c) {
    return this.o + a + b + c;
}
var someObj = Object.create({
    o: 9
});

// method 1 :
someObj.someFunction(2, 3, 4);
// method2 :
someFunction.apply(someObj, 2, 3, 4);
// method 3 :
someFunction.call(someObj, [2, 3, 4]);

// factory function

function factory(a1, b1) {
    var o = {
        a = a1, b = b1
    }
}
//
// ecma3 class :

function ClassEcma3() {
    this.property = property;
}
ClassEcma3.prototype.methods = function() {
    return this.property;
};

// ecma5 class :

function ClassEcma5() {
    this.property = property;
    freezeProp(this.property);
}
ClassEcma5.prototype = {
    hideProp({
        methods: function() {
            return this.property;
        }
    });
};

function hideProp(o) {
    var property = (1 === (arguments.length)) ? //
    Object.prototype.getOwnPropertyNames(o) : //
    Array.prototype.splice.apply(arguments, 1);
    //
    property.forEach(function(value) {
        defineProperty(o, "value", {
            enumerable: false
        });
    });
}

function freezeProp(o) {
    var property = (1 === (arguments.length)) ? //
    Object.prototype.getOwnPropertyNames(o) : //
    Array.prototype.splice.apply(arguments, 1);
    //
    property.forEach(function(value) {
        defineProperty(o, "value", {
            writable: false,
            configurable: false
        });
    });
}

// js dont have a linker
// function scope and no block scope
for(var property in o) {
    // when for / in is used, couple it with hasOwnProperty as
    // for / in also searches prototypal object
    if(Object.prototype.hasOwnProperty(o, property)) {}
}

// Delegation: js finds property in object,then in its proto,then in object.prototype,then undefined
//
// Reflection: searching properties
Object.prototype.hasOwnProperty(object, property);
//
//
// use f += 1 inteadof f++
//
// 'this' canbe invoked in following patterns:
// function invocation,method invocation,constructor invocation,apply invocation
// js has design error that inner function cant access 'this'of outer function
// but var can be accessed from inner loop
//
// methods of an object can be used with some other object using apply
//
var o = (function() {
    this.property = "robber";
};
o.prototype.method = function() {
    return this.property;
    return o;
}());
var a = {
    property: "sucker"
};
alert(o.prototype.method.apply(a)); // sucker​​​​​​​​​​​​​
//
//
throw {
    name: message:
}
//
// augment Number.prototype with integer method:
//
Number.prototype.integer = function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
};

var a = 9.777;
alert(a.integer());​ // 9
// object vs closure :
{
    // object literal :
    //
    var iAmObject = {
        property: 0,
        increment: function(inc) {
            return property += typeof inc === "number" ? inc : 1;
        }
        getValue: function() {
            return property;
        }
    };
    //
    // closure :
    //
    var iAmClosure = (function() {
        var property = 0;
        return {
            increment: function(inc) {
                property += (typeof inc === 'number') ? inc : 1;
            },
            getValue: function() {
                return property;
            }
        };
    }());​
}
// closure vs function
//
{
    //
    // function
    //

    function function1(value) {
        function get_status() {
            return "from function : " + (value + 1);
        }
    }
    var abcDisco = function1(99);
    alert(abcDisco.get_status()); // wrong
    //
    // Closure
    //

    function function2(value) {
        return {
            get_status: function() {
                return "from closure : " + (value + 1);
            }
        };
    }
    var abcDisco = function2(99);
    alert(abcDisco.get_status());​ // correct
    //
    // its correct due to closure that is the nested function scope
    // has greater life than parent function
    //
    // thats why get_status( ) is able to run even
    // after function2( ) is outofscope
}
//
// augment function
//
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function() {
    // ::::
});
(7 + 3).integer()
//
// instead of creating simple object, create functional object
var someObj = {
    me: 0,
    get_me: function() {
        return me;
    }
};
var someObj = function() {
        var me = 0;
        return {
            get_me: function() {
                return me;
            }
        };
    };
}
// constructor property is not important,
// its prototype which is important
//
var o1 = Object.create({
    x: "all go to hell",
    method: function() {
        return x;
    }
});
var o2 = Object.create(o1);
o2.x = "all go to heaven";
o2.method = function() {
    return this.x;
};
// Build 2012: From Website to App
{
    // use as much as possible the libraries
    // work in parallel;
    // working like small team on same project
    // modularize the site, templating
    // atari arcade developer center
    // compactInspector and Fidler
    // unplug your site, use standards
    // tile.js
    // use responsive design, dont waste time in diff resolution form - factor
    // facebook openGraph
    // protocol handlers
}
// Build 2012: Modern Javascript
{
    // 1 million lines of JS in gmail including comments
    var a = ["a", "b", "c"];
    a.forEach(function (value, i) {
        setTimeOut(function () {
            console.log(item)
        }, i);
    });
    // using caller and callee are not allowed in strict made and they break sandbox
}
