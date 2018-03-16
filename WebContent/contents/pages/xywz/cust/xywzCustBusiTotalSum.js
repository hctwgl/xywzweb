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
					url :basepath+'/lookup.json?name=XYWZ_COUNTRY' //客户信用等级
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "客户汇总查询",
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
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'custId',
							fieldLabel : '客户名称',
							anchor : '95%',
							hidden:true
						},new Com.xywz.common.CustomerInfoQuery(
								{
									fieldLabel : '客户名称',
									labelStyle : 'text-align:right;',
									//labelWidth : 100,
									//name : 'custShtNm',
									id : 'CUST_SHT_NM22',
									singleSelected : false,
									// 单选复选标志
//									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
										qForm.getForm().findField('custId').setValue(parseInt(records[0].data.CUST_ID));
										
									}
								}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'cntryUrbn',
							fieldLabel : '所属国家',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : boxstore2,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'SignDtBegin',
							fieldLabel : '统计起始日期',
							anchor : '90%',
							format : 'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelWidth : 90,
							Width : '100',
							name : 'SignDtEnd',
							fieldLabel : '统计结束日期',
							anchor : '90%',
							format : 'Y-m-d'
						} ]
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
				name : 'custId',
				mapping : 'CUST_ID'
			}, {
				name : 'custShtNm',
				mapping : 'CUST_SHT_NM'
			}, {
				name : 'cntryUrbn',
				mapping : 'CNTRY_URBN'
			}, {
				name : 'cntryUrbnOra',
				mapping : 'CNTRY_URBN_ORA'
			}, {
				name : 'signDt',
				mapping : 'SIGN_DT'
			},{
				name : 'cur',
				mapping : 'CUR'
			},{
				name : 'curOra',
				mapping : 'CUR_ORA'
			},{
				name : 'qty',
				mapping : 'QTY'
			},{
				name : 'amount',
				mapping : 'AMOUNT'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '客户ID',
				width : 100,
				dataIndex : 'custId',
				sortable : true
			}, {
				header : '客户名称',
				width : 170,
				dataIndex : 'custShtNm',
				sortable : true
			}, {
				header : '所属国家',
				width : 170,
				dataIndex : 'cntryUrbnOra',
				sortable : true
			}, {
				header : '签约日期',
				width : 170,
				dataIndex : 'signDt',
				sortable : true
			}, {
				header : '币种',
				width : 170,
				dataIndex : 'curOra',
				sortable : true
			}, {
				header : '总吨数',
				width : 170,
				dataIndex : 'qty',
				sortable : true,
				renderer: money('0,000.000' )
			}, {
				header : '总金额',
				width : 170,
				hidden:false,
				dataIndex : 'amount',
				sortable : true,
				renderer: money('0,000.00' )
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzCustBusiTotalSumAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'custId',
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
						items : [new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzCustBusiTotalSumAction.json'
							        })]
					});
			
			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '客户汇总信息列表(万元、吨)',
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