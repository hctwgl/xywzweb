//内贸合同
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
			url :basepath+'/lookup.json?name=XYWZ_ORDR_STAT'
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
			url :basepath+'/lookup.json?name=XYWZ_CUR'   //币种
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
			url :basepath+'/lookup.json?name=XYWZ_SALE_BELG_CORP'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	Ext.QuickTips.init();
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "内贸订单合同信息",
		labelWidth : 90, // 标签宽度
		frame : true, // 是否渲染表单面板背景色
		labelAlign : 'middle', // 标签对齐方式
		buttonAlign : 'center',
		region : 'north',
		split : true,
		height : 100,
		items : [ {
			layout : 'column',
			items : [ {
				columnWidth : .25,
				layout : 'form',
				items : [ 
					 new Ext.form.ComboBox({
							hiddenName : 'ordrStat',
							fieldLabel : '订单状态',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : boxstore1,
							allowBlank : false,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							editable:false,
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
					Width : '100',
					name : 'contrNum',
					fieldLabel : '合同号',
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
				store.load( {
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});

			}

		}, {
			text : '重置',
			handler : function() {
				qForm.getForm().reset();
			}

		} ]
	});
	// 复选框
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
			  name : 'ordrId',
			   mapping : 'ORDR_ID'
			          },{
			  name : 'contrNum',
			   mapping : 'CONTR_NUM'
			          },{
			  name : 'ordrStat',
			   mapping : 'ORDR_STAT'
			          },{
			   name : 'ordrStatOra',
				mapping : 'ORDR_STAT_ORA'
					},{
			  name : 'custId',
			   mapping : 'CUST_ID'
			          },{
			  name : 'custNm',
			   mapping : 'CUST_NM'
			          },{
			  name : 'contrDt',
			   mapping : 'CONTR_DT'
			          },{
			  name : 'belgCorp',
			   mapping : 'BELG_CORP'
			          },{
			   name : 'belgCorpOra',
			  mapping : 'BELG_CORP_ORA'
			          },{
			  name : 'cur',
			   mapping : 'CUR'
			          },{
			  name : 'amt',
			   mapping : 'AMT'
			          },{
			  name : 'prepyMoneyDt',
			   mapping : 'PREPY_MONEY_DT'
			          },{
			  name : 'prepyMoneyAmt',
			   mapping : 'PREPY_MONEY_AMT'
			          },{
			  name : 'stlMode',
			   mapping : 'STL_MODE'
			          },{
			  name : 'finalTraffDay',
			   mapping : 'FINAL_TRAFF_DAY'
			          },{
			  name : 'finalTraffDetail',
			   mapping : 'FINAL_TRAFF_DETAIL'
			          },{
			  name : 'qltyTechStdReqst',
			   mapping : 'QLTY_TECH_STD_REQST'
			          },{
			  name : 'traffMode',
			   mapping : 'TRAFF_MODE'
			          },{
			  name : 'ngtvPoor',
			   mapping : 'NGTV_POOR'
			          },{
			  name : 'pkg',
			   mapping : 'PKG'
			          },{
			  name : 'hesitPrd',
			   mapping : 'HESIT_PRD'
			          },{
			  name : 'othXx',
			   mapping : 'OTH_XX'
			          },{
			  name : 'sellPrincId',
			   mapping : 'SELL_PRINC_ID'
			          },{
			  name : 'sellPrinc',
			   mapping : 'SELL_PRINC'
			          },{
			  name : 'makDocPersId',
			   mapping : 'MAK_DOC_PERS_ID'
			          },{
			  name : 'makDocPers',
			   mapping : 'MAK_DOC_PERS'
			          },{
			  name : 'chkStat',
			  mapping : 'CHK_STAT'
			          },{
			  name : 'chkStatOra',
			  mapping : 'CHK_STAT_ORA'
			          },{ 	  
			   name : 'paiChan',
			   mapping : 'SCHEDU_STATUS'
				},{	
				name : 'paiChanOra',
				mapping : 'SCHEDU_STATUS_ORA'
						},{	
			  name : 'inputPersId',
			   mapping : 'INPUT_PERS_ID'
			          },{
			  name : 'inputPersNm',
			   mapping : 'INPUT_PERS_NM'
			          },{
			  name : 'inputDt',
			   mapping : 'INPUT_DT'
			          },{
			  name : 'lastMdfrId',
			   mapping : 'LAST_MDFR_ID'
			          },{
			  name : 'lastMdfr',
			   mapping : 'LAST_MDFR'
			          },{
			  name : 'lastModiDt',
			   mapping : 'LAST_MODI_DT'

		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
//			  header : '内贸合同ID',
//			   width : 100,
//			   dataIndex : 'ordrId',
//			   sortable : true
//			          },{
			  header : '合同号',
			   width : 100,
			   dataIndex : 'contrNum',
			   sortable : true
			          },{
			  header : '订单状态',
			   width : 100,
			   dataIndex : 'ordrStatOra',
			   sortable : true
			          },{
			  header : '买方名称',
			   width : 100,
			   dataIndex : 'custNm',
			   sortable : true
			          },{
			  header : '签约日期',
			   width : 100,
			   dataIndex : 'contrDt',
			   sortable : true
			          },{
			  header : '卖方所属公司',
			   width : 100,
			   dataIndex : 'belgCorpOra',
			   sortable : true
			          },{
			  header : '币种',
			   width : 100,
			   dataIndex : 'cur',
			   sortable : true
			          },{
			  header : '金额',
			   width : 100,
			   dataIndex : 'amt',
			   sortable : true
			          },{
			  header : '预付款日期',
			   width : 100,
			   dataIndex : 'prepyMoneyDt',
			   sortable : true
			          },{
			  header : '预付款金额',
			   width : 100,
			   dataIndex : 'prepyMoneyAmt',
			   sortable : true
			          },{
			  header : '结算方式',
			   width : 100,
			   dataIndex : 'stlMode',
			   sortable : true
			          },{
			  header : '交货期',
			   width : 100,
			   dataIndex : 'finalTraffDay',
			   sortable : true
			          },{
			  header : '交货地点方式等描述',
			   width : 100,
			   dataIndex : 'finalTraffDetail',
			   sortable : true
			          },{
			  header : '质量技术标准要求',
			   width : 100,
			   dataIndex : 'qltyTechStdReqst',
			   sortable : true
			          },{
			  header : '运输方式及到达站港和费用负担',
			   width : 100,
			   dataIndex : 'traffMode',
			   sortable : true
			          },{
			  header : '合理损耗和计算方法',
			   width : 100,
			   dataIndex : 'ngtvPoor',
			   sortable : true
			          },{
			  header : '包装物的供应和回收',
			   width : 100,
			   dataIndex : 'pkg',
			   sortable : true
			          },{
			  header : '验收标准方法及提出异议期限',
			   width : 100,
			   dataIndex : 'hesitPrd',
			   sortable : true
			          },{
			  header : '其他XX',
			   width : 100,
			   dataIndex : 'othXx',
			   sortable : true
			          },{
			  header : '销售负责人编号',
			   width : 100,
			   dataIndex : 'sellPrincId',
			   sortable : true
			          },{
			  header : '销售负责人',
			   width : 100,
			   dataIndex : 'sellPrinc',
			   sortable : true
			          },{
			  header : '制单人编号',
			   width : 100,
			   dataIndex : 'makDocPersId',
			   sortable : true
			          },{
			  header : '制单人',
			   width : 100,
			   dataIndex : 'makDocPers',
			   sortable : true
			          },{
			  header : '下达状态',
			   width : 100,
			   dataIndex : 'chkStatOra',
			   sortable : true
			          },{
				header : '排产状态',
				width : 100,
				dataIndex : 'paiChanOra',
				sortable : true
			          },{
			  header : '录入人编号',
			   width : 100,
			   dataIndex : 'inputPersId',
			   sortable : true
			          },{
			  header : '录入人名称',
			   width : 100,
			   dataIndex : 'inputPersNm',
			   sortable : true
			          },{
			  header : '录入日期',
			   width : 100,
			   dataIndex : 'inputDt',
			   sortable : true
			          },{
			  header : '最后一次修改人编号',
			   width : 100,
			   dataIndex : 'lastMdfrId',
			   sortable : true
			          },{
			  header : '最后一次修改人',
			   width : 100,
			   dataIndex : 'lastMdfr',
			   sortable : true
			          },{
			  header : '最后一次修改日期',
			   width : 100,
			   dataIndex : 'lastModiDt',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInlandOrdrContrQueryAction.json'
			}),
			reader : new Ext.data.JsonReader( {
				successProperty : 'success',
				idProperty : 'ID',
				messageProperty : 'message',
				root : 'json.data',
				totalProperty : 'json.count'
			}, record)
		});

		// 每页显示条数下拉选择框
		var pagesize_combo = new Ext.form.ComboBox( {
			name : 'pagesize',
			triggerAction : 'all',
			mode : 'local',
			store : new Ext.data.ArrayStore(
					{
						fields : [ 'value', 'text' ],
						data : [ [ 10, '10条/页' ], [ 20, '20条/页' ],
								[ 50, '50条/页' ], [ 100, '100条/页' ],
								[ 250, '250条/页' ], [ 500, '500条/页' ] ]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '20',
			editable : false,
			width : 85
		});

		// 默认加载数据
		store.load( {
			params : {
				start : 0,
				limit : parseInt(pagesize_combo.getValue())
			}
		});

		// 改变每页显示条数reload数据
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(pagesize_combo.getValue()), store.reload( {
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
		});
		// 分页工具栏
		var bbar = new Ext.PagingToolbar( {
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
//form修改
								
									addXywzSaleInlandOrdrContrForm.getForm().reset();
									addXywzSaleInlandOrdrContrForm.getForm().findField('qltyTechStdReqst').setValue('按国家标准（JIS G3192）交货');
									addXywzSaleInlandOrdrContrForm.getForm().findField('traffMode').setValue('供方负责组织运输，运费由需方承担');
									addXywzSaleInlandOrdrContrForm.getForm().findField('ngtvPoor').setValue('以实际重量交货，需方承担3‰合理磅差');
									addXywzSaleInlandOrdrContrForm.getForm().findField('pkg').setValue('标准包装');
									addXywzSaleInlandOrdrContrForm.getForm().findField('hesitPrd').setValue('货到10日内，有质量异议提出');
									addXywzSaleInlandOrdrContrForm.getForm().findField('stlMode').setValue('80%，剩余货款提货时结清，以实际发生额为准。');
									
									addXywzSaleInlandOrdrContrWindow.show();
								}
							},
							'-',
							{
								text : '修改',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;

									var selectRe = grid.getSelectionModel()
											.getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
//编辑修改
										if(selectRe.data.chkStat!='0'){
											
											Ext.Msg.alert('提示','不能修改已经下达的单据!');
												return;
											}
										editXywzSaleInlandOrdrContrForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInlandOrdrContrWindow.show();

									}
								}

							},
							'-',
							{
								text : '删除',
								iconCls : 'deleteIconCss',
								handler : function() {
									var selectLength = grid.getSelectionModel().getSelections().length;
									var selectRe = grid.getSelectionModel().getSelections()[0];
									if (selectLength < 1) {
										Ext.Msg.alert('提示', '请选择需要删除的记录!');
									}else {
										if(selectRe.data.chkStat!='0'){
											
											Ext.Msg.alert('提示','不能删除已经下达的明细!');
												return;
											}
										Ext.MessageBox
												.confirm(
														'提示',
														'确定删除吗?',
														function(buttonId) {
															if (buttonId
																	.toLowerCase() == "no") {
																return;
															}
															var selectRe;
															var tempId;
															var tempCount;
															var idStr = '';
															for ( var i = 0; i < selectLength; i++) {
																selectRe = grid
																		.getSelectionModel()
																		.getSelections()[i];
//删除的ID需要修改
																tempId = selectRe.data.ordrId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInlandOrdrContrAction!batchDestroy.json?idStr='
																				+ idStr,
																		waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
																		success : function() {
																			Ext.Msg
																					.alert(
																							'提示',
																							'操作成功!');
																			store
																					.reload();
																		},
																		failure : function() {

																			Ext.Msg
																					.alert(
																							'提示',
																							'操作失败!');
																		}
																	});

														});
									}
								}
							},'-',
					        {
								text : '打印',
								iconCls:'exportIconCss',
								handler : function(button) {
									var record = grid.getSelectionModel().getSelected();
									var selectLength = grid.getSelectionModel().getSelections().length;
					      			if(record==null || record == undefined||selectLength>1){
					      				Ext.MessageBox.alert('提示','请选择一条记录.');
					      				return;
					      			}
					      			var sheetId = record.get("contrNum");
						  			window.open(basepath+"/contents/pages/xywz/sale/xywzSaleInlandOrdrContrPrint.jsp?sheetId="+sheetId,"newwindow","");
								}
							},'-',
							{
								text : '单据下达',
								iconCls : 'publishIconCss',
								handler : function() {
								var selectLength = grid.getSelectionModel().getSelections().length;
								var selectRe = grid.getSelectionModel().getSelections()[0];
								if (selectLength != 1) {
									Ext.Msg.alert('提示','请选择一条记录!');
								}else {
									
									if(selectRe.data.chkStat!='0'){
//									Ext.Msg.alert('提示',selectRe.data.ordrStat);
									Ext.Msg.alert('提示','不能重复下达!');
										return;
									}
									if(selectRe.data.ordrStat=='0'){
//										Ext.Msg.alert('提示',selectRe.data.ordrStat);
										Ext.Msg.alert('提示','合同未签是不能下达的!');
											return;
										}
									Ext.MessageBox.confirm('提示','确定下达数据吗?',function(buttonId){
									if(buttonId.toLowerCase() == "no"){
										return;
									}  
								var selectRe;
								var tempId;
								var tempCount;
								var idStr = '';
								for ( var i = 0; i < selectLength; i++) {
									selectRe = grid.getSelectionModel().getSelections()[i];
									tempId = selectRe.data.ordrId;
									idStr += tempId;
									if (i != selectLength - 1)
										idStr += ',';
									}
									Ext.Ajax.request({
											url : basepath+ '/XywzSaleInlandOrdrContrAction!updateStatus.json?idStr='+ idStr,
											waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
											success : function() {
											Ext.Msg.alert('提示', '数据下达成功!' );
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
							},'-',
							{
								text : '<font color=red>单据反下达</font>',
								iconCls : 'publishIconCss',
								handler : function() {
								var selectLength = grid.getSelectionModel().getSelections().length;
								var selectRe = grid.getSelectionModel().getSelections()[0];
								if (selectLength != 1) {
									Ext.Msg.alert('提示','请选择一条记录!');
								}else {
									if(selectRe.data.chkStat!='1'){
								
									Ext.Msg.alert('提示','没下达的单据不能反下达!');
										return;
									}

									if(selectRe.data.paiChan!='0'){
										
										Ext.Msg.alert('提示','已经【下计划\\排产\\待质检\\质检】的单据都不能反下达!');
											return;
										}
									Ext.MessageBox.confirm('提示','确定反下达此单据吗?',function(buttonId){
									if(buttonId.toLowerCase() == "no"){
										return;
									}  
								var selectRe;
								var tempId;
								var tempCount;
								var idStr = '';
								for ( var i = 0; i < selectLength; i++) {
									selectRe = grid.getSelectionModel().getSelections()[i];
									tempId = selectRe.data.ordrId;
									idStr += tempId;
									if (i != selectLength - 1)
										idStr += ',';
									}
									Ext.Ajax.request({
											url : basepath+ '/XywzSaleInlandOrdrContrAction!updateStatus.json?flag='+'fanxiada'+'&idStr='+ idStr,
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
					            url : basepath+'/XywzSaleFrgnOrdrContrQueryAction.json'
					        }),'-',{
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
										detailXywzSaleInlandOrdrContrForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInlandOrdrContrWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleInlandOrdrContrForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 150,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         {
//								        	 columnWidth : .5,
//								             layout : 'form',
//								             items : [ {
//								             xtype : 'textfield',
//								             vtype : 'trim',
//								             Width : '100',
//								             name : 'ordrId',
//								             maxLength : 200,
//								             minLength : 1, 
//								             hidden:true,
//								             anchor : '90%'
//								            } ]
//								           },{
								       		columnWidth : .5,
											layout : 'form',
											items : [ 
							                        new Ext.form.ComboBox({
														hiddenName : 'ordrStat',
														fieldLabel : '<font color=red>*</font>订单状态',
														labelStyle: 'text-align:left;',
														triggerAction : 'all',
														store : boxstore1,
														allowBlank : false,
														displayField : 'value',
														valueField : 'key',
														mode : 'local',
														forceSelection : true,
														editable:false,
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
								             name : 'contrNum',
								             fieldLabel : '<font color=red>*</font>合同号',
								             allowBlank : false,
								             blankText : '合同号不能为空',
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
									             name : 'custId',
									             fieldLabel : '买方ID',
									             hidden:true,
//									             allowBlank : false,
//									             blankText : '买方ID不能为空',
									             readOnly : true, 
									             maxLength : 200,
									             minLength : 1,
									             anchor : '90%'
									            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.CustomerInfoQuery(
									 					{
															fieldLabel : '<font color=red>*</font>买方名',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'custNm',
															id : 'CUST_ID11',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('CUST_ID11').oCustomerQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('CUST_ID11').setValue(records[0].data.CUST_SHT_NM);
																addXywzSaleInlandOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
																
															}
														})]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'datefield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'contrDt',
								             fieldLabel : '<font color=red>*</font>签约日期',
								             allowBlank : false,
								             blankText : '签约日期不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             format:'Y-m-d'
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ new Ext.form.ComboBox({
								       	             hiddenName : 'belgCorp',
								    				 fieldLabel : '<font color=red>*</font>卖方所属公司',
								    				 labelStyle: 'text-align:left;',
								    				 triggerAction : 'all',
								    				 store : boxstore4,
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
								         	             hiddenName : 'cur',
								   					 fieldLabel : '<font color=red>*</font>币种',
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
								                 items : [ {
								                 xtype : 'textfield',
								                 vtype : 'trim',
								                 Width : '100',
								                 name : 'amt',
								                 fieldLabel : '<font color=red>*</font>合同金额',
								                 allowBlank : false,
								                 blankText : '合同金额不能为空',
								                 maxLength : 200,
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
								                 name : 'prepyMoneyDt',
								                 fieldLabel : '预付款日期',
//								                 allowBlank : false,
//								                 blankText : '预付款日期不能为空',
								                 maxLength : 200,
								                 minLength : 1,
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
								                 name : 'prepyMoneyAmt',
								                 fieldLabel : '预付款金额',
//								                 allowBlank : false,
//								                 blankText : '预付款金额不能为空',
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
								                 name : 'stlMode',
								                 fieldLabel : '结算方式',
//								                 allowBlank : false,
//								                 blankText : '结算方式不能为空',
								                 maxLength : 200,
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
								                 name : 'finalTraffDay',
								                 fieldLabel : '<font color=red>*</font>交货期',
								                 allowBlank : false,
								                 blankText : '交货期不能为空',
								                 maxLength : 200,
								                 minLength : 1,
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
								                 name : 'finalTraffDetail',
								                 fieldLabel : '交货地点方式等描述',
//								                 allowBlank : false,
//								                 blankText : '交货地点方式等描述不能为空',
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
								                 name : 'qltyTechStdReqst',
								                 fieldLabel : '质量技术标准要求',
//								                 allowBlank : false,
//								                 blankText : '质量技术标准要求不能为空',
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
								                 name : 'traffMode',
								                 fieldLabel : '运输方式及费用描述',
//								                 allowBlank : false,
//								                 blankText : '运输方式及到达站港和费用负担不能为空',
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
								                 name : 'ngtvPoor',
								                 fieldLabel : '合理损耗和计算方法',
//								                 allowBlank : false,
//								                 blankText : '合理损耗和计算方法不能为空',
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
								                 name : 'pkg',
								                 fieldLabel : '包装描述',
//								                 allowBlank : false,
//								                 blankText : '包装标准不能为空',
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
								                 name : 'hesitPrd',
								                 fieldLabel : '验收标准及异议期描述',
//								                 allowBlank : false,
//								                 blankText : '验收标准方法及提出异议期限不能为空',
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
								             name : 'othXx',
								             fieldLabel : '其他',
//								             allowBlank : false,
//								             blankText : '其他不能为空',
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
								               name : 'sellPrincId',
								               hidden:true,
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								             },{
//								          
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.UserManagerIdQuery(
										   					{
										  						fieldLabel : '<font color=red>*</font>销售负责人',
										  						labelStyle : 'text-align:left;',
										  						//labelWidth : 100,
										  						name : 'sellPrinc',
										  						id : 'SELL_PRINC_ID11',
										  						singleSelected : false,
										  						// 单选复选标志
										  						editable : false,
										  						allowBlank : false,
										  						// 不允许为空
										  						blankText : "不能为空，请填写",
										  						anchor : '90%',
										  						callback : function(a, b) {
										  							var records = Ext.getCmp('SELL_PRINC_ID11').oCustomerQueryGrid.getSelectionModel().selections.items;
										  							Ext.getCmp('SELL_PRINC_ID11').setValue(records[0].data.USER_NAME);
										  							addXywzSaleInlandOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
//										  							addXywzSaleInlandOrdrContrForm.getForm().findField('filecontact').setValue(records[0].data.EMAIL);
										  						}
										  					}) ]
									           },{ 							           
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.UserManagerIdQuery(
										   					{
										   						fieldLabel : '<font color=red>*</font>制单人',
										  						labelStyle : 'text-align:left;',
										  						//labelWidth : 100,
										  						name : 'makDocPers',
										  						id : 'MAK_DOC_PERS_ID11',
										  						singleSelected : false,
										  						// 单选复选标志
										  						editable : false,
										  						allowBlank : false,
										  						// 不允许为空
										  						blankText : "不能为空，请填写",
										  						anchor : '90%',
										  						callback : function(a, b) {
										  							var records = Ext.getCmp('MAK_DOC_PERS_ID11').oCustomerQueryGrid.getSelectionModel().selections.items;
										  							Ext.getCmp('MAK_DOC_PERS_ID11').setValue(records[0].data.USER_NAME);
										  							addXywzSaleInlandOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
										  						}
										  					}) ]
									           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									             xtype : 'textfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'makDocPersId',
									             fieldLabel : '<font color=red>*</font>制单人编号',
									             hidden:true,
									             readOnly : true,
									             allowBlank : false,
									             blankText : "不能为空，请填写",
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
									               name : 'chkStat',
									               fieldLabel : '下达状态',
									               hidden:true,
									               maxLength : 200,
									               minLength : 1,
									               anchor : '90%'
									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'textfield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'inputPersId',
//									               fieldLabel : '录入人编号',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%'
//									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'textfield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'inputPersNm',
//									               fieldLabel : '录入人名称',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%'
//									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'datefield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'inputDt',
//									               fieldLabel : '录入日期',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%',
//									               format:'Y-m-d'
//									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'textfield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'lastMdfrId',
//									               fieldLabel : '最后一次修改人编号',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%'
//									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'textfield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'lastMdfr',
//									               fieldLabel : '最后一次修改人',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%'
//									              } ]
//									             },{
//									              columnWidth : .5,
//									               layout : 'form',
//									               items : [ {
//									               xtype : 'datefield',
//									               vtype : 'trim',
//									               Width : '100',
//									               name : 'lastModiDt',
//									               fieldLabel : '最后一次修改日期',
//									               hidden:true,
//									               maxLength : 200,
//									               minLength : 1,
//									               anchor : '90%',
//									               format:'Y-m-d'
//									              } ]
									            
									            }]
							},

							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
//ADDform
												if (!addXywzSaleInlandOrdrContrForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandOrdrContrAction.json',
															method : 'POST',
															form : addXywzSaleInlandOrdrContrForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												addXywzSaleInlandOrdrContrWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInlandOrdrContrWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleInlandOrdrContrForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 300,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         {
								        	 columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'ordrId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{
								       		columnWidth : .5,
											layout : 'form',
											items : [ 
							                        new Ext.form.ComboBox({
														hiddenName : 'ordrStat',
														fieldLabel : '<font color=red>*</font>订单状态',
														labelStyle: 'text-align:left;',
														triggerAction : 'all',
														store : boxstore1,
														allowBlank : false,
														displayField : 'value',
														valueField : 'key',
														mode : 'local',
														forceSelection : true,
														editable:false,
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
								             name : 'contrNum',
								             fieldLabel : '<font color=red>*</font>合同号',
								             allowBlank : false,
								             blankText : '合同号不能为空',
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
									             name : 'custId',
									             fieldLabel : '买方ID',
									             hidden:true,
//									             allowBlank : false,
//									             blankText : '买方ID不能为空',
									             readOnly : true, 
									             maxLength : 200,
									             minLength : 1,
									             anchor : '90%'
									            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ new Com.xywz.common.CustomerInfoQuery(
									 					{
															fieldLabel : '<font color=red>*</font>买方名',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'custNm',
															id : 'CUST_ID22',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('CUST_ID22').oCustomerQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('CUST_ID22').setValue(records[0].data.CUST_SHT_NM);
																addXywzSaleInlandOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
																
															}
														})]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'datefield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'contrDt',
								             fieldLabel : '<font color=red>*</font>签约日期',
								             allowBlank : false,
								             blankText : '签约日期不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             format:'Y-m-d'
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ new Ext.form.ComboBox({
								       	             hiddenName : 'belgCorp',
								    				 fieldLabel : '<font color=red>*</font>卖方所属公司',
								    				 labelStyle: 'text-align:left;',
								    				 triggerAction : 'all',
								    				 store : boxstore4,
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
								         	             hiddenName : 'cur',
								   					 fieldLabel : '<font color=red>*</font>币种',
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
								                 items : [ {
								                 xtype : 'textfield',
								                 vtype : 'trim',
								                 Width : '100',
								                 name : 'amt',
								                 fieldLabel : '<font color=red>*</font>合同金额',
								                 allowBlank : false,
								                 blankText : '合同金额不能为空',
								                 maxLength : 200,
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
								                 name : 'prepyMoneyDt',
								                 fieldLabel : '预付款日期',
//								                 allowBlank : false,
//								                 blankText : '预付款日期不能为空',
								                 maxLength : 200,
								                 minLength : 1,
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
								                 name : 'prepyMoneyAmt',
								                 fieldLabel : '预付款金额',
//								                 allowBlank : false,
//								                 blankText : '预付款金额不能为空',
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
								                 name : 'stlMode',
								                 fieldLabel : '结算方式',
//								                 allowBlank : false,
//								                 blankText : '结算方式不能为空',
								                 maxLength : 200,
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
								                 name : 'finalTraffDay',
								                 fieldLabel : '<font color=red>*</font>交货期',
								                 allowBlank : false,
								                 blankText : '交货期不能为空',
								                 maxLength : 200,
								                 minLength : 1,
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
								                 name : 'finalTraffDetail',
								                 fieldLabel : '交货地点方式等描述',
//								                 allowBlank : false,
//								                 blankText : '交货地点方式等描述不能为空',
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
								                 name : 'qltyTechStdReqst',
								                 fieldLabel : '质量技术标准要求',
//								                 allowBlank : false,
//								                 blankText : '质量技术标准要求不能为空',
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
								                 name : 'traffMode',
								                 fieldLabel : '运输方式及费用描述',
//								                 allowBlank : false,
//								                 blankText : '运输方式及到达站港和费用负担不能为空',
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
								                 name : 'ngtvPoor',
								                 fieldLabel : '合理损耗和计算方法',
//								                 allowBlank : false,
//								                 blankText : '合理损耗和计算方法不能为空',
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
								                 name : 'pkg',
								                 fieldLabel : '包装描述',
//								                 allowBlank : false,
//								                 blankText : '包装标准不能为空',
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
								                 name : 'hesitPrd',
								                 fieldLabel : '验收标准及异议期描述',
//								                 allowBlank : false,
//								                 blankText : '验收标准方法及提出异议期限不能为空',
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
								             name : 'othXx',
								             fieldLabel : '其他',
//								             allowBlank : false,
//								             blankText : '其他不能为空',
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
								               name : 'sellPrincId',
								               hidden:true,
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								             },{
//								          
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.UserManagerIdQuery(
										   					{
										  						fieldLabel : '<font color=red>*</font>销售负责人',
										  						labelStyle : 'text-align:left;',
										  						//labelWidth : 100,
										  						name : 'sellPrinc',
										  						id : 'SELL_PRINC_ID22',
										  						singleSelected : false,
										  						// 单选复选标志
										  						editable : false,
										  						allowBlank : false,
										  						// 不允许为空
										  						blankText : "不能为空，请填写",
										  						anchor : '90%',
										  						callback : function(a, b) {
										  							var records = Ext.getCmp('SELL_PRINC_ID22').oCustomerQueryGrid.getSelectionModel().selections.items;
										  							Ext.getCmp('SELL_PRINC_ID22').setValue(records[0].data.USER_NAME);
										  							addXywzSaleInlandOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
//										  							addXywzSaleInlandOrdrContrForm.getForm().findField('filecontact').setValue(records[0].data.EMAIL);
										  						}
										  					}) ]
									           },{ 							           
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.UserManagerIdQuery(
										   					{
										   						fieldLabel : '<font color=red>*</font>制单人',
										  						labelStyle : 'text-align:left;',
										  						//labelWidth : 100,
										  						name : 'makDocPers',
										  						id : 'MAK_DOC_PERS_ID22',
										  						singleSelected : false,
										  						// 单选复选标志
										  						editable : false,
										  						allowBlank : false,
										  						// 不允许为空
										  						blankText : "不能为空，请填写",
										  						anchor : '90%',
										  						callback : function(a, b) {
										  							var records = Ext.getCmp('MAK_DOC_PERS_ID22').oCustomerQueryGrid.getSelectionModel().selections.items;
										  							Ext.getCmp('MAK_DOC_PERS_ID22').setValue(records[0].data.USER_NAME);
										  							addXywzSaleInlandOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
										  						}
										  					}) ]
									           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									             xtype : 'textfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'makDocPersId',
									             fieldLabel : '<font color=red>*</font>制单人编号',
									             hidden:true,
									             readOnly : true,
									             allowBlank : false,
									             blankText : "不能为空，请填写",
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
									               name : 'chkStat',
									               fieldLabel : '下达状态',
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
									               name : 'inputPersId',
									               fieldLabel : '录入人编号',
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
									               name : 'inputPersNm',
									               fieldLabel : '录入人名称',
									               hidden:true,
									               maxLength : 200,
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
									               name : 'inputDt',
									               fieldLabel : '录入日期',
									               hidden:true,
									               maxLength : 200,
									               minLength : 1,
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
									               name : 'lastMdfrId',
									               fieldLabel : '最后一次修改人编号',
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
									               name : 'lastMdfr',
									               fieldLabel : '最后一次修改人',
									               hidden:true,
									               maxLength : 200,
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
									               name : 'lastModiDt',
									               fieldLabel : '最后一次修改日期',
									               hidden:true,
									               maxLength : 200,
									               minLength : 1,
									               anchor : '90%',
									               format:'Y-m-d'
									              } ]
										} ]
							},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
												if (!editXywzSaleInlandOrdrContrForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandOrdrContrAction.json',
															method : 'POST',
															form : editXywzSaleInlandOrdrContrForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												editXywzSaleInlandOrdrContrWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInlandOrdrContrWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleInlandOrdrContrForm = new Ext.form.FormPanel({
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
				             name : 'ordrId',
				             maxLength : 200,
				             minLength : 1, 
				             
				             anchor : '90%'
				            } ]
				           },{
				       		columnWidth : .5,
							layout : 'form',
							items : [ 
			                        new Ext.form.ComboBox({
										hiddenName : 'ordrStat',
										fieldLabel : '<font color=red>*</font>订单状态',
										labelStyle: 'text-align:left;',
										triggerAction : 'all',
										store : boxstore1,
										allowBlank : false,
										displayField : 'value',
										valueField : 'key',
										mode : 'local',
										forceSelection : true,
										editable:false,
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
				             name : 'contrNum',
				             fieldLabel : '<font color=red>*</font>合同号',
				             allowBlank : false,
				             blankText : '合同号不能为空',
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
					             name : 'custId',
					             fieldLabel : '买方ID',
					             hidden:true,
//					             allowBlank : false,
//					             blankText : '买方ID不能为空',
					             readOnly : true, 
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ new Com.xywz.common.CustomerInfoQuery(
					 					{
											fieldLabel : '<font color=red>*</font>买方名',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'custNm',
											id : 'CUST_ID33',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('CUST_ID33').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('CUST_ID33').setValue(records[0].data.CUST_SHT_NM);
												addXywzSaleInlandOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
												
											}
										})]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'datefield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'contrDt',
				             fieldLabel : '<font color=red>*</font>签约日期',
				             allowBlank : false,
				             blankText : '签约日期不能为空',
				             maxLength : 200,
				             minLength : 1,
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
				               name : 'belgCorp',
				               fieldLabel : '<font color=red>*</font>卖方所属公司',
				               allowBlank : false,
				               blankText : '卖方所属公司不能为空',
				               maxLength : 200,
				               minLength : 1,
				               anchor : '90%'
				              } ]
				             },{
				            	    columnWidth : .5,
				   	             layout : 'form',
				   	             items : [ new Ext.form.ComboBox({
				         	             hiddenName : 'cur',
				   					 fieldLabel : '<font color=red>*</font>币种',
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
				                 items : [ {
				                 xtype : 'textfield',
				                 vtype : 'trim',
				                 Width : '100',
				                 name : 'amt',
				                 fieldLabel : '合同金额',
//				                 allowBlank : false,
//				                 blankText : '合同金额不能为空',
				                 maxLength : 200,
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
				                 name : 'prepyMoneyDt',
				                 fieldLabel : '预付款日期',
//				                 allowBlank : false,
//				                 blankText : '预付款日期不能为空',
				                 maxLength : 200,
				                 minLength : 1,
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
				                 name : 'prepyMoneyAmt',
				                 fieldLabel : '预付款金额',
//				                 allowBlank : false,
//				                 blankText : '预付款金额不能为空',
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
				                 name : 'stlMode',
				                 fieldLabel : '结算方式',
//				                 allowBlank : false,
//				                 blankText : '结算方式不能为空',
				                 maxLength : 200,
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
				                 name : 'finalTraffDay',
				                 fieldLabel : '交货期',
//				                 allowBlank : false,
//				                 blankText : '交货期不能为空',
				                 maxLength : 200,
				                 minLength : 1,
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
				                 name : 'finalTraffDetail',
				                 fieldLabel : '交货地点方式等描述',
//				                 allowBlank : false,
//				                 blankText : '交货地点方式等描述不能为空',
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
				                 name : 'qltyTechStdReqst',
				                 fieldLabel : '质量技术标准要求',
//				                 allowBlank : false,
//				                 blankText : '质量技术标准要求不能为空',
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
				                 name : 'traffMode',
				                 fieldLabel : '运输方式及到达站港和费用负担',
//				                 allowBlank : false,
//				                 blankText : '运输方式及到达站港和费用负担不能为空',
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
				                 name : 'ngtvPoor',
				                 fieldLabel : '合理损耗和计算方法',
//				                 allowBlank : false,
//				                 blankText : '合理损耗和计算方法不能为空',
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
				                 name : 'pkg',
				                 fieldLabel : '包装描述',
//				                 allowBlank : false,
//				                 blankText : '包装标准不能为空',
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
				                 name : 'hesitPrd',
				                 fieldLabel : '验收标准方法及提出异议期限',
//				                 allowBlank : false,
//				                 blankText : '验收标准方法及提出异议期限不能为空',
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
				             name : 'othXx',
				             fieldLabel : '其他',
//				             allowBlank : false,
//				             blankText : '其他不能为空',
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
				               name : 'sellPrincId',
				               
				               maxLength : 200,
				               minLength : 1,
				               anchor : '90%'
				              } ]
				             },{
//				          
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Com.xywz.common.UserManagerIdQuery(
						   					{
						  						fieldLabel : '<font color=red>*</font>销售负责人',
						  						labelStyle : 'text-align:left;',
						  						//labelWidth : 100,
						  						name : 'sellPrinc',
						  						id : 'SELL_PRINC_ID33',
						  						singleSelected : false,
						  						// 单选复选标志
						  						editable : false,
//						  						allowBlank : false,
						  						// 不允许为空
//						  						blankText : "不能为空，请填写",
						  						anchor : '90%',
						  						callback : function(a, b) {
						  							var records = Ext.getCmp('SELL_PRINC_ID33').oCustomerQueryGrid.getSelectionModel().selections.items;
						  							Ext.getCmp('SELL_PRINC_ID33').setValue(records[0].data.USER_NAME);
						  							addXywzSaleInlandOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
//						  							addXywzSaleInlandOrdrContrForm.getForm().findField('filecontact').setValue(records[0].data.EMAIL);
						  						}
						  					}) ]
					           },{ 							           
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Com.xywz.common.UserManagerIdQuery(
						   					{
						   						fieldLabel : '<font color=red>*</font>制单人',
						  						labelStyle : 'text-align:left;',
						  						//labelWidth : 100,
						  						name : 'makDocPers',
						  						id : 'MAK_DOC_PERS_ID33',
						  						singleSelected : false,
						  						// 单选复选标志
						  						editable : false,
//						  						allowBlank : false,
//						  						// 不允许为空
//						  						blankText : "不能为空，请填写",
						  						anchor : '90%',
						  						callback : function(a, b) {
						  							var records = Ext.getCmp('MAK_DOC_PERS_ID33').oCustomerQueryGrid.getSelectionModel().selections.items;
						  							Ext.getCmp('MAK_DOC_PERS_ID33').setValue(records[0].data.USER_NAME);
						  							addXywzSaleInlandOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
						  						}
						  					}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'makDocPersId',
					             fieldLabel : '制单人编号',
					             hidden:true,
					             readOnly : true,
					             allowBlank : false,
					             blankText : "不能为空，请填写",
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
					               name : 'chkStat',
					               fieldLabel : '<font color=red>*</font>下达状态',
					               allowBlank : false,
					               blankText : '下达状态不能为空',
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
					               name : 'inputPersId',
					               fieldLabel : '录入人编号',
					              
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
					               name : 'inputPersNm',
					               fieldLabel : '录入人名称',
					               
					               maxLength : 200,
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
					               name : 'inputDt',
					               fieldLabel : '录入日期',
					               
					               maxLength : 200,
					               minLength : 1,
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
					               name : 'lastMdfrId',
					               fieldLabel : '最后一次修改人编号',
					               
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
					               name : 'lastMdfr',
					               fieldLabel : '最后一次修改人',
					               
					               maxLength : 200,
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
					               name : 'lastModiDt',
					               fieldLabel : '最后一次修改日期',					               
					               maxLength : 200,
					               minLength : 1,
					               anchor : '90%',
					               format:'Y-m-d'
					              } ]
					 } ]
			}, {
				layout : 'form',
				buttonAlign : 'center',

				buttons : [
				    {
					text : '返  回',
					handler : function() {
				    	detailXywzSaleInlandOrdrContrWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleInlandOrdrContrWindow = new Ext.Window( {
			title : '内贸订单合同信息新增',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 410,
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
			items : [ addXywzSaleInlandOrdrContrForm ]
		});

		// 定义修改窗口
		var editXywzSaleInlandOrdrContrWindow = new Ext.Window( {
			title : '内贸订单合同信息修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 410,
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
			items : [ editXywzSaleInlandOrdrContrForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleInlandOrdrContrWindow = new Ext.Window({
			title : '内贸订单合同信息预览',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 410,
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
			items : [ detailXywzSaleInlandOrdrContrForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '内贸订单合同信息列表',
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
		var viewport = new Ext.Viewport( {
			layout : 'fit',
			items : [ {
				layout : 'border',
				items : [ qForm, grid ]
			} ]
		});

	});