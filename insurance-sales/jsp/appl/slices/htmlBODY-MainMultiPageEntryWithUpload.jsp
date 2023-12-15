<%@ include file="../includes/include-JSTL.jsp" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

		<section class="hero is-info">
		 	<div class="hero-body">
		    	<div class="container">
		    		<div class="columns">
		    			<div class="column is-4">
				      		<h1 class="title"><c:out value="${model.moduleName}"/></h1>
				      		<h2 class="subtitle"><c:out value="${model.programTitle}"/></h2>
				    	</div>
				    	<div class="column is-8">
				    		${model.topFormButtonsTags}
			    		</div>
		    		</div>
		    	</div>
		  	</div>
		</section>
		
		${model.formTabsTags}
		 
	 	<section class="main-content">
			<div class="container">
				<div class="columns">
					<c:choose>
					<c:when test="${not empty model.sidebarTags}">
					${model.sidebarTags}
					<div class="column">
					</c:when>
					<c:otherwise>
					<div class="column">
					</c:otherwise>
					</c:choose>
						${model.errorMessageTags}
						<form:form enctype="multipart/form-data" action="MultiPageEntryWithUploadForm.htm" method="post" commandName="${model.commandName}" id="form-id">
							${model.multiPageEntryFormTags}
						</form:form>
						${model.consoleOutputTags}
						<c:if test="${not empty model.bottomFormButtonsTags}">
						${model.bottomFormButtonsTags}
						</c:if>
						<c:if test="${not empty model.bottomFormButtonsFormFooterTags}">
						${model.bottomFormButtonsFormFooterTags}
						</c:if>
					</div>
				</div>
   			</div>
		</section>
