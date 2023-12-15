<%@page import= "com.ruralnet.v3.main.ajax.BannerAjaxManager"%>
<%
	BannerAjaxManager bannerAjaxManager = new BannerAjaxManager();
	String bannerResponse = bannerAjaxManager.getResponse().toString();	
	response.getWriter().write(bannerResponse);	   
%>
