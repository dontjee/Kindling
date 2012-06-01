kindling.module(function () {
	'use strict';

	function showHideElements(key, value) {
		var $chat = $('#chat-wrapper');
		if (value === 'false' && $chat.hasClass(key) === false) {
			$chat.addClass(key);
			kindling.scrollToBottom();
		} else if (value === 'true' && $chat.hasClass(key) === true) {
			$chat.removeClass(key);
			kindling.scrollToBottom();
		}
	}

	function showHidePublishMessages(value){
		var $chat = $('#chat-wrapper');
		var $rows = $chat.find('tr.user_624007');

		var selector = 'div.body:contains("TeamBuild:"), div.body:contains("-CreatePackage_")'
		var $buildbotPublishMessages = $rows.find(selector).parents('tr.user_624007');

		var key = 'noBuildbotPublish';
		if(value === 'false') {
			$buildbotPublishMessages.addClass(key);
		} else if(value === 'true') {
			$buildbotPublishMessages.removeClass(key);
		}
		kindling.scrollToBottom();
	}

	function filterMessages(e, options) {
		if (options) {
			showHideElements('noEnterRoom', options.enterRoom);
			showHidePublishMessages(options.buildbotPublish);
			showHideElements('noLeaveRoom', options.leaveRoom);
			showHideElements('noTimeStamp', options.timeStamps);
		}
	}

	return {
		init: function () {
			$.subscribe('optionsChanged', filterMessages);
		}
	};
}());
