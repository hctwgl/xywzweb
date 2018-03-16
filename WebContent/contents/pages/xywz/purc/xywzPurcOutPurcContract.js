Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“是否”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“订单状态”选择数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_ORDR_STAT'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“当前步骤”选择数据集
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_CURR_STP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“币种”选择数据集
			var boxstore3 = new Ext.data.Store({  
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
			//“验货方式”选择数据集
			var boxstore4 = new Ext.data.Store({  
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
			//“运输方式”选择数据集
			var boxstore5 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_SEND_TYPE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“付款方式”选择数据集
			var boxstore6 = new Ext.data.Store({  
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
				title : "外部采购合同信息查询",
				labelWidth : 90, // 标签宽度
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'middle', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 130,
				items : [ {
					layout : 'column',
					items : [
					{
						 columnWidth : .25,
						 layout : 'form',
						 items :[ new Com.xywz.common.PurcProvrMgmtCustQuery(
						{
							fieldLabel : '供应商编号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'provrNum',
							id : 'PROVR_NUM11',
							singleSelected : false,
							// 单选复选标志
	//									editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('PROVR_NUM11').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('PROVR_NUM11').setValue(records[0].data.PROVR_NUM);									
							}
						}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'puchSnglId',
							fieldLabel : '采购单编号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'puchNm',
							fieldLabel : '合同名称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'chkStat',
							fieldLabel : '审核状态',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore,
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
					}, {
						columnWidth : .25,
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
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							Width : '100',
							name : 'contrDtTo',
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
				   name : 'id',
				   mapping : 'ID'
				  }, { 
				   name : 'sgn',
				   mapping : 'SGN'
				  }, { 
				   name : 'chkStat',
				   mapping : 'CHK_STAT'
				  }, { 
					   name : 'chkStatOra',
					   mapping : 'CHK_STAT_ORA'
					  }, { 
				   name : 'src',
				   mapping : 'SRC'
				  }, { 
				   name : 'puchSnglId',
				   mapping : 'PUCH_SNGL_ID'
				  }, { 
				   name : 'puchNm',
				   mapping : 'PUCH_NM'
				  }, { 
				   name : 'contrDt',
				   mapping : 'CONTR_DT'
				  }, { 
				   name : 'cfmDvy',
				   mapping : 'CFM_DVY'
				  }, { 
					   name : 'cfmDvyOra',
					   mapping : 'CFM_DVY_ORA'
					  }, { 
				   name : 'provrNum',
				   mapping : 'PROVR_NUM'
				  }, { 
				   name : 'provrShtNm',
				   mapping : 'PROVR_SHT_NM'
				  }, { 
				   name : 'currStp',
				   mapping : 'CURR_STP'
				  }, { 
					   name : 'currStpOra',
					   mapping : 'CURR_STP_ORA'
					  }, { 
				   name : 'stlCur',
				   mapping : 'STL_CUR'
				  }, { 
					   name : 'stlCurOra',
					   mapping : 'STL_CUR_ORA'
					  }, { 
				   name : 'merchdTotlQty',
				   mapping : 'MERCHD_TOTL_QTY'
				  }, { 
				   name : 'merchdTotlAmt',
				   mapping : 'MERCHD_TOTL_AMT'
				  }, { 
				   name : 'contrTotlAmt',
				   mapping : 'CONTR_TOTL_AMT'
				  }, { 
				   name : 'incTaxSum',
				   mapping : 'INC_TAX_SUM'
				  }, { 
				   name : 'othAddMoney',
				   mapping : 'OTH_ADD_MONEY'
				  }, { 
				   name : 'othDedctMoney',
				   mapping : 'OTH_DEDCT_MONEY'
				  }, { 
				   name : 'memo',
				   mapping : 'MEMO'
				  }, { 
				   name : 'puchDeptNm',
				   mapping : 'PUCH_DEPT_NM'
				  }, { 
				   name : 'puchPersId',
				   mapping : 'PUCH_PERS_ID'
				  }, { 
				   name : 'puchPersFstNm',
				   mapping : 'PUCH_PERS_FST_NM'
				  }, { 
				   name : 'bizMemId',
				   mapping : 'BIZ_MEM_ID'
				  }, { 
				   name : 'bizMemFstNm',
				   mapping : 'BIZ_MEM_FST_NM'
				  }, { 
				   name : 'ownPersNm',
				   mapping : 'OWN_PERS_NM'
				  }, { 
				   name : 'inputDt',
				   mapping : 'INPUT_DT'
				  }, { 
				   name : 'insnMode',
				   mapping : 'INSN_MODE'
				  }, { 
					   name : 'insnModeOra',
					   mapping : 'INSN_MODE_ORA'
					  }, { 
				   name : 'delyAddr',
				   mapping : 'DELY_ADDR'
				  }, { 
				   name : 'traffMode',
				   mapping : 'TRAFF_MODE'
				  }, { 
					   name : 'traffModeOra',
					   mapping : 'TRAFF_MODE_ORA'
					  }, { 
				   name : 'payMd',
				   mapping : 'PAY_MD'
				  }, { 
					   name : 'payMdOra',
					   mapping : 'PAY_MD_ORA'
					  }, { 
				   name : 'ordrCurrStat',
				   mapping : 'ORDR_CURR_STAT'
					  }, { 
						   name : 'ordrCurrStatOra',
						   mapping : 'ORDR_CURR_STAT_ORA'
					  }, {    
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
				          },{ 
				   name : 'memo5',
				   mapping : 'MEMO5'
				          },{ 
				   name : 'memo6',
				   mapping : 'MEMO6' 
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : 'ID',
				   width : 210,
				   dataIndex : 'id',
				   sortable : true,
				   hidden : true
				  }, {
				   header : '审核状态',
				   width : 210,
				   dataIndex : 'chkStatOra',
				   sortable : true
				  }, { 
				   header : '来源',
				   width : 210,
				   dataIndex : 'src',
				   sortable : true
				  }, { 
				   header : '采购单编号',
				   width : 210,
				   dataIndex : 'puchSnglId',
				   sortable : true
				  }, { 
				   header : '合同名称',
				   width : 210,
				   dataIndex : 'puchNm',
				   sortable : true
				  }, { 
				   header : '签约日期',
				   width : 210,
				   dataIndex : 'contrDt',
				   sortable : true
				  }, { 
				   header : '确定交货',
				   width : 210,
				   dataIndex : 'cfmDvyOra',
				   sortable : true
				  }, { 
				   header : '供应商编号',
				   width : 210,
				   dataIndex : 'provrNum',
				   sortable : true
				  }, { 
				   header : '供应商简称',
				   width : 210,
				   dataIndex : 'provrShtNm',
				   sortable : true
				  }, { 
				   header : '当前步骤',
				   width : 210,
				   dataIndex : 'currStpOra',
				   sortable : true
				  }, { 
				   header : '结算货币',
				   width : 210,
				   dataIndex : 'stlCurOra',
				   sortable : true
				  }, { 
				   header : '商品总数量',
				   width : 210,
				   dataIndex : 'merchdTotlQty',
				   sortable : true,
				   renderer: money('0,000' )
				  }, { 
				   header : '商品总金额',
				   width : 210,
				   dataIndex : 'merchdTotlAmt',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '合同总金额',
				   width : 210,
				   dataIndex : 'contrTotlAmt',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '进项税总计',
				   width : 210,
				   dataIndex : 'incTaxSum',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '其他增加款',
				   width : 210,
				   dataIndex : 'othAddMoney',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '其他扣除款',
				   width : 210,
				   dataIndex : 'othDedctMoney',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, {  
				   header : '标注',
				   width : 210,
				   dataIndex : 'sgn',
				   sortable : true
				  }, { 
				   header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
				  }, { 
				   header : '采购部门名称',
				   width : 210,
				   dataIndex : 'puchDeptNm',
				   sortable : true
				  }, { 
				   header : '采购人编号',
				   width : 210,
				   dataIndex : 'puchPersId',
				   sortable : true
				  }, { 
				   header : '采购人名字',
				   width : 210,
				   dataIndex : 'puchPersFstNm',
				   sortable : true
				  }, { 
				   header : '业务员编号',
				   width : 210,
				   dataIndex : 'bizMemId',
				   sortable : true
				  }, { 
				   header : '业务员名字',
				   width : 210,
				   dataIndex : 'bizMemFstNm',
				   sortable : true
				  }, { 
				   header : '拥有人名称',
				   width : 210,
				   dataIndex : 'ownPersNm',
				   sortable : true
				  }, { 
				   header : '录入日期',
				   width : 210,
				   dataIndex : 'inputDt',
				   sortable : true
				  }, { 
				   header : '验货方式',
				   width : 210,
				   dataIndex : 'insnModeOra',
				   sortable : true
				  }, { 
				   header : '送货地址',
				   width : 210,
				   dataIndex : 'delyAddr',
				   sortable : true
				  }, { 
				   header : '运输方式',
				   width : 210,
				   dataIndex : 'traffModeOra',
				   sortable : true
				  }, { 
				   header : '付款方式',
				   width : 210,
				   dataIndex : 'payMdOra',
				   sortable : true
				  }, { 
				   header : '订单当前状态',
				   width : 210,
				   dataIndex : 'ordrCurrStatOra',
				   sortable : true
				  }, { 
				   header : '质量技术标准要求',
				   width : 210,
				   dataIndex : 'memo1',
				   sortable : true
				          },{ 
				   header : '运输方式及到达站港和费用负担',
				   width : 210,
				   dataIndex : 'memo2',
				   sortable : true
				          },{ 
				   header : '合理损耗和计算方法',
				   width : 210,
				   dataIndex : 'memo3',
				   sortable : true
				          },{ 
				   header : '包装标准',
				   width : 210,
				   dataIndex : 'memo4',
				   sortable : true
				          },{ 
				   header : '结算方式及期限',
				   width : 210,
				   dataIndex : 'memo5',
				   sortable : true
				          },{ 
				   header : '违约责任',
				   width : 210,
				   dataIndex : 'memo6',
				   sortable : true 

			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcOutPurcContractQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'ID',
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
											addXywzPurcOutPurcContractForm.getForm().reset();
											addXywzPurcOutPurcContractForm.getForm().findField('inputDt').setValue(new Date());
											addXywzPurcOutPurcContractForm.getForm().findField('incTaxSum').setValue(0);
											addXywzPurcOutPurcContractForm.getForm().findField('othAddMoney').setValue(0);
											addXywzPurcOutPurcContractForm.getForm().findField('othDedctMoney').setValue(0);
											addXywzPurcOutPurcContractWindow.show();
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
												editXywzPurcOutPurcContractForm.getForm().loadRecord(selectRe);
												editXywzPurcOutPurcContractWindow.show();

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
											var tempPuchId;
											var tempCount;
											var idStr = '';
											var puchSnglId='';
											for ( var i = 0; i < selectLength; i++) {
												selectRe = grid.getSelectionModel().getSelections()[i];
												tempId = selectRe.data.id;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												tempPuchId = selectRe.data.puchSnglId;
												puchSnglId += tempPuchId;
												if (i != selectLength - 1)
													puchSnglId += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPurcOutPurcContractAction!batchDestroy.json?idStr='+ idStr+'&puchSnglId=' +puchSnglId,
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
							            url : basepath+'/XywzPurcOutPurcContractQueryAction.json'
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
												detailXywzPurcOutPurcContractForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcOutPurcContractWindow.show();
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
												+ '/contents/pages/xywz/purc/xywzPurcOutPurcContractDetail.jsp?'
												+ '&puchSnglId='+_record.data.puchSnglId; 
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
							      			var sheetId = record.get("puchSnglId");
								  			window.open(basepath+"/contents/pages/xywz/purc/xywzPurcOutPurcContractPrint.jsp?sheetId="+sheetId,"newwindow","");
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
			var addXywzPurcOutPurcContractForm = new Ext.form.FormPanel({
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
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'chkStat',
									 fieldLabel : '<font color=red>*</font>审核状态',
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
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'src',
					             fieldLabel : '<font color=red>*</font>来源',
					             allowBlank : false,
					             blankText : '来源不能为空',
					             maxLength : 100,
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
					             name : 'puchSnglId',
					             fieldLabel : '<font color=red>*</font>采购单编号',
					             allowBlank : false,
					             blankText : '采购单编号不能为空',
					             maxLength : 30,
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
					             name : 'puchNm',
					             fieldLabel : '<font color=red>*</font>合同名称',
					             allowBlank : false,
					             blankText : '合同名称不能为空',
					             maxLength : 30,
					             minLength : 1,
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
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'cfmDvy',
									 fieldLabel : '<font color=red>*</font>确定交货',
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
					             items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
								{
									fieldLabel : '<font color=red>*</font>供应商编号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'provrNum',
									id : 'PROVR_NUM22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PROVR_NUM22').oPurcProvrMgmtCustQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PROVR_NUM22').setValue(records[0].data.PROVR_NUM);	
										addXywzPurcOutPurcContractForm.getForm().findField('provrShtNm').setValue(records[0].data.PROVR_SHT_NM);
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrShtNm',
					             fieldLabel : '<font color=red>*</font>供应商简称',
					             allowBlank : false,
					             blankText : '供应商简称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'currStp',
									 fieldLabel : '<font color=red>*</font>当前步骤',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore2,
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
									 store : boxstore3,
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
					             name : 'merchdTotlQty',
					             fieldLabel : '<font color=red>*</font>商品总数量',
					             allowBlank : false,
					             blankText : '商品总数量不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'merchdTotlAmt',
					             fieldLabel : '<font color=red>*</font>商品总金额',
					             allowBlank : false,
					             blankText : '商品总金额不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'contrTotlAmt',
					             fieldLabel : '<font color=red>*</font>合同总金额',
					             allowBlank : false,
					             blankText : '合同总金额不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'incTaxSum',
					             fieldLabel : '进项税总计',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'othAddMoney',
					             fieldLabel : '其他增加款',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'othDedctMoney',
					             fieldLabel : '其他扣除款',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'puchDeptNm',
					             fieldLabel : '<font color=red>*</font>采购部门名称',
					             allowBlank : false,
					             blankText : '采购部门名称不能为空',
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
						             name : 'ownPersNm',
						             fieldLabel : '拥有人名称',
						             maxLength : 50,
						             minLength : 1,
						             anchor : '90%'
						            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '<font color=red>*</font>采购人名字',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'puchPersFstNm',
									id : 'PUCH_PERS_FST_NM11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PUCH_PERS_FST_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PUCH_PERS_FST_NM11').setValue(records[0].data.USER_NAME);
										addXywzPurcOutPurcContractForm.getForm().findField('puchPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'puchPersId',
					             fieldLabel : '<font color=red>*</font>采购人编号',
					             allowBlank : false,
					             blankText : '采购人编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '<font color=red>*</font>业务员名字',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'bizMemFstNm',
									id : 'BIZ_MEM_FST_NM11',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('BIZ_MEM_FST_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('BIZ_MEM_FST_NM11').setValue(records[0].data.USER_NAME);
										addXywzPurcOutPurcContractForm.getForm().findField('bizMemId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'bizMemId',
					             fieldLabel : '<font color=red>*</font>业务员编号',
					             allowBlank : false,
					             blankText : '业务员编号不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
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
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'insnMode',
									 fieldLabel : '<font color=red>*</font>验货方式',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore4,
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
						             xtype : 'textarea',
						             vtype : 'trim',
						             Width : '100',
						             name : 'sgn',
						             fieldLabel : '标注',
						             maxLength : 100,
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
					             name : 'delyAddr',
					             fieldLabel : '<font color=red>*</font>送货地址',
					             allowBlank : false,
					             blankText : '送货地址不能为空',
					             maxLength : 200,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'traffMode',
									 fieldLabel : '<font color=red>*</font>运输方式',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore5,
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
				            	     hiddenName : 'payMd',
									 fieldLabel : '<font color=red>*</font>付款方式',
									 labelStyle: 'text-align:left;',
									 triggerAction : 'all',
									 store : boxstore6,
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
				            	     hiddenName : 'ordrCurrStat',
									 fieldLabel : '<font color=red>*</font>订单当前状态',
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
				                  xtype : 'textarea',
				                  vtype : 'trim',
				                  Width : '100',
				                  name : 'memo1',
				                  fieldLabel : '<font color=red>*</font>质量技术标准要求',
				                  allowBlank : false,
				                  blankText : '质量技术标准要求不能为空',
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
				                  name : 'memo3',
				                  fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
				                  allowBlank : false,
				                  blankText : '合理损耗和计算方法不能为空',
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
				                  fieldLabel : '<font color=red>*</font>包装标准',
				                  allowBlank : false,
				                  blankText : '包装标准不能为空',
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
				                  name : 'memo5',
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
				                  xtype : 'textarea',
				                  vtype : 'trim',
				                  Width : '100',
				                  name : 'memo6',
				                  fieldLabel : '<font color=red>*</font>违约责任',
				                  allowBlank : false,
				                  blankText : '违约责任不能为空',
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
					             name : 'id',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPurcOutPurcContractForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
			      			var remName='105';
		      			    var recvCstid='gxb';
		      			    var str1=addXywzPurcOutPurcContractForm.getForm().findField('puchSnglId').getValue();
		      			    var str2=addXywzPurcOutPurcContractForm.getForm().findField('provrShtNm').getValue();
		      			    var sign='105-1';
							Ext.Ajax.request({
								url : basepath + '/XywzPurcOutPurcContractAction.json',
								method : 'POST',
								form : addXywzPurcOutPurcContractForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
									
					      			Ext.Ajax.request({
										url : basepath+ '/XywzSysmMsgRmndAction!insertRemindComm.json?remName='+ remName +'&recvCstid='+recvCstid+'&str1='+str1+'&str2='+str2+'&sign='+sign
									});
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							addXywzPurcOutPurcContractWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcOutPurcContractWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcOutPurcContractForm = new Ext.form.FormPanel({
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
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'chkStat',
									 fieldLabel : '<font color=red>*</font>审核状态',
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
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'src',
					             fieldLabel : '<font color=red>*</font>来源',
					             allowBlank : false,
					             blankText : '来源不能为空',
					             maxLength : 100,
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
					             name : 'puchSnglId',
					             fieldLabel : '<font color=red>*</font>采购单编号',
					             allowBlank : false,
					             blankText : '采购单编号不能为空',
					             readOnly : true,
					             maxLength : 30,
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
					             name : 'puchNm',
					             fieldLabel : '<font color=red>*</font>合同名称',
					             allowBlank : false,
					             blankText : '合同名称不能为空',
					             maxLength : 30,
					             minLength : 1,
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
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'cfmDvy',
									 fieldLabel : '<font color=red>*</font>确定交货',
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
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 200,
					             minLength : 1,
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
					             name : 'provrShtNm',
					             fieldLabel : '<font color=red>*</font>供应商简称',
					             allowBlank : false,
					             blankText : '供应商简称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'currStp',
										 fieldLabel : '<font color=red>*</font>当前步骤',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore2,
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
										 store : boxstore3,
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
						             name : 'merchdTotlQty',
						             fieldLabel : '<font color=red>*</font>商品总数量',
						             allowBlank : false,
						             blankText : '商品总数量不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'merchdTotlAmt',
						             fieldLabel : '<font color=red>*</font>商品总金额',
						             allowBlank : false,
						             blankText : '商品总金额不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'contrTotlAmt',
						             fieldLabel : '<font color=red>*</font>合同总金额',
						             allowBlank : false,
						             blankText : '合同总金额不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'incTaxSum',
						             fieldLabel : '进项税总计',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'othAddMoney',
						             fieldLabel : '其他增加款',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'othDedctMoney',
						             fieldLabel : '其他扣除款',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'puchDeptNm',
						             fieldLabel : '<font color=red>*</font>采购部门名称',
						             allowBlank : false,
						             blankText : '采购部门名称不能为空',
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
							             name : 'ownPersNm',
							             fieldLabel : '拥有人名称',
							             maxLength : 50,
							             minLength : 1,
							             anchor : '90%'
							            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Com.xywz.common.UserManagerIdQuery(
									{
										fieldLabel : '<font color=red>*</font>采购人名字',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'puchPersFstNm',
										id : 'PUCH_PERS_FST_NM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('PUCH_PERS_FST_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('PUCH_PERS_FST_NM22').setValue(records[0].data.USER_NAME);
											editXywzPurcOutPurcContractForm.getForm().findField('puchPersId').setValue(records[0].data.ACCOUNT_NAME);
										}
									}) ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'puchPersId',
						             fieldLabel : '<font color=red>*</font>采购人编号',
						             allowBlank : false,
						             blankText : '采购人编号不能为空',
						             maxLength : 200,
						             minLength : 1,
						             readOnly : true,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Com.xywz.common.UserManagerIdQuery(
									{
										fieldLabel : '<font color=red>*</font>业务员名字',
										labelStyle : 'text-align:left;',
										//labelWidth : 100,
										name : 'bizMemFstNm',
										id : 'BIZ_MEM_FST_NM22',
										singleSelected : false,
										// 单选复选标志
										editable : false,
										allowBlank : false,
										// 不允许为空
										blankText : "不能为空，请填写",
										anchor : '90%',
										callback : function(a, b) {
											var records = Ext.getCmp('BIZ_MEM_FST_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
											Ext.getCmp('BIZ_MEM_FST_NM22').setValue(records[0].data.USER_NAME);
											editXywzPurcOutPurcContractForm.getForm().findField('bizMemId').setValue(records[0].data.ACCOUNT_NAME);
										}
									}) ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'bizMemId',
						             fieldLabel : '<font color=red>*</font>业务员编号',
						             allowBlank : false,
						             blankText : '业务员编号不能为空',
						             maxLength : 200,
						             minLength : 1,
						             readOnly : true,
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
						             anchor : '90%',
						             format:'Y-m-d'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'insnMode',
										 fieldLabel : '<font color=red>*</font>验货方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore4,
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
							             xtype : 'textarea',
							             vtype : 'trim',
							             Width : '100',
							             name : 'sgn',
							             fieldLabel : '标注',
							             maxLength : 100,
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
						             name : 'delyAddr',
						             fieldLabel : '<font color=red>*</font>送货地址',
						             allowBlank : false,
						             blankText : '送货地址不能为空',
						             maxLength : 200,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'traffMode',
										 fieldLabel : '<font color=red>*</font>运输方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore5,
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
					            	     hiddenName : 'payMd',
										 fieldLabel : '<font color=red>*</font>付款方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore6,
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
					            	     hiddenName : 'ordrCurrStat',
										 fieldLabel : '<font color=red>*</font>订单当前状态',
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
						                  xtype : 'textarea',
						                  vtype : 'trim',
						                  Width : '100',
						                  name : 'memo1',
						                  fieldLabel : '<font color=red>*</font>质量技术标准要求',
						                  allowBlank : false,
						                  blankText : '质量技术标准要求不能为空',
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
						                  name : 'memo3',
						                  fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
						                  allowBlank : false,
						                  blankText : '合理损耗和计算方法不能为空',
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
						                  fieldLabel : '<font color=red>*</font>包装标准',
						                  allowBlank : false,
						                  blankText : '包装标准不能为空',
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
						                  name : 'memo5',
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
						                  xtype : 'textarea',
						                  vtype : 'trim',
						                  Width : '100',
						                  name : 'memo6',
						                  fieldLabel : '<font color=red>*</font>违约责任',
						                  allowBlank : false,
						                  blankText : '违约责任不能为空',
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
						             anchor : '90%'
						            } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPurcOutPurcContractForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
			      			var remName='105';
		      			    var recvCstid='gxb';
		      			    var str1=editXywzPurcOutPurcContractForm.getForm().findField('puchSnglId').getValue();
		      			    var str2=editXywzPurcOutPurcContractForm.getForm().findField('provrShtNm').getValue();
		      			    var sign='105-2';
							Ext.Ajax.request({
								url : basepath + '/XywzPurcOutPurcContractAction.json',
								method : 'POST',
								form : editXywzPurcOutPurcContractForm.getForm().id,
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								success : function(response) {

									Ext.Msg.alert('提示', '操作成功!');
									store.reload();
									
					      			Ext.Ajax.request({
										url : basepath+ '/XywzSysmMsgRmndAction!insertRemindComm.json?remName='+ remName +'&recvCstid='+recvCstid+'&str1='+str1+'&str2='+str2+'&sign='+sign
									});
								},
								failure : function(response) {
									Ext.Msg.alert("sdf",response.responseText);
									Ext.Msg.alert('提示', '操作失败!' );
								}
							});
							
							editXywzPurcOutPurcContractWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcOutPurcContractWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcOutPurcContractForm = new Ext.form.FormPanel({
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
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'chkStat',
									 fieldLabel : '<font color=red>*</font>审核状态',
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
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'src',
					             fieldLabel : '<font color=red>*</font>来源',
					             allowBlank : false,
					             blankText : '来源不能为空',
					             maxLength : 100,
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
					             name : 'puchSnglId',
					             fieldLabel : '<font color=red>*</font>采购单编号',
					             allowBlank : false,
					             blankText : '采购单编号不能为空',
					             readOnly : true,
					             maxLength : 30,
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
					             name : 'puchNm',
					             fieldLabel : '<font color=red>*</font>合同名称',
					             allowBlank : false,
					             blankText : '合同名称不能为空',
					             maxLength : 30,
					             minLength : 1,
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
					             anchor : '90%',
					             format:'Y-m-d'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'cfmDvy',
									 fieldLabel : '<font color=red>*</font>确定交货',
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
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 200,
					             minLength : 1,
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
					             name : 'provrShtNm',
					             fieldLabel : '<font color=red>*</font>供应商简称',
					             allowBlank : false,
					             blankText : '供应商简称不能为空',
					             maxLength : 200,
					             minLength : 1,
					             readOnly : true,
					             anchor : '90%'
					            } ]
					           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'currStp',
										 fieldLabel : '<font color=red>*</font>当前步骤',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore2,
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
										 store : boxstore3,
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
						             name : 'merchdTotlQty',
						             fieldLabel : '<font color=red>*</font>商品总数量',
						             allowBlank : false,
						             blankText : '商品总数量不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'merchdTotlAmt',
						             fieldLabel : '<font color=red>*</font>商品总金额',
						             allowBlank : false,
						             blankText : '商品总金额不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'contrTotlAmt',
						             fieldLabel : '<font color=red>*</font>合同总金额',
						             allowBlank : false,
						             blankText : '合同总金额不能为空',
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'incTaxSum',
						             fieldLabel : '进项税总计',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'othAddMoney',
						             fieldLabel : '其他增加款',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'numberfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'othDedctMoney',
						             fieldLabel : '其他扣除款',
					                 allowBlank : false,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ {
						             xtype : 'textfield',
						             vtype : 'trim',
						             Width : '100',
						             name : 'puchDeptNm',
						             fieldLabel : '<font color=red>*</font>采购部门名称',
						             allowBlank : false,
						             blankText : '采购部门名称不能为空',
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
							             name : 'ownPersNm',
							             fieldLabel : '拥有人名称',
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
							             name : 'puchPersFstNm',
							             fieldLabel : '采购人名字',
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
						             name : 'puchPersId',
						             fieldLabel : '<font color=red>*</font>采购人编号',
						             allowBlank : false,
						             blankText : '采购人编号不能为空',
						             maxLength : 200,
						             minLength : 1,
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
							             name : 'bizMemFstNm',
							             fieldLabel : '<font color=red>*</font>业务员名字',
							             allowBlank : false,
							             blankText : '业务员名字不能为空',
							             maxLength : 200,
							             minLength : 1,
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
						             name : 'bizMemId',
						             fieldLabel : '<font color=red>*</font>业务员编号',
						             allowBlank : false,
						             blankText : '业务员编号不能为空',
						             maxLength : 200,
						             minLength : 1,
						             readOnly : true,
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
						             anchor : '90%',
						             format:'Y-m-d'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'insnMode',
										 fieldLabel : '<font color=red>*</font>验货方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore4,
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
							             xtype : 'textarea',
							             vtype : 'trim',
							             Width : '100',
							             name : 'sgn',
							             fieldLabel : '标注',
							             maxLength : 100,
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
						             name : 'delyAddr',
						             fieldLabel : '<font color=red>*</font>送货地址',
						             allowBlank : false,
						             blankText : '送货地址不能为空',
						             maxLength : 200,
						             minLength : 1,
						             anchor : '90%'
						            } ]
						           },{ 
						             columnWidth : .5,
						             layout : 'form',
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'traffMode',
										 fieldLabel : '<font color=red>*</font>运输方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore5,
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
					            	     hiddenName : 'payMd',
										 fieldLabel : '<font color=red>*</font>付款方式',
										 labelStyle: 'text-align:left;',
										 triggerAction : 'all',
										 store : boxstore6,
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
					            	     hiddenName : 'ordrCurrStat',
										 fieldLabel : '<font color=red>*</font>订单当前状态',
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
						                  xtype : 'textarea',
						                  vtype : 'trim',
						                  Width : '100',
						                  name : 'memo1',
						                  fieldLabel : '<font color=red>*</font>质量技术标准要求',
						                  allowBlank : false,
						                  blankText : '质量技术标准要求不能为空',
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
						                  name : 'memo3',
						                  fieldLabel : '<font color=red>*</font>合理损耗和计算方法',
						                  allowBlank : false,
						                  blankText : '合理损耗和计算方法不能为空',
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
						                  fieldLabel : '<font color=red>*</font>包装标准',
						                  allowBlank : false,
						                  blankText : '包装标准不能为空',
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
						                  name : 'memo5',
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
						                  xtype : 'textarea',
						                  vtype : 'trim',
						                  Width : '100',
						                  name : 'memo6',
						                  fieldLabel : '<font color=red>*</font>违约责任',
						                  allowBlank : false,
						                  blankText : '违约责任不能为空',
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
						             name : 'id',
						             maxLength : 200,
						             minLength : 1, 
						             hidden:true,
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
					    	detailXywzPurcOutPurcContractWindow.hide();
						}
					} ]
				}
				]
			});



			// 定义新增窗口
			var addXywzPurcOutPurcContractWindow = new Ext.Window({
				title : '外部采购合同信息新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :500,
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
				items : [ addXywzPurcOutPurcContractForm ]
			});

			// 定义修改窗口
			var editXywzPurcOutPurcContractWindow = new Ext.Window({
				title : '外部采购合同信息修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 500,
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
				items : [ editXywzPurcOutPurcContractForm ]
			});		
			
			// 定义详情窗口
			var detailXywzPurcOutPurcContractWindow = new Ext.Window({
				title : '外部采购合同信息预览',
				plain : true,
				layout : 'fit',
				width : 800,
				height :500,
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
				items : [ detailXywzPurcOutPurcContractForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外部采购合同信息列表',
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