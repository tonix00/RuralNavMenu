<%@page import= "com.ruralnet.v3.main.ajax.BalanceAjaxManager"%>
<%@page import= "com.designex.services.utilities.NumberFormatUtility"%>

<% 		
	String login = request.getParameter("formlogin");
	NumberFormatUtility nfu = new NumberFormatUtility();
	BalanceAjaxManager bAjax = new BalanceAjaxManager(login);	
	String balance = nfu.twoDecimalFormat(bAjax.getBalance());
	response.getWriter().write(balance); 		
%>
