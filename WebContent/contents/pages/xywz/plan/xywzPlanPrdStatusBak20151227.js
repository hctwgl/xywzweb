Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "生产状况跟进查询",
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
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'ordrStat',
							fieldLabel : '订单状态',
							anchor : '90%'
						} ]
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

			var record = Ext.data.Record.create([{
				  name : 'ordrId',
				   mapping : 'ORDR_ID'
				  }, {
				  name : 'ordrStat',
				   mapping : 'ORDR_STAT'
				  }, {
				  name : 'signDt',
				   mapping : 'SIGN_DT'
				  }, {
				  name : 'contrNum',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'custId',
				   mapping : 'CUST_ID'
				  }, {
				  name : 'cur',
				   mapping : 'CUR'
				  }, {
				  name : 'amt',
				   mapping : 'AMT'
				  }, {
				  name : 'brgnMode',
				   mapping : 'BRGN_MODE'
				  }, {
				  name : 'nextPlanSnglDt',
				   mapping : 'NEXT_PLAN_SNGL_DT'
				  }, {
				  name : 'payMd',
				   mapping : 'PAY_MD'
				  }, {
				  name : 'isNtRecvLc',
				   mapping : 'IS_NT_RECV_LC'
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
				  name : 'portofDischarge',
				   mapping : 'PORTOF_DISCHARGE'
				  }, {
				  name : 'sendTagDt',
				   mapping : 'SEND_TAG_DT'
				  }, {
				  name : 'isAlterCert',
				   mapping : 'IS_ALTER_CERT'
				  }, {
				  name : 'sellPrincId',
				   mapping : 'SELL_PRINC_ID'
				  }, {
				  name : 'sellPrinc',
				   mapping : 'SELL_PRINC'
				  }, {
				  name : 'makDocPersId',
				   mapping : 'MAK_DOC_PERS_ID'
				  }, {
				  name : 'makDocPers',
				   mapping : 'MAK_DOC_PERS'
				  }, {
				  name : 'ordrBelgZone',
				   mapping : 'ORDR_BELG_ZONE'
				  }, {
				  name : 'belgCorp',
				   mapping : 'BELG_CORP'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '订单号',
				   width : 120,
				   dataIndex : 'ordrId',
				   sortable : true
				  }, {
				  header : '订单状态',
				   width : 120,
				   dataIndex : 'ordrStat',
				   sortable : true
				  }, {
				  header : '签订日期',
				   width : 120,
				   dataIndex : 'signDt',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'contrNum',
				   sortable : true
				  }, {
				  header : '客户ID',
				   width : 120,
				   dataIndex : 'custId',
				   sortable : true
				  }, {
				  header : '币种',
				   width : 120,
				   dataIndex : 'cur',
				   sortable : true
				  }, {
				  header : '金额',
				   width : 120,
				   dataIndex : 'amt',
				   sortable : true
				  }, {
				  header : '成交方式',
				   width : 120,
				   dataIndex : 'brgnMode',
				   sortable : true
				  }, {
				  header : '下计划单日期',
				   width : 120,
				   dataIndex : 'nextPlanSnglDt',
				   sortable : true
				  }, {
				  header : '付款方式',
				   width : 120,
				   dataIndex : 'payMd',
				   sortable : true
				  }, {
				  header : '是否收到信用证',
				   width : 120,
				   dataIndex : 'isNtRecvLc',
				   sortable : true
				  }, {
				  header : '信用证号',
				   width : 120,
				   dataIndex : 'lcNum',
				   sortable : true
				  }, {
				  header : '预付款日期',
				   width : 120,
				   dataIndex : 'prepyMoneyDt',
				   sortable : true
				  }, {
				  header : '预付款金额',
				   width : 120,
				   dataIndex : 'prepyMoneyAmt',
				   sortable : true
				  }, {
				  header : '最后装运日',
				   width : 120,
				   dataIndex : 'finalTraffDay',
				   sortable : true
				  }, {
				  header : '目的港',
				   width : 120,
				   dataIndex : 'portofDischarge',
				   sortable : true
				  }, {
				  header : '发标签日期',
				   width : 120,
				   dataIndex : 'sendTagDt',
				   sortable : true
				  }, {
				  header : '是否改证',
				   width : 120,
				   dataIndex : 'isAlterCert',
				   sortable : true
				  }, {
				  header : '销售负责人编号',
				   width : 120,
				   dataIndex : 'sellPrincId',
				   sortable : true
				  }, {
				  header : '销售负责人',
				   width : 120,
				   dataIndex : 'sellPrinc',
				   sortable : true
				  }, {
				  header : '制单人编号',
				   width : 120,
				   dataIndex : 'makDocPersId',
				   sortable : true
				  }, {
				  header : '制单人',
				   width : 120,
				   dataIndex : 'makDocPers',
				   sortable : true
				  }, {
				  header : '订单所属地区',
				   width : 120,
				   dataIndex : 'ordrBelgZone',
				   sortable : true
				  }, {
				  header : '所属公司',
				   width : 120,
				   dataIndex : 'belgCorp',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanFrgnOderContrQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ORDR_ID',
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
				title : '生产状况跟进列表',
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