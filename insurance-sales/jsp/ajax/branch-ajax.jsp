<%@page import = "com.ruralnet.v3.main.ajax.BranchAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	BranchAjaxManager bAjax = new BranchAjaxManager(loginName);
	response.getWriter().write(bAjax.getResponse().toString());
%>
