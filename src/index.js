const server = require('./server');
const wss = require('./websocket');
const { connectProducer, sendMessage } = require('./kafkaProducer');
const { connectConsumer } = require('./kafkaConsumer');
const config = require('../common/config/default.json');

async function startServer() {
    try {
        await connectProducer();
        await connectConsumer();
    
        wss.on('connection', (ws) => {
          ws.on('message', async (message) => {
            await sendMessage(config.kafkaTopic, message);
          });
        });

        server.listen(3000, () => {
            console.log('Server started on port 3000');
        });
      } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer()
