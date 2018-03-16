Ext.onReady(function() {
		Ext.QuickTips.init(); 
		var serviceStore=util.form._store('/ValueAddProduct!indexAll.json','serverId','serverName');	
		serviceStore.load();
		var gradeStore=util.form._store('/lookup.json?name=P_CUST_GRADE');
		gradeStore.load();
		var search_cust = new Com.yucheng.bcrm.common.CustomerQueryField({ 
			fieldLabel : '客户姓名', 
			labelStyle: 'text-align:right;',
			labelWidth : 100,
			name : 'custName',
			id:'custName',
			custtype :'1',//客户类型：  1：对私, 2:对公,  不设默认全部
//			    custStat:'1',//客户状态: 1:正式 2：潜在     , 不设默认全部
		    singleSelected:true,//单选复选标志
			editable : false,
			allowBlank:false,//不允许为空
			blankText:"不能为空，请填写",
			anchor : '90%',
			hiddenName:'abcd',
			callback :function(){
				var cust_id = null;
				var cust_name = null;
				var cust_type = null;
				cust_name = Ext.getCmp('custName').getValue();
				if (cust_name != null && cust_name != '') {
					cust_id = Ext.getCmp('custName').customerId;
					cust_type = Ext.getCmp('custName').custtype;
					listPanel.fp.getForm().findField('custId').setValue(cust_id);
					listPanel.fp.getForm().findField('custGrade').setValue(cust_type);
				}
			}
		});
			//最终展现的panel
			var listPanel = new Mis.Ext.CrudPanel({
				id : "listPanel",
				title : "客户反馈",
				stUrl : basepath + '/ValueAddServiceQuery.json?optype=1',
				addUrl : basepath + '/ValueAddService.json',
				updateUrl : basepath + '/ValueAddService.json',
				deUrl : basepath+ '/ValueAddService!batchDestroy.json',
				primary : "id",
				checkbox : true,
				defaultLoad : true,
				winWidth : 400,
				winHeight: 260,
				seFormHeight :0,
				gclms : [
						{name : 'id',mapping : 'ID'},
						{name : 'serverId',header:'服务编号',mapping : 'SERVER_ID'},
						{name : 'serverName',header:'服务名称',mapping : 'SERVER_NAME'},
				        {name : 'custId',header:'客户编号',mapping : 'CUST_ID'},
				        {name : 'custName',header:'客户名称',mapping : 'CUST_NAME'},
				        {name : 'custGrade',header:'客户等级',mapping : 'CUST_GRADE_ORA'},
				        {name : 'feedback',header:'反馈意见',mapping : 'FEEDBACK'},
				        {name : 'barterCon',mapping : 'BARTER_CON'},
				        {name : 'createDate',mapping : 'CREATE_DATE'},
				        {name : 'createOrg',mapping : 'CREATE_ORG'},
				        {name : 'createUser',mapping : 'CREATE_USER'},
				        {name : 'requestment',mapping : 'REQUESTMENT'}],
				pagesize : 20,
				//from的字段
				fclms : [{
							layout:'form',
							labelAlign :'right',
							items : [{
										name : 'id',
										xtype : 'hidden'
							},
//								{
//										name : 'serverId',
//										fieldLabel : '服务编号',
//										xtype : 'numberfield',
//										width : 100,
//										allowBlank : false,
//									 	blankText:"不能为空，请填写",
//										anchor : '90%'
//
//									}, 
										{		
												hiddenName : 'serverId',
												xtype : 'combo',
												fieldLabel : '服务名称',
												store : serviceStore,
												forceSelection : true,
												editable : false,
												triggerAction : 'all',
												valueField : 'serverId',
												displayField : 'serverName',
												allowBlank : false,
												blankText:"不能为空，请填写",
												listeners :{
														'change':function(v){
														 if(v!=''){
														 	Ext.getCmp('server_name_id').setValue(v.getRawValue());
														 }else{
														 	Ext.getCmp('server_name_id').setValue('');
														 }
														}
												},
												anchor : '90%'
											},{
												id:'server_name_id',
										name : 'serverName',
										xtype :'hidden'
									},
										{
										name : 'custId',
										xtype : 'hidden'
									},search_cust,{
										name : 'custGrade',
										hiddenName : 'custGrade',
										fieldLabel : '客户级别',
										xtype : 'combo',
										store : gradeStore,
										width : 100,
										editable : false,
										readOnly : true,
										blankText:"不能为空，请填写",
										valueField : 'key',
										displayField : 'value',
										mode : 'local',
										typeAhead : true,
										resizable : true,
										forceSelection : true,
										triggerAction : 'all',
										selectOnFocus : true,
										anchor : '90%'
									},{
										name : 'feedback',
										fieldLabel : '反馈意见',
										xtype : 'textarea',
										width : 100,
										allowBlank : false,
										maxLength :800,
										blankText:"不能为空，请填写",
										maxText :'内容过长，请检查！',
										anchor : '90%'

									},{
										name : 'requestment',
										xtype : 'hidden'
							},{
										name : 'barterCon',
										xtype : 'hidden'
							},{
										name : 'createDate',
										xtype : 'hidden'
							},{
										name : 'createUser',
										xtype : 'hidden'
							},{
										name : 'createOrg',
										xtype : 'hidden'
							}]
						}]
			});
			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ listPanel ]
			});
		});