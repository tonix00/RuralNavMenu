<%@page import="com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>
<% 	
	String loginName = request.getParameter("loginName");
	String claimTraceNoAndComment = request.getParameter("claimTraceNoAndComment");	
	InsuranceClaimsAjaxManager insClaimsAjaxManager = new InsuranceClaimsAjaxManager(loginName, claimTraceNoAndComment);
	response.getWriter().write(insClaimsAjaxManager.postClaimComment().toString());
%>
