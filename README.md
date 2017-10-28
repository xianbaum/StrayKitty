# StrayKitty
A cat toy

A little poem:

sheep.exe  
I am not a free

## Add-on usage

I am currently in the process of publishing an add-on for Firefox. Afterwards, I will create a Chrome add-on

## UserScript usage:

### 1. Get GreaseMonkey or a similar add-on that can run UserScripts

### 2. Install this add-on



## Script Usage:

### 1. Host and include this script
>&lt;script src="StrayKitty.js">&lt;/script>

### 2. Somewhere in your Javascript code after the page loads, write:
>var myManager = new StrayKittyManager(fps).addKitty()  

*OPTIONAL*: StrayKitty.addKitty() can accept 3 values:

>StrayKittyManager.addKitty(0)

a Tabby Cat named Ginger
>StrayKittyManager.addKitty(1)

an unnamed (as of now) pink kitty
>StrayKittyManager.addKitty(2)

a Siamese cat named Jack-Jack
If no value is provided, it will choose one for you.

### 3. To remove a kitty, write:
>StrayKittyManager.removeKitty()

It removes the first kitty added. If there are no kitties left, then it does nothing.

### 4. To 

## Building

### Prerequisites

To build it, you will need TypeScript, Node and NPM.

Install the required packages with

>npm install

### Building it as a browser JavaScript library

To build it as a JavaScript library, type

> npm run js

### Building it as a UserScript

To build it as a UserScript add-on, type

> npm run userscript

### Building it as a WebExtension

To build it as a WebExtension add-on, type

> npm run webextension

### Cleaning out/ and tsout/ folders

tsout/ is a folder created by the TypeScript compilation process. 
 It is then compiled by browserify into the out/ folder. I also copy some files into the out/ folder depending on what is being built. If you are building different versions, you may want to consider typing
 
 > npm run clean 

in between each build.