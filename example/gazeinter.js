var gazeTracker = new gt.GazeTracker(true); /* debug mode to true to display gaze location*/
var image = document.getElementById("image");

gazeTracker.register(image)
	.on("enter",function(gazeEvent){
		image.src = "tile1.jpg";
	})
	.on("exit",function(gazeEvent){
		image.src = "tile0.jpg";
	});

/* create a driver to query tracker information
 * use the mouse data in this test
 */
//var driver = new gt.MouseDriver(0);
//gazeTracker.addDriver(driver);

var driver = new gt.SocketIODriver();
gazeTracker.addDriver(driver);
