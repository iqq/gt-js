/* mouse based driver for testing gt-js by spoofing tracker data as the
 * mouse pointer.
 */

/* implements the gt-js tracker driver interface.
 * defines a function onUpdate which declares a callback
 * from gt-js to perform when new tracker data comes in.
 * in this example/debug class that data comes from the mouse pointer
 */
export default class MouseDriver{
  constructor(id){
    this.updateFunc = this.updateGaze;
    this.mousePosition = new Object();
    this.id = id;
    this.gazeTracker = undefined;
  }

  updateGaze(gazeEvent,gazeTracker){
		var tracker = gazeTracker.trackerData.get(gazeEvent.id);
		if (tracker == undefined){
			tracker = gazeTracker.createGazeEvent(gazeEvent.id,0,0);
		}
		tracker.x = gazeEvent.x;
		tracker.y = gazeEvent.y;
		gazeTracker.trackerData.set(gazeEvent.id,tracker);
		gazeTracker.checkGaze();
	}

  /* callback has the form of func(object) where object
   * has at least 3 fields id, x, and y
   */
  onUpdate(callback){
    this.updateFunc = callback;
    var parent = this;

    /* specific to MouseDriver, function which gets the mouse pointer
     * position then calls the updateFunc
     */
    document.onmousemove = function(event){
      parent.mousePosition.x = event.clientX;
      parent.mousePosition.y = event.clientY;
    };
    setInterval(function(){
      var pos = parent.mousePosition;
      if(pos.x != undefined){
        var gazeEvent = new Object();
        gazeEvent.id = parent.id;
        gazeEvent.x = pos.x;
        gazeEvent.y = pos.y;
        parent.updateGaze(gazeEvent,parent.gazeTracker);
      }
    },33);
  }

  setGazeTracker(gazeTracker){
    this.gazeTracker = gazeTracker;
  }
}
