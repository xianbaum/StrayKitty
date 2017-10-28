var fs = require("fs");
var browserify = require("browserify")
var prependify = require("prependify")
var cpx = require("cpx")

var arg = process.argv[2];

if (!fs.existsSync(__dirname + "/out/")){
    console.log("out/ doesn't exist, creating out/");
    fs.mkdirSync(__dirname + "/out/");
}

if(arg === "clean") {
    var dir = fs.readdirSync(__dirname + "/out");
    for(var i = 0; i < dir.length; i++){
        fs.unlinkSync(__dirname + "/out/" + dir[i]);        
    }
    var dir = fs.readdirSync(__dirname + "/tsout");
    for(var i = 0; i < dir.length; i++){
        fs.unlinkSync(__dirname + "/tsout/" + dir[i]);        
    }
    console.log("all clean ;3")
    return;
}

console.log("Generating image...");
var base64Image = 
"var imgsrc = \"data:image/gif;base64," + 
    new Buffer(fs.
            readFileSync(__dirname + "/exportables/kitties.png").
            toString("base64"))+"\";\n";

var outname = "";
var prepend = "";
/*specifics hack*/
if(arg === "jsexport.js") {
    prepend += base64Image;    
    console.log("Copying demo...")
    cpx.copy(__dirname+"/exportables/demo.html", "out/")
    outname = "straykitty.js"
} else if(arg === "userscriptmain.js") {
    var meta = new Buffer(fs.
         readFileSync(__dirname + "/exportables/userscript.meta.js")
         .toString());
    prepend += meta+"\n"+ base64Image;
    outname = "straykitty.user.js"
} else if(arg === "webextensionmain.js") {
    prepend += base64Image;
    console.log("Copying webextension and friends...")
    cpx.copy(__dirname+"/exportables/manifest.json", "out/")
    cpx.copy(__dirname+"/exportables/icon-16.png", "out/")
    cpx.copy(__dirname+"/exportables/icon-48.png", "out/")    
    cpx.copy(__dirname+"/exportables/popup.css", "out/")
    cpx.copy(__dirname+"/exportables/popup.js", "out/")    
    cpx.copy(__dirname+"/exportables/popup.html", "out/")        
    outname = "straykitty.js"
}
var bundleFs = fs.createWriteStream(__dirname + "/out/"+outname);
console.log("Bundling...")
var b = browserify()
b.add("./tsout/"+ process.argv[2]);
b.plugin(prependify, prepend);
b.bundle().pipe(bundleFs)

console.log("ok! :3")
