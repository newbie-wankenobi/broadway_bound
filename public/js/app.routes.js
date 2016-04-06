(function() {
  'use strict';

  angular
    .module('app')
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/list_events.html'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
