/**
 * Date : 2012-4-17
 * Version : 1.2
 * Memo : Version 1.0 is coded for the Ajax connection to JAVA Project with ActiveX Msxml2.XMLHTTP.6.0 . 
 * 		  Msxml2.XMLHTTP.6.0 uses the library "msxml6.dll" of "IE 6.0". 
 * 		  That will make some mistake when the URL contains some special chars or is too long.
 * 		  The Patch-1.000 will be used when the special chars is in the URL.
 * 		  The following words are included in the "Special chars":
 * 			 	backspace %08 		tab %09 			linefeed %0A 		creturn %0D 
 *				space %20 			! %21 				" %22 				# %23 
 *				$ %24 				% %25 				& %26 				' %27 
 *				( %28 				) %29  				* %2A 				+ %2B 
 *				, %2C 				- %2D 				. %2E 				: %3A 
 *				; %3B 				< %3C 				= %3D 				> %3E 
 *				? %3F 				@ %40 				[ %5B 				\ %5C 
 *				] %5D 				^ %5E 				_ %5F 				` %60 
 *				{ %7B 				| %7C 				} %7D 				~ %7E 
 *						
 *				var activeX = ['Msxml2.XMLHTTP.6.0',	
 *  	        	           'Msxml2.XMLHTTP.3.0',
 *                  		   'Msxml2.XMLHTTP'].
 *        Version 1.1 : 1、Fixed Ext.Ajax.requst method bug option. When single call the method with params. The Ext-base.js will change the 'method' option to 'POST'.
 *        				So we should encode the parameters ,and add it to the URL. 
 *           			2、Add a method Ext.setGridColumnMenDisable(param) for control the grid column's menu. You can call
 *           			it in includes.jsp for all the modules, or call it in your own module only work in your module.
 *        Version 1.2 : 1、Add the method to reduce the exceptions from the WEB server. It will be called when the Ext.Ajax.requestexception event happened.
 *        				2、Add a property : Ext.CRM_EXCEPTION. You can apply your special exception method in it.
 *        				3、Add the response exception code : 600(Session out).
 *        				4、MEMO: You can define your own exception code, add you can also define the HTTP exception codes. So we can control the exceptions together.
 *        				   Following codes can be defined here:
 *        						 	4**：请求包含一个错误语法或不能完成 
 *									5**：服务器执行一个完全有效请求失败 
 *		  Version 1.3 : 1、添加500错误码处理逻辑；
 *                      2、添加下拉框输入字符时，下拉选项匹配规则控制。
 */
/**System method: decode your URL.*/
Ext.apply(Ext,{
	URL_PAR : function(url){
		if(Ext.isString(url))
			if(url.indexOf("?")>=0){
				return url.substring(0,url.indexOf("?")+1)+Ext.urlEncode(Ext.urlDecode(url.substring(url.indexOf("?")+1)));
			}else return url;
		else return url;
	}
});
/**Add exception method. 
 * So coders can add exceptions methods in your owner project like this.
 */
Ext.apply(Ext,{
	/**CRM exceptions defines.*/
	CRM_EXCEPTION:{
		/**CRM System exception when the session is missing.*/
		SESSION_OUT:{
			CODE:'600',
			/**
			 * @param ajax: Ext.Ajax Object with current state;
			 * @param response: response object by the web sever;
			 * @param request: Current request informations.
			 */
			HANDLER:function(ajax,response,request){
				try{
					request.failure = false;
					requsst.success = false;
					request.callback = false;
				}catch(e){}finally{
					top.location.href=basepath;
				}
			}
		},
		COMMON_ERROR:{
			CODE:'500',
			/**
			 * TODO 需要区分：数据请求错误、js代码请求错误、通用数据请求错误（如数据字典等）。
			 * 		500错误编码牵涉范围过广，单500编码逻辑处理需要建立一个错误分类管理机制，
			 * 		除却系统错误，还包括BizException扩展定义的错误编码。
			 * 
			 * @param ajax: Ext.Ajax Object with current state;
			 * @param response: response object by the web sever;
			 * @param request: Current request informations.
			 */
			HANDLER:function(ajax,response,request){
				for(var i=0;i<this.exceptAble.length;i++){
					if(request.url.indexOf(this.exceptAble[i]) >= 0){
						return;
					}else continue;
				}
				try{
					request.failure = false;
					requsst.success = false;
					request.callback = false;
				}catch(e){}finally{
					var rep=Ext.decode(response.responseText);
					if(rep.level==0){//业务提醒信息
						Ext.Msg.alert('业务提示','业务提示代码：'+rep.code
								+"<p>业务提示内容："+rep.msg);
					}else if(rep.level==1) {//警告信息
						Ext.Msg.alert('警告提示','警告代码：'+ep.code
								+"<p>警告名称："+rep.errMsg
								+"<p>警告原因："+rep.msg);
					}else{//错误信息提示
						Ext.Msg.alert('操作失败','错误代码：'+rep.code
								+"<p>错误名称："+rep.errMsg
								+"<p>错误原因："+rep.msg);
					}
				}
			},
			/**
			 * 排除选项，某些特定URL在抛出500异常之后，不做特殊处理，而是继续执行后续代码
			 */
			exceptAble : ['indexinit','pageSetManageAction']
		}
	}
});
/**System call: decode your URL when you call Ext.data.Store.load or Ext.Ajax.request*/
Ext.Ajax.on('beforerequest',function(a,b){
	b.url = Ext.URL_PAR(b.url);
	if(b.mothed=='GET'&&!b.reader&&b.params){
		if(b.url.indexOf('?')>0){
			b.url += '&'+Ext.urlEncode(b.params);
		}else{
			b.url += '?'+Ext.urlEncode(b.params);
		}
		delete b.params;
	}
});
/**System call: when your AJAX request is excepting, this event will be called.
 * It will call the function you defined in Ext.CRM_EXCEPTION by the response.status.
 * If the status code was not got , it will do nothing. And it need to be tested when timeout.
 */
Ext.Ajax.on("requestexception",function(ajax,response,request){
	if(response.isTimeout===true){
		Ext.Msg.alert('操作提示','操作超时或网络不可用');
		return;
	}
	for(var key in Ext.CRM_EXCEPTION){
		var EXP = Ext.CRM_EXCEPTION[key];
		if(EXP.CODE&&EXP.HANDLER)
			if(response.status&&response.status==EXP.CODE){
				EXP.HANDLER(ajax,response,request);
				return;
			}
			else continue;
		else continue;
	}
});
/**System method: set your grid column menu when your mouse over the column head.*/
Ext.apply(Ext,{
	setGridColumnMenuDisable : function(param){
		for(var key in Ext.grid.Column.types){
			Ext.grid.Column.types[key].prototype.menuDisabled = param;
		}
	}
});
/**
 * Fix: When render a tree in the ComboBox, the ComboBox collapse when expand a tree node.
 */
Ext.override(Ext.form.ComboBox, {
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
		if (r) {
			this.onSelect(r, index);
		} else if (s.getCount() === 0) {
			this.collapse();
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	}
});	

/**
 * 添加Ext属性，下拉框匹配规则。
 * comboAnyMatch ： 默认为false：下拉框中输入字符匹配下拉选项前半部分；true：则匹配全文。
 * setComboAnyMatch : 方法，在需要修改下拉框匹配规则的功能调用，则可修改局部匹配规则；在全局作用域调用，则可修改全局匹配规则。
 */
Ext.apply(Ext,{
	comboAnyMatch : false,
	setComboAnyMatch : function(anyMatch){
		if (anyMatch === true){
			Ext.comboAnyMatch = true;
		}
	}
});
/**
 * 重写下拉框触发查询数据过滤方法。添加控制下拉框数据匹配规则参数.
 */
Ext.override(Ext.form.ComboBox,{
	doQuery : function(q, forceAll){
		
		if(Ext.comboAnyMatch === true){
			this.typeAhead = false;
		}else{
			this.typeAhead = true;
		}
    	q = Ext.isEmpty(q) ? '' : q;
    	var qe = {
    			query: q,
    			forceAll: forceAll,
    			combo: this,
    			cancel:false
    	};
    	if(this.fireEvent('beforequery', qe)===false || qe.cancel){
    		return false;
    	}
    	q = qe.query;
    	forceAll = qe.forceAll;
    	if(forceAll === true || (q.length >= this.minChars)){
    		if(this.lastQuery !== q){
    			this.lastQuery = q;
    			if(this.mode == 'local'){
    				this.selectedIndex = -1;
    				if(forceAll){
    					this.store.clearFilter();
    				}else{
    					this.store.filter(this.displayField, q, Ext.comboAnyMatch);
    				}
    				this.onLoad();
    			}else{
    				this.store.baseParams[this.queryParam] = q;
    				this.store.load({
    					params: this.getParams(q)
    				});
    				this.expand();
    			}
    		}else{
    			this.selectedIndex = -1;
    			this.onLoad();
    		}
    	}
	}
});
/********背景图片，使用本地图片，不去访问万维网资源。*********/
Ext.BLANK_IMAGE_URL = basepath + '/contents/resource/ext3/resources/images/default/s.gif';

/********************判断浏览器是否IE9**********************************/
Ext.apply(Ext,{
	isIE9 : Ext.isIE && (/msie 9/.test(navigator.userAgent.toLowerCase()) && document.documentMode == 9),
	isIE8 : Ext.isIE && (/msie 8/.test(navigator.userAgent.toLowerCase()) && document.documentMode == 8),
	isIE7 : Ext.isIE && (/msie 7/.test(navigator.userAgent.toLowerCase()) && document.documentMode == 7)
});
Ext.apply(Ext,{
	isIE6 : Ext.isIE && !Ext.isIE7 && !Ext.isIE8 && !Ext.isIE9
});
/**
 * 解决IE9下树形面板事件失效
 */
if(Ext.isIE9){
	Ext.tree.TreeEventModel.prototype.getNode = function(e){
		var t;
		if(t = e.getTarget('.x-tree-node-el', 10)){
			var id = Ext.fly(t, '_treeEvents').dom.getAttribute('ext:tree-node-id');
			if(id){
				return this.tree.getNodeById(id);
			}
		}
		return null;
	};
}
/**修复IE9下的日期框宽度问题**/
Ext.override(Ext.menu.Menu, {
    autoWidth : function(){         
        var el = this.el, ul = this.ul;         
        if(!el){         
            return;         
        }         
        var w = this.width;         
        if(w){         
            el.setWidth(w);   
        }else if(Ext.isIE9){
            el.setWidth(this.minWidth);         
            var t = el.dom.offsetWidth;         
            el.setWidth(ul.getWidth()+el.getFrameWidth("lr"));         
        }         
    }         
}); 

Ext.apply(Ext,{
	/**
	 * 判断Obj是否xtype的实体或者xtype子类的实体
	 * @param Obj : 实体Ext对象；
	 * @param xtype : Ext类的xtype或者Ext类本身
	 */
	instanceOf : function(Obj,xtype){
		var types = ['object','function','string'];
		
		var otype;
		
		if(types.indexOf(typeof Obj)!==0){
			return false;
		}
		try{
			if(Obj.constructor){
				otype = Obj.constructor;
			}
		}catch(e){
			return false;
		}
		if(types.indexOf(typeof xtype) < 1){
			return false;
		}
		return Ext.isSubClass(xtype,otype);
	},
	/**
	 * 判断type2是否type1的子类,type1和type2为xtype或者Ext类名,若传入两个类相同，则返回：true。
	 * @param type1:父类xtype或者父类本身
	 * @param type2:子类xtype或者子类本身
	 */
	isSubClass : function(type1,type2){
		var types = ['function','string'];
		var t1,t2;
		switch(types.indexOf(typeof type1)){
		case 1 : if(Ext.ComponentMgr.types[type1]){
			t1 = Ext.ComponentMgr.types[type1];
			break;
		}else return false;
		case 0 : t1 = type1;break;
		default : return false;
		}
		switch(types.indexOf(typeof type2)){
		case 1 : if(Ext.ComponentMgr.types[type2]){
			t2 = Ext.ComponentMgr.types[type2];
			break;
		}else return false;
		case 0 : t2 = type2;break;
		default : return false;
		}
		if(t1===t2){
			return true;
		}
		while(t2.superclass && t2.superclass.constructor !== t1){
			t2 = t2.superclass.constructor;
		}
		if(t2.superclass && t2.superclass.constructor === t1){
			return true;
		}else return false;
	}
});
/**
 * 修复IE9下Ext.Window展示、动画问题
 */
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
	Range.prototype.createContextualFragment = function(html) {
		var frag = document.createDocumentFragment(),
		div = document.createElement("div");
		frag.appendChild(div);
		div.outerHTML = html;
		return frag;
	};
}
