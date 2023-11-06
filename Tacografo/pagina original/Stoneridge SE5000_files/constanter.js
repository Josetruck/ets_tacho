// Copyright (c) Stoneridge Electronics AB 2007 - All rights reserved

var STONE = STONE || {};
STONE.sessions = {};

STONE.CON = {};

STONE.CON.HOUR1 = (1000 * 60) * 60;
STONE.CON.DAY1 = STONE.CON.HOUR1 * 24;

STONE.CON.WITHDRAWAL = {
	HOUR2: STONE.CON.HOUR1 * 2,
	HOUR14: STONE.CON.HOUR1 * 14,
	WEEKS2: STONE.CON.DAY1 * 14
};
STONE.withdrawal = STONE.CON.WITHDRAWAL.HOUR2;

STONE.CON.SLOT1 = "\uF00B";
STONE.CON.SLOT2 = "\uF00C";
STONE.CON.BLANK = "\u00A0";	//blankspace
STONE.CON.BLANK2 = "\u00A0\u00A0";
STONE.CON.BLANK3 = "\u00A0\u00A0\u00A0";
STONE.CON.BLANK4 = "\u00A0\u00A0\u00A0\u00A0";
STONE.CON.BLANK5 = "\u00A0\u00A0\u00A0\u00A0\u00A0";
STONE.CON.BLANK6 = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
STONE.CON.BLANK7 = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
STONE.CON.PLACE = "\uF01B"; //dot
STONE.CON.CALIBRATION_UPLOAD = "\uF0AC";
STONE.CON.DRIVING = "\uF09E"; //steering wheel
STONE.CON.WORK = "\uF0A1";
STONE.CON.END_SHIFT = "\uF01A";
STONE.CON.BEGIN_SHIFT = "\uF019";
STONE.CON.AVAILABLE = "\uF09F";
STONE.CON.UNKNOWN = "?";
STONE.CON.REST = "\uF0A0"; //bed symbol
STONE.CON.TIME = "\uF00E"; //clock
STONE.CON.VEHICLE = "\uF015";
STONE.CON.CARD = "\uF00D";
STONE.CON.DOWNLOAD = "\uF010";
STONE.CON.ARROW_FROM = "\uF0B0";
STONE.CON.ARROW_TO = "\uF0B1";
STONE.CON.SUM = "\uF01F";
STONE.CON.CUMULATIVE = "\u017D";
STONE.CON.PRINTOUT = "\uF012"; //arrow down
STONE.CON.CALIBRATION = "\uF008";
STONE.CON.BREAK = "\uF005";
STONE.CON.TWO_WEEKS = "\uF006";
STONE.CON.MANUFACTURER = "\uF009";
STONE.CON.VERSION = "7.3";
STONE.CON.CALIBRATION = "\uF008"; //hammer
STONE.CON.CONTROL = "\u007C";
STONE.CON.HALF = "\uF0A9"; // 1/2
STONE.CON.EXPL = "!";
STONE.CON.COMPLOCK = "\uF01D";
STONE.CON.CONFIRM = "\uF0B3";
STONE.CON.FERRY_MODE = "\uF016";
STONE.CON.LOCKIN= "\uF0BB";
STONE.CON.DASH= "\u2013";
STONE.CON.SLASH= "\u2044";
STONE.CON.CROSS = "\uF018";
STONE.CON.LICENS_PLACE = "ABC-123"; //vrn
STONE.CON.COMPANY = "\uF017"; //vrn

/**
 * removes the time specified by length from the objects date 
 * format of length is "1d4h6m"
 *
 * @return {Date}
 */
 Date.prototype.subtract = function (length){
	 
	 var myString = length;
	 var myRegexp = /(\d+)d(\d+)h(\d+)m/g;
	 var match = myRegexp.exec(myString);
	 var millisecondstosubtract = 0;
	 millisecondstosubtract += match[3]*60000;
	 millisecondstosubtract += match[2]*3600000;
	 millisecondstosubtract += match[1]*86400000;
	 var ms = this.valueOf()-millisecondstosubtract;

	 return new Date(ms);
 };
 
STONE.i18nLang = [
                  {code: "en", text:"English"}, 
                  {code: "sv", text:"Svenska"},
                  {code: "da", text:"Dansk"},
                  {code: "bg", text:"български"},
                  {code: "nl", text:"Nederlands"},
                  {code: "et", text:"Eesti"},
                  {code: "fi", text:"Suomi"},
                  {code: "fr", text:"Français"},
                  {code: "de", text:"Deutsch"},
                  {code: "el", text:"Ελληνικά"},
                  {code: "hu", text:"Magyar"},
                  {code: "is", text:"Íslenska"},
                  {code: "it", text:"Italiano"},
                  {code: "lv", text:"Latviešu"},
                  {code: "lt", text:"Lietuvių"},
                  {code: "no", text:"Norsk"},
                  {code: "pl", text:"Polski"},
                  {code: "pt", text:"Português"},
                  {code: "ro", text:"Română"},
                  {code: "ru", text:"Pусский"},
                  {code: "sk", text:"Slovenčina"},
                  {code: "sl", text:"Slovenščina"},
                  {code: "es", text:"Español"},
                  {code: "sq", text:"Shqip"},
                  {code: "bs", text:"Bosanski"},
                  {code: "hr", text:"Hrvatski"},
                  {code: "mk", text:"македонски"},
                  {code: "sr", text:"srpski"},
                  {code: "tr", text:"Türkçe"},
				 ];