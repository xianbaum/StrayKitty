/*
 Christian Baum
 straykitty.js
 StrayKItties

 A cat toy

 A little poem:

 sheep.exe
 I am not a free


This software license is permissive because web software is difficult to
keep free software.

 USAGE:

 1. Include this script, like
 <script src="kitty.js"></script>
 2. Somewhere in your Javascript code after the page loads, write:
 StrayKitty.addKitty()
    OPTIONAL: StrayKitty.addKitty() can accept 3 values:
    - 0, a Tabby Cat named Ginger
    - 1, an unnamed (as of now) pink kitty
    - 2, a Siamese cat named Jack-Jack
    Otherwise, it will be a random kitty.
 3. To remove a kitty, write:
 StrayKitty.removeKitty()
    It removes the first kitty added. If there are no kitties left,
    then it does nothing.
 @source: https://github.com/xianbaum/BrowserBuddies
 @licstart

MIT License

Copyright (c) 2016 Christian Baum

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@licend
*/

StrayKitty = { fps     : 60,
	    kitties : [],
            image   : new Image(),
	    running : false,
	    mindex  : null,
	    moffx   : 0,
	    moffy   : 0,
	    kittyid : 0,
	    States  : {
		STANDING : 0,
		WALKING  : 1,
		RUNNING  : 2,
		YAWNING  : 3,
		SLEEPING : 4,
		LAYING   : 5,
		SITTING  : 6,
		LICKING  : 7,
		GRABBED  : 8,
		FALLING  : 9
	    },
	    frames : [[0], //Standing
		      [0, 1],//Walking
		      [3,2],//Running
		      [4],//Yawning
		      [5,6],//Sleeping
		      [7],//Laying
		      [8],//Sitting
		      [9, 10],//Licking
		      [1, 2, 3],//Grabbed
		      [2,3] // Falling
		     ]
	  }
StrayKitty.image.src = "kitties.png"

StrayKitty.Kitty = function( type, kittyid ) {
    this.facingright = (Math.random() < 0.5)
    this.rightset = false;
    this.type = type;
    this.frame = //Setting all to 0
    this.anim_max =
    this.y = 
    this.xv = 
    this.yv = 
	this.anim_timer = 0;
    this.x = Math.floor(Math.random()*window.innerWidth-32);
    this.state = 0; //Standing (see line 10-14)
    this.canvas = document.getElementById("kittycanvas".concat(kittyid));

}

StrayKitty.updatekitty = function( kitty ) {
    kitty.anim_timer += 10/StrayKitty.fps
    //update state
    if(kitty.state == StrayKitty.States.GRABBED) {
	kitty.xv = 0;
	kitty.yv = 0;
    }
    if(kitty.state == StrayKitty.States.STANDING ||
       kitty.state == StrayKitty.States.SLEEPING ||
       kitty.state == StrayKitty.States.LICKING  ||
       kitty.state == StrayKitty.States.SITTING  ||
       kitty.state == StrayKitty.States.LAYING   ) {
	kitty.xv = 0;
	kitty.yv = 0;
    }
    if(kitty.state != StrayKitty.States.GRABBED &&
       kitty.y < window.innerHeight-32 ) {
	kitty.state = StrayKitty.States.FALLING;
    }
    if(kitty.state == StrayKitty.States.FALLING &&
       kitty.y >= window.innerHeight-32)
	kitty.yv = kitty.yv*(-0.5);
    if(kitty.state == StrayKitty.States.FALLING &&
       Math.abs(kitty.yv)<0.1 &&
       kitty.y >= window.innerHeight-32) {
	kitty.state = StrayKitty.States.STANDING;
    }
    else if(kitty.state == StrayKitty.States.FALLING)
	kitty.yv = kitty.yv + 2*(1/StrayKitty.fps)
    if( kitty.state == StrayKitty.States.WALKING &&
	kitty.x == 0 ||
	kitty.state == StrayKitty.States.RUNNING &&
	kitty.x == 0 ||
	kitty.state == StrayKitty.States.WALKING &&
	kitty.x == window.innerWidth ||
	kitty.state == StrayKitty.States.RUNNING &&
	kitty.x == window.innerWidth )
	kitty.facingright = !kitty.facingright;
    if(kitty.state != StrayKitty.States.GRABBED &&
       kitty.state != StrayKitty.States.FALLING &&
       kitty.anim_timer > kitty.anim_max )
    {
	kitty.anim_max = Math.floor(Math.random()*30)+10;
	kitty.yv = 0;
	kitty.xv = 0;
	kitty.anim_timer = 0;
	if(kitty.state == StrayKitty.States.YAWNING) {
	    kitty.state = Math.random() > 0.3 ?
		Math.random > 0.5 ? StrayKittyStates.WALKING
		: StrayKitty.States.SLEEPING : StrayKitty.States.SITTING;
	}
	else if(kitty.states == StrayKitty.States.SLEEPING) {
	    kitty.state = Math.random() > 0.4 ? StrayKitty.States.SITTING
		: StrayKitty.States.STANDING;
	}
	else if(kitty.states == StrayKitty.States.SITTING) {
	    kitty.state = Math.random() > 0.4 ? StrayKitty.States.SLEEPING
		: StrayKitty.States.STANDING;
	}
	else
	    kitty.state = Math.floor(Math.random()*8);
	kitty.facingright = Math.random() < 0.5
    }
    if( kitty.state == StrayKitty.States.WALKING)
	kitty.xv = kitty.facingright ? 1 : -1;
    else if( kitty.state == StrayKitty.States.RUNNING)
	kitty.xv = kitty.facingright ? 2 : -2;
    //move
    kitty.x+=kitty.xv*(100/StrayKitty.fps);
    kitty.y+=kitty.yv*(100/StrayKitty.fps);
    //check bounds
    if(kitty.x < 0)
	kitty.x = 0;
    else if(kitty.x > window.innerWidth-32)
	kitty.x = window.innerWidth-32
    if(kitty.y < 0)
       kitty.y = 0;
    else if(kitty.y > window.innerHeight-32)
	kitty.y = window.innerHeight-32
    //draw
    kitty.canvas.style.top = "".concat(kitty.y).concat("px");
    kitty.canvas.style.left = "".concat(kitty.x).concat("px");
    context = kitty.canvas.getContext("2d");
    if (kitty.facingright != kitty.rightset ) {
	context.translate(32,0);
	context.scale(-1,1);
	kitty.rightset = kitty.facingright;
    }
    context.clearRect(0,0,32,32);
    var j = kitty.state;
    context.drawImage(StrayKitty.image,
		      32*
		      (StrayKitty.frames[kitty.state]
		       [Math.floor(kitty.anim_timer/2)%StrayKitty.frames[kitty.state].length]),32*kitty.type,
		      32,32,0,0,32,32);
}

StrayKitty.kittyFromId = function( id ) {
    for(i = 0; i < StrayKitty.kitties.length; i++)
	if( id == StrayKitty.kitties[i].canvas.id) {
	    return StrayKitty.kitties[i];
	}
}

StrayKitty.update = function() {
    if(StrayKitty.init == undefined) {
	document.addEventListener("mousemove",StrayKitty.grabbing);
	document.addEventListener("blur",StrayKitty.release);
	document.addEventListener("mouseup",StrayKitty.release);
    }
    StrayKitty.kitties.forEach( StrayKitty.updatekitty )
}

StrayKitty.down = function(event) {
    var kitty = StrayKitty.kittyFromId(event.target.id);
    if( event.clientX >= kitty.x &&
	event.clientX <= kitty.x+32 &&
	event.clientY >= kitty.y &&
	event.clientY <= kitty.y+32) {
	StrayKitty.mindex = i;
	StrayKitty.moffx  = event.clientX - StrayKitty.kitties[i].x;
	StrayKitty.moffy  = event.clientY - StrayKitty.kitties[i].y;	    
	StrayKitty.kitties[i].state = StrayKitty.States.GRABBED;
    }
}

StrayKitty.grabbing = function( event) {
    if( StrayKitty.mindex != null ) {
	StrayKitty.kitties[StrayKitty.mindex].x = event.clientX-StrayKitty.moffx;
	StrayKitty.kitties[StrayKitty.mindex].y = event.clientY-StrayKitty.moffy;
    }
}

StrayKitty.release = function() {
   if( StrayKitty.mindex != null)
	StrayKitty.kitties[StrayKitty.mindex].state = StrayKitty.States.FALLING;
    StrayKitty.mindex = null;
}

StrayKitty.addKitty = function( type ) {
    var kittycanvas = document.createElement("canvas");
    kittycanvas.id = 'kittycanvas'+StrayKitty.kittyid;
    kittycanvas.style.position = "absolute"
    kittycanvas.style.top = "0px";
    kittycanvas.style.left = "0px";
    kittycanvas.style.zIndex = "300";
    kittycanvas.width = 32;
    kittycanvas.height = 32;
    kittycanvas.addEventListener("mousedown",StrayKitty.down);
    document.body.appendChild(kittycanvas);
    if( !StrayKitty.running ) {
	StrayKitty._intervalID = setInterval(StrayKitty.update, 1000/StrayKitty.fps)
	StrayKitty.running = true;
    }
    type = typeof type === "number" ? type : Math.floor(Math.random()*3);
    type = Math.floor(type);
    type = type > 2 ? 2 : type;
    type = type < 0 ? 0 : type;
    StrayKitty.kitties.push(new StrayKitty.Kitty(type, StrayKitty.kittyid))
    StrayKitty.kittyid++;
}

StrayKitty.remKitty = function( ) {
    if(StrayKitty.kitties[0] !=null)
	if(StrayKitty.kitties[0].canvas != null)
            document.body.removeChild(StrayKitty.kitties[0].canvas)
    StrayKitty.kitties.shift();
}
