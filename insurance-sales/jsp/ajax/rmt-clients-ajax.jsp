<%@page import = "com.ruralnet.v3.main.ajax.RMTAjaxManager"%>

<%
	boolean kycFlag = Boolean.parseBoolean(request.getParameter("kycFlag"));
	String clientName = request.getParameter("clientName");
	RMTAjaxManager ajaxManager = new RMTAjaxManager(clientName);
	if (kycFlag) { response.getWriter().write(ajaxManager.getClients().toString()); }
	else { response.getWriter().write(ajaxManager.getBeneficiaries().toString()); }
%>
