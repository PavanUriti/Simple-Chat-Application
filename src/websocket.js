const WebSocket = require('ws');
const server = require('./server');
const { sendMessage } = require('./kafkaProducer');
const config = require('../common/config/default.json');

const wss = new WebSocket.Server({ server });
const activeConnections = new Set();

function handleWebSocket() {
    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
      activeConnections.add(ws);
  
      ws.on('message', async (message) => {
        await sendMessage(config.kafkaTopic, message);
      });
  
      ws.on('close', () => {
        console.log('WebSocket client disconnected');
        activeConnections.delete(ws); 
      });
    });
  }
  
  module.exports = {handleWebSocket, activeConnections  };
