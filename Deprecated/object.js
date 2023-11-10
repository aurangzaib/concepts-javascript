/// getter and setter accessor properties
{
    var anObject = { // 'function' is replaced by 'get' and 'set'
        x: 1.0,
        // own, read and write data-property
        y: 1.0,
        get r() { // read-only
            return Math.sqrt(this.x * this.x, this.y * this.y);
        },
        // ',' is necessary at the end of getter and setter functions,
        // as they are treated as property
        set r(newValue) { // write-only, cant read
            var oldValue = Math.sqrt(this.x * this.x, this.y * this.y);
            var ratio = newValue / oldValue;
            this.x *= ratio;
            // x is accessed by this.x
            this.y *= ratio;
        },
        get theta() { // read only
            return Math.atan2(this.y, this.x);
            // returning slope
        }
        // get means 'read-only' property
        // set means 'write-only' propery
    };
}
// js has two type of properties :
// 1 - data properties ( like { x:0 } )
// 2 - accessor properties ( like getter and setter )
/// an object with setter and getter accessor properties :
{
    var serialnum = {
        n: 0,
        // read/write, private, data-property
        get number() // accessor read-only property
        {
            return this.n;
        },
        get next() // accessor read-only property
        {
            return this.(n++);
        },
        set next(n) // accessor write-only property
        {
            this.$n = n;
        }
    };
}
/// another object with accessor property which returns randomly gen num :
{
    var random = // object with getter-accessor-readonly property
    {
        get octet() {
            return Math.floor(Math.random * 256);
            // numbers from 0 to 255
        }, // notice ',' here
        get unsign_int() {
            return Math.floor(Math.random * 65536);
            // numbers from 0 to 2^16
        },
        get sign_int() {
            return Math.floor((Math.random * 65536) - (65536 / 2));
            // numbers from 0 to 2^16/2
        }
    }
    // object has :
    // 1 - name
    // 2 - data property : value , writable , enumerable , configurable
    // 3 - accessor property : get , set , enumerable , configurable
    //
    // ecma5 has 'property descriptor' object which defines :
    //      data-property or accessor-property,
    //      value/get, writable/set,
    //      configurable, enumerable
    //
    /// getOwnPropertyDescriptor
    {
        var a = {
            x: 3
        };
        Object.getOwnPropertyDescriptor(a, "x");
        // data property
        // value:3 , writable:true , configurable:true , enumerable:true
        Object.getOwnPropertyDescriptor(random, "octet");
        // accessor property
        // get :true , set :false , configurable:true , enumerable:true
        Object.getOwnPropertyDescriptor({}, "x");
        // newly created object with Object.prototype
        // undefined, doesnt exist, all inher prop
        Object.getOwnPropertyDescriptor({}, "toString");
        // inherited property from Object.prototype
        // undefined, toString is inherited not own
    } /* to show values of property descriptor for inherited, getPrototypeOf( ) */
    /// defineProperty ( )
    {
        // syntax is : Object.defineProperty( object, "property", { attributes } )
        var a = object.create({ // creating object
            x: 0 // handleault attributes i.e read/write, enum, config
        });
        Object.defineProperty(a, "x", { // setting properties
            values: 12,
            writetable: false,
            enumerable: false,
            configurable: true
        });
        a.keys();
        // returns nothing as x is non-enumerable
        if (a.propertyIsEnumerable(x));
        // false, as property is own but not enumerable
        // changing property value
        a.x = 1;
        // false, as readonly, writable:false, TypeError
        // now set property to read and write
        Object.defineProperty(a, "x", { // a is object, x is property, writable is
            // attribute
            writable: true
        });
        a.x = 1;
        // true, as now read-write permission, writable:true
        Object.defineProperty(a, "x", { // changing prop
            writable: false,
            configurable: true
        });
        a.x = 3;
        // false, property cant be written b/c writable : false
        Object.defineProperty(a, "x", { // changing property using data property
            value: 3 // value changed from 0 to 3
        });
        // property is configurable, so for writable:false property,
        // value can still be changed by defineProperty( ) method
        Object.defineProperty(a, "x", { // changing property using accessor property
            get func() { // accessor property
                return 3;
            } // value of x changed using accessor property, although writable:false
        });
        // so, value of a property can still be changed even if
        // writable:false. using either configurable method or by accessor-prop method
        // defineProperty(  ) is used just for own property and not for inher property
    }
    /// multi arguments defineProperties( )
    {
        // till now we saw how use defineProperty( ) for already defined object.
        // but it can also be used for not-yet-defined objects
        var newObject = Object.defineProperties({}, { // new, empty object literal
            // this is a way to create new object and then define its prop
            x: { // 1st property of newObject
                value: 3,
                writable: true,
                enumerable: false,
                configurable: true
            },
            y: { // 2nd property of newObject
                value: 12,
                writable: false,
                enumerable: true,
                configurable: true
            },
            z: { // 3rd property of newObject
                get r() { // read-only accessor property
                    return Math.random() * 12;
                }, enumerable: true
            }
        });
        // above code could also be created with the combination of Object.create( )
        // and Object.defineProperty( ) .
        // now, whenever we need to change properties
        //
        Object.defineProperty(newObject, "x", {
            value: 33
        }); // 'value' of 'x' of 'newObject' is changed
        //
        // if data-property is nonconfig, then changing its writable attribute from false
        // to true is not allowed, but changing from true to false is allowed
        // if object is configurable but not-writable :     its value 'can be' changed
        // if object is nonconfig and not-writable :        its value 'can't be' changed
    }
    /// different versions for object copy :
    {
        // algorithm :
        //      get prototype of object
        //      get all properties of desired object
        //      check if it already exists in our object
        //      if not, then clone its description to our object
        //
        // book version
        {
            // defineProperty( ) can alter existing prop but can't
            //  create them unlike defineProperties( )
            Object.defineProperty(Object.prototype, "extend", {
                // Object.prototype( ) can be used instd of Object.getPrototypeOf ( o )
                // when you know that object 'o' is inherited from Object.prototype( )
                configurable: true,
                enumerable: false,
                writable: false,
                value: function (o) {
                    var name = Object.getOwnPropertyNames(o);
                    // all the own( enum as well as non-enum ) properties names
                    var loopVar;
                    for (loopVar = 0; loopVar < name.length; loopVar++) {
                        if (name[loopVar] in this) { // check if prop exists in obj
                            continue;
                            // if does, loop again
                        }
                        var description = Object.getOwnPropertyDescriptor(o, name[loopVar]);
                        // all attritubes
                        Object.defineProperty(this, name[loopVar], description);
                        // name[loopVar] shows property name
                    }
                }
            });
            // prototype is an object from which objects inherit, base prototype is 'Object'
            // thats why we use Object.prototype( )
        }
        // my version for book
        {
            var proto = defineProperties({}, "extend", {
                configurable: true,
                enumerable: false,
                writable: false,
                value: function (o) {
                    keys(o)
                        .forEach(function (values) {
                        defineProperty(proto, "values", Object.getOwnPropertyDescriptor(o, value));
                    });
                }
            });
        }
    }
    // mozilla and g.cl.l(simplified) version
    {
        function copy(Object1) { // g.cl.c
            var Object2 = Object.create(Object.getPrototypeOf(Object1));
            Object.getOwnPropertyNames(Object1)
                .forEach(function (value) {
                var desc = Object1.getOwnPropertyDescriptor(Object1, value);
                Object.defineProperty(Object2, "value", desc);
            });
            return Object2;
        }
    }
    // my version for mozilla
    {
        Object.keys(b)
            .forEach(function (value) {
            defineProperty(Object.create(Object.prototype(b)), value, Object.getOwnPropertyDescriptor(b));
        });
    }
    // ecma5 version
    {
        var newObject = copy(o);
    }
}
///getter and setter for Object literal
{
    // Object literal method dont have any way to define getter and setter
    // unlike Object.create ( )
    __lookupGetter__();
    // used to access the getter accessor-property
    __lookupSetter__();
    // used to access the setter accessor-property
    __defineGetter__();
    // used to set the getter accessor-property
    __defineSetter__();
    // used to set the _setter accessor-property
}
/// some concepts
{
    // to check for own property :
    if (someObject.ownProperty(someProperty));
    // to check for own instance :
    p instanceof o;
    o.isPrototypeOf(p);
    // to check for enum property :
    if (someObject.propertyIsEnumerable(someProp));
    // to query prototype in ecma5 :
    someObject.getPrototypeOf(objectName);
    // to query enum-own property in ecma5
    keys(objectName);
    // to query own(enum or not) property in ecma5
    getOwnPropertyNames(objectName);
}
/// finding the class of an Object
{
    // there is no way to find class but we can create our own function
    function classOf(o) {
        if (o === null) {
            throw "null";
        } // not needed in ecma5
        if (0 === o) { // if (o === undefined)
            throw "undefined";
        } // not needed in ecma5
        return Object.prototype.toString.call(o)
            .slice(8, -1); // from the 8th of endside to 2nd last
    }
    classOf({}); // Object
    classOf(new f()); // Object
}
/// Object locking
{
    Object.preventExtensions(); // it makes object non-extendable
    isExtensible(); // to find if object is Extensible or not
    //
    // new properties cant be added or del in object
    //
    Object.seal(); // it makes object non-extendable and non-config
    isSealed(); // to find if object is sealed or not
    //
    // no new property can be added or del. cant change existing prop
    //
    Object.freeze(); // object non-ext and non-config, data prop readonly
    isFrozen(); // to find if object is frozen or not
    //
    // no new property can be added, existing cant be changed and all data
    // prop are readonly. if you have accessor prop, they are still workable
    // all above locking methods are useful for Own properties only.
    // all prototypal( from where you inherited ) properties are still out of lock
    // example of how to create a locked Object
    //
    var myObject = Object.seal(Object.create(Object.freeze({
        x: 0
    }), { // property x is frozen
        y: { // property y is non-config
            value: 9,
            configurable: false,
            enumerable: false
        }
    }));
}
/// using jSON for stringify and parse the object
{
    var myObject1 = Object.defineProperties({}, { // created bare object
        a: { // handling property of myObject1
            value: 213,
            configurable: true,
            extendable: true,
            writable: false
        }
    });
    var myObject2 = jSON.stringify(myObject1); // myObject1 is converted to string
    var myObject3 = jSON.parse(myObject2); // deep copy of myObject1
    //
    // functions, regex , errorObject can't be converted to jSON string
    // works only for enumerable properties
    //
    // things which cant be stringify are omitted from stringified object
    //
    // toString ( ) can be used for functions, returning the sourcecode of function
    //
    // jSON.stringify( ) vs toString( ) ?
    //
    // since everything is an object, we can change the behaviour of large part of
    // system very easily b/c all are instanceof object type
    // closure => behaviour/function that carries data/environment
    // js prop are runtime i.e prop can be changed, added or removed at runtime
    //
}
