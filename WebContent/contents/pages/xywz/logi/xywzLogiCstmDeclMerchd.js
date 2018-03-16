Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "报关商品及代码维护查询",
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '报关中文品名',
									labelStyle : 'text-align:right;',
									//labelWidth : 100,
									name : 'cstmDeclCnHsCode',
									id : 'HS_CODE11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('HS_CODE11').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SEND_SHEET_ADVS_ID11').setValue(records[0].data.CORP_NM);
										qForm.getForm().findField('cstmDeclCnHsCode').setValue(records[0].data.HS_CODE);
										
									}
								})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'cstmDeclRltvCd',
							fieldLabel : '报关相关代码',
							anchor : '95%'
						} ]
					}]
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
				name : 'cstmDeclMerchdId',
				   mapping : 'CSTM_DECL_MERCHD_ID'
				  }, {
				  name : 'cstmDeclCnHsCode',
				   mapping : 'CSTM_DECL_CN_HS_CODE'
				  }, {
				  name : 'cstmDeclRltvCd',
				   mapping : 'CSTM_DECL_RLTV_CD'
				  }, {
				  name : 'dtlDesc',
				   mapping : 'DTL_DESC'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '报关商品ID',
				   width : 210,
				   dataIndex : 'cstmDeclMerchdId',
				   //hidden:true,
				   sortable : true
				  }, {
				  header : '报关中文品名',
				   width : 210,
				   dataIndex : 'cstmDeclCnHsCode',
				   sortable : true
				  }, {
				  header : '报关相关代码',
				   width : 210,
				   dataIndex : 'cstmDeclRltvCd',
				   sortable : true
				  }, {
				  header : '详细描述',
				   width : 210,
				   dataIndex : 'dtlDesc',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiCstmDeclMerchdQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'CSTM_DECL_MERCHD_ID',
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
											addXywzLogiCstmDeclMerchdForm.getForm().reset();											
											addXywzLogiCstmDeclMerchdWindow.show();
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
												editXywzLogiCstmDeclMerchdForm.getForm().loadRecord(selectRe);
												editXywzLogiCstmDeclMerchdWindow.show();

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
												tempId = selectRe.data.cstmDeclMerchdId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiCstmDeclMerchdAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzLogiCstmDeclMerchdQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzLogiCstmDeclMerchdForm = new Ext.form.FormPanel({
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
			            items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '报关中文品名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'cstmDeclCnHsCode',
									id : 'HS_CODE22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('HS_CODE22').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SEND_SHEET_ADVS_ID11').setValue(records[0].data.CORP_NM);
										addXywzLogiCstmDeclMerchdForm.getForm().findField('cstmDeclCnHsCode').setValue(records[0].data.HS_CODE);
										
									}
								})]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'cstmDeclRltvCd',
			            fieldLabel : '<font color=red>*</font>报关相关代码',
			            allowBlank : false,
			            blankText : '报关相关代码不能为空',
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
			            name : 'dtlDesc',
			            fieldLabel : '<font color=red>*</font>详细描述',
			            allowBlank : false,
			            blankText : '详细描述不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzLogiCstmDeclMerchdForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiCstmDeclMerchdAction.json',
								method : 'POST',
								form : addXywzLogiCstmDeclMerchdForm.getForm().id,
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
							
							addXywzLogiCstmDeclMerchdWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiCstmDeclMerchdWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiCstmDeclMerchdForm = new Ext.form.FormPanel({
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
			            name : 'cstmDeclMerchdId',
			            maxLength : 200,
			            minLength : 1, 
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '报关中文品名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'cstmDeclCnHsCode',
									id : 'HS_CODE33',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('HS_CODE33').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SEND_SHEET_ADVS_ID11').setValue(records[0].data.CORP_NM);
										editXywzLogiCstmDeclMerchdForm.getForm().findField('cstmDeclCnHsCode').setValue(records[0].data.HS_CODE);
										
									}
								})]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'cstmDeclRltvCd',
			            fieldLabel : '<font color=red>*</font>报关相关代码',
			            allowBlank : false,
			            blankText : '报关相关代码不能为空',
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
			            name : 'dtlDesc',
			            fieldLabel : '<font color=red>*</font>详细描述',
			            allowBlank : false,
			            blankText : '详细描述不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           }]
			        } ]
				   }, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiCstmDeclMerchdForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiCstmDeclMerchdAction.json',
								method : 'POST',
								form : editXywzLogiCstmDeclMerchdForm.getForm().id,
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
							
							editXywzLogiCstmDeclMerchdWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiCstmDeclMerchdWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzLogiCstmDeclMerchdWindow = new Ext.Window({
				title : '报关商品和代码新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :400,
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
				items : [ addXywzLogiCstmDeclMerchdForm ]
			});

			// 定义修改窗口
			var editXywzLogiCstmDeclMerchdWindow = new Ext.Window({
				title : '报关商品和代码修改',
				plain : true,
				layout : 'fit',
				width : 880,
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
				items : [ editXywzLogiCstmDeclMerchdForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协产品信息列表',
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