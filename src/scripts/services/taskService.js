/**
 * Сервис, предоставляющий логику по работае с сущностью таска
 */
class TaskService {
	/**
	 * Создает новый экземпляр сервиса
	 *
	 * @constructor
	 * @param $interval
	 * @param taskArchiveService
	 * @param description
	 * @param time
	 * @param status
	 * @param rate
	 * @param id
	 */
	constructor($interval, taskArchiveService, {description = '', time = 0, status = 'begin', rate, id} = {}) {
		this.id = id;
		this.description = description;
		this.time = time;
		this.rate = rate;
		this.status = status;
		this.$interval = $interval;
		this.taskArchiveService = taskArchiveService;
		this.stopTimer;
	}

	/**
	 * Создает и возвращает новый экземпляр сервиса
	 *
	 * @param obj
	 */
	createTask(obj = {}){
			return new TaskService( this.$interval, this.taskArchiveService, obj);
	}

	/**
	 * Запускает таск
	 *
	 * @returns {TaskService}
	 */
	start(){
		this.status = 'run';
		this.stopTimer = this.$interval(()=>{
			this.time +=1;
		},1000);
		return this;
	}

	/**
	 * Останавливает таск
	 * @returns {TaskService}
	 */
	stop(){
		this.status = 'end';
		this.$interval.cancel(this.stopTimer);
		return this;
	}

	/**
	 * Обновляет таск
	 *
	 * @returns {TaskService}
	 */
	update(){
		this.taskArchiveService.updateTask(this);
		return this;
	}

	/**
	 * Удаляет таск
	 *
	 * @returns {TaskService}
	 */
	remove(){
		this.taskArchiveService.removeTask(this);
		return this;
	}

	/**
	 * Вычилсяет стоимость
	 *
	 * @returns {number}
	 */
	getPrice(){
		return Math.floor((this.time*this.rate)/3600);
	}

}


export {TaskService}
