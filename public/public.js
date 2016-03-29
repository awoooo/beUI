$(function(){

	function(){}

	/* 评星函数开始 */
	$('.be-comment span i').click(function(){
		var span = $(this).parent();
		var count = span.find('.fa-star').size();
		if( $(this).attr('class') == 'fa fa-star-o'){
			for(var i=0; i<$(this).index()+1; i++){
				span.children('i').eq(i).removeClass().addClass('fa fa-star');
			}
		}else{
			if( span.find('.fa-star').size() > $(this).index() && count !=1 ){
				for(var i=5; i>$(this).index(); i--){
					span.children('i').eq(i).removeClass().addClass('fa fa-star-o');
				}
			}else{
				span.find('i').removeClass().addClass('fa fa-star-o');
			}
		}
	});
	/* 评星函数结束 */

	/* 公共开关控制开始 */
	$('.be-switch').click(function(){
		if( $(this).attr('class') == 'be-switch be-turn-off' ) {
			$(this).removeClass().addClass('be-switch be-turn-on');
		} else{
			$(this).removeClass().addClass('be-switch be-turn-off');
		}
	})
	/* 公共开关控制结束 */


	/* 打开超链接开始 */
	$('li[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; })
	$('span[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; })
	$('div[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; })
	$('i[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; })
	$('button[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; })
	/* 打开超链接结束 */

	/* 公共下拉列表菜单栏开始 */
	alertList('.be-form-multi');
	/* 公共下拉列表结束 */

	/* 公共搜索分类选择开始*/
	slideMenu ( '.be-search-list');
	slideMenu ( '.be-search-list-func');
	/* 公共搜索分类选择结束*/

	/* 常规公共多项选择框开始*/
	$('.be-check').click(function(){
		if( $(this).children('i').attr('class') == 'fa fa-circle-thin fa-lg'){
			$(this).children('i').removeClass().addClass('fa fa-check-circle fa-lg');
		}else{
			$(this).children('i').removeClass().addClass('fa fa-circle-thin fa-lg');
		}
	})
	/* 常规公共多项选择框结束*/

	/* ios公共多项选择框开始*/
	$('.common-checkbox li').click(function(){
		if( $(this).attr('class') == 'active' ){
			$(this).removeClass();
		}else{
			$(this).addClass('active');
		}
	})
	/* ios公共多项选择框结束*/

	
	/* ios公共单项选择框开始*/
	$('.common-checkbox-radio li').click(function(){
		$(this).siblings().removeClass();
		$(this).addClass('active');
	})
	/* ios公共单项选择框结束*/


	/* 公共tab标签开始*/
	//$('.be-tab-content li').css({'display':'block'});
	$('.be-tab-title li').click(function(){
		var num_index = ( $(this).index() );
		var node = $(this).parent().next('.be-tab-content').children('li');

		$(this).siblings().removeClass();
		$(this).addClass('active');

		node.each(function( i_index ){
			$(this).css({'display':'none'});
			if ( i_index == num_index ){
				$(this).css({'display':'block'});
			}
		});
	});
	/* 公共tab标签结束*/
	
	/*选择菜单切换开始 */
	var ul_node;
	$('.be-form-multi section').parent().click(function(){
		$('.be-form-multi').css({'margin':'0 100% 0 -100%'});
		$(this).children('section').css({ 'z-index':'-1'});
		$(this).children('section').css({ 'display':'block','left':'0'});
		ul_node = this;
		setTimeout(function () {
			$(ul_node).children('section').css({ 'z-index':'10'});
		},500);
	});//点击选项

	$('.be-form-multi ul li').click(function(){
		var node = $(this).parent().parent().siblings('div').children('div');
		var select_val = $(this).html();
		var return_val = $(this).html() + '<i class="fa fa-angle-right fa-fx"></i>';
		
		if ( $(this).html().indexOf('</i>') == -1 ) {
			node.html(return_val);
			select_val = $(this).html() + '<i class="fa fa-check fa-fx"></i>';
		}//判断是否重复选择

		//清除选择图标
		$(this).siblings().children('i').remove();
		$(this).html(select_val);

		setTimeout(function () {
			$('.be-form-multi').css({'margin':'0'});
			setTimeout(function () {
				$('.be-form-multi section').css({'display':'none'});
			},100);
			event.stopPropagation();
		},200);
	});
	/*选择菜单切换结束 */
	
});
/* 弹出列表函数 */
function alertList(className){
	$( className + ' ol').parent().click(function(event){
		var nodeName = $(event.target).parent().get(0).tagName;
		if( nodeName == 'DIV' ){
			$(this).children('ol').slideToggle();
		}
	});
	$( className + ' ol li').click(function(){
		var val = $(this).html() + '&nbsp;<i class="fa fa-caret-down fa-fx"></i>';
		$(this).parent().siblings('div').children('div').html(val);
		$(this).parent().slideUp();
	}); //下拉列表
	/* 公共下拉列表结束 */
}
        

/*滑块控制函数 */
function rangeTouch( idName){
	if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){

	document.getElementById(idName).addEventListener('touchstart', function(event){
		event.preventDefault();
		startX = event.touches[0].clientX;
	
	}, false);
	document.getElementById(idName).addEventListener('touchmove', function(event){
		event.preventDefault();
		endX = event.touches[0].clientX;

		var screenW = $(window).width();//get screen width;
		var barW = $('#'+idName).siblings('span').width();// get line width;
		var startPoint = (screenW - barW )/2;

		var precent = parseInt( (endX - startPoint) / barW * 100 ) + 1;

		//控制滑块动作
		if( ( endX < startPoint + barW) && (endX > startPoint) ){
			$('#' + idName).siblings('label').css({'width':endX - startPoint});
			$('#' + idName).css({'margin-left':endX - startPoint});
			//控制数字变化
			$('#'+ idName).parent().siblings('span:first').children('p').html(precent);
		} else if (endX <= startPoint){ } else{  }

	}, false);
	document.getElementById(idName).addEventListener('touchend', function(event){
	}, false);
	}
}


/*搜索框分类选择函数 */
function slideMenu( className ){
	$(className).children('label:first').click(function(){
		if( $(this).find('ul').css('display') == 'none') {
			$(this).find('ul').show();
			$(this).find('li').click(function(){
				$(this).parent().siblings('em').html( $(this).html() );
			});
		} else { $(this).find('ul').hide(); }
	});
}

/*加载头部函数 */
function getHeader( obj ){
	var str = '<header class="be-header">'
	+'<i class="fa fa-home fa-lg" data-href="/index.html"></i>'
	+'<i class="fa fa-bars fa-lg"></i>'
	+'<span><h1>' + obj.title + '</h1> </span>'
	+'<ol>';

	for( var i=0; i<obj.menu.length; i++){
		str += '<li data-href="'+ obj.menu[i].href + '">'+obj.menu[i].text 
		str	+= ' <i class="fa fa-'+obj.menu[i].icon +' fa-lg"></i></li>'
	}
	str += '</ol> </header>'
	str += '<div class="be-header-placeholder">&nbsp;</div>';
	$('body').prepend( str );

	$('li[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; });

	$('i[data-href]').click(function(){
		window.location.href =  $(this).attr('data-href') ; });

	$('.be-header > i:last').click(function(){
		$(this).siblings('ol').slideToggle();
	});
}


