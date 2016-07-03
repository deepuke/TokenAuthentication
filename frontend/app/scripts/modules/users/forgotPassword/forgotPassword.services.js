(function(){
    'use strict';

    angular.module('angularNodeTokenAuthApp').factory('forgotPasswordService', forgotPasswordService);

    forgotPasswordService.$inject = ['$q', '$http', 'API_URL'];

    function forgotPasswordService($q, $http, API_URL){
        return {
            sendEmail : sendEmail,
            changePassword : changePassword
        };

        function sendEmail(user){
            var deferred = $q.defer();
            $http.post(API_URL + 'sendEmail/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function changePassword(user){
            var deferred = $q.defer();
            $http.post(API_URL + 'changePassword/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }

})();
