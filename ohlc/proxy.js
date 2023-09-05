
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Set up CORS headers in the proxy
app.use('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update with your allowed origins
    proxy.web(req, res, { target: 'https://api-pub.bitfinex.com/v2' }); // Replace with the Bitfinex API URL
});

const PORT = 3001; // Choose a suitable port
app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
