
$(document).ready(function() {
	
	//set select (select2) width to the highest drop-down item
	$(".select-search").each(function() {
		var elemName = $(this).attr('name');
		var maxLen = 0;
		$("[name=" + elemName + "] option").each(function() {
	        if ($(this).text().length > maxLen) { maxLen = $(this).text().length; }
		});
		
		var width = maxLen * 6.5;
		var minWidth = 120;
		if (width < minWidth) { width = minWidth; }  
	    $("[name=" + elemName + "]").css('width', width + 'px');
	});
	$(".select-search").select2({ width: 'element' });
	$(".select-search-download").select2({ width: '90%' });
	
	//var $toggle = $('#nav-burger');
    //var $menu = $('#mobile-nav');
	
	//data tables
	$('.dt').DataTable({
		"aaSorting": []
	});
	
//    $toggle.click(function() {
//        $(this).toggleClass('is-active');
//        $menu.toggleClass('is-active');
//
//		if ($(this).hasClass("is-active")) {
//			$('#nav-burger i:first').removeClass('fa fa-bars');
//			$('#nav-burger i:first').addClass('fa fa-times');
//		}
//		else {
//			$('#nav-burger i:first').removeClass('fa fa-times');
//			$('#nav-burger i:first').addClass('fa fa-bars');
//		}
//    });
    
	$(window).scroll(function() {
        var headerHeight = $('nav').height();
        if ($(window).scrollTop() > headerHeight) {
            $('nav.nav').addClass('navbar-fixed');
            $('.dropdown-content').addClass('dropdown-fixed');
        }
        else if ($(window).scrollTop() < headerHeight) {
            $('nav.nav').removeClass('navbar-fixed');
            $('dropdown-content').removeClass('dropdown-fixed');
        }
    });
	
    $(".dropdown-button").click(function(e) {
        var me = $(this);
		var anchor = $(this).data("anchor");
        if (me.hasClass('collapse') == true) {
			$(".white-fence").removeClass("active");
            $("#full-content").slideUp('fast');
            $(".dropdown-button").removeClass("collapse");
			$(".open-nav").show();
			$(".close-nav").hide();
        }
        else {
			$(".white-fence").removeClass("active");
			$(".dropdown-button").removeClass("collapse");
            me.addClass('collapse');
			$(".open-nav").hide();
			$(".close-nav").show();
            $("#full-content").slideDown();
			$("#"+anchor).addClass("active");
        }
    });
	
	$(document).on("click", ".notifications-button", function(e) {
        var me = $(this);
        if (me.hasClass('collapse') == true) {
            $("#notifications-dropdown").slideUp('fast');
            $(".notifications-button").removeClass("collapse");
			$(".open-nav").show();
			$(".close-nav").hide();
        }
        else {
			$(".notifications-button").removeClass("collapse");
            me.addClass('collapse');
			$(".open-nav").hide();
			$(".close-nav").show();
            $("#notifications-dropdown").slideDown();
        }
    });
	
	$(".customdropdown-mask").click(function(e) {
		$(this).next(".options-dropdown").toggle();
	});
	
	$(".options-dropdown").click(function(e) {
		var me = $(this);
		var con2 = me.parent(".customdropdown");
		var type = con2[0].attributes[1].nodeValue;
		var arr = e.target.parentNode.attributes;
		var parent = e.target.parentNode;
		var string = "";
		var valuestring = "";
		
		if (type=="multiple") {
			if ($(parent).hasClass("active")) {
				$(parent).removeClass("active");
			}
			else {
				$(parent).addClass("active");
			}
			
			var value = arr[0].nodeValue;
			var con = me.prev(".customdropdown-mask");
			var selected = con.find(".selected-value").html();
			var active = me.find("tr.active");
			active.each(function (index, value) {
				string += '<span class="tag is-info">' + $(this)[0].attributes[0].nodeValue + '</span>';
				valuestring += $(this)[0].attributes[0].nodeValue + ";";
			});
			
			con.find(".selected-value").html(string);
			con.find(".dropdown-value").val(valuestring);
		}
		else {
			me.find("tr").removeClass("active");
			$(parent).addClass("active");
			var value = arr[0].nodeValue;
			var con = me.prev(".customdropdown-mask");
			con.find(".selected-value").html(value);
			con.find(".dropdown-value").val(value);
			me.hide();
		}
	});
	
	$(".modalbtn").click(function(e) {
		e.preventDefault();
		me = $(this);
		target = me.data("target");
		$("#" + target).addClass("is-active");
	});

    $(".modal-close, .modal-close-button").click(function(e) {
		e.preventDefault();
		me = $(this);
		target = me.data("target");
		$("#" + target).removeClass("is-active");
	});

	$(".mfp-inline").magnificPopup({
		removalDelay: 500, //delay removal by x to allow out-animation
		type: 'inline',
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true //allow opening pop-up on middle mouse click. always set it to true if you don't provide alternative source.
	});
	
	$(".mfp-image").magnificPopup({
		removalDelay: 500, //delay removal by x to allow out-animation
		type: 'image',
		gallery: {
			enabled:true
		},
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true //allow opening pop-up on middle mouse click. always set it to true if you don't provide alternative source.
	});
	
	$(".mfp").magnificPopup({
		removalDelay: 500, //delay removal by x to allow out-animation
		type: 'ajax',
		showCloseBtn: false,
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true //allow opening pop-up on middle mouse click. always set it to true if you don't provide alternative source.
	});
	
	$("#form_valid, .form_valid").submit(function(e) {
		var req = $(this).find(".req");
		var i = 0;
		req.each(function() {
			if ($(this).val() == "") {
				i++;
				$(this).addClass('validate_unanswered');
			}
			else {
				$(this).removeClass('validate_unanswered');
				$(this).addClass('validate_completed');
			}
		});
	
		if (i > 0) {
			e.preventDefault();
		}
	});
	
	$("#file").change(function() {
		var value = $(this).val();
		var filename = value.replace(/.*(\/|\\)/, '');
		$("#filename-container").html(filename);
		$("#file-label").html("Uploading...");
		$("#receipt-upload").submit();
		$(this).attr("disabled", true);
	});
	
	//$(".chosen-select").chosen();
	
	$(document).on("click",".closebtn",function(e) {
		var magnificPopup = $.magnificPopup.instance; //save instance in a variable 
		magnificPopup.close(); //close pop-up that is currently opened
	});
	
	function updateProgress(evt) {
		console.log('updateProgress');
		if (evt.lengthComputable) {
			var percentComplete = evt.loaded / evt.total;
			percentComplete = percentComplete * 100;
			$(".customprogress").val(parseInt(percentComplete));
		}
		else {
			console.log('unable to complete'); //unable to compute progress information since the total size is unknown
		}
	}
	
	$(document).on("change", ".formupload", function(e) {
		me = $(this);
		formdata = new FormData();
		var i = 0, len = this.files.length, file = this.files;
		formdata.append("file", file[0]);
		console.log(formdata);
		var file_type = file[0]['type'];
		var file_size = file[0]['size'];
		var file_size = parseInt(file_size) / 1000;
		console.log("size: " + file_size);
		console.log(file_type);
		
		if ((file_type != "application/msword") && (file_type != "application/pdf") && 
			(file_type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			
			$.magnificPopup.open({
				items: [{
					src: base + "site/invalid",
					type: 'ajax',
					removalDelay: 500
				}]
			});
			return;
		}
		
		$.ajax({
			url: base + "site/upload",
			type: "POST",
			data: formdata,
			dataType: "json",
			processData: false,
			contentType: false,
            cache: false, //disable page caching
            xhr: function() {  // custom xhr
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //check if upload property exists
                    myXhr.upload.addEventListener('progress', updateProgress, false); //for handling the progress of the upload
                }
                return myXhr;
            },
			beforeSend: function(xhr) {				
				me.parents(".formupload-container").hide();
				$(".in-progress").show();
				$(".in-progress").find(".title-container").html(file[0]['name']);
			},
			success: function (data) {
				console.log(data);
				$(".in-progress").hide();
				$(".formupload-container").hide();
				$(".upload-complete").show();
				$(".upload-complete > .complete-title").find("span").html(data['details']['name']);
				me.siblings(".formupload-container > .file-name").attr("value",data['details']['name']);
			},
			error: function (xhr, desc, err) {
				console.log(xhr);
			}
		});
	});
	
	$(document).on("click", ".remove-button", function(e) {
		e.preventDefault();
		$(this).closest(".upload-complete").hide();
		$(this).closest(".in-progress").addClass("customhide");
		$(this).parents().siblings(".formupload-container").find(".file-name").attr("value", " ");
		$(this).parents().siblings(".formupload-container").find(".formupload").val("");
		$(this).parents().siblings(".formupload-container").show();
	});
	
	$(document).on("change", ".confirm-checkbox", function(e) {
		if ($(this).is(':checked')) {
			$(this).parents(".confirmation-box").removeClass("is-green");
			$(this).parents(".confirmation-box").removeClass("is-orange");
			$(this).parents(".confirmation-box").addClass("is-green");
		}
		else{
			$(this).parents(".confirmation-box").removeClass("is-green");
			$(this).parents(".confirmation-box").removeClass("is-orange");
			$(this).parents(".confirmation-box").addClass("is-orange");
		}
	});
	
	$(document).on("click", ".options-account", function(e) {
		e.preventDefault();
		
		//set clicked option-button to active
		$(".options-account").removeClass("active");
		$(this).addClass("active");
	});
	
	//tips slider
	$('.one-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		pauseOnHover: true,
		autoplaySpeed: 8000
	});
	
	$(document).on("click", ".nav-menu-tablet a", function(e) {
        e.preventDefault();
        var me = $(this);
        var target = me.attr("data-target");

        $(".nav-menu-tablet a").removeClass("is-active");
        me.addClass("is-active");

        $(".tablet-nav-column").addClass("is-hidden");
        $("#" + target).removeClass("is-hidden");
        $("#" + target).addClass("is-flex");
    });
	
});
