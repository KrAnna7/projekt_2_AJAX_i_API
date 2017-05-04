// plik scripts.js
var tweetLink = "https://twitter.com/intent/tweet?text=";// skąd ten adres?
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";// skąd ten adres?

function getQuote() {
	$.getJSON(quoteUrl, createTweet);// dlaczego nie jest createTweet()?
};

function createTweet(input) {// dlaczego input?
	var data = input[0];

	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title; // dlaczego tutaj bez $, bo pasuje nam format danej ?

	if (!quoteAuthor.length) {
		quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + quoteText + " Author : " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);// co to encodeURIComponent czy tak można tworzyć linki?
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}

	console.log(tweet);
};

$(document).ready(function() {
		getQuote();
		$('.trigger').click(function() {
			getQuote();
		})
	});