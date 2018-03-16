//车间作业单
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
				title : "生产记录查询",
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
						items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '品名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'HS_CODE',
									id : 'SIZE32',
									singleSelected : false,
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										qForm.getForm().findField('HS_CODE').setValue(records[0].data.HS_CODE);
									}
								}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '销售合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'CONTR_NUM',
									id : 'SELL_CONTR_NUM',
									singleSelected : false,
									// 单选复选标志
//									editable : false,
//									allowBlank : false,
									// 不允许为空
//									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})]
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
			//var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});
			var record = Ext.data.Record.create([  
                			 {
                			  name : 'CONTR_NUM',
                			   mapping : 'CONTR_NUM'
                			  }, 
                			  {
                			  name : 'HS_CODE',
                			   mapping : 'HS_CODE'
                			  }, {
                			  name : 'SPC_MODEL',
                			   mapping : 'SPC_MODEL'
                			  }, {
                    			  name : 'LEN',
                   			   mapping : 'LEN'
                   			  }, {
                			  name : 'MATERIALS',
                			   mapping : 'MATERIALS'
                			  }, {
                			  name : 'TOLERANCE',
                			   mapping : 'TOLERANCE'
                			  }, {
                			  name : 'QTY',
                			   mapping : 'QTY'
                			  }, {
                    			  name : 'TYPE',
                   			   mapping : 'TYPE'
                   			  }
                			  ]);

        			// 定义列模型			

        			var cm = new Ext.grid.ColumnModel([ rownum, //sm, 
        			     {header : '合同号',
        				   width : 120,
        				   dataIndex : 'CONTR_NUM',
        				   sortable : true
        				  }, 
        				  {
        				  header : '品名',
        				   width : 130,
        				   dataIndex : 'HS_CODE',
        				   sortable : true
        				  }, {
        				  header : '长度',
        				   width : 100,
        				   hidden:false,
        				   dataIndex : 'LEN',
        				   sortable : true
        				  }, {
            				  header : '规格型号',
           				   width : 180,
           				   hidden:false,
           				   dataIndex : 'SPC_MODEL',
           				   sortable : true
           				  }, {
        				  header : '材质',
        				   width : 120,
        				   dataIndex : 'MATERIALS',
        				   sortable : true
        				  }, {
        				  header : '负差',
        				   width : 180,
        				   dataIndex : 'TOLERANCE',
        				   sortable : true
        				  }, {
        				  header : '合同种类',
         				   width : 120,
         				   dataIndex : 'TYPE',
         				   sortable : true
         				  }, {
        				  header : '重量(吨)',
        				   width : 120,
        				   dataIndex : 'QTY',
        				   sortable : true
        				  }                   
        				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzJobTotalQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'PLAN_ID',
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
			var tbar = new Ext.Toolbar();		
			
			// 修改窗口展示的from
			var editXywzPlanJobAdvsSnglForm = new Ext.form.FormPanel({});
			var editXywzPlanJobAdvsSnglWindow = new Ext.Window({});
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '生产记录列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				//sm : sm, // 复选框
				tbar : tbar, // 表格工具栏
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