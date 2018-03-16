 /** 
  * com.yucheng.mobile.dataSync
  * @author  wuxl2@YUCHENGTECH.COM
  * @date    20141115
  * @version 
  **/
(function($){
	$._DATASYNC = function(){
		var opts = $.extend({},{},$._DATASYNC.defaults); 
		init(this);
		return this.each(function(){
			$._DATASYNC.appInfo = opts;
			$this = $(this);
		});
	};
	/**
	 * 初始化方法
	 * return
	 */
	function init($obj) { 
	};
	/**
	 * 默认配置
	 */  
	$._DATASYNC.defaults = {
	};
	
	/**
	 * 保存菜单
	 */
	$._DATASYNC.saveMenu = function(data,crmApp){
		//alert("$._DATASYNC.saveMenu2222222222>>data.length>>"+data.length);
		/**
		 * 根据缓存中ISSYNCMENU字段，1-需要重新新增菜单数据；0-不需要
		 */
		var user = mobileApp.getUserInfo();
		if(1*user.isSyncMenu == 1){
			//先删除
			var dsql = "delete from CNT_MENU";
			execute(crmApp,dsql,function(){
				//alert("有回调！！");
				//删除后新增数据
				/**/
				for(var i = 0; i < data.length; i++){
					var sql = "";
					sql += " insert into CNT_MENU(ACTION,APP_ID,COMSITS,CRT_DATE,DEFAULT_SIZE,";
					sql += " DEFAULT_URL,FUNC_DESC,FUNC_NAME,HAS_DYNTILE,ICON,";
					sql += " ID,ISFIXED,ISMOBILE,ISSAMEWIN,LEAF_FLAG,";
					sql += " MODULE_ID,MOD_FUNC_ID,NAME,ORDER_,PARENT_ID,";
					sql += " SUPPORT_SIZE_URL,TILE_COLOR,TILE_LOGO,TIP,TYPE,";
					sql += " VERSION)";
					sql += " values('"+data[i].ACTION+"','"+data[i].APP_ID+"','"+data[i].COMSITS+"','"+data[i].CRT_DATE+"','"+data[i].DEFAULT_SIZE+"',";
					sql += "'"+data[i].DEFAULT_URL+"','"+data[i].FUNC_DESC+"','"+data[i].FUNC_NAME+"','"+data[i].HAS_DYNTILE+"','"+data[i].ICON+"',";
					sql += "'"+data[i].ID+"','"+data[i].ISFIXED+"','"+data[i].ISMOBILE+"','"+data[i].ISSAMEWIN+"','"+data[i].LEAF_FLAG+"',";
					sql += "'"+data[i].MODULE_ID+"','"+data[i].MOD_FUNC_ID+"','"+data[i].NAME+"','"+data[i].ORDER_+"','"+data[i].PARENT_ID+"',";
					sql += "'"+data[i].SUPPORT_SIZE_URL+"','"+data[i].TILE_COLOR+"','"+data[i].TILE_LOGO+"','"+data[i].TIP+"','"+data[i].TYPE+"',";
					sql += "'"+data[i].VERSION+"'";
					sql += ")";
					//console.log("菜单新增sql>>>>"+sql);
					//alert("菜单新增sql>>>>"+sql);
					execute(crmApp,sql,function(){});
				}
			});
		}
	};
	dataSync = $._DATASYNC;
}(jQuery));