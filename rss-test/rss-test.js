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
    var inputXML = Meteor.http.call("GET", inputURL)["content"];
    var outputJSON;
    xml2js.parseString(inputXML, function(err, res) {
      outputJSON = res.rss.channel[0];
    });
    return outputJSON; 
  }

  // Do necessary stuff to a single feed
  feedJSON = url2json("http://yle.fi/uutiset/rss/paauutiset.rss");
  for(var i in feedJSON.item) {
    var feedItem = feedJSON.item[i];
    News.insert({
      "title": feedItem.title
    });
  }

}
