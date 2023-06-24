const express = require('express');
const app = express();
const https = require('https');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}


app.get('/', (req, res) => {
	res.send('gsdjlkglk')
})


const sslServer = https.createServer(
	{
		/* key: fs.readFileSync(__dirname.includes('Desktop') ? `${__dirname}/cert/key.pem` : SSL_KEY),
		cert: fs.readFileSync(__dirname.includes('Desktop') ? `${__dirname}/cert/cert.pem` : SSL_CERT), */
	},
	app
)

sslServer.listen(PORT, () => console.log('Secure server started on port', PORT));