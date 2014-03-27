var quiz = {

	// Keeps track of which question we're on
	counter: 0,

	// Keeps track of quiz state, so things don't break
	state: 0,

	// Browser store of questions from json
	questions: [],

	// Init function, called from embed page
	init: function(json) {
		quiz.initFont();
		quiz.getQuestions(json);
	},

	// Load font from Google, matched in CSS
	initFont: function() {
		WebFontConfig = {
			google: { families: [ 'Carrois+Gothic+SC::latin' ] }
		};
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
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

				// Passes the total number of questions to the template
				quiz.questions[quiz.counter].num_q = num_questions;

				// Passes the current numbered question to the template
				quiz.questions[quiz.counter].num_c = quiz.counter + 1;
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
			var status;
			var correct_ans = quiz.questions[quiz.counter].ans;
			if (selected === correct_ans) {
				quiz.correct(correct_ans);
				status = true;
				total_score++;
			} else {
				status = false;
				quiz.incorrect(correct_ans, selected);
			}
			quiz.appendPostQuestion(status);
			quiz.nextQuestion();
			quiz.state = 1;
		}

	},

	// Called after checkAnswer() to include blurb and button to next question
	appendPostQuestion: function(status) {
		$(".blurb-container").html(function() {
			var blurb_text = quiz.questions[quiz.counter].blurb;
			if (status) {
				blurb_text = "<span class='correct'>Correct!</span> " + blurb_text;
			} else {
				blurb_text = "<span class='incorrect'>Incorrect.</span> " + blurb_text;
			}
			return blurb_text;
		});
		$(".next-container").html("<button class='next-q'>NEXT</button>");
	},

	// Triggered when the next button is clicked
	nextQuestion: function() {
		$(".next-q").click(function() {
			quiz.counter++;
			quiz.state = 0;
			quiz.displayQuestion();
		});
	},

	// Set correct and selected to green
	correct: function(el_cor) {
		$("." + el_cor).css("background-color","rgba(14,204,52,0.6)");
	},

	// Set selected div to red, and correct to green
	incorrect: function(el_cor, el_incor) {
		$("." + el_cor).css("background-color","rgba(14,204,52,0.6)");
		$("." + el_incor).css("background-color","rgba(224,16,75,0.6)");
	}

}
