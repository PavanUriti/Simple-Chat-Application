const { Kafka } = require('kafkajs');
const config = require('../config/default.json');

const kafka = new Kafka({
    brokers: [config.kafkaConnectionString]
});

module.exports = {kafka};