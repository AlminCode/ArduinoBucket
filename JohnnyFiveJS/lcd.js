var five = require("johnny-five")
var board = new five.Board({
  port: "COM3"
})

const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: ""
})



function getDataFromRepoOrg() {
octokit.repos.listForOrg({
  org: 'eversport',
  type: 'private'
}).then(({ data }) => {
  // handle data
  console.log("DATA")
  console.log(data)
  return data
})
}

async function getAllNotifications() {
  const ret = octokit.activity.listNotifications({
    all: true
  })
  return ret.then((data) => {
    // console.log('DATA', data)
    return data.data
  })
}



board.on("ready", async function() {
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
 

  setInterval( async function() {
    const notifications = await getAllNotifications()
    var led = new five.Led(11);
    console.log('NOTIFICATION: ', notifications)
    if (notifications.length > 0) {
      led.fadeIn()
      lcd.cursor(0,0).print("NOTIFICATION")
   } else {
     led.off()
     lcd.cursor(0,0).print("No Notification")
   }
 }, 5000);
  
  // lcd.cursor(1, 0).print("Bloop")
  // lcd.home().print("Bleep")
  // lcd.cursor(0, 0).print("Initializing...")
  // lcd.clear()
  // lcd.cursor(4, 0).print("I :check::heart: 2 :duck: :)")
  // lcd.autoscroll().print("Bloop").print("Bleep");
// The starting position of the LCD display
// lcd.cursor(0, 0).print(":box14:");

// The second line, first character of the LCD display
// lcd.cursor(1, 1).print(":box14:");
})
