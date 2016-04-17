(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$state', '$http', '$log', 'userDataService', 'authService', "_"];

  function MainController($state, $http, $log, userDataService, authService, _) {
    // var _ = require('lodash');
    var vm = this;
    // var _ = this._;
    vm.events;
    vm.randomEvent;

    vm.current     = userDataService.current;
    vm.logout      = authService.logout;
    vm.isLoggedIn  = authService.isLoggedIn;
    vm.getRandomEvent = getRandomEvent;

        vm.$state  = $state;


    function getRandomEvent() {
      vm.events.lodash.sample();
    }

    function getEvents() {
      $http.get('https://api.seatgeek.com/2/events?geoip=104.32.144.234&range=24mi&taxonomies.name=theater&per_page=100')
           .then(function(resp) {

            $log.info(resp);

            var newList = resp.data.events.filter(function(evt){

              // console.log(evt.type);
              return evt.type != 'comedy' && evt.type != 'classical' && evt.type != 'family' && evt.performers[0].type != 'band' && evt.title != 'GRAMMY Museum Daily Admission - Los Angeles' && evt.title != 'KROQ Beer Festival - Arcadia' && evt.title != 'Hollowbody LA Presents - Los Angeles' && evt.performers[0].image;

            })

            vm.events = newList;
            vm.randomEvent = _.sample(vm.events);
            $log.info("Random event is: ", vm.randomEvent);
            console.log(vm.events);
            $log.info(vm.events.length);
            $log.info(vm.events);
           }, function(err) {
            if(err) {
            $log.log(err);
            }
           });
    }

    getEvents();
  }
})();
