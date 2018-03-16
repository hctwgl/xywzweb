//合同任务单打印
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
				title : "合同任务单查询",
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
						items : [new Com.xywz.common.ContractFrgnQuery(
								{
									fieldLabel : '<font color=red>*</font>销售合同号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'CONTR_NUM',
									id : 'SELL_CONTR_NUM',
									singleSelected : false,
									// 单选复选标志
									//editable : false,
									//allowBlank : false,
									// 不允许为空
									//blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								}) ]
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
//			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([{
				  name : 'ID',
				   mapping : 'ID'
				  }, {
				  name : 'CHDID',
				   mapping : 'CHDID'
				  }, {
				  name : 'CONTR_NUM',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'PRD_NAME',
				   mapping : 'PRD_NAME'
				  }, {
				  name : 'SPC_MODEL',
				   mapping : 'SPC_MODEL'
				  }, {
				  name : 'MATERIALS',
				   mapping : 'MATERIALS'
				  }, {
				  name : 'SQTY',
				   mapping : 'SQTY'
				  }, {
				  name : 'WEIGHT',
				   mapping : 'WEIGHT'
				  }, {
				  name : 'WEIGHT_TOLERANCE',
				   mapping : 'WEIGHT_TOLERANCE'
				  }, {
				  name : 'PKG',
				   mapping : 'PKG'
				  }, {
				  name : 'LEN',
				   mapping : 'LEN'
				  }, {
				  name : 'MEMO',
				   mapping : 'MEMO'
				  }, {
				  name : 'MERCHD_TYPE',
				   mapping : 'MERCHD_TYPE'
				  }, {
				  name : 'ZHI_CNT',
				   mapping : 'ZHI_CNT'
				  }, {
				  name : 'JIAN_CNT',
				   mapping : 'JIAN_CNT'
				  }, {
				  name : 'REM_ZHI_CNT',
				   mapping : 'REM_ZHI_CNT'
				  }, {
				  name : 'SUM_ZHI',
				   mapping : 'SUM_ZHI'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, {
				  header : '商品ID',
				   width : 120,
				   hidden:true,
				   dataIndex : 'CHDID',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'CONTR_NUM',
				   sortable : true
				  },{
					  header : '商品类型',
					   width : 120,
					   dataIndex : 'MERCHD_TYPE',
					   sortable : true,
						renderer:function(value){
						if(value =='0'){
							return value ='外贸';
						}else if(value =='1'){
							return value = '内贸';
						}else{
						  return value = '外贸';
						}
					}
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'PRD_NAME',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 200,
				   dataIndex : 'SPC_MODEL',
				   sortable : true
				  }, {
				  header : '材质',
				   width : 120,
				   dataIndex : 'MATERIALS',
				   sortable : true
				  }, {
				  header : '重量（吨数）',
				   width : 120,
				   dataIndex : 'WEIGHT',
				   sortable : true
				  }, {
				  header : '负差',
				   width : 120,
				   dataIndex : 'WEIGHT_TOLERANCE',
				   sortable : true
				  }, 
//				  {
//				  header : '包装',
//				   width : 120,
//				   dataIndex : 'PKG',
//				   sortable : true
//				  }, 
				  {
				  header : '长度',
				   width : 120,
				   dataIndex : 'LEN',
				   sortable : true
				  }, {
				  header : '备注',
				   width : 120,
				   dataIndex : 'MEMO',
				   sortable : true
				  }
				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					//url : basepath + '/XywzPlanPrdcPlanAdvsSnglQueryAction.json'
					url : basepath + '/XywzPlanPrdPrintQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
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
			var tbar = new Ext.Toolbar(
					{
						items : [
									{
										text : '打印',
										iconCls:'exportIconCss',
										handler : function(button) {
										var contrNum = qForm.getForm().findField('SELL_CONTR_NUM').getValue();
										if(contrNum==null||contrNum=='')
										{ 
											Ext.Msg.alert('提示','必须输入销售合同!');
											return false;
										}
											window.open(basepath+"/mytest/other/add","newwindow","");
//								  			window.open(basepath+"/contents/pages/xywz/plan/xywzPlanPrdcPlanAdvsSnglPrintPrt.jsp?contrNum="+contrNum,"newwindow","");
										}
									}]
					});

			/**
			 * 数据存储
			 */
			var outStore = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanPrdcPlanAdvsSnglIssuedAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
					messageProperty : 'message',
					root : 'json.data',
					totalProperty : 'json.count'
				}, record)
			});
			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '合同任务单列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
//				sm : sm, // 复选框
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