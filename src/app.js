const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');

const app = express();

const port = process.env.PORT || 3000

//setting paths
const publicDirPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setting view engine and hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Bisy Poudel'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'Bisy Poudel'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Bisy Poudel'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error:"You must provide an address"
		})
	}
	
	geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
		if(error) {
			res.send({
				error
			})

		} else {	
			forecast( latitude, longitude, location, (error, data) => {
				if(error) {
					res.send({
						error
					})
				} else {
			  		res.send({
			  			data
			  		})
				}
			})
		}
	})
})


app.get('/product', (req, res) => {
	if(!req.query.search) {
		return (res.send({error: 'You must provide search term'}))
	}

	res.send({
		product: []
	})
})

app.get('/help/*', (req, res)=>{
	res.render('error', {
		title:'404! error',
		name: 'Bisy Poudel',
		errorMessage: 'Help page not found'
	});
})

app.get('*', (req, res)=> {
	res.render('error', {
		title: '404! error',
		name: 'Bisy Poudel',
		errorMessage: 'Page not found'
	});
})

app.listen(port, ()=>{
	console.log('Server is started on port ' + port);
});