<%@page import = "com.ruralnet.v3.main.ajax.MassUploadAjaxManager"%>

<%
	String process = request.getParameter("specialParam1");
	String validFlag = request.getParameter("validFlag");
	String uploadDate = request.getParameter("uploadDate");
	MassUploadAjaxManager ajaxManager = new MassUploadAjaxManager(validFlag, uploadDate);
	
	if (validFlag.equals("numValid")) {
		response.getWriter().write(ajaxManager.getValid().toString());
	}
	else {
		response.getWriter().write(ajaxManager.getInValid().toString());
	}
%>
