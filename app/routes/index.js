const routes = require('express').Router();
const models = require('./models');
const play = require('./play');

routes.use('/models', models);
routes.use('/play', play);

const goatee = require('goatee');
const fs = require('fs');

routes.get('*', function (req, res) {
	//to do -- move this into a wrapper library
	fs.readFile('/mnt/app/templates/site/genericPage.html', 'utf8', function(err, template){
		if(err){ throw(err); }
		
		res.contentType('text/html');
		res.send(goatee.fill(
			template, { 
				pageTitle : `System Check`,
				pageContent : `
					<ul>
						<li>Express is running.</li>
						<li>GraphQL are accessible at <a href='/graph'>/graph</a></li>
						<li>WS prototype for game updates and chat are accessible at <a href='/play'>/play</a></li>
						<li>Models are browsable at <a href='/models'>/models</a></li>
					</ul>
					<h2>Static Assets Test</h2>
					<img src='/media/images/72104_IonatheUnseen_WEB.jpg'/>
					<p>did we get Iona?!?</p>
				` 
			}
		));
	});
})

module.exports = routes;