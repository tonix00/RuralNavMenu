<%@page import = "com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	String claimID = request.getParameter("claimID");
	String payoutAmt = request.getParameter("payoutAmt");
	
	InsuranceClaimsAjaxManager ajaxManager = new InsuranceClaimsAjaxManager(loginName, claimID, payoutAmt);
	response.getWriter().write(ajaxManager.validateApprovedAmount().toString());
%>
