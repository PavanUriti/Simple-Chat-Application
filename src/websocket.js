const WebSocket = require('ws');
const server = require('./server');
const wss = new WebSocket.Server({ server });

module.exports = wss;
