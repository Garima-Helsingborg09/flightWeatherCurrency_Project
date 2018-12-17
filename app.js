var app = angular.module("manmaApp",['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/flight.html',
            controller: 'flightCtrl'
        })
        .when('/weather', {
            templateUrl: 'templates/weather.html',
            controller: 'weatherCtrl'
        })
        .when('/currency', {
            templateUrl: 'templates/currency.html',
            controller: 'currencyCtrl'
        })
});