(function() {
'use strict';

	angular
		.module('app')
		.controller('EventAddController', EventAddController);

	EventAddController.$inject = ['$scope', '$state', 'EventService', 'ToastService'];
	function EventAddController($scope, $state, EventService, ToastService) {
		var vm = this;

		vm.add = addEvent;
		

		init();

		////////////////

		function init() { }

		function addEvent() {
			EventService.add(vm.event);
			ToastService.show('Evento cadastrado com sucesso!');
			$state.go('Logged', { ignore: true });
		}
	}	
})();