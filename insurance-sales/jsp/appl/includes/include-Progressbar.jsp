<input type="hidden" name="contextpath" value="${cntextpath}/jsp/appl/includes/" />
<div id="progContainer" class="column">
	<span class="progressmessageholder"></span>
	<progress class="progress is-info is-large" id="progBar" value="0" max="100">10%</progress>
</div>
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
				$(".progress",window.parent.document).slideDown('fast');
				$('#progContainer').show();
			}

			if ($.trim(data.message) != $.trim(oldMessage)) {
				$('.progressmessageholder').html(data.message)
			}

			if (data.percent == 100) {
				clearInterval(interval)
				$('#progContainer').hide();
			}
			
			console.log(data);
			oldPrompt = data.prompt
			oldMessage = data.message
			
			$('#progBar').val(data.percent);
			$('#progBar').html(data.percent);
		}); 
	 } 

	 //create interval to get status per 20 ms
	 function startInterval() {
		interval = setInterval("getStatus()", 20)
	 } 

	 $('document').ready(function() {
		 $('#progContainer').hide();
	 })
	
	 $('#form-id').submit(function() {
		if ($('#file1').get(0).files.length != 0 && $('#email1').val().length != 0) {
			startInterval(); 
		}
	 }); 
</script>
