(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$log'];

    function LoginController($http, $log) {
      var vm = this;

      vm.createUser = createUser;

      vm.events;

      $log.info('This is the login controller');
    }

})();
