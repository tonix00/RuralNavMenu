/*----------------------------------------------*
 * File     : DSXSHOWREPORT.JS                  *
 * Author   : Jo-Anne Concepcion M. Mercado     *
 * Date     : 13 May 2010                       *
 * Function : shows the hidden report           *
 *----------------------------------------------*/

var dsxshowreport = {

	showreport : function() {
		var totalPages = 0
		var el
		//hide the view pages
		el = dsxcommon.getObject("totalPages")
		totalPages = el.value
		for (var i = 1; i <= totalPages; i++) {
			el = dsxcommon.getObject("pageNo" + i)
			el.style.visibility = "hidden"
			el.style.display = "none"
		}
		//hide the view parameters
		el = dsxcommon.getObject("viewparameters")
		if (el != null) {
			el.style.visibility = "hidden"
			el.style.display = "none"
		}
		//hide the view page option buttons
		el = dsxcommon.getObject("viewPageOptionsDiv")
		el.style.visibility = "hidden"
		el.style.display = "none"
		//display the report
		el = dsxcommon.getObject("reportDiv")
		el.style.visibility = "visible"
		el.style.display = "block"
		return false;
	}
}