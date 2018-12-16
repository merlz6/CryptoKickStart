const app = angular.module('SalonApp', []);


app.controller('MainController', ['$http', function($http){
    this.showServices = false;
    this.showContacts = false;
    this.showHomePage = true;
    this.showPhotos = false;

    this.toggleShowServices = function(){
      this.showServices = true;
      this.showHomePage = false;
      this.showContacts = false;
      this.showPhotos = false;

    }
    this.toggleContacts = function(){
        this.showHomePage = false;
      this.showServices = false;
      this.showContacts = true;
      this.showPhotos = false;

    }
    this.toggleHome = function(){
      this.showHomePage = true;
      this.showServices = false;
      this.showContacts = false;
      this.showPhotos = false;
    }
    this.toggleContacts = function(){
      this.showHomePage = false;
      this.showServices = false;
      this.showPhotos = false;
      this.showContacts = true;
    }

  }])
