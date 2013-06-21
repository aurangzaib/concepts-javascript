    /// libraries
    {
        // jQuery: for manipulating the DOM [ http://jquery.com ]
        //
        // Dojo: framework [ http://dojotoolkit.org/ ]
        //
        // d3: like jQuery for SVG elements [  http://d3js.org/ ]
        //
        // Processing.js: for manipulating canvas elements [ http://processingjs.org ]
        //
        // Backbone.js: for managing client-side data structures [ http://backbonejs.org ]
        //
        // Underscore.js: powerful functional programming ideas [ http://underscorejs.org ]
        //
        // Twitter Bootstrap: accelerates UI styling and events [ http://twitter.github.com/bootstrap ]
        //
        // Modernizr: browser feature detection  [ http://modernizr.com ]
        //
        // MathJax: Latex math formulas in the browser [ http://www.mathjax.org ]
        //
        // HTML5 Boilerplate: Industry-stand startpoint for HTML5 sites [ http://html5boilerplate.com/ ]
        //
        // MooTools: Object oriented framework similar to jQuery [ http://mootools.net/ ]
        //
        // Prototype: framework [ http://prototypejs.org/ ]
        //
        // YUI: Framework for building interactive web app [ http://yuilibrary.com/ ]
        //
        // three.js: 3D rendering library using WebGL [ http://mrdoob.github.com/three.js/ ]
        //
        // Normalize.css: make elem look same across browsers [ http://necolas.github.com/normalize.css/ ]
        //
        // MetroUICSS : great css based windows metro layouts [ http://metroui.org.ua/ ]
        //
        // less : The dynamic stylesheet language [ http://lesscss.org/ ]
    }
    /// basic
    {
        // object and array are mutable while #, bool and null are immutable
        // primitive type => #, bool and null
        // object type => object and array and function
        // js has no difference b/w int and float
        {
            Math.pow(2, 53) // => 9007199254740992: 2 to the power 53
            Math.round(.6) // => 1.0: round to the nearest integer
            Math.ceil(.6) // => 1.0: round up to an integer
            Math.floor(.6) // => 0.0: round down to an integer
            Math.abs(-5) // => 5: absolute value
            Math.max(x, y, z) // Return the largest argument
            Math.min(x, y, z) // Return the smallest argument
            Math.random() // Pseudo-random number x where 0 <= x < 1.0
            Math.PI // π: circumference of a circle / diameter
            Math.E // e: The base of the natural logarithm
            Math.sqrt(3) // The square root of 3
            Math.sin(0) // Trigonometry: also Math.cos, Math.atan, etc.
            Math.log(10) // Natural logarithm of 10
            Math.log(100) / Math.LN10 // Base 10 logarithm of 100
            Math.log(512) / Math.LN2 // Base 2 logarithm of 512
            Math.exp(3) // Math.E cubed
        }
        // since js supports "binary float type".its min resolution > 0.1, to
        // resolve this issue future js versions may support "decimal numeric type"
        // Date obj has 0 based months and 1 based days
    }
    }
    //
    /// CHAP 03 { TYPE AND VARS }
    //
    {
        {
            // regex is a method of searching text in a string.
            // null is an object
            // undefined => system level, error-like absence of value
            // null => program level, intended absence of value
            // in clientside js , window object is global main object
            //
            // wrapper object
            {
                //strings are not obj,they are primitive but still they have properties.
                // its because whenever we access any of string properties, a temp obj is created to
                // resolve property-reference, after that, wrapper obj is discarded
                //
                var s = "hello";
                s.len = 4; // wrapper object will be created
                var t = s.len;
                console.log(t); // undefined, strings are primitive;changes done on wrap obj
            }

            // objects are checked on the basis of reference and not on value or property basis.
            // if you use = for object or array assigning, it'll just pass reference and changing
            // any one of them will change both just like pointers. to avoid it, you must use full
            // loop copy method. objects are also called reference type
            //
            // a === b is for reference checking.'for loop' is used for value and property checking
            // == do implicit conversion b/f testing while === dont
            // parsing=>split file/input in bits of data that can be easily stored or manipulated.
            //
            // Object-to-primitive conversion => when object and primitive encounter with each
            // other by ==, + or != operators, object is converted to number. Except Date object,
            // which is converted to string.
            // variable with no initializing is undefined.
            var a; // declare with var for local objects
        }
        /// hoisting :
        {
            // whenever a variable is defined, it remains until parent loop terminates. for e.g:
            for(;;) {
                var a;
                for(;;) {
                    var b;
                } // b should terminate here but wont
            } //a & b destruct here
            //
            // although b should be destructed a/f its function gone out of scope.
            // but it remains until its parent loop gone out of scope." so, it means that :
            // if a variable remains even after its loop ended. so it must be
            // present even its loop hasn't started. Its hoisting
        }
        /// Call-Object and property resolution :
        {
            //  in js, local variables are actually properties of object.
            //  we can refer to global object by "this"
            //  but it can't be used for call object. its language implem. detail.
            //  Call object => objects that are used by language to
            //  store the local variable and function parameters
            //
            // now we know local variables are actually properties of global call
            // objects. this notion creates a list/chain of objects in which these local
            // variables have been defined. when local variables are needed,
            // js searches them in the objects. Its called "property resolution"
            //
            // when variable isn't found in any object.its called "resolution error". every
            // function has its own "call object" to store its local variables and fn param.
            //
            // if there is no function in code => only 1 object(global) is there.
            // if there is a function in code  => 2 objects(1 global, 1 call object) are there.
            // this creation of "call object" depends upon the level of nesting within function
        }
    }
