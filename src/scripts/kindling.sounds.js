kindling.module(function () {
	'use strict';

	var SOUNDS = {
		'Bueller?': '/play bueller',
		'Crickets chirping': '/play crickets',
		'Cross fingers': '/customplay crossfingers',
		'Do it live!': '/play live',
		'Do it stage!': '/customplay stage',
		'Drumroll': '/customplay drumroll',
		'Drama': '/play drama',
		'Go Cloud Team!': '/customplay gocloudteam',
		'Great job': '/play greatjob',
		'Nice Catch': '/customplay nicecatch',
		'Nyan cat': '/play nyan',
		'Oh my': '/play ohmy',
		'OMG': '/customplay ohmygod',
		'Oh yeah': '/play ohyeah',
		'Push it': '/play pushit',
		'Rimshot': '/play rimshot',
		'Sad trombone': '/play trombone',
		'Secret area': '/play secret',
		'Ship It Good!': '/customplay shipitgood',
		'Ta-da!' : '/play tada',
		'The More You Know': '/play tmyk',
		'YeahBoi!' : '/customplay yeahboi',
		'Yeeeaaah!': '/play yeah',
		'Vuvuzela': '/play vuvuzela'
	};

	var MENU_ID = 'soundButton-wrapper';

	function displayMenu() {
		if (document.getElementById(MENU_ID)) {
			return;
		}
		$('#chat_controls').append('<div id="' + MENU_ID + '" class="tooltip">\
				<img id="soundButton" title="' + chrome.i18n.getMessage('soundMenuTooltip') + '" src="' + chrome.extension.getURL('img/sound.gif') + '" width="18" height="15" />\
				<span id="soundContainer" class="tooltip-inner"></span>\
		</div>');

		var $soundButton = $('#soundButton');
		var $soundContainer = $('#soundContainer');
		var sound;
		for (sound in SOUNDS) {
			$soundContainer.append('<a class="sound" data-value="' + SOUNDS[sound] + '">' + sound + '</a>');
		}

		$(document).click(function (e) {
			if (e.target.id !== 'soundButton' && $soundButton.find(e.target).length === 0) {
				$soundContainer.hide();
			} else {
				$soundContainer.toggle();
			}
		});

		$soundContainer.children('.sound').click(function () {
			var input = document.getElementById('input');
			var oldValue = input.value;
			input.value = this.getAttribute('data-value');
			document.getElementById('send').click();
			input.value = oldValue;
		});
	}

	function onOptionsChanged(e, options) {
		if (options.soundAndEmojiMenus === 'true') {
			displayMenu();
		} else {
			$('#' + MENU_ID).remove();
		}
	}

	return {
		init: function () {
			$.subscribe('optionsChanged', onOptionsChanged);
		}
	};
}());
