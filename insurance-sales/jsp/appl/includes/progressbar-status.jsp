<%@ include file="include-JSTL.jsp" %>

<c:set var="jsDir" value="${pageContext.request.contextPath}/jsp/design/scripts/"/>

<HTML>
<HEAD>
	<TITLE>Progress Bar</TITLE>
	<script type="text/javascript" src="${jsDir}jquery.js"></script>
	<script type="text/javascript">
		var contextpath = $("input:hidden[name='contextpath']", window.parent.document).val()
		var oldPrompt = ""
		var oldMessage = ""
		var interval = ""
		var pathProgressbarData = contextpath + "progressbar-data.jsp"

		//jQuery Ajax function to GET the status of the TaskBean
		function getStatus() {
			$.getJSON(pathProgressbarData, function(data) {
				if (data.running == true) {
					$(".progress",window.parent.document).slideDown('fast')
				}

				if ($.trim(data.prompt) != $.trim(oldPrompt)) {
					$('.progresspromptholder').html(data.prompt)
				}

				if ($.trim(data.message) != $.trim(oldMessage)) {
					$('.progressmessageholder').text(data.message)
					$('.progressmessageholder').animate({scrollTop: $('.progressmessageholder')[0].scrollHeight})
				}

				if (data.percent == 100) {
					clearInterval(interval)
				}

				oldPrompt = data.prompt
				oldMessage = data.message
			});
		}

		//create interval to get status per 20 ms
		function startInterval() {
			interval = setInterval("getStatus()", 20)
		}

		//execute interval
		startInterval();
	</script>

	<style type="text/css">
		body {
			background-color : none;
		}
		.progresspromptholder, .progressmessageholder {
			color: red;
			font-family: Arial;
			font-style: normal;
			font-size: 11px;
			text-align: left;
			border: 0px;
			/* background-color : #7A9FBB; /* blue theme */
			/* background-color : #FFCCCC; /* red theme */
			background-color : #E6F3F9; /* red theme */
			/* background-color : #DCDCDC; /* black theme */
			/* background-color : #86B399; /* green theme */
		}
		</style>
</HEAD>

<BODY Style="background-color:red;">
	<span class="progresspromptholder"></span>
	<textarea class="progressmessageholder" rows=2 cols=100 disabled='disabled' style='display:inline'>1233
	</textarea>
</BODY>

</HTML>
