kindling.module(function () {
	'use strict';
	var currentOptions;

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

	function showPublishMessages($buildbotPublishMessages){
		var key = 'noBuildbotPublish';
		$('.buildbotTable').remove();
		$buildbotPublishMessages.removeClass(key);
		kindling.scrollToBottom();
	}

	function hidePublishMessages($buildbotPublishMessages){
		$('.buildbotTable').remove();

		var key = 'noBuildbotPublish';

		var $buildbotTableArea = $('<div>').addClass('buildbotTable');
		$buildbotTableArea.append($('<h3>').text('Build Messages:'));

		var $buildbotTableWrapper = $('<div>').addClass('buildbotTableWrapper');
		$buildbotTableArea.append($buildbotTableWrapper);

		var $buildbotTable = $('<table>').addClass('chat');
		$buildbotTableWrapper.append($buildbotTable);

		$.fn.reverse = [].reverse;
		var messageClones = $buildbotPublishMessages.clone().reverse();
		$buildbotTable.append(messageClones);
		$('#files').after($buildbotTableArea);

		$buildbotPublishMessages.addClass(key);
		
		kindling.scrollToBottom();
	}

	function handleWindowResize($buildbotPublishMessages){
		if($(window).height() > 580 && $(window).width() > 1100){
			hidePublishMessages($buildbotPublishMessages);
		} else {
			showPublishMessages($buildbotPublishMessages);
		}
	}

	function showHidePublishMessages(value){
		$(window).unbind('resize');

		var $chat = $('#chat-wrapper');
		var $rows = $chat.find('tr.user_624007');

		var selector = 'div.body:contains("TeamBuild:"), div.body:contains("-CreatePackage_")'
		var $buildbotPublishMessages = $rows.find(selector).parents('tr.user_624007');

		if(value === 'false') {
			var resizeTimer;
			$(window).resize(function(){
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(handleWindowResize, 100, $buildbotPublishMessages);
			});

			handleWindowResize($buildbotPublishMessages);
		} else if(value === 'true') {
			showPublishMessages($buildbotPublishMessages);
		}
	}

	function filterMessages(e, options) {
		if (options) {
			currentOptions = options;
			showHideElements('noEnterRoom', options.enterRoom);
			showHidePublishMessages(options.buildbotPublish);
			showHideElements('noLeaveRoom', options.leaveRoom);
			showHideElements('noTimeStamp', options.timeStamps);
		}
	}

	var newMessageTimer;
	function rehideBuildbotMessages() {
		clearTimeout(newMessageTimer);
		newMessageTimer = setTimeout(showHidePublishMessages, 100, currentOptions.buildbotPublish);
	}

	return {
		init: function () {
			$.subscribe('optionsChanged', filterMessages);
			$.subscribe('newMessage', rehideBuildbotMessages);
		}
	};
}());
