'use strict';

const net = require('net');

const { onRawRequest } = require('./raw');
require('dotenv').config();

const rawServer = net.createServer(onRawRequest);
const rawPort = process.env.RAW_PORT ? Number(process.env.RAW_PORT) : 9100;
rawServer.listen(rawPort, () =>
  console.log(`Raw socket server listening on port ${rawPort}`),
);
