import {TaskController} from './scripts/controllers/taskController';
import {TaskListController} from './scripts/controllers/taskListController';
import {TaskArchiveService} from './scripts/services/taskArchiveService';
import {TaskService} from './scripts/services/taskService';
import {InputFocusClass} from './scripts/directives/inputFocusClass';
import {Filters} from './scripts/filters/filters';

//подключаемые модули
var angular = require('angular');
require('angular-ui-router');
require('angular-animate');

//Иницализируем ангуляровский модуль
angular.module('timeTracker', ['ui.router','ngAnimate'])
	.controller('taskController', ['taskService', 'taskArchiveService', TaskController])
	.controller('taskListController', ['$scope', 'taskArchiveService', 'taskService', TaskListController])
	.service('taskService', ['$interval', 'taskArchiveService', TaskService])
	.service('taskArchiveService', ['$rootScope', TaskArchiveService])
	.directive('inputFocusClass', [InputFocusClass.directiveFactory])
	.filter('reverse', [Filters.reverse])
	.filter('time', [Filters.time])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url:'/',
				views:{
					'addTask':{
						templateUrl: 'src/templates/addTask.html',
						controller: 'taskController',
						controllerAs: 'taskCtrl'
					},
					'listTask':{
						templateUrl: 'src/templates/listTask.html',
						controller: 'taskListController',
						controllerAs: 'taskListCtrl'
					}
				}

			})
	}]);
