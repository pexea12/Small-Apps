$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var website = "http://api.openweathermap.org/data/2.5/weather";
		var place = {
			lat: position.coords.latitude,
			lon: position.coords.longitude,
			appid: 'b7d56fce2ceadad3b4ed7a12583e32b9'
		};
		$.get(website, place, function(data) {
			$('#info h2').text(data.name + ', ' + data.sys.country);
			$('#info h3').text(data.weather[0].description);
			$('#info h4').contents().filter('img')
				.attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
				.attr('alt', data.weather[0].icon);
			$('#info h4').contents().last().replaceWith((data.main.temp - 273.15).toFixed(2) + ' °C');
			$('#info h5').text('Humidity: ' + data.main.humidity);
			$('button').click(function() {
				var text = $('#info h4').text();
				var textToReplace = $('#info h4').contents().last();
				if (text[text.length - 1] === 'F')
					textToReplace.replaceWith((data.main.temp - 273.15).toFixed(2) + ' °C');
				else 
					textToReplace.replaceWith((data.main.temp * 9 / 5 - 459.67).toFixed(2) + ' °F');
			});

			console.log("url('../images/" + data.weather[0].icon + ".jpg)");
			$('#main').css('background-image', "url('./weather/images/" + data.weather[0].icon + ".jpg')");
		});
	});
});