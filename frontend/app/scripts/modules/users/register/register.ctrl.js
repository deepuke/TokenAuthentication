(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:RegisterCtrl
     * @description
     * # RegisterCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp').controller('RegisterCtrl', RegisterController);

    RegisterController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'authToken', '$auth', 'userApiService'];

    function RegisterController($scope, $log, $rootScope, alert, $http, $state, authToken, $auth, userApiService) {
        var _self = this;
        this.verificationFlag = false;
        this.saveUser = saveUser;

        this.user = {
            username: '',
            email_id: '',
            password: '',
            password_confirm: '',
            address: '',
            zipcode: null,
            companyname: '',
            verification_code:null
        };


        init();


        function init() {
            console.log('Registration controller loaded');
        }


        function getUser() {
            userApiService.getUser(_self.user).then(function(response) {

                console.log(response);
                if (!response.Users.length) {
                    verifyEmailID();
                    //saveUser(user);
                } else {
                    alert('warning', 'Oops!', 'Couldn\'t register, User name already exist');
                }
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function verifyEmailID() {
            userApiService.sendEmail(_self.user).then(function(response) {
                alert('sucess', 'Email Verification!', response.Message);
                _self.verificationFlag = true;
            }).catch(function(error) {
                alert('warning', ' Email Verification!', error);
                _self.verificationFlag = false;
            });
        }

        function saveUser() {

            userApiService.saveUser(_self.user).then(function(response) {
                if (response.token) {
                    _self.user.username = '';
                    _self.user.email_id = '';
                    _self.user.password = '';
                    _self.user.password_confirm = '';
                    _self.user.address = '';
                    _self.user.zipcode = null;
                    _self.user.companyname = '';
                    _self.user.verification_code = null;

                    alert('sucess', 'User Registration!', 'sucessfully completed');
                    //authToken.setToken(response.token, response.user);
                    $state.go('login');
                }
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }


        _self.submit = function() {
            console.log(_self.user);
            if (_self.user.password != _self.user.password_confirm) {
                alert('danger', 'Oops!', 'Your password doesn\'t match!');
                return false;
            }
            getUser();
        };
    }

}());
