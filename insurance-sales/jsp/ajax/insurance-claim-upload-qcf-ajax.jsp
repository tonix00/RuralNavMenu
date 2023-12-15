<%@page import="com.ruralnet.v3.main.ajax.InsuranceClaimsAjaxManager"%>
<% 	
	String loginName = request.getParameter("loginName");
	//String claimTraceNoAndQcfSrc = request.getParameter("claimTraceNoAndQcfSrc");
	String claimTraceNoAndFileSrc = request.getParameter("claimTraceNoAndFileSrc");
	//InsuranceClaimsAjaxManager insClaimsAjaxManager = new InsuranceClaimsAjaxManager(loginName, claimTraceNoAndQcfSrc);
	InsuranceClaimsAjaxManager insClaimsAjaxManager = new InsuranceClaimsAjaxManager(loginName, claimTraceNoAndFileSrc);
	response.getWriter().write(insClaimsAjaxManager.uploadQCF().toString());
%>
