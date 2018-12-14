const app = angular.module('SalonApp', []);


app.controller('MainController', ['$http', function($http){
    this.showServices = false;

    this.toggleShowServices = function(){
      this.showServices = !this.showServices
    }


  }])
