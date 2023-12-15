<%@page import = "com.ruralnet.v3.main.ajax.KYCAjaxManager"%>

<%
	String clientName = request.getParameter("clientName");
	KYCAjaxManager ajaxManager = new KYCAjaxManager(clientName);
	response.getWriter().write(ajaxManager.getClients().toString());
%>
