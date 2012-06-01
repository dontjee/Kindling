var kindling = kindling || (function (domReady) {
	'use strict';

	function regExpEscape(text) {
		var regex = new RegExp('[.*+?|()\\[\\]{}\\\\]', 'g');
		return text.replace(regex, '\\$&');
	}

	return {
		getUsernameRegex: function (username) {
			var escapedUsername = regExpEscape(username);
			return new RegExp('\\b(' + escapedUsername + '|' + escapedUsername.split(' ').join('|') + ')\\b', 'i');
		},

		getDomain: function (url) {
			var regex = new RegExp('(chrome-extension|https?):\/\/(.[^/]+)');
			var match = url.match(regex);
			return match ? match[0] : '';
		},

		scrollToBottom : function () {
			var pageHeight = Math.max(document.documentElement.offsetHeight, document.body.scrollHeight);
			var targetY = pageHeight + window.innerHeight + 100;
			window.scrollTo(0, targetY);
			var buildbotDiv = $('.buildbotTableWrapper');
			if( buildbotDiv.length){
				buildbotDiv.scrollTop(buildbotDiv[0].scrollHeight);
			}
		},

		module: function (m) {
			if (m.init) {
				domReady(function () {
					m.init();
				});
			}
			return m;
		}
	};
}(window.$ || function (f) { f(); }));
