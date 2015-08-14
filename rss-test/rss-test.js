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

  console.log(url2json("http://yle.fi/uutiset/rss/paauutiset.rss"));

  // Do necessary stuff to a single feed
  //feedJSON = url2json("http://yle.fi/uutiset/rss/paauutiset.rss");
  //for(var i in feedJSON.item) {
  //  var feedItem = feedJSON.item[i];
  //  News.insert({
  //    "title": feedItem.title
  //  });
  //}

}
