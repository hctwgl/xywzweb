//签约状态
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
			url :basepath+'/lookup.json?name=XYWZ_IF_FLAG'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "内贸报价单信息",
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
				items : [ 
                        new Ext.form.ComboBox({
							hiddenName : 'chkStat',
							fieldLabel : '审核状态',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : boxstore1,
							allowBlank : false,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							editable:false,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '90%'
           					}) ]
			}, {
				columnWidth : .25,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					Width : '100',
					name : 'quotnSnglId',
					fieldLabel : '报价单编号',
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
	// 复选框 //添加一个Ora
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 定义自动当前页行号
		var rownum = new Ext.grid.RowNumberer( {
			header : 'No.',
			width : 28
		});

		var record = Ext.data.Record.create( [ {
	
			   name : 'snglId',
			   mapping : 'SNGL_ID'
			  }, { 
			   name : 'chkStat',
			   mapping : 'CHK_STAT'
			  },{ 
			   name : 'chkStatOra',
			   mapping : 'CHK_STAT_ORA'
			  },{ 
			   name : 'quotnSnglId',
			   mapping : 'QUOTN_SNGL_ID'
			  }, { 
			   name : 'quotnDt',
			   mapping : 'QUOTN_DT'
			  }, { 
			   name : 'bizContcrId',
			   mapping : 'BIZ_CONTCR_ID'
			  }, { 
			   name : 'bizContcrNm',
			   mapping : 'BIZ_CONTCR_NM'
			  }, { 
			   name : 'inputPersId',
			   mapping : 'INPUT_PERS_ID'
			  }, { 
			   name : 'inputPersNm',
			   mapping : 'INPUT_PERS_NM'
			  }, { 
			   name : 'inputDt',
			   mapping : 'INPUT_DT'
			  }, { 
			   name : 'lastMdfrId',
			   mapping : 'LAST_MDFR_ID'
			  }, { 
			   name : 'lastMdfr',
			   mapping : 'LAST_MDFR'
			  }, { 
			   name : 'lastModiDt',
			   mapping : 'LAST_MODI_DT'

		} ]);

		// 定义列模型 //修改成Ora

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, {
			   header : '报价单ID',
			   width : 100,
			   dataIndex : 'snglId',
			   sortable : true
			  }, { 
			   header : '审核状态',
			   width : 100,
			   dataIndex : 'chkStatOra',
			   sortable : true
			  }, { 
			   header : '报价单编号',
			   width : 100,
			   dataIndex : 'quotnSnglId',
			   sortable : true
			  }, { 
			   header : '报价日期',
			   width : 100,
			   dataIndex : 'quotnDt',
			   sortable : true
			  }, { 
			   header : '业务联系人编号',
			   width : 100,
			   dataIndex : 'bizContcrId',
			   sortable : true
			  }, { 
			   header : '业务联系人名称',
			   width : 100,
			   dataIndex : 'bizContcrNm',
			   sortable : true
			  }, { 
			   header : '录入人编号',
			   width : 100,
			   dataIndex : 'inputPersId',
			   sortable : true
			  }, { 
			   header : '录入人名称',
			   width : 100,
			   dataIndex : 'inputPersNm',
			   sortable : true
			  }, { 
			   header : '录入日期',
			   width : 100,
			   dataIndex : 'inputDt',
			   sortable : true
			  }, { 
			   header : '最后一次修改人编号',
			   width : 100,
			   dataIndex : 'lastMdfrId',
			   sortable : true
			  }, { 
			   header : '最后一次修改人',
			   width : 100,
			   dataIndex : 'lastMdfr',
			   sortable : true
			  }, { 
			   header : '最后一次修改日期',
			   width : 100,
			   dataIndex : 'lastModiDt',
			   sortable : true

		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInlandQuotnSnglQueryAction.json'
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
									addXywzSaleInlandQuotnSnglForm.getForm()
											.reset();
									addXywzSaleInlandQuotnSnglWindow.show();
								}
							},
							'-',
							{
								text : '修改',
								iconCls : 'editIconCss',
								handler : function() {

									var selectLength = grid.getSelectionModel()
											.getSelections().length;

									var selectRe = grid.getSelectionModel()
											.getSelections()[0];

									if (selectLength != 1) {
										Ext.Msg.alert('提示', '请选择一条记录!');
									} else {
//编辑修改
										editXywzSaleInlandQuotnSnglForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInlandQuotnSnglWindow.show();

									}
								}

							},
							'-',
							{
								text : '删除',
								iconCls : 'deleteIconCss',
								handler : function() {
									var selectLength = grid.getSelectionModel()
											.getSelections().length;
									if (selectLength < 1) {
										Ext.Msg.alert('提示', '请选择需要删除的记录!');
									}

									else {
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
																tempId = selectRe.data.snglId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInlandQuotnSnglAction!batchDestroy.json?idStr='
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
							},'-',new Com.yucheng.bob.ExpButton({
					            formPanel : 'searchCondition',
					            iconCls:'exportIconCss',
					            url : basepath+'/XywzSaleInlandQuotnSnglQueryAction.json'
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
										detailXywzSaleInlandQuotnSnglForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInlandQuotnSnglWindow.show();
									}
								}
							}  ]
				});

// 新增窗口展示的from
		var addXywzSaleInlandQuotnSnglForm = new Ext.form.FormPanel(
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
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'snglId',
            maxLength : 200,
            minLength : 1, 
            hidden:true,
            anchor : '90%'
           } ]
          },{ 
      		columnWidth : .5,
			layout : 'form',
			items : [ 
                    new Ext.form.ComboBox({
						hiddenName : 'chkStat',
						fieldLabel : '<font color=red>*</font>审核状态',
						labelStyle: 'text-align:left;',
						triggerAction : 'all',
						store : boxstore1,
						displayField : 'value',
						valueField : 'key',
						mode : 'local',
						forceSelection : true,
						editable:false,
						typeAhead : true,
						emptyText:'请选择',
						resizable : true,
						anchor : '90%'
       					}) ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'quotnSnglId',
            fieldLabel : '<font color=red>*</font>报价单编号',
            allowBlank : false,
            blankText : '报价单编号不能为空',
            maxLength : 200,
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
            name : 'quotnDt',
            fieldLabel : '<font color=red>*</font>报价日期',
            allowBlank : false,
            blankText : '报价日期不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            format:'Y-m-d'
           } ]
          },{ 
              columnWidth : .5,
              layout : 'form',
              items : [ new Com.xywz.common.UserManagerIdQuery(
  					{
  						fieldLabel : '<font color=red>*</font>业务联系人名称',
  						labelStyle : 'text-align:left;',
  						//labelWidth : 100,
  						name : 'bizContcrNm',
  						id : 'BIZ_CONTCR_NM11',
  						singleSelected : false,
  						// 单选复选标志
  						editable : false,
  						allowBlank : false,
  						// 不允许为空
  						blankText : "不能为空，请填写",
  						anchor : '90%',
  						callback : function(a, b) {
  							var records = Ext.getCmp('BIZ_CONTCR_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
  							Ext.getCmp('BIZ_CONTCR_NM11').setValue(records[0].data.USER_NAME);
  							addXywzSaleInlandQuotnSnglForm.getForm().findField('bizContcrId').setValue(records[0].data.ACCOUNT_NAME);
  						}
  					}) ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'bizContcrId',
            fieldLabel : '<font color=red>*</font>业务联系人编号',
            allowBlank : false,
            blankText : '业务联系人编号不能为空',
            readOnly : true,
            maxLength : 200,
            minLength : 1,
            anchor : '90%'
           } ]
          } ]
							},

							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
//ADDform
												if (!addXywzSaleInlandQuotnSnglForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandQuotnSnglAction.json',
															method : 'POST',
															form : addXywzSaleInlandQuotnSnglForm
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

												addXywzSaleInlandQuotnSnglWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInlandQuotnSnglWindow.hide();
											}
										} ]
							} ]
				});

// 修改窗口展示的from
		var editXywzSaleInlandQuotnSnglForm = new Ext.form.FormPanel(
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
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'snglId',
								             maxLength : 200,
								             minLength : 1, 
								             hidden:true,
								             anchor : '90%'
								            } ]
								           },{ 
								       		columnWidth : .5,
						    				layout : 'form',
						    				items : [ 
						                            new Ext.form.ComboBox({
						    							hiddenName : 'chkStat',
						    							fieldLabel : '<font color=red>*</font>审核状态',
						    							labelStyle: 'text-align:left;',
						    							triggerAction : 'all',
						    							store : boxstore1,
						    							displayField : 'value',
						    							valueField : 'key',
						    							mode : 'local',
						    							forceSelection : true,
						    							editable:false,
						    							typeAhead : true,
						    							emptyText:'请选择',
						    							resizable : true,
						    							anchor : '90%'
						               					}) ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'quotnSnglId',
								             fieldLabel : '<font color=red>*</font>报价单编号',
								             allowBlank : false,
								             blankText : '报价单编号不能为空',
								             maxLength : 200,
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
								             name : 'quotnDt',
								             fieldLabel : '<font color=red>*</font>报价日期',
								             allowBlank : false,
								             blankText : '报价日期不能为空',
								             maxLength : 200,
								             minLength : 1,
								             anchor : '90%',
								             format:'Y-m-d'
								            } ]
								           },{ 
									             columnWidth : .5,
									             layout : 'form',
									             items : [ new Com.xywz.common.UserManagerIdQuery(
									   					{
									  						fieldLabel : '<font color=red>*</font>业务联系人名称',
									  						labelStyle : 'text-align:left;',
									  						//labelWidth : 100,
									  						name : 'bizContcrNm',
									  						id : 'BIZ_CONTCR_NM22',
									  						singleSelected : false,
									  						// 单选复选标志
									  						editable : false,
									  						allowBlank : false,
									  						// 不允许为空
									  						blankText : "不能为空，请填写",
									  						anchor : '90%',
									  						callback : function(a, b) {
									  							var records = Ext.getCmp('BIZ_CONTCR_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
									  							Ext.getCmp('BIZ_CONTCR_NM22').setValue(records[0].data.USER_NAME);
									  							editXywzSaleInlandQuotnSnglForm.getForm().findField('bizContcrId').setValue(records[0].data.ACCOUNT_NAME);
									  						}
									  					}) ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'bizContcrId',
								             fieldLabel : '<font color=red>*</font>业务联系人编号',
								             allowBlank : false,
								             blankText : '业务联系人编号不能为空',
								             readOnly : true,
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
								             name : 'inputPersId',
								             fieldLabel : '<font color=red>*</font>录入人编号',
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
								             name : 'inputPersNm',
								             fieldLabel : '<font color=red>*</font>录入人名称',
								             readOnly:true,
								             maxLength : 200,
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
								             name : 'inputDt',
								             fieldLabel : '<font color=red>*</font>录入日期',
								             readOnly:true,
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
								             name : 'lastMdfrId',
								             fieldLabel : '<font color=red>*</font>最后一次修改人编号',
								             readOnly:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'textfield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'lastMdfr',
								             fieldLabel : '最后一次修改人',
								             readOnly:true,
								             anchor : '90%'
								            } ]
								           },{ 
								             columnWidth : .5,
								             layout : 'form',
								             items : [ {
								             xtype : 'datefield',
								             vtype : 'trim',
								             Width : '100',
								             name : 'lastModiDt',
								             fieldLabel : '最后一次修改日期',
								             readOnly:true,
								             anchor : '90%',
								             format:'Y-m-d'
								             } ]
										} ]
							},
							{
								layout : 'form',
								buttonAlign : 'center',

								buttons : [
										{
											text : '保  存',
											handler : function() {
												if (!editXywzSaleInlandQuotnSnglForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInlandQuotnSnglAction.json',
															method : 'POST',
															form : editXywzSaleInlandQuotnSnglForm
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

												editXywzSaleInlandQuotnSnglWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInlandQuotnSnglWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleInlandQuotnSnglForm = new Ext.form.FormPanel({
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
				             name : 'snglId',
				             maxLength : 200,
				             minLength : 1, 
				             hidden:true,
				             anchor : '90%'
				            } ]
				           },{ 
				       		columnWidth : .5,
		    				layout : 'form',
		    				items : [ 
		                            new Ext.form.ComboBox({
		    							hiddenName : 'chkStat',
		    							fieldLabel : '<font color=red>*</font>审核状态',
		    							labelStyle: 'text-align:left;',
		    							triggerAction : 'all',
		    							store : boxstore1,
		    							displayField : 'value',
		    							valueField : 'key',
		    							mode : 'local',
		    							forceSelection : true,
		    							editable:false,
		    							typeAhead : true,
		    							emptyText:'请选择',
		    							resizable : true,
		    							anchor : '90%'
		               					}) ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'textfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'quotnSnglId',
				             fieldLabel : '<font color=red>*</font>报价单编号',
				             allowBlank : false,
				             blankText : '报价单编号不能为空',
				             maxLength : 200,
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
				             name : 'quotnDt',
				             fieldLabel : '<font color=red>*</font>报价日期',
				             allowBlank : false,
				             blankText : '报价日期不能为空',
				             maxLength : 200,
				             minLength : 1,
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
					             name : 'bizContcrNm',
					             fieldLabel : '<font color=red>*</font>业务联系人名称',
					             allowBlank : false,
					             blankText : '业务联系人名称不能为空',
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
				             name : 'bizContcrId',
				             fieldLabel : '<font color=red>*</font>业务联系人编号',
				             allowBlank : false,
				             blankText : '业务联系人编号不能为空',
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
				             name : 'inputPersId',
				             fieldLabel : '<font color=red>*</font>录入人编号',
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
				             name : 'inputPersNm',
				             fieldLabel : '<font color=red>*</font>录入人名称',
				             readOnly:true,
				             maxLength : 200,
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
				             name : 'inputDt',
				             fieldLabel : '<font color=red>*</font>录入日期',
				             readOnly:true,
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
				             name : 'lastMdfrId',
				             fieldLabel : '<font color=red>*</font>最后一次修改人编号',
				             readOnly:true,
				             anchor : '90%'
				            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'textfield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'lastMdfr',
				             fieldLabel : '最后一次修改人',
				             readOnly:true,
				             anchor : '90%'
				            } ]
				           },{ 
				             columnWidth : .5,
				             layout : 'form',
				             items : [ {
				             xtype : 'datefield',
				             vtype : 'trim',
				             Width : '100',
				             name : 'lastModiDt',
				             fieldLabel : '最后一次修改日期',
				             readOnly:true,
				             anchor : '90%',
				             format:'Y-m-d'
				             } ]
					 } ]
			}, {
				layout : 'form',
				buttonAlign : 'center',

				buttons : [
				    {
					text : '返  回',
					handler : function() {
				    	detailXywzSaleInlandQuotnSnglWindow.hide();
					}
				} ]
			}
			]
		});

		// 定义新增窗口
		var addXywzSaleInlandQuotnSnglWindow = new Ext.Window( {
			title : '内贸报价单新增',
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
			items : [ addXywzSaleInlandQuotnSnglForm ]
		});

		// 定义修改窗口
		var editXywzSaleInlandQuotnSnglWindow = new Ext.Window( {
			title : '内贸报价单修改',
			plain : true,
			layout : 'fit',
			width : 880,
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
			items : [ editXywzSaleInlandQuotnSnglForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleInlandQuotnSnglWindow = new Ext.Window({
			title : '内贸报价单预览',
			plain : true,
			layout : 'fit',
			width : 880,
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
			items : [ detailXywzSaleInlandQuotnSnglForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '内贸报价单列表',
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