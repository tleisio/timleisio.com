/*
  START-INDEX
*/
//var controller = new Controller();
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

	if (typeof(Storage) !== "undefined") {
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
	} else {
		alert("HTML5 local storage required for this prototype.");
	}
	
}