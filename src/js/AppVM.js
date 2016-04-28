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