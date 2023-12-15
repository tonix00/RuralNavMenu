
/*-----------------------------------------------------------------------------*
 * Function Name: toggleSelectOptions                                          *
 * Parameters:                                                                 *
 * a.) select_id = id of the select input type whose options are to be changed *
 * b.) hidden_input_id = id of the hidden input where the options are stored   *
 *-----------------------------------------------------------------------------*/

function toggleSelectOptions(select_id, hidden_input_id) {
	var select = $("select[name=" + select_id + "]");
	var input;
	if (hidden_input_id == "all") { 
		$("#hidden-billers :input").each(function() {
			input += $(this).val();
		});
	}
	else {
		input = $("input[name=" + hidden_input_id + "]").val();
	}
	var options = input.split(",");
	var options2
	select.empty(); //remove old options
	$.each(options, function(key, value) {
		options2 = value.split("|");
		if (options2[0] != "") {
			select.append($("<option></option>").attr("value", options2[0]).text(options2[1]));
		}
	});
}

/*--------------------------------------------------------*
 * Function Name: enableControl                           *
 * Parameter: control_id = id of the input type to enable *
 *--------------------------------------------------------*/

function enableControl(control_id) {
	var control = $("#" + control_id);
	control.prop("disabled", false);
}

$(document).ready(function() {
	
	/*---------------------*
	 * LIBRARY IMPORT INIT *
	 *---------------------*/
	
	$(".flatpickr").flatpickr({ dateFormat: "m/d/Y" });
	
	/*--------------------*
	 * ON-CLICK FUNCTIONS *
	 *--------------------*/
	
	//toggleSelectOptions
	$(document).on("click", ".toggleSelectOptions", function(e) {
		e.preventDefault();
		var me = $(this);
		var params = me.data("tso_params").split(",");
		toggleSelectOptions(params[0], params[1]);
	});
	
	//enableControl
	$(document).on("click", ".enableControl", function(e) {
		e.preventDefault();
		var me = $(this);
		var param = me.data("ec_param");
		enableControl(param);
	});
	
	//radio buttons control
	$(document).on("click", ".ctrl-radio", function(e) {
		e.preventDefault();
		var me = $(this);
		var control = me.data("control");
		var value = me.data("value");
		$("#" + control).val(value);
		
		//disable all effects
		$(".ctrl-radio").removeClass("is-info");
		$(".ctrl-radio").find("i").removeClass("fa-check_square-o");
		$(".ctrl-radio").find("i").addClass("fa-square-o");
		
		//add effects to clicked
		me.addClass("is-info");
		me.find("i").removeClass("fa-square-o");
		me.find("i").addClass("fa-check-square-o");
	});
	
	//table entry row cloning
	$(document).on("click", ".add-clone", function(e) {
		e.preventDefault();
		me = $(this);
		var target = me.data("target");
		var source = me.data("source");
		
		$(source + " table tr").clone(true, true).appendTo(target);
		
		var num = $(target + " .item-num");
		var count = "1";
		num.each(function() {
			$(this).html(count);
			count++;
		});
		
		updateColumns(target, "titleType");
		updateColumns(target, "location");
		updateColumns(target, "titleNo");
		updateColumns(target, "owner");
		updateColumns(target, "noOfCopies");
		
		//set maximum entries to last count
		$("[name=maxEntries]").val(count);
	});
	
	$(document).on("click", ".remove-row", function(e) {
		e.preventDefault();
		var value = $(this).closest("tbody");
		$(this).closest("tr").remove();
		
		var id = value.attr("id");
		var num = $("#" + id).find(".item-num");
		
		console.log(num);
		var count = "1";
		num.each(function() {
			$(this).html(count);
			count++;
		});
		
		updateColumns("#" + id, "titleType");
		updateColumns("#" + id, "location");
		updateColumns("#" + id, "titleNo");
		updateColumns("#" + id, "owner");
		updateColumns("#" + id, "noOfCopies");
		
		//set maximum entries to last count
		$("[name=maxEntries]").val(count);
	});
	
	function checkIfAllIsFilledInGroup() {
		var returnValue = true;
		$(".input-execute").each(function() {
			var me = $(this);
			var val = me.val();
			//var isDisabled = me.hasClass("inputboxdisabled");
			if (val == "" || val == null || val == "0"/* || isDisabled*/) {
				returnValue = false;
				return returnValue;
			}
			else {
				returnValue = true;
			}
		});
		return returnValue;
	}

	var eventType = "";
	var programName = $("[name=programName]").val();
	if (programName == "SET_SetupFunding" || programName == "SET_SetupAdjustments" || programName == "SET_SetupFundTransfer" || 
		programName == "PAR_SetupBanner") { eventType = "blur change"; }
	else { eventType = "change"; }
	$(document).on(eventType, ".input-execute", function(e) {
		var me = $(this);
		if (checkIfAllIsFilledInGroup()) {
			swal({
				title: 'VERIFYING... PLEASE WAIT...', 
				showConfirmButton: false,
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			setTimeout(function() {
				$("[value=Verify]").removeClass("validateform");
				$("[value=Verify]").click();
			}, 1000);
		}
		else {
			var elemID = me.attr("id");
			if (elemID.indexOf("Go") >= 0) {
				swal({
					title: 'VERIFYING... PLEASE WAIT...', 
					showConfirmButton: false,
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				setTimeout(function() {
					$("[value=Go]").removeClass("validateform");
					$("[value=Go]").click();
				}, 1000);
			}
		}
	});
	
});

function updateColumns(targetId, elemName) {
	var index = "1";
	var elems = $(targetId).find("[name^=" + elemName + "]");
	elems.each(function() {
		$(this).attr("id", elemName + index);
		$(this).attr("name", elemName + index);
		index++;
	});
}
