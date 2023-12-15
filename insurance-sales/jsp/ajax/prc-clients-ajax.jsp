<%@page import = "com.ruralnet.v3.main.ajax.PRCAjaxManager"%>

<%
	String clientName = request.getParameter("clientName");
	PRCAjaxManager ajaxManager = new PRCAjaxManager(clientName);
	response.getWriter().write(ajaxManager.getClients().toString());
%>
