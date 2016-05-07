var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var app     = express();

app.get('/genoset/:set', function(req, res){
  url = util.format('http://www.snpedia.com/index.php/%s/criteria', req.params.set);
  request(url, function(error, response, html){
    if(!error) {
      var $ = cheerio.load(html);

      var genoset, criteria;
      var json = {genoset: req.params.set, criteria: ""};

      json.criteria = $('#mw-content-text').text();

      json.criteria = json.criteria.replace(/\r?\n|\r/g, "");
      json.criteria = json.criteria.replace(/\r? |\r/g, "");

      console.log(json);
      fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
        console.log('File successfully written! - Check your project directory for the output.json file');
      });
      res.send(json);
    }
  });
});
app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
