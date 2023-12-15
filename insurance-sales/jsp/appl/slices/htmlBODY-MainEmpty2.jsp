<%@ include file="../includes/include-JSTL.jsp" %>

		<section class="hero is-info"> <!-- is-hidden-tablet-only -->
			<div class="hero-body">
				<div class="container">
					<h1 class="title"><c:out value="${model.moduleName}"/></h1>
		      		<h2 class="subtitle"><c:out value="${model.programTitle}"/></h2>
				</div>
			</div>
		</section>
		
		<section class="hero">
			<div class="container">
				<div style="margin-bottom:10px">
					${model.horizontalMenu}
				</div>
				<hr>
			</div>
		</section>
		