var express = require('express');
var router = express.Router();
var request = require('request');

let jsonData;

var headers = {
    'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
};

router.post('/test', function (req, res, next) {
    res.send(jsonData);
});

router.post('/', function (req, res, next) {
    let path = req.body.resource.split("/")[1];
    jsonData = req.body;
    console.log(jsonData);

    // Get the questions notifications, and then process them to get the resource of questions
    if (path === "questions") {
        process.env.QUESTION_ID = req.body.resource.split("/")[2];
        var options = {
            url: 'https://api.mercadolibre.com/questions/' + process.env.QUESTION_ID,
            headers: headers
        };

        request(options, function (error, response, body) {
            if (error || response.statusCode != 200) {
                console.log('Error in first request:', error, 'Status Code:', response.statusCode, 'Response Body:', body);
                return res.render('index', { title: 'Express' });
            } else {
                res.sendStatus(200);
            }
        });
    }
});

module.exports = router;
