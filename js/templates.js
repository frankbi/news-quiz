(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['end-screen'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cf ques-container\">\n	<div class=\"cf response-container\">\n	</div>\n	<div class=\"cf score-container\">\n		<div class=\"cf score-slate\">\n			<div class=\"your-score score-num\">\n				<h2>";
  if (helper = helpers.your_score) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.your_score); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " / ";
  if (helper = helpers.ques) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ques); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n			</div>\n			<div class=\"score-label\">\n				<h2>Your Score</h2>\n			</div>\n		</div>\n	</div>\n	<div class=\"cf share-container\">\n		<div class=\"share-border\" style=\"margin-right:5px;\"></div>\n		<p>Share On</p>\n		<img class=\"share facebook-share\" src=\"img/share/facebook.png\">\n		<img class=\"share twitter-share\" src=\"img/share/twitter.png\">\n		<div class=\"share-border\" style=\"margin-left:5px;\"></div>\n	</div>\n	<div class=\"cf play-again-container\">\n		<button onclick='location.reload()'>Play Again</button>\n	<div>\n</div>\n";
  return buffer;
  });
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['question-prompt'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"cf ques-container\">\n	<div class=\"ques-num\">Question ";
  if (helper = helpers.num_c) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.num_c); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " of ";
  if (helper = helpers.num_q) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.num_q); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n	<img class=\"prompt-photo\" src=\"";
  if (helper = helpers.img) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.img); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	<div class=\"prompt\"><p>";
  if (helper = helpers.prompt) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.prompt); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p></div>\n	<div class=\"selection a\"><p>";
  if (helper = helpers.a) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.a); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p></div>\n	<div class=\"selection b\"><p>";
  if (helper = helpers.b) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.b); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p></div>\n	<div class=\"selection c\"><p>";
  if (helper = helpers.c) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.c); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p></div>\n	<div class=\"selection d\"><p>";
  if (helper = helpers.d) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.d); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p></div>\n	<div class=\"blurb-container\"></div>\n	<div class=\"next-container\"></div>\n</div>\n";
  return buffer;
  });
})();