<%@page import = "com.ruralnet.v3.main.ajax.InsuranceMonthlyAjaxManager"%>

<%
	String jsonString = request.getParameter("primaryKeys");
	String loginName = request.getParameter("loginName");
	String processType = request.getParameter("processType");
	
	InsuranceMonthlyAjaxManager ajaxManager = new InsuranceMonthlyAjaxManager(jsonString, loginName);
	if (processType.equalsIgnoreCase("pay")) {
		response.getWriter().write(ajaxManager.processMonthlyPayment().toString());
	}
	else if (processType.equalsIgnoreCase("cancel")) {
		response.getWriter().write(ajaxManager.processMonthlyCancellation().toString());
	}
	
%>
