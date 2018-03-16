Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var workShopstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' 
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_WORKSHOP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
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
							name : 'scheduDate',
							fieldLabel : '排产日期',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'scheduNum',
							fieldLabel : '排产单号',
							anchor : '90%'
						} ]
					} , {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'workShop',
							fieldLabel : '排产车间',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : workShopstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							allowBlank:false,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						}) ]
					}]
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
				  name : 'contrNum',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'custShtNm',
				   mapping : 'CUST_SHT_NM'
				  }, {
				  name : 'prdName',
				   mapping : 'PRD_NAME'
				  }, {
				  name : 'spcModel',
				   mapping : 'SPC_MODEL'
				  }, {
				  name : 'ngtvPoor',
				   mapping : 'NGTV_POOR'
				  }, {
				  name : 'materials',
				   mapping : 'MATERIALS'
				  }, {
				  name : 'tolerance',
				   mapping : 'TOLERANCE'
				  }, {
				  name : 'len',
				   mapping : 'LEN'
				  }, {
				  name : 'zhiCnt',
				   mapping : 'ZHI_CNT'
				  }, {
				  name : 'jianCnt',
				   mapping : 'JIAN_CNT'
				  }, {
				  name : 'weight',
				   mapping : 'WEIGHT'
				  }, {
				  name : 'workshopOra',
				   mapping : 'WORKSHOP_ORA'
				  }, {
				  name : 'scheduDate',
				   mapping : 'SCHEDU_DATE'
				  }, {
				  name : 'scheduNum',
				   mapping : 'SCHEDU_NUM'
				  }, {
				  name : 'checkDt',
				   mapping : 'CHECK_DT'
				  }, {
				  name : 'checkStatus',
				   mapping : 'CHECK_STATUS'
				  }, {
				  name : 'checkStatusOra',
				   mapping : 'CHECK_STATUS_ORA'
				  }, {
				  name : 'checkWeight',
				   mapping : 'CHECK_WEIGHT'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '合同编号',
				   width : 120,
				   dataIndex : 'contrNum',
				   sortable : true
				  }, {
				  header : '客户名称',
				   width : 120,
				   dataIndex : 'custShtNm',
				   sortable : true
				  }, {
				  header : '排产日期',
				   width : 120,
				   dataIndex : 'scheduDate',
				   sortable : true
				  }, {
				  header : '质检日期',
				   width : 120,
				   dataIndex : 'checkDt',
				   sortable : true
				  }, {
				  header : '质检是否合格',
				   width : 120,
				   dataIndex : 'checkStatusOra',
				   sortable : true
				  }, {
				  header : '排产单号',
				   width : 120,
				   dataIndex : 'scheduNum',
				   sortable : true
				  }, {
				  header : '生产车间',
				   width : 120,
				   dataIndex : 'workshopOra',
				   sortable : true
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 120,
				   dataIndex : 'spcModel',
				   sortable : true
				  }, {
				  header : '材质',
				   width : 120,
				   dataIndex : 'materials',
				   sortable : true
				  }, {
				  header : '定尺长度',
				   width : 120,
				   dataIndex : 'len',
				   sortable : true
				  }, {
				  header : '支/件',
				   width : 120,
				   dataIndex : 'zhiCnt',
				   sortable : true
				  }, {
				  header : '件数',
				   width : 120,
				   dataIndex : 'jianCnt',
				   sortable : true
				  }, {
				  header : '排产数量(吨)',
				   width : 120,
				   dataIndex : 'weight',
				   sortable : true
				  }, {
				  header : '质检合格数量(吨)',
				   width : 120,
				   dataIndex : 'checkWeight',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdStatusQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : '',
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