// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'forceng', 'starter.controllers'])

    .run(function ($ionicPlatform, $state, force) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // Get reference to Salesforce OAuth plugin
            var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");

            // Authenticate
            oauthPlugin.getAuthCredentials(
                function (creds) {
                    console.log(JSON.stringify(creds));
                    // Initialize ForceJS
                    force.init({accessToken: creds.accessToken, instanceURL: creds.instanceUrl, refreshToken: creds.refreshToken});
                    $state.go('app.contactlist');
                },
                function (error) {
                    console.log(error);
                }
            );

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('app.contactlist', {
                url: "/contactlist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contact-list.html",
                        controller: 'ContactListCtrl'
                    }
                }
            })

            .state('app.contact', {
                url: "/contacts/:contactId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contact.html",
                        controller: 'ContactCtrl'
                    }
                }
            })

            .state('app.accountlist', {
                url: "/accountlist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account-list.html",
                        controller: 'AccountListCtrl'
                    }
                }
            })

            .state('app.account', {
                url: "/accounts/:accountId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account.html",
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
//        $urlRouterProvider.otherwise('/app/playlists');
    });

