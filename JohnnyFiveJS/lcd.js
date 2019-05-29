var five = require("johnny-five")
var board = new five.Board({
  port: "COM3"
})

const Octokit = require('@octokit/rest')
const octokit = new Octokit()


board.on("ready", function() {
  var i = 0
  var lcd = new five.LCD({
    controller: "PCF8574T"
  })
  lcd.useChar("check")
  lcd.useChar("heart")
  lcd.useChar("duck")
  lcd.useChar("box1")
  lcd.useChar("box2")
  lcd.useChar("box4")
  lcd.useChar("box14")

  // lcd.cursor(1, 0).print("Bloop")
  // lcd.home().print("Bleep")
  // lcd.cursor(0, 0).print("Initializing...")
  // lcd.clear()
  // lcd.cursor(4, 0).print("I :check::heart: 2 :duck: :)")
  // lcd.autoscroll().print("Bloop").print("Bleep");
// The starting position of the LCD display
lcd.cursor(0, 0).print(":box14:");

// The second line, first character of the LCD display
lcd.cursor(1, 1).print(":box14:");


  // setInterval(() => {
  //   lcd.clear()
  //   lcd.noBacklight()
  //   lcd.print("Hello :heart:")
   
  //   i++
  //   lcd.backlight()
  // }, 1500)
})