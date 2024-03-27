require('dotenv').config()
const mqtt = require('mqtt')
const { exec } = require('child_process')
const fs = require('fs')
const host = process.env.HOST
const port = process.env.PORT
const hostname = process.env.HOSTNAME
const clientId = `logs2mqtt_${Math.random().toString(8).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  // clean: true,
  // connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 5000
})
const topic = `logs2mqtt/${hostname}`

client.on('connect', () => {
  console.log('Connected to mqtt broker')
})

client.on('error', function (error) {
  console.log('Error occurred: ' + error)
  process.kill(process.pid, 'SIGTERM')
})

fs.watchFile(
  '/var/log/auth.log',
  {
    bigint: false,
    persistent: true,
    interval: 4000
  },
  (log) => {
    // value = fs.readFileSync('/var/log/auth.log', 'utf8')
    if (log) {
      console.log('start check authentication failure')
      exec(`awk -v d1="$(date --date="-1 min" "+%b %_d %H:%M")" \
            -v d2="$(date "+%b %_d %H:%M")" '$0 > d1 && $0 < d2 ||
            $0 ~ d2' /var/log/auth.log | egrep "Failed password" | awk 'END{ print $11 }' | cut  -d"=" -f 2`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }

        if (stdout.length > 10) {
          const Warn = ` ${stdout}`

          client.publish(topic, Warn, { qos: 0, retain: false }, (error) => {
            console.log('found ip: ' + stdout)
            if (error) {
              console.error(error)
            }
          })
        } else {
          console.log('no ip found')
        }
      })
    }
  })
