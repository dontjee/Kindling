(function () {
	'use strict';
	
	// Initialize all the sound lists and their commands
	var CUSTOM_ID_DESTINGUISHER = 'chromefire_custom_sound_';
	var COMMAND_CUSTOM_PLAY = '/customplay';
	var CUSTOM_SOUNDS = {
		'stage': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is doing it stage!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/91023ea2-3f46-4999-b056-419560ad268c/DoItStage.mp3' },				
		'drumroll': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is building anticipation'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/c3aea064-28d2-49b5-be99-850c223fb8d0/drumroll.mp3' },				
		'gocloudteam': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is encouraging the team!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/df99264e-ee30-4f53-ac05-542a16a3d0e9/GoGoCloud.mp3' },				
		'crossfingers': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is crossing their fingers . . .'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/d9da30dc-24f0-4c37-bb04-c23f8f9fb0f8/HoldOnToYourButts.mp3'},				
		'shipitgood': {html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> wants to ship properly!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/ea10c486-6c04-4178-acc2-77fe8295fce8/ShipItGood.mp3'}
	};
	
	var CARDTAG_ID_DISTINGUISHER = 'chromefire_cardtag_sound_';
	var COMMAND_CARD_TAG = '#CARDTAG';
	var CARD_TAG_SOUNDS = [
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/a1525eda-d608-43e5-a9dd-05b4543360a6/MuchRejoicing.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/d2b270f0-115d-4411-b179-f1a36477e7c2/Applause.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/3a727f46-360e-4dba-81b9-e2bfa6829d7f/SweetBerry.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/adec6342-3468-4b95-8658-8d1a4e04d777/MyBoy.mp3'
	];
	
	var UNDERWATERTAG_ID_DISTINGUISHER = 'chromefire_underwater_sound_';
	var COMMAND_UNDERWATER_TAG = '#UNDERWATER';
	var UNDERWATER_TAG_SOUNDS = [
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/54f263bc-ce7f-460e-9856-a57ec7698fcc/Underwater.mp3'
	];
	// End sound initialize
	
	var appendSoundsToPage = function ( idDistinguisher, soundArray ){
		var soundKey;
		for (soundKey in soundArray) {
			$(document.body).append('<audio id="' + idDistinguisher + soundKey + '" preload="auto" autobuffer>\
				<source src="' + soundArray[soundKey] + '"/>\
			</audio>');
		}
	};
	
	var setupSounds = function () {
		var customSoundKey;
		for (customSoundKey in CUSTOM_SOUNDS) {
			$(document.body).append('<audio id="' + CUSTOM_ID_DESTINGUISHER + customSoundKey + '" preload="auto" autobuffer>\
				<source src="' + CUSTOM_SOUNDS[customSoundKey].url + '"/>\
			</audio>');
		}
		
		appendSoundsToPage( CARDTAG_ID_DISTINGUISHER, CARD_TAG_SOUNDS );
		appendSoundsToPage( UNDERWATERTAG_ID_DISTINGUISHER, UNDERWATER_TAG_SOUNDS );
		
		setTimeout( function() { setAllCustomPlayCustomText($('#chat')); }, 10);
	};
	
	var playSoundIfAllowed = function (sound) {
		var muteButtonText = $('#toggle_sounds_link img').attr('alt');
		
		if ( muteButtonText.indexOf('on') !== -1 ){
			sound.play();
		}
	};
	
	var playRandomCardTagSound = function () {
		var randomNum = Math.floor(Math.random()*CARD_TAG_SOUNDS.length);
		var audioObj = document.getElementById(CARDTAG_ID_DISTINGUISHER + randomNum);
		
		playSoundIfAllowed(audioObj);
	};
	
	var playRandomUnderwaterTagSound = function () {
		var randomNum = Math.floor(Math.random()*UNDERWATER_TAG_SOUNDS.length);
		var audioObj = document.getElementById(UNDERWATERTAG_ID_DISTINGUISHER + randomNum);
		
		playSoundIfAllowed(audioObj);
	};
	
	var playSelectedCustomSound = function ( messageCommand ) {
		var customSoundKey;
		for (customSoundKey in CUSTOM_SOUNDS) {
			var currentCustomCommand = (COMMAND_CUSTOM_PLAY + ' ' + customSoundKey).toLowerCase();
			
			if (messageCommand == currentCustomCommand ) {
				var audioObj = document.getElementById(CUSTOM_ID_DESTINGUISHER + customSoundKey);
				playSoundIfAllowed(audioObj);
				break;
			}
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
		
		//console.log('Words');
		//alert(messageBody);
				
		// Need to fix issue where if we are at the top of the log, if there is a CARDTAG/UNDERWATERTAG there, it plays again
		// HACK!! current fix is that the second call is going to be long, so we only consider it if it is
		// shorter than 250 characters


		if ( messageBody.toLowerCase().indexOf(COMMAND_CUSTOM_PLAY) === 0 ){
			playSelectedCustomSound( messageBody.toLowerCase() );
		}
		else if( messageBody.length < 250 ){
			if ( messageBody.indexOf(COMMAND_CARD_TAG) === 0 ) {
				playRandomCardTagSound();
			}
			else if ( messageBody.indexOf(COMMAND_UNDERWATER_TAG) === 0 ) {
				playRandomUnderwaterTagSound();
			}
		}
		
		setAllCustomPlayCustomText( message );
	};
	
	var setAllCustomPlayCustomText = function ( message ) {		
		var pageBody = $(message).find('div.body');
		$.each(pageBody, function (index, value) {
			var bodyText = $(value).text();			
			var customSoundKey;
			for (customSoundKey in CUSTOM_SOUNDS) {
				var currentCustomCommand = (COMMAND_CUSTOM_PLAY + ' ' + customSoundKey).toLowerCase();
				
				if (bodyText == currentCustomCommand ) {	
					$(value).html(CUSTOM_SOUNDS[customSoundKey].html);
					$(value).parents('.text_message').removeClass('text_message').addClass('sound_message');					
					$(value).find('a').click(function(){ playSelectedCustomSound(bodyText); return false;});
				}
			}
		});
		
	};

	$.subscribe('newMessage', playCustomSound);
	$.subscribe('loaded', setupSounds);
}());