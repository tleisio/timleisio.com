//Service Dependencies
var artys = require('../app/services/serviceArtys');

//Public route handling
module.exports = function(router) {

  /*router.get('/', function(req,res) {
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
  });*/

  router.get('/', function(req,res) {
    res.render('index', {title:'Articles by Tim Leisio'}, function(err, html) {
      if (err) { throw(err); }
      res.send(html);
    });
  });

  router.get('/activities', function(req,res) {
    res.render('activities', {title:'Activities by Tim Leisio'}, function(err, html) {
      if (err) { throw(err); }
      res.send(html);
    });
  });

  router.get('/artifacts', function(req,res) {
    res.render('artifacts', {title:'Artifacts by Tim Leisio'}, function(err, html) {
      if (err) { throw(err); }
      res.send(html);
    });
  });

  router.get('/permaculture', function(req,res) {
    res.render('permaculture', {title:'Permaculture by Tim Leisio'}, function(err, html) {
      if (err) { throw(err); }
      res.send(html);
    });
  });

  router.get('/artys/:arty', function(req,res,next) {
    var data = {};
    data.url = 'artys/' + req.params.arty;

    console.log("DATA.URL :: " + data.url);

    res.render(data.url, {title:'Articles'}, function(err, html) {
      if (err) { throw(err); }
      res.send(html);
    });
  });

  /*router.get('/artys/:arty', function(req,res,next) {
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
  });*/

}