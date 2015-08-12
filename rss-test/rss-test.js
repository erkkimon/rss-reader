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
  //      console.log(result['data']);
  //    })
  //  }
  //}
  var xml = "<config><test>Hello</test><data>SomeData</data></config>";
  
  function eatXMLvomitJSON(inputXML) {
    var outputJSON;
    xml2js.parseString(inputXML, function(err, res) {
      outputJSON = res;
    });
    return outputJSON; 
  }

  console.log(eatXMLvomitJSON(xml));

  var extractedData = "";
  xml2js.parseString(xml, function(err,result){
    //Extract the value from the data element
    extractedData = result['config']['data'];
    console.log(extractedData);
  });
}
