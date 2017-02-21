(function() {
	'use strict';

	angular.module('app', [
		'ui.router',
		'mobile-angular-ui',
		'ngAnimate',
		'toastr'
	])

	.config(ToastrConfig);

	ToastrConfig.$inject = ['toastrConfig'];
	function ToastrConfig(toastrConfig) {
		angular.extend(toastrConfig, {
			positionClass: 'toast-top-center',
		});
	}
})();