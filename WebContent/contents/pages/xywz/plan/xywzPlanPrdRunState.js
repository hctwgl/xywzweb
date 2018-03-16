Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROD_STATE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var boxstore3 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
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
				title : "正在生产的产品列表",
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
							name : 'hsCode',
							fieldLabel : '品名',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'spcModel',
							fieldLabel : '规格型号',
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

			var record = Ext.data.Record.create([ {
				  name : 'hsCode',
				   mapping : 'HS_CODE'
				          },{
				  name : 'spcModel',
				   mapping : 'SPC_MODEL'
				          },{
				  name : 'weight',
				   mapping : 'WEIGHT'
				          },
//				          {
//				  name : 'jianCnt',
//				   mapping : 'JIAN_CNT'
//				          },{
//				  name : 'remCnt',
//				   mapping : 'REM_CNT'
//				          },{
//				  name : 'zhiCnt',
//				   mapping : 'ZHI_CNT'
//				          },
				          {
				  name : 'workShop',
				   mapping : 'WORK_SHOP'
				          },{
				  name : 'workShopOra',
				   mapping : 'WORK_SHOP_ORA'
				          },{
				  name : 'prodState',
				   mapping : 'PROD_STATE'
				          },{
				  name : 'prodStateOra',
				   mapping : 'PROD_STATE_ORA'
				          }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, {
				  header : '品名',
				   width : 100,
				   dataIndex : 'hsCode',
				   sortable : true
				          },{
				  header : '规格型号',
				   width : 100,
				   dataIndex : 'spcModel',
				   sortable : true
				          },{
				  header : '重量（吨）',
				   width : 100,
				   dataIndex : 'weight',
				   sortable : true
				          },
//				          {
//				  header : '件数',
//				   width : 100,
//				   dataIndex : 'jianCnt',
//				   sortable : true
//				          },{
//				  header : '零支',
//				   width : 100,
//				   dataIndex : 'remCnt',
//				   sortable : true
//				          },{
//				  header : '支/件',
//				   width : 100,
//				   dataIndex : 'zhiCnt',
//				   sortable : true
//				          },
				          {
				  header : '车间',
				   width : 100,
				   dataIndex : 'workShopOra',
				   sortable : true
				          },{
				  header : '生产状态',
				   width : 100,
				   dataIndex : 'prodStateOra',
				   sortable : true
				          }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdStateRunQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'prodid',
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
			
			// 表格工具栏

			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '正在生产的产品列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				//sm : sm, // 复选框
				//tbar : tbar, // 表格工具栏
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