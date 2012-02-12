kindling.module(function () {
	'use strict';

	var currentColorIndex = 0;
	var usernameColorMap = {};
	var colors = 
		['blue', 'blueviolet', 'saddlebrown',
		'orangered', 'darkgreen', 'darkred',
		'clornflowerblue', 'crimson', 'black',
		'lawngreen', 'chocolate', 'darkmagenta',
		'darkcyan', 'chartreuse', 'cadetblue',
		'coral', 'fuchsia', 'dimgray', 'lime',
		'darkslategray', 'goldenrod', 'cyan',
		'lightpink', 'lightseagreen', 'indigo',
		'midnightblue', 'lightslategray', 'lightcyan'];
				
	function getUsernameColor(username, options) {
		if (options.colorNames !== 'true') {
			return 'black';
		}
		
		if (!usernameColorMap[username]) {
				usernameColorMap[username] = colors[currentColorIndex];
				currentColorIndex = (currentColorIndex + 1) % colors.length;
		}
		return usernameColorMap[username];
    }
	
	var colorAllUsernames = function (e, options) {
		$('td.person span,.inline-author').each(function(i, elem) {
				elem.style.color = getUsernameColor(elem.innerHTML, options);
		});
	};
	
	var colorUsername = function (e, options, username, message) {
		var $author = $(message).find('.author:first');
		$author.css('color', getUsernameColor($author.text(), options));
	}
	
	return {
		init: function () {
			$.subscribe('optionsChanged', colorAllUsernames);
			$.subscribe('newMessage', colorUsername);
		}
	};
}());
