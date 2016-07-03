(function() {

    'use strict';

    /**
     * @ngdoc overview
     * @name angularNodeTokenAuthApp
     * @description
     * # angularNodeTokenAuthApp
     *
     * Main module.config of the application.
     */
    angular.module('angularNodeTokenAuthApp').config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, API_URL) {

        $stateProvider.state('main', {
            url: '/',
            templateUrl: '/scripts/modules/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        }).state('register', {
            url: '/register',
            templateUrl: 'scripts/modules/users/register/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'ctrl'
        }).state('login', {
            url: '/login',
            templateUrl: '/scripts/modules/users/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'ctrl'
        }).state('logout', {
            url: '/logout',
            controller: 'LogoutCtrl',
            controllerAs: 'ctrl'
        }).state('forgotPassword', {
            url: '/forgotPassword',
            templateUrl: '/scripts/modules/users/forgotPassword/forgotPassword.html',
            controller: 'forgotPasswordCtrl',
            controllerAs: 'ctrl'
        })

        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: '/scripts/modules/admin/admin.html'
        }).state('admin.config', {
            url: '/config',
            templateUrl: '/scripts/modules/admin/details.html',
            controller: 'adminCtrl',
            controllerAs: 'ctrl'
        }).state('admin.applications', {
            url: '/applications',
            templateUrl: '/scripts/modules/applications/applications.html',
            controller: 'applicationsCtrl',
            controllerAs: 'ctrl',
            params: {
                app_id: null
            }
        }).state('admin.roles', {
            url: '/roles',
            templateUrl: '/scripts/modules/roles/roles.html',
            controller: 'rolesCtrl',
            controllerAs: 'ctrl',
            params: {
                role_id: null
            }
        }).state('appDetails', {
            url: '/appDetails',
            templateUrl: '/scripts/modules/shared/applist/appDetails.html',
            controller: 'appDetailsCtrl',
            controllerAs: 'ctrl',
            params: {
                app_id: null
            }
        }).state('admin.updateUser', {
            url: '/updateuser',
            templateUrl: '/scripts/modules/shared/userlist/updateUser.html',
            controller: 'updateUserCtrl',
            params: {
                username: null
            },
            controllerAs: 'ctrl'
        });
        $httpProvider.interceptors.push('authInterceptor');
        $urlRouterProvider.otherwise('/login');

    }).constant('API_URL', 'http://localhost:6050/api/');

}());
