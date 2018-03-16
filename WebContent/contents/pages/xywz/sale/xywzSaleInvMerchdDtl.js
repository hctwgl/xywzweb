/*外贸商品明细Action*/
Ext.onReady(function() {
	Ext.QuickTips.init();
	var boxstore2 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_CUR'   //币种
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});

	var qForm = new Ext.form.FormPanel( {
		title : "外贸订单商品明细",
		id : "searchCondition",
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
				items : [ {
					xtype : 'textfield',
					Width : '100',
					name : 'contrNum',
					fieldLabel : '合同号',
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
	
			   name : 'merchdId',
			   mapping : 'MERCHD_ID'
			  }, { 
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, { 
			   name : 'invNum',
			   mapping : 'INV_NUM'
			  }, { 
			   name : 'hsCode',
			   mapping : 'HS_CODE'
			  }, { 
			   name : 'model',
			   mapping : 'MODEL'
			  }, { 
			   name : 'uprc',
			   mapping : 'UPRC'
			  }, { 
				 name : 'inlandUprc',
				 mapping : 'INLAND_UPRC'
			  },{
			   name : 'materials',
			   mapping : 'MATERIALS'
			  }, { 
			   name : 'qty',
			   mapping : 'QTY'
			  }, { 
				   name : 'branchNumber',
				   mapping : 'BRANCH_NUMBER'
			  },{
				   name : 'weightTolerance',
				   mapping : 'WEIGHT_TOLERANCE'
			  },{
				  name : 'lengthTolerance',
				   mapping : 'LENGTH_TOLERANCE'
			  },{
				  name : 'depthTolerance',
				   mapping : 'DEPTH_TOLERANCE'
			  }, { 
			   name : 'cur',
			   mapping : 'CUR'
			  }, { 
			   name : 'curOra',
			   mapping : 'CUR_ORA'
			  }, { 
			   name : 'amt',
			   mapping : 'AMT'
			  }, { 
				   name : 'usdRat',
				   mapping : 'USD_RAT'
				          },{
				  name : 'usdAmt',
				   mapping : 'USD_AMT'
				          },{
			   name : 'pkg',
			   mapping : 'PKG'
			  }, { 
			   name : 'memo',
			   mapping : 'MEMO'
			  }, { 
			   name : 'len',
			   mapping : 'LEN'
			  },{    
			   name : 'chkStat',
			   mapping : 'CHK_STAT'
			  },{    
				   name : 'chkStatOra',
				   mapping : 'CHK_STAT_ORA'
		} ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, 

			  { 
			   header : '合同号',
			   width : 100,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '发票号',
			   width : 100,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
			   header : '品名',
			   width : 100,
			   dataIndex : 'hsCode',
			   sortable : true
			  }, { 
			   header : '型号',
			   width : 100,
			   dataIndex : 'model',
			   sortable : true
			  }, { 
			   header : '单价',
			   width : 100,
			   dataIndex : 'uprc',
			   sortable : true
			  }, { 
				   header : '内贸价格',
				   width : 100,
				   dataIndex : 'inlandUprc',
				   sortable : true
			  },{
			   header : '材质',
			   width : 100,
			   dataIndex : 'materials',
			   sortable : true
			  }, { 
			   header : '吨数',
			   width : 100,
			   dataIndex : 'qty',
			   sortable : true
			  }, {
			   header : '支数',
			   width : 100,
				   dataIndex : 'branchNumber',
				   sortable : true
				},{
					 header : '重量公差描述',
					 width : 100,
					   dataIndex : 'weightTolerance',
					   sortable : true
					          },{
					 header : '长度公差描述',
					 width : 100,
					   dataIndex : 'lengthTolerance',
					   sortable : true
					          },{
					 header : '厚度公差描述',
					 width : 100,
					   dataIndex : 'depthTolerance',
					   sortable : true
			  }, { 
			   header : '币种',
			   width : 100,
			   dataIndex : 'curOra',
			   sortable : true
			  }, { 
			   header : '金额',
			   width : 100,
			   dataIndex : 'amt',
			   sortable : true
			  },{ 
				  header : '折美元汇率',
				   width : 100,
				   dataIndex : 'usdRat',
				   sortable : true
				          },{
				 header : '折美元金额',
				   width : 100,
				   dataIndex : 'usdAmt',
				   sortable : true
				          },{
			   header : '包装描述',
			   width : 100,
			   dataIndex : 'pkg',
			   sortable : true
			  }, { 
			   header : '备注',
			   width : 100,
			   dataIndex : 'memo',
			   sortable : true
			  }, { 
			   header : '长度（M）',
			   width : 100,
			   dataIndex : 'len',
			   sortable : true
		}, { 
			   header : '下达状态',
			   width : 100,
			   dataIndex : 'chkStatOra',
			   sortable : true
		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInvMerchdDtlQueryAction.json'
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
								text : '新增',
								iconCls : 'addIconCss',
								handler : function() {
//form修改

									addXywzSaleInvMerchdDtlForm.getForm().reset();
									addXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').setValue(1);
									addXywzSaleInvMerchdDtlForm.getForm().findField('weightTolerance').setValue('THEORETICAL WEIGHT BASIS,WEIGHT TOLERANCE -8% TO -10%');
									addXywzSaleInvMerchdDtlWindow.show();
								}
							},
							'-',
							{
								text : '修改',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;
       
									var selectRe = grid.getSelectionModel().getSelections()[0];
									var idStr='';
									
									idStr = selectRe.data.chkStat;
									//Ext.Msg.alert(idStr);
									if (idStr == '1'){
										Ext.Msg.alert('提示','此商品对应的订单已下达，不能修改');
										return;
									}
									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
////编辑修改
//										if(selectRe.data.chkStat!='0'){
//											
//											Ext.Msg.alert('提示','不能修改已经下达的单据!');
//												return;
//											}
										editXywzSaleInvMerchdDtlForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInvMerchdDtlWindow.show();

									}
								}

							},
							'-',
							{
								text : '复制此商品并新增',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;
       
									var selectRe = grid.getSelectionModel().getSelections()[0];
									var idStr='';
									
									idStr = selectRe.data.chkStat;
									//Ext.Msg.alert(idStr);
									if (idStr == '1'){
										Ext.Msg.alert('提示','此商品对应的订单已下达，不能新增');
										return;
									}
									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {

										editXywzSaleInvMerchdDtlForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInvMerchdDtlForm.getForm().findField('merchdId').setValue(null);
										editXywzSaleInvMerchdDtlWindow.show();

									}
								}

							},'-',new Com.yucheng.bob.ExpButton({
					            formPanel : 'searchCondition',
					            iconCls:'exportIconCss',
					            url : basepath+'/XywzSaleInvMerchdDtlQueryAction.json'
					        }),
							'-',
							{
								text : '删除',
								iconCls : 'deleteIconCss',
								handler : function() {
								
								var idStr='';
								selectRe = grid.getSelectionModel().getSelections()[0];
								idStr = selectRe.data.chkStat;
								
								if (idStr == '1'){
									Ext.Msg.alert('提示','此商品对应的订单已下达，不能删除！');
									return;
								}
									var selectLength = grid.getSelectionModel()
											.getSelections().length;
									var selectRe = grid.getSelectionModel()
											.getSelections()[0];
									if (selectLength < 1) {
										Ext.Msg.alert('提示', '请选择需要删除的记录!');
									}

									else {
//										if(selectRe.data.chkStat!='0'){
//											
//											Ext.Msg.alert('提示','不能删除已经下达的明细!');
//												return;
//											}
										Ext.MessageBox
												.confirm(
														'提示',
														'确定删除吗?',
														function(buttonId) {
															if (buttonId
																	.toLowerCase() == "no") {
																return;
															}
															var selectRe;
															var tempId;
															var tempCount;
															var idStr = '';
															for ( var i = 0; i < selectLength; i++) {
																selectRe = grid
																		.getSelectionModel()
																		.getSelections()[i];
//删除的ID需要修改
																tempId = selectRe.data.merchdId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInvMerchdDtlAction!batchDestroy.json?idStr='
																				+ idStr,
																		waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
																		success : function() {
																			Ext.Msg
																					.alert(
																							'提示',
																							'操作成功!');
																			store
																					.reload();
																		},
																		failure : function() {

																			Ext.Msg
																					.alert(
																							'提示',
																							'操作失败!');
																		}
																	});

														});
									}
								}
							},'-',{
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
										detailXywzSaleInvMerchdDtlForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInvMerchdDtlWindow.show();
									}
								}
							},'-',{
								text : '添加发票',
								iconCls : 'editIconCss',
								handler : function() {
									var selectLength = grid
									.getSelectionModel()
									.getSelections().length;

									var selectRe = grid.getSelectionModel()
									.getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示','请选择一条记录!');
									} else {
										invoicesXywzSaleInvMerchdDtlForm
												.getForm().loadRecord(
														selectRe);
										invoicesXywzSaleInvMerchdDtlWindow.show();
									}
								}
							}
							]
				});

		// 新增窗口展示的from
		var addXywzSaleInvMerchdDtlForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 150,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								        { 
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [new Com.xywz.common.ContractFrgnQuery(
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

								   							if (records[0].data.CHK_STAT==1){
																Ext.Msg.alert('提示','此合同已经下达，不能新增商品!');
																addXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(null);
																addXywzSaleInvMerchdDtlForm.getForm().findField('cur').setValue(null);
														        return false;
															}
								   							addXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
								   							addXywzSaleInvMerchdDtlForm.getForm().findField('cur').setValue(records[0].data.CUR);
								   						}
								   					}) ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
														{
															fieldLabel : '发票号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'invNum',
															id : 'INV_NUM111',
															singleSelected : false,
															// 单选复选标志
															editable : false,
//															allowBlank : false,
															// 不允许为空
//															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('INV_NUM111').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('INV_NUM111').setValue(records[0].data.INV_NUM);
//																addXywzSaleInvMerchdDtlForm.getForm().findField('size').setValue(records[0].data.MODEL);
																
															}
														}) ]
									           },{ 
									           columnWidth : .5,
									            layout : 'form',
									            items : [ new Com.xywz.common.SysmProductDetailQuery(
														{
															fieldLabel : '<font color=red>*</font>规格型号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'model',
															id : 'SIZE32',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('SIZE32').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
																//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																addXywzSaleInvMerchdDtlForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
																addXywzSaleInvMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																addXywzSaleInvMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
									          
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ {
									             xtype : 'textfield',
									             vtype : 'trim',
									             Width : '100',
									             name : 'hsCode',
									             fieldLabel : '品名',
//									             allowBlank : false,
									             readOnly : true,
//									             hidden : true,
									             blankText : '品名不能为空',
									             maxLength : 200,
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
								             name : 'uprc',
								             fieldLabel : '<font color=red>*</font>单价',
								             allowBlank : false,
								             blankText : '单价不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!='')
								               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	    } 
								                  } 
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'inlandUprc',
								               fieldLabel : '内贸价格',
//								               allowBlank : false,
//								               blankText : '内贸价格不能为空',
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
								               name : 'branchNumber',
								               fieldLabel : '支数',
//								               allowBlank : false,
//								               blankText : '支数不能为空',
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
								             name : 'materials',
								             fieldLabel : '<font color=red>*</font>材质',
								             allowBlank : false,
//								             hidden : true,
								             blankText : '材质不能为空',
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
								             name : 'qty',
								             fieldLabel : '<font color=red>*</font>吨数',
								             allowBlank : false,
								             blankText : '吨数不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								          	   listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!=''){
								               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	      }
								               	    } 
								                  } 
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'weightTolerance',
								               fieldLabel : '重量公差描述',
//								               allowBlank : false,
								               blankText : '重量公差描述不能为空',
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
								               name : 'lengthTolerance',
								               fieldLabel : '长度公差描述',
//								               allowBlank : false,
								               blankText : '长度公差描述不能为空',
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
								               name : 'depthTolerance',
								               fieldLabel : '厚度公差描述',
//								               allowBlank : false,
								               blankText : '厚度公差描述不能为空',
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								           },{ 
								        		  columnWidth : .5,
								        	      layout : 'form',
								        	      items : [ new Ext.form.ComboBox({
								        	            hiddenName : 'cur',
								        				 fieldLabel : '<font color=red>*</font>币种',
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
								        				 anchor : '90%',
								        				 listeners:{ 
											               	   blur:function(){ 
											               	      var uprc=addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
											               	      var qty = addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
											               	      if(uprc!=null && uprc!=''){
											               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
											               	      }
											               	      var amt=addXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
											               	      var usdRat = addXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
											               	      if(amt!=null && amt!=''){
											               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
											               	      }
											               	    } 
											                  }
								        	              }) ]
								        	  },{ 
								                  columnWidth : .5,
								                  layout : 'form',
								                  items : [ {
								                  xtype : 'numberfield',
								                  vtype : 'trim',
								                  Width : '100',
								                  name : 'amt',
								                  fieldLabel : '<font color=red>*</font>金额',
								                  allowBlank : false,
								                  readOnly:true,
								                  blankText : '金额不能为空',
								                  anchor : '90%',
								               	   listeners:{ 
								               	   blur:function(){ 
								                	  
								               	      var uprc=addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!=''){
								               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	      }
								               	      var amt=addXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
								               	      var usdRat = addXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
								               	      if(usdRat!=null && usdRat!='')
								               	       addXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
								               	    } 
								                  }
								                 } ]
								                },{ 
								                  columnWidth : .5,
								                  layout : 'form',
								                  items : [ {
								                  xtype : 'numberfield',
								                  vtype : 'trim',
								                  Width : '100',
								                  name : 'usdRat',
								                  fieldLabel : '折美元汇率',
//								                  allowBlank : false,
//								                  blankText : '折美元汇率不能为空',
								                  maxLength : 200,
								                  minLength : 1,
								                  anchor : '90%',
								           	   listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!=''){
								               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	      }
								               	      var amt=addXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
								               	      var usdRat = addXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
								               	      if(amt!=null && amt!=''){
								               	    	addXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
								               	      }
								               	    } 
								                  }
								                 } ]
								             },{
								              columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'usdAmt',
								               fieldLabel : '折美元金额',
//								               allowBlank : false,
								               readOnly:true,
//								               blankText : '折美元金额不能为空',
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
								             name : 'pkg',
								             fieldLabel : '包装描述',
								             //   allowBlank : false,
								             blankText : '包装不能为空',
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
								             name : 'memo',
								             fieldLabel : '备注',
								             //   allowBlank : false,
								             blankText : '备注不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度(M)',
								             //   allowBlank : false,
								             blankText : '长度不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%'
								            } ] 
                                           }, {
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
											           } 
													]},

							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											
											handler : function() {
//ADDform
												if (!addXywzSaleInvMerchdDtlForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												//计算价格
												addXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(addXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue()*addXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue());
												addXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(addXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue()*addXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue());
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInvMerchdDtlAction.json',
															method : 'POST',
															form : addXywzSaleInvMerchdDtlForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												addXywzSaleInvMerchdDtlWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInvMerchdDtlWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleInvMerchdDtlForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 300,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         { 
								        	   
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [new Com.xywz.common.ContractFrgnQuery(
								   					{
								   						fieldLabel : '<font color=red>*</font>合同号',
								   						labelStyle : 'text-align:left;',
								   						//labelWidth : 100,
								   						name : 'contrNum',
								   						id : 'CONTR_NUM2',
								   						singleSelected : false,
								   						// 单选复选标志
								   						editable : false,
								   						allowBlank : false,
								   						// 不允许为空
								   						blankText : "不能为空，请填写",
								   						anchor : '90%',
								   						callback : function(a, b) {
								   							var records = Ext.getCmp('CONTR_NUM2').oContractFrgnQueryGrid.getSelectionModel().selections.items;
								   														   							
									   							if (records[0].data.CHK_STAT==1){
																	Ext.Msg.alert('提示','您选择的合同已下达，不能再添加商品了!');
//																	editXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(null);
															        return false;
																	
																}
									   			
									   							Ext.getCmp('CONTR_NUM2').setValue(records[0].data.CONTR_NUM);
									   							editXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
									   							editXywzSaleInvMerchdDtlForm.getForm().findField('cur').setValue(records[0].data.CUR);
								   							
								   							
								   						}
								   					}) ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
														{
															fieldLabel : '发票号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'invNum',
															id : 'INV_NUM222',
															singleSelected : true,
															// 单选复选标志
															editable : false,
//															allowBlank : false,
															// 不允许为空
//															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('INV_NUM222').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('INV_NUM222').setValue(records[0].data.INV_NUM);
////																addXywzSaleInvMerchdDtlForm.getForm().findField('size').setValue(records[0].data.MODEL);
															
															}
														}) ]
									           },{ 
									           columnWidth : .5,
									            layout : 'form',
									            items : [ new Com.xywz.common.SysmProductDetailQuery(
														{
															fieldLabel : '<font color=red>*</font>规格型号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'model',
															id : 'SIZE22',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('SIZE22').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
																//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																editXywzSaleInvMerchdDtlForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
																editXywzSaleInvMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																editXywzSaleInvMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
									          
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
								             name : 'uprc',
								             fieldLabel : '<font color=red>*</font>单价',
								             allowBlank : false,
								             blankText : '单价不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=editXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = editXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!=''){
								               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	      }
								               	    } 
								                  } 
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'inlandUprc',
								               fieldLabel : '内贸价格',
//								               allowBlank : false,
//								               blankText : '内贸价格不能为空',
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
								               name : 'branchNumber',
								               fieldLabel : '支数',
//								               allowBlank : false,
//								               blankText : '支数不能为空',
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
								             name : 'materials',
								             fieldLabel : '<font color=red>*</font>材质',
								             allowBlank : false,
								             blankText : '材质不能为空',
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
								             name : 'qty',
								             fieldLabel : '<font color=red>*</font>吨数',
								             allowBlank : false,
								             blankText : '吨数不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=editXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = editXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!='')
								               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	    } 
								                  } 
								            } ]
								           },{ 
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'weightTolerance',
								               fieldLabel : '重量公差描述',
//								               allowBlank : false,
								               blankText : '重量公差描述不能为空',
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
								               name : 'lengthTolerance',
								               fieldLabel : '长度公差描述',
//								               allowBlank : false,
								               blankText : '长度公差描述不能为空',
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
								               name : 'depthTolerance',
								               fieldLabel : '厚度公差描述',
//								               allowBlank : false,
								               blankText : '厚度公差描述不能为空',
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								           },{ 
								        		  columnWidth : .5,
								        	      layout : 'form',
								        	      items : [ new Ext.form.ComboBox({
								        	            hiddenName : 'cur',
								        				 fieldLabel : '币种',
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
									                  items : [ {
									                  xtype : 'numberfield',
									                  vtype : 'trim',
									                  Width : '100',
									                  name : 'amt',
									                  fieldLabel : '<font color=red>*</font>金额',
									                  allowBlank : false,
									                  readOnly:true,
									                  blankText : '金额不能为空',
									                  anchor : '90%',
									               	   listeners:{ 
									               	   blur:function(){ 
									                	  var uprc=editXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
									               	      var qty = editXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
									               	      if(uprc!=null && uprc!=''){
									               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty);
									               	    	}
									               	      var amt=editXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
									               	      var usdRat = editXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
									               	      if(usdRat!=null && usdRat!='')
									               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
									               	    } 
									                  }
									                 } ]
									                },{ 
									                  columnWidth : .5,
									                  layout : 'form',
									                  items : [ {
									                  xtype : 'numberfield',
									                  vtype : 'trim',
									                  Width : '100',
									                  name : 'usdRat',
									                  fieldLabel : '<font color=red>*</font>折美元汇率',
									                  allowBlank : false,
									                  blankText : '折美元汇率不能为空',
									                  maxLength : 200,
									                  minLength : 1,
									                  anchor : '90%',
									           	   listeners:{ 
									               	   blur:function(){ 
									                	  var uprc=editXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
									               	      var qty = editXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
									               	      if(uprc!=null && uprc!=''){
									               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty);
									               	    	}
									               	      var amt=editXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
									               	      var usdRat = editXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
									               	      if(amt!=null && amt!='')
									               	    	editXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
									               	    } 
									                  }
									                 } ]
								           },{ 
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'usdAmt',
								               fieldLabel : '<font color=red>*</font>折美元金额',
								               allowBlank : false,
								               readOnly:true,
								               blankText : '折美元金额不能为空',
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
								             name : 'pkg',
								             fieldLabel : '包装描述',
								             //   allowBlank : false,
								             blankText : '包装不能为空',
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
								             name : 'memo',
								             fieldLabel : '备注',
								             //   allowBlank : false,
								             blankText : '备注不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度(M)',
								             //   allowBlank : false,
								             blankText : '长度不能为空',
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
									             name : 'merchdId',
									             maxLength : 200,
									             minLength : 1, 
									             hidden:true,
									             anchor : '90%'
									            } ]
									           }
								            ]},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
												if (!editXywzSaleInvMerchdDtlForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
											//计算价格
											    editXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(editXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue()*editXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue());
											    editXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(editXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue()*editXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue());
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInvMerchdDtlAction.json',
															method : 'POST',
															form : editXywzSaleInvMerchdDtlForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												editXywzSaleInvMerchdDtlWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInvMerchdDtlWindow
														.hide();
											}
										} ]
							} ]
				});
		
// 发票商品展示的from
		var invoicesXywzSaleInvMerchdDtlForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 300,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         { 
								        	   
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [new Com.xywz.common.ContractFrgnQuery(
								   					{
								   						fieldLabel : '<font color=red>*</font>合同号',
								   						labelStyle : 'text-align:left;',
								   						//labelWidth : 100,
								   						name : 'contrNum',
								   						id : 'CONTR_NUM55',
								   						singleSelected : false,
								   						// 单选复选标志
								   						editable : false,
								   						readOnly:true,
								   						allowBlank : false,
								   						// 不允许为空
								   						blankText : "不能为空，请填写",
								   						anchor : '90%',
								   						callback : function(a, b) {
								   							var records = Ext.getCmp('CONTR_NUM55').oContractFrgnQueryGrid.getSelectionModel().selections.items;
								   														   							
									   							if (records[0].data.CHK_STAT==1){
																	Ext.Msg.alert('提示','您选择的合同已下达，不能再添加商品了!');
//																	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(null);
															        return false;
																	
																}
									   			
									   							Ext.getCmp('CONTR_NUM55').setValue(records[0].data.CONTR_NUM);
									   							invoicesXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
									   							invoicesXywzSaleInvMerchdDtlForm.getForm().findField('cur').setValue(records[0].data.CUR);
								   							
								   							
								   						}
								   					}) ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ 									                       
									                       new Com.xywz.common.XywzSaleInvInfoQuery(
														{
															fieldLabel : '<font color=red>*</font>发票号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'invNum',
															id : 'INV_NUM55',
															singleSelected : true,
															// 单选复选标志
															editable : false,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('INV_NUM55').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																
																
																if(invoicesXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').getValue()!=records[0].data.CONTR_NUM){
																	Ext.Msg.alert('提示','您只能选择本合同对应的发票!');
//																	
															        return false;
																	
																}else{
																	
																	Ext.getCmp('INV_NUM55').setValue(records[0].data.INV_NUM);
																}
																
															
															}
														}) 
]
									           },{ 
									           columnWidth : .5,
									            layout : 'form',
									            items : [ new Com.xywz.common.SysmProductDetailQuery(
														{
															fieldLabel : '<font color=red>*</font>规格型号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'model',
															id : 'SIZE55',
															singleSelected : false,
															// 单选复选标志
															editable : false,
															readOnly:true,
															allowBlank : false,
															// 不允许为空
															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('SIZE55').oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
																//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																invoicesXywzSaleInvMerchdDtlForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
																invoicesXywzSaleInvMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																invoicesXywzSaleInvMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
									          
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
									             readOnly:true,
									             blankText : '品名不能为空',
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
								             name : 'uprc',
								             fieldLabel : '<font color=red>*</font>单价',
								             allowBlank : false,
								             readOnly:true,
								             blankText : '单价不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!=''){
								               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	      }
								               	    } 
								                  } 
								            } ]
								           },{ 
								               columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'inlandUprc',
								               fieldLabel : '内贸价格',
								               hidden:true,
								               readOnly:true,
//								               allowBlank : false,
//								               blankText : '内贸价格不能为空',
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
								               name : 'branchNumber',
								               fieldLabel : '支数',
								               readOnly:true,
//								               allowBlank : false,
//								               blankText : '支数不能为空',
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
								             name : 'materials',
								             fieldLabel : '<font color=red>*</font>材质',
								             allowBlank : false,
								             readOnly:true,
								             blankText : '材质不能为空',
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
								             name : 'qty',
								             fieldLabel : '<font color=red>*</font>吨数',
								             allowBlank : false,
								             readOnly:true,
								             blankText : '吨数不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             listeners:{ 
								               	   blur:function(){ 
								               	      var uprc=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
								               	      var qty = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
								               	      if(uprc!=null && uprc!='')
								               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty); 
								               	    } 
								                  } 
								            } ]
								           },{ 
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'weightTolerance',
								               fieldLabel : '重量公差描述',
//								               allowBlank : false,
								               readOnly:true,
								               hidden:true,
								               blankText : '重量公差描述不能为空',
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
								               name : 'lengthTolerance',
								               fieldLabel : '长度公差描述',
//								               allowBlank : false,
								               readOnly:true,
								               hidden:true,
								               blankText : '长度公差描述不能为空',
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
								               name : 'depthTolerance',
								               fieldLabel : '厚度公差描述',
//								               allowBlank : false,
								               hidden:true,
								               readOnly:true,
								               blankText : '厚度公差描述不能为空',
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								           },{ 
								        		  columnWidth : .5,
								        	      layout : 'form',
								        	      items : [ new Ext.form.ComboBox({
								        	            hiddenName : 'cur',
								        				 fieldLabel : '币种',
								        				 labelStyle: 'text-align:left;',
								        				 triggerAction : 'all',
								        				 store : boxstore2,
								        				 allowBlank : false,
								        				 displayField : 'value',
								        				 valueField : 'key',
								        				 mode : 'local',
								        				 forceSelection : true,
								        				 typeAhead : true,
								        				 readOnly:true,
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
									                  name : 'amt',
									                  fieldLabel : '<font color=red>*</font>金额',
									                  allowBlank : false,
									                  readOnly:true,
									                  blankText : '金额不能为空',
									                  anchor : '90%',
									               	   listeners:{ 
									               	   blur:function(){ 
									                	  var uprc=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
									               	      var qty = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
									               	      if(uprc!=null && uprc!=''){
									               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty);
									               	    	}
									               	      var amt=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
									               	      var usdRat = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
									               	      if(usdRat!=null && usdRat!='')
									               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
									               	    } 
									                  }
									                 } ]
									                },{ 
									                  columnWidth : .5,
									                  layout : 'form',
									                  items : [ {
									                  xtype : 'numberfield',
									                  vtype : 'trim',
									                  Width : '100',
									                  name : 'usdRat',
									                  fieldLabel : '<font color=red>*</font>折美元汇率',
									                  allowBlank : false,
									                  readOnly:true,
									                  blankText : '折美元汇率不能为空',
									                  maxLength : 200,
									                  minLength : 1,
									                  anchor : '90%',
									           	   listeners:{ 
									               	   blur:function(){ 
									                	  var uprc=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue();
									               	      var qty = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue(); 
									               	      if(uprc!=null && uprc!=''){
									               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(uprc*qty);
									               	    	}
									               	      var amt=invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue();
									               	      var usdRat = invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue(); 
									               	      if(amt!=null && amt!='')
									               	    	invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
									               	    } 
									                  }
									                 } ]
								           },{ 
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [ {
								               xtype : 'textfield',
								               vtype : 'trim',
								               Width : '100',
								               name : 'usdAmt',
								               fieldLabel : '<font color=red>*</font>折美元金额',
								               allowBlank : false,
								               readOnly:true,
								               blankText : '折美元金额不能为空',
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
								             name : 'pkg',
								             fieldLabel : '包装描述',
								             //   allowBlank : false,
								             readOnly:true,
								             hidden:true,
								             blankText : '包装不能为空',
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
								             name : 'memo',
								             fieldLabel : '备注',
								             readOnly:true,
								             //   allowBlank : false,
								             hidden:true,
								             blankText : '备注不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度(M)',
								             //   allowBlank : false,
								             readOnly:true,
								             blankText : '长度不能为空',
								             maxLength : 200,
								             hidden:true,
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
									             readOnly:true,
									             anchor : '90%'
									            } ]
									           }
								            ]},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
										//from 要一一对应
												if (!invoicesXywzSaleInvMerchdDtlForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
											//计算价格
												invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').setValue(invoicesXywzSaleInvMerchdDtlForm.getForm().findField('uprc').getValue()*invoicesXywzSaleInvMerchdDtlForm.getForm().findField('qty').getValue());
												invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdAmt').setValue(invoicesXywzSaleInvMerchdDtlForm.getForm().findField('amt').getValue()*invoicesXywzSaleInvMerchdDtlForm.getForm().findField('usdRat').getValue());
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInvMerchdDtlAction.json',
															method : 'POST',
															form : invoicesXywzSaleInvMerchdDtlForm
																	.getForm().id,
															waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
															success : function(
																	response) {

																Ext.Msg
																		.alert(
																				'提示',
																				'操作成功!');
																store.reload();
															},
															failure : function(
																	response) {
																Ext.Msg
																		.alert(
																				"sdf",
																				response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				'操作失败!');
															}
														});

												invoicesXywzSaleInvMerchdDtlWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
											invoicesXywzSaleInvMerchdDtlWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 明细窗口展示的from
		var detailXywzSaleInvMerchdDtlForm = new Ext.form.FormPanel(
				{
					labelWidth : 150,
					height : 300,
					frame : true,
					region : 'center',
					autoScroll : true,
					buttonAlign : "center",
					items : [
							{
								layout : 'column',
								items : [
								         { 
								        	   
								        	   columnWidth : .5,
								               layout : 'form',
								               items : [new Com.xywz.common.ContractFrgnQuery(
								   					{
								   						fieldLabel : '<font color=red>*</font>合同号',
								   						labelStyle : 'text-align:left;',
								   						//labelWidth : 100,
								   						name : 'contrNum',
								   						id : 'CONTR_NUM3',
								   						singleSelected : false,
								   						// 单选复选标志
								   						editable : false,
								   						allowBlank : false,
								   						// 不允许为空
								   						blankText : "不能为空，请填写",
								   						anchor : '90%',
								   						callback : function(a, b) {
								   							var records = Ext.getCmp('CONTR_NUM3').oContractFrgnQueryGrid.getSelectionModel().selections.items;
								   														   							
									   							if (records[0].data.CHK_STAT==1){
																	Ext.Msg.alert('提示','您选择的合同已下达，不能再添加商品了!');
//																	editXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(null);
															        return false;
																	
																}
									   			
									   							Ext.getCmp('CONTR_NUM3').setValue(records[0].data.CONTR_NUM);
									   							editXywzSaleInvMerchdDtlForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
								   							
								   							
								   						}
								   					}) ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.XywzSaleInvInfoQuery(
														{
															fieldLabel : '发票号',
															labelStyle : 'text-align:left;',
															//labelWidth : 100,
															name : 'invNum',
															id : 'INV_NUM333',
															singleSelected : true,
															// 单选复选标志
															editable : false,
//															allowBlank : false,
															// 不允许为空
//															blankText : "不能为空，请填写",
															anchor : '90%',
															callback : function(a, b) {
																var records = Ext.getCmp('INV_NUM333').oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
																Ext.getCmp('INV_NUM333').setValue(records[0].data.INV_NUM);
////																addXywzSaleInvMerchdDtlForm.getForm().findField('size').setValue(records[0].data.MODEL);
															
															}
														}) ]
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
																//Ext.getCmp('SIZE22').setValue(records[0].data.CORP_NM);
																editXywzSaleInvMerchdDtlForm.getForm().findField('model').setValue(records[0].data.SIZE_CONCAT);
																editXywzSaleInvMerchdDtlForm.getForm().findField('hsCode').setValue(records[0].data.HS_CODE);
																editXywzSaleInvMerchdDtlForm.getForm().findField('materials').setValue(records[0].data.MATERIALS);
															}
														}) ]
									          
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
								             name : 'uprc',
								             fieldLabel : '<font color=red>*</font>单价',
								             allowBlank : false,
								             blankText : '单价不能为空',
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
								               name : 'inlandUprc',
								               fieldLabel : '内贸价格',
//								               allowBlank : false,
//								               blankText : '内贸价格不能为空',
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
								               name : 'branchNumber',
								               fieldLabel : '支数',
//								               allowBlank : false,
//								               blankText : '支数不能为空',
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
								             name : 'materials',
								             fieldLabel : '<font color=red>*</font>材质',
								             allowBlank : false,
								             blankText : '材质不能为空',
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
								             name : 'qty',
								             fieldLabel : '<font color=red>*</font>吨数',
								             allowBlank : false,
								             blankText : '吨数不能为空',
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
								               name : 'weightTolerance',
								               fieldLabel : '重量公差描述',
//								               allowBlank : false,
								               blankText : '重量公差描述不能为空',
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
								               name : 'lengthTolerance',
								               fieldLabel : '长度公差描述',
//								               allowBlank : false,
								               blankText : '长度公差描述不能为空',
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
								               name : 'depthTolerance',
								               fieldLabel : '厚度公差描述',
//								               allowBlank : false,
								               blankText : '厚度公差描述不能为空',
								               maxLength : 200,
								               minLength : 1,
								               anchor : '90%'
								              } ]
								           },{ 
								        		  columnWidth : .5,
								        	      layout : 'form',
								        	      items : [ new Ext.form.ComboBox({
								        	            hiddenName : 'cur',
								        				 fieldLabel : '币种',
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
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'amt',
								             fieldLabel : '金额',
								             allowBlank : false,
								             readOnly:true,
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
								               name : 'usdRat',
								               fieldLabel : '<font color=red>*</font>折美元汇率',
								               allowBlank : false,
								               blankText : '折美元汇率不能为空',
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
								               name : 'usdAmt',
								               fieldLabel : '<font color=red>*</font>折美元金额',
								               allowBlank : false,
								               blankText : '折美元金额不能为空',
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
								             name : 'pkg',
								             fieldLabel : '包装描述',
								             //   allowBlank : false,
								             blankText : '包装不能为空',
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
								             name : 'memo',
								             fieldLabel : '备注',
								             //   allowBlank : false,
								             blankText : '备注不能为空',
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
								             name : 'len',
								             fieldLabel : '<font color=red>*</font>长度(M)',
								             //   allowBlank : false,
								             blankText : '长度不能为空',
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
									             name : 'merchdId',
									             maxLength : 200,
									             minLength : 1, 
									             hidden:true,
									             anchor : '90%'
									            } ]
									           }
								            ]},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '取  消',
											handler : function() {
											detailXywzSaleInvMerchdDtlWindow.hide();
											}
										} ]
							} ]
				});

		// 定义新增窗口
		var addXywzSaleInvMerchdDtlWindow = new Ext.Window( {
			title : '外贸发票商品明细',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 350,
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
			items : [ addXywzSaleInvMerchdDtlForm ]
		});

		// 定义修改窗口
		var editXywzSaleInvMerchdDtlWindow = new Ext.Window( {
			title : '外贸发票商品明细修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 350,
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
			items : [ editXywzSaleInvMerchdDtlForm ]
		});
		
		
		// 定义商品发票修改窗口
		var invoicesXywzSaleInvMerchdDtlWindow = new Ext.Window( {
			title : '商品发票修改（这里您<font color=red>只能修改发票</font>属性）',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 350,
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
			items : [ invoicesXywzSaleInvMerchdDtlForm ]
		});
		// 定义详情窗口
		var detailXywzSaleInvMerchdDtlWindow = new Ext.Window( {
			title : '外贸订单商品明细修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 350,
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
			items : [ detailXywzSaleInvMerchdDtlForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸订单商品明细',
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