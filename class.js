// instance vs static methods
{
    // instance methods are for per object i.e. each for an object
    // static methods are for per class i.e. each for a class
    //
    // instance methods are copied to prototype
    // static methods are copied to constructor i.e class
    //
    // to access instance method, instance must be created
    // to access static method, directly class can be invoked
    //
    // instance method in a class :
    {
        function Calculator { // Class
        }

        Calculator.prototype.multiply = function(a, b) {
            return a * b;
        };
        // now using instance method :
        var instance = new Calculator(2, 3);
        instance.multiply();
    }
    //
    // static method in a class :
    {
        function Calculator() { // Class
        }

        Calculator.multiply(a, b) { // static method
            return a * b;
            //
            // instead of Calculator.prototype, only Calculator is used
            // accessible directly through class w/o creating instance
            // i.e. method is created in class not in prototype object of class
        }
        // now to use multiply, we dont need to create instance
        Calculator.multiply(2, 3);
    }
}
//
// use of constructor :
{
    // ctor function and class are same thing
    // infact class is a function which initializes objects
    // and such func which init obj is also called ctor
    //

    function someConstructor(a, b) {
        this.a = a;
        this.b = b;
        this.someMethod: function() {}
    }

    // creating instance:
    //
    var someInstance = new someConstructor(2, 3);
    //
    // why we used 'new' ?
    // why not :
    someInstance = someConstructor(2, 3); // its called factory function
    // the reason is every object has some prototype , like
    //
    var someInstance2 = new Object(2, 3);
    // its equiv to :
    var someInstance2 = {
        2, 3
    };
    //
    // so for objects having prototype 'Object', its ok to not use new, just use {}
    // but if you want to have prototype other than 'Object', use new following by classname
    //
    // infact, every new instance is ultimately has prototype 'Object' even if the instance
    // is created from some other class but that other class itself has prototype 'Object'.
}
//
// Object literal vs Constructor
//
{
    // creating and using :
    {
        //
        // object literal :
        //
        var iAmObject = {
            property: " i am an object property",
            method: function {
                alert("i am a function of object");
            };
        }
        iAmObject.method();
        //
        // a constructor :
        //
        var iAmCtor = function(property) {
                this.property: property,
                this.method: function() {
                    alert(" i am a method of ctor ");
                }
            };
        iAmCtor.method(); // wrong, it cant be done
        var iAmUsingCtor = new iAmCtor(23);
        iAmUsingCtor.method(); // correct way of using methods of ctor
    }
}
//
// factory function vs constructor
//
{
    // factory functions are used to create objects but they can return anything
    // ctor func returns the instance of its class and use 'new' in instantiation
    //
    // factory function and its use
    {
        function factoryFunction(var1, var2) {
            var o = { // an object is created unlike constructor
                a: var1,
                b: var2,
            }
            return o; // not necessary, can return anything unlike ctor
        }

        var someObj1 = factoryFunction(2, 3);
        // no use of 'new'
        // not sure if a new instance of factoryFunction will be created
        // or not, depending upon return type of factoryFunction
    }
    // constructor function
    {
        function constructorfunction(var1, var2) {
            this.var1 = var1;
            this.var2 = var2;
            this.someMethod = function() {}
            // no return needed, implicitly returns instance of the class
        }

        var someObj2 = new constructorfunction(2, 3); // 'new' is used
    }
}
//
// Range ( )  :
//
{
    // create a class Range which has some builtin methods while also allowing
    // object to have their private properties
    //
    // handling the class

    function MyClass1() {} // a dummy class for comparison purpose

    function Range(from, to) { // class name starts from capital, "constructor object"
        this.from = from;
        this.to = to;
        // private properties
    }

    // define Range prototype
    //
    // below are instance methods which will be shared by all objects inherit from
    // proto object
    //
    // two obj are of same class only if they inherit from same proto object
    //
    Range.prototype.isInclude = function(number) {
        return this.from <= number && this.to >= number;
    };
    Range.prototype.foreach = function(f) { // f is array
        var loop;
        for(loop = this.from; loop <= this.to; loop++) {
            f(loop); // invoking f at loop
        }
    };
    Range.prototype.toString = function() {
        return "(" + this.from + "," + this.to + ")";
    };
    Range.prototype.isEqual = function(that) {
        return(that.from === this.from) && // testing initial
        (that.to === this.to) && // testing final
        (that.prototype === Range) && // prototype object of 'that' is instanceof Range
        (that !== null);
    };
    Range.prototype.compareTo = function(that) {
        var a;
        if(!(that instanceof Range)) {
            alert("Cant compare different types");
            return NaN;
        } else {
            return(a = ((this.to - this.from) - (that.to - that.from))) > 1 ? //
            ("greater by " + a) : //
            ("lesser by " + -a);
        }
    };
    //
    // creating instances
    //
    var firstInstance = new Range(9, 10); // "Instance Object"
    firstInstance.isInclude(6); // true
    secondInstance = new Range(22, 310);
    alert(firstInstance.compareTo(secondInstance));​
}
//      1 - constructor object : its actually class function
//      2 - prototype object : its the base if a class
//      3 - instance object : its the instance created by new, inherits from prototype object
//
// simple class
//
{
    function extend(source, destination) {
        var property;
        for(property in source) {
            if(property) {
                destination.property = source.property;
            }
        }
    }

    function simpleClass(property, method, static) {
        if(property) {
            extend(property, constructor);
        }
        if(method) {
            extend(method, constructor.prototype);
        }
        return constructor;
    }

    // calling simpleClass
    //
    var someInstance = simpleClass(
    // constructor
    (function(from, to) {
        this.from = from;
        this.to = to;
    }),
    // method
    {
        // no simpleClass.prototype.method, as constructor.prototype
        // is being handling here inside simpleClass invocation
        isInclude: function(number) {
            return this.from <= number && this.to >= number;
        },
        foreach: function(f) { // f is array
            for(var loop = this.from; loop <= this.to; loop++) {
                f(loop); // invoking f at loop
            }
        },
        toString: function() {
            return "(" + this.from + "," + this.to + ")";
        }
    },
    // instance
    // creating new instance
    {
        upto: function(lowerLimit, higherLimit) {
            return new someInstance(lowerLimit, higherLimit);
        }
    });​
    //
    // so actually this whole func is same as Range but its all wrapped-in
    //
}
//
// Complex numbers Class
//
{
    // jsLint and g.cl.c checked for bugs
    // creating a class for complex numbers operation
    // this class has :
    //      private properties
    //      instance methods
    //      static properties
    //      static methods
    //      using instance methods by instantiation
    //      using static methods by just invoking class
    //
    //
    // --------------> creating class

    function ComplexNumbers(real, imaginary) {
        this.real = real || {};
        this.imaginary = imaginary || {};
        //
        // only private instance properties defined inside class
        // all instance/static methods will be defined outside class
        //
        // private prop are defined inside of class for convenience
        // so that initialization can be done during construction of instance
    }

    //
    // --------------> handling instance methods :
    //
    ComplexNumbers.protoype = {
        constructor = ComplexNumbers;
        //
        addition = function(that) {
            return new ComplexNumbers( // adding complex qntty
            this.real + that.real, this.imaginary + that.imaginary);
        };
        subtract = function(that) {
            return new ComplexNumbers( // subt complex qntty
            this.real - that.real, this.imaginary - that.imaginary);
        };
        multiply = function(that) {
            return new ComplexNumbers( // (a+jb)(c+jd) = (ac-bd), (ad+cd)
            this.real * that.real - this.imaginary * that.imaginary, // real part
            this.real * that.imaginary + this.real * that.imaginary // imaginary part
            );
        };
        negative = function() {
            return new ComplexNumbers(-this.real, -this.imaginary);
        };
        magnitude = function() { // magnitude is dist b/w point and origin
            return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imaginary, 2));
        };
        toString = function() {
            // return the stringified form of instance property
            return "(" + this.real + "+" + "j" + b + ")";
        };
        isEqual = function(that) {
            return this.real === that.real && // testing real qntty
            this.imaginary === that.imaginary && // testing imaginary qntty
            that.prototype === ComplexNumbers; // testing both's prototype
        };
        getName = function() {
            return this.name;
            // 'name' is non-standard implementation to find class name
            // its not supported by all vendors, only in spider monkey
        };
    }
    //
    // --------------> handling static property :
    //
    // return class property null qntty
    ComplexNumbers.ZERO = new ComplexNumbers(0, 0);
    // return class property unity real qntty
    ComplexNumbers.ONE = new ComplexNumbers(1, 0);
    // return class property unity imaginary qntty
    ComplexNumbers.IODA = new ComplexNumbers(0, 1);
    //
    // --------------> handling static methods :
    //
    ComplexNumbers.toString = function(real, imaginary) {
        return "(" + real + "+" + "j" + imaginary + ")";
        // stringified form of static property,
        // note: toString is invoked on ComplexNumbers instd of ComplexNumbers.prototype
        // thats the diff b/w static and instance methods
        // note : static methods dont usually use 'this' invocation context
    };
    //
    // --------------> using the ComplexNumbers class
    //
    // creating instance
    var someInstance = new ComplexNumbers(33, 44); // 33+j44
    // invoking instance method
    someInstance.addition(new ComplexNumbers(2, 1));
    alert(someInstance.magnitude());
    // invoking static method
    alert(ComplexNumbers.toString(11, 88)); // 11+j88
    // using static property, no need for instantiation
    console.log(isEqual(someInstance, ComplexNumbers.IODA));
}
//
// in c++ , the property in method can be used as local var, so you dont need to use 'this'
// but in js, its not supported
// js dont have private or protected unlike c++, instead, convention is used
// like, to show that some property shouldnt be changed, name them with CAPITAL letters
//
// js classes are dynamic i.e its properties and method can be defined
// in runtime called 'augmenting'
//
// augment a conjugate static method in ComplexNumbers
//
ComplexNumbers.conjugate = function(real, imaginary) {
    return new ComplexNumbers(real, -imaginary);
}
// above method is autoly added to ComplexNumbers and its instances
//
// properties can be added to Object.prototype so that its available to all
// instances, but its safer to defineProperty enumerable:false for them
//
// in clientside, HTMLelement is a class where you can augment any method
// which you wanna use in html, but its not implemented yet in IE
//
// Finding class
{
    // classOf( ) we created is usedful only for builtin/core types, but when we define our
    // own class, it wont work on that and return "Object"
    //
    // these are techniques to find class of any object :
    //      instanceof
    //      constructor property
    //      isPrototypeOf
    //      name of constructor function
    //
    // instanceof
    {
        objectName instanceof className
        // className is actually constructor function
        //
        // constructor is the public face or name of a class but true identity of any
        // class is its prototype. so despite the use of constructor with instanceof,
        // js checks class o.b.o from which proto it inherits, not from which ctor its created
    }
    //
    // isPrototypeOf( )
    {
        // ctor function or classname is not important, prototype is important, so
        // to avoid constructorfunction(i.e. className), use isPrototypeOf()
        ComplexNumbers.prototype.isPrototypeOf(real); // true
    }
    //
    // constructor property
    {
        // isPrototypeOf( ) and instanceof dont allow to query. just allow to test.
        // In browser, array created in one frame is not instanceof 'Array' of other window
        // this problem also persists for constructor property

        function classFinder(x) {
            switch(x.constructor) {
            case Number:
                return "Number";
            case String:
                return "String";
            case Date:
                return "Date";
            case ComplexNumbers:
                return "ComplexNumbers";
            case regex:
                return "regex";
            }
        }

        // expressions following 'case' are functions
        // expressions following 'typeof' are strings
        //
        // problem with above technique :
        //      doesnt work in different frames
        //      its not necessary that all objects have constructor property
    }
    //
    // constructor name
    {
        // instanceof/isPrototypeOf is false for "same objects in different frames"
        // but the "name of their prototype" will be same irrespective of frames
        //
        // algo to find name of class
        //      use typeof(): for primitive and return that
        //      use classOf( ) : for native objects
        //      use getName(): if ctor has name, return it,otherwise return "Object"
        //

        function classOf(someObject) {
            return Object.prototype.toString.apply(someObject).slice(8, -1);
        } // works for native someObjects

        function getName(someObject) {
            return this.name;
            // i didnt put regex implementation here
            //
        } // works for user-handle someObjects

        function classFinder(someObject) {
            var Type, Class, Name;
            // Type will be used for primitive
            // Class will be used for native someObjects
            // Name will be used for ctor having name
            // note : ctor are actually named function
            //
            // for undefined
            if(undefined === someObject) {
                return "undefined";
            }
            //
            // for non-existing
            if(isNan(someObject)) { // someObject !== someObject
                return "Nan";
            }
            //
            // for primitive
            if("Object" !== (Type = typeof(someObject))) { // numbers, strings
                return Type;
            }
            //
            // for native someObject
            if("Object" !== (Class = classOf(someObject))) { // as user-handle classes return "Object"
                return Class;
            }
            //
            // for user-handle someObject
            if(someObject.constructor && // does constructor exist ?
            typeof someObject.constructor === "function" && // as classname is a ctor function
            (Name = getName(someObject))) { // Name shouldnt be undefined or null
                return Name;
            }
            //
            // if none is true
            else {
                return "Object";
            }
        }

        // this technique also has problems as if constructor function is not created,
        // this function cant find name of class
    }

    // Duck typing
    {
        // instead of asking : "whats the class of this object?"
        // ask : "what this object can do ? "
        // so if an object can behave( have same properties and method ) of some specific
        // class, then we can say that this object is from that class even if its prototypal
        //  obj is not same
        //
        // remember we made isArrayLike( ), which checks diff attributes for array and let it
        // array like w/o checking its class. although true array has autoupdate length with shortening
        // the length causes element truncation. so depending upon requirements, you set the
        // isArrayLike( ) conditions and upon fulfilment of these conditions, you suppose its of
        // some specific class
        //
        // one approach is to assume that all methods are defined,so no checking, if any non-existing
        // method occurs, it will create error
        // second approach is to check method names but dont check for class names
        //
        // arg1 is your object
        // arg2 can be string , function, object
        // if arg2 is string  then suppose its a method name and check for type of method
        // if arg2 is a function, suppose its constructor, make arg2 a prototypal object
        // if arg2 is object, then check if a method in arg2 is present in our object

        function duckTypeCheck(arg1) { // variadic function
            for(var i = 1; i < arguments.length; i++) {
                //
                // arguments.forEach cant be used here as 'continue'
                // is used which wont work in forEach
                //
                var arg2 = arguments.i;
                switch(typeof arg2) { // either string, func or object
                case 'string':
                    if(typeof arg1[arg2 /* i.e method */ ] !== "function") {
                        return false;
                    }
                    continue;
                case 'function':
                    // means its ctor, so make it proto obj
                    // and go to next case then check there if
                    // arg1 object has same methods as this proto obj
                    // as in duck typing we dont find class
                    arg2 = arg2.prototype;
                case 'object':
                    for(var methods in arg2) {
                        if(typeof arg2.methods !== "function") {
                            continue;
                            // if this prop is not a method in prototypal object
                            // so dont check this property in arg1, just iterate
                            // for next property
                        }
                        if(typeof arg1.methods !== "function") {
                            return false;
                            // i.e. property which is a method in prototypal object
                            // is not a method in our object
                        }
                    }
                }
                return true; // i.e. arg1 implements everything
            }
            // this function only tests for the method name matching,
            // it doesnt tell does these methods actually do the same
            // operation? its for flexibility
            //
            // this function doesnt work for native objects as they have some
            // non-enum prop. but it can be solved using getOwnPropertyNames()
        }
    }
    // finding own property
    {
        // when you use instanceof( ), it checks for all prop either own or inherit
        // but for own only :
        someObject.ownProperty(property);
        // but if ownProperty is a name of some var :
        Object.prototype.ownProperty.call(someObject, property);
        // above is a better and safe option
    }
    //
    // mozilla - js oop
    //
    {
        //
        // js is prototype base, it doesnt have class, class role,is done by prototypal object
        // js doesnt need seperate ctor, intsead anything defined in class get
        // executed when new obj is formed
        //
        // you can create property either inside class(this.property) or
        // outside(classname.prototype.property)
        // js has singleclass inheritance unlike c++
        //
        // in c++, inheritance:
        class
        baseClass: {} // parent
        class
        inheritClass: baseClass // child
        //  in js inheritance:

        function baseClass {}

        function inheritClass {
            baseClass.call(this);
            inheritClass.prototype = new baseClass()
        }

        //
        // inherit class instance will also be instance of base class
        //encapsulation :
        // every class inherits the methods of its parent and only needs to define
        // things it wishes to change
        //
        var SomeClass = function {
                // :::
            }
        return SomeClass instanceof Function; // true
        return SomeClass.prototype instanceof Object; // true
        //
        // someClass belongs to Function as class is a function , called specialization
        // someClass proto object belongs to Object, called composition
        //
        // polymorphism : two classes having same property or method but in their own scope
        // its only true when two classes dont have parent/child relation
    }
    //
    // prototype chain
    //
    {
        var o = new someObj();
        var a = new someArray();
        // proto chain of o--->someObj---->Object---->null
        // proto chain of a--->someArray-->Array----->Object---->null
    }
    //
    // Set
    //
    {
        function Set() {
            this.values = {}; // its an object
            this.n = 0; // # of values in a set
        }

        Set.prototype = { // instance methods :
            //
            constructor = Set;
            //
            add = function() { // adding values or elements in a set
                arguments.forEach(function(someArg) {
                    str = Set._v2s(someArg);
                    if(!Object.prototype.hasOwnProperty(this.values, str)) {
                        // safer than => this.values.hasOwnProperty(str)
                        this.values[str] = someArg;
                        this.n += 1;
                    }
                });
                return this; // for cascading
            };
            //
            remove = function() { // removing values or elements in a set
                arguments.forEach(function(someArg) {
                    var v = someArg,
                        str = Set._v2s(v);
                    if(Object.prototype.hasOwnProperty(this.values, str)) {
                        delete this.values[str];
                        this.n -= 1;
                    }
                });
                return this;
            };
            //
            contains = function(value) { // testing if value exists in set
                return Object.prototype.hasOwnProperty(this.values, Set._v2s(value));
            };
            //
            size = function() { // return size of set
                return this.n;
            };
            //
            foreach = function(someFunction, arg) { // foreach implementation
                // iterate someFunction on each property of this.value
                //
                var property;
                for(property in this.values) {
                    if(Object.prototype.hasOwnProperty(this.values, Set._v2s(property))) {
                        return someFunction.call(this.values[property], arg);
                    }
                }
            };
        };
        Set._v2s = function(arg) {
            // its a static function, b/c its not included with every instance
            // its just for class use, no instance can use it
            //
            switch(arg) {
            case undefined:
                return 'u';
            case null:
                return 'n';
            case true:
                return 't';
            case false:
                return 'f';
                handleault: switch(typeof arg) {
                case 'number':
                    return '#' + arg;
                case 'string':
                    return '"' + arg;
                }
            }
        };
    }
    //
    // Topics skipped :
    //      Enumerated type
    //      standard conversion
    //      method borrowing
    //      Constructor overloading
    //      Property descriptor
    //
    // class constructor
    {
        function someClass() {
            this.someProp = {};
        }

        alert(someClass.prototype.constructor);
        // means show me the constructor
        // function of prototype of class someClass
    }
    //
    // private properties
    //
    {
        // if properties are encapsulated in closure
        // they become safer .

        function Range(from, to) {
            this.from = function() {
                return from
            };
            this.to = function() { // function carrying behaviour
                return to
            }
        }

        Range.prototype = {
            //
            constructor = Range;
            //
            isInclude = function(value) {
                return this.from() <= value && this.to() >= value
            };
            //
            foreach = function(someFunction, args) {
                for(var i = this.from(), max = this.to(); i < max; i++) someFunction(i, args)
            };
            //
            toString = function() {
                return "(" + this.from() + "..." + this.to() + " )"
            };
        }
        var someInstance = new Range(2, 3);
        // but this closure way is not completely safe as :
        someInstance.from = function() {
            return 0; // value of this.from is changed now to 0
        };
        alert(someInstance.from()); // 0 instead of 2
    }
    //
    // handling Subclass :
    //
    {
        // Subclass :
        // Subclass inherits all the instance methods of superclass plus also defines
        // its own instance method
        //
        // abstract class
        // Subclass can have Subclasses too, in these cases, its good to have abstract
        // classes i.e. having methods without implementation. implementation of these
        // abstract class methods is provided in concrete subclass methods
        //
        // in order to create subclass from superclass:
        //    1- inherit "prototype" of superclass
        //    2- override constructor properties
        //
        // 'b' is subclass and 'a' is superclass :
        b.prototype = inherit(a.prototype); // inherit prototype
        b.prototype.constructor = b; // override ctor properties
        //
        // creating subclass :
        //
        {
            function createSubclass(superclass, subclass, methods, statics) {
                subclass.prototype = inherit(superclass.prototype);
                subclass.prototype.constructor = subclass;

                if(methods) subclass.prototype = methods;
                if(statics) subclass = statics;

                return subclass;
            }

            function inherit(p) {
                if(null === p || 0 === p) return TypeError;
                if(Object.create) {
                    return Object.create(p);
                }
                if(typeof p === "function" || typeof p === "object") {
                    return defineProperties({}, getPrototypeOf(p));
                }
            }
        }
        //
        // Inheritance :
        //
        {
            // handling custom methods : SingletonSet example
            //
            {
                // SingletonSet is a subset of Set which has only one readonly member
                // add,remove are readonly, foreach invokes for this.member and contains
                // checks for this.member only
                // size returns 1 and isEqual checks for prototype,size,member
                // other methods are same as Set class
                //

                function extend(a, b) {
                    for(var property in a) {
                        b["property"] = a["property"];
                    }
                }

                function SingletonSet(member) {
                    this.member = member;
                }

                SingletonSet.prototype = inherit(Set.prototype);
                // now we have to implement some custom methods, so we cant do :
                // SingletonSet.prototype.constructor = SingletonSet;
                // instead :
                extend(SingletonSet.prototype, {
                    constructor: SingletonSet,
                    add: function() {
                        throw "readonly";
                    },
                    remove: function() {
                        throw "readonly"
                    },
                    contains: function(args) {
                        return this.member === args;
                    },
                    foreach: function(someFunction, args) {
                        someFunction.apply(this.member, args);
                        // no for loop as only single property
                    },
                    isEqual: function(args) {
                        return args instanceof Set && //
                        1 === args.size && //
                        this.member === args.member;
                    },
                    size: function() {
                        return 1;
                    }
                });
                // other methods are same as Set class
                // SingletonSet inherits from Set dynamically i.e.
                // new methods added to Set are also added to SingletonSet
                //
                // whenever you need to change some implementation of superclass
                // while making other intact. then firstly inherit prototype of
                // superclass and then making changes using extend(subclass.prototype,:::)
            }
        }
        //
        // Method-chaining and Constructor-chaining :
        //
        {
            // Method-chaining :
            // when sublclass B overrides method of superclass A method, then sometimes
            // the overriding method of B needs to invoke over-ridden method of A
            //
            // Constructor-chaining :
            // when constructor of B needs to invoke constructor of A
            //
            // class factorty or generic class :
            //

            function CustomSubClass(superclass, condition) {
                var subclass = function() { // constructor chaining
                        superclass.apply(this, arguments);
                        // superclass ctor is used as function in subclass
                    };
                var a = subclass.prototype = inherit(superclass.prototype);
                a.constructor = a;

                a.add = function() {
                    arguments.forEach(function(value) {
                        if(!condition(value)) {
                            throw "condition not satisfied on " + value;
                        }
                    });

                    superclass.prototype.add.apply(this, arguments);
                    // Method-chaining
                    // i.e. inheriting all of the remaining implementation
                    //  of add function defined in superclass
                };
                return subclass;
            }

            function inherit(o) {
                if(null === o || undefined === o) return TypeError;
                if(Object.create) return Object.create(o);
                var a = (typeof o === "function" || typeof o === "object");
                if(a) return defineProperties({}, getPrototypeOf(p));
            }

            function condition(value) {
                return typeof value === "string";
            }

            // CustomSubClass is generic so that whenever you want to change the superclass,
            // just changed that in param, no need to changed anywhere in function
            //

            function condition1(value) {
                return value !== null;
            }

            var iAmAClass = CustomSubClass(Set, condition1);
            //
            // this is called class factory, which is only possible due to
            // dynamic nature of js, its not possible in static type language
        }
    }
    //
    // composition
    //
    {
        // instead of creating and inheriting several Subclasses for different purposes,
        // we can create a single composition class and create instances of this classes
        // for different purposes rather than creating seperate subclasses
        //
        // in order to create a composite class from Set class
        //
    }
    //
    // Class augmentation vs Object augmentation :
    //
    {
        // class augmentation / classical inheritance
        {
            // in classical languages, you create a class and when you need its object to
            // behave differently you inherit a new class from the base and make some changes
            // in subclass

            function SuperClassical(property) {
                this.property = property;
                this.methods = function() {
                    return this.property;
                };
            }

            var new
            obj1 = new SuperClassical(99);
            alert(obj1.methods()); // 99
            //
            // now if i want to change behavious of method
            // i'll inherit a subclass, like

            function SubClassical() {
                SuperClassical.apply(this, arguments);
            }

            SubClassical.prototype = inherit(SuperClassical.prototype);
            extend(SubClassical.prototype, {
                constructor: SubClassical,
                methods: function() {
                    return "i am " + this.property + " !!!";
                }
            });
            // now create an instance
            var obj2 = new SubClassical(99);
            alert(obj2.methods); // "i am 99 !!!"
        }
        // Object augmentation / parasitic inheritance
        //
        {
            // in js object augmentation, above problem can be solved
            // at object level w/o creating new class
            //

            function SuperClassical(property) {
                this.property = property;
                this.methods = function() {
                    return this.property;
                };
            }

            var obj1 = new SuperClassical(99);
            alert(obj1.methods()); // 99
            //
            // now if i want to change object behaviour
            // without changing superClassical class :
            //
            obj1.methods = function() {
                return "i am " + this.property + " !!!";
            };
            var obj3 = inherit(obj1);
            obj3.property = 100;
            alert(obj3.methods());​
            //
            // this way, i only have to augment object w/o
            // creating any new class. its powerful due to
            // class-less model of js
        }
    }
    //
    // ecma5 and classes :
    //
    {
        // ecma3 way of Range class:
        {
            function Range(from, to) {
                this.from = from;
                this.to = to;
            }

            Range.prototype = {
                isInclude = function(number) {};
                foreach = function(f) {};
                toString = function() {};
                isEqual = function(that) {};
                compareTo = function(that) {};
            }
        }
        //
        // ecma5 way of Range class:
        {
            // can work for ctor as well as factory function

            function Range(from, to) {
                var property = {
                    from: {
                        // property descriptor
                        value: from,
                        enumerable: true,
                        configurable: false,
                        extendable: false
                    },
                    to: {
                        // property descriptor
                        value: to,
                        enumerable: true,
                        configurable: false,
                        extendable: false
                    }
                    // now creating object :
                    if(this instanceof Range) {
                        // initialization using constructor
                        return defineProperties(this, property);
                    } else {
                        // initialization using factory function
                        return Object.create(Range.prototype, property);
                        // here 'this' cant use as its not instanceof Range
                    }
                }
            }
            // handling instance methods :
            Object.defineProperties(Range.prototype, {
                isInclude: function(v) {},
                toString: function() {},
                foreach: function(someFunction, args) {},
                isEqual: function(that) {},
                compareTo: function(that) {}
            });
            // if you want to change any method at runtime :
            //
            // defineProperty(object,"propertyname",{ changes } ) ;
            //
            defineProperty(Range.prototype, "isInclude", {
                enumerable: false
            });
        }
        // ecma5 better version of Range :
        {
            // in above case, the property descriptor are sort of cluttering the class
            // another way is to define freezeProp and hideProp functions
            //

            function Range(from, to) {
                this.from = from;
                this.to = to;
                freezeProp(this);
                // now members are non-config and non-writ.
            }

            Range.prototype = {
                hideProp({ // methods are non-enum
                    constructor: Range,
                    isInclude: function(number) {},
                    foreach: function(f) {},
                    toString: function() {},
                    isEqual: function(that) {},
                    compareTo: function(that) {}
                });
            }
        }
        //
        // these functions can be defined somewhere else to keep class
        // handleinition elegant and much like ecma3
        //

        function freezeProp(o) {
            var property = (1 === arguments.length) ? //
            Object.getOwnPropertyNames(o) : //
            Array.prototype.splice.call(arguments, 1);
            //
            // setting the properties
            //
            // property is an array having all properties of object o
            // now iterate at each prop using forEach and make it
            // non-writ. and non-config.
            //
            property.forEach(function(n) {
                if(!Object.prototype.getOwnPropertyDescriptor(o, n).configurable) return;
                // if its non-config already
                //
                else Object.defineProperty(o, n, {
                    writable: false,
                    configurable: false
                });
            });
            return o;
        }

        function hideProp(o) {
            var property = (1 === arguments.length) ? //
            Object.getOwnPropertyNames(o) : //
            Array.prototype.splice.call(arguments, 1);
            //
            // setting the properties
            //
            property.forEach(function(n) {
                if(!Object.prototype.getOwnPropertyDescriptor(o, n).configurable) return;
                else Object.defineProperty(o, n, {
                    enumerable: false
                });
            });
            return o;
        }
        // when you need to find how much time a
        // function takes :
        var beforeTime = new Date();
        //  :::: whatever function
        var afterTime = new Date();
        console.log(afterTime - beforeTime);
        //
        // builtin ways in ecma5 for prevention :
        Object.freeze(Range.from);
        Object.freeze(Range.isInclude());
    }
    //
    // modules
    //
    {
        // modules should not define globalVar to minimize conflict
        // try to create a class by associating it some other builtin class and then define
        // function and var as class property and methods. in this way, program will be
        // less poluted as most of the things wont be accessible directly but they are in deep nesting
        //
        // rather than handling different implementation of Set class, make them associate with a class
        // so that any implementation will be assecible through that class only
        //
        var set = {};
        set.subClasses.Set = function() {
            // :::
        }
        // for instances
        var someInstance = new set.subClasses.Set(33);
        // instead of :
        var someInstance = new Set(33); // wrong
        // but if you are using a particular class too often, then :
        var Set = set.Subclasses.Set;
        // now it will be perfectly right :
        var someInstance = new set(33); // right
    }

    // Private namespace :
    //
    {
        function Set() {
            this.values = {};
            this.n = 0;
        }

        Set.prototype = {
            add: function() {},
            remove: function() {},
            contains: function(value) {},
            size: function() {},
            foreach: function(someFunction, arg) {}
        };
        Set._v2s = function(arg) {}; // static
        //
        // here Set._v2s is a function which we dont want to be part of public
        // API, user of API shouldnt use it, its just a helper function
        // so to avoid user to use it, define it inside of private namespace
        //
        var Set = (function() {
            function Set() {
                this.values = {};
                this.n = 0;
            }

            set.prototype = {
                add: function() {},
                remove: function() {},
                contains: function() {},
                size: function() {},
                foreach: function() {}
            };

            function _v2s() {} // a local private function
            //
            // now we need to return Set unlike implementation w/o private Namespace
            // as in this case, invocation is done where handleinition done
            //
            return Set;
        }());
    }
}

var o = {
    prop: "chrome",
    prop2: ",mozilla"
}
o.prop;
o["prop"];
o.prop2;

for(var p in o) {
    o["p"]
}

o.prop2;
