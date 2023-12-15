
function setKey(id) {
	$("[name=primaryKey]").val(id);
	$.magnificPopup.instance.close();
	var programName = $("[name=programName]").val();
	var pageNo = $("[name=pageNo]").val();
	if (programName == 'RMT_SendRemittance') {
		if (pageNo == 1) {
			$("[value=Verify]").click();
		}
		else {
			$("[value=Go]").removeClass("validateform");
			$("[value=Go]").click();
		}
	}
	else if (programName == 'RMT_AmendRemittance') {
		$("[value=Go]").removeClass("validateform");
		$("[value=Go]").click();
	}
	else if (programName == 'PRC_EnterRequest') {
		$("[value=Verify]").click();
	}
}
