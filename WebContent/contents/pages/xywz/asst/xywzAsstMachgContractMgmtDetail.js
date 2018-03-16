Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
		name : 'asstContrId',
		mapping : 'ASST_CONTR_ID'
	}, {
		name : 'machgContrNum',
		mapping : 'MACHG_CONTR_NUM'
	},{
		name : 'machgContrNm',
		mapping : 'MACHG_CONTR_NM'
	},{
		name : 'machgOrdrNumId',
		mapping : 'MACHG_ORDR_NUM_ID'
	},{
		name : 'machgOrdrNm',
		mapping : 'MACHG_ORDR_NM'
	},{
		name : 'mainBizBiz',
		mapping : 'MAIN_BIZ_BIZ'
	},{
		name : 'contrDt',
		mapping : 'CONTR_DT'
	},{
		name : 'signSite',
		mapping : 'SIGN_SITE'
	},{
		name : 'stlModeAndTerm',
		mapping : 'STL_MODE_AND_TERM'
	},{
		name : 'deliverGdsPrd',
		mapping : 'DELIVER_GDS_PRD'
	},{
		name : 'ordrContrNum',
		mapping : 'ORDR_CONTR_NUM'
	},{
		name : 'outMachgContcr',
		mapping : 'OUT_MACHG_CONTCR'
	},{
		name : 'inputDt',
		mapping : 'INPUT_DT'
	},{
		name : 'oprrId',
		mapping : 'OPRR_ID'
	},{
		name : 'oprr',
		mapping : 'OPRR'
	},{
		name : 'sellPersMemId',
		mapping : 'SELL_PERS_MEM_ID'
	},{
		name : 'sellPersMem',
		mapping : 'SELL_PERS_MEM'
	},{
		name : 'gdsMode',
		mapping : 'GDS_MODE'
	},{
		name : 'gdsModeOra',
		mapping : 'GDS_MODE_ORA'
	},{
		name : 'machgGdsAddr',
		mapping : 'MACHG_GDS_ADDR'
	},{
		name : 'stlCur',
		mapping : 'STL_CUR'
	},{
		name : 'stlCurOra',
		mapping : 'STL_CUR_ORA'
	},{
		name : 'machgCostSum',
		mapping : 'MACHG_COST_SUM'
	},{
		name : 'payMd',
		mapping : 'PAY_MD'
	},{
		name : 'payMdOra',
		mapping : 'PAY_MD_ORA'
	},{
		name : 'machgAddr',
		mapping : 'MACHG_ADDR'
	},{
		name : 'machgTel',
		mapping : 'MACHG_TEL'
	},{
		name : 'machgFax',
		mapping : 'MACHG_FAX'
	},{
		name : 'machgContcr',
		mapping : 'MACHG_CONTCR'
	},{
		name : 'machgContcrMail',
		mapping : 'MACHG_CONTCR_MAIL'
	},{
		name : 'machgBankFstNm',
		mapping : 'MACHG_BANK_FST_NM'
	},{
		name : 'machgBankAcct',
		mapping : 'MACHG_BANK_ACCT'
	},{
		name : 'pkgReqst',
		mapping : 'PKG_REQST'
	},{
		name : 'qltyReqst',
		mapping : 'QLTY_REQST'
	},{
		name : 'machgModel',
		mapping : 'MACHG_MODEL'
	},{
		name : 'attm',
		mapping : 'ATTM'
	},{
		name : 'memo',
		mapping : 'MEMO'
	},{	
		  name : 'memo1',
		   mapping : 'MEMO1'
		          },{
		  name : 'memo2',
		   mapping : 'MEMO2'
		          },{
		  name : 'memo3',
		   mapping : 'MEMO3'
		          },{
		  name : 'memo4',
		   mapping : 'MEMO4'
	}]);

	// 定义列模型			

	var columns1 = new Ext.grid.ColumnModel([{
		header : '外协加工合同号',
		width : 210,
		dataIndex : 'machgContrNum',
		sortable : true
	}, {
		header : '外协加工合同名称',
		width : 170,
		dataIndex : 'machgContrNm',
		sortable : true
	}, {
		header : '外协加工厂编号',
		width : 170,
		dataIndex : 'machgOrdrNumId',
		sortable : true
	}, {
		header : '外协加工厂名称',
		width : 170,
		dataIndex : 'machgOrdrNm',
		sortable : true
	}, {
		header : '主营业务',
		width : 170,
		dataIndex : 'mainBizBiz',
		sortable : true
	}, {
		header : '签约日期',
		width : 170,
		dataIndex : 'contrDt',
		sortable : true
	}, {
		header : '签订地点',
		width : 170,
		dataIndex : 'signSite',
		sortable : true
	}, {
		header : '结算方式及期限',
		width : 170,
		dataIndex : 'stlModeAndTerm',
		sortable : true
	}, {
		header : '交货期',
		width : 170,
		dataIndex : 'deliverGdsPrd',
		sortable : true
	}, {
		header : '订单合同号',
		width : 170,
		dataIndex : 'ordrContrNum',
		sortable : true
	}, {
		header : '委外加工联系人',
		width : 170,
		dataIndex : 'outMachgContcr',
		sortable : true
	}, {
		header : '录入日期',
		width : 170,
		dataIndex : 'inputDt',
		sortable : true
	}, {
		header : '操作员编号',
		width : 170,
		dataIndex : 'oprrId',
		sortable : true
	}, {
		header : '操作员',
		width : 170,
		dataIndex : 'oprr',
		sortable : true
	}, {
		header : '销售人员编号',
		width : 170,
		dataIndex : 'sellPersMemId',
		sortable : true
	}, {
		header : '销售人员',
		width : 170,
		dataIndex : 'sellPersMem',
		sortable : true
	}, {
		header : '验货方式',
		width : 170,
		dataIndex : 'gdsModeOra',
		sortable : true
	}, {
		header : '委外加工送货地址',
		width : 170,
		dataIndex : 'machgGdsAddr',
		sortable : true
	}, {
		header : '结算货币',
		width : 170,
		dataIndex : 'stlCurOra',
		sortable : true
	}, {
		header : '加工费合计',
		width : 170,
		dataIndex : 'machgCostSum',
		renderer: money('0,000.00' ),
		sortable : true
	}, {
		header : '付款方式',
		width : 170,
		dataIndex : 'payMdOra',
		sortable : true
	}, {
		header : '加工厂地址',
		width : 170,
		dataIndex : 'machgAddr',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂电话',
		width : 170,
		dataIndex : 'machgTel',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂传真',
		width : 170,
		dataIndex : 'machgFax',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂联系人',
		width : 170,
		dataIndex : 'machgContcr',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂联系人邮件',
		width : 170,
		dataIndex : 'machgContcrMail',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂银行名',
		width : 170,
		dataIndex : 'machgBankFstNm',
		hidden : true,
		sortable : true
	}, {
		header : '加工厂银行账户',
		width : 170,
		dataIndex : 'machgBankAcct',
		hidden : true,
		sortable : true
	}, {
		header : '包装要求',
		width : 170,
		dataIndex : 'pkgReqst',
		sortable : true
	}, {
		header : '质量要求',
		width : 170,
		dataIndex : 'qltyReqst',
		sortable : true
	}, {
		header : '委外加工型号',
		width : 170,
		dataIndex : 'machgModel',
		sortable : true
	}, {
		header : '附件',
		width : 170,
		dataIndex : 'attm',
		hidden : true,
		sortable : true
	}, {
		header : '备注',
		width : 170,
		dataIndex : 'memo',
		sortable : true
	}, {
		header : '外协合同ID',
		width : 170,
		hidden:true,
		dataIndex : 'asstContrId',
		sortable : true
	}, {
		  header : '开具发票说明',
		   width : 210,
		   dataIndex : 'memo1',
		   sortable : true
		          },{
		  header : '交（提）货地点和方式',
		   width : 210,
		   dataIndex : 'memo2',
		   sortable : true
		          },{
		  header : '运输方式及到达站港和费用负担',
		   width : 210,
		   dataIndex : 'memo3',
		   sortable : true
		          },{
		  header : '合理损耗和计算方法',
		   width : 210,
		   dataIndex : 'memo4',
		   sortable : true
	}]);	
	
	var record2 = Ext.data.Record.create([ {
		name : 'prodId',
		mapping : 'PROD_ID'
	}, {
		name : 'machgContrNum',
		mapping : 'MACHG_CONTR_NUM'
	}, {
//		name : 'machgContrNm',
//		mapping : 'MACHG_CONTR_NM'
//	}, {
		name : 'fstNm',
		mapping : 'FST_NM'
	},{
		name : 'spcModel',
		mapping : 'SPC_MODEL'
	},{
		name : 'ngtvPoor',
		mapping : 'NGTV_POOR'
	},{
		name : 'pkg',
		mapping : 'PKG'
	},{
		name : 'qty',
		mapping : 'QTY'
	},{
		name : 'uppr',
		mapping : 'UPRC'
	},{
		name : 'len',
		mapping : 'LEN'
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		header : '产品ID',
		width : 210,
		dataIndex : 'prodId',
		sortable : true
	}, {
		header : '加工合同号',
		width : 170,
		dataIndex : 'machgContrNum',
		sortable : true
	}, {
//		header : '加工合同名称',
//		width : 170,
//		dataIndex : 'machgContrNm',
//		sortable : true
//	}, {
		header : '品名',
		width : 170,
		dataIndex : 'fstNm',
		sortable : true
	}, {
		header : '规格型号',
		width : 170,
		dataIndex : 'spcModel',
		sortable : true
	}, {
		header : '长度',
		width : 170,
		hidden:false,
		dataIndex : 'len',
		renderer: money('0,000.00' ),
		sortable : true
	}, {
		header : '负差',
		width : 170,
		dataIndex : 'ngtvPoor',
		sortable : true
	}, {
		header : '包装',
		width : 170,
		hidden:false,
		dataIndex : 'pkg',
		sortable : true
	}, {
		header : '数量（吨）',
		width : 170,
		hidden:false,
		dataIndex : 'qty',
		renderer: money('0,000.00' ),
		sortable : true
	}, {
		header : '单价',
		width : 170,
		hidden:false,
		dataIndex : 'uppr',
		renderer: money('0,000.00' ),
		sortable : true
	}]);

	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgContractMgmtQueryAction.json',
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
				"machgContrNum":machgContrNum
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 外协加工合同商品数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgProductQueryAction.json',
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
				"machgContrNum":machgContrNum
			})
	};
	// 默认加载数据
	store2.load();	

 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "外协加工合同列表",
		store : store1,
		collapsible:true,
		height : 200,
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
		title : "外协加工合同商品信息列表",
		store : store2,
		collapsible:true,
		height : 200,
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
			}]
        } ]
    });
	
});	