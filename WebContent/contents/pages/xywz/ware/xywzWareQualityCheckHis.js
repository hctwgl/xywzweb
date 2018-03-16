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
				title : "质量历史查询",
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
							name : 'SPC_MODEL',
							fieldLabel : '规格型号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'CONTR_NUM',
							fieldLabel : '合同号',
							anchor : '90%'
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
			var record = Ext.data.Record.create([
			             {name : 'planId',
                    	   mapping : 'PLAN_ID'
                    	  }, {
                    	  name : 'contrNum',
                    	   mapping : 'CONTR_NUM'
                    	  }, {
                    	  name : 'merchdId',
                    	   mapping : 'MERCHD_ID'
                    	  }, {
                    	  name : 'merchdType',
                    	   mapping : 'MERCHD_TYPE_ORA'
                    	  }, {
                    	  name : 'channalType',
                    	   mapping : 'CHANNAL_TYPE_ORA'
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
                    	  name : 'denst',
                    	   mapping : 'DENST'
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
                    	  name : 'remZhiCnt',
                    	   mapping : 'REM_ZHI_CNT'
                    	  }, {
                    	  name : 'weight',
                    	   mapping : 'WEIGHT'
                    	  }, {
                    	  name : 'workshop',
                    	   mapping : 'WORKSHOP_ORA'
                    	  }, {
                    	  name : 'checkDt',
                    	   mapping : 'CHECK_DT'
                    	  }, {
                    	  name : 'checkUserid',
                    	   mapping : 'CHECK_USERID'
                    	  }, {
                    	  name : 'checkUsername',
                    	   mapping : 'CHECK_USERNAME'
                    	  }, {
                    	  name : 'scheduNum',
                    	   mapping : 'SCHEDU_NUM'
                    	  }, {
                        	  name : 'checkStatus',
                       	   mapping : 'CHECK_STATUS_ORA'
                       	  }, {
                    	  name : 'memo',
                    	   mapping : 'MEMO'
                    	  }

			                                     ]);

        			// 定义列模型			

        			var cm = new Ext.grid.ColumnModel([ rownum, 
        			      {header : '任务ID',
        				   width : 120,
        				   hidden:true,
        				   dataIndex : 'planId',
        				   sortable : true
        				  }, {
        				  header : '合同号',
        				   width : 120,
        				   dataIndex : 'contrNum',
        				   sortable : true
        				  }, {
        				  header : '商品ID',
        				   width : 120,
        				   hidden:true,
        				   dataIndex : 'merchdId',
        				   sortable : true
        				  }, {
        				  header : '商品类型',
        				   width : 120,
        				   hidden:true,
        				   dataIndex : 'merchdType',
        				   sortable : true
        				  }, {
        				  header : '渠道类型',
        				   width : 120,
        				   dataIndex : 'channalType',
        				   sortable : true
        				  }, {
        				  header : '品名',
        				   width : 120,
        				   dataIndex : 'prdName',
        				   sortable : true
        				  }, {
        				  header : '规格型号',
        				   width : 180,
        				   dataIndex : 'spcModel',
        				   sortable : true
        				  }, {
            				  header : '长度（米）',
           				   width : 120,
           				   dataIndex : 'len',
           				   sortable : true
           				  }, {
           					  header : '质检状态',
             				   width : 120,
             				   dataIndex : 'checkStatus',
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
           				  header : '零支',
           				   width : 120,
           				   dataIndex : 'remZhiCnt',
           				   sortable : true
           				  }, {
            			   header : '材质',
           				   width : 180,
           				   dataIndex : 'materials',
           				   sortable : true
           				  }, {
            				  header : '重量（吨数）',
           				   width : 120,
           				   hidden:true,
           				   dataIndex : 'weight',
           				   sortable : true
           				  }, {
        				  header : '负差',
        				   width : 120,
        				   dataIndex : 'ngtvPoor',
        				   sortable : true
        				  }, {
        				  header : '材质',
        				   width : 120,
        				   dataIndex : 'materials',
        				   sortable : true
        				  }, {
        				  header : '公差',
        				   width : 120,
        				   dataIndex : 'tolerance',
        				   sortable : true
        				  }, {
        				  header : '密度',
        				   width : 120,
        				   dataIndex : 'denst',
        				   sortable : true
        				  }, {
        				  header : '车间',
        				   width : 120,
        				   dataIndex : 'workshop',
        				   sortable : true
        				  }, {
        				  header : '质检日期',
        				   width : 120,
        				   dataIndex : 'checkDt',
        				   sortable : true
        				  }, {
        				  header : '质检人',
        				   width : 120,
        				   dataIndex : 'checkUserid',
        				   sortable : true
        				  }, {
        				  header : '质检人名称',
        				   width : 120,
        				   dataIndex : 'checkUsername',
        				   sortable : true
        				  }, {
        				  header : '排产单据',
        				   width : 120,
        				   hidden:true,
        				   dataIndex : 'scheduNum',
        				   sortable : true
        				  }, {
        				  header : '备注',
        				   width : 120,
        				   dataIndex : 'memo',
        				   sortable : true
        				  }
        				  ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzWareQualityCheckHisQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'CHECK_ID',
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
				title : '质检历史列表',
				frame : true,
				autoScroll : true,
				region : 'center',
				store : store,
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
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