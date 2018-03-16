Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "最低最高库存预警查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
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
							name : 'contrNum',
							fieldLabel : '合同号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'merchdId',
							fieldLabel : '商品',
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
			  { name : 'SPC_MODEL',
				   mapping : 'SPC_MODEL'
			  }, {
			  name : 'PRD_NAME',
			   mapping : 'PRD_NAME'
			  }, {
			  name : 'WEIGHT',
			   mapping : 'WEIGHT'
			  }, {
			  name : 'WARN_HI_CNT',
			   mapping : 'WARN_HI_CNT'
			  }, {
			  name : 'WARN_LO_CNT',
			   mapping : 'WARN_LO_CNT'
			  }, {
				  name : 'TYPE',
				   mapping : 'TYPE'
				  }
			  ]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm,
			     {
				  header : '品名',
				   width : 200,
				   dataIndex : 'SPC_MODEL',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 200,
				   dataIndex : 'PRD_NAME',
				   sortable : true
				  }, {
					  header : '是否预警',
					   width : 200,
					   dataIndex : 'TYPE',
					   sortable : true,
					   renderer:function(value){
						if(value =='1'){
							return value ='<font color =red>*超高预警</font>';
						}else if(value =='-1'){
							return value = '<font color =red>*超低预警</font>';
						}else{
						  return value = '正常';
						}
					}
					}
				  ,{
					  header : '当前库存重量（吨）',
					   width : 150,
					   dataIndex : 'WEIGHT',
					   sortable : true
				  },{
					  header : '最高预警重量（吨）',
					   width : 150,
					   dataIndex : 'WARN_HI_CNT',
					   sortable : true
				  },{
					  header : '最低预警重量（吨）',
					   width : 150,
					   dataIndex : 'WARN_LO_CNT',
					   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareInvtyWarnQueryAction.json'
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
				title : '最低最高库存预警列表',
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