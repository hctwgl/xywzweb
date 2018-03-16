Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "秦皇岛市国阳钢铁有限公司产品规格表",
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
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'hsCode',
							labelWidth : 150,
							fieldLabel : '品名 ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'size',
							fieldLabel : '规格型号',
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
				  name : 'prodId',
				   mapping : 'PROD_ID'
				  },{
				  name : 'hsCode',
				   mapping : 'HS_CODE'
				  },{
				  name : 'materials',
				   mapping : 'MATERIALS'
				  },{
				  name : 'size',
				   mapping : 'SIZE'
				  },{
				  name : 'waistDepth',
				   mapping : 'WAIST_DEPTH'
				  },{
				  name : 'weight',
				   mapping : 'WEIGHT'
				  },{
				  name : 'price',
				   mapping : 'PRICE'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '产品ID',
				   width : 210,
				   dataIndex : 'prodId',
				   sortable : true,
				   hidden : true
				  },{
				  header : '品名',
				   width : 210,
				   dataIndex : 'hsCode',
				   sortable : true
				  },{
				  header : '材质',
				   width : 210,
				   dataIndex : 'materials',
				   sortable : true
				  },{
				  header : '规格型号',
				   width : 210,
				   dataIndex : 'size',
				   sortable : true
				  },{
				  header : '腰厚(MM)',
				   width : 210,
				   dataIndex : 'waistDepth',
				   sortable : true
				  },{
				  header : '理重(KG)',
				   width : 210,
				   dataIndex : 'weight',
				   sortable : true,
				   renderer: money('0,000.00' )
				  },{
				  header : '价格',
				   width : 210,
				   dataIndex : 'price',
				   sortable : true,
				   hidden : true,
				   renderer: money('0,000.00' )
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSysmProductDetailQueryAction.json'
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
											addXywzSysmProductDetailForm.getForm().reset();											
											addXywzSysmProductDetailWindow.show();
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
												editXywzSysmProductDetailForm.getForm().loadRecord(selectRe);
												editXywzSysmProductDetailWindow.show();

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
														url : basepath+ '/XywzSysmProductDetailAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzSysmProductDetailQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzSysmProductDetailForm = new Ext.form.FormPanel({
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
			            name : 'materials',
			            fieldLabel : '<font color=red>*</font>材质',
			            allowBlank : false,
						blankText : '材质不能为空',
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
			            name : 'size',
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
			            name : 'waistDepth',
			            fieldLabel : '<font color=red>*</font>腰厚(MM)',
			            allowBlank : false,
			            blankText : '腰厚不能为空',
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
			            fieldLabel : '<font color=red>*</font>理重(KG)',
			            allowBlank : false,
			            blankText : '理重不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          }
//			          ,{
//			           columnWidth : .5,
//			            layout : 'form',
//			            items : [ {
//			            xtype : 'textfield',
//			            vtype : 'trim',
//			            Width : '100',
//			            name : 'price',
//			            fieldLabel : '<font color=red>*</font>价格(元)',
//			            allowBlank : false,
//			            blankText : '价格不能为空',
//						hidden : true,
//			            maxLength : 200,
//			            minLength : 1,
//			            anchor : '90%'
//			           } ]
//							}
			          ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzSysmProductDetailForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzSysmProductDetailAction.json',
								method : 'POST',
								form : addXywzSysmProductDetailForm.getForm().id,
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
							
							addXywzSysmProductDetailWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzSysmProductDetailWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzSysmProductDetailForm = new Ext.form.FormPanel({
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
			            name : 'prodId',
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
			            name : 'materials',
			            fieldLabel : '<font color=red>*</font>材质',
			            allowBlank : false,
						blankText : '材质不能为空',
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
			            name : 'size',
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
			            name : 'waistDepth',
			            fieldLabel : '<font color=red>*</font>腰厚(MM)',
			            allowBlank : false,
			            blankText : '腰厚不能为空',
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
			            fieldLabel : '<font color=red>*</font>理重(KG)',
			            allowBlank : false,
			            blankText : '理重不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          }
//			          ,{
//			           columnWidth : .5,
//			            layout : 'form',
//			            items : [ {
//			            xtype : 'textfield',
//			            vtype : 'trim',
//			            Width : '100',
//			            name : 'price',
//			            fieldLabel : '<font color=red>*</font>价格(元)',
//			            allowBlank : false,
//			            blankText : '价格不能为空',
//						hidden : true,
//			            maxLength : 200,
//			            minLength : 1,
//			            anchor : '90%'
//			           } ]
//							} 
			          ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzSysmProductDetailForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzSysmProductDetailAction.json',
								method : 'POST',
								form : editXywzSysmProductDetailForm.getForm().id,
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
							
							editXywzSysmProductDetailWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzSysmProductDetailWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzSysmProductDetailWindow = new Ext.Window({
				title : '国阳产品新增',
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
				items : [ addXywzSysmProductDetailForm ]
			});

			// 定义修改窗口
			var editXywzSysmProductDetailWindow = new Ext.Window({
				title : '国阳产品修改',
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
				items : [ editXywzSysmProductDetailForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '国阳产品信息列表',
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