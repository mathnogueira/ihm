(function() {
'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$state'];
	function HomeController($scope, $state) {
		var vm = this;

		vm.login = login;
		
		init();

		////////////////

		function init() {
			
		}

		function login() {
			$state.go('Logged');
		}
	}
})();