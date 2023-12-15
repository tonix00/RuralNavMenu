<%@page import = "com.ruralnet.v3.main.ajax.InsuranceAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	String groupID = request.getParameter("groupID");
	String productID = request.getParameter("productID");
	InsuranceAjaxManager ajaxManager = new InsuranceAjaxManager(loginName, groupID, productID);
	response.getWriter().write(ajaxManager.getMaxUnits().toString());
%>
