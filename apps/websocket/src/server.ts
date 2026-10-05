import { WebSocketServer } from 'ws';
import { env } from './configs/env';
import logger from './configs/logger';
import http from 'http';
const server = http.createServer();
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    logger.info('upgrading');
    wss.emit('connection', ws);
  });
});

wss.on('connection', (ws) => {
  ws.on('open', () => {
    ws.send('hello ws1');
  });
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      client.send(data.toString());
    });
  });
});

server.listen(env.port, () => {
  logger.info(`WebSocket server started on port ${env.port}`);
});
