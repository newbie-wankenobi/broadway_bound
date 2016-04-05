(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

    appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appRoutes($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('welcome', {
          url: '/',
          templateUrl: '/js/app/templates/list_events.html',
          controller: 'MainController',
          controllerAs: 'vm'
        });

      $urlRouterProvider.otherwise('/');
    }
})();
