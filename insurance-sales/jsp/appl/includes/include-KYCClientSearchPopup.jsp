<%@ include file="../includes/include-JSTL.jsp" %>
		
		<c:if test="${model.programName eq 'PRC_EnterRequest' or model.programName eq 'RMT_SendRemittance' or 
					  model.programName eq 'RMT_AmendRemittance'}">
					  
		<!-- KYC CLIENTS SEARCH POPUP -->
		<div id="inline-element" class="mfp-hide">
			<div class="white-popup info">
				<div class="header">
					- 
					<span class="icon is-large is-pulled-right closebtn">
						<i class="fa fa-times-circle-o" aria-hidden="true"></i>
					</span>
				</div>
				<div class="content">
					<table class="table table-search popup-result" id="table-search" data-target="#item-details"></table>
				</div>
			</div>
			<script src="${jsdir}kyc-scripts.js"></script>
		</div>
		<!-- END OF KYC CLIENTS SEARCH POPUP -->
		</c:if>
		