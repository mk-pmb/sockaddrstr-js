
<!--#echo json="package.json" key="name" underline="=" -->
sockaddrstr
===========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Guess an address string for a net.Socket or net.Server.
<!--/#echo -->


Usage
-----
see [test/usage.js](test/usage.js)

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="22" -->
```javascript
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

equal(String(stub), '[object Object]');
stub.toString = addrStr.toString;
equal(String(stub), '192.168.0.1:34567');
```
<!--/include-->





<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
