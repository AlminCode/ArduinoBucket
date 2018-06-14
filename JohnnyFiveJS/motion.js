var five = require("johnny-five");
var board = new five.Board({
  port: "COM3"
});

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  var motion = new five.Motion(7);
  var led1 = new five.Led(11);
  var led2 = new five.Led(12);
  var led3 = new five.Led(13);
  led1.on();
  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
    led1.off();
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    led2.on();
    led3.off();
    console.log("motionstart");
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    led2.off();
    console.log("motionend");
    led3.on();
  });

  // "data" events are fired at the interval set in opts.freq
  // or every 25ms. Uncomment the following to see all
  // motion detection readings.
  // motion.on("data", function(data) {
  //   console.log(data);
  // });
});