var fs = require("fs");
var browserify = require("browserify");
var prependify = require("prependify");
var tinyifiy = require("tinyify");
var cpx = require("cpx");

var arg = process.argv[2];

function cleanFolder(folder, dir) {
    let folderDir = __dirname + "/" + folder;

    let files;
    try {
        files = fs.readdirSync(folderDir);
    } catch(e) {
        return;
    }

    console.log("enter "+folderDir);
    for(var i = 0; i < files.length; i++){
        let file =  __dirname + "/"+folder+"/" + files[i];
        console.log("unlink " + file);
        fs.unlinkSync(file);
    }

    console.log("rmdir " + folderDir);
    fs.rmdirSync(folder);
}

if(arg === "clean") {
    dir = fs.readdirSync(__dirname + "/");
    var strayKittyIndex = dir.indexOf("straykitty.zip");

    if(strayKittyIndex > -1) {
        console.log("unlink straykitty.zip");
        fs.unlinkSync(__dirname + "/straykitty.zip");
    }

    cleanFolder("dist", dir);
    cleanFolder("obj/actions", dir);
    cleanFolder("obj", dir);

    console.log("all clean ;3");
    return;
}

if (!fs.existsSync(__dirname + "/dist/")){
    console.log("dist/ doesn't exist, creating dist/");
    fs.mkdirSync(__dirname + "/dist/");
}

console.log("Generating image...");
var base64Image = 
"var imgsrc = \"data:image/gif;base64," + 
    Buffer.from(fs.
            readFileSync(__dirname + "/exportables/kitties.png").
            toString("base64"))+"\";\n";

var outname = "";
var prepend = "";
/*specifics hack*/
if(arg === "jsexport.js") {
    var meta = Buffer.from(
        fs.readFileSync(__dirname + "/exportables/js-meta.js")
            .toString());
    console.log("Copying demo...");
    cpx.copy(__dirname+"/exportables/demo.html", "dist/");
    prepend += meta+"\n"+ base64Image;
    outname = "straykitty.js";
} else if (arg === "jsexport.js-WEB") {
    outname = "straykitty.js";
}else if(arg === "userscriptmain.js") {
    var meta = Buffer.from(fs.
         readFileSync(__dirname + "/exportables/userscript.meta.js")
         .toString());
    prepend += meta+"\n"+ base64Image;
    outname = "straykitty.user.js";
} else if(arg === "webextensionmain.js") {
    console.log("Copying webextension and friends...");
    cpx.copy(__dirname+"/exportables/manifest.json", "dist/");
    cpx.copy(__dirname+"/node_modules/webextension-polyfill/dist/browser-polyfill.min.js", "dist/");
    cpx.copy(__dirname+"/exportables/background.js", "dist/");
    cpx.copy(__dirname+"/exportables/icon-16.png", "dist/");
    cpx.copy(__dirname+"/exportables/icon-16-alt.png", "dist/");
    cpx.copy(__dirname+"/exportables/icon-16-alt2.png", "dist/");
    cpx.copy(__dirname+"/exportables/icon-16-eraser.png", "dist/");
    cpx.copy(__dirname+"/exportables/icon-16-gray.png", "dist/");
    cpx.copy(__dirname+"/exportables/icon-48.png", "dist/");
    cpx.copy(__dirname+"/exportables/popup.css", "dist/");
    cpx.copy(__dirname+"/exportables/popup.js", "dist/");
    cpx.copy(__dirname+"/exportables/popup.html", "dist/");
    cpx.copy(__dirname+"/exportables/settings.html", "dist/");
    cpx.copy(__dirname+"/exportables/settings.js", "dist/");
    cpx.copy(__dirname+"/exportables/kitties.png", "dist/");
    outname = "straykitty-webextension.js";
}
var bundleFs = fs.createWriteStream(__dirname + "/dist/"+outname);
console.log("Browserifying...");

var b = browserify();

if(arg === "userscriptmain.js") {
    b.add("./obj/"+ process.argv[2])
        .plugin(prependify, prepend)
        .bundle()
        .pipe(bundleFs);
} else if(arg === "jsexport.js-WEB") {
    b.add("./obj/"+ "jsexport.js")
        .plugin(tinyifiy)
        .bundle()
        .pipe(bundleFs);
} else if (arg === "webextensionmain.js") {
    b.add("./obj/"+ "webextensionmain.js")
        .plugin(tinyifiy)
        .bundle()
        .pipe(bundleFs);
}else {
    b.add("./obj/"+ process.argv[2])
        .plugin(tinyifiy)
        .plugin(prependify, prepend)
        .bundle()
        .pipe(bundleFs);
}

console.log("ok! :3");
