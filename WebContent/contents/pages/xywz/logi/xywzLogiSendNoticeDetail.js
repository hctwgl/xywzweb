Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
		name : 'sendSheetAdvsId',
		   mapping : 'SEND_SHEET_ADVS_ID'
		  }, {
		  name : 'ordrNum',
		   mapping : 'ORDR_NUM'
		  }, {
		  name : 'shipName',
		   mapping : 'SHIP_NAME'
		  }, {
		  name : 'loadPort',
		   mapping : 'LOAD_PORT'
		  }, {
		  name : 'unloadPort',
		   mapping : 'UNLOAD_PORT'
		  }, {
		  name : 'expctToPortDay',
		   mapping : 'EXPCT_TO_PORT_DAY'
		  }, {
		  name : 'shipAgent',
		   mapping : 'SHIP_AGENT'
		  }, {
		  name : 'corpNm',
		   mapping : 'CORP_NM'
		  }, {
		  name : 'shipAgentContcr',
		   mapping : 'SHIP_AGENT_CONTCR'
		  }, {
		  name : 'gdsAgent',
		   mapping : 'GDS_AGENT'
		  }, {
		  name : 'agentNamr',
		   mapping : 'AGENT_NAMR'
		  }, {
		  name : 'gdsAgentContcr',
		   mapping : 'GDS_AGENT_CONTCR'
		  }, {
		  name : 'makDocPersId',
		   mapping : 'MAK_DOC_PERS_ID'
		  }, {
		  name : 'makDocPersNm',
		   mapping : 'MAK_DOC_PERS_NM'
		  }, {
		  name : 'lastGdsSitu',
		   mapping : 'LAST_GDS_SITU'
		  }, {
		  name : 'qtyPoor',
		   mapping : 'QTY_POOR'
		  }, {
		  name : 'weightNgtvPoor',
		   mapping : 'WEIGHT_NGTV_POOR'
		  }, {
		  name : 'ipeDesc',
		   mapping : 'IPE_DESC'
		  }, {
		  name : 'upnDesc',
		   mapping : 'UPN_DESC'
		  }, {
		  name : 'delvAddr',
		   mapping : 'DELV_ADDR'
		  }, {
		  name : 'delvPers',
		   mapping : 'DELV_PERS'
		  }, {
		  name : 'delvPersTel',
		   mapping : 'DELV_PERS_TEL'
		  }, {
		  name : 'mkTabPersId',
		   mapping : 'MK_TAB_PERS_ID'
		  }, {
		  name : 'mkTabPersNm',
		   mapping : 'MK_TAB_PERS_NM'
		  }, {
		  name : 'mkTabDt',
		   mapping : 'MK_TAB_DT'
		  }, {
		  name : 'portNameCn',
		   mapping : 'PORT_NAME_CN'
		  }, {
		  name : 'unPortNameCn',
		   mapping : 'UN_PORT_NAME_CN'
		  }, {
		  name : 'sendGoodsNotice',
		   mapping : 'SEND_GOODS_NOTICE'
		  }]);

	// 定义列模型			

	var columns1 = new Ext.grid.ColumnModel([{
		header : '发运通知ID',
		   width : 100,
		   dataIndex : 'sendSheetAdvsId',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '序号',
		   width : 100,
		   dataIndex : 'ordrNum',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '船名',
		   width : 100,
		   dataIndex : 'shipName',
		   sortable : true
		  }, {
		  header : '装港',
		   width : 100,
		   dataIndex : 'portNameCn',
		   sortable : true
		  }, {
		  header : '卸港',
		   width : 100,
		   dataIndex : 'unPortNameCn',
		   sortable : true
		  }, {
		  header : '预计到港日',
		   width : 80,
		   dataIndex : 'expctToPortDay',
		   sortable : true
		  }, {
		  header : '船代',
		   width : 100,
		   dataIndex : 'shipAgent',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '船代名称',
		   width : 100,
		   dataIndex : 'corpNm',
		   sortable : true
		  }, {
		  header : '船代联系人',
		   width : 100,
		   dataIndex : 'shipAgentContcr',
		   sortable : true
		  }, {
		  header : '货代',
		   width : 100,
		   dataIndex : 'agentNamr',
		   sortable : true
		  }, {
		  header : '货代联系人',
		   width : 100,
		   dataIndex : 'gdsAgentContcr',
		   sortable : true
		  }, {
		  header : '国阳制单人编号',
		   width : 100,
		   dataIndex : 'makDocPersId',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '国阳制单人名称',
		   width : 100,
		   dataIndex : 'makDocPersNm',
		   sortable : true
		  }, {
		  header : '上货情况',
		   width : 210,
		   dataIndex : 'lastGdsSitu',
		   sortable : true
		  }, {
		  header : '量差',
		   width : 100,
		   dataIndex : 'qtyPoor',
		   sortable : true
		  }, {
		  header : '重量负差',
		   width : 100,
		   dataIndex : 'weightNgtvPoor',
		   sortable : true
		  }, {
		  header : 'IPE描述',
		   width : 210,
		   dataIndex : 'ipeDesc',
		   sortable : true
		  }, {
		  header : 'UPN描述',
		   width : 210,
		   dataIndex : 'upnDesc',
		   sortable : true
		  }, {
		  header : '发货地址',
		   width : 100,
		   dataIndex : 'delvAddr',
		   sortable : true
		  }, {
		  header : '发货人',
		   width : 100,
		   dataIndex : 'delvPers',
		   sortable : true
		  }, {
		  header : '发货人电话',
		   width : 100,
		   dataIndex : 'delvPersTel',
		   sortable : true
		  }, {
		  header : '制表人编号',
		   width : 80,
		   dataIndex : 'mkTabPersId',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '制表人姓名',
		   width : 100,
		   dataIndex : 'mkTabPersNm',
		   sortable : true
		  }, {
		  header : '制表日期',
		   width : 100,
		   dataIndex : 'mkTabDt',
		   sortable : true
		  }, {
		  header : '发货注意事项描述',
		   width : 210,
		   dataIndex : 'sendGoodsNotice',
		   sortable : true
		  }]);
	
	var record2 = Ext.data.Record.create([ {
		   name : 'id',
		   mapping : 'ID'
		  }, {
		  name : 'sendSheetAdvsId',
		   mapping : 'SEND_SHEET_ADVS_ID'
		  }, {
		  name : 'gdsSrc',
		   mapping : 'GDS_SRC'
		  }, {
		  name : 'hsCode',
		   mapping : 'HS_CODE'
		  }, {
		  name : 'materials',
		   mapping : 'MATERIALS'
		  }, {
		  name : 'spcModel',
		   mapping : 'SPC_MODEL'
		  }, {
		  name : 'qty',
		   mapping : 'QTY'
		  }, {
		  name : 'pkg',
		   mapping : 'PKG'
		  }]);

	// 定义列模型			

	var columns2 = new Ext.grid.ColumnModel([{
		  header : 'ID',
		   width : 100,
		   dataIndex : 'id',
		   sortable : true,
		   hidden:true
		  }, {
		  header : '发运通知ID',
		   width : 60,
		   dataIndex : 'sendSheetAdvsId',
		   sortable : true,
		   hidden : true
		  }, {
		  header : '货源',
		   width : 100,
		   dataIndex : 'gdsSrc',
		   sortable : true
		  }, {
		  header : '品名',
		   width : 100,
		   dataIndex : 'hsCode',
		   sortable : true
		  }, {
		  header : '材质',
		   width : 100,
		   dataIndex : 'materials',
		   sortable : true
		  }, {
		  header : '规格型号',
		   width : 210,
		   dataIndex : 'spcModel',
		   sortable : true
		  }, {
		  header : '数量',
		   width : 100,
		   dataIndex : 'qty',
		   sortable : true
		  }, {
		  header : '包装',
		   width : 150,
		   dataIndex : 'pkg',
		   sortable : true
		  }]);
	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiSendNoticeQueryAction.json',
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
				"sendSheetAdvsId":sendSheetAdvsId
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
					url : basepath + '/XywzLogiDelvMerchdQueryAction.json',
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
				"sendSheetAdvsId":sendSheetAdvsId
			})
	};
	// 默认加载数据
	store2.load();	
		
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "发运通知单信息",
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
		title : "发运商品明细",
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
			}]
        } ]
    });
    

	
});	