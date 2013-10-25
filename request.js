var http = require("http");

function Request(pageId, callback) {
  this.data   = "";
  this.pageId = pageId;
  this.callback = callback;
  this.performRequest();
};

Request.prototype.performRequest = function() {
  var url = "http://graph.facebook.com/" + this.pageId;
  this.request = http.get(url, this.responseHandler.bind(this));
  this.request.on("error", this.errorHandler.bind(this));
};

Request.prototype.errorHandler = function(error) {
  console.log("Error: " + error);
  this.callback(this.pageId);
};

Request.prototype.responseHandler = function(response) {
  response.on("data", this.dataHandler.bind(this));
  response.on("end",  this.endHandler.bind(this));
};

Request.prototype.dataHandler = function(chunk) {
  this.data += chunk.toString();
};

Request.prototype.endHandler = function() {
  var jsonData = JSON.parse(this.data);
  var data = null;
  if (jsonData.id != undefined) {
    data = {
      id:     jsonData.id,
      name:   jsonData.name,
      likes:  jsonData.likes
    }
  }
  this.callback(this.pageId, data);
};

module.exports = Request;
