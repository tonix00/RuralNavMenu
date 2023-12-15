<%@ include file="../includes/include-JSTL.jsp" %>

<c:set var="cntextpath" value="${pageContext.request.contextPath}"/>
<c:set var="pathinfo" value="${pageContext.request.pathInfo}"/>
<c:set var="fontsdir" value="${cntextpath}/jsp/design/fonts/"/>
<c:set var="cssdir" value="${cntextpath}/jsp/design/css/"/>
<c:set var="jsdir" value="${cntextpath}/jsp/design/scripts/"/>
<c:set var="thirdpartyjsdir" value="${cntextpath}/jsp/design/scripts/thirdparty/"/>
<c:set var="imgdir" value="${cntextpath}/jsp/design/images/"/>

<!DOCTYPE html>
<html lang="en">
	<head>
		<script src="${thirdpartyjsdir}jquery/3.2.0/jquery.min.js"></script>
		<script>
			$(document).ready(function() {
				setTimeout(function() {
					//fade-in jquery effect for the body
					$("body").fadeIn("slow");
					//set focus to loginName field
					$("#loginName").focus();
					//display submit errors
					var submiterrors = $("#submit-errors").text().replace(/\|/g, " ").trim();
					if (submiterrors != "") {
						$("#login-alert-container").show();
						$("#login-alert-content").text(submiterrors);
					}
				}, 500);
				
				$("#togglePassword").click(function() {
					var elemPassword = $("input[name='password']");
					if (elemPassword.attr('type') == "password") {
						elemPassword.attr('type', 'text');
					}
					else {
						elemPassword.attr('type', 'password');
					}
					
					$(this).toggleClass("fa-eye-slash");
			    });
			});
		</script>
		
		<!-- meta tags -->
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="RuralNet v3.0"/>
		<meta name="author" content="Designex International Corporation"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
		<title>Login | RuralNet v3.0</title>
		
		<!-- favicon -->
		<link rel="icon" href="${imgdir}favicon.png" type="image/png">
		
		<!-- bulma -->
		<link href="${cssdir}bulma.css" rel="stylesheet">
		
		<!-- font awesome -->
		<link href="${fontsdir}font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

		<!-- font(s) used -->
		<link href="${fontsdir}raleway/raleway.css" rel="stylesheet" />
		<link href="${fontsdir}montserrat/montserrat.css" rel="stylesheet" />
		<link href="${fontsdir}nunito/nunito.css" rel="stylesheet" />
		
		<!-- concept machine css -->
		<link href="${cssdir}cmstyle.css" rel="stylesheet">
		<link href="${cssdir}customstyles.css" rel="stylesheet">
		
		<!-- sweet alert -->
		<link href="${thirdpartyjsdir}sweet-alert/sweetalert2.min.css" rel="stylesheet" />
		<script src="${thirdpartyjsdir}sweet-alert/sweetalert2.all.min.js"></script>
		<script src="${thirdpartyjsdir}sweet-alert/core.js"></script>
	
		<!-- system scripts -->
		<script src="${jsdir}branchselector.js"></script>
		<script src="${jsdir}banner.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				var contextpath = "${cntextpath}";
				branchselector.init(contextpath);
				
				getBanners(contextpath + "/jsp/ajax/");
			});
		</script>
		<script src="${jsdir}forgotpassword.js"></script>
		<script>
			function stopRKey(evt) {
				var evt = (evt) ? evt : ((event) ? event : null);
				var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
				if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
			}
			document.onkeypress = stopRKey;
		</script>
	</head>
