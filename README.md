# Animator

Animator is an ES6 animation utility library with an API that makes creating and sequencing CSS transitions and animations simple and easy. Use it for all sorts of animation requirements in the browser; for every day needs like animating banners, UI interactions, all the way up to complex animation sequences with dynamically calculated style values and accompanying audio. For a full API breakdown see the [WIKI](https://github.com/MikeDigitize/Animator/wiki).

## Features
* CSS transition / keyframe animation creator
* Promise based animation / transition sequencer
* Style class creator
* Prefix handling
* Pause / Play sequences
* Easy class / style manipulation

## Browser support
```javascript
if(!Animator.isSupported()) {
    // handle fallbacks here.
}
```

## Creating sequences
Animator has three methods to create sequences with - <code>animation</code> for keyframe animations, <code>transition</code> for CSS transitions and <code>combo</code> for combinations of the two that need to run simultaneously. Each of these return a <code>Promise</code> that resolves when all transitions / animations are complete, so they can be chained together to create sequences. Transitions and animations can be triggered either by setting styles directly on the element or adding / removing classes. See the [API guide](https://github.com/MikeDigitize/Animator/wiki/Animator-API-Guide) for more details.

## Example sequence
Arbitrary example - trigger an animation and transition sequence on several <code>p</code> tags. In this example the CSS is defined in the stylesheet but Animator can be used to create all transition / keyframe definitions too.

```css
/**
 *  First - some basic CSS setup, omitting prefixes for brevity.
 */

.text { transition: transform 4s ease-out; }
.enlarge { transform: scale(2) }
.blink { animation : blink 2s 2 }

@keyframes blink {
    0% { opacity: 1 }
    25% { opacity: 0 }
    50% { opacity: 1 }
    75% { opacity: 0 }
    100% { opacity: 1 }
}
``` 

```javascript


/**
  * Combine an animation and transition together with the combo method.
  * Follow the Promise `then` pattern for chaining.
  */

var p = document.querySelectorAll(".text");
 
var sequence = Animator.combo([
	Animator.transition({
	    element : p,
	    properties : Animator.getPrefix("transform"),
	    addClass : {
	        before : "enlarge"
	    }
	}),
	Animator.animation({
	    element : p,
	    addClass : {
	        before : "blink"
	    }
	})
]);       

sequence
    .then(function(elements) {
    
    /**
      * Sequenced elements are passed into the next `then` callback.
      *	Return a transition / animation / combo to continue the chain.
      */
      
    	return Animator.transition({
			element : p,
			properties : Animator.getPrefix("transform"),
			removeClass : {
	        		before : "enlarge"
	            }
		});
    })
    .then(function() {
    	// continue or finish!
    })
    .catch(function() {
        // handle errors here!
    });

```

## Playing / Pausing Sequences

Sequences can be paused at any point by calling
```javascript
Animator.pause();
```

and resumed by
```javascript
Animator.play();
```

## Defining Keyframe Animations

Animator's <code>createAnimation()</code> method lets you define keyframe animations. It takes an optional style class name and style rules object to create an associated class to trigger the animation. Pass in any CSS property to Animator's <code>getPrefix()</code> method to get a supported prefixed / non-prefixed version back. Animator gets and sets CSS styles using objects with CSS property name / value pairs. It has a handy method called <code>createCSSRule()</code> that converts single or multiple property names / values into objects, useful for when property names need to be prefixed. 

```javascript
/**
  * Create a class to trigger the animation and style rules for the class. 
  * The `createCSSRule` method returns an object of CSS property / value pairs.
  */

var animation = Animator.getPrefix("animation");
var styleRules = Animator.createCSSRule(animation, "someAnimation 0.3s infinite");
// e.g. returns { "animation" : "someAnimation 0.3s infinite" }.

/**
  * Define the keyframe animation with either syntax e.g. from, to or % based.
  */
  
Animator.createAnimation({
	name : "someAnimation",
	animation : { 
		"0%, 24.9%, 100%" : { "background-position" : "0px" }, 
		"25%, 49.9%" : { "background-position" : "-250px" },
		"50%, 74.9%" : { "background-position" : "-500px" },
		"75%, 99%" : { "background-position" : "-750px" }
	},
	
	/**
  	  * Define an (optional) class to use to trigger the animation.
  	  * Pass in the rules created with the `createCSSrule` method above.
  	  */
  	  
	animationClass : {
		name : "someAnimation",
		rules : styleRules
	}
});	

/**
  * Trigger the animation by adding the class created directly to the element.
  */

Animator.addClass(p, "someAnimation");
  
// or
Animator.animation({
	element : p,
	addClass : {
		before : "someAnimation"
	}
});

/**
  * Or set the style rules directly.
  */

Animator.setStyles(p, styleRules);

// or
Animator.animation({
	element : p,
	setStyles : {
		before : styleRules
	}
});
```

## Defining Transitions

Animator's <code>createTransition</code> method allows you to define single or multiple CSS transitions against an element or Nodelist. See the [API guide](https://github.com/MikeDigitize/Animator/wiki/Animator-API-Guide) for an in depth description.

```javascript
Animator.createTransition({
	element : p,
	properties : [Animator.getPrefix("transform"), "opacity"],
	duration : "250ms",
	easing : ["ease-in", "linear"],
	delay : "50ms"
});
```

```css
/**
  * The above is the equivalent of this (prefixes handled automatically).
  */

.text { transition : transform 250ms ease-in 50ms, opacity 250ms linear 50ms }  
```
## All Methods
For an in-depth description with examples of each Animator method visit the [WIKI](https://github.com/MikeDigitize/Animator/wiki) page.

## Create A Style Class
```javascript
   /**
     * @createClass function
     *
     * @params {String, Object}
     * @description Creates a CSS class from a classname and an object of CSS property / value pairs.
     */
     
Animator.createClass(params);
```

## Delete A Style Class
```javascript
   /**
     * @deleteClass function
     *
     * @params {String}
     * @description Deletes a CSS class from Animator's stylesheet.
     */
     
Animator.deleteClass(params);
```

## Getting A Prefix
```javascript
   /**
     * @getPrefix function
     *
     * @params {String}
     * @description Returns a prefixed CSS property or DOM event name.
     * @return {String}
     */
     
Animator.getPrefix(params);
```

## Setting Styles
```javascript
   /**
     * @setStyles function
     *
     * @params {HTMLElement, String / Array}
     * @description Sets properties / values on an element's CSSStyleDeclaration.
     */
     
Animator.setStyles(params);
```

## Getting Styles
```javascript
   /**
     * @getStyles function
     *
     * @params {HTMLElement, Object}
     * @description Return an object of CSS properties / values.
     * @return {Object}
     */
     
Animator.getStyles(params);
```

## Create Style Rule Object
```javascript
   /**
     * @createCSSRule function
     *
     * @params {String / Array, String / Array}
     * @description Returns an object of CSS property / value pairs.
     * @returns {Object}
     */
     
Animator.createCSSRule(params);
```

## Add Class
```javascript
   /**
     * @addClass function
     *
     * @params {HTMLElement / Nodelist, String / Array}
     * @description Sets a class(es) on an element.
     */
     
Animator.addClass(params);
```

## Remove Class
```javascript
    /**
     * @removeClass function
     *
     * @params {HTMLElement / Nodelist, String / Array}
     * @description Removes a class(es) from an element.
     */
     
Animator.removeClass(params);
```

## Create CSS Transition 
```javascript
   /**
     * @createTransition function
     *
     * @params {Object}
     * @description Creates a CSS transition definition.
     */

Animator.createTransition(params);
```

## Create CSS Keyframe Animation 
```javascript
   /**
     * @createAnimation function
     *
     * @params {Object}
     * @description Creates a CSS keyframe animation definition.
     */

Animator.createAnimation(params);
```

## Create Transition Sequence
```javascript
   /**
     * @transition function
     *
     * @params {Object}
     * @description Creates a transition sequence.
     * @returns {Promise}
     */

Animator.transition(params);
```

## Create Animation Sequence
```javascript
   /**
     * @animation function
     *
     * @params {Object}
     * @description Creates an animation sequence.
     * @returns {Promise}
     */

Animator.animation(params);
```

## Create Combo of Transition / Animation Sequences
```javascript
   /**
     * @combo function
     *
     * @params {Object}
     * @description Creates an combination of sequence.
     * @returns {Promise}
     */

Animator.combo(params);
```

## Detect Browser Support
```javascript
   /**
     * @isSupported function
     *
     * @description Tests the browser for Animator support.
     * @returns {Boolean}
     */

Animator.isSupported();  
```

## Licence

The MIT License (MIT)

Copyright (c) 2015 Michael Chadwick

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

