(function() {
'use strict';

	angular
		.module('app')
		.service('EventService', EventService);

	EventService.$inject = [];
	function EventService() {

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
				preco: '5,50',
				descricao: 'Festa muito doida com muita lama!',
				pontosVenda: 'Cantina da ema',
			},
			{ 
				id: 3,
				nome: 'MC Claudinho',
				local: 'Lavras',
				data: '21/05/2017',
				preco: '15,50',
				descricao: 'Festa muito louca!',
				pontosVenda: 'Jardim do jacaré banguelo',
			},
			{
				id: 4,
				nome: "Festa no Apê",
				local: "Pouso Alegre",
				data: "22/08/2017",
				preco: "34,50",
				descricao: "Meus pais viajaram, vamos fazer uma festa no apê deles!",
				pontosVenda: "Autoposto Fernandão"
			},
			{
				id: 5,
				nome: "Boliche",
				local: "São Paulo",
				data: "28/02/2017",
				preco: "79,99",
				descricao: "Bora jogar boliche!",
				pontosVenda: "Boliche de SP"
			},
			{
				id: 6,
				nome: "Rodada de Cerveja do DCC",
				local: "Rep. Mamacadela",
				data: "01/03/2017",
				preco: "25,00",
				descricao: "Esquenta pra volta das aulas do DCC depois do carnaval!",
				pontosVenda: "Cantina da UFLA"
			}
		];
		var lastId = mockEvents.length + 1;
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