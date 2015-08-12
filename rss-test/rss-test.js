News = new Mongo.Collection("news");

if (Meteor.isClient) {

  Template.namesTemplate.helpers({
    names: function () {
      return News.find().fetch();
    }
  });

}

if (Meteor.isServer) {
  //News.insert({name: websiteData.lang});
var rssSources = ['http://news.yandex.ru/auto.rss', "http://yle.fi/uutiset/rss/paauutiset.rss"];
parsedRss = [];
var rssContent = "";
for (var i = 0; i < rssSources.length; i++) {
  var result = Meteor.http.call("GET", rssSources[i]);
  if(result.statusCode == '200' && result.content){
     rssContent += result.content;
  }
}
console.log(rssContent);
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
