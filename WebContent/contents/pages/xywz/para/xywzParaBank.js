Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "银行信息查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'bankFullNm',
							fieldLabel : '银行全称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'bankAddr',
							fieldLabel : '银行地址',
							anchor : '90%'
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
				name : 'bankId',
				mapping : 'BANK_ID'
			}, {
				name : 'bankFullNm',
				mapping : 'BANK_FULL_NM'
			},{
				name : 'bankAddr',
				mapping : 'BANK_ADDR'
			},{
				name : 'bankTel',
				mapping : 'BANK_TEL'
			},{
				name : 'swiftCode',
				mapping : 'SWIFT_CODE'
			},{
			   name : 'account',
			   mapping : 'ACCOUNT'
            },{ 
			   name : 'memo',
			   mapping : 'MEMO' 
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '银行全称',
				width : 210,
				dataIndex : 'bankFullNm',
				sortable : true
			}, {
				header : '银行地址',
				width : 170,
				dataIndex : 'bankAddr',
				sortable : true
			}, {
				header : '银行电话',
				width : 170,
				dataIndex : 'bankTel',
				sortable : true
			}, {
				header : 'SWIFT CODE',
				width : 170,
				dataIndex : 'swiftCode',
				sortable : true
			}, {
				   header : '我方账户',
				   width : 210,
				   dataIndex : 'account',
				   sortable : true
				          },{ 
				   header : '信息备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true 
			}, {
				header : '银行ID',
				width : 170,
				hidden:true,
				dataIndex : 'bankId',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzParaBankQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'BANK_ID',
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

			// 默认加载数据
			store.load({
				params : {
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
									{
										text : '新增',
										iconCls : 'addIconCss',
										handler : function() {
											addXywzParaBankForm.getForm().reset();
											addXywzParaBankWindow.show();
										}
									},
									'-',
									{
										text : '修改',
										iconCls : 'editIconCss',
										handler : function() {

											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												editXywzParaBankForm.getForm().loadRecord(selectRe);
												editXywzParaBankWindow.show();

											}
										}

									},
									'-',
									{
										text : '删除',
										iconCls : 'deleteIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;
											if (selectLength < 1) {
												Ext.Msg.alert('提示','请选择需要删除的记录!');
											}

											else {
												Ext.MessageBox.confirm('提示','确定删除吗?',function(buttonId){
												if(buttonId.toLowerCase() == "no"){
													return;
												}  
											var selectRe;
											var tempId;
											var tempCount;
											var idStr = '';
											for ( var i = 0; i < selectLength; i++) {
												selectRe = grid.getSelectionModel().getSelections()[i];
												tempId = selectRe.data.bankId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzParaBankAction!batchDestroy.json?idStr='+ idStr,
														waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
														success : function() {
														Ext.Msg.alert('提示', '操作成功!' );
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

			// 新增窗口展示的from
			var addXywzParaBankForm = new Ext.form.FormPanel({
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
									name : 'bankFullNm',
									fieldLabel : '<font color=red>*</font>银行全称',
									allowBlank : false,
									blankText : '银行全称不能为空',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankAddr',
									fieldLabel : '<font color=red>*</font>银行地址',
									allowBlank : false,
									blankText : '银行地址不能为空',
									maxLength:500,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankTel',
									fieldLabel : '银行电话',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'swiftCode',
									fieldLabel : '<font color=red>*</font>SWIFT_CODE',
									allowBlank : false,
									blankText : 'SWIFT_CODE不能为空',
									maxLength:20,
									minLength:1,
									anchor : '90%'
								} ]
							},{
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'account',
					            fieldLabel : '<font color=red>*</font>我方账户',
								allowBlank : false,
								blankText : '我方账户不能为空',
					            maxLength : 50,
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
					            name : 'memo',
					            fieldLabel : '信息备注',
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
									name : 'bankId',
									hidden:true,
									fieldLabel : '银行ID',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzParaBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzParaBankAction.json',
								method : 'POST',
								form : addXywzParaBankForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							addXywzParaBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzParaBankWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzParaBankForm = new Ext.form.FormPanel({
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
									name : 'bankFullNm',
									fieldLabel : '<font color=red>*</font>银行全称',
									allowBlank : false,
									blankText : '银行全称不能为空',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankAddr',
									fieldLabel : '<font color=red>*</font>银行地址',
									allowBlank : false,
									blankText : '银行地址不能为空',
									maxLength:500,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bankTel',
									fieldLabel : '银行电话',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'swiftCode',
									fieldLabel : '<font color=red>*</font>SWIFT_CODE',
									allowBlank : false,
									blankText : 'SWIFT_CODE不能为空',
									maxLength:20,
									minLength:1,
									anchor : '90%'
								} ]
							},{
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'account',
					            fieldLabel : '<font color=red>*</font>我方账户',
								allowBlank : false,
								blankText : '我方账户不能为空',
					            maxLength : 50,
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
					            name : 'memo',
					            fieldLabel : '信息备注',
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
									name : 'bankId',
									hidden:true,
									fieldLabel : '银行ID',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzParaBankForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzParaBankAction.json',
								method : 'POST',
								form : editXywzParaBankForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							editXywzParaBankWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzParaBankWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzParaBankWindow = new Ext.Window({
				title : '银行新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :180,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				buttonAlign : 'right',
				border : false,
				items : [ addXywzParaBankForm ]
			});

			// 定义修改窗口
			var editXywzParaBankWindow = new Ext.Window({
				title : '银行修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 180,
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
				items : [ editXywzParaBankForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '银行信息列表',
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