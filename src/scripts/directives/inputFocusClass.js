/**
 * Директива для добавляени input-у css класа, в зависисомти от фокуса, и значение input-а
 */
class InputFocusClass {

	constructor() {
		this.restrict = 'A'
	}

	link(scope, element, attrs) {
		var parent = element.parent(),
			className = 'input--filled';

		//на элемент наводится фокус, добавляем класс
		element.on('focus', function () {
			parent.addClass(className);
		});

		//с элемента убирается фокус, убираем класс
		element.on('blur', function () {
			if (element.val().trim() === '') {
				parent.removeClass(className);
			}
		});

		//следим за значением элемента, и если его значение пустое, удаляем класс, а если что-то есть, то добавляем класс
		scope.$watch(function () {
			return element.val();
		}, function (value) {
			if(value.trim() === ''){
				parent.removeClass(className);
			} else if(!parent.hasClass(className)) {
				parent.addClass(className);
			}
		});
	}

	static directiveFactory(){
		return new InputFocusClass();
	}
}

export {InputFocusClass}