Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				title : "变更任务单查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 100,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'CONTR_NUM',
							fieldLabel : '合同号',
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							fieldLabel : '<font color=red>*</font>合同号',
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
//						if(!qForm.getForm().isValid()){
//							Ext.Msg.alert('提示','请输入查询条件!');
//							return false;
//						}
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

			var record = Ext.data.Record.create([{
				  name : 'CONTR_NUM',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'HS_CODE',
				   mapping : 'HS_CODE'
				  }, {
				  name : 'MATERIALS',
				   mapping : 'MATERIALS'
				  }, {
				  name : 'MODEL',
				   mapping : 'MODEL'
				  }, {
				  name : 'LEN',
				   mapping : 'LEN'
				  }, {
				  name : 'WEIGHT_TOLERANCE',
				   mapping : 'WEIGHT_TOLERANCE'
				  }, {
				  name : 'QTY',
				   mapping : 'QTY'
				  }, {
				  name : 'ZHI_CNT',
				   mapping : 'ZHI_CNT'
				  }, {
				  name : 'TOTAL_JIAN',
				   mapping : 'TOTAL_JIAN'
				  }, {
				  name : 'TOTAL_REM_ZHI',
				   mapping : 'TOTAL_REM_ZHI'
				  }, {
				  name : 'BEF_PKG',
				   mapping : 'BEF_PKG'
				  }, {
				  name : 'AFTER_WEIGHT',
				   mapping : 'AFTER_WEIGHT'
				  }, {
				  name : 'PKG',
				   mapping : 'PKG'
				  }, {
				  name : 'FINAL_TRAFF_DAY',
				   mapping : 'FINAL_TRAFF_DAY'
				  }, {
				  name : 'USER_NAME',
				   mapping : 'USER_NAME'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, //sm, 
			                                    {
				  header : '合同号',
				   width : 120,
				   dataIndex : 'CONTR_NUM',
				   sortable : true
				  }, {
				  header : '品名',
				   width : 120,
				   dataIndex : 'HS_CODE',
				   sortable : true
				  }, {
				  header : '材质',
				   width : 120,
				   dataIndex : 'MATERIALS',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 120,
				   dataIndex : 'MODEL',
				   sortable : true
				  }, {
				  header : '长度',
				   width : 120,
				   dataIndex : 'LEN',
				   sortable : true
				  }, {
				  header : '重量负差',
				   width : 120,
				   dataIndex : 'WEIGHT_TOLERANCE',
				   sortable : true
				  }, {
				  header : '变更前重量(吨)',
				   width : 120,
				   dataIndex : 'QTY',
				   sortable : true
				  }, {
				  header : '每件支数',
				   width : 120,
				   dataIndex : 'ZHI_CNT',
				   sortable : true
				  }, {
				  header : '总件数',
				   width : 120,
				   dataIndex : 'TOTAL_JIAN',
				   sortable : true
				  }, {
				  header : '零支',
				   width : 120,
				   dataIndex : 'TOTAL_REM_ZHI',
				   sortable : true
				  }, {
				  header : '变更前包装',
				   width : 120,
				   dataIndex : 'BEF_PKG',
				   sortable : true
				  }, {
				  header : '变更后重量(吨)',
				   width : 120,
				   dataIndex : 'AFTER_WEIGHT',
				   sortable : true
				  }, {
				  header : '变更后包装',
				   width : 120,
				   dataIndex : 'PKG',
				   sortable : true
				  }, {
				  header : '交货期',
				   width : 120,
				   dataIndex : 'FINAL_TRAFF_DAY',
				   sortable : true
				  }, {
				  header : '订单人',
				   width : 120,
				   dataIndex : 'USER_NAME',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPlanModiTskSnglQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					//idProperty : 'ORDR_ID',
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
//			store.load({
//				params : {
//					start : 0,
//					limit : parseInt(pagesize_combo.getValue())
//				}
//			});

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
			
			var tbar = new Ext.Toolbar(
					{
						items : [
									{
										text : '打印',
										iconCls : 'exportIconCss',
										handler : function() {
											var contrNum = qForm.getForm().findField('CONTR_NUM').getValue();
											if(contrNum==null||contrNum=='')
											{ 
												Ext.Msg.alert('提示','必须输入合同!');
												return false;
											}
//											var year = issuesDt.getFullYear();    //获取完整的年份(4位,1970-????)
//											var month = issuesDt.getMonth()+1;       //获取当前月份(0-11,0代表1月)
//											var day = issuesDt.getDate();        //获取当前日(1-31)
//											var date =year+"-"+month +"-"+day;
								  			window.open(basepath+"/contents/pages/xywz/plan/xywzPlanModiTskSnglPrint.jsp?contrNum="+contrNum,"newwindow","");
										
										
									}
									}]
					});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '变更任务单列表',
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