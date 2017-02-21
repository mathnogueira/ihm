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