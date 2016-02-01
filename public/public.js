$(function(){
	/* 公共头部菜单开始 */
	$('.be-header > i:last').click(function(){
		$(this).siblings('ol').slideToggle();
	});
	/* 公共头部菜单结束 */

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
	/* 打开超链接结束 */

	/* 公共下拉列表菜单栏开始 */
	alertList('.be-form-multi');
	/* 公共下拉列表结束 */

	/* 公共搜索分类选择开始*/
	slideMenu ( '.search-list');
	slideMenu ( '.search-list-func');
	/* 公共搜索分类选择结束*/


	/* 公共多项选择框开始*/
	$('.common-checkbox li').click(function(){
		if( $(this).attr('class') == 'active' ){
			$(this).removeClass();
		}else{
			$(this).addClass('active');
		}
	})
	/* 公共多项选择框结束*/

	
	/* 公共单项选择框开始*/
	$('.common-checkbox-radio li').click(function(){
		$(this).siblings().removeClass();
		$(this).addClass('active');
	})
	/* 公共单项选择框结束*/

	
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

