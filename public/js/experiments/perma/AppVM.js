/*
  APP VIEW MODEL
*/
function AppVM() {
  var self = this;

  self.appIntWidth = ko.observable(0);
  self.appIntHeight = ko.observable(0);

  self.strCurrentPage = ko.observable('home');

  self.isStartingWithGuild = true;

  self.arrUserPlantGuilds = ko.observableArray([]);
  self.intActiveGuildIndex = ko.observable(-1);

  /*
    Methods
  */
  self.init = function() {
    console.log("Perma app client-side initialized");

    if (self.isStartingWithGuild == true) {
      var tempNewGuild = new GuildVM();
      tempNewGuild.strGuildId(self.arrUserPlantGuilds().length);
      tempNewGuild.strGuildName('1-2yr Soil Rehabilitation Guild');
      tempNewGuild.hasLocation(true);
      tempNewGuild.hasClimate(true);
      tempNewGuild.hasPlants(true);
      tempNewGuild.hasLayout(true);
      tempNewGuild.strLocation('West Lafayette, Indiana');
      tempNewGuild.strShape('rectangle');
      tempNewGuild.intWidth(15);
      tempNewGuild.intHeight(25);
      tempNewGuild.strProfile('flat');
      tempNewGuild.intSlope(2);
      tempNewGuild.strSlopeDirection('south');
      tempNewGuild.strSoil('loam');
      self.arrUserPlantGuilds.push(tempNewGuild);
    }
  }

  self.createGuild = function(data,event) {
    var tempNewGuild = new GuildVM();
    tempNewGuild.strGuildId(self.arrUserPlantGuilds().length);
    tempNewGuild.strGuildName('My New Plant Guild');

    self.arrUserPlantGuilds.push(tempNewGuild);
    self.intActiveGuildIndex(self.arrUserPlantGuilds().length-1);
    self.strCurrentPage('guild');
  }

  self.navToHome = function(data,event) {
    self.strCurrentPage('home');
  }
  self.navToGuild = function(data,event) {
    self.intActiveGuildIndex(self.arrUserPlantGuilds().indexOf(data));
    self.strCurrentPage('guild');
  }

  self.windowResize = function() {
    self.appIntWidth(window.innerWidth);
    self.appIntHeight(window.innerHeight);
  }
}


/*
  GUILD PAGE VIEW MODEL
*/
function GuildVM() {
  var self = this;

  self.strGuildId = ko.observable("");
  self.strGuildName = ko.observable("");

  self.strActiveTab = ko.observable("location");

  self.strLocation = ko.observable('');
  self.isSearchingForLocation = ko.observable(false);

  self.isClimateVisible = ko.observable(false);

  self.strUnits = ko.observable('metric');
  
  self.strShape = ko.observable('');
  self.intWidth = ko.observable(10);
  self.intHeight = ko.observable(10);
  self.intAxisVertical = ko.observable(10);
  self.intAxisHorizontal = ko.observable(10);
  self.intRotation = ko.observable(0);

  self.strProfile = ko.observable('');
  self.intSlope = ko.observable(0);
  self.strSlopeDirection = ko.observable('north');

  self.strSoil = ko.observable('');

  self.hasLocation = ko.observable(false);
  self.hasClimate = ko.observable(false);
  self.hasLandscape = ko.pureComputed(function() {
    if (self.strShape()!='' && self.strProfile()!='' && self.strSoil()!='') {
      return true;
    } else {
      return false;
    }
  });
  self.hasPlants = ko.observable(false);
  self.hasLayout = ko.observable(false);


  /*
    Methods
  */

  self.activeTabToLocation = function(data,event) {
    self.strActiveTab('location');
  }
  self.activeTabToClimate = function(data,event) {
    self.strActiveTab('climate');
  }
  self.activeTabToLandscape = function(data,event) {
    self.strActiveTab('landscape');
  }
  self.activeTabToPlants = function(data,event) {
    self.strActiveTab('plants');
  }
  self.activeTabToLayout = function(data,event) {
    self.strActiveTab('layout');
  }

  self.searchForLocation = function(data,event) {
    if (event.charCode == 13) {
      console.log("Confirming location...");
      self.isSearchingForLocation(true);

      //js timer event for 1-2 seconds to mimic the finding of location...
      setTimeout(function() { self.locationConfirmed(); }, 1250);
      setTimeout(function() { self.climateConfirmed(); }, 2000);
    }
    return true;
  }

  self.locationConfirmed = function() {
    self.strLocation('West Lafayette, Indiana');
    self.hasLocation(true);
    self.isSearchingForLocation(false);

  }
  self.locationInvalid = function() {

  }

  self.climateConfirmed = function() {
    self.hasClimate(true);
  }
  self.climateDataMissing = function() {

  }

  self.toggleClimate = function(data,event) {
    if (self.isClimateVisible()==false) {
      self.isClimateVisible(true);
    } else {
      self.isClimateVisible(false);
    }
  }

  self.notIn = function() {
    alert('This action is not in this prototype.');
  }

}











