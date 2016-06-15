(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name angularNodeTokenAuthApp.alert
     * @description
     * # alert
     * Service in the angularNodeTokenAuthApp.
     */
    angular.module('angularNodeTokenAuthApp')
    .factory('modalPopupApiService', modalPopupApiService);

    modalPopupApiService.$inject = ['$q', '$http'];

    function modalPopupApiService($q, $http) {
        var url = 'http://localhost:3000/api';
        return {

        };
    }
}());
