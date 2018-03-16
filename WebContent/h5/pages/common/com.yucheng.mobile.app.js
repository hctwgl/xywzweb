 /** 
  * com.yucheng.mobile.app
  * @author  CHANGZH@YUCHENGTECH.COM
  * @date    20141101
  * @version 
  **/
(function($){
	$._APP = function(){
		var opts = $.extend({},{},$._APP.defaults); 
		init(this);
		return this.each(function(){
			$._APP.appInfo = opts;
			$this = $(this);
		});
	};
	$._APP.components = {};
	$._APP.addComponent = function (o) {
		$._APP.components[o.name] = o;
	};
	$._APP.getComponent  = function (name) {
		if(name == null || name == '' || name == 'undefined') {
			mesUtil.alert('components name is null');
		}
		return $._APP.components[name];
	};
	/**
	 * 初始化方法
	 * return
	 */
	function init($obj) { 
		//initViews();
	};
	$._APP.openMenu = function(url) {
		try {
			if(null != url && url != 'undefined' && ''!= url) {
				url = url.replace('/mobile/pages', 'pages');
				mobileUtils.goPage(filePath + url);
			}
		} catch(e) {
			console.log("菜单加载异常");
		}
	};

	$._APP.getMenuRoot = function(menuArrays) {
		for (var j in menuArrays) {
			if(menuArrays[j].PARENT_ID == '0') {
				return menuArrays[j].ID;
			}
		}
	};
	function buildUserInfo(menuArrays) {
		if ($("#appMenuList")[0] != undefined) {
			$("#userName")[0].innerHTML = "欢迎您<br/>"
				+$._APP.getUserInfo().userName;
		}
	};
	/**
	 * 构建菜单
	 */
	$._APP.buildMenu = function (menuArrays) {
		// 初始化值为空
		if ($("#appMenuList")[0] != undefined) {
			$("#appMenuList")[0].innerHTML = "<li id=\"menuIndex\" class=\"divider\"><span class=\"menuIco ico_01\">　 </span>主界面<div id=\"menuExit\">注销</div></li>";
		}
		buildUserInfo();
		$("#menuExit").bind('click', function(){
			$._APP.doLogout();
		});
		$("#menuIndex").bind('click', function(){
			//af.ui.toggleSideMenu();
			mobileUtils.goPage(filePath + "homePage.html");
		});
		var menuRoot = $._APP.getMenuRoot(menuArrays);
		for (var i in  menuArrays) {
			if (menuArrays[i].PARENT_ID == menuRoot) {
				$("#appMenuList").append('<li class="divider"><span class=\"menuIco ico_05\">　 </span>'+ menuArrays[i].NAME + '</li>');
				for (var j in  menuArrays) {
					if (menuArrays[j].PARENT_ID == menuArrays[i].ID) {
						$("#appMenuList").append(
							'<li id="mobile_menu_'+ j
									+'" ><a href="javascript:$._APP.openMenu(\''+menuArrays[j].ACTION+'\')"'
									+ '><span class=\"menuIco ico_05\">　 </span>'
									+ menuArrays[j].NAME + '</a></li>');
					}
				}
			}
		}
	};
	$._APP.saveMenuData = function(menuData){
		if ($._APP.supportsHtml5Storage()) {
			localStorage.setItem("__menuData", menuData);
		}
	};
	$._APP.getMenuData = function(menuData){
		if ($._APP.supportsHtml5Storage()) {
			return localStorage.getItem("__menuData");
		}
	};
	/**
	 * 移动端菜单初始化
	 */
	$._APP.menuInit = function(crmApp) {//crmApp
		
		if(null != $._APP.getMenuData()) {
			var menuData = $.evalJSON($._APP.getMenuData());
			$._APP.buildMenu(menuData);
		} else {
			/*
			 * 判断是否在线
			 */
			var user_ = $._APP.getUserInfo();
	
				$.ajax({
					type : "GET",
					url : basePath + 'indexinit.json?deviceType=mobile',
					cache : false,
					// async: false,
					dataType : "json",
					success : function(response) {
						$._APP.buildMenu(response.json.data);
						$._APP.saveMenuData($.toJSON(response.json.data));
						
					},
					error : function() {
						$._APP.removeUserInfo();
					}
				});
	
	
		}
	};
	/**
	 * 登出方法
	 */
	$._APP.doLogout = function() {
		 var logoutData = {};
		 logoutData.deviceId = "mobile";
		 
		 /*
		 * 判断是否在线
		 */
		var user_ = $._APP.getUserInfo();
		if(1*user_.isOffline == 0){//在线
			$.ajax({
				type : "GET",
				url : basePath + 'j_spring_security_logout',
				data : logoutData,
				contentType: "application/json",  
				cache: false, 
				async : false,
				success : function(response){
					$._APP.removeUserInfo();
					
				},
				error:function(a,b,c){
					$._APP.removeUserInfo();
				}
			});
		}else{//离线
			$._APP.removeUserInfo();		
		}     
	};
	$._APP.supportsHtml5Storage = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	};
	/**
	 * 登录后初始化用户信息 return boolean
	 */
	$._APP.setUserInfo = function(userInfo,isOffline) {
		if ($._APP.supportsHtml5Storage()) {
			if(1*isOffline == 0){//在线
				localStorage.setItem("__userId", userInfo.userId);
				localStorage.setItem("__userName", userInfo.username);
				localStorage.setItem("__unitId", userInfo.unitId);
				localStorage.setItem("__unitName", userInfo.unitName);
				localStorage.setItem("__roleName",userInfo.rolesInfo[0].ROLE_NAME);
				localStorage.setItem("__roleCode",userInfo.rolesInfo[0].ROLE_CODE);
				localStorage.setItem("__isOffline", isOffline);
			}else{//离线
				localStorage.setItem("__userId", userInfo.userId);
				localStorage.setItem("__userName", userInfo.userName);
				localStorage.setItem("__unitId", userInfo.unitId);
				localStorage.setItem("__unitName", userInfo.unitName);
				localStorage.setItem("__roleCode",userInfo.roleCode);
				localStorage.setItem("__roleName",userInfo.roleName);
				localStorage.setItem("__isOffline", isOffline);
				if(user.isSyncMenu != undefined){
					localStorage.setItem("__isSyncMenu", user.isSyncMenu);
				}
			}
		}
	};
	/**
	 * 把是否同步菜单标识保存到缓存
	 */
	$._APP.appendIsSyncMenuTLS = function(param) {
		localStorage.setItem("__isSyncMenu", param);
	};
	/**
	 * 服务地址缓存
	 */
	$._APP.setServerPath = function(param) {
		localStorage.setItem("__serverPath", param);
	};
	$._APP.getServerPath = function(param) {
		return localStorage.getItem("__serverPath");
	};
	/**
	 * 轮播时间缓存
	 */
	$._APP.setTurnsTime = function(param) {
		localStorage.setItem("__turnsTime", param);
	};
	$._APP.getTurnsTime = function(param) {
		return localStorage.getItem("__turnsTime");
	};
	/**
	 * 后台在线时间缓存
	 */
	$._APP.setBackTime = function(param) {
		localStorage.setItem("__backTime", param);
	};
	$._APP.getBackTime = function(param) {
		return localStorage.getItem("__backTime");
	};
	/**
	 * 设置IPAD所属分行
	 */
	$._APP.setBelongOrg = function(param) {
		localStorage.setItem("__belongOrg", param);
	};
	$._APP.getBelongOrg = function(param) {
		return localStorage.getItem("__belongOrg");
	};
	/**
	 * 设备TOKEN
	 */
	$._APP.setCrmToken = function(param) {
		localStorage.setItem("__crmToken", param);
	};
	$._APP.getCrmToken = function(param) {
		return localStorage.getItem("__crmToken");
	};
	/**
	 * 登录后获取用户信息 return boolean
	 */
	$._APP.getUserInfo = function() {
		var userInfo = {};
		if ($._APP.supportsHtml5Storage()) {
			if (localStorage.getItem("__userId")) {
				userInfo.userId = localStorage.getItem("__userId");
			}
			if (localStorage.getItem("__userName")) {
				userInfo.userName = localStorage.getItem("__userName");
			}
			if (localStorage.getItem("__unitId")) {
				userInfo.unitId = localStorage.getItem("__unitId");
			}
			if (localStorage.getItem("__unitName")) {
				userInfo.unitName = localStorage.getItem("__unitName");
			}
			if (localStorage.getItem("__roleCode")){
				userInfo.roleCode = localStorage.getItem("__roleCode");
			}
			if (localStorage.getItem("__roleName")){
				userInfo.roleName = localStorage.getItem("__roleName");
			}
			if (localStorage.getItem("__isOffline")){
				userInfo.isOffline = localStorage.getItem("__isOffline");
			}
			if (localStorage.getItem("__isSyncMenu")){//是否需要同步菜单数据，1：是；0：否
				userInfo.isSyncMenu = localStorage.getItem("__isSyncMenu");
			}
		}
		return userInfo;
	};
	/**
	 * 清除用户信息
	 */
	$._APP.removeUserInfo = function(userInfo) {
        mobileUtils.goPage(filePath+"index.html");
		if ($._APP.supportsHtml5Storage()) {
			localStorage.removeItem("__userId");
			localStorage.removeItem("__userName");
			localStorage.removeItem("__unitId");
			localStorage.removeItem("__unitName");
			localStorage.removeItem("__roleCode");
			localStorage.removeItem("__roleName");
			localStorage.removeItem("__isSyncMenu");
			localStorage.removeItem("__menuData");
			localStorage.removeItem("__isOffline");
		}
		
		//mobileUtils.goPage(filePath+"index.html");
	};
	$._APP.getPanelId = function(childId) {
		try {
			return $('#'+childId).parents('.panel').get(0).id;
		} catch(e) {
			mesUtil.alert('请检查 [$(\'#'+childId+'\']是否存在.');
		}
	};
	/**
	 * 默认配置
	 */  
	$._APP.defaults = {
		conectionStatus : 0,//,1,2
		isDev : true	
	};
	mobileApp = $._APP;
}(jQuery));