<%@ page import = "com.ruralnet.v3.main.ajax.InsuranceAjaxManager" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import = "com.ruralnet.v3.main.ajax.datatables.beans.ServerSideRequest" %>
<%@ page import = "com.ruralnet.v3.main.ajax.datatables.ClaimService" %>
<%@ page import = "com.designex.security.domain.User" %>

<%
	String jsonParams = "";
	Map<String, String[]> parameters = request.getParameterMap();
	for (String parameter : parameters.keySet()) {
	   	if (parameter.contains("draw")) {
			jsonParams = parameter;
	   	}
	}
	
	ObjectMapper objMapper = new ObjectMapper();
	ServerSideRequest ssRequest = objMapper.readValue(jsonParams, ServerSideRequest.class);
	ClaimService service = new ClaimService();
	User user = (User) request.getSession().getAttribute("session.user");
	String dtResponse = objMapper.writeValueAsString(service.getListing(user.getClientCode(), user.getBrhCode(), ssRequest));
	response.getWriter().write(dtResponse);
%>
