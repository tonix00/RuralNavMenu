/*--------------------------------------------*
 * File     : validator.js                    *
 * Author   : Francis Albert N. Tonog         *
 * Date     : 10 august 2010                  *
 * Function : validation for empty input tags *
 *--------------------------------------------*/

var validator = {

	passed : true,
	errorMessage : "",

	validate : function (valRule, valCaption) {
		this.isEmpty(valRule, valCaption)
	},

	isEmpty : function (valRule, valCaption) {
		var id = this.getId(valRule)
		var element = document.getElementById(id)
		if (element) {
			if ((element.value == "") || (element.value == null)) {
				this.passed = false
				var message = "The " + valCaption + " field cannot be empty.<br>"
				this.appendMessage(message)
			}
		}
	},

	getId : function(valRule) {
		var idSubStrings = valRule.id.split(".")
		return(idSubStrings[0])
	},

	appendMessage : function(message) {
		this.errorMessage += message
	},

	writeError : function() {
		if (this.errorMessage != "") {
			document.getElementById("errors").innerHTML = this.errorMessage
		}
		else {
			document.getElementById("errors").innerHTML = ""
		}
	},

	validateData : function() {
		var valrulesdata = document.getElementsByName("valRule.data")
		this.errorMessage = ""
		this.passed = true
		for (i = 0; i < valrulesdata.length; i++) {
			var valRule = valrulesdata[i]
			var valCaption = valrulesdata[i].value
			this.validate(valRule, valCaption)
		}
		this.writeError();
		return (this.passed);
	},

	validateKeys : function() {
		var valruleskey = document.getElementsByName("valRule.key")
	    this.errorMessage = ""
	    this.passed = true
		for (i = 0; i < valruleskey.length; i++) {
			var valRule = valruleskey[i]
			var valCaption = valruleskey[i].value
			this.validate(valRule, valCaption)
		}
		this.writeError();
		return (this.passed);
	}
	
}
