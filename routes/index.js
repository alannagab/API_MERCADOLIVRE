var express = require('express');
var router = express.Router()
var request = require('request');
require('dotenv').config();

var headers = {
  'accept': 'application/json',
  'content-type': 'application/x-www-form-urlencoded'
};

/*Acess index page and get the token */
router.get('/', function(req, res, next) {
  let code = req.url.split("=")[1];
  console.log(code);

    if (code) {
        var dataString = 'grant_type=authorization_code&client_id=' + process.env.APP_ID +
            '&client_secret=' + process.env.SECRET_KEY +
            '&code=' + code + '&redirect_uri=' + process.env.REDIRECT_URI;
          console.log(dataString);

        var options = {
            url: 'https://api.mercadolibre.com/oauth/token',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        request(options, function callback(error, response, body) {
          console.log(body);
            if (!error && response.statusCode == 200) {
                process.env.ACCESS_TOKEN = JSON.parse(body).access_token;
            }
        });
    }
    else{
        res.render('index', { title: 'Express' });
    }
});


module.exports = router;


