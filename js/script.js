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

		// Pertinent quiz information
		window.quiz_info = obj.info;

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

	// LOOP DEE DOOP
	// Show one question at a time
	displayQuestion: function() {

		container = $("#quiz-container");

		if (quiz.counter < num_questions) {
			if (quiz.state != 1) {

				// Passes the total number of questions to the template
				quiz.questions[quiz.counter].num_q = num_questions;

				// Passes the current numbered question to the template
				quiz.questions[quiz.counter].num_c = quiz.counter + 1;

				var num = quiz.questions[quiz.counter];

				container.html(Handlebars.templates['question-prompt'](num));

			}
		} else {

			quiz.postScores();
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
	},

	//
	postScores: function() {

		container.html(Handlebars.templates['end-screen']({
			"your_score": total_score,
			"ques": num_questions
		}));

		quiz.shareButtons();
		quiz.generateResponse();
	},

	// Returns a response based on score, pulls from JSON
	generateResponse: function() {

		var interval = num_questions / 3;
		var intv1 = interval;
		var intv2 = interval*2;
		var intv3 = interval*3;
		var text;

		if (total_score < intv1) {	
			var ran_num = Math.floor(Math.random()*responses.bad.length);
			text = "<h2>" + responses.bad[ran_num].d + "</h2>";
		} else if (total_score < intv2 && total_score > intv1) {
			var ran_num = Math.floor(Math.random()*responses.fair.length);
			text = "<h2>" + responses.fair[ran_num].d + "</h2>";
		} else if (total_score < intv3 && total_score > intv2) {
			var ran_num = Math.floor(Math.random()*responses.good.length);
			text = "<h2>" + responses.good[ran_num].d + "</h2>";
		} else if (total_score == num_questions) {
			var ran_num = Math.floor(Math.random()*responses.perfect.length);
			text = "<h2>" + responses.perfect[ran_num].d + "</h2>";
		}

		$(".response-container").html(text);

	},

	// Triggered when share button icons are clicked
	shareButtons: function() {
		$(".share").click(function(e) {

			var type = e.target.className;
			var short_url = quiz_info.shortUrl;
			var twitter_text = quiz_info.twitterText;

			var width  = 575,
				height = 400,
				left   = ($(window).width()  - width)  / 2,
				top    = ($(window).height() - height) / 2,
				opts   = 'status=1' +
					 ',width='  + width  +
					 ',height=' + height +
					 ',top='    + top    +
					 ',left='   + left;

			// Twitter window activate
			if (type.search('twitter') != -1) {

				// Calculate score as percent for tweet
				var perc_score = Math.round((total_score / num_questions)*100);
				var text = quiz_info.twitterTextPart1 + perc_score + quiz_info.twitterTextPart2;
				window.open("https://www.twitter.com/share?text=" + text + "&url=" + short_url, '_blank', opts);
			}

			// Facebook window activate
			if (type.search('facebook') != -1) {
				window.open("https://www.facebook.com/sharer/sharer.php?u=" + short_url, '_blank', opts);
			}

		});
	}

}
