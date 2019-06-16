var five = require("johnny-five")
var board = new five.Board({
  port: "COM3"
})

const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: "c46bc8e827709b0780e975700e0699851521a2a4"
})
const scroll = require('lcd-scrolling')



function getDataFromRepoOrg() {
octokit.repos.listForOrg({
  org: 'eversport',
  type: 'private'
}).then(({ data }) => {
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

async function getALlPrs() {
  const ret = octokit.pulls.list({
    owner: "eversport",
    repo: "eversports",
    state: "open",
    per_page: "100"
  })
  return ret.then((data) => {
    return data.data.length
  })
}





board.on("ready", async function() {

  var lcd = new five.LCD({
    controller: "PCF8574T"
  })
  setInterval( async function() {
  DisplayPRNumber(lcd)
  }, 5000)

// scroll.line( 0, "Text of the first line" );
// scroll.line( 1, "Second line here" );
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



async function DisplayPRNumber(lcd) {
  const prs = await getALlPrs()
  lcd.cursor(0,0).print('NUMBER OF PRS:')
  lcd.cursor(1,0).print(prs)
}


function DisplayNotifications() {
  scroll.setup({
    lcd: lcd, /* Required */
    
    // Optional parameters defaults
    // debug: false, - true will enable console.log()
    char_length: 16, // - Number of characters per line on your LCD
    row: 2,// - Number of rows on your LCD
    firstCharPauseDuration: 4000,// - Duration of the pause before your text start scrolling. Value in ms
    lastCharPauseDuration: 2000,// - Duration to wait before restarting the animation
    scrollingDuration: 1000,// - Time per step (speed of the animation).
    full: true //- Extend text with white space to be animated out of the screen completely
  
  });

  var led = new five.Led(11);
  
  setInterval( async function() {
    const notifications = await getAllNotifications()
    led.fadeOut()
    console.log('NOTIFICATION: ', notifications)
    console.log('NOTIFICATION SUBJ: ', notifications[0].subject.title)
    if (notifications.length > 0) {
      led.fadeIn()
      // setTimeout(() => {
      //   lcd.cursor(0,0).print("NOTIFICATION:")
      //   lcd.clear()
      // }, 2000)
      // lcd.noBlink().cursor(0, 0).print("Subject:")
      // scroll.line(0, "Subject:")
      scroll.line(0, notifications[0].subject.title)
      // lcd.autoscroll().cursor(1,0).print(notifications[0].subject.title)
   } else {
     led.off()
     lcd.cursor(0,0).print("No Notification")
   }
 }, 5000);

}