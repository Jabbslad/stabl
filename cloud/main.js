Parse.Cloud.define('hello', function(req, res) {
  res.success('hello world');
});
Parse.Cloud.define('random', function(req, res) {

    Array.prototype.randomElement = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    query = new Parse.Query("PodcastItem");

    query.find({
        success: function(results) {
            res.success(results);
        },
        error: function(error) {
            res.error(error);
        }
    });
});
