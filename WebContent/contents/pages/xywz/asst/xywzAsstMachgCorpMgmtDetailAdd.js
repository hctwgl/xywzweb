Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
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

	var columns1 = new Ext.grid.ColumnModel([{
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
	
	var record2 = Ext.data.Record.create([ {
		name : 'id',
		mapping : 'ID'
	}, {
		name : 'asstMachgId',
		mapping : 'ASST_MACHG_ID'
	},{
		name : 'esmCorp',
		mapping : 'ESM_CORP'
	},{
		name : 'acctNum',
		mapping : 'ACCT_NUM'
	},{
		name : 'memo',
		mapping : 'MEMO'
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		header : '外协加工工厂编号',
		width : 210,
		dataIndex : 'asstMachgId',
		sortable : true
	}, {
		header : '快递公司',
		width : 170,
		dataIndex : 'esmCorp',
		sortable : true
	}, {
		header : '账号',
		width : 170,
		dataIndex : 'acctNum',
		sortable : true
	}, {
		header : '备注',
		width : 170,
		dataIndex : 'memo',
		sortable : true
	}, {
		header : 'ID',
		width : 170,
		hidden:true,
		dataIndex : 'id',
		sortable : true
	}]);
	
	var record3 = Ext.data.Record.create([ {
		name : 'id',
		mapping : 'ID'
	}, {
		name : 'asstMachgId',
		mapping : 'ASST_MACHG_ID'
	},{
		name : 'asstMachgContcrId',
		mapping : 'ASST_MACHG_CONTCR_ID'
	},{
		name : 'asstMachgContcr',
		mapping : 'ASST_MACHG_CONTCR'
	},{
		name : 'followPersMemId',
		mapping : 'FOLLOW_PERS_MEM_ID'
	},{
		name : 'followPersMem',
		mapping : 'FOLLOW_PERS_MEM'
	},{
		name : 'followDt',
		mapping : 'FOLLOW_DT'
	},{
		name : 'followMode',
		mapping : 'FOLLOW_MODE'
	},{
		name : 'sketch',
		mapping : 'SKETCH'
	},{
		name : 'dtlDesc',
		mapping : 'DTL_DESC'
	},{
		name : 'rsltCls',
		mapping : 'RSLT_CLS'
	},{
	   name : 'rsltClsOra',
	   mapping : 'RSLT_CLS_ORA'
	  }, { 
		name : 'milestone',
		mapping : 'MILESTONE'
	},{
		name : 'isNtCustInitvCont',
		mapping : 'IS_NT_CUST_INITV_CONT'
	},{
		   name : 'isNtCustInitvContOra',
		   mapping : 'IS_NT_CUST_INITV_CONT_ORA'
		  }, { 
		name : 'labelInfo',
		mapping : 'LABEL_INFO'
	}]);

	// 定义列模型			

	var columns3 = new Ext.grid.ColumnModel([{
		header : '外协加工工厂编号',
		width : 210,
		dataIndex : 'asstMachgId',
		sortable : true
	}, {
		header : '外协加工厂联系人ID',
		width : 170,
		dataIndex : 'asstMachgContcrId',
		sortable : true,
		hidden : true
	}, {
		header : '外协加工厂联系人',
		width : 170,
		dataIndex : 'asstMachgContcr',
		sortable : true
	}, {
		header : '跟进人员编号',
		width : 170,
		dataIndex : 'followPersMemId',
		sortable : true
	}, {
		header : '跟进人员',
		width : 170,
		dataIndex : 'followPersMem',
		sortable : true
	}, {
		header : '跟进日期',
		width : 170,
		dataIndex : 'followDt',
		sortable : true
	}, {
		header : '跟进方式',
		width : 170,
		dataIndex : 'followMode',
		sortable : true
	}, {
		header : '简述',
		width : 170,
		dataIndex : 'sketch',
		sortable : true
	}, {
		header : '详细描述',
		width : 170,
		dataIndex : 'dtlDesc',
		sortable : true
	}, {
		header : '结果分类',
		width : 170,
		dataIndex : 'rsltClsOra',
		sortable : true
	}, {
		header : '里程碑',
		width : 170,
		dataIndex : 'milestone',
		sortable : true
	}, {
		header : '是否客户主动联系',
		width : 170,
		dataIndex : 'isNtCustInitvContOra',
		sortable : true
	}, {
		header : '标注信息',
		width : 170,
		dataIndex : 'labelInfo',
		sortable : true
	}, {
		header : 'ID',
		width : 170,
		hidden:true,
		dataIndex : 'id',
		sortable : true
	}]);

	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgCorpMgmtQueryAction.json',
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
				"asstMachgId":asstMachgId
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 外协加工工厂物流数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgMgmtEMSQueryAction.json',
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
				"asstMachgId":asstMachgId
			})
	};
	// 默认加载数据
	store2.load();	
	
	/**
	 * 外协加工工厂客户跟进数据存储
	 */
	var store3 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/XywzAsstMachgMgmtCstFollowQueryAction.json'
		}),
		reader : new Ext.data.JsonReader({
			successProperty : 'success',
//			idProperty : 'BANK_ID',
			messageProperty : 'message',
			root : 'json.data',
			totalProperty : 'json.count'
		}, record3)
	});
	// 默认加载数据
	store3.baseParams = {
			"condition" : Ext.encode({
				"asstMachgId":asstMachgId
			})
	};
	// 默认加载数据
	store3.load();

 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "外协加工工厂列表",
		store : store1,
		collapsible:true,
		height : 130,
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
		title : "外协加工工厂物流信息列表",
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
		title : "外协加工工厂客户跟进信息列表",
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