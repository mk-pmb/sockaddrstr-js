/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  function addressObjToPair(addr, pfx) {
    if ((addr && typeof addr) !== 'object') { return null; }
    var host = addr.address, fam, port;
    if ((!addr.remoteFamily) && (typeof host === 'function')) {
      addr = host.call(addr);
      host = addr.address;
    }
    fam = addr.family;
    port = addr.port;
    if ((!fam) && (!pfx)) { pfx = 'remote'; }
    if (pfx) {
      fam = addr[pfx + 'Family'];
      host = addr[pfx + 'Address'];
      port = addr[pfx + 'Port'];
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
  }



  return addressObjToPair;
}());
