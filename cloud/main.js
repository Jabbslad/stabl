Parse.Cloud.define('ping', function(req, res) {
  res.success('pong!');
});
Parse.Cloud.define('random', function(req, res) {

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    console.log(req.params.toJSON())

    query = new Parse.Query("PodcastItem");
    
    if (req.params.genres) {
        query.containedIn("genres", req.params.genres);
    }

    if (req.params.duration) {
        query.lessThanOrEqualTo("enclosure.duration", req.params.duration);
    }

    query.find({
        success: function(results) {
            var max = results.length > 10 ? 10 : results.length;
            shuffle(results);
            res.success(results.slice(0, max));
        },
        error: function(error) {
            res.error(error);
        }
    });
});
