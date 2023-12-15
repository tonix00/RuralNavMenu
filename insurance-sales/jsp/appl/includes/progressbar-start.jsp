<%@page import="com.designex.services.task.Task"%>

<% Task task = (Task)session.getAttribute("session.task"); %>
<% task.clearMessages(); %>
<% task.setPercent(0); %>
<jsp:forward page="include-Progressbar.jsp"/>
