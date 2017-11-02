//	Copyright {2017} {Santiago Bonada}
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//			http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.


/* in the datastructures, indicates that no owner owns a lock
 * or has triggered a cue
 */
const NO_OWNER = -1;

/* ticks before and after an interaction */
const MIN_INTER_TICKS = 400;

const tickEnum = Object.freeze({
	EMPTY:0,
	NEUTRAL:1,
	FULL:2
});

class GazeObject{


	constructor(parent,element){
		this.listeners = new Map();
		this.parent = parent;
		this.element = element;
		this.owner = NO_OWNER;

		/* ticks of interaction for interaction delay each key is a tracker id
		 * and the value is the number of ticks on this gaze object
		 */
		this.inter_ticks = new Map();
	}

	/* register a function to be called whenever the specified event in eventString happens
	 * Valid eventStrings (all lowercase):
	 *	"enter"
	 *	"exit"
	 *	"intrude"
	 * These callbacks take the form of function(gazeEvent) where gazeEvent is
	 * an object containing at least id, x, and y position of the tracker
	 */
	on(eventString,callback,delay){
		var callback_data = new Object();
		callback_data.func = callback;
		callback_data.delay = delay != undefined ? delay : MIN_INTER_TICKS;
		this.listeners.set(eventString,callback_data);
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
	lock(tracker){
		if(this.owner == NO_OWNER){
			this.owner = tracker;
			return true;
		}
		return false;
	}

	release(tracker){
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
		var gazeObject = new GazeObject(this,element);
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
		/* TODO: for now iterate over every member and check bounding boxes, later should
		 * use some form of space partitioning to speed this up.
		 * Firstly check if gaze falls into an objects bounding box, then check if
		 * a gaze event should occur. If one does, we call the appropriate function
		 * for that event.
		 */
		for(var tracker of this.trackerData){
			var lastTime = tracker.lastTime;
			if(lastTime == undefined){
				lastTime = new Date().getTime();
			}
			var elapsedTime = new Date().getTime();
			tracker.lastTime = elapsedTime;
			elapsedTime = elapsedTime - lastTime;

			for(var gazeObject of this.gazeObjects){
				var bbox = entry.element.getBoundingClientRect();
				if(point_in_bbox(tracker.x,tracker.y,bbox)){
					if(gazeObject.tickInteraction(tracker.id,true,elapsedTime) == tickEnum.FULL){
						if(gazeObject.lock(tracker.id)){
							gazeObject.listeners.get("enter")(tracker);
						}
					}
				}else{
					if(gazeObject.tickInteraction(tracker.id,false,elapsedTime) == tickEnum.EMPTY){
						if(gazeObject.release(tracker.id)){
							gazeObject.listeners.get("exit")(tracker);
						}
					}
				}
			}
		}
	}
}

/* check if a point is within a bounding box */
function point_in_bbox(px,py,bbox){
	return px > bbox.left && px < bbox.right &&
		py > bbox.top && py < bbox.bottom;
}
