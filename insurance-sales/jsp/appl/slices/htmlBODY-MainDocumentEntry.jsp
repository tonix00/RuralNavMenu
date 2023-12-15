<%@ include file="../includes/include-JSTL.jsp" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div id="formbox">
	<div id="formbody">
		<div id="formmiddle">
			<form:form action="DocumentEntryForm.htm" method="post" commandName="${model.commandName}">
				<div id="formtop">
					<div id="formtophdg">
						<span class="hdg18 bold"><c:out value="${model.programTitle}"/></span>
					</div>
					<div id="formtopbuttons">
						${model.formTopButtons}
					</div>
				</div>
				${model.documentEntryFormTags}
			</form:form>
		</div>
		<div id="formfooter">
			${model.formFooterTags}
		</div>
		${model.consoleOutputTags}
	</div>
</div>
