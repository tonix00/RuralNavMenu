
function showFirstPage() {
	//check if currently in first page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	if (pageNo == 1) {
	  return false;
	}
	//hide previous page
	hidePage();
	//display the first page
	document.getElementById("pageNo").value = "1";
	showPage();
	return false;
}

function showPreviousPage() {
	//check if currently in first page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	if (pageNo == 1) {
	  return false;
	}
	//hide previous page
	hidePage();
	//display the previous page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	pageNo = pageNo - 1;
	if (pageNo == 0) {
		pageNo = 1;
	}
	document.getElementById("pageNo").value = pageNo;
	showPage();
	return false;
}

function showNextPage() {
	//test if currently in last page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	var totalPages = parseInt(document.getElementById("totalPages").value);
	if (pageNo == totalPages) {
		return false;
	}
	//hide previous page
	hidePage();
	//display the next page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	var totalPages = parseInt(document.getElementById("totalPages").value);
	pageNo++;
	if (pageNo > totalPages) {
		pageNo = totalPages;
	}
	document.getElementById("pageNo").value = pageNo;
	showPage();
	return false;
}

function showLastPage() {
	//test if currently in last page
	var pageNo = parseInt(document.getElementById("pageNo").value);
	var totalPages = parseInt(document.getElementById("totalPages").value);
	if (pageNo == totalPages) {
		return false;
	}
	//hide previous page
	hidePage();
	//display the last page
	var totalPages = parseInt(document.getElementById("totalPages").value);
	document.getElementById("pageNo").value = totalPages;
	showPage();
	return false;
}

function hidePage() {
	var currentPage = parseInt(document.getElementById("pageNo").value);
	var id = "pageNo" + currentPage;
	document.getElementById(id).style.visibility = "hidden";
	document.getElementById(id).style.display = "none";
}

function showPage() {
	var currentPage = parseInt(document.getElementById("pageNo").value);
	var id = "pageNo" + currentPage;
	document.getElementById(id).style.visibility = "visible";
	document.getElementById(id).style.display = "block";
}
