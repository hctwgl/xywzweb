Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "外协加工工厂物流信息查询",
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
						columnWidth : .33,
						layout : 'form',
						items : [ new Com.xywz.common.AsstMachgCorpMgmtQuery(
								{
									fieldLabel : '外协加工厂编号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'asstMachgId',
									id : 'ASST_MACHG_ID11',
									singleSelected : false,
									// 单选复选标志
//									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('ASST_MACHG_ID11').oAsstMachgCorpMgmtQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('ASST_MACHG_ID11').setValue(records[0].data.ASST_MACHG_ID);									
									}
								}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'esmCorp',
							fieldLabel : '快递公司',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'acctNum',
							fieldLabel : '账号',
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
				name : 'id',
				mapping : 'ID'
			}, {
				name : 'asstMachgId',
				mapping : 'ASST_MACHG_ID'
			},{
				name : 'esmCorp',
				mapping : 'ESM_CORP'
			},{
				name : 'acctNum',
				mapping : 'ACCT_NUM'
			},{
				name : 'memo',
				mapping : 'MEMO'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '外协加工工厂编号',
				width : 210,
				dataIndex : 'asstMachgId',
				sortable : true
			}, {
				header : '快递公司',
				width : 170,
				dataIndex : 'esmCorp',
				sortable : true
			}, {
				header : '账号',
				width : 170,
				dataIndex : 'acctNum',
				sortable : true
			}, {
				header : '备注',
				width : 170,
				dataIndex : 'memo',
				sortable : true
			}, {
				header : 'ID',
				width : 170,
				hidden:true,
				dataIndex : 'id',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgMgmtEMSQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
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
											addXywzAsstMachgMgmtEMSForm.getForm().reset();
											addXywzAsstMachgMgmtEMSWindow.show();
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
												editXywzAsstMachgMgmtEMSForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgMgmtEMSWindow.show();

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
												tempId = selectRe.data.id;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzAsstMachgMgmtEMSAction!batchDestroy.json?idStr='+ idStr,
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
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzAsstMachgMgmtEMSQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzAsstMachgMgmtEMSForm = new Ext.form.FormPanel({
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
								items : [ new Com.xywz.common.AsstMachgCorpMgmtQuery(
										{
											fieldLabel : '<font color=red>*</font>外协加工厂编号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'asstMachgId',
											id : 'ASST_MACHG_ID22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('ASST_MACHG_ID22').oAsstMachgCorpMgmtQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('ASST_MACHG_ID22').setValue(records[0].data.ASST_MACHG_ID);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'esmCorp',
									fieldLabel : '<font color=red>*</font>快递公司',
									allowBlank : false,
									blankText : '快递公司不能为空',
									maxLength:100,
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
									name : 'acctNum',
									fieldLabel : '<font color=red>*</font>账号',
									allowBlank : false,
									blankText : '账号不能为空',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : 1.06,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									fieldLabel : '备注',
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
									name : 'id',
									hidden:true,
									fieldLabel : 'ID',
									maxLength:27,
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
							if(!addXywzAsstMachgMgmtEMSForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgMgmtEMSAction.json',
								method : 'POST',
								form : addXywzAsstMachgMgmtEMSForm.getForm().id,
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
							
							addXywzAsstMachgMgmtEMSWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgMgmtEMSWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgMgmtEMSForm = new Ext.form.FormPanel({
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
									name : 'asstMachgId',
									fieldLabel : '<font color=red>*</font>外协加工工厂编号',
									allowBlank : false,
									blankText : '外协加工工厂编号不能为空',
									maxLength:30,
									minLength:1,
									readOnly :true,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'esmCorp',
									fieldLabel : '<font color=red>*</font>快递公司',
									allowBlank : false,
									blankText : '快递公司不能为空',
									maxLength:100,
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
									name : 'acctNum',
									fieldLabel : '<font color=red>*</font>账号',
									allowBlank : false,
									blankText : '账号不能为空',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : 1.06,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									fieldLabel : '备注',
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
									name : 'id',
									hidden:true,
									fieldLabel : 'ID',
									maxLength:27,
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
							if(!editXywzAsstMachgMgmtEMSForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgMgmtEMSAction.json',
								method : 'POST',
								form : editXywzAsstMachgMgmtEMSForm.getForm().id,
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
							
							editXywzAsstMachgMgmtEMSWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgMgmtEMSWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzAsstMachgMgmtEMSWindow = new Ext.Window({
				title : '物流信息新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :210,
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
				items : [ addXywzAsstMachgMgmtEMSForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgMgmtEMSWindow = new Ext.Window({
				title : '物流信息修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 210,
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
				items : [ editXywzAsstMachgMgmtEMSForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协加工工厂物流信息列表',
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