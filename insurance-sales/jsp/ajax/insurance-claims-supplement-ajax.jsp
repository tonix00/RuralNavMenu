<%@page import = "com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>

<%
	String loginName = request.getParameter("loginName");
	String claimID = request.getParameter("claimID");
	String payoutAmt = request.getParameter("payoutAmt");
	String deductibleAmt = request.getParameter("deductibleAmt");
	
	InsuranceClaimsAjaxManager ajaxManager = new InsuranceClaimsAjaxManager(loginName, claimID, payoutAmt, deductibleAmt);
	response.getWriter().write(ajaxManager.approveSupplementClaim().toString());
%>
