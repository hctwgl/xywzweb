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
		name : 'contcrId',
		mapping : 'CONTCR_ID'
	}, {
		name : 'asstMachgId',
		mapping : 'ASST_MACHG_ID'
	}, {
		name : 'asstMachgNm',
		mapping : 'ASST_MACHG_NM'
	},{
		name : 'fstNm',
		mapping : 'FST_NM'
	},{
		name : 'salu',
		mapping : 'SALU'
	},{
		name : 'gender',
		mapping : 'GENDER'
	},{
		name : 'genderOra',
		mapping : 'GENDER_ORA'
	},{
		name : 'postn',
		mapping : 'POSTN'
	},{
		name : 'isNtPriCont',
		mapping : 'IS_NT_PRI_CONT'
	},{
	   name : 'isNtPriContOra',
	   mapping : 'IS_NT_PRI_CONT_ORA'
    },{ 
		name : 'belgDept',
		mapping : 'BELG_DEPT'
	},{
		name : 'tel',
		mapping : 'TEL'
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
		name : 'msn',
		mapping : 'MSN'
	},{
		name : 'skype',
		mapping : 'SKYPE'
	},{
		name : 'qq',
		mapping : 'QQ'
	},{
		name : 'asstMachgPriPicture',
		mapping : 'ASST_MACHG_PRI_PICTURE'
	},{
		name : 'othInstMsg',
		mapping : 'OTH_INST_MSG'
	},{
		name : 'addr',
		mapping : 'ADDR'
	},{
		name : 'zipCd',
		mapping : 'ZIP_CD'
	},{
		name : 'setupDt',
		mapping : 'SETUP_DT'
	},{
		name : 'memo',
		mapping : 'MEMO'
	},{
		name : 'ownPersNm',
		mapping : 'OWN_PERS_NM'
	},{
		name : 'contcrMailAddr',
		mapping : 'CONTCR_MAIL_ADDR'
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		header : '联系人ID',
		width : 210,
		dataIndex : 'contcrId',
		hidden : true,
		sortable : true
	}, {
		header : '外协加工厂编号',
		width : 170,
		dataIndex : 'asstMachgId',
		sortable : true
	}, {
		header : '外协加工厂名称',
		width : 170,
		dataIndex : 'asstMachgNm',
		hidden : true,
		sortable : true
	}, {
		header : '名字',
		width : 170,
		dataIndex : 'fstNm',
		sortable : true
	}, {
		header : '称谓',
		width : 170,
		dataIndex : 'salu',
		sortable : true
	}, {
		header : '性别',
		width : 170,
		hidden:false,
		dataIndex : 'genderOra',
		sortable : true
	}, {
		header : '职位',
		width : 170,
		hidden:false,
		dataIndex : 'postn',
		sortable : true
	}, {
		header : '是否主联系',
		width : 170,
		hidden:false,
		dataIndex : 'isNtPriContOra',
		sortable : true
	}, {
		header : '所属部门',
		width : 170,
		hidden:false,
		dataIndex : 'belgDept',
		sortable : true
	}, {
		header : '电话',
		width : 170,
		hidden:false,
		dataIndex : 'tel',
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
		header : 'MSN',
		width : 170,
		hidden:false,
		dataIndex : 'msn',
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
		header : '外协加工厂主图片',
		width : 170,
		hidden:false,
		dataIndex : 'asstMachgPriPicture',
		sortable : true,
		hidden : true
	}, {
		header : '其他即时通讯',
		width : 170,
		hidden:false,
		dataIndex : 'othInstMsg',
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
		header : '建立日期',
		width : 170,
		hidden:false,
		dataIndex : 'setupDt',
		format : 'Y-m-d',
		sortable : true
	}, {
		header : '备注',
		width : 170,
		hidden:false,
		dataIndex : 'memo',
		sortable : true
	}, {
		header : '拥有人名称',
		width : 170,
		hidden:false,
		dataIndex : 'ownPersNm',
		sortable : true
	}, {
		header : '联系人邮件地址',
		width : 170,
		hidden:false,
		dataIndex : 'contcrMailAddr',
		sortable : true
	}]);
	
	var record3 = Ext.data.Record.create([ {
		name : 'id',
		mapping : 'ID'
	}, {
		name : 'bankFullNm',
		mapping : 'BANK_FULL_NM'
	}, {
		name : 'bankAddr',
		mapping : 'BANK_ADDR'
	}, {
		name : 'bankTel',
		mapping : 'BANK_TEL'
	}, {
		name : 'asstMachgId',
		mapping : 'ASST_MACHG_ID'
	}, {
		name : 'memo',
		mapping : 'MEMO'
	}, {
		name : 'enFstNm',
		mapping : 'EN_FST_NM'
	}, {
		name : 'bfcy',
		mapping : 'BFCY'
	}, {
		name : 'acctNum',
		mapping : 'ACCT_NUM'
	}, {
		name : 'openAcctFstNm',
		mapping : 'OPEN_ACCT_FST_NM'
	}]);

	// 定义列模型			

	var columns3 = new Ext.grid.ColumnModel([{
		header : '银行全称',
		width : 210,
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
		dataIndex : 'bankTel',
		sortable : true
	}, {
		header : '外协加工厂编号',
		width : 170,
		dataIndex : 'asstMachgId',
		sortable : true
	}, {
		header : '备注',
		width : 170,
		dataIndex : 'memo',
		sortable : true
	}, {
		header : '英文名',
		width : 170,
		dataIndex : 'enFstNm',
		sortable : true
	}, {
		header : '受益人',
		width : 170,
		dataIndex : 'bfcy',
		sortable : true
	}, {
		header : '账户',
		width : 170,
		dataIndex : 'acctNum',
		sortable : true
	}, {
		header : '开户名',
		width : 170,
		dataIndex : 'openAcctFstNm',
		sortable : true
	}, {
		header : '银行ID',
		width : 170,
		hidden : true,
		dataIndex : 'Id',
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
	 * 外协加工工厂联系人数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgContcrMgmtQueryAction.json',
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
	 * 外协加工工厂银行数据存储
	 */
	var store3 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
			url : basepath + '/XywzAsstMachgMgmtBankQueryAction.json'
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
		title : "外协加工工厂联系人列表",
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
		title : "外协加工工厂银行信息列表",
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