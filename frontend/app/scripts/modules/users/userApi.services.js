( function() {
		'use strict';

		/**
		 * @ngdoc service
		 * @name angularNodeTokenAuthApp.alert
		 * @description
		 * # alert
		 * Service in the angularNodeTokenAuthApp.
		 */
		angular.module('angularNodeTokenAuthApp').factory('userApiService', userApiService);

		userApiService.$inject = ['$q', '$http', 'API_URL'];

		function userApiService($q, $http, API_URL) {

			return {
				getUser : getUser,
				saveUser : saveUser,
				login : login,
				getAllUsers : getAllUsers,
				updateUser : updateUser,
				getuserByEmail : getuserByEmail
			};

			function updateUser(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'updateUser/', user).success(function(response) {
					deferred.resolve(response);
				}).error(function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			}

			function getUser(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'getusers/', user).success(function(response) {

					deferred.resolve(response);

				}).error(function(error) {
					deferred.reject(error);

				});

				return deferred.promise;
			}

			function getuserByEmail(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'getuserByEmail/', user).success(function(response) {

					deferred.resolve(response);

				}).error(function(error) {
					deferred.reject(error);

				});

				return deferred.promise;
			}

			function getAllUsers(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'getusers/', user).success(function(response) {

					deferred.resolve(response);

				}).error(function(error) {
					deferred.reject(error);

				});

				return deferred.promise;
			}

			function saveUser(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'user/', user).success(function(response) {
					deferred.resolve(response);

				}).error(function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}

			function login(user) {
				var deferred = $q.defer();
				$http.post(API_URL + 'login/', user).success(function(response) {
					deferred.resolve(response);

				}).error(function(error) {
					deferred.reject(error);

				});

				return deferred.promise;
			}

		}

	}());
