
function forgotPassword() {
	var good = true;
	var loginName = document.getElementById("loginName").value.toUpperCase();
	var year = document.getElementById("year").value;
	if (loginName == "" || loginName == "USERNAME") {
		document.getElementById("loginName").focus();
		document.getElementById("login-alert-container").style.display = "block";
		document.getElementById("login-alert-content").innerHTML = "The Login Name field is empty!";
		good = false;
		return good;
	}
	var el = document.getElementById("forgot-password");
	var href = el.href;
	el.href = href + "&loginName=" + loginName + "&year=" + year;
	return good;
}
