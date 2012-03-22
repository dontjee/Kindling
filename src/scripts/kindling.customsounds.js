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
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/ea10c486-6c04-4178-acc2-77fe8295fce8/ShipItGood.mp3'},
		'yeahboi': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is pumped!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/71beda65-5ed7-490e-a623-06c109a8189c/YeaBoi!.mp3' },		
		'ohmygod': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> is flabbergasted!'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/e170db1a-b5f9-46a9-a818-71615f1ede31/OhMyGod.mp3' },
		'nicecatch': { html: '<a href="#"><img alt="Sound" height="12" src="/images/sound.png?1325201509" width="12" style="opacity:0.25;"/></a> dissapproves.'
				,  url: 'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/0aac7710-cdb8-46fb-89d3-c7ca78056cea/NiceCatch.mp3' }	
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
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/54f263bc-ce7f-460e-9856-a57ec7698fcc/Underwater.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/79b14fa6-3373-428e-a91b-b39abd118a97/Drowning.mp3'
	];
	
	var BROKEN_BUILD_ID_DISTINGUISHER = 'chromefire_broken_build_sound_';
	var BROKEN_BUILD_REG_EX = '^TeamBuild:\\s*([A-Za-z]+).*Failed$';
	var BROKEN_BUILD_SOUNDS = [
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/d73ce4c6-6838-430c-aea8-a0c199f20b2a/NoWammy.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/e97249bc-ed2b-4242-912b-feb6176c9020/BooHiss.mp3',
		'http://content.screencast.com/users/S.Schmerer/folders/Chromefire/media/087dbf9a-7316-4da1-b813-d6244789a430/StuffBreaking.mp3'
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
		appendSoundsToPage( BROKEN_BUILD_ID_DISTINGUISHER, BROKEN_BUILD_SOUNDS );
		
		setTimeout( function() { setAllCustomPlayCustomText($('#chat')); }, 10);
	};
	
	var playSoundIfAllowed = function (sound) {
		var muteButtonText = $('#toggle_sounds_link img').attr('alt');
		
		if ( muteButtonText.indexOf('on') !== -1 ){
			sound.play();
		}
	};
	
	var playRandomBuildFailSound = function () {
		var randomNum = Math.floor(Math.random()*BROKEN_BUILD_SOUNDS.length);
		var audioObj = document.getElementById(BROKEN_BUILD_ID_DISTINGUISHER + randomNum);
		
		playSoundIfAllowed(audioObj);
	};
	
	var playRandomCardTagSound = function () {
		var randomNum = Math.floor(Math.random()*CARD_TAG_SOUNDS.length);
		var audioObj = document.getElementById(CARDTAG_ID_DISTINGUISHER + randomNum);
		
		playSoundIfAllowed(audioObj);
		
		//var ss = SpreadsheetApp.openById("0AhJAvZCqoE6cdDZ0dnRMVlVjUjNqbVA4RThETmFLZFE");
		//var sheet = ss.getSheets()[0];
  
		//Get the range of cells that store employee data.
//		var employeeDataRange = ss.getRangeByName("employeeData");

		//For every row of employee data, generate an employee object.
	//	var employeeObjects = getRowsData(sheet, employeeDataRange);

	//	var thirdEmployee = employeeObjects[2];

	//	var stringToDisplay = "The third row is: " + thirdEmployee.firstName + " " + thirdEmployee.lastName;
	//	stringToDisplay += " (id #" + thirdEmployee.employeeId + ") working in the ";
	//	stringToDisplay += thirdEmployee.department + " department and with phone number ";
	//	stringToDisplay += thirdEmployee.phoneNumber;
		
	//	console.log(stringToDisplay);
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
				
		var brokenBuildRegEx = new RegExp( BROKEN_BUILD_REG_EX );
		var regExResult = brokenBuildRegEx.exec(messageBody);
		if (regExResult != null) {
		// TODO:
		// Could grab regExResult[1] if I want the team name of the build that failed
		// to do something specific with that instead of only a generic version
			playRandomBuildFailSound();
		}
		
		// Need to fix issue where if we are at the top of the log, if there is a CARDTAG/UNDERWATERTAG there, it plays again
		// HACK!! current fix is that the second call is going to be long, so we only consider it if it is
		// shorter than 250 characters
		// Also requires doing the upper and lower case checks
		if ( messageBody.toLowerCase().indexOf(COMMAND_CUSTOM_PLAY) === 0 ){
			playSelectedCustomSound( messageBody.toLowerCase() );
		}
		else if( messageBody.length < 250 ){
			if ( messageBody.indexOf(COMMAND_CARD_TAG) === 0 || messageBody.indexOf(COMMAND_CARD_TAG.toLowerCase()) === 0 ) {
				playRandomCardTagSound();
			}
			else if ( messageBody.indexOf(COMMAND_UNDERWATER_TAG) === 0 || messageBody.indexOf(COMMAND_UNDERWATER_TAG.toLowerCase()) === 0 ) {
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