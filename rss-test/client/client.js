Template.newsTemplate.helpers({
	newsItems: function () {
		return News.find().fetch();
	}
});
