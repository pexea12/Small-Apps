var quotes = [
	{ 
		author: 'Rock Lee', 
		content: 'A dropout will beat a genius through hard work.', 
		image: "http://www.less-real.com/imagevault/uploaded/imagessolidthumbnails/845.jpg"
	},
	{ 
		author: 'Gaara', 
		content: "I want to be needed, this is what I've learned from meeting and fighting Uzumaki Naruto.",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/5758.jpg"
	},
	{ 
		author: 'Hatake Kakashi', 
		content: "The next generation will always surpass the previous one. It's one of the never-ending cycles in life.",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/12290.jpg"
	},
	{ 
		author: 'Haku', 
		content: "When people are protecting something truly precious to them. They truly can become...as strong as they need to be!",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/2765.jpg"
	},
	{
		author: 'Uchiha Obito',
		content: "In the ninja world, those who don't follow the rules are trash. But, those who abandon their friends are even worse than trash.",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/8271.jpg"
	},
	{
		author: 'Uzumaki Naruto',
		content: "A true hero always arrives late.",
		image: "http://www.less-real.com/imagevault/uploaded/imagessolidthumbnails/12443.jpg"
	},
	{
		author: 'Deidara',
		content: "Art is a BANG!!",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/1026.jpg"
	},
	{
		author: 'Uchiha Sasuke',
		content: "Naruto... I know you're special but, I AM MORE SPECIAL THAN YOU!",
		image: "http://www.less-real.com/imagevault/uploaded/imagessolidthumbnails/11114.jpg"
	},
	{
		author: 'Uchiha Itachi',
		content: "If you want to kill me, despise me, hate me, and live in an unsightly way... Run, and cling to life, and then some day, when you have the same eyes as I do, come before me.",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/8297.jpg"
	},
	{
		author: 'Haruno Sakura',
		content: "I've always considered myself to be a true ninja...but those were just empty words, because Sasuke and Naruto were always in the lead! But now it's my turn to take the lead, and all of you can watch me from the background!",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/1281.jpg"
	},
	{
		author: 'Orochimaru',
		content: "When there is a true desire in the heart and that desire is strong... That is when he finds real strength that even he did not know he had!",
		image: "http://www.less-real.com/imagevault/uploaded/quotefaces/1283.jpg"
	},
	{
		author: 'Jiraiya',
		content: "The true measure of a shinobi is not how he lives but how he dies. It's not what they do in life, but what they did before dying that proves their worth. Thinking back of it, my story is one full of failures. Tsunade rejected me every time. I couldn't save my friend, I failed to protect my student… and my teacher. Compared with the Hokage who came before me, my accomplishments have all been petty and insignificant. I wanted to die like them…",
		image: "http://www.less-real.com/imagevault/uploaded/imagessolidthumbnails/1301.jpg"
	},
	{
		author: 'Jiraiya',
		content: "Now my job is to help the next generation, and set a good example for them. And for that I'll gladly lay down my life, and I'll be smiling the whole time. It's what makes us old guys cool, you see.",
		image: "http://www.less-real.com/imagevault/uploaded/imagessolidthumbnails/1301.jpg"	
	}
];

function load_quote() {
	var id = Math.floor(Math.random() * quotes.length);
	$('#tweet-share').text('');
	$('.quote img').attr('src', quotes[id].image)
				   .attr('alt', quotes[id].author);
	$('.quote h3').text(quotes[id].author);
	$('.quote p').text(quotes[id].content);
	window.twttr.widgets.createShareButton(
		window.location.href,
		document.getElementById('tweet-share'),
		{
			text: '#' + quotes[id].author + ' ' + quotes[id].content
		}
	);
}

$(document).ready(function() {
	load_quote();
	$('#new-quote').click(function() {
		load_quote();
	});
});	




