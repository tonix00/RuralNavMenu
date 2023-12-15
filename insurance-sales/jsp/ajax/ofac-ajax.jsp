<%@page import = "com.ruralnet.v3.main.ajax.OFACAjaxManager"%>

<%
	String clientName = request.getParameter("clientName");
	OFACAjaxManager ajaxManager = new OFACAjaxManager(clientName);
	response.getWriter().write(ajaxManager.getBlacklist().toString());
%>
