// factorial func
{
    function factorial(a) {
        for (var i = 0; i < a; i++) {
            a *= (a - 1); // a *= (--a) ;
        }
    }
}
//
data[i++] *= 2;
data[i++] = data[i++] * 2;
// above both expressions are different
//
/// eval( ) is Evil
{
    //
    // when eval is used on a var, then the local var changes => direct call
    // but when alias of eval is used then global var changes => indirect call
    //
    var geval = eval();
    // creating alias
    x = "global";
    // eval( )
    //
    var f = function() {
        var x = "local";
        eval("x += 'changed' ");
        // direct call
        // here local var value will be changed b/c eval is used
    },
        // geval( )
        //
        g = function() { // effect shown a/c to ecma5
            var y = "local";
            geval("y += 'changed' ")
            // here global var will be created and changed,
            // as alias is used, indirect call
        };

}

/// function and for/in
{
    var anyfunction = function(argument) { // function statement method
        // :::::::
    };
    // when statement method is used, end at ;

    function anyfunction(argument) {
        // function expression method
        // :::::: ;
    }

    //
    var a = { // object
        x: 1,
        y: 2,
        z: 3
    };

    for (var b in a) { // b is x, y, z
        // ::::::
    };
}
/// format of exception throw
{
    if (x > 0) {
        throw new Error(" program is fucked");
    }
    try {
        var n = prompt(" please enter an integer # ");
        var f = factorial(n);
        alert(n + "! = ");

    } catch (ex) {
        alert(ex);
        // it will show which type of exception is captured
    } finally {
        //::::
        // it'll run whether exception is caught or not
        ;
    }
}
/// "with" statement
{
    // 'with' is used to give an object temporary scope of some class
    //
    with(document.form[0]) {
        address.value = "";
        // otherwise: document.form[0].address.value ;
    }
    // to avoid "with" as its deprecated in ecma5 :
    {
        var f = document.form[0];
        f.address.value = "";
    }
}
