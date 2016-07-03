(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('forgotPasswordCtrl', forgotPasswordController);

    forgotPasswordController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$state', 'forgotPasswordService'];

    function forgotPasswordController($scope, $log, $rootScope, alert, $state, forgotPasswordService) {
        var _self = this;
        this.emailSubmit = emailSubmit;
        this.isEmailVerified = false;
        this.changePassword = changePassword;
        this.email_id = '';
        this.verification_code = '';
        this.password = '';
        this.password_confirm = '';

        init();

        function init() {
            console.log('forgotPasswordCtrl initiated');
        }

        function emailSubmit() {
            var user = {
                email_id: this.email_id
            };
            forgotPasswordService.sendEmail(user).then(function(response) {
                _self.isEmailVerified = true;
                alert('sucess', 'Email Verification!', response.Message);
            }).catch(function(error) {
                _self.isEmailVerified = false;
                alert('warning', ' Email Verification!', error.Message);
            });
        }

        function changePassword() {
            var user = {
                email_id: _self.email_id,
                password: _self.password,
                verification_code: _self.verification_code
            };
            console.log(user);
            if (_self.password != _self.password_confirm) {
                alert('danger', 'Oops!', 'Your password doesn\'t match!');
                return false;
            }

            forgotPasswordService.changePassword(user).then(function(response) {
                alert('sucess', 'Password Change', response.Message);
                $state.go('login');
            }).catch(function(error) {
                alert('warning', 'Password Change', error.Message);
            });

        }
    }

})();
