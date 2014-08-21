/*
var titles = [
	'Kill a man in Reno',
	'Kill a ten man in Reno',
	'Jump on a frog for a laugh',
	'Laugh on a spaniard',
	'rolly polly rah'
];
*/

$.get('scripts/things.txt', function(data) {
	var titles = data.split("\n");
});