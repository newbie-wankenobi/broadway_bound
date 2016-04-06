(function() {
  'use strict';

  angular.module('app', ['ui.router'])

    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })

    .run(['authService', function(authService) {
      if (authService.isLoggedIn()) authService.setUser();
    }]);

})();
