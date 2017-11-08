require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

/** 
 *Allow connection to other ports on host 
 *Only necessary for local development
 */
if(!process.env.DYNO) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });
}


/* Serve the build folder as static files */
app.use(express.static(path.join(__dirname, '/dist')));

/* Route all non-backend routes to the frontend (this sould be last) */
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});


let port = process.env.PORT || 3000;
app.listen(port, ()=> {
	console.log(`listening on port ${port}`);
});