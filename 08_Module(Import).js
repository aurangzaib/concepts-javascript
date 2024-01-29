/*

 Description:
 Module Import

 Modifications:
 ---------------------------------------------------------------------------------------
 Date      Vers.  Comment                                                     Name
 ---------------------------------------------------------------------------------------
 07.11.23  01.00  Created												      Siddiqui
 ---------------------------------------------------------------------------------------

*/

import * as Imported from './07_Module(Export).js'  // Import with module scope

let cls = new Imported.Cls(1, 2);
cls.getter();
console.log("With module scope: ", Imported.PI);
