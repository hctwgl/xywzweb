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
									fieldLabel : '规格型号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'SPC_MODEL',
									id : 'SIZE32',
									singleSelected : false,
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE_CONCAT);
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
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SELL_CONTR_NUM').oContractFrgnQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('SELL_CONTR_NUM').setValue(records[0].data.CONTR_NUM);
										//qForm.getForm().findField('shipCorp').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Ext.form.ComboBox({
							hiddenName : 'WORKSHOP',
							fieldLabel : '车间号',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : workShopstore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							allowBlank:false,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						})]
					}, {
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
			//var sm = new Ext.grid.CheckboxSelectionModel();

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
                    			  name : 'scheduDate',
                   			   mapping : 'SCHEDU_DATE'
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

        			var cm = new Ext.grid.ColumnModel([ rownum, //sm, 
        			     {header : '任务ID',
        				   width : 120,
        				   dataIndex : 'planId',
        				   hidden:true,
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
        				   dataIndex : 'merchdType',
        				   sortable : true
        				  }, {
        				  header : '品名',
        				   width : 120,
        				   dataIndex : 'prdName',
        				   sortable : true
        				  }, {
        				  header : '规格型号',
        				   width : 120,
        				   dataIndex : 'spcModel',
        				   sortable : true
        				  }, {
            				  header : '材质',
           				   width : 120,
           				   dataIndex : 'materials',
           				   sortable : true
           				  },{
            				  header : '重量（吨数）',
           				   width : 120,
           				   dataIndex : 'weight',
           				   sortable : true
           				  }, {
            				  header : '排产状态',
           				   width : 120,
           				   dataIndex : 'scheduStatus',
           				   hidden : true
           				  }, {
        				  header : '长度',
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
        				  header : '零支',
        				   width : 120,
        				   dataIndex : 'remZhiCnt',
        				   sortable : true
        				  }, {
        				  header : '排产日期',
       				       width : 120,
       				       dataIndex : 'scheduDate',
       				       sortable : true
           				  },  {
        				  header : '下达日期',
        				   width : 120,
        				   hidden : true,
        				   dataIndex : 'issuesDt',
        				   sortable : true
        				  }, {
        				  header : '下达人',
        				   width : 120,
        				   hidden : true,
        				   dataIndex : 'issuesUserid',
        				   sortable : true
        				  }, {
        				  header : '下达人名称',
        				   width : 120,
        				   hidden : true,
        				   dataIndex : 'issuesUsername',
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
					url : basepath + '/XywzPlanJobLogQueryAction.json'
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
			var tbar = new Ext.Toolbar(
//					{
//						items : [{
//										text : '<font color=red>确认生产完毕提交质检</font>',
//										iconCls : 'addIconCss',
//										handler : function() {
//										var selectLength = grid.getSelectionModel().getSelections().length;
//										if (selectLength < 1) {
//											Ext.Msg.alert('提示','请选择记录!');
//										}
//										Ext.MessageBox.confirm('提示','确定提交质检吗?',function(buttonId){
//											if(buttonId.toLowerCase() == "no"){
//												return;
//											}
//											var selectRe;
//											var tempId;
//											var tempType;
//											var idStr = '';
//											var typeStr = '';
//											for ( var i = 0; i < selectLength; i++) {
//												selectRe = grid.getSelectionModel().getSelections()[i];
//												tempId = selectRe.data.planId;
//												idStr += tempId;
//												if (i != selectLength - 1){
//													idStr += ',';
//												}
//													
//											}
//											Ext.Ajax.request({
//												url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!submitQuality.json',
//												waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
//												params:{
//													'idStr':idStr
//												},
//												success : function() {
//												Ext.Msg.alert('提示', '操作成功!' );
//													store.reload();
//												},
//												failure : function() {													
//													Ext.Msg.alert('提示', '操作失败!' );
//												}
//											});
//										});
//										
//									}
//									}]
//					}
					);		
			
			// 修改窗口展示的from
			var editXywzPlanJobAdvsSnglForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [
							{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'planId',
									hidden:true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'prdName',
									fieldLabel : '品名',
									allowBlank : false,
									readOnly : true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'spcModel',
									fieldLabel : '规格型号',
									readOnly : true,
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'weight',
									fieldLabel : '重量(顿)',
									readOnly : true,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'denst',
									fieldLabel : '密度',
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'materials',
									hidden:false,
									fieldLabel : '材质',
									maxLength:100,
									minLength:1,
									readOnly : true,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'zhiCnt',
									hidden:false,
									fieldLabel : '支/件',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'memo',
									hidden:false,
									fieldLabel : '入炉钢坯顺序、长度、根数及定尺根数',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPlanJobAdvsSnglForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPlanPrdcPlanAdvsSnglAction!updateXywzPlanPrdcPlanAdvsSngl.json',
								method : 'POST',
								form : editXywzPlanJobAdvsSnglForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							editXywzPlanJobAdvsSnglWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPlanJobAdvsSnglWindow.hide();
						}
					} ]
				} ]
			});
			var editXywzPlanJobAdvsSnglWindow = new Ext.Window({
				title : '生产计划信息修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 250,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				border : false,
				items : [ editXywzPlanJobAdvsSnglForm ]
			});
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