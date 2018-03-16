Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var boxstore = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=INV_STAT_FLAG'  //发票状态
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	
	var qForm = new Ext.form.FormPanel( {
		title : "外贸发票信息",
		labelWidth : 90, // 标签宽度
		frame : true, // 是否渲染表单面板背景色
		labelAlign : 'middle', // 标签对齐方式
		buttonAlign : 'center',
		region : 'north',
		split : true,
		height : 100,
		items : [ {
			layout : 'column',
			items : [ {
				columnWidth : .25,
				layout : 'form',
				items : [new Ext.form.ComboBox({
					hiddenName : 'invStat',
					fieldLabel : '发票状态',
					labelStyle: 'text-align:right;',
					triggerAction : 'all',
					store : boxstore,
					displayField : 'value',
					valueField : 'key',
					mode : 'local',
					forceSelection : true,
					typeAhead : true,
					emptyText:'请选择',
					resizable : true,
					anchor : '90%'
				}) ]
			}, {
				columnWidth : .25,
				layout : 'form',
				items : [ {
					xtype : 'numberfield',
					name : 'chkPers',
					hidden:true
				},new Com.xywz.common.CustomerInfoQuery(
						{
							fieldLabel : '收票人',
							labelStyle : 'text-align:right;',
							//labelWidth : 100,
							//name : 'chkPers',
							id : 'CUST_SHT_NM22',
							singleSelected : false,
							// 单选复选标志
							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
								qForm.getForm().findField('chkPers').setValue(parseInt(records[0].data.CUST_ID));
								
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
				store.load( {
					params : {
						start : 0,
						limit : parseInt(pagesize_combo.getValue())
					}
				});

			}

		}, {
			text : '重置',
			handler : function() {
				qForm.getForm().reset();
			}

		} ]
	});
	// 复选框
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
	
			   name : 'invId',
			   mapping : 'INV_ID'
			  }, { 
			   name : 'invStat',
			   mapping : 'INV_STAT'
			  }, { 
			   name : 'invStatOra',
			   mapping : 'INV_STAT_ORA'
			  }, { 
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, { 
			   name : 'invNum',
			   mapping : 'INV_NUM'
			  }, { 
			   name : 'chksPers',
			   mapping : 'CHKS_PERS'
			  }, { 
			   name : 'invDt',
			   mapping : 'INV_DT'
			  }, { 
			   name : 'sCno',
			   mapping : 'S_CNO'
			  }, { 
			   name : 'payments',
			   mapping : 'PAYMENTS'
			  }, { 
			   name : 'portofloading',
			   mapping : 'PORTOFLOADING'
			  }, { 
			   name : 'portofdestination',
			   mapping : 'PORTOFDESTINATION'
			  }, { 
			   name : 'incoterms',
			   mapping : 'INCOTERMS'
			  }, { 
			   name : 'shippingmarks',
			   mapping : 'SHIPPINGMARKS'
		     }, { 
			   name : 'custNm',
			   mapping : 'CUST_NM'
		     }, { 
			   name : 'loadPortNm',
			   mapping : 'LOAD_PORT_NM'
		     }, { 
			   name : 'desPortNm',
			   mapping : 'DES_PORT_NM'
		     }  ]);
//		
		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			   header : '发票ID',
			   width : 210,
			   dataIndex : 'invId',
			   sortable : true,
			   hidden : true
			  }, { 
			   header : '发票号',
			   width : 210,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
			   header : '发票状态',
			   width : 210,
			   dataIndex : 'invStatOra',
			   sortable : true
			  }, { 
			   header : '合同号',
			   width : 210,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '收票人',
			   width : 210,
			   dataIndex : 'chksPers',
			   sortable : true
			  }, { 
			   header : '收票人名称',
			   width : 210,
			   dataIndex : 'custNm',
			   sortable : true
			  }, { 
			   header : '发票日期',
			   width : 210,
			   dataIndex : 'invDt',
			   sortable : true
			  }, { 
			   header : 'S_CNO',
			   width : 210,
			   dataIndex : 'sCno',
			   sortable : true
			  }, { 
			   header : 'PAYMENTS',
			   width : 210,
			   dataIndex : 'payments',
			   sortable : true
			  }, { 
			   header : 'PORTOFLOADING',
			   width : 210,
			   dataIndex : 'portofloading',
			   sortable : true,
			   hidden:true
			  }, { 
			   header : 'PORTOFLOADING',
			   width : 210,
			   dataIndex : 'loadPortNm',
			   sortable : true
			  }, { 
			   header : 'PORTOFDESTINATION',
			   width : 210,
			   dataIndex : 'portofdestination',
			   sortable : true,
			   hidden:true
			  }, { 
			   header : 'PORTOFDESTINATION',
			   width : 210,
			   dataIndex : 'desPortNm',
			   sortable : true
			  }, { 
			   header : 'INCOTERMS',
			   width : 210,
			   dataIndex : 'incoterms',
			   sortable : true
			  }, { 
			   header : 'SHIPPINGMARKS',
			   width : 210,
			   dataIndex : 'shippingmarks',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/XywzSaleInvInfoQueryAction.json'
			}),
			reader : new Ext.data.JsonReader( {
				successProperty : 'success',
				idProperty : 'ID',
				messageProperty : 'message',
				root : 'json.data',
				totalProperty : 'json.count'
			}, record)
		});

		// 每页显示条数下拉选择框
		var pagesize_combo = new Ext.form.ComboBox( {
			name : 'pagesize',
			triggerAction : 'all',
			mode : 'local',
			store : new Ext.data.ArrayStore(
					{
						fields : [ 'value', 'text' ],
						data : [ [ 10, '10条/页' ], [ 20, '20条/页' ],
								[ 50, '50条/页' ], [ 100, '100条/页' ],
								[ 250, '250条/页' ], [ 500, '500条/页' ] ]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '20',
			editable : false,
			width : 85
		});

		// 默认加载数据
		store.load( {
			params : {
				start : 0,
				limit : parseInt(pagesize_combo.getValue())
			}
		});

		// 改变每页显示条数reload数据
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(pagesize_combo.getValue()), store.reload( {
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
		});
		// 分页工具栏
		var bbar = new Ext.PagingToolbar( {
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
								text : '发票打印',
								handler : function(button) {
									var record = grid.getSelectionModel().getSelected();
									var selectLength = grid.getSelectionModel().getSelections().length;
					      			if(record==null || record == undefined||selectLength>1){
					      				Ext.MessageBox.alert('提示','请选择一条记录.');
					      				return;
					      			}
					      			var cstmPacklistId = record.get("invNum");
						  			window.open(basepath+"/contents/pages/xywz/logi/xywzSaleCstmInvPrint.jsp?cstmPacklistId="+cstmPacklistId,"newwindow","");
								}
							},'-',{
								text : '箱单打印',
								handler : function(button) {
									var record = grid.getSelectionModel().getSelected();
									var selectLength = grid.getSelectionModel().getSelections().length;
					      			if(record==null || record == undefined||selectLength>1){
					      				Ext.MessageBox.alert('提示','请选择一条记录.');
					      				return;
					      			}
					      			var cstmPacklistId = record.get("invNum");
						  			window.open(basepath+"/contents/pages/xywz/logi/xywzSaleCstmDeclPacklistPrintDetail.jsp?cstmPacklistId="+cstmPacklistId,"newwindow","");
								}
							} ]
				});


		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸发票信息列表',
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
		var viewport = new Ext.Viewport( {
			layout : 'fit',
			items : [ {
				layout : 'border',
				items : [ qForm, grid ]
			} ]
		});

	});