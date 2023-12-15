
function getBanners(contextpath) {
	
	$.getJSON(contextpath + "banner-ajax.jsp", function(data) {
		var aitems = "";
		var msg = "";
		var message = new Array();
		var news = new Array();
		var jsonObj = [];
	    var newsItem = {};
	    var aItem = {};
	    
	    if (!jQuery.isEmptyObject(data.bannersList)) {
			$.each(data.bannersList, function(index, value) {
				message[index] = value;
			});
			
			for (var x = 0; x < message.length; x++) {
				newsItem = {};
				aItem = {};
				msg = message[x].split('/');
				if (msg[1] == 'BIG') {
					news[x] = msg[0];
					newsItem["title"] = 'Announcements, News & Updates';
					newsItem["html"] = $('<div>').addClass('banner-news').text(news[x]);
				    jsonObj.push(newsItem);
				}
				else {
					aitems += '************************************************************' + '\n\n';
					aitems += msg[0] + '\n\n';
				}
			}
			aitems += '************** NOTHING FOLLOWS ***************';
			aItem["title"] = 'Other Announcements, News & Updates';
			aItem["html"] = $('<div>').addClass('banner-announcements').text(aitems);
			jsonObj.push(aItem);
			
			swal.mixin({
				customClass: 'banner-container', 
				confirmButtonText: 'Next&nbsp;&rarr;', 
				allowOutsideClick: false, 
				allowEscapeKey: false
			}).queue(jsonObj);
		}
	});
				
}

