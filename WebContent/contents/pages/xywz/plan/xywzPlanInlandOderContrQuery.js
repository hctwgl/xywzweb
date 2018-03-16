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
					url :basepath+'/lookup.json?name=XYWZ_ORDR_STAT'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				title : "内贸订单查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'ordrStat',
							fieldLabel : '订单状态',
							labelStyle: 'text-align:right;',
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
					 })]
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
						store.load({
							params : {
								start : 0,
								limit : parseInt(pagesize_combo.getValue())
							}
						});

					}

				},{
					text : '重置',
					handler : function() {
	                	qForm.getForm().reset();
					}

				} ]
			});
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([
                         {
           			  name : 'ordrId',
       			   mapping : 'ORDR_ID'
       			          },{
       			  name : 'contrNum',
       			   mapping : 'CONTR_NUM'
       			          },{
       			  name : 'ordrStat',
       			   mapping : 'ORDR_STAT'
       			          },{
       			   name : 'ordrStatOra',
       				mapping : 'ORDR_STAT_ORA'
       					},{
       			  name : 'custId',
       			   mapping : 'CUST_ID'
       			          },{
       			  name : 'custNm',
       			   mapping : 'CUST_NM'
       			          },{
       			  name : 'contrDt',
       			   mapping : 'CONTR_DT'
       			          },{
       			  name : 'belgCorp',
       			   mapping : 'BELG_CORP'
       			          },{
       			   name : 'belgCorpOra',
       			  mapping : 'BELG_CORP_ORA'
       			          },{
       			  name : 'cur',
       			   mapping : 'CUR'
       			          },{
       			  name : 'amt',
       			   mapping : 'AMT'
       			          },{
       			  name : 'prepyMoneyDt',
       			   mapping : 'PREPY_MONEY_DT'
       			          },{
       			  name : 'prepyMoneyAmt',
       			   mapping : 'PREPY_MONEY_AMT'
       			          },{
       			  name : 'stlMode',
       			   mapping : 'STL_MODE'
       			          },{
       			  name : 'finalTraffDay',
       			   mapping : 'FINAL_TRAFF_DAY'
       			          },{
       			  name : 'finalTraffDetail',
       			   mapping : 'FINAL_TRAFF_DETAIL'
       			          },{
       			  name : 'qltyTechStdReqst',
       			   mapping : 'QLTY_TECH_STD_REQST'
       			          },{
       			  name : 'traffMode',
       			   mapping : 'TRAFF_MODE'
       			          },{
       			  name : 'ngtvPoor',
       			   mapping : 'NGTV_POOR'
       			          },{
       			  name : 'pkg',
       			   mapping : 'PKG'
       			          },{
       			  name : 'hesitPrd',
       			   mapping : 'HESIT_PRD'
       			          },{
       			  name : 'othXx',
       			   mapping : 'OTH_XX'
       			          },{
       			  name : 'sellPrincId',
       			   mapping : 'SELL_PRINC_ID'
       			          },{
       			  name : 'sellPrinc',
       			   mapping : 'SELL_PRINC'
       			          },{
       			  name : 'makDocPersId',
       			   mapping : 'MAK_DOC_PERS_ID'
       			          },{
       			  name : 'makDocPers',
       			   mapping : 'MAK_DOC_PERS'
       			          },{
       			  name : 'chkStat',
       			  mapping : 'CHK_STAT'
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
			  }
			  ]);

			// 定义列模型			
			
			var cm = new Ext.grid.ColumnModel([  rownum, sm,
			     {
				  header : '内贸合同ID',
				   width : 100,
				   dataIndex : 'ordrId',
				   sortable : true
				          },{
				  header : '合同号',
				   width : 100,
				   dataIndex : 'contrNum',
				   sortable : true
				          },{
				  header : '订单状态',
				   width : 100,
				   dataIndex : 'ordrStatOra',
				   sortable : true
				          },{
				  header : '买方名称',
				   width : 100,
				   dataIndex : 'custNm',
				   sortable : true
				          },{
				  header : '签约日期',
				   width : 100,
				   dataIndex : 'contrDt',
				   sortable : true
				          },{
				  header : '卖方所属公司',
				   width : 100,
				   dataIndex : 'belgCorpOra',
				   sortable : true
				          },{
				  header : '币种',
				   width : 100,
				   dataIndex : 'cur',
				   sortable : true
				          },{
				  header : '金额',
				   width : 100,
				   dataIndex : 'amt',
				   sortable : true
				          },{
				  header : '预付款日期',
				   width : 100,
				   dataIndex : 'prepyMoneyDt',
				   sortable : true
				          },{
				  header : '预付款金额',
				   width : 100,
				   dataIndex : 'prepyMoneyAmt',
				   sortable : true
				          },{
				  header : '结算方式',
				   width : 100,
				   dataIndex : 'stlMode',
				   sortable : true
				          },{
				  header : '交货期',
				   width : 100,
				   dataIndex : 'finalTraffDay',
				   sortable : true
				          },{
				  header : '交货地点方式等描述',
				   width : 100,
				   dataIndex : 'finalTraffDetail',
				   sortable : true
				          },{
				  header : '质量技术标准要求',
				   width : 100,
				   dataIndex : 'qltyTechStdReqst',
				   sortable : true
				          },{
				  header : '运输方式及到达站港和费用负担',
				   width : 100,
				   dataIndex : 'traffMode',
				   sortable : true
				          },{
				  header : '合理损耗和计算方法',
				   width : 100,
				   dataIndex : 'ngtvPoor',
				   sortable : true
				          },{
				  header : '包装物的供应和回收',
				   width : 100,
				   dataIndex : 'pkg',
				   sortable : true
				          },{
				  header : '验收标准方法及提出异议期限',
				   width : 100,
				   dataIndex : 'hesitPrd',
				   sortable : true
				          },{
				  header : '其他XX',
				   width : 100,
				   dataIndex : 'othXx',
				   sortable : true
				          },{
				  header : '销售负责人编号',
				   width : 100,
				   dataIndex : 'sellPrincId',
				   sortable : true
				          },{
				  header : '销售负责人',
				   width : 100,
				   dataIndex : 'sellPrinc',
				   sortable : true
				          },{
				  header : '制单人编号',
				   width : 100,
				   dataIndex : 'makDocPersId',
				   sortable : true
				          },{
				  header : '制单人',
				   width : 100,
				   dataIndex : 'makDocPers',
				   sortable : true
				          },{
				  header : '下达状态',
				   width : 100,
				   dataIndex : 'chkStatOra',
				   sortable : true
				          },{
					header : '排产状态',
					width : 100,
					dataIndex : 'paiChanOra',
					sortable : true
				          },{
				  header : '录入人编号',
				   width : 100,
				   dataIndex : 'inputPersId',
				   sortable : true
				          },{
				  header : '录入人名称',
				   width : 100,
				   dataIndex : 'inputPersNm',
				   sortable : true
				          },{
				  header : '录入日期',
				   width : 100,
				   dataIndex : 'inputDt',
				   sortable : true
				          },{
				  header : '最后一次修改人编号',
				   width : 100,
				   dataIndex : 'lastMdfrId',
				   sortable : true
				          },{
				  header : '最后一次修改人',
				   width : 100,
				   dataIndex : 'lastMdfr',
				   sortable : true
				          },{
				  header : '最后一次修改日期',
				   width : 100,
				   dataIndex : 'lastModiDt',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanInlandOderContrQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'INLAND_ORDR_ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record)
			});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10条/页' ], [ 20, '20条/页' ], [ 50, '50条/页' ],
								[ 100, '100条/页' ], [ 250, '250条/页' ],
								[ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '20',
				editable : false,
				width : 85
			});

			// 默认加载数据
			store.load({
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});

			// 改变每页显示条数reload数据
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(pagesize_combo.getValue()),
				store.reload({
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});
			});
			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : parseInt(pagesize_combo.getValue()),
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});
						

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '内贸订单列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
//				tbar : tbar, // 表格工具栏
				bbar : bbar,// 分页工具栏
				viewConfig : {},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ {
					layout:'border',
					items : [ qForm ,grid]
				}]
			});

		});