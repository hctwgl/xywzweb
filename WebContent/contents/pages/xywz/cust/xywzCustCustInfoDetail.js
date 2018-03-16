Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
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
	},{
		name : 'cntryUrbn',
		mapping : 'CNTRY_URBN'
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

	var columns1 = new Ext.grid.ColumnModel([{
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
		dataIndex : 'cntryUrbn',
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
	
	var columns2 = new Ext.grid.ColumnModel([{
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
	
	var record2 = Ext.data.Record.create([ {
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
	
	var record3 = Ext.data.Record.create([ {
		name : 'custBankId',
		mapping : 'CUST_BANK_ID'
	}, {
		name : 'custId',
		mapping : 'CUST_ID'
	}, {
		name : 'bankId',
		mapping : 'BANK_ID'
	}, {
		name : 'custShtNm',
		mapping : 'CUST_SHT_NM'
	}, {
		name : 'acctNum',
		mapping : 'ACCT_NUM'
	},{
		name : 'bankFullNm',
		mapping : 'BANK_FULL_NM'
	},{
		name : 'bankAddr',
		mapping : 'BANK_ADDR'
	},{
		name : 'bankTel',
		mapping : 'BANK_TEL'
	},{
		name : 'swiftCode',
		mapping : 'SWIFT_CODE'
	},{
		name : 'fax',
		mapping : 'FAX'
	}]);

	// 定义列模型			

	var columns3 = new Ext.grid.ColumnModel([{
		header : '客户银行ID',
		width : 210,
		dataIndex : 'custBankId',
		sortable : true,
		hidden : true
	}, {
		header : '客户ID',
		width : 170,
		dataIndex : 'custId',
		sortable : true,
		hidden : true
	}, {
		header : '客户名称',
		width : 170,
		dataIndex : 'custShtNm',
		sortable : true
	}, {
		header : '账号',
		width : 170,
		dataIndex : 'acctNum',
		sortable : true
	}, {
		header : '银行全称',
		width : 170,
		dataIndex : 'bankFullNm',
		sortable : true
	}, {
		header : '银行地址',
		width : 170,
		dataIndex : 'bankAddr',
		sortable : true
	}, {
		header : '银行电话',
		width : 170,
		hidden:false,
		dataIndex : 'bankTel',
		sortable : true
	}, {
		header : 'SWIFT_CODE',
		width : 170,
		hidden:false,
		dataIndex : 'swiftCode',
		sortable : true
	}, {
		header : 'FAX',
		width : 170,
		hidden:false,
		dataIndex : 'fax',
		sortable : true
	}]);


	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustCustInfoQueryAction.json',
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
				"custId":custId
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 客户联系人存储数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustCustContactDetailQueryAction.json',
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
				"custId":custId
			})
	};
	// 默认加载数据
	store2.load();	
	
	/**
	 * 客户银行信息数据存储
	 */
	var store3 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/XywzCustCustBankQueryAction.json'
		}),
		reader : new Ext.data.JsonReader({
			successProperty : 'success',
			idProperty : 'CUST_BANK_ID',
			messageProperty : 'message',
			root : 'json.data',
			totalProperty : 'json.count'
		}, record3)
	});
	// 默认加载数据
	store3.baseParams = {
			"condition" : Ext.encode({
				"custId":custId
			})
	};
	// 默认加载数据
	store3.load();


 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "客户列表",
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
		title : "客户联系人列表",
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
	var listPanel3 = new Ext.grid.EditorGridPanel({
		title : "客户银行信息",
		store : store3,
		collapsible:true,
		height : 200,
		frame : true,
		region : 'north',
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
            border : false,
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