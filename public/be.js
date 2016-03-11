$(function() 
{
	var timer = null;
	var pic = $(".be-slider");
	var TO = 2.5;
	var oUl = pic.children("ul");
	var aImg = pic.find("img");
	var imgWidth = parseFloat(pic.css("width")) || pic.prop("offsetWidth");
	var scrWidth = parseFloat($(window).width() || $(document).width() ) ;

	//图片初始化
	oUl.css("width",  aImg.length * 100 + '%');
	oUl.children('li').css("width", oUl.width() / aImg.length);
	aImg.css("height",scrWidth / TO + 'px');
	oUl.parent().css("height",  scrWidth / TO + 'px');

	//写入指示点标签
	var point_tag = '<ol>';
	for( n=0; n<aImg.length; n++){ point_tag += "<li><i></i></li>" ;}
	point_tag += "</ol>"
	$(pic).append(point_tag);

	//指示点初始化
	$('li:nth-of-type(1)').addClass('active');
	$(pic).children('ol').css({'bottom':'.1rem',
		'left':scrWidth / 2 -$(pic).children('ol').width()/TO});

	var i = 0;
	timer = setInterval(function() 
	{
		//设置指示点
		i < aImg.length - 1 ? i++ : i=0;
		var point = ' li:nth-of-type('+(i+1)+')';
		$(point).siblings().removeClass();
		$(point).addClass('active');

		oUl.animate({
			"left": "-" + imgWidth + 'px'
		}, 500, function(){
			oUl.children("li:first").insertAfter(oUl.children("li:last"));
			oUl.css("left", 0);
		});
	}, 5000);

});
