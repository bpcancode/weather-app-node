const request = require('request');

const forecast = (latitude, longitude, location, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=1a692649460512d426c4cea475215b7a&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
	request({url: url, json: true},(error, response) => {
		if(error) {
			callback("Unable to connect to the forecast service", undefined);
		} else if (response.body.error) {
			callback('Unable to find the location', undefined);
		} else {
			callback(undefined, {forecast: `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree but it feels like ${response.body.current.feelslike} degree. The humidity is ${response.body.current.humidity}.`,
				location
			});
		}
	})
}

module.exports = forecast;
