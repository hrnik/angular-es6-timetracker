/**
 * Сервис хранения тасков в localStorage
 */
class TaskArchiveService {
	/**
	 * Создает новый экземпляр сервиса
	 *
	 * @constructor
	 * @param $rootScope
	 */
	constructor($rootScope) {
		this.$rootScope = $rootScope;
	}

	/**
	 * Получает данные таски из localStorage
	 *
	 * @returns {array}
	 */
	getTaskList() {
		return localStorage.allTask ? angular.fromJson(localStorage.allTask) : [];
	}

	/**
	 * Обновляет таск в localStorage
	 *
	 * @param task
	 */
	updateTask(task) {

		var tasks = this.getTaskList();

		tasks.forEach((item, index, array)=> {
			if (item.id === task.id) {
				array[index] = task;
			}
		});

		this.saveList(tasks);
		//Кидаем событие, о том что таск обновился
		this.$rootScope.$broadcast('task:update');
	}

	/**
	 * Добавляет таск в localStorage
	 *
	 * @param task
	 */
	addTask(task) {
		//Высчисляем id таска
		var id = localStorage.countTask ? localStorage.countTask : 0;
		var tasks = this.getTaskList();
		var newId = ++id;
		localStorage.countTask = newId;
		task.id = newId;
		tasks.push(task);
		this.saveList(tasks);
		//Кидаем событие, о том что таск обновился
		this.$rootScope.$broadcast('task:added', task);
	}

	/**
	 * Удаляем таск из хранилища
	 *
	 * @param task
	 */
	removeTask(task){
		var tasks = this.getTaskList();
		tasks = tasks.filter((item)=>item.id!==task.id);
		this.saveList(tasks);
	}

	/**
	 * Сохраняем все таски в localStorage
	 *
	 * @param tasks
	 */
	saveList(tasks){
		localStorage.allTask = angular.toJson(tasks);
	}

}


export {TaskArchiveService	}
