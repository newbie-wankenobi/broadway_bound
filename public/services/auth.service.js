(function() {
  'use strict';

  angular
    .module('app')
    .factory('authToken', authToken)
    .factory('authService', authService)
    .factory('authInterceptor', authInterceptor);

  authToken.$inject       = ["$window"];
  authService.$inject     = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];
  authInterceptor.$inject = ["$q", "$location", "authToken"];

  // TOKEN SERVICE
  function authToken($window) {
    var tokenFactory = {};

    tokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    }

    tokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    }

    return tokenFactory;
  }

  // AUTHENTICATION SERVICE

  function authService($http, $q, authToken, userDataService, $state, $window) {

    var authFactory = {};

    authFactory.login = function(email, password) {
      return $http.post('/api/login', {
        email:    email,
        password: password
      })
        .success(function(data) {
          authToken.setToken(data.token);

          userDataService.current.user = data.user;
          return data;
        });
    };

    authFactory.signup = function(email, password) {
      return $http.post('/api/users', {
        name:     name,
        email:    email,
        password: password
      })
        .success(function(data) {
          authToken.setToken(data.token);

          userDataService.current.user = data.user;
          return data;
        });
    };

    authFactory.logout = function() {
      authToken.setToken();
      $state.go('home');
    };

    authFactory.isLoggedIn = function() {
      return authToken.getToken() ? true : false;
    };

    authFactory.setUser = function() {
      var token = authToken.getToken().split('.')[1];
      var user = JSON.parse($window.atob(token));
      userDataService.current.user = user;
      return user;
    };

    return authFactory;
  };

  // AUTH INTERCEPTOR TO BLOCK UNAUTHORIZED USERS
  function authInterceptor($q, $location, authToken) {
    var interceptorFactory = {};

    interceptorFactory.request = function(config) {

      // grab that token!
      var token = authToken.getToken();

      if (token) config.headers['x-access-token'] = token;

      return config;
    }

    interceptorFactory.responseError = function(response) {

      // if forbidden status, clear token and redirect to root
      if (response.status == 403) {
        authToken.setToken();
        $location.path('/');
      }

      return $q.reject(response);
    }

    return interceptorFactory;
  };
})();
