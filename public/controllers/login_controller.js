(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$log', 'authService', '$state', '$window', 'userDataService' ];

    function LoginController($http, $log, authService, $state, $window, userDataService) {
      var vm = this;


      vm.createUser  = createUser;
      vm.login       = login;
      vm.isLoggedIn  = authService.isLoggedIn;
      vm.currentUser = userDataService.current.user;

      vm.placeHolder = {
        name:      '',
        email:     '',
        password:  ''
      };

      $log.info('This is the login controller');

      function createUser() {
        $log.debug('Logging in:');

        vm.userData = {
          email:    '',
          name:     '',
          password: ''
        }

        authService.signup(vm.userData);

        $state.go('list_events');
      }

      function login() {
        console.log("login is being clicked");

        vm.userData = {
          email:    '',
          name:     '',
          password: ''
        }

      authService.login(vm.userData.emailAddress, vm.userData.password)
        .then(function(res) {
          $log.log(res.data);
          $state.go('list_events');
        });
      }
    }

})();
