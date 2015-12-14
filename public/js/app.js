angular.module('TopOutApp', ['ngRoute'])
	.directive('loginForm', loginForm)

function loginForm(){
	var directive = {
		restrict: 'EA',
		templateUrl: '/partials/login.html'
	}
}
