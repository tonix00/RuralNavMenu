<%@page import = "com.ruralnet.v3.main.ajax.RMTAjaxManager"%>

<%
	String remitAgency = request.getParameter("remitAgency");
	double principalAmt = Double.parseDouble(request.getParameter("principalAmt"));
	String loginName = request.getParameter("loginName");
	String trnDate = request.getParameter("trnDate");
	String newEntry = request.getParameter("newEntry");
	String agentCode = request.getParameter("agentCode");
	RMTAjaxManager ajaxManager = new RMTAjaxManager(remitAgency, principalAmt, loginName, trnDate, newEntry, agentCode);
	response.getWriter().write(ajaxManager.getSendServiceFee().toString());
%>
