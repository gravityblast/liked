var http    = require("http"),
    Request = require("./request"),
    spawn   = require('child_process').spawn;

function Pinger(ids, delay) {
  this.data  = {}
  this.ids   = ids;
  this.delay = delay;
  this.index = -1;
};

Pinger.prototype.start = function() {
  this.ids.forEach(function(id) {
    this.check(id, this.checkHandler);
  }.bind(this));
};

Pinger.prototype.checkHandler = function(id, data) {
  console.log(id, data)
  if (data) {
    this.saveData(data);
  }

  setTimeout(function() {
    this.check(id);
  }.bind(this), this.delay);
}

Pinger.prototype.saveData = function(data) {
  var id = data.id.toString();
  var currentData   = this.data[id];
  var currentLikes  = currentData ? currentData.likes : 0;
  if (data.likes > currentLikes) {
    var count = data.likes - currentLikes;
    console.log(count + " new likes for " + data.name);
    spawn("growlnotify", ["-t", data.name, "-m", count + " new likes"]);
  } else {
    console.log("No changes for " + data.name);
  }

  this.data[id] = data;
};

Pinger.prototype.check = function(id, callback) {
  console.log("checking " + id)
  new Request(id, this.checkHandler.bind(this));
};

module.exports = Pinger;
