Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“验货方式”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_INSN_MODE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“币种”选择数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_CUR'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“付款方式”选择数据集
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PAY_MD'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "外协加工合同信息查询",
				labelWidth : 150, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [  {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'machgContrNum',
							fieldLabel : '外协加工合同号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'machgContrNm',
							fieldLabel : '外协加工合同名称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [new Com.xywz.common.AsstMachgCorpMgmtQuery({
							fieldLabel : '外协加工厂名称',
							labelStyle : 'text-align:right;',
							//labelWidth : 100,
							name : 'machgOrdrNm',
							id : 'ASST_MACHG_NM11',
							singleSelected : false,
							// 单选复选标志
//							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('ASST_MACHG_NM11').oAsstMachgCorpMgmtQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('ASST_MACHG_NM11').setValue(records[0].data.ASST_MACHG_NM);
								qForm.getForm().findField('machgOrdrNm').setValue(records[0].data.ASST_MACHG_NM);								
							}
						}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'contrDtFrom',
							fieldLabel : '签约日期   从',
							anchor : '90%',
							editable:false,
						    format:'Y-m-d'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'contrDtDtTo',
							fieldLabel : '到',
							anchor : '90%',
							editable:false,
							format:'Y-m-d'
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
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var record = Ext.data.Record.create([ {
				name : 'asstContrId',
				mapping : 'ASST_CONTR_ID'
			}, {
				name : 'machgContrNum',
				mapping : 'MACHG_CONTR_NUM'
			},{
				name : 'machgContrNm',
				mapping : 'MACHG_CONTR_NM'
			},{
				name : 'machgOrdrNumId',
				mapping : 'MACHG_ORDR_NUM_ID'
			},{
				name : 'machgOrdrNm',
				mapping : 'MACHG_ORDR_NM'
			},{
				name : 'mainBizBiz',
				mapping : 'MAIN_BIZ_BIZ'
			},{
				name : 'contrDt',
				mapping : 'CONTR_DT'
			},{
				name : 'signSite',
				mapping : 'SIGN_SITE'
			},{
				name : 'stlModeAndTerm',
				mapping : 'STL_MODE_AND_TERM'
			},{
				name : 'deliverGdsPrd',
				mapping : 'DELIVER_GDS_PRD'
			},{
				name : 'ordrContrNum',
				mapping : 'ORDR_CONTR_NUM'
			},{
				name : 'outMachgContcr',
				mapping : 'OUT_MACHG_CONTCR'
			},{
				name : 'inputDt',
				mapping : 'INPUT_DT'
			},{
				name : 'oprrId',
				mapping : 'OPRR_ID'
			},{
				name : 'oprr',
				mapping : 'OPRR'
			},{
				name : 'sellPersMemId',
				mapping : 'SELL_PERS_MEM_ID'
			},{
				name : 'sellPersMem',
				mapping : 'SELL_PERS_MEM'
			},{
				name : 'gdsMode',
				mapping : 'GDS_MODE'
			},{
				name : 'gdsModeOra',
				mapping : 'GDS_MODE_ORA'
			},{
				name : 'machgGdsAddr',
				mapping : 'MACHG_GDS_ADDR'
			},{
				name : 'stlCur',
				mapping : 'STL_CUR'
			},{
				name : 'stlCurOra',
				mapping : 'STL_CUR_ORA'
			},{
				name : 'machgCostSum',
				mapping : 'MACHG_COST_SUM'
			},{
				name : 'payMd',
				mapping : 'PAY_MD'
			},{
				name : 'payMdOra',
				mapping : 'PAY_MD_ORA'
			},{
				name : 'machgAddr',
				mapping : 'MACHG_ADDR'
			},{
				name : 'machgTel',
				mapping : 'MACHG_TEL'
			},{
				name : 'machgFax',
				mapping : 'MACHG_FAX'
			},{
				name : 'machgContcr',
				mapping : 'MACHG_CONTCR'
			},{
				name : 'machgContcrMail',
				mapping : 'MACHG_CONTCR_MAIL'
			},{
				name : 'machgBankFstNm',
				mapping : 'MACHG_BANK_FST_NM'
			},{
				name : 'machgBankAcct',
				mapping : 'MACHG_BANK_ACCT'
			},{
				name : 'pkgReqst',
				mapping : 'PKG_REQST'
			},{
				name : 'qltyReqst',
				mapping : 'QLTY_REQST'
			},{
				name : 'machgModel',
				mapping : 'MACHG_MODEL'
			},{
				name : 'attm',
				mapping : 'ATTM'
			},{
				name : 'memo',
				mapping : 'MEMO'
			},{	
			  name : 'memo1',
			   mapping : 'MEMO1'
			          },{
			  name : 'memo2',
			   mapping : 'MEMO2'
			          },{
			  name : 'memo3',
			   mapping : 'MEMO3'
			          },{
			  name : 'memo4',
			   mapping : 'MEMO4'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '外协加工合同号',
				width : 210,
				dataIndex : 'machgContrNum',
				sortable : true
			}, {
				header : '外协加工合同名称',
				width : 170,
				dataIndex : 'machgContrNm',
				sortable : true
			}, {
				header : '外协加工厂编号',
				width : 170,
				dataIndex : 'machgOrdrNumId',
				sortable : true
			}, {
				header : '外协加工厂名称',
				width : 170,
				dataIndex : 'machgOrdrNm',
				sortable : true
			}, {
				header : '主营业务',
				width : 170,
				dataIndex : 'mainBizBiz',
				sortable : true
			}, {
				header : '签约日期',
				width : 170,
				dataIndex : 'contrDt',
				sortable : true
			}, {
				header : '签订地点',
				width : 170,
				dataIndex : 'signSite',
				sortable : true
			}, {
				header : '结算方式及期限',
				width : 170,
				dataIndex : 'stlModeAndTerm',
				sortable : true
			}, {
				header : '交货期',
				width : 170,
				dataIndex : 'deliverGdsPrd',
				sortable : true
			}, {
				header : '订单合同号',
				width : 170,
				dataIndex : 'ordrContrNum',
				sortable : true
			}, {
				header : '委外加工联系人',
				width : 170,
				dataIndex : 'outMachgContcr',
				sortable : true
			}, {
				header : '录入日期',
				width : 170,
				dataIndex : 'inputDt',
				sortable : true
			}, {
				header : '操作员编号',
				width : 170,
				dataIndex : 'oprrId',
				sortable : true
			}, {
				header : '操作员',
				width : 170,
				dataIndex : 'oprr',
				sortable : true
			}, {
				header : '销售人员编号',
				width : 170,
				dataIndex : 'sellPersMemId',
				sortable : true
			}, {
				header : '销售人员',
				width : 170,
				dataIndex : 'sellPersMem',
				sortable : true
			}, {
				header : '验货方式',
				width : 170,
				dataIndex : 'gdsModeOra',
				sortable : true
			}, {
				header : '委外加工送货地址',
				width : 170,
				dataIndex : 'machgGdsAddr',
				sortable : true
			}, {
				header : '结算货币',
				width : 170,
				dataIndex : 'stlCurOra',
				sortable : true
			}, {
				header : '加工费合计',
				width : 170,
				dataIndex : 'machgCostSum',
				renderer: money('0,000.00' ),
				sortable : true
			}, {
				header : '付款方式',
				width : 170,
				dataIndex : 'payMdOra',
				sortable : true
			}, {
				header : '加工厂地址',
				width : 170,
				dataIndex : 'machgAddr',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂电话',
				width : 170,
				dataIndex : 'machgTel',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂传真',
				width : 170,
				dataIndex : 'machgFax',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂联系人',
				width : 170,
				dataIndex : 'machgContcr',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂联系人邮件',
				width : 170,
				dataIndex : 'machgContcrMail',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂银行名',
				width : 170,
				dataIndex : 'machgBankFstNm',
				hidden : true,
				sortable : true
			}, {
				header : '加工厂银行账户',
				width : 170,
				dataIndex : 'machgBankAcct',
				hidden : true,
				sortable : true
			}, {
				header : '包装要求',
				width : 170,
				dataIndex : 'pkgReqst',
				sortable : true
			}, {
				header : '质量要求',
				width : 170,
				dataIndex : 'qltyReqst',
				sortable : true
			}, {
				header : '委外加工型号',
				width : 170,
				dataIndex : 'machgModel',
				sortable : true
			}, {
				header : '附件',
				width : 170,
				dataIndex : 'attm',
				hidden : true,
				sortable : true
			}, {
				header : '备注',
				width : 170,
				dataIndex : 'memo',
				sortable : true
			}, {
				header : '外协合同ID',
				width : 170,
				hidden:true,
				dataIndex : 'asstContrId',
				sortable : true
			}, {
			  header : '开具发票说明',
			   width : 210,
			   dataIndex : 'memo1',
			   sortable : true
			          },{
			  header : '交（提）货地点和方式',
			   width : 210,
			   dataIndex : 'memo2',
			   sortable : true
			          },{
			  header : '运输方式及到达站港和费用负担',
			   width : 210,
			   dataIndex : 'memo3',
			   sortable : true
			          },{
			  header : '合理损耗和计算方法',
			   width : 210,
			   dataIndex : 'memo4',
			   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzAsstMachgContractMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ASST_CONTR_ID',
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
											addXywzAsstMachgContractMgmtForm.getForm().reset();
											addXywzAsstMachgContractMgmtWindow.show();
										}
									},
									'-',
									{
										text : '修改',
										iconCls : 'editIconCss',
										handler : function() {

											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												editXywzAsstMachgContractMgmtForm.getForm().loadRecord(selectRe);
												editXywzAsstMachgContractMgmtWindow.show();

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
												tempId = selectRe.data.asstContrId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzAsstMachgContractMgmtAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzAsstMachgContractMgmtQueryAction.json'
							        }),'-',
									{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid
											.getSelectionModel()
											.getSelections().length;

											var selectRe = grid.getSelectionModel()
											.getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzAsstMachgContractMgmtForm
														.getForm().loadRecord(
																selectRe);
												detailXywzAsstMachgContractMgmtWindow.show();
											}
										}
									},'-',{
										text : '商品详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/asst/xywzAsstMachgContractMgmtDetail.jsp?'
												+ '&machgContrNum='+_record.data.machgContrNum; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
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
							      			var sheetId = record.get("machgContrNum");
								  			window.open(basepath+"/contents/pages/xywz/asst/xywzAsstMachgContractMgmtPrint.jsp?sheetId="+sheetId,"newwindow","");
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

			// 新增窗口展示的from
			var addXywzAsstMachgContractMgmtForm = new Ext.form.FormPanel({
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
									name : 'machgContrNum',
									fieldLabel : '<font color=red>*</font>外协加工合同号',
									allowBlank : false,
									blankText : '外协加工合同号不能为空',
									maxLength:30,
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
									name : 'machgContrNm',
									fieldLabel : '<font color=red>*</font>外协加工合同名称',
									allowBlank : false,
									blankText : '外协加工合同名称不能为空',
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.AsstMachgCorpMgmtQuery(
										{
											fieldLabel : '<font color=red>*</font>外协加工厂编号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'machgOrdrNumId',
											id : 'ASST_MACHG_ID22',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('ASST_MACHG_ID22').oAsstMachgCorpMgmtQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('ASST_MACHG_ID22').setValue(records[0].data.ASST_MACHG_ID);
												addXywzAsstMachgContractMgmtForm.getForm().findField('machgOrdrNm').setValue(records[0].data.ASST_MACHG_NM);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'machgOrdrNm',
									fieldLabel : '外协加工厂名称',
									readOnly : true,
									maxLength:100,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'datefield',
									vtype : 'trim',
									Width : '100',
									name : 'contrDt',
									fieldLabel : '<font color=red>*</font>签约日期',
									allowBlank : false,
									blankText : '签约日期不能为空',
									editable:false,
									anchor : '90%',
								    format:'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'datefield',
									vtype : 'trim',
									Width : '100',
									name : 'deliverGdsPrd',
									fieldLabel : '<font color=red>*</font>交货期',
									allowBlank : false,
									blankText : '交货期不能为空',
									editable:false,
									anchor : '90%',
								    format:'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.ContractFrgnQuery(
										{
											fieldLabel : '<font color=red>*</font>订单合同号',
											labelStyle : 'text-align:left;',
											name : 'ordrContrNum',
											id : 'CONTR_NUM11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('CONTR_NUM11').oContractFrgnQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('CONTR_NUM11').setValue(records[0].data.CONTR_NUM);
											}
										})]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'signSite',
									fieldLabel : '<font color=red>*</font>签订地点',
									allowBlank : false,
									blankText : '签订地点不能为空',
									maxLength : 200,
									minLength : 1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'mainBizBiz',
									fieldLabel : '主营业务',
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
									name : 'stlModeAndTerm',
									fieldLabel : '<font color=red>*</font>结算方式及期限',
									allowBlank : false,
									blankText : '结算方式及期限不能为空',
									maxLength : 200,
									minLength : 1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'outMachgContcr',
									fieldLabel : '委外加工联系人',
									maxLength:50,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'datefield',
									vtype : 'trim',
									Width : '100',
									name : 'inputDt',
									fieldLabel : '<font color=red>*</font>录入日期',
									allowBlank : false,
									blankText : '录入日期不能为空',
									editable : false,
									anchor : '90%',
								    format:'Y-m-d'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.UserManagerIdQuery(
										{
											fieldLabel : '<font color=red>*</font>操作员',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'oprr',
											id : 'OPRR11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('OPRR11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('OPRR11').setValue(records[0].data.USER_NAME);
												addXywzAsstMachgContractMgmtForm.getForm().findField('oprrId').setValue(records[0].data.ACCOUNT_NAME);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'oprrId',
									fieldLabel : '操作员编号',
									readOnly : true,
									maxLength:500,
									minLength:1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Com.xywz.common.UserManagerIdQuery(
										{
											fieldLabel : '<font color=red>*</font>销售人员',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'sellPersMem',
											id : 'SELL_PERS_MEM11',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('SELL_PERS_MEM11').oCustomerQueryGrid.getSelectionModel().selections.items;
												Ext.getCmp('SELL_PERS_MEM11').setValue(records[0].data.USER_NAME);
												addXywzAsstMachgContractMgmtForm.getForm().findField('sellPersMemId').setValue(records[0].data.ACCOUNT_NAME);
											}
										}) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textfield',
									vtype : 'trim',
									Width : '100',
									name : 'sellPersMemId',
									fieldLabel : '销售人员编号',
									readOnly : true,
									maxLength : 50,
									minLength : 1,
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'gdsMode',
									 fieldLabel : '<font color=red>*</font>验货方式',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore,
									 allowBlank : false,
									 displayField : 'value',
									 valueField : 'key',
									 mode : 'local',
									 forceSelection : true,
									 typeAhead : true,
									 emptyText:'请选择',
									 resizable : true,
									 editable : false,
									 anchor : '90%'
				                  }) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'stlCur',
									 fieldLabel : '<font color=red>*</font>结算货币',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore1,
									 allowBlank : false,
									 displayField : 'value',
									 valueField : 'key',
									 mode : 'local',
									 forceSelection : true,
									 typeAhead : true,
									 emptyText:'请选择',
									 resizable : true,
									 editable : false,
									 anchor : '90%'
				                  }) ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'numberfield',
									vtype : 'trim',
									Width : '100',
									name : 'machgCostSum',
									fieldLabel : '<font color=red>*</font>加工费合计',
									allowBlank : false,
									blankText : '加工费合计不能为空',
									anchor : '90%'
								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'payMd',
									 fieldLabel : '<font color=red>*</font>付款方式',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore2,
									 allowBlank : false,
									 displayField : 'value',
									 valueField : 'key',
									 mode : 'local',
									 forceSelection : true,
									 typeAhead : true,
									 emptyText : '请选择',
									 resizable : true,
									 editable : false,
									 anchor : '90%'
				                  }) ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgAddr',
//									fieldLabel : '加工厂地址',
//									disabled:true,
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgTel',
//									fieldLabel : '加工厂电话',
//									disabled:true,
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgFax',
//									fieldLabel : '加工厂传真',
//									disabled:true,
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgContcr',
//									fieldLabel : '加工厂联系人',
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgContcrMail',
//									fieldLabel : '加工厂联系人邮件',
//									disabled:true,
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgBankFstNm',
//									fieldLabel : '加工厂银行名',
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textfield',
//									vtype : 'trim',
//									Width : '100',
//									name : 'machgBankAcct',
//									fieldLabel : '加工厂银行账户',
//									disabled:true,
//									maxLength:500,
//									minLength:1,
//									anchor : '90%'
//								} ]
							},{
								columnWidth : .5,
								layout : 'form',
								items : [ {
									xtype : 'textarea',
									vtype : 'trim',
									Width : '100',
									name : 'machgGdsAddr',
									fieldLabel : '委外加工送货地址',
									maxLength:200,
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
									name : 'pkgReqst',
									fieldLabel : '包装要求',
									maxLength:200,
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
									name : 'qltyReqst',
									fieldLabel : '质量要求',
									maxLength:200,
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
									name : 'machgModel',
									fieldLabel : '委外加工型号',
									maxLength:200,
									minLength:1,
									anchor : '90%'
								} ]
//							},{
//								columnWidth : .5,
//								layout : 'form',
//								items : [ {
//									xtype : 'textarea',
//									vtype : 'trim',
//									Width : '100',
//									name : 'attm',
//									fieldLabel : '附件',
//									maxLength:100,
//									minLength:1,
//									anchor : '90%'
//								} ]
							},{
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textarea',
					            vtype : 'trim',
					            Width : '100',
					            name : 'memo1',
					            fieldLabel : '<font color=red>*</font>开具发票说明',
					            allowBlank : false,
					            blankText : '开具发票说明不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textarea',
					            vtype : 'trim',
					            Width : '100',
					            name : 'memo2',
					            fieldLabel : '<font color=red>*</font>交（提）货地点和方式',
					            allowBlank : false,
					            blankText : '交（提）货地点和方式不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textarea',
					            vtype : 'trim',
					            Width : '100',
					            name : 'memo3',
					            fieldLabel : '<font color=red>*</font>运输方式及到达站港和费用负担',
					            allowBlank : false,
					            blankText : '运输方式及到达站港和费用负担不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textarea',
					            vtype : 'trim',
					            Width : '100',
					            name : 'memo4',
					            fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
					            allowBlank : false,
					            blankText : '合理损耗和计算方法不能为空',
					            maxLength : 200,
					            minLength : 1,
					            anchor : '90%'
					           } ]
								},{
									columnWidth : 1.06,
									layout : 'form',
									items : [ {
										xtype : 'textarea',
										vtype : 'trim',
										Width : '100',
										name : 'memo',
										fieldLabel : '备注',
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
							if(!addXywzAsstMachgContractMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgContractMgmtAction.json',
								method : 'POST',
								form : addXywzAsstMachgContractMgmtForm.getForm().id,
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
							
							addXywzAsstMachgContractMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzAsstMachgContractMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzAsstMachgContractMgmtForm = new Ext.form.FormPanel({
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
										name : 'machgContrNum',
										fieldLabel : '<font color=red>*</font>外协加工合同号',
										allowBlank : false,
										blankText : '外协加工合同号不能为空',
										readOnly : true,
										maxLength:30,
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
										name : 'machgContrNm',
										fieldLabel : '<font color=red>*</font>外协加工合同名称',
										allowBlank : false,
										blankText : '外协加工合同名称不能为空',
										maxLength:100,
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
										name : 'machgOrdrNumId',
										fieldLabel : '<font color=red>*</font>外协加工厂编号',
										allowBlank : false,
										blankText : '外协加工厂编号不能为空',
										readOnly : true,
										maxLength:100,
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
										name : 'machgOrdrNm',
										fieldLabel : '外协加工厂名称',
										readOnly : true,
										maxLength:100,
										minLength:1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'contrDt',
										fieldLabel : '<font color=red>*</font>签约日期',
										allowBlank : false,
										blankText : '签约日期不能为空',
										editable:false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'deliverGdsPrd',
										fieldLabel : '<font color=red>*</font>交货期',
										allowBlank : false,
										blankText : '交货期不能为空',
										editable:false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Com.xywz.common.ContractFrgnQuery(
											{
												fieldLabel : '<font color=red>*</font>订单合同号',
												labelStyle : 'text-align:left;',
												name : 'ordrContrNum',
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
												}
											})]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'signSite',
										fieldLabel : '<font color=red>*</font>签订地点',
										allowBlank : false,
										blankText : '签订地点不能为空',
										maxLength : 200,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textarea',
										vtype : 'trim',
										Width : '100',
										name : 'mainBizBiz',
										fieldLabel : '主营业务',
										maxLength:200,
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
										name : 'stlModeAndTerm',
										fieldLabel : '<font color=red>*</font>结算方式及期限',
										allowBlank : false,
										blankText : '结算方式及期限',
										maxLength : 200,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'outMachgContcr',
										fieldLabel : '委外加工联系人',
										maxLength:50,
										minLength:1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'inputDt',
										fieldLabel : '<font color=red>*</font>录入日期',
										allowBlank : false,
										blankText : '录入日期不能为空',
										editable : false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '<font color=red>*</font>操作员',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'oprr',
												id : 'OPRR22',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('OPRR22').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('OPRR22').setValue(records[0].data.USER_NAME);
													addXywzAsstMachgContractMgmtForm.getForm().findField('oprrId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'oprrId',
										fieldLabel : '操作员编号',
										readOnly : true,
										maxLength:50,
										minLength:1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Com.xywz.common.UserManagerIdQuery(
											{
												fieldLabel : '<font color=red>*</font>销售人员',
												labelStyle : 'text-align:left;',
												//labelWidth : 100,
												name : 'sellPersMem',
												id : 'SELL_PERS_MEM22',
												singleSelected : false,
												// 单选复选标志
												editable : false,
												allowBlank : false,
												// 不允许为空
												blankText : "不能为空，请填写",
												anchor : '90%',
												callback : function(a, b) {
													var records = Ext.getCmp('SELL_PERS_MEM22').oCustomerQueryGrid.getSelectionModel().selections.items;
													Ext.getCmp('SELL_PERS_MEM22').setValue(records[0].data.USER_NAME);
													addXywzAsstMachgContractMgmtForm.getForm().findField('sellPersMemId').setValue(records[0].data.ACCOUNT_NAME);
												}
											}) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'sellPersMemId',
										fieldLabel : '销售人员编号',
										readOnly : true,
										maxLength : 50,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'gdsMode',
										 fieldLabel : '<font color=red>*</font>验货方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'stlCur',
										 fieldLabel : '<font color=red>*</font>结算货币',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore1,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										vtype : 'trim',
										Width : '100',
										name : 'machgCostSum',
										fieldLabel : '<font color=red>*</font>加工费合计',
										allowBlank : false,
										blankText : '加工费合计不能为空',
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'payMd',
										 fieldLabel : '<font color=red>*</font>付款方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore2,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText : '请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgAddr',
//										fieldLabel : '加工厂地址',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgTel',
//										fieldLabel : '加工厂电话',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgFax',
//										fieldLabel : '加工厂传真',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgContcr',
//										fieldLabel : '加工厂联系人',
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgContcrMail',
//										fieldLabel : '加工厂联系人邮件',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgBankFstNm',
//										fieldLabel : '加工厂银行名',
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgBankAcct',
//										fieldLabel : '加工厂银行账户',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textarea',
										vtype : 'trim',
										Width : '100',
										name : 'machgGdsAddr',
										fieldLabel : '委外加工送货地址',
										maxLength:200,
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
										name : 'pkgReqst',
										fieldLabel : '包装要求',
										maxLength:200,
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
										name : 'qltyReqst',
										fieldLabel : '质量要求',
										maxLength:200,
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
										name : 'machgModel',
										fieldLabel : '委外加工型号',
										maxLength:200,
										minLength:1,
										anchor : '90%'
									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textarea',
//										vtype : 'trim',
//										Width : '100',
//										name : 'attm',
//										fieldLabel : '附件',
//										maxLength:100,
//										minLength:1,
//										anchor : '90%'
//									} ]
								},{
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo1',
						            fieldLabel : '<font color=red>*</font>开具发票说明',
						            allowBlank : false,
						            blankText : '开具发票说明不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo2',
						            fieldLabel : '<font color=red>*</font>交（提）货地点和方式',
						            allowBlank : false,
						            blankText : '交（提）货地点和方式不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo3',
						            fieldLabel : '<font color=red>*</font>运输方式及到达站港和费用负担',
						            allowBlank : false,
						            blankText : '运输方式及到达站港和费用负担不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo4',
						            fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
						            allowBlank : false,
						            blankText : '合理损耗和计算方法不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ] 
									},{
										columnWidth : 1.06,
										layout : 'form',
										items : [ {
											xtype : 'textarea',
											vtype : 'trim',
											Width : '100',
											name : 'memo',
											fieldLabel : '备注',
											maxLength:100,
											minLength:1,
											anchor : '90%'
										} ]
									},{
										columnWidth : 1.06,
										layout : 'form',
										items : [ {
											xtype : 'textarea',
											vtype : 'trim',
											Width : '100',
											name : 'asstContrId',
											fieldLabel : '外协合同ID',
											hidden : true,
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
							if(!editXywzAsstMachgContractMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzAsstMachgContractMgmtAction.json',
								method : 'POST',
								form : editXywzAsstMachgContractMgmtForm.getForm().id,
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
							
							editXywzAsstMachgContractMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzAsstMachgContractMgmtWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzAsstMachgContractMgmtForm = new Ext.form.FormPanel({
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
										name : 'machgContrNum',
										fieldLabel : '<font color=red>*</font>外协加工合同号',
										allowBlank : false,
										blankText : '外协加工合同号不能为空',
										readOnly : true,
										maxLength:30,
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
										name : 'machgContrNm',
										fieldLabel : '<font color=red>*</font>外协加工合同名称',
										allowBlank : false,
										blankText : '外协加工合同名称不能为空',
										maxLength:100,
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
										name : 'machgOrdrNumId',
										fieldLabel : '<font color=red>*</font>外协加工厂编号',
										allowBlank : false,
										blankText : '外协加工厂编号不能为空',
										readOnly : true,
										maxLength:100,
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
										name : 'machgOrdrNm',
										fieldLabel : '外协加工厂名称',
										readOnly : true,
										maxLength:100,
										minLength:1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'contrDt',
										fieldLabel : '<font color=red>*</font>签约日期',
										allowBlank : false,
										blankText : '签约日期不能为空',
										editable:false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'deliverGdsPrd',
										fieldLabel : '<font color=red>*</font>交货期',
										allowBlank : false,
										blankText : '交货期不能为空',
										editable:false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'ordrContrNum',
										fieldLabel : '<font color=red>*</font>订单合同号',
										allowBlank : false,
										blankText : '订单合同号不能为空',
										maxLength : 200,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'signSite',
										fieldLabel : '<font color=red>*</font>签订地点',
										allowBlank : false,
										blankText : '签订地点不能为空',
										maxLength : 200,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textarea',
										vtype : 'trim',
										Width : '100',
										name : 'mainBizBiz',
										fieldLabel : '主营业务',
										maxLength:200,
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
										name : 'stlModeAndTerm',
										fieldLabel : '<font color=red>*</font>结算方式及期限',
										allowBlank : false,
										blankText : '结算方式及期限',
										maxLength : 200,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'outMachgContcr',
										fieldLabel : '委外加工联系人',
										maxLength:50,
										minLength:1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'datefield',
										vtype : 'trim',
										Width : '100',
										name : 'inputDt',
										fieldLabel : '<font color=red>*</font>录入日期',
										allowBlank : false,
										blankText : '录入日期不能为空',
										editable : false,
										anchor : '90%',
									    format:'Y-m-d'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'oprr',
										fieldLabel : '操作员',
										readOnly : true,
										maxLength:50,
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
										name : 'oprrId',
										fieldLabel : '操作员编号',
										readOnly : true,
										maxLength:50,
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
										name : 'sellPersMem',
										fieldLabel : '销售人员',
										readOnly : true,
										maxLength : 50,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textfield',
										vtype : 'trim',
										Width : '100',
										name : 'sellPersMemId',
										fieldLabel : '销售人员编号',
										readOnly : true,
										maxLength : 50,
										minLength : 1,
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'gdsMode',
										 fieldLabel : '<font color=red>*</font>验货方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'stlCur',
										 fieldLabel : '<font color=red>*</font>结算货币',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore1,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText:'请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'numberfield',
										vtype : 'trim',
										Width : '100',
										name : 'machgCostSum',
										fieldLabel : '<font color=red>*</font>加工费合计',
										allowBlank : false,
										blankText : '加工费合计不能为空',
										anchor : '90%'
									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'payMd',
										 fieldLabel : '<font color=red>*</font>付款方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore2,
										 allowBlank : false,
										 displayField : 'value',
										 valueField : 'key',
										 mode : 'local',
										 forceSelection : true,
										 typeAhead : true,
										 emptyText : '请选择',
										 resizable : true,
										 editable : false,
										 anchor : '90%'
					                  }) ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgAddr',
//										fieldLabel : '加工厂地址',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgTel',
//										fieldLabel : '加工厂电话',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgFax',
//										fieldLabel : '加工厂传真',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgContcr',
//										fieldLabel : '加工厂联系人',
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgContcrMail',
//										fieldLabel : '加工厂联系人邮件',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgBankFstNm',
//										fieldLabel : '加工厂银行名',
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textfield',
//										vtype : 'trim',
//										Width : '100',
//										name : 'machgBankAcct',
//										fieldLabel : '加工厂银行账户',
//										disabled:true,
//										maxLength:500,
//										minLength:1,
//										anchor : '90%'
//									} ]
								},{
									columnWidth : .5,
									layout : 'form',
									items : [ {
										xtype : 'textarea',
										vtype : 'trim',
										Width : '100',
										name : 'machgGdsAddr',
										fieldLabel : '委外加工送货地址',
										maxLength:200,
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
										name : 'pkgReqst',
										fieldLabel : '包装要求',
										maxLength:200,
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
										name : 'qltyReqst',
										fieldLabel : '质量要求',
										maxLength:200,
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
										name : 'machgModel',
										fieldLabel : '委外加工型号',
										maxLength:200,
										minLength:1,
										anchor : '90%'
									} ]
//								},{
//									columnWidth : .5,
//									layout : 'form',
//									items : [ {
//										xtype : 'textarea',
//										vtype : 'trim',
//										Width : '100',
//										name : 'attm',
//										fieldLabel : '附件',
//										maxLength:100,
//										minLength:1,
//										anchor : '90%'
//									} ]
								},{
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo1',
						            fieldLabel : '<font color=red>*</font>开具发票说明',
						            allowBlank : false,
						            blankText : '开具发票说明不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo2',
						            fieldLabel : '<font color=red>*</font>交（提）货地点和方式',
						            allowBlank : false,
						            blankText : '交（提）货地点和方式不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo3',
						            fieldLabel : '<font color=red>*</font>运输方式及到达站港和费用负担',
						            allowBlank : false,
						            blankText : '运输方式及到达站港和费用负担不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ]
						          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'textarea',
						            vtype : 'trim',
						            Width : '100',
						            name : 'memo4',
						            fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
						            allowBlank : false,
						            blankText : '合理损耗和计算方法不能为空',
						            maxLength : 200,
						            minLength : 1,
						            anchor : '90%'
						           } ] 
									},{
										columnWidth : 1.06,
										layout : 'form',
										items : [ {
											xtype : 'textarea',
											vtype : 'trim',
											Width : '100',
											name : 'memo',
											fieldLabel : '备注',
											maxLength:100,
											minLength:1,
											anchor : '90%'
										} ]
									},{
										columnWidth : 1.06,
										layout : 'form',
										items : [ {
											xtype : 'textarea',
											vtype : 'trim',
											Width : '100',
											name : 'asstContrId',
											fieldLabel : '外协合同ID',
											hidden : true,
											maxLength:100,
											minLength:1,
											anchor : '90%'
										} ]
								} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [
					    {
						text : '返  回',
						handler : function() {
					    	detailXywzAsstMachgContractMgmtWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzAsstMachgContractMgmtWindow = new Ext.Window({
				title : '外协加工合同新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :450,
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
				autoScroll : true,
				border : false,
				items : [ addXywzAsstMachgContractMgmtForm ]
			});

			// 定义修改窗口
			var editXywzAsstMachgContractMgmtWindow = new Ext.Window({
				title : '外协加工合同修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 450,
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
				items : [ editXywzAsstMachgContractMgmtForm ]
			});
			
			// 定义详情窗口
			var detailXywzAsstMachgContractMgmtWindow = new Ext.Window({
				title : '客户跟进预览',
				plain : true,
				layout : 'fit',
				width : 800,
				height :450,
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
				items : [ detailXywzAsstMachgContractMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外协加工合同信息列表',
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