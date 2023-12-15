<%@page import="com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>
<% 	
	String loginName = request.getParameter("loginName");
	String claimTraceNoAndReason = request.getParameter("claimTraceNoAndReason");	
	InsuranceClaimsAjaxManager insClaimsAjaxManager = new InsuranceClaimsAjaxManager(loginName, claimTraceNoAndReason);
	response.getWriter().write(insClaimsAjaxManager.revertClaim().toString());
%>
