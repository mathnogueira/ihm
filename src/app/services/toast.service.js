(function() {
'use strict';

	angular
		.module('app')
		.service('ToastService', ToastService);

	ToastService.$inject = ['toastr'];
	function ToastService(toastr) {
		var service = {};

		service.show = showToast;

		return service;

		function showToast(message, time) {
			toastr.success(message);
		}

	}
})();