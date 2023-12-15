<%@page import = "com.ruralnet.v3.main.ajax.InsuranceRenewalAjaxManager"%>

<%
	String traceNo = request.getParameter("traceNo");
	String insGroupID = request.getParameter("insGroupID");
	String insProductID = request.getParameter("insProductID");
	InsuranceRenewalAjaxManager ajaxManager = new InsuranceRenewalAjaxManager();
	if (!traceNo.isEmpty()) {
		ajaxManager = new InsuranceRenewalAjaxManager(traceNo);
		response.getWriter().write(ajaxManager.getTransaction().toString());
	}
	else {
		ajaxManager = new InsuranceRenewalAjaxManager(insGroupID, insProductID);
		response.getWriter().write(ajaxManager.getCoverageList().toString());
	}
%>
