# gt-js
gt.js, a Javascript library for augmenting interfaces to be responsive to gaze-based events.

### Building
This library requires `npm` to be built (https://www.npmjs.com/get-npm).  
In a terminal:  
1. Use git to clone the repository with `git clone https://github.com/vialab/gt-js.git`
2. Navigate to the root directory of the cloned repository
3. Install the required dependencies with `npm install`
4. run `npm run build` to compile the a minified version of the library
5. Alternatively `npm run dev` will run a build environment which compiles a non-minified version of the library continuously as changes are made to the source code (in the `src/` directory).

Either version of the library will be compiled to a single file in the `lib/` directory.

### Basic Use
The main workflow of the library is in registering html elements (eg. divs) and defining actions for gaze events which occur on those elements. *The code for the following example is  provided in the `example/` directory.*

First we include the library with our page so that our code can use it.
```html
<html>
<head>
	<meta charset="utf-8">
	<script src="./gt.js"></script>
	<!-- ... -->
</head>
<!-- ... -->
</html>
```
The path may differ depending on where gt.js is installed.  

Next we define at least one element so that we can register it with our library, in this example I will use an `<img>` element but virtually any html element can be used.
```html
<body style="background-color:grey">
	<img id="image" src="tile0.jpg" alt="First tile">
	<script src="./gazeinter.js"></script>
</body>
```

Now we can move over to the javascript side where we define the behaviour for gaze events. The example code for this is inside `gazeinter.js`.
