require('func.js');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Jamie');
});
