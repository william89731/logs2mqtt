//require('events').EventEmitter.defaultMaxListeners = 20;
require('dotenv').config();
const mqtt = require('mqtt');
const { exec } = require("child_process");
const host = process.env.HOST
const port = process.env.PORT
const clientId = `logs2mqtt_${Math.random().toString(8).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  //clean: true,
  //connectTimeout: 4000,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  reconnectPeriod: 5000,
});
const topic = 'logs2mqtt/ipFail';

client.on('connect', () => {
  console.log('Connected to mqtt broker')
});

client.on("error", function (error) {
  console.log("Error occurred: " + error);
  process.kill(process.pid, 'SIGTERM');
});

try {
function Command() {
  console.log("start check authentication failure")
  let TIME = process.env.TIME;
  exec(`awk -v d1="$(date --date="${TIME}" "+%b %_d %H:%M")" \
            -v d2="$(date "+%b %_d %H:%M")" '$0 > d1 && $0 < d2 ||
            $0 ~ d2' /var/log/auth.log | egrep "Failed password" | awk 'END{ print $11 }' | cut  -d"=" -f 2`, (error, stdout, stderr) => {

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    if (stdout.length > 10) {
       let Warn = ` ${stdout}`  ;
       client.publish(topic, stdout, { qos: 0, retain: false }, (error) => {
        console.log("found ip: " + stdout)
        if (error) {
          console.error(error)
        }
      })
    } else {
      console.log("no ip found")
    }
  })
 }
 setTimeout(Command, 10 * 1000);
} catch (e) {
  console.error(e);
};

function Delay() {
  console.log("done!")
  process.exit();
}
setTimeout(Delay, 20 * 1000);

