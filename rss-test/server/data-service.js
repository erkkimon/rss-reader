function url2json(inputURL) {
	outputJSON = null;
	try {
		var inputXML = HTTP.get(inputURL);
		var encoding = inputXML["headers"]["content-type"];
		if(!/(UTF|utf)/g.test(encoding)) {
			console.log("Encoding is not UTF-8: " + encoding)
			inputXML = HTTP.getWithEncoding(inputURL, {
				"encoding": { "from": "iso-8859-1", "to": "iso-8859-1" }
			});
		}
		xml2js.parseString(inputXML["content"], function(err, res) {
			outputJSON = res.rss.channel[0];
		});
	} catch(e) {
		console.log("url2json() failed to fetch and jsonify url " + inputURL);
		console.log(e);
	}
	return outputJSON;
}

function processSingleFeed(url) {
	// Handle one feed, will be only one in an array
	feedJSON = url2json(url);
	// Loop through feed item's details
	for(var i in feedJSON.item) {
	
		// If link is not already added, let's add data related to it in MongoDB 
		var feedItem = feedJSON.item[i];
		var urlFreqCount = News.find({link: feedItem.link}).count();
		if(urlFreqCount === 0) {
			// Don't try to add image if it doesn't exist
			function image() {
				try {
					return feedItem.enclosure[0].$.url
				} catch(e) {
					return null
				}
			}
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

function processAllFeeds() {
	var allFeedURLs = [
		"http://www.iltalehti.fi/rss.xml",
		"http://yle.fi/uutiset/rss/paauutiset.rss"
	]
	
	for(i in allFeedURLs) {
		try {
			processSingleFeed(allFeedURLs[i])
		} catch(e) {
			console.log("Failed to insert data to MongoDB from feed url " + allFeedURLs[i]);
			console.log(e);
		}
	}
}

Meteor.startup(function() {
	Meteor.setInterval(function() {
		processAllFeeds()
	}, 15000)
});
