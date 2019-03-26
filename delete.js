
var mqttStress = require("mqtt-stress");
let data = {
  applicationID: "156",
  applicationName: "Marine_IoT",
  deviceName: "Device_2",
  devEUI: "2222222222222222",
  rxInfo: [
    {
      gatewayID: "2222222222222222",
      name: "Gateway_1",
      time: `${new Date()}`,
      rssi: 3,
      loRaSNR: 0.8193636,
      location: { latitude: 10.248639, longitude: 10.248639, altitude: 0 }
    }
  ],
  txInfo: { frequency: 0, dr: 4 },
  adr: false,
  fCnt: 0,
  fPort: 1,
  data: "BGYAA2cKAAGIAaKx9pYIAANi",
  object: {
    humiditySensor: { "1": 30 },
    accelerometerSensor: { "1": 25.67 },
    temperatureSensor: { "3": 28.85 },
    gpsLocation: {
      "1": {
        latitude: "12.088338683329036",
        longitude: "-61.83998107910156",
        altitude: 8.66
      }
    }
  },
  vessel_id: 3,
  device_id: 2
};
data = Buffer.from(JSON.stringify(data));
var result = mqttStress.stress(
  "mqtt:broker.mqttdashboard.com",
  "application/156/device/2222222222222222/rx",
  `message`,
  { qos: 0, maxThroughput: 1000000 }
);

result.events.on("throughput", throughput => {
  console.info(`Throughput: ${throughput}`);
});

result.events.on("error", err => {
  console.error(`Error: ${err}`);
});

setTimeout(() => {
  result
    .stop()
    .then(() => {
      console.info("Stopped successfully!");
    })
    .catch(err => {
      console.error(`Error while stopping: ${err}`);
    });
}, 1000);
