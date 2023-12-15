<%@page import="com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>
<% 	
	String loginName = request.getParameter("loginName");
	String claimTraceNo = request.getParameter("claimTraceNo");
	InsuranceClaimsAjaxManager insClaimsAjaxManager = new InsuranceClaimsAjaxManager(loginName, claimTraceNo);
	response.getWriter().write(insClaimsAjaxManager.getQCF().toString());
%>
