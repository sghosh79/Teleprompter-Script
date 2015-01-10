function GetObjX(obj)
{

var rect = obj.getBoundingClientRect();
var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
//fixes positioning for different browsers

return(rect.left + scrollLeft);

}

function GetObjY(obj)
{

var rect = obj.getBoundingClientRect();
var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
return(rect.top + scrollTop);

}

function scroller(obj)
{

var isScrolling = 0;
var step = 1;
var waitmsecs = 58;
var timerID = 0;
var minStep = 1;

var startScrolling = function()

{

isScrolling = 1;

//decrement vertical position of the object on the screen

var newTop = parseInt(GetObjY(obj), 10) - step;
//GetObjY() returns number in pixels, i.e. number followed by 'px' - a string, not number
// number 10 is for base 10, i.e. not hexadecimal
//"- step" is to decrement by 1 pixel


newTop += "px";
obj.style.top = newTop;

//moves text by 1 pixel and then stops



timerID = window.setTimeout(startScrolling, waitmsecs);

//waitmsecs - number of seconds for the delay in scrolling
//timerID - allows us to determine when to start and stop scrolling

};

var stopScrolling = function()

{

isScrolling = 0;


window.clearTimeout(timerID);


};


var startOrStop = function() //toggle
{


if(isScrolling) stopScrolling();
else startScrolling();


};

var userInput = function(keyPress)
{

if(!keyPress) keyPress = event;
//set keyPress to last event if no user input


switch(keyPress.keyCode)
{

//alert(keyPress.keyCode) - can help you determine what the ASCII codes are for the keys being pressed

	case 10: //return

	case 13: //Enter

		startOrStop();

	break;

	case 39: // Right arrow: accelerate the stepping

		step++;

	break;

	case 37: // Left arrow: decelerate the stepping

		if(step > minStep) step--;

	break;			

	default:
				// alert(keyPress.keyCode);
	break;
		}

	return false;
	};

	obj.onclick = startOrStop;
	document.onkeyup = userInput;
	//so our document responds to not just clicks, but keys being pressed

}
s