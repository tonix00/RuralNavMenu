<%@page import="com.ruralnet.v3.main.ajax.Base64StringConverter"%>
<% 	
	String loginName = request.getParameter("loginName");
	String claimTraceNo = request.getParameter("claimTraceNo");	
	String claimDocNo = request.getParameter("claimDocNo");
	Base64StringConverter converter = new Base64StringConverter();
	converter.deleteClaimDocs(loginName, claimTraceNo, claimDocNo);
%>
