Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "船务公司查询",
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
							name : 'shipCorpId',
							labelWidth : 150,
							fieldLabel : '船务公司ID ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'corpNm',
							fieldLabel : '船务公司名称',
							anchor : '95%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'contcr',
							fieldLabel : '联系人',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'setupCoRelDt',
							fieldLabel : '建立合作关系日期',
							anchor : '90%',
							format : 'Y-m-d'
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
				name : 'shipCorpId',
				   mapping : 'SHIP_CORP_ID'
				  }, {
				  name : 'corpNm',
				   mapping : 'CORP_NM'
				  }, {
				  name : 'addr',
				   mapping : 'ADDR'
				  }, {
				  name : 'contcr',
				   mapping : 'CONTCR'
				  }, {
				  name : 'contTel1',
				   mapping : 'CONT_TEL1'
				  }, {
				  name : 'contTel2',
				   mapping : 'CONT_TEL2'
				  }, {
				  name : 'moblNum1',
				   mapping : 'MOBL_NUM1'
				  }, {
				  name : 'moblNum2',
				   mapping : 'MOBL_NUM2'
				  }, {
				  name : 'setupCoRelDt',
				   mapping : 'SETUP_CO_REL_DT'
				  }, {
				  name : 'memo',
				   mapping : 'MEMO'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '船务公司ID',
				   width : 210,
				   dataIndex : 'shipCorpId',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '公司名称',
				   width : 210,
				   dataIndex : 'corpNm',
				   sortable : true
				  }, {
				  header : '地址',
				   width : 210,
				   dataIndex : 'addr',
				   sortable : true
				  }, {
				  header : '联系人',
				   width : 210,
				   dataIndex : 'contcr',
				   sortable : true
				  }, {
				  header : '联系电话1',
				   width : 210,
				   dataIndex : 'contTel1',
				   sortable : true
				  }, {
				  header : '联系电话2',
				   width : 210,
				   dataIndex : 'contTel2',
				   sortable : true
				  }, {
				  header : '手机号码1',
				   width : 210,
				   dataIndex : 'moblNum1',
				   sortable : true
				  }, {
				  header : '手机号码2',
				   width : 210,
				   dataIndex : 'moblNum2',
				   sortable : true
				  }, {
				  header : '建立合作关系日期',
				   width : 210,
				   dataIndex : 'setupCoRelDt',
				   sortable : true
				  }, {
				  header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiShipCorpMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'SHIP_CORP_ID',
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
											addXywzLogiShipCorpMgmtForm.getForm().reset();											
											addXywzLogiShipCorpMgmtWindow.show();
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
												editXywzLogiShipCorpMgmtForm.getForm().loadRecord(selectRe);
												editXywzLogiShipCorpMgmtWindow.show();

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
												tempId = selectRe.data.shipCorpId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiShipCorpMgmtAction!batchDestroy.json?idStr='+ idStr,
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
									},'-',{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzLogiShipCorpMgmtForm.getForm().loadRecord(selectRe);
												detailXywzLogiShipCorpMgmtWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiShipCorpMgmtQueryAction.json'
							        })]
					});

			var detailXywzLogiShipCorpMgmtForm = new Ext.form.FormPanel({
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
			            name : 'corpNm',
			            fieldLabel : '公司名称',
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
			            name : 'addr',
			            fieldLabel : '地址',
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
			            name : 'contcr',
			            fieldLabel : '联系人',
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
			            name : 'contTel1',
			            fieldLabel : '联系电话1',
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
			            name : 'contTel2',
			            fieldLabel : '联系电话2',
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
			            name : 'moblNum1',
			            fieldLabel : '手机号码1',
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
			            name : 'moblNum2',
			            fieldLabel : '手机号码2',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'setupCoRelDt',
			            fieldLabel : '建立合作关系日期',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format : 'Y-m-d',
			            readOnly:true
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '备注',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
                     } ]
                  }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzLogiShipCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzLogiShipCorpMgmtForm = new Ext.form.FormPanel({
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
			            name : 'corpNm',
			            fieldLabel : '<font color=red>*</font>公司名称',
			            allowBlank : false,
			            blankText : '公司名称不能为空',
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
			            name : 'addr',
			            fieldLabel : '<font color=red>*</font>地址',
			            allowBlank : false,
			            blankText : '地址不能为空',
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
			            name : 'contcr',
			            fieldLabel : '<font color=red>*</font>联系人',
			            allowBlank : false,
			            blankText : '联系人不能为空',
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
			            name : 'contTel1',
			            fieldLabel : '<font color=red>*</font>联系电话1',
			            allowBlank : false,
			            blankText : '联系电话1不能为空',
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
			            name : 'contTel2',
			            fieldLabel : '<font color=red>*</font>联系电话2',
			            allowBlank : false,
			            blankText : '联系电话2不能为空',
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
			            name : 'moblNum1',
			            fieldLabel : '<font color=red>*</font>手机号码1',
			            allowBlank : false,
			            blankText : '手机号码1不能为空',
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
			            name : 'moblNum2',
			            fieldLabel : '<font color=red>*</font>手机号码2',
			            allowBlank : false,
			            blankText : '手机号码2不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'setupCoRelDt',
			            fieldLabel : '<font color=red>*</font>建立合作关系日期',
			            allowBlank : false,
			            blankText : '建立合作关系日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format : 'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '<font color=red>*</font>备注',
			            allowBlank : false,
			            blankText : '备注不能为空',
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
							if(!addXywzLogiShipCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiShipCorpMgmtAction.json',
								method : 'POST',
								form : addXywzLogiShipCorpMgmtForm.getForm().id,
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
							
							addXywzLogiShipCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiShipCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiShipCorpMgmtForm = new Ext.form.FormPanel({
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
			            name : 'shipCorpId',
			            hidden:true,
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
			            name : 'corpNm',
			            fieldLabel : '<font color=red>*</font>公司名称',
			            allowBlank : false,
			            blankText : '公司名称不能为空',
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
			            name : 'addr',
			            fieldLabel : '<font color=red>*</font>地址',
			            allowBlank : false,
			            blankText : '地址不能为空',
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
			            name : 'contcr',
			            fieldLabel : '<font color=red>*</font>联系人',
			            allowBlank : false,
			            blankText : '联系人不能为空',
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
			            name : 'contTel1',
			            fieldLabel : '<font color=red>*</font>联系电话1',
			            allowBlank : false,
			            blankText : '联系电话1不能为空',
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
			            name : 'contTel2',
			            fieldLabel : '<font color=red>*</font>联系电话2',
			            allowBlank : false,
			            blankText : '联系电话2不能为空',
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
			            name : 'moblNum1',
			            fieldLabel : '<font color=red>*</font>手机号码1',
			            allowBlank : false,
			            blankText : '手机号码1不能为空',
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
			            name : 'moblNum2',
			            fieldLabel : '<font color=red>*</font>手机号码2',
			            allowBlank : false,
			            blankText : '手机号码2不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'datefield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'setupCoRelDt',
			            fieldLabel : '<font color=red>*</font>建立合作关系日期',
			            allowBlank : false,
			            blankText : '建立合作关系日期不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format : 'Y-m-d'
			           } ]
			          },
			          {
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'memo',
			            fieldLabel : '<font color=red>*</font>备注',
			            allowBlank : false,
			            blankText : '备注不能为空',
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
							if(!editXywzLogiShipCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiShipCorpMgmtAction.json',
								method : 'POST',
								form : editXywzLogiShipCorpMgmtForm.getForm().id,
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
							
							editXywzLogiShipCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiShipCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzLogiShipCorpMgmtWindow = new Ext.Window({
				title : '客户银行信息详情',
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
				items : [ detailXywzLogiShipCorpMgmtForm ]
			});

			// 定义新增窗口
			var addXywzLogiShipCorpMgmtWindow = new Ext.Window({
				title : '船务公司信息新增',
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
				items : [ addXywzLogiShipCorpMgmtForm ]
			});

			// 定义修改窗口
			var editXywzLogiShipCorpMgmtWindow = new Ext.Window({
				title : '船务公司信息修改',
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
				items : [ editXywzLogiShipCorpMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '船务公司信息列表',
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