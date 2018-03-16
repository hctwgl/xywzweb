Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//排产状态
			var scheduStatusStore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' 
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_SCHEDU_STATUS'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ]),
				listeners:{     
					 //向已有数据中插入一条新的数据     
					load : function(store, records, options ){     
							Ext.getCmp('SCHEDU_STATUS').setValue('0');
					}     
				}
			});
			scheduStatusStore.load();
			var qForm = new Ext.form.FormPanel({
				title : "生产排产查询",
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
									id : 'SIZE323',
									singleSelected : false,
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('SIZE323').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
										//qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE_CONCAT);
										qForm.getForm().findField('SPC_MODEL').setValue(records[0].data.SIZE);
									}
								})]
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
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [new Ext.form.ComboBox({
							hiddenName : 'SCHEDU_STATUS',
							fieldLabel : '排产状态',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : scheduStatusStore,
							id:'SCHEDU_STATUS',
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							value:'0',
							forceSelection : true,
							editable : false,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
						})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							Width : '100',
							name : 'SCHEDU_NUM',
							fieldLabel : '排产单据号',
							anchor : '90%'
						}
						]
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
				  }, {
				  header : '重量（吨）',
				   width : 120,
				   dataIndex : 'weight',
				   sortable : true
				 }, {
				  header : '排产状态',
				   width : 120,
				   dataIndex : 'scheduStatus',
				   hidden : true
				 }, {
					  header : '排产单据号',
					   width : 120,
					   dataIndex : 'scheduNum',
					   hidden : true
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
				  header : '下达日期',
				   width : 120,
				   dataIndex : 'issuesDt',
				   sortable : true
				  }, {
				  header : '下达人',
				   width : 120,
				   dataIndex : 'issuesUserid',
				   sortable : true
				  }, {
				  header : '下达人名称',
				   width : 120,
				   dataIndex : 'issuesUsername',
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
					url : basepath + '/XywzPlanTskSnglQueryAction.json'
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
										text : '排产',
										iconCls : 'addIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										if (selectLength < 1) {
											Ext.Msg.alert('提示','请选择记录!');
											return;
										}
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											var scheduStatus = selectRe.data.scheduStatus;
											if(scheduStatus!='0'){
												Ext.Msg.alert('提示','只能选择未排产的记录!');
												return;
											}
											
												
										}
										Ext.MessageBox.confirm('提示','确定排产吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}
											taskInfoForm.getForm().reset();
											var date = new Date(); 
											var year = date.getFullYear(); 
											var month = date.getMonth()+1; 
											var day = date.getDate(); 
											var hour = date.getHours(); 
											var minute = date.getMinutes(); 
											var second = date.getSeconds(); 
											var milliseconds = date.getMilliseconds();
											var str=year+''+month+''+day+''+hour+''+minute+''+second+''+milliseconds;
											var scheduDate1=year+''+month+''+day;
											//alert(scheduDate1);
											taskInfoForm.getForm().findField('scheduNum').setValue(str);
											//taskInfoForm.getForm().findField('scheduDate').setValue(scheduDate1);
											taskInfoWindow.show();
										});
										
									}
									},{

										text : '<font color=red>取消排产</font>',
										iconCls : 'exportIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var planId='';
										var planIdTmp='';
										if (selectLength < 1) {
											Ext.Msg.alert('提示','请选择记录!');
											return;
										}
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											var scheduStatus = selectRe.data.scheduStatus;
											if(scheduStatus!='1'){
												Ext.Msg.alert('提示','只能选择已排产的记录!');
												return;
											}
											planIdTmp=selectRe.data.planId;
											planId+=planIdTmp;
											if (i != selectLength - 1){
												planId += ',';
											}
												
										}
//										alert(planId);
										Ext.Ajax.request({
											url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!updateOverStatus.json?planId='+ planId,
											waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
											success : function() {
											Ext.Msg.alert('提示', '取消排产成功!' );
												store.reload();
											},
											failure : function() {
											
												Ext.Msg.alert('提示', '操作失败!' );
											}
										});
										
//										Ext.MessageBox.confirm('提示','确定取消排产吗?',function(buttonId){
//											if(buttonId.toLowerCase() == "no"){
//												return;
//											}
//											
//										});
										
									}
									
									}]
					});
			// 新增窗口展示的from
			var taskInfoForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 350,
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
							Width : '100',
							name : 'scheduNum',
							fieldLabel : '排产单据号',
							allowBlank:false,
							maxLength:50,
							anchor : '90%'
						} ]
			          }
			        ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '确定',
						handler : function() {
							if(!taskInfoForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							var selectRe;
							var tempId;
							var tempType;
							var idStr = '';
							var typeStr = '';
							var selectLength = grid.getSelectionModel().getSelections().length;
							for ( var i = 0; i < selectLength; i++) {
								selectRe = grid.getSelectionModel().getSelections()[i];
								tempId = selectRe.data.planId;
								idStr += tempId;
								if (i != selectLength - 1){
									idStr += ',';
								}
									
							}
							Ext.Ajax.request({
								url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!giveScheduling.json',
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								params:{
									'idStr':idStr,
									'scheduNum':taskInfoForm.getForm().findField('scheduNum').getValue()
								},
								success : function() {
								Ext.Msg.alert('提示', '操作成功!' );
									store.reload();
								},
								failure : function() {													
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							taskInfoWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							taskInfoWindow.hide();
						}
					} ]
				} ]
			});
			// 定义新增窗口
			var taskInfoWindow = new Ext.Window({
				title : '任务下达',
				plain : true,
				layout : 'fit',
				width : 750,
				height :200,
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				loadMask : true,
				maximizable : true,
				collapsible : true,
				titleCollapse : true,
				buttonAlign : 'right',
				border : false,
				items : [ taskInfoForm ]
			});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '生产排产列表',
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
			// 默认加载数据
	      	store.on('beforeload', function() {
		        	var conditionStr =  qForm.getForm().getValues(false);
		            this.baseParams = {
		                    "condition":Ext.encode(conditionStr)
		                    
		            };
			});
			store.load({
				params : {
					start : 0,
					limit : parseInt(pagesize_combo.getValue())
				}
			});
			
		});