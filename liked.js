var Pinger = require("./pinger");

var ids = process.argv.slice(2);

if (ids < 1) {
  console.log("Usage: ");
  console.log("  liked.js PAGE_ID_1 PAGE_ID_2 [...]");
  process.exit(1);
}

new Pinger(ids, 10000).start()

