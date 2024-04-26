const { Kafka } = require('kafkajs');
const config = require('../common/config/default.json');

const kafka = new Kafka({
  brokers: [config.kafkaConnectionString]
});
const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
}

async function sendMessage(topic, message) {
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
}

module.exports = { connectProducer, sendMessage };
