// mainCtrl is for creating methods for logging in
// such as .doLogin, .doLogout
angular.module('mainCtrl', [])

.controller('mainController', mainController)

mainController.$inject =['$rootScope', '$location', 'auth']

function mainController($rootScope, $location, auth){
  var mainCtrl = this

  // get info if a person is logged in
  mainCtrl.loggedIn = auth.isLoggedIn()

  // check to see if a user is logged in on every request. $rootScope is a service of angular.
  $rootScope.$on('$routeChangeStart', function(){
    mainCtrl.loggedIn = auth.isLoggedIn()

    // using getUser() method that we created in the controller
    auth.getUser()
        .then(function(data){
          // mainCtrl.user is going to be information on the user
          mainCtrl.user = data.data
        })
  })

  // function to handle logging in on login button click
  mainCtrl.doLogin = function(){
    mainCtrl.processing = true

    // clear the error
    mainCtrl.error = ''
    // if a user successfully logs in, redirect to user-home page
    auth.login(mainCtrl.loginData.email, mainCtrl.loginData.password)
        .success(function(data){
          mainCtrl.processing = false

          if(data.success)
            $location.path('/home')
          else{
            mainCtrl.error = data.message
          }
        })
  }
  // function to handle logging out
  mainCtrl.doLogout = function(){
    auth.logout()
    mainCtrl.user = ''

    $location.path('/')
  }
}
