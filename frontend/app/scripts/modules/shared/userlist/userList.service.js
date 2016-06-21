(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name angularNodeTokenAuthApp.alert
     * @description
     * # alert
     * Service in the angularNodeTokenAuthApp.
     */
    angular.module('angularNodeTokenAuthApp')
        .factory('userListApiService', userListApiService);

    userListApiService.$inject = ['$q', '$http', 'API_URL'];

    function userListApiService($q, $http, API_URL) {

        return {
            getAllUsers: getAllUsers,
            getuserByID : getuserByID,
            getUserIdByUserName : getUserIdByUserName
        };

        function getUserIdByUserName(user){
            var deferred = $q.defer();
            $http.post(API_URL + 'getUserIdByUserName/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function getuserByID(user){
            var deferred = $q.defer();
            $http.post(API_URL + 'getuserByID/', user).success(function(response) {

                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);

            });

            return deferred.promise;
        }

        function getAllUsers(user) {
            var deferred = $q.defer();
            $http.post(API_URL + 'getAllusers/', user).success(function(response) {

                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);

            });

            return deferred.promise;
        }
    }
}());
