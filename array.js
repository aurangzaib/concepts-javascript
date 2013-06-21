{
    var arrayName = []; // array literal method
    var arrayName2 = new Array(); // no argument
    var arrayName3 = new Array(4); // array size specified
    var arrayName4 = new Array(3, 4, 5, "chromebook", "ubuntu"); // elements specified
    // arrays are dynamic, they grow, shrink, delete in runtime.
    // no need to specify length in advance. doing so will create sparse-array
    // elements can be of different types as arrayName4
    // trailing comma is allowed and ignored
    // arrayName[  ] is used to read/write array
    // when its used as lvalue, its writing
    // when its used as rvalue, its reading
    var arrayName = [1];
    // arrayName[0] = 1
    arrayName[0] = 2;
    // value changed from 1 to 2
    return arrayName[0];
    // returns 2
    arrayName[arrayName[0]] = 3;
    // arrayName[2] = 3
    // creating and writing an Object
    var o = {};
    o[0] = "object";

    // creating and writing an Array
    var a = [];
    a[0] = "array";
    //
    // Objects inherit from Object.prototype
    // Arrays inherit from Array.prototype
    //
    // array index is converted to string
    //    array updates its length while object doesnt
    //    array take index in +ve numbers while object in expression form,
    //    associative array takes elements in expression form
    //    array are faster to access than object
    //    no 'out of bound' in js for Obj or array, only 'undefined'
    //    array also have getter and setter accessor properties
    //
    // sparse-array : arrays which doesnt have contiguous indexes,
    // created when arraySize > arrayLength. for e.g :
    //
    var myArray[20] = 0; // size is 20 but length is 1
    // sparse-array are memory efficient( as contiguous ) but slower
    var myArray1 = [, , , , , ]; // not a sparse-array, elements present but undefined
    var myArray2 = new Array(6); // sparse-array, 6 is size , length is 0
    // for dense array,     length = index + 1
    // for sparse-array,    length > index + 1
    var a = [1, 2, 3, 4];
    a.length = 2;
    // now a = [ 1, 2] ;
    // to make array length read-only
    Object.defineProperty(myArray, "length", {
        writable: false
    });

    // to refrain from deleting array
    Object.defineProperty(myArray, "length", {
        writable: false,
        configurable: false
    });
    // using delete on array del the elements value but doesnt shrink the
    // length making the array sparse
}
/// copy the values of an Object to an array :
{
    //store the property names in an array
    //store the value on all the index of object to that index of array
    //loop it
    //
    // method 1 :
    var key = Object.keys(o);
    var myArray = new Array();
    key.forEach(function(property) { // value means key[i]
        if(property) myArray.push(o.property);
    });
    //
    // method 2 :
    for(var property in o) {
        if(property) myArray.push(property);
    }
    //
    // myArray[i] = o[key[i]]; // but it will create sparse-array
    // i=>value, key[i]=>property, o=>object
    //
    // len = key.length canbe used to avoid finding length in each loop
    // if (!key[i]) { // to avoid null, undefined, non-existent
    //
    // if(key[i] === undefined) // to avoid undefined
    // if(!(key[i] in o)) // to avoid non-existent
    //
    // o[key[i]] and o.key.i are same?
}

/// skip numbers which are not positive integers :
{
    for(var i in a) { // a is an array
        if(!(toString(Math.floor(Math.abs(number(i))))) === i) continue;
    }
}
/// using forEach
{
    // forEach iterates through the array element automatically
    // it has some problems when used with expression-type(e-t) index
    {
        var myArray = [1, 2, 3, 4, 5];
        var someVar = 0;
        myArray.forEach(function(x) { // x is the value of elements in myArray
            someVar += x;
            // adding all array elements
        });
    }
    // forEach format for array :
    //
    // array.forEach( function(value, index){}) ;
}

/// using multi-dimension array :
{
    // implementing by for, book
    {
        for(var row = 0; row < myArray.length; row++) {
            for(var col = 0; col < myArray[row].length; col++) {
                myArray[row][col] = row * col;
            }
        }
        console.log(myArray[3][3]); // 9
    }
    // implementing by forEach, what i think
    {
        myArray.forEach(function(myArrayRow, rowIndex) {
            value.forEach(function(myArrayRowCol, colIndex) {
                myArrayRowCol = rowIndex * colIndex;
            })
        });
        // myArrayRow is myArray[rowIndex]
        // myArrayCol is myArray[colIndex]
        // myArrayRowCol is myArray[rowIndex][colIndex]
        // rowIndex is row
        // colIndex is col
    }
    // implementing by for/in, what i think
    // note : for/in should be used with array
    // for/in is for object property iteration
    //
    // http://stackoverflow.com/questions/500504/javascript-for-in-with-arrays
    {
        for(a in myArray) {
            for(b in myArray[a]) {
                myArray[a][b] = a * b;
            }
        }
    }
}
/// Array.sort ( )
{
    // when no comparefunction is provided, it sorts alphabatically
    // when comparefunction is provided :
    //  for -ve, sorts a before b
    //  for 0 , no sorting
    //  for +ve, sorts b before a

    function comparefunction(a, b) {
        return a - b; // sorts in ascending order
        //
        // returns -ve if a is smaller or vice verse
        // so if a is smaller, return will be -ve and
        //'a' will be placed b/f 'b'
        // return b-a ; // sorts in descending order
    }

    function myFunc() {
        var numberArray = [1, 77, 2, 4];
        var stringArray = ["google", "apple", "microsoft", "samsung"];
        var mixArray = ["77", "1", "banana", "apple"];
        var mixNumArray = ["1", 55, "23", 88];

        numberArray.sort(); // sorted alphabetically
        numberArray.sort(comparefunction); // 1, 2, 4, 77
        stringArray.sort(); // sorted alphabetically
        stringArray.sort(comparefunction); // no effect
        mixArray.sort(); // sorted alphabetically
        mixArray.sort(comparefunction); // 1, 77, banana, apple
        mixNumArray.sort(); // sorted alphabetically
        mixNumArray.sort(comparefunction); // 1, 23, 55, 88
    }
}

/// Array.concat( )
// it concates multiple arrays WITHOUT changing original array
{
    var a = [1];
    var b = ["chrome"];
    var c = [10];

    a.concat(5);
    // returns [ 1, 5 ]
    a.concat(b, c);
    // returns [ 1, 5, "chrome", 10 ]
    b.concat(a, c);
    // returns [ "chrome", 1, 10 ]
}

/// Array.slice ( )
{
    // creates subArray WITHOUT effecting orig array
    // first arg shows starting point referenced from 0
    // second arg shows # of element. NOT element #
    // -ve arg counts from end
    //
    var a = [1, 4, 5, 6, 8, 3, 6, 3];
    a.slice(0, 4);
    // returns [ 1, 4, 5, 6 ]
    a.slice(5);
    // returns [ 3,6,3 ] from original
    a.slice(-3);
    // returns [ 3,6,3 ] from original
    a.slice();
    // returns whole array
}

/// Array.splice( )
{
    //
    // cuts out the segment or inserts elements, IT EFFECTS THE ORIGINAL ARRAY
    // it can have multiple arguments :
    // when only two arg, it deletes from 1st to (2nd-1) arg, starting from 0
    // when multiple arg, it adds a/f 1st arg and removes # of 2nd arg
    // and other arg are elements to be added
    // Syntax :
    // splice ( startpoint_toDel, #ofelements_toDel ) ;
    // splice ( point_toAdd/del, #ofelements_toDel, what_Add ) ;
    //
    var a = [1, 2, 3, 4, 5];
    a.splice(0, 1); // deletes element 0
    // returns [ 1 ]
    // a = [ 2, 3, 4, 5 ]
    a.splice(-2); // deletes last 2 elements
    // returns [ 4, 5 ]
    // a = [ 2, 3 ]
    var a = [1, 2, 3];
    a.splice(0, 0, 'a'); // adds 'a' at 0th index, del nothing
    // returns [ ]
    // a = [ 'a' , 1, 2, 3 ]
    a.splice(3, 0, 'b', 'c');
    // returns []
    // a = [ 'a' , 1, 2, 'b' , 'c', 3 ]
    a.splice(3, 0, ['e', 'f']);
    // returns []
    // a = [ 'a' , 1, 2, [ 'e','f' ], 'b' , 'c', 3 ]
    a.splice(0, 5, 'k', 'l'); // 5 is the # of elements to del from left side
    // returns [ 'a', 1, 2, ['e', 'f'], 'b' ]
    // a = [ 'k', 'l' , 'c', 3 ]
    a.splice(0, 1, 'chrome');
    // returns ['k']
    // a = [ 'chrome', 'l', 'c', 3 ]
    // to replace element: splice( 0, 1, value )
}

/// push & pop
{
    //
    // push inserts to the last and increases array length
    // pop extracts from last and 'decrease array length'
    // these are unlike delete( ) which just removes element
    // value but doesnt reduce length, making array sparsed
    //
    var a = [];
    // a = undefined
    a[0] = 1; // a = [ 1 ]
    a[1] = 2; // a = [ 1,2 ]
    a.push("3"); // a = [ 1,2,3 ]  // pushing from the end
    a.push("4", "5"); // a = [ 1,2,3,4,5 ]
    a.unshift("0"); // a = [ 0,1,2,3,4,5 ] // pushing from beginning
    delete a[0, 2]; // a = [ , 1, , 3, 4, 5 ] // sparse-array // returns nothing
    a = [1, 2, 3, 4, 5]; // define a again
    a.pull(); // a = [ 1, 2, 3, 4, ] //  removes elem from end but also returns its
    a.shift(); // a = [ , 2, 3, 4,  ] //  removes elem from start but also returns its
    var stack = [];
    stack.push(2, 4);
    // stack = [ 2, 4 ]
    // returns [  ]
    stack.pop();
    // stack = [ 2 ]
    // returns [ 4 ]
    stack.push([3, 3]);
    // stack = [ 2, 4, [3,3] ]
    // returns [ ]
    stack.pop();
    // stack = [ 2, 4 ]
    // returns [ [3, 3] ]
    stack.pop(stack.pop());
    // stack = [ ]
    // returns [ 2, 4 ]
}

/// unshift & shift
{
    var stack = [];
    stack.unshift(1);
    // stack = [ 1 ]
    // returns [ ]
    stack.unshift(1, [3, 4], 4);
    // stack = [ 1, 1, [3, 4], 4 ]
    // returns [ ]
    stack.shift(stack.shift());
    // stack = [ [3,4],4 ]
    // returns [1,1]
    // toString ( ) :
    var a = [2, [3, '3']];
    a.toString(); // similar to join( )
    // returns 2, 3, '3'
    // no braces or delimiters are included in o/p
    {
        // always use braces around single line loop
        // always use Object.create( ) for object creation
        // explicitly use ';' wherever req., dont leave it for language to correct
    }
}

/// ECMA5 methods :
{
    //all ecma5 methods takes their 1st arg as a function to perform any action on array elements.
    //when array is sparsed, these func only run for existing elements.
    //this func can have 3 arg ( value, index, array name )
    //none of ecma5 array methods modify array
    // forEach (  )
    {
        // forEach( ) is used to iterate the loop and change each element your
        // specified func
        // no way is provided by forEach( ) to get out of the loop
        // unlike break for for/while loops to have a break, you need to use exceptions
        //

        function foreach(value, index, array) {
            // wrapping forEach around exception model
            try {
                value.forEach(index, array);
            } catch(e) {
                if(e === foreach.
                break) {
                    return;
                } // end function
                else {
                    throw e;
                }
            }
            foreach.
            break = new Error("program is fucked");
        }
    }

    // using copy ( ) function
    {
        var o1 = {
            a: 1,
            b: 2
        };
        var o2 = copy(o1);
        // o2 looks like o1 now
    }

    // map
    {
        // same as forEach() but it should return values
        var a = [1, 2, 3];
        var b = a.map(function(value) {
            return value * value
        });
        //b = [ 1,2,3 ]
    }

    // filter
    { // g.cl.c
        // returns the values a/c to the 'predicate function'
        var a = [2, 3, 4, 5, 15, 6];
        var b = a.filter(function(value) {
            return value < 4
        });
        // b = [ 2, 3 ]
        var a = [2, 3, 4, 5, 15, 6];
        var b = a.filter(function(value, index) {
            return(index % 2 === 0) && value
        });
        // b = [ 2,4,15] i.e even-index element
        // to remove sparse, null , undefined from an array
        var a = a.filter(function(value) {
            if(value !== undefined && value != null) return value;
        });
    }
    // predicate function
    {
        // 'every' returns true if "all" elements satisfy predicate condition
        {
            var a = [1, 2, 3, 4, 5];
            return a.every(function(value) {
                return value < 6
            });
            // true, all values < 6
            return a.every(function(value) {
                return value % 2
            });
            // false, all values are not even
        }

        // 'some' returns true if anyone element satisfy predicate condition
        { // g.cl.c
            var a = [1, 9, 6, 4, 99];
            a.some(function(value) {
                return value < 6
            });
            // true, 1and4 < 6
            a.some(function(value) {
                return value === undefined
                // return 0 === value
            });
            // false, none of elements is undefined
        }
    }
}
/// reduce
{
    //
    // reduce is used to reduce the result by doing given operation in function
    // this function is diff from function in forEach or map because its 1st arg is
    // operation to perform and next is the value with which to start the operation
    //
    var a = [1, 2, 3, 4, 5];
    a.reduce(function(x, y) {
        return x + y
    }, 0);

    // now this function will iterate on each value
    // return [ 1+0, 2+1, 3+3, 4+6, 5+10 ]
    // when no init val provided
    // when no empty array is passed to reduce. TypeError is returned
    // reduceRight starts oper. from right to left side
    //
    a.reduceRight(function(x, y) {
        return x + y
    }, 0);
    // a = [ 1+14, 2+12, 3+9, 4+5, 5+0]
}

/// indexOf
{
    //it searches for the index of specified value in the array
    //first argument is the value to find its index
    //second argument is the index from where to start
    //-ve 2nd arg. starts from end
    //lastIndexOf searches from the end
    //
    var a = [1, 2, 3, 1, 5];
    var x = 1;

    function indexFinder(a, x) // x is the value to find its index
    {
        var array = new Array(); // array to save the indices
        for(var loop = 0; loop < a.length;) {
            loop = a.indexOf(x /* value to search*/ , loop /* start point*/ );
            // lastIndexOf can be used to start from right to left
            // loop will be the starting point
            // above line is to ensure that it doesnt start from begining eachtime
            if(!loop) {
                array.push(loop);
            }
            loop++;
        }
        return array;
    }

    // google closure compiler version :
    {
        var array = [1, 2, 3, 1, 5],
            value = 1,
            indexFinder = function(b, d) {
                for(var c = [], a = 0; a < b.length;) {
                    (a = b.indexOf(d, a)) || c.push(a), a++
                }
                return c
            };
    }
    // using indexFinder
    console.log(indexFinder(array, index));
}

/// array-like object
{
    // array is obj with special prop, its useful to know if obj is array or not
    Array.isArray([]); // true
    Array.isArray([7]); // true
    Array.isArray(7); // false
    Array.isArray({}); //false
    Array.isArray("array"); // false
    //
    // array length is autoupdate
    // setting array length smaller truncate array
    //
    // objects with numeric index can be treated as array-like objects specially when they
    // are readonly
    // so we have object, array, array-like object
    // in order to check if an object is array like it should be :
    //    object type
    //    has finite length
    //    length>0 && length<2^32
    //    length is integer
    //

    function arrayLikeObject(o) { // equivalent to isArray( )
        if(
        o === "object" // checking if object type
        &&
        o.length > 0 // length is > 0
        &&
        o.length < 4294967296 // lenght is < 2^32
        &&
        Math.floor(o.length) === o.length
        // length is integer
        );
    }

    //
    // string are read-only(immutable) array. some methods for array-type
    // canbe use with string but slice( ), splice( ), reverse( ), push( ),pull( )
    // can't be used, fail silent. typeof ( ) returns string
    //
    var myString = "Chrome";
    myString.charAt(0); // 'C'
    myString[0]; // 'C'
    Array.prototype.join.call(myString, " "); // " C h r o m e"
    // using Array.prototype for object : skipped
}
