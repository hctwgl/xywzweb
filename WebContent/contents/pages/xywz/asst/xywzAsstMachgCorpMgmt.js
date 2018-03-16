Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“业务类别”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_ASST_BIZ_CATE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“外协加工工厂状态”选择数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROVR_STAT'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“审核状态”选择数据集
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
			//“外协加工工厂等级”选择数据集
			var boxstore3 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_MACHG_LVL'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
	            id : 'searchCondition',
				title : "外协加工工厂查询",
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
						items : [ new Ext.form.ComboBox({
							hiddenName : 'bizCate',
							fieldLabel : '业务类别',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							editable : false,
							anchor : '90%'
						})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'asstMachgNm',
							fieldLabel : '外协加工厂名称',
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
				  name : 'asstCorpId',
				   mapping : 'ASST_CORP_ID'
				          },{
				  name : 'bizCate',
				   mapping : 'BIZ_CATE'
				          },{
				  name : 'bizCateOra',
				   mapping : 'BIZ_CATE_ORA'
				          },{
				  name : 'asstMachgStat',
				   mapping : 'ASST_MACHG_STAT'
				          },{
				  name : 'asstMachgStatOra',
				   mapping : 'ASST_MACHG_STAT_ORA'
				          },{
				  name : 'asstMachgOrdrNum',
				   mapping : 'ASST_MACHG_ORDR_NUM'
				          },{
				  name : 'asstMachgId',
				   mapping : 'ASST_MACHG_ID'
				          },{
				  name : 'asstMachgNm',
				   mapping : 'ASST_MACHG_NM'
				          },{
				  name : 'mainBizScop',
				   mapping : 'MAIN_BIZ_SCOP'
				          },{
				  name : 'addr',
				   mapping : 'ADDR'
				          },{
				  name : 'setupDt',
				   mapping : 'SETUP_DT'
				          },{
				  name : 'respContcrId',
				   mapping : 'RESP_CONTCR_ID'
				          },{
				  name : 'respContcr',
				   mapping : 'RESP_CONTCR'
				          },{
				  name : 'prodScop',
				   mapping : 'PROD_SCOP'
				          },{
				  name : 'mktScop',
				   mapping : 'MKT_SCOP'
				          },{
				  name : 'tel',
				   mapping : 'TEL'
				          },{
				  name : 'fax',
				   mapping : 'FAX'
				          },{
				  name : 'inputPersId',
				   mapping : 'INPUT_PERS_ID'
				          },{
				  name : 'inputPers',
				   mapping : 'INPUT_PERS'
				          },{
				  name : 'inputDt',
				   mapping : 'INPUT_DT'
				          },{
				  name : 'modiDt',
				   mapping : 'MODI_DT'
				          },{
				  name : 'memo',
				   mapping : 'MEMO'
				          },{
				  name : 'chkStat',
				   mapping : 'CHK_STAT'
				          },{
				  name : 'chkStatOra',
				   mapping : 'CHK_STAT_ORA'
				          },{
				  name : 'asstMachgLvl',
				   mapping : 'ASST_MACHG_LVL'
					},{
					name : 'asstMachgLvlOra',
					mapping : 'ASST_MACHG_LVL_ORA'					   
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '外协公司ID',
				   width : 210,
				   dataIndex : 'asstCorpId',
				   sortable : true,
				   hidden: true
				          },{
				  header : '业务类别',
				   width : 210,
				   dataIndex : 'bizCateOra',
				   sortable : true
				          },{
				  header : '外协加工厂状态',
				   width : 210,
				   dataIndex : 'asstMachgStatOra',
				   sortable : true
				          },{
				  header : '外加工订单号',
				   width : 210,
				   dataIndex : 'asstMachgOrdrNum',
				   sortable : true
				          },{
				  header : '外协加工厂编号',
				   width : 210,
				   dataIndex : 'asstMachgId',
				   sortable : true
				          },{
				  header : '外协加工厂名称',
				   width : 210,
				   dataIndex : 'asstMachgNm',
				   sortable : true
				          },{
				  header : '主营范围',
				   width : 210,
				   dataIndex : 'mainBizScop',
				   sortable : true
				          },{
				  header : '地址',
				   width : 210,
				   dataIndex : 'addr',
				   sortable : true
				          },{
				  header : '创建日期',
				   width : 210,
				   dataIndex : 'setupDt',
				   sortable : true
				          },{
				  header : '负责联系人编号',
				   width : 210,
				   dataIndex : 'respContcrId',
				   sortable : true
				          },{
				  header : '负责联系人',
				   width : 210,
				   dataIndex : 'respContcr',
				   sortable : true
				          },{
				  header : '产品范围',
				   width : 210,
				   dataIndex : 'prodScop',
				   sortable : true
				          },{
				  header : '市场范围',
				   width : 210,
				   dataIndex : 'mktScop',
				   sortable : true
				          },{
				  header : '电话',
				   width : 210,
				   dataIndex : 'tel',
				   sortable : true
				          },{
				  header : '传真',
				   width : 210,
				   dataIndex : 'fax',
				   sortable : true
				          },{
				  header : '录入人编号',
				   width : 210,
				   dataIndex : 'inputPersId',
				   sortable : true
				          },{
				  header : '录入人',
				   width : 210,
				   dataIndex : 'inputPers',
				   sortable : true
				          },{
				  header : '录入日期',
				   width : 210,
				   dataIndex : 'inputDt',
				   sortable : true
				          },{
				  header : '修改日期',
				   width : 210,
				   dataIndex : 'modiDt',
				   sortable : true
				          },{
				  header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
				          },{
				  header : '审核状态',
				   width : 210,
				   dataIndex : 'chkStatOra',
				   sortable : true
				          },{
				  header : '外协加工厂等级',
				   width : 210,
				   dataIndex : 'asstMachgLvlOra',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgCorpMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ASST_CORP_ID',
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
											addXywzAsstMachgCorpMgmtForm.getForm().reset();
											addXywzAsstMachgCorpMgmtForm.getForm().findField('chkStat').setValue('0');
											addXywzAsstMachgCorpMgmtForm.getForm().findField('setupDt').setValue(new Date());
											addXywzAsstMachgCorpMgmtWindow.show();
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
												editXywzAsstMachgCorpMgmtForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgCorpMgmtWindow.show();

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
												tempId = selectRe.data.asstCorpId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzAsstMachgCorpMgmtAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAsstMachgCorpMgmtQueryAction.json'
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
												detailXywzAsstMachgCorpMgmtForm
														.getForm().loadRecord(
																selectRe);
												detailXywzAsstMachgCorpMgmtWindow.show();
											}
										}
									},'-',{
										text : '联系人和银行详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/asst/xywzAsstMachgCorpMgmtDetail.jsp?'
												+ '&asstMachgId='+_record.data.asstMachgId; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
											}
										}
									},'-',{
										text : '物流和客户跟进详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/asst/xywzAsstMachgCorpMgmtDetailAdd.jsp?'
												+ '&asstMachgId='+_record.data.asstMachgId; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
											}
										}
									}]
					});
			
			operateWin= new Ext.Window({
				title : '',
				id:'operateWinId',
				plain : true,
				layout : 'fit',
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				maximizable : false, // 最大化最小化
				collapsible : false,
				border : false,
				maximized : true, // 默认最大化
				animCollapse : true,
				constrain : true,
				html:"<iframe id='mainFrame' name='mainFrame' style='border:0 solid #000;height:100%;width:100%;' src='' ></iframe>"
			});

			// 新增窗口展示的from
			var addXywzAsstMachgCorpMgmtForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
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
								    name : 'asstCorpId',
								    maxLength : 200,
								    minLength : 1, 
								    hidden : true,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'bizCate',
										 fieldLabel : '<font color=red>*</font>业务类别',
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
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'asstMachgStat',
										 fieldLabel : '<font color=red>*</font>外协加工厂状态',
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
								    name : 'asstMachgOrdrNum',
								    fieldLabel : '<font color=red>*</font>外加工订单号',
								    allowBlank : false,
								    blankText : '外加工订单号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgId',
								    fieldLabel : '<font color=red>*</font>外协加工厂编号',
								    allowBlank : false,
								    blankText : '外协加工厂编号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgNm',
								    fieldLabel : '<font color=red>*</font>外协加工厂名称',
								    allowBlank : false,
								    blankText : '外协加工厂名称不能为空',
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
									    fieldLabel : '<font color=red>*</font>创建日期',
									    allowBlank : false,
									    blankText : '创建日期不能为空',
									    anchor : '90%',
									    format:'Y-m-d'
									   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ {
								    xtype : 'textarea',
								    vtype : 'trim',
								    Width : '100',
								    name : 'mainBizScop',
								    fieldLabel : '主营范围',
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
								    name : 'addr',
								    fieldLabel : '<font color=red>*</font>地址',
								    allowBlank : false,
								    blankText : '地址不能为空',
								    maxLength : 100,
								    minLength : 1,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '<font color=red>*</font>负责联系人',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'respContcr',
												id : 'RESP_CONTCR11',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('RESP_CONTCR11').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('RESP_CONTCR11').setValue(records[0].data.USER_NAME);
													addXywzAsstMachgCorpMgmtForm.getForm().findField('respContcrId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
								  },{
									   columnWidth : .5,
									    layout : 'form',
									    items : [ {
									    xtype : 'textfield',
									    vtype : 'trim',
									    Width : '100',
									    name : 'respContcrId',
									    fieldLabel : '<font color=red>*</font>负责联系人编号',
									    allowBlank : false,
									    blankText : '负责联系人编号不能为空',
									    maxLength : 200,
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
								    name : 'prodScop',
								    fieldLabel : '产品范围',
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
								    name : 'mktScop',
								    fieldLabel : '市场范围',
								    maxLength : 100,
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
								    fieldLabel : '传真',
								    maxLength : 20,
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
								    maxLength : 100,
								    minLength : 1,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'chkStat',
										 fieldLabel : '<font color=red>*</font>审核状态',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore2,
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
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'asstMachgLvl',
										 fieldLabel : '<font color=red>*</font>外协加工厂等级',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore3,
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
								}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzAsstMachgCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgCorpMgmtAction.json',
								method : 'POST',
								form : addXywzAsstMachgCorpMgmtForm.getForm().id,
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
							
							addXywzAsstMachgCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgCorpMgmtForm = new Ext.form.FormPanel({
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
								    name : 'asstCorpId',
								    maxLength : 200,
								    minLength : 1, 
								    hidden : true,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'bizCate',
										 fieldLabel : '<font color=red>*</font>业务类别',
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
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'asstMachgStat',
										 fieldLabel : '<font color=red>*</font>外协加工厂状态',
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
								    name : 'asstMachgOrdrNum',
								    fieldLabel : '<font color=red>*</font>外加工订单号',
								    allowBlank : false,
								    blankText : '外加工订单号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgId',
								    fieldLabel : '<font color=red>*</font>外协加工厂编号',
								    allowBlank : false,
								    blankText : '外协加工厂编号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgNm',
								    fieldLabel : '<font color=red>*</font>外协加工厂名称',
								    allowBlank : false,
								    blankText : '外协加工厂名称不能为空',
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
									    fieldLabel : '<font color=red>*</font>创建日期',
									    allowBlank : false,
									    blankText : '创建日期不能为空',
									    anchor : '90%',
									    format:'Y-m-d'
									   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ {
								    xtype : 'textarea',
								    vtype : 'trim',
								    Width : '100',
								    name : 'mainBizScop',
								    fieldLabel : '主营范围',
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
								    name : 'addr',
								    fieldLabel : '<font color=red>*</font>地址',
								    allowBlank : false,
								    blankText : '地址不能为空',
								    maxLength : 100,
								    minLength : 1,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '<font color=red>*</font>负责联系人',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'respContcr',
												id : 'RESP_CONTCR22',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('RESP_CONTCR22').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('RESP_CONTCR22').setValue(records[0].data.USER_NAME);
													editXywzAsstMachgCorpMgmtForm.getForm().findField('respContcrId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
								  },{
									   columnWidth : .5,
									    layout : 'form',
									    items : [ {
									    xtype : 'textfield',
									    vtype : 'trim',
									    Width : '100',
									    name : 'respContcrId',
									    fieldLabel : '<font color=red>*</font>负责联系人编号',
									    allowBlank : false,
									    blankText : '负责联系人编号不能为空',
									    maxLength : 200,
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
								    name : 'prodScop',
								    fieldLabel : '产品范围',
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
								    name : 'mktScop',
								    fieldLabel : '市场范围',
								    maxLength : 100,
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
								    fieldLabel : '传真',
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
								    name : 'inputPersId',
								    fieldLabel : '录入人编号',
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
								    name : 'inputPers',
								    fieldLabel : '录入人',
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
								    name : 'inputDt',
								    fieldLabel : '录入日期',
								    readOnly : true,
								    anchor : '90%',
								    format:'Y-m-d'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ {
								    xtype : 'datefield',
								    vtype : 'trim',
								    Width : '100',
								    name : 'modiDt',
								    fieldLabel : '修改日期',
								    readOnly : true,
								    anchor : '90%',
								    format:'Y-m-d'
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
									    maxLength : 100,
									    minLength : 1,
									    anchor : '90%'
									   } ]
									  },{
									   columnWidth : .5,
									    layout : 'form',
									    items : [ new Ext.form.ComboBox({
						            	     hiddenName : 'chkStat',
											 fieldLabel : '<font color=red>*</font>审核状态',
											 labelStyle: 'text-align:left;',
											 triggerAction : 'all',
											 store : boxstore2,
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
									    items : [ new Ext.form.ComboBox({
						            	     hiddenName : 'asstMachgLvl',
											 fieldLabel : '<font color=red>*</font>外协加工厂等级',
											 labelStyle: 'text-align:left;',
											 triggerAction : 'all',
											 store : boxstore3,
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
								} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzAsstMachgCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgCorpMgmtAction.json',
								method : 'POST',
								form : editXywzAsstMachgCorpMgmtForm.getForm().id,
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
							
							editXywzAsstMachgCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzAsstMachgCorpMgmtForm = new Ext.form.FormPanel({
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
								    name : 'asstCorpId',
								    maxLength : 200,
								    minLength : 1, 
								    hidden : true,
								    anchor : '90%'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'bizCate',
										 fieldLabel : '<font color=red>*</font>业务类别',
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
								    items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'asstMachgStat',
										 fieldLabel : '<font color=red>*</font>外协加工厂状态',
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
								    name : 'asstMachgOrdrNum',
								    fieldLabel : '<font color=red>*</font>外加工订单号',
								    allowBlank : false,
								    blankText : '外加工订单号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgId',
								    fieldLabel : '<font color=red>*</font>外协加工厂编号',
								    allowBlank : false,
								    blankText : '外协加工厂编号不能为空',
								    maxLength : 30,
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
								    name : 'asstMachgNm',
								    fieldLabel : '<font color=red>*</font>外协加工厂名称',
								    allowBlank : false,
								    blankText : '外协加工厂名称不能为空',
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
									    fieldLabel : '<font color=red>*</font>创建日期',
									    allowBlank : false,
									    blankText : '创建日期不能为空',
									    anchor : '90%',
									    format:'Y-m-d'
									   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ {
								    xtype : 'textarea',
								    vtype : 'trim',
								    Width : '100',
								    name : 'mainBizScop',
								    fieldLabel : '主营范围',
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
								    name : 'addr',
								    fieldLabel : '<font color=red>*</font>地址',
								    allowBlank : false,
								    blankText : '地址不能为空',
								    maxLength : 100,
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
									    name : 'respContcr',
									    fieldLabel : '<font color=red>*</font>负责联系人',
									    allowBlank : false,
									    blankText : '负责联系人不能为空',
									    maxLength : 100,
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
									    name : 'respContcrId',
									    fieldLabel : '<font color=red>*</font>负责联系人编号',
									    allowBlank : false,
									    blankText : '负责联系人编号不能为空',
									    maxLength : 200,
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
								    name : 'prodScop',
								    fieldLabel : '产品范围',
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
								    name : 'mktScop',
								    fieldLabel : '市场范围',
								    maxLength : 100,
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
								    fieldLabel : '传真',
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
								    name : 'inputPersId',
								    fieldLabel : '录入人编号',
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
								    name : 'inputPers',
								    fieldLabel : '录入人',
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
								    name : 'inputDt',
								    fieldLabel : '录入日期',
								    readOnly : true,
								    anchor : '90%',
								    format:'Y-m-d'
								   } ]
								  },{
								   columnWidth : .5,
								    layout : 'form',
								    items : [ {
								    xtype : 'datefield',
								    vtype : 'trim',
								    Width : '100',
								    name : 'modiDt',
								    fieldLabel : '修改日期',
								    readOnly : true,
								    anchor : '90%',
								    format:'Y-m-d'
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
									    maxLength : 100,
									    minLength : 1,
									    anchor : '90%'
									   } ]
									  },{
									   columnWidth : .5,
									    layout : 'form',
									    items : [ new Ext.form.ComboBox({
						            	     hiddenName : 'chkStat',
											 fieldLabel : '<font color=red>*</font>审核状态',
											 labelStyle: 'text-align:left;',
											 triggerAction : 'all',
											 store : boxstore2,
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
									    items : [ new Ext.form.ComboBox({
						            	     hiddenName : 'asstMachgLvl',
											 fieldLabel : '<font color=red>*</font>外协加工厂等级',
											 labelStyle: 'text-align:left;',
											 triggerAction : 'all',
											 store : boxstore3,
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
								} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [
					    {
						text : '返  回',
						handler : function() {
					    	detailXywzAsstMachgCorpMgmtWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzAsstMachgCorpMgmtWindow = new Ext.Window({
				title : '外协加工工厂新增',
				plain : true,
				layout : 'fit',
				width : 750,
				height :460,
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
				items : [ addXywzAsstMachgCorpMgmtForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgCorpMgmtWindow = new Ext.Window({
				title : '外协加工工厂修改',
				plain : true,
				layout : 'fit',
				width : 750,
				height :510,
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
				items : [ editXywzAsstMachgCorpMgmtForm ]
			});
			
			// 定义详情窗口
			var detailXywzAsstMachgCorpMgmtWindow = new Ext.Window({
				title : '外协加工工厂预览',
				plain : true,
				layout : 'fit',
				width : 750,
				height :510,
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
				items : [ detailXywzAsstMachgCorpMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协加工工厂列表',
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