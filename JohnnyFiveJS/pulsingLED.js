var five = require("johnny-five");
// Default board initialization (set here as example)
// var board = new five.Board();
// test

var board = new five.Board({
  port: "COM3"
});

board.on("ready", function() {
  var led = new five.Led(11);

  led.pulse({
    easing: "linear",
    duration: 3000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop: function() {
      console.log("Animation stopped");
    }
  });

  // Stop and turn off the led pulse loop after
  // 12 seconds (shown in ms)
  this.wait(12000, function() {
    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
  });

});
