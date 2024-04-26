const {kafka} = require('../common/helpers/kafka');

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
