Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“统计类型”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_STATS_TYP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "出口货物汇算表",
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'statsTyp',
							fieldLabel : '统计类型',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText : '请选择',
							resizable : true,
							//editable : false,
							anchor : '90%'
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
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([ {
				name : 'statsTyp',
				mapping : 'STATS_TYP'
			}, {
				name : 'statsTypOra',
				mapping : 'STATS_TYP_ORA'
			}, {
				name : 'contrNum',
				mapping : 'CONTR_NUM'
			}, {
				name : 'portofDischarge',
				mapping : 'PORTOF_DISCHARGE'
			}, {
				name : 'txTyp',
				mapping : 'TX_TYP'
			}, {
				name : 'txTypOra',
				mapping : 'TX_TYP_ORA'
			},{
				name : 'cnt',
				mapping : 'CNT'
			},{
				name : 'weight',
				mapping : 'WEIGHT'
			},{
				name : 'cur',
				mapping : 'CUR'
			},{
				name : 'amt',
				mapping : 'AMT'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '交易类型',
				width : 200,
				dataIndex : 'statsTypOra',
				sortable : true
			}, {
				header : '合同号',
				width : 170,
				dataIndex : 'contrNum',
				sortable : true
			}, {
				header : '目的港',
				width : 170,
				dataIndex : 'portofDischarge',
				sortable : true
			}, {
				header : '交易类型',
				width : 170,
				dataIndex : 'txTypOra',
				sortable : true
			}, {
				header : '票数',
				width : 150,
				dataIndex : 'cnt',
				sortable : true
			}, {
				header : '重量',
				width : 150,
				dataIndex : 'weight',
				sortable : true
			}, {
				header : '币种',
				width : 150,
				dataIndex : 'cur',
				sortable : true
			}, {
				header : '金额',
				width : 150,
				hidden:false,
				dataIndex : 'amt',
				sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAcctStmtMgmtSumQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'id',
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
						items : [{
							text : '打印',
							iconCls:'exportIconCss',
							handler : function(button) {							
					  			window.open(basepath+"/contents/pages/xywz/acct/xywzAcctStmtMgmtSumPrint.jsp","newwindow","");
							}
						}]
					});
			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '出口货物汇算表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
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