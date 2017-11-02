var gazeTracker = new gt.GazeTracker();
var first = document.getElementById("first");
var second = document.getElementById("second");

gazeTracker.register(first)
	.on("enter",function(gazeEvent){
		first.style = "color:blue:";
		console.log(gazeEvent + " " + this);
	})
	.on("exit",function(gazeEvent){
		first.style = "color:black";
		console.log(gazeEvent + " " + this);
	});
