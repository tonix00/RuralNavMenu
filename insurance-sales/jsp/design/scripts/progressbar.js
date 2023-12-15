/*---------------------------------------*
 * Javascript to trigger the progressbar *
 * Francis Albert N. Tonog               *
 * 8 September 2010                      *
 *---------------------------------------*/

$

var progressbar = {

	progressbarStart : "progressbar-start.jsp",
	taskStatus : "progressbar-data.jsp",
	linkName : "",
	contextpath : "",
	linkStart : "",
	linkStatus : "",
	checkType : "",

	/* initilize variables */
	init : function() {
		this.contextpath = $("input:hidden[name='contextpath']").val()
		this.linkStart = this.contextpath + this.progressbarStart
		this.linkStatus = this.contextpath + this.taskStatus
		this.onReady()
	},

	/* event listeners */
	onReady : function () {
		/*** event for links ***/
		$("a[href!='#']").click(function() {
			progressbar.checkType = "link"
			progressbar.checkIframe()
    		progressbar.linkName = $(this).attr("href")
		    $("iframe#loading").attr("src", function(url) {
	    		if ($(this).attr('src')=='about:blank') {
	    			return progressbar.linkStart
	    		}
		    })
			return false;
		})

	   	/*** event for buttons ***/
	   	$("input[value='Continue'], input[value='View'], input[value='Save'], " +
	   	  "input[value='Execute'], input[value='Upload'], input[value='Print']").mouseover(function() {
			progressbar.checkType = "input"
			$("iframe#loading").attr("src", function(url) {
				if($(this).attr('src')=='about:blank') {
					return progressbar.linkStart
				}
			})
			progressbar.checkIframe()
   		})
	},

	/* iframe checker */
	checkIframe : function () {
		var type = progressbar.checkType
		if ($("iframe#loading").attr('src')!='about:blank') {
			//clearInterval(progressbar.getInterval())
			if (type=="link") {
				window.location = this.linkName
			}
			else { /* do nothing */ }
	    }
	    else {
	    	//every 1 seconds to check if the i-frame has changed
			progressbar.getInterval()
		}
	},

	/* recursive function to check i-frame status*/
	getInterval : function () {
		return setInterval(function() { progressbar.checkIframe() }, 1000)
	}
}

$(document).ready(function() {
	progressbar.init()
})
