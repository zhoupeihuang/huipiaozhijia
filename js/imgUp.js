$(function() {
	var delParent;
	var defaults = {
		fileType: ["jpg", "png", "bmp","gif", "jpeg","JPG", "PNG", "BMP","GIF", "JPEG"], // 上传文件的类型
		fileSize: 1024 * 1024 * 2 // 上传文件的大小 10M
	};
	
//	var dataFiles = [];
	/*点击图片的文本框*/
	var imgArr = [];
	$(".file").change(function() {
		var idFile = $(this).attr("id");
		var file = this;
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素

		//插入 文件数据
		var dataFiles = $(this).val();
		$(this).attr("data-files",dataFiles)
		$(this).attr("value",dataFiles)
		var fileList = file.files; //获取的图片文件
		var input = $(this).parent(); //文本框的父亲元素
		//遍历得到的图片文件
		var numUp = imgContainer.find(".up-section").length;
		
		//有时候 fileList会等于undefined 
//		fileList === undefined ? 0:fileList;
		if(fileList==undefined){
			fileList = [];
		} 
		var totalNum = numUp + fileList.length; //总的数量
		if(fileList.length > 1 || totalNum > 1) {
			alert("上传图片数目不可以超过1个，请删除后重新选择"); //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
		} else if(numUp < 2) {
			fileList = validateUp(fileList);
			var _this = this;
			for(var i = 0; i < fileList.length; i++) {
				(function() {
					var imgUrl = window.URL.createObjectURL(fileList[i]);
					imgArr.push(imgUrl);
					var $section = $("<section class='up-section fl loading'>");
					imgContainer.prepend($section);
					var $span = $("<span class='up-span'>");
					$span.appendTo($section);

					var $img0 = $("<img class='close-upimg'>").on("click", function(event) {
						event.preventDefault();
						event.stopPropagation();
						$(".works-mask").show();
						delParent = $(this).parent();
					});
					$img0.attr("src", "images/a7.png").appendTo($section);
					var $img = $("<img class='up-img up-opcity'>");
					$img.attr("src", imgArr[i]);
					$img.appendTo($section);
					var $p = $("<p class='img-name-p'>");
					$p.html(fileList[i].name).appendTo($section);
					var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
					$input.appendTo($section);
					var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
					$input2.appendTo($section);
						//隐藏下面的z_fil
					$(_this).parents(".z_file").hide();
					$($section).parents(".z_photo").next().show()
				})(i)
			}
			jisleft()
			imgArr = [];
//			$(this).val('')
		}
		setTimeout(function() {
			$(".up-section").removeClass("loading");
			$(".up-img").removeClass("up-opcity");
		}, 250);
		numUp = imgContainer.find(".up-section").length;
		if(numUp >= 5) {
			$(this).parent().hide();
		}
	});

	$(".z_photo").delegate(".close-upimg", "click", function() {
		$(".works-mask").show();
		delParent = $(this).parent();
		$(this).parents(".up-section").nextAll(".z_file").show();
	});
	
	$(".wsdel-ok").click(function() {
		$(".works-mask").hide();
		//console.info(imgArr);
		var numUp = delParent.siblings().length;
		if(numUp < 6) {
			delParent.parent().find(".z_file").show();
		}

		var s = delParent.parent().find(".z_file");
		$(s).children("input[type='file']").attr({"value":"","data-files":""})
		delParent.remove();
		
		 
	});

	$(".wsdel-no").click(function() {
		$(".works-mask").hide();
	});
	$(window).resize(function() {
		jisleft()
	});
	function jisleft(){
		var lefts = ($(window).width()-$(".mask-content").width())/2;
		$(".mask-content").css("left",lefts);
	}
	
	function validateUp(files) {
		var arrFiles = []; //替换的文件数组
	//	console.log(file)
		for(var i = 0, file; file = files[i]; i++) {
			//获取文件上传的后缀名
			var newStr = file.name.split("").reverse().join("");
			if(newStr.split(".")[0] != null) {
				var type = newStr.split(".")[0].split("").reverse().join("");
				if(jQuery.inArray(type, defaults.fileType) > -1) {
					// 类型符合，可以上传
					if(file.size >= defaults.fileSize) {
						//alert(file.size);
						alert('您这个"' + file.name + '"文件大小过大');
					} else {
						// 在这里需要判断当前所有文件中
						arrFiles.push(file);
					}
				} else {
					alert('您这个"' + file.name + '"上传类型不符合');
				}
			} else {
				alert('您这个"' + file.name + '"没有类型, 无法识别');
			}
		}
		return arrFiles;
	}

})