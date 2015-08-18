Template.newsTemplate.helpers({
	newsItems: function () {
		return News.find({}, {sort: {timestamp: -1}});
	}
});
