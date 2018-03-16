Ext.onReady(function() {
			Ext.QuickTips.init(); 
			
			var statusStore = new Ext.data.Store({
				restful : true,
				autoLoad : true,
				sortInfo:{
					field:'key',
					direction:'ASC'
				},
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/lookup.json?name=XYWZ_WARE_STATUS'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "外采合同商品信息查询",
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
						items : [ new Com.xywz.common.PurcOutPurcContractQuery(
						{
							fieldLabel : '采购单编号',
							labelStyle : 'text-align:left;',
							//labelWidth : 100,
							name : 'puchSnglId',
							id : 'PUCH_SNGL_ID11',
							singleSelected : false,
							// 单选复选标志
	//									editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('PUCH_SNGL_ID11').oPurcOutPurcContractQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('PUCH_SNGL_ID11').setValue(records[0].data.PUCH_SNGL_ID);	
								qForm.getForm().findField('provrNum').setValue(records[0].data.PROVR_NUM);
							}
						}) ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Com.xywz.common.PurcProvrMgmtCustQuery(
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
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'merchdNum',
							fieldLabel : '商品编号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'merchdCnFstNm',
							fieldLabel : '商品中文名称',
							anchor : '90%'
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
				   name : 'merchdId',
				   mapping : 'MERCHD_ID'
			  }, {
				  name : 'purcStatus',
				   mapping : 'PURC_STATUS'
				  }, {
					  name : 'purcStatusOra',
					   mapping : 'PURC_STATUS_ORA'
				  }, { 
				   name : 'puchSnglId',
				   mapping : 'PUCH_SNGL_ID'
				  }, { 
				   name : 'provrNum',
				   mapping : 'PROVR_NUM'
				  }, { 
				   name : 'provrGdsNum',
				   mapping : 'PROVR_GDS_NUM'
				  }, { 
				   name : 'merchdNum',
				   mapping : 'MERCHD_NUM'
				  }, { 
				   name : 'merchdCnFstNm',
				   mapping : 'MERCHD_CN_FST_NM'
				  }, { 
				   name : 'merchdEnFstNm',
				   mapping : 'MERCHD_EN_FST_NM'
				  }, { 
				   name : 'merchdEnSpc',
				   mapping : 'MERCHD_EN_SPC'
				  }, { 
				   name : 'merchdCnSpc',
				   mapping : 'MERCHD_CN_SPC'
				  }, { 
				   name : 'puchMeasrCorp',
				   mapping : 'PUCH_MEASR_CORP'
				  }, { 
				   name : 'puchUprc',
				   mapping : 'PUCH_UPRC'
				  }, { 
				   name : 'color',
				   mapping : 'COLOR'
				  }, { 
				   name : 'material',
				   mapping : 'MATERIAL'
				  }, { 
				   name : 'snglNtWht',
				   mapping : 'SNGL_NT_WHT'
				  }, { 
				   name : 'snglGrWht',
				   mapping : 'SNGL_GR_WHT'
				  }, { 
				   name : 'snglItemVol',
				   mapping : 'SNGL_ITEM_VOL'
				  }, { 
				   name : 'snglQty',
				   mapping : 'SNGL_QTY'
				  }, { 
				   name : 'prdcComnt',
				   mapping : 'PRDC_COMNT'
				  }, { 
				   name : 'pkgReqst',
				   mapping : 'PKG_REQST'
				  }, { 
				   name : 'memo',
				   mapping : 'MEMO'
				  }, { 
				   name : 'hsCode',
				   mapping : 'HS_CODE'
		          },{ 
				   name : 'model',
				   mapping : 'MODEL'
		          },{ 
				   name : 'kgM',
				   mapping : 'KG_M'
		          },{ 
				   name : 'qty',
				   mapping : 'QTY'
		          },{ 
				   name : 'piecesCnt',
				   mapping : 'PIECES_CNT'
		          },{ 
				   name : 'pieces',
				   mapping : 'PIECES'
		          },{ 
				   name : 'uprc',
				   mapping : 'UPRC' 
		          },{ 
				   name : 'len',
				   mapping : 'LEN' 
				  }, {
					  name : 'memo',
					   mapping : 'MEMO'
					  }, {
					  name : 'workshop',
					   mapping : 'WORKSHOP'
					  }, {
					  name : 'intoWhsDt',
					   mapping : 'INTO_WHS_DT'
					  }, {
					  name : 'intoWhsExecPers',
					   mapping : 'INTO_WHS_EXEC_PERS'
					  }, {
					  name : 'lastOprPers',
					   mapping : 'LAST_OPR_PERS'
					  }, {
					  name : 'finalOprDt',
					   mapping : 'FINAL_OPR_DT'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : '商品ID',
				   width : 210,
				   dataIndex : 'merchdId',
				   hidden : true,
				   sortable : true
				  }, { 
					  header : '商品状态',
					   width : 120,
					   dataIndex : 'purcStatusOra',
					   sortable : true
					  }, {
				   header : '采购单编号',
				   width : 210,
				   dataIndex : 'puchSnglId',
				   sortable : true
				  }, { 
				   header : '供应商编号',
				   width : 210,
				   dataIndex : 'provrNum',
				   sortable : true
				  }, { 
				   header : '供应商货号',
				   width : 210,
				   dataIndex : 'provrGdsNum',
				   sortable : true
				  }, { 
				   header : '商品编号',
				   width : 210,
				   dataIndex : 'merchdNum',
				   sortable : true
				  }, { 
				   header : '商品中文名',
				   width : 210,
				   dataIndex : 'merchdCnFstNm',
				   sortable : true
				  }, { 
				   header : '商品英文名',
				   width : 210,
				   dataIndex : 'merchdEnFstNm',
				   sortable : true
				  }, { 
				   header : '商品英文规格',
				   width : 210,
				   dataIndex : 'merchdEnSpc',
				   sortable : true
				  }, { 
				   header : '商品中文规格',
				   width : 210,
				   dataIndex : 'merchdCnSpc',
				   sortable : true
				  }, { 
				   header : '采购计量单位',
				   width : 210,
				   dataIndex : 'puchMeasrCorp',
				   sortable : true
				  }, { 
				   header : '采购单价',
				   width : 210,
				   dataIndex : 'puchUprc',
				   sortable : true,
				   renderer: money('0,000.00' )
				  }, { 
				   header : '颜色',
				   width : 210,
				   dataIndex : 'color',
				   sortable : true
				  }, { 
				   header : '材料',
				   width : 210,
				   dataIndex : 'material',
				   sortable : true
				  }, { 
				   header : '单箱净重',
				   width : 210,
				   dataIndex : 'snglNtWht',
				   sortable : true,
				   renderer: money('0,000' )
				  }, { 
				   header : '单箱毛重',
				   width : 210,
				   dataIndex : 'snglGrWht',
				   sortable : true,
				   renderer: money('0,000' )
				  }, { 
				   header : '单项体积',
				   width : 210,
				   dataIndex : 'snglItemVol',
				   sortable : true,
				   renderer: money('0,000' )
				  }, { 
				   header : '单箱数量',
				   width : 210,
				   dataIndex : 'snglQty',
				   sortable : true,
				   renderer: money('0,000' )
				  }, { 
				   header : '生产说明',
				   width : 210,
				   dataIndex : 'prdcComnt',
				   sortable : true
				  }, { 
				   header : '包装要求',
				   width : 210,
				   dataIndex : 'pkgReqst',
				   sortable : true
				  }, { 
				   header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
				  }, { 
				   header : '品名',
				   width : 210,
				   dataIndex : 'hsCode',
				   sortable : true
				          },{ 
				   header : '型号',
				   width : 210,
				   dataIndex : 'model',
				   sortable : true
				          },{ 
							   header : '长度',
							   width : 210,
							   dataIndex : 'len',
							   sortable : true,
							   renderer: money('0,000.00' )
				          },{ 
				   header : 'KG_M',
				   width : 210,
				   dataIndex : 'kgM',
				   sortable : true
				          },{ 
				   header : '数量',
				   width : 210,
				   dataIndex : 'qty',
				   sortable : true,
				   renderer: money('0,000.00' )
				          },{ 
				   header : '每件支数',
				   width : 210,
				   dataIndex : 'piecesCnt',
				   sortable : true,
				   renderer: money('0,000.00' )
				          },{ 
				   header : '件数',
				   width : 210,
				   dataIndex : 'pieces',
				   sortable : true,
				   renderer: money('0,000.00' )
				          },{ 
				   header : '单价',
				   width : 210,
				   dataIndex : 'uprc',
				   sortable : true,
				   renderer: money('0,000.00' )
						  },{
				   header : '入库日期',
				   width : 120,
				   dataIndex : 'intoWhsDt',
				   sortable : true
				        }, {
				   header : '入库执行人',
				   width : 120,
				   dataIndex : 'intoWhsExecPers',
				   sortable : true
				        }, {
				   header : '最后一次操作人',
				   width : 120,
				   dataIndex : 'lastOprPers',
				   sortable : true
				        }, {
				   header : '最后操作日期',
				   width : 120,
				   dataIndex : 'finalOprDt',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtProductQueryAction.json'
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
											addXywzPurcProvrMgmtProductForm.getForm().reset();
											addXywzPurcProvrMgmtProductForm.getForm().findField('snglNtWht').setValue(0);
											addXywzPurcProvrMgmtProductForm.getForm().findField('snglGrWht').setValue(0);
											addXywzPurcProvrMgmtProductForm.getForm().findField('snglItemVol').setValue(0);
											addXywzPurcProvrMgmtProductForm.getForm().findField('snglQty').setValue(0);
											addXywzPurcProvrMgmtProductWindow.show();
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
												if(selectRe.data.purcStatus!='01'&&selectRe.data.purcStatus!='04'){
													Ext.Msg.alert('提示','只有待提交状态的才能修改!');
													return;
												}
												editXywzPurcProvrMgmtProductForm.getForm().loadRecord(selectRe);
												editXywzPurcProvrMgmtProductWindow.show();

											}
										}

									},
									'-',
									{
										text : '删除',
										iconCls : 'deleteIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;
											var selectRe = grid.getSelectionModel().getSelections()[0];
											if (selectLength < 1) {
												Ext.Msg.alert('提示','请选择需要删除的记录!');
											}

											else {
												if(selectRe.data.purcStatus!='01'){
													Ext.Msg.alert('提示','只有待提交状态的才能删除!');
													return;
												}
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
												tempId = selectRe.data.merchdId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPurcProvrMgmtProductAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzPurcProvrMgmtProductQueryAction.json'
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
												detailXywzPurcProvrMgmtProductForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcProvrMgmtProductWindow.show();
											}
										}
									},'-',{
										text : '提交质检',
										iconCls : 'publishIconCss',
										handler : function() {
										var selectLength = grid.getSelectionModel().getSelections().length;
										var selectRe = grid.getSelectionModel().getSelections()[0];
										if (selectLength != 1) {
											Ext.Msg.alert('提示','请选择一条记录!');
										}else {
											if(selectRe.data.purcStatus!='01'){
												Ext.Msg.alert('提示','只有待提交状态的才能提交!');
												return;
											}
											Ext.MessageBox.confirm('提示','确定提交吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
												return;
											}  
										var selectRe;
										var tempId;
										var tempCount;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel().getSelections()[i];
											tempId = selectRe.data.merchdId;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
											}
											Ext.Ajax.request({
													url : basepath+ '/XywzPurcProvrMgmtProductAction!submitCheck.json?idStr='+ idStr,
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
									}]
					});

			// 新增窗口展示的from
			var addXywzPurcProvrMgmtProductForm = new Ext.form.FormPanel({
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
					             items : [ new Com.xywz.common.PurcOutPurcContractQuery(
								{
									fieldLabel : '<font color=red>*</font>采购单编号',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'puchSnglId',
									id : 'PUCH_SNGL_ID22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('PUCH_SNGL_ID22').oPurcOutPurcContractQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('PUCH_SNGL_ID22').setValue(records[0].data.PUCH_SNGL_ID);	
										addXywzPurcProvrMgmtProductForm.getForm().findField('provrNum').setValue(records[0].data.PROVR_NUM);
									}
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
					             maxLength : 30,
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
					             name : 'provrGdsNum',
					             fieldLabel : '<font color=red>*</font>供应商货号',
					             allowBlank : false,
					             blankText : '供应商货号不能为空',
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
					             name : 'merchdNum',
					             fieldLabel : '<font color=red>*</font>商品编号',
					             allowBlank : false,
					             blankText : '商品编号不能为空',
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
					             name : 'merchdCnFstNm',
					             fieldLabel : '<font color=red>*</font>商品中文名',
					             allowBlank : false,
					             blankText : '商品中文名不能为空',
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
					             name : 'merchdEnFstNm',
					             fieldLabel : '<font color=red>*</font>商品英文名',
					             allowBlank : false,
					             blankText : '商品英文名不能为空',
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
					             name : 'merchdEnSpc',
					             fieldLabel : '<font color=red>*</font>商品英文规格',
					             allowBlank : false,
					             blankText : '商品英文规格不能为空',
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
					             name : 'merchdCnSpc',
					             fieldLabel : '<font color=red>*</font>商品中文规格',
					             allowBlank : false,
					             blankText : '商品中文规格不能为空',
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
					             name : 'puchMeasrCorp',
					             fieldLabel : '<font color=red>*</font>采购计量单位',
					             allowBlank : false,
					             blankText : '采购计量单位不能为空',
					             maxLength : 20,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'puchUprc',
					             fieldLabel : '<font color=red>*</font>采购单价',
					             allowBlank : false,
					             blankText : '采购单价不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'color',
					             fieldLabel : '颜色',
					             maxLength : 20,
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
					             name : 'material',
					             fieldLabel : '材料',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'snglNtWht',
					             fieldLabel : '单箱净重',
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
					             name : 'snglGrWht',
					             fieldLabel : '单箱毛重',
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
					             name : 'snglItemVol',
					             fieldLabel : '单项体积',
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
					             name : 'snglQty',
					             fieldLabel : '单箱数量',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'prdcComnt',
					             fieldLabel : '生产说明',
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
					             name : 'pkgReqst',
					             fieldLabel : '包装要求',
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
					            name : 'hsCode',
					            fieldLabel : '<font color=red>*</font>品名',
					            allowBlank : false,
					            blankText : '品名不能为空',
					            readOnly : true,
					            maxLength : 50,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ new Com.xywz.common.SysmProductDetailQuery(
										{
											fieldLabel : '<font color=red>*</font>规格型号',
											labelStyle : 'text-align:left;',
											//labelWidth : 100,
											name : 'model',
											id : 'SIZE33',
											singleSelected : false,
											// 单选复选标志
											editable : false,
											allowBlank : false,
											// 不允许为空
											blankText : "不能为空，请填写",
											anchor : '90%',
											callback : function(a, b) {
												var records = Ext.getCmp('SIZE33').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
												addXywzPurcProvrMgmtProductForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
												addXywzPurcProvrMgmtProductForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
											}
										}) ]
					          },{ 
						            columnWidth : .5,
						            layout : 'form',
						            items : [ {
						            xtype : 'numberfield',
						            vtype : 'trim',
						            Width : '100',
						            name : 'len',
						            fieldLabel : '<font color=red>*</font>长度',
						            allowBlank : false,
						            blankText : '长度不能为空',
						            anchor : '90%'
						           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'kgM',
					            fieldLabel : '<font color=red>*</font>KG_M',
					            allowBlank : false,
					            blankText : 'KG_M不能为空',
					            maxLength : 50,
					            minLength : 1,
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'numberfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'qty',
					            fieldLabel : '<font color=red>*</font>数量',
					            allowBlank : false,
					            blankText : '数量不能为空',
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'numberfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'piecesCnt',
					            fieldLabel : '<font color=red>*</font>每件支数',
					            allowBlank : false,
					            blankText : '每件支数不能为空',
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'numberfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'pieces',
					            fieldLabel : '<font color=red>*</font>件数',
					            allowBlank : false,
					            blankText : '件数不能为空',
					            anchor : '90%'
					           } ]
					          },{ 
					            columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'numberfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'uprc',
					            fieldLabel : '<font color=red>*</font>单价',
					            allowBlank : false,
					            blankText : '单价不能为空',
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
					             maxLength : 500,
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
					             name : 'merchdId',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
						          },{
							           columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'textfield',
							            vtype : 'trim',
							            Width : '100',
							            hidden:true,
							            name : 'purcStatus',
							            fieldLabel : '商品状态',
							            anchor : '90%'
							           } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPurcProvrMgmtProductForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtProductAction.json',
								method : 'POST',
								form : addXywzPurcProvrMgmtProductForm.getForm().id,
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
							
							addXywzPurcProvrMgmtProductWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcProvrMgmtProductWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcProvrMgmtProductForm = new Ext.form.FormPanel({
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
					             name : 'puchSnglId',
					             fieldLabel : '<font color=red>*</font>采购单编号',
					             allowBlank : false,
					             blankText : '采购单编号不能为空',
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 30,
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
					             name : 'provrGdsNum',
					             fieldLabel : '<font color=red>*</font>供应商货号',
					             allowBlank : false,
					             blankText : '供应商货号不能为空',
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
					             name : 'merchdNum',
					             fieldLabel : '<font color=red>*</font>商品编号',
					             allowBlank : false,
					             blankText : '商品编号不能为空',
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
					             name : 'merchdCnFstNm',
					             fieldLabel : '<font color=red>*</font>商品中文名',
					             allowBlank : false,
					             blankText : '商品中文名不能为空',
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
					             name : 'merchdEnFstNm',
					             fieldLabel : '<font color=red>*</font>商品英文名',
					             allowBlank : false,
					             blankText : '商品英文名不能为空',
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
					             name : 'merchdEnSpc',
					             fieldLabel : '<font color=red>*</font>商品英文规格',
					             allowBlank : false,
					             blankText : '商品英文规格不能为空',
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
					             name : 'merchdCnSpc',
					             fieldLabel : '<font color=red>*</font>商品中文规格',
					             allowBlank : false,
					             blankText : '商品中文规格不能为空',
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
					             name : 'puchMeasrCorp',
					             fieldLabel : '<font color=red>*</font>采购计量单位',
					             allowBlank : false,
					             blankText : '采购计量单位不能为空',
					             maxLength : 20,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'puchUprc',
					             fieldLabel : '<font color=red>*</font>采购单价',
					             allowBlank : false,
					             blankText : '采购单价不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'color',
					             fieldLabel : '颜色',
					             maxLength : 20,
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
					             name : 'material',
					             fieldLabel : '材料',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'snglNtWht',
					             fieldLabel : '单箱净重',
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
					             name : 'snglGrWht',
					             fieldLabel : '单箱毛重',
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
					             name : 'snglItemVol',
					             fieldLabel : '单项体积',
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
					             name : 'snglQty',
					             fieldLabel : '单箱数量',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'prdcComnt',
					             fieldLabel : '生产说明',
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
					             name : 'pkgReqst',
					             fieldLabel : '包装要求',
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
							            name : 'hsCode',
							            fieldLabel : '<font color=red>*</font>品名',
							            allowBlank : false,
							            blankText : '品名不能为空',
							            readOnly : true,
							            maxLength : 50,
							            minLength : 1,
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : 
							            	[ new Com.xywz.common.SysmProductDetailQuery(
													{
														fieldLabel : '<font color=red>*</font>规格型号',
														labelStyle : 'text-align:left;',
														//labelWidth : 100,
														name : 'model',
														id : 'SIZE44',
														singleSelected : false,
														// 单选复选标志
														editable : false,
														allowBlank : false,
														// 不允许为空
														blankText : "不能为空，请填写",
														anchor : '90%',
														callback : function(a, b) {
															var records = Ext.getCmp('SIZE44').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
															editXywzPurcProvrMgmtProductForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
															editXywzPurcProvrMgmtProductForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
														}
													}) ]
							          },{ 
								            columnWidth : .5,
								            layout : 'form',
								            items : [ {
								            xtype : 'numberfield',
								            vtype : 'trim',
								            Width : '100',
								            name : 'len',
								            fieldLabel : '<font color=red>*</font>长度',
								            allowBlank : false,
								            blankText : '长度不能为空',
								            anchor : '90%'
								           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'textfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'kgM',
							            fieldLabel : '<font color=red>*</font>KG_M',
							            allowBlank : false,
							            blankText : 'KG_M不能为空',
							            maxLength : 50,
							            minLength : 1,
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'qty',
							            fieldLabel : '<font color=red>*</font>数量',
							            allowBlank : false,
							            blankText : '数量不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'piecesCnt',
							            fieldLabel : '<font color=red>*</font>每件支数',
							            allowBlank : false,
							            blankText : '每件支数不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'pieces',
							            fieldLabel : '<font color=red>*</font>件数',
							            allowBlank : false,
							            blankText : '件数不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'uprc',
							            fieldLabel : '<font color=red>*</font>单价',
							            allowBlank : false,
							            blankText : '单价不能为空',
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
					             maxLength : 500,
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
					             name : 'merchdId',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
						          },{
							           columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'textfield',
							            vtype : 'trim',
							            Width : '100',
							            hidden:true,
							            name : 'purcStatus',
							            fieldLabel : '商品状态',
							            anchor : '90%'
							           } ]
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPurcProvrMgmtProductForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtProductAction.json',
								method : 'POST',
								form : editXywzPurcProvrMgmtProductForm.getForm().id,
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
							
							editXywzPurcProvrMgmtProductWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcProvrMgmtProductWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcProvrMgmtProductForm = new Ext.form.FormPanel({
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
					             name : 'puchSnglId',
					             fieldLabel : '<font color=red>*</font>采购单编号',
					             allowBlank : false,
					             blankText : '采购单编号不能为空',
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
					             name : 'provrNum',
					             fieldLabel : '<font color=red>*</font>供应商编号',
					             allowBlank : false,
					             blankText : '供应商编号不能为空',
					             maxLength : 30,
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
					             name : 'provrGdsNum',
					             fieldLabel : '<font color=red>*</font>供应商货号',
					             allowBlank : false,
					             blankText : '供应商货号不能为空',
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
					             name : 'merchdNum',
					             fieldLabel : '<font color=red>*</font>商品编号',
					             allowBlank : false,
					             blankText : '商品编号不能为空',
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
					             name : 'merchdCnFstNm',
					             fieldLabel : '<font color=red>*</font>商品中文名',
					             allowBlank : false,
					             blankText : '商品中文名不能为空',
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
					             name : 'merchdEnFstNm',
					             fieldLabel : '<font color=red>*</font>商品英文名',
					             allowBlank : false,
					             blankText : '商品英文名不能为空',
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
					             name : 'merchdEnSpc',
					             fieldLabel : '<font color=red>*</font>商品英文规格',
					             allowBlank : false,
					             blankText : '商品英文规格不能为空',
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
					             name : 'merchdCnSpc',
					             fieldLabel : '<font color=red>*</font>商品中文规格',
					             allowBlank : false,
					             blankText : '商品中文规格不能为空',
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
					             name : 'puchMeasrCorp',
					             fieldLabel : '<font color=red>*</font>采购计量单位',
					             allowBlank : false,
					             blankText : '采购计量单位不能为空',
					             maxLength : 20,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'puchUprc',
					             fieldLabel : '<font color=red>*</font>采购单价',
					             allowBlank : false,
					             blankText : '采购单价不能为空',
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'color',
					             fieldLabel : '颜色',
					             maxLength : 20,
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
					             name : 'material',
					             fieldLabel : '材料',
					             maxLength : 100,
					             minLength : 1,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'numberfield',
					             vtype : 'trim',
					             Width : '100',
					             name : 'snglNtWht',
					             fieldLabel : '单箱净重',
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
					             name : 'snglGrWht',
					             fieldLabel : '单箱毛重',
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
					             name : 'snglItemVol',
					             fieldLabel : '单项体积',
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
					             name : 'snglQty',
					             fieldLabel : '单箱数量',
					             allowBlank : false,
					             anchor : '90%'
					            } ]
					           },{ 
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					             xtype : 'textarea',
					             vtype : 'trim',
					             Width : '100',
					             name : 'prdcComnt',
					             fieldLabel : '生产说明',
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
					             name : 'pkgReqst',
					             fieldLabel : '包装要求',
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
							            name : 'hsCode',
							            fieldLabel : '<font color=red>*</font>品名',
							            allowBlank : false,
							            blankText : '品名不能为空',
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
								            name : 'model',
								            fieldLabel : '<font color=red>*</font>规格型号',
								            allowBlank : false,
								            blankText : '规格型号不能为空',
								            readOnly : true,
								            maxLength : 50,
								            minLength : 1,
								            anchor : '90%'
								           } ]
							          },{ 
								            columnWidth : .5,
								            layout : 'form',
								            items : [ {
								            xtype : 'numberfield',
								            vtype : 'trim',
								            Width : '100',
								            name : 'len',
								            fieldLabel : '<font color=red>*</font>长度',
								            allowBlank : false,
								            blankText : '长度不能为空',
								            anchor : '90%'
								           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'textfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'kgM',
							            fieldLabel : '<font color=red>*</font>KG_M',
							            allowBlank : false,
							            blankText : 'KG_M不能为空',
							            maxLength : 50,
							            minLength : 1,
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'qty',
							            fieldLabel : '<font color=red>*</font>数量',
							            allowBlank : false,
							            blankText : '数量不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'piecesCnt',
							            fieldLabel : '<font color=red>*</font>每件支数',
							            allowBlank : false,
							            blankText : '每件支数不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'pieces',
							            fieldLabel : '<font color=red>*</font>件数',
							            allowBlank : false,
							            blankText : '件数不能为空',
							            anchor : '90%'
							           } ]
							          },{ 
							            columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'numberfield',
							            vtype : 'trim',
							            Width : '100',
							            name : 'uprc',
							            fieldLabel : '<font color=red>*</font>单价',
							            allowBlank : false,
							            blankText : '单价不能为空',
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
					             maxLength : 500,
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
					             name : 'merchdId',
					             maxLength : 200,
					             minLength : 1, 
					             hidden:true,
					             anchor : '90%'
					            } ]
						          },{
							           columnWidth : .5,
							            layout : 'form',
							            items : [ {
							            xtype : 'textfield',
							            vtype : 'trim',
							            Width : '100',
							            hidden:true,
							            name : 'purcStatus',
							            fieldLabel : '商品状态',
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
					    	detailXywzPurcProvrMgmtProductWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzPurcProvrMgmtProductWindow = new Ext.Window({
				title : '外采合同商品信息新增',
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
				items : [ addXywzPurcProvrMgmtProductForm ]
			});

			// 定义修改窗口
			var editXywzPurcProvrMgmtProductWindow = new Ext.Window({
				title : '外采合同商品信息修改',
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
				items : [ editXywzPurcProvrMgmtProductForm ]
			});
			
			// 定义详情窗口
			var detailXywzPurcProvrMgmtProductWindow = new Ext.Window({
				title : '外采合同商品信息预览',
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
				items : [ detailXywzPurcProvrMgmtProductForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '外采合同商品信息列表',
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