<%@ include file="../includes/include-JSTL.jsp" %>
		
		<c:if test="${model.programName eq 'KYC_Clients' or model.programName eq 'RMT_SendRemittance'}">
		<!-- ZIP CODE MODAL -->
		<div id="zipcode-modal" style="display:none;">
			<div class="zip-heading" style="width:20%">ZIPCODE</div>
			<div class="zip-heading" style="width:80%">ZIP NAME/DESCRIPTION</div>
			<table>
				<c:forEach var="zipMap" items="${model.zipCodesMap}">
				<tr>
					<td width="20%"><a href="#" class="zcode" rel="modal:close">${zipMap.key}</a></td>
					<td width="80%"><p>${zipMap.value}</p></td>
				</tr>
				</c:forEach>
			</table>
		</div>
		<!-- END OF ZIP CODE SCRIPTS & MODAL -->
		</c:if>
		