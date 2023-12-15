<%@ include file="../includes/include-JSTL.jsp" %>

<c:url value="${pathInfo}MenuForm.htm" var="myaccturl">
	<c:param name="programName" value="MGR_MyAccount"/>
</c:url>
<c:url value="${pathInfo}MenuForm.htm" var="logouturl">
	<c:param name="programName" value="MGR_Logout"/>
</c:url>

		<nav class="navbar">
			<div class="navbar-brand">
		    	<a class="navbar-item" href="index.html">
		    		<img src="${imgdir}logo_med.png" class="logo">
		    	</a>
		  	</div>
			
			${model.cmMenu}
			
			<div class="navbar-end">
		      	<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						<span class="icon user-detail-icon nav-item is-36"><i class="fa fa-user"></i></span>
						<span class="user-name">
							<p class="is-bold"><c:out value="${model.loginName}"/></p>
							<p><c:out value="${model.fullName}"/></p>
							<p><c:out value="${model.clientCode}"/> - <c:out value="${model.brhCode}"/></p>
						</span>
					</div>
					<div class="navbar-dropdown">
						<a href="<c:out value='${myaccturl}'/>" class="navbar-item">
							<span class="icon"><i class="fa fa-user"></i></span>&nbsp;&nbsp;My Account
						</a>
						<a href="<c:out value='${logouturl}'/>" class="navbar-item">
							<span class="icon"><i class="fa fa-sign-out"></i></span>&nbsp;&nbsp;Sign Out
						</a>
					</div>
		   		</div>
		   		
			  	<div class="navbar-item">
					<div>
						<h4 class="subtitle runningbalance"></h4>
						<p id="systemtimeandday"></p>
						<input id="systemdatetime" type="hidden" />
						<c:if test="${model.clientCode eq 'RNT'}">
							<p style="margin:-5px;padding:0;font-style:italic;text-align:center">
								You are currently on <span class="projectmode"><fmt:message key="project.mode"/></span> mode.
							</p>
							<script type="text/javascript">		
								$(document).ready(function () {
									$(".projectmode").css("color", "#ff0101");
									$(".projectmode").css("font-weight", "bold");
									$(".projectmode").css("font-size", "14");
									(function blink() { 
									    $('.projectmode').fadeOut(500).fadeIn(500, blink); 
									})();
								});
							</script>
						</c:if>
					</div>
			  	</div>
			  	
			  	<div class="navbar-item has-dropdown is-hoverable notifications-button">
					<div class="navbar-link">
						<i class="fa fa-info-circle is-24"></i>
					</div>
					<div class="navbar-dropdown">
						<div class="navbar-item">
							<div class="content">
								<div class="title">Notifications</div>
								<ul id="notif" class="list"></ul>
								<div class="has-text-centered">
									<c:url value="${pathinfo}ViewEntryForm2.htm" var="viewallnotifs">
										<c:param name="programName" value="MSG_ViewNotification"/>
									</c:url>
									<a class="button is-blue" href="<c:out value='${viewallnotifs}'/>">View All</a>
								</div>
							</div>
						</div>
					</div>
			  	</div>
		   	</div>
		</nav>
		
		<!-- TABLET HEADER -->
		<div class="container header-mobile">
		    <div class="columns is-mobile is-vcentered">
		        <div class="column is-2">
		            <a href="#"><img src="${imgdir}logo_med.png" class="logo" style="height:40px"></a>
		        </div>
		        <div class="column is-9">
		            <div class="columns is-mobile">
		                <div class="column is-6" style="padding-top:12px">
		                    <span class="icon"><i class="fa fa-user"></i></span>
		                    <span><c:out value="${model.fullName}"/></span><br />
		                    <a href="<c:out value='${myaccturl}'/>" class="navbar-item-mobile">
								<span class="icon" style="margin-left:15px"><i class="fa fa-user"></i></span>&nbsp;&nbsp;My Account
							</a>&nbsp;
							<a href="<c:out value='${logouturl}'/>" class="navbar-item-mobile">
								<span class="icon"><i class="fa fa-sign-out"></i></span>&nbsp;&nbsp;Sign Out
							</a>
		                </div>
		                <div class="column is-3" style="padding-top:20px">
		                    <span class="icon"><i class="fa fa-bell"></i></span>
		                    <span><span id="notifCtrMobile">0</span> Notifications</span>
		                </div>
		                <div class="column is-3" style="padding-top:20px">
		                    <span class="icon"><i class="fa fa-money"></i></span>
		                    <span class="runningbalance-mobile"></span>
		                </div>
		            </div>
		        </div>
		        <div class="column is-1">
		            <a href="#" class="burger-nav button">
		                <span class="">
		                    <i class="fa fa-bars"></i>
		                </span>
		            </a>
		        </div>
		    </div>
		</div>
		<div class="container" id="mobile-nav" style="display:none">
			${model.cmMobileMenu}
		</div>
