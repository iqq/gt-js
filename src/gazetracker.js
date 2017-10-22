class GazeObject{
	constructor(parent,element){
		this.onCallbacks = new Map();
		this.parent = parent;
		this.element = element;
	}

	/* register a function to be called whenever the specified event in eventString happens */
	on(eventString,callback){
		this.onCallbacks.set(eventString,callback);
		return this;
	}

	register(element){
		return parent.register(element);
	}
}

export default class GazeTracker {
	constructor(){
		this.gazeObjects = new Map()
	}

	register(element){
		gazeObject = new GazeObject(this,element);
		this.gazeObjects.set(element,gazeObject);

		return gazeObject;
	}

	createGazeEvent(id, x, y){
		var gazeEvent = new Object();
		gazeEvent.id = id;
		gazeEvent.x = x;
		gazeEvent.y = y;

		return gazeEvent;
	}
}
