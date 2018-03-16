Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "质量检验标准明细查询",
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
						items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'spcModel',
									id : 'SIZE31',
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE31').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
										qForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
									}
								})  ]
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

			var record = Ext.data.Record.create([
			  {name : 'qualDtlId',
				   mapping : 'QUAL_DTL_ID'
			  }, {
			  name : 'qualId',
			   mapping : 'QUAL_ID'
			  }, {
			  name : 'rollingKind',
			   mapping : 'ROLLING_KIND'
			  }, {
			  name : 'number',
			   mapping : 'NUMBER'
			  }, {
			  name : 'pieces',
			   mapping : 'PIECES'
			  }, {
			  name : 'piecesWeight',
			   mapping : 'PIECES_WEIGHT'
			  }, {
			  name : 'piecesCnt',
			   mapping : 'PIECES_CNT'
			  }, {
			  name : 'cdPkgStd',
			   mapping : 'CD_PKG_STD'
			  }, {
			  name : 'memo',
			   mapping : 'MEMO'
			  }, {
			  name : 'gdsAgent',
			   mapping : 'GDS_AGENT'
			  }, {
			  name : 'contcr',
			   mapping : 'CONTCR'
			  }, {
			  name : 'guoyMakDoc',
			   mapping : 'GUOY_MAK_DOC'
			  }, {
			  name : 'spcModel',
			   mapping : 'SPC_MODEL'
			  }, {
			  name : 'checkStd',
			   mapping : 'CHECK_STD'
			  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, 
			     {header : '质检明细ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'qualDtlId',
				   sortable : true
				  }, {
				  header : '质检ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'qualId',
				   sortable : true
				  }, {
					  header : '规格型号',
					   width : 180,
					   dataIndex : 'spcModel',
					   sortable : true
					  }, {
					  header : '检验标准',
					   width : 120,
					   dataIndex : 'checkStd',
					   sortable : true
				 }, {
				  header : '轧制品种',
				   width : 120,
				   dataIndex : 'rollingKind',
				   sortable : true
				  }, {
				  header : '数量',
				   width : 120,
				   dataIndex : 'number',
				   sortable : true
				  }, {
				  header : '件数',
				   width : 120,
				   dataIndex : 'pieces',
				   sortable : true
				  }, {
				  header : '每件重量',
				   width : 120,
				   dataIndex : 'piecesWeight',
				   sortable : true
				  }, {
				  header : '每件支数',
				   width : 120,
				   dataIndex : 'piecesCnt',
				   sortable : true
				  }, {
				  header : '码包标准',
				   width : 120,
				   dataIndex : 'cdPkgStd',
				   sortable : true
				  }, {
				  header : '货代',
				   width : 120,
				   dataIndex : 'gdsAgent',
				   sortable : true
				  }, {
				  header : '联系人',
				   width : 120,
				   dataIndex : 'contcr',
				   sortable : true
				  }, {
				  header : '国阳制单',
				   width : 120,
				   dataIndex : 'guoyMakDoc',
				   sortable : true
				  }, {
					 header : '备注',
					 width : 120,
					 dataIndex : 'memo',
					 sortable : true
				  }

				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanQltyCheckDetlQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'QUAL_DTL_ID',
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
											addXywzPlanQltyCheckDetlForm.getForm().reset();
											addXywzPlanQltyCheckDetlWindow.show();
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
												editXywzPlanQltyCheckDetlForm.getForm().loadRecord(selectRe);
												editXywzPlanQltyCheckDetlWindow.show();

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
												tempId = selectRe.data.qualDtlId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPlanQltyCheckDetlAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzPlanQltyCheckDetlQueryAction.json'
							        }),'-',
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
												detailXywzPlanQltyCheckDetlForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPlanQltyCheckDetlWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzPlanQltyCheckDetlForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'qualDtlId',
			            hidden:true,
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
										id : 'SIZE32',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
											//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
											addXywzPlanQltyCheckDetlForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
										}
									}) ]
				          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'checkStd',
				            fieldLabel : '检验标准',
				            anchor : '90%'
				           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'rollingKind',
			            fieldLabel : '轧制品种',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'number',
			            fieldLabel : '数量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'pieces',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesWeight',
			            fieldLabel : '每件重量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesCnt',
			            fieldLabel : '每件支数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'cdPkgStd',
			            fieldLabel : '码包标准',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgent',
			            fieldLabel : '货代',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'contcr',
			            fieldLabel : '联系人',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'guoyMakDoc',
			            fieldLabel : '国阳制单',
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
				            maxLength:500,
				            fieldLabel : '备注',
				            anchor : '90%'
				           } ]
				       }
			         ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPlanQltyCheckDetlForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPlanQltyCheckDetlAction.json',
								method : 'POST',
								form : addXywzPlanQltyCheckDetlForm.getForm().id,
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
							
							addXywzPlanQltyCheckDetlWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPlanQltyCheckDetlWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPlanQltyCheckDetlForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'qualDtlId',
			            hidden:true,
			            anchor : '90%'
			           } ]
			          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [  new Com.xywz.common.SysmProductDetailQuery(
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
											//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
											editXywzPlanQltyCheckDetlForm.getForm().findField('spcModel').setValue(records[0].data.SIZE_CONCAT);
										}
									})  ]
				          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'checkStd',
				            fieldLabel : '检验标准',
				            anchor : '90%'
				           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'rollingKind',
			            fieldLabel : '轧制品种',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'number',
			            fieldLabel : '数量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'pieces',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesWeight',
			            fieldLabel : '每件重量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesCnt',
			            fieldLabel : '每件支数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'cdPkgStd',
			            fieldLabel : '码包标准',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgent',
			            fieldLabel : '货代',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'contcr',
			            fieldLabel : '联系人',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'guoyMakDoc',
			            fieldLabel : '国阳制单',
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
				            maxLength:500,
				            fieldLabel : '备注',
				            anchor : '90%'
				           } ]
				       }
			         ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPlanQltyCheckDetlForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPlanQltyCheckDetlAction.json',
								method : 'POST',
								form : editXywzPlanQltyCheckDetlForm.getForm().id,
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
							
							editXywzPlanQltyCheckDetlWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPlanQltyCheckDetlWindow.hide();
						}
					} ]
				} ]
			});		
			
			// 预览展示的from
			var detailXywzPlanQltyCheckDetlForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
			            columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'qualDtlId',
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
				            name : 'spcModel',
				            fieldLabel : '<font color=red>*</font>规格型号',
				            anchor : '90%'
				           } ]
				          },{
				           columnWidth : .5,
				            layout : 'form',
				            items : [ {
				            xtype : 'textfield',
				            vtype : 'trim',
				            Width : '100',
				            name : 'checkStd',
				            fieldLabel : '检验标准',
				            anchor : '90%'
				           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'rollingKind',
			            fieldLabel : '轧制品种',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'number',
			            fieldLabel : '数量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'pieces',
			            fieldLabel : '件数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesWeight',
			            fieldLabel : '每件重量',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'numberfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'piecesCnt',
			            fieldLabel : '每件支数',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'cdPkgStd',
			            fieldLabel : '码包标准',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsAgent',
			            fieldLabel : '货代',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'contcr',
			            fieldLabel : '联系人',
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'guoyMakDoc',
			            fieldLabel : '国阳制单',
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
				            maxLength:500,
				            fieldLabel : '备注',
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
					    	detailXywzPlanQltyCheckDetlWindow.hide();
						}
					} ]
				}
				]
			});
			
			// 定义新增窗口
			var addXywzPlanQltyCheckDetlWindow = new Ext.Window({
				title : '质量检验标准新增',
				plain : true,
				layout : 'fit',
				width : 750,
				height :350,
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
				items : [ addXywzPlanQltyCheckDetlForm ]
			});

			// 定义修改窗口
			var editXywzPlanQltyCheckDetlWindow = new Ext.Window({
				title : '质量检验标准修改',
				plain : true,
				layout : 'fit',
				width : 750,
				height :350,
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
				items : [ editXywzPlanQltyCheckDetlForm ]
			});	
			
			// 定义详情窗口
			var detailXywzPlanQltyCheckDetlWindow = new Ext.Window({
				title : '质量检验标准详情',
				plain : true,
				layout : 'fit',
				width : 750,
				height : 350,
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
				items : [ detailXywzPlanQltyCheckDetlForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '质量检验标准明细列表',
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