News = new Mongo.Collection("news");

if (Meteor.isClient) {

  Template.namesTemplate.helpers({
    names: function () {
      return News.find().fetch();
    }
  });

}

if (Meteor.isServer) {
  websiteData = Scrape.website("http://www.tiede.fi")
  News.insert({name: websiteData.lang});
  News.insert({name: "Erkki"});
  News.insert({name: "Mauno"});
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
