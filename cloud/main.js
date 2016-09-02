Parse.Cloud.define('hello', function(req, res) {
  res.success('hello world');
});
Parse.Cloud.define('random', function(req, res) {
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
