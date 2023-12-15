
$(document).ready(function() {
	
	/*--------------------------------*
	 * INITIALIZES THE SYSTEM SCRIPTS *
	 *--------------------------------*/
	
	systemtimeandday();
	dsxvalidator.init();
	dsxvalidator.focusOnField();
	
	//scroll page to the field on (cursor) focus
	if ($(".notification.is-red").length) {
		$("body, html").animate({ scrollTop: $(".notification.is-red").offset().top - 20 });
	}
	else if ($(".notification.is-green").length) {
		$("body, html").animate({ scrollTop: $(".notification.is-green").offset().top - 20 });
	}
	else if ($(".notification.is-info").length && !$(".notification.is-info").hasClass("referrer-bonus")) {
		$("body, html").animate({ scrollTop: $(".notification.is-info").offset().top - 20 });
	}
	else {
		var lastFieldFocusID = $("[name=lastFieldFocus]").val();
		if (lastFieldFocusID && lastFieldFocusID != "") {
			$("body, html").animate({ scrollTop: $("#" + lastFieldFocusID + "").offset().top - 30 });
			$("#" + lastFieldFocusID + "").focus();
			$("#" + lastFieldFocusID + "").select();
		}
		else {
			if ($(':focus').length) {
				var focusedElemID = $(':focus').attr('id');
				$("body, html").animate({ scrollTop: $("#" + focusedElemID + "").offset().top - 30 });
			}
			else {
				if ($("#form-id").length) {
					$("body, html").animate({ scrollTop: $("#form-id").offset().top - 20 });
				}
			}
		}
	}
	
	/*--------------------------------------*
	 * DISABLE F5 BUTTON AND PAGE RELOADING * 
	 *--------------------------------------*/
	
	function disablePageReload(e) {
		if (((e.which || e.keyCode) == 116) || 
			((e.metaKey || e.ctrlKey) && (String.fromCharCode(e.which).toLowerCase() === 'r'))) {
			
			swal({
				title: 'Page reloading has been disabled while your logged-in!', 
				text: 'You can go to your Browser Settings and Clear Cache to refresh/reload or you can logout and then refresh/reload.', 
				type: 'info',
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			e.preventDefault();
		}
	};
	//disable f5
	$(document).bind("keydown", disablePageReload); /* jQuery < 1.7 */
	$(document).on("keydown", disablePageReload); /* jQuery >= 1.7 */
	//re-enable f5
	//$(document).unbind("keydown", disableF5); /* jQuery < 1.7 */
	//$(document).off("keydown", disableF5); /* jQuery >= 1.7 */
	
	/*-----------------------------*
	 * DATATABLES FOR HTML REPORTS *
	 *-----------------------------*/
	
	isTableLoaded('#report-container table', 100);
	isTableLoaded('#hospitalTable10', 100);
	isTableLoaded('#hospitalTable11', 100);
	
	function isTableLoaded(selector, time) {
        if ($(selector).length) {
        	$(selector).DataTable({
    			"pagingType": "full_numbers",
    			"aaSorting": []
    		});
            return;
        }
        else {
            setTimeout(function() {
            	isTableLoaded(selector, time);
            }, time);
        }
    }
	
	/*-----------*
	 * FANCY BOX *
	 *-----------*/
	
	$('[data-fancybox]').fancybox({
		protect: true
	});
	
	/*-------------------------*
	 * VARIABLE INSTANTIATIONS *
	 *-------------------------*/
	
	var programName = $("input[name=programName]").val();
	if (programName == undefined) { programName = getHrefParameter(window.location.href, "programName"); }
	if (typeof programName == 'undefined') { programName = getUrlParameter("programName"); }
	
	/*-----------------------------------*
	 * DISABLE FOCUS FOR READONLY INPUTS *
	 *-----------------------------------*/
	
	$(document).on("focus", "input[readonly]", function() {
		$(this).blur();
    });
	
	/*---------------------------------------------------*
	 * DISABLE MY ACCOUNT MENU ITEM FOR NEW USER PROGRAM *
	 *---------------------------------------------------*/
	
	if (programName == 'MGR_NewUser') {
		$("a.navbar-item").click(function() {
			var navbar_item = $(this).text().trim();
			if (navbar_item == 'My Account') { return false; }
	    });
		
		//validate password fields
		$("button[value=Save]").addClass('disabledbtn');
		$("button[value=Save]").attr('disabled', true);
		$("input[name=reconfirmPassword]").on("blur change", function() {
			var oldPassword = $("input[name=password]").val();
			if (oldPassword == "") {
				swal({
					text: 'Please enter your old password!', 
					type: 'error',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				return;
			}
			
			var newPassword = $("input[name=newPassword]").val();
			if (newPassword == "") {
				swal({
					text: 'Please enter your new password!', 
					type: 'error',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				return;
			}
			
			var reconfirmPassword = $(this).val();
			if (reconfirmPassword == "") {
				swal({
					text: 'Please re-enter and confirm your new password!', 
					type: 'error',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				return;
			}
			
			var loginName = $("input[name=primaryKey]").val();
			$.getJSON(getContextPath() + "/jsp/ajax/validate-passwords-ajax.jsp", {loginName:loginName, oldPassword:oldPassword, 
				newPassword:newPassword, reconfirmPassword:reconfirmPassword}, function(jsonObj) {
				
				if ($.trim(jsonObj.errorMessage) == "") {
					$("button[value=Save]").removeClass('disabledbtn');
					$("button[value=Save]").attr('disabled', false);
					swal({
						text: 'Passwords verification successful! Click [Save] to proceed.', 
						type: 'success',
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
		 		}
				else {
					$("input[name=password]").val("");
					$("input[name=newPassword]").val("");
					$("input[name=reconfirmPassword]").val("");
					$("button[value=Save]").addClass('disabledbtn');
					$("button[value=Save]").attr('disabled', true);
					swal({
						text: jsonObj.errorMessage, 
						type: 'error',
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					return;
				}
			})
		});
	}
	
	/*----------------------------------*
	 * APPENDS AN ASTERISK (*) [IN RED] *
	 * TO THE INPUT LABEL AS REQUIRED.  *
	 *----------------------------------*/
	
	$(".required").each(function() {
		var elem_name = $(this).attr("name");
		var lastChar = elem_name[elem_name.length - 1];
		
		if (elem_name.indexOf("fam") >= 0 || elem_name.indexOf("em") >= 0) {
			if (lastChar >= 2) {
				$(this).removeClass("required");
				return;
			}
		}
		
		$(this).parent().prev("label").addClass("required-mark");
	});
	
	/*----------------------------------------*
	 * SETS THE AMOUNT FIELDS FONT PROPERTIES *
	 *----------------------------------------*/
	
	$("input[id^=currency]").each(function() {
		this.style.setProperty('font-size', '12px', 'important');
		this.style.setProperty('font-weight', 'bold', 'important');
    });
	
	/*--------------------------------------------*
	 * AUTOMATION OF KEY(S) HANDLING WITHOUT THE  *
	 * ACTUAL USING/CLICKING OF GO/VERIFY BUTTONS *
	 *--------------------------------------------*/
	
	function addToolTipAttributes(element, tooltip) {
		element.data('tooltip', tooltip);
		element.attr('data-tooltip', tooltip);
		var tooltipDirection = 'top';
		element.data('tooltip-direction', tooltipDirection);
		element.attr('data-tooltip-direction', tooltipDirection);
		element.addClass('warning');
	}
	
	$('*[id*=Go]:visible').each(function() {
		var tooltip = 'You need to fill up the required fields first and ' +  
	  	  			  'then \'Press Tab\' or \'Click ANYWHERE OUTSIDE of this field\' for the verification process to take effect!';
		addToolTipAttributes($(this), tooltip);
		
		if ($(this).hasClass("input-execute")) { return; }
		
		var eventType = '';
		var elementType = $(this).prop('nodeName');
		if (elementType == 'SELECT') { eventType = 'change'; } //change event for select tags
		else { eventType = 'blur' } //blur event for other tags
		$(this).on(eventType, function() {
			if ($(this).val() != "") {
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
		});
	});
	
	$('*[id*=Verify]:visible').each(function() {
		var tooltip = 
			'You need to fill up the required fields first and ' +  
			'then \'Press Tab\' or \'Click ANYWHERE OUTSIDE of this field\' for the verification process to take effect!';
		addToolTipAttributes($(this), tooltip);
	});
	
	/*------------------------------------------------------------*
	 * DISABLE NEW/NEW TRANSACTION AND CANCEL/HOME BUTTONS IF     *
	 * DOWNLOAD & PRINT COLLECTION SLIP BUTTON IS NOT YET CLICKED *
	 *------------------------------------------------------------*/
	
	if (programName != 'INC_UploadDocs') {
		$("button").each(function() {
			var buttonVal = $(this).val();
			if (escape(buttonVal).indexOf("Download") >= 0) {
				$('button[value="New Transaction"]').attr("disabled", "disabled");
				$('button[value="New Transaction"]').prop("disabled", true);
				$('button[value="New Transaction"]').addClass("disabledbtn");
				$("button[value=Home]").attr("disabled", "disabled");
				$("button[value=Home]").prop("disabled", true);
				$("button[value=Home]").addClass("disabledbtn");
				return false;
			}
		});
		
		$("button").click(function() {
			var buttonVal = $(this).val();
			if (escape(buttonVal).indexOf("Download") >= 0) {
				$('button[value="New Transaction"]').removeAttr("disabled");
				$('button[value="New Transaction"]').prop("disabled", false);
				$('button[value="New Transaction"]').removeClass("disabledbtn");
				$("button[value=Home]").removeAttr("disabled");
				$("button[value=Home]").prop("disabled", false);
				$("button[value=Home]").removeClass("disabledbtn");
			}
		});
	}
	
	$("[id*=Cell], [id*=cell]").each(function() {
		if ($(this).attr("name") == "docContactNo" || $(this).attr("name") == "ben1ContactNo" || 
			$(this).attr("name") == "ben2ContactNo") { return; }
		
		var tooltip = 'Mobile Phone Number is required to receive texts (SMS) notifications.';
		addToolTipAttributes($(this), tooltip);

		var each_elem = $(this);
		$(each_elem).blur(function() {
			var elem = $(this);
			var val = elem.val();
			var len = val.length;
			if (val == '+63') {
				swal({
					title: 'Mobile/Cell Number is required! It must start with either +639 or 09.',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					elem.focus();
				});
			}
			else if (val.substring(0, 2) == '09') {
				if (len != 11) {
					elem.val("");
					swal({
						title: 'Invalid Mobile/Cell Number length!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						elem.focus();
					});
				}
			}
			else if (val.substring(0, 4) == '+639') {
				if (len != 13) {
					elem.val("");
					swal({
						title: 'Invalid Mobile/Cell Number length!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						elem.focus();
					});
				}
			}
			else {
				elem.val("");
				swal({
					title: 'Mobile/Cell Number is required! It must start with either +639 or 09.',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					elem.focus();
				});
			}
		});
	});
	
	/*-----------------------*
	 * TABLE ON TABS CONTROL * 
	 *-----------------------*/
	
	if ($(".tab-table")) {
		$("li.tab-item").click(function(e) {
			e.preventDefault();
			
			$("li.tab-item").removeClass("is-active"); //reset all tabs to inactive
			$(this).addClass("is-active"); //set current tab as active
			
			var targettable = $(this).attr("data-target");
			$(".tab-table").removeClass("is-hidden"); //reset all tab tables
			$(".tab-table").addClass("is-hidden"); //hide all tab tables
			//show selected table
			$("#" + targettable).removeClass("is-hidden");
			$("#" + targettable).show();
		});
	}
	
	/*------------------------------------------------------*
	 * DOWNLOAD FILE SCRIPT FOR FIELDS WITH DOWNLOAD BUTTON * 
	 *------------------------------------------------------*/
	
	$("#select-search-download-btn").click(function(e) {
		e.preventDefault();
		var tempFileName = $("input:hidden[name=templateFileName\\.hidden]").val();
		var dlFileName = tempFileName + "Template.xlsx";
		if (dlFileName) {
			//var downloadUrl = getContextPath() + "/data/spl/" + dlFileName;
			var downloadUrl = getContextPath() + "/data/templates/" + dlFileName;
			window.open(downloadUrl, '_blank');
			return false;
		}
		else {
			swal({
				text: 'No file found for download!', 
				type: 'error',
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		}
	});
	
	/*-----------*
	 * INSURANCE *
	 *-----------*/
	
	$('.fa-print').each(function() {
		if ($(this).parent().next().text() == 'Print Form') {
			$(this).parent().next().attr('class', 'printform');
		}
	});
	 
	$('.printform').click(function(e) {
		e.preventDefault();
		var hrefVal = $(this).closest('a').attr('href');
		var productID = getHrefParameter(hrefVal, "primaryKey");
		var clientCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
		if (productID.indexOf("PBAC") >= 0) {
			if (clientCode == "KGM") {
				window.open("https://drive.google.com/open?id=1A-c2FiWhZAb64mhN7dMTj529uwufCyPx", "_blank");
			}
			else {
				window.open("https://drive.google.com/open?id=1sbkDITWDkKdIJao22ainE-MMfPTzRhlp", "_blank");
			}
		}
		else if (productID.indexOf("PGA") >= 0) {
			if (clientCode == "HLP") {
				window.open("https://drive.google.com/open?id=11std1pS3-fKQ78d2kCmWqTuVBjPyIMY5", "_blank");
			}
			else if (clientCode == "TPT") {
				window.open("https://drive.google.com/open?id=1RVE48Br9P4DZl1QbiHop_x6eVOWdgoZF", "_blank");
			}
			else if (clientCode == "MTI") {
				window.open("https://drive.google.com/file/d/1UQlXbNlfPZT1J0XtcZ3bR1K5fK_XbBJ3/view", "_blank");
			}
			else { window.open("https://drive.google.com/open?id=17Lz9rttqnvlhh5NoUVOI6D2bHZK759OU", "_blank"); }
		}
		else if (productID.indexOf("MAA") >= 0) {
			if (clientCode == "HLP") {
				window.open("https://drive.google.com/open?id=1QVnH0lRoGIINnYO0f5uUxq1WgazRDxAL", "_blank");
			}
			else if (clientCode == "TPT") {
				window.open("https://drive.google.com/open?id=1fQJEgBmQRkA7Sa07FMxVSk6zzx4QZ31s", "_blank");
			}
			else {
				window.open("https://drive.google.com/open?id=1sbkDITWDkKdIJao22ainE-MMfPTzRhlp", "_blank");
			}
		}
		else if (productID.indexOf("GEN") >= 0) {
			if (clientCode == "HLP") {
				window.open("https://drive.google.com/open?id=1PEB5mhS5D9Bnaylgm33G_oUfTomRvnUX", "_blank");
			}
			else if (clientCode == "TPT") {
				window.open("https://drive.google.com/open?id=1gAgH2xMbNqfllFva39-TvGOTU1YZK8y1", "_blank");
			}
			else {
				window.open("https://drive.google.com/open?id=1k5DTAj3NJXyyRtmDn_ftt0TqCSGp9Nw8", "_blank");
			}
		}
		else if (productID.indexOf("AXA") >= 0) {
			if (clientCode == "SCS") {
				window.open("https://drive.google.com/open?id=1SJcGsF54d1pmb847z7jkacOeDxGyhlyr", "_blank");
			}
			else if (clientCode == "FVB") {
				window.open("https://drive.google.com/open?id=1l93p4CVvFcZUoGk6n8PSBviduhAk1kE4", "_blank");
			}
			else if (clientCode == "GRB") {
				window.open("https://drive.google.com/open?id=16yYNPXB03r9YUFdDZOv_vW3neRZWLGZC", "_blank");
			}
			else if (clientCode == "SBI") {
				window.open("https://drive.google.com/open?id=1gf-Ws6kBlTkj_sLtGjsq1VJT0bTEpo5y", "_blank");
			}
			else {
				window.open("https://drive.google.com/open?id=1sbkDITWDkKdIJao22ainE-MMfPTzRhlp", "_blank");
			}
		}
		else if (productID.indexOf("CLI") >= 0) {
			if (clientCode == "SED") {
				window.open("https://drive.google.com/open?id=1IUSOkvCmg3kipPPmKzKKj3WWxFBb57p5", "_blank");
			}
			else {
				window.open("https://drive.google.com/open?id=1DGTAfl7RF9GzffbDpaUGGLwjaDCOyIGK", "_blank");
			}
		}
		else if (productID.indexOf("UCPB") >= 0) {
			if (productID == "UCPB02" || productID == "UCPB04") {
				if (clientCode == "OPH") {
					window.open("https://drive.google.com/file/d/1wbRaYLC4xx747rkLki30gSayHdFZAF1_/view", "_blank");
				}
				else if (clientCode == "GAT") {
					window.open("https://drive.google.com/open?id=1mTGpJzJfWQ700Tg9xQfYdRYzsi3JaiBC", "_blank");
				}
				else {
					window.open("https://drive.google.com/file/d/1O6iS4fkl1oGzbLqnuzONvl18RZBiNIwS/view", "_blank");
				}
			}
			else {
				window.open("https://drive.google.com/open?id=1sbkDITWDkKdIJao22ainE-MMfPTzRhlp", "_blank");
			}
		}
		else {
			window.open("https://drive.google.com/open?id=1sbkDITWDkKdIJao22ainE-MMfPTzRhlp", "_blank");
		}
		return false;
	});
	
	if (programName == 'INS_ViewProductTerms') {
		$('.panel-block').click(function() {
			var panelBlockValue = $(this).text().trim();
			if (panelBlockValue.indexOf("DOWNLOAD") >= 0) {
				var clientCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
				if (clientCode == "KGM") {
					var hrefVal = $(this).parent().next('a').attr('href');
					var primaryKey = getHrefParameter(hrefVal, "primaryKey");
					var insProductID = primaryKey.split(":")[1];
					if (insProductID == "PBAC02") {
						window.open("https://drive.google.com/open?id=1FRSyZjP2n-eURtX78dprivG1ynAJ4goN");
					}
					else if (insProductID == "PBAC03") {
						window.open("https://drive.google.com/open?id=1b7C_qNMYQJPqn9aOwTz_fyCsx03bsdAJ");
					}
					else if (insProductID == "PBAC04") {
						window.open("https://drive.google.com/open?id=1CsSIi6O_2S__yjjvtdxIiGQ4BCVeFuyv");
					}
					else if (insProductID == "PBAC05") {
						window.open("https://drive.google.com/open?id=1KRgs4Ns5AtDmZ2J8HMYh-MF31uF2Smga");
					}
				}
			}
			else {
				var position = $($(this).attr("href")).offset().top;
				$("body, html").animate({ scrollTop: position });
			}
			return false;
		});
	}
	
	$('button[value="Generate COC"]').attr('disabled');
	$('button[value="Generate COC"]').prop('disabled', true);
	$('button[value="Generate COC"]').addClass('disabledbtn');
		
	$('button[value="Download & Print Collection Slip"]').click(function() {
		$('button[value="Generate COC"]').removeAttr('disabled');
		$('button[value="Generate COC"]').prop('disabled', false);
		$('button[value="Generate COC"]').removeClass('disabledbtn');
	});
		
	//Generate COC
	if (programName == 'INS_InsuranceMonthlyPayment') { /* do not go to INS_DownloadCOC */ }
	else {
		$('button[value="Generate COC"]').click(function() {
			$('[name=programName]').val('INS_DownloadCOC');
		});
	}
	
	if (programName == 'INS_SelectProduct') {
		$(".category-btn").click(function() {
			var text = $(this).text().trim();
			if (text == "All Products") {
				//$("#trnTypesList").fadeOut();
				//$("#productsList").fadeIn();
			}
			else {
				$("#trnTypesList").fadeIn();
				$("#productsList").fadeOut();
			}
			
			$(".category-btn").each(function() {
				$(this).removeClass("is-vividblue");
			});
			$(this).addClass("is-vividblue");
		});
		
		$(".select-btn").click(function() {
			var text = $(this).text().trim();
			if (text == "Select") {
				//update selected transaction type
				$(".ttl-item article").each(function() {
					$(this).removeClass("is-vividblue");
					$(this).find(".select-btn").text("Select");
				});
				$(this).closest("article").addClass("is-vividblue");
				$(this).text("");
				
				//show suggested product
				$(".product-box").each(function() {
					$(this).fadeOut();
				});
				var boxTarget = $(this).data("target");
				$("#" + boxTarget + "").fadeIn();
				
				//show upsell-a for suggested product
				$(".upsell-a-box").each(function() {
					$(this).fadeOut();
				});
				var boxTarget2 = $(this).data("target2");
				$("#" + boxTarget2 + "").fadeIn();
				var bt2 = boxTarget2.split("-");
				if (bt2[1] != "") { $("#h-upsell-a").fadeIn(); }
				else { $("#h-upsell-a").fadeOut(); }
				
				//show upsell-b for suggested product
				$(".upsell-b-box").each(function() {
					$(this).fadeOut();
				});
				var boxTarget3 = $(this).data("target3");
				$("#" + boxTarget3 + "").fadeIn();
				var bt3 = boxTarget3.split("-");
				if (bt3[1] != "") { $("#h-upsell-b").fadeIn(); }
				else { $("#h-upsell-b").fadeOut(); }
				
				//show upsell-c for suggested product
				$(".upsell-c-box").each(function() {
					$(this).fadeOut();
				});
				var boxTarget4 = $(this).data("target4");
				$("#" + boxTarget4 + "").fadeIn();
				var bt4 = boxTarget4.split("-");
				if (bt4[1] != "") { $("#h-upsell-c").fadeIn(); }
				else { $("#h-upsell-c").fadeOut(); }
			}
		});
		
		$('.ttl-container').each(function() {
			var highestBox = 0;
			$('.ttl-item article .message-body', this).each(function() {
				if ($(this).height() > highestBox) {
					highestBox = $(this).height();
				}
			});
			$('.ttl-item article .message-body', this).height(highestBox);
			$('.ttl-item .card .card-content', this).height(highestBox);
		});
		
		var monthlyIndicatorDiv = $('.monthly-indicator');
		if (monthlyIndicatorDiv) {
			monthlyIndicatorDiv.css('position', 'absolute');
			monthlyIndicatorDiv.css('left', '-10px');
			monthlyIndicatorDiv.css('bottom', '-10px');
			monthlyIndicatorDiv.css('z-index', '99');
			monthlyIndicatorDiv.html('<img class=\"monthly-indicator-img\" src=\"' + getContextPath() + '/jsp/design/images/logo-pay-monthly-turq.png\" width=\"100\" height=\"100\" />');
			
			$('.monthly-indicator-wrapper').css('position', 'relative');
			$('.monthly-indicator-o').css('position', 'absolute');
			$('.monthly-indicator-o').css('left', '-25px');
			$('.monthly-indicator-o').css('bottom', '-50px');
			$('.monthly-indicator-o').css('z-index', '99');
			$('.monthly-indicator-o').html('<img class=\"monthly-indicator-img\" src=\"' + getContextPath() + '/jsp/design/images/logo-pay-monthly-turq.png\" width=\"100\" height=\"100\" />');
			
			$('.monthly-indicator-img').css('transform', 'rotate(-10deg)');
		}
		
		var client = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
		if (client == "OPH") {
			$(".renewal-box").addClass('is-disabled');
			$(".renewal-box").children().addClass('is-disabled');
		}
	}
	
	function copyPropertyHTML() {
		//copy insured's address details section
		var isPropertyDiv = $('.heading').text().indexOf('Property') > -1;
		if (isPropertyDiv) {
			var copyAddressCB = 
				"<div style=\"margin:20px 0 0 20px\">" +
					"<p class=\"control\">" + 
						"<label class=\"cm-checkbox\">" + 
							"<input type=\"checkbox\" class=\"cm-checkbox\" id=\"copyAddressFlag\" name=\"copyAddressFlag\">" + 
							"&nbsp;&nbsp;Copy and use the same Address Details above?" + 
						"</label>" + 
					"</p>" + 
				"</div>";
			$('div.heading:contains(Property)').after(copyAddressCB);
			
			$("#copyAddressFlag").on("click", function() {
				var insuredAddress = $("[name='insuredAddress']").val();
				var insuredProvinceCode = $("[name='insuredProvinceCode']").val();
				var insuredCityCode = $("[name='insuredCityCode']").val();
	            if ($(this).prop("checked") == true) {
	            	$("[name='propertyAddress1']").val(insuredAddress);
					$("[name='propertyProvinceCode1']").val(insuredProvinceCode);
					$("[name='propertyProvinceCode1']").trigger("change.select2");
					$("[name='propertyCityCode1']").val(insuredCityCode);
					$("[name='propertyCityCode1']").trigger("change.select2");
	            }
	            else if ($(this).prop("checked") == false) {
	            	$("[name='propertyAddress1']").val("");
					$("[name='propertyProvinceCode1']").val("");
					$("[name='propertyProvinceCode1']").trigger("change.select2");
					$("[name='propertyCityCode1']").val("");
					$("[name='propertyCityCode1']").trigger("change.select2");
	            }
			});
		}
	}
	
	function copyDependentsHTML(dependentType, selectorName, description, dependentCode, condition1, condition2) {
		//copy insured's beneficiary details to the dependents (spouse/parents, children/siblings) section
		var dependentsDiv = $('.heading').text().indexOf('' + dependentType + '') > -1;
		if (dependentsDiv) {
			var copyDependentsCB = 
				"<div style=\"margin:20px 0 0 20px\">" +
					"<p class=\"control\">" + 
						"<label class=\"cm-checkbox\">" + 
							"<input type=\"checkbox\" class=\"cm-checkbox\" id=\"copy" + selectorName + "Flag\" name=\"copy" + selectorName + "Flag\">" + 
							"&nbsp;&nbsp;Copy and use the same " + description + " details from the Beneficiaries section above?" + 
						"</label>" + 
					"</p>" + 
				"</div>";
			$('div.heading:contains(' + dependentType + ')').after(copyDependentsCB);
			
			$(document).on("click", "#copy" + selectorName + "Flag", function() {
				var isChecked = $(this).prop("checked");
				if (isChecked == true) {
					var ctr = 1;
					for (var b = 1; b <= 4; b++) {
						if (ctr <= 2) {
							var relationship = $("[name='ben" + b + "Relationship']").val();
							if (relationship == condition1 || relationship == condition2) {
								var lastName = $("[name='ben" + b + "LastName']").val();
								var firstName = $("[name='ben" + b + "FirstName']").val();
								var middleName = $("[name='ben" + b + "MiddleName']").val();
				            	$("[name='" + dependentCode + "LastName" + ctr + "']").val(lastName);
				            	$("[name='" + dependentCode + "FirstName" + ctr + "']").val(firstName);
				            	$("[name='" + dependentCode + "MiddleName" + ctr + "']").val(middleName);
								$("[name='" + dependentCode + "Relationship" + ctr + "']").val(relationship);
								$("[name='" + dependentCode + "Relationship" + ctr + "']").trigger("change.select2");
								
								ctr++;
				            }
						}
					}
				}
				else if (isChecked == false) {
					for (var b = 1; b <= 4; b++) {
		            	$("[name='" + dependentCode + "LastName" + b + "']").val("");
		            	$("[name='" + dependentCode + "FirstName" + b + "']").val("");
		            	$("[name='" + dependentCode + "MiddleName" + b + "']").val("");
						$("[name='" + dependentCode + "Relationship" + b + "']").val("");
						$("[name='" + dependentCode + "Relationship" + b + "']").trigger("change.select2");
					}
	            }
			});
		}
	}
	
	function copyDependentsHTML(dependentType, selectorName, description, dependentCode) {
		//copy insured's beneficiary details to the dependents (family [spouse/parents, children/siblings]) section
		var dependentsDiv = $('.heading').text().indexOf('' + dependentType + '') > -1;
		if (dependentsDiv) {
			var noDependentsHTML = "";
			var primaryKey = $("[name=primaryKey]").val();
			var groupID = primaryKey.split(":")[0];
			var productID = primaryKey.split(":")[1];
			if (groupID == "GTLHF") {
				noDependentsHTML = 
					"<div class=\"is-orange\" style=\"padding:10px 0 10px 20px\">" + 
						"<p class=\"control\">" + 
							"<label class=\"cm-checkbox\">" + 
								"<input type=\"checkbox\" class=\"cm-checkbox no-dep-checkbox\" id=\"noDependents\" />&nbsp;&nbsp;" + 
								"By checking this box, I hereby certify that I have not declared nor listed any dependents." + 
							"</label>" + 
						"</p>" + 
					"</div>";
			}
			
			var copyDependentsCB = 
				noDependentsHTML + 
				"<div style=\"margin:20px 0 0 20px\">" +
					"<p class=\"control\">" + 
						"<label class=\"cm-checkbox\">" + 
							"<input type=\"checkbox\" class=\"cm-checkbox\" id=\"copy" + selectorName + "Flag\" name=\"copy" + selectorName + "Flag\">" + 
							"&nbsp;&nbsp;Copy and use the same " + description + " details from the Beneficiaries section above?" + 
						"</label>" + 
					"</p>" + 
				"</div>";
			$('div.heading:contains(' + dependentType + ')').after(copyDependentsCB);
			
			$(document).on("click", "#copy" + selectorName + "Flag", function() {
				var isChecked = $(this).prop("checked");
				if (isChecked == true) {
					var parCtr = 0;
					var spsCtr = 0;
					var sibCtr = 0;
					var chiCtr = 0;
					var excludedBenes = [];
					for (var b = 1; b <= 4; b++) {
						var relationship = $("[name='ben" + b + "Relationship']").val();
						var relExists = $("[name='" + dependentCode + "Relationship" + b + "'] option[value='" + relationship + "']").length > 0;
						//if (relationship == "SPS" || relationship == "PAR" || relationship == "CHI" || relationship == "SIB") {
						if (relExists) { //check if beneficiary relationship is in the dependent's relationship options
							if (relationship == "PAR") {
								parCtr++;
								if (parCtr > 2) { continue; }
							}
							else if (relationship == "SPS") {
								spsCtr++;
								if (spsCtr > 1) { continue; }
							}
							else if (relationship == "SIB") {
								sibCtr++;
								if (sibCtr > 3) { continue; }
							}
							else if (relationship == "CHI") {
								chiCtr++;
								if (chiCtr > 3) { continue; }
							}
							
							var lastName = $("[name='ben" + b + "LastName']").val();
							var firstName = $("[name='ben" + b + "FirstName']").val();
							var middleName = $("[name='ben" + b + "MiddleName']").val();
							$("[name='" + dependentCode + "LastName" + b + "']").val(lastName);
			            	$("[name='" + dependentCode + "FirstName" + b + "']").val(firstName);
			            	$("[name='" + dependentCode + "MiddleName" + b + "']").val(middleName);
							$("[name='" + dependentCode + "Relationship" + b + "']").val(relationship);
							$("[name='" + dependentCode + "Relationship" + b + "']").trigger("change.select2");
			            }
						else {
							//add beneficiary's index to the excluded list/array
							excludedBenes.push(b);
						}
					}
					//display pop-up message/s for excluded beneficiary/ies from the copy
					if (!jQuery.isEmptyObject(excludedBenes)) {
						$.each(excludedBenes, function(index, val) { 
							swal({
								title: 'Beneficiary #' + val + ' has been excluded because he/she is not applicable as a Dependent.', 
								type: 'info',
								allowOutsideClick: false, 
								allowEscapeKey: false
							});
						});
					}
				}
				else if (isChecked == false) {
					for (var b = 1; b <= 4; b++) {
		            	$("[name='" + dependentCode + "LastName" + b + "']").val("");
		            	$("[name='" + dependentCode + "FirstName" + b + "']").val("");
		            	$("[name='" + dependentCode + "MiddleName" + b + "']").val("");
						$("[name='" + dependentCode + "Relationship" + b + "']").val("");
						$("[name='" + dependentCode + "Relationship" + b + "']").trigger("change.select2");
					}
	            }
			});
			
			$(document).on("click", "#noDependents", function() {
				//enable/disable copy dependents check box
				$("#copy" + selectorName + "Flag").attr('disabled', !$("#copy" + selectorName + "Flag").attr('disabled'));
				
				//enable/disable dependents fields
				var isChecked = $(this).prop("checked");
				if (isChecked == true) {
					$("[name^=fam]").each(function() {
						$(this).attr('disabled', true);
					});
					
					if (groupID == "GTLHF") {
						//set sample values just to bypass these required fields and proceed
						$("[name='famLastName1']").val("NA");
		            	$("[name='famFirstName1']").val("NA");
		            	$("[name='famBirthDate1']").val("01/01/1900");
		            	
		            	var famRelationship1 = "";
		            	var insuredStatus = $("[name='insuredStatus']").val();
		            	if (insuredStatus == "S") { famRelationship1 = "PAR"; }
		            	else { famRelationship1 = "CHI"; }
						$("[name='famRelationship1']").val(famRelationship1);
						$("[name='famRelationship1']").trigger("change.select2");
					}
				}
				else {
					$("[name^=fam]").each(function() {
						$(this).attr('disabled', false);
						$(this).val("");
					});
					
					if (productID == "FLI09") {
						$("[name='famRelationship1']").val("");
						$("[name='famRelationship1']").trigger("change.select2");
					}
				}
			});
		}
	}
	
	function validateNoOfDependents(depCtr, depMax, depDesc, targetElemName, depCtrFieldName) {
		if (depCtr > depMax) {
			swal({
				title: 'Sorry!',
				text: 'Only ' + depMax + ' ' + depDesc + ' ' + (depMax > 1 ? 'are' : 'is') + ' allowed.',
				type: 'error',
				confirmButtonText: 'OK', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			}).then(function() {
				/*
				var index = targetElemName.substr(targetElemName.length - 1);
				$("[name='famLastName" + index + "']").val("");
            	$("[name='famFirstName" + index + "']").val("");
            	$("[name='famMiddleName" + index + "']").val("");
            	$("[name='famBirthDate" + index + "']").val("");
            	*/
            	
				$("[name='" + targetElemName + "']").val("");
				$("[name='" + targetElemName + "']").trigger("change.select2");
			});
		}
		else {
			$("[name=" + depCtrFieldName + "]").val(depCtr);
		}
	}
	
	function updateDepCtr(depCtr, depCtrFieldName) {
		depCtr = depCtr - 1;
		$("[name=" + depCtrFieldName + "]").val(depCtr);
	}
	
	function updateCtrs() {
		var parCtrVal = 0;
		var spsCtrVal = 0;
		var csCtrVal = 0;
		$("[name^=famRelationship]").each(function() {
			var famRelationship = $(this).val();
			if (famRelationship != "") {
				if (famRelationship == "PAR") { parCtrVal++; }
				else if (famRelationship == "SPS") { spsCtrVal++; }
				else { csCtrVal++; }
			}
		});
		$("[name=parCtr]").val(parCtrVal);
		$("[name=spsCtr]").val(spsCtrVal);
		$("[name=csCtr]").val(csCtrVal);
	}
	
	function validateBizQuestions() {
		$('[name=bizQuestion01], [name=bizQuestion02], [name=bizQuestion03]').on("change", function() {
			var bizAnswer = $(this).val();
			if (bizAnswer == "N") {
				$(this).val("");
				$(this).trigger("change.select2");
				
				var extendedMsg = "";
				var bizElemName = $(this).attr("name");
				if (bizElemName == "bizQuestion01") {
					extendedMsg = " The property should be for business, income generating and for commercial purposes.";
				}
				else if (bizElemName == "bizQuestion02") {
					extendedMsg = " The property should be more than 50 meters (100 steps) away from a creek or body of water.";
				}
				else {
					extendedMsg = " The property should be made of concrete walls and roofing is made of iron/steel/concrete and not light materials.";
				}
				
				swal("Sorry!", "You cannot proceed with the application of this insurance plan." + extendedMsg, "error");
			}
		});
		
		$('[name=bizQuestion05]').on("change", function() {
			var bizAnswer4 = $('[name=bizQuestion04]').val();
			var bizAnswer5 = $(this).val();
			if (bizAnswer4 == "Y" && bizAnswer5 == "N") {
				$(this).val("");
				$(this).trigger("change.select2");
				swal("Sorry!", "You cannot proceed with the application of this insurance plan.", "error");
			}
		});
	}
	
	if (programName == 'INS_SellInsurance' || programName == 'INS_ModifyTrn') {
		//set principal amount of insurance (no-addons)
		var principalFee = parseFloat($("input[data-name='principalFee']").val());
		$("input[name='principalFee']").val(principalFee);
		
		var monthlyIndicatorDiv = $('.monthly-indicator-wrapper');
		if (monthlyIndicatorDiv) {
			monthlyIndicatorDiv.css('position', 'relative');
			$('.monthly-indicator-o').css('position', 'absolute');
			$('.monthly-indicator-o').css('right', '-10px');
			$('.monthly-indicator-o').css('bottom', '-70px');
			$('.monthly-indicator-o').css('z-index', '99');
			$('.monthly-indicator-o').html('<img class=\"monthly-indicator-img\" src=\"' + getContextPath() + '/jsp/design/images/logo-pay-monthly-turq.png\" width=\"130\" height=\"130\" />');
			
			$('.monthly-indicator-img').css('transform', 'rotate(-10deg)');
		}
		
		if ($("[name=programStatus]").val() == 'EnterData') {
			var primaryKey = $("[name=primaryKey]").val();
			var productID = primaryKey.split(":")[1];
			if (productID != "AXA03") {
				copyPropertyHTML();
			}
			else {
				validateBizQuestions();
			}
			
			copyDependentsHTML('Spouse', "SpouseParents", "Spouse/Parents", 'sp', 'SPS', 'PAR');
			copyDependentsHTML('Children', "ChildrenSiblings", "Children/Siblings", 'cs', 'CHI', 'SIB');
			copyDependentsHTML('Family', "Family", "Family", 'fam');
			
			$("*[name*=spBirthDate]").blur(function() {
				var elementName = $(this).attr("name");
				var spDob = $(this).val();
				if (spDob != '') {
					var primaryKey = $("[name=primaryKey]").val();
					var groupID = primaryKey.split(":")[0];
					var productID = primaryKey.split(":")[1];
					$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
						{groupID:groupID, productID:productID, birthDate:spDob, familyType:"SP"}).done(function(data) {
						if (data.errorMessage) {
							swal('Oops!', data.errorMessage, 'error');
							$("[name=" + elementName + "]").val("");
							return false;
						}
					});
				}
			});
			
			$("*[name*=csBirthDate]").blur(function() {
				var elementName = $(this).attr("name");
				var csDob = $(this).val();
				if (csDob != '') {
					var primaryKey = $("[name=primaryKey]").val();
					var groupID = primaryKey.split(":")[0];
					var productID = primaryKey.split(":")[1];
					$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
						{groupID:groupID, productID:productID, birthDate:csDob, familyType:"CS"}).done(function(data) {
						if (data.errorMessage) {
							swal('Oops!', data.errorMessage, 'error');
							$("[name=" + elementName + "]").val("");
							return false;
						}
					});
				}
			});
			
			$("*[name*=famBirthDate]").blur(function() {
				var elementName = $(this).attr("name");
				var index = elementName.substr(elementName.length - 1);
				var famDob = $(this).val();
				if (famDob != '') {
					var primaryKey = $("[name=primaryKey]").val();
					var groupID = primaryKey.split(":")[0];
					var productID = primaryKey.split(":")[1];
					if (programName == 'INS_ModifyTrn') {
						groupID = primaryKey.split(":")[1];
						productID = primaryKey.split(":")[2];
					}
					
					var familyType = "";
					var relationship = $.trim($("[name=famRelationship" + index + "]").val());
					if (relationship) {
						if (relationship == "SPS" || relationship == "PAR") { familyType = "SP"; }
						else { familyType = "CS"; }
						
						/*
						$.LoadingOverlay("show");
						$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
							{groupID:groupID, productID:productID, birthDate:famDob, familyType:familyType}).done(function(data) {
							
							$.LoadingOverlay("hide");	
							if (data.errorMessage) {
								swal('Oops!', data.errorMessage, 'error');
								$("[name=" + elementName + "]").val("");
								return false;
							}
						});
						*/
						
						$.LoadingOverlay("show");
						var effectivityDate = $("[name=specialParam2]").val();
						if (effectivityDate != '') {
							$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
								{groupID:groupID, productID:productID, birthDate:famDob, familyType:familyType, endDate:effectivityDate}).done(function(data) {
								
								$.LoadingOverlay("hide");	
								if (data.errorMessage) {
									swal('Oops!', data.errorMessage, 'error');
									$("[name=" + elementName + "]").val("");
									return false;
								}
								else {
									var expiryDate = $("[name=specialParam3]").val();
									if (expiryDate != '') {
										$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
											{groupID:groupID, productID:productID, birthDate:famDob, familyType:familyType, endDate:expiryDate}).done(function(data) {
											
											$.LoadingOverlay("hide");	
											if (data.errorMessage) {
												swal('Oops!', data.errorMessage, 'error');
												$("[name=" + elementName + "]").val("");
												return false;
											}
										});
									}
									else {
										swal('Oops!', "Age validation failed. Expiry Date for this Insurance policy has not been set yet.", 'error');
										$("[name=" + elementName + "]").val("");
										return false;
									}
								}
							});
						}
						else {
							swal('Oops!', "Age validation failed. Effectivity Date for this Insurance policy has not been set yet.", 'error');
							$("[name=" + elementName + "]").val("");
							return false;
						}
					}
					else {
						swal('Oops!', "Please choose RELATIONSHIP first for Family Dependent #" + index + " to validate age.", 'error');
						$("[name=" + elementName + "]").val("");
						return false;
					}
				}
			});
			
			$("[name^=famRelationship]").on('select2:select', function() {
				var elementName = $(this).attr("name");
				var index = elementName.substr(elementName.length - 1);
				var relationship = $.trim($(this).val());
				if (relationship != '') {
					/*
					var primaryKey = $("[name=primaryKey]").val();
					var groupID = primaryKey.split(":")[1];
					var productID = primaryKey.split(":")[2];
					var familyType = "";
					var famDob = $("[name=famBirthDate" + index + "]").val();
					if (famDob != '') {
						if (relationship == "SPS" || relationship == "PAR") { familyType = "SP"; }
						else { familyType = "CS"; }
						
						$.LoadingOverlay("show");
						$.getJSON(getContextPath() + "/jsp/ajax/insurance-ajax.jsp", 
							{groupID:groupID, productID:productID, birthDate:famDob, familyType:familyType}).done(function(data) {

							$.LoadingOverlay("hide");
							if (data.errorMessage) {
								swal('Oops!', data.errorMessage, 'error');
								$("[name=" + elementName + "]").val("");
								$("[name=" + elementName + "]").trigger("change.select2");
								$("[name=famBirthDate" + index + "]").val("");
								return false;
							}
						});
					}
					else {
						$("[name=famBirthDate" + index + "]").focus();
					}
					*/
					
					$("[name=famBirthDate" + index + "]").focus();
				}
			});
			
			//control declaration of family/dependents
			//var primaryKey = $("[name=primaryKey]").val();
			//var productID = primaryKey.split(":")[1];
			//if (productID == "FLI09" || productID == "FLI10" || productID == "FLI11" || productID == "FLI12") {
			var groupID = primaryKey.split(":")[0];
			//if (groupID == "GPAF" || groupID == "GTLHF" || groupID == "IPAPF") {
			if (groupID.match(/F$/)) { // check if groupID ends with char 'F'; to check string value if starting with, use str.match(/^strToSearch/)
				$('#form-id').append('<input type="hidden" name="parCtr" value="0" data-max="2" />');
				$('#form-id').append('<input type="hidden" name="spsCtr" value="0" data-max="1" />');
				$('#form-id').append('<input type="hidden" name="csCtr" value="0" data-max="3" />');
				$('#form-id').append('<input type="hidden" name="prevFamRelationship" value="" />');
				
				$("[name^=famRelationship]").on('select2:selecting', function() {
					var prevFamRelationship = $(this).val();
					if (prevFamRelationship != "") {
						$("[name=prevFamRelationship]").val(prevFamRelationship);
					}
				});
				
				$("[name^=famRelationship]").on('select2:select', function() {
					var famRelationshipName = $(this).attr("name");
					var famRelationship = $(this).val();
					if (famRelationship != "") {
						updateCtrs();
						
						//counter values
						var parCtr = parseInt($("[name=parCtr]").val());
						var spsCtr = parseInt($("[name=spsCtr]").val());
						var csCtr = parseInt($("[name=csCtr]").val());
						
						//maximum values
						var parMax = $("[name=parCtr]").data("max");
						var spsMax = $("[name=spsCtr]").data("max");
						var csMax = $("[name=csCtr]").data("max");
						
						//validate/update previous dependent relationship value
						var prevFamRelationship = $("[name=prevFamRelationship]").val();
						if (prevFamRelationship != "") {
							if (prevFamRelationship == "PAR") {
								updateDepCtr(parCtr, "parCtr")
							}
							else if (prevFamRelationship == "SPS") {
								updateDepCtr(spsCtr, "spsCtr")
							}
							else {
								updateDepCtr(csCtr, "csCtr")
							}
							$("[name=prevFamRelationship]").val("");
						}
						
						//validate dependent's relationship to insured
						if (famRelationship == "PAR") {
							validateNoOfDependents(parCtr, parMax, 'Parents', famRelationshipName, "parCtr");
						}
						else if (famRelationship == "SPS") {
							validateNoOfDependents(spsCtr, spsMax, 'Spouse', famRelationshipName, "spsCtr");
						}
						else {
							validateNoOfDependents(csCtr, csMax, 'Children/Siblings', famRelationshipName, "csCtr");
						}
					}
				});
			}
			
			var productDesc = $("h1.title").first().text();
			
			function updateCalcBox(productDesc, principalFee) {
				var newItemStr = 
					"<tr>" + 
						"<th>" + productDesc + "</th>" + 
						"<td>P " + principalFee.toFixed(2) + 
							"<input type='hidden' class='calc-item' value='" + principalFee.toFixed(2) + "' data-name='principalFee' data-operation='+'>" + 
						"</td>" + 
					"</tr>";
				$("#calc1 .t-calculator tr").replaceWith(newItemStr);
				var totalStr = "<tr class='total'><th>Total</th><td>P " + principalFee.toFixed(2) + "</td></tr>";
				$(".match-calculator-summary").html("P " + principalFee.toFixed(2));
				$("#calc1 .t-total tr").replaceWith(totalStr);
			}
			
			$('[name=numUnits]').on("change", function() {
				var temNumUnits = parseFloat(dsxcommon.removeAllCommas($(this).val()));
				var perUnitFee = parseFloat(dsxcommon.removeAllCommas($('input[name=perUnitFee]').val()));	
				$('input[name=totalCost]').val(dsxcommon.addCommasDouble((temNumUnits * perUnitFee).toFixed(2)));
				var totalCost = parseFloat(dsxcommon.removeAllCommas($('input[name=totalCost]').val()));	
				updateCalcBox(productDesc, totalCost);
			});
			
			$('[name=numAddOn]').on("change", function() {
				var temNumAddOn = parseFloat(dsxcommon.removeAllCommas($(this).val()));
				if (temNumAddOn < 0) {
					swal({
						text: 'Please select a valid No. of Add-on!', 
						type: 'error',
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
				}
				else {
					var numUnits = parseFloat(dsxcommon.removeAllCommas($('input[name=numUnits]').val()));
					var perUnitFee = parseFloat(dsxcommon.removeAllCommas($('input[name=perUnitFee]').val()));
					var perAddOnFee = parseFloat(dsxcommon.removeAllCommas($('input[name=perAddOnFee]').val()));
					
					//$('input[name=totalCost]').val(dsxcommon.addCommasDouble((numUnits * (perUnitFee + (perAddOnFee * temNumAddOn))).toString())); //PNT05
					$('input[name=totalCost]').val(dsxcommon.addCommasDouble(((numUnits * perUnitFee) + (temNumAddOn * perAddOnFee)).toFixed(2))); //FLI14
				}
				
				$('[name=receivedAmt]').val(dsxcommon.addCommasDouble((0).toFixed(2))); //clear/remove the received amount field value
				$('[name=changeAmt]').val(dsxcommon.addCommasDouble((0).toFixed(2))); //clear/remove the change amount field value
			});
			
			if (productDesc.indexOf('PREPAID') != -1) {
				$('[name=numPayMonths]').on("change", function() {
					var temNumUnits = parseFloat(dsxcommon.removeAllCommas($(this).val()));
					var perUnitFee = parseFloat(dsxcommon.removeAllCommas($('input[name=perUnitFee]').val()));	
					$('input[name=totalCost]').val(dsxcommon.addCommasDouble((temNumUnits * perUnitFee).toFixed(2)));
					var totalCost = parseFloat(dsxcommon.removeAllCommas($('input[name=totalCost]').val()));	
					updateCalcBox(productDesc, totalCost);
				});
			}
			
			$('[name=effectivityDate]').on("blur change", function() {
				var effectivityDate = new Date($(this).val()).setHours(0, 0, 0, 0);
				var currentDate = new Date().setHours(0, 0, 0, 0);
				if (effectivityDate < currentDate) {
					 swal({
						 text: 'Sorry! Effectivity Date must not be before the Current Date!', 
						 type: 'error',
						 allowOutsideClick: false, 
						 allowEscapeKey: false
					 });
					 $('[name=effectivityDate]').val("");
					 $('[name=effectivityDate]').focus();
				}
				else { $('input[name=firstPayDate]').val($(this).val()); }
			});
			
			$('[name=firstPayDate]').on("blur change", function() {
				var firstPayDate = new Date($(this).val()).setHours(0, 0, 0, 0);
				var currentDate = new Date().setHours(0, 0, 0, 0);
				if (firstPayDate < currentDate) {
					 swal({
						 text: 'Sorry! First Payment Date must not be before the Current Date!', 
						 type: 'error',
						 allowOutsideClick: false, 
						 allowEscapeKey: false
					 });
					 $('[name=firstPayDate]').val("");
					 $('[name=firstPayDate]').focus();
				}
			});
			
			//Business Coverage Calculations
			$('[name=otherCoverageAmt1]').change(function() {
				var buildingCoverage = parseFloat(dsxcommon.removeAllCommas($('input[name=buildingCoverageAmt1]').val()));
				var furfixCoverage = parseFloat(dsxcommon.removeAllCommas($('input[name=furfixCoverageAmt1]').val()));
				var equipCoverage = parseFloat(dsxcommon.removeAllCommas($('input[name=equipCoverageAmt1]').val()));
				var stocksCoverage = parseFloat(dsxcommon.removeAllCommas($('input[name=stocksCoverageAmt1]').val()));
				var otherCoverage = parseFloat(dsxcommon.removeAllCommas($('input[name=otherCoverageAmt1]').val()));
				
				var totalCoverage = buildingCoverage + furfixCoverage + equipCoverage + stocksCoverage + otherCoverage;
				$.LoadingOverlay("show");
				$('[name=totalCoverageAmt1]').val(dsxcommon.addCommasDouble((totalCoverage).toFixed(2).toString()));
				$.LoadingOverlay("hide");
				
				if (totalCoverage > 10000000) {
					swal({
						title: 'Total Coverage Amount should not exceed 10,000,000 Pesos',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						$('[name=totalCoverageAmt1]').select();
						$('[name=buildingCoverageAmt1]').focus();
					});
					$("[name='buildingCoverageAmt1']").val(0);
					$("[name='furfixCoverageAmt1']").val(0);
					$("[name='equipCoverageAmt1']").val(0);
					$("[name='stocksCoverageAmt1']").val(0);
					$("[name='otherCoverageAmt1']").val(0);
					$("[name='totalCoverageAmt1']").val(0);
					return;
				}
			});
			
			//enable Bank and Insurer Fields 
			$('[name=mortgageType1]').change(function() {
				var mortgageType = $("[name='mortgageType1']").val();
				if (mortgageType == "Y") { $('[name=mortgageBank1]').attr("disabled", false); }
				else { $('[name=mortgageBank1]').attr("disabled", true); }
			});
			
			$('[name=propertyInsureType1]').change(function() {
				var insurerType = $("[name='propertyInsureType1']").val();
				if (insurerType == "Y") { $('[name=propertyInsurer1]').attr("disabled", false); }
				else { $('[name=propertyInsurer1]').attr("disabled", true); }
			});
			
			$('[name=vehicleBrand]').on("blur change", function() {
				if ($(this).val() != "") {
					$('[name=vehicleMake]').val($('[name=vehicleBrand] option:selected').text());
				}
			});
		}
		
		$(document).on("click", ".show-coverage-line", function(e) {
			e.preventDefault();
			var coverageLine = $(this).attr("data-coverage");
			if (coverageLine == "family") {
				$('.coverage-line[data-value="' + coverageLine + '-sp"]').fadeToggle();
				$('.coverage-line[data-value="' + coverageLine + '-ch"]').fadeToggle();
				$('.coverage-line[data-value="' + coverageLine + '-sb"]').fadeToggle();
				
				//show/hide hospital-benefit add-on button
				if ($(this).hasClass("selected")) {
					$(".selectable-box[data-coverage='hospital-benefit']").addClass("is-hidden");
					$(".selectable-box[data-coverage='hospital-benefit']").fadeOut();
				}
				else {
					$(".selectable-box[data-coverage='hospital-benefit']").removeClass("is-hidden");
					$(".selectable-box[data-coverage='hospital-benefit']").fadeIn();
				}
			}
			else { $('.coverage-line[data-value="' + coverageLine + '"]').fadeToggle(); }
		});
	
		$(document).on("change", "select", function(e) {
			e.preventDefault();
			var selected = $(this).find(":selected");
			if (selected.attr("data-calclabel")) { var label = selected.data("calclabel"); }
			else { var label = selected.text(); }
			$(this).attr("data-calclabel", label);
		});
		
		$(document).on("click", ".calc-value", function(e) {
			var me = $(this);
			var target = me.closest(".calc-form").data("target");
			var label = me.attr("data-calclabel");
			var name = me.attr("name");
	
			if (me.attr("data-calcvalue")) {
				var value = me.attr("data-calcvalue");
			}
			else { var value = me.val(); }
			
			var operation = "+";
			if (me.attr("data-operation")) { operation = me.attr("data-operation"); }
	
			if ($.isNumeric(value) || value == "") { insertCalcbox(name, target, label, value, operation); }
			else { console.log("Invalid format!"); }
		});
		
		$(document).on("click", ".toggle-show", function(e) {
			var div = $(this).data("ts-div");
			if (div == "family-addon") {
				$("#spouse-addon").fadeToggle();
				$("#children-addon").fadeToggle();
				$("#siblings-addon").fadeToggle();
			}
			else { $("#" + div).fadeToggle(); }
		});
		
		$(document).on("click", ".selectable-box", function(e) {
			$(this).toggleClass("selected");
			if ($(this).hasClass("selected")) {
				var name = $(this).attr("name");
				if (name == "property") {
					$("[name=propertyAddress1]").closest(".field").find(".label").append($("<span>").addClass("required-mark").text(" *"));
					$("[name=propertyAddress1]").addClass("required");
				}
				else {
					$("*[name*=spLastName], *[name*=spFirstName], *[name*=spBirthDate], " +
					  "*[name*=csLastName], *[name*=csFirstName], *[name*=csBirthDate]").each(function() {
						var e_name = $(this).attr("name");
						$("[name=" + e_name + "]").closest(".field").find(".label").append($("<span>").addClass("required-mark").text(" *"));
					});
				}
			}
			else {
				var name = $(this).attr("name");
				if (name == "property") {
					$("[name=propertyAddress1]").closest(".field").find(".label").find("span").remove();
					$("[name=propertyAddress1]").removeClass("required");
				}
				else {
					$("*[name*=spLastName], *[name*=spFirstName], *[name*=spBirthDate], " +
					  "*[name*=csLastName], *[name*=csFirstName], *[name*=csBirthDate]").each(function() {
						var e_name = $(this).attr("name");
						$("[name=" + e_name + "]").closest(".field").find(".label").find("span").remove();
					});
				}
			}
		});
		
		$(".selectable-box").each(function() {
			var isSelected = $(this).hasClass("selected");
			if (isSelected) {
				var me = $(this);
				var target = me.closest(".calc-form").data("target");
				var label = me.attr("data-calclabel");
				var name = me.attr("name");
		
				if (me.attr("data-calcvalue")) {
					var value = me.attr("data-calcvalue");
				}
				else { var value = me.val(); }
		
				var operation = "+";
				if (me.attr("data-operation")) { operation = me.attr("data-operation"); }
		
				if ($.isNumeric(value) || value == "") { insertCalcbox(name, target, label, value, operation); }
				else { console.log("Invalid format!"); }
			}
		});
	}
	
	if (programName == 'INS_SellInsurance' || programName == 'INS_RenewInsurance') {
		if ($("[name=programStatus]").val() == 'EnterData') {
			//$('[name=receivedAmt]').change(function() {
			$('[name=receivedAmt]').on("blur change", function() {
				var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=totalCost]').val()));
				var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
				if (cashAmt < totAmt) {
					swal({
						title: 'Amount Received must be greater than or equal to the Total Cost!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						//$('[name=receivedAmt]').select();
						$('[name=receivedAmt]').val(dsxcommon.addCommasDouble((0).toFixed(2)));
						$('[name=receivedAmt]').focus();
					});
					return;
				}
				$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - totAmt).toFixed(2)));
			});
			
			$('[name=refClientID]').on("blur change", function() {
				var refClientID = $.trim($(this).val());
				if (refClientID.length < 6) {
					swal('Sorry!', 'Reference Client I.D. length must be between 6 to 10 digits only.', 'error');
					$(this).val("");
				}
			});
			
			if (productDesc.indexOf('PREPAID') != -1) {
				$('[name=numPayMonths]').on("change", function() {
					var temNumUnits = parseFloat(dsxcommon.removeAllCommas($(this).val()));
					var perUnitFee = parseFloat(dsxcommon.removeAllCommas($('input[name=perUnitFee]').val()));	
					$('input[name=totalCost]').val(dsxcommon.addCommasDouble((temNumUnits * perUnitFee).toFixed(2)));
					var totalCost = parseFloat(dsxcommon.removeAllCommas($('input[name=totalCost]').val()));	
					updateCalcBox(productDesc, totalCost);
				});
			}
		}
		
		$('button[value="Process Payment"]').click(function(e) {
			e.preventDefault();
			
			var loginName = $(".user-name").find("p:first").html().trim();
			var traceNo = $('[name=primaryKey]').val().split(":")[0];
			var pocNo = "";
			var amtDue = "";
			
			$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-getamtdue2-ajax.jsp", 
				{loginName:loginName, traceNo:traceNo}).done(function(data) {
					
				pocNo = data.pocNo;
				amtDue = data.amtDue;
					
				var html = "<table class=\"table is-bordered\">" + 
							"<tbody>" + 
								"<tr>" + 
									"<th class=\"has-text-left\" width=\"100\" align=\"left\">Name</th>" + 
									"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + data.fullName + "</td>" + 
								"</tr>" + 
								"<tr>" + 
									"<th class=\"has-text-left\" width=\"100\" align=\"left\">POC No.</th>" + 
									"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + pocNo + "</td>" + 
								"</tr>" + 
								"<tr>" + 
									"<th class=\"has-text-left\" width=\"100\" align=\"left\">Amount Due</th>" + 
									"<td class=\"has-text-right\" width=\"100\" align=\"right\">P " + amtDue + "</td>" +
								"</tr>" + 
							"</tbody>" + 
						"</table>";
				
				swal({
					title: 'Transaction Summary for Payment',
					customClass: 'ofac-container', 
					text: "", 
					html : html,
					type: 'info',
					showCancelButton: true,
					focusConfirm: false,
					confirmButtonColor: '#0B5D18',
					cancelButtonColor: '#990000',
					confirmButtonText: 'Process Payment',
					cancelButtonText: 'Cancel',
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then((result) => { 
					if (result) { 
						swal({
							title: 'You will be deducted P ' + amtDue + ' from your account with this transaction.',
							text: 'Would you like to proceed?',
							type: 'warning',
							showCancelButton: true,
							confirmButtonText: 'Yes',
							cancelButtonText: 'No',
							showLoaderOnConfirm: true,
							allowOutsideClick: false, 
							allowEscapeKey: false,
							preConfirm: (data) => {
								$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-single-trn-ajax.jsp", 
									{loginName:loginName, pocNo:pocNo, amtDue:parseInt(dsxcommon.removeAllCommas(amtDue))}).done(function(data) {
										
									if (data.data.indexOf('success') != -1) {
										$("[name=primaryKey]").val(data.data.split(':')[1]);
										$("[name=specialParam1]").val(data.data.split(':')[2]);
									}
									
									swal({
										title: data.data.indexOf('success') != -1 ? 'Transaction payment successful!' : data.data,
										text: '',
										type: data.data.indexOf('success') != -1 ? 'success' : 'error',
									});
									
									if (data.genTraceNo != undefined && data.updateDate != undefined) {
										//download collection slip
										var downloadUrl = getContextPath() + "/data/spl/RuralNet_Collection_Slip_" + data.genTraceNo + "(" + data.updateDate + ")";
										var req = new XMLHttpRequest();
										req.open("GET", downloadUrl + ".PDF", true);
										req.responseType = "blob";
										req.onload = function(event) {
											var blob = req.response;
											var fileName = null;
											var contentType = req.getResponseHeader("content-type");
	
											//IE/EDGE seems not returning some response header
											if (req.getResponseHeader("content-disposition")) {
												var contentDisposition = req.getResponseHeader("content-disposition");
												fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);
											}
											else {
												fileName = downloadUrl + "." + contentType.substring(contentType.indexOf("/") + 1);
											}
	
											if (window.navigator.msSaveOrOpenBlob) {
												//Internet Explorer/Edge
												window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
											}
											else {
												var el = document.createElement('a');
												el.href = window.URL.createObjectURL(blob);
												el.download = fileName;
												el.click();
											}
										};
										req.send();
									}
								});
								
								//return false;
							}
						});
					} 
				});
			});
			
			//enable the generate coc button
			$('button[value="Generate COC"]').removeAttr('disabled');
			$('button[value="Generate COC"]').prop('disabled', false);
			$('button[value="Generate COC"]').removeClass('disabledbtn');
			$('button[value="Generate COC"]').click(function() {
				$("[name=primaryKey]").val(traceNo);
				$('[name=programName]').val('INS_DownloadCOC');
			});
			
			return false;
		});
	}
	
	if (programName == 'INS_RenewInsurance') {
		$(".content-viewentry .table-overflow a").click(function(e) {
			e.preventDefault();
			var hrefVal = $(this).closest('a').attr('href');
			var primaryKey = getHrefParameter(hrefVal, "primaryKey");
			var traceNo = primaryKey.split(":")[0];
			var insGroupID = primaryKey.split(":")[1];
			var insProductID = primaryKey.split(":")[2];
			var aVal = $(this).text().trim();
			var tableValues = "";
			$('[name=primaryKey]').val(primaryKey);
			
			$.getJSON(getContextPath() + "/jsp/ajax/insurance-clients-ajax.jsp",{traceNo:'', insGroupID:insGroupID, insProductID:insProductID}).done(function(data) {
				if (!jQuery.isEmptyObject(data.insCoverageList)) {
					var index = 1;
					$.each(data.insCoverageList, function(key, value) {
						var coverageInfo = value.split(':');
						tableValues += 
							'<tr>' +
								'<td style=text-align:left;font-size:15px;padding-left:130px>' + coverageInfo[0] +'</td>' +
								'<td style=text-align:right;font-size:15px;padding-right:160px>' + (index == 1 ? 'P ' : '') + dsxcommon.addCommasDouble(coverageInfo[1]) +'</td>' +
							'</tr>';
						index++;
				 	});
				 	$('#coverageTable').append(tableValues);
				}
			});
			
			var insuredDetails = '<br><div>' +
									'<h3><strong>Insured Details</strong></h3>' +
									'<br><div class=columns>' + 
										'<div class=column>' +
											'<label style=text-align:left;padding-left:50px;font-size:17px> <strong>Name: </strong>' + $(this).closest('td').prev().prev().prev().prev().text() + '</label>' +
										'</div>' + 
										'<div class=column>' +
											'<label style=text-align:left;padding-left:50px;font-size:17px> <strong>Date of Birth: </strong>' + $(this).closest('td').prev().prev().prev().text() + '</label>' +
										'</div>' +
									'</div>' +
									'<div class=columns>' + 
										'<div class=column>' +
											'<label id=insAddress style=text-align:left;padding-left:50px;font-size:17px></label>' +
										'</div>' + 
									'</div>' +
								 '</div>';
			
			var beneficiaryDetails = '<br><div>' +
								 	'<h3><strong>Beneficiary Details</strong></h3><br>' +
								 	'<table id=benTable class=table>' +
								 	'</table>'+
								 '</div>' + '<br>' ;
			
			var insuranceDetails = '<br><div>' +
		 							 	'<h3><strong>Insurance Details</strong></h3>' +
		 							 	'<br><div class=columns>' + 
		 							 		'<div class=column>' +
		 							 			'<label style=text-align:left;padding-left:50px;font-size:17px><strong>Insurance Plan: </strong>' + $(this).closest('td').prev().prev().prev().prev().prev().text() + '</label>' +
		 							 		'</div>' +
		 							 	'</div>' + 
		 							 	'<div class=columns>' + 
			 							 	'<div class=column>' +
		 							 			'<label id=propertyAddress style=text-align:left;padding-left:50px;font-size:17px></label>' +
											'</div>' + 
										'</div>' + 
		 							 	'<div class=columns>' + 
											'<div class=column>' +
		 							 			'<label style=text-align:left;padding-left:50px;font-size:17px><strong>Effectivity Date: </strong>' + $(this).closest('td').prev().prev().text() + '</label>' +
		 							 		'</div>' +
											'<div class=column>' +
												'<label style=text-align:left;padding-left:50px;font-size:17px><strong>Expiry Date: </strong>' + $(this).closest('td').prev().text() + '</label>' +
											'</div>' +
										'</div>' +
		 							 '</div>' + '<br>' ;
			
			var swal_html = 
					insuredDetails + beneficiaryDetails + insuranceDetails +
					'<div>' +
					'<div><h3><strong>Coverage</strong></h3></div>' +
						'<table id=coverageTable class=table></table>'+
					'</div>' + '<br>'; 
			
			if (aVal == 'View Policy') {
				swal({
					title: 'Policy Details',
					customClass: 'ofac-container', 
					html: swal_html,
					showCancelButton: true,
					focusConfirm: false,
					confirmButtonColor: '#0B5D18',
					cancelButtonColor: '#990000',
					confirmButtonText: 'Renew Policy',
					cancelButtonText: 'Cancel', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then((result) => {
					if (result) {
						window.location = hrefVal;
					}
				});
			}
			
			var address = "";
			var propertyAddress = "";
			var benTableValues = "";
			$.getJSON(getContextPath() + "/jsp/ajax/insurance-clients-ajax.jsp",{traceNo:traceNo}).done(function(data) {
				if (!jQuery.isEmptyObject(data.insTransaction)) {
					$.each(data.insTransaction, function(key, value) {
						var transaction = value.split(':');
						address = transaction[0];
						propertyAddress = transaction[1].replace(/\s/g,'').replace(/,/g, "") == '' ? "" : transaction[1];
						benTableValues = '<tr>' +
											'<td style=text-align:left;font-size:15px;padding-left:130px>' + transaction[2] +'</td>' +
											'<td style=text-align:center;font-size:15px;padding-right:160px>' + transaction[3] +'</td>' + 
										  '</tr>';
						if (transaction[4].replace(",", "").trim() != '') {
							benTableValues += '<tr>' +
												'<td style=text-align:left;font-size:15px;padding-left:130px>' + transaction[4] +'</td>' +
												'<td style=text-align:center;font-size:15px;padding-right:160px>' + transaction[5] +'</td>' + 
											  '</tr>';
						}
						if (transaction[6].replace(",", "").trim() != '') {
							benTableValues += '<tr>' +
												'<td style=text-align:left;font-size:15px;padding-left:130px>' + transaction[6] +'</td>' +
												'<td style=text-align:center;font-size:15px;padding-right:160px>' + transaction[7] +'</td>' + 
											  '</tr>';
						}
						if (transaction[8].replace(",", "").trim() != '') {
							benTableValues += '<tr>' +
												'<td style=text-align:left;font-size:15px;padding-left:130px>' + transaction[8] +'</td>' +
												'<td style=text-align:center;font-size:15px;padding-right:160px>' + transaction[9] +'</td>' + 
											  '</tr>';
						}
				 	})
				 	document.getElementById('insAddress').innerHTML = '<strong>Address: </strong>' + address;
					if (propertyAddress != '') {
						document.getElementById('propertyAddress').innerHTML = '<strong>Property Address: </strong>' + propertyAddress;
					}
					$('#benTable').append(benTableValues);
				}
			});
		});
		
		if ($("[name=programStatus]").val() == 'EnterData') {
			copyPropertyHTML();
			copyDependentsHTML('Spouse', "SpouseParents", "Spouse/Parents", 'sp', 'SPS', 'PAR');
			copyDependentsHTML('Children', "ChildrenSiblings", "Children/Siblings", 'cs', 'CHI', 'SIB');
			copyDependentsHTML('Family', "Family", "Family", 'fam');
		}
	}
	
	if (programName == 'INS_SellInsurance' || programName == 'INS_Renewal' || 
		programName == 'INS_RenewInsurance' || programName == 'INS_DownloadCOC' || 
		programName == 'INS_UnvoidTrn') {
		
		var targetProgramName = 'INS_SelectProduct';
		if (programName == 'INS_UnvoidTrn') {
			targetProgramName = 'INS_SearchTrnToUnvoid';
		}
		
		$("button[value=Home]").click(function() {
			$(this).prop("type", "button");
			window.location = 'InsuranceForm.htm?programName=' + targetProgramName + '&calledFrom=' + programName;
		});
	}
	
	//redirect New button to the search page
	if (programName == 'INS_ModifyTrn' || programName == 'INS_AmendTrn' || 
		programName == 'INS_CancelTrn' || programName == 'INS_VoidTrn' || programName == 'INS_UnvoidTrn') {
		
		var targetProgramName = '';
		if (programName == 'INS_ModifyTrn') { targetProgramName = 'INS_SearchTrnToModify'; }
		if (programName == 'INS_AmendTrn') { targetProgramName = 'INS_SearchTrnToAmend'; }
		if (programName == 'INS_CancelTrn') { targetProgramName = 'INS_SearchTrnToCancel'; }
		if (programName == 'INS_VoidTrn') { targetProgramName = 'INS_SearchTrnToVoid'; }
		if (programName == 'INS_UnvoidTrn') { targetProgramName = 'INS_SearchTrnToUnvoid'; }
		
		$("button[value=New]").click(function() {
			$(this).prop("type", "button");
			window.location = 'MenuForm.htm?programName=' + targetProgramName;
		});
	}
	
	//PHILCARE COC
	if (programName == 'INS_DownloadCOC' || programName == 'INS_DownloadReprintCSCOC') {
		$('button[value="Download & Print COC"]').click(function() {
			var fileName = $("[name=fileName]").val();
			if (fileName) {
				if (fileName.indexOf("philcare") >= 0) {
					window.open(fileName, '_blank');
					return false;
				}
			}
		});
	}
	
	/*
	 * Added by: Mark Kevin Garbo
	 * Date Added: 7/10/2022
	 */
	if (programName == 'INS_ModifyTrn') {
		if ($("[name=programStatus]").val() == 'EnterData') {
			$("button").click(function(e) {
				var buttonVal = $(this).val();
				if (buttonVal.trim() == "Save") {
					var dependentsDiv = $('.heading').text().indexOf('Family') > -1;
					if (dependentsDiv) {
						//disable Save submit
						e.preventDefault();
						if ($("button[value=Save]").hasClass('validateform')) {
							$("button[value=Save]").removeClass('validateform');
						}
						
						var allEmpty = false;
					    var famElem;
					    $("[name^=fam]").each(function() {
							famElem = $(this);
							if (famElem.val() == "" || famElem.val() == null) {
								allEmpty = true;
							}
							else {
					        	allEmpty = false;
					        	return false;
					        }
					    });
					    
					    if (allEmpty) {
					    	swal({
								title: 'No Family/Dependent(s) data provided.',
								type: 'error',
								confirmButtonText: 'OK', 
								allowOutsideClick: false, 
								allowEscapeKey: false
							});
					    }
					    else {
					    	//validate incomplete family/dependent(s) data
					    	var famElem;
							var famElemName;
							var index;
							var lastIndex = 1;
							var isCurrRowHasEmptyCol = false;
							var isPrevRowHasEmptyCol = false;
							var emptyColCtr = 0;
							
							$("[name^=fam]").each(function() {
								famElem = $(this);
								famElemName = famElem.attr("name");
								index = famElemName[famElemName.length - 1];
								
								if (index != lastIndex) {
									isPrevRowHasEmptyCol = isCurrRowHasEmptyCol;
									isCurrRowHasEmptyCol = false;
									
									if (isPrevRowHasEmptyCol && emptyColCtr == 4) {
										isPrevRowHasEmptyCol = isCurrRowHasEmptyCol;
									}
									
									emptyColCtr = 0;
								}
								
								//validate each column
								if ((famElem.val() == "" || famElem.val() == null) && famElemName != "famMiddleName" + index) {
									isCurrRowHasEmptyCol = true;
									emptyColCtr++;
								}
								
								//show error message if previous row has an empty required column
								if (isPrevRowHasEmptyCol && index != lastIndex) {
									swal({
										title: 'Either the Name, Date of Birth, or Relationship is missing.',
										text: 'Please complete the details of Dependent #' + lastIndex + '.',
										type: 'error',
										confirmButtonText: 'OK', 
										allowOutsideClick: false, 
										allowEscapeKey: false
									});
									return false;
								}
								
								lastIndex = index;
							});
							
							if (!isPrevRowHasEmptyCol) {
						    	//proceed with submission -> Save
						    	$("button[value=Save]").addClass('validateform');
						    	$("button[value=Save]").unbind('click').click();
							}
					    }
					}
				}
			});
		}
	}
	
	/*-------------------------------*
	 * MONTHLY AMORTIZATION PRODUCTS *
	 *-------------------------------*/
	
	if (programName == 'INS_InsuranceMonthlyPayment') {
		$('button[value="Process Payment"]').attr("disabled", "disabled");
		$('button[value="Process Payment"]').prop("disabled", true);
		$('button[value="Process Payment"]').addClass("disabledbtn");
		
		$('.cb').click(function() {
			$('button[value="Process Payment"]').attr("disabled", "disabled");
			$('button[value="Process Payment"]').prop("disabled", true);
			$('button[value="Process Payment"]').addClass("disabledbtn");
			
			$('.cb').each(function() {
				if ($(this).filter(':checked').length == 1) {
					$('button[value="Process Payment"]').attr("disabled", "");
					$('button[value="Process Payment"]').prop("disabled", false);
					$('button[value="Process Payment"]').removeClass("disabledbtn");
				}
			});
		});
		
		//grayed out tr for same day trn
		$('.cb').each(function() {
			if ($(this).attr('name').indexOf('isGray') != -1) {
				$(this).closest("tr").addClass('monthly-is-gray');
			}
			else {
				$(this).closest("tr").removeClass('monthly-is-gray');
			}
		});
		
		$('button[value="Process Payment"]').click(function(e) {
			e.preventDefault();
			var loginName = $(".user-name").find("p:first").html().trim();
			var traceNo = "";
			var totalAmt = 0;
			var amtDue = 0;
			var primaryKeys = "[";
			var ctr = 0;
			var html = "<table class=\"table\">" + 
							"<thead>" + 
								"<tr>" + 
									"<th class=\"has-text-left\" width=\"100\" align=\"left\">Name</th>" +
									"<th class=\"has-text-left\" width=\"100\" align=\"left\">POC Number</th>" +
									"<th class=\"has-text-centered\" width=\"100\" align=\"center\">Amount Due</th>" +
								"</tr>" + 
							"</thead>";
			
			$('.cb').each(function() {
				if ($(this).filter(':checked').length == 1) {
					if (!isNaN(dsxcommon.removeAllCommas($(this).parent().prev().text()))) {
						amtDue = parseFloat(dsxcommon.removeAllCommas($(this).parent().prev().text()));
						totalAmt += amtDue;
						traceNo = $(this).parent().prev().prev().prev().prev().text();
						var myObj =  "{\"traceNo\":\"" + traceNo + "\", \"amtDue\":" + amtDue + "}";
						primaryKeys += myObj + ",";
						html += 
								"<tr>" + 
									"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + $(this).parent().prev().prev().prev().prev().prev().text() + "</td>" +
									"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + $(this).parent().prev().prev().prev().prev().text() + "</td>" +
									"<td class=\"has-text-centered\" width=\"100\" align=\"center\">P " + $(this).parent().prev().text() + "</td>" +
								"</tr>";
						ctr++;
					}
				}
			});
			
			primaryKeys += "]";
			
			html += "<tr>" + 
						"<td class=\"has-text-left\" width=\"100\" align=\"left\"></td>" +
						"<td class=\"has-text-left\" width=\"100\" align=\"left\" style=\"padding-top:20px;\"><strong>Total Amount</strong></td>" +
						"<td class=\"has-text-centered\" width=\"100\" align=\"center\" style=\"padding-top:20px;\"><strong>P " + totalAmt.toFixed(2) + "</strong></td>" +
					"</tr>";
			
			html += "</table>";
			
			swal({
				title: 'Selected Transactions for Payment',
				customClass: 'ofac-container', 
				text: "", 
				html : html,
				type: 'info',
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonColor: '#0B5D18',
				cancelButtonColor: '#990000',
				confirmButtonText: 'Process Payment',
				cancelButtonText: 'Exit',
				allowOutsideClick: false, 
				allowEscapeKey: false
			}).then((result) => { 
				if (result) { 
					swal({
						title: 'You will be deducted P ' + totalAmt.toFixed(2) + ' from your account with this transaction.',
						text: 'Would you like to proceed?',
						type: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Yes',
						cancelButtonText: 'No',
						showLoaderOnConfirm: true,
						allowOutsideClick: false, 
						allowEscapeKey: false,
						preConfirm: (data) => {
							$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-ajax.jsp", 
									{processType:"pay", loginName:loginName, primaryKeys:primaryKeys}).done(function(data) {
										
									if (data.data.indexOf('success') != -1) {
										$("[name=primaryKey]").val(data.data.split(':')[1]);
										$("[name=specialParam1]").val(data.data.split(':')[2]);
									}
									
									swal({
										title: data.data.indexOf('success') != -1 ? 'Transaction Successfully Processed.' : data.data,
										text: '',
										type: data.data.indexOf('success') != -1 ? 'success' : 'error',
									}).then((result) => { 
										if (result) {
											$("button[value=Verify]").click();
										}
									});
							});
						}
					}).then((result) => {
						if (!result) { 
							$("button[value=Pay]").click();
						}
					});
				} 
			});
			e.preventDefault();
			
		});
		
		$('td:contains("Overdue")').css('color', 'red');
	}
	
	if (programName == 'INS_InsuranceMonthlyCancellation') {
		$('button[value="Process Cancellation"]').attr("disabled", "disabled");
		$('button[value="Process Cancellation"]').prop("disabled", true);
		$('button[value="Process Cancellation"]').addClass("disabledbtn");
		
		$('.cb').click(function() {
			$('button[value="Process Cancellation"]').attr("disabled", "disabled");
			$('button[value="Process Cancellation"]').prop("disabled", true);
			$('button[value="Process Cancellation"]').addClass("disabledbtn");
			
			$('.cb').each(function() {
				if ($(this).filter(':checked').length == 1) {
					$('button[value="Process Cancellation"]').attr("disabled", "");
					$('button[value="Process Cancellation"]').prop("disabled", false);
					$('button[value="Process Cancellation"]').removeClass("disabledbtn");
				}
			});
		});
		
		$('button[value="Process Cancellation"]').click(function(e) {
			e.preventDefault();
			
			var loginName = $(".user-name").find("p:first").html().trim();
			var traceNo = "";
			var totalAmt = 0;
			var amtDue = 0;
			var primaryKeys = "[";
			var ctr = 0;
			var html = "<table class=\"table\">" + 
							"<thead>" + 
								"<tr>" + 
									"<th class=\"has-text-left\" width=\"150\" align=\"left\">Name</th>" +
									"<th class=\"has-text-left\" width=\"150\" align=\"left\">POC Number</th>" +
								"</tr>" + 
							"</thead>";
			$('.cb').each(function() {
				if ($(this).filter(':checked').length == 1) {
					amtDue = parseFloat(dsxcommon.removeAllCommas($(this).parent().prev().text()));
					totalAmt += amtDue;
					traceNo = $(this).parent().prev().prev().prev().prev().text();
					var myObj =  "{\"traceNo\":\"" + traceNo + "\", \"amtDue\":" + amtDue + "}";
					primaryKeys += myObj + ",";
					html += 
							"<tr>" + 
								"<td class=\"has-text-left\" width=\"150\" align=\"left\">" + $(this).parent().prev().prev().prev().prev().prev().text() + "</td>" +
								"<td class=\"has-text-left\" width=\"150\" align=\"left\">" + $(this).parent().prev().prev().prev().prev().text() + "</td>" +
							"</tr>";
					ctr++;
				}
			});
			
			primaryKeys += "]";
			html += "</table>";
			
			swal({
				title: 'Selected Transactions for Cancellation',
				customClass: 'ofac-container', 
				text: "", 
				html : html,
				type: 'info',
				showCancelButton: true,
				focusConfirm: false,
				confirmButtonColor: '#0B5D18',
				cancelButtonColor: '#990000',
				confirmButtonText: 'Proceed',
				cancelButtonText: 'Exit',
				allowOutsideClick: false, 
				allowEscapeKey: false
			}).then((result) => { 
				if (result) { 
					swal({
						title: 'Selected transaction(s) will be cancelled.',
						text: 'Would you like to proceed?',
						type: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Yes',
						cancelButtonText: 'No',
						showLoaderOnConfirm: true,
						allowOutsideClick: false, 
						allowEscapeKey: false,
						preConfirm: (data) => {
							$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-ajax.jsp", 
									{processType:"cancel", loginName:loginName, primaryKeys:primaryKeys}).done(function(data) {
										
									swal({
										title: data.data.indexOf('success') != -1 ? 'Transaction Successfully Processed.' : data.data,
										text: '',
										type: data.data.indexOf('success') != -1 ? 'success' : 'error',
									}).then((result) => { 
										if (result) {
											$("button[value=Cancel]").click();
										}
									});	
							});
						}
					}).then((result) => {
						if (!result) { 
							$("button[value=Pay]").click();
						}
					});
				} 
			});
		});
	}
	
	if (programName == 'INS_SearchTrnToCancel' || programName == 'INS_SearchTrnToVoid' || 
		programName == 'INS_SearchTrnToModify' || programName == 'INS_SearchTrnToUnvoid') {
		
		$("button[value=Home]").click(function() {
			$(this).prop("type", "button");
			window.location = 'MenuForm.htm';
		});
	}
	
	if (programName == 'INS_CancelTrn' || programName == 'INS_VoidTrn') { 
		$("button[value=Save]").hide();
		$("button[value=Save]").removeClass('validateForm');
	}
	
	if (programName == 'INS_ViewInsuranceSales') {
		//refresh page on browser resize
		$(window).bind('resize', function(e) {
			swal({
				title: 'LOADING... PLEASE WAIT...', 
				showConfirmButton: false,
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			if (window.RT) clearTimeout(window.RT);
			window.RT = setTimeout(function() {
				this.location.reload(false); /* false, to get page from cache; true, from server */
			}, 1000);
		});
	}
	
	function doesFileExist(url) {
	    var http = new XMLHttpRequest();
	    http.open('HEAD', url, false);
	    http.send();
	    return http.status != 404;
	}
	
	if (programName == 'INS_ViewMassUpload') {
		$(".content-viewentry .table-overflow a").click(function(e) {
			e.preventDefault();
			var hrefVal = $(this).closest('a').attr('href');
			var primaryKey = getHrefParameter(hrefVal, "primaryKey");
			var validFlag = primaryKey.split("|")[0];
			var uploadDate = primaryKey.split("|")[1];
			var filename = primaryKey.split("|")[3];
			var tableValues = "";
			var title;
			if(validFlag == 'numValid'){
				title = "Valid Transactions";
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-massUpload2-ajax.jsp",{validFlag:validFlag, uploadDate:uploadDate}).done(function(data) {
					if (!jQuery.isEmptyObject(data.insTransactionList)) {
						tableValues +=
							'<tr>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>System Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Client Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Branch Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Transaction Date</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Trace Number</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Name</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Insurer Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Total Amount</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Expire Date</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Status</strong></td>' +
							'</tr>';
							$.each(data.insTransactionList, function(key, value) {
								var trnInfo = value.split('|');
								tableValues += 
									'<tr>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[0] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[1] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[2] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[3] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[4] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[5] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[6] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[7] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[8] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[9] +'</td>' +
									'</tr>';
						 	});
						 	$('#transactionTable').append(tableValues);
					}
				})
			}
			else if(validFlag == 'numInvalid'){
				title = "Invalid Trasactions";
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-massUpload2-ajax.jsp",{validFlag:validFlag, uploadDate:uploadDate}).done(function(data) {
					if (!jQuery.isEmptyObject(data.insMassUploadList)) {
						tableValues +=
							'<tr>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>System Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Client Code</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Upload Date</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Product ID</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Name</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Birth Date</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Total Amount</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Status</strong></td>' +
								'<td style=text-align:left;font-size:12px;padding-left:10px><strong>Update Date</strong></td>' +
							'</tr>';
							$.each(data.insMassUploadList, function(key, value) {
								var trnInfo = value.split('|');
								tableValues += 
									'<tr>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[0] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[1] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[2] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[3] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[4] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[5] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[6] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[7] +'</td>' +
										'<td style=text-align:left;font-size:10px;padding-left:10px>' + trnInfo[8] +'</td>' +
									'</tr>';
						 	});
						 	$('#transactionTable').append(tableValues);
					}
				})
			}
			else{
				e.preventDefault();

				var dlFileName = filename + "_MassUpload_Report.xlsx";
				if (dlFileName) {
					var downloadUrl = getContextPath() + "/data/spl/" + dlFileName;
					if (doesFileExist(downloadUrl)) {
						window.open(downloadUrl, '_blank');
						return false;
					}
					else {
						swal({
							text: 'No file found for download!', 
							type: 'error',
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
					}
				}
			}
			
			var swal_html = 
					'<div>' +
						'<table id=transactionTable class=table></table>'+
					'</div>' + '<br>';
			swal({
				title: title,
				customClass: 'ofac-container',
				html: swal_html,
				showConfirmButton: false,
				allowOutsideClick: true, 
				allowEscapeKey: true,
				showCancelButton: true,
				focusConfirm: false,
				cancelButtonColor: '#990000',
				cancelButtonText: 'Exit', 
			});

		});
	}
	
	/*--------*
	 * CLAIMS *
	 *--------*/
	
	/*
	if (programName == 'INC_SelectClaim') {
		//populate table via DataTables
		$("#allClaims").DataTable({
			serverSide: true,
            processing: true,
            ajax: {
                url: getContextPath() + "/jsp/ajax/insurance-get-claims-ajax.jsp",
                data: function(d) {
                    return JSON.stringify(d);
                }
            },
			"columns": [
                { title: "Claim ID", data: "claimTraceNo" }, 
                { title: "Policy No.", data: "policyNo" }, 
                { title: "Date Filed", data: "claimDate" },
                { title: "Insured Name", data: "insuredName" },
                { title: "Insurance", data: "insurance" },
                { title: "Rider", data: "riders" },
                { title: "Claimant Name", data: "claimantName" },
                { title: "Claim Status", data: "claimStatus" }, 
                { title: "Action", data: "action" }
            ],
            "columnDefs": [
            	{
                    "targets": 8,
                    "render": function(data, type, row) {
                    	return "<a class=\"button is-small is-info manage\">Manage</a>";
                    }
                }
        	]
		});
		
		//proceed to claims processing page depending on its status
		$('#allClaims').on('click', 'a.manage', function() {
			var claimID = $(this).closest("tr").find("td:first").text();
			var claimStatus = $(this).closest('td').prev().text();
			var targetProgramName = "";
			if (claimStatus.indexOf("Notice") >= 0 || claimStatus.indexOf("Documents") >= 0) {
				targetProgramName = "INC_UploadDocs";
			}
			else if (claimStatus.indexOf("Process") >= 0 || claimStatus.indexOf("Repair") >= 0 || claimStatus.indexOf("Premium") >= 0) {
				targetProgramName = "INC_UploadMailingInfo";
			}
			else if (claimStatus.indexOf("Approved") >= 0) {
				targetProgramName = "INC_PayOutClaims";
			}
			else {
				targetProgramName = "noTarget";
			}
			
			if (targetProgramName != "noTarget") {
				window.location = 'InsuranceForm.htm?programName=' + targetProgramName + '&calledFrom=INC_SelectClaim&formType=InsuranceForm&viewFlag=Y&primaryKey=' + claimID;
			}
			else {
				swal({
					title: 'Sorry!<br>This claim is already ' + claimStatus.replace('Claim ', '').toUpperCase() + '.', 
					type: 'error', 
					width: '700px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
			}
		});
	}
	*/
	
	if (programName == 'INC_SearchPolicies' || programName == 'INC_SearchClaims' || programName == 'INC_SelectRider' || 
		programName == 'INC_FileClaim' || programName == 'INC_UploadDocs' || programName == 'INC_UploadMailingInfo') {
		
		$("button[value=Home]").click(function() {
			$(this).prop("type", "button");
			window.location = 'InsuranceForm.htm?programName=INC_SelectClaim&calledFrom=' + programName;
		});
	}
	
	if (programName == 'INC_SelectRider') {
		var primaryKeys = "";
			
		$(".claim-rider-item").click(function(e) {
			e.preventDefault();
			
			var popupflag = $("input[name=specialParam1]").val();
			if (popupflag == "REM") { /* do not pop-up anymore */ }
			else {
				swal({
					title: 'Filing claims can be complicated for the first time. ' + 
							'If you have any clarifications, please contact Customer Service immediately ' + 
							'at Manila Landline [Globe]: (028) 876 1428, Cebu Landline [PLDT]: (032) 342 7826, ' + 
							'or Toll-Free [Smart/Sun Mobile; PLDT Landline]: 1800 1320 0211, ' + 
							'for them to walk you through the process.', 
					text: '', 
					type: 'info',
					confirmButtonText: 'Continue',
					width: '550px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$("input[name=specialParam1]").val("REM");
			}
			
			var enableFlag = true;
			var coverageID = $(this).attr("data-coverage-id");
			
			var all = $(".claim-rider-item").map(function() {
			    return this;
			}).get();
			
			if ($(this).hasClass('is-success')) {
				$(this).removeClass('is-success');
				$(this).find(':first').addClass('fa-minus-circle');
				$(this).find(':first').removeClass('fa-check-circle');
				var enableFlag = false;

				$("[name=primaryKeys]").val(primaryKeys);
			}
			else {
				all.map(a => {
					//Added Condition to exclude all claimed already in Checked Unchecked
					if ($(a).hasClass('is-claimed')) { /* do nothing */ }
					else {
						$(a).removeClass('is-success');
						$(a).find(':first').addClass('fa-minus-circle');
						$(a).find(':first').removeClass('fa-check-circle');
						
						//Added this to remove all checked in primaryKeys when burial is clicked.
						coverageID = $(a).attr("data-coverage-id");
						primaryKeys = $("[name=primaryKeys]").val().replace(':' + coverageID, '');
						$("[name=primaryKeys]").val(primaryKeys);
					}
				})
				
				$(this).addClass('is-success');
				$(this).find(':first').removeClass('fa-minus-circle');
				$(this).find(':first').addClass('fa-check-circle');
				
				coverageID = $(this).attr("data-coverage-id");
				primaryKeys = $("[name=primaryKeys]").val() + ":" + coverageID;
				$("[name=primaryKeys]").val(primaryKeys);
			}
		});
		
		$("a.button").mouseover(function() {
			if ($(this).text() == 'Home') { return; } //leaves only the Continue button
			
			primaryKeys = $("[name=primaryKeys]").val();
			
			//var traceNo = getHrefParameter($(this).attr('href'), 'primaryKey').split(':')[0]);
			var traceNo = primaryKeys.split(':')[0];
			$.getJSON(getContextPath() + "/jsp/ajax/insurance-validate-pnt-trn-ajax.jsp", {traceNo:traceNo}).done(function(data) {
				if (!jQuery.isEmptyObject(data.isTrnPNTHealth)) {
					if (data.isTrnPNTHealth == "Y") {
						$('*[href*=' + traceNo + ']:visible').attr('data-href', '#');
					}
				}
				if (!jQuery.isEmptyObject(data.isPending)) {
					$('*[href*=' + traceNo + ']:visible').attr('data-pending', data.isPending);
				}
			});
			
			//var productType = getHrefParameter($(this).attr('href'), 'primaryKey').split(':')[1];
			var productType = primaryKeys.split(':')[1];
			if (productType == "MON") {
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-validate-monthly-payments-ajax.jsp", {traceNo:traceNo}).done(function(data) {
					if (!jQuery.isEmptyObject(data.isPaid)) {
						$('*[href*=' + traceNo + ']:visible').attr('data-payment', data.isPaid);
					}
				});
			}
		});
		
		$("a.button").click(function(e) {
			if ($(this).text() == 'Home') { return; } //leaves only the Continue button
			if ($(this).hasClass("claim-rider-item")) { return; }
			
			//do not proceed if transaction is pending for activation
			if ($(this).data('pending') == "Y") {
				swal({
					title: 'Sorry!<br>Filing a claim is NOT APPLICABLE YET for this Pending-for-Activation Insurance Policy.', 
					type: 'error', 
					width: '700px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
				return false;
			}
			
			//do not proceed if transaction is under PNTHealth
			if ($(this).data('href') == "#") {
				swal({
					title: 'Sorry!<br>Filing a claim is NOT APPLICABLE for this Insurance Policy.', 
					type: 'error', 
					width: '700px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
				return false;
			}
			
			//do not proceed if monthly transaction is not yet paid
			if ($(this).data('payment') == "N") {
				swal({
					title: 'Sorry!<br>Filing a claim is NOT APPLICABLE for this Insurance Policy<br>unless or until PAYMENT has been made.', 
					type: 'error', 
					width: '700px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
				return false;
			}
			
			//append primary keys to the HREF attribute of the link
			primaryKeys = $("[name=primaryKeys]").val();
			//var _href = $(this).attr("href");
			var _href = $(this).attr("href") + "&primaryKey=" + primaryKeys;
			var coverageIDs = primaryKeys.split(":")[2];
			if (coverageIDs == null || coverageIDs == undefined || coverageIDs == "") {
				swal({
					title: 'Please select at least ONE (1) coverage item!', 
					text: '', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
				return false;
			}
			//else { $(this).attr("href", _href + "&primaryKey=" + primaryKeys); }
			else { $(this).attr("href", _href); }
		});
		
		$(".downloadAR").click(function(e) {
			e.preventDefault();
			//window.open("https://drive.google.com/file/d/1cXjjqQQEddU_l9z1iyYcXdax8GZ3OWB7/view?usp=sharing", "_blank");
			
			//var dlFileName = getContextPath() + "/data/templates/ACKNOWLEDGEMENT RECEIPT - instant abuloy - " + new Date().getFullYear() + ".pdf";
			var dlFileName = getContextPath() + "/data/templates/instant-abuloy-ar.pdf";
			window.open(dlFileName, '_blank');
			
			return false;
		});
	}
	
	if (programName == 'INC_SearchClaimsForUploadDocs' || programName == 'INC_SearchClaimsForUploadDocs2' || programName == 'INC_SearchClaimsForUploadDocs3' || 
		programName == 'INC_SearchClaimsForMailingInfo' || programName == 'INC_SearchClaimsForPayout') {
		
		if (programName == 'INC_SearchClaimsForUploadDocs3') {
			//populate table via DataTables
			$("#allClaims").DataTable({
				serverSide: true,
	            processing: true,
	            ajax: {
	                url: getContextPath() + "/jsp/ajax/insurance-get-claims-ajax.jsp",
	                data: function(d) {
	                    return JSON.stringify(d);
	                }
	            },
				"columns": [
	                { title: "Claim ID", data: "claimTraceNo" }, 
	                { title: "Policy No.", data: "policyNo" }, 
	                { title: "Date Filed", data: "claimDate" },
	                { title: "Insured Name", data: "insuredName" },
	                { title: "Insurance", data: "insurance" },
	                { title: "Rider", data: "riders" },
	                { title: "Claimant Name", data: "claimantName" },
	                { title: "Claim Status", data: "claimStatus" }, 
	                { title: "Action", data: "action" }
	            ],
	            "columnDefs": [
	            	{
	                    "targets": 8,
	                    "render": function(data, type, row) {
	                    	return "<a class=\"button is-small is-info is-outlined manage\"><span>Manage</span><span class=\"icon is-small\"><i class=\"fa fa-arrow-right\"></i></span></a>";
	                    }
	                }
	        	]
			});
			
			//proceed to claims processing page depending on its status
			$('#allClaims').on('click', 'a.manage', function() {
				var claimID = $(this).closest("tr").find("td:first").text();
				var claimStatus = $(this).closest('td').prev().text();
				var targetProgramName = "";
				if (claimStatus.indexOf("Notice") >= 0 || claimStatus.indexOf("Documents") >= 0 || claimStatus.indexOf("Process") >= 0) {
					targetProgramName = "INC_UploadDocs";
				}
				else {
					targetProgramName = "noTarget";
					
					//enable RNT and OPH users to proceed and view details of all claims inside the upload required docs program 
					var clientCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
					if (clientCode == 'RNT' || clientCode == 'OPH') {
						targetProgramName = "INC_UploadDocs";
					}
				}
				
				if (targetProgramName != "noTarget") {
					//window.location = 'InsuranceForm.htm?programName=' + targetProgramName + '&calledFrom=INC_SelectClaim&formType=InsuranceForm&viewFlag=Y&primaryKey=' + claimID;
					var targetLink = 'InsuranceForm.htm?programName=' + targetProgramName + '&calledFrom=INC_SelectClaim&formType=InsuranceForm&viewFlag=Y&primaryKey=' + claimID;
					window.open(targetLink, '_blank');
				}
				else {
					swal({
						title: 'Sorry!<br>This claim is already ' + claimStatus.replace('Claim ', '').toUpperCase() + '.', 
						type: 'error', 
						width: '700px',
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
				}
			});
		}
		
		if (programName == 'INC_SearchClaimsForUploadDocs' || programName == 'INC_SearchClaimsForUploadDocs2') {
			$("a.button").click(function(e) {
				if ($(this).text().trim() == 'Manage') {
					var clientCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '').split("-")[0];
					if (clientCode != 'RNT') {
						var claimStatus = $(this).parent().prev("td").text().trim().replaceAll(/\s/g, '');
						if (claimStatus != 'FNOCSent' && claimStatus != 'DocumentsSent' && claimStatus != 'OnProcess') {
							swal({
								title: 'Sorry!<br>This claim is already ' + claimStatus.toUpperCase() + '.', 
								type: 'error', 
								width: '700px',
								allowOutsideClick: false, 
								allowEscapeKey: false
							});
							e.preventDefault();
							return false;
						}
					}
				}
			});
		}
		
		var targetProgramName;
		if (programName == 'INC_SearchClaimsForUploadDocs' || programName == 'INC_SearchClaimsForUploadDocs2') { targetProgramName = "INC_UploadDocs"; }
		else if (programName == 'INC_SearchClaimsForMailingInfo') { targetProgramName = "INC_UploadMailingInfo"; }
		else { targetProgramName = "INC_PayOutClaims"; }
		
		$(".content-viewentry .table-overflow a").each(function() {
			var hrefVal = $(this).attr('href');
			var newHref = hrefVal.replace(/(formType=).*?(&)/,'$1InsuranceForm$2');
			newHref = newHref.replace(/(calledFrom=).*?(&)/,'$1' + $("[name=programName]").val() + '$2');
			newHref = newHref.replace(/(programName=).*?(&)/,'$1' + targetProgramName + '$2');
			newHref = newHref.replace(/(viewFlag=).*?(&)/,'$1Y$2');
			newHref = newHref.replace('ViewEntry2','InsuranceForm');
			$(this).attr('href', newHref);
		});
		
		isTableLoaded('.content-viewentry table', 100);
		
		$("button[value=Home]").click(function() {
			$(this).prop("type", "button");
			window.location = 'InsuranceForm.htm?programName=INC_SelectClaim&calledFrom=' + programName;
		});
	}
	
	if (programName == 'INC_UploadDocs') {
		//generate claim documents list slip and other claims-related documents into a ZIP
		$.getJSON(getContextPath() + "/jsp/ajax/insurance-claim-generate-docs-ajax.jsp", {
			loginName:$(".user-name").find("p:first").html().trim(), claimTraceNo:$("[name=specialParam2]").val()
			}).done(function(data) {}
		);
		
		$(".file").mouseover(function() {
			var popupflag = $("input[name=specialParam1]").val();
			if (popupflag == "REM") { /* do not pop-up anymore */ }
			else {
				swal({
					html: '<ol style=\'margin:0;padding:0 50px;text-align:justify\'>' + 
						'<li>Uploading claim documents can also be complicated for the first time.</li>' + 
						'<li>Please make sure that the documents uploaded are CORRECT and CLEAR COPIES.</li>' + 
						'<li>If you have any clarifications, please contact Customer Service immediately ' + 
						'at Manila Landline [Globe]: (028) 876 1428, Cebu Landline [PLDT]: (032) 342 7826, ' + 
						'or Toll-Free [Smart/Sun Mobile; PLDT Landline]: 1800 1320 0211, ' + 
						'for them to also walk you through the process.</li>' + 
						'<li>Please complete and submit your document requirements within 30 days.</li></ol>', 
					type: 'info',
					confirmButtonText: 'Continue',
					width: '750px',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$("input[name=specialParam1]").val("REM");
			}
		});
		
		$(".claim-doc").change(function(e) {
			if (!e.target.files || !window.FileReader) return;
			
			var selDiv = $("#claim-doc-div");
			selDiv.html("");
			var files = e.target.files;
			var i = 0;
			var claimTraceNo = $("[name=specialParam2]").val();
		    var claimDocNo = $(this).attr("name").replace(/[^0-9]/gi, '');
		    var fileName = "";
		    var newFileName = "";
			var imgFileNames = [];
			var proceedFlag = true;
			var fileErrorMessage = "";
			var BreakException = {};
			var fileType = "";
			var imageExt = "";
			var loginName = $(".user-name").find("p:first").html().trim();
			
			$.ajax({
    			type: "POST",
    			url: getContextPath() + "/jsp/ajax/insurance-claim-delete-docs-ajax.jsp",
    			data: { loginName: loginName, claimTraceNo: claimTraceNo, claimDocNo: claimDocNo },
  				cache: false,
  				contentType: "application/x-www-form-urlencoded",
  				success: function (result) {}
  			});
			
			//check if browser supports File API
		    if (window.File && window.FileList && window.FileReader) {
		        for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            if (!file.type.match('image') && !file.name.match("\.pdf")) {
		            	fileErrorMessage = "Sorry! Only IMAGE and PDF files are accepted.";
						proceedFlag = false;
		            	continue;
		            }
		            if (file.size > 1048576) {
						fileErrorMessage = "Sorry! One of the IMAGE/PDF files selected exceeded the maximum size (1MB) allowed.";
						proceedFlag = false;
						continue;
					}

		            var picReader = new FileReader();
		            picReader.addEventListener("load", function (event) {
		                var picFile = event.target;
		                var html = "";
		                var extension = file.name.split('.').pop().toLowerCase();
						html = "<img class=\"claim-doc-item is-hidden\" data-extension=\"" + extension + "\" src=\"" + picFile.result + "\">";
						selDiv.append(html);
						fileType = "img";
		            });
		            //read the image
		            picReader.readAsDataURL(file);
		        }
		    }
		    else { console.log("Sorry! Your browser does not support File API."); }
			
			if (proceedFlag) {
				var checkExist = setInterval(function() {
					$("" + fileType + ".claim-doc-item").each(function(index) {
						var fileExtension = "." + $(this).attr("data-extension");
						var newFileName = claimTraceNo + "_" + claimDocNo + "-" + (index + 1) + fileExtension;
				    	var cdFileSrc = $(this).attr('src');
				    	if (cdFileSrc.length) {
				    		$.ajax({
				    			type: "POST",
				    			url: getContextPath() + "/jsp/ajax/insurance-claim-save-doc-data-ajax.jsp",
				    			data: { loginName: loginName, fileDataSrc: cdFileSrc, fileName: newFileName },
				  				cache: false,
				  				contentType: "application/x-www-form-urlencoded",
				  				success: function (result) {}
				  			});
				    		clearInterval(checkExist);
				    	}
					});
				}, 300);
				
				swal({
					title: 'UPLOADING DOCUMENT... PLEASE WAIT...', 
					showConfirmButton: false,
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				setTimeout(function() { $("[value=Upload]").click(); }, 1500); //submit
			}
			else {
				swal({
					title: "File Upload Error",
					text: fileErrorMessage, 
					type: "error",
					showConfirmButton: true,
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
			}
		});
		
		$(".viewClaimDoc").click(function() {
			var claimDocNo = $(this).attr("id").replace(/[^0-9]/gi, '');
			var docArray = [];
			var docItem = "";
			var elemType = "";
			$(".gallery" + claimDocNo).each(function() {
				docItem = $(this).attr("src");
				docArray.push(docItem);
				
				if ($(this).prop("tagName") == "EMBED") { elemType = "iframe"; }
				else { elemType = "image"; }
		    });
			
			var fbObj;
			if (elemType == "iframe") {
				$.fancybox.open({
					src  : '.gallery' + claimDocNo,
					type : 'inline',
					opts : {
						afterShow : function(instance, current) {
							console.info('done!');
						}
					}
				});
			}
			else {
				fbObj = {
					'padding': 0,
					'transitionIn': 'none',
					'transitionOut': 'none',
					'type': 'image',
					'changeFade': 0
				};
				$.fancybox.open(docArray, fbObj);
			}
		});
		
		/*
		$(".downloadClaimDoc").click(function(e) {
			var req = new XMLHttpRequest();
			var traceNo = $("[name=specialParam2]").val();
		    var claimDocNo = $(this).attr("id").replace(/[^0-9]/gi, '');
		    var fileNameNoExt = traceNo + "_" + claimDocNo;
		    var loginName = $(".user-name").find("p:first").html().trim();
		    var downloadUrl = getContextPath() + "/data/spl/" + loginName.toUpperCase() + "-" + traceNo + "/" + fileNameNoExt + ".zip";
			req.open("GET", downloadUrl, true);
			req.responseType = "blob";
			req.onload = function (event) {
				var blob = req.response;
				var fileName = null;
				var contentType = req.getResponseHeader("content-type");

				//IE/EDGE seems not returning some response header
				if (req.getResponseHeader("content-disposition")) {
					var contentDisposition = req.getResponseHeader("content-disposition");
					fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);
				}
				else {
					fileName = fileNameNoExt + "." + contentType.substring(contentType.indexOf("/") + 1);
				}

				if (window.navigator.msSaveOrOpenBlob) {
					//Internet Explorer/Edge
					window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
				}
				else {
					var el = document.getElementById("claim-doc-target");
					el.href = window.URL.createObjectURL(blob);
					el.download = fileName;
					el.click();
				}
			};
			req.send();
		});
		*/
		$(".downloadClaimDoc").each(function() {
			var claimDocNo = $(this).attr("id").replace(/[^0-9]/gi, '');
			$(this).attr('href', $(".gallery" + claimDocNo).attr('src'));
			$(this).attr('download', 'claimDoc' + claimDocNo + '.jpg');
		});
		
		$("#submitComment").click(function(e) {
			e.preventDefault();
			var loginName = $(".user-name").find("p:first").html().trim();
			var traceNo = $("[name=specialParam2]").val();
			var commentRemarks = $("#textComment").val();
			if (commentRemarks == "") {
				$(".cm-modal").removeClass("is-active");
				swal({
					title: 'Please enter a comment!',
					type: 'error',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
			}
			else {
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-claim-post-comment-ajax.jsp", 
					{loginName:loginName, claimTraceNoAndComment:traceNo + ":" + commentRemarks}).done(function(data) {
					if (data.isPosted && data.isPosted == "Y") {
						$(".cm-modal").removeClass("is-active");
						window.location = window.location.href;
						$.LoadingOverlay("show");
					}
				});
			}
		});
		
		$("button[value=Proceed]").click(function(e) {
			e.preventDefault();
			window.location = $("#mailing").attr("href");
		});
		
		$("button").click(function(e) {
			var buttonVal = $(this).val();
			if (buttonVal.indexOf("Receipt") >= 0) {
				e.preventDefault();
				
			    var loginName = $(".user-name").find("p:first").html().trim();
			    var claimTraceNo = $("[name=specialParam2]").val();
			    var fileNameNoExt = loginName.toUpperCase() + "-REQUIRED-CLAIM-DOCS-" + claimTraceNo;
			    var downloadUrl = getContextPath() + "/data/spl/" + fileNameNoExt + ".zip";
				var req = new XMLHttpRequest();
				req.open("GET", downloadUrl, true);
				req.responseType = "blob";
				req.onload = function (event) {
					var blob = req.response;
					var fileName = null;
					var contentType = req.getResponseHeader("content-type");

					//IE/EDGE seems not returning some response header
					if (req.getResponseHeader("content-disposition")) {
						var contentDisposition = req.getResponseHeader("content-disposition");
						fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);
					}
					else {
						fileName = fileNameNoExt + "." + contentType.substring(contentType.indexOf("/") + 1);
					}

					if (window.navigator.msSaveOrOpenBlob) {
						//Internet Explorer/Edge
						window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
					}
					else {
						var el = document.createElement('a');
						el.href = window.URL.createObjectURL(blob);
						el.download = fileName;
						el.click();
					}
				};
				req.send();
			}
			else if (buttonVal.indexOf("Revert") >= 0) {
				e.preventDefault();
				$("#revert-to-pending-link").click();
			}
			else if (buttonVal.indexOf("Tag") >= 0 || buttonVal.indexOf("Deny") >= 0) {
				e.preventDefault();
				
				var groupID = $("[name=lastFieldFocus]").val();
				if (groupID != "" && groupID == "GPAS:2") {
					//upload quit claim form file first [could be 2 docs (including LOG) in 1 file]
					swal({
						title: 'UPLOAD QUIT CLAIM FORM',
						input: 'file',
						showCancelButton: true,
				        confirmButtonText: 'Upload',
						inputAttributes: { accept: 'image/*, application/pdf' }
					}).then(function(file) {
						if (file) {
							var loginName = $(".user-name").find("p:first").html().trim();
							var traceNo = $("[name=specialParam2]").val();
							var file_src;
							var reader = new FileReader;
							reader.onload = function(e) {
								file_src = e.target.result;
								if (file_src.indexOf("jpeg") >= 0 || file_src.indexOf("png") >= 0 || file_src.indexOf("pdf") >= 0) {
									$.ajax({
										type: 'POST',
										url: getContextPath() + "/jsp/ajax/insurance-claim-upload-qcf-ajax.jsp",
										data: { loginName:loginName, claimTraceNoAndFileSrc:traceNo + "|" + file_src },
						  				cache: false,
						  				contentType: "application/x-www-form-urlencoded",
						  				success: function(result) {
						  					swal({
						  						title: 'Success!', 
						  						text: 'Quit Claim Form has been successfully uploaded!', 
												type: 'success', 
						  						confirmButtonText: 'OK', 
						  						allowOutsideClick: false, 
						  						allowEscapeKey: false
						  					}).then(function() {
						  						//enter approved/confirmed and deductible amounts
						  						swal({
						  							title: 'ENTER APPROVED AND DEDUCTIBLE AMOUNTS',
						  							customClass: 'ofac-container', 
						  							html: 
						  								"<div class=\"columns\">" +
						  									"<div class=\"column\">" + 
							  									"<div class=\"field is-horizontal\">" +
								  									"<div class=\"field-body\">" +
								  										"<div class=\"field\">" +
								  											"<label class=\"label\">Approved Amount</label>" +
								  											"<div class=\"control\">" +
								  							 			    	"<input type=\"text\" id=\"string1\" name=\"approvedAmt\" class=\"input has-text-right\" value=\"\" size=\"33\" maxlength=\"15\" tabindex=\"101\" placeholder=\"Approved Amount\" autocomplete=\"off\">" + 
								  							 			    "</div>" +
								  							 			"</div>" + 
								  							 			"<div class=\"field\">" +
								  							 				"<label class=\"label\">Confirm Approved Amount</label>" +
								  							 			    "<div class=\"control\">" +
								  							 			    	"<input type=\"text\" id=\"string1\" name=\"confirmedAmt\" class=\"input has-text-right\" value=\"\" size=\"33\" maxlength=\"15\" tabindex=\"102\" placeholder=\"Confirm Approved Amount\" autocomplete=\"off\">" + 
								  							 			    "</div>" +
							  							 			    "</div>" + 
								  							 			 "<div class=\"field\">" +
								  											"<label class=\"label\">Deductible Amount</label>" +
								  											"<div class=\"control\">" +
								  							 			    	"<input type=\"text\" id=\"string1\" name=\"deductibleAmt\" class=\"input has-text-right\" value=\"\" size=\"33\" maxlength=\"15\" tabindex=\"101\" placeholder=\"Deductible Amount\" autocomplete=\"off\">" + 
								  							 			    "</div>" +
								  							 			"</div>" + 
						  							 			    "</div>" + 
						  							 			 "</div>" + 
						  						 			"</div>" + 
						  					 			"</div>",
						  							showCancelButton: true,
						  							focusConfirm: false,
						  							confirmButtonColor: '#0B5D18',
						  							cancelButtonColor: '#990000',
						  							confirmButtonText: 'Approve',
						  							cancelButtonText: 'Cancel',
						  							allowOutsideClick: false, 
						  							allowEscapeKey: false,
						  							showLoaderOnConfirm: true,
						  							preConfirm: (data) => {
						  								var payoutAmt = $("[name=approvedAmt]").val();
						  								var confirmedAmt = $("[name=confirmedAmt]").val();
						  								var deductibleAmt = $("[name=deductibleAmt]").val();
						  								var claimID = $("[name=specialParam2]").val();
						  								var loginName = $(".user-name").find("p:first").html().trim();
						  								var regEx = /^[0-9\.]*$/;
						  								
						  								if (payoutAmt == '' || !regEx.test(payoutAmt)) {
						  									swal('Oops!', 'Please provide valid amount.', 'error').then((result) => {
						  										$('button[value="Tag For Approval"]').click();
						  									});
						  								}
						  								else if (confirmedAmt == '' || !regEx.test(confirmedAmt)) {
						  									swal('Oops!', 'Please provide valid confirmed amount.', 'error').then((result) => {
						  										$('button[value="Tag For Approval"]').click();
						  									});
						  								}
						  								else if (parseFloat(payoutAmt) != parseFloat(confirmedAmt)) {
						  									swal('Oops!', 'Amounts do not match.', 'error').then((result) => {
						  										$('button[value="Tag For Approval"]').click();
						  									});
						  								}
						  								else if (deductibleAmt == '' || !regEx.test(deductibleAmt)) {
						  									swal('Oops!', 'Please provide valid deductible amount.', 'error').then((result) => {
						  										$('button[value="Tag For Approval"]').click();
						  									});
						  								}
						  								else {
						  									$.getJSON(getContextPath() + "/jsp/ajax/insurance-claims-validate-approved-amt-ajax.jsp", {loginName:loginName, payoutAmt:payoutAmt, claimID:claimID}).done(function(data) {
						  										if (!jQuery.isEmptyObject(data.isValid)) {
						  											if (data.isValid == "Y") {
						  												$.getJSON(getContextPath() + "/jsp/ajax/insurance-claims-supplement-ajax.jsp",{loginName:loginName, payoutAmt:payoutAmt, claimID:claimID, deductibleAmt:deductibleAmt}).done(function(data) {
									  										swal({
									  											title: '',
									  											text: data.errorMessage,
									  											type: data.errorMessage.indexOf("processing") >= 0 ? 'success' : 'error',
									  											confirmButtonText: 'OK', 
									  											allowOutsideClick: false, 
									  											allowEscapeKey: false
									  										}).then((result) => {
									  											if (data.errorMessage.indexOf("processing") >= 0) {
									  												$("button:contains(Tag)").unbind('click').click();
									  												$.LoadingOverlay("show");
									  											}
									  										});
									  									});
						  											}
						  											else {
						  												swal({
						  													title: 'Sorry!', 
						  													text: 'Approved Amount entered is greater than the Total Coverage Amount. ' + 
						  														'Please contact Customer Service at (032) 416.7823 / 0917.709.2212 / 0917.709.2226 / 0932.873.6970', 
						  													type: 'error', 
						  													allowOutsideClick: false, 
						  													allowEscapeKey: false
						  												});
						  											}
						  										}
						  									});
						  								}
						  							}
						  						});
						  					});
						  				}
						  			});
								}
								else {
									swal({
										title: 'Sorry!', 
										text: 'Only IMAGE and PDF files are accepted.', 
										type: 'error', 
										allowOutsideClick: false, 
										allowEscapeKey: false
									});
								}
							};
							reader.readAsDataURL(file);
						}
					}); //--end uploading of quit claim form file (w/ LOA)
				}
				else {
					var sTitle = 'QUIT CLAIM FORM';
					var ajaxUrl = "/jsp/ajax/insurance-claim-upload-qcf-ajax.jsp";
					var sText = 'Quit Claim Form';
					var btnWC = "Tag";
					if (buttonVal.indexOf("Deny") >= 0) {
						sTitle = 'DENIAL LETTER';
						ajaxUrl = "/jsp/ajax/insurance-claim-upload-denial-letter-ajax.jsp";
						sText = 'Denial Letter';
						btnWC = "Deny";
					}
					
					swal({
						title: 'UPLOAD ' + sTitle,
						input: 'file',
						inputAttributes: { accept: 'image/*, application/pdf' }
					}).then(function(file) {
						var loginName = $(".user-name").find("p:first").html().trim();
						var traceNo = $("[name=specialParam2]").val();
						var file_src;
						var reader = new FileReader;
						reader.onload = function(e) {
							file_src = e.target.result;
							if (file_src.indexOf("jpeg") >= 0 || file_src.indexOf("png") >= 0 || file_src.indexOf("pdf") >= 0) {
								$.ajax({
					    			type: "POST",
					    			url: getContextPath() + ajaxUrl,
					    			data: { loginName: loginName, claimTraceNoAndFileSrc: traceNo + "|" + file_src }, 
					  				cache: false,
					  				contentType: "application/x-www-form-urlencoded",
					  				success: function (result) {
					  					swal({
					  						title: 'Success!', 
					  						text: sText + ' has been successfully uploaded!', 
											type: 'success', 
					  						confirmButtonText: 'OK', 
					  						allowOutsideClick: false, 
					  						allowEscapeKey: false
					  					}).then(function() {
					  						$("button:contains(" + btnWC + ")").unbind('click').click();
					  						$.LoadingOverlay("show");
					  					});
					  				}
					  			});
							}
							else {
								swal({
									title: 'Sorry!', 
									text: 'Only IMAGE and PDF files are accepted.', 
									type: 'error', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								});
							}
						};
						reader.readAsDataURL(file);
					});
				}
			}
		});
		
		$("#revertClaim").click(function(e) {
			e.preventDefault();
			var loginName = $(".user-name").find("p:first").html().trim();
			var traceNo = $("[name=specialParam2]").val();
			var reason = $("#textReason").val();
			if (reason == "") {
				$(".cm-modal").removeClass("is-active");
				swal({
					title: 'Please enter a reason!',
					type: 'error',
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
			}
			else {
				$.LoadingOverlay("show");
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-claim-revert-with-reason-ajax.jsp", 
					{loginName:loginName, claimTraceNoAndReason:traceNo + ":" + reason}).done(function(data) {
					if (data.isReverted && data.isReverted == "Y") {
						$(".cm-modal").removeClass("is-active");
						location.reload(true);
					}
				});
			}
		});
	}
	
	function urlExists(url, cb) {
	    jQuery.ajax({
	        url: url,
	        dataType: 'text',
	        type: 'GET',
	        complete: function(xhr) { 
	            if (typeof cb === 'function') cb.apply(this, [xhr.status]);
	        }
	    });
	}
	
	if (programName == 'INC_SearchClaimsForMailingInfo' || programName == 'INC_UploadMailingInfo') {
		$('.content-viewentry .table-overflow').on('click', 'a.button', function(e) {
			if ($(this).text().trim() == 'Download Quit Claim') {
				e.preventDefault();
				
				/*
				var claimTraceNo = $(this).parent().siblings(":first").text();
			    var loginName = $(".user-name").find("p:first").html().trim();
			    var downloadUrl = getContextPath() + "/data/spl/" + loginName.toUpperCase() + "-" + claimTraceNo + "-QCF";
			    var extensionsArray = new Array("jpg", "png", "pdf");
			    $.each(extensionsArray, function(index, value) {
			    	urlExists(downloadUrl + "." + value, function(status) {
				        if (status === 200) {
				        	var req = new XMLHttpRequest();
							req.open("GET", downloadUrl + "." + value, true);
							req.responseType = "blob";
							req.onload = function(event) {
								var blob = req.response;
								var fileName = null;
								var contentType = req.getResponseHeader("content-type");

								//IE/EDGE seems not returning some response header
								if (req.getResponseHeader("content-disposition")) {
									var contentDisposition = req.getResponseHeader("content-disposition");
									fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);
								}
								else {
									fileName = downloadUrl + "." + contentType.substring(contentType.indexOf("/") + 1);
								}

								if (window.navigator.msSaveOrOpenBlob) {
									//Internet Explorer/Edge
									window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
								}
								else {
									var el = document.createElement('a');
									el.href = window.URL.createObjectURL(blob);
									el.download = fileName;
									el.click();
								}
							};
							req.send();
				        	return false;
				        }
				    });
		    	});
			    */
				
				var loginName = $(".user-name").find("p:first").html().trim();
				var claimTraceNo = $(this).parent().siblings(":first").text();
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-claim-get-qcf-ajax.jsp", {loginName:loginName, claimTraceNo:claimTraceNo}).done(function(data) {
					if (data.qcfFileName) {
						var downloadUrl = getContextPath() + "/data/spl/" + data.qcfFileName;
						window.open(downloadUrl, '_blank');
					}
					else {
						swal({
							title: 'Sorry!', 
							text: 'Quit Claim Form not found. Please contact RuralNet Customer Service.', 
							type: 'error', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
					}
				});
			}
			
			if ($(this).text().trim() == 'Upload FYP Receipt') {
				e.preventDefault();
				
				var loginName = $(".user-name").find("p:first").html().trim();
				var traceNo = $(this).parent().siblings(":first").text();
				
				swal({
					title: 'UPLOAD FYP RECEIPT',
					input: 'file',
					showCancelButton: true,
			        confirmButtonText: 'Upload',
					inputAttributes: { accept: 'image/*, application/pdf' }
				}).then(function(file) {
					if (file) {
						var file_src;
						var reader = new FileReader;
						reader.onload = function(e) {
							file_src = e.target.result;
							if (file_src.indexOf("jpeg") >= 0 || file_src.indexOf("png") >= 0 || file_src.indexOf("pdf") >= 0) {
								$.ajax({
									type: 'POST',
									url: getContextPath() + "/jsp/ajax/insurance-claim-upload-fyp-receipt-ajax.jsp",
									data: { loginName:loginName, claimTraceNoAndFileSrc:traceNo + "|" + file_src },
					  				cache: false,
					  				contentType: "application/x-www-form-urlencoded",
					  				success: function(result) {
					  					swal({
					  						title: 'Success!', 
					  						text: 'FYP Receipt has been successfully uploaded!', 
											type: 'success', 
					  						confirmButtonText: 'OK', 
					  						allowOutsideClick: false, 
					  						allowEscapeKey: false
					  					});
					  				}
					  			});
							}
							else {
								swal({
									title: 'Sorry!', 
									text: 'Only IMAGE and PDF files are accepted.', 
									type: 'error', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								});
							}
						};
						reader.readAsDataURL(file);
					}
				});
			}
			
			if ($(this).text().trim() == 'Not Applicable') {
				e.preventDefault();
			}
			
			if ($(this).text().trim() == 'Pay FYP') {
				e.preventDefault();
				
				var loginName = $(".user-name").find("p:first").html().trim();
				var claimTraceNo = $(this).parent().siblings(":first").text();
				var pocNo = "";
				var amtDue = "";
				
				$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-getamtdue-ajax.jsp", 
					{loginName:loginName, claimTraceNo:claimTraceNo}).done(function(data) {
						
					pocNo = data.pocNo;
					amtDue = data.amtDue;
					if (amtDue == undefined) {
						swal({
							title: 'This policy is already FULLY PAID!', 
							type: 'info', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
					}
					else {
						var html = "<table class=\"table is-bordered\">" + 
									"<tbody>" + 
										"<tr>" + 
											"<th class=\"has-text-left\" width=\"100\" align=\"left\">Name</th>" + 
											"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + data.fullName + "</td>" + 
										"</tr>" + 
										"<tr>" + 
											"<th class=\"has-text-left\" width=\"100\" align=\"left\">POC No.</th>" + 
											"<td class=\"has-text-left\" width=\"100\" align=\"left\">" + pocNo + "</td>" + 
										"</tr>" + 
										"<tr>" + 
											"<th class=\"has-text-left\" width=\"100\" align=\"left\">Amount Due</th>" + 
											"<td class=\"has-text-right\" width=\"100\" align=\"right\">P " + amtDue + "</td>" +
										"</tr>" + 
									"</tbody>" + 
								"</table>";
						
						swal({
							title: 'Transaction Summary for Payment',
							customClass: 'ofac-container', 
							text: "", 
							html : html,
							type: 'info',
							showCancelButton: true,
							focusConfirm: false,
							confirmButtonColor: '#0B5D18',
							cancelButtonColor: '#990000',
							confirmButtonText: 'Process Payment',
							cancelButtonText: 'Cancel',
							allowOutsideClick: false, 
							allowEscapeKey: false
						}).then((result) => { 
							if (result) { 
								swal({
									title: 'You will be deducted P ' + amtDue + ' from your account with this transaction.',
									text: 'Would you like to proceed?',
									type: 'warning',
									showCancelButton: true,
									confirmButtonText: 'Yes',
									cancelButtonText: 'No',
									showLoaderOnConfirm: true,
									allowOutsideClick: false, 
									allowEscapeKey: false,
									preConfirm: (data) => {
										$.getJSON(getContextPath() + "/jsp/ajax/insurance-monthly-single-trn-ajax.jsp", 
											{loginName:loginName, pocNo:pocNo, amtDue:parseInt(dsxcommon.removeAllCommas(amtDue))}).done(function(data) {
												
											if (data.data.indexOf('success') != -1) {
												$("[name=primaryKey]").val(data.data.split(':')[1]);
												$("[name=specialParam1]").val(data.data.split(':')[2]);
											}
											
											swal({
												title: data.data.indexOf('success') != -1 ? 'Transaction payment successful!' : data.data,
												text: '',
												type: data.data.indexOf('success') != -1 ? 'success' : 'error',
											});	
										});
									}
								});
							} 
						});
					}
				});
			}
		});
	}
	
	if (programName == 'INC_UploadMailingInfo') {
		
		$('button[value="Approve Claim"]').click(function(e) {
			e.preventDefault();
			
			//get and show the signed QCF to the pop-up amounts entry 
			var claimTraceNo = $("[name=primaryKey]").val().split(":")[0];
		    var loginName = $(".user-name").find("p:first").html().trim();
//		    var sqcfUrl = getContextPath() + "/data/spl/" + loginName.toUpperCase() + "-" + claimTraceNo + "-SQCF";
//		    var extensionsArray = new Array("jpg", "png", "pdf");
		    
		    var clientCode = $("[name=specialParam1]").val();
		    var remitAgency =  $("[name=specialParam2]").val();
		    var includePayoutChannel = "";
		    if (clientCode == "AKU" || clientCode == "TGP") {
		    	includePayoutChannel = 
			    	"<div class=\"columns\">" +
			    		"<div class=\"column\">" +
		    				"<label style=\"padding-bottom:5px\" class=\"has-text-left\">Payout To:</label>" +
		    				"<p class=\"control\">" +
		    					"<input type=\"text\" id=\"string3\" name=\"remitAgency\" readonly=\"\" class=\"input has-text-left\" value=\"" + remitAgency + "\" size=\"34\" maxlength=\"15\" tabindex=\"103\" placeholder=\"Payout To:\" autocomplete=\"off\">" + 
		    				"</p>" +
		    			"</div>" +
		    		"</div>";
		    }
		    
//		    $.each(extensionsArray, function(index, value) { 
//		    	urlExists(sqcfUrl + "." + value, function(status) {
//			        if (status === 200) {
//			        	sqcfUrl = sqcfUrl + "." + value;
			        	
			        	swal({
							title: 'Enter Approved Amount',
							customClass: 'ofac-container', 
							//imageUrl: sqcfUrl,
							imageUrl: $("img.gallery-quitClaim").attr('src'),
							html: 
								"<div class=\"columns\">" +
									"<div class=\"column\">" +
										"<div class=\"field is-grouped\">" +
											"<p class=\"control\">" +
							 			    	"<input type=\"text\" id=\"string1\" name=\"approvedAmt\" class=\"input has-text-right\" value=\"\" size=\"34\" maxlength=\"15\" tabindex=\"101\" placeholder=\"Approved Amount\" autocomplete=\"off\">" + 
							 			    "</p>" +
							 			    "<p class=\"control\">" +
							 			    	"<input type=\"text\" id=\"string1\" name=\"confirmedAmt\" class=\"input has-text-right\" value=\"\" size=\"33\" maxlength=\"15\" tabindex=\"102\" placeholder=\"Confirmed Approved Amount\" autocomplete=\"off\">" + 
							 			    "</p>" +
							 			"</div>" + 
						 			"</div>" + 
					 			"</div>" + includePayoutChannel,
							showCancelButton: true,
							focusConfirm: false,
							confirmButtonColor: '#0B5D18',
							cancelButtonColor: '#990000',
							confirmButtonText: 'Approve',
							cancelButtonText: 'Cancel',
							allowOutsideClick: false, 
							allowEscapeKey: false,
							showLoaderOnConfirm: true,
							preConfirm: (data) => {
								var payoutAmt = $("[name=approvedAmt]").val();
								var confirmedAmt = $("[name=confirmedAmt]").val();
								var claimID = $("[name=primaryKey]").val().split(":")[0];
								var loginName = $(".user-name").find("p:first").html().trim();
								var regEx = /^[0-9\.]*$/;
								
								if (payoutAmt == '' || !regEx.test(payoutAmt)) {
									swal('Oops!', 'Please provide valid amount.', 'error').then((result) => {
										$("#approvedPayout").click();
									});
								}
								else if (confirmedAmt == '' || !regEx.test(confirmedAmt)) {
									swal('Oops!', 'Please provide valid confirmed amount.', 'error').then((result) => {
										$("#approvedPayout").click();
									});
								}
								else if (parseFloat(payoutAmt) != parseFloat(confirmedAmt)) {
									swal('Oops!', 'Amounts do not match.', 'error').then((result) => {
										$("#approvedPayout").click();
									});
								}
								else {
									$.getJSON(getContextPath() + "/jsp/ajax/insurance-claims-ajax.jsp",{loginName:loginName, payoutAmt:payoutAmt, claimID:claimID}).done(function(data) {
										swal({
											title: '',
											text: data.errorMessage,
											type: data.errorMessage.indexOf("success") ? 'success' : 'error',
											confirmButtonText: 'OK', 
											allowOutsideClick: false, 
											allowEscapeKey: false
										}).then((result) => {
											if (!data.errorMessage.indexOf("success")) {
												$("#approvedPayout").click();
											}
											else {
												$('button[value="Verify"]').click();
											}
										});
									});
								}
							}
						});
						$("[name=approvedAmt]").focus();
			        	
			        	return false;
//			        }
//			    });
//	    	});
		});
		
		$(".viewMailDoc").click(function() {
			var claimDocNo = $(this).attr("id");
			var docArray = [];
			var docItem = "";
			var elemType = "";
			$(".gallery-" + claimDocNo).each(function() {
				docItem = $(this).attr("src");
				docArray.push(docItem);
				
				if ($(this).prop("tagName") == "EMBED") { elemType = "iframe"; }
				else { elemType = "image"; }
		    });
			
			var fbObj;
			
			if (elemType == "iframe") {
				$('.gallery-' + claimDocNo).removeClass('is-hidden');
				$.fancybox.open({
					src  : '.gallery-' + claimDocNo,
					type : 'inline',
					opts : {
						afterShow : function(instance, current) {
							console.info('done!');
						}
					}
				});
			}
			else {
				fbObj = {
					'padding': 0,
					'transitionIn': 'none',
					'transitionOut': 'none',
					'type': 'image',
					'changeFade': 0
				};
				$.fancybox.open(docArray, fbObj);
			}
		});
		
		$('#quitClaimTemplate').click(function(e) {
			e.preventDefault();
			
			/*
			var claimTraceNo = $("[name=primaryKey]").val().split(":")[0];
		    var loginName = $(".user-name").find("p:first").html().trim();
		    var downloadUrl = getContextPath() + "/data/spl/" + loginName.toUpperCase() + "-" + claimTraceNo + "-QCF";
		    var extensionsArray = new Array("jpg", "png", "pdf");
		    $.each(extensionsArray, function(index, value) { 
		    	urlExists(downloadUrl + "." + value, function(status) {
			        if (status === 200) {
			        	window.open(downloadUrl + "." + value, '_blank');
			        	return false;
			        }
			    });
	    	});
	    	*/
			
			var loginName = $(".user-name").find("p:first").html().trim();
			var claimTraceNo = $("[name=primaryKey]").val().split(":")[0];
			$.getJSON(getContextPath() + "/jsp/ajax/insurance-claim-get-qcf-ajax.jsp", {loginName:loginName, claimTraceNo:claimTraceNo}).done(function(data) {
				if (data.qcfFileName) {
					var downloadUrl = getContextPath() + "/data/spl/" + data.qcfFileName;
					window.open(downloadUrl, '_blank');
				}
				else {
					swal({
						title: 'Sorry!', 
						text: 'Quit Claim Form not found. Please contact RuralNet Customer Service.', 
						type: 'error', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
				}
			});
		});
	}
	
	var dtProgramNames = [
		"INC_ChangeClaimStatus", "INC_ClaimSearch"
	];
	if ($.inArray(programName, dtProgramNames) !== -1) {
		isTableLoaded('.content-viewentry table', 100);
	}
	
	/*------------------------------------------------------*
	 * AUTO-CALCULATION OF AMOUNT(S) ON BLUR/CHANGE SCRIPTS *
	 *------------------------------------------------------*/
	
	/*----------------------*
	 * BRANCHES (MARKETING) *
	 *----------------------*/
	
	if (programName == 'MKT_SetupBranches') {
		$("[name=cardsOrdered]").blur(function() {
			var cardsOrdered = parseFloat(dsxcommon.removeAllCommas($(this).val()));			
			var cardCost = parseFloat(dsxcommon.removeAllCommas($("[name=cardCost]").val()));
			$("input[name=cardAmount]").val(dsxcommon.addCommasDouble((cardsOrdered * cardCost).toFixed(2)));
		});
	}
	
	/*--------------------*
	 * CREDIT INFO (CIBI) *
	 *--------------------*/
	
	if (programName == 'CIB_Blef' || programName == 'CIB_NegRec') {
		var serviceCharge = parseFloat(0);
		if (programName == 'CIB_Blef') { serviceCharge = parseFloat(40); }
		else { serviceCharge = parseFloat(15); }
		
		if (programName == 'CIB_Blef') {
			$("button.is-green").click(function(e) {
				if ($(this).val().indexOf("Download") < 0) {
					e.preventDefault();
					swal({
						title: 'Regardless of inquiry result(s), you will be deducted P ' + serviceCharge.toFixed(2) + ' from your account.',
						text: 'Would you like to proceed with this transaction?',
						type: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Yes',
						cancelButtonText: 'No', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						$("button.is-green").unbind('click').click();
					}, function(dismiss) {
						if (dismiss == 'cancel') {
							$("button.is-green").html("View");
							$("button.is-green").text("View");
						}
					});
				}
			});
		}
		
		$(".content-viewentry .table-overflow a").click(function(e) {
			e.preventDefault();
			var aVal = $(this).text();
			if (aVal.indexOf("null") >= 0 || aVal.toUpperCase().indexOf("NO RECORD") >= 0) {
				swal({
					title: 'Since no record has been found, nothing will be deducted from your account with this transaction.',
					text: 'Click [OK] to proceed to generation and printing of the PDF copy of this transaction.',
					type: 'warning',
					confirmButtonText: 'OK',
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then((result) => { if (result) { window.location = this.href; } });
			}
			else {
				swal({
					title: 'You will be deducted P ' + serviceCharge.toFixed(2) + ' from your account with this transaction.',
					text: 'Would you like to proceed?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then((result) => { if (result) { window.location = this.href; } });
			}
		});
	}
	
	if (programName == 'CIB_KYC') {
		var serviceCharge = parseFloat(40);
		$("button.is-green").click(function(e) {
			e.preventDefault();
			swal({
				title: 'If any details/information is found, you will be deducted P ' + serviceCharge.toFixed(2) + ' from your account.',
				text: 'Would you like to proceed with this transaction?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonText: 'No', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			}).then(function() {
				$("button.is-green").unbind('click').click();
			}, function(dismiss) {
				if (dismiss == 'cancel') {
					$("button.is-green").html("View");
					$("button.is-green").text("View");
				}
			});
		});
	}
	
	/*----------*
	 * BIYAHEKO *
	 *----------*/
	
	if (programName == 'BKO_BookFlights' || programName == 'BKO_BookFlightsSC') {
		var pageNo = $("[name=pageNo]").val();
		
		$("input[name=noOfAdults]").focus(function() {
			var bookingType = $('[name=bookingType]').val();
			var departDate = $('[name=departureDate]').val();
			var retDate = $('[name=returnDate]').val();
			if (bookingType == 'R') {
			      if (Date.parse(retDate) < Date.parse(departDate)) {
			    	  $(this).blur();
			    	  swal({
							title: 'Return Date must be on/after the departure date!',
							text: '',
							type: 'error',
							confirmButtonText: 'OK', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
			    	  return;
			      }
			}
		});
		
		if (pageNo == 2) {
			$('button[value="Continue"]').attr("disabled", "disabled");
			$('button[value="Continue"]').prop("disabled", true);
			$('button[value="Continue"]').addClass("disabledbtn");
		}
		
		$('.cm-checkbox').change(function() {
			var name = $(this).attr('name');
			var bookType = $("input:hidden[name=bookingType\\.hidden]").val();
			
		    if($('input:checkbox[name= '+ name +']').filter(':checked').length == 1) {
		    	$('input:checkbox[name= '+ name +']').not(':checked').prop('disabled', true);
		        $('input:checkbox[name= '+ name +']').not(':checked').closest("tr").addClass('is-disabled');
		        
		        if (name == 'depFlight') {
		        	$('input:checkbox[name=conFlight]').prop('disabled', true);
		        	$('input:checkbox[name=conFlight]').closest("tr").addClass('is-disabled');
		        }
		        else if (name == 'conFlight') {
		        	$('input:checkbox[name=depFlight]').prop('disabled', true);
		        	$('input:checkbox[name=depFlight]').closest("tr").addClass('is-disabled');
		        }
		        else if (name == 'retFlight') {
		        	$('input:checkbox[name=conRetFlight]').prop('disabled', true);
		        	$('input:checkbox[name=conRetFlight]').closest("tr").addClass('is-disabled');
		        }
		        else if (name == 'conRetFlight') {
		        	$('input:checkbox[name=retFlight]').prop('disabled', true);
		        	$('input:checkbox[name=retFlight]').closest("tr").addClass('is-disabled');
		        }
		    }
		    else {
		    	$('input:checkbox[name= '+ name +']').removeAttr('disabled');
		    	$('input:checkbox[name= '+ name +']').closest("tr").removeClass('is-disabled');
		    	
		    	if (name == 'depFlight') {
		        	$('input:checkbox[name=conFlight]').removeAttr('disabled');
		        	$('input:checkbox[name=conFlight]').closest("tr").removeClass('is-disabled');
		        }
		        else if (name == 'conFlight') {
		        	$('input:checkbox[name=depFlight]').removeAttr('disabled');
		        	$('input:checkbox[name=depFlight]').closest("tr").removeClass('is-disabled');
		        }
		        else if (name == 'retFlight') {
		        	$('input:checkbox[name=conRetFlight]').removeAttr('disabled');
		        	$('input:checkbox[name=conRetFlight]').closest("tr").removeClass('is-disabled');
		        }
		        else if (name == 'conRetFlight') {
		        	$('input:checkbox[name=retFlight]').removeAttr('disabled');
		        	$('input:checkbox[name=retFlight]').closest("tr").removeClass('is-disabled');
		        }
		    }
		    
		    $('.connected-line').each(function() {
				if ($(this).parent('tr').prev().hasClass('is-disabled')) {
					$(this).parent('tr').addClass('is-disabled');
				}
				else {
					$(this).parent('tr').removeClass('is-disabled');
				}
			});
		    
		    $("button").each(function() {
				if (bookType == 'O') {
					if($('input:checkbox[name=depFlight]').filter(':checked').length == 1 || $('input:checkbox[name=conFlight]').filter(':checked').length == 1) {
						$('button[value="Continue"]').removeAttr('disabled');
						$('button[value="Continue"]').prop('disabled', false);
						$('button[value="Continue"]').removeClass('disabledbtn');
					}
					else {
						$('button[value="Continue"]').attr("disabled", "disabled");
						$('button[value="Continue"]').prop("disabled", true);
						$('button[value="Continue"]').addClass("disabledbtn");
					}
				}
				else {
					if(($('input:checkbox[name=depFlight]').filter(':checked').length == 1 || $('input:checkbox[name=conFlight]').filter(':checked').length == 1) &&
							($('input:checkbox[name=retFlight]').filter(':checked').length == 1 || $('input:checkbox[name=conRetFlight]').filter(':checked').length == 1)) {
						$('button[value="Continue"]').removeAttr('disabled');
						$('button[value="Continue"]').prop('disabled', false);
						$('button[value="Continue"]').removeClass('disabledbtn');
					}
					else {
						$('button[value="Continue"]').attr("disabled", "disabled");
						$('button[value="Continue"]').prop("disabled", true);
						$('button[value="Continue"]').addClass("disabledbtn");
					}
				}
			});
		});
		
		if (pageNo == 3) {
			$('.calc-table').each(function() {
				$(this).find('td').each(function() {
					var val = $(this).text();
					$(this).attr('data-amount', val);
				});
			});
			
			$('.select-search').change(function() {
				var name = $(this).attr('name');
				var name2 = name.replace(/\d+/g, '');
				var value;
				var grandTotal = 0;
				var bookType = $("input:hidden[name=bookingType\\.hidden]").val();
				if (name2 == 'meals' || name2 == 'baggage' || name2 == 'rmeals' || name2 == 'rbaggage') {
					value = $(this).val().split(':');
					var addOns = parseFloat(dsxcommon.removeAllCommas(value[1]));
					var closestAddOns = 0;
					var closestSelect;
					if (name2 == 'meals') {
						closestSelect = $(this).parent().parent().next('div').find('.select-search').val();
					}
					else if (name2 == 'rmeals') {
						closestSelect = $(this).parent().parent().prev('div').find('.select-search').val();
					}
					else if (name2 == 'baggage') {
						closestSelect = $(this).parent().parent().next('div').find('.select-search').val();
					}
					else if (name2 == 'rbaggage') {
						closestSelect = $(this).parent().parent().prev('div').find('.select-search').val();
					}
					
					if (bookType == 'R') {
						value = closestSelect.split(':');
						closestAddOns = parseFloat(dsxcommon.removeAllCommas(value[1]));
					}
					
					var elementId;
					if (name2 == 'meals' || name2 == 'rmeals') {
						elementId = $(this).closest('div').parent().parent().prev('div').text().replace(' ', '').toLowerCase() + "meals";
					}
					else if (name2 == 'baggage' || name2 == 'rbaggage') {
						elementId = $(this).closest('div').parent().parent().prev('div').text().replace(' ', '').toLowerCase() + "baggage";
					}
					document.getElementById(elementId).innerHTML = "P " + dsxcommon.addCommasDouble((addOns + closestAddOns).toFixed(2));
					
					//TOTAL
					var total = 0;
					elementId = $(this).closest('div').parent().parent().prev('div').text().replace(' ', '').toLowerCase();
					$('.calc-table').each(function() {
						$(this).find('td').each(function() {
							var val = $(this).text();
							var id = $(this).attr('id');
							val = val.replace('P ','');
							if (id != (elementId + "total")) {
								if (id.indexOf(elementId) != -1) {
									total = total + parseFloat(dsxcommon.removeAllCommas(val));
								}
							}
						});
					});
					document.getElementById(elementId + "total").innerHTML = "P " + dsxcommon.addCommasDouble(total.toFixed(2));
					
					//GRAND TOTAL
					$('.calc-table').each(function() {
						$(this).find('td').each(function() {
							var val = $(this).text();
							var id = $(this).attr('id');
							val = val.replace('P ','');
							if (id.indexOf("total") != -1) {
								grandTotal = grandTotal + parseFloat(dsxcommon.removeAllCommas(val));
							}
						});
					});
					
					document.getElementsByClassName('grand-total')[0].innerHTML = "P " + dsxcommon.addCommasDouble(grandTotal.toFixed(2));
					$("input:hidden[name=trnAmt\\.hidden]").val(dsxcommon.addCommasDouble(grandTotal.toFixed(2)));
				}
			});
			
			var total = document.getElementsByClassName('grand-total')[0].innerHTML;
			total = total.replace('P ','');
			var trnAmt = parseFloat(dsxcommon.removeAllCommas(total));
			$("input:hidden[name=trnAmt\\.hidden]").val(dsxcommon.addCommasDouble(trnAmt.toFixed(2)));
			
			$('.flatpickr').each(function(e) {
				var e_name = $(this).attr("name");
				var passType = $(this).closest('div').parent().parent().prev('div').text().replace(' ', '').toLowerCase();
				passType = passType.substring(0, passType.length - 1);
				
				var bd = flatpickr("[name=" + e_name + "]", { dateFormat: "m/d/Y" });
				bd.config.onClose = function(dateobj, datestr) {
					var currentDate = new Date();
				    var selectedDate = new Date(datestr);
				    var age = currentDate.getFullYear() - selectedDate.getFullYear();
				    var m = currentDate.getMonth() - selectedDate.getMonth();

				    if (m < 0 || (m === 0 && currentDate.getDate() < selectedDate.getDate())) {
				        age--;
				    }
				
				    if (programName == 'BKO_BookFlights') {
					    if (passType == 'adult') {
					    	if (age < 12) {
					    		swal({
									title: 'Adult(s) must be twelve (12) years old and above!',
									text: '',
									type: 'error',
									confirmButtonText: 'OK', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								}).then(function() {
									$('[name="' + e_name + '"]').val("");
								});
					    	}
					    }
					    else if (passType == 'child') {
					    	if (age < 2 || age > 11) {
					    		swal({
									title: 'Children must be two (2) to eleven (11) years old!',
									text: '',
									type: 'error',
									confirmButtonText: 'OK', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								}).then(function() {
									$('[name="' + e_name + '"]').val("");
								});
					    	}
					    }
					    else if (passType == 'infant') {
					    	if (age > 1) {
					    		swal({
									title: 'Infant(s) must be below two (2) years old!',
									text: '',
									type: 'error',
									confirmButtonText: 'OK', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								}).then(function() {
									$('[name="' + e_name + '"]').val("");
								});
					    	}
					    	else if (age < 0) {
					    		swal({
									title: 'Invalid Date of Birth!',
									text: '',
									type: 'error',
									confirmButtonText: 'OK', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								}).then(function() {
									$('[name="' + e_name + '"]').val("");
								});
					    	}
					    }
				    }
				    else if (programName == 'BKO_BookFlightsSC') {
				    	if (age < 60) {
				    		swal({
								title: 'Senior citizen(s) must be sixty (60) years old and above!',
								text: '',
								type: 'error',
								confirmButtonText: 'OK', 
								allowOutsideClick: false, 
								allowEscapeKey: false
							}).then(function() {
								$('[name="' + e_name + '"]').val("");
							});
				    	}
				    }
				};
				
			});
			
		}
		
		$('[name=cashAmt]').change(function() {
			var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=totAmt]').val()));
			var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if (cashAmt < totAmt) {
				swal({
					title: 'Cash received must be greater than or equal to the total amount!',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					$('[name=cashAmt]').select();
					$('[name=cashAmt]').focus();
				});
				return;
			}
			var totDue = parseFloat(dsxcommon.removeAllCommas($('[name=totAmt]').val()));					
			$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - totDue).toFixed(2)));
		});
		
		$('button[value="Generate Itinerary Receipt"]').attr('disabled');
		$('button[value="Generate Itinerary Receipt"]').prop('disabled', true);
		$('button[value="Generate Itinerary Receipt"]').addClass('disabledbtn');
		
		$('button[value="Download & Print Collection Slip"]').click(function() {
			$('button[value="Generate Itinerary Receipt"]').removeAttr('disabled');
			$('button[value="Generate Itinerary Receipt"]').prop('disabled', false);
			$('button[value="Generate Itinerary Receipt"]').removeClass('disabledbtn');
		});
		
		$('button[value="Generate Itinerary Receipt"]').click(function() {
			var traceNo = $('[name=specialParam1]').val();
			$('[name=primaryKey]').val(traceNo);
			if (programName == 'BKO_BookFlightsSC') {
				$('[name=programName]').val('BKO_PrintItinerarySC');
			}
			else {
				$('[name=programName]').val('BKO_PrintItinerary');
			}
		});
		
		$("*input[name*=Name]").keyup(function(e) {
			var len = ($(this).val().length) - 1;
			var subVal = $(this).val().replace(/[^a-zA-Z ]/g, "");
			if ((e.keyCode >= 65 && e.keyCode <= 90 ) || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 9 || 
				 e.keyCode == 16 || e.keyCode == 20) {}
			else {
				swal({
					title: 'Special characters/numbers are not allowed!',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					$(this).focus();
				});
				$(this).val(subVal);
			}
		});
		
		$("[name=contactNo]").blur(function() {
			var val = $(this).val();
			var len = val.length;
			
			if (val.substring(0, 2) == '09') {
				if (len != 11) {
					$("[name=contactNo]").val("");
					swal({
						title: 'Invalid contact number length!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						$("[name=contactNo]").focus();
					});
				}
			}
			else if (val.substring(0, 4) == '+639') {
				if (len != 13) {
					$("[name=contactNo]").val("");
					swal({
						title: 'Invalid contact number length!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						$("[name=contactNo]").focus();
					});
				}
			}
			else {
				$("[name=contactNo]").val("");
				swal({
					title: 'Invalid contact number! Mobile No. must start with (e. g. +639, 09).',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					$("[name=contactNo]").focus();
				});
			}
		});
	}
	
	/*--------------*
	 * NOTIFICATION *
	 *--------------*/
	
	if (programName == 'MSG_SetupViewNotification') {
		$('.table').each(function() {
			$(this).find('td').each(function() {
				if ($(this).text().indexOf("icon") >= 0) {
					var val = $(this).text().split('-')[1];
					$(this).replaceWith("<div style='font-size:14px; text-align:center; padding-top:8px; border-top: 1px solid #dbdbdb; margin-top: -1px'>" +
						"<i class='fa fa-" + val + "'></i></div>");
				}
				
				if ($(this).text() == 'PENDING' || $(this).text() == 'UNREAD') {
					$(this).prev().find('a').css('color', 'red');
					$(this).next().css('color', 'red');
					$(this).css('color', 'red');
					
					$(this).prev().find('a').css('font-weight', 'bold');
					$(this).next().css('font-weight', 'bold');
					$(this).css('font-weight', 'bold');
				}
			});
		});
		
		$('button[value="Proceed to Approval"]').click(function() {
			var traceNo = $('[name=specialParam1]').val();
			$('[name=programName]').val('SET_SetupFunding');
			$('[name=calledFrom]').val('MSG_SetupViewNotification');
			$('[name=viewFlag]').val('Y');
			$('[name=primaryKey]').val(traceNo);
		});
	}
	
	/*-----------------------*
	 * BILLS PAYMENT MODULES *
	 *-----------------------*/
	
	if (programName == 'BIL_EnterBillsPayment' || programName == 'BIL_EnterTopUp' || programName == 'BIL_EnterUnfundedBillsPayment' || 
		programName == 'BIL_EnterBillsPaymentBackOffice' || programName == 'BIL_GCashLoadToMother' || programName == 'NBI_EnterRequest') {
		
		if (programName == 'BIL_EnterBillsPayment') {
			if ($('[name=field4]').val() == '3' && $('[name=field10]').val() == "") {
				$('[name=field10]').change(function() {
					 var months;
					 var s1 = $('[name=field8]').val();
					 var s2 = $('[name=field9]').val();
					 var contriAmt = $('[name=field10]').val();
					 var d1 = new Date(s1.substring(6, 2), s1.substring(2, 0), 1);
					 var d2 = new Date(s2.substring(6, 2), s2.substring(2, 0), 1);
					 	
				    months = (d2.getFullYear() - d1.getFullYear()) * 12;
				    months += d2.getMonth() - d1.getMonth() + 1;
				    
				    var totalPayment = (contriAmt * months);
				    
				    $('[name=trnAmt]').val(dsxcommon.addCommasDouble((totalPayment).toFixed(2)));
					var trnFee = parseFloat(dsxcommon.removeAllCommas($('[name=trnFee]').val()));	
					$.LoadingOverlay("show");
					$('[name=totAmt]').val(dsxcommon.addCommasDouble((totalPayment + trnFee).toFixed(2)));
					$.LoadingOverlay("hide");
				});
			}
		}
		
		$('[name=cashAmt]').change(function() {
			var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));			
			var totAmt = parseFloat(dsxcommon.removeAllCommas($('[name=totAmt]').val()));					
			$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - totAmt).toFixed(2).toString()));
			
			var begBal = parseFloat(dsxcommon.removeAllCommas($('[name=begBal]').val()));
			$('[name=endBal]').val(dsxcommon.addCommasDouble((begBal - totAmt).toFixed(2).toString()));
		});
		
		$('[name=trnAmt]').change(function() {
			var trnAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			var trnFee = parseFloat(dsxcommon.removeAllCommas($('[name=trnFee]').val()));	
			$.LoadingOverlay("show");
			$('[name=totAmt]').val(dsxcommon.addCommasDouble((trnAmt + trnFee).toFixed(2).toString()));
			$.LoadingOverlay("hide");
		});
	}
	
	if (programName == 'BIL_GCashLoadToOne') {
		$('[name=cashAmt]').change(function() {
			var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));			
			var totAmt = parseFloat(dsxcommon.removeAllCommas($('[name=totAmt]').val()));					
			$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - totAmt).toFixed(2)));
			
			var begBal = parseFloat(dsxcommon.removeAllCommas($('[name=begBal]').val()));
			$('[name=endBal]').val(dsxcommon.addCommasDouble((begBal - totAmt).toFixed(2)));
		});
		
		$('[name=trnAmt]').change(function() {	
			var trnAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if ($('[name=loadType]').val() != 'SLF') {
				$.getJSON(getContextPath() + "/jsp/ajax/gcs-trnFee-ajax.jsp", {trnAmt:trnAmt}).done(function(data) {
					if (data.trnFee) {
						$('input[name=trnFee]').val(dsxcommon.addCommasDouble(parseFloat(data.trnFee.toString()).toFixed(2)));
						var trnFee = parseFloat(dsxcommon.removeAllCommas($('[name=trnFee]').val()));	
						$('[name=totAmt]').val(dsxcommon.addCommasDouble((trnAmt + trnFee).toFixed(2)));
					}
				})
			}
			else {
				var trnFee = parseFloat(dsxcommon.removeAllCommas($('[name=trnFee]').val()));	
				$('[name=totAmt]').val(dsxcommon.addCommasDouble((trnAmt + trnFee).toFixed(2)));
			}
		});
	}
	
	/*-------------------------------------------------*
	 * SETTLEMENT MODULES (ADJUSTMENTS, PAYOUTS, ETC.) *
	 *-------------------------------------------------*/
	
	if (programName == 'SET_SetupPayOut') {
		$('input[name=payoutAmt]').keyup(function () {					
			var payoutAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=payoutAmt]').val()));			
			var payoutFee = parseFloat(dsxcommon.removeAllCommas($('input[name=payoutFee]').val()));	
			var begBal = parseFloat(dsxcommon.removeAllCommas($('input[name=begBal]').val()));
			$('input[name=payoutTotal]').val(dsxcommon.addCommasDouble((payoutAmt + payoutFee).toFixed(2)));
			$('input[name=endBal]').val(dsxcommon.addCommasDouble((begBal - (payoutAmt + payoutFee)).toFixed(2)));
		});
	}
	
	if (programName == 'SET_SetupFunding') {
		$("[name=fundDate]").on("click", function() {
			if ($(this).val() == "") {
				$(this).val($.datepicker.formatDate('mm/dd/yy', new Date()));
			}
		});
	}
	
	if (programName == 'SET_SetupFundTransfer') {
		$("select[name=fundType]").on("change", function() {
			if ($(this).val() != "") {
				setTimeout(function() {
					$("input[name=sqnNo]").select();
					$("input[name=fundDate]").focus();
			    }, 0);
			}
		});
	}

	if (programName == 'SET_SetupAdjustments') {
		$("select[name=adjType]").on("change", function() {
			if ($(this).val() != "") {
				setTimeout(function() {
					$("input[name=sqnNo]").select();
					$("input[name=adjDate]").focus();
			    }, 0);
			}
		});
	}
	
	if (programName == 'SET_ConsolidateAndBill') {
		$("button[value=Execute]").click(function(e) {	
			var d = new Date();
			var hrs_24 = d.getHours();
			var startDate = $('input[name=begDate]').val();
			var endDate = $('input[name=endDate]').val();
			var input = startDate;
			var output = input.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3,$1,$2");
			var input1 = endDate;
			var output1 = input1.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3,$1,$2");
				
			var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
			var firstDate = new Date(output);
			var secondDate = new Date(output1);

			var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
			
			var diffMiss = 'You have selected more than one day for Consolidation. ';
			var diffTimeMiss = 'Consolidate And Billing is advise to be done after 5PM or End Of Day. ';
			if(diffDays > 1 || hrs_24 <= 17) { // 5PM  below true
				e.preventDefault();
				swal({
					title: (diffDays > 1 ? diffMiss : '') + (hrs_24 <= 17 ? diffTimeMiss : '') + 'Are you sure to Continue?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No', 
					allowOutsideClick: false, 
					allowEscapeKey: false
			}).then((result) => {
					if (result) {
						$(this).unbind('click').click();
					}
				}, function(dismiss) {
					$("[name=specialParam1]").val(dismiss);
					e.preventDefault();
					return false;
				});
			}
		}
		);
	}
	
	/*----------------------------------*
	 * CHANGE BUSINESS STATUS (DETAILS) *
	 *----------------------------------*/
	
	if (programName == 'SET_ChangeStatusDetails') {
		//Enable Activation Date and Policy Number Fields 
		$('[name=businessStatus]').change(function() {
			var mortgageType = $("[name='businessStatus']").val();
			if (mortgageType == "ACT") {
				$('[name=actDate]').attr("disabled", false);
				$('[name=policyNumber]').attr("disabled", false);
			}
		});
	}
	
	/*------------------------------------------*
	 * OPTION BUTTONS SCRIPTS FOR ACCOUNT TYPES *
	 *------------------------------------------*/
	
	$("#comboSearch").on("click focus", function(e) {
		//remove "active" class from clicked option-button
		$(".options-account").removeClass("active");
		$("input[name=acctType]").val("");
	});
	
	$("#comboSearch").bind("keypress keydown keyup", function(event) {
	    if (event.keyCode == '13') {
			event.preventDefault();
			return false;
	    }
	    else {
	    	var charStr = String.fromCharCode(event.keyCode);
	    	if (/[0-9]/.test(charStr)) {
	    		$(this).val("");
	    		event.preventDefault();
	    		return false;
	    	}

	    	//check program name
	    	var ajaxJsp = "";
	    	if (programName == 'PRC_EnterRequest') { ajaxJsp = "prc-clients-ajax.jsp"; }
	    	else if (programName == 'LRA_EnterRequest') { ajaxJsp = "lra-clients-ajax.jsp"; }
	    	
	    	var options = "";
	    	var searchString = $(this).val();
			if (searchString.length > 0) {
				$.getJSON(getContextPath() + "/jsp/ajax/" + ajaxJsp, {searchString:searchString}, function(data) {
					$.each(data.clientsList, function(key, value) {
						options += "<option value='" + key + "'>" + value + "</option>";
				 	})
				 	$("select[name=acctName]").html(options);
				})
			}
			else { $("select[name=acctName]").find("option").remove(); }
	    }
	});
	
	/*--------------------------------------*
	 * OPTION BUTTON FOR ACCOUNT TYPE "NEW" *
	 *--------------------------------------*/
	
	$(document).on("click", ".options-account", function(e) {
		var new_p = $(this).find("p").html().trim().toLowerCase();
		if (new_p.match("new")) {
			$("input[name=acctType]").val("new");
			$("button[value=Continue]").click();
		}
	});
	
	/*-----------------------------------------*
	 * DISABLE VALIDATION FOR THE FF. PROGRAMS *
	 *-----------------------------------------*/
	
	if (programName == 'UTL_ShowMultiPageEntry') {
		$("[value=Continue]").removeClass("validateform");
		$("[value=Go]").removeClass("validateform");
		$("[value=Verify]").removeClass("validateform");
	}
	
	/*----------------*
	 * ZIP CODE MODAL *
	 *----------------*/
	
	$("[name=zipCode]").on("click focus", function() {
		$("#zipcode-modal").modal();
	});
	
	$(".zcode").click(function() {
		$("[name=zipCode]").val($(this).text());
	});
	
	/*--------------------------*
	 * TERMS & CONDITIONS MODAL *
	 *--------------------------*/
	
	$(".modalbtn").click(function(e) {
		e.preventDefault();
		me = $(this);
		target = me.data("target");
		$("#" + target).addClass("is-active");
	});

    $(".modal-close, .modal-close-button").click(function(e) {
		e.preventDefault();
		me = $(this);
		target = me.data("target");
		$("#" + target).removeClass("is-active");
	});
	
	/*-------------*
	 * PRC SCRIPTS *
	 *-------------*/
	
	if (programName == 'PRC_EnterRequest') {
		//auto-calculation of change amount
		$("input[name=cashAmt]").blur(function() {
			var totalDue = parseFloat(dsxcommon.removeAllCommas($("input[name=totAmt]").val()));			
			var cashReceived = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if (cashReceived < totalDue) {
				swal({
					title: 'Oops!', 
					text: 'Cash Amount Received must not be lesser than the Total Amount Due!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
			}
			$("input[name=changeAmt]").val(dsxcommon.addCommasDouble((cashReceived - totalDue).toFixed(2)));
		});
		
		$("a.mfp-inline").on("click", function() {
			var lastName = $("[name=clientLastName]").val();
			var firstName = $("[name=clientFirstName]").val();
			var profession = $("[name=clientProfession]").val();
			
			//validate name fields
			if ((!lastName) || (!firstName) || (!profession)) {
				swal({
					title: '', 
					text: 'Please fill up the required fields!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$.magnificPopup.instance.close();
			}
			else {
				$(".header").text("");
				$(".header").append("Clients List");
				$(".header").append(closeBtn);
				fillKYCPopupResultTablePRC(lastName + ":" + firstName);
			}
		});
		
		$("button[value=Continue]").click(function(e) {
			var pageNo = $("[name=pageNo]").val();
			if (pageNo == 2) {
				e.preventDefault();
				swal({
					title: 'Please click the link below for verification.',
					type: 'info',
					html: '<b><a href="https://online.prc.gov.ph/verification" target="_blank">online.prc.gov.ph/verification</a></b>',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then((result) => {
					if (result) {
						$(this).unbind('click').click();
					}
				});
			}
		});
	}
	
	if (programName != "" && programName == 'PRC_PayTransaction') {
		$("input[name=cashAmt]").blur(function() {
			var totalDue = parseFloat(dsxcommon.removeAllCommas($("input[name=totAmt]").val()));			
			var cashReceived = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if (cashReceived < totalDue) {
				swal({
					title: 'Oops!', 
					text: 'Cash Amount Received must not be lesser than the Total Amount Due!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				e.preventDefault();
			}
			$("input[name=changeAmt]").val(dsxcommon.addCommasDouble((cashReceived - totalDue).toFixed(2)));
		});
	}
	
	/*-----------------------*
	 * PRC FEES + CALCULATOR *
	 *-----------------------*/
	
	var expDate = $("input[name=expiryDate]").val();
	if (expDate != undefined && expDate.length > 0) {
		var totAmt = parseFloat(dsxcommon.removeAllCommas($("input[name=totAmt]").val()));
		if (totAmt.length > 0) {
			//update calculator amount fields
			$("#prcFee").html(dsxcommon.addCommasDouble($("input[name=prcFee]").val()));
			$("#serviceCharge").html(dsxcommon.addCommasDouble($("input[name=serviceCharge]").val()));
			$("#totAmt").html(dsxcommon.addCommasDouble(totAmt));
			$(".grand-total").html(dsxcommon.addCommasDouble(totAmt));
		}
	}
	
	/*------------------------------*
	 * END OF PRC FEES + CALCULATOR *
	 *------------------------------*/
	
	/*-------------------*
	 * PRC IMAGE CROPPER * 
	 *-------------------*/
	
	clearImgCropperPreview();
	
	$("[class*=hidden]").hide();

	$("[name=uploadForm]").on("change", function() {
		if (isAnImageFile(this)) {
			readURL(this);
			changeIconAndLabel($(this));
		}
	});
	
	$("[name=uploadID]").on("change", function() {
		if (isAnImageFile(this)) {
			changeIconAndLabel($(this));
		}
	});
	
	$("[name=uploadDocs]").on("change", function() {
		if (isAnImageFile(this)) {
			changeIconAndLabel($(this));
		}
	});
	
	$("#getID").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgIDSrc = $("#img-id").attr('src');
		if (imgIDSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for ID!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		$("#cropper-preview").cropper('setData', getIDData());
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var idDataURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped ID?', idDataURL, 200, 200)).then(function() {
			$("#img-id").attr('src', idDataURL);
			changeIcon($("#getID"));
			swal({
				title: 'Success!', 
				text: 'ID was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#getVerification").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgVerificationSrc = $("#img-verification").attr('src');
		if (imgVerificationSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for Verification!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		$("#cropper-preview").cropper('setData', getVerificationData());
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var verDataURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped Verification?', verDataURL, 300, 150)).then(function() {
			$("#img-verification").attr('src', verDataURL);
			changeIcon($("#getVerification"));
			swal({
				title: 'Success!', 
				text: 'Verification was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#getSignature").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgSigSrc = $("#img-sig").attr('src');
		if (imgSigSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for Signature!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		$("#cropper-preview").cropper('setData', getSigData());
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var sigDataURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped Signature?', sigDataURL, 300, 100)).then(function() {
			$("#img-sig").attr('src', sigDataURL);
			changeIcon($("#getSignature"));
			swal({
				title: 'Success!', 
				text: 'Signature was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#getCustomID").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgIDSrc = $("#img-id").attr('src');
		if (imgIDSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for ID!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var idDataURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped ID?', idDataURL, 200, 200)).then(function() {
			$("#img-id").attr('src', idDataURL);
			changeIcon($("#getCustomID"));
			swal({
				title: 'Success!', 
				text: 'ID was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#getCustomVerification").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgVerificationSrc = $("#img-verification").attr('src');
		if (imgVerificationSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for Verification!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var idVerURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped Verification?', idVerURL, 300, 150)).then(function() {
			$("#img-verification").attr('src', idVerURL);
			changeIcon($("#getCustomVerification"));
			swal({
				title: 'Success!', 
				text: 'Verification was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#getCustomSig").on("click", function() {
		var uploadForm = $("input[name=uploadForm]").val();
		if (!uploadForm) {
			swal({
				title: 'Oops!', 
				text: 'No form uploaded yet!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var imgSigSrc = $("#img-sig").attr('src');
		if (imgSigSrc) {
			swal({
				title: 'Oops!', 
				text: 'You have already cropped an image for Signature!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		var newCanvas = $("#cropper-preview").cropper('getCroppedCanvas');
		var sigDataURL = newCanvas.toDataURL('image/jpeg');
		swal(setSWALProp('Confirm Cropped Signature?', sigDataURL, 300, 100)).then(function() {
			$("#img-sig").attr('src', sigDataURL);
			changeIcon($("#getCustomSig"));
			swal({
				title: 'Success!', 
				text: 'Signature was cropped!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#saveImagesToServer").on("click", function() {
		var traceNo = $("[name=specialParam1]").val();
		var srcID = $('#img-id').attr('src');
		var srcSig = $('#img-sig').attr('src');
		var srcVerification = $('#img-verification').attr('src');
		
		if (!srcID) {
			swal({
				title: 'Oops!', 
				text: 'No cropped image found for the ID!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		if (!srcSig) {
			swal({
				title: 'Oops!', 
				text: 'No cropped image found for the Signature!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		if (!srcVerification) {
			swal({
				title: 'Oops!', 
				text: 'No cropped image found for the Verification!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		
		swal({
			title: 'Proceed in saving cropped ID, Signature and Verification?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No', 
			allowOutsideClick: false, 
			allowEscapeKey: false
		}).then(function() {
			//save id
			$.ajax({
				type: "POST",
				url: getContextPath() + "/jsp/ajax/data-url-to-file-ajax.jsp",
				data: { imgDataSrc: srcID, fileName: traceNo + "_PROF" },
				cache: false,
				contentType: "application/x-www-form-urlencoded",
				success: function (result) {}
			});
			//save signature
			$.ajax({
				type: "POST",
				url: getContextPath() + "/jsp/ajax/data-url-to-file-ajax.jsp",
				data: { imgDataSrc: srcSig, fileName: traceNo + "_SIG" },
				cache: false,
				contentType: "application/x-www-form-urlencoded",
				success: function (result) {}
			});
			//save verification
			$.ajax({
				type: "POST",
				url: getContextPath() + "/jsp/ajax/data-url-to-file-ajax.jsp",
				data: { imgDataSrc: srcVerification, fileName: traceNo + "_VER" },
				cache: false,
				contentType: "application/x-www-form-urlencoded",
				success: function (result) {}
			});
			swal({
				title: 'Success!', 
				text: 'ID, Signature and Verification were saved!', 
				type: 'success', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
		});
	});
	
	$("#resetCropper").on("click", function() {
		clearImgCropperPreview();
		$("input[name=uploadForm]").val("");
		$('#img-id').attr('src', '');
		$('#img-sig').attr('src', '');
		$('#img-verification').attr('src', '');
		resetIcon($("#getID"));
		resetIcon($("#getCustomID"));
		resetIcon($("#getSignature"));
		resetIcon($("#getCustomSig"));
		resetIcon($("#getVerification"));
		resetIcon($("#getCustomVerification"));
		resetIconAndLabel("uploadForm");
		resetIconAndLabel("uploadID");
		resetIconAndLabel("uploadDocs");
	});
	
	/*--------------------------*
	 * END OF PRC IMAGE CROPPER *
	 *--------------------------*/
	
	/*-------------------*
	 * LRA REQUEST ENTRY *
	 *-------------------*/
	
	var pageNo = $("[name=pageNo]").val();
	if (programName == 'LRA_EnterRequest' && pageNo == '3') {
		$(".add-clone").click();
	}
	
	/*------------*
	 * KYC MODULE *
	 *------------*/
	
	if (programName == 'KYC_EnterClients') {
		$("[name=provinceCode], [name=cityCode]").on("change", function() {
			var value = $(this).val();
			if (value) { $("[value=Go]").click(); }
		});
		
		$("a.mfp-inline").on("click", function() {
			var lastName = $("[name=lastName]").val();
			var firstName = $("[name=firstName]").val();
			
			//validate name fields
			if ((!lastName) || (!firstName)) {
				swal({
					title: '', 
					text: 'Please fill up the required fields!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$.magnificPopup.instance.close();
			}
			else {
				var moduleCode = "kyc";
				fillKYCPopupResultTable(moduleCode, lastName + ":" + firstName);
			}
		});
	}
	
	/*---------------------*
	 * REMITTANCES MODULES *
	 *---------------------*/
	
	if (programName == 'RMT_SendRemittance') {
		$("[value=Go]").removeClass("validateform");
		
		$("[name=fromProvinceCode], [name=provinceCode], [name=toProvinceCode]").on("change", function() {
			var value = $(this).val();
			if (value) { $("[value=Go]").click(); }
		});
		
		var moduleCode = "rmt";
		var lastName = "";
		var firstName = "";
		var remitAgency = "";
		var gender = "";
		var birthDate = "";
		var isValid = true;
		var kycFlag = false;
		var pageNo = 0;
		var primaryKey = "";
		var closeBtn = "<span class=\"icon is-large is-pulled-right closebtn\">" +
						  "<i class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i>" +
					   "</span>";
		
		primaryKey = $("[name=primaryKey]").val();
		pageNo = $("[name=pageNo]").val();
		
		if (pageNo == 3) {
			$("a.mfp-inline").magnificPopup('close');
			lastName = $("[name=benLastName]").val();
			firstName = $("[name=benFirstName]").val();
			if ((!primaryKey) && (!lastName) && (!firstName)) {
				clientName = lastName + ":" + firstName;
				$(".header").text("");
				$(".header").append("Previous Beneficiaries of Sender");
				$(".header").append(closeBtn);
				fillKYCPopupResultTable(moduleCode, kycFlag, clientName);
				$("a.mfp-inline").magnificPopup('open');
			}
		}
		
		$("a.mfp-inline").on("click", function() {
			remitAgency = $("[name=clientRemitAgency]").val();
			if (pageNo == 1) {
				lastName = $("[name=clientLastName]").val();
				firstName = $("[name=clientFirstName]").val();
				kycFlag = true;
				if ((!lastName) || (!firstName) || (!remitAgency)) {
					swal({
						title: '', 
						text: 'Please fill up the required fields!', 
						type: 'error', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					$.magnificPopup.instance.close();
				}
				else {
					var clientName = lastName + ":" + firstName + ":" + remitAgency;
					checkPEP(clientName, moduleCode, kycFlag, pageNo);
				}
			}
			else {
				lastName = $("[name=benLastName]").val();
				firstName = $("[name=benFirstName]").val(); 
				clientName = lastName + ":" + firstName;
				if ((!lastName) || (!firstName)) {
					swal({
						title: '', 
						text: 'Please fill up the required fields!', 
						type: 'error', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					$.magnificPopup.instance.close();
				}
				else {
					checkPEP(clientName, moduleCode, kycFlag, pageNo);
				}
			}
		});
		
		$("[value=Verify]").on("click", function(e) {
			var primaryKey = $("[name=primaryKey]").val();
			if (primaryKey == 'new') { /* do nothing */ }
			else {
				$.getJSON(getContextPath() + "/jsp/ajax/rmt-client-ajax.jsp", {primaryKey:primaryKey}, function(data) {
					if (data.isOutdated) {
						e.preventDefault();
						swal({
							title: 'Client\'s last transaction was more than six (6) months ago.',
							text: 'Click OK to continue and update information!',
							type: 'warning',
							showCancelButton: true,
							confirmButtonText: 'OK',
							cancelButtonText: 'Cancel', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						}).then(function() {
							$("[value=Verify]").unbind('click').click();
						});
					}
				})
			}
		});
		
		function getRemitServiceFee(remitAmt) {
			if (remitAmt > 50000) {
				swal({
					title: '', 
					text: 'Remittance amount must be between PHP 1.00 to PHP 50,000.00 only!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$('[name=remitAmt]').select();
				$('[name=remitAmt]').focus();
				return;
			}
			else {
				var remitAgency = $("input:hidden[name=clientRemitAgency\\.hidden]").val();
				var loginName = $(".user-name").find("p:first").html().trim();
				var agentCode = $(".user-name").find("p:last").html().trim().replace(/\s/g, '');
				var newEntry = $("[name=newEntry]").val();
				var trnDate = getSystemDate();
				$.LoadingOverlay("show");
				$.getJSON(getContextPath() + "/jsp/ajax/rmt-servicefee-ajax.jsp", 
					{remitAgency:remitAgency, principalAmt:remitAmt, loginName:loginName, trnDate:trnDate, newEntry:newEntry, agentCode:agentCode})
				.done(function(data) {
					if (parseFloat(data.sendServiceFee) >= 0) {
						if (newEntry == 'true') {
							if (parseFloat(data.sendServiceFee) == 0) {
								$.LoadingOverlay("hide");
								$("input[value='Remittance Fee']").attr('name', 'valRule.key');
								swal({
									title: 'CONGRATULATIONS!', 
									text: 'This transaction is FREE of Remittance fee!', 
									type: 'info', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								});
							}
						}
						var promoFlag = data.promoFlag;
						var remitFee2 = data.serviceFee;
						var remitFee = data.sendServiceFee;
						$("input:hidden[name=promoFlag\\.hidden]").val(promoFlag);
						$("input:hidden[name=remitFee2\\.hidden]").val(dsxcommon.addCommasDouble(parseFloat(remitFee2).toFixed(2)));
						$('input[name=remitFee]').val(dsxcommon.addCommasDouble(parseFloat(remitFee).toFixed(2)));
						if (promoFlag == 'N') {
							$('input[name=totAmt]').val(dsxcommon.addCommasDouble(parseFloat(data.totAmt).toFixed(2)));
							$('input[name=endBal]').val(dsxcommon.addCommasDouble(parseFloat(data.endBal).toFixed(2)));
						}
						else {
							var begBal = parseFloat(dsxcommon.removeAllCommas($('input[name=begBal]').val()));
							$('input[name=totAmt]').val(dsxcommon.addCommasDouble(remitAmt.toFixed(2)));
							$('input[name=endBal]').val(dsxcommon.addCommasDouble((begBal - remitAmt).toFixed(2)));
						}
						
						//for RuralNet/RD/Villarica RemitAgencies
						if (remitAgency == 'RNT' && remitFee == 0) {
							$("[value*=Pay]").removeClass("validateform");
						}
						
						$.LoadingOverlay("hide");
					}
				})
				.fail(function() {
					setTimeout(function() {
						swal({
							title: 'Connection Error', 
							text: 'There might be something wrong with the connection to the API or to the database. Please try again.', 
							type: 'error', 
							allowOutsideClick: false, 
							allowEscapeKey: false
						});
						$.LoadingOverlay("hide");
					}, 15000);
				})
			}
		}
		
		$('[name=remitAmt]').on("focus", function() {
			var remitAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			$(this).data('prev', remitAmt);
		});
		
		$('[name=remitAmt]').on("change blur", function() {
			var remitAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if (remitAmt == 0) {
				swal({
					title: '', 
					text: 'Please enter remittance amount!', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$('[name=remitAmt]').select();
				$('[name=remitAmt]').focus();
				return;
			}
			else {
				swal({
					title: 'Remittance Amount Confirmation',
					text: 'Would you like to proceed with P ' + dsxcommon.addCommasDouble(remitAmt.toFixed(2)) + 
						  ' as your FINAL remittance amount for this transaction?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					getRemitServiceFee(remitAmt);
					$('[name=cashAmt]').select();
					$('[name=cashAmt]').focus();
				}, function(dismiss) {
					if (dismiss == 'cancel') {
						var prevVal = dsxcommon.addCommasDouble($('[name=remitAmt]').data('prev').toFixed(2));
						$('[name=remitAmt]').val(prevVal);
						$('[name=remitAmt]').select();
						$('[name=remitAmt]').focus();
						return;
					}
				});
			}
		});
		
		$("[value*=Download]").hover(function() {
			$(this).removeClass("validateform");
		}, function() {
		    $(this).addClass("validateform");
		});
		
		$('[name=remitFee]').on("change blur", function() {
			var remitAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=remitAmt]').val()));
			var remitFee = parseFloat(dsxcommon.removeAllCommas($(this).val()));					
			$('input[name=totAmt]').val(dsxcommon.addCommasDouble((remitAmt + remitFee).toFixed(2)));
			var begBal = parseFloat(dsxcommon.removeAllCommas($('input[name=begBal]').val()));
			var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=totAmt]').val()));
			$('input[name=endBal]').val(dsxcommon.addCommasDouble((begBal - totAmt).toFixed(2)));
		});
		
		$('[name=cashAmt]').change(function() {
			var totAmt = parseFloat(dsxcommon.removeAllCommas($('input[name=totAmt]').val()));
			var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
			if (cashAmt < totAmt) {
				swal({
					title: 'Cash received must be greater than or equal to the total amount!',
					text: '',
					type: 'error',
					confirmButtonText: 'OK', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					$('[name=cashAmt]').select();
					$('[name=cashAmt]').focus();
				});
				return;
			}
			var totDue = parseFloat(dsxcommon.removeAllCommas($('[name=totAmt]').val()));					
			$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - totDue).toFixed(2)));
		});
	}
	
	if (programName == 'RMT_AmendRemittance') {
		var moduleCode = "rmt";
		var lastName = "";
		var firstName = "";
		var clientName = "";
		var kycFlag = false;
		var searchBtn = "";
		var closeBtn = "<span class=\"icon is-large is-pulled-right closebtn\">" +
					       "<i class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i>" +
					   "</span>";
		
		$("a.mfp-inline").on("click", function() {
			searchBtn = $(this).text().replace(/\s/g, '');
			lastName = $("[name=newBenLastName]").val();
			firstName = $("[name=newBenFirstName]").val();
			
			if (searchBtn == "AmendNewBeneficiary") {
				clientName = lastName + ":" + firstName;
				fillKYCPopupResultTable(moduleCode, kycFlag, clientName);
				$(".header").text("");
				$(".header").append("Previous Beneficiaries of Sender");
				$(".header").append(closeBtn);
			}
			else if (searchBtn == "CheckOFAC") {
				clientName = lastName + ":" + firstName;
				//validate name fields
				if ((!lastName) || (!firstName)) {
					swal({
						title: '', 
						text: 'Please fill up the required fields!', 
						type: 'error', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					});
					$.magnificPopup.instance.close();
				}
				else {
					checkPEP(clientName, moduleCode, kycFlag, pageNo);
				}
			}
		});
		
		$("[value=Verify]").on("click", function() {
			var primaryKey = $("[name=primaryKey]").val();
			if (primaryKey == 'new') { /* do nothing */ }
			else {
				$.getJSON(getContextPath() + "/jsp/ajax/rmt-client-ajax.jsp", {primaryKey:primaryKey}, function(data) {
					if (data.isOutdated) {
						$.getJSON(getContextPath() + "/jsp/ajax/rmt-client-ajax.jsp", {primaryKey:primaryKey}, function(data) {
							if (data.isOutdated) {
								e.preventDefault();
								swal({
									title: 'Client\'s last transaction was more than six (6) months ago.',
									text: 'Click OK to continue and update information!',
									type: 'warning',
									showCancelButton: true,
									confirmButtonText: 'OK',
									cancelButtonText: 'Cancel', 
									allowOutsideClick: false, 
									allowEscapeKey: false
								}).then(function() {
									$("[value=Verify]").unbind('click').click();
								});
							}
						})
					}
				})
			}
		});
		
		$('[name=cashAmt]').bind({
			focus: function() {
				$('[name=ammendFee]').attr("disabled", false);
				$('[name=ammendFee]').removeClass("inputboxdisabled");
				$('[name=ammendFee]').attr("readonly", true);
			},
			change: function() {
				var amendFee = parseFloat(dsxcommon.removeAllCommas($('[name=ammendFee]').val()));
				var cashAmt = parseFloat(dsxcommon.removeAllCommas($(this).val()));
				if (cashAmt < amendFee) {
					swal({
						title: 'Cash received must be greater than or equal to the amendment fee!',
						text: '',
						type: 'error',
						confirmButtonText: 'OK', 
						allowOutsideClick: false, 
						allowEscapeKey: false
					}).then(function() {
						$('[name=cashAmt]').select();
						$('[name=cashAmt]').focus();
					});
					return;
				}
				$('[name=changeAmt]').val(dsxcommon.addCommasDouble((cashAmt - amendFee).toFixed(2)));
			}
		});
	}
	
	if (programName == 'RMT_PayOutRemittance') {
		$("[value=Go]").removeClass("validateform");
		$("[name=provinceCode]").on("change", function() {
			var value = $(this).val();
			if (value) { $("[value=Go]").click(); }
		});
	}
	
	/*----------------------------*
	 * END OF REMITTANCES MODULES *
	 *----------------------------*/
	
	/*-----------*
	 * FUNCTIONS *
	 *-----------*/
	
	function getContextPath() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}
	
	function getPRCFees(expiryDate) {
		var loginName = $(".user-name").find("p:first").html().trim();
		var profession = $("input[name^='profession']").val().trim();
		if (expiryDate.trim().length > 0) {
			$.getJSON(getContextPath() + "/jsp/ajax/prc-fees-ajax.jsp", 
				{loginName:loginName, profession:profession, expiryDate:expiryDate.trim()}, function(data) {
				
				var prcFee = dsxcommon.removeAllCommas(data.prcFee);
				var serviceCharge = dsxcommon.removeAllCommas(data.spFee);
				var totalAmt = dsxcommon.removeAllCommas(data.totalAmt);
				
				$("input[name=prcFee]").val(dsxcommon.addCommasDouble(prcFee));
				$("input[name=serviceCharge]").val(dsxcommon.addCommasDouble(serviceCharge));
				$("input[name=totAmt]").val(dsxcommon.addCommasDouble(totalAmt));
				
				//update calculator amount fields
				$("#prcFee").html(dsxcommon.addCommasDouble(prcFee));
				$("#serviceCharge").html(dsxcommon.addCommasDouble(serviceCharge));
				$("#totAmt").html(dsxcommon.addCommasDouble(totalAmt));
				$(".grand-total").html(dsxcommon.addCommasDouble(totalAmt));
			})
		}
	}
	
	function clearImgCropperPreview() {
		$("#cropper-preview").cropper('destroy');
		$("#cropper-preview").attr('src', getContextPath() + "/jsp/design/images/form-preview-na.jpg");
	}
	
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function(e) {
	        	$("#cropper-preview").cropper('destroy');
	            $("#cropper-preview").attr('src', e.target.result);
	            $("#cropper-preview").cropper({
	            	movable: false, 
	            	zoomable: false, 
	            	rotatable: false, 
	            	scalable: false, 
	            	aspectRatio: NaN, 
	            	data: getIDData()
	            });
	        }
	        reader.readAsDataURL(input.files[0]);
	    }
	}
	
	function getIDData() {
		return { x: 1295, y: 170, width: 320, height: 309 }
	}
	
	function getSigData() {
		return { x: 680, y: 330, width: 567, height: 182 }
	}
	
	function getVerificationData() {
		return { x: 73, y: 285, width: 550, height: 230 }
	}
	
	function setSWALProp(parTitle, dataURL, width, height) {
		return {
			title: parTitle,
			type: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'OK',
			imageUrl: dataURL,
			imageWidth: width,
			imageHeight: height, 
			allowOutsideClick: false, 
			allowEscapeKey: false
		}
	}
	
	function changeIcon(element) {
		element.find("i").removeClass();
		element.find("i").addClass("fa fa-check");
		element.addClass("is-green");
	}
	
	function resetIcon(element) {
		element.find("i").removeClass();
		element.find("i").addClass("fa fa-crop");
		element.removeClass("is-green");
	}
	
	function changeIconAndLabel(inputFile) {
		var inputFileElemName = inputFile.attr("name");
		$("." + inputFileElemName + "-label").find("i").removeClass();
		$("." + inputFileElemName + "-label").find("i").addClass("fa fa-check");
		$("." + inputFileElemName + "-label").addClass("is-green-important");
		$("." + inputFileElemName + "-label-shown").hide();
		$("." + inputFileElemName + "-label-hidden").show();
		var inputFileName = getFileNames(inputFile);
		$("." + inputFileElemName + "-label-hidden").html(inputFileName);
	}
	
	function resetIconAndLabel(inputFileElemName) {
		$("." + inputFileElemName + "-label").find("i").removeClass();
		$("." + inputFileElemName + "-label").find("i").addClass("fa fa-upload");
		$("." + inputFileElemName + "-label").removeClass("is-green-important");
		$("." + inputFileElemName + "-label-shown").show();
		$("." + inputFileElemName + "-label-hidden").html("");
		$("." + inputFileElemName + "-label-hidden").hide();
	}
	
	function getFileNames(inputFileElem) {
		var items = inputFileElem[0].files;
		var noOfFiles = inputFileElem[0].files.length;
		var names = "";
		if (noOfFiles > 0) {
			for (var i = 0; i < noOfFiles; i++) {
				names += items[i].name + "<br/>"; 
			}
			return names;
		}
		else { return items[0].name; }
	}
	
	function isAnImageFile(input) {
		var file = input.files[0];
		var fileType = file["type"];
		var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
		if ($.inArray(fileType, validImageTypes) < 0) {
			swal({
				title: 'Invalid File', 
				text: 'The file selected is not Image file!', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			return false;
		}
		else { return true; }
	}
	
	function checkOFAC(clientName, moduleCode, kycFlag, pageNo) {
		$.getJSON(getContextPath() + "/jsp/ajax/ofac-ajax.jsp", {clientName:clientName}, function(data) {
			if (jQuery.isEmptyObject(data.blacklist)) {
				if (programName == 'RMT_SendRemittance') {
					if (pageNo == 1) {
						$(".header").text("");
						$(".header").append("Senders List");
						$(".header").append(closeBtn);
						fillKYCPopupResultTable(moduleCode, kycFlag, clientName);
						$("a.mfp-inline").magnificPopup('open');
					}
					else { $("[value=Verify]").click(); }
				}
				else if (programName == 'RMT_AmendRemittance') { $("[value=Verify]").click(); }
			}
			else {
				var results = '';
				$.each(data.blacklist, function(key, value) {
					results = results + (parseInt(key) + 1) + '.) ' + value + '\n';
			 	});
				swal({
					title: 'Does the client matches any of the ff. blacklisted persons/companies?',
					type: 'warning',
					customClass: 'ofac-container', 
					html: $('<div>').addClass('ofac-results').text(results),
					showCancelButton: true,
					confirmButtonText: 'No! Continue with the transaction.',
					cancelButtonText: 'Yes! Client is blacklisted.', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					if (programName == 'RMT_SendRemittance') {
						if (pageNo == 1) {
							$(".header").text("");
							$(".header").append("Senders List");
							$(".header").append(closeBtn);
							fillKYCPopupResultTable(moduleCode, kycFlag, clientName);
							$("a.mfp-inline").magnificPopup('open');
						}
						else { $("[value=Verify]").click(); }
					}
					else if (programName == 'RMT_AmendRemittance') { $("[value=Verify]").click(); }
				}, function(dismiss) {
					//dismiss can be 'cancel', 'overlay', 'close', and 'timer'
					if (dismiss === 'cancel') {
						//clearing all name fields
						if (programName == 'RMT_SendRemittance') {
							if (pageNo == 1) {
								$("[name=clientLastName]").val("");
								$("[name=clientFirstName]").val("");
								$("[name=clientMiddleName]").val("");
							}
							else {
								$("[name=benLastName]").val("");
								$("[name=benFirstName]").val("");
								$("[name=benMiddleName]").val("");
							}
						}
						else if (programName == 'RMT_AmendRemittance') {
							$("[name=newBenLastName]").val("");
							$("[name=newBenFirstName]").val("");
							$("[name=newBenMiddleName]").val("");
						}
					}
				});
			}
		});
	}
	
	function checkPEP(clientName, moduleCode, kycFlag, pageNo) {
		if (pageNo == 1) {
			$('[name=specialParam2]').val('N:');
		}
		else {
			$('[name=specialParam3]').val('N:');
		}
		
		$.getJSON(getContextPath() + "/jsp/ajax/pep-ajax.jsp", {clientName:clientName}).done(function(data) {
			if (jQuery.isEmptyObject(data.peplist)) {
				checkOFAC(clientName, moduleCode, kycFlag, pageNo);
			}
			else {
				var results = '';
				$.each(data.peplist, function(key, value) {
					results = results + value + '\n';
			 	});
				swal({
					title: 'Does the client matches any of the ff. listed as politically expose persons?',
					type: 'warning',
					customClass: 'ofac-container', 
					html: $('<div>').addClass('ofac-results').text(results),
					showCancelButton: true,
					confirmButtonText: 'No! Continue with the transaction.',
					cancelButtonText: 'Yes! Client is Politically Expose Person.', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				}).then(function() {
					checkOFAC(clientName, moduleCode, kycFlag, pageNo);
				}, function(dismiss) {
					if (pageNo == 1) {
						$('[name=specialParam2]').val('Y:');
					}
					else {
						$('[name=specialParam3]').val('Y:');
					}
					
					checkOFAC(clientName, moduleCode, kycFlag, pageNo);
				});
			}
		});
	}
	
	function fillKYCPopupResultTable(moduleCode, kycFlag, clientName) {
		//clear table
		var tableSearch = $('#table-search');
		tableSearch.html("");
		
		//append table headings
		var tableHeadings = 
			'<tr>' + 
				'<th>Full Name</th>' + 
				'<th>Gender</th>' + 
				'<th>Date of Birth</th>' + 
			'</tr>';
		tableSearch.append(tableHeadings);
		
		//append new option item to table
		var pageNo = $("[name=pageNo]").val();
		var newItemLabel = "";
		if (programName == 'RMT_SendRemittance') {
			if (pageNo == 1) { newItemLabel = "NEW SENDER"; }
			else { newItemLabel = "NEW BENEFICIARY"; }
		}
		else if (programName == 'RMT_AmendRemittance') { newItemLabel = "NEW BENEFICIARY"; }
		var newItem = 
			'<tr>' + 
				'<td><a onclick="setKey(\'new\')" href="#" class="popup-result-item">' + newItemLabel + '</a></td>' + 
				'<td>-</td>' + 
				'<td>--/--/----</td>' + 
			'</tr>';
		tableSearch.append(newItem);
		
		//append search results
		var remitAgency = "";
		if (!kycFlag) { 
			var clientID = $("[name=specialParam1]").val();
			
			//set remittance agency
			if (programName == 'RMT_SendRemittance') { remitAgency = $("input:hidden[name=clientRemitAgency\\.hidden]").val(); }
			else { remitAgency = $("input:hidden[name=remitAgency\\.hidden]").val(); }
			
			//set client last and first name
			if (remitAgency == 'CL') {
				if (programName == 'RMT_SendRemittance') { clientName = clientID + ":" + $("input:hidden[name=clientRemitAgency\\.hidden]").val(); }
				else { clientName = clientID + ":" + $("input:hidden[name=remitAgency\\.hidden]").val(); }
			}
			else {
				if (programName == 'RMT_SendRemittance') {
					clientName = $("input:hidden[name=clientLastName\\.hidden]").val() + ":" + 
								 $("input:hidden[name=clientFirstName\\.hidden]").val() + ":" + 
								 $("input:hidden[name=clientRemitAgency\\.hidden]").val();
				}
				else if (programName == 'RMT_AmendRemittance') {
					clientName = $("input:hidden[name=fromLastName\\.hidden]").val() + ":" + 
								 $("input:hidden[name=fromFirstName\\.hidden]").val() + ":" + 
								 $("input:hidden[name=remitAgency\\.hidden]").val();
				}
			}
		}
		else {
			if (programName == 'RMT_SendRemittance') { clientName += ":" + $("[name=clientRemitAgency]").val(); }
			else if (programName == 'RMT_AmendRemittance') { clientName += ":" + $("[name=remitAgency]").val(); }
		}
		
		$.LoadingOverlay("show");
		$.getJSON(getContextPath() + "/jsp/ajax/" + moduleCode + "-clients-ajax.jsp", {clientName:clientName, kycFlag:kycFlag})
		.done(function(data) {
			if (data.clientsList) {
				$.each(data.clientsList, function(key, value) {
					var clientInfo = value.split(':');
					var results = 
						'<tr>' + 
							'<td><a onclick="setKey(\'' + key + '\')" href="#" class="popup-result-item">' + clientInfo[0] + '</td>' +  
							'<td>' + clientInfo[1] + '</td>' + 
							'<td>' + clientInfo[2] + '</td>' + 
						'</tr>';
					tableSearch.append(results);
			 	})
		 		$.LoadingOverlay("hide");
			}
		})
		.fail(function() {
			setTimeout(function() {
				swal({
					title: 'Connection Error', 
					text: 'There might be something wrong with the connection to the API or to the database. Please try again.', 
					type: 'error', 
					allowOutsideClick: false, 
					allowEscapeKey: false
				});
				$.LoadingOverlay("hide");
			}, 15000);
		})
	}
	
	function getSystemDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //since, January is 0
		var yyyy = today.getFullYear();
		
		if (dd < 10) { dd = '0' + dd; }
		if (mm < 10) { mm = '0' + mm; }
		
		return mm + '/' + dd + '/' + yyyy;
	}
	
	function fillKYCPopupResultTablePRC(clientName) {
		//clear table
		var tableSearch = $('#table-search');
		tableSearch.html("");
		
		//append table headings
		var tableHeadings = 
			'<tr>' + 
				'<th>Client Name</th>' + 
				'<th>Gender</th>' + 
				'<th>Date of Birth</th>' + 
				'<th>Profession</th>'
			'</tr>';
		tableSearch.append(tableHeadings);
		
		//append new option item to table
		var newItem = 
			'<tr>' + 
				'<td><a onclick="setKey(\'new\')" href="#" class="popup-result-item">NEW CLIENT</a></td>' + 
				'<td>-</td>' + 
				'<td>--/--/----</td>' + 
				'<td>-</td>' + 
			'</tr>';
		tableSearch.append(newItem);
		
		$.getJSON(getContextPath() + "/jsp/ajax/prc-clients-ajax.jsp", {clientName:clientName}, function(data) {
			if (data.clientsList) {
				$.each(data.clientsList, function(key, value) {
					var clientInfo = value.split(':');
					var results = 
						'<tr>' + 
							'<td><a onclick="setKey(\'' + key + '\')" href="#" class="popup-result-item">' + clientInfo[0] + '</td>' +  
							'<td>' + clientInfo[1] + '</td>' + 
							'<td>' + clientInfo[2] + '</td>' + 
							'<td>' + clientInfo[3] + '</td>' + 
						'</tr>';
					tableSearch.append(results);
			 	})
			}
		})
	}
	
	/*---------------------*
	 * INSURANCE FUNCTIONS *
	 *---------------------*/
	
	Number.prototype.formatMoney = function(c, d, t) {
		var n = this,
		    c = isNaN(c = Math.abs(c)) ? 2 : c,
		    d = d == undefined ? "." : d,
		    t = t == undefined ? "," : t,
		    s = n < 0 ? "-" : "",
		    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		    j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
	
	function convertCurrency(value) {
		//value = (parseFloat(value)).formatMoney(2);
		value = (parseFloat(value)).toFixed(2);
		var num = 'P ' + value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "");
		return num;
	}

	function calculate(operation, param1, param2) {
		if (operation == "+") { return param1 + param2; }
		else if (operation == "-") { return param1 - param2; }
		else if (operation == "*") { return param1 * param2; }
		else if (operation == "/") { return param1 / param2; }
		else { return param1 + param2; }
	}
	
	function insertCalcbox(name, target, label, value, operation) {
		var currency = convertCurrency(value);
		var dupe = $(target + " .calc-item[data-name='" + name + "']");
		var new_string = "<tr>" + 
						 "<th>"	+ label + "</th>" + 
						 "<td>" + currency + 
						 "<input type='hidden' class='calc-item' value='" + value + "' data-name='" + name + "' data-operation='" + operation + "'>" + 
						 "</td></tr>";
		
		//update/set value to hidden field
		if (name != "" && value != "") {
			if (name.indexOf("hospital") >= 0) { name = "hospital"; }
			$("input[name='" + name + "AddOnFee']").val(value);
		}

		if (dupe.length > 0) {
			var old_label = dupe.parent().parent().find("th").html();
			if (old_label == label) {
				dupe.closest("tr").remove();
				
				//reset add-on value to zero
				$("input[name='" + name + "AddOnFee']").val(0);
			}
			else {
				if (value) { dupe.closest("tr").replaceWith(new_string); }
				else { dupe.closest("tr").remove(); }
			}
		}
		else { $(target + " .t-calculator").append(new_string); }

		var old_label = dupe.parent().parent().find("th").html();
		if (old_label == label) { dupe.closest("tr").remove(); }

		var items = $(target + " .calc-item");
		total = 0;
		items.each(function() {
			value = $(this).val();
			operation = $(this).data("operation");
			total = calculate(operation, total, Number(value.replace(/[^0-9\.]+/g, "")));
		});
		total = convertCurrency(total);
		var total_string = "<tr class='total'><th>Total</th><td>" + total + "</td></tr>";
		$(".match-calculator-summary").html(total);
		$(target + " .t-total tr").replaceWith(total_string);
	}
	
	function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	}
	
	function getHrefParameter(url, name) {
	    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
	}
	
});

/*----------------------------------------*
 * SHOW PREVIEW FOR BROWSED/SELECTED FILE *
 *----------------------------------------*/

function showPreview(input) {
	if (input.files && input.files[0]) {
		var file = input.files[0];
		var fileType = file["type"];
		var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
		if ($.inArray(fileType, validImageTypes) < 0) {
			//no preview for file types that are not an image; set to default preview
			$(".file-preview-img").attr("src", getContextPath() + "/jsp/design/images/no-preview-available.png");
		}
		else {
	        var reader = new FileReader();
	        reader.onload = function(e) {
	        	$(".file-preview-img").attr("src", e.target.result);
	        	$(".file-preview-img").parent('a').attr('href', e.target.result);
	        };
	        reader.readAsDataURL(input.files[0]);
		}
    }
}

function setFileName(input) {
	var elemName = input.name;
	var elemID = input.id;
	if (elemID == "" || elemID == "undefined") {
		if (elemName == "mailingSlip") elemID = '#upload1';
		else if (elemName == "quitClaim") elemID = '#upload2';
		else elemID = '#' + elemName;
	}
	var targetLabelID = elemID;
	
	var idArray = [];
	$('.input-execute').each(function() {
		var fileVal = $(this).val();
		if (fileVal == "") {}
		else { idArray.push(fileVal); }
	});
	
	if (input.files && input.files[0]) {
		var fileName = input.files[0].name;
		if (jQuery.inArray(fileName, idArray) !== -1) {
			swal({
				title: 'File Error', 
				text: 'File is already used/selected.', 
				type: 'error', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			});
			$(targetLabelID).val("");
			return;
		}
		$(targetLabelID).val(fileName);
	}
}

/*-----------------------------------------*
 * INPUT FILE SCRIPT                       * 
 * By Osvaldas Valutis, www.osvaldas.info  *
 * Available for use under the MIT License *
 *-----------------------------------------*/

'use strict';
;(function(document, window, index) {
	var inputs = document.querySelectorAll('.inputfile');
	Array.prototype.forEach.call(inputs, function(input) {
	var label = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener('change', function(e) {
		var fileName = '';
		if (this.files && this.files.length > 1) {
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		}
		else {
			fileName = e.target.value.split('\\').pop();
		}

		if (fileName) {
			label.querySelector('span').innerHTML = fileName;
		}
		else {
			label.innerHTML = labelVal;
		}
	});

	//FireFox bug fix
	input.addEventListener('focus', function() { input.classList.add('has-focus'); });
	input.addEventListener('blur', function() { input.classList.remove('has-focus'); });
});
}(document, window, 0));
