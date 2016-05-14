//models dependencies
var fs = require('fs');
var marked = require('marked');

//make public
var artys = module.exports;

//cross-service dependencies

//private
var somePrivateVar = "";


//public
artys.getArtyList = function(_data, _callback) {
  var res = {};
  res.data = [];

  //do stuff
  fs.readdir('./artys', function(_err, _files) {
    if (_err) {
      //something with reading the dir messed up, send failure
      res.status = 'failure';
      res.message = 'Server failed to read the directory of articles';
      _callback(res);
    } else {
      var i,ll;
      ll=_files.length;
      for (i=0;i<ll;i++) {
        var tempName = _files[i].substr(0,(_files[i].length-6)); // reads file name and removes '.mdown'
        var tempUrl = tempName.replace(/\s/g, "-"); // replaces all white spaces with hyphens (-)
        
        var articleNameMdown = getMdownLine(('./artys/'+_files[i]), 0);
        var articleName = articleNameMdown.substr(1,articleNameMdown.length);;
        var published = getMdownLine(('./artys/'+_files[i]), 1);
        
        var tempArty = {
          strName: articleName,
          strUrl: tempUrl,
          dtPublished: published
        }
        res.data.push(tempArty);
      }

      res.status = 'success';
      res.message = 'Successfully got list of articles.';
      _callback(res);
    }
  });
}

artys.getArtyFull = function(_data, _callback) {
  var res = {};
  var htmlData;

  //append dir, replace dash with whitespace, add suffix '.mdown'
  var filename = _data.url.replace(/-/g, ' '); 
  var filepath = './artys/' + filename + '.mdown';

  //grab the file and convert mdown to html if it exists
  fs.readFile(filepath, 'utf8', function(_err,_cbData) {
    if (_err) {
      //file doesn't exists, send failure for next() route handler
      res.status = 'failure';
      res.message = "Failed to read file at dir: " + filepath;
      res.error = _err;
      _callback(res);
    } else {
      // mark the data (mardown to html)
      htmlData = marked(_cbData);

      //file exists, has been converted from mdown to html, so render
      res.status = 'success';
      res.message = 'Successfully got the full article.';
      res.data = {
        html: htmlData,
        title: filename
      }
      _callback(res);    
    }
  });
}


//private method
function getMdownLine(_file, _lineNumber, _callback) {
  var data = fs.readFileSync(_file, 'utf8');
  var lines = data.split("\n");

  if(+_lineNumber > lines.length){
    console.log(new Error('File end reached without finding line'));
    //TODO: create a logger to capture how often this happens
  }

  return lines[+_lineNumber];
}