<%@ include file="../includes/include-JSTL.jsp" %>

		<section class="hero is-info"> <!-- is-hidden-tablet-only -->
			<div class="hero-body">
				<div class="container">
					<h1 class="title">RuralNet</h1>
					<h2 class="subtitle">Dashboard</h2>
				</div>
			</div>
		</section>
		
		<section class="main-content"> <!-- style="margin-top:10px" -->
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="card" style="width:100%">
							<header class="card-header material-neutral">
							    <p class="card-header-title material">
							      Today's Transactions
							    </p>
							</header>
							<div class="card-content">
								<table class="table" id="daily-trns-table">
									<tr>
										<th class="has-text-left">MEMBER</th>
										<th class="has-text-left">TYPE</th>
										<th class="has-text-left">PARTICULARS</th>
										<th class="has-text-right">AMOUNT</th>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="card" style="width:100%">
							<header class="card-header material-neutral">
							    <p class="card-header-title material">Funding & Notifications</p>
							</header>
							<div class="card-content">
								<div class="columns is-multiline notification-container is-mobile">
									<div class="column is-6-desktop is-12-mobile">
										<div class="columns is-mobile">
											<div class="column is-3">
												<span class="icon-5x"><i class="fa fa-user"></i></span>
											</div>
											<!-- <div class="column details-container pad-left-20"> -->
											<div class="column details-container has-text-right">
												<h1><strong><c:out value="${model.fullName}"/></strong></h1>
												<h2>(<c:out value="${model.loginName}"/>)</h2>
											</div>
										</div>
									</div>
									<div class="column is-6-desktop is-12-mobile">
										<div class="columns is-mobile">
											<div class="column is-3">
												<span class="icon-5x"><i class="fa fa-bell"></i></span>
											</div>
											<!-- <div class="column details-container pad-left-20"> -->
											<div class="column details-container has-text-right">
												<h1><strong><span id="notifCtr">0</span></strong> Notifications</h1>
												<c:url value="${pathinfo}ViewEntryForm2.htm" var="viewallnotifs">
													<c:param name="programName" value="MSG_ViewNotification"/>
												</c:url>
												<a href="<c:out value='${viewallnotifs}'/>"><h2>Read Now</h2></a>
											</div>
										</div>
									</div>
								</div>
								
								<div id="db-balance-container" class="notification">
									<span class="content no-margin-bottom">
										<article class="media">
										  	<figure class="media-left">
										   		<span class="icon is-large">
										   			<i class="fa"></i>
										   		</span>
										  	</figure>
										  	<div class="media-content">
											  	<div class="content">
													<div class="columns">
														<div class="column is-three-fourths">
												 			<h1 style="color:white;margin:0;"><span class="db-balance"></span></h1>
												 			<h2 style="color:white;margin:0;">Status: <span class="bal-stat-msg"></span></h2>
												 		</div>
											 		</div>
											  	</div>
										  	</div>
									 	</article>
									</span>
									<c:url value="${pathinfo}UploadWithPreviewForm.htm" var="setupfunding">
										<c:param name="programName" value="SET_SetupFunding"/>
									</c:url>
									<a class="button" id="up-dep-slip" href="<c:out value='${setupfunding}'/>">
										Upload Deposit Slip
									</a>
								</div>
								
							</div>
						</div>
						
						<!-- START OF TELLER INCENTIVES/COMMISSION CHART -->
						<div class="card" style="width:100%;margin-top:20px">
							<header class="card-header material-neutral">
						    	<p class="card-header-title material">
						      		Incentives as of 
						      		<script>
							      		document.write(new Date().toLocaleString('en-us', { 
							      		    year: 'numeric',
							      		    month: 'long',
							      		    day: 'numeric',
							      		}));
						      		</script>
						    	</p>
							</header>
							<div class="card-content">
								<table class="table dt" id="monthly-cms-table">
									<tr>
										<th class="has-text-right">SALES</th>
										<th class="has-text-left">REFERRER</th>
										<th class="has-text-right">REFFERER INCENTIVES</th>
										<th class="has-text-left">ENCODER</th>
										<th class="has-text-right">ENCODER INCENTIVES</th>
									</tr>
								</table>
							</div>
						</div>
						<!-- END OF TELLER INCENTIVES/COMMISSION CHART -->
						
					</div>
				</div>
			</div>
		</section>
