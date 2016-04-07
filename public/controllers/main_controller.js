(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$http', '$log'];

  function MainController($http, $log) {
    var vm = this;
    vm.events;

    function getEvents() {
      $http.get('https://api.seatgeek.com/2/events?geoip=104.32.144.234&range=24mi&taxonomies.name=theater&per_page=100')
           .then(function(resp) {

            $log.info(resp);

            var newList = resp.data.events.filter(function(evt){
              // console.log(evt.type);
              return evt.type != 'comedy' && evt.type != 'classical' && evt.type != 'family' && evt.performers[0].type != 'band' && evt.title != 'GRAMMY Museum Daily Admission - Los Angeles' && evt.title != 'KROQ Beer Festival - Arcadia' && evt.title != 'Hollowbody LA Presents - Los Angeles';

            })

            vm.events = newList;
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
