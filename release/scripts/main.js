(function() {
	'use strict';

	angular.module('app', [
		'ui.router',
		'mobile-angular-ui'
	]);
})();
(function() {
	'use strict';

	angular
		.module('app')
		.config(ConfigRoutes);

	ConfigRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

	function ConfigRoutes($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state({
				name: 'Home',
				url: '/',
				templateUrl: 'app/initial/home.html',
				controller: 'HomeController',
				controllerAs: 'home',
				params: {
					ignore: false,
				}
			})

			.state({
				name: 'Logged',
				url: '/logged',
				templateUrl: 'app/logged/home.html',
				controller: 'LoggedHomeController',
				controllerAs: 'home',
				params: {
					ignore: false,
				},
				resolve: {
					events: ['EventService', (EventService) => EventService.list()]
				}
			})

			.state({
				name: 'EventDetails',
				url: '/event/details/:id',
				templateUrl: 'app/event/details.html',
				controller: 'EventDetailsController',
				controllerAs: 'eventCtrl',
				params: {
					event: null
				},
				resolve: {
					event: ['EventService', '$stateParams',
						(EventService, $stateParams) => EventService.get(+$stateParams.id)
					]
				}
			})

			.state({
				name: 'AddEvent',
				url: '/event/add',
				templateUrl: 'app/event/add.html',
				controller: 'EventAddController',
				controllerAs: 'eventCtrl',
			})

			.state({
				name: 'MyFavorites',
				url: '/event/favorites',
				templateUrl: 'app/logged/home.html',
				controller: 'LoggedHomeController',
				controllerAs: 'home',
				params: {
					event: null,
				},
				resolve: {
					events: ['EventService', (EventService) => EventService.listFavorites()]
				}
			});
	}
})();
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
			mockEvents.push(event);
			event.id = lastId++;
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
(function() {
'use strict';

	angular
		.module('app')
		.service('ToastService', ToastService);

	ToastService.$inject = [];
	function ToastService() {
		var service = {};

		service.show = showToast;

		return service;

		function showToast(message, time) {
			alert(message);
		}

	}
})();
(function() {
'use strict';

	angular
		.module('app')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$rootScope', '$state'];
	function NavbarController($rootScope, $state) {
		var vm = this;
		
		vm.goBack = goBack;
		vm.hasPreviousState = false;

		var stateStack = [];

		init();

		////////////////

		function init() {
			$rootScope.$on('$stateChangeSuccess', storeStates);
			if (stateStack.length === 0 && $state.current.name != 'Home') {
				stateStack.push({ name: 'Home' });
				vm.hasPreviousState = true;
			}
		}

		function storeStates(event, to, toParams, from, fromParams) {
			if (from && from.name && !toParams.ignore) {
				stateStack.push(from);
				vm.hasPreviousState = true;
			}
		}

		function goBack() {
			var state = stateStack.pop().name || "Home";
			if (stateStack.length === 0) {
				vm.hasPreviousState = false;
			}
			$state.go(state, { ignore: true });
		}

		function hasPreviousState() {
			return stateStack.length > 0;
		}
	}
})();
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

		init();

		function init() {
			
		}

		function addFavorite() {
			EventService.addFavorite(vm.event);
			ToastService.show('Evento adicionado aos favoritos!');
		}

		function removeFromFavorites() {
			EventService.removeFavorite(vm.event);
			ToastService.show('Evento removido com sucesso!');
		}

		function isFavorite() {
			console.log('ola');
			return EventService.isFavorite(vm.event);
		}
	}
})();
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