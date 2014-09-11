var app = angular.module('teg', ['ngRoute']).config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'TegController'
        })
});