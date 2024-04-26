const server = require('./server');
const { handleWebSocket } = require('./websocket');
const { connectProducer } = require('./kafkaProducer');
const { connectConsumer } = require('./kafkaConsumer');

async function startServer() {
    try {
        await connectProducer();
        await connectConsumer();
    
        handleWebSocket();

        server.listen(3000, () => {
            console.log('Server started on port 3000');
        });
      } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer()
