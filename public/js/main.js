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
/*
  APP VIEW MODEL
*/
function AppVM() {
  var self = this;

  self.appIntWidth = ko.observable(0);
  self.appIntHeight = ko.observable(0);

  /*
    Methods
  */
  self.init = function() {
    console.log("App Client-Side Initialized");
  }
  self.windowResize = function() {
    self.appIntWidth(window.innerWidth);
    self.appIntHeight(window.innerHeight);
  }
}
/*
  START-INDEX
*/
var controller = new Controller();
var app = new AppVM();
var initHit = false;

document.onreadystatechange = function() {
	if (document.readyState === 'complete') {
		init();
	}
}
document.addEventListener("DOMContentLoaded", function(event) {
	init();
});

function init() {
	if (initHit === false) {
		initHit = true;
		//console.log('client-side app initialization');

		//Apply Bindings
		ko.applyBindings(app);

		//Event Listeners
		window.onresize = function() {
			app.windowResize();
		}
		app.windowResize();

		app.init();
	}
}