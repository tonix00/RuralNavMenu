/*----------------------------------------------*
 * File     : DSXCOMMON.JS                      *
 * Author   : Jo-Anne Concepcion M. Mercado     *
 * Date     : 18 November 2009                  *
 * Function : common functions                  *
 *----------------------------------------------*/

var dsxcommon = {

	base10        : 10,
	dateSeparator : "/",
	glNoSeparator : ".",
	timeSeparator : ":",
	tinSeparator : "-",

	regex : {
		notADigit             : /[^\d]/,
		notNumbers            : /[^\d\-]/g,
		notDate               : /[^\d\/]/g,
		notCurrency           : /[^\d\.-]/g,
		notValidPhoneChars    : /[^\d\-()]/g,
		notValidCellChars     : /[^\d\+]/g,
		quotes                : /['\''&'\"']/g,
		isInteger             : /^([+-]?\d+)$/,
		isDecimal             : /^(([+-]?\d+(\.\d*)?)|([+-]?(\d*\.)?\d+))$/,
		isValidEmailAddress   : /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
		//isValidEmailAddress   : /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
		isValidPhoneNumber    : /^(\(\d{1,3}\))?[\d-]*\d$/,
		isValidCellNumber     : /^[+]?[\d-]*\d$/,
		repeatedDateSeparator : /(\/)+/g,
		repeatedTimeSeparator : /(\:)+/g,
		notTime               : /[^\d\:]/g,
		isAlphabet			  : /^[a-zA-ZñÑ ]*$/,
		notAlpha			  : /[^a-zA-Z ]*$/,
	},

	/*-----------------------------*
	 * FUNCTIONS RELATED TO EVENTS *
	 *-----------------------------*/

	/*
	 * get an object
	 */
	getObject : function(elementId) {
		return document.getElementById(elementId)
	},

	/*
	 * add an event to the object
	 */
	addEvent : function(target, functionref, tasktype) {
		if (target.addEventListener)
			target.addEventListener(tasktype, functionref, false);
		else if (target.attachEvent)
			target.attachEvent('on' + tasktype, function() { return functionref.call(target, window.event) } );
	},

	/*
 	 * Get the target source
	 */
	getSource : function(e) {
		var t = window.event ? window.event.srcElement : e ? e.target : null
		return t
	},

	/*
	 * Get the key events depending on the browser type.
	 */
	getKey : function(e) {
		if (e && e.which) {
			var code = e.which
		}
		else if (e && e.keyCode) {
			var code = e.keyCode
		}
		else if (window.event && window.event.keyCode) {
			var code = window.event.keyCode
		}
		else {
			return
		}
		return code
	},

	/*----------------------*
	 * FORMATTING FUNCTIONS *
	 *----------------------*/

	/*
	 * add commas to a double value
	 */
	addCommasDouble : function (amount) {
		if (isNaN(amount)) { return "0.00" }
		var a = amount.split(".")
		var d, i
		if (a.length == 0) {
			d = "00"
			i = 0
		}
		else if (a.length == 1) {
			d = "00"
			i = parseInt(a[0], dsxcommon.base10)
		}
		else {
			d = a[1]
			i = parseInt(a[0], dsxcommon.base10)
		}
		if (isNaN(i)) { i = 0 }
		if (d.length == 0) { d = "00" }
		else if (d.length == 1) { d = d + "0" }
		else if (d.length == 2) {}
		var delimiter = ","
		var minus = ""
		if (i < 0) { minus = "-" }
		i = Math.abs(i)
		var n = new String(i)
		var a = []
		while (n.length > 3) {
			var nn = n.substr(n.length - 3)
			a.unshift(nn)
			n = n.substr(0,n.length - 3)
		}
		if (n.length > 0) { a.unshift(n) }
		n = a.join(delimiter)
		if (d.length < 1) { amount = n }
		else { amount = n + "." + d }
		amount = minus + amount
		return amount
	},

	/*
	 * add commas to an integer value
	 */
	addCommasInteger : function (intValue) {
		if (isNaN(intValue)) { return "0" }
		var i = parseInt(intValue, dsxcommon.base10)
		var delimiter = ","
		var minus = ""
		if (i < 0) { minus = "-" }
		i = Math.abs(i)
		var n = new String(i)
		var a = []
		while (n.length > 3) {
			var nn = n.substr(n.length - 3)
			a.unshift(nn)
			n = n.substr(0,n.length - 3)
		}
		if (n.length > 0) { a.unshift(n) }
		n = a.join(delimiter)
		intValue = minus + n
		return intValue
	},

	/*----------------*
	 * DATE FUNCTIONS *
	 *----------------*/

	/*
	 * Adds the date separator ("/") to the date string when key pressed and
	 * also validate the month and day entries.
	 */
	dateOnKeyDown : function(el, keycode) {
		var dateString = el.value
		dateString = dateString.replace(dsxcommon.regex.repeatedDateSeparator, dsxcommon.dateSeparator);
		var strLength = dateString.length
		switch (strLength) {
		case 1:
			if (dsxcommon.regex.notADigit.test(dateString)) {
				dateString = ""
			}
			else {
				if (dateString > 1 ) {
					dateString = "0" + dateString + dsxcommon.dateSeparator
				}
			}
			break
		case 2:
			if ((dateString < 1) || (dateString > 12)) {
				dateString = ""
			}
			else {
				dateString = dateString + dsxcommon.dateSeparator
			}
			break
		case 4:
			var dateParams = dateString.split(dsxcommon.dateSeparator)
			var d = parseInt(dateParams[1], dsxcommon.base10)
			if ((d >= 4) && (d <= 9)) {
				dateString = dateString.substring(0, strLength - 1) + "0" + d + dsxcommon.dateSeparator
			}
			break
		case 5:
			var sysDate = new Date()
			var daysInMonth = dsxcommon.getDaysInMonth(sysDate.getFullYear())
			var dateParams = dateString.split(dsxcommon.dateSeparator)
			var m = parseInt(dateParams[0], dsxcommon.base10)
			var d = parseInt(dateParams[1], dsxcommon.base10)
			if (d < 1) {
				dateString = dateString.substring(0, strLength - 1)
			}
			else if (d > daysInMonth[m]) {
				if (m == 2) {
					dateString = dateString.substring(0, strLength - 1) + dsxcommon.dateSeparator
				}
				else {
					dateString = dateString.substring(0, 2) + dsxcommon.dateSeparator +
						daysInMonth[m] + dsxcommon.dateSeparator
				}
			}
			else {
				dateString = dateString + dsxcommon.dateSeparator
			}
			break
		case 11:
			dateString = dateString.substring(0, 10)
		}
		el.value = dateString
		return (el.value)
	},

	/*
	 * Checks if a string is a date value.
	 */
	isDate : function(dateString) {
		var dateParams = dateString.split(dsxcommon.dateSeparator)
		if (dateParams.length != 3) {
			return false
		}
		if (dateParams[2].length != 4) {
			return false
		}
		var month = parseInt(dateParams[0], dsxcommon.base10);
		var day = parseInt(dateParams[1], dsxcommon.base10);
		var year = parseInt(dateParams[2], dsxcommon.base10);
		var daysInMonth = dsxcommon.getDaysInMonth(year)
		if ((month < 1) || (month > 12)){
			return false
		}
		if ((day < 1) || (day > daysInMonth[month])) {
			return false
		}
		if (year == 0) {
			return false
		}
		return true
	},

	/*
	 * Returns an array of the number of days for each month in the year.
	 */
	getDaysInMonth : function(year) {
		for (var i = 1; i <= 12; i++) {
			this[i] = 31
			if ((i == 4) || (i == 6) || (i == 9) || (i == 11)) {
				this[i] = 30
			}
			if (i == 2) {
				if ((year == null) || (year == 0)) {
					this[i] = 28
				}
				else {
					this[i] = dsxcommon.getDaysInFebruary(year)
				}
			}
		}
		return this
	},

	/*
	 * Returns the number of days in February.
	 */
	getDaysInFebruary : function(year) {
		//february has 29 days in any year evenly divisible by four,
		//EXCEPT for centurial years which are not also divisible by 400.
		return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28)
	},

	/*
	 * Returns the system date in the format mm/dd/yyyy.
	 */
	getSystemDate : function() {
		var sysDate = new Date()
		var month = sysDate.getMonth() + 1
		var day = sysDate.getDate()
		var year = sysDate.getFullYear()
		var stringDate = ""
		if (month < 10) {
			stringDate = "0"
		}
		stringDate += month + dsxcommon.dateSeparator
		if (day < 10) {
			stringDate += "0"
		}
		stringDate += day + dsxcommon.dateSeparator + year
		return stringDate
	},

	/*-------------------------*
	 * MISCELLANEOUS FUNCTIONS *
	 *-------------------------*/

	/*
	 * Remove all characters not in the bag.
	 */
	stripCharsInBar : function (s, bag) {
		var i
		var returnString = ""
		//search through string's characters one by one.
		//if character is not in bag, append to returnString.
		for (i = 0; i < s.length; i++){
			var c = s.charAt(i)
			if (bag.indexOf(c) == -1) {
				returnString += c
			}
		}
		return returnString
	},
	
	/*----------------------* 
	 * Added Functions      *
     * by: Jim Filbert Va�o *
	 *----------------------*/
	 
	/*--------------------------*
	 * MONTH AND YEAR FUNCTIONS *
	 *--------------------------*/
	
	/*
	 * Adds the date separator ("/") to the month and year string when key pressed and
	 * also validate the month entries.
	 */
	mmyyOnKeyDown : function(el, keycode) {
		var dateString = el.value
		dateString = dateString.replace(dsxcommon.regex.repeatedDateSeparator, dsxcommon.dateSeparator);
		var strLength = dateString.length
		switch (strLength) {
			case 1:
				if (dsxcommon.regex.notADigit.test(dateString)) {
					dateString = ""
				}
				else {
					if (dateString > 1 ) {
						dateString = "0" + dateString + dsxcommon.dateSeparator
					}
				}
				break
			case 2:
				if ((dateString < 1) || (dateString > 12)) {
					dateString = ""
				}
				else {
					dateString = dateString + dsxcommon.dateSeparator
				}
				break
			case 8:
				dateString = dateString.substring(0, 7)
		}

		el.value = dateString
		return (el.value)
	},
	
	/*
	 * Checks if entered mm/yyyy string is a valid value.
	 */
	isValidmmyy : function(dateString) {
		var dateParams = dateString.split(dsxcommon.dateSeparator)
		if (dateParams.length != 2) {
			return false
		}
		if (dateParams[1].length != 4) {
			return false
		}
		var month = parseInt(dateParams[0], dsxcommon.base10);
		var year = parseInt(dateParams[1], dsxcommon.base10);
		if ((month < 1) || (month > 12)){
			return false
		}
		if (year == 0) {
			return false
		}
		return true
	},

	/*--------------------*
	 * GLNumber FUNCTIONS *
	 *--------------------*/

	/*
	 * Validates the entered string when key pressed
	 */
	glNoOnKeyDown : function(el, keycode) {
		var dateString = el.value
		var strLength = dateString.length
		if (strLength > 10) {
			dateString = dateString.substring(0, strLength - 1);
		}
		
		el.value = dateString
		return (el.value)
	},
	
	/*
	 * Remove the Separator on Focus
	 */
	glNoRemoveSeparator : function(dateString) {
		var glNo = ""
		var dateParams = dateString.split(dsxcommon.glNoSeparator)
		for(var i = 0; i < dateParams.length; i++) {
			glNo = glNo + dateParams[i]
		}
		return (glNo)
	},
	
	/*
	 * Checks if entered GL number is a valid value.
	 */
	isValidglNo : function(dateString) {
		if (dateString.length > 10) {
			return false
		}
		return true
	},
	
	/*
	 * Remove unnecessary zeros and 
	 * Add the separator "."
	 */
	glNoAddSeparator : function(dateString) {
		var el = "";
		
		var str = "";
		for (var i = dateString.length; i >= 0; i--) {
			if (dateString.charAt(i) != 0) {
				break;
			}
			else {
				str = "";
				for(var j = 0; j < i; j++ ) {
					str += dateString.charAt(j);
				}
			}
		}
		
		//Add the Separator
		var strLength = str.length
		for (var i = 1; i <= strLength; i++) {
			el = el + str.charAt(i - 1);
			if (i != strLength) {
				if (i == 2 || i == 4 || i == 6 || i == 8) {
					el += dsxcommon.glNoSeparator
				}
			}
		}
		
		//Add additional zero if needed	
		if ((strLength % 2 ) == 1 ) {
			el += "0";
		}
		return (el)
	},
	
	/*---------------*
	 * PCC FUNCTIONS *
	 *---------------*/
		
	/*
	 * Validates the entered string when key pressed
	 */
	pccOnKeyDown : function(el, keycode) {
		var dateString = el.value
		var strLength = dateString.length
		if (strLength > 6) {
			dateString = dateString.substring(0, strLength - 1);
		}
		
		el.value = dateString
		return (el.value)
	},
	
	/*
	 * Remove the Separator on Focus
	 */
	pccRemoveSeparator : function(dateString) {
		var pccNew = ""
		var dateParams = dateString.split(dsxcommon.glNoSeparator)
		for(var i = 0; i < dateParams.length; i++) {
			pccNew = pccNew + dateParams[i]
		}
		return (pccNew)
	},
	
	/*
	 * Checks if a PCC entered is a valid value and length.
	 */
	isValidpcc : function(dateString) {
		if (dateString.length > 6) {
			return false
		}
		return true
	},
	
	/*
	 * Remove unnecessary zeros and 
	 * Add the separator "."
	 */
	pccAddSeparator : function(dateString) {
		var el = "";
		var str = "";
		
		var zero = parseInt(dateString, dsxcommon.base10)
		if (zero != 0) {
			//Remove the unnecessary zeros
			for (var i = dateString.length; i >= 0; i--) {
				if (dateString.charAt(i) != 0) {
					break;
				}
				else {
					str = "";
					for(var j = 0; j < i; j++ ) {
						str += dateString.charAt(j);
					}
				}
			}
		}
		else {
			str = "0"
		}
		
		//Add the Separator
		var strLength = str.length
		for (var i = 1; i <= strLength; i++) {
			el = el + str.charAt(i - 1);
			if (i != strLength) {
				if (i == 2 || i == 4 || i == 6 || i == 8) {
					el += ""
				}
			}
		}	
		
		//Add additional zero if needed
		if ((strLength % 2 ) == 1 ) {
			el += "0";
		}
		return (el)
	},
	
	/*
	 * change type of field
	 */
	changeType : function(el) {
		var newNode;
		if(el.type == 'text') {
			newNode = document.createElement("SELECT");
		}
		else {
			newNode = document.createElement("INPUT");
			newNode.type = 'text';
		}
		newNode.id = el.id;
		newNode.value = el.value;
		newNode.className = el.className;
		newNode.name = el.name;
		
		return newNode;
	},
	
	/*
	 * add commas to a four decimal value
	 */
	addCommasFourDecimal : function (amount) {
		if (isNaN(amount)) { return "0.0000" }
		var a = amount.split(".")
		var d, i
		if (a.length == 0) {
			d = "0000"
			i = 0
		}
		else if (a.length == 1) {
			d = "0000"
			i = parseInt(a[0], dsxcommon.base10)
		}
		else {
			d = a[1]
			i = parseInt(a[0], dsxcommon.base10)
		}
		if (isNaN(i)) { i = 0 }
		if (d.length == 0) { d = "0000" }
		else if (d.length == 1) { d = d + "000" }
		else if (d.length == 2) { d = d + "00" }
		else if (d.length == 3) { d = d + "0" }
		else if (d.length == 4) {}
		var delimiter = ","
		var minus = ""
		if (i < 0) { minus = "-" }
		i = Math.abs(i)
		var n = new String(i)
		var a = []
		while (n.length > 3) {
			var nn = n.substr(n.length - 3)
			a.unshift(nn)
			n = n.substr(0,n.length - 3)
		}
		if (n.length > 0) { a.unshift(n) }
		n = a.join(delimiter)
		if (d.length < 1) { amount = n }
		else { amount = n + "." + d }
		amount = minus + amount
		return amount
	},
	
	/*----------------*
	 * TIME FUNCTIONS *
	 *----------------*/
	
	/*
	 * Adds the date separator (":") to the hour and minute string when key pressed and
	 * also validate the month entries.
	 */
	timeOnKeyDown : function(el, keycode) {
		var timeString = el.value
		timeString = timeString.replace(dsxcommon.regex.repeatedTimeSeparator, dsxcommon.timeSeparator);
		var strLength = timeString.length
		switch (strLength) {
			case 1:
				if (dsxcommon.regex.notADigit.test(timeString)) {
					timeString = ""
				}
				else {
					if (timeString > 2 ) {
						timeString = "0" + timeString + dsxcommon.timeSeparator
					}
				}
				break
			case 2:
				if ((timeString < 1) || (timeString > 24)) {
					timeString = ""
				}
				else {
					timeString = timeString + dsxcommon.timeSeparator
				}
			case 5:
				timeString = timeString.substring(0,5)
		}

		el.value = timeString
		return (el.value)
	},
	
	/*
	 * Checks if entered hh/mm string is a valid value.
	 */
	isValidtime : function(timeString) {
		var timeParams = timeString.split(dsxcommon.timeSeparator)
		if (timeParams.length != 2) {
			return false
		}
		if (timeParams[1].length != 2) {
			return false
		}
		var hour = parseInt(timeParams[0], dsxcommon.base10);
		var minute = parseInt(timeParams[1], dsxcommon.base10);
		if ((hour < 1) || (hour > 24)){
			return false
		}
		if ((minute < 0) || (minute > 59)) {
			return false
		}
		return true
	},
	
	/*------------------------* 
	 * End of Added Functions *
     * by: Jim Filbert Va�o   *
	 *------------------------*/
	
	/*
	 * Show message in the browser's status bar. 
	 */
	logMessage : function(message) {
		window.status = message
		return true
	},
	
	/*
	 * Remove all the Commas
	 */
	removeAllCommas : function(decimalString) {
		var newDecimal = ""
		var decimalParams = decimalString.split(",")
		for (var i = 0; i < decimalParams.length; i++) {
			newDecimal = newDecimal + decimalParams[i]
		}
		return (newDecimal)
	},
	
	/*
	 * Remove the Separator on Focus
	 */
	tinRemoveSeparator : function(string) {
		var tinNew = ""
		var params = string.split(dsxcommon.tinSeparator)
		for (var i = 0; i < params.length; i++) {
			tinNew = tinNew + params[i]
		}
		return (tinNew)
	}
	
}
