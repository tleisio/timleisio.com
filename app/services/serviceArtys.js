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
    if (_err) { throw(_err); }
    else {
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
  res.data = "";

  console.log(_data.url);
  var filename = _data.url.replace(/-/g, ' '); 

  //append dir, replace dash with whitespace, add suffix '.mdown'
  var filepath = './artys/' + filename + '.mdown';
  var data = fs.readFileSync(filepath, 'utf8');
  var htmlData = marked(data);

  res.status = 'success';
  res.message = 'Successfully got the full article.';
  res.data = {
    html: htmlData,
    title: filename
  }
  
  _callback(res);
}


//private method
function getMdownLine(_file, _lineNumber, _callback) {
  var data = fs.readFileSync(_file, 'utf8');
  var lines = data.split("\n");

  if(+_lineNumber > lines.length){
    throw new Error('File end reached without finding line');
  }

  return lines[+_lineNumber];
}