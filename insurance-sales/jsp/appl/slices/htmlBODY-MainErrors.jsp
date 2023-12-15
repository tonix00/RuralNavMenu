<%@ include file="../includes/include-JSTL.jsp" %>

		<section class="hero is-info">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">RuralNet</h1>
					<h2 class="subtitle">Dashboard</h2>
				</div>
			</div>
		</section>
		
		<section class="main-content">
			<div class="container">
				<div class="columns">
					<div class="column is-12">
						<div class="notification is-red">
							<div class="columns">
								<div class="column is-1-half">
									<span class="icon is-medium">
										<i class="fa fa-times-circle"></i>
									</span>
								</div>
								<div class="column is-11-half">
									<h3 class="title"><c:out value="${model.errorMessage}"/></h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<section class="main-content" style="margin-top:10px">
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
								<table class="table">
									<tr>
										<th>Category</th>
										<th>Module</th>
										<th>Account Name</th>
										<th>Account Number</th>
										<th>Amount</th>
									</tr>
									<tr></tr>
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
								<div class="columns notification-container">
									<div class="column is-6">
										<div class="columns">
											<div class="column is-3">
												<span class="icon-5x"><i class="fa fa-user"></i></span>
											</div>
											<div class="column details-container">
												<h1><strong><c:out value="${model.fullName}"/></strong></h1>
												<h2>(<c:out value="${model.loginName}"/>)</h2>
											</div>
										</div>
									</div>
									<div class="column is-6">
										<div class="columns">
											<div class="column is-3">
												<span class="icon-5x"><i class="fa fa-bell"></i></span>
											</div>
											<div class="column details-container pad-left-20">
												<h1><strong>0</strong> Notifications</h1>
												<a href="#" class=""><h2>Read Now</h2></a>
											</div>
										</div>
									</div>
								</div>
								
								<div id="db-balance-container" class="notification">
									<span class="content">
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
												 		<div class="column is-3">
												 			<a id="up-dep-slip" href="#upload" class="button mfp-inline">Upload Deposit Slip</a>
												 		</div>
														<div id="upload" class="mfp-hide">
															<div class="white-popup info">
																<div class="header">Upload Deposit Slip Form</div>
																<div class="content">
																	<form action="">
																		<div class="control">
																			<input type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1">
																			<label for="file-1">
																				<span class="icon"><i class="fa fa-upload"></i></span>
																				<span class="file-label">Upload Deposit Slip Form</span>
																			</label>
																		</div>
																
																		<div class="control">
																			<label>Description</label>
																			<textarea class="textarea"></textarea>
																		</div>
																
																		<div class="modal-btn-group">
																			<button class="button is-info">Submit</button>
																		</div>
																	</form>
																	<div class="is-clearfix"></div>
																</div>
															</div>
														</div>
											 		</div>
											  	</div>
										  	</div>
									 	</article>
									</span>
								</div>
		
								<div class="notification <?php echo $nc = $color[array_rand($color)];?> alert-container" style="display:none">
									<div class="columns has-text-centered">
										<div class="column">P 95,000.00</div>
										<div class="column is-narrow">
										<!--
										NOTE:
										available colors:
										change the is-red class below to one of the following to change background color
										1. is-green
										2. is-red
										3. is-orange
										-->
											<div class="fileUpload is-red" id="docsection-file-upload">
												<div class="button-skin">
													<span class="icon">
														<i class="fa fa-file" style="font-size:16px;color:black;"></i>
													</span>
													<span class="icon-label">Upload Deposit</span>
												</div>
												<input type="file" class="upload" id="upload_doc" name="upload_doc">
												<input type="hidden" id="doc_file" name="doc_file">
											</div>
										</div>
										<div class="column">
											<div class="notification-status">
											STATUS: DANGER
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

