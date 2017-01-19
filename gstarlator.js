var express = require('express');
var gstarlator = express();
var rp = require('request-promise');
var cheerio = require('cheerio');
var swearjar = require('swearjar');

function gangster_this(query) {
    var options = {
        method: 'POST',
        uri: 'http://joel.net/EBONICS/Translator',
        form: {
            english: query
        },
    };
    return rp(options)
};

gstarlator.get('/gangster', function(req, res) {

    var normalText = req.param('normal');

    gangster_this(normalText).then(function(data) {
        var $ = cheerio.load(data);
        res.send(swearjar.censor($('#Ebonics').text()));
    }).catch(function(err) {
        console.log(err.stack);
        res.sendStatus(400);
    })
});

module.exports = gstarlator;
