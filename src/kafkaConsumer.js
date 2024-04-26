const {kafka} = require('../common/helpers/kafka');
const WebSocket = require('ws');
const { activeConnections } = require('./websocket');
const config = require('../common/config/default.json');


const consumer = kafka.consumer({ groupId: 'chat-group' });

async function connectConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: config.kafkaTopic });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageValue = message.value.toString();
      activeConnections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageValue);
        }
      });
    },
  });
}

module.exports = { connectConsumer };
