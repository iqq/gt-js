var gazeTracker = new gt.GazeTracker();
var first = document.getElementById("first");
var second = document.getElementById("second");

gazeTracker.register(first)
	.on("enter",function(gazeEvent){
		first.style = "color:blue:";
		console.log(gazeEvent);
	})
	.on("exit",function(gazeEvent){
		first.style = "color:black";
		console.log(gazeEvent);
	});

/* create a driver to query tracker information
 * use the mouse data in this test
 */
//var driver = new gt.MouseDriver(0);
//gazeTracker.addDriver(driver);

var driver = new gt.SocketIODriver();
gazeTracker.addDriver(driver);
