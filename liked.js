var os     = require("os"),
    Pinger = require("./pinger");

var ids = process.argv.slice(2);

if (ids < 1) {
  console.log("Usage: ");
  console.log("  liked.js PAGE_ID_1 PAGE_ID_2 [...]");
  console.log("or: ");
  console.log("  DELAY=5000 liked.js PAGE_ID_1 PAGE_ID_2 [...]");
  process.exit(1);
}

var delay = parseInt(process.env.DELAY)
if (!delay || delay == 0) {
  delay = 30000;
}

console.log("delay: " + delay);
new Pinger(ids, delay).start()

