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
      })
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: '/templates/about.html'
      })
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/templates/login.html'
      });

      $stateProvider
      .state('list_events', {
        url: '/list_events',
        templateUrl: '/templates/list_events.html'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
