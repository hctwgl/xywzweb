/**
 * 个人密码修改模块
 * @author wangwan
 * @since 2012-10-19
 */


Ext.onReady(function() {
	
	/*******************读取密码校验策略参数*************************/
	Ext.Ajax.request({
		url:basepath+'/userApproveTacticsQuery.json',
		mothed: 'GET',
		params : {
    		'tem1':6,
    		'tem2':10
	    },
    	success : function(response) {
    		Ext.QuickTips.init(); 
    		userId =__userId;//全局变量：当前登录用户名
    		var param = Ext.util.JSON.decode(response.responseText);
    		var state6 = param.json.data[0].ENABLE_FLAG;//口令与近期历史密码重复策略启用标志
    		var historyPw=param.json.data[0].DETAIL;//口令与近期历史密码重复策略配置参数
    		var state7 = param.json.data[1].ENABLE_FLAG;//口令长度策略启用标志
    		var pwLength = param.json.data[1].DETAIL;//口令长度策略配置参数
    		var state8 = param.json.data[2].ENABLE_FLAG;//口令不重复长度策略启用标志
    		var pwComplex = param.json.data[2].DETAIL;//口令不重复长度策略配置参数
    		var state9 = param.json.data[3].ENABLE_FLAG;//口令连续长度策略启用标志
    		var pwNoRepeat = param.json.data[3].DETAIL;//口令连续长度策略配置参数
    		var state10 = param.json.data[4].ENABLE_FLAG;//口令复杂度策略启用标志
    		var pwSeries = param.json.data[4].DETAIL;//口令复杂度策略配置参数
    		var message1='';//错误提示信息
    		var message2='';
    		var message3='';
    		var message4='';
    		var message5='';
    		var message6='';
    		var message7='';
    		var message8='';
    		var pw=Ext.getCmp('newPassword');
    		
    		 /********************口令长度策略*****************************/
    		function passwordLength(v,pwLength){
    				var minLength = pwLength;
    				if (v.length >= minLength){
    					return true;
    				}else{
    					message1='您输入的密码长度小于口令最小长度';
    					return false;
    				}
    		}
    		
    		/*********************口令不重复长度策略*******************************/
    		function passwordNoRepeatLength(v,pwNoRepeat){
    			var repeatMinLength = parseInt(pwNoRepeat);
    			var c=0;
    			var a1=0;
    			for(var j=0;j<v.length-repeatMinLength;j++){
    				for(var i=0;i<(repeatMinLength-1);i++){
    					var tmp =v.charCodeAt(i+j)-v.charCodeAt(i+j+1);
    					if(tmp==0){
    						c++;
    					}
    				}
    				if(c==(repeatMinLength-1)){
    					a1++;
    				}
    				c=0;
    			}
    			if(a1>0){
    				pw='';
    				Ext.getCmp('newPassword').setValue('');
    				message2='您输入的密码连续重复的字符数超过最大长度';
    				return false;
    			}else{
    				return true;
    				
    			}
    			
    		}
    		
    		/*************************口令连续长度策略*******************************/
    		function passwordSeries(v,pwSeries){
    			 var repeatMinLength = parseInt(pwSeries); 
    			 var a=0;
    			 var b=0;
    			 var a1=0;
    			 for(var j=0;j<v.length-repeatMinLength;j++){
    				 for(var i=0;i<(repeatMinLength-1);i++){
    					 var tmp =v.charCodeAt(i+j)-v.charCodeAt(i+j+1);
    					 if(tmp==1){
    						 a++;
    					 }else if (tmp==-1){
    						 b++;
    					 }
    				 }
    				 if(a==(repeatMinLength-1)||b==(repeatMinLength-1)){
    					 a1++;
    				 }
    				 a=0;
    				 b=0;
    			 }
    			 if(a1>0){
    				 pw='';
    				 Ext.getCmp('newPassword').setValue('');
    				 message3='您输入的密码连续字符的字符数超过最大长度';
    				 return false;
    			 }else {
    				 return true;
    				
    			 }
    		}
    		/**********************口令复杂度策略****************************/
    		function passwordComplexStrategy(v,pwComplex){
    		debugger;
    		 	var m=0;
    		 	var n=0;
    		 	var p=0;
    		 	var q=0;
    		 	var tmp=pwComplex.split('/');
    		 	for(var i=0;i<v.length;i++){
    		 		var asc = v.charCodeAt(i);
    		 		if(asc>47&&asc<59){
    		 			m=1;//数字
    		 		}else if(asc>64&&asc<91){
    		 			n=1;//大写字符
    		 		}else if(asc>96&&asc<123){
    		 			p=1;//小写字符
    		 		}else if((asc>37&&asc<48)||(asc>57&&asc<65)){
    		 			q=1;//其他字符
    		 		}
    		 	}
    		 	
    		 
    		 	for(var i =0;i<tmp.length;i++){
    		 		var a = tmp[i];
    		 		switch(a){
    			 		case '1' :
    			 			message5='数字';
    			 			if(m>0){
    			 		}else{
    			 			pw='';
    			 			Ext.getCmp('newPassword').setValue('');
    			 			message4='您输入的密码必须几种组合:';
    			 		};
    			 		break;
    			 		case '2':
    			 			message6='大写字母';
    			 			if(n>0){
    			 		}else{
    			 			pw='';
    			 			Ext.getCmp('newPassword').setValue('');
    			 			message4='您输入的密码必须几种组合:';
    			 		};
    			 		break;
    			 		case '3':
    			 			message7='小写字母';
    			 			if(p>0){
    			 		}else{
    			 			pw='';
    			 			Ext.getCmp('newPassword').setValue('');
    			 			message4='您输入的密码必须包含几种组合:';
    			 		};
    			 		break;
    			 		case '4':
    			 			message8='其他符号';
    			 			if(q>0){
    			 		}else{
    			 			pw='';
    			 			Ext.getCmp('newPassword').setValue('');
    			 			message4='您输入的密码必须包含几种组合:';
    			 			
    			 		}
    			 		//默认情况：若指定情况不匹配，则直接保存输入密码，即不做复杂度校验，默认用户没有做复杂度校验的参数配置
    		 		}
    		 		
    		 	}
    		}
    		
    		var passWordInfo = new Ext.FormPanel({//修改个人密码信息PANEL
    			title:'修改个人密码',
    			frame : true,
    			region : 'center',
    			height : 450,
    			autoScroll : true,
    			split : true,
    			layout:'column',
    			items:[{
    			    columnWidth:.5,
    	        	layout: 'form',
    	        	items: [{  //隐藏域，用于存储当前登录用户的主键ID
    	        	    xtype:'textfield',
        	            fieldLabel:'id',
        	            name:'id',
        	            id:'id',
        	            labelStyle:'text-align:right;',
        	            anchor:'70%',
        	            hidden:true
    	        	},{   //隐藏域，用于存储当前登录用户的用户名
    	        	    xtype:'textfield',
    	        	    fieldLabel:'用户名id',
    	        	    id:'accountName',
    	        	    name:'accountName',
    	        	    labelStyle:'text-align:right;',
    	        	    anchor:'70%',
    	        	    hidden:true,
    	        	    value:userId
    	        	},{ //隐藏域，用于存储当前登录用户的原密码
    	        	    xtype:'textfield',
    	        	    fieldLabel:'原密码2',
    	        	    id:'oldPassword2',
    	        	    name:'oldPassword2',
    	        	    inputType:"password",
    //			        		        	    vtype:'password',
    	        	    labelStyle:'text-align:right;',
    	        	    anchor:'70%',
    	        	    hidden:true
    	        	},{ 
    	        	    xtype:'textfield',
    	        	    fieldLabel:'原密码<font color="red">*',
    	        	    id:'oldPassword',
    	        	    inputType:"password",
    	        	    name : 'oldPassword',
    	        	    allowBlank:false,
    //			        		        	      vtype:'password',
    	        	    labelStyle:'text-align:right;',
    	        	    anchor:'70%'
    	        	},{  
    	        	    xtype:'textfield',
    	        	    fieldLabel:'新密码<font color="red">*',
    	        	    id:'newPassword1',
    	        	    name : 'newPassword1',
    	        	    inputType:"password",
    	        	    allowBlank:false,
    //			        		        	      vtype:'password',
    	        	    labelStyle:'text-align:right;',
    	        	    anchor:'70%'
    	        	},{
    	        	    xtype:'textfield',
    	        	    fieldLabel:'确认新密码<font color="red">*',
    	        	    id:'newPassword',
    	        	    name : 'newPassword',
    	        	    inputType:"password",
    	        	    labelStyle:'text-align:right;',
    	        	    allowBlank:false,
    //	                vtype:'password',
    	        	    maxLength:'15',
    	        	    anchor:'70%'
    	        	}]
    			}],
    		    buttonAlign:'center',
    		    buttons : [{
    		        text :'修改',
    		        handler:function(){
    		    	 	if(!passWordInfo.getForm().isValid())
						{ 
							Ext.Msg.alert('提示','请输入必输项');
							return false;
						}
    		    	 	if(!(Ext.getCmp('newPassword1').getValue()==Ext.getCmp('newPassword').getValue())){
	                        Ext.Msg.alert('提示','新密码与确认新密码不一致');
	                        return false;
	                    }

	                        //若密码输入一致，则进行下一步校验
	                        /***********************密码校验方法***************************************/
	                        var newPassword = Ext.getCmp('newPassword').getValue();
//		                        pw=newPassword;
	                        if(state7=='1'){							//判断各校验方法是否启用
	                            passwordLength(newPassword,pwLength);
	                        };
	                    	if(state8=='1'){
	                    		passwordNoRepeatLength(newPassword,pwNoRepeat);
	                    	};
	                    	if(state9=='1'){
	                    		passwordSeries(newPassword,pwSeries);
	                    	};
	                    	if(state10=='1'){
	                    		passwordComplexStrategy(newPassword,pwComplex);
	                    	};
//    	                    	Ext.getCmp('newPassword').setValue(pw);
	                    	if(Ext.getCmp('newPassword').getValue()==''){
	                    	    Ext.Msg.alert('提示',message1+' '+message2+' '+message3+' '+message4+' '+message5+' '+message6+' '+message7+' '+message8);
	                    	    message1='';//还原提示信息
	                    	    message2='';
	                    	    message3='';
	                    	    message4='';
	                    	    message5='';
	                    	    message6='';
	                    	    message7='';
	                    	    message8='';
		                   }else {
		                	   Ext.Ajax.request({
		                	       url:basepath+'/passwordChangeAction!authPassword.json',
		                	       mothed: 'POST',
		                	       params :{
    		                	       'userId':userId,
    		                	       'password':Ext.getCmp('newPassword').getValue(),
    		                	       'updateUser':userId,
    		                	       'authEnableFlag':state6,
    		                	       'historyPw':historyPw,
    		                	       'oldPassword2':'1',
    		                	       'oldPassword':Ext.getCmp('oldPassword').getValue()
		                	       },
		                	       success : function(response) {
		                	           Ext.Msg.alert('提示','修改成功');
		                	       }
		                	   });
		                   } 
	                
    		            
    		            
    		            
    		        }
    		    }]
    		});
    
    		var mainView = new Ext.Viewport({
    			title : '修改个人密码',
    			closable : true,
    			plain : true,
    			resizable : false,
    			collapsible : false,
    			height:500,
    			width:1000,
    			draggable : false,
    			closeAction : 'hide',
    			modal : true, // 模态窗口 
    			border : false,
    			autoScroll : true,
    			closable : true,
    			animateTarget : Ext.getBody(),
    			constrain : true,
    			layout:'fit',
    			items:[passWordInfo]
    		});
    	},
    	failure : function(response) {
    		Ext.Msg.alert('提示','失败');
    	}
    	});
	});