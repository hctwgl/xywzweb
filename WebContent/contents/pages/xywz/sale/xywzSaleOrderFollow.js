Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
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
		   name : 'nextPlanSnglDt',
		   mapping : 'NEXT_PLAN_SNGL_DT'
		  }, { 
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


	} ]);

	// 定义列模型			

	var columns1 = new Ext.grid.ColumnModel([
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
			   header : '下计划单日期',
			   width : 100,
			   dataIndex : 'nextPlanSnglDt',
			   sortable : true
			  }, { 
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
							   header : '排产状态',
							   width : 100,
							   dataIndex : 'paiChan',
							   sortable : true
			
		} ]);
	
	var record2 = Ext.data.Record.create([ {
		  name : 'merchdId',
		   mapping : 'MERCHD_ID'
		  }, { 
		   name : 'contrNum',
		   mapping : 'CONTR_NUM'
		  }, { 
		   name : 'invNum',
		   mapping : 'INV_NUM'
		  }, { 
		   name : 'hsCode',
		   mapping : 'HS_CODE'
		  }, { 
		   name : 'model',
		   mapping : 'MODEL'
		  }, { 
		   name : 'uprc',
		   mapping : 'UPRC'
		  }, { 
			 name : 'inlandUprc',
			 mapping : 'INLAND_UPRC'
		  },{
		   name : 'materials',
		   mapping : 'MATERIALS'
		  }, { 
		   name : 'qty',
		   mapping : 'QTY'
		  }, { 
			   name : 'branchNumber',
			   mapping : 'BRANCH_NUMBER'
		   },{
			   name : 'weightTolerance',
			   mapping : 'WEIGHT_TOLERANCE'
			          },{
			  name : 'lengthTolerance',
			   mapping : 'LENGTH_TOLERANCE'
			          },{
			  name : 'depthTolerance',
			   mapping : 'DEPTH_TOLERANCE'
		  }, { 
		   name : 'cur',
		   mapping : 'CUR'
		  }, { 
		   name : 'curOra',
		   mapping : 'CUR_ORA'
		  }, { 
		   name : 'amt',
		   mapping : 'AMT'
		  }, { 
		   name : 'pkg',
		   mapping : 'PKG'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
		  }, { 
		   name : 'len',
		   mapping : 'LEN'
		  },{    
		   name : 'chkStat',
		   mapping : 'CHK_STAT'
			 
	} ]);
	
	var columns2 = new Ext.grid.ColumnModel([
		 { 
			   header : '合同号',
			   width : 100,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '发票号',
			   width : 100,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
			   header : '品名',
			   width : 100,
			   dataIndex : 'hsCode',
			   sortable : true
			  }, { 
			   header : '型号',
			   width : 100,
			   dataIndex : 'model',
			   sortable : true
			  }, { 
			   header : '单价',
			   width : 100,
			   dataIndex : 'uprc',
			   sortable : true
			  }, { 
				   header : '内贸价格',
				   width : 100,
				   dataIndex : 'inlandUprc',
				   sortable : true
			  },{
			   header : '材质',
			   width : 100,
			   dataIndex : 'materials',
			   sortable : true
			  }, { 
			   header : '吨数',
			   width : 100,
			   dataIndex : 'qty',
			   sortable : true
			  }, {
			   header : '支数',
			   width : 100,
				   dataIndex : 'branchNumber',
				   sortable : true
				},{
					 header : '重量公差描述',
					 width : 100,
					   dataIndex : 'weightTolerance',
					   sortable : true
					          },{
					 header : '长度公差描述',
					 width : 100,
					   dataIndex : 'lengthTolerance',
					   sortable : true
					          },{
					 header : '厚度公差描述',
					 width : 100,
					   dataIndex : 'depthTolerance',
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
			  },{ 
			   header : '包装描述',
			   width : 100,
			   dataIndex : 'pkg',
			   sortable : true
			  }, { 
			   header : '备注',
			   width : 100,
			   dataIndex : 'memo',
			   sortable : true
			  }, { 
			   header : '长度（M）',
			   width : 100,
			   dataIndex : 'len',
			   sortable : true
		}, { 
			   header : '状态',
			   width : 100,
			   dataIndex : 'chkStat',
			   sortable : true

	} ]);
	
	var record3 = Ext.data.Record.create( [ {
		
		   name : 'commsnId',
		   mapping : 'COMMSN_ID'
		  }, { 
		   name : 'contrNum',
		   mapping : 'CONTR_NUM'
		  }, { 
		   name : 'invNum',
		   mapping : 'INV_NUM'
		  }, { 
		   name : 'model',
		   mapping : 'MODEL'
		  }, { 
		   name : 'weight',
		   mapping : 'WEIGHT'
		  }, { 
		   name : 'amt',
		   mapping : 'AMT'
		  }, { 
		   name : 'cur',
		   mapping : 'CUR'
		  }, { 
		   name : 'commsnUprc',
		   mapping : 'COMMSN_UPRC'
		  }, { 
		   name : 'ratio',
		   mapping : 'RATIO'
		  }, { 
		   name : 'refundDt',
		   mapping : 'REFUND_DT'
		  }, { 
		   name : 'commsnAmt',
		   mapping : 'COMMSN_AMT'
		  }, { 
		   name : 'payDt',
		   mapping : 'PAY_DT'

	} ]);

	// 定义列模型

	var columns3 = new Ext.grid.ColumnModel( [ {
		   header : '佣金ID',
		   width : 210,
		   dataIndex : 'commsnId',
		   sortable : true
		  }, { 
		   header : '合同号',
		   width : 210,
		   dataIndex : 'contrNum',
		   sortable : true
		  }, { 
		   header : '发票号',
		   width : 210,
		   dataIndex : 'invNum',
		   sortable : true
		  }, { 
		   header : '型号',
		   width : 210,
		   dataIndex : 'model',
		   sortable : true
		  }, { 
		   header : '重量',
		   width : 210,
		   dataIndex : 'weight',
		   sortable : true
		  }, { 
		   header : '金额',
		   width : 210,
		   dataIndex : 'amt',
		   sortable : true
		  }, { 
		   header : '币种',
		   width : 210,
		   dataIndex : 'cur',
		   sortable : true
		  }, { 
		   header : '佣金单价',
		   width : 210,
		   dataIndex : 'commsnUprc',
		   sortable : true
		  }, { 
		   header : '比例',
		   width : 210,
		   dataIndex : 'ratio',
		   sortable : true
		  }, { 
		   header : '回款日期',
		   width : 210,
		   dataIndex : 'refundDt',
		   sortable : true
		  }, { 
		   header : '佣金金额',
		   width : 210,
		   dataIndex : 'commsnAmt',
		   sortable : true
		  }, { 
		   header : '付款日期',
		   width : 210,
		   dataIndex : 'payDt',
		   sortable : true

	} ]);

	/**
	 * 外贸合同数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSaleFrgnOrdrContrQueryAction.json',
//					+ '&contrNum='+_record.data.contrNum; 
//					request.getParameter
					failure : function(response) {
						var resultArray = Ext.util.JSON.decode(response.status);
						if (resultArray == 403) {
							Ext.Msg.alert('提示', response.responseText);
						}
					}
				}),
		pruneModifiedRecords:true,
		reader : new Ext.data.JsonReader({
					successProperty : 'success',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record1)
	});	
	// 默认加载数据
	store1.baseParams = {
			"condition" : Ext.encode({
				"contrNum":contrNum
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 外贸发票商品数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSaleInvMerchdDtlQueryAction.json',
					
					
					failure : function(response) {
						var resultArray = Ext.util.JSON.decode(response.status);
						if (resultArray == 403) {
							Ext.Msg.alert('提示', response.responseText);
						}
					}
				}),
		pruneModifiedRecords:true,
		reader : new Ext.data.JsonReader({
					successProperty : 'success',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record2)
	});	
	// 默认加载数据
	store2.baseParams = {
			"condition" : Ext.encode({
				"contrNum":contrNum
			})
	};
	// 默认加载数据
	store2.load();	
	/**
	 * 外贸佣金数据存储
	 */
 	var store3 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzSaleCommsnMgmtQueryAction.json',
					failure : function(response) {
						var resultArray = Ext.util.JSON.decode(response.status);
						if (resultArray == 403) {
							Ext.Msg.alert('提示', response.responseText);
						}
					}
				}),
		pruneModifiedRecords:true,
		reader : new Ext.data.JsonReader({
					successProperty : 'success',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record3)
	});	
	// 默认加载数据
 	store3.baseParams = {
			"condition" : Ext.encode({
				"contrNum":contrNum
			})
	};
	// 默认加载数据
 	store3.load();
 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "外贸合同列表",
		store : store1,
		collapsible:true,
		height : 142,
		frame : true,
		autoScroll : true,
		cm : columns1,
		viewConfig : {
			// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			forceFit : false
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
	var listPanel2 = new Ext.grid.EditorGridPanel({
		title : "外贸发票商品列表",
		store : store2,
		collapsible:true,
		height : 142,
		frame : true,
		autoScroll : true,
		cm : columns2,
		viewConfig : {
			// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			forceFit : false
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
	var listPanel3 = new Ext.grid.EditorGridPanel({
		title : "外贸佣金列表",
		store : store3,
		collapsible:true,
		height : 142,
		frame : true,
		autoScroll : true,
		cm : columns3,
		viewConfig : {
			// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			forceFit : false
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
    var viewport = new Ext.Viewport( {
        layout : 'fit',
        autoScroll : true,
        items : [ {
            layout : 'column',
            border : true,
            autoScroll : true,
            items : [{
				columnWidth : 1,
				layout : 'form',				
				items :[listPanel1]
			},{
				columnWidth : 1,
				layout : 'form',				
				items :[listPanel2]
			},{
				columnWidth : 1,
				layout : 'form',				
				items :[listPanel3]
			}]
        } ]
    });
	
});	