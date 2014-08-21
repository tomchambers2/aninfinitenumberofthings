function Things() {
	this.generateThings = function(numberOfThings) {
		partsFirst = ['Meet','Go diving with','Visit'];
		partsSecond = ['dolphins','a monkey'];
		partsThird = ['while high on cocaine','in Acapulco'];

		function randomThing(array) {
			var pick = Math.floor(Math.random() * array.length);
			return array[pick];
		};
		return randomThing(partsFirst) + ' ' + randomThing(partsSecond) + ' ' + randomThing(partsThird);
	};

	this.addToThings = function(newThing) {
		var id = thingModel.length + 1;
		var obj = {
			id: id,
			thing: newThing,
			done: ko.observable(false)
		}
		thingModel.push(obj);
	};
};

function Markov(titles) {
	//markov algorithm credit: Jason Bury @ Soliant Consulting - http://www.soliantconsulting.com/blog/2013/02/draft-title-generator-using-markov-chains
	var terminals = {};
	var startwords = [];
	var wordstats = {};

	var init = function(titles) {
		for (var i = 0;i<titles.length;i++) {
			var words = titles[i].split(' ');
			terminals[words[words.length-1]] = true;
			startwords.push(words[0]);
			for (var j = 0;j < words.length - 1;j++) {
				if (wordstats.hasOwnProperty(words[j])) {
					wordstats[words[j]].push(words[j+1]);
				} else {
					wordstats[words[j]] = [words[j+1]];
				}
			}
		}	
	}

	var choice = function (a) {
		var i = Math.floor(a.length * Math.random());
		return a[i];
	}

	this.make_title = function(min_length) {
		word = choice(startwords);
		var title = [word];
		while (wordstats.hasOwnProperty(word)) {
			var next_words = wordstats[word];
			word = choice(next_words);
			title.push(word);
			if (title.length > min_length && terminals.hasOwnProperty(word)) break;
		}
		if (title.length < min_length) return this.make_title(min_length);
		return title.join(' ');
	}

	init(titles);
}

var things = new Things();
var scrolled = false;

var menu_point = $('.things-done').offset().top;
var menu_width = $('.things-done').outerWidth();
$(window).resize(function() {
	var menu_point = $('.things-done').offset().top;
	var menu_width = $('.things-done').innerWidth();
});

$(document).scroll(function() {
	if (!scrolled) {
		$('.down').fadeOut('slow');
		scrolled=true;
	}

	if ($(window).width()>991) {
		if ($(window).height() < $('.things-done').height()) {
			$('.things-done').css('bottom','0');
		}
		if ($(window).height() > ($('.things-done').height() + 11)) {
			$('.things-done').css('bottom','auto');
		}

		if ($(window).scrollTop() > menu_point) {
			$('.things-done').addClass('floating');
			$('.things-done').css('width',menu_width);
			$('.polaroids').css('marginTop',$('.things-done').innerHeight() + 60)
		}
		if ($(window).scrollTop() < menu_point) {
			$('.things-done').removeClass('floating');
			$('.polaroids').css('marginTop',0)
		}
	}
});

$.get('scripts/things.txt', function(data) {
	var titles = data.split("\n");
	var generator = new Markov(titles);
	$(document).scroll(function() {
		if ($('.skull').visible()) {
			for (var i = 0;i<15;i+=1) {
				things.addToThings(generator.make_title(3));
			}
		}

		if (!scrolled) {
			$('.down').fadeOut('slow');
			scrolled=true;
		}
		if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
			for (var i = 0;i<15;i+=1) {
				things.addToThings(generator.make_title(3));
			}
		};
	});
});