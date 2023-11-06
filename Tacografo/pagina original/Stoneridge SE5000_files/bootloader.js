// Copyright (c) Stoneridge Electronics AB 2007 - All rights reserved

/**
 * Loads a javascript file.
 *
 * @param {string} src Src to the javascript file to load
 * @param {object} config Config with id property.
 * @param {function} onSuccess Function to call on loadSuccess
 */

function loadboot(src, config, onSuccess) {

	//http://unixpapa.com/js/dyna.html
	var head = document.getElementsByTagName("head")[0];  
	script = document.createElement('script');
	script.type = 'text/javascript'; 
	if(config.id) {
		script.id = 'uploadScript' + config.id;
	}
	script.src = src;
	if(onSuccess) {	
		//http://msdn.microsoft.com/en-us/library/hh180173(v=vs.85).aspx
		if(script.addEventListener) {
			script.addEventListener("load",onSuccess,false);
		}else if(script.readyState) {
			script.onreadystatechange = function () {
				
				  //but that risks triggering twic
				  // "this.readyState == 'loaded' || this.readyState == 'complete'",
				  //if (this.readyState == 'complete'){ 
				  if (this.readyState == 'loaded' || this.readyState == 'complete'){ 
			    	  onSuccess();
			      }
			};
		} 
	}
	head.appendChild(script);
}

/**
 * Removes language files from header
 */
function reloadLanguage() {
	var reloadFile = [];
	
	var old = document.getElementById("uploadScriptlang_" + STONE.currentLanguage);
	 if (old != null) {  
        old.parentNode.removeChild(old);  
        delete old;  
    }
	 
	//TODO: needed for removing old language settings? 
	for(var i = 0; i < LOADER.config.length; i++) {
		var item = LOADER.config[i];
		if(item && item.config) {
			 reloadFile.push(item);
			 
			 var old = document.getElementById('uploadScript' + item.id);
			 if (old != null) {  
	             old.parentNode.removeChild(old);  
	             delete old;  
	         }
		}
	}
	
	return reloadFile;
}

/**
 * Loading next javascript file in LOADER.tempItems stack
 */
function _loadNext() {
	var config = LOADER.tempItems[LOADER.tempCurrent];
	LOADER.tempCurrent = LOADER.tempCurrent + 1;	
	if(typeof STONE !== 'undefined'){
		STONE.version = LOADER.version;
	}
	if(config) {
		loadboot(config.file, config, _loadNext);
		
	} else if(STONE && STONE.loadDone) {
		STONE.loadDone.apply(this);
	}
	
}

/**
 * Loading javascript files
 * @param {array} blueprint items 
 */
function load(items) {
	LOADER.tempCurrent = 0;
	LOADER.tempItems = items;
	_loadNext();
}

/**
 * Loading configuration and all application files.
 */
function loadconfig() {
	loadboot("js/simulators/"+LOADER.version+"/loadconfig.json", {}, function() {
		LOADER.tempItems = LOADER.config.files;
		_loadNext();
	});
}

/**
 * Returns the latest version of the simulator
 if the page has been called with a version specified in a parameter version the use that one if it exists
 */
function getLatestVersionIfExplicitVersionNotspecified(){
	var qsParm = new Array();
	qsParm['version'] = null;
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}
	}
	
	
	/*version specified in a parameter*/
	if(qsParm['version']){
		LOADER.version =qsParm['version'];

	}
	else {
		LOADER.version = "undefined";
	}
	
	loadboot("js/versions.json", {}, function() {
		var p = VERSION.indexOf(LOADER.version);
		if(p == -1){
			LOADER.version = VERSION[VERSION.length-1];	
		}
		loadconfig();
	});
	
}
if (!Array.prototype.indexOf) {   Array.prototype.indexOf = function(elt /*, from*/)   {     var len = this.length >>> 0;      var from = Number(arguments[1]) || 0;     from = (from < 0)          ? Math.ceil(from)          : Math.floor(from);     if (from < 0)       from += len;      for (; from < len; from++)     {       if (from in this &&           this[from] === elt)         return from;     }     return -1;   }; } 

LOADER = {tempCurrent: 0, tempItems: null, version: null};
getLatestVersionIfExplicitVersionNotspecified();