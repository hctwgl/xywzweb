Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“消息类型”选择数据集
			var txstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_REM_NAME'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“是否有效”选择数据集
			var ifstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_VALID_FLAG'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ]),
				listeners:{     
					 //向已有数据中插入一条新的数据     
					load : function(store, records, options ){     
							Ext.getCmp('VALID_FLAG').setValue('1');
					}     
				}
			});
			//“是否阅读”选择数据集
			var ifstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_READ_FLAG'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
//				listeners:{     
//					 //向已有数据中插入一条新的数据     
//					load : function(store, records, options ){     
//							Ext.getCmp('readFlag').setValue('0');
//					}     
//				}
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "消息提醒查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .33,
						layout : 'form',
						items :[ new Ext.form.ComboBox({
							hiddenName : 'remName',
							fieldLabel : '提醒名称',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : txstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
		                  }) ] 
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'VALID_FLAG',
							fieldLabel : '有效标志',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : ifstore,
							id:'VALID_FLAG',
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							value:'1',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
		                  }) ] 
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'readFlag',
							fieldLabel : '阅读标志',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : ifstore1,
							id:'readFlag',
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
		                  }) ] 
					},{
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'dtFrom',
							fieldLabel : '开始日期   从',
							anchor : '90%',
							editable : false,
						    format : 'Y-m-d'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'dtTo',
							fieldLabel : '到',
							anchor : '90%',
							editable : false,
							format : 'Y-m-d'
						} ]
					} ]
				} ],
				buttons : [ {
					text : '查询',
					handler : function() {
						var conditionStr = qForm.getForm().getValues(false);
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

				},{
					text : '重置',
					handler : function() {
	                	qForm.getForm().reset();
					}

				} ]
			});
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([ {
				   name : 'remId',
				   mapping : 'REM_ID'
				          },{ 
				   name : 'remName',
				   mapping : 'REM_NAME'
				          },{ 
							   name : 'remNameOra',
							   mapping : 'REM_NAME_ORA'
				          },{ 
				   name : 'remBegDt',
				   mapping : 'REM_BEG_DT'
				          },{ 
				   name : 'remEndDt',
				   mapping : 'REM_END_DT'
				          },{ 
				   name : 'remType',
				   mapping : 'REM_TYPE'
				          },{ 
				   name : 'readFlag',
				   mapping : 'READ_FLAG'
				          },{ 
							   name : 'readFlagOra',
							   mapping : 'READ_FLAG_ORA'
							          },{ 
				   name : 'validFlag',
				   mapping : 'VALID_FLAG'
				          },{ 
							   name : 'validFlagOra',
							   mapping : 'VALID_FLAG_ORA'
				          },{ 
				   name : 'remTouchCstid',
				   mapping : 'REM_TOUCH_CSTID'
				          },{ 
				   name : 'remTouchCstnm',
				   mapping : 'REM_TOUCH_CSTNM'
				          },{ 
				   name : 'recvCstid',
				   mapping : 'RECV_CSTID'
				          },{ 
				   name : 'recvCstnm',
				   mapping : 'RECV_CSTNM'
				          },{ 
				   name : 'remContent',
				   mapping : 'REM_CONTENT'
				          },{ 
				   name : 'operDt',
				   mapping : 'OPER_DT' 
				          },{ 
							   name : 'readCstid',
							   mapping : 'READ_CSTID'
							          },{ 
							   name : 'readCstnm',
							   mapping : 'READ_CSTNM'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : 'ID',
				   width : 210,
				   dataIndex : 'remId',
				   hidden :true,
				   sortable : true
				          },{ 
				   header : '提醒名称',
				   width : 150,
				   dataIndex : 'remNameOra',
				   sortable : true
				          },{ 
				   header : '提醒日期',
				   width : 100,
				   dataIndex : 'remBegDt',
				   sortable : true
				          },{ 
				   header : '提醒结束日期',
				   width : 210,
				   dataIndex : 'remEndDt',
				   hidden :true,
				   sortable : true
				          },{ 
				   header : '提醒类型',
				   width : 210,
				   dataIndex : 'remType',
				   hidden :true,
				   sortable : true
				          },{ 
				   header : '阅读标志',
				   width : 70,
				   dataIndex : 'readFlagOra',
				   sortable : true
				          },{ 
				   header : '有效标志',
				   width : 70,
				   dataIndex : 'validFlagOra',
				   sortable : true
				          },{ 
							   header : '提醒内容',
							   width : 500,
							   dataIndex : 'remContent',
							   sortable : true
				          },{ 
				   header : '提醒发起人编号',
				   width : 100,
				   hidden :true,
				   dataIndex : 'remTouchCstid',
				   sortable : true
				          },{ 
				   header : '提醒发起人名称',
				   width : 100,
				   dataIndex : 'remTouchCstnm',
				   sortable : true
				          },{ 
				   header : '接收部门编号',
				   width : 100,
				   dataIndex : 'recvCstid',
				   hidden :true,
				   sortable : true
				          },{ 
				   header : '接收部门名称',
				   width : 100,
				   dataIndex : 'recvCstnm',
				   sortable : true
				          },{ 
							   header : '阅读人编号',
							   width : 100,
							   dataIndex : 'readCstid',
							   hidden :true,
							   sortable : true
							          },{ 
							   header : '阅读人名称',
							   width : 100,
							   dataIndex : 'readCstnm',
							   sortable : true
				          },{ 
				   header : '操作日期',
				   width : 100,
				   dataIndex : 'operDt',
				   sortable : true 
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSysmMsgRmndQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'REM_ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
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
				editable : false,
				width : 85
			});
			var msgTyp = '';
			var remindTypes='';
			if (window.location.href.split("msgTyp=")[1] != undefined) {
				
				remindType = window.location.href.split("msgTyp=")[1];
				remindTypes = remindType.split("&")[0];
				qForm.getForm().findField('remName').setValue(remindTypes);
			}	
			// 默认加载数据
			store.load({
				params : {
					msgType : remindTypes,
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});

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
			
			// 表格工具栏
			var tbar = new Ext.Toolbar(
					{
						items : [
//									{
//										text : '新增',
//										iconCls : 'addIconCss',
//										handler : function() {
//											addXywzSysmMsgRmndForm.getForm().reset();
//											addXywzSysmMsgRmndForm.getForm().findField('operDt').setValue(new Date());
//											addXywzSysmMsgRmndWindow.show();
//										}
//									},
//									'-',
//									{
//										text : '修改',
//										iconCls : 'editIconCss',
//										handler : function() {
//
//											var selectLength = grid.getSelectionModel().getSelections().length;
//
//											var selectRe = grid.getSelectionModel().getSelections()[0];
//
//											if (selectLength != 1) {
//												Ext.Msg.alert('提示','请选择一条记录!');
//											} else {
//												editXywzSysmMsgRmndForm.getForm().loadRecord(selectRe);
//												editXywzSysmMsgRmndWindow.show();
//
//											}
//										}
//
//									},
//									'-',
//									{
//										text : '删除',
//										iconCls : 'deleteIconCss',
//										handler : function() {
//											var selectLength = grid.getSelectionModel().getSelections().length;
//											if (selectLength < 1) {
//												Ext.Msg.alert('提示','请选择需要删除的记录!');
//											}
//
//											else {
//												Ext.MessageBox.confirm('提示','确定删除吗?',function(buttonId){
//												if(buttonId.toLowerCase() == "no"){
//													return;
//												}  
//											var selectRe;
//											var tempId;
//											var tempCount;
//											var idStr = '';
//											for ( var i = 0; i < selectLength; i++) {
//												selectRe = grid.getSelectionModel().getSelections()[i];
//												tempId = selectRe.data.remId;
//												idStr += tempId;
//												if (i != selectLength - 1)
//													idStr += ',';
//												}
//												Ext.Ajax.request({
//														url : basepath+ '/XywzSysmMsgRmndAction!batchDestroy.json?idStr='+ idStr,
//														waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
//														success : function() {
//														Ext.Msg.alert('提示', '操作成功!' );
//															store.reload();
//														},
//														failure : function() {
//														
//															Ext.Msg.alert('提示', '操作失败!' );
//														}
//													});
//
//										})
//										;
//									}
//								}
//									},'-',new Com.yucheng.bob.ExpButton({
//							            formPanel : 'searchCondition',
//							            iconCls:'exportIconCss',
//							            url : basepath+'/XywzSysmMsgRmndQueryAction.json'
//							        }),'-',
									{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid
											.getSelectionModel()
											.getSelections().length;

											var selectRe = grid.getSelectionModel()
											.getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzSysmMsgRmndForm
														.getForm().loadRecord(
																selectRe);
												detailXywzSysmMsgRmndWindow.show();
											}
										}
									},'-',
									{
										text : '标记已读',
										iconCls : 'editIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}else {
											
											if(selectRe.data.readFlag!='0'){
											Ext.Msg.alert('提示','此记录为已读，请勿重复处理!');
												return;
											}
											if(selectRe.data.validFlag!='1'){
												Ext.Msg.alert('提示','此记录无效，不能执行此操作!');
													return;
												}
											Ext.MessageBox.confirm('提示','确定标记为已读吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}  
										var selectRe;
										var tempId;
										var tempCount;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.remId;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
											}
											Ext.Ajax.request({
													url : basepath+ '/XywzSysmMsgRmndAction!updateRemindComm.json?idStr='+ idStr,
													waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success : function() {
													Ext.Msg.alert('提示', '标记已读成功!' );
														store.reload();
													},
													failure : function() {
													
														Ext.Msg.alert('提示', '操作失败!' );
													}
												});

									})
									;
								}
							}
									},'-',
									{
										text : '标记无效',
										hidden: true,
										iconCls : 'signInValidIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}else {
											if(selectRe.data.validFlag!='0'){
												Ext.Msg.alert('提示','此记录已无效，不能执行此操作!');
													return;
												}
											Ext.MessageBox.confirm('提示','确定标记为无效吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}  
										var selectRe;
										var tempId;
										var tempCount;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.remId;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
											}
											Ext.Ajax.request({
													url : basepath+ '/XywzSysmMsgRmndAction!updateRemindComm.json?flag='+'wuxiao'+'&idStr='+ idStr,
													waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success : function() {
													Ext.Msg.alert('提示', '标记无效成功!' );
														store.reload();
													},
													failure : function() {
													
														Ext.Msg.alert('提示', '操作失败!' );
													}
												});

									})
									;
								}
							}
									}]
					});

//			// 新增窗口展示的from
//			var addXywzSysmMsgRmndForm = new Ext.form.FormPanel({
//				labelWidth : 150,
//				height : 150,
//				frame : true,
//				region : 'center',
//				autoScroll : true,
//				buttonAlign : "center",
//				items : [ {
//					layout : 'column',
//					items : [
//					         {
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remId',
//					             maxLength : 200,
//					             minLength : 1, 
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remName',
//					             fieldLabel : '<font color=red>*</font>提醒名称',
//					             allowBlank : false,
//					             blankText : '提醒名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'datefield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remBegDt',
//					             fieldLabel : '<font color=red>*</font>提醒开始日期',
//					             allowBlank : false,
//					             blankText : '提醒开始日期不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%',
//					             format:'Y-m-d'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'datefield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remEndDt',
//					             fieldLabel : '<font color=red>*</font>提醒结束日期',
//					             hidden:true,
//					             anchor : '90%',
//					             format:'Y-m-d'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remType',
//					             fieldLabel : '<font color=red>*</font>提醒类型',
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'readFlag',
//					             fieldLabel : '<font color=red>*</font>阅读标志',
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'validFlag',
//					             fieldLabel : '<font color=red>*</font>有效标志',
//					             allowBlank : false,
//					             blankText : '有效标志不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remTouchCstid',
//					             fieldLabel : '<font color=red>*</font>提醒发起人编号',
//					             allowBlank : false,
//					             blankText : '提醒发起人编号不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remTouchCstnm',
//					             fieldLabel : '<font color=red>*</font>提醒发起人名称',
//					             allowBlank : false,
//					             blankText : '提醒发起人名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'recvCstid',
//					             fieldLabel : '<font color=red>*</font>接收人编号',
//					             allowBlank : false,
//					             blankText : '接收人编号不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'recvCstnm',
//					             fieldLabel : '<font color=red>*</font>接收人名称',
//					             allowBlank : false,
//					             blankText : '接收人名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//						             columnWidth : .5,
//						             layout : 'form',
//						             items : [ {
//						             xtype : 'datefield',
//						             vtype : 'trim',
//						             Width : '100',
//						             name : 'operDt',
//						             fieldLabel : '操作日期',
//						             readOnly : true,
//						             anchor : '90%',
//						             format:'Y-m-d'
//						            } ] 
//					           },{ 
//					             columnWidth : 1.06,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textarea',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remContent',
//					             fieldLabel : '<font color=red>*</font>提醒内容',
//					             allowBlank : false,
//					             blankText : '提醒内容不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//							} ]
//				}, {
//					layout : 'form',
//					buttonAlign : 'center',
//
//					buttons : [ {
//						text : '保  存',
//						handler : function() {
//							if(!addXywzSysmMsgRmndForm.getForm().isValid())
//							{ 
//								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
//								return false;
//							}
//							Ext.Ajax.request({
//								url : basepath + '/XywzSysmMsgRmndAction.json',
//								method : 'POST',
//								form : addXywzSysmMsgRmndForm.getForm().id,
//								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
//								success : function(response) {
//
//									Ext.Msg.alert('提示', '操作成功!');
//									store.reload();
//								},
//								failure : function(response) {
//									Ext.Msg.alert("sdf",response.responseText);
//									Ext.Msg.alert('提示', '操作失败!' );
//								}
//							});
//							
//							addXywzSysmMsgRmndWindow.hide();
//						}
//					}, {
//						text : '取  消',
//						handler : function() {
//							addXywzSysmMsgRmndWindow.hide();
//						}
//					} ]
//				} ]
//			});
//
//			// 修改窗口展示的from
//			var editXywzSysmMsgRmndForm = new Ext.form.FormPanel({
//				labelWidth : 150,
//				height : 150,
//				frame : true,
//				region : 'center',
//				autoScroll : true,
//				buttonAlign : "center",
//				items : [ {
//					layout : 'column',
//					items : [
//					         {
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remId',
//					             maxLength : 200,
//					             minLength : 1, 
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remName',
//					             fieldLabel : '<font color=red>*</font>提醒名称',
//					             allowBlank : false,
//					             blankText : '提醒名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'datefield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remBegDt',
//					             fieldLabel : '<font color=red>*</font>提醒开始日期',
//					             allowBlank : false,
//					             blankText : '提醒开始日期不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%',
//					             format:'Y-m-d'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'datefield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remEndDt',
//					             fieldLabel : '<font color=red>*</font>提醒结束日期',
//					             hidden:true,
//					             anchor : '90%',
//					             format:'Y-m-d'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remType',
//					             fieldLabel : '<font color=red>*</font>提醒类型',
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'readFlag',
//					             fieldLabel : '<font color=red>*</font>阅读标志',
//					             hidden:true,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'validFlag',
//					             fieldLabel : '<font color=red>*</font>有效标志',
//					             allowBlank : false,
//					             blankText : '有效标志不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remTouchCstid',
//					             fieldLabel : '<font color=red>*</font>提醒发起人编号',
//					             allowBlank : false,
//					             blankText : '提醒发起人编号不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remTouchCstnm',
//					             fieldLabel : '<font color=red>*</font>提醒发起人名称',
//					             allowBlank : false,
//					             blankText : '提醒发起人名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'recvCstid',
//					             fieldLabel : '<font color=red>*</font>接收人编号',
//					             allowBlank : false,
//					             blankText : '接收人编号不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//					             columnWidth : .5,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textfield',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'recvCstnm',
//					             fieldLabel : '<font color=red>*</font>接收人名称',
//					             allowBlank : false,
//					             blankText : '接收人名称不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//					           },{ 
//						             columnWidth : .5,
//						             layout : 'form',
//						             items : [ {
//						             xtype : 'datefield',
//						             vtype : 'trim',
//						             Width : '100',
//						             name : 'operDt',
//						             fieldLabel : '<font color=red>*</font>操作日期',
//						             allowBlank : false,
//						             blankText : '操作日期不能为空',
//						             anchor : '90%',
//						             format:'Y-m-d'
//						            } ] 
//					           },{ 
//					             columnWidth : 1.06,
//					             layout : 'form',
//					             items : [ {
//					             xtype : 'textarea',
//					             vtype : 'trim',
//					             Width : '100',
//					             name : 'remContent',
//					             fieldLabel : '<font color=red>*</font>提醒内容',
//					             allowBlank : false,
//					             blankText : '提醒内容不能为空',
//					             maxLength : 200,
//					             minLength : 1,
//					             anchor : '90%'
//					            } ]
//							} ]
//				}, {
//					layout : 'form',
//					buttonAlign : 'center',
//
//					buttons : [ {
//						text : '保  存',
//						handler : function() {
//							if(!editXywzSysmMsgRmndForm.getForm().isValid())
//							{ 
//								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
//								return false;
//							}
//							Ext.Ajax.request({
//								url : basepath + '/XywzSysmMsgRmndAction.json',
//								method : 'POST',
//								form : editXywzSysmMsgRmndForm.getForm().id,
//								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
//								success : function(response) {
//
//									Ext.Msg.alert('提示', '操作成功!');
//									store.reload();
//								},
//								failure : function(response) {
//									Ext.Msg.alert("sdf",response.responseText);
//									Ext.Msg.alert('提示', '操作失败!' );
//								}
//							});
//							
//							editXywzSysmMsgRmndWindow.hide();
//						}
//					}, {
//						text : '取  消',
//						handler : function() {
//							editXywzSysmMsgRmndWindow.hide();
//						}
//					} ]
//				} ]
//			});
			
			// 预览展示的from
			var detailXywzSysmMsgRmndForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [
					         {
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remId',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remName',
					             fieldLabel : '<font color=red>*</font>提醒名称',
					             allowBlank : false,
					             blankText : '提醒名称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remBegDt',
					             fieldLabel : '<font color=red>*</font>提醒日期',
					             allowBlank : false,
					             blankText : '提醒日期不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remEndDt',
					             fieldLabel : '<font color=red>*</font>提醒结束日期',
					             hidden:true,
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remType',
					             fieldLabel : '<font color=red>*</font>提醒类型',
					             hidden:true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'readFlag',
					             fieldLabel : '<font color=red>*</font>阅读标志',
					             hidden:true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'validFlag',
					             fieldLabel : '<font color=red>*</font>有效标志',
					             allowBlank : false,
					             blankText : '有效标志不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remTouchCstid',
					             fieldLabel : '<font color=red>*</font>提醒发起人编号',
					             allowBlank : false,
					             blankText : '提醒发起人编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remTouchCstnm',
					             fieldLabel : '<font color=red>*</font>提醒发起人名称',
					             allowBlank : false,
					             blankText : '提醒发起人名称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'recvCstid',
					             fieldLabel : '<font color=red>*</font>接收部门编号',
					             allowBlank : false,
					             blankText : '接收部门编号不能为空',
								 hidden :true,
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'recvCstnm',
					             fieldLabel : '<font color=red>*</font>接收部门名称',
					             allowBlank : false,
					             blankText : '接收部门名称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'datefield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'operDt',
						             fieldLabel : '<font color=red>*</font>操作日期',
						             allowBlank : false,
						             blankText : '操作日期不能为空',
						             anchor : '90%',
						             format:'Y-m-d'
						            } ] 
					           },{ 
					             columnWidth : 1.06,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'remContent',
					             fieldLabel : '<font color=red>*</font>提醒内容',
					             allowBlank : false,
					             blankText : '提醒内容不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
								} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [
					    {
						text : '返  回',
						handler : function() {
					    	detailXywzSysmMsgRmndWindow.hide();
						}
					} ]
				}
				]
			});


//			// 定义新增窗口
//			var addXywzSysmMsgRmndWindow = new Ext.Window({
//				title : '消息提醒新增',
//				plain : true,
//				layout : 'fit',
//				width : 800,
//				height :300,
//				resizable : true,
//				draggable : true,
//				closable : true,
//				closeAction : 'hide',
//				modal : true, // 模态窗口
//				loadMask : true,
//				maximizable : true,
//				collapsible : true,
//				titleCollapse : true,
//				buttonAlign : 'right',
//				border : false,
//				items : [ addXywzSysmMsgRmndForm ]
//			});
//
//			// 定义修改窗口
//			var editXywzSysmMsgRmndWindow = new Ext.Window({
//				title : '消息提醒修改',
//				plain : true,
//				layout : 'fit',
//				width : 800,
//				height : 300,
//				resizable : true,
//				draggable : true,
//				closable : true,
//				closeAction : 'hide',
//				modal : true, // 模态窗口
//				loadMask : true,
//				maximizable : true,
//				collapsible : true,
//				titleCollapse : true,
//				border : false,
//				items : [ editXywzSysmMsgRmndForm ]
//			});
			
			// 定义详情窗口
			var detailXywzSysmMsgRmndWindow = new Ext.Window({
				title : '消息提醒预览',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 300,
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
				items : [ detailXywzSysmMsgRmndForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '消息提醒信息列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
				tbar : tbar, // 表格工具栏
				bbar : bbar,// 分页工具栏
				viewConfig : {},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ {
					layout:'border',
					items : [ qForm ,grid]
				}]
			});

		});