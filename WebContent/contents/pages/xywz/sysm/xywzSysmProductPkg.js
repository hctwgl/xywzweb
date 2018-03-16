Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "国阳产品包装标准",
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
						items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '<font color=red>*</font>规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'size',
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
										qForm.getForm().findField('size').setValue(records[0].data.SIZE_CONCAT);
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

			var record = Ext.data.Record.create([ {
				  name : 'pkgId',
				   mapping : 'PKG_ID'
				  },{
				  name : 'hsCode',
				   mapping : 'HS_CODE'
				  },{
				  name : 'size',
				   mapping : 'SIZE'
				  },{
				  name : 'len',
				   mapping : 'LEN'
				  },{
				  name : 'zhiCnt',
				   mapping : 'ZHI_CNT'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '产品ID',
				   width : 210,
				   dataIndex : 'pkgId',
				   sortable : true,
				   hidden : true
				  },{
				  header : '品名',
				   width : 210,
				   dataIndex : 'hsCode',
				   sortable : true
				  },{
				  header : '规格型号',
				   width : 210,
				   dataIndex : 'size',
				   sortable : true
				  },{
				  header : '长度(米)',
				   width : 210,
				   dataIndex : 'len',
				   sortable : true,
				   renderer: money('0,000' )
				  },{
				  header : '每件支数(支/件)',
				   width : 210,
				   dataIndex : 'zhiCnt',
				   sortable : true,
				   renderer: money('0,000' )
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSysmProductPkgQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'PKG_ID',
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
											addXywzSysmProductPkgForm.getForm().reset();											
											addXywzSysmProductPkgWindow.show();
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
												editXywzSysmProductPkgForm.getForm().loadRecord(selectRe);
												editXywzSysmProductPkgWindow.show();

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
												tempId = selectRe.data.pkgId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
//											alert(idStr);
												Ext.Ajax.request({
														url : basepath+ '/XywzSysmProductPkgAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzSysmProductPkgQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzSysmProductPkgForm = new Ext.form.FormPanel({
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
			            items : [ new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '<font color=red>*</font>规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'size',
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
										//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
										addXywzSysmProductPkgForm.getForm().findField('size').setValue(records[0].data.SIZE_CONCAT);
										addXywzSysmProductPkgForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
									}
								}) ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [{
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
				           }]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'len',
			            fieldLabel : '<font color=red>*</font>长度(米)',
			            allowBlank : false,
			            blankText : '长度不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            renderer: money('0,000' )
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'zhiCnt',
			            fieldLabel : '<font color=red>*</font>每件支数(支/件)',
			            allowBlank : false,
			            blankText : '包装不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            renderer: money('0,000' )
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
							if(!addXywzSysmProductPkgForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzSysmProductPkgAction.json',
								method : 'POST',
								form : addXywzSysmProductPkgForm.getForm().id,
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
							
							addXywzSysmProductPkgWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzSysmProductPkgWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzSysmProductPkgForm = new Ext.form.FormPanel({
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
			            name : 'pkgId',
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
			            anchor : '90%',
			            readOnly:true
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
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'len',
			            fieldLabel : '<font color=red>*</font>长度(米)',
			            allowBlank : false,
			            blankText : '长度不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true,
			            renderer: money('0,000' )
			           } ]
			          },{
			           columnWidth : .5,
			            layout : 'form',
			            items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'zhiCnt',
			            fieldLabel : '<font color=red>*每件支数(支/件)</font>',
			            allowBlank : false,
			            blankText : '包装不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            renderer: money('0,000' )
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
							if(!editXywzSysmProductPkgForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzSysmProductPkgAction.json',
								method : 'POST',
								form : editXywzSysmProductPkgForm.getForm().id,
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
							
							editXywzSysmProductPkgWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzSysmProductPkgWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzSysmProductPkgWindow = new Ext.Window({
				title : '国阳产品包装新增',
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
				items : [ addXywzSysmProductPkgForm ]
			});

			// 定义修改窗口
			var editXywzSysmProductPkgWindow = new Ext.Window({
				title : '国阳产品包装修改',
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
				items : [ editXywzSysmProductPkgForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '国阳产品包装列表',
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