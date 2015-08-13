News = new Mongo.Collection("news");

if (Meteor.isClient) {

  Template.namesTemplate.helpers({
    names: function () {
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

  feedJSON = url2json("http://yle.fi/uutiset/rss/paauutiset.rss");
  console.log(feedJSON.item[3]);

}
