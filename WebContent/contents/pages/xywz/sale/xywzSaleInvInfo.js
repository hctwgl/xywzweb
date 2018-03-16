Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var boxstore = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=INV_STAT_FLAG'  //发票状态
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	//币种选择
	var boxstore1 = new Ext.data.Store({  
		sortInfo: {
	    	field: 'key',
	    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
		},
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
			url :basepath+'/lookup.json?name=XYWZ_CUR'  //发票状态
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});
	
	var qForm = new Ext.form.FormPanel( {
		id : "searchCondition",
		title : "报关发票信息",
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
				items : [ new Ext.form.ComboBox({
					hiddenName : 'invStat',
					fieldLabel : '发票状态',
					labelStyle: 'text-align:right;',
					triggerAction : 'all',
					store : boxstore,
					displayField : 'value',
					valueField : 'key',
					mode : 'local',
					forceSelection : true,
					typeAhead : true,
					emptyText:'请选择',
					resizable : true,
					anchor : '90%'
				}) ]
			}, {
				columnWidth : .25,
				layout : 'form',
				items : [ {
					xtype : 'numberfield',
					name : 'chkPers',
					hidden:true
				},new Com.xywz.common.CustomerInfoQuery(
						{
							fieldLabel : '收票人',
							labelStyle : 'text-align:right;',
							//labelWidth : 100,
							//name : 'chkPers',
							id : 'CUST_SHT_NM22',
							singleSelected : false,
							// 单选复选标志
							editable : false,
							allowBlank : false,
							// 不允许为空
							blankText : "不能为空，请填写",
							anchor : '90%',
							callback : function(a, b) {
								var records = Ext.getCmp('CUST_SHT_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
								Ext.getCmp('CUST_SHT_NM22').setValue(records[0].data.CUST_SHT_NM);
								qForm.getForm().findField('chkPers').setValue(parseInt(records[0].data.CUST_ID));
								
							}
						}) ]
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

		var record = Ext.data.Record.create( [ 
		     {
			   name : 'invId',
			   mapping : 'INV_ID'
			  }, { 
			   name : 'invStat',
			   mapping : 'INV_STAT'
			  }, { 
			   name : 'invStatOra',
			   mapping : 'INV_STAT_ORA'
			  }, { 
			   name : 'contrNum',
			   mapping : 'CONTR_NUM'
			  }, { 
			   name : 'invNum',
			   mapping : 'INV_NUM'
			  }, { 
			   name : 'chksPers',
			   mapping : 'CHKS_PERS'
			  }, { 
			   name : 'invDt',
			   mapping : 'INV_DT'
			  }, { 
			   name : 'sCno',
			   mapping : 'S_CNO'
			  }, { 
			   name : 'payments',
			   mapping : 'PAYMENTS'
			  }, { 
			   name : 'portofloading',
			   mapping : 'PORTOFLOADING'
			  }, { 
			   name : 'portofdestination',
			   mapping : 'PORTOFDESTINATION'
			  }, { 
			   name : 'incoterms',
			   mapping : 'INCOTERMS'
			  }, { 
			   name : 'shippingmarks',
			   mapping : 'SHIPPINGMARKS'
		      }, { 
			   name : 'custNm',
			   mapping : 'CUST_NM'
			  }, { 
			   name : 'loadPortNm',
			   mapping : 'LOAD_PORT_NM'
			  }, { 
			   name : 'desPortNm',
			   mapping : 'DES_PORT_NM'
			  }, { 
			   name : 'cur',
			   mapping : 'CUR'
			  }, { 
				   name : 'curOra',
				   mapping : 'CUR_ORA'
			          },{ 
			   name : 'amt',
			   mapping : 'AMT'
			          },{ 
			   name : 'usdRat',
			   mapping : 'USD_RAT'
			          },{ 
			   name : 'usdAmt',
			   mapping : 'USD_AMT' 
			          },{ 
				   name : 'qty',
				   mapping : 'QTY' 
			  }  ]);

		// 定义列模型

		var cm = new Ext.grid.ColumnModel( [ rownum, sm, 
		      {
			   header : '发票ID',
			   width : 210,
			   dataIndex : 'invId',
			   sortable : true,
			   hidden : true
			  }, { 
			   header : '发票号',
			   width : 210,
			   dataIndex : 'invNum',
			   sortable : true
			  }, { 
			   header : '发票状态',
			   width : 210,
			   dataIndex : 'invStatOra',
			   sortable : true
			  }, { 
			   header : '合同号',
			   width : 210,
			   dataIndex : 'contrNum',
			   sortable : true
			  }, { 
			   header : '收票人',
			   width : 210,
			   dataIndex : 'chksPers',
			   sortable : true,
			   hidden:true
			  }, { 
			   header : '收票人名称',
			   width : 210,
			   dataIndex : 'custNm',
			   sortable : true
			  }, { 
			   header : '发票日期',
			   width : 210,
			   dataIndex : 'invDt',
			   sortable : true
			  }, { 
			   header : 'S_CNO',
			   width : 210,
			   dataIndex : 'sCno',
			   sortable : true
			  }, { 
			   header : '付款方式',
			   width : 210,
			   dataIndex : 'payments',
			   sortable : true
			  }, { 
			   header : 'PORTOFLOADING',
			   width : 210,
			   dataIndex : 'portofloading',
			   sortable : true,
			   hidden:true
			  }, { 
			   header : '起运港',
			   width : 210,
			   dataIndex : 'loadPortNm',
			   sortable : true
			  }, { 
			   header : 'PORTOFDESTINATION',
			   width : 210,
			   dataIndex : 'portofdestination',
			   sortable : true,
			   hidden:true
			  }, { 
			   header : '目的港',
			   width : 210,
			   dataIndex : 'desPortNm',
			   sortable : true
			  }, { 
			   header : 'TRADE TERMS',
			   width : 210,
			   dataIndex : 'incoterms',
			   sortable : true
			  }, { 
			   header : '唛头',
			   width : 210,
			   dataIndex : 'shippingmarks',
			   sortable : true
			  }, { 
			   header : '币种',
			   width : 210,
			   dataIndex : 'curOra',
			   sortable : true
			          },{ 
			   header : '金额',
			   width : 210,
			   dataIndex : 'amt',
			   sortable : true
			          },{ 
			   header : '折美元汇率',
			   width : 210,
			   dataIndex : 'usdRat',
			   sortable : true
			          },{ 
			   header : '折美元金额',
			   width : 210,
			   dataIndex : 'usdAmt',
			   sortable : true 
			          },{ 
			   header : '吨数',
			   width : 210,
			   dataIndex : 'qty',
			   sortable : true 
		} ]);

		/**
		 * 数据存储
		 */
		var store = new Ext.data.Store( {
			restful : true,
			proxy : new Ext.data.HttpProxy( {
//json修改
				url : basepath + '/XywzSaleInvInfoQueryAction.json'
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
									addXywzSaleInvInfoForm.getForm().reset();
									
									Ext.getCmp('LOAD_TRAFF_PORT_NAME1').setValue('XINGANG PORT,CHINA');
									addXywzSaleInvInfoForm.getForm().findField('portofloading').setValue(parseInt('11000004'));
									
			    					addXywzSaleInvInfoWindow.show();
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
										editXywzSaleInvInfoForm.getForm()
												.loadRecord(selectRe);
										editXywzSaleInvInfoWindow.show();

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
																tempId = selectRe.data.invId; 
																idStr += tempId;
																if (i != selectLength - 1)
																	idStr += ',';
															}
//action名称
															Ext.Ajax
																	.request( {
																		url : basepath
																				+ '/XywzSaleInvInfoAction!batchDestroy.json?idStr='
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
					            url : basepath+'/XywzSaleInvInfoQueryAction.json'
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
										detailXywzSaleInvInfoForm
												.getForm().loadRecord(
														selectRe);
										detailXywzSaleInvInfoWindow.show();
									}
								}
							} ]
				});

		// 新增窗口展示的from
		var addXywzSaleInvInfoForm = new Ext.form.FormPanel(
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
            name : 'invId',
            maxLength : 200,
            minLength : 1, 
            hidden:true,
            anchor : '90%'
           } ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ new Ext.form.ComboBox({
				hiddenName : 'invStat',
				fieldLabel : '<font color=red>*</font>发票状态',
				labelStyle: 'text-align:left;',
				blankText : '发票状态不能为空',
				triggerAction : 'all',
				store : boxstore,									
				displayField : 'value',
				valueField : 'key',
				mode : 'local',
				forceSelection : true,
				typeAhead : true,
				emptyText:'请选择',
				resizable : true,
				anchor : '90%'
			}) ]
          },{
            columnWidth : .5,
            layout : 'form',
            items : [new Com.xywz.common.ContractFrgnQuery(
					{
						fieldLabel : '合同号',
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
							addXywzSaleInvInfoForm.getForm().findField('contrNum').setValue(records[0].data.CONTR_NUM);
							addXywzSaleInvInfoForm.getForm().findField('sCno').setValue(records[0].data.CONTR_NUM);
							addXywzSaleInvInfoForm.getForm().findField('chksPers').setValue(parseInt(records[0].data.CUST_ID));
							addXywzSaleInvInfoForm.getForm().findField('custNm').setValue(records[0].data.CUST_SHT_NM);
							addXywzSaleInvInfoForm.getForm().findField('custNm').setValue(records[0].data.CUST_SHT_NM);
						}
					}) ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'invNum',
            fieldLabel : '<font color=red>*</font>发票号',
            allowBlank : false,
            blankText : '发票号不能为空',
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
				blankText : '币种不能为空',
				triggerAction : 'all',
				store : boxstore1,									
				displayField : 'value',
				valueField : 'key',
				mode : 'local',
				forceSelection : true,
				typeAhead : true,
				emptyText:'请选择',
				resizable : true,
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
           blankText : '金额不能为空',
           anchor : '90%',
        	   listeners:{ 
        	   blur:function(){ 
        	      var amt=addXywzSaleInvInfoForm.getForm().findField('amt').getValue();
        	      var usdRat = addXywzSaleInvInfoForm.getForm().findField('usdRat').getValue(); 
        	      if(usdRat!=null && usdRat!='')
        	    	  addXywzSaleInvInfoForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
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
        	      var amt=addXywzSaleInvInfoForm.getForm().findField('amt').getValue();
        	      var usdRat = addXywzSaleInvInfoForm.getForm().findField('usdRat').getValue(); 
        	      if(amt!=null && amt!='')
        	    	  addXywzSaleInvInfoForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
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
           name : 'usdAmt',
           fieldLabel : '<font color=red>*</font>折美元金额',
           allowBlank : false,
           blankText : '折美元金额不能为空',     
           readOnly : true,
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
          fieldLabel : '<font color=red>*</font>吨数',
          allowBlank : false,
          blankText : '吨数不能为空',
          anchor : '90%'
         } ] 
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'chksPers',
            fieldLabel : '<font color=red>*</font>收票人',
            allowBlank : false,
            blankText : '收票人不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            hidden : true
           } ]
          },{ 
              columnWidth : .5,
              layout : 'form',
              items : [ {
              xtype : 'textfield',
              vtype : 'trim',
              Width : '100',
              name : 'custNm',
              fieldLabel : '<font color=red>*</font>收票人名称',
              allowBlank : false,
              blankText : '收票人名称不能为空',
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
            name : 'invDt',
            fieldLabel : '<font color=red>*</font>发票日期',
            allowBlank : false,
            blankText : '发票日期不能为空',
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
            name : 'sCno',
            fieldLabel : '<font color=red>*</font>S_CNO',
            allowBlank : false,
            blankText : 'S_CNO不能为空',
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
            name : 'payments',
            fieldLabel : '<font color=red>*</font>付款方式',
            allowBlank : false,
            blankText : '付款方式不能为空',
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
            name : 'portofloading',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            hidden : true
           },new Com.xywz.common.PortMgmtInfoQuery(
					{
						fieldLabel : '<font color=red>*</font>起运港',
						labelStyle : 'text-align:left;',
						//labelWidth : 100,
						name : 'loadPortNm',
						id : 'LOAD_TRAFF_PORT_NAME1',
						singleSelected : false,
						// 单选复选标志
						editable : false,
						allowBlank : false,
						// 不允许为空
						blankText : "不能为空，请填写",
						anchor : '90%',
						callback : function(a, b) {
							var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME1').oCustomerQueryGrid.getSelectionModel().selections.items;
							Ext.getCmp('LOAD_TRAFF_PORT_NAME1').setValue(records[0].data.PORT_NAME_CN);
							addXywzSaleInvInfoForm.getForm().findField('portofloading').setValue(parseInt(records[0].data.PORT_ID));
																	
						}
					})  ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'portofdestination',
            fieldLabel : '<font color=red>*</font>PORTOFDESTINATION',
            allowBlank : false,
            blankText : 'PORTOFDESTINATION不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            hidden : true
           },new Com.xywz.common.PortMgmtInfoQuery(
					{
						fieldLabel : '<font color=red>*</font>目的港',
						labelStyle : 'text-align:left;',
						//labelWidth : 100,
						name : 'desPortNm',
						id : 'LOAD_TRAFF_PORT_NAME2',
						singleSelected : false,
						// 单选复选标志
						editable : false,
						allowBlank : false,
						// 不允许为空
						blankText : "不能为空，请填写",
						anchor : '90%',
						callback : function(a, b) {
							var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME2').oCustomerQueryGrid.getSelectionModel().selections.items;
							Ext.getCmp('LOAD_TRAFF_PORT_NAME2').setValue(records[0].data.PORT_NAME_CN);
							addXywzSaleInvInfoForm.getForm().findField('portofdestination').setValue(parseInt(records[0].data.PORT_ID));
																	
						}
					})  ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'incoterms',
            fieldLabel : '<font color=red>*</font>TRADE TERMS',
            allowBlank : false,
            blankText : 'TRADE TERMS不能为空',
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
            name : 'shippingmarks',
            fieldLabel : '<font color=red>*</font>唛头',
            allowBlank : false,
            blankText : '唛头不能为空',
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
												if (!addXywzSaleInvInfoForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false; //注掉此行可以正确插入，但不知原因
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInvInfoAction.json',
															method : 'POST',
															form : addXywzSaleInvInfoForm
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

												addXywzSaleInvInfoWindow.hide();
											}
										}, {
											text : '取  消',
											handler : function() {
											addXywzSaleInvInfoWindow.hide();
											}
										} ]
							} ]
				});

		// 修改窗口展示的from
		var editXywzSaleInvInfoForm = new Ext.form.FormPanel(
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
            name : 'invId',
            maxLength : 200,
            minLength : 1, 
            hidden:true,
            anchor : '90%'
           } ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [  new Ext.form.ComboBox({
				hiddenName : 'invStat',
				fieldLabel : '<font color=red>*</font>发票状态',
				labelStyle: 'text-align:left;',
				blankText : '发票状态不能为空',
				triggerAction : 'all',
				store : boxstore,									
				displayField : 'value',
				valueField : 'key',
				mode : 'local',
				forceSelection : true,
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
            name : 'contrNum',
            fieldLabel : '<font color=red>*</font>合同号',
            allowBlank : false,
            blankText : '合同号不能为空',
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
            name : 'invNum',
            fieldLabel : '<font color=red>*</font>发票号',
            allowBlank : false,
            blankText : '发票号不能为空',
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
   				blankText : '币种不能为空',
   				triggerAction : 'all',
   				store : boxstore1,									
   				displayField : 'value',
   				valueField : 'key',
   				mode : 'local',
   				forceSelection : true,
   				typeAhead : true,
   				emptyText:'请选择',
   				resizable : true,
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
              blankText : '金额不能为空',
              anchor : '90%',
           	   listeners:{ 
           	   blur:function(){ 
           	      var amt=editXywzSaleInvInfoForm.getForm().findField('amt').getValue();
           	      var usdRat = editXywzSaleInvInfoForm.getForm().findField('usdRat').getValue(); 
           	      if(usdRat!=null && usdRat!='')
           	    	editXywzSaleInvInfoForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
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
           	      var amt=editXywzSaleInvInfoForm.getForm().findField('amt').getValue();
           	      var usdRat = editXywzSaleInvInfoForm.getForm().findField('usdRat').getValue(); 
           	      if(amt!=null && amt!='')
           	    	editXywzSaleInvInfoForm.getForm().findField('usdAmt').setValue(amt*usdRat); 
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
              name : 'usdAmt',
              fieldLabel : '<font color=red>*</font>折美元金额',
              allowBlank : false,
              blankText : '折美元金额不能为空',     
              readOnly : true,
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
                fieldLabel : '<font color=red>*</font>吨数',
                allowBlank : false,
                blankText : '吨数不能为空',
                anchor : '90%'
               } ] 
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'chksPers',
            fieldLabel : '<font color=red>*</font>收票人名称',
            allowBlank : false,
            blankText : '收票人名称不能为空',
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
            name : 'invDt',
            fieldLabel : '<font color=red>*</font>发票日期',
            allowBlank : false,
            blankText : '发票日期不能为空',
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
            name : 'sCno',
            fieldLabel : '<font color=red>*</font>S_CNO',
            allowBlank : false,
            blankText : 'S_CNO不能为空',
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
            name : 'payments',
            fieldLabel : '<font color=red>*</font>付款方式',
            allowBlank : false,
            blankText : '付款方式不能为空',
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
            name : 'portofloading',
            fieldLabel : '<font color=red>*</font>起运港',
            allowBlank : false,
            blankText : '起运港不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            hidden:true
           },new Com.xywz.common.PortMgmtInfoQuery(
					{
						fieldLabel : '<font color=red>*</font>起运港',
						labelStyle : 'text-align:left;',
						//labelWidth : 100,
						name : 'loadPortNm',
						id : 'LOAD_TRAFF_PORT_NAME3',
						singleSelected : false,
						// 单选复选标志
						editable : false,
						allowBlank : false,
						// 不允许为空
						blankText : "不能为空，请填写",
						anchor : '90%',
						callback : function(a, b) {
							var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME3').oCustomerQueryGrid.getSelectionModel().selections.items;
							Ext.getCmp('LOAD_TRAFF_PORT_NAME3').setValue(records[0].data.PORT_NAME_CN);
							editXywzSaleInvInfoForm.getForm().findField('portofloading').setValue(parseInt(records[0].data.PORT_ID));
																	
						}
					}) ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'portofdestination',
            fieldLabel : '<font color=red>*</font>目的港',
            allowBlank : false,
            blankText : '目的港不能为空',
            maxLength : 200,
            minLength : 1,
            anchor : '90%',
            hidden:true
           },new Com.xywz.common.PortMgmtInfoQuery(
					{
						fieldLabel : '<font color=red>*</font>目的港',
						labelStyle : 'text-align:left;',
						//labelWidth : 100,
						name : 'desPortNm',
						id : 'LOAD_TRAFF_PORT_NAME4',
						singleSelected : false,
						// 单选复选标志
						editable : false,
						allowBlank : false,
						// 不允许为空
						blankText : "不能为空，请填写",
						anchor : '90%',
						callback : function(a, b) {
							var records = Ext.getCmp('LOAD_TRAFF_PORT_NAME4').oCustomerQueryGrid.getSelectionModel().selections.items;
							Ext.getCmp('LOAD_TRAFF_PORT_NAME4').setValue(records[0].data.PORT_NAME_CN);
							editXywzSaleInvInfoForm.getForm().findField('portofdestination').setValue(parseInt(records[0].data.PORT_ID));
																	
						}
					}) ]
          },{ 
            columnWidth : .5,
            layout : 'form',
            items : [ {
            xtype : 'textfield',
            vtype : 'trim',
            Width : '100',
            name : 'incoterms',
            fieldLabel : '<font color=red>*</font>TRADE TERMS',
            allowBlank : false,
            blankText : 'TRADE TERMS不能为空',
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
            name : 'shippingmarks',
            fieldLabel : '<font color=red>*</font>唛头',
            allowBlank : false,
            blankText : '唛头不能为空',
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
												if (!editXywzSaleInvInfoForm
														.getForm().isValid()) {
													Ext.Msg.alert('提示',
															'输入格式有误，请重新输入!');
													return false;
												}
												Ext.Ajax
														.request( {
															url : basepath + '/XywzSaleInvInfoAction.json',
															method : 'POST',
															form : editXywzSaleInvInfoForm
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

												editXywzSaleInvInfoWindow
														.hide();
											}
										},
										{
											text : '取  消',
											handler : function() {
												editXywzSaleInvInfoWindow
														.hide();
											}
										} ]
							} ]
				});
		
		// 预览展示的from
		var detailXywzSaleInvInfoForm = new Ext.form.FormPanel({
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
				              name : 'invId',
				              maxLength : 200,
				              minLength : 1, 
				              hidden:true,
				              anchor : '90%'
				             } ]
				            },{ 
				              columnWidth : .5,
				              layout : 'form',
				              items : [  new Ext.form.ComboBox({
				  				hiddenName : 'invStat',
				  				fieldLabel : '<font color=red>*</font>发票状态',
				  				labelStyle: 'text-align:left;',
				  				blankText : '发票状态不能为空',
				  				triggerAction : 'all',
				  				store : boxstore,									
				  				displayField : 'value',
				  				valueField : 'key',
				  				mode : 'local',
				  				forceSelection : true,
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
				              name : 'contrNum',
				              fieldLabel : '<font color=red>*</font>合同号',
				              allowBlank : false,
				              blankText : '合同号不能为空',
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
				              name : 'invNum',
				              fieldLabel : '<font color=red>*</font>发票号',
				              allowBlank : false,
				              blankText : '发票号不能为空',
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
				     				blankText : '币种不能为空',
				     				triggerAction : 'all',
				     				store : boxstore1,									
				     				displayField : 'value',
				     				valueField : 'key',
				     				mode : 'local',
				     				forceSelection : true,
				     				typeAhead : true,
				     				emptyText:'请选择',
				     				resizable : true,
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
				                blankText : '金额不能为空',
				                anchor : '90%'
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
				                anchor : '90%'
				               } ]
				              },{ 
				                columnWidth : .5,
				                layout : 'form',
				                items : [ {
				                xtype : 'numberfield',
				                vtype : 'trim',
				                Width : '100',
				                name : 'usdAmt',
				                fieldLabel : '<font color=red>*</font>折美元金额',
				                allowBlank : false,
				                blankText : '折美元金额不能为空',
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
				                  fieldLabel : '<font color=red>*</font>吨数',
				                  allowBlank : false,
				                  blankText : '吨数不能为空',
				                  anchor : '90%'
				                 } ] 
				            },{ 
				              columnWidth : .5,
				              layout : 'form',
				              items : [ {
				              xtype : 'textfield',
				              vtype : 'trim',
				              Width : '100',
				              name : 'chksPers',
				              fieldLabel : '<font color=red>*</font>收票人名称',
				              allowBlank : false,
				              blankText : '收票人名称不能为空',
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
				              name : 'invDt',
				              fieldLabel : '<font color=red>*</font>发票日期',
				              allowBlank : false,
				              blankText : '发票日期不能为空',
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
				              name : 'sCno',
				              fieldLabel : '<font color=red>*</font>S_CNO',
				              allowBlank : false,
				              blankText : 'S_CNO不能为空',
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
				              name : 'payments',
				              fieldLabel : '<font color=red>*</font>PAYMENTS',
				              allowBlank : false,
				              blankText : 'PAYMENTS不能为空',
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
				              name : 'portofloading',
				              fieldLabel : '<font color=red>*</font>PORTOFLOADING',
				              allowBlank : false,
				              blankText : 'PORTOFLOADING不能为空',
				              maxLength : 200,
				              minLength : 1,
				              anchor : '90%',
				              hidden:true
				             },{
					              xtype : 'textfield',
					              vtype : 'trim',
					              Width : '100',
					              name : 'loadPortNm',
					              fieldLabel : '<font color=red>*</font>装运港名称',
					              allowBlank : false,
					              blankText : '装运港名称不能为空',
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
				              name : 'portofdestination',
				              fieldLabel : '<font color=red>*</font>PORTOFDESTINATION',
				              allowBlank : false,
				              blankText : 'PORTOFDESTINATION不能为空',
				              maxLength : 200,
				              minLength : 1,
				              anchor : '90%',
				              hidden:true
				             },{
					              xtype : 'textfield',
					              vtype : 'trim',
					              Width : '100',
					              name : 'desPortNm',
					              fieldLabel : '<font color=red>*</font>目的港名称',
					              allowBlank : false,
					              blankText : '目的港名称不能为空',
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
				              name : 'incoterms',
				              fieldLabel : '<font color=red>*</font>INCOTERMS',
				              allowBlank : false,
				              blankText : 'INCOTERMS不能为空',
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
				              name : 'shippingmarks',
				              fieldLabel : '<font color=red>*</font>SHIPPINGMARKS',
				              allowBlank : false,
				              blankText : 'SHIPPINGMARKS不能为空',
				              maxLength : 200,
				              minLength : 1,
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
				    	detailXywzSaleInvInfoWindow.hide();
					}
				} ]
			}
			]
		});


		// 定义新增窗口
		var addXywzSaleInvInfoWindow = new Ext.Window( {
			title : '外贸发票新增',
			plain : true,
			layout : 'fit',
			width : 800,
			height : 300,
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
			items : [ addXywzSaleInvInfoForm ]
		});

		// 定义修改窗口
		var editXywzSaleInvInfoWindow = new Ext.Window( {
			title : '外贸发票修改',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 300,
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
			items : [ editXywzSaleInvInfoForm ]
		});
		
		// 定义详情窗口
		var detailXywzSaleInvInfoWindow = new Ext.Window({
			title : '外贸发票预览',
			plain : true,
			layout : 'fit',
			width : 880,
			height : 300,
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
			items : [ detailXywzSaleInvInfoForm ]
		});

		// 表格实例
		var grid = new Ext.grid.GridPanel( {
			title : '外贸发票列表',
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