<%@page import = "com.ruralnet.v3.main.ajax.InsuranceMonthlyAjaxManager"%>

<%
	String claimTraceNo = request.getParameter("claimTraceNo");
	String loginName = request.getParameter("loginName");
	InsuranceMonthlyAjaxManager ajaxManager = new InsuranceMonthlyAjaxManager(claimTraceNo, loginName);
	response.getWriter().write(ajaxManager.getAmountDue().toString());
%>
