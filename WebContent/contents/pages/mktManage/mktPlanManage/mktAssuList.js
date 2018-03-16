var taskId = null;//任务编号
var num = 0;//详情的card页面序号
var type = '';//用以区分新增和修改时的窗口标题
Ext.onReady(function() {
		
	//切换子面板 
		  function changePage(btn){
		  	var tempId = mktAssEditInfoForm.form.findField('taskId').getValue();
		  	if(''==tempId||undefined==tempId){
		  		Ext.Msg.alert('系统提示','请先完善基本信息,并点击保存!');
		  		return false;
		  	}
		  	
		   var index = Number(mktAssuInfoPanel.layout.activeItem.id.substring(4)); 
		   if(btn.text == '上一步'){ 
		    index -= 1; 
		    if(index <1){ 
		     index = 1; 
		    } 
		   mktAssEditWindow.setTitle('营销任务'+type+'-->第'+index+'步，共3步');
		   }else{
		    index += 1; 
		    mktAssEditWindow.setTitle('营销任务'+type+'-->第'+index+'步，共3步');
		    if(index=='2'){
		    var distTaskType = mktAssEditInfoForm.form.findField('distTaskType').getValue();
		    if('1'==distTaskType){
		    Ext.getCmp('operateUser').setVisible(false);
		    Ext.getCmp('operateOrg').setVisible(true);
		    }else if('2'==distTaskType){
		    Ext.getCmp('operateUser').setVisible(true);
		    Ext.getCmp('operateOrg').setVisible(false);
		    }
	    	mktRelateOperObjStore.reload({
			params : {
				start : 0,
				limit : parseInt(mktRelateOperObj_combo.getValue())
			}
			});
		    }
		    if(index=='3'){
		    mktRelateTargetStore_mend.reload({
			params : {
				start : 0,
				limit : parseInt(mktRelateTarget_combo.getValue())
			}
			});	
		    }   
		    if(index >3) index = 3; 
		   }
		   if(index==1){
			   mktAssuInfoPanel.buttons[0].setDisabled(true);   
		   }else{
			   mktAssuInfoPanel.buttons[0].setDisabled(false);   
		   }
		   
		   if(index==3){
			   mktAssuInfoPanel.buttons[1].setDisabled(true);   
		   }else{
			   mktAssuInfoPanel.buttons[1].setDisabled(false);   
		   }
		   mktAssuInfoPanel.layout.setActiveItem('info'+index); 
		  };
		  
			var searchPanel = new Ext.form.FormPanel({
				title : "营销任务查询",
				labelWidth : 105,
				labelAlign : 'right',
				height : 100,
				frame : true,
				region : 'north',
				autoScroll : true,
				layout : 'column',
				items : [{
				    columnWidth : .25,
				    layout : 'form',
				    items : [ {
				        store : assuStatStore,
				        xtype : 'combo', 
				        resizable : true,
				        name : 'TASK_STAT',
				        hiddenName : 'TASK_STAT',
				        fieldLabel : '营销任务状态',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						anchor : '90%'
				    }]
				},{
					columnWidth : .25,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						//Width : '100',
						name : 'TASK_NAME',
						fieldLabel : '任务名称',
						anchor : '90%'
					} ]
				},{
					columnWidth : .25,
					layout : 'form',
					items : [new Com.yucheng.crm.common.OrgUserManage({ 
						xtype:'userchoose',
						fieldLabel : '下达人', 
						id:'dist',
						labelStyle: 'text-align:right;',
						name : 'CUST_MANAGER',
						hiddenName:'DIST_USER',
						//searchRoleType:('127,47'),  //指定查询角色属性
						searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
						singleSelect:false,
						anchor : '90%'
						})]
				},{
					columnWidth : .25,
					layout : 'form',
					items : [new Com.yucheng.crm.common.OrgUserManage({ 
						xtype:'userchoose',
						fieldLabel : '执行人', 
						id:'oper',
						labelStyle: 'text-align:right;',
						name : 'CUST_MANAGER',
						hiddenName:'OPER_USER',
						//searchRoleType:('127,47'),  //指定查询角色属性
						searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
						singleSelect:false,
						anchor : '90%'
						})]
				},{
					columnWidth : .25,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						//Width : '100',
						name : 'OPER_ORG',
						hidden:true,
						fieldLabel : '执行人机构',
						anchor : '90%'
					}]
				}],
				buttonAlign : 'center',
				buttons : [ {
					text : '查询',
					handler : function() {
						var conditionStr = searchPanel.getForm().getValues(
								false);
						store.baseParams = {
								"condition" : Ext.encode(conditionStr)
							};
						store.load({
							params : {
								start : 0,
								limit : parseInt(pagesize_combo.getValue())
							}
						});

					}
				}, {
					text : '重置',
					handler : function() {
						searchPanel.getForm().reset();
						Ext.getCmp("dist").setValue('');
						Ext.getCmp("oper").setValue('');
					}
				}  ]

			});

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});
			var sm = new Ext.grid.CheckboxSelectionModel();
			var columns = new Ext.grid.ColumnModel([ rownum,sm,{
				header : '营销任务编号',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'taskId',
				sortable : true
			}, {
				header : '营销任务名称',
				width : 200,
				align : 'left',
				dataIndex : 'taskName',
				sortable : true
			}, {
				header : '营销任务状态',
				width : 130,
				align : 'left',
				dataIndex : 'taskStat',
				sortable : true
			}/*,{
				header :'费用金额',
				width:130,
				align:'right',
				dataIndex:'feeAmt',
				renderer:money('0,000.00'),
				sortable :true
			}*/, {
				header : '下达人',
				width : 130,
				align : 'left',
				dataIndex : 'distUserName',
				sortable : true
			}, {
				header : '下达人Id',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'distUser',
				sortable : true
			}, {
				header : '下达时间',
				width : 130,
				align : 'left',
				dataIndex : 'taskDistDate',
				sortable : true
			}, {
				header : '下达机构',
				width : 180,
				align : 'left',
				dataIndex : 'distOrgName',
				sortable : true
			}, {
				header : '执行人机构',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'operOrg',
				sortable : true
			}, {
				header : '执行人',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'operName',
				sortable : true
			}, {
				header : '执行人ID',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'operUser',
				sortable : true
			}, {
				header : '创建人',
				width : 130,
				align : 'left',
				dataIndex : 'createUserName',
				sortable : true
			}, {
				header : '创建人ID',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'createUser',
				sortable : true
			}/*, {
				header : '创建机构',
				width : 170,
				align : 'left',
				dataIndex : 'createDate',
				sortable : true
			}*/, {
				header : '任务创建日期',
				width : 130,
				align : 'left',
				dataIndex : 'createDate',
				sortable : true
			}, {
				header : '任务内容',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'taskDetail',
				sortable : true
			}, {
				header : '任务开始时间',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'taskBeginDate',
				sortable : true
			}, {
				header : '任务结束时间',
				width : 130,
				align : 'left',
				hidden:true,
				dataIndex : 'taskEndDate',
				sortable : true
			}]);

			var record = Ext.data.Record.create([ {
				name : 'taskId',
				mapping : 'TASK_ID'
			}, {
				name : 'distOrg',
				mapping : 'DIST_ORG'
			}, {
				name : 'distOrgName',
				mapping : 'DIST_ORG_NAME'
			},{
				name : 'distTaskType',
				mapping : 'DIST_TASK_TYPE'
			},{
				name : 'createDate',
				mapping : 'CREATE_DATE'
			}, {
				name : 'createUser',
				mapping : 'CREATE_USER'
			}, {
				name : 'diskUser',
				mapping : 'DISK_USER'
			},{
				name:'distUser',
				mapping:'DIST_USER'
			},{
				name:'distUserName',
				mapping:'DIST_USER_NAME'
			},{
				name:'feeAmt',
				mapping:'FEE_AMT',
				type:'float'
			},{
				name : 'createDate',
				mapping : 'CREATE_DATE'
			},{
				name : 'memo',
				mapping : 'MEMO'
			},{
				name : 'operOrg',
				mapping : 'OPER_ORG'
			},{
				name : 'operUser',
				mapping : 'OPER_USER'
			},{
				name : 'taskBeginDate',
				mapping : 'TASK_BEGIN_DATE'
			},{
				name : 'taskDetail',
				mapping : 'TASK_DETAIL'
			},{
				name : 'taskDistDate',
				mapping : 'TASK_DIST_DATE'
			},{
				name : 'taskEndDate',
				mapping : 'TASK_END_DATE'
			},{
				name : 'taskName',
				mapping : 'TASK_NAME'
			},{
				name : 'taskParentId',
				mapping : 'TASK_PARENT_ID'
			},{
				name : 'taskStat',
				mapping : 'TASK_STAT_ORA'
			},{
				name : 'taskType',
				mapping : 'TASK_TYPE'
			},{
				name : 'createUserName',
				mapping : 'CREATE_USER_NAME'
			},{
				name : 'diskName',
				mapping : 'DISK_NAME'
			},{
				name : 'operName',
				mapping : 'OPER_NAME'
			}]);

			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/marketassuinfo.json',
					failure : function(response) {
						var resultArray = Ext.util.JSON.decode(response.status);
						if(resultArray == 403) {
							Ext.Msg.alert('提示', response.responseText);
						}
					}
				}),
				reader : new Ext.data.JsonReader({
					successProperty: 'success',
			        idProperty: 'PLAN_ID',
			        messageProperty: 'message',
					root : 'json.data',
					totalProperty: 'json.count'
				}, record)
			});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10条/页' ], [ 20, '20条/页' ], [ 50, '50条/页' ],
								[ 100, '100条/页' ], [ 250, '250条/页' ],
								[ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '20',
				resizable : true,
				width : 85
			});

			// 默认加载数据
//			store.load({
//				params : {
//					start : 0,
//					limit : parseInt(pagesize_combo.getValue())
//				}
//			});

			// 改变每页显示条数reload数据
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(pagesize_combo.getValue()),
				store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
			});
			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : parseInt(pagesize_combo.getValue()),
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});

			var listPanel = new Ext.grid.GridPanel(
					{
						title : "营销任务列表",
						store : store,
						frame : true,
						id : 'listPanel',
						cm : columns,
						sm : sm,
						stripeRows : true,
						tbar : [/*{
							title:'测试按钮',
							handler:function(){
							testWindow.show();
						}
						},*/
								{
									text : '新增',
									iconCls:'addIconCss',
									handler : function() {
										type = '新增';
										mktAssEditWindow.setTitle('营销任务'+type);
										addInit();
									}
								},
								'-',
								{
									text : '修改',
									iconCls:'editIconCss',
									handler : function() {
										type = '修改';
										var selectLength = listPanel.getSelectionModel().getSelections().length;
										var selectRe = listPanel.getSelectionModel().getSelections()[0];

										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										} else {
											mktAssEditInfoForm.getForm().loadRecord(selectRe);
											mktAssEditWindow.setTitle('营销任务'+type);
												editInit();
										}
									}

								},
								'-',
								{
									text : '删除',
									iconCls:'deleteIconCss',
									handler : function() {
									var checkedNodes = listPanel.getSelectionModel().selections.items;
										 var selectLength = listPanel.getSelectionModel().getSelections().length;
										 var selectRe;
										 var tempId;
										 var idStr = '';
										 var marketPlanStatement;
										if(selectLength < 1){
											Ext.Msg.alert('提示','请选择需要删除的记录!');
										} else {
											var tempSign = listPanel.getSelectionModel().selections.items[0].data.taskStat;
											if(tempSign!="暂存"){
												Ext.Msg.alert('系统提示','只能删除【暂存】状态下的营销任务！');
												return false;
											}else{
											var json={'id':[]};
											for(var i = 0; i<checkedNodes.length;i++)
											{
												json.id.push(checkedNodes[i].data.taskId);
											}
												Ext.MessageBox.confirm('提示','确定删除吗?',function(buttonId){
													if(buttonId.toLowerCase() == "no"){
      												return;
													} 
													Ext.Ajax.request({
																url : basepath+'/marketassuinfo.json',
																 method: 'POST',
																params:{
																cbid:Ext.encode(json),
																'operate':'delete'
																},	
																waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
																success : function() {
																	Ext.Msg.alert('提示', '操作成功');
																	store.reload();
																},
																failure : function(response) {
																	var resultArray = Ext.util.JSON.decode(response.status);
																	if(resultArray == 403) {
																           Ext.Msg.alert('提示', response.responseText);
																  } else {

																	Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
																	store.reload();
																  }
																}
															});

												})
												;
										}
										}
									}
								},
								'-',
								{
									text : '分解',
									iconCls:'resetIconCss',
									handler : function() {
										var selectLength = listPanel.getSelectionModel().getSelections().length;
										var selectRe = listPanel.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}
										else {
												var tempSign = listPanel.getSelectionModel().selections.items[0].data.taskStat;
												if(tempSign!="暂存"){
													Ext.Msg.alert('系统提示','只能下达【暂存】状态下的营销任务！');
													return false;
												}
											else{
												mktAssuRessuResolveForm.form.reset();
//											mktAssuRessuResolveForm.getForm().loadRecord(selectRe);
											mktAssuRessuResolveForm.form.findField('taskParentId').setValue(selectRe.data.taskId);
											mktAssuRessuResolveForm.form.findField('taskParentName').setValue(selectRe.data.taskName);
											mktAssuRessuResolveForm.form.findField('taskId').setValue();
											mktAssuRessuResolveForm.form.findField('taskName').setValue();
												distributeInit();
										}
										}
									}
								},
								'-',
								{
									text : '下达',
									iconCls:'custGroupMemIconCss',
									handler : function() {
										transTask(listPanel,store);
									}
								},'-',
								{
									text : '调整',
									iconCls:'editIconCss',
									handler : function() {
										adjustTask(listPanel,store);
									}
								},'-',
								{
									text : '关闭',
									iconCls:'closeIconCss',
									handler : function() {
										var selectLength = listPanel.getSelectionModel().getSelections().length;
										var selectRe = listPanel.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										} else {
											var tempOper = listPanel.getSelectionModel().selections.items[0].data.operUser;
											var tempStat = listPanel.getSelectionModel().selections.items[0].data.taskStat;
											if(tempOper!=__userId||tempStat!="执行中"){
												Ext.Msg.alert('系统提示','操作失败，可能原因：<br> 1:执行人不为操作者本人！<br> 2:该记录不是【执行中】状态！');
												return false;
											}else{
											//判断子任务关闭情况
												taskId = listPanel.getSelectionModel().selections.items[0].data.taskId;
												Ext.Ajax.request({
													url : basepath + '/marketassuinfo!ifExitSunTask.json',
													params:{'taskId':taskId},
									    				method : 'GET',
													waitMsg : '正在查询数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success :checkResult,
													failure :checkResult
												});
												
												function checkResult(response) {
													var resultArray = Ext.util.JSON.decode(response.status);
													if (resultArray == 200 ||resultArray == 201) {
														var ifExit =  Ext.util.JSON.decode(response.responseText).ifExit;//是否存在未关闭的子任务
														var names =  Ext.util.JSON.decode(response.responseText).names;//未关闭的子任务名字
														if(ifExit=='yes'){
															Ext.Msg.alert('系统提示','完成此操作需要先关闭以下子任务：<br>'+names);
														}else{
															//打开指标列表
															closePlanInit();
															mktCloseStore.reload({
																	params : {
																		start : 0,
																		limit : parseInt(mktClose_combo.getValue())
																	}
																	});	
														}
													}
												};
										}
										}
									}
								},'-',
								{
									text : '详情',
									iconCls:'detailIconCss',
									handler : function() {
										var selectLength = listPanel.getSelectionModel().getSelections().length;
										var selectRe = listPanel.getSelectionModel().getSelections()[0];

										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										} else {
											num=0;
											taskId = listPanel.getSelectionModel().selections.items[0].data.taskId;
											detailPlanForm.getForm().loadRecord(selectRe);
											detailPlanInit();
											detailPlanPanel.getLayout().setActiveItem(num);	
										}
									}
								}
								],
						region : 'center',
						frame : true,
						bbar : bbar,// 分页工具栏
						viewConfig : {
						// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});
			
			listPanel.on('rowdblclick', function(listPanel, rowIndex, event) {

				var selectRe = listPanel.getSelectionModel().getSelections()[0];

				if (selectRe == null
						|| selectRe == "undefined") {
					Ext.Msg.alert('提示','请选择一条记录!');
				} else {
					num = 0;
					taskId = listPanel.getSelectionModel().selections.items[0].data.taskId;
					detailPlanForm.getForm().loadRecord(selectRe);
					detailPlanInit();
					detailPlanPanel.getLayout().setActiveItem(num);
				}
			});
			
			// 关闭任务信息展示的form
			var closePlanForm = new Ext.form.FormPanel({
			labelWidth : 100,
			height : 200,
			frame : true,
			labelAlign : 'right',
			region : 'center',
			autoScroll : true,
			buttonAlign : "center",
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						name : 'taskId',
						xtype : 'textfield',
						fieldLabel : '*营销任务ID',
						width : '100',
						hidden: true,
						anchor : '90%'
					},{
						name : 'taskName',
						xtype : 'textfield',
						fieldLabel : '*营销任务名称',
						width : '100',
						readOnly:true,
						anchor : '90%',
						allowBlank : false
					}, {
						name : 'taskParentId',
						xtype : 'textfield',
						fieldLabel : '上级任务编号',
						width : '100',
						readOnly:true,
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'numberfield',
						width : 200,
						fieldLabel : '费用金额',
						name : 'feeAmt',
						readOnly:true,
						anchor : '90%'
					},{
						name : 'distOrg',
						xtype : 'textfield',
						fieldLabel : '下达机构',
//						hidden:true,
						readOnly:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					},{
						name : 'operUser',
						xtype : 'textfield',
						fieldLabel : '执行人ID',
						editable:false,
						readOnly:true,
						hidden:true,
						width : '100',
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					}, {
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '任务下达时间',
//						hidden:true,
						name : 'taskDistDate',
						anchor : '90%'
					} ,{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '创建人',
						name : 'createUserName',
//						hidden:true,
						anchor : '90%'
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [{
						name : 'operName',
						xtype : 'textfield',
						fieldLabel : '执行人',
						editable:false,
						readOnly:true,
						width : '100',
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						store : taskTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'taskType',
						hiddenName : 'taskType',
						fieldLabel : '营销任务类型',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						readOnly:true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						store : tempAssuStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'taskStat',
						allowBlank : false,
						hiddenName : 'taskStat',
						fieldLabel : '营销任务状态',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'diskName',
						xtype : 'textfield',
						fieldLabel : '下达人',
//						hidden:true,
						width : '100',
						readOnly:true,
						anchor : '90%'
//						allowBlank : false
					}, {
						name : 'distUser',
						xtype : 'textfield',
						fieldLabel : '下达人ID',
						hidden:true,
						width : '100',
						readOnly:true,
						anchor : '90%'
//						allowBlank : false
					}, {
						store : operTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'distTaskType',
						hiddenName : 'distTaskType',
						fieldLabel : '任务执行对象类型',
						hidden:true,
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						readOnly:true,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'operOrg',
						xtype : 'textfield',
						fieldLabel : '执行机构',
						hidden:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '任务结束时间',
						name : 'taskEndDate',
						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '任务开始时间',
//						hidden:true,
						name : 'taskBeginDate',
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '创建人ID',
						name : 'createUser',
						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
//						hidden:true,
						readOnly:true,
						fieldLabel : '创建时间',
						name : 'createDate',
						anchor : '90%'
					}]
				}

				]
			},{
				layout : 'form',
				buttonAlign : 'center',
				items : [ {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '任务详情',
					name : 'taskDetail',
					anchor : '90%'
				}, {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '备注',
					name : 'memo',
					anchor : '90%'
				}]
			}
			]

		});

			// 任务详细信息展示的form
			var detailPlanForm = new Ext.form.FormPanel({
			labelWidth : 140,
			frame : true,
			labelAlign : 'right',
			region : 'center',
			autoScroll : true,
			buttonAlign : "center",
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						name : 'taskId',
						xtype : 'textfield',
						fieldLabel : '*营销任务ID',
						width : '100',
						hidden: true,
						anchor : '90%'
					},{
						name : 'taskName',
						xtype : 'textfield',
						fieldLabel : '*营销任务名称',
						width : '100',
						readOnly:true,
						anchor : '90%',
						allowBlank : false
					}, {
						name : 'taskParentId',
						xtype : 'textfield',
						fieldLabel : '上级任务编号',
						width : '100',
						readOnly:true,
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'numberfield',
						width : 200,
						fieldLabel : '费用金额',
						name : 'feeAmt',
						readOnly:true,
						anchor : '90%'
					},{
						name : 'distOrgName',
						xtype : 'textfield',
						fieldLabel : '下达机构',
//						hidden:true,
						readOnly:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					},{
						name : 'operUser',
						xtype : 'textfield',
						fieldLabel : '执行人ID',
						editable:false,
						readOnly:true,
						hidden:true,
						width : '100',
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '任务开始时间',
//						hidden:true,
						name : 'taskBeginDate',
						anchor : '90%'
					}, {
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '任务下达时间',
//						hidden:true,
						name : 'taskDistDate',
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '创建人',
						name : 'createUserName',
//						hidden:true,
						anchor : '90%'
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [{
						name : 'operName',
						xtype : 'textfield',
						fieldLabel : '执行人',
						editable:false,
						readOnly:true,
						width : '100',
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					} ,{
						store : taskTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'taskType',
						hiddenName : 'taskType',
						fieldLabel : '营销任务类型',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						readOnly:true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						store : tempAssuStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'taskStat',
						readOnly:true,
						hiddenName : 'taskStat',
						fieldLabel : '营销任务状态',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'distUserName',
						xtype : 'textfield',
						fieldLabel : '下达人',
//						hidden:true,
						width : '100',
						readOnly:true,
						anchor : '90%'
//						allowBlank : false
					}, {
						name : 'distUser',
						xtype : 'textfield',
						fieldLabel : '下达人ID',
						hidden:true,
						width : '100',
						readOnly:true,
						anchor : '90%'
//						allowBlank : false
					}, {
						store : operTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'distTaskType',
						hiddenName : 'distTaskType',
						fieldLabel : '任务执行对象类型',
						hidden:true,
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						readOnly:true,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'operOrg',
						xtype : 'textfield',
						fieldLabel : '执行机构',
						hidden:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '任务结束时间',
						name : 'taskEndDate',
//						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						readOnly:true,
						fieldLabel : '创建人ID',
						name : 'createUser',
//						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
//						hidden:true,
						readOnly:true,
						fieldLabel : '创建时间',
						name : 'createDate',
						anchor : '90%'
					}]
				}

				]
			},{
				layout : 'form',
				buttonAlign : 'center',
				items : [ {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '任务详情',
					name : 'taskDetail',
					anchor : '90%'
				}, {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '备注',
					name : 'memo',
					anchor : '90%'
				}]
			}
			]

		});

			// 年度指标卡展示的form
			var yearForm = new Ext.form.FormPanel({
			labelWidth : 100,
			width:790,
			height : 350,
			frame : true,
			labelAlign : 'right',
			region : 'center',
			autoScroll : true,
			buttonAlign : "center",
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [{
						name : 'taskName',
						xtype : 'textfield',
						fieldLabel : '考核年度',
						width : '100',
						anchor : '90%',
						allowBlank : false
					}, {
						name : 'taskParentId',
						xtype : 'textfield',
						fieldLabel : '执行对象名称',
						width : '100',
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '执行对象编号',  
						name : 'feeAmt',
						anchor : '90%'
					}, {
						xtype : 'textfield',
						width : 200,
						fieldLabel : '*指标值',
						name : 'taskDistDate',
						readOnly:true,
						anchor : '90%'
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '指标项名称',  
						name : 'feeAmt',
						anchor : '90%'
					}, {
						xtype : 'textfield',
						width : 200,
						fieldLabel : '上级指标任务',
						name : 'taskDistDate',
						anchor : '90%'
					}, {
						xtype : 'textfield',
						width : 200,
						fieldLabel : '指标状态',
						name : 'taskDistDate',
						anchor : '90%'
					}]
				}

				]
			}
			,{    
				layout : 'form',
				items : [{
						labelWidth:50,
			            xtype: 'fieldset',
				            title: '一季度指标',
				            autoHeight:true,
				            layout : 'column',
				            columnWidth:.5,
				            anchor : '95%',
				            items: [
		                    	{
							 	layout:'form',
							 	 columnWidth:.33,
								items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'一月'}
										]},
									 {	 	
							 	layout:'form',
							 	 columnWidth:.33,
								 	items:[		 	
											{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'二月'}
										]},
										 {
								 layout:'form',
								 	 columnWidth:.33,
									 	items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'三月'
										}
										]}
				            ]
				        }]
			},{     columnWidth:.5,
					layout : 'form',
				items : [{
						labelWidth:50,
			            xtype: 'fieldset',
				            title: '二季度指标',
				            autoHeight:true,
				            layout : 'column',
				            anchor : '95%',
				            items: [
		                    	{
							 	layout:'form',
							 	 columnWidth:.33,
								items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'四月'}
										]},
									 {	 	
							 	layout:'form',
							 	 columnWidth:.33,
								 	items:[		 	
											{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'五月'}
										]},
										 {
								 layout:'form',
								 	 columnWidth:.33,
									 	items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'六月'
										}
										]}
				            ]
				        }]
			},{     columnWidth:.5,
					layout : 'form',
				items : [{
						labelWidth:50,
			            xtype: 'fieldset',
				            title: '三季度指标',
				            autoHeight:true,
				            layout : 'column',
				            anchor : '95%',
				            items: [
		                    	{
							 	layout:'form',
							 	 columnWidth:.33,
								items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'七月'}
										]},
									 {	 	
							 	layout:'form',
							 	 columnWidth:.33,
								 	items:[		 	
											{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'八月'}
										]},
										 {
								 layout:'form',
								 	 columnWidth:.33,
									 	items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'九月'
										}
										]}
				            ]
				        }]
			},{     columnWidth:.5,
					layout : 'form',
				items : [{
						labelWidth:50,
			            xtype: 'fieldset',
				            title: '四季度指标',
				            autoHeight:true,
				            layout : 'column',
				            anchor : '95%',
				            items: [
		                    	{
							 	layout:'form',
							 	 columnWidth:.33,
								items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'十月'}
										]},
									 {	 	
							 	layout:'form',
							 	 columnWidth:.33,
								 	items:[		 	
											{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'十一月'}
										]},
										 {
								 layout:'form',
								 	 columnWidth:.33,
									 	items:[		 	
										{name:'PROD_START_DATE_TO',anchor:'90%',xtype:'textfield',fieldLabel:'十二月'
										}
										]}
				            ]
				        }]
			}],
			buttons : [
						{
						text : '保  存'},
						{	text : '关闭',
							handler : function() {
							distributePlanWindow.hide();
							}}
					
						]

		});
			
			// 下达任务展示的form
			var distributePlanForm = new Ext.form.FormPanel({
			labelWidth : 100,
			height : 400,
			frame : true,
			labelAlign : 'right',
			region : 'center',
			autoScroll : true,
			buttonAlign : "center",
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [{
						name : 'taskName',
						xtype : 'textfield',
						fieldLabel : '*营销任务名称',
						width : '100',
						anchor : '90%',
						allowBlank : false
					}, {
						name : 'taskParentId',
						id:'temptaskParentId',
						xtype : 'textfield',
						fieldLabel : '上级任务编号',
						width : '100',
						readOnly:true,
//						hidden:true,
						anchor : '90%'
//						allowBlank : false
					},{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '费用金额',
						name : 'feeAmt',
						anchor : '90%'
					},new Com.yucheng.crm.common.OrgUserManage({ 
						xtype:'userchoose',
						fieldLabel : '执行人', 
						id:'operU',
						labelStyle: 'text-align:right;',
						name : 'OPER_USER',
						hiddenName:'operUser',
						//searchRoleType:('127,47'),  //指定查询角色属性
						searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
						singleSelect:true,
						anchor : '90%'
						}),{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '任务下达时间',
						hidden:true,
						name : 'taskDistDate',
						anchor : '90%'
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						name : 'distOrg',
						xtype : 'textfield',
						fieldLabel : '下达机构',
						hidden:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					},{
						store : taskTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'taskType',
						hiddenName : 'taskType',
						fieldLabel : '营销任务类型',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'taskStat',
						xtype : 'textfield',
						fieldLabel : '营销任务状态',
						hidden:true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'distUser',
						xtype : 'textfield',
						fieldLabel : '下达人',
						hidden:true,
						width : '100',
						anchor : '90%'
					}, {
						store : operTypeStatStore,
						xtype : 'combo', 
						resizable : true,
						name : 'distTaskType',
						hiddenName : 'distTaskType',
						fieldLabel : '任务执行对象类型',
						allowBlank:false,
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						editable : false,
						typeAhead : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}, {
						name : 'operOrg',
						xtype : 'textfield',
						fieldLabel : '执行机构',
						hidden:true,
						width : '100',
						anchor : '90%'
//						allowBlank : false
					}, {
						xtype : 'datefield',
						width : 200,
						fieldLabel : '任务开始时间',
//						hidden:true,
						format:'Y-m-d',
						name : 'taskBeginDate',
						anchor : '90%'
					},{
						xtype : 'datefield',
						width : 200,
						fieldLabel : '任务结束时间',
						name : 'taskEndDate',
						format:'Y-m-d',
//						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						fieldLabel : '创建人',
						name : 'createUser',
						hidden:true,
						anchor : '90%'
					},{
						xtype : 'textfield',
						width : 200,
						hidden:true,
						fieldLabel : '创建时间',
						name : 'createDate',
						anchor : '90%'
					}]
				}

				]
			},{
				layout : 'form',
				buttonAlign : 'center',
				items : [ {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '任务详情',
					name : 'taskDetail',
					anchor : '90%'
				}, {
					xtype : 'textarea',
					labelStyle : {
					width : '120px'
					},
					width : 200,
					fieldLabel : '备注',
					name : 'memo',
					anchor : '90%'
				}],
				buttons : [
							{
							text : '保  存',
							handler : function() {
								if(!distributePlanForm.getForm().isValid()) { 
									Ext.Msg.alert("系统提示","请填写相关信息！");
									return false;
								}
									var cust_id = null;
									var cust_name = null;
									var tempT = null;
									var jsonTemp = null;
									cust_name = Ext.getCmp('operU').getValue();
									if (cust_name != null && cust_name != '') {
										tempT = Ext.getCmp('operU').hiddenField.getValue();
										jsonTemp={'id':[]};
										for (var i = 0; i < tempT.length; i++){
											jsonTemp.id.push(tempT[i]);
										}
									}
								Ext.Ajax.request({
									url : basepath + '/market-assu.json?a=2',
									method : 'POST',
									params:{
										 cbid:Ext.encode(jsonTemp),
										'operate':'distribut'
										},	
									form : distributePlanForm.getForm().id,
									waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
									success : function() {
										Ext.Msg.alert('提示', '操作成功');
										store.reload();
									},
									failure : function(response) {
										var resultArray = Ext.util.JSON.decode(response.status);
										 if(resultArray == 403) {
									           Ext.Msg.alert('提示', response.responseText);
										 }else{
										Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
									}
									}
								});
								distributePlanWindow.hide();
								distributePlanForm.getForm().reset();
							}
								
							},
							{	text : '关闭',
								handler : function() {
								distributePlanWindow.hide();
								}}
						
							]
			}
			]

		});

		//定义分解tabPanel
			var disatrTp = new Ext.TabPanel({
				id : 'disatrTps',
				activeTab : 0,
				tabPosition : 'bottom',   
				items : [ {
					title : '基本信息',
					items : [distributePlanForm]
				},{
					title : '指标信息',
					items : [mktSearch,mktAssuListPanel]    //addDetailProduct,planProdListPanel
				},{
					title : '分解信息',
					items : [mktMonthSearch,mktAssuMonthListPanel]    //addDetailProduct,mktAssuListPanel
				}]

			});

			//切换详情面板 
			  function changeDetailPage(btn){
			   if(btn.text == '上一步'){
				   if(num !=0)
					   num -= 1 ;
					   
			   } 
			   if(btn.text == '下一步'){
				   if(num !=2)
					   num += 1;
			   }
			   if(num ==0){
				   detailPlanPanel.buttons[0].setDisabled(true);
				   detailPlanPanel.buttons[1].setDisabled(false);
				   
			   }
			   if(num ==1){
				   executorStore.reload({
						params : {
							start : 0,
							limit : parseInt(executor_combo.getValue())
						}
						});
				   detailPlanPanel.buttons[0].setDisabled(false);
				   detailPlanPanel.buttons[1].setDisabled(false);
				   
			   }
			   if(num ==2){
				   targetStore.reload({
						params : {
							start : 0,
							limit : parseInt(target_combo.getValue())
						}
						});
				   detailPlanPanel.buttons[0].setDisabled(false);
				   detailPlanPanel.buttons[1].setDisabled(true);
			   }
			   detailPlanPanel.getLayout().setActiveItem(num);
			   
			  };
			
			// 详细信息窗口展示的from
			var detailPlanPanel = new Ext.Panel({
				layout:"card",
				activeItem: 0,
				height : 600,
				autoScroll:true,
				layoutConfig: {
				animate: true 
				},
				items : [ detailPlanForm,executorGrid,targetGrid ],
				buttonAlign : "center",
				buttons : [{
								text : '上一步',
								handler : changeDetailPage
							},
							{
								text : '下一步',
								handler : changeDetailPage
							},
				           {
								text : '关闭',
								handler : function() {
								detailPlanWindow.hide();
								}
							} ]
			});
			
			// 修改窗口展示的from
			var closePlanPanel = new Ext.Panel({
				labelWidth : 150,
				height : 600,
				layout : 'fit',
				//autoScroll : true,
				buttonAlign : "center",
				items : [ closePlanForm ],
				buttons : [

							{

								text : '保  存',
								handler : function() {
									if(!closePlanForm.getForm().isValid()) { 
										Ext.Msg.alert("系统提示","请填写相关信息！");
										return false;
									}
									Ext.Ajax.request({
										url : basepath + '/market-assu!closePlan.json?a=2',
										method : 'POST',
										params:{
											'operate':'clos'
											},	
										form : closePlanForm.getForm().id,
										waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
										success : function() {
											Ext.Msg.alert('提示', '操作成功');
											store.reload();
										},
										failure : function(response) {
											var resultArray = Ext.util.JSON.decode(response.status);
											 if(resultArray == 403) {
										           Ext.Msg.alert('提示', response.responseText);
											 }else{
											Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
										}
										}
									});
									closePlanWindow.hide();
									closePlanForm.getForm().reset();
								}

							}, {
								text : '取  消',
								handler : function() {
								closePlanWindow.hide();
								}
							} ]
			});
			
			// 下达窗口展示的from
			var distributePlanPanel = new Ext.Panel({
				labelWidth : 150,
				height : 700,
				layout : 'fit',
				//autoScroll : true,
				buttonAlign : "center",
				items : [disatrTp]
			});

	 //营销任务维护窗口展示的from
    var mktAssuInfoPanel = new Ext.Panel( {
        layout : 'card',
        activeItem : 0,     
        autoScroll : true,
        buttonAlign : "center",
        items : [ mktAssEditInfoForm,mktRelateOperObjInfo,mktRelateTargetInfo],
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
    			mktAssEditWindow.hide();
    			}
    		} ]
    });
    
			
			 //定义新增窗口
			var mktAssEditWindow = new Ext.Window({
				title : '营销任务新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 450,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				buttonAlign : 'center',
				border : false,
				items : [ mktAssuInfoPanel ],
				listeners:{
				beforehide:function(){
				if(!mktRelateTargetInfo.buttons[0].disabled){
					Ext.MessageBox.alert('系统提示','指标信息未保存，请检查!');
					return false;
				}
				store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
				}}
			});
			
			distributePlanWindow.on('beforehide',function(){
			if(!addInfo.buttons[0].disabled){
					Ext.MessageBox.alert('系统提示','指标信息未保存，请检查!');
					return false;
				}
			store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
			});
			
			var rd_set = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '测试456',
				collapsible : true,
				items : []
			});
			
			// 定义修改窗口
			var closePlanWindow = new Ext.Window({
				title : '营销任务关闭',
				plain : true,
				layout : 'fit',
				width : 600,
				height : 400,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				border : false,
				buttonAlign:'center',
				items : [ mktCloseInfo ],
				buttons:[{
		text:'保存',
		handler:function(){
//		if(''==listPanel.getSelectionModel().selections.items[0].data.taskId||null==listPanel.getSelectionModel().selections.items[0].data.taskId){
//		Ext.Msg.alert('系统提示','请完善基本信息再执行此操作!');
//		return false;
//		}
		 var json0 = {'targetNo':[]};
		 var json1 = {'targetCode':[]};
		 var json2 = {'originalValue':[]};
		 var json3 = {'targetValue':[]};
		 var json4 = {'achieveValue':[]};
		 var json5 = {'achievePercent':[]};
	for(var i=0;i<mktCloseStore.getCount();i++){
    var temp=mktCloseStore.getAt(i);
    if(temp.data.targetCode!=''){
    	if(temp.data.achieveValue==''||temp.data.achievePercent==''){
    		Ext.Msg.alert('系统提示','请完善指标达成值和达成率!');
    		return false;
    	}
    	json0.targetNo.push(temp.data.targetNo);
        json1.targetCode.push(temp.data.targetCode);
        json2.originalValue.push(temp.data.originalValue);
        json3.targetValue.push(temp.data.targetValue);
        json4.achieveValue.push(temp.data.achieveValue);
        json5.achievePercent.push(temp.data.achievePercent);
    	}else{
    	Ext.Msg.alert('系统提示','请选择指标!');
    		return false;
    	}
	}
    Ext.Msg.wait('正在保存，请稍后......','系统提示');
    Ext.Ajax.request({
        url : basepath + '/marketassudetailinfo!saveData.json',
        method : 'POST',
        waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
        params:{
            'targetNo':Ext.encode(json0),
            'targetCode':Ext.encode(json1),
            'originalValue':Ext.encode(json2),
            'targetValue':Ext.encode(json3),
            'achieveValue':Ext.encode(json4),
            'achievePercent':Ext.encode(json5),
            'taskId':listPanel.getSelectionModel().selections.items[0].data.taskId,
            'querysign':'target_del'
        },
        success : function() {
            Ext.Msg.alert('提示', '操作成功');
            closePlanWindow.hide();
            store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
        },
        failure : function(response) {
            Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
        }
    });
		}},{
		text:'重置',
		handler:function(){
		mktCloseStore.reload({
			params : {
				start : 0,
				limit : parseInt(mktClose_combo.getValue())
			}
		});
		}
		}]
			});

			
			// 定义详细信息窗口
			var detailPlanWindow = new Ext.Window({
				title : '营销任务详细信息',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 400,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				border : false,
				items : [ detailPlanPanel ]
			});

			// 展示新增窗口
			function addInit() {
				mktAssEditInfoForm.getForm().reset();
				mktAssEditWindow.show();
				mktAssuInfoPanel.buttons[0].setDisabled(true);
				mktAssuInfoPanel.layout.setActiveItem('info1'); 

			}
			// 展示修改窗口
			function editInit() {
				mktAssEditWindow.show();
				mktAssuInfoPanel.buttons[0].setDisabled(true);
				mktAssuInfoPanel.layout.setActiveItem('info1'); 
			};
			
			// 展示分解窗口
			function distributeInit() {
				distributePlanWindow.show();
			};
			
			// 展示关闭任务窗口
			function closePlanInit() {
				closePlanWindow.show();
			};
			
			// 展示任务详细信息的窗口
			function detailPlanInit() {
				detailPlanPanel.buttons[0].setDisabled(true);
				detailPlanPanel.buttons[1].setDisabled(false);
				detailPlanWindow.show();
			};
			
			var view = new Ext.Viewport({

				layout : 'fit',
				items : [ {
					layout : 'border',
					items : [searchPanel,listPanel]
				} ]
			});

		});