<%@page import="com.ruralnet.v3.main.ajax.Base64StringConverter"%>
<% 	
	String loginName = request.getParameter("loginName");
	String imgDataSrc = request.getParameter("fileDataSrc");	
	String fileName = request.getParameter("fileName");
	Base64StringConverter converter = new Base64StringConverter();
	converter.saveClaimDocData(loginName, imgDataSrc, fileName);
%>
