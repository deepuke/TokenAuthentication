(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name angularNodeTokenAuthApp.alert
     * @description
     * # alert
     * Service in the angularNodeTokenAuthApp.
     */
    angular.module('angularNodeTokenAuthApp').factory('applicationApiServices', applicationApiServices);

    applicationApiServices.$inject = ['$q', '$http', 'API_URL'];

    function applicationApiServices($q, $http, API_URL) {

        return {
            addApplication: addApplication,
            // getAllApps: getAllApps,
            getApps: getApps
        };

        function addApplication(application) {
            var deferred = $q.defer();
            $http.post(API_URL + 'addApplication/', application).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        // function getAllApps(user) {
        //     var deferred = $q.defer();
        //     $http.post(API_URL + 'getAllApps/', user).success(function(response) {
        //         deferred.resolve(response);
        //     }).error(function(error) {
        //         deferred.reject(error);
        //     });
        //     return deferred.promise;
        // }

        function getApps(user) {
            var deferred = $q.defer();
            $http.get(API_URL + 'getApps/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    }

})();
