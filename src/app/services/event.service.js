(function() {
'use strict';

	angular
		.module('app')
		.service('EventService', EventService);

	EventService.$inject = [];
	function EventService() {
		var lastId = 4;

		var mockEvents = [
			{ 
				id: 1,
				nome: 'Mega show de sertanejo',
				local: 'Lavras',
				data: '21/05/2018',
				preco: '12,50',
				descricao: 'Festa muito doida!',
				pontosVenda: 'Paulinho do café',
			},
			{ 
				id: 2,
				nome: 'Ranxeira',
				local: 'Lavras',
				data: '21/05/2018',
				preco: '12,50',
				descricao: 'Festa muito doida!',
				pontosVenda: 'Cantina da ema',
			},
			{ 
				id: 3,
				nome: 'MC Claudinho',
				local: 'Lavras',
				data: '21/05/2018',
				preco: '12,50',
				descricao: 'Festa muito doida!',
				pontosVenda: 'Jardim do jacaré banguelo',
			},
		];
		var favorites = [];

		var service = {};

		service.list = listEvents;
		service.get = getEvent;
		service.add = addEvent;

		service.addFavorite = addFavorite;
		service.removeFavorite = removeFavorite;
		service.listFavorites = listFavorites;
		service.isFavorite = isFavorite;
		service.removeEvent = removeEvent;

		return service;

		function listEvents() {
			return mockEvents;
		}
		
		function getEvent(id) {
			for (let event of mockEvents) {
				if (event.id === id) {
					return event;
				}
			}
			return null;
		}

		function addEvent(event) {
			event.owner = true;
			mockEvents.push(event);
			event.id = lastId++;
		}

		function removeEvent(event) {
			mockEvents.splice(mockEvents.indexOf(event), 1);
			let indexFav = favorites.indexOf(event);
			if (indexFav >= 0)
				favorites.splice(indexFav, 1);
		}

		function addFavorite(event) {
			favorites.push(event);
		}

		function listFavorites() {
			return favorites;
		}

		function removeFavorite(event) {
			favorites.splice(favorites.indexOf(event), 1);
		}

		function isFavorite(event) {
			return favorites.indexOf(event) >= 0;
		}
	}
})();