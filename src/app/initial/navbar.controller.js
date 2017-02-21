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
		vm.currentPage = null;

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
			console.log(toParams);
			if (toParams && toParams.pageName) {
				vm.currentPage = {
					state: to.name,
					name: toParams.pageName
				};
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