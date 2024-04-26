const { Kafka } = require('kafkajs');
const WebSocket = require('ws');
const wss = require('./websocket');
const config = require('../common/config/default.json');

const kafka = new Kafka({
  brokers: [config.kafkaConnectionString]
});
const consumer = kafka.consumer({ groupId: 'chat-group' });

async function connectConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: config.kafkaTopic });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageValue = message.value.toString();
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageValue);
        }
      });
    },
  });
}

module.exports = { connectConsumer };
