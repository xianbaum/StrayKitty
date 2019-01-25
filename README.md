# StrayKitty
A cat toy

A short poem:

*sheep.exe*  
*I am not a free*

## Add-on usage

For Firefox-based browsers, [Stray Kitty can be installed from here](https://addons.mozilla.org/en-US/firefox/addon/stray-kitty/).

For chromium based browsers, [Stray Kitty can be installed from here](https://chrome.google.com/webstore/detail/stray-kitty/pdiefgmeejbkamgippdjdchpgkdnelbl)

## UserScript usage:

1. Get GreaseMonkey or a similar add-on that can run UserScripts
2. Install this add-on
3. Click on the + button to add a kitty. Click on the - button to remove a kitty.

## Script Usage:

Host and include this script
> &lt;script src="StrayKitty.js">&lt;/script>

Somewhere in your Javascript code after the page loads, write:

>var myManager = new StrayKittyManager(fps);
>myManager.start();

To add a kitty, call StrayKittyManager.addKitty().

**OPTIONAL**: StrayKittyManager.addKitty() can accept 3 values:

>myManager.addKitty(0); //a Tabby Cat named Ginger  
>myManager.addKitty(1); //a pink cat named Elizabeth  
>myManager.addKitty(2); //a Siamese cat named Jack-Jack  

If no value is provided, a kitty will be chosen one for you. This method has a return value of the number of kitties currently on screen.

To remove a kitty, write:  
>myManager.removeKitty()

It removes the oldest kitty added. If there are no kitties left, then it does nothing. To remove a specific kitty, a number can be applied. The number is in the order that it was added, starting at 0 from the oldest. This will remove the 3rd kitty:

>myManager.removeKitty(2)

StrayKitty can be paused with:

>myManager.pause();

It can be resumed or started with:

>myManager.start();

**NOTE**: The script will not run unless the start() method is called.

The execution can be toggled between start and pause with:

>myManager.toggle();

The amount of kitties can be viewed with the read-only property:

>myManager.kittyCount

## Building

### Prerequisites

To build it, you will need nodejs and npm installed. First, clone the repository then install the required packages.

>git clone https://github.com/xianbaum/StrayKitty.git  
>npm install

### Building it as a browser JavaScript library

> npm run js

### Building it as a UserScript

> npm run userscript

### Building it as a WebExtension

webextension builds an unpacked folder. webextension-release builds and zips

> npm run webextension
> npm run webextension-release

### Cleaning dist/ and obj/ folders

obj/ is a folder created by the TypeScript compilation process. It is then compiled by browserify into the dist/ folder. The build script also copy some files into the dist/ folder depending on what is being built. If you are building different versions, in between builds you may consider typing:
 
> npm run clean 
