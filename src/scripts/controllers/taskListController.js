/**
 * Контроллер отображения списка тасков
 */
class TaskListController {
	/**
	 * Создает новый экземпляр контроллера
	 *
	 * @constructor
	 * @param $scope
	 * @param taskArchiveService
	 * @param taskService
	 */
	constructor($scope, taskArchiveService, taskService) {
		this.taskArchiveService = taskArchiveService;
		this.taskService = taskService;
		this.getTaskList();

		//Если произошло добавления таска, в localStorage, добавляем его в массив
		$scope.$on('task:added', (e, task)=>this.tasks.push(task));
	}

	/**
	 * Получаем все таски из localStorage
	 */
	getTaskList() {
		var taskData = this.taskArchiveService.getTaskList();
		this.tasks = taskData.map((item)=>this.taskService.createTask(item));
	}

	/**
	 * Удаляем таск из отображаемого массива и из хранилища
	 * @param task
	 */
	removeTask(task) {
		this.tasks.splice(this.tasks.indexOf(task), 1);
		task.remove();
	}

	/**
	 * Получаем все время, затраченное на таски
	 * @returns {int}
	 */
	getAllTime() {
		return this.tasks.reduce((prev, task)=> {
			return prev + task.time
		}, 0);
	}

	/**
	 * Получаем всю прибыль, за все таски
	 * @returns {int}
	 */
	getAllPrice() {
		return this.tasks.reduce((prev, task)=> {
			return prev + task.getPrice()
		}, 0);
	}


}


export {TaskListController}
