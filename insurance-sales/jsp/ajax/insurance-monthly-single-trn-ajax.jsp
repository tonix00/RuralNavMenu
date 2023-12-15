<%@page import = "com.ruralnet.v3.main.ajax.InsuranceMonthlyAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	String pocNo = request.getParameter("pocNo");
	String amtDue = request.getParameter("amtDue");
	
	InsuranceMonthlyAjaxManager ajaxManager = new InsuranceMonthlyAjaxManager(loginName, pocNo, amtDue);
	response.getWriter().write(ajaxManager.paySingleMonthlyTrn().toString());
	
%>
