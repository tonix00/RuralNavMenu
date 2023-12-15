/*------------------------------------------*
 * File     : branchselector.js             *
 * Author   : Francis Albert Tonog          *
 * Date     : 04 October 2011               *
 * Function : branch code selector on login *
 *------------------------------------------*/

var branchselector = {
	
	contextPath : "",
	
	/* initialize variables */	
	init : function(contextPath) {	
		this.contextPath = contextPath;
		this.onEvent();
	},
		
	onEvent : function() {
		var elemLoginName = $("input[name='loginName']")
		var elemPassword = $("input[name='password']")
		var errorBox = $("#login-alert-container")
		var error = $("#login-alert-content")
		
		elemLoginName.bind({
			focus : function() {
				$(this).val("")
				elemPassword.val("")
				error.text("")
				errorBox.hide()
				$(this).focus()
			},
			blur : function() {
				var loginName = $(this).val().toUpperCase()
				if (loginName.length > 0) {
					$.getJSON(branchselector.contextPath + "/jsp/ajax/branch-ajax.jsp", {loginName:loginName}, function(jsonObj) {
						if ($.trim(jsonObj.loginName) == "SYSMANAGER") {
							error.text("")
							errorBox.hide()
						}
						else if ($.trim(jsonObj.loginName) == "") {
							elemLoginName.val("")
							errorBox.show()
							error.text(jsonObj.errorMessage)
				 		}
					 	else {
					 		if (jsonObj.updateFlag) {
						 		error.text("")
						 		errorBox.hide()
					 		}
					 		else {
					 			errorBox.show()
					 			error.text("User account needs activation! Please contact RuralNet Customer Service.")
					 		}
					 	}
					})
				}
			}
		});
		
		elemPassword.bind({
			focus : function() {
				$(this).removeAttr('readonly')
				$(this).val('')
			},
		});
	}
	
}
