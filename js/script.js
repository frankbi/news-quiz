var quiz = {

	// Keeps track of which question we're on
	counter: 0,

	// Keeps track of quiz state, so things don't break
	state: 0,

	// Browser store of questions from json
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

		// Set to global window how many questions are in file
		window.num_questions = obj.ques.length;

		// Init global score variable
		window.total_score = 0;

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

	// DA LOOOOOP
	// Show one question at a time
	displayQuestion: function() {

		container = $("#quiz-container");

		var ques_template = Handlebars.compile($("#question-template").html());
		var end_template = Handlebars.compile($("#end-template").html());

		if (quiz.counter < num_questions) {
			if (quiz.state != 1) {
				container.html(ques_template(quiz.questions[quiz.counter]));
			}
		} else {
				container.html(end_template({
					"score": total_score
				}));
		}

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

		if (quiz.state != 1) {
			var correct_ans = quiz.questions[quiz.counter].ans;
			if (selected === correct_ans) {
				quiz.correct(correct_ans);
				total_score++;
			} else {
				quiz.incorrect(correct_ans, selected);
			}
			$(".ques-container").append("<button class='next-question'>NEXT QUESTION</button>");
			quiz.nextQuestion();
			quiz.state = 1;
		}

	},

	nextQuestion: function() {
		$(".next-question").click(function() {
			quiz.counter++;
			quiz.state = 0;
			quiz.displayQuestion();
		});
	},

	correct: function(el_cor) {
		$("." + el_cor).css("background-color","green");
	},

	incorrect: function(el_cor, el_incor) {
		$("." + el_cor).css("background-color","green");
		$("." + el_incor).css("background-color","red");
	}

}
