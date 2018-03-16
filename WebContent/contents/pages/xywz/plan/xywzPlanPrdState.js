Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROD_STATE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore3 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_WORKSHOP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var qForm = new Ext.form.FormPanel({
				title : "产品生产状态查询",
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
							name : 'hsCode',
							fieldLabel : '品名',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'spcModel',
							fieldLabel : '规格型号',
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
				   name : 'prodid',
				   mapping : 'PRODID'
				          },{
				  name : 'hsCode',
				   mapping : 'HS_CODE'
				          },{
				  name : 'spcModel',
				   mapping : 'SPC_MODEL'
				          },{
				  name : 'weight',
				   mapping : 'WEIGHT'
				          },
//				          {
//				  name : 'jianCnt',
//				   mapping : 'JIAN_CNT'
//				          },{
//				  name : 'remCnt',
//				   mapping : 'REM_CNT'
//				          },{
//				  name : 'zhiCnt',
//				   mapping : 'ZHI_CNT'
//				          },
				          {
				  name : 'workShop',
				   mapping : 'WORK_SHOP'
				          },{
				  name : 'workShopOra',
				   mapping : 'WORK_SHOP_ORA'
				          },{
				  name : 'prodState',
				   mapping : 'PROD_STATE'
				          },{
				  name : 'prodStateOra',
				   mapping : 'PROD_STATE_ORA'
				          },{
				  name : 'inputPersId',
				   mapping : 'INPUT_PERS_ID'
				          },{
				  name : 'inputPersNm',
				   mapping : 'INPUT_PERS_NM'
				          },{
				  name : 'inputDt',
				   mapping : 'INPUT_DT'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '生产编号',
				   width : 100,
				   dataIndex : 'prodid',
				   sortable : true,
				   hidden:true
				          },{
				  header : '品名',
				   width : 100,
				   dataIndex : 'hsCode',
				   sortable : true
				          },{
				  header : '规格型号',
				   width : 100,
				   dataIndex : 'spcModel',
				   sortable : true
				          },{
				  header : '重量（吨）',
				   width : 100,
				   dataIndex : 'weight',
				   sortable : true
				          },
//				          {
//				  header : '件数',
//				   width : 100,
//				   dataIndex : 'jianCnt',
//				   sortable : true
//				          },{
//				  header : '零支',
//				   width : 100,
//				   dataIndex : 'remCnt',
//				   sortable : true
//				          },{
//				  header : '支/件',
//				   width : 100,
//				   dataIndex : 'zhiCnt',
//				   sortable : true
//				          },
				          {
				  header : '车间',
				   width : 100,
				   dataIndex : 'workShopOra',
				   sortable : true
				          },{
				  header : '生产状态',
				   width : 100,
				   dataIndex : 'prodStateOra',
				   sortable : true
				          },
//				          {
//				  header : '录入人编号',
//				   width : 100,
//				   dataIndex : 'inputPersId',
//				   sortable : true
//				          },
				          {
				  header : '录入人名称',
				   width : 100,
				   dataIndex : 'inputPersNm',
				   sortable : true
				          },{
				  header : '录入日期',
				   width : 100,
				   dataIndex : 'inputDt',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdStateQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'prodid',
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
											addXywzPlanPrdStateForm.getForm().reset();
											addXywzPlanPrdStateWindow.show();
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
												editXywzPlanPrdStateForm.getForm().loadRecord(selectRe);
												editXywzPlanPrdStateWindow.show();

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
												tempId = selectRe.data.prodid;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPlanPrdStateAction!batchDestroy.json?idStr='+ idStr,
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
			var addXywzPlanPrdStateForm = new Ext.form.FormPanel({
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
					            items : [ new Com.xywz.common.ProdPlan(
							    {
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									id : 'USER_NAME33',
									name:'spcModel',
									singleSelected : false,
									allowBlank : false,
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME33').oProdPlanQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME33').setValue(records[0].data.SPC_MODEL);
										addXywzPlanPrdStateForm.getForm().findField('spcModel').setValue(records[0].data.SPC_MODEL);
										addXywzPlanPrdStateForm.getForm().findField('weight').setValue(records[0].data.WEIGHT);
										addXywzPlanPrdStateForm.getForm().findField('hsCode').setValue(records[0].data.PRD_NAME);
//										addXywzPlanPrdStateForm.getForm().findField('jianCnt').setValue(records[0].data.JIAN_CNT);
//										addXywzPlanPrdStateForm.getForm().findField('remCnt').setValue(records[0].data.REM_ZHI_CNT);
//										addXywzPlanPrdStateForm.getForm().findField('zhiCnt').setValue(records[0].data.ZHI_CNT);
									}
								}) ]
					          },{
						           columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'hsCode',
						            fieldLabel : '<font color=red>*</font>品名',
						            allowBlank : false,
						            blankText : '品名不能为空',
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
					            name : 'weight',
					            fieldLabel : '<font color=red>*</font>重量（吨）',
					            allowBlank : false,
					            blankText : '重量（吨）不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },
//					          {
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'jianCnt',
//					            fieldLabel : '<font color=red>*</font>件数',
//					            allowBlank : false,
//					            blankText : '件数不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },
//					          {
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'remCnt',
//					            fieldLabel : '<font color=red>*</font>零支',
//					            allowBlank : false,
//					            blankText : '零支不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },
//					          {
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'zhiCnt',
//					            fieldLabel : '<font color=red>*</font>支/件',
//					            allowBlank : false,
//					            blankText : '支/件不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },
					          {
					           columnWidth : .5,
					            layout : 'form',
					            items : [ new Ext.form.ComboBox({
									hiddenName : 'workShop',
									fieldLabel : '<font color=red>*</font>车间',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore3,
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
					           columnWidth : .5,
					            layout : 'form',
					            items : [ new Ext.form.ComboBox({
									hiddenName : 'prodState',
									fieldLabel : '<font color=red>*</font>生产状态',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore2,
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								})]
					          }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPlanPrdStateForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPlanPrdStateAction.json',
								method : 'POST',
								form : addXywzPlanPrdStateForm.getForm().id,
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
							
							addXywzPlanPrdStateWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPlanPrdStateWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPlanPrdStateForm = new Ext.form.FormPanel({
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
					            xtype : 'numberfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'prodid',
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
					            name : 'hsCode',
					            fieldLabel : '<font color=red>*</font>品名',
					            allowBlank : false,
					            blankText : '品名不能为空',
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
					            name : 'spcModel',
					            fieldLabel : '<font color=red>*</font>规格型号',
					            allowBlank : false,
					            blankText : '规格型号不能为空',
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
					            name : 'weight',
					            fieldLabel : '<font color=red>*</font>重量（吨）',
					            allowBlank : false,
					            blankText : '重量（吨）不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },
//					          {
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'jianCnt',
//					            fieldLabel : '<font color=red>*</font>件数',
//					            allowBlank : false,
//					            blankText : '件数不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },{
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'remCnt',
//					            fieldLabel : '<font color=red>*</font>零支',
//					            allowBlank : false,
//					            blankText : '零支不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },{
//					           columnWidth : .5,
//					            layout : 'form',
//					            items : [ {
//					            xtype : 'textfield',
//					            vtype : 'trim',
//					            Width : '100',
//					            name : 'zhiCnt',
//					            fieldLabel : '<font color=red>*</font>支/件',
//					            allowBlank : false,
//					            blankText : '支/件不能为空',
//					            maxLength : 200,
//					            minLength : 1,
//					            anchor : '90%'
//					           } ]
//					          },
					          {
					           columnWidth : .5,
					            layout : 'form',
					            items : [  new Ext.form.ComboBox({
									hiddenName : 'workShop',
									fieldLabel : '<font color=red>*</font>车间',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore3,
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
					           columnWidth : .5,
					            layout : 'form',
					            items : [new Ext.form.ComboBox({
									hiddenName : 'prodState',
									fieldLabel : '<font color=red>*</font>生产状态',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore2,
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								}) ]
					          }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPlanPrdStateForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPlanPrdStateAction.json',
								method : 'POST',
								form : editXywzPlanPrdStateForm.getForm().id,
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
							
							editXywzPlanPrdStateWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPlanPrdStateWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzPlanPrdStateWindow = new Ext.Window({
				title : '产品生产状态新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :380,
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
				items : [ addXywzPlanPrdStateForm ]
			});

			// 定义修改窗口
			var editXywzPlanPrdStateWindow = new Ext.Window({
				title : '产品生产状态修改',
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
				items : [ editXywzPlanPrdStateForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '产品生产状态列表',
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