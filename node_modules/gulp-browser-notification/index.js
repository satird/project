'use strict';

var es = require('event-stream');

var ws;
var obj = {};

obj.notify = function() {
  var args = arguments;
  var title = '';
  var options = {};

  if (typeof args[0] !== 'function') {
    title = args[0];
    options = args[1] || {};
  }

  var glr = es.map(function(file, done) {
    var fnResult = {};

    if(ws) {
      if (typeof args[0] === 'function') {
        fnResult = args[0](file);
        title = fnResult.title;
        options = fnResult.options || {};
      }

      ws.send(JSON.stringify({title: title, options: options}));
    }

    done(null, file);
  });

  return glr;
};


var front = function(port) {
  var ws = new window.WebSocket('ws://localhost:' + port);

  Notification.requestPermission(function (permission) {
    if (permission === "granted") {
      ws.addEventListener('message', function(msg) {
        msg = JSON.parse(msg.data);
        new Notification(msg.title, msg.options);
      });
    }
  });
};

obj.connect = function(opts) {
  opts = opts || {};

  var port = opts.port || 35728;

  var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: port });

  wss.on('connection', function connection(_ws_) {
    ws = _ws_;
  });

  return require('connect-inject')({
    snippet: '<script>(' + front.toString() + ')(' + port + ')</script>'
  });
};

module.exports = obj;
