NewsHour-Quiz
=========

# Making the quiz

	<script src="js/head.min.js"></script>
	<script>
		head.load("js/jquery-1.9.1.min.js",
			"js/handlebars-v1.3.0.js",
			"js/responses.js",
			"js/templates.js",
			"js/script.js",
			"css/style.css", function() {
				quiz.init("YOUR-QUIZ.json");
			}
		);
	</script>
	<div id="quiz-container" class="cf"></div>

[By Frank Bi](http://twitter.com/frankiebi)
