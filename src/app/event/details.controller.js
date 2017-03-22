(function() {
'use strict';

	angular
		.module('app')
		.controller('EventDetailsController', EventDetailsController);

	EventDetailsController.$inject = ['$scope', '$state', 'event', 'ToastService', 'EventService'];
	function EventDetailsController($scope, $state, event, ToastService, EventService) {
		var vm = this;

		vm.event = event;

		vm.addFavorite = addFavorite;
		vm.removeFromFavorites = removeFromFavorites;
		vm.isFavorite = isFavorite;
		vm.amIOwner = amIOwner;
		vm.removeEvent = removeEvent;
		vm.editEvent = editEvent;

		init();

		function init() {
			
		}

		function addFavorite() {
			EventService.addFavorite(vm.event);
			ToastService.show('Evento adicionado aos favoritos!');
		}

		function removeEvent() {
			EventService.removeEvent(vm.event);
			ToastService.show('Evento removido com sucesso!');
			$state.go('Logged');
		}

		function editEvent() {
			$state.go('EditEvent', { event: vm.event, id: vm.event.id });
		}

		function removeFromFavorites() {
			EventService.removeFavorite(vm.event);
			ToastService.show('Evento removido com sucesso!');
			$state.go('Logged');
		}

		function isFavorite() {
			return EventService.isFavorite(vm.event);
		}

		function amIOwner() {
			return !!vm.event.owner;
		}
	}
})();