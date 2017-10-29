/* in the datastructures, indicates that no owner owns a lock
 * or has triggered a cue
 */
const NO_OWNER = -1;

/* ticks before and after an interaction */
const MIN_INTER_TICKS = 400;

class GazeObject{
	const tickEnum = Object.freeze({
		EMPTY:0,
		NEUTRAL:1,
		FULL:2
	});

	constructor(parent,element){
		this.onCallbacks = new Map();
		this.parent = parent;
		this.element = element;
		this.owner = NO_OWNER;

		/* ticks of interaction for interaction delay each key is a tracker id
		 * and the value is the number of ticks on this gaze object
		 */
		this.inter_ticks = new Map();
	}

	/* register a function to be called whenever the specified event in eventString happens */
	on(eventString,callback,delay){
		callback_data = new Object();
		callback_data.func = callback;
		callback_data.delay = delay != undefined ? delay : MIN_INTER_TICKS;
		this.onCallbacks.set(eventString,callback_data);
		return this;
	}

	register(element){
		return parent.register(element);
	}

	/* perform ticking:
	* tick up if element is owned or can be owned and user is looking at it
	* tick down when user isn't looking at it
	* if element is owned by another user, reset
	*/
	tickInteraction(tracker,on_element,delta_ticks){
		/* setup inter_ticks for tracker if it does not exist */
		if(this.inter_ticks.get(tracker) == undefined){
			inter_ticks.set(tracker,0);
		}
		var prev_ticks = inter_ticks.get(tracker);
		if(this.owner == tracker || this.owner == NO_OWNER){
			if(on_element){
				if(prev_ticks < MIN_INTER_TICKS){
					inter_ticks.set(tracker,Math.min(prev_ticks+delta_ticks,MIN_INTER_TICKS));
				}
			}else{
				if(prev_ticks > 0){
					inter_ticks.set(tracker,Math.max(prev_ticks-delta_ticks,0));
				}
			}
		}else{
			inter_ticks.set(tracker,0);
		}

		prev_ticks = inter_ticks.get(tracker);
		if(prev_ticks == MIN_INTER_TICKS){
			return tickEnum.FULL;
		}else if(prev_ticks == 0){
			return tickEnum.EMPTY;
		}else{
			return tickEnum.NEUTRAL;
		}
	}

	/* functions for obtaining and releasing locks on elements
	 * value of true is returned if lock/release is successful
	 * false otherwise
	 */
	Lock(tracker){
		if(this.owner == NO_OWNER){
			this.owner = tracker;
			return true;
		}
		return false;
	}

	Release(tracker){
		if(this.owner == tracker){
			this.owner = NO_OWNER;
			return true;
		}
		return false;
	}
}

export default class GazeTracker {
	constructor(){
		this.gazeObjects = new Map();
		this.trackerData = new Map();
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

	/* check if gaze falls on any registered objects */
	checkGaze(){
		/* for now iterate over every member and check bounding boxes, later should
		 * use some form of space partitioning
		 */
		for(var entry of this.gazeObjects){

		}
	}
}
