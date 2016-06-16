'use strict';

angular.module('angularNodeTokenAuthApp').factory('authToken', function($window) {
	var storage = $window.localStorage;
	var cachedToken, cachedUser;
	var userToken = 'userToken', loggedUser = 'user';

	var isAuthenticated = false;
	var authToken = {
		setToken : function(token, user) {
			cachedToken = token;
			cachedUser = user;
			storage.setItem(userToken, token);
			storage.setItem(loggedUser, JSON.stringify(user));
			isAuthenticated = true;
		},
		getToken : function() {
			if (!cachedToken)
				cachedToken = storage.getItem(userToken);

			return cachedToken;
		},
		getLoggedUser : function() {
			if (!cachedUser)
				cachedUser = JSON.parse(storage.getItem(loggedUser));

			return cachedUser;
		},
		isAuthenticated : function() {
			return !!authToken.getToken();
		},
		isAdmin : function(){
			var user = authToken.getLoggedUser();
			if(typeof user === 'string'){
				user = JSON.parse(user);
			}
			if(user.role_id === 1){
				return true;
			}else {
				return false;
			}
		},
		removeToken : function() {
			cachedToken = cachedUser = null;
			storage.removeItem(userToken);
			storage.removeItem(loggedUser);
			isAuthenticated = false;
		}
	};

	return authToken;
});
