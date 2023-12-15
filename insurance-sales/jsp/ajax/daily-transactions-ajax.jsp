<%@page import = "com.ruralnet.v3.main.ajax.DailyTransactionsAjaxManager"%>

<%
	String clientCode = request.getParameter("clientCode");
	String brhCode = request.getParameter("brhCode");
	String trnType = request.getParameter("trnType");
	DailyTransactionsAjaxManager ajaxManager = new DailyTransactionsAjaxManager(clientCode, brhCode);
	if (trnType.equalsIgnoreCase("insSales")) { response.getWriter().write(ajaxManager.getInsuranceSalesAndIncentives().toString()); }
	else { response.getWriter().write(ajaxManager.getDailyTransactions().toString()); }
%>
