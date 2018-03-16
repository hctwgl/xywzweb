Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“性别”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_GENDER_FLAG'
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
				title : "供应商联系人信息查询",
				labelWidth : 150, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .33,
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
//								editable : false,
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
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'name',
							fieldLabel : '名字',
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
				   name : 'id',
				   mapping : 'ID'
				  }, { 
				   name : 'provrNum',
				   mapping : 'PROVR_NUM'
				  }, { 
				   name : 'name',
				   mapping : 'NAME'
				  }, { 
				   name : 'salu',
				   mapping : 'SALU'
				  }, { 
				   name : 'gender',
				   mapping : 'GENDER'
				  }, { 
					   name : 'genderOra',
					   mapping : 'GENDER_ORA'
				  }, { 
				   name : 'postn',
				   mapping : 'POSTN'
				  }, { 
				   name : 'isNtPriCont',
				   mapping : 'IS_NT_PRI_CONT'
				  }, { 
					   name : 'isNtPriContOra',
					   mapping : 'IS_NT_PRI_CONT_ORA'
				  }, { 
				   name : 'belgDept',
				   mapping : 'BELG_DEPT'
				  }, { 
				   name : 'tel',
				   mapping : 'TEL'
				  }, { 
				   name : 'tel2',
				   mapping : 'TEL2'
				  }, { 
				   name : 'mobl',
				   mapping : 'MOBL'
				  }, { 
				   name : 'fax',
				   mapping : 'FAX'
				  }, { 
				   name : 'msn',
				   mapping : 'MSN'
				  }, { 
				   name : 'skype',
				   mapping : 'SKYPE'
				  }, { 
				   name : 'qq',
				   mapping : 'QQ'
				  }, { 
				   name : 'othInstMsg',
				   mapping : 'OTH_INST_MSG'
				  }, { 
				   name : 'addr',
				   mapping : 'ADDR'
				  }, { 
				   name : 'zipCd',
				   mapping : 'ZIP_CD'
				  }, { 
				   name : 'setupDt',
				   mapping : 'SETUP_DT'
				  }, { 
				   name : 'memo',
				   mapping : 'MEMO'
				  }, { 
				   name : 'ownPersNm',
				   mapping : 'OWN_PERS_NM'
				  }, { 
				   name : 'mailAddr',
				   mapping : 'MAIL_ADDR'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				 header : 'ID',
				 width : 210,
				 hidden : true,
				 dataIndex : 'id',
				 sortable : true
				}, { 
				 header : '供应商编号',
				 width : 150,
				 dataIndex : 'provrNum',
				 sortable : true
				}, { 
				 header : '名字',
				 width : 150,
				 dataIndex : 'name',
				 sortable : true
				}, { 
				 header : '称谓',
				 width : 150,
				 dataIndex : 'salu',
				 sortable : true
				}, { 
				 header : '性别',
				 width : 100,
				 dataIndex : 'genderOra',
				 sortable : true
				}, { 
				 header : '职位',
				 width : 150,
				 dataIndex : 'postn',
				 sortable : true
				}, { 
				 header : '是否主联系',
				 width : 100,
				 dataIndex : 'isNtPriContOra',
				 sortable : true
				}, { 
				 header : '所属部门',
				 width : 150,
				 dataIndex : 'belgDept',
				 sortable : true
				}, { 
				 header : '电话',
				 width : 100,
				 dataIndex : 'tel',
				 sortable : true
				}, { 
				 header : '电话2',
				 width : 100,
				 dataIndex : 'tel2',
				 sortable : true
				}, { 
				 header : '手机',
				 width : 100,
				 dataIndex : 'mobl',
				 sortable : true
				}, { 
				 header : '传真',
				 width : 100,
				 dataIndex : 'fax',
				 sortable : true
				}, { 
				 header : 'MSN',
				 width : 150,
				 dataIndex : 'msn',
				 sortable : true
				}, { 
				 header : 'Skype',
				 width : 150,
				 dataIndex : 'skype',
				 sortable : true
				}, { 
				 header : 'QQ',
				 width : 150,
				 dataIndex : 'qq',
				 sortable : true
				}, { 
				 header : '其他即时通讯',
				 width : 150,
				 dataIndex : 'othInstMsg',
				 sortable : true
				}, { 
				 header : '地址',
				 width : 200,
				 dataIndex : 'addr',
				 sortable : true
				}, { 
				 header : '邮编',
				 width : 100,
				 dataIndex : 'zipCd',
				 sortable : true
				}, { 
				 header : '建立日期',
				 width : 100,
				 dataIndex : 'setupDt',
				 sortable : true
				}, { 
				 header : '备注',
				 width : 200,
				 dataIndex : 'memo',
				 sortable : true
				}, { 
				 header : '拥有人名称',
				 width : 150,
				 dataIndex : 'ownPersNm',
				 sortable : true
				}, { 
				 header : '联系人邮件地址',
				 width : 150,
				 dataIndex : 'mailAddr',
				 sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtContactQueryAction.json'
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
											addXywzPurcProvrMgmtContactForm.getForm().reset();
											addXywzPurcProvrMgmtContactForm.getForm().findField('setupDt').setValue(new Date());
											addXywzPurcProvrMgmtContactWindow.show();
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
												editXywzPurcProvrMgmtContactForm.getForm().loadRecord(selectRe);
												editXywzPurcProvrMgmtContactWindow.show();

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
														url : basepath+ '/XywzPurcProvrMgmtContactAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzPurcProvrMgmtContactQueryAction.json'
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
												detailXywzPurcProvrMgmtContactForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcProvrMgmtContactWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzPurcProvrMgmtContactForm = new Ext.form.FormPanel({
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
							 items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
								{
									fieldLabel : '<font color=red>*</font>供应商编号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'provrNum',
									id : 'PROVR_NUM22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PROVR_NUM22').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PROVR_NUM22').setValue(records[0].data.PROVR_NUM);									
									}
								}) ]
							},{ 
							 columnWidth : .5,
							 layout : 'form',
							 items : [ {
							  xtype : 'textfield',
							  vtype : 'trim',
							  Width : '100',
							  name : 'name',
							  fieldLabel : '<font color=red>*</font>名字',
							  allowBlank : false,
							  blankText : '名字不能为空',
							  maxLength : 50,
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
							  name : 'salu',
							  fieldLabel : '称谓',
							  maxLength : 50,
							  minLength : 1,
							  anchor : '90%'
							 } ]
							},{ 
							 columnWidth : .5,
							 layout : 'form',
							 items : [ new Ext.form.ComboBox({
			            	     hiddenName : 'gender',
								 fieldLabel : '<font color=red>*</font>性别',
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
							  name : 'postn',
							  fieldLabel : '职位',
							  maxLength : 50,
							  minLength : 1,
							  anchor : '90%'
							 } ]
							},{ 
							 columnWidth : .5,
							 layout : 'form',
							 items : [ new Ext.form.ComboBox({
			            	     hiddenName : 'isNtPriCont',
								 fieldLabel : '<font color=red>*</font>是否主联系',
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
							 columnWidth : .5,
							 layout : 'form',
							 items : [ {
							  xtype : 'textfield',
							  vtype : 'trim',
							  Width : '100',
							  name : 'belgDept',
							  fieldLabel : '所属部门',
							  maxLength : 50,
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
							  name : 'tel',
							  fieldLabel : '电话',
							  maxLength : 50,
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
							  name : 'tel2',
							  fieldLabel : '电话2',
							  maxLength : 50,
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
							  name : 'mobl',
							  fieldLabel : '<font color=red>*</font>手机',
							  allowBlank : false,
							  blankText : '手机不能为空',
							  maxLength : 50,
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
							  name : 'fax',
							  fieldLabel : '传真',
							  maxLength : 50,
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
							  name : 'msn',
							  fieldLabel : 'MSN',
							  maxLength : 50,
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
							  name : 'skype',
							  fieldLabel : 'Skype',
							  maxLength : 50,
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
							  name : 'qq',
							  fieldLabel : 'QQ',
							  maxLength : 50,
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
							  name : 'othInstMsg',
							  fieldLabel : '其他即时通讯',
							  maxLength : 50,
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
							  name : 'zipCd',
							  fieldLabel : '邮编',
							  maxLength : 50,
							  minLength : 1,
							  anchor : '90%'
							 } ]
							},{ 
							 columnWidth : .5,
							 layout : 'form',
							 items : [ {
							  xtype : 'datefield',
							  vtype : 'trim',
							  Width : '100',
							  name : 'setupDt',
							  fieldLabel : '<font color=red>*</font>建立日期',
							  allowBlank : false,
							  blankText : '建立日期不能为空',
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
							  name : 'ownPersNm',
							  fieldLabel : '拥有人名称',
							  maxLength : 50,
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
							  name : 'mailAddr',
							  fieldLabel : '<font color=red>*</font>联系人邮件地址',
							  allowBlank : false,
							  blankText : '联系人邮件地址不能为空',
							  maxLength : 50,
							  minLength : 1,
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
								  fieldLabel : '备注',
								  maxLength : 500,
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
							  fieldLabel : 'ID',
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
							if(!addXywzPurcProvrMgmtContactForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtContactAction.json',
								method : 'POST',
								form : addXywzPurcProvrMgmtContactForm.getForm().id,
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
							
							addXywzPurcProvrMgmtContactWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcProvrMgmtContactWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcProvrMgmtContactForm = new Ext.form.FormPanel({
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
									  maxLength : 30,
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
									  name : 'name',
									  fieldLabel : '<font color=red>*</font>名字',
									  allowBlank : false,
									  blankText : '名字不能为空',
									  maxLength : 50,
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
									  name : 'salu',
									  fieldLabel : '称谓',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'gender',
										 fieldLabel : '<font color=red>*</font>性别',
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
									  name : 'postn',
									  fieldLabel : '职位',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'isNtPriCont',
										 fieldLabel : '<font color=red>*</font>是否主联系',
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
									 columnWidth : .5,
									 layout : 'form',
									 items : [ {
									  xtype : 'textfield',
									  vtype : 'trim',
									  Width : '100',
									  name : 'belgDept',
									  fieldLabel : '所属部门',
									  maxLength : 50,
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
									  name : 'tel',
									  fieldLabel : '电话',
									  maxLength : 50,
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
									  name : 'tel2',
									  fieldLabel : '电话2',
									  maxLength : 50,
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
									  name : 'mobl',
									  fieldLabel : '<font color=red>*</font>手机',
									  allowBlank : false,
									  blankText : '手机不能为空',
									  maxLength : 50,
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
									  name : 'fax',
									  fieldLabel : '传真',
									  maxLength : 50,
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
									  name : 'msn',
									  fieldLabel : 'MSN',
									  maxLength : 50,
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
									  name : 'skype',
									  fieldLabel : 'Skype',
									  maxLength : 50,
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
									  name : 'qq',
									  fieldLabel : 'QQ',
									  maxLength : 50,
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
									  name : 'othInstMsg',
									  fieldLabel : '其他即时通讯',
									  maxLength : 50,
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
									  name : 'zipCd',
									  fieldLabel : '邮编',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ {
									  xtype : 'datefield',
									  vtype : 'trim',
									  Width : '100',
									  name : 'setupDt',
									  fieldLabel : '<font color=red>*</font>建立日期',
									  allowBlank : false,
									  blankText : '建立日期不能为空',
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
									  name : 'ownPersNm',
									  fieldLabel : '拥有人名称',
									  maxLength : 50,
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
									  name : 'mailAddr',
									  fieldLabel : '<font color=red>*</font>联系人邮件地址',
									  allowBlank : false,
									  blankText : '联系人邮件地址不能为空',
									  maxLength : 50,
									  minLength : 1,
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
										  fieldLabel : '备注',
										  maxLength : 500,
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
									  fieldLabel : 'ID',
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
							if(!editXywzPurcProvrMgmtContactForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtContactAction.json',
								method : 'POST',
								form : editXywzPurcProvrMgmtContactForm.getForm().id,
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
							
							editXywzPurcProvrMgmtContactWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcProvrMgmtContactWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcProvrMgmtContactForm = new Ext.form.FormPanel({
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
									  maxLength : 30,
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
									  name : 'name',
									  fieldLabel : '<font color=red>*</font>名字',
									  allowBlank : false,
									  blankText : '名字不能为空',
									  maxLength : 50,
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
									  name : 'salu',
									  fieldLabel : '称谓',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'gender',
										 fieldLabel : '<font color=red>*</font>性别',
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
									  name : 'postn',
									  fieldLabel : '职位',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'isNtPriCont',
										 fieldLabel : '<font color=red>*</font>是否主联系',
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
									 columnWidth : .5,
									 layout : 'form',
									 items : [ {
									  xtype : 'textfield',
									  vtype : 'trim',
									  Width : '100',
									  name : 'belgDept',
									  fieldLabel : '所属部门',
									  maxLength : 50,
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
									  name : 'tel',
									  fieldLabel : '电话',
									  maxLength : 50,
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
									  name : 'tel2',
									  fieldLabel : '电话2',
									  maxLength : 50,
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
									  name : 'mobl',
									  fieldLabel : '<font color=red>*</font>手机',
									  allowBlank : false,
									  blankText : '手机不能为空',
									  maxLength : 50,
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
									  name : 'fax',
									  fieldLabel : '传真',
									  maxLength : 50,
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
									  name : 'msn',
									  fieldLabel : 'MSN',
									  maxLength : 50,
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
									  name : 'skype',
									  fieldLabel : 'Skype',
									  maxLength : 50,
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
									  name : 'qq',
									  fieldLabel : 'QQ',
									  maxLength : 50,
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
									  name : 'othInstMsg',
									  fieldLabel : '其他即时通讯',
									  maxLength : 50,
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
									  name : 'zipCd',
									  fieldLabel : '邮编',
									  maxLength : 50,
									  minLength : 1,
									  anchor : '90%'
									 } ]
									},{ 
									 columnWidth : .5,
									 layout : 'form',
									 items : [ {
									  xtype : 'datefield',
									  vtype : 'trim',
									  Width : '100',
									  name : 'setupDt',
									  fieldLabel : '<font color=red>*</font>建立日期',
									  allowBlank : false,
									  blankText : '建立日期不能为空',
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
									  name : 'ownPersNm',
									  fieldLabel : '拥有人名称',
									  maxLength : 50,
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
									  name : 'mailAddr',
									  fieldLabel : '<font color=red>*</font>联系人邮件地址',
									  allowBlank : false,
									  blankText : '联系人邮件地址不能为空',
									  maxLength : 50,
									  minLength : 1,
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
										  fieldLabel : '备注',
										  maxLength : 500,
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
									  fieldLabel : 'ID',
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
					    	detailXywzPurcProvrMgmtContactWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzPurcProvrMgmtContactWindow = new Ext.Window({
				title : '供应商联系人信息新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :470,
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
				items : [ addXywzPurcProvrMgmtContactForm ]
			});

			// 定义修改窗口
			var editXywzPurcProvrMgmtContactWindow = new Ext.Window({
				title : '供应商联系人信息修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 470,
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
				items : [ editXywzPurcProvrMgmtContactForm ]
			});
			
			
			// 定义详情窗口
			var detailXywzPurcProvrMgmtContactWindow = new Ext.Window({
				title : '供应商联系人信息预览',
				plain : true,
				layout : 'fit',
				width : 800,
				height :470,
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
				items : [ detailXywzPurcProvrMgmtContactForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '供应商联系人信息列表',
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