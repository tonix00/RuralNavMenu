
/*----------------------------*
 * ON-CLICK/SUBMIT VALIDATION *
 *----------------------------*/

$(window).keydown(function(event) {
	if ((event.keyCode == 13) && ($(event.target)[0] != $("textarea")[0])) {
		event.preventDefault();
		return false;
	}
});

$(document).on("click", ".validateform", function(e) {
	var button = $(this);
	var cont = true;
	var form_id = $(this).data("form");
	$(".flush").remove();
	$(".required").removeClass("is-danger");
	
	if (button.hasClass("prevent")) { return; }
	
	if ((form_id != "undefined") && (form_id != undefined) && (form_id != null) && (form_id != "")) {
		var formid = form_id;
	}
	else {
		var form = $("#" + this.id).closest("form");
		var formid = form.attr("id");
	}
	
	/* LOGIN FORM VALIDATION */
	$('.required').each(function() {
		me = $(this);
//		if (me.val() == "") {
//			cont = false;
//			me.addClass("is-danger");
//			me.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>This field is required.</div>"); /* #861001 */
//		}
//		else
		if (me.hasClass("numeric")) {
			if (!jQuery.isNumeric(me.val())) {
				cont = false;
				me.addClass("is-danger");
				me.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>This field only accepts numbers.</div>"); /* #861001 */
				return true;
			}
		}
		else if (me.data("maxlength")) {
			var length = me.val().length;
			var max = me.data("maxlength");
			if (length > max) {
				cont = false;
				me.addClass("is-danger");
				me.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>Character count must be " + max + " or less.</div>"); /* #861001 */
				return true;
			}
		}
		else if (me.data("minlength")) {
			var length = me.val().length;
			var min = me.data("minlength");
			if (length < min) {
				cont = false;
				me.addClass("is-danger");
				me.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>Character count must be " + min + " or more.</div>"); /* #861001 */
				return true;
			}
		}
		else if (me.data("rlength")) {
			var length = me.val().length;
			var chars = me.data("rlength");
			if (length != chars) {
				cont = false;
				me.addClass("is-danger");
				me.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>Entered value should be equal to " + chars + " characters.</div>"); /* #861001 */
			}
			return true;
		}
	});
	/* END OF LOGIN FORM VALIDATION */
	
	/* ENTRY FORM VALIDATION */
	var programStatus = $("input[name=programStatus]").val();
	if ((form_id != "undefined") && (form_id != undefined) && (form_id != null) && (form_id != "")) {
		if (programStatus == "EnterKey") {
			$("input[name='valRule.key']").each(function() {
				validateElem($(this), $(this).val());
			});
		}
		else {
			$("input[name='valRule.data']").each(function() {
				validateElem($(this), $(this).val());
			});
		}
	}
	
	function validateElem(valRule, valCaption) {
		var idSubStrings = valRule.attr("id").split(".");
		var id = idSubStrings[0];
		var promoFlag = $("input:hidden[name=promoFlag\\.hidden]").val();
		if (id == "currency2" && promoFlag == "Y") { /* do nothing */ }
		else {
			var pName = $("input[name=programName]").val();
			if (pName = "INS_SellInsurance") {
				var groupID = $("input[name=primaryKey]").val().split(":")[0];
				var prodID = $("input[name=primaryKey]").val().split(":")[1];
				/* if (groupID == "IPAF" && prodID == "AXA01") {
					var reqIDs = [ "string6", "string7", "date1", "select4" ];
					if (jQuery.inArray(id, reqIDs) != -1) { id = id + "1"; }
					else { return; }
				}
				else */
				if (groupID == "IPAPF" && (prodID == "UCPB02" || prodID == "UCPB04")) {
					var reqIDs = [ "string20", "string21", "date2", "select11" ];
					if (jQuery.inArray(id, reqIDs) != -1) { id = id + "1"; }
					//else { return; }
				}
				if (groupID == "GPAHF") {
					if (prodID == "CLIMB01") {
						var reqIDs = [ "string28", "string29", "date4", "select17" ];
					}
					else {
						var reqIDs = [ "string19", "string20", "date3", "select9" ];
					}
					if (jQuery.inArray(id, reqIDs) != -1) { id = id + "1"; }
					//else { return; }
				}
			}
			
			var element = $("#" + id);
			if (element) {
				if (element == undefined) { return; }
				
				if (element.attr("name") == undefined) {
					element = $("#" + id + "1");
					if (element == undefined) { return; }
				}
				
				if ((parseFloat(element.val()) == 0) || (element.val() == "") || (element.val() == null)) {
					cont = false;
					if (element.attr("type") == "file") {
						element.parent().closest('div').addClass("is-danger");
						element.parent().closest('div').append("<div class='note flush note-emp' style='color:#ed6c63'>" + valCaption + " field is required.</div>");
					}
					else {
						element.addClass("is-danger");
						element.parent().append("<div class='note flush note-emp' style='color:#ed6c63'>" + valCaption + " field is required.</div>"); /* #861001 */
					}
				}
			}
		}
	}
	/* END OF ENTRY FORM VALIDATION */
	
	/* VALIDATE TOTAL TRANSACTION AMOUNT VS. BALANCE */
	var progName = $("input[name=programName]").val();
	if (progName == "BIL_EnterBillsPayment" || progName == "BIL_EnterTopUp" || progName == "BKO_BookFlights" || 
		progName == "RMT_SendRemittance" || progName == "RMT_AmendRemittance") {
		
		if (button.val().indexOf("Download") >= 0) { /* do nothing */ }
		else {
			var pageNum = $("input[name=pageNo]").val();
			var totalNum = $("input[name=totalPages]").val();
			if (pageNum == totalNum) {
				var clientCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
				//var begBal = parseFloat(dsxcommon.removeAllCommas($('.runningbalance').text().trim().replace(/[^0-9\.,-]/g, "")));
				var begBal = parseFloat(dsxcommon.removeAllCommas($('input[name=begBal]').val()));
				if (progName == "RMT_AmendRemittance") { var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=ammendFee]').val())); }
				else { var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=totAmt]').val())); }
				if (totAmt > begBal) {
					if (clientCode == "RNT") { /* do nothing */ }
					else {
						swal({
							title: 'Insufficient Balance!', 
							text: 'Should you wish to continue using this service, please replenish immediately to avoid interruption. Thank you.', 
							type: 'error', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
						e.preventDefault();
						return;
					}
				}
			}
		}
	}
	
	if (cont == false) {
		//focus (or scroll) to the first element that is empty but required
	    $('html, body').stop().animate({ scrollTop: $('.is-danger:first').offset().top }, 500);
	    setTimeout(function() { $('.is-danger:first').focus(); }, 500);
	}
	
	if (cont == true) {
		if ($("input[name=programName]").val() == "INS_SellInsurance" || $("input[name=programName]").val() == "INS_RenewInsurance") {
			/*
			if ($("#cb-beneficiaries").length) {
				if ($("#cb-beneficiaries").is(':checked')) { *//* do nothing *//* }
				else {
					swal({
						title: 'Kindly check the accuracy of the beneficiary details entered by checking the BENEFICIARY confirmation box.', 
						text: '', 
						type: 'info', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					e.preventDefault();
					return;
				}
			}
			*/
			
			if ($(".confirm-msp-checkbox").length) {
				if ($(".confirm-msp-checkbox").is(':checked')) { /* do nothing */ }
				else {
					swal({
						title: 'Kindly check the accuracy of the details entered by checking the MOTORSHIELD PLUS confirmation box.', 
						text: '', 
						type: 'info', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					e.preventDefault();
					return;
				}
			}
			
			if ($(".confirm1-checkbox1").length) {
				if ($(".confirm1-checkbox1").is(':checked')) { /* do nothing */ }
				else {
					swal({
						title: 'Kindly check the accuracy of the details entered by checking the EXCLUSION confirmation box.', 
						text: '', 
						type: 'info', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					e.preventDefault();
					return;
				}
			}
			
			if ($(".confirm2-checkbox1").length) {
				if ($(".confirm2-checkbox1").is(':checked')) { /* do nothing */ }
				else {
					swal({
						title: 'Kindly check the accuracy of the details entered by checking the HEALTH DECLARATION confirmation box.', 
						text: '', 
						type: 'info', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					e.preventDefault();
					return;
				}
			}
		}
		
		if ($(".confirm-checkbox").length) {
			if ($(".confirm-checkbox").is(':checked')) { changeBtnLabelToSpinner(button); }
			else {
				swal({
					title: 'Kindly check the accuracy of the details entered by checking the ACKNOWLEDGEMENT confirmation box.', 
					text: '', 
					type: 'info', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
			}
		}
		else {
			if ($("input[name=programName]").val() == "SET_ConsolidateAndBill") {
				var dismiss = $("[name=specialParam1]").val();
				if (dismiss = "cancel") { /* do nothing */ }
				else { changeBtnLabelToSpinner(button); }
			}
			else { changeBtnLabelToSpinner(button); }
		}
		
		if (button.val() == 'Proceed') {
			if ($("input[name=programName]").val() == 'INS_CancelTrn' || $("input[name=programName]").val() == 'INS_VoidTrn') {
				var actionLabel = '';
				if ($("input[name=programName]").val() == 'INS_InsuranceCancellationEntry') { actionLabel = 'cancellation'; }
				else { actionLabel = 'voiding'; }
				
				e.preventDefault();
				swal({
					title: 'Please be reminded that the ' + actionLabel + ' of this insurance is irreversible.',
					text: 'Do you still want to continue?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					swal({
						title: 'PROCESSING... PLEASE WAIT...', 
						showConfirmButton: false,
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					setTimeout(function() { $("button[value=Save]").click(); }, 1000); //submit
				});
			}
		}
	}
	else {
		if ($("input[name=programName]").val() == "SET_DayEndPayOut" || 
			($("input[name=programName]").val() == "BIL_BillsPayment" && $("input[name=pageNo]").val() == 3) || 
			button.val().indexOf("Download") >= 0) {
			
			changeBtnLabelToSpinner(button);
		}
		else { e.preventDefault(); }
	}
	
	function changeBtnLabelToSpinner(button) {
		//disables another click after this button is clicked/submitting
		var programName = $("input[name=programName]").val();
		var pageNo = $("input[name=pageNo]").val();
		if ((programName == "PRC_EnterRequest" && pageNo == 2)) { /* do nothing */ }
		else {
			if (button.hasClass("submit-active")) { return; }
			button.addClass('submit-active');
		}
		
		$("button").each(function() {
			var clickedBtnVal = button.val();
			var buttonVal = $(this).val();
			if (escape(buttonVal) == escape(clickedBtnVal)) {
				if (buttonVal.indexOf("Download") >= 0) { return false; }
				else {
					var action = "";
					if (buttonVal.indexOf("Pay") >= 0) { action = "Processing payment..."; }
					else if (buttonVal == "Login") { action = "Logging in..."; }
					else if (buttonVal == "Generate COC") { action = "Generating COC..."; }
					else if (buttonVal == "Generate Itinerary Receipt") { action = "Generating Itinerary Receipt..."; }
					else if (buttonVal.endsWith("e")) { action = buttonVal.substring(0, buttonVal.length - 1) + "ing..."; }
					else { action = buttonVal + "ing..."; }
					
					if ($("input[name=programName]").val() == "INS_InsuranceMonthlyCancellation" || 
						$("input[name=programName]").val() == "INS_InsuranceMonthlyPayment" || 
						$("input[name=programName]").val() == "INS_CancelTrn" || 
						$("input[name=programName]").val() == "INS_VoidTrn") {
						
						if (buttonVal == "Process Payment" || buttonVal == "Process Cancellation" || buttonVal == "Proceed") {}
						else {
							$(this).html("<i class='fa fa-spin fa-spinner' style='color:white'></i>&nbsp;" + action + " Please wait...");
						}
					}
					else {
						$(this).html("<i class='fa fa-spin fa-spinner' style='color:white'></i>&nbsp;" + action + " Please wait...");
					}
				}
			}
		});
	}
	
});
