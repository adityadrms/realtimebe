const { ConsumeDataDrilling } = require("../Kafka/drillingConsumer");
const DrillingFormation = require('../service/drillingactivitymapping.service'); 
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081, path: '/drillingformation' });

const startKafkaConsumerAndProcessData = () => {
  const processDrillingData = async (data) => {
    try {
      const wellId = data.wellId;
      const result = await DrillingFormation.checkConditions(data, wellId);

      if (result) {
        const notification = {
          title: "Condition Detected",
          message: `Condition '${result}' successfully detected.`, 
          wellId,
          conditionMet: result,
          data,
        };

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(notification));
          }
        });
      } else {
        console.log("No condition met for this data.");
      }
    } catch (error) {
      console.error("Error processing drilling data:", error.message);
    }
  };

  ConsumeDataDrilling(processDrillingData);
};

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected.');
  ws.on('close', () => {
    console.log('WebSocket client disconnected.');
  });
});

module.exports = { startKafkaConsumerAndProcessData };
