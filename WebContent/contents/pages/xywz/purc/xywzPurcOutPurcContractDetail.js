Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	var contentHeight=document.documentElement.clientHeight;
	// 定义自动当前页行号
	var record1 = Ext.data.Record.create([ {
		   name : 'id',
		   mapping : 'ID'
		  }, { 
		   name : 'sgn',
		   mapping : 'SGN'
		  }, { 
		   name : 'chkStat',
		   mapping : 'CHK_STAT'
		  }, { 
			   name : 'chkStatOra',
			   mapping : 'CHK_STAT_ORA'
			  }, { 
		   name : 'src',
		   mapping : 'SRC'
		  }, { 
		   name : 'puchSnglId',
		   mapping : 'PUCH_SNGL_ID'
		  }, { 
		   name : 'formId',
		   mapping : 'FORM_ID'
		  }, { 
		   name : 'contrDt',
		   mapping : 'CONTR_DT'
		  }, { 
		   name : 'cfmDvy',
		   mapping : 'CFM_DVY'
		  }, { 
			   name : 'cfmDvyOra',
			   mapping : 'CFM_DVY_ORA'
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
		   name : 'stlCur',
		   mapping : 'STL_CUR'
		  }, { 
			   name : 'stlCurOra',
			   mapping : 'STL_CUR_ORA'
			  }, { 
		   name : 'merchdTotlQty',
		   mapping : 'MERCHD_TOTL_QTY'
		  }, { 
		   name : 'merchdTotlAmt',
		   mapping : 'MERCHD_TOTL_AMT'
		  }, { 
		   name : 'contrTotlAmt',
		   mapping : 'CONTR_TOTL_AMT'
		  }, { 
		   name : 'incTaxSum',
		   mapping : 'INC_TAX_SUM'
		  }, { 
		   name : 'othAddMoney',
		   mapping : 'OTH_ADD_MONEY'
		  }, { 
		   name : 'othDedctMoney',
		   mapping : 'OTH_DEDCT_MONEY'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
		  }, { 
		   name : 'puchDeptNm',
		   mapping : 'PUCH_DEPT_NM'
		  }, { 
		   name : 'puchPersId',
		   mapping : 'PUCH_PERS_ID'
		  }, { 
		   name : 'puchPersFstNm',
		   mapping : 'PUCH_PERS_FST_NM'
		  }, { 
		   name : 'bizMemId',
		   mapping : 'BIZ_MEM_ID'
		  }, { 
		   name : 'bizMemFstNm',
		   mapping : 'BIZ_MEM_FST_NM'
		  }, { 
		   name : 'ownPersNm',
		   mapping : 'OWN_PERS_NM'
		  }, { 
		   name : 'inputDt',
		   mapping : 'INPUT_DT'
		  }, { 
		   name : 'insnMode',
		   mapping : 'INSN_MODE'
		  }, { 
			   name : 'insnModeOra',
			   mapping : 'INSN_MODE_ORA'
			  }, { 
		   name : 'delyAddr',
		   mapping : 'DELY_ADDR'
		  }, { 
		   name : 'traffMode',
		   mapping : 'TRAFF_MODE'
		  }, { 
			   name : 'traffModeOra',
			   mapping : 'TRAFF_MODE_ORA'
			  }, { 
		   name : 'payMd',
		   mapping : 'PAY_MD'
		  }, { 
			   name : 'payMdOra',
			   mapping : 'PAY_MD_ORA'
			  }, { 
		   name : 'ordrCurrStat',
		   mapping : 'ORDR_CURR_STAT'
			  }, { 
				   name : 'ordrCurrStatOra',
				   mapping : 'ORDR_CURR_STAT_ORA'
	}]);

	// 定义列模型			

	var columns1 = new Ext.grid.ColumnModel([{
		   header : 'ID',
		   width : 210,
		   dataIndex : 'id',
		   sortable : true,
		   hidden : true
		  }, {
		   header : '审核状态',
		   width : 210,
		   dataIndex : 'chkStatOra',
		   sortable : true
		  }, { 
		   header : '来源',
		   width : 210,
		   dataIndex : 'src',
		   sortable : true
		  }, { 
		   header : '采购单编号',
		   width : 210,
		   dataIndex : 'puchSnglId',
		   sortable : true
		  }, { 
		   header : '单据编号',
		   width : 210,
		   dataIndex : 'formId',
		   sortable : true
		  }, { 
		   header : '签约日期',
		   width : 210,
		   dataIndex : 'contrDt',
		   sortable : true
		  }, { 
		   header : '确定交货',
		   width : 210,
		   dataIndex : 'cfmDvyOra',
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
		   header : '结算货币',
		   width : 210,
		   dataIndex : 'stlCurOra',
		   sortable : true
		  }, { 
		   header : '商品总数量',
		   width : 210,
		   dataIndex : 'merchdTotlQty',
		   sortable : true,
		   renderer: money('0,000' )
		  }, { 
		   header : '商品总金额',
		   width : 210,
		   dataIndex : 'merchdTotlAmt',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, { 
		   header : '合同总金额',
		   width : 210,
		   dataIndex : 'contrTotlAmt',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, { 
		   header : '进项税总计',
		   width : 210,
		   dataIndex : 'incTaxSum',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, { 
		   header : '其他增加款',
		   width : 210,
		   dataIndex : 'othAddMoney',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, { 
		   header : '其他扣除款',
		   width : 210,
		   dataIndex : 'othDedctMoney',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, {  
		   header : '标注',
		   width : 210,
		   dataIndex : 'sgn',
		   sortable : true
		  }, { 
		   header : '备注',
		   width : 210,
		   dataIndex : 'memo',
		   sortable : true
		  }, { 
		   header : '采购部门名称',
		   width : 210,
		   dataIndex : 'puchDeptNm',
		   sortable : true
		  }, { 
		   header : '采购人编号',
		   width : 210,
		   dataIndex : 'puchPersId',
		   sortable : true
		  }, { 
		   header : '采购人名字',
		   width : 210,
		   dataIndex : 'puchPersFstNm',
		   sortable : true
		  }, { 
		   header : '业务员编号',
		   width : 210,
		   dataIndex : 'bizMemId',
		   sortable : true
		  }, { 
		   header : '业务员名字',
		   width : 210,
		   dataIndex : 'bizMemFstNm',
		   sortable : true
		  }, { 
		   header : '拥有人名称',
		   width : 210,
		   dataIndex : 'ownPersNm',
		   sortable : true
		  }, { 
		   header : '录入日期',
		   width : 210,
		   dataIndex : 'inputDt',
		   sortable : true
		  }, { 
		   header : '验货方式',
		   width : 210,
		   dataIndex : 'insnModeOra',
		   sortable : true
		  }, { 
		   header : '送货地址',
		   width : 210,
		   dataIndex : 'delyAddr',
		   sortable : true
		  }, { 
		   header : '运输方式',
		   width : 210,
		   dataIndex : 'traffModeOra',
		   sortable : true
		  }, { 
		   header : '付款方式',
		   width : 210,
		   dataIndex : 'payMdOra',
		   sortable : true
		  }, { 
		   header : '订单当前状态',
		   width : 210,
		   dataIndex : 'ordrCurrStatOra',
		   sortable : true
	}]);	
	
	var record2 = Ext.data.Record.create([ {
		   name : 'merchdId',
		   mapping : 'MERCHD_ID'
		  }, { 
		   name : 'puchSnglId',
		   mapping : 'PUCH_SNGL_ID'
		  }, { 
		   name : 'provrNum',
		   mapping : 'PROVR_NUM'
		  }, { 
		   name : 'provrGdsNum',
		   mapping : 'PROVR_GDS_NUM'
		  }, { 
		   name : 'merchdNum',
		   mapping : 'MERCHD_NUM'
		  }, { 
		   name : 'merchdCnFstNm',
		   mapping : 'MERCHD_CN_FST_NM'
		  }, { 
		   name : 'merchdEnFstNm',
		   mapping : 'MERCHD_EN_FST_NM'
		  }, { 
		   name : 'merchdEnSpc',
		   mapping : 'MERCHD_EN_SPC'
		  }, { 
		   name : 'merchdCnSpc',
		   mapping : 'MERCHD_CN_SPC'
		  }, { 
		   name : 'puchMeasrCorp',
		   mapping : 'PUCH_MEASR_CORP'
		  }, { 
		   name : 'puchUprc',
		   mapping : 'PUCH_UPRC'
		  }, { 
		   name : 'color',
		   mapping : 'COLOR'
		  }, { 
		   name : 'material',
		   mapping : 'MATERIAL'
		  }, { 
		   name : 'snglNtWht',
		   mapping : 'SNGL_NT_WHT'
		  }, { 
		   name : 'snglGrWht',
		   mapping : 'SNGL_GR_WHT'
		  }, { 
		   name : 'snglItemVol',
		   mapping : 'SNGL_ITEM_VOL'
		  }, { 
		   name : 'snglQty',
		   mapping : 'SNGL_QTY'
		  }, { 
		   name : 'prdcComnt',
		   mapping : 'PRDC_COMNT'
		  }, { 
		   name : 'pkgReqst',
		   mapping : 'PKG_REQST'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
		  }, { 
			   name : 'hsCode',
			   mapping : 'HS_CODE'
	          },{ 
			   name : 'model',
			   mapping : 'MODEL'
	          },{ 
			   name : 'kgM',
			   mapping : 'KG_M'
	          },{ 
			   name : 'qty',
			   mapping : 'QTY'
	          },{ 
			   name : 'piecesCnt',
			   mapping : 'PIECES_CNT'
	          },{ 
			   name : 'pieces',
			   mapping : 'PIECES'
	          },{ 
			   name : 'uprc',
			   mapping : 'UPRC' 
	          },{ 
			   name : 'len',
			   mapping : 'LEN' 
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		   header : '商品ID',
		   width : 210,
		   dataIndex : 'merchdId',
		   sortable : true
		  }, { 
		   header : '采购单编号',
		   width : 210,
		   dataIndex : 'puchSnglId',
		   sortable : true
		  }, { 
		   header : '供应商编号',
		   width : 210,
		   dataIndex : 'provrNum',
		   sortable : true
		  }, { 
		   header : '供应商货号',
		   width : 210,
		   dataIndex : 'provrGdsNum',
		   sortable : true
		  }, { 
		   header : '商品编号',
		   width : 210,
		   dataIndex : 'merchdNum',
		   sortable : true
		  }, { 
		   header : '商品中文名',
		   width : 210,
		   dataIndex : 'merchdCnFstNm',
		   sortable : true
		  }, { 
		   header : '商品英文名',
		   width : 210,
		   dataIndex : 'merchdEnFstNm',
		   sortable : true
		  }, { 
		   header : '商品英文规格',
		   width : 210,
		   dataIndex : 'merchdEnSpc',
		   sortable : true
		  }, { 
		   header : '商品中文规格',
		   width : 210,
		   dataIndex : 'merchdCnSpc',
		   sortable : true
		  }, { 
		   header : '采购计量单位',
		   width : 210,
		   dataIndex : 'puchMeasrCorp',
		   sortable : true
		  }, { 
		   header : '采购单价',
		   width : 210,
		   dataIndex : 'puchUprc',
		   sortable : true,
		   renderer: money('0,000.00' )
		  }, { 
		   header : '颜色',
		   width : 210,
		   dataIndex : 'color',
		   sortable : true
		  }, { 
		   header : '材料',
		   width : 210,
		   dataIndex : 'material',
		   sortable : true
		  }, { 
		   header : '单箱净重',
		   width : 210,
		   dataIndex : 'snglNtWht',
		   sortable : true,
		   renderer: money('0,000' )
		  }, { 
		   header : '单箱毛重',
		   width : 210,
		   dataIndex : 'snglGrWht',
		   sortable : true,
		   renderer: money('0,000' )
		  }, { 
		   header : '单项体积',
		   width : 210,
		   dataIndex : 'snglItemVol',
		   sortable : true,
		   renderer: money('0,000' )
		  }, { 
		   header : '单箱数量',
		   width : 210,
		   dataIndex : 'snglQty',
		   sortable : true,
		   renderer: money('0,000' )
		  }, { 
		   header : '生产说明',
		   width : 210,
		   dataIndex : 'prdcComnt',
		   sortable : true
		  }, { 
		   header : '包装要求',
		   width : 210,
		   dataIndex : 'pkgReqst',
		   sortable : true
		  }, { 
		   header : '备注',
		   width : 210,
		   dataIndex : 'memo',
		   sortable : true
		  }, { 
			   header : '品名',
			   width : 210,
			   dataIndex : 'hsCode',
			   sortable : true
			          },{ 
			   header : '型号',
			   width : 210,
			   dataIndex : 'model',
			   sortable : true
			          },{ 
						   header : '长度',
						   width : 210,
						   dataIndex : 'len',
						   sortable : true,
						   renderer: money('0,000.00' )
			          },{ 
			   header : 'KG_M',
			   width : 210,
			   dataIndex : 'kgM',
			   sortable : true
			          },{ 
			   header : '数量',
			   width : 210,
			   dataIndex : 'qty',
			   sortable : true,
			   renderer: money('0,000.00' )
			          },{ 
			   header : '每件支数',
			   width : 210,
			   dataIndex : 'piecesCnt',
			   sortable : true,
			   renderer: money('0,000.00' )
			          },{ 
			   header : '件数',
			   width : 210,
			   dataIndex : 'pieces',
			   sortable : true,
			   renderer: money('0,000.00' )
			          },{ 
			   header : '单价',
			   width : 210,
			   dataIndex : 'uprc',
			   sortable : true,
			   renderer: money('0,000.00' )
	}]);


	/**
	 * 数据存储
	 */
	
 	var store1 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcOutPurcContractQueryAction.json',
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
				"puchSnglId":puchSnglId
			})
	};
	// 默认加载数据
	store1.load();

	/**
	 * 外采合同商品数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtProductQueryAction.json',
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
				"puchSnglId":puchSnglId
			})
	};
	// 默认加载数据
	store2.load();	

 	
	var listPanel1 = new Ext.grid.EditorGridPanel({
		title : "外采合同列表",
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
		title : "外采合同商品列表",
		store : store2,
		collapsible:true,
		height : 335,
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