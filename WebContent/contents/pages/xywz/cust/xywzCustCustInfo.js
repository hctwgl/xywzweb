Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//客户级别数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_CUST_GRADE_LVL'  //客户等级
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_CUST_CREDIT_LVL' //客户信用等级
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
					url :basepath+'/lookup.json?name=XYWZ_BIZ_CATE'  //客户业务类别
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
					url :basepath+'/lookup.json?name=XYWZ_CUST_TYPE'  //客户类别
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore5 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'  //审核状态
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore6 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_COUNTRY'  //审核状态
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "客户查询",
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
							name : 'custNo',
							labelWidth : 150,
							fieldLabel : '系统客户号',
							anchor : '90%'
						},new Ext.form.ComboBox({
							hiddenName : 'custLvl',
							fieldLabel : '客户等级',
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
						})  ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'bizCate',
							fieldLabel : '业务类别',
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
						})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'custShtNm',
							fieldLabel : '客户简称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'setupDt',
							fieldLabel : '创建日期',
							anchor : '90%',
							format : 'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'crdtLvl',
							fieldLabel : '信用等级',
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
						}) ]
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
								id : 'USER_NAME33',
								singleSelected : false,
								// 单选复选标志
//								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
									qForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Ext.form.ComboBox({
							hiddenName : 'custTyp',
							fieldLabel : '客户类型',
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
						}) ]
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
				name : 'custId',
				mapping : 'CUST_ID'
			},{
				name : 'custNo',
				mapping : 'CUST_NO'
			},{
				name : 'bizCate',
				mapping : 'BIZ_CATE'
			},{
				name : 'bizCateOra',
				mapping : 'BIZ_CATE_ORA'
			}, {
				name : 'custShtNm',
				mapping : 'CUST_SHT_NM'
			}, {
				name : 'custContcr',
				mapping : 'CUST_CONTCR'
			}, {
				name : 'custContcrOra',
				mapping : 'CUST_CONTCR_ORA'
			},{
				name : 'cntryUrbn',
				mapping : 'CNTRY_URBN'
			},{
				name : 'cntryUrbnOra',
				mapping : 'CNTRY_URBN_ORA'
			},{
				name : 'custFullNm',
				mapping : 'CUST_FULL_NM'
			},{
				name : 'addr',
				mapping : 'ADDR'
			},{
				name : 'setupDt',
				mapping : 'SETUP_DT'
			},{
				name : 'bizMem',
				mapping : 'BIZ_MEM'
			},{
				name : 'bizMemNm',
				mapping : 'BIZ_MEM_NM'
			},{
				name : 'chkStat',
				mapping : 'CHK_STAT'
			},{
				name : 'chkStatOra',
				mapping : 'CHK_STAT_ORA'
			},{
				name : 'custLvl',
				mapping : 'CUST_LVL'
			},{
				name : 'custLvlOra',
				mapping : 'CUST_LVL_ORA'
			},{
				name : 'inds',
				mapping : 'INDS'
			},{
				name : 'prodScop',
				mapping : 'PROD_SCOP'
			},{
				name : 'mktScop',
				mapping : 'MKT_SCOP'
			},{
				name : 'crdtLvl',
				mapping : 'CRDT_LVL'
			},{
				name : 'crdtLvlOra',
				mapping : 'CRDT_LVL_ORA'
			},{
				name : 'telOrFax',
				mapping : 'TEL_OR_FAX'
			},{
				name : 'inputPersNm',
				mapping : 'INPUT_PERS_NM'
			},{
				name : 'inputDt',
				mapping : 'INPUT_DT'
			},{
				name : 'finalModiDt',
				mapping : 'FINAL_MODI_DT'
			},{
				name : 'modiDt',
				mapping : 'MODI_DT'
			},{
				name : 'custSrc',
				mapping : 'CUST_SRC'
			},{
				name : 'custTyp',
				mapping : 'CUST_TYP'
			},{
				name : 'custTypOra',
				mapping : 'CUST_TYP_ORA'
			},{
				name : 'mdlBus',
				mapping : 'MDL_BUS'
			},{
				name : 'mdlBusContcr',
				mapping : 'MDL_BUS_CONTCR'
			},{
				name : 'mdlBusContMode',
				mapping : 'MDL_BUS_CONT_MODE'
			},{
				name : 'formContcr',
				mapping : 'FORM_CONTCR'
			},{
				name : 'formContcrNm',
				mapping : 'FORM_CONTCR_NM'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '客户号',
				width : 100,
				dataIndex : 'custId',
				hidden : true,
				sortable : true
			},{
				header : '系统客户号',
				width : 100,
				dataIndex : 'custNo',
				sortable : true
			}, {
				header : '业务类别',
				width : 170,
				dataIndex : 'bizCateOra',
				sortable : true
			}, {
				header : '客户简称',
				width : 170,
				dataIndex : 'custShtNm',
				sortable : true
			}, {
				header : '客户联系人',
				width : 170,
				dataIndex : 'custContcr',
				sortable : true
			}, {
				header : '国家城市',
				width : 170,
				dataIndex : 'cntryUrbnOra',
				sortable : true
			}, {
				header : '客户全称',
				width : 170,
				dataIndex : 'custFullNm',
				sortable : true
			}, {
				header : '地址',
				width : 170,
				hidden:false,
				dataIndex : 'addr',
				sortable : true
			}, {
				header : '创建日期',
				width : 170,
				hidden:false,
				dataIndex : 'setupDt',
				sortable : true
			}, {
				header : '业务员',
				width : 170,
				hidden:false,
				dataIndex : 'bizMemNm',
				sortable : true
			}, {
				header : '审核状态',
				width : 170,
				hidden:false,
				dataIndex : 'chkStatOra',
				sortable : true
			}, {
				header : '客户等级',
				width : 170,
				hidden:false,
				dataIndex : 'custLvlOra',
				sortable : true
			}, {
				header : '行业',
				width : 170,
				hidden:false,
				dataIndex : 'inds',
				sortable : true
			}, {
				header : '产品范围',
				width : 170,
				hidden:false,
				dataIndex : 'prodScop',
				sortable : true
			}, {
				header : '市场范围',
				width : 170,
				hidden:false,
				dataIndex : 'mktScop',
				sortable : true
			}, {
				header : '信用等级',
				width : 170,
				hidden:false,
				dataIndex : 'crdtLvlOra',
				sortable : true
			}, {
				header : '电话/传真',
				width : 170,
				hidden:false,
				dataIndex : 'telOrFax',
				sortable : true
			}, {
				header : '录入人名称',
				width : 170,
				hidden:false,
				dataIndex : 'inputPersNm',
				sortable : true
			}, {
				header : '录入日期',
				width : 170,
				hidden:false,
				dataIndex : 'inputDt',
				sortable : true
			}, {
				header : '修改日期',
				width : 170,
				hidden:false,
				dataIndex : 'modiDt',
				sortable : true
			}, {
				header : '最后修改时间',
				width : 170,
				hidden:false,
				dataIndex : 'finalModiDt',
				sortable : true
			}, {
				header : '客户来源',
				width : 170,
				hidden:false,
				dataIndex : 'custSrc',
				sortable : true
			}, {
				header : '客户类型',
				width : 170,
				hidden:false,
				dataIndex : 'custTypOra',
				sortable : true
			}, {
				header : '中间商',
				width : 170,
				hidden:false,
				dataIndex : 'mdlBus',
				sortable : true
			}, {
				header : '中间商联系人',
				width : 170,
				hidden:false,
				dataIndex : 'mdlBusContcr',
				sortable : true
			}, {
				header : '中间商联系方式',
				width : 170,
				hidden:false,
				dataIndex : 'mdlBusContMode',
				sortable : true
			}, {
				header : '单据联系人',
				width : 170,
				hidden:false,
				dataIndex : 'formContcrNm',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustCustInfoQueryAction.json'
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
											addXywzCustCustInfoForm.getForm().reset();											
											addXywzCustCustInfoWindow.show();
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
												editXywzCustCustInfoForm.getForm().loadRecord(selectRe);
												editXywzCustCustInfoWindow.show();

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
												tempId = selectRe.data.custId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzCustCustInfoAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzCustCustInfoQueryAction.json'
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
												detailXywzCustCustInfoForm.getForm().loadRecord(selectRe);
												detailXywzCustCustInfoWindow.show();
											}
										}
									},'-',{
										text : '详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/cust/xywzCustCustInfoDetail.jsp?'
												+ '&custId='+_record.data.custId; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
												//detailXywzCustCustInfoWindow.show();
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
			var addXywzCustCustInfoForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 500,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'bizCate',
									fieldLabel : '业务类别',
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
								})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custShtNm',
									fieldLabel : '<font color=red>*</font>客户简称',
									allowBlank : false,
									blankText : '客户简称不能为空',
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
									name : 'custContcr',
									fieldLabel : '客户联系人',
									maxLength:500,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [new Ext.form.ComboBox({
									hiddenName : 'cntryUrbn',
									fieldLabel : '<font color=red>*</font>国家城市',
									labelStyle: 'text-align:left;',
									allowBlank : false,
									blankText : '国家城市不能为空',
									triggerAction : 'all',
									store : boxstore6,
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
									name : 'custFullNm',
									fieldLabel : '<font color=red>*</font>客户全称',
									allowBlank : false,
									blankText : '客户全称不能为空',
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
								items : [{
									xtype : 'textfield',
									name : 'bizMem',
									hidden:true
								} ,new Com.xywz.common.UserManagerIdQuery({
											fieldLabel : '<font color=red>*</font>业务员',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'bizMemNm',
											id : 'USER_NAME22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
//											readOnly:true,
											callback : function(a, b) {
												var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
												addXywzCustCustInfoForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'chkStat',
									fieldLabel : '审核状态',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore5,									
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [new Ext.form.ComboBox({
									hiddenName : 'custLvl',
									fieldLabel : '客户等级',
									labelStyle: 'text-align:left;',
									//blankText : '客户等级不能为空',
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
									name : 'inds',
									hidden:false,
									fieldLabel : '行业',
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
									name : 'prodScop',
									hidden:false,
									fieldLabel : '产品范围',
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
									name : 'mktScop',
									hidden:false,
									fieldLabel : '市场范围',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [new Ext.form.ComboBox({
									hiddenName : 'crdtLvl',
									fieldLabel : '信用等级',
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
									name : 'telOrFax',
									hidden:false,
									fieldLabel : '电话/传真',
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
									name : 'custSrc',
									hidden:false,
									fieldLabel : '客户来源',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'custTyp',
									fieldLabel : '客户类型',
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
									name : 'mdlBus',
									hidden:false,
									fieldLabel : '中间商',
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
									name : 'mdlBusContcr',
									hidden:false,
									fieldLabel : '中间商联系人',
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
									name : 'mdlBusContMode',
									hidden:false,
									fieldLabel : '中间商联系方式',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									name : 'formContcr',
									hidden:true
								}, new Com.xywz.common.UserQuery({
											fieldLabel : '<font color=red>*</font>单据联系人',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'formContcrNm',
											id : 'FORM_CONTCR_NM22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('FORM_CONTCR_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('FORM_CONTCR_NM22').setValue(Ext.getCmp('FORM_CONTCR_NM22').userName);
												addXywzCustCustInfoForm.getForm().findField('formContcr').setValue(Ext.getCmp('FORM_CONTCR_NM22').bizMem);
											}
										}) ]
							}]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzCustCustInfoForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustInfoAction.json',
								method : 'POST',
								form : addXywzCustCustInfoForm.getForm().id,
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
							
							addXywzCustCustInfoWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzCustCustInfoWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzCustCustInfoForm = new Ext.form.FormPanel({
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
									name : 'custId',
									hidden:true,
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
									name : 'custNo',
									fieldLabel : '<font color=red>*</font>系统客户号',
									allowBlank : false,
									readOnly : true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'bizCate',
									fieldLabel : '业务类别',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore3,									
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									editable : false,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custShtNm',
									fieldLabel : '<font color=red>*</font>客户简称',
									allowBlank : false,
									blankText : '客户简称不能为空',
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
									name : 'custContcr',
									fieldLabel : '客户联系人',
									maxLength:500,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'cntryUrbn',
									fieldLabel : '<font color=red>*</font>国家城市',
									allowBlank : false,
									blankText : '国家城市不能为空',
									labelStyle: 'text-align:left;',
									triggerAction : 'all',
									store : boxstore6,
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								})  ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custFullNm',
									fieldLabel : '<font color=red>*</font>客户全称',
									allowBlank : false,
									blankText : '客户全称不能为空',
									maxLength:500,
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
//									allowBlank : false,
//									blankText : '地址不能为空',
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
									readOnly : true,
									fieldLabel : '创建日期',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									format : 'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									name : 'bizMem',
									hidden:true
								}, new Com.xywz.common.UserManagerIdQuery({
											fieldLabel : '<font color=red>*</font>业务员',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'bizMemNm',
											id : 'USER_NAME11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('USER_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('USER_NAME11').setValue(records[0].data.USER_NAME);
												editXywzCustCustInfoForm.getForm().findField('bizMem').setValue(records[0].data.ACCOUNT_NAME);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'chkStat',
									fieldLabel : '审核状态',
									labelStyle: 'text-align:left;',
									blankText : '审核状态不能为空',
									triggerAction : 'all',
									store : boxstore5,									
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									editable : false,
									typeAhead : true,
									emptyText:'请选择',
									resizable : true,
									anchor : '90%'
								})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [new Ext.form.ComboBox({
									hiddenName : 'custLvl',
									fieldLabel : '客户等级',
									labelStyle: 'text-align:left;',
//									blankText : '客户等级不能为空',
									triggerAction : 'all',
									store : boxstore1,									
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									editable : false,
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
									name : 'inds',
									hidden:false,
									fieldLabel : '行业',
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
									name : 'prodScop',
									hidden:false,
									fieldLabel : '产品范围',
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
									name : 'mktScop',
									hidden:false,
									fieldLabel : '市场范围',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [new Ext.form.ComboBox({
									hiddenName : 'crdtLvl',
									fieldLabel : '信用等级',
									labelStyle: 'text-align:left;',
//									blankText : '信用等级不能为空',
									triggerAction : 'all',
									store : boxstore2,									
									displayField : 'value',
									valueField : 'key',
									mode : 'local',
									forceSelection : true,
									editable : false,
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
									name : 'telOrFax',
									hidden:false,
									fieldLabel : '电话/传真',
//									allowBlank : false,
//									blankText : '电话/传真不能为空',
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
									name : 'inputPersNm',
									hidden:false,
									readOnly : true,
									fieldLabel : '录入人名称',
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
									name : 'inputDt',
									hidden:false,
									fieldLabel : '录入日期',
									readOnly : true,
									maxLength:100,
									minLength:1,
									anchor : '90%',
									format : 'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'finalModiDt',
									hidden:false,
									fieldLabel : '最后修改时间',
									readOnly : true,
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
									name : 'modiDt',
									hidden:false,
									fieldLabel : '修改日期',
									readOnly : true,
									maxLength:100,
									minLength:1,
									anchor : '90%',
									format : 'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custSrc',
									hidden:false,
									fieldLabel : '客户来源',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									hiddenName : 'custTyp',
									fieldLabel : '客户类型',
									labelStyle: 'text-align:left;',
//									blankText : '客户类型不能为空',
									triggerAction : 'all',
									store : boxstore4,									
									displayField : 'value',
									editable : false,
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
									name : 'mdlBus',
									hidden:false,
									fieldLabel : '中间商',
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
									name : 'mdlBusContcr',
									hidden:false,
									fieldLabel : '中间商联系人',
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
									name : 'mdlBusContMode',
									hidden:false,
									fieldLabel : '中间商联系方式',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									name : 'formContcr',
									hidden:true
								}, new Com.xywz.common.UserQuery({
											fieldLabel : '<font color=red>*</font>单据联系人',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'formContcrNm',
											id : 'FORM_CONTCR_NM11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('FORM_CONTCR_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('FORM_CONTCR_NM11').setValue(Ext.getCmp('FORM_CONTCR_NM11').userName);
												editXywzCustCustInfoForm.getForm().findField('formContcr').setValue(Ext.getCmp('FORM_CONTCR_NM11').bizMem);
											}
										}) ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzCustCustInfoForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzCustCustInfoAction.json',
								method : 'POST',
								form : editXywzCustCustInfoForm.getForm().id,
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
							
							editXywzCustCustInfoWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzCustCustInfoWindow.hide();
						}
					} ]
				} ]
			});
			
			// 新增窗口展示的from
			var detailXywzCustCustInfoForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'bizCateOra',
									fieldLabel : '业务类别',
									allowBlank : false,
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
									name : 'custShtNm',
									fieldLabel : '客户简称',
									allowBlank : false,
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
									name : 'custContcr',
									fieldLabel : '客户联系人',
									allowBlank : false,
									maxLength:500,
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
									name : 'cntryUrbnOra',
									fieldLabel : '国家城市',
									allowBlank : false,
									maxLength:500,
									maxLength:50,
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
									name : 'custFullNm',
									fieldLabel : '客户全称',
									allowBlank : false,
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
									name : 'bizMemNm',
									hidden:false,
									fieldLabel : '业务员',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'chkStatOra',
									hidden:false,
									fieldLabel : '审核状态',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								}]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custLvlOra',
									hidden:false,
									fieldLabel : '客户等级',
									maxLength:100,
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
									name : 'inds',
									hidden:false,
									fieldLabel : '行业',
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
									name : 'prodScop',
									hidden:false,
									fieldLabel : '产品范围',
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
									name : 'mktScop',
									hidden:false,
									fieldLabel : '市场范围',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'crdtLvlOra',
									hidden:false,
									fieldLabel : '信用等级',
									maxLength:100,
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
									name : 'telOrFax',
									hidden:false,
									fieldLabel : '电话/传真',
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
									name : 'custSrc',
									hidden:false,
									fieldLabel : '客户来源',
									maxLength:100,
									minLength:1,
									anchor : '90%',
									readOnly:true
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'custTypOra',
									hidden:false,
									fieldLabel : '客户类型',
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
									name : 'mdlBus',
									hidden:false,
									fieldLabel : '中间商',
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
									name : 'mdlBusContcr',
									hidden:false,
									fieldLabel : '中间商联系人',
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
									name : 'mdlBusContMode',
									hidden:false,
									fieldLabel : '中间商联系方式',
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
									name : 'formContcrNm',
									hidden:false,
									fieldLabel : '单据联系人',
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
							detailXywzCustCustInfoWindow.hide();
						}
					} ]
				} ]
			});


			// 定义新增窗口
			var addXywzCustCustInfoWindow = new Ext.Window({
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
				items : [ addXywzCustCustInfoForm ]
			});

			// 定义修改窗口
			var editXywzCustCustInfoWindow = new Ext.Window({
				title : '客户信息修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 450,
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
				items : [ editXywzCustCustInfoForm ]
			});
			
			var detailXywzCustCustInfoWindow = new Ext.Window({
				title : '客户信息详情',
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
				items : [ detailXywzCustCustInfoForm ]
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
			
			/*
			 * 首页跳转
			 */
			var fnCondisDecide= function(){
				var parms = '';
				if(window.location.search){
					parms = Ext.urlDecode(window.location.search);
				}
		      	var sName1=parms['?condis'];
		      	var sID1=parms['?qStyle'];
		      	if(typeof sName1 != "undefined"){
		      		
//		      		Ext.getCmp('custShtNm').setValue(sName1);
		      		qForm.getForm().findField('custShtNm').setValue(sName1);
		      	  store.on('beforeload', function() {
			        	var conditionStr =  qForm.getForm().getValues(false);
			            this.baseParams = {
			                    "condition":Ext.encode(conditionStr)
			                    
			            };
				});
					store.reload({
				                   
						  params : {
		                     start : 0,
		                     limit : bbar.pageSize}});
		      	};
				if(typeof sID1 != "undefined"){
				      		
//				      		Ext.getCmp('custNo').setValue(sID1);
				      		qForm.getForm().findField('custNo').setValue(sID1);
				      	  store.on('beforeload', function() {
					        	var conditionStr =  qForm.getForm().getValues(false);
					            this.baseParams = {
					                    "condition":Ext.encode(conditionStr)
					                    
					            };
						});
							store.reload({
						                   
								  params : {
				                     start : 0,
				                     limit : bbar.pageSize}});
				      	}
			};

			fnCondisDecide();
		});