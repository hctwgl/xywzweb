/***
 * 待办工作
 * 作者 ：wangwan1@yuchengtech.com
 * 时间 ：2014-11-15
 * 版本 ：v1.0.0
 */
var panelId="workToDoInfoPanel";
var listReader = {
		mapping : [{name : 'WFJOBNAME'},
		           {name : 'WFNAME'},
		           {name : 'INSTANCEID'},
	          	   {name : 'AUTHOR'},
	          	   {name:'AUTHOR_NAME'},
	          	   {name : 'PRENODENAME'},
	          	   {name:'NODEPLANENDTIME'},
	          	   {name : 'NODENAME'}],
	     record:'<li>'
				+ '<div class="listCell lcBig" style="width:25%;">工作名称:@WFJOBNAME</div>'
				+ '<div class="listCell" style="width:25%;">流程名称:@WFNAME</div>'
				+ '<div class="listCell" style="width:25%;">发起人:@AUTHOR_NAME</div>'
				+ '<div class="listCell" style="width:25%;">上一办理人:@PRENODENAME</div>'
				+ '<div class="listCell" style="width:25%;">当前环节:@NODENAME</div>'
				+ '<div class="listCell" style="width:25%;">办理时效:@NODEPLANENDTIME</div>'
				+'</li>'
}
var config = {
	filter : false,
	pageConfig : {
		limit : 5,
		queryUrl : basePath + 'queryrestapplywait.json',
		listViewId : 'workToDoInfo_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
