var quiz = {

	// Keeps track of which question we're on
	counter: 0,

	// Local store of questions from json
	questions: [],

	// Init function, called from embed page
	init: function(json) {
		quiz.getQuestions(json);
	},

	// Gets question data, passes it to process
	getQuestions: function(file) {
		$.getJSON(file, quiz.processQuestions);
	},

	// Stores questions and choices in local array, questions[]
	processQuestions: function(obj) {

		// Loop through all questions, storing them locally
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

		// Show one question
		quiz.displayQuestion();

	},

	// Show one question at a time
	displayQuestion: function() {

		// var template = Handlebars.compile($("#question-template").html());
		// $("#quiz-container").html(template(quiz.questions[quiz.counter]));
		
		// Attached event handler
		// Also checks for correctness
		quiz.attachClick();

	},

	// Event handler
	attachClick: function() {
		$(".selection").click(function() {
			var selected = (this.className).replace("selection ","");
			quiz.checkAnswer(selected);
		});
	},

	// Called via event handler
	// Checks to see if selected answer is correct
	checkAnswer: function(selected) {
		// console.log(selected);
		// console.log(quiz.questions[quiz.counter].ans);

		var correct_ans = quiz.questions[quiz.counter].ans;

		if (selected == correc_ans) {
			console.log("CORRECT");
		} else {
			console.log("WRONG");
		}

	}

}
