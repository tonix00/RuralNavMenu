
		<script type="text/javascript">		
			$(document).ready(function () {
				//balance notification
				var formlogin = "${model.loginName}";
				if (formlogin) {
					$.get(getContextPath() + "/jsp/ajax/balance-ajax.jsp", {formlogin:formlogin}, function(data) {
						var balance = 0.00;
						var limit = 10000.00;
						balance = Number(data.replace(dsxcommon.regex.notCurrency, '')); //remove commas
						$(".runningbalance").html("\u20B1 " + data);
						$(".db-balance").html("\u20B1 " + data);
						$(".runningbalance-mobile").html("&nbsp;" + data);
						if (balance < limit) {	
							$(".runningbalance").css("color", "#ff0101");
							$("#db-balance-container").addClass("is-red");
							$("#db-balance-container i").addClass("fa-exclamation-triangle");
							$(".bal-stat-msg").text("Danger");
							(function blink() { 
							    $('.runningbalance').fadeOut(500).fadeIn(500, blink); 
							})();
						}
						else if (balance == limit) {
							$(".runningbalance").css("color", "#924607");
							$("#db-balance-container").addClass("is-orange");
							$("#db-balance-container i").addClass("fa-exclamation-triangle");
							$(".bal-stat-msg").text("Reload");
						}
						else {
							$(".runningbalance").css("color", "#228B22");
							$("#db-balance-container").addClass("is-green");
							$("#db-balance-container i").addClass("fa-check-circle");
							$(".bal-stat-msg").text("Ok");
						}
					});
				}
				
				//for today's transactions
				var clientCode = "${model.clientCode}";
				var brhCode = "${model.brhCode}";
				if ((!clientCode) || (!brhCode)) {}
				else {
					$.get(getContextPath() + "/jsp/ajax/daily-transactions-ajax.jsp", {trnType:"", clientCode:clientCode, brhCode:brhCode}, function(data) {
						var d = JSON.parse(data);
						if (d.withData && d.withData == "Y") {
							$.each(d.dailyTrns, function(key, value) {
								var trnInfo = value.split(':');
								var trnRow = 
									'<tr>' + 
										'<td class="has-text-left">' + trnInfo[0] + '</td>' + 
										'<td class="has-text-left">' + trnInfo[1] + '</td>' + 
										'<td class="has-text-left">' + trnInfo[2] + '</td>' + 
										'<td class="has-text-right">' + trnInfo[3] + '</td>' + 
									'</tr>';
								$('#daily-trns-table').append(trnRow);
						 	});
						}
						else {
							var emptyRow = 
								'<tr>' + 
									'<td class="has-text-left">-</td>' + 
									'<td class="has-text-left">-</td>' + 
									'<td class="has-text-left">-</td>' + 
									'<td class="has-text-right">0.00</td>' + 
								'</tr>';
							$('#daily-trns-table').append(emptyRow);
						}
					});
				}
				
				//for insurance sales and teller/referrer/encoder incentives
				if ((!clientCode) || (!brhCode)) {}
				else {
					$.get(getContextPath() + "/jsp/ajax/daily-transactions-ajax.jsp", {trnType:"insSales", clientCode:clientCode, brhCode:brhCode}, function(data) {
						var d = JSON.parse(data);
						if (d.withData && d.withData == "Y") {
							$.each(d.insSales, function(key, value) {
								var trnInfo = value.split(':');
								var trnRow = 
									'<tr>' + 
									'<td class="has-text-right">' + trnInfo[0] + '</td>' + 
									'<td class="has-text-left">' + trnInfo[1].toUpperCase() + '</td>' + 
									'<td class="has-text-right">' + trnInfo[2] + '</td>' + 
									'<td class="has-text-left">' + trnInfo[3].toUpperCase() + '</td>' + 
									'<td class="has-text-right">' + trnInfo[4] + '</td>' +
									'</tr>';
								$('#monthly-cms-table').append(trnRow);
						 	});
						}
						else {
							var emptyRow = 
								'<tr>' + 
								'<td class="has-text-right">0.00</td>' + 
								'<td class="has-text-left">-</td>' + 
								'<td class="has-text-right">0.00</td>' + 
								'<td class="has-text-left">-</td>' +
								'<td class="has-text-right">0.00</td>' +
								'</tr>';
							$('#monthly-cms-table').append(emptyRow);
						}
					});
				}
				
				//for notification
				if ((!clientCode)) {}
				else {
					$.get(getContextPath() + "/jsp/ajax/notification-ajax.jsp", {clientCode:clientCode}, function(data) {
						var d = JSON.parse(data);
						var ctr = 0;
						if (d.notification) {
							$.each(d.notification, function(key, value) {
								if (ctr < 3) {
									var trnInfo = value;
									var trnRow = '<li class="has-text-left">' + trnInfo + '</li>';
									$('#notif').append(trnRow);
									$('#notifMobile').append(trnRow);
								}
								ctr++;
						 	});
							$('#notifCtr').text(ctr);
						}
					});
				}
			})
		</script>
		
		
		