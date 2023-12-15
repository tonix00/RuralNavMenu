<%@page import="com.ruralnet.v3.main.ajax.Base64StringConverter"%>
<%@page import="com.ruralnet.v3.web.global.Module"%>
<% 	
	String moduleCode = request.getParameter("moduleCode");
	String imgDataSrc = request.getParameter("fileDataSrc");	
	String fileName = request.getParameter("fileName");
	Base64StringConverter converter = new Base64StringConverter();
	if (moduleCode.equals(Module.INSURANCE_CLAIMS)) { converter.deleteOldImages(fileName); }
	converter.convertDataToImageFile(moduleCode, imgDataSrc, fileName);
%>
