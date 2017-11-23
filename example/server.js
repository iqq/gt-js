const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const app_root = __dirname;
console.log(app_root)

app.use(require('express').static(app_root));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('eye pos', function(msg){
    socket.broadcast.emit('eye pos',msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
