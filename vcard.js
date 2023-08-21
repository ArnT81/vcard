if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const vCardsJS = require('vcards-js');
const vCard = vCardsJS();
// const base64 = require('./base64');
const { PORT, SSL_KEY, SSL_CERT } = process.env

const origin = __dirname.includes('Desktop') ? 'http://127.0.0.1:5500' : 'https://arnt.hopto.org/businesscard';


app.use(cors({
	origin: origin,
	// origin: '*',
	methods: ['GET'],
}));


//set properties
vCard.firstName = 'Anders';
vCard.lastName = 'Söderberg';
// vCard.organization = 'None';
vCard.logo.embedFromFile('./media/head.webp');
// vCard.photo.attachFromUrl('https://arnt.hopto.org/image', 'PNG'); //!Funkar inte
// vCard.photo.embedFromString(base64, 'image/png');		//funkar med
vCard.cellPhone = '+46735311606';
vCard.email = 'anders_soderberg@hotmail.com';
vCard.title = 'Webbutvecklare';
// vCard.url = 'https://arnt.hopto.org';
vCard.url = 'www.anderssöderberg.se';
// vCard.homeAddress.label = 'Home';
vCard.homeAddress.street = 'Movägen 8';
vCard.homeAddress.postalCode = '342 50';
vCard.homeAddress.city = 'Vislanda';
vCard.homeAddress.stateProvince = 'Kronoberg';
vCard.homeAddress.countryRegion = 'Sverige';


app.get('/', (req, res) => {
	try {
		console.log('fetch made on vcard');
		res.set('Content-Type', 'text/vcard; name="arnt.vcf"');
		res.set('Content-Disposition', 'inline; filename="arnt.vcf"');
		res.send(vCard.getFormattedString());
	} catch (error) {
		console.log(error);
	}
})


if (__dirname.includes('Desktop')) {
	app.listen(PORT, () => console.log('Server started on port', PORT));
}
else {
	const sslServer = https.createServer({
		key: fs.readFileSync(SSL_KEY),
		cert: fs.readFileSync(SSL_CERT),
	}, app)
	sslServer.listen(PORT, () => console.log('Secure server started on port', PORT));
}