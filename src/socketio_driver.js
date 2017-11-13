/* socketio based driver for retrieving tracker data incoming
 * over websocket. Requires SocketIO to be included
 */

export default class SocketIODriver{
  constructor(){
    this.updateFunc = undefined;
    this.gazeTracker = undefined;
  }

  onUpdate(callback){
    this.updateFunc = callback;
    var parent = this;

    var socket = io();
    socket.on('eye pos',function(msg){
      var eyex = msg[0] * screen.width,
        eyey = msg[1] * screen.height,
        tracker = Number(msg[2]);
      var px = eyex - (screen.width - document.documentElement.clientWidth),
        py = Math.abs(eyey - (screen.height - document.documentElement.clientHeight));

        parent.gazeTracker.updateGaze(parent.gazeTracker.createGazeEvent(tracker,px,py));
    });
  }

  setGazeTracker(gazeTracker){
    this.gazeTracker = gazeTracker;
  }
}
