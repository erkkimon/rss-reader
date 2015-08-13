News = new Mongo.Collection("news");

if (Meteor.isClient) {

  Template.namesTemplate.helpers({
    names: function () {
      return News.find().fetch();
    }
  });

}

if (Meteor.isServer) {

  //var rssSources = ['http://news.yandex.ru/auto.rss', "http://yle.fi/uutiset/rss/paauutiset.rss"];
  //for (var i = 0; i < rssSources.length; i++) {
  //  var resultJSON;
  //  var resultXML = Meteor.http.call("GET", rssSources[i]);
  //  if(resultXML.statusCode == '200' && resultXML.content) {
  //    //console.log(resultXML.content);
  //    resultJSON = xml2js.parseString(resultXML, function(err, result) {
  //      console.log(result);
  //    })
  //  }
  //}

  

  //var xml = "<config><test>Hello</test><data>SomeData</data></config>";
  

  function url2json(inputURL) {
    var inputXML = Meteor.http.call("GET", inputURL)["content"];
    var outputJSON;
    xml2js.parseString(inputXML, function(err, res) {
      outputJSON = res.rss.channel;
    });
    return outputJSON; 
  }

  console.log(url2json("http://yle.fi/uutiset/rss/paauutiset.rss"));

  //console.log(rssFeedXML);
  //console.log(rssFeedXML.content);
  //console.log(eatXMLvomitJSON(rssFeedXML[0][1]));


  //var extractedData = "";
  //xml2js.parseString(xml, function(err,result){
  //  //Extract the value from the data element
  //  extractedData = result['config']['data'];
  //  console.log(extractedData);
  //});
}
