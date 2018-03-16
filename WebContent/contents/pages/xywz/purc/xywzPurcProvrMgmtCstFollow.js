Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“供应商阶段”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_RSLT_CLS'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“是否”选择数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "供应商客户跟进查询",
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
						items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
						{
							fieldLabel : '供应商编号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'provrNum',
							id : 'PROVR_NUM11',
							singleSelected : false,
							// 单选复选标志
//							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('PROVR_NUM11').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('PROVR_NUM11').setValue(records[0].data.PROVR_NUM);									
							}
						}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Com.xywz.common.PurcProvrMgmtContactQuery(
						{
							fieldLabel : '供应商联系人',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'provrContcr',
							id : 'PROVR_CONTCR11',
							singleSelected : false,
							// 单选复选标志
//									editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('PROVR_CONTCR11').oPurcProvrMgmtContactQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('PROVR_CONTCR11').setValue(records[0].data.NAME);
								qForm.getForm().findField('provrNum').setValue(records[0].data.PROVR_NUM);
							}
						}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'persDtFrom',
							fieldLabel : '跟进日期   从',
							anchor : '90%',
							editable : false,
						    format:'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'persDtTo',
							fieldLabel : '到',
							anchor : '90%',
							editable:false,
							format:'Y-m-d'
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
				   name : 'provrNum',
				   mapping : 'PROVR_NUM'
				  }, { 
				   name : 'provrContcrId',
				   mapping : 'PROVR_CONTCR_ID'
				  }, { 
				   name : 'provrContcr',
				   mapping : 'PROVR_CONTCR'
				  }, { 
				   name : 'persMemId',
				   mapping : 'PERS_MEM_ID'
				  }, { 
				   name : 'persMem',
				   mapping : 'PERS_MEM'
				  }, { 
				   name : 'persDt',
				   mapping : 'PERS_DT'
				  }, { 
				   name : 'persMode',
				   mapping : 'PERS_MODE'
				  }, { 
				   name : 'sketch',
				   mapping : 'SKETCH'
				  }, { 
				   name : 'dtlDesc',
				   mapping : 'DTL_DESC'
				  }, { 
				   name : 'rsltCls',
				   mapping : 'RSLT_CLS'
				  }, { 
					   name : 'rsltClsOra',
					   mapping : 'RSLT_CLS_ORA'
					  }, { 
				   name : 'milepost',
				   mapping : 'MILEPOST'
				  }, { 
				   name : 'isNtCustInitvCont',
				   mapping : 'IS_NT_CUST_INITV_CONT'
				  }, { 
					   name : 'isNtCustInitvContOra',
					   mapping : 'IS_NT_CUST_INITV_CONT_ORA'
					  }, { 
				   name : 'signInfo',
				   mapping : 'SIGN_INFO'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : 'ID',
				   width : 210,
				   dataIndex : 'id',
				   hidden : true,
				   sortable : true
				  }, { 
				   header : '供应商编号',
				   width : 210,
				   dataIndex : 'provrNum',
				   sortable : true
				  }, { 
				   header : '供应商联系人ID',
				   width : 210,
				   dataIndex : 'provrContcrId',
				   hidden : true,
				   sortable : true
				  }, { 
				   header : '供应商联系人',
				   width : 210,
				   dataIndex : 'provrContcr',
				   sortable : true
				  }, { 
				   header : '跟进人员编号',
				   width : 210,
				   dataIndex : 'persMemId',
				   sortable : true
				  }, { 
				   header : '跟进人员',
				   width : 210,
				   dataIndex : 'persMem',
				   sortable : true
				  }, { 
				   header : '跟进日期',
				   width : 210,
				   dataIndex : 'persDt',
				   sortable : true
				  }, { 
				   header : '跟进方式',
				   width : 210,
				   dataIndex : 'persMode',
				   sortable : true
				  }, { 
				   header : '简述',
				   width : 210,
				   dataIndex : 'sketch',
				   sortable : true
				  }, { 
				   header : '详细描述',
				   width : 210,
				   dataIndex : 'dtlDesc',
				   sortable : true
				  }, { 
				   header : '结果分类',
				   width : 210,
				   dataIndex : 'rsltClsOra',
				   sortable : true
				  }, { 
				   header : '里程碑',
				   width : 210,
				   dataIndex : 'milepost',
				   sortable : true
				  }, { 
				   header : '是否客户主动联系',
				   width : 210,
				   dataIndex : 'isNtCustInitvContOra',
				   sortable : true
				  }, { 
				   header : '标注信息',
				   width : 210,
				   dataIndex : 'signInfo',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtCstFollowQueryAction.json'
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
											addXywzPurcProvrMgmtCstFollowForm.getForm().reset();
											addXywzPurcProvrMgmtCstFollowForm.getForm().findField('persDt').setValue(new Date());
											addXywzPurcProvrMgmtCstFollowWindow.show();
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
												editXywzPurcProvrMgmtCstFollowForm.getForm().loadRecord(selectRe);
												editXywzPurcProvrMgmtCstFollowWindow.show();

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
														url : basepath+ '/XywzPurcProvrMgmtCstFollowAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzPurcProvrMgmtCstFollowQueryAction.json'
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
												detailXywzPurcProvrMgmtCstFollowForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcProvrMgmtCstFollowWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzPurcProvrMgmtCstFollowForm = new Ext.form.FormPanel({
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
					             columnWidth : 0,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrContcrId',
					             fieldLabel : '供应商联系人ID',
					             hidden : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Com.xywz.common.PurcProvrMgmtContactQuery(
								{
									fieldLabel : '<font color=red>*</font>供应商联系人',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'provrContcr',
									id : 'PROVR_CONTCR22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PROVR_CONTCR22').oPurcProvrMgmtContactQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PROVR_CONTCR22').setValue(records[0].data.NAME);
										addXywzPurcProvrMgmtCstFollowForm.getForm().findField('provrContcrId').setValue(records[0].data.ID);
										addXywzPurcProvrMgmtCstFollowForm.getForm().findField('provrNum').setValue(records[0].data.PROVR_NUM);
									}
								}) ]
					         },{
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Com.xywz.common.UserManagerIdQuery(
									{
										fieldLabel : '<font color=red>*</font>跟进人员',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'persMem',
										id : 'PERS_MEM11',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('PERS_MEM11').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('PERS_MEM11').setValue(records[0].data.USER_NAME);
											addXywzPurcProvrMgmtCstFollowForm.getForm().findField('persMemId').setValue(records[0].data.ACCOUNT_NAME);
										}
									}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'persMemId',
					             fieldLabel : '<font color=red>*</font>跟进人员编号',
					             allowBlank : false,
					             blankText : '跟进人员编号不能为空',
					             maxLength : 100,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'datefield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'persDt',
					             fieldLabel : '<font color=red>*</font>跟进日期',
					             allowBlank : false,
					             blankText : '跟进日期不能为空',
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'persMode',
					             fieldLabel : '<font color=red>*</font>跟进方式',
					             allowBlank : false,
					             blankText : '跟进方式不能为空',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'sketch',
					             fieldLabel : '简述',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'dtlDesc',
					             fieldLabel : '详细描述',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'rsltCls',
									 fieldLabel : '<font color=red>*</font>结果分类',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore,
									 allowBlank : false,
									 displayField : 'value',
									 valueField : 'key',
									 mode : 'local',
									 forceSelection : true,
									 typeAhead : true,
									 emptyText:'请选择',
									 resizable : true,
									 editable : false,
									 anchor : '90%'
				                  }) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'milepost',
					             fieldLabel : '<font color=red>*</font>里程碑',
					             allowBlank : false,
					             blankText : '里程碑不能为空',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'isNtCustInitvCont',
									 fieldLabel : '<font color=red>*</font>是否客户主动联系',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore1,
									 allowBlank : false,
									 displayField : 'value',
									 valueField : 'key',
									 mode : 'local',
									 forceSelection : true,
									 typeAhead : true,
									 emptyText:'请选择',
									 resizable : true,
									 editable : false,
									 anchor : '90%'
				                  }) ]
					           },{ 
					             columnWidth : 1.06,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'signInfo',
					             fieldLabel : '标注信息',
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
					             name : 'id',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPurcProvrMgmtCstFollowForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtCstFollowAction.json',
								method : 'POST',
								form : addXywzPurcProvrMgmtCstFollowForm.getForm().id,
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
							
							addXywzPurcProvrMgmtCstFollowWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcProvrMgmtCstFollowWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcProvrMgmtCstFollowForm = new Ext.form.FormPanel({
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrContcrId',
					             fieldLabel : '供应商联系人ID',
					             hidden : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrContcr',
					             fieldLabel : '<font color=red>*</font>供应商联系人',
					             allowBlank : false,
					             blankText : '供应商联系人不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Com.xywz.common.UserManagerIdQuery(
									{
										fieldLabel : '<font color=red>*</font>跟进人员',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'persMem',
										id : 'PERS_MEM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('PERS_MEM22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('PERS_MEM22').setValue(records[0].data.USER_NAME);
											editXywzPurcProvrMgmtCstFollowForm.getForm().findField('persMemId').setValue(records[0].data.ACCOUNT_NAME);
										}
									}) ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persMemId',
						             fieldLabel : '<font color=red>*</font>跟进人员编号',
						             allowBlank : false,
						             blankText : '跟进人员编号不能为空',
						             maxLength : 100,
						             minLength : 1,
						             readOnly : true,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'datefield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persDt',
						             fieldLabel : '<font color=red>*</font>跟进日期',
						             allowBlank : false,
						             blankText : '跟进日期不能为空',
						             anchor : '90%',
						             format:'Y-m-d'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persMode',
						             fieldLabel : '<font color=red>*</font>跟进方式',
						             allowBlank : false,
						             blankText : '跟进方式不能为空',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'sketch',
						             fieldLabel : '简述',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'dtlDesc',
						             fieldLabel : '详细描述',
						             maxLength : 200,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'rsltCls',
										 fieldLabel : '<font color=red>*</font>结果分类',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'milepost',
						             fieldLabel : '<font color=red>*</font>里程碑',
						             allowBlank : false,
						             blankText : '里程碑不能为空',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'isNtCustInitvCont',
										 fieldLabel : '<font color=red>*</font>是否客户主动联系',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore1,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
						           },{ 
						             columnWidth : 1.06,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'signInfo',
						             fieldLabel : '标注信息',
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
						             anchor : '90%'
						            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPurcProvrMgmtCstFollowForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtCstFollowAction.json',
								method : 'POST',
								form : editXywzPurcProvrMgmtCstFollowForm.getForm().id,
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
							
							editXywzPurcProvrMgmtCstFollowWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcProvrMgmtCstFollowWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcProvrMgmtCstFollowForm = new Ext.form.FormPanel({
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrContcrId',
					             fieldLabel : '供应商联系人ID',
					             hidden : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrContcr',
					             fieldLabel : '<font color=red>*</font>供应商联系人',
					             allowBlank : false,
					             blankText : '供应商联系人不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
							             xtype : 'textfield',
							             vtype : 'trim',
							             Width : '100',
							             name : 'persMem',
							             fieldLabel : '<font color=red>*</font>跟进人员',
							             allowBlank : false,
							             blankText : '跟进人员不能为空',
							             maxLength : 200,
							             minLength : 1,
							             readOnly : true,
							             anchor : '90%'
							            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persMemId',
						             fieldLabel : '<font color=red>*</font>跟进人员编号',
						             allowBlank : false,
						             blankText : '跟进人员编号不能为空',
						             maxLength : 100,
						             minLength : 1,
						             readOnly : true,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'datefield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persDt',
						             fieldLabel : '<font color=red>*</font>跟进日期',
						             allowBlank : false,
						             blankText : '跟进日期不能为空',
						             anchor : '90%',
						             format:'Y-m-d'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'persMode',
						             fieldLabel : '<font color=red>*</font>跟进方式',
						             allowBlank : false,
						             blankText : '跟进方式不能为空',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'sketch',
						             fieldLabel : '简述',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'dtlDesc',
						             fieldLabel : '详细描述',
						             maxLength : 200,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'rsltCls',
										 fieldLabel : '<font color=red>*</font>结果分类',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'milepost',
						             fieldLabel : '<font color=red>*</font>里程碑',
						             allowBlank : false,
						             blankText : '里程碑不能为空',
						             maxLength : 100,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'isNtCustInitvCont',
										 fieldLabel : '<font color=red>*</font>是否客户主动联系',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore1,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
						           },{ 
						             columnWidth : 1.06,
						             layout : 'form',
						             items : [ {
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'signInfo',
						             fieldLabel : '标注信息',
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
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
					    	detailXywzPurcProvrMgmtCstFollowWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzPurcProvrMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :370,
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
				items : [ addXywzPurcProvrMgmtCstFollowForm ]
			});

			// 定义修改窗口
			var editXywzPurcProvrMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 370,
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
				items : [ editXywzPurcProvrMgmtCstFollowForm ]
			});
			
			// 定义详情窗口
			var detailXywzPurcProvrMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进预览',
				plain : true,
				layout : 'fit',
				width : 800,
				height :370,
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
				items : [ detailXywzPurcProvrMgmtCstFollowForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '供应商客户跟进列表',
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