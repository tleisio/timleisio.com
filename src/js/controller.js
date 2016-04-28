/*
  CONTROLLER
*/
function Controller() {
  var self = this;
  /*
  self.requestTemplate = function(data) {
    var req = new XMLHttpRequest();
    req.open('POST', '/url/to/get/from', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.onreadystatechange = function () {
      if (req.readyState != 4 || req.status != 200) return;
      var resData = JSON.parse(req.responseText);
      if (resData.status === 'success') {
        console.log('temp success');
      } else {
        console.log('temp failure');
      }
    }
    req.send( JSON.stringify( { data: (data) } ) );
  }
  */
}