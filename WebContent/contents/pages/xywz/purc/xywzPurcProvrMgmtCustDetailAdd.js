Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
		   name : 'provrId',
		   mapping : 'PROVR_ID'
		  }, { 
		   name : 'provrTyp',
		   mapping : 'PROVR_TYP'
		  }, { 
		   name : 'provrTypOra',
		   mapping : 'PROVR_TYP_ORA'
		  }, { 
		   name : 'provrStat',
		   mapping : 'PROVR_STAT'
		  }, { 
			   name : 'provrStatOra',
			   mapping : 'PROVR_STAT_ORA'
			  }, { 
		   name : 'provrNum',
		   mapping : 'PROVR_NUM'
		  }, { 
		   name : 'provrShtNm',
		   mapping : 'PROVR_SHT_NM'
		  }, { 
		   name : 'currStp',
		   mapping : 'CURR_STP'
		  }, { 
			   name : 'currStpOra',
			   mapping : 'CURR_STP_ORA'
			  }, { 
		   name : 'provrFullNm',
		   mapping : 'PROVR_FULL_NM'
		  }, { 
		   name : 'provrSrc',
		   mapping : 'PROVR_SRC'
		  }, { 
		   name : 'provrSrcOra',
		   mapping : 'PROVR_SRC_ORA'
		  }, { 
		   name : 'addr',
		   mapping : 'ADDR'
		  }, { 
		   name : 'setupDt',
		   mapping : 'SETUP_DT'
		  }, { 
		   name : 'ownPersNm',
		   mapping : 'OWN_PERS_NM'
		  }, { 
		   name : 'prodScop',
		   mapping : 'PROD_SCOP'
		  }, { 
		   name : 'mktScop',
		   mapping : 'MKT_SCOP'
		  }, { 
		   name : 'tel',
		   mapping : 'TEL'
		  }, { 
		   name : 'fax',
		   mapping : 'FAX'
		  }, { 
		   name : 'inputPersId',
		   mapping : 'INPUT_PERS_ID'
		  }, { 
		   name : 'inputPers',
		   mapping : 'INPUT_PERS'
		  }, { 
		   name : 'inputDt',
		   mapping : 'INPUT_DT'
		  }, { 
		   name : 'finalMdfrId',
		   mapping : 'FINAL_MDFR_ID'
		  }, { 
		   name : 'finalMdfr',
		   mapping : 'FINAL_MDFR'
		  }, { 
		   name : 'lastModiDt',
		   mapping : 'LAST_MODI_DT'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
	}]);

	// 定义列模型			

	var columns1 = new Ext.grid.ColumnModel([{
		   header : '供应商ID',
		   width : 210,
		   hidden:true,
		   dataIndex : 'provrId',
		   sortable : true
		  }, { 
		   header : '供应商类型',
		   width : 210,
		   dataIndex : 'provrTypOra',
		   sortable : true
		  }, { 
		   header : '供应商状态',
		   width : 210,
		   dataIndex : 'provrStatOra',
		   sortable : true
		  }, { 
		   header : '供应商编号',
		   width : 210,
		   dataIndex : 'provrNum',
		   sortable : true
		  }, { 
		   header : '供应商简称',
		   width : 210,
		   dataIndex : 'provrShtNm',
		   sortable : true
		  }, { 
		   header : '当前步骤',
		   width : 210,
		   dataIndex : 'currStpOra',
		   sortable : true
		  }, { 
		   header : '供应商全称',
		   width : 210,
		   dataIndex : 'provrFullNm',
		   sortable : true
		  }, { 
		   header : '供应商来源',
		   width : 210,
		   dataIndex : 'provrSrcOra',
		   sortable : true
		  }, { 
		   header : '地址',
		   width : 210,
		   dataIndex : 'addr',
		   sortable : true
		  }, { 
		   header : '创建日期',
		   width : 210,
		   dataIndex : 'setupDt',
		   sortable : true
		  }, { 
		   header : '拥有人名称',
		   width : 210,
		   dataIndex : 'ownPersNm',
		   sortable : true
		  }, { 
		   header : '产品范围',
		   width : 210,
		   dataIndex : 'prodScop',
		   sortable : true
		  }, { 
		   header : '市场范围',
		   width : 210,
		   dataIndex : 'mktScop',
		   sortable : true
		  }, { 
		   header : '电话',
		   width : 210,
		   dataIndex : 'tel',
		   sortable : true
		  }, { 
		   header : '传真',
		   width : 210,
		   dataIndex : 'fax',
		   sortable : true
		  }, { 
		   header : '录入人编号',
		   width : 210,
		   dataIndex : 'inputPersId',
		   sortable : true
		  }, { 
		   header : '录入人',
		   width : 210,
		   dataIndex : 'inputPers',
		   sortable : true
		  }, { 
		   header : '录入日期',
		   width : 210,
		   dataIndex : 'inputDt',
		   sortable : true
		  }, { 
		   header : '最后修改人编号',
		   width : 210,
		   dataIndex : 'finalMdfrId',
		   sortable : true
		  }, { 
		   header : '最后修改人',
		   width : 210,
		   dataIndex : 'finalMdfr',
		   sortable : true
		  }, { 
		   header : '最后一次修改日期',
		   width : 210,
		   dataIndex : 'lastModiDt',
		   sortable : true
		  }, { 
		   header : '备注',
		   width : 210,
		   dataIndex : 'memo',
		   sortable : true
	}]);	
	
	var record2 = Ext.data.Record.create([ {
		name : 'id',
		mapping : 'ID'
	}, {
		name : 'provrNum',
		mapping : 'PROVR_NUM'
	},{
		name : 'emsCorp',
		mapping : 'EMS_CORP'
	},{
		name : 'acctNum',
		mapping : 'ACCT_NUM'
	},{
		name : 'memo',
		mapping : 'MEMO'
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		header : '供应商编号',
		width : 210,
		dataIndex : 'provrNum',
		sortable : true
	}, {
		header : '快递公司',
		width : 170,
		dataIndex : 'emsCorp',
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
		   name : 'provrNum',
		   mapping : 'PROVR_NUM'
		  }, { 
		   name : 'provrContcrId',
		   mapping : 'PROVR_CONTCR_ID'
		  }, { 
		   name : 'provrContcr',
		   mapping : 'PROVR_CONTCR'
		  }, { 
		   name : 'persMemId',
		   mapping : 'PERS_MEM_ID'
		  }, { 
		   name : 'persMem',
		   mapping : 'PERS_MEM'
		  }, { 
		   name : 'persDt',
		   mapping : 'PERS_DT'
		  }, { 
		   name : 'persMode',
		   mapping : 'PERS_MODE'
		  }, { 
		   name : 'sketch',
		   mapping : 'SKETCH'
		  }, { 
		   name : 'dtlDesc',
		   mapping : 'DTL_DESC'
		  }, { 
		   name : 'rsltCls',
		   mapping : 'RSLT_CLS'
		  }, { 
			   name : 'rsltClsOra',
			   mapping : 'RSLT_CLS_ORA'
			  }, { 
		   name : 'milepost',
		   mapping : 'MILEPOST'
		  }, { 
		   name : 'isNtCustInitvCont',
		   mapping : 'IS_NT_CUST_INITV_CONT'
		  }, { 
			   name : 'isNtCustInitvContOra',
			   mapping : 'IS_NT_CUST_INITV_CONT_ORA'
			  }, { 
		   name : 'signInfo',
		   mapping : 'SIGN_INFO'
	}]);

	// 定义列模型			

	var columns3 = new Ext.grid.ColumnModel([{
		   header : 'ID',
		   width : 210,
		   dataIndex : 'id',
		   hidden : true,
		   sortable : true
		  }, { 
		   header : '供应商编号',
		   width : 210,
		   dataIndex : 'provrNum',
		   sortable : true
		  }, { 
		   header : '供应商联系人ID',
		   width : 210,
		   dataIndex : 'provrContcrId',
		   hidden : true,
		   sortable : true
		  }, { 
		   header : '供应商联系人',
		   width : 210,
		   dataIndex : 'provrContcr',
		   sortable : true
		  }, { 
		   header : '跟进人员编号',
		   width : 210,
		   dataIndex : 'persMemId',
		   sortable : true
		  }, { 
		   header : '跟进人员',
		   width : 210,
		   dataIndex : 'persMem',
		   sortable : true
		  }, { 
		   header : '跟进日期',
		   width : 210,
		   dataIndex : 'persDt',
		   sortable : true
		  }, { 
		   header : '跟进方式',
		   width : 210,
		   dataIndex : 'persMode',
		   sortable : true
		  }, { 
		   header : '简述',
		   width : 210,
		   dataIndex : 'sketch',
		   sortable : true
		  }, { 
		   header : '详细描述',
		   width : 210,
		   dataIndex : 'dtlDesc',
		   sortable : true
		  }, { 
		   header : '结果分类',
		   width : 210,
		   dataIndex : 'rsltClsOra',
		   sortable : true
		  }, { 
		   header : '里程碑',
		   width : 210,
		   dataIndex : 'milepost',
		   sortable : true
		  }, { 
		   header : '是否客户主动联系',
		   width : 210,
		   dataIndex : 'isNtCustInitvContOra',
		   sortable : true
		  }, { 
		   header : '标注信息',
		   width : 210,
		   dataIndex : 'signInfo',
		   sortable : true
	}]);


	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtCustQueryAction.json',
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
				"provrNum":provrNum
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 供应商快递公司数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtEMSQueryAction.json',
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
				"provrNum":provrNum
			})
	};
	// 默认加载数据
	store2.load();	
	
	/**
	 * 供应商银行数据存储
	 */
	var store3 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/XywzPurcProvrMgmtCstFollowQueryAction.json'
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
				"provrNum":provrNum
			})
	};
	// 默认加载数据
	store3.load();
 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "供应商列表",
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
		title : "供应商快递公司列表",
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
		title : "供应商客户跟进信息列表",
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