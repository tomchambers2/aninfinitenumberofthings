function Things(){this.generateThings=function(){function randomThing(array){var pick=Math.floor(Math.random()*array.length);return array[pick]}return partsFirst=["Meet","Go diving with","Visit"],partsSecond=["dolphins","a monkey"],partsThird=["while high on cocaine","in Acapulco"],randomThing(partsFirst)+" "+randomThing(partsSecond)+" "+randomThing(partsThird)},this.addToThings=function(newThing){var id=thingModel.length+1,obj={id:id,thing:newThing,done:ko.observable(!1)};thingModel.push(obj)}}function Markov(titles){var terminals={},startwords=[],wordstats={},init=function(titles){for(var i=0;i<titles.length;i++){var words=titles[i].split(" ");terminals[words[words.length-1]]=!0,startwords.push(words[0]);for(var j=0;j<words.length-1;j++)wordstats.hasOwnProperty(words[j])?wordstats[words[j]].push(words[j+1]):wordstats[words[j]]=[words[j+1]]}},choice=function(a){var i=Math.floor(a.length*Math.random());return a[i]};this.make_title=function(min_length){word=choice(startwords);for(var title=[word];wordstats.hasOwnProperty(word);){var next_words=wordstats[word];if(word=choice(next_words),title.push(word),title.length>min_length&&terminals.hasOwnProperty(word))break}return title.length<min_length?this.make_title(min_length):title.join(" ")},init(titles)}var things=new Things,scrolled=!1,menu_point=$(".things-done").offset().top,menu_width=$(".things-done").outerWidth();$(window).resize(function(){$(".things-done").offset().top,$(".things-done").innerWidth()}),$(document).scroll(function(){scrolled||($(".down").fadeOut("slow"),scrolled=!0),$(window).width()>991&&($(window).height()<$(".things-done").height()&&$(".things-done").css("bottom","0"),$(window).height()>$(".things-done").height()+11&&$(".things-done").css("bottom","auto"),$(window).scrollTop()>menu_point&&($(".things-done").addClass("floating"),$(".things-done").css("width",menu_width),$(".polaroids").css("marginTop",$(".things-done").innerHeight()+60)),$(window).scrollTop()<menu_point&&($(".things-done").removeClass("floating"),$(".polaroids").css("marginTop",0)))}),$.get("scripts/things.txt",function(data){var titles=data.split("\n"),generator=new Markov(titles);$(document).scroll(function(){if($(".skull").visible())for(var i=0;15>i;i+=1)things.addToThings(generator.make_title(3));if(scrolled||($(".down").fadeOut("slow"),scrolled=!0),$(window).scrollTop()+$(window).height()>$(document).height()-200)for(var i=0;15>i;i+=1)things.addToThings(generator.make_title(3))})}),$.get("scripts/things.txt",function(data){data.split("\n")});var thingModel=ko.observableArray([{id:0,thing:ko.observable("Be born"),done:ko.observable(!0)},{id:1,thing:ko.observable("Fall in love"),done:ko.observable(!1)},{id:2,thing:ko.observable("Travel the world"),done:ko.observable(!1)},{id:3,thing:ko.observable("Go camping with my best friends in the biggest National Park in the world"),done:ko.observable(!1)},{id:4,thing:ko.observable("Swim with dolphins"),done:ko.observable(!1)},{id:5,thing:ko.observable("Run a half marathon"),done:ko.observable(!1)},{id:6,thing:ko.observable("Eat breakfast"),done:ko.observable(!0)},{id:7,thing:ko.observable("Dance the tango on the roof of a Volvo"),done:ko.observable(!1)},{id:8,thing:ko.observable("Take acid at Glastonbury"),done:ko.observable(!1)},{id:9,thing:ko.observable("Dine at Heston Blumenthal's restaurant"),done:ko.observable(!1)},{id:10,thing:ko.observable("Drive a Ferrari at 180mph"),done:ko.observable(!1)},{id:11,thing:ko.observable("Do kareoke sober"),done:ko.observable(!1)},{id:12,thing:ko.observable("Stay up all night partying and go to work the next day with a hangover"),done:ko.observable(!1)},{id:13,thing:ko.observable("Watch a meteor shower"),done:ko.observable(!1)},{id:14,thing:ko.observable("Go bungee jumping"),done:ko.observable(!1)}]);