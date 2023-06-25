const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const vCardsJS = require('vcards-js');
const vCard = vCardsJS();
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const { PORT, SSL_KEY, SSL_CERT } = process.env

const origin = __dirname.includes('Desktop') ? 'http://localhost:5500' : 'https://arnt.hopto.org/businesscard';


app.use(cors({
	origin: origin,
	methods: ['GET'],
	credentials: true,
}));

//set properties
vCard.firstName = 'Anders';
// vCard.middleName = 'J';
vCard.lastName = 'Söderberg';
// vCard.organization = 'ACME Corporation';
vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
vCard.workPhone = '+46735311606';
// vCard.birthday = new Date(1981, 0, 1);
vCard.title = 'Webbutvecklare';
vCard.url = 'https://arnt.hopto.org';
// vCard.note = 'Notes on Eric';


app.get('/', (req, res) => {
	//set content-type and disposition including desired filename
	res.set('Content-Type', 'text/vcard; name="arnt.vcf"');
	res.set('Content-Disposition', 'inline; filename="arnt.vcf"');
	//send the response
	res.send(vCard.getFormattedString());
})


const sslServer = https.createServer({
	key: fs.readFileSync(__dirname.includes('Desktop') ? `${__dirname}/cert/key.pem` : SSL_KEY),
	cert: fs.readFileSync(__dirname.includes('Desktop') ? `${__dirname}/cert/cert.pem` : SSL_CERT),
}, app
)


// app.listen(PORT, () => console.log('Secure server started on port', PORT));
sslServer.listen(PORT, () => console.log('Secure server started on port', PORT));