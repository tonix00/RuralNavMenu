<%@ include file="../includes/include-JSTL.jsp" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

		<section class="hero is-fullheight is-gradientblue">
			<div class="hero-body">
				<div class="container">
					<div class="columns has-text-centered">
						<div class="notification-login is-red" id="login-alert-container" style="display:none; margin:0 auto !important">
							<div class="columns is-vcentered">
								<div class="column is-1-half">
									<span class="icon is-large">
										<i class="fa fa-times-circle"></i>
									</span>
								</div>
								<div class="column is-11-half">
									<h3 class="title" id="login-alert-content" style="padding-right:12px"></h3>
								</div>
							</div>
						</div>
					</div>
					
					<div class="columns">
						<div class="column is-4 is-offset-4 is-transparent">
							<div class="well-login flat" style="border:1px solid">
								<div class="heading">
									Login to RuralNet
								</div>
						
								<form:form method="post" action="LoginForm.htm" commandName="user" id="login_info">
									<input type="hidden" name="programName" value="<c:out value='MGR_Login'/>">
									
									<div class="content-login">
										<label class="label">Username</label>
										<p class="control">
										  	<form:input path="loginName" cssClass="input form-control required" maxlength="15" autocomplete="off" />
										</p>
										
										<!-- disables auto-complete for loginName in firefox -->
										<input type="text" style="display:none">
										
										<label class="label">Password</label>
										<p class="control">
										  	<form:password path="password" cssClass="input form-control required" maxlength="15" autocomplete="off" />
										  	<i class="fa fa-eye" id="togglePassword" style="position: absolute; margin-top: 10px; margin-left: -25px; cursor: pointer"></i>
										</p>
										
										<label class="label">Year</label>
										<p class="control">
										 	<form:input path="year" cssClass="input form-control required" maxlength="4" autocomplete="off" />
										</p>
										
										<div id="submit-errors" style="display:none">
											<form:errors path="loginName"/>|<form:errors path="password"/><!-- |<form:errors path="brhCode"/> -->
										</div>
									</div>
								</form:form>
							</div>
							
							<div class="form-buttons">
								<div class="btn-group">
					            	<p class="control is-grouped is-pulled-left">
						            	<c:url value="${pathinfo}ForgotPasswordForm.htm" var="forgotpassword">
											<c:param name="programName" value="MGR_ForgotPassword"/>
										</c:url>
										<a class="footer-links" id="forgot-password" href="<c:out value='${forgotpassword}'/>" onclick="return forgotPassword(this)">
											<fmt:message key="login.forgot_password"/>
										</a>
						            </p>
									<p class="control is-grouped is-pulled-right">
										<button type="submit" name="submit" class="button is-primary validateform" form="login_info" data-form="login_info" value="Login">Login</button>
									</p>
									<div class="is-clearfix"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
