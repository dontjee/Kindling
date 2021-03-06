kindling.module(function () {
	'use strict';

	var SOUNDS = {
		'56k': '/play 56k',
		'Bueller?': '/play bueller',
		'Crickets chirping': '/play crickets',
		'Cross fingers': '/customplay crossfingers',
		'Danger zone': '/play dangerzone',
		'Do it live!': '/play live',
		'Do it stage!': '/customplay stage',
		'Drumroll': '/customplay drumroll',
		'Drama': '/play drama',
		'Go Cloud Team!': '/customplay gocloudteam',
		'Great job': '/play greatjob',
		'Horn': '/play horn',
		'Kenny Loggins': '/play loggins',
		'Nice Catch': '/customplay nicecatch',
		'Noooo': '/play noooo',
		'Nyan cat': '/play nyan',
		'Oh my': '/play ohmy',
		'OMG': '/customplay ohmygod',
		'Oh yeah': '/play ohyeah',
		'Push it': '/play pushit',
		'Rimshot': '/play rimshot',
		'Saxaphone': '/play sax',
		'Sad trombone': '/play trombone',
		'Secret area': '/play secret',
		'Ship It Good!': '/customplay shipitgood',
		'Ta-da!' : '/play tada',
		'The horror': '/play horror',
		'The More You Know': '/play tmyk',
		'YeahBoi!' : '/customplay yeahboi',
		'Vuvuzela': '/play vuvuzela',
		'Yeeeaaah!': '/play yeah',
		'Yodel': '/play yodel'
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
