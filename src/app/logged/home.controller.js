(function() {
'use strict';

	angular
		.module('app')
		.controller('LoggedHomeController', LoggedHomeController);

	LoggedHomeController.$inject = ['$scope', '$state', 'events', 'EventService'];
	function LoggedHomeController($scope, $state, events, eventService) {
		var vm = this;

		vm.viewDetails = viewDetails;
		vm.isFavorite = isFavorite;

		vm.events = events;
		

		init();

		////////////////

		function init() { }

		function viewDetails(event) {
			$state.go('EventDetails', { event: event, id: event.id });
		}

		function isFavorite(event) {
			return eventService.isFavorite(event);
		}
	}
})();