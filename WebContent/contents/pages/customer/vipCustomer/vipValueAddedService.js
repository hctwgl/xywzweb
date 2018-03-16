Ext.onReady(function() {
			Ext.QuickTips.init(); 
//	var gradeStore = new Ext.data.SimpleStore({
//		fields : ['key', 'value'],
//		data : [['私人银行客户', '私人银行客户'], ['高端客户', '高端客户'],['中端客户', '中端客户'],['大众客户', '大众客户']]
//	});
	
	var serviceTypeStore = new Ext.data.SimpleStore({
		fields : ['key','value'],
		data : [['个贷优惠','个贷优惠'],['子女教育','子女教育'],['便捷出境','便捷出境'],['健康关爱','健康关爱'],['机场嘉宾服务','机场嘉宾服务'],
		        ['商务休闲','商务休闲']]
	});
	var gradeStore=util.form._store('/lookup.json?name=P_CUST_GRADE');
	gradeStore.load();
			//最终展现的panel
			var listPanel = new Mis.Ext.CrudPanel({
				id : "listPanel",
				title : "增值服务产品信息",
				stUrl : basepath + '/ValueAddProductQuery.json',
				addUrl : basepath + '/ValueAddProduct.json',
				updateUrl : basepath + '/ValueAddProduct.json',
				deUrl : basepath+ '/ValueAddProduct!batchDestroy.json',
				primary : "serverId",
				checkbox : true,
				winWidth : 450,
				winHeight: 450,
				seFormHeight :0,
				gclms : [
						{name : 'serverId',mapping : 'SERVER_ID'},
						{name : 'serverName',header:'增值服务名称',mapping : 'SERVER_NAME'},
						{name : 'serviceType',header:'增值服务类型',mapping:'SERVICE_TYPE'},
						{name : 'begDt',header:'起始时间',mapping:'BEG_DT'},
						{name : 'endDt',header:'截止时间',mapping:'END_DT'},
						{name : 'serviceBusName',header:'服务商名称',mapping:'SERVICE_BUS_NAME'},
						{name : 'levelNeed',header:'档次要求',mapping:'LEVEL_NEED'},
						{name : 'price',header:'价格范围',mapping:'PRICE'},
				        {name : 'createUser',mapping : 'CREATE_USER'},
				        {name : 'updateDate',mapping : 'UPDATE_DATE'},
				        {name : 'updateUser',mapping : 'UPDATE_USER'},
				        {name : 'serviceLinkMan',mapping:'SERVICE_LINK_MAN'},
				        {name : 'serviceBusTel',mapping:'SERVICE_BUS_TEL'},
				        {name : 'serverLinkTel',mapping:'SERVER_LINK_TEL'},
				        {name : 'areaNeed',mapping:'AREA_NEED'},
				        {name : 'serviceContent',mapping:'SERVICE_CONTENT'},
				        {name : 'remark',mapping:'REMARK'}
				        ],
				pagesize : 20,
				//from的字段
				fclms : [{
							layout:'form',
							items : [{
										name : 'serverId',
										xtype : 'hidden'
									},{
										name : 'serverName',
										fieldLabel : '增值服务名称',
										xtype : 'textfield',
										width : 100,
										maxLength :30,
										maxLengthText :'字数过长，请检查！',
										allowBlank : false,
										blankText:"不能为空，请填写",
										anchor : '90%'
									},{
										name : 'serviceType',
										hiddenName : 'serviceType',
										fieldLabel : '增值服务类型',
										xtype : 'combo',
										store : serviceTypeStore,
										width : 100,
										editable : false,
										allowBlank : false,
										blankText:"不能为空，请填写",
										valueField : 'key',
										displayField : 'value',
										mode : 'local',
										typeAhead : true,
										resizable : true,
										forceSelection : true,
										triggerAction : 'all',
										emptyText : '请选择',
										selectOnFocus : true,
										anchor : '90%'
									},{
										name:'serviceBusName',
									   fieldLabel:'服务商名称',
									   width:'100',
									   xtype:'textfield',
									   anchor:'90%'
									},{
										name:'levelNeed',
										fieldLabel:'档次要求',
										width:'100',
										xtype:'textfield',
										anchor:'90%'
									},{
										name:'price',
										fieldLabel:'价格范围',
										width:'100',
										xtype:'textfield',
										anchor:'90%'
									},{
										name:'serviceLinkMan',
										fieldLabel:'服务商联系人',
										width:'100',
										xtype:'textfield',
										anchor:'90%'
									},{
										name:'serviceBusTel',
										fieldLabel:'服务商联系电话',
										width:'100',
										xtype:'textfield',
										vtype:'telephone',
										anchor:'90%'
									},{
										name:'serverLinkTel',
										fieldLabel:'服务人员联系电话',
										width:'100',
										xtype:'textfield',
										vtype:'mobile',
										anchor:'90%'
									},{
										name:'areaNeed',
										fieldLabel:'区域要求',
										width:'100',
										xtype:'textfield',
										anchor:'90%'
									},{
										name:'begDt',
										fieldLabel:'起始时间',
										width:100,
										allowBlank:false,
										blankText:"不能为空，请填写",
										xtype:'datefield',
										format:'Y-m-d',
										anchor:'90%'
									},{
										name:'endDt',
										fieldLabel:'截止时间',
										width:100,
										allowBlank:false,
										blankText:"不能为空，请填写",
										xtype:'datefield',
										format:'Y-m-d',
										anchor:'90%'
									},{
										name:'serviceContent',
										fieldLabel:'服务内容',
										width:'100',
										xtype:'textarea',
										maxLength:200,
										anchor:'90%'
									},{
										name:'remark',
										fieldLabel:'备注',
										width:'100',
										xtype:'textarea',
										maxLength:200,
										anchor:'90%'
									},{
										name :'createDate',
										value:new Date(),
										xtype:'datefield',
										format:'Y-m-d',
										hidden:true
									},{
										name :'createUser',
										value:__userId,
										xtype:'hidden'
									},{
										name :'updateDate',
										xtype:'datefield',
										hidden:true
									},{
										name :'updateUser',
										xtype:'hidden'
									}]
						}]
			});
			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ listPanel ]
			});
		});