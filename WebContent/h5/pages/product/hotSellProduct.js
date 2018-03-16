/***
 * 功能描述：热销产品
 *  作者 ：luoyad
 *  时间 ：2014-11-18
 *  版本 ：v1.0.0
 */

var listReader = {
		mapping : [{name : 'ID'},
		           {name : 'PROD_RANK'},
		           {name : 'PROD_NAME'},
	          	   {name : 'START_DATE'},
	          	   {name : 'RATE'},
	          	   {name : 'SALES_TOTAL_TMP'},
	          	   {name : 'SALES_MONTH_TMP'}],
	    record:''//@CUST_ID
			+ '<li><a href="javascript:hotSellProductShowDetail(\'@ID\')">'
			+ '<div class="listCell lcBig" style="width:30%;overflow:auto;">产品排名：第@PROD_RANK名<br/>产品名称：@PROD_NAME</div>'
			+ '<div class="listCell lcBig" style="width:25%;">发售日期：@START_DATE<br/>预计年化收益率：@RATE %</div>'
			+ '<div class="listCell" style="width:35%;">累积销售金额：@SALES_TOTAL_TMP<br/>本月销售金额：@SALES_MONTH_TMP </div>'
			+'</a></li>'
}
var config = {
	filter : false,
	pageConfig : {
		limit : 10,
		queryUrl : basePath + 'hotSellAction.json',
		listViewId : 'hotSellProduct_list',
		listReader : listReader,
		success : function(response){},
		error : function(){
			mesUtil.alert('数据加载失败');
		}
	}
}
 
function addHotSellProduct() {
	createHotSellProductPanel({},0);
}
/**
 * 创建详情panel
 * @param data panel信息,type 操作类型 0：新增 1 详情
 */
function createHotSellProductPanel (data,type) {

	var prodId = mobileUtils.getDataToString(data.PRODUCT_ID);
	var prodName  = mobileUtils.getDataToString(data.PROD_NAME);
	var catlCode   = mobileUtils.getDataToString(data.CATL_NAME);
	var prodState = mobileUtils.getDataToString(data.STATUS_NAME);
	var limitTime = mobileUtils.getDataToString(data.LIMIT_TIME);
	var rate  = mobileUtils.getDataToString(data.RATE) +"%";
	var costRate  = mobileUtils.getDataToString(data.COST_RATE) +"%";
	
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
	
	contentDiv = '<div id="createHotSellProductPanel" title="产品详情" class="panel" data-footer="none">'
		   + '<header>'
		   + '<div class="top_header"> '
		   + '<a href="javascript:;" class="button" >返回</a> '
		   + ' <h1>热销产品</h1></div></header>'
		   + panelContent
		   + '</div>';
	
	var el = $.query("#createHotSellProductPanel").get(0);
	if(!el) {
		$.ui.addContentDiv("createHotSellProductPanel", contentDiv);
	} else {
		$.ui.updatePanel("createHotSellProductPanel", panelContent);
	}
	$.ui.loadContent("createHotSellProductPanel");
	
}

/***
 * 显示详情页面
 * @param custId 客户ID
 */
function hotSellProductShowDetail(objId) {
	var condition = {};
	condition.REP_ID = objId;
	$.ajax({
		type : "GET",
		url : basePath + 'productQueryAction.json?condition='+$.toJSON(condition),
		cache : false,
		// async: false,
		dataType : "json",
			success : function(response) {
				createHotSellProductPanel(response.json.data[0],1);
			},
			error : function() {
				
			}
	});
}
