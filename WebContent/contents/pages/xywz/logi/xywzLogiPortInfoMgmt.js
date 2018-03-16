Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_BELONG_COUNTRY'  //客户等级
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "港口信息查询",
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
							name : 'portNameCn',
							labelWidth : 150,
							fieldLabel : '港口中文名称 ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'portNameEn',
							fieldLabel : '港口英文名称',
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
				name : 'portId',
				   mapping : 'PORT_ID'
				          },{
				  name : 'portNameCn',
				   mapping : 'PORT_NAME_CN'
				          },{
				  name : 'portNameEn',
				   mapping : 'PORT_NAME_EN'
				          },{
				  name : 'belongCountry',
				   mapping : 'BELONG_COUNTRY'
				          },{
				  name : 'belongCountryOra',
				   mapping : 'BELONG_COUNTRY_ORA'
				          },{
				  name : 'detailDesc',
				   mapping : 'DETAIL_DESC'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : '港口ID',
				   width : 210,
				   dataIndex : 'portId',
				   sortable : true
				  },{
				  header : '港口名称',
				   width : 210,
				   dataIndex : 'portNameCn',
				   sortable : true
				 },{
				  header : '港口英文名称',
				   width : 210,
				   dataIndex : 'portNameEn',
				   sortable : true,
				   hidden:true
				  },{
				  header : '所属国家',
				   width : 210,
				   dataIndex : 'belongCountryOra',
				   sortable : true
				  },{
				  header : '备注',
				   width : 210,
				   dataIndex : 'detailDesc',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiPortInfoMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'PORT_ID',
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
											addXywzLogiPortInfoMgmtForm.getForm().reset();											
											addXywzLogiPortInfoMgmtWindow.show();
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
												editXywzLogiPortInfoMgmtForm.getForm().loadRecord(selectRe);
												editXywzLogiPortInfoMgmtWindow.show();

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
												tempId = selectRe.data.portId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiPortInfoMgmtAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzLogiPortInfoMgmtQueryAction.json'
							        })]
					});

			// 新增窗口展示的from
			var addXywzLogiPortInfoMgmtForm = new Ext.form.FormPanel({
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
					      name : 'portNameCn',
					      fieldLabel : '<font color=red>*</font>港口名称',
					      allowBlank : false,
					      blankText : '港口名称不能为空',
					      maxLength : 200,
					      minLength : 1,
					      anchor : '90%'
					     } ]
					    },
//					    {
//					        columnWidth : .5,
//					        layout : 'form',
//					        items : [ {
//					        xtype : 'textfield',
//					        vtype : 'trim',
//					        Width : '100',
//					        name : 'portNameEn',
//					        fieldLabel : '港口英文名称',
//					        allowBlank : true,
//					        maxLength : 200,
//					        minLength : 1,
//					        anchor : '90%'
//					       } ]
//					      },
					      {
					          columnWidth : .5,
					          layout : 'form',
					          items : [new Ext.form.ComboBox({
									hiddenName : 'belongCountry',
									fieldLabel : '所属国家',
									labelStyle: 'text-align:right;',
									triggerAction : 'all',
									store : boxstore1,
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
					           columnWidth : 1.05,
					            layout : 'form',
					            items : [ {
					            xtype : 'textarea',
					            vtype : 'trim',
					            Width : '100',
					            name : 'detailDesc',
					            fieldLabel : '备注',
					            allowBlank : true,
					            maxLength : 100,
					            minLength : 1,
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
							if(!addXywzLogiPortInfoMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiPortInfoMgmtAction.json',
								method : 'POST',
								form : addXywzLogiPortInfoMgmtForm.getForm().id,
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
							
							addXywzLogiPortInfoMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiPortInfoMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiPortInfoMgmtForm = new Ext.form.FormPanel({
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
					    name : 'portId',
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
					      name : 'portNameCn',
					      fieldLabel : '港口中文名称',
					      allowBlank : true,
					      maxLength : 200,
					      minLength : 1,
					      anchor : '90%'
					     } ]
					    },
//					    {
//					        columnWidth : .5,
//					        layout : 'form',
//					        items : [ {
//					        xtype : 'textfield',
//					        vtype : 'trim',
//					        Width : '100',
//					        name : 'portNameEn',
//					        fieldLabel : '港口英文名称',
//					        allowBlank : true,
//					        maxLength : 200,
//					        minLength : 1,
//					        anchor : '90%'
//					       } ]
//					      },
					      {
					          columnWidth : .5,
					          layout : 'form',
					          items : [new Ext.form.ComboBox({
									hiddenName : 'belongCountry',
									fieldLabel : '所属国家',
									labelStyle: 'text-align:right;',
									triggerAction : 'all',
									store : boxstore1,
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
					            items : [ {
					            xtype : 'textfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'detailDesc',
					            fieldLabel : '备注',
					            allowBlank : true,
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					        } ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiPortInfoMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiPortInfoMgmtAction.json',
								method : 'POST',
								form : editXywzLogiPortInfoMgmtForm.getForm().id,
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
							
							editXywzLogiPortInfoMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiPortInfoMgmtWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzLogiPortInfoMgmtWindow = new Ext.Window({
				title : '港口信息新增',
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
				items : [ addXywzLogiPortInfoMgmtForm ]
			});

			// 定义修改窗口
			var editXywzLogiPortInfoMgmtWindow = new Ext.Window({
				title : '港口信息修改',
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
				items : [ editXywzLogiPortInfoMgmtForm ]
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