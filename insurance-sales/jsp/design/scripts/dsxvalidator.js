
/*----------------------------------------------*
 * File     : DSXVALIDATOR.JS                   *
 * Author   : Jo-Anne Concepcion M. Mercado     *
 * Date     : 15 November 2009                  *
 * Function : main validation of the input tags *
 *----------------------------------------------*/

var dsxvalidator = {

	/*
	 * this property contains the list of possible IDs
	 */
	elementIDs : {
		string : [
			"string1", "string2", "string3", "string4", "string5",
			"string6", "string7", "string8", "string9", "string10",
			"string11", "string12", "string13", "string14", "string15",
			"string16", "string17", "string18", "string19", "string20",
			"string21", "string22", "string23", "string24", "string25",
			"string26", "string27", "string28", "string29", "string30",
			"string31", "string32", "string33", "string34", "string35",
			"string36", "string37", "string38", "string39", "string40",
			"string41", "string42", "string43", "string44", "string45",
			"string46", "string47", "string48", "string49", "string50",
			"stringGo1", "stringGo2", "stringGo3", "stringGo4", "stringGo5", "stringVerify1",
			"firstKey", "firstData", "firstString", "firstStringGo", "firstStringVerify"
		],
		integer : [
			"integer1", "integer2", "integer3", "integer4", "integer5",
			"integer6", "integer7", "integer8", "integer9", "integer10",
			"integer11", "integer12", "integer13", "integer14", "integer15",
			"integer16", "integer17", "integer18", "integer19", "integer20",
			"integerGo1", "integerGo2", "integerGo3", "integerGo4", "integerGo5", "integerVerify1",
			"firstNo", "firstNo1", "firstNo2", "firstNo3", "firstNoGo", "firstNoVerify"
		],
		intwc : [
			"intwc1", "intwc2", "intwc3", "intwc4", "intwc5",
			"intwc6", "intwc7", "intwc8", "intwc9", "intwc10",
			"intwc11", "intwc12", "intwc13", "intwc14", "intwc15",
			"intwc16", "intwc17", "intwc18", "intwc19", "intwc20"
		],
		date : [
			"date1", "date2", "date3", "date4", "date5", "date6", "date7", "date8", "date9", "date10",
			"date11", "date12", "date13", "date14", "date15", "date16", "date17", "date18", "date19", "date20",
			"date21", "date22", "date23", "date24", "date25", "date26", "date27", "date28", "date29", "date30",
			"date31", "date32", "date33", "date34", "date35", "date36", "date37", "date38", "date39", "date40",
			"date41", "date42", "date43", "date44", "date45", "date46", "date47", "date48", "date49", "date50",
			"dateGo1", "dateGo2", "dateGo3", "dateGo4", "dateGo5", "dateVerify1", 
			"firstDate", "firstDateGo", "firstDateVerify"
		],
		sysdate : [
			"sysdate1", "sysdate2", "sysdate3", "sysdate4", "sysdate5"
		],
		currency : [
			"currency1", "currency2", "currency3", "currency4", "currency5",
			"currency6", "currency7", "currency8", "currency9", "currency10",
			"currency11", "currency12", "currency13", "currency14", "currency15",
			"currency16", "currency17", "currency18", "currency19", "currency20",
			"currency21", "currency22", "currency23", "currency24", "currency25",
			"currency26", "currency27", "currency28", "currency29", "currency30",
			"currency31", "currency32", "currency33", "currency34", "currency35",
			"currency36", "currency37", "currency38", "currency39", "currency40",
			"currency41", "currency42", "currency43", "currency44", "currency45",
			"currency46", "currency47", "currency48", "currency49", "currency50",
			"currency51", "currency52", "currency53", "currency54", "currency55",
			"currency56", "currency57", "currency58", "currency59", "currency60",
			"currency61", "currency62", "currency63", "currency64", "currency65",
			"currency66", "currency67", "currency68", "currency69", "currency70",
			"currency71", "currency72", "currency73", "currency74", "currency75",
			"currency76", "currency77", "currency78", "currency79", "currency80",
			"currency81", "currency82", "currency83", "currency84", "currency85",
			"currency86", "currency87", "currency88", "currency89", "currency90",
			"rate1", "rate2", "rate3", "rate4", "rate5",
			"rate6", "rate7", "rate8", "rate9", "rate10",
			"rate11", "rate12", "rate13", "rate14", "rate15",
			"rate16", "rate17", "rate18", "rate19", "rate20",
			"decimal1", "decimal2", "decimal3", "decimal4", "decimal5",
			"decimal6", "decimal7", "decimal8", "decimal9", "decimal10",
			"currencyGo1", "currencyGo2", "currencyGo3", "currencyGo4", "currencyGo5", "currencyVerify1", 
			"firstCurrency", "firstRate", "firstCurrencyGo", "firstCurrencyVerify"
		],
		selecttag : [
			"select1", "select2", "select3", "select4", "select5",
			"select6", "select7", "select8", "select9", "select10",
			"select11", "select12", "select13", "select14", "select15",
			"select16", "select17", "select18", "select19", "select20",
			"select21", "select22", "select23", "select24", "select25",
			"select26", "select27", "select28", "select29", "select30",
			"selectGo1", "selectGo2", "selectGo3", "selectGo4", "selectGo5", "selectVerify1", 
			"firstSelect", "firstSelectGo", "firstSelectVerify"
		],
		email : [
			"email1", "email2", "email3", "email4", "email5",
			"email6", "email7", "email8", "email9", "email10",
			"firstEmail"
		],
		phone : [
			"phone1", "phone2", "phone3", "phone4", "phone5",
			"phone6", "phone7", "phone8", "phone9", "phone10",
			"firstPhone"],
		cell : [
			"cell1", "cell2", "cell3", "cell4", "cell5",
			"cell6", "cell7", "cell8", "cell9", "cell10",
			"firstCell", "firstCellNo"
		],
		glNo : [
			"glNo", "glNo1", "glNo2", "glNo3", "glNo4", "glNo5", 
			"glNo6", "glNo7", "glNo8", "firstGlNo"
		],
		pcc : [
			"pcc", "pcc1", "pcc2", "pcc3", "pcc4", "pcc5", "firstPccKey"
		],
		mmyy : [
			"mmyy", "mmyy1", "mmyy2", "mmyy3", "mmyy4", "mmyy5"
		],
		firstfocus : [
			"firstKey", "firstData", "firstString",
			"firstNo", "firstNo1", "firstNo2", "firstNo3",
			"firstCurrency", "firstRate", "firstDate", "firstEmail",
			"firstPhone", "firstCell", "firstCellNo", "firstSelect",
			"firstStringGo", "firstStringVerify", "firstNoGo", "firstNoVerify",
			"firstDateGo", "firstDateVerify", "firstCurrencyGo", "firstCurrencyVerify",
			"firstSelectGo", "firstSelectVerify"
		],
		gridSelect : [
			"gridSelect1", "gridSelect2", "gridSelect3", "gridSelect4", "gridSelect5", 
			"gridSelect6", "gridSelect7", "gridSelect8", "gridSelect9", "gridSelect10",
			"gridSelect11", "gridSelect12", "gridSelect13", "gridSelect14", "gridSelect15", 
			"gridSelect16", "gridSelect17", "gridSelect18", "gridSelect19", "gridSelect20",
			"gridSelect21", "gridSelect22", "gridSelect23", "gridSelect24", "gridSelect25", 
			"gridSelect26", "gridSelect27", "gridSelect28", "gridSelect29", "gridSelect30",
			"gridSelect31", "gridSelect32", "gridSelect33", "gridSelect34", "gridSelect35", 
			"gridSelect36", "gridSelect37", "gridSelect38", "gridSelect39", "gridSelect40",
			"gridSelect41", "gridSelect42", "gridSelect43", "gridSelect44", "gridSelect45", 
			"gridSelect46", "gridSelect47", "gridSelect48", "gridSelect49", "gridSelect50"
		],
		rate : [
			"monthly1", "monthly2", "monthly3", "monthly4", "monthly5", 
			"monthly6", "monthly7", "monthly8", "monthly9", "monthly10",
			"monthly11", "monthly12", "monthly13", "monthly14", "monthly15", 
			"monthly16", "monthly17", "monthly18", "monthly19", "monthly20",
			"monthly21", "monthly22", "monthly23", "monthly24", "monthly25", 
			"monthly26", "monthly27", "monthly28", "monthly29", "monthly30",
			"monthly31", "monthly32", "monthly33", "monthly34", "monthly35", 
			"monthly36", "monthly37", "monthly38", "monthly39", "monthly40",
			"monthly41", "monthly42", "monthly43", "monthly44", "monthly45", 
			"monthly46", "monthly47", "monthly48", "monthly49", "monthly50",
			"daily1", "daily2", "daily3", "daily4", "daily5", 
			"daily6", "daily7", "daily8", "daily9", "daily10",
			"daily11", "daily12", "daily13", "daily14", "daily15", 
			"daily16", "daily17", "daily18", "daily19", "daily20",
			"daily21", "daily22", "daily23", "daily24", "daily25", 
			"daily26", "daily27", "daily28", "daily29", "daily30",
			"daily31", "daily32", "daily33", "daily34", "daily35", 
			"daily36", "daily37", "daily38", "daily39", "daily40",
			"daily41", "daily42", "daily43", "daily44", "daily45", 
			"daily46", "daily47", "daily48", "daily49", "daily50",
			"hourly1", "hourly2", "hourly3", "hourly4", "hourly5", 
			"hourly6", "hourly7", "hourly8", "hourly9", "hourly10",
			"hourly11", "hourly12", "hourly13", "hourly14", "hourly15", 
			"hourly16", "hourly17", "hourly18", "hourly19", "hourly20",
			"hourly21", "hourly22", "hourly23", "hourly24", "hourly25", 
			"hourly26", "hourly27", "hourly28", "hourly29", "hourly30",
			"hourly31", "hourly32", "hourly33", "hourly34", "hourly35", 
			"hourly36", "hourly37", "hourly38", "hourly39", "hourly40",
			"hourly41", "hourly42", "hourly43", "hourly44", "hourly45", 
			"hourly46", "hourly47", "hourly48", "hourly49", "hourly50",
			"minute1", "minute2", "minute3", "minute4", "minute5", 
			"minute6", "minute7", "minute8", "minute9", "minute10",
			"minute11", "minute12", "minute13", "minute14", "minute15", 
			"minute16", "minute17", "minute18", "minute19", "minute20",
			"minute21", "minute22", "minute23", "minute24", "minute25", 
			"minute26", "minute27", "minute28", "minute29", "minute30",
			"minute31", "minute32", "minute33", "minute34", "minute35", 
			"minute36", "minute37", "minute38", "minute39", "minute40",
			"minute41", "minute42", "minute43", "minute44", "minute45", 
			"minute46", "minute47", "minute48", "minute49", "minute50"
		],
		formulaSelect : [
			"formulaSelect1", "formulaSelect2", "formulaSelect3", "formulaSelect4", "formulaSelect5", 
			"formulaSelect6", "formulaSelect7", "formulaSelect8", "formulaSelect9", "formulaSelect10",
			"formulaSelect11", "formulaSelect12", "formulaSelect13", "formulaSelect14", "formulaSelect15", 
			"formulaSelect16", "formulaSelect17", "formulaSelect18", "formulaSelect19", "formulaSelect20",
			"formulaSelect21", "formulaSelect22", "formulaSelect23", "formulaSelect24", "formulaSelect25", 
			"formulaSelect26", "formulaSelect27", "formulaSelect28", "formulaSelect29", "formulaSelect30",
			"formulaSelect31", "formulaSelect32", "formulaSelect33", "formulaSelect34", "formulaSelect35", 
			"formulaSelect36", "formulaSelect37", "formulaSelect38", "formulaSelect39", "formulaSelect40",
			"formulaSelect41", "formulaSelect42", "formulaSelect43", "formulaSelect44", "formulaSelect45", 
			"formulaSelect46", "formulaSelect47", "formulaSelect48", "formulaSelect49", "formulaSelect50"
		],
		glSelect : [
			"glSelect1", "glSelect2", "glSelect3", "glSelect4", "glSelect5", 
			"glSelect6", "glSelect7", "glSelect8", "glSelect9", "glSelect10",
			"glSelect11", "glSelect12", "glSelect13", "glSelect14", "glSelect15", 
			"glSelect16", "glSelect17", "glSelect18", "glSelect19", "glSelect20",
			"glSelect21", "glSelect22", "glSelect23", "glSelect24", "glSelect25", 
			"glSelect26", "glSelect27", "glSelect28", "glSelect29", "glSelect30",
			"glSelect31", "glSelect32", "glSelect33", "glSelect34", "glSelect35", 
			"glSelect36", "glSelect37", "glSelect38", "glSelect39", "glSelect40",
			"glSelect41", "glSelect42", "glSelect43", "glSelect44", "glSelect45", 
			"glSelect46", "glSelect47", "glSelect48", "glSelect49", "glSelect50"
		],
		dcSelect : [
			"dcSelect1", "dcSelect2", "dcSelect3", "dcSelect4", "dcSelect5", 
			"dcSelect6", "dcSelect7", "dcSelect8", "dcSelect9", "dcSelect10",
			"dcSelect11", "dcSelect12", "dcSelect13", "dcSelect14", "dcSelect15", 
			"dcSelect16", "dcSelect17", "dcSelect18", "dcSelect19", "dcSelect20",
			"dcSelect21", "dcSelect22", "dcSelect23", "dcSelect24", "dcSelect25", 
			"dcSelect26", "dcSelect27", "dcSelect28", "dcSelect29", "dcSelect30",
			"dcSelect31", "dcSelect32", "dcSelect33", "dcSelect34", "dcSelect35", 
			"dcSelect36", "dcSelect37", "dcSelect38", "dcSelect39", "dcSelect40",
			"dcSelect41", "dcSelect42", "dcSelect43", "dcSelect44", "dcSelect45", 
			"dcSelect46", "dcSelect47", "dcSelect48", "dcSelect49", "dcSelect50"
		],
		acSelect : [
			"acSelect1", "acSelect2", "acSelect3", "acSelect4", "acSelect5", 
			"acSelect6", "acSelect7", "acSelect8", "acSelect9", "acSelect10",
			"acSelect11", "acSelect12", "dcSelect13", "acSelect14", "acSelect15", 
			"acSelect16", "acSelect17", "dcSelect18", "acSelect19", "acSelect20",
			"acSelect21", "acSelect22", "dcSelect23", "acSelect24", "acSelect25", 
			"acSelect26", "acSelect27", "dcSelect28", "acSelect29", "acSelect30",
			"acSelect31", "acSelect32", "dcSelect33", "acSelect34", "acSelect35", 
			"acSelect36", "acSelect37", "dcSelect38", "acSelect39", "acSelect40",
			"acSelect41", "acSelect42", "dcSelect43", "acSelect44", "acSelect45", 
			"acSelect46", "acSelect47", "dcSelect48", "acSelect49", "acSelect50"
		],
		time : [
			"time1", "time2", "time3", "time4", "time5", 
			"time6", "time7", "time8", "time9", "time10",
			"amIn1", "amIn2", "amIn3", "amIn4", "amIn5", 
			"amIn6", "amIn7", "amIn8", "amIn9", "amIn10",
			"amOut1", "amOut2", "amOut3", "amOut4", "amOut5", 
			"amOut6", "amOut7", "amOut8", "amOut9", "amOut10",
			"pmIn1", "pmIn2", "pmIn3", "pmIn4", "pmIn5", 
			"pmIn6", "pmIn7", "pmIn8", "pmIn9", "pmIn10",
			"pmOut1", "pmOut2", "pmOut3", "pmOut4", "pmOut5", 
			"pmOut6", "pmOut7", "pmOut8", "pmOut9", "pmOut10"
		],
		alpha : [
			"alpha1", "alpha2", "alpha3", "alpha4", "alpha5", 
			"alpha6", "alpha7", "alpha8", "alpha9", "alpha10"
		],
	},

	/*------------------*
	 * DOUBLE FUNCTIONS *
	 *------------------*/

	/*
	 * initialize currency value
	 */
	currencyInit : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value == "") || (t.value == null)) {
			t.value = "0.00"
		}
		t.select()
	},

	/*
	 * Key pressed for the currency field.
	 */
	currencyKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {
			return
		}
		else {
			var k = String.fromCharCode(code)
			var p = new String(t.value + k).indexOf(".")
			if ((p < (t.value.length - 3)) && (p >- 1)) {
				t.value = t.value.substring(0, (t.value.length - 1))
			}
			if (t.value.indexOf("-") > 0) {
				t.value = t.value.substring(0, (t.value.length - 1))
			}
			t.value = t.value.replace(dsxcommon.regex.notCurrency, '')
		}
	},

	/*
	 * Validate the currency field.
	 */
	currencyValidate : function(e) {
		var t = dsxcommon.getSource(e)
		t.value = t.value.replace(dsxcommon.regex.notCurrency, '') //remove commas
		var validValue = dsxcommon.regex.isDecimal.test(t.value)
		var pos = t.value.indexOf(".")
		if (!validValue) {
			t.value = "0.00"
		}
		else {
			if (pos == -1) {
				if ((t.value == "") || (t.value == null)) {
					t.value = "0.00"
				}
				else {
					t.value = dsxcommon.addCommasDouble(t.value + ".00")
				}
			}
			else {
				t.value = dsxcommon.addCommasDouble(t.value);
			}
		}
	},

	/*-------------------*
	 * INTEGER FUNCTIONS *
	 *-------------------*/

	/*
	 * initialize value
	 * tested and is working fine
	 */
	integerInit : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value == "") || (t.value == null)) {
			t.value = "0"
		}
		t.select()
	},

	/*
	 * Key pressed for the currency field.
	 */
	integerKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {
			return
		}
		else {
			t.value = t.value.replace(dsxcommon.regex.notNumbers, '')
		}
	},

	/*
	 * Validate the integer field.
	 */
	integerValidate : function(e) {
		var t = dsxcommon.getSource(e)
		var validValue = dsxcommon.regex.isInteger.test(t.value)
		if (!validValue) {
			t.value = "0"
		}
	},

	/*
	 * Validate the integer with commas field.
	 */
	intwcValidate : function(e) {
		var t = dsxcommon.getSource(e)
		t.value = t.value.replace(dsxcommon.regex.notNumbers, '')
		var validValue = dsxcommon.regex.isInteger.test(t.value)
		if (!validValue) {
			t.value = "0"
		}
		else {
			t.value = dsxcommon.addCommasInteger(t.value);
		}
	},

	/*----------------*
	 * DATE FUNCTIONS *
	 *----------------*/

	/*
	 * initialize date value
	 */
	dateInit : function(e) {
		var t = dsxcommon.getSource(e)
		t.select()
	},

	/*
	 * initialize system date value
	 */
	sysdateInit : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value == null) || (t.value == "")) {
			t.value = dsxcommon.getSystemDate()
		}
		t.select()
	},

	/*
	 * Key pressed for a date field.
	 */
	dateKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {}
		else {
			if (t.value.length > 10) {
				t.value = t.value.substring(0, 10)
			}
			t.value = dsxcommon.dateOnKeyDown(t, code)
			t.value = t.value.replace(dsxcommon.regex.notDate, '')
		}
	},

	/*
	 * Validate a date field.
	 */
	dateValidate : function(e) {
		var dt = dsxcommon.getSource(e)
		if ((dt.value != "") && (dt.value != null)) {
			if (dsxcommon.isDate(dt.value) == false) {
				dt.value = ""
			}
		}
	},

	/*------------------*
	 * STRING FUNCTIONS *
	 *------------------*/

	/*
	 * Initialize string field value.
	 */
	stringInit : function(e) {
		var t = dsxcommon.getSource(e)
		if (t.value == null) {
			t.value = ""
		}
		t.select()
	},

	/*-------------------------*
	 * EMAIL ADDRESS FUNCTIONS *
	 *-------------------------*/

	/*
	 * Validate the email address field.
	 */
	emailValidate : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value != null) || (t.value != "")) {
			var validValue = dsxcommon.regex.isValidEmailAddress.test(t.value)
			if (!validValue) {
				t.value = ""
			}
		}
	},

	/*------------------------*
	 * PHONE NUMBER FUNCTIONS *
	 *------------------------*/

	/*
	 * Validate the phone number field.
	 */
	phoneValidate : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value != null) || (t.value != "")) {
			var validValue = dsxcommon.regex.isValidPhoneNumber.test(t.value)
			if (!validValue) {
				t.value = ""
			}
		}
	},

	/*----------------------------*
	 * CELLPHONE NUMBER FUNCTIONS *
	 *----------------------------*/

	/*
	 * Initialize cell phone field value.
	 */
	cellphoneInit : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value == null) || (t.value == "")) {
			t.value = "+63"
		}
		t.select()
	},

	/*
	 * Validate the cell phone number field.
	 */
	cellphoneValidate : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value != null) || (t.value != "")) {
			var validValue = dsxcommon.regex.isValidCellNumber.test(t.value)
			if (!validValue) {
				t.value = "+63"
			}
		}
	},

	/*
	 * Focus on the first field.
	 */
	focusOnField : function() {
		var el, i
		for (i in this.elementIDs.firstfocus) {
			el = dsxcommon.getObject(this.elementIDs.firstfocus[i])
			if ((el != null) && (!el.disabled)) {
				el.focus()
				break
			}			
		}
	},
	
	/*----------------------* 
	 * Added Functions      *
     * by: Jim Filbert Vaño *
	 *----------------------*/
	 
	/*--------------------------*
	 * MONTH AND YEAR FUNCTIONS *
	 *--------------------------*/

	/*
	 * initialize month and year (mm/yyyy) value
	 */
	mmyyInit : function(e) {
		var t = dsxcommon.getSource(e)
		t.select()
	},

	/*
	 * Key pressed for month and year (MM/YYYY) field.
	 */
	mmyyKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {}
		else {
			if (t.value.length > 7) {
				t.value = t.value.substring(0, 7)
			}
			t.value = dsxcommon.mmyyOnKeyDown(t, code)
			t.value = t.value.replace(dsxcommon.regex.notDate, '')
		}
	},

	/*
	 * Validate month and year (MM/YYYY) field.
	 */
	mmyyValidate : function(e) {
		var dt = dsxcommon.getSource(e)
		if ((dt.value != "") && (dt.value != null)) {
			if (dsxcommon.isValidmmyy(dt.value) == false) {
				dt.value = ""
			}
		}
	},
	
	/*-----------------*
	 * GL No FUNCTIONS *
	 *-----------------*/

	/*
	 * initialize GLno value
	 */
	glNoInit : function(e) {
		var t = dsxcommon.getSource(e)
		t.select()
	},
	
	/*
	 * Remove the Separator on Focus
	 */
	glNoFocus : function(e) {
		var t = dsxcommon.getSource(e)
		t.value = dsxcommon.glNoRemoveSeparator(t.value)
	},

	/*
	 * Key pressed for glNo field.
	 */
	glNoKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {}
		else {
			if (t.value.length > 14) {
				t.value = t.value.substring(0, 14)
			}
			t.value = dsxcommon.glNoOnKeyDown(t, code)
			t.value = t.value.replace(dsxcommon.regex.notNumbers, '')
		}
	},

	/*
	 * Validate glNo field.
	 */
	glNoValidate : function(e) {
		var dt = dsxcommon.getSource(e)
		if ((dt.value != "") && (dt.value != null)) {
			if (dsxcommon.isValidglNo(dt.value) == false) {
				dt.value = ""
			}
			else {
				dt.value = dsxcommon.glNoAddSeparator(dt.value)
			}
		}
	},
	
	/*-----------------*
	 * PCC No FUNCTIONS *
	 *-----------------*/

	/*
	 * initialize PCC value
	 */
	pccInit : function(e) {
		var t = dsxcommon.getSource(e)
		t.select()
	},
	
	/*
	 * Remove the Separator on Focus
	 */
	pccFocus : function(e) {
		var t = dsxcommon.getSource(e)
		t.value = dsxcommon.pccRemoveSeparator(t.value)
	},

	/*
	 * Key pressed PCC field.
	 */
	pccKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {}
		else {
			if (t.value.length > 14) {
				t.value = t.value.substring(0, 14)
			}
			t.value = dsxcommon.pccOnKeyDown(t, code)
			t.value = t.value.replace(dsxcommon.regex.notNumbers, '')
		}
	},

	/*
	 * Validate PCC field.
	 */
	pccValidate : function(e) {
		var dt = dsxcommon.getSource(e)
		if ((dt.value != "") && (dt.value != null)) {
			if (dsxcommon.isValidpcc(dt.value) == false) {
				dt.value = ""
			}
			else {
				dt.value = dsxcommon.pccAddSeparator(dt.value)
			}
		}
	},
	
	/*-----------------------*
	 * Grid Select FUNCTIONS *
	 *-----------------------*/
	
	/*
	 * Change input to select
	 */
	gridSelectChangeType : function(e) {
		var t = dsxcommon.getSource(e);
		var elem = document.getElementById(t.id);
		var newNode = dsxcommon.changeType(t);
		var list = getJSTLValue();
   		for(index in list) {
   			if (t.value == list[index].value)
   				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, true);
   			else
				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, false);
		}
		
    	var children = elem.childNodes;
    	var parent1 = elem.parentNode;
    	for (var i = 0; i < children.length; i++) {
        	newNode.appendChild(children[i]);
    	}
   		parent1.replaceChild(newNode, elem);
	},
	
	formulaSelectChangeType : function(e) {
		var t = dsxcommon.getSource(e);
		var elem = document.getElementById(t.id);
		var newNode = dsxcommon.changeType(t);
		var list = getJSTLValue1();
   		for (index in list) {
   			if (t.value == list[index].value)
   				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, true);
   			else
				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, false);
		}
		
    	var children = elem.childNodes;
    	var parent1 = elem.parentNode;
    	for (var i = 0; i < children.length; i++) {
        	newNode.appendChild(children[i]);
    	}
   		parent1.replaceChild(newNode, elem);
	},
	
	glSelectChangeType : function(e) {
		var t = dsxcommon.getSource(e);
		var elem = document.getElementById(t.id);
		var newNode = dsxcommon.changeType(t);
		var list = getJSTLValue();
   		for (index in list) {
   			if (t.value == list[index].value)
   				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, true);
   			else
				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, false);
		}
		
    	var children = elem.childNodes;
    	var parent1 = elem.parentNode;
    	for (var i = 0; i < children.length; i++) {
        	newNode.appendChild(children[i]);
    	}
   		parent1.replaceChild(newNode, elem);
	},
	
	glSelectGridFill : function(e) {
		var t = dsxcommon.getSource(e);
		var el = document.getElementById(t.id);
		var v = el.options[el.selectedIndex].value;
		document.write("value: " + v);
		var a = v.split(":");
		var glNo = a[0];
		var pcc = a[1];
		var desc = a[2];
		el.value = el.innerHTML(glNo);
	},
	
	dcSelectChangeType : function(e) {
		var t = dsxcommon.getSource(e);
		var elem = document.getElementById(t.id);
		var newNode = dsxcommon.changeType(t);
		var list = getJSTLValue1();
   		for (index in list) {
   			if (t.value == list[index].value)
   				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, true);
   			else
				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, false);
		}
		
    	var children = elem.childNodes;
    	var parent1 = elem.parentNode;
    	for (var i = 0; i < children.length; i++) {
        	newNode.appendChild(children[i]);
    	}
   		parent1.replaceChild(newNode, elem);
	},
	
	acSelectChangeType : function(e) {
		var t = dsxcommon.getSource(e);
		var elem = document.getElementById(t.id);
		var newNode = dsxcommon.changeType(t);
		var list = getJSTLValue2();
   		for (index in list) {
   			if (t.value == list[index].value)
   				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, true);
   			else
				newNode.options[newNode.options.length] = new Option(list[index].text, list[index].value, false, false);
		}
		
    	var children = elem.childNodes;
    	var parent1 = elem.parentNode;
    	for (var i = 0; i < children.length; i++) {
        	newNode.appendChild(children[i]);
    	}
   		parent1.replaceChild(newNode, elem);
	},
	
	/*
	 * initialize currency value
	 */
	rateInit : function(e) {
		var t = dsxcommon.getSource(e)
		if ((t.value == "") || (t.value == null)) {
			t.value = "0.0000"
		}
		t.select()
	},

	/*
	 * Key pressed for the currency field.
	 */
	rateKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) { return }
		else {
			var k = String.fromCharCode(code)
			var p = new String(t.value + k).indexOf(".")
			if ((p < (t.value.length - 5)) && (p >- 1)) {
				t.value = t.value.substring(0, (t.value.length - 1))
			}
			if (t.value.indexOf("-") > 0) {
				t.value = t.value.substring(0, (t.value.length - 1))
			}
			t.value = t.value.replace(dsxcommon.regex.notCurrency, '')
		}
	},
	
	/*
	 * Validate the currency field.
	 */
	rateValidate : function(e) {
		var t = dsxcommon.getSource(e)
		t.value = t.value.replace(dsxcommon.regex.notCurrency, '') //remove commas
		var validValue = dsxcommon.regex.isDecimal.test(t.value)
		var pos = t.value.indexOf(".")
		if (!validValue) {
			t.value = "0.0000"
		}
		else {
			if (pos == -1) {
				if ((t.value == "") || (t.value == null)) {
					t.value = "0.00"
				}
				else {
					t.value = dsxcommon.addCommasFourDecimal(t.value + ".00")
				}
			}
			else {
				t.value = dsxcommon.addCommasFourDecimal(t.value);
			}
		}
	},
	
	//compute rate
	computeRate : function(e) {
		var t = dsxcommon.getSource(e)
		var programName = document.getElementsByName('programName')[0].value;
		if (programName == "PAR_SetupWageRatesLedgers") {
			payroll.checkEnteredRate(t);
		}
	},
	
	/*----------------*
	 * TIME FUNCTIONS *
	 *----------------*/

	/*
	 * initialize hour and minute (hh:mm) field.
	 */
	timeInit : function(e) {
		var t = dsxcommon.getSource(e)
		t.select()
	},

	/*
	 * Key pressed for hour and minute (hh:mm) field.
	 */
	timeKeypressed : function(e) {
		var t = dsxcommon.getSource(e)
		var code = dsxcommon.getKey(e)
		if (!t) {}
		else {
			if (t.value.length > 5) {
				t.value = t.value.substring(0,5)
			}
			t.value = dsxcommon.timeOnKeyDown(t,code)
			t.value = t.value.replace(dsxcommon.regex.notTime, '')
		}
	},

	/*
	 * Validate hour and minute (hh:mm) field.
	 */
	timeValidate : function(e) {
		var dt = dsxcommon.getSource(e)
		if ((dt.value != "") && (dt.value != null)) {
			if (dsxcommon.isValidtime(dt.value) == false) {
				dt.value = ""
			}
		}
	},
	
	/*-------------------------*
	 * ALPHA-NUMERIC FUNCTIONS *
	 *-------------------------*/
	
	/*
	 * Validate the alphabet only field.
	 */
	alphaValidate : function(e) {
		var t = dsxcommon.getSource(e)
		var validValue = dsxcommon.regex.isAlphabet.test(t.value)
		if (!validValue) {
			t.value = ""
		}
	},
	
	alphaKeyPress : function isAlfa(e) {	   
		var t = dsxcommon.getSource(e)
		var charCode = (e.which) ? e.which : e.keyCode;
	    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 ||charCode > 122)) {
	    	t.value = t.value.replace(dsxcommon.regex.notAlpha, '')
	    }
	},
	
	/*------------------------* 
	 * End of Added Functions *
     * by: Jim Filbert Vaño   *
	 *------------------------*/
	
	/*---------------*
	 * MAIN FUNCTION *
	 *---------------*/

	/*
	 * initialize function
	 */
	init : function() {
		var el, i
		//set auto-complete to off for all input tags
		var inputElements = document.getElementsByTagName("input");
		for (i in inputElements) {
			el = inputElements[i];
			if (el.className && (el.className.indexOf("inputbox") != -1) && (!el.disabled)) {
				el.setAttribute("autocomplete", "off");
			} //if current input element has the input box class set.
		}
		//setup the event listeners for the currency fields
		for (i in this.elementIDs.currency) {
			el = dsxcommon.getObject(this.elementIDs.currency[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.currencyInit, "load")
				dsxcommon.addEvent(el, this.currencyInit, "focus")
				dsxcommon.addEvent(el, this.currencyKeypressed, "keydown")
				dsxcommon.addEvent(el, this.currencyKeypressed, "keyup")
				dsxcommon.addEvent(el, this.currencyValidate, "blur")
			}
		}
		//setup the event listeners for the integer fields
		for (i in this.elementIDs.integer) {
			el = dsxcommon.getObject(this.elementIDs.integer[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.integerInit, "load")
				dsxcommon.addEvent(el, this.integerInit, "focus")
				dsxcommon.addEvent(el, this.integerKeypressed, "keyup")
				dsxcommon.addEvent(el, this.integerValidate, "blur")
			}
		}
		//setup the event listeners for the integer with commas fields
		for (i in this.elementIDs.intwc) {
			el = dsxcommon.getObject(this.elementIDs.intwc[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.integerInit, "load")
				dsxcommon.addEvent(el, this.integerInit, "focus")
				dsxcommon.addEvent(el, this.integerKeypressed, "keyup")
				dsxcommon.addEvent(el, this.intwcValidate, "blur")
			}
		}
		//setup the event listeners for the date fields
		for (i in this.elementIDs.date) {
			el = dsxcommon.getObject(this.elementIDs.date[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.dateInit, "load")
				dsxcommon.addEvent(el, this.dateInit, "focus")
				dsxcommon.addEvent(el, this.dateKeypressed, "keyup")
				dsxcommon.addEvent(el, this.dateValidate, "blur")
			}
		}
		//setup the event listeners for the system date fields
		for (i in this.elementIDs.sysdate) {
			el = dsxcommon.getObject(this.elementIDs.sysdate[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.sysdateInit, "load")
				dsxcommon.addEvent(el, this.sysdateInit, "focus")
				dsxcommon.addEvent(el, this.dateKeypressed, "keyup")
				dsxcommon.addEvent(el, this.dateValidate, "blur")
			}
		}
		//setup the event listeners for the email fields
		for (i in this.elementIDs.email) {
			el = dsxcommon.getObject(this.elementIDs.email[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.stringInit, "focus")
				dsxcommon.addEvent(el, this.emailValidate, "blur")
			}
		}
		//setup the event listeners for the phone number fields
		for (i in this.elementIDs.phone) {
			el = dsxcommon.getObject(this.elementIDs.phone[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.stringInit, "focus")
				dsxcommon.addEvent(el, this.phoneValidate, "blur")
			}
		}
		//setup the event listeners for the cell phone number fields
		for (i in this.elementIDs.cell) {
			el = dsxcommon.getObject(this.elementIDs.cell[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.cellphoneInit, "focus")
				dsxcommon.addEvent(el, this.cellphoneValidate, "blur")
			}
		}
		
		/*----------------------* 
	 	 * Added Functions      *
     	 * by: Jim Filbert Vaño *
	 	 *----------------------*/
		
		//setup the event listeners for the month and year fields
		for (i in this.elementIDs.mmyy) {
			el = dsxcommon.getObject(this.elementIDs.mmyy[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.mmyyInit, "load")
				dsxcommon.addEvent(el, this.mmyyInit, "focus")
				dsxcommon.addEvent(el, this.mmyyKeypressed, "keyup")
				dsxcommon.addEvent(el, this.mmyyValidate, "blur")
			}
		}
		//setup the event listeners for the GL number fields
		for (i in this.elementIDs.glNo) {
			el = dsxcommon.getObject(this.elementIDs.glNo[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.glNoInit, "load")
				dsxcommon.addEvent(el, this.glNoFocus, "focus")
				dsxcommon.addEvent(el, this.glNoKeypressed, "keyup")
				dsxcommon.addEvent(el, this.glNoKeypressed, "keydown")
				dsxcommon.addEvent(el, this.glNoValidate, "blur")
			}
		}
		//Setup the event listeners for the PCC fields
		for (i in this.elementIDs.pcc) {
			el = dsxcommon.getObject(this.elementIDs.pcc[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.pccInit, "load")
				dsxcommon.addEvent(el, this.pccFocus, "focus")
				dsxcommon.addEvent(el, this.pccKeypressed, "keyup")
				dsxcommon.addEvent(el, this.pccKeypressed, "keydown")
				dsxcommon.addEvent(el, this.pccValidate, "blur")
			}
		}
		//setup the event listeners for the grid select
		for (i in this.elementIDs.gridSelect) {
			el = dsxcommon.getObject(this.elementIDs.gridSelect[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.gridSelectChangeType, "focus")
				dsxcommon.addEvent(el, this.gridSelectChangeType, "blur")
			}
		}
		//setup the event listeners for the formula select
		for (i in this.elementIDs.formulaSelect) {
			el = dsxcommon.getObject(this.elementIDs.formulaSelect[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.formulaSelectChangeType, "focus")
				dsxcommon.addEvent(el, this.formulaSelectChangeType, "blur")
			}
		}
		//setup the event listeners for the GL numbers select
		for (i in this.elementIDs.glSelect) {
			el = dsxcommon.getObject(this.elementIDs.glSelect[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.glSelectChangeType, "focus")
				dsxcommon.addEvent(el, this.glSelectGridFill, "blur")
				//dsxcommon.addEvent(el, this.glSelectGridFill, "change")
			}
		}
		//setup the event listeners for the debit/credit select
		for (i in this.elementIDs.dcSelect) {
			el = dsxcommon.getObject(this.elementIDs.dcSelect[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.dcSelectChangeType, "focus")
				dsxcommon.addEvent(el, this.dcSelectChangeType, "blur")
			}
		}
		//setup the event listeners for the amtcode select
		for (i in this.elementIDs.acSelect) {
			el = dsxcommon.getObject(this.elementIDs.acSelect[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.acSelectChangeType, "focus")
				dsxcommon.addEvent(el, this.dcSelectChangeType, "blur")
			}
		}
		//setup the event listeners for the currency fields
		for (i in this.elementIDs.rate) {
			el = dsxcommon.getObject(this.elementIDs.rate[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.rateInit, "load")
				dsxcommon.addEvent(el, this.rateInit, "focus")
				dsxcommon.addEvent(el, this.rateKeypressed, "keydown")
				dsxcommon.addEvent(el, this.rateKeypressed, "keyup")
				dsxcommon.addEvent(el, this.rateValidate, "blur")
				dsxcommon.addEvent(el, this.computeRate, "change")
			}
		}
		//setup the event listeners for the time fields
		for (i in this.elementIDs.time) {
			el = dsxcommon.getObject(this.elementIDs.time[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.timeInit, "load")
				dsxcommon.addEvent(el, this.timeInit, "focus")
				dsxcommon.addEvent(el, this.timeKeypressed, "keyup")
				dsxcommon.addEvent(el, this.timeValidate, "blur")
			}
		}
		
		/*------------------------------* 
	 	 * End of Added Initializations *
     	 * by: Jim Filbert Vaño         *
	 	 *------------------------------*/
		
		//setup the event listeners for the alphabet fields
		for (i in this.elementIDs.alpha) {
			el = dsxcommon.getObject(this.elementIDs.alpha[i])
			if (el != null) {
				dsxcommon.addEvent(el, this.stringInit, "focus")
				dsxcommon.addEvent(el, this.alphaValidate, "blur")
				dsxcommon.addEvent(el, this.alphaKeyPress, "keydown")
				dsxcommon.addEvent(el, this.alphaKeyPress, "keyup")
			}
		}
		
	}
	
}
