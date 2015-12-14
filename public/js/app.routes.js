// injecting ngRoute
angular.module('TopOutRouter', ['ngRoute'])

	.config(['$routeProvider', '$locationProvider', userRoutes])

  function userRoutes($routeProvider, $locationProvider){

  $routeProvider
  // route for the home page, which is where you log in
  .when('/login', {
        templateUrl : 'partials/login.html',
          controller  : 'mainController',
            controllerAs: 'login'
      })

      // show all users
      .when('/home', {
        templateUrl: 'partials/user-home.html',
        controller: 'userController',
        controllerAs: 'user'
      })

      .otherwise({
        redirectTo: '/'
      });
}
