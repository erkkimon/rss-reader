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


  feedJSON = url2json("http://yle.fi/uutiset/rss/paauutiset.rss");
  for(var i in feedJSON.item) {
    var feedItem = feedJSON.item[i];
    function image() { try { return feedItem.enclosure[0].$.url } catch(e) { return null } }
    News.insert({
      "title": feedItem.title,
      "link": feedItem.link,
      "description": feedItem.description,
      "timestamp": Date.parse(feedItem.pubDate)/1000,
      "categories": feedItem.category,
      //"image": function() { try { return feedItem.enclosure[0].$.url } catch(e) { return "0" } }
      "image": image() 
    });
  }
  //console.log(feedJSON.item[0].enclosure[0].$.url);

}
