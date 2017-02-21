(function() {
'use strict';

	angular
		.module('app')
		.controller('LoggedHomeController', LoggedHomeController);

	LoggedHomeController.$inject = ['$scope', '$state', 'events'];
	function LoggedHomeController($scope, $state, events) {
		var vm = this;

		vm.viewDetails = viewDetails;

		vm.events = events;
		

		init();

		////////////////

		function init() { }

		function viewDetails(event) {
			$state.go('EventDetails', { event: event, id: event.id });
		}
	}
})();