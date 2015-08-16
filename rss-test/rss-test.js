News = new Mongo.Collection("news");

if (Meteor.isClient) {

  Template.newsTemplate.helpers({
    newsItems: function () {
      return News.find().fetch();
    }
  });

}

if (Meteor.isServer) {

  function url2json(inputURL) {
    outputJSON = null;
    try {
      var inputXML = HTTP.get(inputURL);
      xml2js.parseString(inputXML["content"], function(err, res) {
        outputJSON = res.rss.channel[0];
      });
    } catch(e) {
      console.log("url2json() failed to fetch and jsonify url " + inputURL);
    }
    return outputJSON;
  }

	var allFeedURLs = ["http://yle.fi/uutiset/rss/paauutiset.rss", "http://www.iltalehti.fi/rss.xml"]
	for(n in allFeedURLs) {

		// Handle one feed, will be only one in an array
  	feedJSON = url2json(allFeedURLs[n]);

		// Loop through feed item's details
  	for(var i in feedJSON.item) {

			// If link is not already added, let's add data related to it in MongoDB 
  	  var feedItem = feedJSON.item[i];
			var urlFreqCount = News.find({link: feedItem.link}).count();
			if(urlFreqCount === 0) {
				// Don't try to add image if it doesn't exist
  	  	function image() { try { return feedItem.enclosure[0].$.url } catch(e) { return null } }
  	  	News.insert({
  	  	  "title": feedItem.title,
  	  	  "link": feedItem.link,
  	  	  "description": feedItem.description,
  	  	  "timestamp": Date.parse(feedItem.pubDate)/1000,
  	  	  "categories": feedItem.category,
  	  	  "image": image() 
  	  	});
				console.log("URL was not yet in News collection: " + feedItem.link);
			} else {
				console.log("URL already in News collection: " + feedItem.link);
			}
  	}
	}
}
