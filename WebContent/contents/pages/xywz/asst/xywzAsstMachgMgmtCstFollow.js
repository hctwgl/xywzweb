Ext.onReady(function() {
			Ext.QuickTips.init();
			//“结果分类”选择数据集
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
				title : "外协加工工厂客户跟进查询",
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
						columnWidth : .25,
						layout : 'form',
						items : 
							[ new Com.xywz.common.AsstMachgContcrMgmtQuery(
									{
										fieldLabel : '外协加工工厂联系人',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'asstMachgContcr',
										id : 'ASST_MACHG_CONTCR11',
										singleSelected : false,
										// 单选复选标志
//										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('ASST_MACHG_CONTCR11').oAsstMachgContcrMgmtQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('ASST_MACHG_CONTCR11').setValue(records[0].data.FST_NM);									
										}
									}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'followDtFrom',
							fieldLabel : '跟进日期   从',
							anchor : '90%',
							editable:false,
						    format:'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'followDtTo',
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
				name : 'asstMachgId',
				mapping : 'ASST_MACHG_ID'
			},{
				name : 'asstMachgContcrId',
				mapping : 'ASST_MACHG_CONTCR_ID'
			},{
				name : 'asstMachgContcr',
				mapping : 'ASST_MACHG_CONTCR'
			},{
				name : 'followPersMemId',
				mapping : 'FOLLOW_PERS_MEM_ID'
			},{
				name : 'followPersMem',
				mapping : 'FOLLOW_PERS_MEM'
			},{
				name : 'followDt',
				mapping : 'FOLLOW_DT'
			},{
				name : 'followMode',
				mapping : 'FOLLOW_MODE'
			},{
				name : 'sketch',
				mapping : 'SKETCH'
			},{
				name : 'dtlDesc',
				mapping : 'DTL_DESC'
			},{
				name : 'rsltCls',
				mapping : 'RSLT_CLS'
			},{
			   name : 'rsltClsOra',
			   mapping : 'RSLT_CLS_ORA'
			  }, { 
				name : 'milestone',
				mapping : 'MILESTONE'
			},{
				name : 'isNtCustInitvCont',
				mapping : 'IS_NT_CUST_INITV_CONT'
			},{
				   name : 'isNtCustInitvContOra',
				   mapping : 'IS_NT_CUST_INITV_CONT_ORA'
				  }, { 
				name : 'labelInfo',
				mapping : 'LABEL_INFO'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '外协加工工厂编号',
				width : 210,
				dataIndex : 'asstMachgId',
				sortable : true
			}, {
				header : '外协加工厂联系人ID',
				width : 170,
				dataIndex : 'asstMachgContcrId',
				sortable : true,
				hidden : true
			}, {
				header : '外协加工厂联系人',
				width : 170,
				dataIndex : 'asstMachgContcr',
				sortable : true
			}, {
				header : '跟进人员编号',
				width : 170,
				dataIndex : 'followPersMemId',
				sortable : true
			}, {
				header : '跟进人员',
				width : 170,
				dataIndex : 'followPersMem',
				sortable : true
			}, {
				header : '跟进日期',
				width : 170,
				dataIndex : 'followDt',
				sortable : true
			}, {
				header : '跟进方式',
				width : 170,
				dataIndex : 'followMode',
				sortable : true
			}, {
				header : '简述',
				width : 170,
				dataIndex : 'sketch',
				sortable : true
			}, {
				header : '详细描述',
				width : 170,
				dataIndex : 'dtlDesc',
				sortable : true
			}, {
				header : '结果分类',
				width : 170,
				dataIndex : 'rsltClsOra',
				sortable : true
			}, {
				header : '里程碑',
				width : 170,
				dataIndex : 'milestone',
				sortable : true
			}, {
				header : '是否客户主动联系',
				width : 170,
				dataIndex : 'isNtCustInitvContOra',
				sortable : true
			}, {
				header : '标注信息',
				width : 170,
				dataIndex : 'labelInfo',
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
					url : basepath + '/XywzAsstMachgMgmtCstFollowQueryAction.json'
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
											addXywzAsstMachgMgmtCstFollowForm.getForm().reset();
											addXywzAsstMachgMgmtCstFollowWindow.show();
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
												editXywzAsstMachgMgmtCstFollowForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgMgmtCstFollowWindow.show();

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
														url : basepath+ '/XywzAsstMachgMgmtCstFollowAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAsstMachgMgmtCstFollowQueryAction.json'
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
												detailXywzAsstMachgMgmtCstFollowForm
														.getForm().loadRecord(
																selectRe);
												detailXywzAsstMachgMgmtCstFollowWindow.show();
											}
										}
									} ]
					});

			// 新增窗口展示的from
			var addXywzAsstMachgMgmtCstFollowForm = new Ext.form.FormPanel({
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
					items : [ new Com.xywz.common.AsstMachgContcrMgmtQuery(
							{
								fieldLabel : '<font color=red>*</font>外协加工厂联系人',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'asstMachgContcr',
								id : 'ASST_MACHG_CONTCR22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('ASST_MACHG_CONTCR22').oAsstMachgContcrMgmtQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('ASST_MACHG_CONTCR22').setValue(records[0].data.FST_NM);
									addXywzAsstMachgMgmtCstFollowForm.getForm().findField('asstMachgContcrId').setValue(records[0].data.CONTCR_ID);
									addXywzAsstMachgMgmtCstFollowForm.getForm().findField('asstMachgId').setValue(records[0].data.ASST_MACHG_ID);
								}
							}) ]
				},{
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
										readOnly : true,
										maxLength:30,
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
									name : 'asstMachgContcrId',
									fieldLabel : '<font color=red>*</font>外协加工厂联系人ID',
									allowBlank : false,
									blankText : '外协加工厂联系人ID不能为空',
									maxLength:100,
									minLength:1,
									readOnly : true,
									hidden : true,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : 
									[ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '<font color=red>*</font>跟进人员',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'followPersMem',
												id : 'FOLLOW_PERS_MEM11',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('FOLLOW_PERS_MEM11').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('FOLLOW_PERS_MEM11').setValue(records[0].data.USER_NAME);
													addXywzAsstMachgMgmtCstFollowForm.getForm().findField('followPersMemId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'followPersMemId',
									fieldLabel : '<font color=red>*</font>跟进人员编号',
									allowBlank : false,
									blankText : '跟进人员编号不能为空',
									maxLength:500,
									minLength:1,
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
									name : 'followDt',
									fieldLabel : '<font color=red>*</font>跟进日期',
									allowBlank : false,
									blankText : '跟进日期不能为空',
									maxLength:500,
									minLength:1,
									editable:false,
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
									name : 'followMode',
									fieldLabel : '<font color=red>*</font>跟进方式',
									allowBlank : false,
									blankText : '跟进方式不能为空',
									maxLength:500,
									minLength:1,
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
									maxLength:500,
									minLength:1,
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
									maxLength:500,
									minLength:1,
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
						             name : 'milestone',
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
						             name : 'labelInfo',
						             fieldLabel : '标注信息',
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
							if(!addXywzAsstMachgMgmtCstFollowForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgMgmtCstFollowAction.json',
								method : 'POST',
								form : addXywzAsstMachgMgmtCstFollowForm.getForm().id,
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
							
							addXywzAsstMachgMgmtCstFollowWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgMgmtCstFollowWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgMgmtCstFollowForm = new Ext.form.FormPanel({
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
										name : 'followPersMemId',
										fieldLabel : '<font color=red>*</font>跟进人员编号',
										allowBlank : false,
										blankText : '跟进人员编号不能为空',
										maxLength:500,
										minLength:1,
										readOnly : true,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										vtype : 'trim',
										Width : '100',
										name : 'asstMachgContcrId',
										fieldLabel : '<font color=red>*</font>外协加工厂联系人ID',
										allowBlank : false,
										blankText : '外协加工厂联系人ID不能为空',
										maxLength:100,
										minLength:1,
										readOnly : true,
										hidden : true,
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
													name : 'followPersMem',
													id : 'FOLLOW_PERS_MEM22',
													singleSelected : false,
													// 单选复选标志
													editable : false,
													allowBlank : false,
													// 不允许为空
													blankText : "不能为空，请填写",
													anchor : '90%',
													callback : function(a, b) {
														var records = Ext.getCmp('FOLLOW_PERS_MEM22').oCustomerQueryGrid.getSelectionModel().selections.items;
														Ext.getCmp('FOLLOW_PERS_MEM22').setValue(records[0].data.USER_NAME);
														editXywzAsstMachgMgmtCstFollowForm.getForm().findField('followPersMemId').setValue(records[0].data.ACCOUNT_NAME);
													}
												}) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'asstMachgContcr',
										fieldLabel : '外协加工厂联系人',
										maxLength:50,
										minLength:1,
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
										name : 'followDt',
										fieldLabel : '<font color=red>*</font>跟进日期',
										allowBlank : false,
										blankText : '跟进日期不能为空',
										editable:false,
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
							             name : 'followMode',
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
								             name : 'milestone',
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
								             name : 'labelInfo',
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
							if(!editXywzAsstMachgMgmtCstFollowForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgMgmtCstFollowAction.json',
								method : 'POST',
								form : editXywzAsstMachgMgmtCstFollowForm.getForm().id,
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
							
							editXywzAsstMachgMgmtCstFollowWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgMgmtCstFollowWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzAsstMachgMgmtCstFollowForm = new Ext.form.FormPanel({
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
										name : 'followPersMemId',
										fieldLabel : '<font color=red>*</font>跟进人员编号',
										allowBlank : false,
										blankText : '跟进人员编号不能为空',
										maxLength:500,
										minLength:1,
										readOnly : true,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										vtype : 'trim',
										Width : '100',
										name : 'asstMachgContcrId',
										fieldLabel : '<font color=red>*</font>外协加工厂联系人ID',
										allowBlank : false,
										blankText : '外协加工厂联系人ID不能为空',
										maxLength:100,
										minLength:1,
										readOnly : true,
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
										name : 'followPersMem',
										fieldLabel : '跟进人员',
										maxLength:50,
										minLength:1,
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
										name : 'asstMachgContcr',
										fieldLabel : '外协加工厂联系人',
										maxLength:50,
										minLength:1,
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
										name : 'followDt',
										fieldLabel : '<font color=red>*</font>跟进日期',
										allowBlank : false,
										blankText : '跟进日期不能为空',
										editable:false,
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
							             name : 'followMode',
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
								             name : 'milestone',
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
								             name : 'labelInfo',
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
					    	detailXywzAsstMachgMgmtCstFollowWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzAsstMachgMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进新增',
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
				items : [ addXywzAsstMachgMgmtCstFollowForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进修改',
				plain : true,
				layout : 'fit',
				width : 800,
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
				items : [ editXywzAsstMachgMgmtCstFollowForm ]
			});
			
			// 定义详情窗口
			var detailXywzAsstMachgMgmtCstFollowWindow = new Ext.Window({
				title : '客户跟进预览',
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
				border : false,
				items : [ detailXywzAsstMachgMgmtCstFollowForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协加工工厂客户跟进列表',
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