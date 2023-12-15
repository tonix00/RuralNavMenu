<%@page import = "com.ruralnet.v3.main.ajax.InsuranceAjaxManager"%>

<%
	String traceNo = request.getParameter("traceNo");
	InsuranceAjaxManager ajaxManager = new InsuranceAjaxManager(traceNo);
	response.getWriter().write(ajaxManager.validateMonthlyPayments().toString());
%>
