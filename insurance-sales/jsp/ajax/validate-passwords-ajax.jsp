<%@page import = "com.ruralnet.v3.main.ajax.UsersAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	String oldPassword = request.getParameter("oldPassword");
	String newPassword = request.getParameter("newPassword");
	String reconfirmPassword = request.getParameter("reconfirmPassword");
	UsersAjaxManager usersAjax = new UsersAjaxManager(loginName, oldPassword, newPassword, reconfirmPassword);
	response.getWriter().write(usersAjax.validatePasswords().toString());
%>
