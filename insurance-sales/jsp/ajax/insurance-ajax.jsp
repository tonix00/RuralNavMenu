<%@page import = "com.ruralnet.v3.main.ajax.InsuranceAjaxManager"%>

<%
	String groupID = request.getParameter("groupID");
	String productID = request.getParameter("productID");
	String birthDate = request.getParameter("birthDate");
	String familyType = request.getParameter("familyType");
	String endDate = request.getParameter("endDate");
	InsuranceAjaxManager ajaxManager = new InsuranceAjaxManager(groupID, productID, birthDate, familyType, endDate);
	response.getWriter().write(ajaxManager.validateAge().toString());
%>
