/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

(function readmeDemo() {
  //#u
  var addrStr = require('sockaddrstr'), equal = require('equal-pmb'), stub,
    serverAddr = { family: 'IPv4', address: '0.0.0.0', port: 8020 };

  function getServerAddr() { return serverAddr; }

  // guess from an object returned by net.Server#address()
  equal(addrStr(serverAddr), '0.0.0.0:8020');

  // guess from an object that has .address(), e.g. some net.Server
  stub = { address: getServerAddr };
  equal(addrStr(stub), '0.0.0.0:8020');

  // guess from a socket-like object
  stub = { address: getServerAddr, remoteFamily: 'IPv4',
    remoteAddress: '192.168.0.1', remotePort: 34567 };
  equal(addrStr(stub), '192.168.0.1:34567');
  //#r
}());










console.log("+OK usage tests passed.");   //= "+OK usage tests passed."
