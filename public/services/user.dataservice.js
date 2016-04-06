(function() {
  'use strict';

  angular
    .module('app')
    .factory('userDataService', userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {
    var userFactory = {
      current: {}
    };

    userFactory.current.user = {};

    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    }

    return userFactory;
  }
})();
