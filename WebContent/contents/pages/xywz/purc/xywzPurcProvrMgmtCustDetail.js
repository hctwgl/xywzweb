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
		  }, { 
		   name : 'name',
		   mapping : 'NAME'
		  }, { 
		   name : 'salu',
		   mapping : 'SALU'
		  }, { 
		   name : 'gender',
		   mapping : 'GENDER'
		  }, { 
			   name : 'genderOra',
			   mapping : 'GENDER_ORA'
		  }, { 
		   name : 'postn',
		   mapping : 'POSTN'
		  }, { 
		   name : 'isNtPriCont',
		   mapping : 'IS_NT_PRI_CONT'
		  }, { 
			   name : 'isNtPriContOra',
			   mapping : 'IS_NT_PRI_CONT_ORA'
		  }, { 
		   name : 'belgDept',
		   mapping : 'BELG_DEPT'
		  }, { 
		   name : 'tel',
		   mapping : 'TEL'
		  }, { 
		   name : 'tel2',
		   mapping : 'TEL2'
		  }, { 
		   name : 'mobl',
		   mapping : 'MOBL'
		  }, { 
		   name : 'fax',
		   mapping : 'FAX'
		  }, { 
		   name : 'msn',
		   mapping : 'MSN'
		  }, { 
		   name : 'skype',
		   mapping : 'SKYPE'
		  }, { 
		   name : 'qq',
		   mapping : 'QQ'
		  }, { 
		   name : 'othInstMsg',
		   mapping : 'OTH_INST_MSG'
		  }, { 
		   name : 'addr',
		   mapping : 'ADDR'
		  }, { 
		   name : 'zipCd',
		   mapping : 'ZIP_CD'
		  }, { 
		   name : 'setupDt',
		   mapping : 'SETUP_DT'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
		  }, { 
		   name : 'ownPersNm',
		   mapping : 'OWN_PERS_NM'
		  }, { 
		   name : 'mailAddr',
		   mapping : 'MAIL_ADDR'
	}]);
	
	var columns2 = new Ext.grid.ColumnModel([{
		 header : 'ID',
		 width : 210,
		 hidden : true,
		 dataIndex : 'id',
		 sortable : true
		}, { 
		 header : '供应商编号',
		 width : 150,
		 dataIndex : 'provrNum',
		 sortable : true
		}, { 
		 header : '名字',
		 width : 150,
		 dataIndex : 'name',
		 sortable : true
		}, { 
		 header : '称谓',
		 width : 150,
		 dataIndex : 'salu',
		 sortable : true
		}, { 
		 header : '性别',
		 width : 100,
		 dataIndex : 'genderOra',
		 sortable : true
		}, { 
		 header : '职位',
		 width : 150,
		 dataIndex : 'postn',
		 sortable : true
		}, { 
		 header : '是否主联系',
		 width : 100,
		 dataIndex : 'isNtPriContOra',
		 sortable : true
		}, { 
		 header : '所属部门',
		 width : 150,
		 dataIndex : 'belgDept',
		 sortable : true
		}, { 
		 header : '电话',
		 width : 100,
		 dataIndex : 'tel',
		 sortable : true
		}, { 
		 header : '电话2',
		 width : 100,
		 dataIndex : 'tel2',
		 sortable : true
		}, { 
		 header : '手机',
		 width : 100,
		 dataIndex : 'mobl',
		 sortable : true
		}, { 
		 header : '传真',
		 width : 100,
		 dataIndex : 'fax',
		 sortable : true
		}, { 
		 header : 'MSN',
		 width : 150,
		 dataIndex : 'msn',
		 sortable : true
		}, { 
		 header : 'Skype',
		 width : 150,
		 dataIndex : 'skype',
		 sortable : true
		}, { 
		 header : 'QQ',
		 width : 150,
		 dataIndex : 'qq',
		 sortable : true
		}, { 
		 header : '其他即时通讯',
		 width : 150,
		 dataIndex : 'othInstMsg',
		 sortable : true
		}, { 
		 header : '地址',
		 width : 200,
		 dataIndex : 'addr',
		 sortable : true
		}, { 
		 header : '邮编',
		 width : 100,
		 dataIndex : 'zipCd',
		 sortable : true
		}, { 
		 header : '建立日期',
		 width : 100,
		 dataIndex : 'setupDt',
		 sortable : true
		}, { 
		 header : '备注',
		 width : 200,
		 dataIndex : 'memo',
		 sortable : true
		}, { 
		 header : '拥有人名称',
		 width : 150,
		 dataIndex : 'ownPersNm',
		 sortable : true
		}, { 
		 header : '联系人邮件地址',
		 width : 150,
		 dataIndex : 'mailAddr',
		 sortable : true
	}]);
	
	var record3 = Ext.data.Record.create([ {
		   name : 'id',
		   mapping : 'ID'
		  }, { 
			   name : 'bankId',
			   mapping : 'BANK_ID'
			  }, { 
		   name : 'provrNum',
		   mapping : 'PROVR_NUM'
		  }, { 
		   name : 'acctNum',
		   mapping : 'ACCT_NUM'
		  }, { 
		   name : 'bankFullNm',
		   mapping : 'BANK_FULL_NM'
		  }, { 
		   name : 'enFstNm',
		   mapping : 'EN_FST_NM'
		  }, { 
		   name : 'bankAddr',
		   mapping : 'BANK_ADDR'
		  }, { 
		   name : 'bankTel',
		   mapping : 'BANK_TEL'
		  }, { 
		   name : 'openAcctFstNm',
		   mapping : 'OPEN_ACCT_FST_NM'
		  }, { 
		   name : 'bfcy',
		   mapping : 'BFCY'
		  }, { 
		   name : 'memo',
		   mapping : 'MEMO'
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
		   header : '账号',
		   width : 210,
		   dataIndex : 'acctNum',
		   sortable : true
		  }, { 
		   header : '银行全名',
		   width : 210,
		   dataIndex : 'bankFullNm',
		   sortable : true
		  }, { 
		   header : '英文名',
		   width : 210,
		   dataIndex : 'enFstNm',
		   sortable : true
		  }, { 
		   header : '银行地址',
		   width : 210,
		   dataIndex : 'bankAddr',
		   sortable : true
		  }, { 
		   header : '银行电话',
		   width : 210,
		   dataIndex : 'bankTel',
		   sortable : true
		  }, { 
		   header : '开户名',
		   width : 210,
		   dataIndex : 'openAcctFstNm',
		   sortable : true
		  }, { 
		   header : '受益人',
		   width : 210,
		   dataIndex : 'bfcy',
		   sortable : true
		  }, { 
		   header : '备注',
		   width : 210,
		   dataIndex : 'memo',
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
	 * 供应商联系人数据存储
	 */
 	var store2 = new Ext.data.Store({
		restful : true,
		proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtContactQueryAction.json',
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
			url : basepath + '/XywzPurcProvrMgmtBankQueryAction.json'
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
		title : "供应商联系人列表",
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
		title : "供应商银行信息列表",
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