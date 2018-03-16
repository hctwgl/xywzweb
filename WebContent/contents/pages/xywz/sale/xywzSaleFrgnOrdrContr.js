//外贸订单合同状态
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
			url :basepath+'/lookup.json?name=XYWZ_ORDR_STAT'   //订单状态
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
	var boxstore3 = new Ext.data.Store({  
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
	
	var boxstore5 = new Ext.data.Store({  
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
	//成交方式 选择数据集
	var boxstore6 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_BRGN_MODE'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	//成交方式 选择数据集
	var boxstore7 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_TX_TYP'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});

	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "外贸订单合同信息",
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
							//  allowBlank : false,
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
			  }, { 
			   name : 'ordrStat',
			   mapping : 'ORDR_STAT'
			  }, { 
			   name : 'ordrStatOra',
			   mapping : 'ORDR_STAT_ORA'
			  }, { 
			   name : 'signDt',
			   mapping : 'SIGN_DT'
			  }, { 
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, { 
			   name : 'custId',
			   mapping : 'CUST_ID'
			  },
			  {
				name : 'custShtNm',
				mapping : 'CUST_SHT_NM'
			  },{ 
			   name : 'cur',
			   mapping : 'CUR'
			  }, { 
			   name : 'curOra',
			   mapping : 'CUR_ORA'
			   }, { 
			   name : 'amt',
			   mapping : 'AMT'
			  },{ 
			   name : 'brgnMode',
			   mapping : 'BRGN_MODE'
			  },{ 
			   name : 'brgnModeOra',
			   mapping : 'BRGN_MODE_ORA'
			  },{ 
				  name : 'brgnModeDetail',
				   mapping : 'BRGN_MODE_DETAIL'
				          },{
			   name : 'nextPlanSnglDt',
			   mapping : 'NEXT_PLAN_SNGL_DT'
			  }, { 
				name : 'payCode',
			    mapping : 'PAY_CODE'			   
			  },{
				name : 'payCodeOra',
				mapping : 'PAY_CODE_ORA'
			  },{
			   name : 'payMd',
			   mapping : 'PAY_MD'
			  }, { 
				   name : 'ngtvPoor',
				   mapping : 'NGTV_POOR'
			  },{
				   name : 'pkg',
				   mapping : 'PKG'
			  },{ 
			   name : 'isNtRecvLc',
			   mapping : 'IS_NT_RECV_LC'
			  },{ 
				   name : 'isNtRecvLcOra',
				   mapping : 'IS_NT_RECV_LC_ORA'
				  }, { 
			   name : 'lcNum',
			   mapping : 'LC_NUM'
			  }, { 
			   name : 'prepyMoneyDt',
			   mapping : 'PREPY_MONEY_DT'
			  }, { 
			   name : 'prepyMoneyAmt',
			   mapping : 'PREPY_MONEY_AMT'
			  }, { 
			   name : 'finalTraffDay',
			   mapping : 'FINAL_TRAFF_DAY'
			  }, { 
			   name : 'finalTraffDetail',
			   mapping : 'FINAL_TRAFF_DETAIL'
			   },{
			   name : 'portofDischarge',
			   mapping : 'PORTOF_DISCHARGE'
			  },{ 
			   name : 'loadTraffPort',
			   mapping : 'LOAD_TRAFF_PORT'
			  },{ 
				   name : 'loadTraffPortcn',
				   mapping : 'LOAD_TRAFF_PORT_CN'
			  }, { 
				   name : 'shippingmarks',
				   mapping : 'SHIPPINGMARKS'
			      },{ 
			   name : 'sendTagDt',
			   mapping : 'SEND_TAG_DT'
			  }, { 
			   name : 'isAlterCert',
			   mapping : 'IS_ALTER_CERT'
			  }, { 
				   name : 'isAlterCertOra',
				   mapping : 'IS_ALTER_CERT_ORA'
				  }, { 
			   name : 'sellPrincId',
			   mapping : 'SELL_PRINC_ID'
			  }, { 
			   name : 'makDocPersId',
			   mapping : 'MAK_DOC_PERS_ID'
			  },{ 
			   name : 'ordrBelgZone',
			   mapping : 'ORDR_BELG_ZONE'
			  }, { 
			   name : 'belgCorp',
			   mapping : 'BELG_CORP'
			  }, { 
				   name : 'belgCorpOra',
				   mapping : 'BELG_CORP_ORA'
			},{
				  name : 'portofDischargecn',
				  mapping : 'PORTOF_DISCHARGE_CN'
			  },{
					name : 'sellPrinc',
					mapping : 'SELL_PRINC'
			  },{ 
				   name : 'makDocPers',
				   mapping : 'MAK_DOC_PERS'
			  },{    
				   name : 'chkStat',
				   mapping : 'CHK_STAT'
			  },{   
				  name : 'advisBank',
				   mapping : 'ADVIS_BANK'
			  },{   
				name : 'fullname',
				mapping : 'ADVIS_BANK'
			},{
				  name : 'moreOrLess',
				   mapping : 'MORE_OR_LESS'
			},{
				  name : 'needDoc',
				   mapping : 'NEED_DOC'
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
				  name : 'merchdNm',
				   mapping : 'MERCHD_NM'
				          },{
				  name : 'memo',
				   mapping : 'MEMO'
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

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, 
 
		     { 
			   header : '订单状态',
			   width : 100,
			   dataIndex : 'ordrStatOra',
			   sortable : true
			  }, { 
			   header : '签订日期',
			   width : 100,
			   dataIndex : 'signDt',
			   sortable : true
			  }, { 
			   header : '合同号',
			   width : 100,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '客户简称',
			   width : 100,
			   dataIndex : 'custShtNm',
			   sortable : true
			  }, { 
			   header : '币种',
			   width : 100,
			   dataIndex : 'curOra',
			   sortable : true
			  }, { 
			   header : '金额',
			   width : 100,
			   dataIndex : 'amt',
			   sortable : true
			  }, { 
			   header : '成交方式',
			   width : 100,
			   dataIndex : 'brgnModeOra',
			   sortable : true
			  }, { 
				  header : '成交方式描述',
				   width : 100,
				   dataIndex : 'brgnModeDetail',
				   sortable : true
			 },{
			   header : '下计划单日期',
			   width : 100,
			   dataIndex : 'nextPlanSnglDt',
			   sortable : true
			  }, { 
				  header : '付款方式代码',
				   width : 210,
				   dataIndex : 'payCodeOra',
				   sortable : true
			 },{	
			   header : '付款方式',
			   width : 100,
			   dataIndex : 'payMd',
			   sortable : true
			  }, { 
			   header : '是否收到信用证',
			   width : 100,
			   dataIndex : 'isNtRecvLcOra',
			   sortable : true
			  }, { 
			   header : '信用证号',
			   width : 100,
			   dataIndex : 'lcNum',
			   sortable : true
			  }, { 
			   header : '预付款日期',
			   width : 100,
			   dataIndex : 'prepyMoneyDt',
			   sortable : true
			  }, { 
			   header : '预付款金额',
			   width : 100,
			   dataIndex : 'prepyMoneyAmt',
			   sortable : true
			  }, { 
			   header : '最后装运日',
			   width : 100,
			   dataIndex : 'finalTraffDay',
			   sortable : true
			  },{ 
				   header : '最后装运日描述',
				   width : 210,
				   dataIndex : 'finalTraffDetail',
				   sortable : true
			  },{
				 header : '装运港',
				 width : 100,
				 dataIndex : 'loadTraffPortcn',
				 sortable : true
			  }, { 
			   header : '目的港',
			   width : 100,
			   dataIndex : 'portofDischargecn',
			   sortable : true
			  },{ 
				   header : '合同负差描述',
				   width : 100,
				   dataIndex : 'ngtvPoor',
				   sortable : true
			  }, { 
				   header : '包装描述',
				   width : 100,
				   dataIndex : 'pkg',
				   sortable : true
			  }, { 
				   header : '唛头',
				   width : 210,
				   dataIndex : 'shippingmarks',
				   sortable : true

			  },{ 
				   header : '发标签日期',
				   width : 100,
				   dataIndex : 'sendTagDt',
				   sortable : true
			  }, { 
			   header : '是否改证',
			   width : 100,
			   dataIndex : 'isAlterCertOra',
			   sortable : true
			  }, { 
			   header : '销售负责人',
			   width : 100,
			   dataIndex : 'sellPrinc',
			   sortable : true
			  }, { 
			   header : '制单人',
			   width : 100,
			   dataIndex : 'makDocPers',
			   sortable : true
			  },{ 
			   header : '卖方所属公司',
			   width : 100,
			   dataIndex : 'belgCorpOra',
			   sortable : true
			  }, { 
				  header : '通知行',
				   width : 210,
				   dataIndex : 'advisBank',
				   sortable : true
				          },{
				  header : '溢短装',
				   width : 210,
				   dataIndex : 'moreOrLess',
				   sortable : true
				          },{
				  header : '所须单证',
				   width : 210,
				   dataIndex : 'needDoc',
				   sortable : true
				          },{
				   header : '数据下达状态',
				   width : 100,
				   dataIndex : 'chkStatOra',
				   sortable : true
				          },{
				        	  header : '商品名称描述',
				        	   width : 100,
				        	   dataIndex : 'merchdNm',
				        	   sortable : true
				        	          },{
				        	  header : '备注',
				        	   width : 100,
				        	   dataIndex : 'memo',
				        	   sortable : true
				        	          },{
							   header : '排产状态',
							   width : 100,
							   dataIndex : 'paiChanOra',
							   sortable : true
				          },{
				        	    header : '录入人编号',
				        	    width : 210,
				        	    dataIndex : 'inputPersId',
				        	    sortable : true
				        	           },{
				        	   header : '录入人名称',
				        	    width : 210,
				        	    dataIndex : 'inputPersNm',
				        	    sortable : true
				        	           },{
				        	   header : '录入日期',
				        	    width : 210,
				        	    dataIndex : 'inputDt',
				        	    sortable : true
				        	           },{
				        	   header : '最后一次修改人编号',
				        	    width : 210,
				        	    dataIndex : 'lastMdfrId',
				        	    sortable : true
				        	           },{
				        	   header : '最后一次修改人',
				        	    width : 210,
				        	    dataIndex : 'lastMdfr',
				        	    sortable : true
				        	           },{
				        	   header : '最后一次修改日期',
				        	    width : 210,
				        	    dataIndex : 'lastModiDt',
				        	    sortable : true
		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
/**json修改*/
				url : basepath + '/XywzSaleFrgnOrdrContrQueryAction.json'
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
							   addXywzSaleFrgnOrdrContrForm.getForm().reset();
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('payMd').setValue('IRREVOCABLE AND NONTRANSFERABLE L/C PAYABLE AT SIGHT\n买方要在2016年7月15日前开出一张不可撤销不可转让信用证\nTHE BUYER MUST OPEN L/C BEFORE 15 JULY,2015');
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('needDoc').setValue('-Commercial Invoice\n-Full Set (3/3) Clean on Board B/L\n-Packing List\n-Mill Test Certificate\n-Certificate of Origin');
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('pkg').setValue('MILLS STANDARD EXPORT PACKING,MAX 5MT/BUNDLE.');
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('finalTraffDetail').setValue('最后装运期2016年4月30日,散货/集装箱  \n LASTEST SHIPMENT DATE TO BE APR 30,2016 BY BREAK BULK/CONTAINER.');
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('moreOrLess').setValue('Shipment Quantity/Amount +/-10% More or Less Allowed');
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('ngtvPoor').setValue('理重交货，允许负差 -8% ~ -10% \nTHEORETICAL WEIGHT BASIS,WEIGHT TOLERANCE -8% ~ -10%' );
							   addXywzSaleFrgnOrdrContrForm.getForm().findField('shippingmarks').setValue('AS BUYER REQUEST');
							   Ext.getCmp('PORT_NAME33').setValue('ANY PORT ,CHINA');
	    					   addXywzSaleFrgnOrdrContrForm.getForm().findField('loadTraffPort').setValue(parseInt('11000051'));
	    					   addXywzSaleFrgnOrdrContrForm.getForm().findField('prepyMoneyAmt').setValue(parseInt('0'));
	    					   addXywzSaleFrgnOrdrContrForm.getForm().findField('amt').setValue(parseInt('0'));
							   addXywzSaleFrgnOrdrContrWindow.show();
									
									
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
										
										
										editXywzSaleFrgnOrdrContrForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleFrgnOrdrContrWindow.show();

									}
								}

							},
							'-',
							{
								text : '删除',
								iconCls : 'deleteIconCss',
								handler : function() {
									var selectLength = grid.getSelectionModel()
											.getSelections().length;
									
							var selectRe = grid.getSelectionModel()
									.getSelections()[0];
									if (selectLength < 1) {
										Ext.Msg.alert('提示', '请选择需要删除的记录!');
									}

									else {
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
																				+ '/XywzSaleFrgnOrdrContrAction!batchDestroy.json?idStr='
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
							},'-',{
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
						  			window.open(basepath+"/contents/pages/xywz/sale/xywzSaleFrgnOrdrContrPrint.jsp?sheetId="+sheetId,"newwindow","");
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
											url : basepath+ '/XywzSaleFrgnOrdrContrAction!updateStatus.json?idStr='+ idStr,
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
											url : basepath+ '/XywzSaleFrgnOrdrContrAction!updateStatus.json?flag='+'fanxiada'+'&idStr='+ idStr,
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
										detailXywzSaleFrgnOrdrContrForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleFrgnOrdrContrWindow.show();
									}
								}
							}
							
							]
				});

		// 新增窗口展示的from
		var addXywzSaleFrgnOrdrContrForm = new Ext.form.FormPanel(
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
            xtype : 'datefield',
            vtype : 'trim',
            Width : '100',
            name : 'signDt',
            fieldLabel : '<font color=red>*</font>签订日期',
            allowBlank : false,
            editable:false,
            blankText : '签订日期不能为空',
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
            name : 'contrNum',
            fieldLabel : '<font color=red>*</font>合同号',
            allowBlank : false,
            blankText : '合同号不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%'
           } ]
          },
          { 
        	    columnWidth : .5,
        	    layout : 'form',
        	    items : [ {
        	    xtype : 'textfield',
        	    vtype : 'trim',
        	    Width : '100',
        	    name : 'custId',
        	    fieldLabel : '客户ID',
        	    hidden : true,
        	    blankText : '客户ID不能为空',
        	    maxLength : 200,
        	    minLength : 1,
        	    anchor : '90%'
        	   } ]
        	  },{ 
            columnWidth : .5,
            layout : 'form',
            
            items : [ new Com.xywz.common.CustomerInfoQuery(
					{
						fieldLabel : '<font color=red>*</font>客户名称',
						labelStyle : 'text-align:left;',
						//labelWidth : 100,
						name : 'custShtNm',
						id : 'CUST_SHT_NM',
						singleSelected : false,
						// 单选复选标志
						editable : false,
						allowBlank : false,
						// 不允许为空
						blankText : "不能为空，请填写",
						anchor : '90%',
						callback : function(a, b) {
							var records = Ext.getCmp('CUST_SHT_NM').oCustomerQueryGrid.getSelectionModel().selections.items;
							Ext.getCmp('CUST_SHT_NM').setValue(records[0].data.CUST_SHT_NM);
							addXywzSaleFrgnOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
							
						}
					})
            ]
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
            xtype : 'numberfield',
            vtype : 'trim',
            Width : '100',
            name : 'amt',
            fieldLabel : '金额',
            //  allowBlank : false,
            blankText : '金额不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%'
           } ]
          },{
        	  
	             columnWidth : .5,
	             layout : 'form',
	             items : [ new Ext.form.ComboBox({
         	     hiddenName : 'brgnMode',
					 fieldLabel : '成交方式',
					 labelStyle: 'text-align:left;',
					 triggerAction : 'all',
					 store : boxstore6,
					 //  allowBlank : false,
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
              name : 'brgnModeDetail',
              fieldLabel : '成交方式描述',
//              allowBlank : false,
//              blankText : '成交方式描述不能为空',
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
            name : 'nextPlanSnglDt',
            fieldLabel : '下计划单日期',
            //  allowBlank : false,
            editable:false,
            blankText : '下计划单日期不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            format:'Y-m-d'
           } ]
          },{
             
             columnWidth : .5,
             layout : 'form',
             items : [ new Ext.form.ComboBox({
            	 hiddenName : 'payCode',
				 fieldLabel : '<font color=red>*</font>付款方式代码',
				 labelStyle: 'text-align:left;',
				 triggerAction : 'all',
				 store : boxstore7,
				 allowBlank : false,
				 blankText : '付款方式代码不能为空',
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
              xtype : 'textarea',
              vtype : 'trim',
              Width : '100',
              name : 'payMd',
              fieldLabel : '付款方式描述',
              //  allowBlank : false,
              blankText : '付款方式不能为空',
              maxLength : 500,
              minLength : 1,
              anchor : '90%'
             } ]
        	  
	           },{ 
           
           columnWidth : .5,
           layout : 'form',
           items : [ new Ext.form.ComboBox({
   	     hiddenName : 'isNtRecvLc',
				 fieldLabel : '是否收到信用证',
				 labelStyle: 'text-align:left;',
				 triggerAction : 'all',
				 store : boxstore3,
				 //  allowBlank : false,
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
            name : 'lcNum',
            fieldLabel : '信用证号',
            //  allowBlank : false,
            blankText : '信用证号不能为空',
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
            //  allowBlank : false,
            editable:false,
            blankText : '预付款日期不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            format:'Y-m-d'
           } ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'numberfield',
            vtype : 'trim',
            Width : '100',
            name : 'prepyMoneyAmt',
            fieldLabel : '预付款金额',
            //  allowBlank : false,
            blankText : '预付款金额不能为空',
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
            fieldLabel : '最后装运日',
            allowBlank : false,
            editable:false,
            blankText : '最后装运日不能为空',
            maxLength : 200,
            minLength : 1,
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
	             name : 'ngtvPoor',
	             fieldLabel : '合同负差相关描述',
	             //   allowBlank : false,
	             blankText : '负差不能为空',
	             maxLength : 500,
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
                name : 'finalTraffDetail',
                fieldLabel : '最后装运日描述',
//                allowBlank : false,
                blankText : '最后装运日描述不能为空',
                maxLength : 200,
                minLength : 1,
                anchor : '90%'
               } ]
            },{ 
          	  
                
    			columnWidth : .5,
    			layout : 'form',
    			items : [ {
    				xtype : 'numberfield',
    				name : 'loadTraffPort',
    				hidden:true
    			},new Com.xywz.common.PortMgmtInfoQuery(
    				{
    					fieldLabel : '<font color=red>*</font>装运港',
    					labelStyle : 'text-align:left;',
    					//labelWidth : 100,
    					name : 'loadTraffPortcn',
    					id : 'PORT_NAME33',
    					singleSelected : false,
    					// 单选复选标志
    					editable : false,
    					allowBlank : false,
    					// 不允许为空
    					blankText : "不能为空，请填写",
    					anchor : '90%',
    					callback : function(a, b) {
    						var records = Ext.getCmp('PORT_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
    						Ext.getCmp('PORT_NAME33').setValue(records[0].data.PORT_NAME_CN);
    						addXywzSaleFrgnOrdrContrForm.getForm().findField('loadTraffPort').setValue(parseInt(records[0].data.PORT_ID));
    						
    					}
    				}) ]
    		
              },{
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'numberfield',
				name : 'portofDischarge',
				hidden:true
			},new Com.xywz.common.PortMgmtInfoQuery(
				{
					fieldLabel : '<font color=red>*</font>目的港',
					labelStyle : 'text-align:left;',
					//labelWidth : 100,
					name : 'portofDischargecn',
					id : 'PORT_NAME11',
					singleSelected : false,
					// 单选复选标志
					editable : false,
					allowBlank : false,
					// 不允许为空
					blankText : "不能为空，请填写",
					anchor : '90%',
					callback : function(a, b) {
						var records = Ext.getCmp('PORT_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
						Ext.getCmp('PORT_NAME11').setValue(records[0].data.PORT_NAME_CN);
						addXywzSaleFrgnOrdrContrForm.getForm().findField('portofDischarge').setValue(parseInt(records[0].data.PORT_ID));
						
					}
				}) ]
		
          },{ 
	             columnWidth : .5,
	             layout : 'form',
	             items : [ {
	             xtype : 'textfield',
	             vtype : 'trim',
	             Width : '100',
	             name : 'pkg',
	             fieldLabel : '包装描述',
	             //   allowBlank : false,
	             blankText : '包装不能为空',
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
	               name : 'shippingmarks',
	               fieldLabel : '<font color=red>*</font>唛头',
	               allowBlank : false,
	               blankText : '唛头不能为空',
	               maxLength : 200,
	               minLength : 1,
	               anchor : '90%'
	              } ] 

	   	    } ,{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'datefield',
            vtype : 'trim',
            Width : '100',
            name : 'sendTagDt',
            fieldLabel : '发标签日期',
            //  allowBlank : false,
            editable:false,
            blankText : '发标签日期不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            format:'Y-m-d'
           } ]
          },{ 
           
           columnWidth : .5,
           layout : 'form',
           items : [ new Ext.form.ComboBox({
   	             hiddenName : 'isAlterCert',
				 fieldLabel : '是否改证',
				 labelStyle: 'text-align:left;',
				 triggerAction : 'all',
				 store : boxstore3,
				 //  allowBlank : false,
				 displayField : 'value',
				 valueField : 'key',
				 mode : 'local',
				 forceSelection : true,
				 typeAhead : true,
				 emptyText:'请选择',
				 blankText : '是否改证不能为空',
				 resizable : true,
				 editable : false,
				 anchor : '90%'
         }) ]
         
          },{  
              columnWidth : .5,
              layout : 'form',
              items : [ {
              xtype : 'textarea',
              vtype : 'trim',
              Width : '100',
              name : 'merchdNm',
              fieldLabel : '<font color=red>*</font>商品名称描述',
              allowBlank : false,
              blankText : '商品名称描述不能为空',
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
              name : 'memo',
              fieldLabel : '备注',
//              allowBlank : false,
//              blankText : '备注不能为空',
              maxLength : 200,
              minLength : 1,
              anchor : '90%'
             } ]
            },{

        		columnWidth : .5,
        		layout : 'form',
        		items : [ {
        			xtype : 'textfield',
        			name : 'sellPrincId',
        			hidden:true
        		},new Com.xywz.common.UserManagerIdQuery(
        			{
        				fieldLabel : '<font color=red>*</font>销售负责人',
        				labelStyle : 'text-align:left;',
        				//labelWidth : 100,
        				name : 'sellPrinc',
        				id : 'USER_NAME00',
        				singleSelected : false,
        				// 单选复选标志
        				editable : false,
        				allowBlank : false,
        				// 不允许为空
        				blankText : "不能为空，请填写",
        				anchor : '90%',
        				callback : function(a, b) {
        					var records = Ext.getCmp('USER_NAME00').oCustomerQueryGrid.getSelectionModel().selections.items;
        					Ext.getCmp('USER_NAME00').setValue(records[0].data.USER_NAME);
        					addXywzSaleFrgnOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
        				}
        			}) ] 
        	   
        	  },{ 
        		columnWidth : .5,
        		layout : 'form',
        		items : [ {
        			xtype : 'textfield',
        			name : 'makDocPersId',
        			hidden:true
        		},new Com.xywz.common.UserManagerIdQuery(
        			{
        				fieldLabel : '<font color=red>*</font>制单人',
        				labelStyle : 'text-align:left;',
        				//labelWidth : 100,
        				name : 'userName',
        				id : 'USER_NAME01',
        				singleSelected : false,
        				// 单选复选标志
        				editable : false,
        				allowBlank : false,
        				// 不允许为空
        				blankText : "不能为空，请填写",
        				anchor : '90%',
        				callback : function(a, b) {
        					var records = Ext.getCmp('USER_NAME01').oCustomerQueryGrid.getSelectionModel().selections.items;
        					Ext.getCmp('USER_NAME01').setValue(records[0].data.USER_NAME);
        					addXywzSaleFrgnOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
        				}
        			}) ]
        	  },{ 
					columnWidth : 1.055,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						name : 'advisBank',
						hidden:true
					}, new Com.xywz.common.BankInfoQuery(
							{
								fieldLabel : '<font color=red>*</font>通知行',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'fullname',
								id : 'BANK_FULL_NM11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
				                blankText : '通知行不能为空',
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('BANK_FULL_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('BANK_FULL_NM11').setValue('BANK NAME:'+records[0].data.BANK_FULL_NM+'ACCOUNT NO:'+records[0].data.ACCOUNT+'SWIFT CODE:'+records[0].data.SWIFT_CODE+'BANK ADDRESS:'+records[0].data.BANK_ADDR+'TEL NO.:'+records[0].data.BANK_TEL);
									
									addXywzSaleFrgnOrdrContrForm.getForm().findField('advisBank').setValue('BANK NAME:'+records[0].data.BANK_FULL_NM+'</br>'+'ACCOUNT NO:'+records[0].data.ACCOUNT+'</br>'+'SWIFT CODE:'+records[0].data.SWIFT_CODE+'</br>'+'BANK ADDRESS:'+records[0].data.BANK_ADDR+'</br>'+'TEL NO.:'+records[0].data.BANK_TEL);

								}
							}) ]
				
                },{
                 columnWidth : .5,
                  layout : 'form',
                  items : [ {
                  xtype : 'textfield',
                  vtype : 'trim',
                  Width : '100',
                  name : 'moreOrLess',
                  fieldLabel : '<font color=red>*</font>溢短装',
//                  allowBlank : false,
                  blankText : '溢短装不能为空',
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
                  name : 'needDoc',
                  fieldLabel : '所须单证',
//                  allowBlank : false,
//                  blankText : '所须单证不能为空',
                  maxLength : 500,
                  minLength : 1,
                  anchor : '90%'
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

	} 
          ]},

							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
//ADDform
												if (!addXywzSaleFrgnOrdrContrForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
//url与add
															url : basepath + '/XywzSaleFrgnOrdrContrAction.json',
															method : 'POST',
															
															form : addXywzSaleFrgnOrdrContrForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {
									Ext.Msg.alert('提示',addXywzSaleFrgnOrdrContrForm.getForm().findField('loadTraffPort').getValue());
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
//add
												addXywzSaleFrgnOrdrContrWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
//add
											addXywzSaleFrgnOrdrContrWindow.hide();
											}
										} ]
							} ]
				});

// 修改窗口展示的from
		var editXywzSaleFrgnOrdrContrForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 350,
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
    xtype : 'datefield',
    vtype : 'trim',
    Width : '100',
    name : 'signDt',
    fieldLabel : '<font color=red>*</font>签订日期',
    allowBlank : false,
    editable:false,
    blankText : '签订日期不能为空',
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
    	    Width : '100',
    	    name : 'custId',
    	    fieldLabel : '客户ID',
    	    hidden:true
    	   }, new Com.xywz.common.CustomerInfoQuery(
				{
					fieldLabel : '<font color=red>*</font>客户名称',
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
						editXywzSaleFrgnOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
						
					}
				})
      ]
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
    xtype : 'numberfield',
    vtype : 'trim',
    Width : '100',
    name : 'amt',
    fieldLabel : '金额',
    //  allowBlank : false,
    blankText : '金额不能为空',
    maxLength : 200,
    minLength : 1,
    anchor : '90%'
   } ]
  },{
	  
      columnWidth : .5,
      layout : 'form',
      items : [ new Ext.form.ComboBox({
	     hiddenName : 'brgnMode',
			 fieldLabel : '成交方式',
			 labelStyle: 'text-align:left;',
			 triggerAction : 'all',
			 store : boxstore6,
			 //  allowBlank : false,
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
          name : 'brgnModeDetail',
          fieldLabel : '成交方式描述',
//          allowBlank : false,
//          blankText : '成交方式描述不能为空',
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
 name : 'nextPlanSnglDt',
 fieldLabel : '下计划单日期',
 //  allowBlank : false,
 editable:false,
 blankText : '下计划单日期不能为空',
 maxLength : 200,
 minLength : 1,
 anchor : '90%',
 format:'Y-m-d'
} ]
},{
	   columnWidth : .5,
       layout : 'form',
       items : [ new Ext.form.ComboBox({
    	     hiddenName : 'payCode',
			 fieldLabel : '<font color=red>*</font>付款方式代码',
			 labelStyle: 'text-align:left;',
			 triggerAction : 'all',
			 store : boxstore7,
			 allowBlank : false,
			 blankText : '付款方式代码不能为空',
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
   xtype : 'textarea',
   vtype : 'trim',
   Width : '100',
   name : 'payMd',
   fieldLabel : '付款方式',
   //  allowBlank : false,
   blankText : '付款方式不能为空',
   maxLength : 500,
   minLength : 1,
   anchor : '90%'
  } ]
	  
    },{ 
        
        columnWidth : .5,
        layout : 'form',
        items : [ new Ext.form.ComboBox({
	     hiddenName : 'isNtRecvLc',
				 fieldLabel : '是否收到信用证',
				 labelStyle: 'text-align:left;',
				 triggerAction : 'all',
				 store : boxstore3,
				 //  allowBlank : false,
				 displayField : 'value',
				 valueField : 'key',
				 mode : 'local',
				 forceSelection : true,
				 typeAhead : true,
				 emptyText:'请选择',
				    blankText : '是否收到信用证不能为空',
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
    name : 'lcNum',
    fieldLabel : '信用证号',
    //  allowBlank : false,
    blankText : '信用证号不能为空',
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
    //  allowBlank : false,
    editable:false,
    blankText : '预付款日期不能为空',
    maxLength : 200,
    minLength : 1,
    anchor : '90%',
    format:'Y-m-d'
   } ]
  },{ 
    columnWidth : .5,
    layout : 'form',
    items : [ {
    xtype : 'numberfield',
    vtype : 'trim',
    Width : '100',
    name : 'prepyMoneyAmt',
    fieldLabel : '预付款金额',
    //  allowBlank : false,
    blankText : '预付款金额不能为空',
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
      fieldLabel : '最后装运日',
      allowBlank : false,
      editable:false,
      blankText : '最后装运日不能为空',
      maxLength : 200,
      minLength : 1,
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
        name : 'ngtvPoor',
        fieldLabel : '合同负差相关描述',
        //   allowBlank : false,
        blankText : '负差不能为空',
        maxLength : 500,
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
      name : 'finalTraffDetail',
      fieldLabel : '最后装运日描述',
//    allowBlank : false,
      blankText : '最后装运日描述不能为空',
      maxLength : 200,
      minLength : 1,
      anchor : '90%'
     } ]
},{ 
	  
		columnWidth : .5,
		layout : 'form',
		items : [ {
			xtype : 'numberfield',
			name : 'loadTraffPort',
			hidden:true
		},new Com.xywz.common.PortMgmtInfoQuery(
			{
				fieldLabel : '<font color=red>*</font>装运港',
				labelStyle : 'text-align:left;',
				//labelWidth : 100,
				name : 'loadTraffPortcn',
				id : 'PORT_NAME44',
				singleSelected : false,
				// 单选复选标志
				editable : false,
				allowBlank : false,
				// 不允许为空
				blankText : "不能为空，请填写",
				anchor : '90%',
				callback : function(a, b) {
					var records = Ext.getCmp('PORT_NAME44').oCustomerQueryGrid.getSelectionModel().selections.items;
					Ext.getCmp('PORT_NAME44').setValue(records[0].data.PORT_NAME_CN);
					editXywzSaleFrgnOrdrContrForm.getForm().findField('loadTraffPort').setValue(parseInt(records[0].data.PORT_ID));
					
				}
			}) ]
	
  
	  
},{
		columnWidth : .5,
		layout : 'form',
		items : [ {
			xtype : 'numberfield',
			name : 'portofDischarge',
			hidden:true
		},new Com.xywz.common.PortMgmtInfoQuery(
			{
				fieldLabel : '<font color=red>*</font>目的港',
				labelStyle : 'text-align:left;',
				//labelWidth : 100,
				name : 'portofDischargecn',
				id : 'PORT_NAME22',
				singleSelected : false,
				// 单选复选标志
				editable : false,
				allowBlank : false,
				// 不允许为空
				blankText : "不能为空，请填写",
				anchor : '90%',
				callback : function(a, b) {
					var records = Ext.getCmp('PORT_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
					Ext.getCmp('PORT_NAME22').setValue(records[0].data.PORT_NAME_CN);
					editXywzSaleFrgnOrdrContrForm.getForm().findField('portofDischarge').setValue(parseInt(records[0].data.PORT_ID));
					
				}
			}) ]
	
      },{ 
          columnWidth : .5,
          layout : 'form',
          items : [ {
          xtype : 'textfield',
          vtype : 'trim',
          Width : '100',
          name : 'pkg',
          fieldLabel : '包装描述',
          //   allowBlank : false,
          blankText : '包装不能为空',
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
            name : 'shippingmarks',
            fieldLabel : '<font color=red>*</font>唛头',
            allowBlank : false,
            blankText : '唛头不能为空',
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
    name : 'sendTagDt',
    fieldLabel : '发标签日期',
    //  allowBlank : false,
    editable:false,
    blankText : '发标签日期不能为空',
    maxLength : 200,
    minLength : 1,
    anchor : '90%',
    format:'Y-m-d'
   } ]
  },{ 
      columnWidth : .5,
      layout : 'form',
      items : [ new Ext.form.ComboBox({
	     hiddenName : 'isAlterCert',
			 fieldLabel : '是否改证',
			 labelStyle: 'text-align:left;',
			 triggerAction : 'all',
			 store : boxstore3,
			 //  allowBlank : false,
			 displayField : 'value',
			 valueField : 'key',
			 mode : 'local',
			 forceSelection : true,
			 typeAhead : true,
			 emptyText:'请选择',
			 blankText : '是否改证不能为空',
			 resizable : true,
			 editable : false,
			 anchor : '90%'
    }) ]
    
  },{   
	columnWidth : .5,
	layout : 'form',
	items : [ {
		xtype : 'textfield',
		name : 'sellPrincId',
		hidden:true
	},new Com.xywz.common.UserManagerIdQuery(
		{
			fieldLabel : '<font color=red>*</font>销售负责人',
			labelStyle : 'text-align:left;',
			//labelWidth : 100,
			name : 'sellPrinc',
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
				editXywzSaleFrgnOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
			}
		}) ] 
   
  },{ 
	columnWidth : .5,
	layout : 'form',
	items : [ {
		xtype : 'textfield',
		name : 'makDocPersId',
		hidden:true
	},new Com.xywz.common.UserManagerIdQuery(
		{
			fieldLabel : '<font color=red>*</font>制单人',
			labelStyle : 'text-align:left;',
			//labelWidth : 100,
			name : 'makDocPers',
			id : 'USER_NAME22',
			singleSelected : false,
			// 单选复选标志
			editable : false,
			allowBlank : false,
			// 不允许为空
			blankText : "不能为空，请填写",
			anchor : '90%',
			callback : function(a, b) {
				var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
				Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
				editXywzSaleFrgnOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
			}
		}) ]
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
	columnWidth : 1.055,
	layout : 'form',
	items : [{
		xtype : 'textfield',
		name : 'advisBank',
		hidden:true
	}, new Com.xywz.common.BankInfoQuery(
			{
				fieldLabel : '<font color=red>*</font>通知行',
				labelStyle : 'text-align:left;',
				//labelWidth : 100,
				name : 'fullname',
				id : 'BANK_FULL_NM22',
				singleSelected : false,
				// 单选复选标志
				editable : false,
				allowBlank : false,
				// 不允许为空
                blankText : '通知行不能为空',
				anchor : '90%',
				callback : function(a, b) {
					var records = Ext.getCmp('BANK_FULL_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
					
					Ext.getCmp('BANK_FULL_NM22').setValue('BANK NAME:'+records[0].data.BANK_FULL_NM+'ACCOUNT NO:'+records[0].data.ACCOUNT+'SWIFT CODE:'+records[0].data.SWIFT_CODE+'BANK ADDRESS:'+records[0].data.BANK_ADDR+'TEL NO.:'+records[0].data.BANK_TEL);
					editXywzSaleFrgnOrdrContrForm.getForm().findField('advisBank').setValue('BANK NAME:'+records[0].data.BANK_FULL_NM+'</br>'+'ACCOUNT NO:'+records[0].data.ACCOUNT+'</br>'+'SWIFT CODE:'+records[0].data.SWIFT_CODE+'</br>'+'BANK ADDRESS:'+records[0].data.BANK_ADDR+'</br>'+'TEL NO.:'+records[0].data.BANK_TEL);

				}
			}) ]

},{
 columnWidth : .5,
  layout : 'form',
  items : [ {
  xtype : 'textfield',
  vtype : 'trim',
  Width : '100',
  name : 'moreOrLess',
  fieldLabel : '<font color=red>*</font>溢短装',
//  allowBlank : false,
  blankText : '溢短装不能为空',
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
  name : 'needDoc',
  fieldLabel : '所须单证',
//  allowBlank : false,
//  blankText : '所须单证不能为空',
  maxLength : 500,
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
     name : 'merchdNm',
     fieldLabel : '<font color=red>*</font>商品名称描述',
     allowBlank : false,
     blankText : '商品名称描述不能为空',
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
     name : 'memo',
     fieldLabel : '备注',
//     allowBlank : false,
//     blankText : '备注不能为空',
     maxLength : 200,
     minLength : 1,
     anchor : '90%'
    } ]
   },{
            columnWidth : .5,
            layout : 'form',
            items : [ new Ext.form.ComboBox({
				hiddenName : 'chkStat',
				fieldLabel : '<font color=red>*</font>下达状态',
				labelStyle: 'text-align:left;',
				blankText : '下达状态不能为空',
				triggerAction : 'all',
				store : boxstore5,									
				displayField : 'value',
				valueField : 'key',
				mode : 'local',
				forceSelection : true,
				typeAhead : true,
				emptyText:'请选择',
				resizable : true,
				hidden:true,
				anchor : '90%'
			})]
},{
	  columnWidth : .5,
      layout : 'form',
      items : [ {
      xtype : 'textfield',
      vtype : 'trim',
      Width : '100',
      name : 'inputPersId',
      fieldLabel : '录入人编号',
      
      readOnly:true,
      blankText : '录入人编号不能为空',
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
      
      readOnly:true,
      blankText : '录入人名称不能为空',
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
      
      readOnly:true,
      blankText : '录入日期不能为空',
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
      
      readOnly:true,
      blankText : '最后一次修改人编号不能为空',
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
      
      readOnly:true,
      blankText : '最后一次修改人不能为空',
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
     
      readOnly:true,
      blankText : '最后一次修改日期不能为空',
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
//edit
												if (!editXywzSaleFrgnOrdrContrForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleFrgnOrdrContrAction.json',
															method : 'POST',
															form : editXywzSaleFrgnOrdrContrForm
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

												editXywzSaleFrgnOrdrContrWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleFrgnOrdrContrWindow
														.hide();
											}
										} ]
							} ]
				});
		
		//定义详情展示
		var detailXywzSaleFrgnOrdrContrForm = new Ext.form.FormPanel(	
		{
			

			labelWidth : 150,
			height : 350,
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
			fieldLabel : '订单状态',
			labelStyle: 'text-align:left;',
			triggerAction : 'all',
			store : boxstore1,
			//  allowBlank : false,
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
xtype : 'datefield',
vtype : 'trim',
Width : '100',
name : 'signDt',
fieldLabel : '<font color=red>*</font>签订日期',
allowBlank : false,
editable:false,
blankText : '签订日期不能为空',
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
    Width : '100',
    name : 'custId',
    fieldLabel : '客户ID',
    hidden:true
   }, new Com.xywz.common.CustomerInfoQuery(
		{
			fieldLabel : '<font color=red>*</font>客户名称',
			labelStyle : 'text-align:left;',
			//labelWidth : 100,
			name : 'custShtNm',
			id : 'CUST_SHT_NM22',
			singleSelected : false,
			// 单选复选标志
			editable : false,
			allowBlank : false,
			// 不允许为空
			blankText : "不能为空，请填写",
			anchor : '90%',
			callback : function(a, b) {
				var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
				Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
				editXywzSaleFrgnOrdrContrForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
				
			}
		})
]
},{ 
columnWidth : .5,
layout : 'form',
items : [ new Ext.form.ComboBox({
    hiddenName : 'cur',
	 fieldLabel : '币种',
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
xtype : 'numberfield',
vtype : 'trim',
Width : '100',
name : 'amt',
fieldLabel : '金额',
//  allowBlank : false,
blankText : '金额不能为空',
maxLength : 200,
minLength : 1,
anchor : '90%'
} ]
},{

columnWidth : .5,
layout : 'form',
items : [ new Ext.form.ComboBox({
 hiddenName : 'brgnMode',
	 fieldLabel : '成交方式',
	 labelStyle: 'text-align:left;',
	 triggerAction : 'all',
	 store : boxstore6,
	 //  allowBlank : false,
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
      name : 'brgnModeDetail',
      fieldLabel : '成交方式描述',
//      allowBlank : false,
//      blankText : '成交方式描述不能为空',
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
name : 'nextPlanSnglDt',
fieldLabel : '下计划单日期',
//  allowBlank : false,
editable:false,
blankText : '下计划单日期不能为空',
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
      name : 'payCode',
      fieldLabel : '<font color=red>*</font>付款方式代码',
      allowBlank : false,
      blankText : '付款方式代码不能为空',
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
name : 'payMd',
fieldLabel : '付款方式',
//  allowBlank : false,
blankText : '付款方式不能为空',
maxLength : 500,
minLength : 1,
anchor : '90%'
} ]

},{ 

columnWidth : .5,
layout : 'form',
items : [ new Ext.form.ComboBox({
 hiddenName : 'isNtRecvLc',
		 fieldLabel : '是否收到信用证',
		 labelStyle: 'text-align:left;',
		 triggerAction : 'all',
		 store : boxstore3,
		 //  allowBlank : false,
		 displayField : 'value',
		 valueField : 'key',
		 mode : 'local',
		 forceSelection : true,
		 typeAhead : true,
		 emptyText:'请选择',
		    blankText : '是否收到信用证不能为空',
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
name : 'lcNum',
fieldLabel : '信用证号',
//  allowBlank : false,
blankText : '信用证号不能为空',
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
//  allowBlank : false,
editable:false,
blankText : '预付款日期不能为空',
maxLength : 200,
minLength : 1,
anchor : '90%',
format:'Y-m-d'
} ]
},{ 
columnWidth : .5,
layout : 'form',
items : [ {
xtype : 'numberfield',
vtype : 'trim',
Width : '100',
name : 'prepyMoneyAmt',
fieldLabel : '预付款金额',
//  allowBlank : false,
blankText : '预付款金额不能为空',
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
    fieldLabel : '最后装运日',
//  allowBlank : false,
    editable:false,
    blankText : '最后装运日不能为空',
    maxLength : 200,
    minLength : 1,
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
	  name : 'ngtvPoor',
	  fieldLabel : '合同负差相关描述',
	  //   allowBlank : false,
	  blankText : '负差不能为空',
	  maxLength : 500,
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
    name : 'finalTraffDetail',
    fieldLabel : '最后装运日描述',
//  allowBlank : false,
    blankText : '最后装运日描述不能为空',
    maxLength : 200,
    minLength : 1,
    anchor : '90%'
   } ]
},{ 

	columnWidth : .5,
	layout : 'form',
	items : [ {
		xtype : 'numberfield',
		name : 'loadTraffPort',
		hidden:true
	},new Com.xywz.common.PortMgmtInfoQuery(
		{
			fieldLabel : '<font color=red>*</font>装运港',
			labelStyle : 'text-align:left;',
			//labelWidth : 100,
			name : 'loadTraffPortcn',
			id : 'PORT_NAME55',
			singleSelected : false,
			// 单选复选标志
			editable : false,
			allowBlank : false,
			// 不允许为空
			blankText : "不能为空，请填写",
			anchor : '90%',
			callback : function(a, b) {
				var records = Ext.getCmp('PORT_NAME55').oCustomerQueryGrid.getSelectionModel().selections.items;
				Ext.getCmp('PORT_NAME55').setValue(records[0].data.PORT_NAME_CN);
				editXywzSaleFrgnOrdrContrForm.getForm().findField('loadTraffPort').setValue(parseInt(records[0].data.PORT_ID));
				
			}
		}) ]



	},{
columnWidth : .5,
layout : 'form',
items : [ {
	xtype : 'numberfield',
	name : 'portofDischarge',
	hidden:true
},new Com.xywz.common.PortMgmtInfoQuery(
	{
		fieldLabel : '<font color=red>*</font>目的港',
		labelStyle : 'text-align:left;',
		//labelWidth : 100,
		name : 'portofDischargecn',
		id : 'PORT_NAME66',
		singleSelected : false,
		// 单选复选标志
		editable : false,
		allowBlank : false,
		// 不允许为空
		blankText : "不能为空，请填写",
		anchor : '90%',
		callback : function(a, b) {
			var records = Ext.getCmp('PORT_NAME66').oCustomerQueryGrid.getSelectionModel().selections.items;
			Ext.getCmp('PORT_NAME66').setValue(records[0].data.PORT_NAME_CN);
			editXywzSaleFrgnOrdrContrForm.getForm().findField('portofDischarge').setValue(parseInt(records[0].data.PORT_ID));
			
		}
	}) ]

},{ 
  columnWidth : .5,
  layout : 'form',
  items : [ {
  xtype : 'textfield',
  vtype : 'trim',
  Width : '100',
  name : 'pkg',
  fieldLabel : '包装描述',
  //   allowBlank : false,
  blankText : '包装不能为空',
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
    name : 'shippingmarks',
    fieldLabel : '<font color=red>*</font>唛头',
    allowBlank : false,
    blankText : '唛头不能为空',
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
name : 'sendTagDt',
fieldLabel : '发标签日期',
//  allowBlank : false,
editable:false,
blankText : '发标签日期不能为空',
maxLength : 200,
minLength : 1,
anchor : '90%',
format:'Y-m-d'
} ]
},{ 
columnWidth : .5,
layout : 'form',
items : [ new Ext.form.ComboBox({
 hiddenName : 'isAlterCert',
	 fieldLabel : '是否改证',
	 labelStyle: 'text-align:left;',
	 triggerAction : 'all',
	 store : boxstore3,
	 //  allowBlank : false,
	 displayField : 'value',
	 valueField : 'key',
	 mode : 'local',
	 forceSelection : true,
	 typeAhead : true,
	 emptyText:'请选择',
	 blankText : '是否改证不能为空',
	 resizable : true,
	 editable : false,
	 anchor : '90%'
}) ]

},{   
columnWidth : .5,
layout : 'form',
items : [ {
xtype : 'textfield',
name : 'sellPrincId',
hidden:true
},new Com.xywz.common.UserManagerIdQuery(
{
	fieldLabel : '<font color=red>*</font>销售负责人',
	labelStyle : 'text-align:left;',
	//labelWidth : 100,
	name : 'sellPrinc',
	id : 'USER_NAME44',
	singleSelected : false,
	// 单选复选标志
	editable : false,
	allowBlank : false,
	// 不允许为空
	blankText : "不能为空，请填写",
	anchor : '90%',
	callback : function(a, b) {
		var records = Ext.getCmp('USER_NAME44').oCustomerQueryGrid.getSelectionModel().selections.items;
		Ext.getCmp('USER_NAME44').setValue(records[0].data.USER_NAME);
		editXywzSaleFrgnOrdrContrForm.getForm().findField('sellPrincId').setValue(records[0].data.ACCOUNT_NAME);
	}
}) ] 

},{ 
columnWidth : .5,
layout : 'form',
items : [ {
xtype : 'textfield',
name : 'makDocPersId',
hidden:true
},new Com.xywz.common.UserManagerIdQuery(
{
	fieldLabel : '<font color=red>*</font>制单人',
	labelStyle : 'text-align:left;',
	//labelWidth : 100,
	name : 'makDocPers',
	id : 'USER_NAME33',
	singleSelected : false,
	// 单选复选标志
	editable : false,
	allowBlank : false,
	// 不允许为空
	blankText : "不能为空，请填写",
	anchor : '90%',
	callback : function(a, b) {
		var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
		Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
		editXywzSaleFrgnOrdrContrForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
	}
}) ]
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
//columnWidth : .5,
//layout : 'form',
//items : [{
//xtype : 'textfield',
//name : 'advisBank',
//hidden:true
//}, new Com.xywz.common.BankInfoQuery(
//	{
//		fieldLabel : '<font color=red>*</font>通知行',
//		labelStyle : 'text-align:left;',
//		//labelWidth : 100,
//		name : 'fullname',
//		id : 'BANK_FULL_NM33',
//		singleSelected : false,
//		// 单选复选标志
//		editable : false,
//		allowBlank : false,
//		// 不允许为空
//        blankText : '通知行不能为空',
//		anchor : '90%',
//		callback : function(a, b) {
//			var records = Ext.getCmp('BANK_FULL_NM33').oCustomerQueryGrid.getSelectionModel().selections.items;
////			Ext.getCmp('BANK_FULL_NM33').setValue(records[0].data.BANK_FULL_NM+records[0].data.SWIFT_CODE+records[0].data.BANK_ADDR+records[0].data.BANK_TEL);
//			Ext.getCmp('BANK_FULL_NM33').setValue('BANK NAME:'+records[0].data.BANK_FULL_NM+'ACCOUNT NO:'+records[0].data.ACCOUNT+'SWIFT CODE:'+records[0].data.SWIFT_CODE+'BANK ADDRESS:'+records[0].data.BANK_ADDR+'TEL NO.:'+records[0].data.BANK_TEL);
//			
//
////			editXywzSaleFrgnOrdrContrForm.getForm().findField('advisBank').setValue(records[0].data.BANK_FULL_NM+'</br>'+records[0].data.SWIFT_CODE+'</br>'+records[0].data.BANK_ADDR+'</br>'+records[0].data.BANK_TEL);
//
//		}
//	}) ]
	
	columnWidth : .5,
	layout : 'form',
	items : [ {
	xtype : 'textarea',
	vtype : 'trim',
	Width : '100',
	name : 'advisBank',
	fieldLabel : '通知行',
	//allowBlank : false,
//	blankText : '溢短装不能为空',
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
name : 'moreOrLess',
fieldLabel : '<font color=red>*</font>溢短装',
//allowBlank : false,
blankText : '溢短装不能为空',
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
name : 'needDoc',
fieldLabel : '<font color=red>*</font>所须单证',
allowBlank : false,
blankText : '所须单证不能为空',
maxLength : 500,
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
     name : 'merchdNm',
     fieldLabel : '<font color=red>*</font>商品名称描述',
     allowBlank : false,
     blankText : '商品名称描述不能为空',
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
     name : 'memo',
     fieldLabel : '备注',
//     allowBlank : false,
//     blankText : '备注不能为空',
     maxLength : 200,
     minLength : 1,
     anchor : '90%'
    } ]
   },{
    columnWidth : .5,
    layout : 'form',
    items : [ new Ext.form.ComboBox({
		hiddenName : 'chkStat',
		fieldLabel : '<font color=red>*</font>下达状态',
		labelStyle: 'text-align:left;',
		blankText : '下达状态不能为空',
		triggerAction : 'all',
		store : boxstore5,									
		displayField : 'value',
		valueField : 'key',
		mode : 'local',
		forceSelection : true,
		typeAhead : true,
		emptyText:'请选择',
		resizable : true,
		hidden:true,
		anchor : '90%'
	})]
},{
	  columnWidth : .5,
    layout : 'form',
    items : [ {
    xtype : 'textfield',
    vtype : 'trim',
    Width : '100',
    name : 'inputPersId',
    fieldLabel : '录入人编号',
  
    blankText : '录入人编号不能为空',
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
   
    blankText : '录入人名称不能为空',
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
    
    blankText : '录入日期不能为空',
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
    
    blankText : '最后一次修改人编号不能为空',
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
    
    blankText : '最后一次修改人不能为空',
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
    
    blankText : '最后一次修改日期不能为空',
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
									text : '返回',
									handler : function() {
										detailXywzSaleFrgnOrdrContrWindow
												.hide();
									}
								} ]
					} ]
		
		});

		// 定义新增窗口
		var addXywzSaleFrgnOrdrContrWindow = new Ext.Window( {
			title : '外贸合同新增',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 460,
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
			items : [ addXywzSaleFrgnOrdrContrForm ]
		});

		// 定义修改窗口
		var editXywzSaleFrgnOrdrContrWindow = new Ext.Window( {
			title : '外贸合同修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 460,
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
			items : [ editXywzSaleFrgnOrdrContrForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleFrgnOrdrContrWindow = new Ext.Window( {
			title : '外贸合同详情',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 460,
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
			items : [ detailXywzSaleFrgnOrdrContrForm ]
		});


		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸订单合同信息',
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