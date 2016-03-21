//=========================== 设置  ===================================
//设置html
function setList( obj){
	block='<div class="be-border-b"> '
			+ '<span> <span class="fa-stack"> '
			+ '<i class="fa fa-square fa-stack-2x" style="color:'+obj.color+'"></i> '
				+ '<i class="fa fa-' +obj.icon+ ' fa-stack-1x fa-inverse"></i> '
			+ '</span>' + obj.title + '</span> '
			+ '<label> ';

	if( obj.type != 'input' ){
		block += '<i class="fa fa-angle-right"></i></label></div>';
		$('#'+ obj.id).append( block );
		beClick( '#'+ obj.id, obj.type, obj.list );
	}else{
		block += '<input type="text" placeholder='+obj.holder + '></label></div>';
		$('#'+ obj.id).append( block );
	}

}

//=========================== 点击 ===================================
var vals = {};//当前页所有选择项的值

//点击方法总入口
function beClick( obj, kinds, val){
	$(obj).click(function(){
		if( kinds == 'checkbox'){
			checkboxClick( $(this), val );
		}else{
			radioClick( $(this), val );
		}
	})
}

//多选方法
function checkboxClick( obj, initItems ){
	var liTag = obj;
	var ulTag = obj.parent();
	if( vals[obj.attr('id')] == undefined ){
		vals[obj.attr('id')] = [];
	}
	ulTag.parent().append( checkboxInit( initItems,vals[obj.attr('id')]) );
	ulTag.css('margin-left','-100%');

	ulTag.siblings('ol').children('li').click(function(){
		checkboxMark( $(this), liTag, vals[obj.attr('id')] );
	})
}

//多选标记选择项目
function checkboxMark( obj, li, arr ){
	if ( obj.attr('class') != 'button be-border-tb') {
		if( obj.children().size() == 0 ) {
			arr.push( obj.html() );
			obj.append('<i class="fa fa-check"></i>');
		}else{
			obj.children('i').remove();
			for( i=0; i<arr.length; i++){
				if( arr[i] == obj.html() ){
					arr.splice(jQuery.inArray( obj.html(), arr),1); 
				}
			}
		}
	}else{
		li.parent().css("margin-left","0");
		timeoutDel( li.parent().siblings());
		if( li.children().size() == 0){
			li.find('label').prepend('<em><span>'+ arr.length + '</span></em>');
		}else{
			li.find('label').children('em').remove();
			if( arr.length ==1 ){
				li.find('label').prepend('<em>'+ arr[0]+ '</em>');
			}else{
				if(arr[0] != undefined){
					li.find('label').prepend('<em>'+ arr[0]+ ' ...</em>');
				}
			}
		}
		if( li.find('label').find('span').html() == 0){
			li.find('label').children('em').remove();
		}
	};
}

//多选初始化
function checkboxInit( items, arr ){
	var lineBlk = '';
	var flag = 0;
	for(i=0; i<items.length; i++){
		for ( a=0; a<arr.length; a++){
			if( items[i] == arr [a]){
				flag = 1;
			}
		}
		if( flag == 1 ){
			lineBlk += '<li class="be-border-b">'+items[i];
			lineBlk += '<i class="fa fa-check"></i></li>';
			flag = 0;
		}else{
			lineBlk += '<li class="be-border-b">'+items[i]+'</li>';
		}
	}
	lineBlk += '<li class="button be-border-tb">';
	lineBlk += '<i class="fa fa-angle-left"></i> back </li>'
	lineBlk = '<ol>' + lineBlk + '</ol>';
	return lineBlk;
}

//单选方法
function radioClick( obj, initItems ){
	var liTag = obj;
	var ulTag = obj.parent();
	ulTag.parent().append( radioInit( initItems, vals[obj.attr('id')] ) );
	ulTag.css('margin-left','-100%');

	ulTag.siblings('ol').children('li').click(function(){
		var handle = $(this);
		vals[obj.attr('id')] = radioMark( $(this), vals[obj.attr('id')], liTag);
		ulTag.css('margin-left','0');
		timeoutDel( handle.parent() );
	})
}
	
//延时删除
function timeoutDel( obj){
	setTimeout(function(){
		obj.remove();
	},500);
}

//单选初始化
function radioInit( items, val ){
	var lineBlk = '';
	for(i=0; i<items.length; i++){
		if( items[i] == val ){
			lineBlk += '<li class="be-border-b">'+items[i];
			lineBlk += '<i class="fa fa-check"></i></li>';
		}else{
			lineBlk += '<li class="be-border-b">'+items[i]+'</li>';
		};
	}
	lineBlk = '<ol>' + lineBlk + '</ol>';
	return lineBlk;
}
//单选标记当前选项
function radioMark( obj, selectedVal, chObj ){
	obj.parent().find('i').remove();
	selectedVal = obj.html();
	if( obj.children().size() == 0 ){
		chObj.find('label').children('em').remove();
		chObj.find('label').prepend('<em>'+ obj.html() + '</em>');
		obj.append( '<i class="fa fa-check"></i>');
	};
	return selectedVal;
}

