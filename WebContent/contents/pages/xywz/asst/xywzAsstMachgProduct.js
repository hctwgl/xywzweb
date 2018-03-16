Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "产品查询",
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .33,
						layout : 'form',
						items : [ new Com.xywz.common.AsstMachgContractMgmtQuery(
								{
									fieldLabel : '加工合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'machgContrNum',
									id : 'MACHG_CONTR_NUM11',
									singleSelected : false,
									// 单选复选标志
//									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('MACHG_CONTR_NUM11').oAsstMachgContractMgmtQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('MACHG_CONTR_NUM11').setValue(records[0].data.MACHG_CONTR_NUM);									
									}
								}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelStyle : 'text-align:left;',
							Width : '100',
							name : 'fstNm',
							labelWidth : 150,
							fieldLabel : '品名 ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'spcModel',
									id : 'SIZE11',
									singleSelected : false,
									// 单选复选标志
									//editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE11').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										qForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
										qForm.getForm().findField('fstNm').setValue(records[0].data.HS_CODE);
									}
								}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelStyle : 'text-align:left;',
							labelWidth : 90,
							Width : '100',
							name : 'ngtvPoor',
							fieldLabel : '负差',
							anchor : '90%'
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
				name : 'prodId',
				mapping : 'PROD_ID'
			}, {
				name : 'machgContrNum',
				mapping : 'MACHG_CONTR_NUM'
			}, {
//				name : 'machgContrNm',
//				mapping : 'MACHG_CONTR_NM'
//			}, {
				name : 'fstNm',
				mapping : 'FST_NM'
			},{
				name : 'spcModel',
				mapping : 'SPC_MODEL'
			},{
				name : 'ngtvPoor',
				mapping : 'NGTV_POOR'
			},{
				name : 'pkg',
				mapping : 'PKG'
			},{
				name : 'qty',
				mapping : 'QTY'
			},{
				name : 'uprc',
				mapping : 'UPRC'
			},{
				name : 'len',
				mapping : 'LEN'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '产品ID',
				width : 210,
				dataIndex : 'prodId',
				hidden : true,
				sortable : true
			}, {
				header : '加工合同号',
				width : 170,
				dataIndex : 'machgContrNum',
				sortable : true
			}, {
//				header : '加工合同名称',
//				width : 170,
//				dataIndex : 'machgContrNm',
//				sortable : true
//			}, {
				header : '品名',
				width : 170,
				dataIndex : 'fstNm',
				sortable : true
			}, {
				header : '规格型号',
				width : 170,
				dataIndex : 'spcModel',
				sortable : true
			}, {
				header : '长度',
				width : 150,
				hidden:false,
				dataIndex : 'len',
				renderer: money('0,000.00' ),
				sortable : true
			}, {
				header : '负差',
				width : 150,
				dataIndex : 'ngtvPoor',
				sortable : true
			}, {
				header : '包装',
				width : 170,
				hidden:false,
				dataIndex : 'pkg',
				sortable : true
			}, {
				header : '数量（吨）',
				width : 150,
				hidden:false,
				dataIndex : 'qty',
				renderer: money('0,000.00' ),
				sortable : true
			}, {
				header : '单价',
				width : 150,
				hidden:false,
				dataIndex : 'uprc',
				renderer: money('0,000.00' ),
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgProductQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'PROD_ID',
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
											addXywzAsstMachgProductForm.getForm().reset();											
											addXywzAsstMachgProductWindow.show();
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
												editXywzAsstMachgProductForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgProductWindow.show();

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
												tempId = selectRe.data.prodId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzAsstMachgProductAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAsstMachgProductQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzAsstMachgProductForm = new Ext.form.FormPanel({
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
								items : [ new Com.xywz.common.AsstMachgContractMgmtQuery(
										{
											fieldLabel : '<font color=red>*</font>加工合同号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'machgContrNum',
											id : 'MACHG_CONTR_NUM22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('MACHG_CONTR_NUM22').oAsstMachgContractMgmtQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('MACHG_CONTR_NUM22').setValue(records[0].data.MACHG_CONTR_NUM);									
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.SysmProductDetailQuery(
										{
											fieldLabel : '<font color=red>*</font>规格型号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'spcModel',
											id : 'SIZE22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('SIZE22').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
												addXywzAsstMachgProductForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
												addXywzAsstMachgProductForm.getForm().findField('fstNm').setValue(records[0].data.HS_CODE);
											}
										}) ]										
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fstNm',
									fieldLabel : '<font color=red>*</font>品名',
									allowBlank : false,
									blankText : '品名不能为空',
									readOnly : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
					          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'numberfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'len',
						            fieldLabel : '<font color=red>*</font>长度',
						            allowBlank : false,
						            blankText : '长度不能为空',
						            anchor : '90%'
						           } ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'pkg',
									fieldLabel : '<font color=red>*</font>包装',
									allowBlank : false,
									blankText : '包装不能为空',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									vtype : 'trim',
									Width : '100',
									name : 'qty',
									hidden:false,
									fieldLabel : '<font color=red>*</font>数量（吨）',
									allowBlank : false,
									blankText : '数量不能为空',
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'ngtvPoor',
									fieldLabel : '<font color=red>*</font>负差',
									allowBlank : false,
									blankText : '负差不能为空',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									vtype : 'trim',
									Width : '100',
									name : 'uprc',
									hidden:false,
									fieldLabel : '<font color=red>*</font>单价',
									allowBlank : false,
									blankText : '单价不能为空',
									anchor : '90%'
								} ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzAsstMachgProductForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgProductAction.json',
								method : 'POST',
								form : addXywzAsstMachgProductForm.getForm().id,
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
							
							addXywzAsstMachgProductWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgProductWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgProductForm = new Ext.form.FormPanel({
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
									name : 'machgContrNum',
									fieldLabel : '<font color=red>*</font>加工合同号',
									allowBlank : false,
									blankText : '加工合同号编号不能为空',
									readOnly :true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.SysmProductDetailQuery(
										{
											fieldLabel : '<font color=red>*</font>规格型号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'spcModel',
											id : 'SIZE33',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('SIZE33').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
												editXywzAsstMachgProductForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
												editXywzAsstMachgProductForm.getForm().findField('fstNm').setValue(records[0].data.HS_CODE);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fstNm',
									fieldLabel : '<font color=red>*</font>品名',
									allowBlank : false,
									blankText : '品名不能为空',
									readOnly :true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
					          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'numberfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'len',
						            fieldLabel : '<font color=red>*</font>长度',
						            allowBlank : false,
						            blankText : '长度不能为空',
						            anchor : '90%'
						           } ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'pkg',
									fieldLabel : '<font color=red>*</font>包装',
									allowBlank : false,
									blankText : '包装不能为空',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									vtype : 'trim',
									Width : '100',
									name : 'qty',
									hidden:false,
									fieldLabel : '<font color=red>*</font>数量（吨）',
									allowBlank : false,
									blankText : '数量不能为空',
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'ngtvPoor',
									fieldLabel : '<font color=red>*</font>负差',
									allowBlank : false,
									blankText : '负差不能为空',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									vtype : 'trim',
									Width : '100',
									name : 'uprc',
									hidden:false,
									fieldLabel : '<font color=red>*</font>单价',
									allowBlank : false,
									blankText : '单价不能为空',
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'prodId',
									hidden:true,
									maxLength:200,
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
							if(!editXywzAsstMachgProductForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgProductAction.json',
								method : 'POST',
								form : editXywzAsstMachgProductForm.getForm().id,
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
							
							editXywzAsstMachgProductWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgProductWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzAsstMachgProductWindow = new Ext.Window({
				title : '外协产品新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :260,
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
				items : [ addXywzAsstMachgProductForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgProductWindow = new Ext.Window({
				title : '外协产品修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 260,
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
				items : [ editXywzAsstMachgProductForm ]
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