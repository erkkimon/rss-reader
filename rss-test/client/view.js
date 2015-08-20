Template.newsTemplate.helpers({
	//newsItems: function () {
	//	var searchQuery = Session.get("search-query");
	//	var searchQuery = Template.instance().searchQuery.get();
	//	searchQuery = searchQuery.toString();
	//	if(!searchQuery) {
	//		searchQuery = "";
	//	}
	//	var conditionArray = searchQuery.match(/\S+/g);
	//	var conditionRegex = "^";
	//	for(i in conditionArray) {
	//		conditionRegex = conditionRegex + "(?=.*\\b" + conditionArray[i] + "\\b)"
	//	}
	//	conditionRegex = conditionRegex + ".+";
	//	if(!conditionArray) {
	//		conditionRegex = "*";
	//	}
	//	console.log(conditionRegex);
	//	return News.find({}, {title: { $regex: conditionRegex, $options: 'i' }});
	//	return News.find({});
	//}
});

//Template.newsTemplate.events({
//	"keyup input.search": function(evt, template) {
//		//Session.set("search-query", evt.currentTarget.value);
//		template.searchQuery.set(evt.currentTarget.value);
//	}
//});
