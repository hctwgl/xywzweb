//发运通知单
Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'  //客户等级
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "发运通知单查询",
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
							labelStyle : 'text-align:left;',
							Width : '100',
							name : 'shipName',
							labelWidth : 150,
							fieldLabel : '船名',
							anchor : '90%'
						} ]
					},{
						columnWidth : .25,
						layout : 'form',
						items : [new Com.xywz.common.ContractQuery(
			   					{
			   						fieldLabel : '合同号',
			   						labelStyle : 'text-align:left;',
			   						//labelWidth : 100,
			   						name : 'contrNum',
			   						id : 'CONTR_NUM33',
			   						anchor : '90%',
			   						callback : function(a, b) {
			   							var records = Ext.getCmp('CONTR_NUM33').oContractFrgnQueryGrid.getSelectionModel().selections.items;
			   							Ext.getCmp('CONTR_NUM33').setValue(records[0].data.CONTR_NUM);
			   							qForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
			   						}
			   					}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'loadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '装港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'portNameCn',
								id : 'PORT_NAME11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME11').setValue(records[0].data.PORT_NAME_CN);
									qForm.getForm().findField('loadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'numberfield',
							name : 'unloadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '卸港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'unPortNameCn',
								id : 'PORT_NAME_CN11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME_CN11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME_CN11').setValue(records[0].data.PORT_NAME_CN);
									qForm.getForm().findField('unloadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							})]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							labelStyle : 'text-align:left;',
							labelWidth : 90,
							Width : '100',
							name : 'expctToPortDay',
							fieldLabel : '预计到港日',
							anchor : '90%',
							format:'Y-m-d'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelStyle : 'text-align:left;',
							labelWidth : 90,
							Width : '100',
							name : 'confirmSend',
							fieldLabel : '是否确认发货',
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

			var record = Ext.data.Record.create([ {
				name : 'sendSheetAdvsId',
				   mapping : 'SEND_SHEET_ADVS_ID'
				  }, {
				  name : 'ordrNum',
				   mapping : 'ORDR_NUM'
				  }, {
				  name : 'contrNum',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'custShtNm',
				   mapping : 'CUST_SHT_NM'
				  }, {
				  name : 'sendSheetAdvsNum',
				   mapping : 'SEND_SHEET_ADVS_NUM'
				  }, {
				  name : 'confirmSend',
				   mapping : 'CONFIRM_SEND'
				  }, {
				  name : 'confirmSendOra',
				   mapping : 'CONFIRM_SEND_ORA'
				  }, {
				  name : 'lastModifyTime',
				   mapping : 'LAST_MODIFY_TIME'
				  }, {
				  name : 'shipName',
				   mapping : 'SHIP_NAME'
				  }, {
				  name : 'loadPort',
				   mapping : 'LOAD_PORT'
				  }, {
				  name : 'unloadPort',
				   mapping : 'UNLOAD_PORT'
				  }, {
				  name : 'expctToPortDay',
				   mapping : 'EXPCT_TO_PORT_DAY'
				  }, {
				  name : 'shipAgent',
				   mapping : 'SHIP_AGENT'
				  }, {
				  name : 'corpNm',
				   mapping : 'CORP_NM'
				  }, {
				  name : 'shipAgentContcr',
				   mapping : 'SHIP_AGENT_CONTCR'
				  }, {
				  name : 'gdsAgent',
				   mapping : 'GDS_AGENT'
				  }, {
				  name : 'agentNamr',
				   mapping : 'AGENT_NAMR'
				  }, {
				  name : 'gdsAgentContcr',
				   mapping : 'GDS_AGENT_CONTCR'
				  }, {
				  name : 'makDocPersId',
				   mapping : 'MAK_DOC_PERS_ID'
				  }, {
				  name : 'makDocPersNm',
				   mapping : 'MAK_DOC_PERS_NM'
				  }, {
				  name : 'lastGdsSitu',
				   mapping : 'LAST_GDS_SITU'
				  }, {
				  name : 'qtyPoor',
				   mapping : 'QTY_POOR'
				  }, {
				  name : 'weightNgtvPoor',
				   mapping : 'WEIGHT_NGTV_POOR'
				  }, {
				  name : 'ipeDesc',
				   mapping : 'IPE_DESC'
				  }, {
				  name : 'upnDesc',
				   mapping : 'UPN_DESC'
				  }, {
				  name : 'delvAddr',
				   mapping : 'DELV_ADDR'
				  }, {
				  name : 'delvPers',
				   mapping : 'DELV_PERS'
				  }, {
				  name : 'delvPersTel',
				   mapping : 'DELV_PERS_TEL'
				  }, {
				  name : 'mkTabPersId',
				   mapping : 'MK_TAB_PERS_ID'
				  }, {
				  name : 'mkTabPersNm',
				   mapping : 'MK_TAB_PERS_NM'
				  }, {
				  name : 'mkTabDt',
				   mapping : 'MK_TAB_DT'
				  }, {
				  name : 'portNameCn',
				   mapping : 'PORT_NAME_CN'
				  }, {
				  name : 'unPortNameCn',
				   mapping : 'UN_PORT_NAME_CN'
				  }, {
				  name : 'sendGoodsNotice',
				   mapping : 'SEND_GOODS_NOTICE'
				  }, {
				  name : 'sendDt',
				   mapping : 'SEND_DT'
				  }, {
				  name : 'cancelSendDt',
				   mapping : 'CANCEL_SEND_DT'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '发运通知ID',
				   width : 210,
				   dataIndex : 'sendSheetAdvsId',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '序号',
				   width : 100,
				   dataIndex : 'ordrNum',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '发运编号',
				   width : 100,
				   dataIndex : 'sendSheetAdvsNum',
				   sortable : true
				  }, {
				  header : '修改日期',
				   width : 150,
				   dataIndex : 'lastModifyTime',
				   sortable : true
				  }, {
				  header : '是否确认发货',
				   width : 100,
				   dataIndex : 'confirmSendOra',
				   sortable : true
				  }, {
				  header : '发货日期',
				   width : 100,
				   dataIndex : 'sendDt',
				   sortable : true
				  }, {
				  header : '取消发货日期',
				   width : 100,
				   dataIndex : 'cancelSendDt',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 100,
				   dataIndex : 'contrNum',
				   sortable : true
				  }, {
				  header : '客户名称',
				   width : 100,
				   dataIndex : 'custShtNm',
				   sortable : true
				  }, {
				  header : '船名',
				   width : 100,
				   dataIndex : 'shipName',
				   sortable : true
				  }, {
				  header : '装港',
				   width : 150,
				   dataIndex : 'portNameCn',
				   sortable : true
				  }, {
				  header : '卸港',
				   width : 150,
				   dataIndex : 'unPortNameCn',
				   sortable : true
				  }, {
				  header : '预计到港日',
				   width : 210,
				   dataIndex : 'expctToPortDay',
				   sortable : true
				  }, {
				  header : '船代',
				   width : 210,
				   dataIndex : 'shipAgent',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '船代名称',
				   width : 210,
				   dataIndex : 'corpNm',
				   sortable : true
				  }, {
				  header : '船代联系人',
				   width : 210,
				   dataIndex : 'shipAgentContcr',
				   sortable : true
				  }, {
				  header : '货代',
				   width : 210,
				   dataIndex : 'gdsAgent',
				   sortable : true,
				   hidden:true
				  }, {
				  header : '货代公司',
				   width : 210,
				   dataIndex : 'agentNamr',
				   sortable : true
				  }, {
				  header : '货代联系人',
				   width : 210,
				   dataIndex : 'gdsAgentContcr',
				   sortable : true
				  }, {
				  header : '国阳制单人编号',
				   width : 210,
				   dataIndex : 'makDocPersId',
				   sortable : true,
				   hidden : false
				  }, {
				  header : '国阳制单人名称',
				   width : 210,
				   dataIndex : 'makDocPersNm',
				   sortable : true
				  }, {
				  header : '上货情况',
				   width : 210,
				   dataIndex : 'lastGdsSitu',
				   sortable : true
				  }, {
				  header : '量差',
				   width : 210,
				   dataIndex : 'qtyPoor',
				   sortable : true
				  }, {
				  header : '重量负差',
				   width : 210,
				   dataIndex : 'weightNgtvPoor',
				   sortable : true
				  }, {
				  header : 'IPE描述',
				   width : 210,
				   dataIndex : 'ipeDesc',
				   sortable : true
				  }, {
				  header : 'UPN描述',
				   width : 210,
				   dataIndex : 'upnDesc',
				   sortable : true
				  }, {
				  header : '发货地址',
				   width : 210,
				   dataIndex : 'delvAddr',
				   sortable : true
				  }, {
				  header : '发货人',
				   width : 210,
				   dataIndex : 'delvPers',
				   sortable : true
				  }, {
				  header : '发货人电话',
				   width : 210,
				   dataIndex : 'delvPersTel',
				   sortable : true
				  }, {
				  header : '制表人编号',
				   width : 210,
				   dataIndex : 'mkTabPersId',
				   sortable : true,
				   hidden : true
				  }, {
				  header : '制表人姓名',
				   width : 210,
				   dataIndex : 'mkTabPersNm',
				   sortable : true
				  }, {
				  header : '制表日期',
				   width : 210,
				   dataIndex : 'mkTabDt',
				   sortable : true
				  }, {
				  header : '发货注意事项描述',
				   width : 210,
				   dataIndex : 'sendGoodsNotice',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiSendNoticeQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'SEND_SHEET_ADVS_ID',
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
										text : '新增',
										iconCls : 'addIconCss',
										handler : function() {
											addXywzLogiSendNoticeForm.getForm().reset();											
											addXywzLogiSendNoticeWindow.show();
											addXywzLogiSendNoticeForm.getForm().findField('qtyPoor').setValue(0);
											addXywzLogiSendNoticeForm.getForm().findField('weightNgtvPoor').setValue(0);
										}
									},
									'-',
									{
										text : '修改',
										iconCls : 'editIconCss',
										handler : function() {

											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];
											//Ext.Msg.alert(selectRe.data.sendSheetAdvsNum);
											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												if (selectRe.data.confirmSend == '1' ){
													Ext.Msg.alert('提示','已经确认发货的出运单不允许修改!!!');
													return;
												}
												editXywzLogiSendNoticeForm.getForm().loadRecord(selectRe);
												editXywzLogiSendNoticeWindow.show();

											}
										}
									},
									'-',
									{
										text : '删除',
										iconCls : 'deleteIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;
											if (selectLength < 1) {
												Ext.Msg.alert('提示','请选择需要删除的记录!');
											}

											else {
												Ext.MessageBox.confirm('提示','确定删除吗?',function(buttonId){
												if(buttonId.toLowerCase() == "no"){
													return;
												}  
											var selectRe;
											var tempId;
											var tempCount;
											var idStr = '';
											for ( var i = 0; i < selectLength; i++) {
												selectRe = grid.getSelectionModel().getSelections()[i];
												tempId = selectRe.data.sendSheetAdvsId;
												confirmSend=selectRe.data.confirmSend;
												if (confirmSend=='1'){
													Ext.Msg.alert('提示','已经确认发货的出运单不允许删除');
													return;
												}
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiSendNoticeAction!batchDestroy.json?idStr='+ idStr,
														waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
														success : function() {
														Ext.Msg.alert('提示', '操作成功!' );
															store.reload();
														},
														failure : function() {
														
															Ext.Msg.alert('提示', '操作失败!' );
														}
													});

										})
										;
									}
								}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiSendNoticeQueryAction.json'
							        }),'-',{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzLogiSendNoticeForm.getForm().loadRecord(selectRe);
												detailXywzLogiSendNoticeWindow.show();
											}
										}
									},'-',{
										text : '详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/logi/xywzLogiSendNoticeDetail.jsp?'
												+ '&sendSheetAdvsId='+_record.data.sendSheetAdvsId; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
												//detailXywzCustCustInfoWindow.show();
											}
										}
									},'-',{
										text : '打印',
										iconCls:'exportIconCss',
										handler : function(button) {
											var record = grid.getSelectionModel().getSelected();
											var selectLength = grid.getSelectionModel().getSelections().length;
							      			if(record==null || record == undefined||selectLength>1){
							      				Ext.MessageBox.alert('提示','请选择一条记录.');
							      				return;
							      			}
							      			var sheetId = record.get("sendSheetAdvsId");
								  			window.open(basepath+"/contents/pages/xywz/logi/xywzLogiSendNoticePrint.jsp?sheetId="+sheetId,"newwindow","");
										}
									},'-',{
										text : '<font color=red>确认发货</font>',
										iconCls:'exportIconCss',
										handler : function(button) {
											var record = grid.getSelectionModel().getSelected();
											var selectLength = grid.getSelectionModel().getSelections().length;
							      			if(record==null || record == undefined||selectLength>1){
							      				Ext.MessageBox.alert('提示','请选择一条记录.');
							      				return;
							      			}
							      			var selectRe = grid.getSelectionModel().getSelections()[0];
							      			var confirmSend=selectRe.data.confirmSend;
							      			var custNm=selectRe.data.custShtNm;
							      			var contrNum=selectRe.data.contrNum;
							      			if (confirmSend=='1'){
							      				Ext.MessageBox.alert('提示','该出运单已经处于发货状态，不允许重复操作');
							      				return;
							      			}
							      			var sheetNum = record.get("sendSheetAdvsNum");							      			
							      			Ext.Ajax.request({
												url : basepath+ '/XywzLogiSendNoticeAction!updateStatus.json?sheetNum='+ sheetNum,
												waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
												success : function() {
												Ext.Msg.alert('提示', '数据下达成功!' );
													store.reload();
												},
												failure : function() {
												
													Ext.Msg.alert('提示', '操作失败!' );
												}
											});
							      			
							      			Ext.Ajax.request({
												url : basepath+ '/XywzSysmMsgRmndAction!insertRemind.json?confirmSend='+ confirmSend +'&contrNum='+contrNum+'&custNm='+custNm
											});
										}
									},'-',{
										text : '<font color=red>取消发货</font>',
										iconCls:'exportIconCss',
										handler : function(button) {
											var record = grid.getSelectionModel().getSelected();
											var selectLength = grid.getSelectionModel().getSelections().length;
							      			if(record==null || record == undefined||selectLength>1){
							      				Ext.MessageBox.alert('提示','请选择一条记录.');
							      				return;
							      			}
							      			var sheetNum = record.get("sendSheetAdvsNum");
							      			var selectRe = grid.getSelectionModel().getSelections()[0];
							      			var confirmSend=selectRe.data.confirmSend;
							      			var custNm=selectRe.data.custShtNm;
							      			var contrNum=selectRe.data.contrNum;
							      			//Ext.Msg.alert(sendSheetAdvsId);
							      			Ext.Ajax.request({
												url : basepath+ '/XywzLogiSendNoticeAction!updateStatus.json?flag='+'fanxiada'+'&sheetNum='+ sheetNum,
												waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
												success : function() {
												Ext.Msg.alert('提示', '取消发货成功!' );
													store.reload();
												},
												failure : function() {
												
													Ext.Msg.alert('提示', '操作失败!' );
												}
											});
							      			Ext.Ajax.request({
												url : basepath+ '/XywzSysmMsgRmndAction!insertRemind.json?confirmSend='+ confirmSend +'&contrNum='+contrNum+'&custNm='+custNm
											});
										}
									}]
					});
			operateWin= new Ext.Window({
				title : '',
				id:'operateWinId',
				plain : true,
				layout : 'fit',
				resizable : true,
				draggable : true,
				closable : true,
				closeAction : 'hide',
				modal : true, // 模态窗口
				maximizable : false, // 最大化最小化
				collapsible : false,
				border : false,
				maximized : true, // 默认最大化
				animCollapse : true,
				constrain : true,
				html:"<iframe id='mainFrame' name='mainFrame' style='border:0 solid #000;height:100%;width:100%;' src='' ></iframe>"
			});

			var detailXywzLogiSendNoticeForm = new Ext.form.FormPanel({
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
						     name : 'sendSheetAdvsId',
						     hidden:true,
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'ordrNum',
						     fieldLabel : '序号',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'contrNum',
						     fieldLabel : '合同号',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'lastModifyTime',
						     fieldLabel : '修改日期',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'sendSheetAdvsNum',
						     fieldLabel : '发运编号',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'confirmSend',
						     fieldLabel : '是否确认发货',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'sendDt',
						     fieldLabel : '发货日期',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'cancelSendDt',
						     fieldLabel : '取消发货日期',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'shipName',
						     fieldLabel : '船名',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
							     xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'portNameCn',
							     fieldLabel : '装港',
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     readOnly:true
							} ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
							     xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'unPortNameCn',
							     fieldLabel : '卸港',
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     readOnly:true
							} ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'datefield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'expctToPortDay',
						     fieldLabel : '预计到港日',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     format:'Y-m-d',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						    	xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'corpNm',
							     fieldLabel : '船代',
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     readOnly:true
							}]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'shipAgentContcr',
						     fieldLabel : '船代联系人',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'agentNamr',
						     fieldLabel : '货代',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'gdsAgentContcr',
						     fieldLabel : '货代联系人',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
							     xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'makDocPersNm',
							     fieldLabel : '国阳制单人名称',
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     hidden : true,
							     readOnly:true
							    }]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'lastGdsSitu',
						     fieldLabel : '上货情况',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'qtyPoor',
						     fieldLabel : '量差',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'weightNgtvPoor',
						     fieldLabel : '重量负差',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textarea',
						     vtype : 'trim',
						     Width : '100',
						     name : 'ipeDesc',
						     fieldLabel : 'IPE描述',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textarea',
						     vtype : 'trim',
						     Width : '100',
						     name : 'upnDesc',
						     fieldLabel : 'UPN描述',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textarea',
						     vtype : 'trim',
						     Width : '100',
						     name : 'delvAddr',
						     fieldLabel : '发货地址',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'delvPers',
						     fieldLabel : '发货人',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'delvPersTel',
						     fieldLabel : '发货人电话',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [{
							     xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'mkTabPersNm',
							     fieldLabel : '制表人姓名',
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     readOnly:true
							    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'datefield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'mkTabDt',
						     fieldLabel : '制表日期',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     format:'Y-m-d',
						     readOnly:true
						    } ]
						   },{
							    columnWidth : .5,
							    layout : 'form',
							    items : [ {
							     xtype : 'textarea',
							     vtype : 'trim',
							     Width : '100',
							     name : 'sendGoodsNotice',
							     fieldLabel : '发货注意事项描述',
							     allowBlank : true,
							     maxLength : 200,
							     minLength : 1,
							     anchor : '90%',
							     hidden : true,
							     readOnly:true
							    } ]
							   }		
					]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzLogiSendNoticeWindow.hide();
						}
					} ]
				} ]
			});
			
			// 新增窗口展示的from
			var addXywzLogiSendNoticeForm = new Ext.form.FormPanel({
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
					     name : 'ordrNum',
					     fieldLabel : '<font color=red>*</font>序号',
					     allowBlank : false,
					     blankText : '序号不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
								xtype : 'numberfield',
								name : 'custId',
								hidden:true
							},new Com.xywz.common.ContractQuery(
				   					{
				   						fieldLabel : '<font color=red>*</font>合同号',
				   						labelStyle : 'text-align:left;',
				   						//labelWidth : 100,
				   						name : 'contrNum',
				   						id : 'CONTR_NUM1',
				   						singleSelected : false,
				   						// 单选复选标志
				   						editable : false,
				   						allowBlank : false,
				   						// 不允许为空
				   						blankText : "不能为空，请填写",
				   						anchor : '90%',
				   						callback : function(a, b) {
				   							var records = Ext.getCmp('CONTR_NUM1').oContractFrgnQueryGrid.getSelectionModel().selections.items;
				   							Ext.getCmp('CONTR_NUM1').setValue(records[0].data.CONTR_NUM);
				   							addXywzLogiSendNoticeForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
				   							addXywzLogiSendNoticeForm.getForm().findField('custId').setValue(records[0].data.CUST_ID);
				   						}
				   					}) ]
						   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'shipName',
					     fieldLabel : '船名',
//					     allowBlank : false,
//					     blankText : '船名不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'loadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '<font color=red>*</font>装港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'portNameCn',
								id : 'PORT_NAME22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME22').setValue(records[0].data.PORT_NAME_CN);
									addXywzLogiSendNoticeForm.getForm().findField('loadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'unloadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '<font color=red>*</font>卸港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'unPortNameCn',
								id : 'PORT_NAME_CN22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME_CN22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME_CN22').setValue(records[0].data.PORT_NAME_CN);
									addXywzLogiSendNoticeForm.getForm().findField('unloadPort').setValue(parseInt(records[0].data.PORT_ID));									
								}
							}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'datefield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'expctToPortDay',
					     fieldLabel : '预计到港日',
					     allowBlank : true,
					     blankText : '预计到港日不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     format:'Y-m-d'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'shipAgent',
							hidden:true
						},new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '<font color=red>*</font>船代',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'corpNm',
								id : 'SHIP_AGENT11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								//blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('SHIP_AGENT11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('SHIP_AGENT11').setValue(records[0].data.CORP_NM);
									addXywzLogiSendNoticeForm.getForm().findField('shipAgent').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									addXywzLogiSendNoticeForm.getForm().findField('shipAgentContcr').setValue(records[0].data.CONTCR);
								}
							}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'shipAgentContcr',
					     fieldLabel : '<font color=red>*</font>船代联系人',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden : true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     name : 'gdsAgent',
					     hidden:true
					    },new Com.xywz.common.LogiGoodsAgentCorp(
								{
									fieldLabel : '货代',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									//name : 'portNameCn',
									id : 'GDS_AGENT_11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
//									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('GDS_AGENT_11').ologiGoodsAgentCorpGrid.getSelectionModel().selections.items;
										Ext.getCmp('GDS_AGENT_11').setValue(records[0].data.AGENT_NAMR);
										addXywzLogiSendNoticeForm.getForm().findField('gdsAgent').setValue(parseInt(records[0].data.AGENT_ID));
										addXywzLogiSendNoticeForm.getForm().findField('gdsAgentContcr').setValue((records[0].data.CONTACT_PER));
									}
								})  ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'gdsAgentContcr',
					     fieldLabel : '货代联系人',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden:true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'makDocPersId',
					     fieldLabel : '国阳制单人编号',
					     allowBlank : true,
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden : true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '国阳制单人名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'makDocPersNm',
									id : 'USER_NAME22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
										addXywzLogiSendNoticeForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'lastGdsSitu',
					     fieldLabel : '上货情况',
//					     allowBlank : false,
//					     blankText : '上货情况不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'numberfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'qtyPoor',
					     fieldLabel : '量差',
//					     allowBlank : false,
//					     blankText : '量差不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'numberfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'weightNgtvPoor',
					     fieldLabel : '重量负差',
//					     allowBlank : false,
//					     blankText : '重量负差不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'ipeDesc',
					     fieldLabel : 'IPE描述',
//					     allowBlank : false,
//					     blankText : 'IPE描述不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'upnDesc',
					     fieldLabel : 'UPN描述',
//					     allowBlank : false,
//					     blankText : 'UPN描述不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'delvAddr',
					     fieldLabel : '<font color=red>*</font>发货地址',
					     allowBlank : false,
					     blankText : '发货地址不能为空',
					     maxLength : 500,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '<font color=red>*</font>发货人',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'delvPers',
									id : 'USER_NAME333',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME333').oCustomerQueryGrid.getSelectionModel().selections.items;
										//Ext.getCmp('USER_NAME333').setValue(records[0].data.USER_NAME);
										addXywzLogiSendNoticeForm.getForm().findField('delvPers').setValue(records[0].data.USER_NAME);
										addXywzLogiSendNoticeForm.getForm().findField('delvPersTel').setValue(records[0].data.MOBILEPHONE);
									}
								})]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'delvPersTel',
					     fieldLabel : '<font color=red>*</font>发货人电话',
					     allowBlank : false,
					     blankText : '发货人电话不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'mkTabPersId',
					     fieldLabel : '制表人编号',
					     allowBlank : true,
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden : true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '制表人姓名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'mkTabPersNm',
									id : 'USER_NAME33',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : true,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
										addXywzLogiSendNoticeForm.getForm().findField('mkTabPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'datefield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'mkTabDt',
					     fieldLabel : '制表日期',
					     allowBlank : true,
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     format:'Y-m-d'
					    } ]
					   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textarea',
						     vtype : 'trim',
						     Width : '100',
						     name : 'sendGoodsNotice',
						     fieldLabel : '发货注意事项描述',
						     allowBlank : true,
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     hidden : false
						    } ]
						   }
					]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzLogiSendNoticeForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiSendNoticeAction.json',
								method : 'POST',
								form : addXywzLogiSendNoticeForm.getForm().id,
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
							
							addXywzLogiSendNoticeWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiSendNoticeWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiSendNoticeForm = new Ext.form.FormPanel({
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
					     name : 'sendSheetAdvsId',
					     hidden:true,
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden:true
					    } ]
					   },
                         {
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'sendSheetAdvsNum',
						     fieldLabel : '发运编号',
						     maxLength : 200,
						     minLength : 1,
						     readOnly:true,
						     anchor : '90%'
						    } ]
						   },
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'ordrNum',
						     fieldLabel : '序号',
//						     allowBlank : false,
//						     blankText : '序号不能为空',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     readOnly:true
						    } ]
						   },{
							    columnWidth : .5,
							    layout : 'form',
							    items : [ {
									xtype : 'numberfield',
									name : 'custId',
									hidden:true
								},new Com.xywz.common.ContractQuery(
					   					{
					   						fieldLabel : '<font color=red>*</font>合同号',
					   						labelStyle : 'text-align:left;',
					   						//labelWidth : 100,
					   						name : 'contrNum',
					   						id : 'CONTR_NUM22',
					   						singleSelected : false,
					   						// 单选复选标志
					   						editable : false,
					   						allowBlank : false,
					   						// 不允许为空
					   						blankText : "不能为空，请填写",
					   						anchor : '90%',
					   						callback : function(a, b) {
					   							var records = Ext.getCmp('CONTR_NUM22').oContractFrgnQueryGrid.getSelectionModel().selections.items;
					   							Ext.getCmp('CONTR_NUM22').setValue(records[0].data.CONTR_NUM);
					   							editXywzLogiSendNoticeForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
					   							editXywzLogiSendNoticeForm.getForm().findField('custId').setValue(records[0].data.CUST_ID);
					   						}
					   					}) ]
							   },
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textfield',
								     vtype : 'trim',
								     Width : '100',
								     name : 'confirmSendOra',
								     fieldLabel : '是否确认发货',
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     readOnly:true
								    } ]
								   },
									{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textfield',
								     vtype : 'trim',
								     Width : '100',
								     name : 'sendDt',
								     fieldLabel : '发货日期',
								     maxLength : 200,
								     minLength : 1,
								     anchor : '90%',
								     readOnly:true
								    } ]
								   },						   
						{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textfield',
						     vtype : 'trim',
						     Width : '100',
						     name : 'shipName',
						     fieldLabel : '船名',
//						     allowBlank : false,
//						     blankText : '船名不能为空',
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%'
						    } ]
						   },						   
							{
							    columnWidth : .5,
							    layout : 'form',
							    items : [ {
							     xtype : 'textfield',
							     vtype : 'trim',
							     Width : '100',
							     name : 'confirmSend',
							     fieldLabel : '确认发货',
							     hidden:true,
							     anchor : '90%'
							    } ]
							   },						   
								{
								    columnWidth : .5,
								    layout : 'form',
								    items : [ {
								     xtype : 'textfield',
								     vtype : 'trim',
								     Width : '100',
								     name : 'lastModifyTime',
								     fieldLabel : '最后修改时间',
								     hidden:true,
								     anchor : '90%'
								    } ]
								   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'loadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '<font color=red>*</font>装港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'portNameCn',
								id : 'PORT_NAME33',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME33').setValue(records[0].data.PORT_NAME_CN);
									editXywzLogiSendNoticeForm.getForm().findField('loadPort').setValue(parseInt(records[0].data.PORT_ID));
									
								}
							}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'unloadPort',
							hidden:true
						},new Com.xywz.common.PortMgmtInfoQuery(
							{
								fieldLabel : '<font color=red>*</font>卸港',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'unPortNameCn',
								id : 'PORT_NAME_CN33',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('PORT_NAME_CN33').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('PORT_NAME_CN33').setValue(records[0].data.PORT_NAME_CN);
									editXywzLogiSendNoticeForm.getForm().findField('unloadPort').setValue(parseInt(records[0].data.PORT_ID));									
								}
							}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'datefield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'expctToPortDay',
					     fieldLabel : '预计到港日',
//					     allowBlank : false,
//					     blankText : '预计到港日不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     format:'Y-m-d'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
							xtype : 'numberfield',
							name : 'shipAgent',
							hidden:true
						},new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '<font color=red>*</font>船代',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'corpNm',
								id : 'SHIP_AGENT22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('SHIP_AGENT22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('SHIP_AGENT22').setValue(records[0].data.CORP_NM);
									editXywzLogiSendNoticeForm.getForm().findField('shipAgent').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									editXywzLogiSendNoticeForm.getForm().findField('shipAgentContcr').setValue(records[0].data.CONTCR);
								}
							})]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'shipAgentContcr',
					     fieldLabel : '船代联系人',
//					     allowBlank : false,
//					     blankText : '船代联系人不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     name : 'gdsAgent',
					     hidden:true
					    },new Com.xywz.common.LogiGoodsAgentCorp(
								{
									fieldLabel : '货代',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'agentNamr',
									id : 'GDS_AGENT_22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
//									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('GDS_AGENT_22').ologiGoodsAgentCorpGrid.getSelectionModel().selections.items;
										Ext.getCmp('GDS_AGENT_22').setValue(records[0].data.AGENT_NAMR);
										editXywzLogiSendNoticeForm.getForm().findField('gdsAgent').setValue(parseInt(records[0].data.AGENT_ID));
										editXywzLogiSendNoticeForm.getForm().findField('gdsAgentContcr').setValue((records[0].data.CONTACT_PER));
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'gdsAgentContcr',
					     fieldLabel : '货代联系人',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden:true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'makDocPersId',
					     fieldLabel : '国阳制单人编号',
//					     allowBlank : false,
//					     blankText : '国阳制单人编号不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden : true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '国阳制单人名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'makDocPersNm',
									id : 'USER_NAME66',
									singleSelected : false,
									// 单选复选标志
									editable : false,
//									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME66').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME66').setValue(records[0].data.USER_NAME);
										editXywzLogiSendNoticeForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'lastGdsSitu',
					     fieldLabel : '上货情况',
//					     allowBlank : false,
//					     blankText : '上货情况不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'numberfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'qtyPoor',
					     fieldLabel : '量差',
//					     allowBlank : false,
//					     blankText : '量差不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'numberfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'weightNgtvPoor',
					     fieldLabel : '重量负差',
//					     allowBlank : false,
//					     blankText : '重量负差不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'ipeDesc',
					     fieldLabel : 'IPE描述',
//					     allowBlank : false,
//					     blankText : 'IPE描述不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'upnDesc',
					     fieldLabel : 'UPN描述',
//					     allowBlank : false,
//					     blankText : 'UPN描述不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textarea',
					     vtype : 'trim',
					     Width : '100',
					     name : 'delvAddr',
					     fieldLabel : '<font color=red>*</font>发货地址',
					     allowBlank : false,
					     blankText : '发货地址不能为空',
					     maxLength : 500,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '<font color=red>*</font>发货人',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'delvPers',
									id : 'USER_NAME555',
									singleSelected : false,
									// 单选复选标志
									editable : false,
//									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME555').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME555').setValue(records[0].data.USER_NAME);
										editXywzLogiSendNoticeForm.getForm().findField('delvPers').setValue(records[0].data.USER_NAME);
										editXywzLogiSendNoticeForm.getForm().findField('delvPersTel').setValue(records[0].data.MOBILEPHONE);
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'delvPersTel',
					     fieldLabel : '<font color=red>*</font>发货人电话',
					     allowBlank : false,
					     blankText : '发货人电话不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%'
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'textfield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'mkTabPersId',
					     fieldLabel : '制表人编号',
//					     allowBlank : false,
//					     blankText : '制表人编号不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     hidden : true
					    } ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '制表人姓名',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'mkTabPersNm',
									id : 'USER_NAME55',
									singleSelected : false,
									// 单选复选标志
									editable : false,
//									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME55').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME55').setValue(records[0].data.USER_NAME);
										editXywzLogiSendNoticeForm.getForm().findField('mkTabPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					   },
					{
					    columnWidth : .5,
					    layout : 'form',
					    items : [ {
					     xtype : 'datefield',
					     vtype : 'trim',
					     Width : '100',
					     name : 'mkTabDt',
					     fieldLabel : '制表日期',
//					     allowBlank : false,
//					     blankText : '制表日期不能为空',
					     maxLength : 200,
					     minLength : 1,
					     anchor : '90%',
					     format:'Y-m-d'
					    } ]
					   },{
						    columnWidth : .5,
						    layout : 'form',
						    items : [ {
						     xtype : 'textarea',
						     vtype : 'trim',
						     Width : '100',
						     name : 'sendGoodsNotice',
						     fieldLabel : '发货注意事项描述',
						     allowBlank : true,
						     maxLength : 200,
						     minLength : 1,
						     anchor : '90%',
						     hidden : true
						    } ]
						   }		
					]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzLogiSendNoticeForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							selectRe = grid.getSelectionModel().getSelections()[0];
							var sheetId = selectRe.data.sendSheetAdvsId;
							Ext.Ajax.request({
								url : basepath + '/XywzLogiSendNoticeAction.json',
								method : 'POST',
								params:{
								  'sheetId':sheetId
							    },
								form : editXywzLogiSendNoticeForm.getForm().id,
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
							
							editXywzLogiSendNoticeWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiSendNoticeWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzLogiSendNoticeWindow = new Ext.Window({
				title : '发运通知信息详情',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 400,
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
				items : [ detailXywzLogiSendNoticeForm ]
			});

			// 定义新增窗口
			var addXywzLogiSendNoticeWindow = new Ext.Window({
				title : '发运通知单新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :400,
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
				items : [ addXywzLogiSendNoticeForm ]
			});

			// 定义修改窗口
			var editXywzLogiSendNoticeWindow = new Ext.Window({
				title : '发运通知单修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 400,
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
				items : [ editXywzLogiSendNoticeForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '发运通知单信息列表',
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