const request = require('request');

const geocode = (address, callback) => {
		const url = 'http://api.positionstack.com/v1/forward?access_key=be5076f7dfca1d30d0377fcce861b4e0&query=' + address;
		request({url: url, json: true}, (error, response) => {
			if(error) {
				callback('Unable to connect to the geocoding service', undefined);
			} else if(response.body.error || response.body.data.length === 0) {
				callback('Unable to find the location', undefined);
			} else {
				const data = {
					latitude: response.body.data[0].latitude,
					longitude: response.body.data[0].longitude,
					location: response.body.data[0].label
				};
				callback(undefined, data);
			}
		})
}

module.exports = geocode;