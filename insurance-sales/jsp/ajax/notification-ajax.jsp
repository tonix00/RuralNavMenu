<%@page import = "com.ruralnet.v3.main.ajax.NotificationAjaxManager"%>

<%
	String clientCode = request.getParameter("clientCode");
	NotificationAjaxManager ajaxManager = new NotificationAjaxManager(clientCode);
	response.getWriter().write(ajaxManager.getNotifications().toString());
%>
