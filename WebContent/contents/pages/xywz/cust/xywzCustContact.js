Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//客户级别数据集
			var boxstore2 = new Ext.data.Store({  
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
			var boxstore3 = new Ext.data.Store({  
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
			var boxstore4 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_IMPORTANT_LEV'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "客户联系人查询",
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
							name : 'persFstNm',
							labelWidth : 150,
							fieldLabel : '联系人名称',
							anchor : '90%'
						},new Ext.form.ComboBox({
							hiddenName : 'gender',
							fieldLabel : '性别',
							labelStyle: 'text-align:right;',
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
						})  ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [{
							xtype : 'numberfield',
							name : 'custId',
							hidden:true
						},new Com.xywz.common.CustomerInfoQuery(
							{
								fieldLabel : '客户姓名',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								//name : 'custShtNm',
								id : 'CUST_SHT_NM22',
								singleSelected : false,
								// 单选复选标志
//								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
									qForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
									
								}
							}),new Ext.form.ComboBox({
								hiddenName : 'imptDegr',
								fieldLabel : '重要程度',
								labelStyle: 'text-align:right;',
								triggerAction : 'all',
								store : boxstore4,
								displayField : 'value',
								valueField : 'key',
								mode : 'local',
								forceSelection : true,
								typeAhead : true,
								emptyText:'请选择',
								resizable : true,
								anchor : '90%'
							})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Ext.form.ComboBox({
							hiddenName : 'isNtPriContcr',
							fieldLabel : '是否主联系人',
							labelStyle: 'text-align:right;',
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
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							name : 'bizMem',
							hidden:true
						},new Com.xywz.common.UserManagerIdQuery(
							{
								fieldLabel : '业务员',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								//name : 'custShtNm',
								id : 'USER_NAME11',
								singleSelected : false,
								// 单选复选标志
//								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('USER_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('USER_NAME11').setValue(records[0].data.USER_NAME);
									qForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'postn',
							fieldLabel : '职位',
							anchor : '90%'
						}]
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
				name : 'custContcrId',
				mapping : 'CUST_CONTCR_ID'
			}, {
				name : 'custId',
				mapping : 'CUST_ID'
			}, {
				name : 'custShtNm',
				mapping : 'CUST_SHT_NM'
			}, {
				name : 'persFstNm',
				mapping : 'PERS_FST_NM'
			}, {
				name : 'salu',
				mapping : 'SALU'
			},{
				name : 'gender',
				mapping : 'GENDER'
			},{
				name : 'genderOra',
				mapping : 'GENDER_ORA'
			},{
				name : 'interest',
				mapping : 'INTEREST'
			},{
				name : 'imptDegr',
				mapping : 'IMPT_DEGR'
			},{
				name : 'imptDegrOra',
				mapping : 'IMPT_DEGR_ORA'
			},{
				name : 'postn',
				mapping : 'POSTN'
			},{
				name : 'isNtPriContcr',
				mapping : 'IS_NT_PRI_CONTCR'
			},{
				name : 'isNtPriContcrOra',
				mapping : 'IS_NT_PRI_CONTCR_ORA'
			},{
				name : 'dept',
				mapping : 'DEPT'
			},{
				name : 'cty',
				mapping : 'CTY'
			},{
				name : 'tel1',
				mapping : 'TEL1'
			},{
				name : 'tel2',
				mapping : 'TEL2'
			},{
				name : 'mobl',
				mapping : 'MOBL'
			},{
				name : 'fax',
				mapping : 'FAX'
			},{
				name : 'skype',
				mapping : 'SKYPE'
			},{
				name : 'qq',
				mapping : 'QQ'
			},{
				name : 'wechat',
				mapping : 'WECHAT'
			},{
				name : 'custPht',
				mapping : 'CUST_PHT'
			},{
				name : 'addr',
				mapping : 'ADDR'
			},{
				name : 'zipCd',
				mapping : 'ZIP_CD'
			},{
				name : 'setupTm',
				mapping : 'SETUP_TM'
			},{
				name : 'memo',
				mapping : 'MEMO'
			},{
				name : 'bizMem',
				mapping : 'BIZ_MEM'
			},{
				name : 'userName',
				mapping : 'USER_NAME'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '客户联系人ID',
				width : 100,
				dataIndex : 'custContcrId',
				hidden : true,
				sortable : true
			}, {
				header : '客户ID',
				width : 170,				
				dataIndex : 'custId',
				hidden : true,
				sortable : true
			}, {
				header : '客户名称',
				width : 170,
				dataIndex : 'custShtNm',
				sortable : true
			}, {
				header : '联系人名称',
				width : 170,
				dataIndex : 'persFstNm',
				sortable : true
			}, {
				header : '称谓',
				width : 170,
				dataIndex : 'salu',
				sortable : true
			}, {
				header : '性别',
				width : 170,
				dataIndex : 'genderOra',
				sortable : true
			}, {
				header : '性格爱好',
				width : 170,
				dataIndex : 'interest',
				sortable : true
			}, {
				header : '重要程度',
				width : 170,
				hidden:false,
				dataIndex : 'imptDegrOra',
				sortable : true
			}, {
				header : '职位',
				width : 170,
				hidden:false,
				dataIndex : 'postn',
				sortable : true
			}, {
				header : '是否主联系人',
				width : 170,
				hidden:false,
				dataIndex : 'isNtPriContcrOra',
				sortable : true
			}, {
				header : '部门',
				width : 170,
				hidden:false,
				dataIndex : 'dept',
				sortable : true
			}, {
				header : '市区',
				width : 170,
				hidden:false,
				dataIndex : 'cty',
				sortable : true
			}, {
				header : '电话1',
				width : 170,
				hidden:false,
				dataIndex : 'tel1',
				sortable : true
			}, {
				header : '电话2',
				width : 170,
				hidden:false,
				dataIndex : 'tel2',
				sortable : true
			}, {
				header : '手机',
				width : 170,
				hidden:false,
				dataIndex : 'mobl',
				sortable : true
			}, {
				header : '传真',
				width : 170,
				hidden:false,
				dataIndex : 'fax',
				sortable : true
			}, {
				header : 'SKYPE',
				width : 170,
				hidden:false,
				dataIndex : 'skype',
				sortable : true
			}, {
				header : 'QQ',
				width : 170,
				hidden:false,
				dataIndex : 'qq',
				sortable : true
			}, {
				header : 'WECHAT',
				width : 170,
				hidden:false,
				dataIndex : 'wechat',
				sortable : true
			}, {
				header : '客户照片',
				width : 170,
				hidden:false,
				dataIndex : 'custPht',
				sortable : true
			}, {
				header : '地址',
				width : 170,
				hidden:false,
				dataIndex : 'addr',
				sortable : true
			}, {
				header : '邮编',
				width : 170,
				hidden:false,
				dataIndex : 'zipCd',
				sortable : true
			}, {
				header : '建立时间',
				width : 170,
				hidden:false,
				dataIndex : 'setupTm',
				sortable : true
			}, {
				header : '备注',
				width : 170,
				hidden:false,
				dataIndex : 'memo',
				sortable : true
			}, {
				header : '业务员',
				width : 170,
				hidden:false,
				dataIndex : 'userName',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustCustContactQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'CUST_CONTCR_ID',
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
											addXywzCustCustContactForm.getForm().reset();											
											addXywzCustCustContactWindow.show();
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
												editXywzCustCustContactForm.getForm().loadRecord(selectRe);
												editXywzCustCustContactWindow.show();

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
												tempId = selectRe.data.custContcrId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzCustCustContactAction!batchDestroy.json?idStr='+ idStr,
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
												detailXywzCustCustContactForm.getForm().loadRecord(selectRe);
												detailXywzCustCustContactWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzCustCustContactQueryAction.json'
							        })]
					});
			
			var detailXywzCustCustContactForm = new Ext.form.FormPanel({
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
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custShtNm',
									fieldLabel : '客户姓名',
									maxLength:200,
									minLength:1,
									anchor : '90%',
									readOnly:true
									}]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'persFstNm',
									fieldLabel : '联系人名称',
									maxLength:200,
									minLength:1,
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
									name : 'salu',
									fieldLabel : '称谓',
									allowBlank : true,
									maxLength:500,
									minLength:1,
									anchor : '90%',
									readOnly:true
								},{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'genderOra',
									fieldLabel : '性别',
									allowBlank : true,
									maxLength:500,
									minLength:1,
									anchor : '90%',
									readOnly:true
								}]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'interest',
									fieldLabel : '性格爱好',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%',
									readOnly:true
								},{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'imptDegrOra',
									fieldLabel : '重要程度',
									allowBlank : true,
									maxLength:20,
									minLength:1,
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
									name : 'postn',
									hidden:false,
									fieldLabel : '职位',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								},{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'isNtPriContcrOra',
									hidden:false,
									fieldLabel : '是否主联系人',
									maxLength:100,
									minLength:1,
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
									name : 'dept',
									hidden:false,
									fieldLabel : '部门',
									maxLength:100,
									minLength:1,
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
									name : 'cty',
									hidden:false,
									fieldLabel : '市区',
									allowBlank : true,
									maxLength:100,
									minLength:1,
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
									name : 'tel1',
									hidden:false,
									fieldLabel : '电话1',
									maxLength:100,
									minLength:1,
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
									name : 'tel2',
									hidden:false,
									fieldLabel : '电话2',
									maxLength:100,
									minLength:1,
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
									name : 'mobl',
									hidden:false,
									fieldLabel : '手机',
									maxLength:100,
									minLength:1,
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
									name : 'fax',
									hidden:false,
									fieldLabel : '传真',
									allowBlank : true,
									maxLength:100,
									minLength:1,
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
									name : 'SKYPE',
									hidden:false,
									fieldLabel : 'SKYPE',
									allowBlank : true,
									maxLength:100,
									minLength:1,
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
									name : 'qq',
									hidden:false,
									fieldLabel : 'QQ',
									maxLength:100,
									minLength:1,
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
									name : 'wechat',
									hidden:false,
									fieldLabel : 'WECHAT',
									maxLength:100,
									minLength:1,
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
									name : 'custPht',
									hidden:false,
									fieldLabel : '客户照片',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '地址',
									maxLength:100,
									minLength:1,
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
									name : 'zipCd',
									hidden:false,
									fieldLabel : '邮编',
									maxLength:100,
									minLength:1,
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
									name : 'setupTm',
									hidden:false,
									fieldLabel : '建立时间',
									maxLength:100,
									minLength:1,
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
									name : 'memo',
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
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
									name : 'userName',
									hidden:false,
									fieldLabel : '业务员',
									maxLength:100,
									minLength:1,
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
							detailXywzCustCustContactWindow.hide();
						}
					} ]
				} ]
			});


			// 新增窗口展示的from
			var addXywzCustCustContactForm = new Ext.form.FormPanel({
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
								items : [{
										xtype : 'numberfield',
										name : 'custId',
										hidden:true
									},new Com.xywz.common.CustomerInfoQuery(
										{
											fieldLabel : '客户姓名',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'custShtNm',
											id : 'CUST_SHT_NM11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('CUST_SHT_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('CUST_SHT_NM11').setValue(records[0].data.CUST_SHT_NM);
												addXywzCustCustContactForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
												
											}
										})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'persFstNm',
									fieldLabel : '<font color=red>*</font>联系人名称',
									allowBlank : false,
									blankText : '联系人名称不能为空',
									maxLength:200,
									minLength:1,
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
									allowBlank : true,
									maxLength:500,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'gender',
									fieldLabel : '性别',
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
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'interest',
									fieldLabel : '性格爱好',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'imptDegr',
									fieldLabel : '重要程度',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore4,
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
									name : 'postn',
									hidden:false,
									fieldLabel : '职位',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'isNtPriContcr',
									fieldLabel : '是否主联系人',
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
								})	 ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'dept',
									hidden:false,
									fieldLabel : '部门',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'cty',
									hidden:false,
									fieldLabel : '市区',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'tel1',
									hidden:false,
									fieldLabel : '电话1',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '电话2',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '手机',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '传真',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'SKYPE',
									hidden:false,
									fieldLabel : 'SKYPE',
									allowBlank : true,
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : 'QQ',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'wechat',
									hidden:false,
									fieldLabel : 'WECHAT',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custPht',
									hidden:false,
									fieldLabel : '客户照片',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '地址',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '邮编',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'setupTm',
									hidden:false,
									fieldLabel : '建立时间',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							}
//							,{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									name : 'bizMem',
//									hidden:true
//								},new Com.xywz.common.UserManagerIdQuery(
//									{
//										fieldLabel : '业务员',
//										labelStyle : 'text-align:left;',
//										//labelWidth : 100,
//										name : 'userName',
//										id : 'USER_NAME22',
//										singleSelected : false,
//										// 单选复选标志
//										editable : false,
//										allowBlank : false,
//										// 不允许为空
//										blankText : "不能为空，请填写",
//										anchor : '90%',
//										callback : function(a, b) {
//											var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
//											Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
//											addXywzCustCustContactForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
//										}
//									}) ]
//							}
							]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzCustCustContactForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustContactAction.json',
								method : 'POST',
								form : addXywzCustCustContactForm.getForm().id,
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
							
							addXywzCustCustContactWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzCustCustContactWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzCustCustContactForm = new Ext.form.FormPanel({
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
									name : 'custContcrId',
									hidden:true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									name : 'custId',
									hidden:true
								},new Com.xywz.common.CustomerInfoQuery(
									{
										fieldLabel : '客户姓名',
										//labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'custShtNm',
										id : 'CUST_SHT_NM33',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('CUST_SHT_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('CUST_SHT_NM33').setValue(records[0].data.CUST_SHT_NM);
											editXywzCustCustContactForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
											
										}
									}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'persFstNm',
									fieldLabel : '<font color=red>*</font>联系人名称',
									allowBlank : false,
									blankText : '联系人名称不能为空',
									maxLength:200,
									minLength:1,
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
									allowBlank : true,
									maxLength:500,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'gender',
									fieldLabel : '性别',
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
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'interest',
									fieldLabel : '性格爱好',
									allowBlank : true,
									maxLength:20,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'imptDegr',
									fieldLabel : '重要程度',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore4,
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
									name : 'postn',
									hidden:false,
									fieldLabel : '职位',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								},new Ext.form.ComboBox({
									hiddenName : 'isNtPriContcr',
									fieldLabel : '是否主联系人',
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
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'dept',
									hidden:false,
									fieldLabel : '部门',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'cty',
									hidden:false,
									fieldLabel : '市区',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'tel1',
									hidden:false,
									fieldLabel : '电话1',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '电话2',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '手机',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '传真',
									allowBlank : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'SKYPE',
									hidden:false,
									fieldLabel : 'SKYPE',
									allowBlank : true,
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : 'QQ',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'wechat',
									hidden:false,
									fieldLabel : 'WECHAT',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'datefield',
									vtype : 'trim',
									Width : '100',
									name : 'custPht',
									hidden:false,
									fieldLabel : '客户照片',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '地址',
									maxLength:100,
									minLength:1,
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
									hidden:false,
									fieldLabel : '邮编',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'setupTm',
									hidden:false,
									fieldLabel : '建立时间',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									hidden:false,
									fieldLabel : '备注',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							}
//							,{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									name : 'bizMem',
//									hidden:true
//								},new Com.xywz.common.UserManagerIdQuery(
//									{
//										fieldLabel : '业务员',
//										labelStyle : 'text-align:left;',
//										//labelWidth : 100,
//										name : 'userName',
//										id : 'USER_NAME33',
//										singleSelected : false,
//										// 单选复选标志
//										editable : false,
//										allowBlank : false,
//										// 不允许为空
//										blankText : "不能为空，请填写",
//										anchor : '90%',
//										callback : function(a, b) {
//											var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
//											Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
//											editXywzCustCustContactForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
//										}
//									})
//								]
//							} 
							]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzCustCustContactForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustContactAction.json',
								method : 'POST',
								form : editXywzCustCustContactForm.getForm().id,
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
							
							editXywzCustCustContactWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzCustCustContactWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzCustCustContactWindow = new Ext.Window({
				title : '客户联系人信息详情',
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
				items : [ detailXywzCustCustContactForm ]
			});
			// 定义新增窗口
			var addXywzCustCustContactWindow = new Ext.Window({
				title : '客户信息新增',
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
				items : [ addXywzCustCustContactForm ]
			});

			// 定义修改窗口
			var editXywzCustCustContactWindow = new Ext.Window({
				title : '客户信息修改',
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
				items : [ editXywzCustCustContactForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '客户信息列表',
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
		
		