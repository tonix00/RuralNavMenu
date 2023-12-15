<%@page import = "com.ruralnet.v3.main.ajax.RMTAjaxManager"%>

<%
	String primaryKey = request.getParameter("primaryKey");
	RMTAjaxManager ajaxManager = new RMTAjaxManager(primaryKey);
	response.getWriter().write(ajaxManager.validateClient().toString());
%>
