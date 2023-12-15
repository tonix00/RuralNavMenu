<%@page import = "com.ruralnet.v3.main.ajax.GCSAjaxManager"%>

<%
	double trnAmt = Double.parseDouble(request.getParameter("trnAmt"));
	GCSAjaxManager ajaxManager = new GCSAjaxManager(trnAmt);
	response.getWriter().write(ajaxManager.getTrnFee().toString());
%>
