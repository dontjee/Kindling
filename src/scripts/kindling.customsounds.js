(function () {
	'use strict';

	var CUSTOM_SOUNDS = {
		'stage': { html: '<img alt="Sound" height="12" src="/images/sound.png?1323390852" width="12" style="opacity:0.25;"/> is doing it stage!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/91023ea2-3f46-4999-b056-419560ad268c/DoItStage.mp3' },
		'drumroll': { html: '<img alt="Sound" height="12" src="/images/sound.png?1323390852" width="12" style="opacity:0.25;"/> is building anticipation'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/c3aea064-28d2-49b5-be99-850c223fb8d0/drumroll.mp3' },
		'goCloudTeam': { html: '<img alt="Sound" height="12" src="/images/sound.png?1323390852" width="12" style="opacity:0.25;"/> is encouraging the team!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/df99264e-ee30-4f53-ac05-542a16a3d0e9/GoGoCloud.mp3' },
		'crossFingers': { html: '<img alt="Sound" height="12" src="/images/sound.png?1323390852" width="12" style="opacity:0.25;"/> is crossing their fingers . . .'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/d9da30dc-24f0-4c37-bb04-c23f8f9fb0f8/HoldOnToYourButts.mp3' }
	};
	var COMMAND_CUSTOM_PLAY = '/customplay';
	
	var CARD_TAG_SOUNDS = [
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/a1525eda-d608-43e5-a9dd-05b4543360a6/MuchRejoicing.mp3'
	];
	var COMMAND_CARD_TAG = '#CARDTAG'
	var CARD_TAG_SOUND_LIST = [];
	
	var AUDIO_ID_DESTINGUISHER = 'chromefire_custom_sound_';
	var RANDOM_ID_DISTINGUISHER = 'chromefire_random_sound_';

	var setupSounds = function () {
		var customSoundKey;
		for (customSoundKey in CUSTOM_SOUNDS) {
			$(document.body).append('<audio id="' + AUDIO_ID_DESTINGUISHER + customSoundKey + '" preload="auto" autobuffer>\
				<source src="' + CUSTOM_SOUNDS[customSoundKey].url + '"/>\
			</audio>');
		}
		var randomSoundKey;
		for (randomSoundKey in CARD_TAG_SOUNDS) {
			$(document.body).append('<audio id="' + RANDOM_ID_DISTINGUISHER + randomSoundKey + '" preload="auto" autobuffer>\
				<source src="' + CARD_TAG_SOUNDS[randomSoundKey] + '"/>\
			</audio>');
		}
	};

	var playCustomSound = function (e, options, username, message) {
		if (!message) {
			return;
		}

		var messageBody = $(message).find('div.body').text();
		
		if (!messageBody) {
			return;
		}
		
		
		// Need to fix issue where if we are at the top of the log, if there is a CARDTAG there, it plays again
		// HACK!! current fix is that the second call is going to be long, so we only consider it if it is
		// shorter than 250 characters
		
		
		//if(messageBody == COMMAND_CARD_TAG) {
		//alert(messageBody);
		//alert(messageBody.length);
		if( messageBody.length < 250 && messageBody.indexOf(COMMAND_CARD_TAG) === 0 ) {
			var randomNum = Math.floor(Math.random()*CARD_TAG_SOUNDS.length);
			var audioObj = document.getElementById(RANDOM_ID_DISTINGUISHER + randomNum);
            //console.log(audioObj);
			//console.log(audioObj.source);
			audioObj.play();
			return;
		}
		
		var customSoundKey;
		for (customSoundKey in CUSTOM_SOUNDS) {
			if (messageBody.toLowerCase() == (COMMAND_CUSTOM_PLAY + ' ' + customSoundKey).toLowerCase() ) {
				$(message).find('div.body').html(CUSTOM_SOUNDS[customSoundKey].html);
				var audioObj = document.getElementById(AUDIO_ID_DESTINGUISHER + customSoundKey);
				//console.log(audioObj);
				//console.log(audioObj.source);
				audioObj.play();
				break;
			}
		}
	};

	$.subscribe('newMessage', playCustomSound);
	$.subscribe('loaded', setupSounds);
}());