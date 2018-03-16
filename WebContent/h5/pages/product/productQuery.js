/***
 * 功能描述：产品查询
 *  作者 ：luoyad
 *  时间 ：2014-11-18
 *  版本 ：v1.0.0
 */

var listReader = {
		mapping : [{name : 'PRODUCT_ID'},
		           {name : 'PROD_NAME'},
	          	   {name : 'CATL_NAME'},
	          	   {name : 'STATUS_NAME'},
	          	   {name : 'LIMIT_TIME'},
	          	   {name : 'RATE'},
	          	   {name : 'COST_RATE'}],
	    record:''//@CUST_ID
			+ '<li><a href="javascript:productQueryShowDetail(\'@PRODUCT_ID\')">'
			+ '<div class="listCell lcBig" style="width:35%;">产品名称：@PROD_NAME<br/>产品分类：@CATL_NAME</div>'
			+ '<div class="listCell lcBig" style="width:20%;">产品状态：@STATUS_NAME<br/>期限：@LIMIT_TIME</div>'
			+ '<div class="listCell" style="width:20%;">利率：@RATE%<br/>费率：@COST_RATE%</div>'
			+ '<div class="listCell" style="width:25%;">预计年化收益率：@RATE%</div>'
			+'</a></li>'
}
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'productQueryAction.json',
		listViewId : 'productQuery_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
 
function addProductQuery() {
	createProductQueryPanel({},0);
}
/**
 * 创建详情panel
 * @param data panel信息,type 操作类型 0：新增 1 详情
 */
function createProductQueryPanel (data,type) {

	var prodId = mobileUtils.getDataToString(data.PRODUCT_ID);
	var prodName  = mobileUtils.getDataToString(data.PROD_NAME);
	var catlCode   = mobileUtils.getDataToString(data.CATL_NAME);
	var prodState = mobileUtils.getDataToString(data.STATUS_NAME);
	var limitTime = mobileUtils.getDataToString(data.LIMIT_TIME);
	var rate  = mobileUtils.getDataToString(data.RATE)+"%";
	var costRate  = mobileUtils.getDataToString(data.COST_RATE)+"%";
	
	var panelContent = '';
	var contentDiv = '';
	if(0 == type){
	
	}else if(1 == type){
		
		panelContent = 
			  '<div class="rightContainer"><div class="leftContainer"><div class="formContent viewContent">'

			 + '<div class="formCell"><label>产品名称：</label><div class="fcContent">'+prodName+'</div></div>'
			 + '<div class="formCell"><label>产品分类：</label><div class="fcContent">'+catlCode+'</div></div>'
			 + '<div class="formCell"><label>产品状态：</label><div class="fcContent">'+prodState+'</div></div>'
			 + '<div class="formCell"><label>年限：</label><div class="fcContent">'+limitTime+'</div></div>'
			 + '<div class="formCell"><label>利率：</label><div class="fcContent">'+rate+'</div></div>'
			 + '<div class="formCell"><label>费率：</label><div class="fcContent">'+costRate+'</div></div>'
			 + '<div class="formCell"><label>预计年化收益率：</label><div class="fcContent">'+rate+'</div></div>'
						
			 + '</div></div><div class="productPic">'
			 + '<img src="../../themes/blue/images/main/temp_pic_02.jpg" />'
			 //+ '<img src="../../themes/blue/images/main/temp_pic_03.jpg" />'
			 + '</div></div>';
			
			
	}else{
		
	}
	
	contentDiv = '<div id="createProductQueryPanel" title="产品详情" class="panel" data-footer="none">'
		   + '<header>'
		   + '<div class="top_header"> '
		   + '<a id="backButton" href="javascript:;" class="button" >返回</a> '
		   + ' <h1>产品查询</h1></div></header>'
		   + panelContent
		   + '</div>';
	
	var el = $.query("#createProductQueryPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createProductQueryPanel", contentDiv);
	} else {
		$.ui.updatePanel("createProductQueryPanel", panelContent);
	}
	$.ui.loadContent("createProductQueryPanel");
	
}

/***
 * 显示详情页面
 * @param custId 客户ID
 */
function productQueryShowDetail(objId) {
	var condition = {};
	condition.REP_ID = objId;
	$.ajax({
		type : "GET",
		url : basePath + 'productQueryAction.json?condition='+$.toJSON(condition),
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createProductQueryPanel(response.json.data[0],1);
			},
			error : function() {
				
			}
	});
}

/***
 * 数字验证
 * @param num 需要验证的数字
 */
function checkNum(num)
{

     var re = /^((0(\.[0-9]{1,2})?)|([1-9]{1}\d*(\.[0-9]{1,2})?))$/;

	 if (re.test(num))
	 {
		 return true;
	 }else{
		 return false;
	 }

}  