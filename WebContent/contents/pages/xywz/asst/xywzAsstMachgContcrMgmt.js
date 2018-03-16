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
				title : "外协加工工厂联系人查询",
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
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'fstNm',
							fieldLabel : '名字',
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
				name : 'contcrId',
				mapping : 'CONTCR_ID'
			}, {
				name : 'asstMachgId',
				mapping : 'ASST_MACHG_ID'
			}, {
				name : 'asstMachgNm',
				mapping : 'ASST_MACHG_NM'
			},{
				name : 'fstNm',
				mapping : 'FST_NM'
			},{
				name : 'salu',
				mapping : 'SALU'
			},{
				name : 'gender',
				mapping : 'GENDER'
			},{
				name : 'genderOra',
				mapping : 'GENDER_ORA'
			},{
				name : 'postn',
				mapping : 'POSTN'
			},{
				name : 'isNtPriCont',
				mapping : 'IS_NT_PRI_CONT'
			},{
			   name : 'isNtPriContOra',
			   mapping : 'IS_NT_PRI_CONT_ORA'
		    },{ 
				name : 'belgDept',
				mapping : 'BELG_DEPT'
			},{
				name : 'tel',
				mapping : 'TEL'
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
				name : 'msn',
				mapping : 'MSN'
			},{
				name : 'skype',
				mapping : 'SKYPE'
			},{
				name : 'qq',
				mapping : 'QQ'
			},{
				name : 'asstMachgPriPicture',
				mapping : 'ASST_MACHG_PRI_PICTURE'
			},{
				name : 'othInstMsg',
				mapping : 'OTH_INST_MSG'
			},{
				name : 'addr',
				mapping : 'ADDR'
			},{
				name : 'zipCd',
				mapping : 'ZIP_CD'
			},{
				name : 'setupDt',
				mapping : 'SETUP_DT'
			},{
				name : 'memo',
				mapping : 'MEMO'
			},{
				name : 'ownPersNm',
				mapping : 'OWN_PERS_NM'
			},{
				name : 'contcrMailAddr',
				mapping : 'CONTCR_MAIL_ADDR'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '联系人ID',
				width : 210,
				dataIndex : 'contcrId',
				hidden : true,
				sortable : true
			}, {
				header : '外协加工厂编号',
				width : 170,
				dataIndex : 'asstMachgId',
				sortable : true
			}, {
				header : '外协加工厂名称',
				width : 170,
				dataIndex : 'asstMachgNm',
				hidden : true,
				sortable : true
			}, {
				header : '名字',
				width : 170,
				dataIndex : 'fstNm',
				sortable : true
			}, {
				header : '称谓',
				width : 170,
				dataIndex : 'salu',
				sortable : true
			}, {
				header : '性别',
				width : 170,
				hidden:false,
				dataIndex : 'genderOra',
				sortable : true
			}, {
				header : '职位',
				width : 170,
				hidden:false,
				dataIndex : 'postn',
				sortable : true
			}, {
				header : '是否主联系',
				width : 170,
				hidden:false,
				dataIndex : 'isNtPriContOra',
				sortable : true
			}, {
				header : '所属部门',
				width : 170,
				hidden:false,
				dataIndex : 'belgDept',
				sortable : true
			}, {
				header : '电话',
				width : 170,
				hidden:false,
				dataIndex : 'tel',
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
				header : 'MSN',
				width : 170,
				hidden:false,
				dataIndex : 'msn',
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
				header : '外协加工厂主图片',
				width : 170,
				hidden:false,
				dataIndex : 'asstMachgPriPicture',
				sortable : true,
				hidden : true
			}, {
				header : '其他即时通讯',
				width : 170,
				hidden:false,
				dataIndex : 'othInstMsg',
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
				header : '建立日期',
				width : 170,
				hidden:false,
				dataIndex : 'setupDt',
				format : 'Y-m-d',
				sortable : true
			}, {
				header : '备注',
				width : 170,
				hidden:false,
				dataIndex : 'memo',
				sortable : true
			}, {
				header : '拥有人名称',
				width : 170,
				hidden:false,
				dataIndex : 'ownPersNm',
				sortable : true
			}, {
				header : '联系人邮件地址',
				width : 170,
				hidden:false,
				dataIndex : 'contcrMailAddr',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgContcrMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'CONTCR_ID',
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
											addXywzAsstMachgContcrForm.getForm().reset();
											addXywzAsstMachgContcrForm.getForm().findField('setupDt').setValue(new Date());
											addXywzAsstMachgContcrWindow.show();
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
												editXywzAsstMachgContcrForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgContcrWindow.show();

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
												tempId = selectRe.data.contcrId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzAsstMachgContcrMgmtAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAsstMachgContcrMgmtQueryAction.json'
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
												detailXywzAsstMachgContcrForm
														.getForm().loadRecord(
																selectRe);
												detailXywzAsstMachgContcrWindow.show();
											}
										}
									}]
					});

			// 新增窗口展示的from
			var addXywzAsstMachgContcrForm = new Ext.form.FormPanel({
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
								items : [ new Com.xywz.common.AsstMachgCorpMgmtQuery(
										{
											fieldLabel : '<font color=red>*</font>外协加工厂编号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'asstMachgId',
											id : 'ASST_MACHG_ID22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('ASST_MACHG_ID22').oAsstMachgCorpMgmtQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('ASST_MACHG_ID22').setValue(records[0].data.ASST_MACHG_ID);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'fstNm',
									fieldLabel : '<font color=red>*</font>名字',
									allowBlank : false,
									blankText : '名字不能为空',
									maxLength:50,
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
									maxLength:50,
									minLength:1,
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
									hidden:false,
									fieldLabel : '职位',
									maxLength:50,
									minLength:1,
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
									hidden:false,
									fieldLabel : '所属部门',
									maxLength:50,
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
									name : 'tel',
									hidden:false,
									fieldLabel : '电话',
									maxLength : 20,
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
									hidden:false,
									fieldLabel : '电话2',
									maxLength:20,
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
									  fieldLabel : '<font color=red>*</font>手机',
									  allowBlank : false,
									  blankText : '手机不能为空',
									  maxLength : 20,
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
									hidden:false,
									fieldLabel : '传真',
									maxLength:20,
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
									name : 'msn',
									hidden:false,
									fieldLabel : 'MSN',
									maxLength:20,
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
									name : 'skype',
									hidden:false,
									fieldLabel : 'SKYPE',
									maxLength:20,
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
									maxLength:20,
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
									name : 'othInstMsg',
									hidden:false,
									fieldLabel : '其他即时通讯',
									maxLength:20,
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
									hidden:false,
									fieldLabel : '邮编',
									maxLength:20,
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
									name : 'setupDt',
									hidden:false,
									fieldLabel : '<font color=red>*</font>建立日期',
									allowBlank : false,
									blankText : '建立日期不能为空',
									format : 'Y-m-d',
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
									hidden:false,
									fieldLabel : '备注',
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
									name : 'ownPersNm',
									hidden:false,
									fieldLabel : '拥有人名称',
									maxLength:50,
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
									name : 'contcrMailAddr',
									hidden:false,
									fieldLabel : '联系人邮件地址',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzAsstMachgContcrForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgContcrMgmtAction.json',
								method : 'POST',
								form : addXywzAsstMachgContcrForm.getForm().id,
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
							
							addXywzAsstMachgContcrWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgContcrWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgContcrForm = new Ext.form.FormPanel({
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
									name : 'contcrId',
									hidden:true,
									fieldLabel : 'ID',
									anchor : '90%'
									},{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'asstMachgId',
									fieldLabel : '<font color=red>*</font>外协加工厂编号',
									allowBlank : false,
									blankText : '外协加工厂编号不能为空',
									readOnly : true,
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
									name : 'fstNm',
									fieldLabel : '<font color=red>*</font>名字',
									allowBlank : false,
									blankText : '名字不能为空',
									maxLength:50,
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
									maxLength:50,
									minLength:1,
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
									hidden:false,
									fieldLabel : '职位',
									maxLength:50,
									minLength:1,
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
									hidden:false,
									fieldLabel : '所属部门',
									maxLength:50,
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
									name : 'tel',
									hidden:false,
									fieldLabel : '电话',
									maxLength : 20,
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
									hidden:false,
									fieldLabel : '电话2',
									maxLength:20,
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
									  fieldLabel : '<font color=red>*</font>手机',
									  allowBlank : false,
									  blankText : '手机不能为空',
									  maxLength : 20,
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
									hidden:false,
									fieldLabel : '传真',
									maxLength:20,
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
									name : 'msn',
									hidden:false,
									fieldLabel : 'MSN',
									maxLength:20,
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
									name : 'skype',
									hidden:false,
									fieldLabel : 'SKYPE',
									maxLength:20,
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
									maxLength:20,
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
									name : 'othInstMsg',
									hidden:false,
									fieldLabel : '其他即时通讯',
									maxLength:20,
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
									hidden:false,
									fieldLabel : '邮编',
									maxLength:20,
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
									name : 'setupDt',
									hidden:false,
									fieldLabel : '<font color=red>*</font>建立日期',
									allowBlank : false,
									blankText : '建立日期不能为空',
									format : 'Y-m-d',
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
									hidden:false,
									fieldLabel : '备注',
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
									name : 'ownPersNm',
									hidden:false,
									fieldLabel : '拥有人名称',
									maxLength:50,
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
									name : 'contcrMailAddr',
									hidden:false,
									fieldLabel : '联系人邮件地址',
									maxLength:50,
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
							if(!editXywzAsstMachgContcrForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgContcrMgmtAction.json',
								method : 'POST',
								form : editXywzAsstMachgContcrForm.getForm().id,
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
							
							editXywzAsstMachgContcrWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgContcrWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzAsstMachgContcrForm = new Ext.form.FormPanel({
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
										name : 'contcrId',
										hidden:true,
										fieldLabel : 'ID',
										anchor : '90%'
										},{
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'asstMachgId',
										fieldLabel : '<font color=red>*</font>外协加工厂编号',
										allowBlank : false,
										blankText : '外协加工厂编号不能为空',
										readOnly : true,
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
										name : 'fstNm',
										fieldLabel : '<font color=red>*</font>名字',
										allowBlank : false,
										blankText : '名字不能为空',
										maxLength:50,
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
										maxLength:50,
										minLength:1,
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
										hidden:false,
										fieldLabel : '职位',
										maxLength:50,
										minLength:1,
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
										hidden:false,
										fieldLabel : '所属部门',
										maxLength:50,
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
										name : 'tel',
										hidden:false,
										fieldLabel : '电话',
										maxLength : 20,
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
										hidden:false,
										fieldLabel : '电话2',
										maxLength:20,
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
										  fieldLabel : '<font color=red>*</font>手机',
										  allowBlank : false,
										  blankText : '手机不能为空',
										  maxLength : 20,
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
										hidden:false,
										fieldLabel : '传真',
										maxLength:20,
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
										name : 'msn',
										hidden:false,
										fieldLabel : 'MSN',
										maxLength:20,
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
										name : 'skype',
										hidden:false,
										fieldLabel : 'SKYPE',
										maxLength:20,
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
										maxLength:20,
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
										name : 'othInstMsg',
										hidden:false,
										fieldLabel : '其他即时通讯',
										maxLength:20,
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
										hidden:false,
										fieldLabel : '邮编',
										maxLength:20,
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
										name : 'setupDt',
										hidden:false,
										fieldLabel : '<font color=red>*</font>建立日期',
										allowBlank : false,
										blankText : '建立日期不能为空',
										format : 'Y-m-d',
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
										hidden:false,
										fieldLabel : '备注',
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
										name : 'ownPersNm',
										hidden:false,
										fieldLabel : '拥有人名称',
										maxLength:50,
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
										name : 'contcrMailAddr',
										hidden:false,
										fieldLabel : '联系人邮件地址',
										maxLength:50,
										minLength:1,
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
					    	detailXywzAsstMachgContcrWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzAsstMachgContcrWindow = new Ext.Window({
				title : '外协加工工厂联系人新增',
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
				items : [ addXywzAsstMachgContcrForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgContcrWindow = new Ext.Window({
				title : '外协加工工厂联系人修改',
				plain : true,
				layout : 'fit',
				width : 880,
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
				items : [ editXywzAsstMachgContcrForm ]
			});
			
			// 定义详情窗口
			var detailXywzAsstMachgContcrWindow = new Ext.Window({
				title : '外协加工工厂预览',
				plain : true,
				layout : 'fit',
				width : 880,
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
				items : [ detailXywzAsstMachgContcrForm ]
			});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协加工工厂联系人信息列表',
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