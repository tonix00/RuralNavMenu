<%@ include file="../includes/include-JSTL.jsp" %>

		<script src="${thirdpartyjsdir}jquery-ui/1.11.4/jquery-ui.js"></script>
		<script src="${thirdpartyjsdir}mfp/jquery.magnific-popup.min.js"></script>
		<%-- <script src="${thirdpartyjsdir}darkbox/darkbox.min.js"></script> --%>
		<script src="${thirdpartyjsdir}select2/select2.min.js"></script>
		<script src="${thirdpartyjsdir}bootstrap-toggle/js/bootstrap-toggle.min.js"></script>
		<script src="${thirdpartyjsdir}flatpicker/flatpickr.min.js"></script>
		<script src="${thirdpartyjsdir}slick/slick.min.js"></script>
		<script src="${thirdpartyjsdir}DataTables/media/js/jquery.dataTables.min.js"></script>
		<script src="${thirdpartyjsdir}cropper/cropper.js"></script>
		<script src="${thirdpartyjsdir}jquery-modal/jquery.modal.js"></script>
		<script src="${thirdpartyjsdir}sweet-alert/sweetalert2.min.js"></script>
		<script src="${thirdpartyjsdir}sweet-alert/core.js"></script>
		<script src="${thirdpartyjsdir}loading-overlay/1.5.4/loadingoverlay.min.js"></script>
		<script src="${thirdpartyjsdir}fancybox/3.3.5/jquery.fancybox.js"></script>
		<script src="${thirdpartyjsdir}tips/js/tips.js"></script>
		<script src="${thirdpartyjsdir}tips/js/global.js"></script>
		
		<!-- concept machine scripts -->
		<script src="${jsdir}cmscript.js"></script>
		<script src="${jsdir}validate.js"></script>
		<script src="${jsdir}form-controls.js"></script>
		<script src="${jsdir}autocomplete.js"></script>
		
		<%@ include file="../includes/include-FooterScripts.jsp" %>
		<script type="text/javascript">
			$(window).on('load', function() {
				$('#preloader').fadeOut('slow', function() {
					$(this).remove();
				});
			});
			
			$(document).ready(function() {
				//check for click events on the navbar burger icon
				$(".burger-nav").click(function() {
					$("#mobile-nav").fadeToggle();
				});
			});
		</script>
		
		<!-- v1: is-warning -->
		<!-- v2: is-danger -->
		<div id="sessionPreExpiryNotif" 
			 class="notification is-danger has-text-centered" 
			 style="position:fixed; bottom: 0; right: 18px; padding: 25px 20px 0 20px !important; border-radius: 5px; font-weight: bold; visibility:hidden">
		</div>
		<script>
		    var maxInactiveInterval = ${pageContext.session.maxInactiveInterval};
		    var timeAllowancePreExpiry = 300; //300 seconds (5 minutes)
		    var startTime = (maxInactiveInterval - timeAllowancePreExpiry) * 1000;
		    var remainingTime = timeAllowancePreExpiry * 1000;
		    setTimeout(function() {
		    	setInterval(function() {
		    		var remainingTimeInWords = secondsToHms(remainingTime / 1000);
		    		if (remainingTime < 0) {
		    			$("#sessionPreExpiryNotif").html("Session is already expired. Please re-login to the system. Thank you.");
		    		}
		    		else {
		    			$("#sessionPreExpiryNotif").html("Your session will expire in <strong>" + remainingTimeInWords + "</strong>. Please save your work and re-login to the system. Thank you.");
		    		}
			        
			        $("#sessionPreExpiryNotif").css("visibility", "visible");
			        remainingTime = remainingTime - 1000;
		    	}, 1000);
		    }, startTime);
		    
		    function secondsToHms(d) {
		        d = Number(d);
		        var h = Math.floor(d / 3600);
		        var m = Math.floor(d % 3600 / 60);
		        var s = Math.floor(d % 3600 % 60);

		        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
		        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
		        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		        var fullDisplay = hDisplay + mDisplay + sDisplay;
		        
		        return fullDisplay == "" ? "0 seconds" : fullDisplay;
		    }
		</script>
				