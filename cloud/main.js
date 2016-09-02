Parse.Cloud.define('hello', function(req, res) {
  res.success('hello world');
});
Parse.Cloud.define('random', function(req, res) {
    query = new Parse.Query("PodcastItem");
    if (req.params.genres) {
        query.containedIn("genres", req.params.genres)
    }
    query.find({
        success: function(results) {
            res.success(results);
        },
        error: function(error) {
            res.error(error);
        }
    });
});
