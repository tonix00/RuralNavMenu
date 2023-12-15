<%@page import = "com.ruralnet.v3.main.ajax.InsuranceMonthlyAjaxManager"%>

<%
	String traceNo = request.getParameter("traceNo");
	String loginName = request.getParameter("loginName");
	InsuranceMonthlyAjaxManager ajaxManager = new InsuranceMonthlyAjaxManager(traceNo, loginName);
	response.getWriter().write(ajaxManager.getAmountDue2().toString());
%>
