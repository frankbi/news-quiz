var quiz = {

	questions: [],

	init: function(json) {
		quiz.getQuestions(json);
	},

	getQuestions: function(file) {
		$.getJSON(file, quiz.processQuestions);
	},

	processQuestions: function(obj) {
		for (var i = 0; i < obj.ques.length; i++) {
			quiz.questions[i] = {
				"prompt": obj.ques[i].prompt,
				"blurb": obj.ques[i].blurb,
				"ans": obj.ques[i].ans,
				"img": obj.ques[i].img,
				"a": obj.ques[i].a,
				"b": obj.ques[i].b,
				"c": obj.ques[i].c,
				"d": obj.ques[i].d
			}
		}
	}

	


}
