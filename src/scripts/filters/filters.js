/**
 * Класс фильтров
 */
class Filters {
	constructor() {

	}

	/**
	 * Фильтр пускающий массив в обратном направлении
	 */
	static reverse() {
		return function (input) {
			return input.slice().reverse();
		};
	}

	/**
	 * Фильтр, показывающий читаемое время, на основе секунд
	 * @returns {Function}
	 */
	static time() {
		return function (input) {
			var seconds = Math.floor(input % 60);
			var minutes = Math.floor((input / 60) % 60);
			var hours = Math.floor((input / 3600) % 24);
			var days = Math.floor((input / 3600) / 24);
			var response = '';

			if(days) {
				response += days  + ' дн. ';
			}
			if(hours || days ){
				response += hours + ' ч. ';
			}
			if(minutes || hours  || days){
				response += minutes + ' мин. ';
			}
			response += seconds + ' c.';

			return response;
		};
	}
}

export {Filters}