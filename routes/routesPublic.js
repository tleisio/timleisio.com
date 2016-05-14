//Service Dependencies
var artys = require('../app/services/serviceArtys');

//Public route handling
module.exports = function(router) {

  router.get('/', function(req,res) {
    //Call a service to return data in HTML format of the markdown artys
    artys.getArtyList({}, function(response) {
      if (response.status === 'success') {
        //Render the home page with list of markdown artys converted to html
        res.render('index', {title:'Articles on design, ux, and possibililty by Tim Leisio', artys:response.data}, function(err, html) {
          if (err) { throw(err); }
          res.send(html);
        });    
      } else {
        console.log(res.message);
        //TODO: create a logger to capture how often this happens
      }
    });
  });

  router.get('/artys/:arty', function(req,res,next) {
    var data = {};
    data.url = req.params.arty;

    artys.getArtyFull(data, function(response) {
      if (response.status === 'success') {
        res.render('arty', {title:response.data.title, arty:response.data.html }, function(err, html) {
          if (err) { throw(err); }
          res.send(html);
        });
      } else {
        console.log(response.status);
        //TODO: create a logger to capture how often this happens
        next();
      }
    });

  });

}