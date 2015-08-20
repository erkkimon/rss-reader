News = new Mongo.Collection("news");
//News.initEasySearch(["title", "description"]);

EasySearch.createSearchIndex("news", {
	"collection": News,
	"field": ["title", "description"],
	"limit": 100,
	"query" : function (searchString, opts) {
		console.log(searchString.length);
		if(searchString.length == 0) {
			searchString = { '$regex' : '.*' + searchString + '.*', '$options' : 'i' };
		}
		var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
		return query;
	},
	"sort": function() {
		return { "timestamp": -1 }
	}
});
