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
				title : "车间作业通知单查询",
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
							xtype : 'datefield',
							Width : '100',
							name : 'SCHEDU_DATE',
							fieldLabel : '<font color=red>*</font>排产时间',
							anchor : '90%',
							format:'Y-m-d',
							allowBlank : false,
							blankText : '请选择排产时间'
						} ]
					},{
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.SysmProductDetailQuery(
								{
									fieldLabel : '<font color=red>*</font>品名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'PRD_NAME',
									id : 'SIZE32',
									singleSelected : false,
									anchor : '90%',
									allowBlank : false,
									blankText : '请选择品名',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										qForm.getForm().findField('PRD_NAME').setValue(records[0].data.HS_CODE);
									}
								})]
					}  ]
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
                			 {
                			  name : 'planId',
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
                			   mapping : 'CHANNAL_TYPE'
                			  }, {
                			  name : 'prdName',
                			   mapping : 'PRD_NAME'
                			  }, {
                			  name : 'scheduDate',
                  			   mapping : 'SCHEDU_DATE'
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
                			  name : 'issuesDt',
                			   mapping : 'ISSUES_DT'
                			  }, {
                			  name : 'issuesUserid',
                			   mapping : 'ISSUES_USERID'
                			  }, {
                			  name : 'issuesUsername',
                			   mapping : 'ISSUES_USERNAME'
                			  }, {
                			  name : 'scheduNum',
                			   mapping : 'SCHEDU_NUM'
                			  }, {
                			  name : 'scheduStatus',
                			   mapping : 'SCHEDU_STATUS'
                			  }, {
                			  name : 'memo',
                			   mapping : 'MEMO'
                			  }
                			  ]);

        			// 定义列模型			

        			var cm = new Ext.grid.ColumnModel([ rownum, sm, 
        			     {
        				  header : '品名',
        				   width : 120,
        				   dataIndex : 'prdName',
        				   sortable : true
        				  }, {
        				  header : '规格型号',
        				   width : 120,
        				   dataIndex : 'spcModel',
        				   sortable : true
        				  },{
            				  header : '重量（吨数）',
           				   width : 120,
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
            				  header : '排产日期',
           				   width : 120,
           				   hidden : false,
           				   dataIndex : 'scheduDate',
           				   sortable : true
           				  }, {
        				  header : '入炉钢坯顺序、长度、根数及定尺根数',
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
					url : basepath + '/XywzPlanJobAdvsSnglPrintInfoQueryAction.json'
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
			
			// 表格工具栏
			var tbar = new Ext.Toolbar(
					{
						items : [{
							text : '打印',
							iconCls : 'addIconCss',
							handler : function() {
								var scheduDate = qForm.getForm().findField('SCHEDU_DATE').getValue();
								var prdName = qForm.getForm().findField('PRD_NAME').getValue();
								if(scheduDate==null||scheduDate=='')
								{ 
									Ext.Msg.alert('提示','必须输入排产日期!');
									return false;
								}
								if(prdName==null||prdName==''){
									Ext.Msg.alert('提示','必须输入品名!');
									return false;
								}
							//	Ext.Msg.alert(prdName);
								var year = scheduDate.getFullYear();    //获取完整的年份(4位,1970-????)
								var month = scheduDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
								var day = scheduDate.getDate();        //获取当前日(1-31)
								var date =year+"-"+month +"-"+day;
					  			window.open(basepath+"/contents/pages/xywz/plan/xywzPlanJobAdvsInfoPrint.jsp?scheduDate="+date+"&prdName="+prdName,"newwindow","");
							
							
						}
						}]
					});			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '车间作业通知单列表',
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