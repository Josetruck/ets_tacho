// Copyright (c) Stoneridge Electronics AB 2007 - All rights reserved

//is undefined in dev/ 
if(typeof(STONE) === "undefined") {
	STONE = {};
}
STONE.languages = {};
STONE.currentLanguage = null;

/**
 * Load current language based on web browser language or lang url parameter
 *
 * @param {function} onSuccess function called on language load success.
 */
function loadLanguage(onSuccess) {
	if(!STONE.currentLanguage)  {
		STONE.currentLanguage = getlanguage();
	}
	
	//switch to en if user lang is not supported.
	var inArray = false;
	$.each(STONE.i18nLang, function(index, item) {
		if(item && item.code === STONE.currentLanguage) {
			inArray = true;
			return false;//cancel each
		}
	});
	if(!inArray) {
		STONE.currentLanguage = "en";
	}

	
	if(STONE.selectedLanguage !== STONE.currentLanguage) {
		var config = {"id":"lang_" + STONE.currentLanguage, "config": "language"};
		loadboot("js/i18n/languages_"+STONE.currentLanguage+".json", config, function() {
			STONE.selectedLanguage = STONE.currentLanguage;
			if(onSuccess) {
				onSuccess();
			}
		});
	}
	
}
loadLanguage();

/**
 * Get text from current language binded to the key 
 *
 * @param {string} key 
 * @return {string} text in current language
 */
function _(key) {
	var text = STONE.languages[key];
	if(!text) {
		log("i18n fail load key: {0} text: {1}".format(key, text));
		return key;
	}
	return text;
}

function url(){
	return window.location.href;
}

/**
 * Get parameter value from url
 *
 * @param {string} name 
 * @return {string} parameter value
 */
function urlParam(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url());
	if(results) {
		return results[1] || 0; 
	}
	return null;
}

/**
 * Get locale code for current browser 
 *
 * @return {string} locale code
 */
function getlanguage() {
	//override browser language.
	var lang = urlParam("lang");
	if(lang) {
		return lang;
	}
	
	return navigator.language ? navigator.language : navigator.userLanguage; // IE
}