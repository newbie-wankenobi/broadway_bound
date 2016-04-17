(function() {
  'use strict';

  angular.module('app', ['ui.router'])

    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .constant('_', window._)
    .run(function ($rootScope) {
         $rootScope._ = window._;
      })

    .run(['authService', function(authService) {
      if (authService.isLoggedIn()) authService.setUser();
    }]);

})();
