/*
function systemtimeandday() {
	var newsFeedData = getContextPath() + "/jsp/ajax/servertime-ajax.jsp"; 
	$.get(newsFeedData, function(data) {
		document.getElementById('systemtimeandday').innerHTML = data;
	});
	setTimeout('systemtimeandday()', 1000);
}
*/

function getContextPath() {
	return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
}

function systemtimeandday() {
	var serverTimeData = getContextPath() + "/jsp/ajax/servertime-ajax.jsp";
	$.get(serverTimeData, function(data) {
		document.getElementById('systemdatetime').value = data;
		document.getElementById('systemtimeandday').innerHTML = data;
	});
	setInterval('updateTime()', 1000);
}

function updateTime() {
	var currentDateTime = document.getElementById('systemdatetime').value;
	var newDateTime = new Date('' + currentDateTime + '');
	newDateTime.setSeconds(newDateTime.getSeconds() + 1);
	document.getElementById('systemdatetime').value = newDateTime;
	document.getElementById('systemtimeandday').innerHTML = moment(newDateTime).format('dddd, MMMM DD, YYYY, h:mm:ss A');
}
