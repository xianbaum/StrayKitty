var fs = require("fs");
var browserify = require("browserify")
var prependify = require("prependify")
var cpx = require("cpx")
console.log("Generating image...");

var arg = process.argv[2];

if(arg === "clean") {
    var dir = fs.readdirSync(__dirname + "/out");
    for(var i = 0; i < dir.length; i++){
        fs.unlinkSync(__dirname + "/out/" + dir[i]);        
    }
    return;
}

var base64Image = 
"var imgsrc = \"data:image/gif;base64," + 
    new Buffer(fs.
            readFileSync(__dirname + "/exportables/kitties.png").
            toString("base64"))+"\";\n";

var outname = "";
var prepend = "";
/*specifics hack*/
if(arg === "jsexport.js") {
    console.log("Copying demo...")
    cpx.copy(__dirname+"/exportables/demo.html", "out/")
    outname = "straykitty.js"
} else if(arg === "userscriptmain.js") {
    // var meta = new Buffer(fs.
    //     readFileSync(__dirname + "/exportables/userscript.meta.js")
    //     .toString());
    // prepend += meta;
    prepend += base64Image;
    outname = "straykitty.user.js"
} else if(arg === "webextensionmain.js") {
    console.log("Copying manifest.json...")
    cpx.copy(__dirname+"/exportables/manifest.json", "out/")
    outname = "straykitty.js"
}
var bundleFs = fs.createWriteStream(__dirname + "/out/"+outname);
console.log("Bundling...")
var b = browserify()
b.add("./tsout/"+ process.argv[2]);
b.plugin(prependify, base64Image);
b.bundle().pipe(bundleFs)

console.log("ok! :3")