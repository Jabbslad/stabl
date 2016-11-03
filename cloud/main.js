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

    console.log(JSON.stringify(req));

    query = new Parse.Query("PodcastItem");

    var max = 10;

    if (req.params.max) {
        max = req.params.max;
    }
    
    if (req.params.genres) {
        query.containedIn("genres", req.params.genres);
    }

    if (req.params.duration_max) {
        query.lessThanOrEqualTo("duration", req.params.duration_max);
    }

    if (req.params.duration_min) {
        query.greaterThanOrEqualTo("duration", req.params.duration_min);
    }

    if (req.params.pubDate) {
        query.greaterThanOrEqualTo("pubDate", new Date(req.params.pubDate));
    }

    console.log(JSON.stringify(query));

    query.find({
        success: function(results) {
            max = results.length > max ? max : results.length;
            shuffle(results);
            res.success(results.slice(0, max));
        },
        error: function(error) {
            res.error(error);
        }
    });
});
