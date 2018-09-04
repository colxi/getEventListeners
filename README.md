## Element.prototype.getEventListeners()

Returns the event listeners registered on the specified object. The return value is an object that contains an array for each registered event type (click or keydown, for example). The members of each array are objects that describe the listener registered for each type. 




A simple usage example :
```javascript    
    let myEl = document.getElementById('someElementId');
    // add some event listeners to the Element
    myEl.addEventListener('click', e=> console.log('click!') );
    myEl.addEventListener('click', e=> console.log('click 2!') );
    myEl.addEventListener('mouseover', e=> console.log('mouse over!') );

	// retrieve the listeners
    console.log( myEl.getEventListeners() );
    /*
    { 
    	click : [
			{ listener: ƒ, useCapture: false, type:"click"},
			{ listener: ƒ, useCapture: false, type:"click"}
        ],
		mouseover : [
			{ listener: ƒ, useCapture: false}
		]
    }
    */
```

Retrieve only the click-event listeners :
```javascript     
    console.log( myEl.getEventListeners('click') );
    /*
    [
        { listener: ƒ, useCapture: false, type:"click"},
        { listener: ƒ, useCapture: false, type:"click"}
    ]
    */
```
## Package distribution :
You can include this library using the CDN ...

```
<script src='https://cdn.jsdelivr.net/gh/colxi/getEventListeners/src/getEventListeners.min.js'></script>
```


Package can also be installed via:

```
 $ npm install geteventlisteners --save
```

and is also available in Github :

```
https://github.com/colxi/getEventListeners
```

## Limitations

To be able to track the event listeners assignements, this module overwrites `Element.prototype.addEventListener` and `Element.prototype.removeEventListener`, with custom functions that mantain  an updated list of listeners. 
Any event listener declared before this module is imported will be missed.

> **In order to be able to track all the listeners, this module must be imported before any event listener is declared.**

**Only event listeners declared using `Element.addEventListener()`, are going to be tracked**. For example, the following event listeners declarations, will not be tracked :
```html
	<div onclick="myFunction()"></div>
```
and...
```javascript
	myElement.onclick= function(){ /*your code*/ }
```