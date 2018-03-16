//生产计划通知单打印
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
				}, [ 'key', 'value' ])
			});
			scheduStatusStore.load();
			var qForm = new Ext.form.FormPanel({
				title : "生产计划变更单查询",
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
							xtype : 'datefield',
							Width : '100',
							name : 'ISSUES_DT',
							format:'Y-m-d',
//							allowBlank : false,
//							// 不允许为空
//							blankText : "不能为空，请填写",
//							fieldLabel : '<font color=red>*</font>下达日期',
							fieldLabel : '下达日期',
							anchor : '90%'
						} ]
					} , {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'contrNum',
//							allowBlank : false,
//							// 不允许为空
//							blankText : "不能为空，请填写",
							fieldLabel : '合同编号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'planNum',
//							allowBlank : false,
//							// 不允许为空
//							blankText : "不能为空，请填写",
//							fieldLabel : '<font color=red>*</font>生产计划编号',
							fieldLabel : '生产计划编号',
							anchor : '90%'
						} ]
					}]
				} ],
				buttons : [ {
					text : '查询',
					handler : function() {
						
						var conditionStr = qForm.getForm().getValues(false);
						var issueDt = qForm.getForm().findField('ISSUES_DT').getValue();
						var planNu = qForm.getForm().findField('planNum').getValue();
						//alert(issueDt+":"+contrNu);
//						if(issueDt == null ||issueDt==''|| planNu == null||planNu == ''){
						if(!qForm.getForm().isValid()){
							Ext.Msg.alert('提示','请输入查询条件!');
							return false;
						}
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
			  },{
			  name : 'planNum',
			   mapping : 'PLAN_NUM'
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
				  header : '生产计划编号',
				   width : 120,
				   dataIndex : 'planNum',
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
				   dataIndex : 'prdName',
				   sortable : true
				  }, {
				  header : '规格型号',
				   width : 120,
				   dataIndex : 'spcModel',
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
				  header : '材质',
				   width : 120,
				   dataIndex : 'materials',
				   sortable : true
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
					url : basepath + '/XywzPlanPrdPrintQueryAction.json'
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
						items : [{
							text : '<font color=red>取消计划任务 </font>',
							iconCls:'exportIconCss',
							handler : function(button) {
								var record = grid.getSelectionModel().getSelected();
								var selectLength = grid.getSelectionModel().getSelections().length;
				      			if(record==null || record == undefined){
				      				Ext.MessageBox.alert('提示','请选择记录.');
				      				return;
				      			}
				      			var selectRe;
				      			var planId='';
				      			for ( var i = 0; i < selectLength; i++) {
									selectRe = grid.getSelectionModel().getSelections()[i];
									tempId = selectRe.data.planId;
									planId += tempId;
									if (i != selectLength - 1)
										planId += ',';
									}
//				      			alert(planId);
//				      			return;
//				      			var custNm=selectRe.data.custShtNm;
//				      			var contrNum=selectRe.data.contrNum;
//				      			if (confirmSend=='1'){
//				      				Ext.MessageBox.alert('提示','该出运单已经处于发货状态，不允许重复操作');
//				      				return;
//				      			}
//				      			var sheetNum = record.get("sendSheetAdvsNum");							      			
				      			Ext.Ajax.request({
									url : basepath+ '/XywzPlanPrdcPlanAdvsSnglAction!updateStatus.json?planId='+ planId,
									waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
									success : function() {
									Ext.Msg.alert('提示', '取消计划任务成功!' );
										store.reload();
									},
									failure : function() {
									
										Ext.Msg.alert('提示', '操作失败!' );
									}
								});
							}
						},'-',
									{
										text : '打印',
										iconCls : 'exportIconCss',
										handler : function() {
											var issuesDt = qForm.getForm().findField('ISSUES_DT').getValue();
											var planNum = qForm.getForm().findField('planNum').getValue();
//											if(issuesDt==null||issuesDt==''||planNum==null ||planNum=='' )
											if(issuesDt==null||issuesDt=='' )
											{ 
												Ext.Msg.alert('提示','必须输入下达日期!');
												return false;
											}
//											if (planNum==null ||planNum==''){
//												Ext.Msg.alert('提示','必须输入生产计划编号!');
//												return false;
//											}
											var selectRe;
							      			var planId='';
							      			var planNum1='';
							      			var planNumTmp='';
							      			var selectLength = grid.getSelectionModel().getSelections().length;
							      			if(selectLength==0){
							      				Ext.Msg.alert('提示','请选择需要打印的数据!');
												return false;
							      			}
							      			for ( var i = 0; i < selectLength; i++) {
												selectRe = grid.getSelectionModel().getSelections()[i];
												
												tempId = selectRe.data.planId;			//最新数据									
												planId += tempId;
												if (i != selectLength - 1){
													planId += ',';
												}
												planNum1= selectRe.data.planNum;												
												for(var j = 0; j < selectLength; j++){
													selectRe = grid.getSelectionModel().getSelections()[j];
													planNumTmp=selectRe.data.planNum;
													if (planNum1 != planNumTmp){
														Ext.Msg.alert('提示','请选择同一生产计划编号下的商品打印!');
														return false;
													}
												}
												
											}
							      			//alert(planId);
											var year = issuesDt.getFullYear();    //获取完整的年份(4位,1970-????)
											var month = issuesDt.getMonth()+1;       //获取当前月份(0-11,0代表1月)
											var day = issuesDt.getDate();        //获取当前日(1-31)
											var date =year+"-"+month +"-"+day;
								  			window.open(basepath+"/contents/pages/xywz/plan/xywzPlanPrdAdvsInfoPrint.jsp?issuesDt="+date+"&planId="+planId,"newwindow","");
										
										
									}
									}]
					});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '生产计划变更单列表',
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