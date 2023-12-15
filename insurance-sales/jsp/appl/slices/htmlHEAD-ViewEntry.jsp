<%@ include file="../includes/include-JSTL.jsp" %>

<c:set var="cntextpath" value="${pageContext.request.contextPath}"/>
<c:set var="pathinfo" value="${pageContext.request.pathInfo}"/>
<c:set var="fontsdir" value="${cntextpath}/jsp/design/fonts/"/>
<c:set var="cssdir" value="${cntextpath}/jsp/design/css/"/>
<c:set var="jsdir" value="${cntextpath}/jsp/design/scripts/"/>
<c:set var="thirdpartyjsdir" value="${cntextpath}/jsp/design/scripts/thirdparty/"/>
<c:set var="imgdir" value="${cntextpath}/jsp/design/images/"/>
<c:set var="user" value="${model.user}"/>

<!DOCTYPE HTML>
<html lang="en">
	<head>
		<!-- meta tags -->
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="Designex Templates"/>
		<meta name="author" content="Designex International Corporation"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
		<!-- favicon -->
		<link rel="icon" href="${imgdir}favicon.png" type="image/png">
		
		<!-- bulma -->
		<link href="${cssdir}bulma.css" rel="stylesheet" />
	
		<!-- magnific popup -->
		<link href="${thirdpartyjsdir}mfp/magnific-popup.css" rel="stylesheet" />
	
		<!-- select2 -->
		<link href="${thirdpartyjsdir}select2/select2.min.css" rel="stylesheet" />
			
		<!-- flatpicker -->
		<link href="${thirdpartyjsdir}flatpicker/flatpickr.min.css" rel="stylesheet">
			
		<!-- slick -->
		<link href="${thirdpartyjsdir}slick/slick.css" rel="stylesheet">
		<link href="${thirdpartyjsdir}slick/slick-theme.css" rel="stylesheet">
		
		<!-- font awesome -->
		<link href="${fontsdir}font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
		
		<!-- bootstrap toggle -->
		<link href="${thirdpartyjsdir}bootstrap-toggle/css/bootstrap-toggle.min.css" rel="stylesheet">
	
		<!-- data tables -->
		<link href="${thirdpartyjsdir}DataTables/media/css/jquery.dataTables.min.css" rel="stylesheet" />
		<link href="${thirdpartyjsdir}DataTables/media/css/jquery.dataTables_themeroller.css" rel="stylesheet" />
			
		<!-- jquery ui -->
		<link href="${thirdpartyjsdir}jquery-ui/1.11.4/jquery-ui.css" rel="stylesheet" />
			
		<!-- cropper -->
		<link href="${thirdpartyjsdir}cropper/cropper.css" rel="stylesheet" />
			
		<!-- sweet alert -->
		<link href="${thirdpartyjsdir}sweet-alert/sweetalert2.min.css" rel="stylesheet" />
		
		<!-- tips -->
		<link href="${thirdpartyjsdir}tips/css/tips.css" rel="stylesheet" />
		
		<!-- fonts -->
		<link href="${fontsdir}raleway/raleway.css" rel="stylesheet" />
		<link href="${fontsdir}montserrat/montserrat.css" rel="stylesheet" />
		<link href="${fontsdir}nunito/nunito.css" rel="stylesheet" />

		<!-- concept machine css -->	
		<link href="${cssdir}cmstyle.css" rel="stylesheet">
		<link href="${cssdir}customstyles.css" rel="stylesheet">
		
		<!-- jquery -->
		<script src="${thirdpartyjsdir}jquery/3.2.0/jquery.min.js"></script>
			
		<!-- system scripts -->
		<script src="${jsdir}systemtimeandday.js"></script>
		<script src="${jsdir}dsxcommon.js"></script>
		<script src="${jsdir}dsxvalidator.js"></script>
		<script src="${jsdir}viewentry.js"></script>
		<script src="${jsdir}validator.js"></script>
			
		<!-- modernizr -->
		<script src="${thirdpartyjsdir}modernizr/modernizr.custom.29473.js"></script>
	
		<title>
			<c:choose>
				<c:when test="${not empty model.moduleName}"><c:out value="${model.moduleName}"/></c:when>
				<c:otherwise>Dashboard</c:otherwise>
			</c:choose>| RuralNet v3.0
		</title>
	</head>
