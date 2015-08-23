/**
 * Контроллер добавления таска
 */
class TaskController {
    /**
     * Создает новый экземпляр контроллера
     * @constructor
     * @param taskService
     * @param taskArchiveService
     */
    constructor(taskService, taskArchiveService) {
        this.task = taskService.createTask();
        this.taskService = taskService;
        this.taskArchiveService = taskArchiveService;
    }

    /**
     * Запускает таск
     */
    start(){
        this.task.start();
    }

    /**
     * Останавливает таск, сохраняет его, и инициализиурет новый таск
     */
    stop(){
        this.task.stop();
        this.taskArchiveService.addTask(this.task);
        this.task  = this.taskService.createTask();
    }

  }


export {TaskController}
