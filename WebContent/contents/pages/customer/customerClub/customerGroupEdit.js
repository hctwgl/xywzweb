	var __hiddeAble=false;
	var __modelSign1=.45;
	var __modelSign2=.55;
	if(__userId!='admin'){
		__hiddeAble=true;
		__modelSign1=0.00;
	    __modelSign2=1;
	}
	 //证件类型
	 var certTypeStore = new Ext.data.Store({
		restful : true,
		sortInfo : {field : 'key',direction : 'ASC'},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/lookup.json?name=PAR0100006'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	 
	 //客户群分类
	 var customergroupTypeStore = new Ext.data.Store({
		restful : true,
		sortInfo : {field : 'key',direction : 'ASC'},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/lookup.json?name=CUSTOMER_GROUP_TYPE'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
     //客户来源
     var customerSourceTypeStore = new Ext.data.Store({
		restful : true,
		sortInfo : {field : 'key',direction : 'ASC'},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/lookup.json?name=CUSTOMER_SOURCE_TYPE'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
     //群成员类型
     var groupMemeberTypeStore = new Ext.data.Store({
		restful : true,
		sortInfo : {field : 'key',direction : 'ASC'},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/lookup.json?name=GROUP_MEMEBER_TYPE'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
    //客户群共享范围
	var shareFlagStore = new Ext.data.Store({
		restful : true,
		sortInfo : {field : 'key',direction : 'ASC'},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/lookup.json?name=SHARE_FLAG'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	
	var mainCustomerManager = new Com.yucheng.crm.common.OrgUserManage({ 
								xtype:'userchoose',
								fieldLabel : '所属客户经理', 
								labelStyle: 'text-align:right;',
								name : 'BELONG_CUSTMANAGER',
								id : 'BELONG_CUSTMANAGER',
								hiddenName:'custMgrId',
								searchRoleType:('127,47'),  //指定查询角色属性 ,默认全部角色
								searchType:'SUBTREE',/* 允许空，默认辖内机构用户，指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
								singleSelect:false,
								anchor : '90%',
								callback:function(){
								}
								});
	var mainBelongOrg= new Com.yucheng.bcrm.common.OrgField({
								searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
								fieldLabel : '所属机构',
								labelStyle : 'text-align:right;',
								name : 'BELONG_ORG', 
								id : 'BELONG_ORG',
								hiddenName: 'instncode',   //后台获取的参数名称
								anchor : '90%',
								checkBox:true //复选标志
							});
	
	 	 //切换子面板 
		  function changePage(btn){
		  	var tempId = editGroupBaseInfoForm.form.findField('id').getValue();
		  	if(''==tempId||undefined==tempId){
		  		Ext.Msg.alert('系统提示','请先完善客户群基本信息并点击保存!');
		  		return false;
		  	}
		  	//客户来源为手动选择时执行的业务逻辑
		  	if('1'==editGroupBaseInfoForm.form.findField('custFrom').getValue()){
		  	
		   var index = Number(editGroupBaseInfoPanel.layout.activeItem.id.substring(4)); 
		   if(btn.text == '上一步'){ 
		    index -= 1; 
		    if(index <1){ 
		     index = 1; 
		    } 
		   editGroupBaseInfoWindow.setTitle('客户群新增-->第'+index+'步，共3步');
		   }else{ 
		    index += 1; 
		    editGroupBaseInfoWindow.setTitle('客户群新增-->第'+index+'步，共3步');
		    if(index=='3')   
		    groupCustMgrStore.load({
				  params : {
				  start : 0,
				  limit : parseInt(groupCustMgrpagesize_combo.getValue())
			      }});
		    
		    if(index=='2'){
		    customerInfoStore.load({
					params : {
					start : 0,
					limit : parseInt(customerInfopagesize_combo.getValue())
				}});
        	//判定，当群成员类型为对公或对私时，客户类型不展示
        	if('1'==editGroupBaseInfoForm.form.findField('groupMemberType').getValue()||'2'==editGroupBaseInfoForm.form.findField('groupMemberType').getValue()){
        	 searchPanel1.form.findField('CUST_TYP').setVisible(false);
        	}else{
        	 searchPanel1.form.findField('CUST_TYP').setVisible(true);
        	};
		    }
		    if(index >3) index = 3; 
		    
		   }
		   groupLeaguerStore.load();
		   if(index==1){
			   editGroupBaseInfoPanel.buttons[0].setDisabled(true);   
		   }else{
			   editGroupBaseInfoPanel.buttons[0].setDisabled(false);   
		   }
		   
		   if(index==3){
			   editGroupBaseInfoPanel.buttons[1].setDisabled(true);   
		   }else{
			   editGroupBaseInfoPanel.buttons[1].setDisabled(false);   
		   }
		   editGroupBaseInfoPanel.layout.setActiveItem('info'+index); 
		  	
		  	}
		  	//客户来源为自动筛选时执行的业务逻辑
		  	else if('2'==editGroupBaseInfoForm.form.findField('custFrom').getValue()){
		  	
		   var index = Number(editGroupBaseInfoPanel.layout.activeItem.id.substring(4)); 
		   if(btn.text == '上一步'){ 
		    if(index <1){ 
		     index = 1; 
		    }
		    if(index=='1') {
		    	index=1;
		     	editGroupBaseInfoWindow.setTitle('客户群新增-->第1步，共3步');
		    }
		    else if(index=='4') {
		    	index=1;
		     	editGroupBaseInfoWindow.setTitle('客户群新增-->第1步，共3步');
		    }
		     else if(index=='3') {
		    	index=4;
		     	editGroupBaseInfoWindow.setTitle('客户群新增-->第2步，共3步');
		    }
		   }else{ 
		    if(index=='1') {
		    	index=4;
		    	partitionRuleStore.load();
		     	editGroupBaseInfoWindow.setTitle('客户群新增-->第2步，共3步');
		    }
		    else if(index=='4') {
		    index=3;
		    editGroupBaseInfoWindow.setTitle('客户群新增-->第3步，共3步');
		    }
		   
		    if(index=='3')   
		    groupCustMgrStore.load({
				  params : {
				  start : 0,
				  limit : parseInt(groupCustMgrpagesize_combo.getValue())
			      }});
		    
		    if(index >4) index = 4; 
		   }
		   groupLeaguerStore.load();
		   if(index==1){
			   editGroupBaseInfoPanel.buttons[0].setDisabled(true);   
		   }else{
			   editGroupBaseInfoPanel.buttons[0].setDisabled(false);   
		   }
		   
		   if(index==3){
			   editGroupBaseInfoPanel.buttons[1].setDisabled(true);   
		   }else{
			   editGroupBaseInfoPanel.buttons[1].setDisabled(false);   
		   }
		   editGroupBaseInfoPanel.layout.setActiveItem('info'+index); 
		  		
		  		
		  	}
		  };		
    // 新增、修改、详情信息窗口展示的from
    var editGroupBaseInfoForm = new Ext.form.FormPanel({
            frame : true,
            title : '基本信息',
            buttonAlign : "center",
            id:'info1',
            region : 'center',
            autoScroll : true,
            labelWidth : 140,
            items : [ {
                layout : 'column',
                items : [ {
                    columnWidth : .33,
                    layout : 'form',
                    items : [ {
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        width:150,
                        fieldLabel : '<span style="color:red">*</span>客户群名称',
                        allowBlank : false,
                        name : 'custBaseName',
                        anchor : '99%'
                    }, {
						store : shareFlagStore,
						xtype : 'combo', 
						resizable : true,
						width:150,
						fieldLabel : '<span style="color:red">*</span>共享范围',
						hiddenName : 'shareFlag',
						name : 'shareFlag',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						allowBlank : false,
						mode : 'local',
						editable :false,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					}]
                },{
                    columnWidth : .33,
                    layout : 'form',
                    items : [{
						store : groupMemeberTypeStore,
						xtype : 'combo', 
						resizable : true,
						width:150,
						fieldLabel : '<span style="color:red">*</span>群成员类型',
						hiddenName : 'groupMemberType',
						name : 'groupMemberType',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						allowBlank : false,
						mode : 'local',
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					},{
						store : customerSourceTypeStore,
						xtype : 'combo', 
						resizable : true,
						width:150,
						fieldLabel : '<span style="color:red">*</span>客户来源',
						hiddenName : 'custFrom',
						name : 'custFrom',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						mode : 'local',
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					},{
                        xtype : 'datefield',
                        fieldLabel : '创建时间',
                        format : 'Y-m-d',
                        hidden:true,
                        width:150,
                        labelStyle : 'text-align:right;',
                        name : 'custBaseCreateDate',
                        anchor : '99%'
                    } ,{
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        hidden:true,
                        fieldLabel : 'ID',
                        name : 'id',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        hidden:true,
                        fieldLabel : '群编号',
                        name : 'custBaseNumber',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        fieldLabel : '创建人',
                        hidden:true,
                        name : 'custBaseCreateName',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        fieldLabel : '创建机构',
                        hidden:true,
                        name : 'custBaseCreateOrg',
                        anchor : '99%'
                    }  ]
                },{
                    columnWidth : .33,
                    layout : 'form',
                    items : [{
						store : customergroupTypeStore,
						xtype : 'combo', 
						resizable : true,
						width:150,
						fieldLabel : '<span style="color:red">*</span>客户群分类',
						hiddenName : 'groupType',
						name : 'groupType',
						valueField : 'key',
						allowBlank : false,
						labelStyle : 'text-align:right;',
						displayField : 'value',
						mode : 'local',
						editable :false,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					}]
                },{
                    columnWidth : 1,
                    layout : 'form',
                    items : [ {
                        xtype : 'textarea',
                        labelStyle : 'text-align:right;',
                        fieldLabel : '客户群描述',
                        name : 'custBaseDesc',
                        anchor : '95%'
                    } ]
                } ]
            }],
            buttons:[
            {
    			text : '保存',
    			handler : function() {
    			if (!editGroupBaseInfoForm.getForm().isValid()) {
                    Ext.MessageBox.alert('提示','输入有误,请检查输入项');
                    return false;
                };
    				Ext.Msg.wait('正在保存，请稍后......','系统提示');
    			Ext.Ajax.request({
    				url : basepath + '/customergroupinfo.json',
    				params : {
    				operate:'add'
    				},
    				method : 'POST',
    				form : editGroupBaseInfoForm.getForm().id,
    				success : function() {
    					 Ext.Ajax.request({
    				         url: basepath +'/customergroupinfo!getPid.json',
    					         success:function(response){
    							 var groupId = Ext.util.JSON.decode(response.responseText).pid;
    							 var tempGroupNumber = '';
    							   if(groupId.length==5){
					        	   tempGroupNumber=tempGroupNumber+'C00'+groupId;
					  	      		 }
					  	      		else if(groupId.length==6){
					  	    		 s.append("C0"+s1);
					  	    		 tempGroupNumber=tempGroupNumber+'C0'+groupId;
					  	     		 }
					  	    	  	else {
					  	    	 	tempGroupNumber=tempGroupNumber+'C0'+groupId;
					  		      	 }
	    							 editGroupBaseInfoForm.form.findField('id').setValue(groupId);
	    							 editGroupBaseInfoForm.form.findField('custBaseNumber').setValue(tempGroupNumber);
	    							 editGroupBaseInfoForm.form.findField('custBaseCreateDate').setValue(new Date());
	    							 editGroupBaseInfoForm.form.findField('custBaseCreateName').setValue(__userId);
	    							 editGroupBaseInfoForm.form.findField('custBaseCreateOrg').setValue(__units);
    							 Ext.Msg.alert('提示', '操作成功');
    							 editGroupBaseInfoForm.form.findField('groupMemberType').setReadOnly(true);
    							 editGroupBaseInfoForm.form.findField('custFrom').setReadOnly(true);
    							 
    						 	}
    						 });
    				},
    				failure : function(response) {
    					var resultArray = Ext.util.JSON.decode(response.status);
    				       if(resultArray == 403) {
    				           Ext.Msg.alert('系统提示', response.responseText);
    				  } else{
    					Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
    				}}
    			});
    		}}]
        });

        //客户群维护窗口展示的from
    var editGroupBaseInfoPanel = new Ext.Panel( {
        layout : 'card',
        activeItem : 0,     
        autoScroll : true,
        buttonAlign : "center",
        items : [ editGroupBaseInfoForm,groupLeaguerPanel,fiexibleEditPanel,groupCustMgrPanel],
        buttons : [{ 
		     text : '上一步', 
		     handler :changePage 
		    }, 
		    { 
		     text : '下一步', 
		     handler :changePage 
		    }, {
    			text : '完    成',
    			handler : function() {
    			editGroupBaseInfoWindow.hide();
    			}
    		} ]
    });

    // 定义修改窗口
    var editGroupBaseInfoWindow = new Ext.Window({
    	layout : 'fit',
        autoScroll : true,
        draggable : true,
        closable : true,
//        maximizable : true,
        closeAction : 'hide',
        modal : true,
        width : 1000,
        height : 500,
        loadMask : true,
        border : false,
        items : [ {
            buttonAlign : "center",
            layout : 'fit',
            items : [editGroupBaseInfoPanel]
        }]
    });