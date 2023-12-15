<%@page import= "com.designex.services.utilities.DateUtility"%>
<%@page import= "java.util.Date"%>
<% 		
	DateUtility du = new DateUtility();
	String dateString = du.setDateToString("EEEE, MMMM d, yyyy, hh:mm:ss aa", du.getSystemDateAndTime());
	response.getWriter().write(dateString); 		
%>
