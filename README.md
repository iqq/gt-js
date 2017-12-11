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

Now we can move over to the javascript side where we define the behaviour for gaze events. The example code for this is inside `gazeinter.js`. Here we create a `GazeTracker` object. This object manages registered html elements and generates gaze events on the objects.
```Javascript
var gazeTracker = new gt.GazeTracker();
var image = document.getElementById("image");

gazeTracker.register(image)
	.on("enter",function(gazeEvent){
		image.src = "tile1.jpg";
	})
	.on("exit",function(gazeEvent){
		image.src = "tile0.jpg";
	});
```
Here we get the html element we want (image) and register it with the gazeTracker object. The return value of the register method is a GazeObject - an object which represents a gaze aware element in the document. We then define behaviour for the GazeObject with the .on method. The first argument is the name of the event and the second argument is a callback for when that event occurs. In this example we just use an anonymous function. The return value of the .on method is the same GazeObject, so we can chain these method calls to define multiple event handlers. In our example code, we are simply changing the image when the gaze `enter`s the image, and we change back when the gaze `exit`s. At the moment `enter` and `exit` are the only valid events.  

Finally we require a driver for our library - the driver is the source of gaze data which can differ between different trackers and systems. The library comes with two drivers, one which receives data from a socketIO source and another which uses the mouse pointer to spoof gaze data. Depending on how a system is designed it is likely that the client will have to define their own driver. Information on the API for a driver will be documented elsewhere, in our example we will go forward with using the included socketIO driver.
```Javascript
var driver = new gt.SocketIODriver();
gazeTracker.addDriver(driver);
```
This code intializes a new driver and adds it to the gazeTracker object. For the socketIO driver, it updates the gaze location when new tracker data comes in through a socketIO connection. See the implementation in `src/socketio_driver.js` for more details on this and an example of how one would implement their own driver.
