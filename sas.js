/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, usc = '_';


  function isStr(x, no) { return (((typeof x) === 'string') || no); }
  function ifObj(x, d) { return ((x && typeof x) === 'object' ? x : d); }
  function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }

  EX = function addressObjToPair(sock, pfx) {
    if (!ifObj(sock)) { return null; }
    if (!isStr(pfx)) {
      if (isStr(sock.remoteAddress) || sock.remoteFamily) { pfx = 'remote'; }
    }
    var addr = EX.determineAddr(sock, pfx), hnd, fam, port, host;
    if (ifFun(addr)) {
      addr = (addr.call(sock) || addr);
      port = sock[usc + 'pipeName'];
      if (port) { return '|' + port; }
    }
    hnd = addr[usc + 'handle'];
    fam = addr.family;
    port = addr.port;
    host = addr.address;
    if (!(fam || pfx)) { pfx = 'remote'; }
    if (pfx) {
      fam = addr[pfx + 'Family'];
      host = addr[pfx + 'Address'];
      port = addr[pfx + 'Port'];
    }
    host = ((isStr(host) && host) || 'unknown.invalid');
    if (!(hnd || fam)) {
      console.trace(addr);
      return 'unconnected.invalid';
    }
    switch (fam) {
    case 'IPv4':
    case 'IPv6':
      if (host.indexOf(':') >= 0) { host = '[' + host + ']'; }
      break;
    default:
      host += '.' + fam;
      break;
    }
    return (host + ':' + port);
  };


  EX.toString = function () {
    return (this === EX ? '[function addressObjToPair]' : EX(this));
  };


  EX.determineAddr = function (sock, pfx) {
    var addr = (pfx ? sock[pfx + 'Address'] : sock.address);
    if (!addr) { return sock; }
    if (ifObj(addr) || ifFun(addr)) { return addr; }
    return sock;
  };


  return EX;
}());
