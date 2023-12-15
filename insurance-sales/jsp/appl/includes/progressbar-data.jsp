<%@page import="com.designex.services.task.Task"%>
<%
	int initmessage = 0;
	int newmessage = 0;
	Task task = (Task)session.getAttribute("session.task");
	initmessage = task.getPercent();
	newmessage = task.getPercent();
	while (initmessage == newmessage) {
		task = (Task)session.getAttribute("session.task");
		newmessage = task.getPercent();
	} 
	response.getWriter().write(task.getJson());
%>
