/// methods to create an object
{
    //
    // By object literal
    var varname = {
        x: 0,
        y: 0
    };
    //
    //  By ctor invocation
    var varname = new Object();
    // object( ) can have arguments,
    // other classes can be used too like Date( )
    //
    //  By object.create ( only ecma5)
    var varname = Object.create();
    //
    // in object.create( ) method, providing no argument will create just
    // bare bone object, wont even have basic properties like toString( ) etc
    var reveal = {};
    var reveal = new Object();
    var reveal = Object.create(Object.prototype);
    //  above three stats create basic standard object
    //
    var reveal = {
        x: 0,
        y: 0
    };
    var reveal = Object.create({
        x: 0,
        y: 0
    });
}
/// time and date
{
    var now = new Date(),
        // current date
        then = new Date(2010, 0, 1),
        // year,month,day
        later = new Date(2013, 3, 4, 17, 23, 33, 44); // yr,mn,dy,hr,mm,ss,ms
    //
    now.getDate(); // getDate( ) is imagined function
}
/// in order to emulate object.create( ) in ecma3 :
{ // g.cl.c
    function inherit(p) {
        if (p == null) return TypeError;
        // means that p is not an object but undefined or null
        // (since == is used, so null and undefined both covered)
        if (Object.create) return Object.create(p);
        // if ecma5 is used
        var t = typeof (p);
        // just for checking purpose
        if (t !== "object" && t !== "function") return TypeError;
        // should not be primitive
        // method : 1

        function f() { // create a dummy function for ctor purpose
        }
        f.prototype = p;
        // inheriting the properties of p to f
        return new f();
        // method : 2
        return defineProperties({}, Object.getPrototypeOf(p));
        // return newly created object with prototype of p
        // inherit function is not a replacable for object.create ( ) as it can't :
        //  create object of null property
        //  have second argument
    }
    // another version
    w

    function inherit(o, p) { // p inherits o
        if (0 === o) return TypeError;
        (Object.create) && (p = Object.create(o.prototype));
        ((typeof (o) === "object" || typeof (o) === "function")) && (
        return defineProperties(p, Object.getPrototypeOf(o)));
    }
    // when you want to guard your object from unintended editing by any function,
    // you can use inherit( argu )
    var o = {
        x: "i dont wanna change"
    };
    Date(inherit(o));
    // Data ( inherit ( o ) ) // same as // var a = o ; Date ( a )
    // copy of o is used, no change in o
    // above func shows how use inherit( ) to use obj as read-only
}
/// using the associative array :
{
    function addStock(prototype, stock, share) {
        prototype["stock"] = share;
    }
    // using above code, user can easily set value of its property, its not
    // possible with identifier notation ( property.stock ) because it cant set
    // value in runtime. its b/c expression method uses " " which is js datatype
    // ( string ), so expression can be eval. at runtime but identifier cant
}
/// in order to calculate total share using for/in:

function getquote() {
    // function to get the quotation of shares
}

function totalShares(portfolio) { // portfolio is array
    var total = 0.0;
    for (var stock in portfolio) { // shares is a enum property of portfolio
        var shares = portfolio.stock; // portfolio [ stock ] ;
        var price = getquote(shares);
        total += shares * price;
    }
    return total;
}
/// errors in inheritance :
{
    var obj = {},
        // suppose its an object
        len = obj.p;
    // not an error, even though p is not a property
    len = obj.p.l;
    // an error, l is not a property of p which itself not a property of object
    // to avoid above error
    if (obj) if (obj.p) if (obj.p.l) len = obj.p.l;
            // OR
    if (obj && obj.p && obj.p.l) len = obj.p.l;
}
/// how inheritance works :
{
    var oneVar = {
        x: 0
    };
    var twoVar = inherit(oneVar);
    // twoVar has properties of oneVar as well as of Object.prototype
    twoVar.x = 5;
    // it wont effect prototype chain
    console.log(oneVar.x);
    // its value is still 0
    // it shows prototypal inheritance works while querying and not while setting
    //
    // consider case when "a" inherits from "p" and "p" has setter func. now when "a"
    // creates a new own property of same name.then rather than creating new prop. the
    // inherited property will be changed but once again, no change in prototypal object
    //
    // read-only property cant be inherited
}
/// silent errors
{ /* sometimes an object doesn't allow to add value to it or a property. like : */
    Object.prototype = 0;
    // it wont change it, as its unchangable
    /* in ecma3, its silent error, but in ecma5strict , it shows TypeError */
    // read-only prop can be changed by defineProperty( ) by { value : }
    // read-only inher prop can be hidden by defineProperty( ) by enumerable:false
}
///delete
{
    //
    // deletes property not an object, obj is del by garbage collec.
    // { inherited, nonconfig. , non-exist, constant } cant be deleted
    //
    // deletion returns true for      => inherited , non-exist , const
    // deletion returns TypeError for => nonconfig
    //
    // value of property can be deleted too
    // global var can't be deleted
    //
    // when prototypal object deletes the property,
    // it also get removed from inherited objects
    var o = {
        x: 0
        solarpanel: ":::";
    };
    delete o["solarpanel"];
    //remove solarpanel property of o
    delete o.x;
    // removes property x from o
    delete o;
    // error, object are deleted by garbage. collec
    delete Object.prototype;
    // TypeError, as nonconfig
    delete 1;
    // not del, returns true
    globalVar = 1; //created w/o var
    delete this.globalVar;
    // cant be del as global variable
}
/// checking if property exists
{ // method1 :using "in"
    var x = {
        o: 1
    };
    "toString" in x;
    // returns false as property is present but not enumerable
    "o" in x;
    // true
    // it returns true for own or inher. prop.
    //
    /* method2 :using ownProperty( ) */
    x.ownProperty("o");
    // true
    x.ownProperty("toString");
    // false, only true for own prop
    /* method3 :using propertyIsEnumerable */
    x.propertyIsEnumerable("toString");
    // false, not own
    x.propertyIsEnumeralbe("some_nonenum_prop");
    // false,not enum prop
    // propertyIsEnumerable is true only for: own && enum
    // normally, user handle prop are enum
    /* method4 :using !== undefined */
    var x = {
        a: 0
    };
    x.a !== undefined;
    // true , property exists
    // but there is a thing which above method cant distinguish
    var x = {
        a: 0,
        b: undefined
    };
    x.a !== undefined;
    // true
    x.b !== undefined;
    // false, it understands undefined prop to be non-exist
    "b" in x;
    // true, "in" can disting. "undefined prop" from "non-exist"
    x.b != undefined;
    // true, its a workaround for below statement
    x.b !== undefined;
    // false, strict checking
}
/// to skip own enum property
{
    var o = {
        a: 1,
        b: 2,
        c: 3
    };
    var p;
    for (p in o) if (o.ownProperty(p)) continue;
        // if  (p.instanceof(o)) continue ;
        // if ( o[p] === "Object") continue ;
}
/// to skip own enum function
{
    var o = {
        a: 1,
        b: 2,
        c: 3
    };
    var p;
    for (p in o) if (typeof o.p === "function") continue;
}
/// to show list of "enum" properties
{
    function enumList() {
        var o = {
            a: 1,
            b: 2,
            c: 3
        };
        for (p in o) { // only enum prop
            console.log(p);
        } // a,b,c will be shown but not toString
        // "in" shows 'own' and 'inherited' prop but not non-enum prop
    }
}
/// property extending :
{ /* copy all prop of a to b, same name prop are overwritten */
    function extend(a, b) {
        for (var prop in a) {
            b[prop] = a[prop];
        }
    }
}
/// property merging :
{ /* copy all prop of a to b, b with same name prop are not overwritten */
    function merging(a, b) {
        var prop;
        for (prop in a) {
            if (prop in b) { // if its own prop
                continue;
            }
            b[prop] = a[prop];
        }
    }
}
/// property restricting :
{ /* delete all prop of b which are not present in a  */
    {
        function restricting(a, b) {
            var prop;
            for (prop in b) { // either inherited or own
                if (!(prop in a)) { // if this prop not present in a
                    delete b[prop];
                }
            }
        }
    }
}
/// property subtracting :
{ /* delete all prop of b which are present in a  */
    function subtracting(a, b) {
        var prop;
        for (prop in a) { // either inherited or own
            if (prop in b) {
                delete b[prop];
            }
        }
    }
}
/// copy prop of a and b in new object, if prop are in common, copy values of a
{
    function union(a, b) {
        // method - 1 :
        var p;
        extend(b, p);
        extend(a, p);
        return p;
        //
        // method - 2 :
        return extend(a, extend(b, {}));
        // first, properties of b are assigned to { } i.e. new object
        // then properties of a are also added in { }
        // this function is diff from book as we returned 2nd argument
        // while book returned 1st argument
    }
}
/// array which has properties common in a & b
{
    function intersection(a, b) {
        var array = new Array();
        for (var prop in a) {
            (prop in b) && (array.push(prop));
        }
    }
}
///return array of enum properties :
{
    function enumprop(o) {
        var array = new Array();
        for (var p in o) {
            o.propertyIsEnumerable("p") && array.push(p);
        }
        return array;
    }
    // a.keys() returns all own enum prop
    // a.getOwnPropertyNames() returns all own prop whether non-enum or enum
}
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
