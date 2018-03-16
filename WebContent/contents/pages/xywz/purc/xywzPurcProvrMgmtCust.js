Ext.onReady(function() {
			Ext.QuickTips.init(); 
			//“供应商类型”选择数据集
			var boxstore = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROVR_TYP'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“供应商来源”选择数据集
			var boxstore1 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROVR_SRC'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“供应商状态”选择数据集
			var boxstore2 = new Ext.data.Store({  
				sortInfo: {
			    	field: 'key',
			    	direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
				},
				restful:true,   
				autoLoad :true,
				proxy : new Ext.data.HttpProxy({
					url :basepath+'/lookup.json?name=XYWZ_PROVR_STAT'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			//“当前步骤”选择数据集
			var boxstore3 = new Ext.data.Store({  
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
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "供应商信息查询",
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
						items : [ new Ext.form.ComboBox({
							hiddenName : 'provrTyp',
							fieldLabel : '供应商类型',
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
						})]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'provrStat',
							fieldLabel : '供应商状态',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore2,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							editable : false,
							anchor : '90%'
						})]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'provrNum',
							fieldLabel : '供应商编号',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							Width : '100',
							name : 'provrFullNm',
							fieldLabel : '供应商全称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .33,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'provrSrc',
							fieldLabel : '供应商来源',
							labelStyle: 'text-align:left;',
							triggerAction : 'all',
							store : boxstore1,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							editable : false,
							anchor : '90%'
						})]
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
				   name : 'provrId',
				   mapping : 'PROVR_ID'
				  }, { 
				   name : 'provrTyp',
				   mapping : 'PROVR_TYP'
				  }, { 
				   name : 'provrTypOra',
				   mapping : 'PROVR_TYP_ORA'
				  }, { 
				   name : 'provrStat',
				   mapping : 'PROVR_STAT'
				  }, { 
					   name : 'provrStatOra',
					   mapping : 'PROVR_STAT_ORA'
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
				   name : 'provrFullNm',
				   mapping : 'PROVR_FULL_NM'
				  }, { 
				   name : 'provrSrc',
				   mapping : 'PROVR_SRC'
				  }, { 
				   name : 'provrSrcOra',
				   mapping : 'PROVR_SRC_ORA'
				  }, { 
				   name : 'addr',
				   mapping : 'ADDR'
				  }, { 
				   name : 'setupDt',
				   mapping : 'SETUP_DT'
				  }, { 
				   name : 'ownPersNm',
				   mapping : 'OWN_PERS_NM'
				  }, { 
				   name : 'prodScop',
				   mapping : 'PROD_SCOP'
				  }, { 
				   name : 'mktScop',
				   mapping : 'MKT_SCOP'
				  }, { 
				   name : 'tel',
				   mapping : 'TEL'
				  }, { 
				   name : 'fax',
				   mapping : 'FAX'
				  }, { 
				   name : 'inputPersId',
				   mapping : 'INPUT_PERS_ID'
				  }, { 
				   name : 'inputPers',
				   mapping : 'INPUT_PERS'
				  }, { 
				   name : 'inputDt',
				   mapping : 'INPUT_DT'
				  }, { 
				   name : 'finalMdfrId',
				   mapping : 'FINAL_MDFR_ID'
				  }, { 
				   name : 'finalMdfr',
				   mapping : 'FINAL_MDFR'
				  }, { 
				   name : 'lastModiDt',
				   mapping : 'LAST_MODI_DT'
				  }, { 
				   name : 'memo',
				   mapping : 'MEMO'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				   header : '供应商ID',
				   width : 210,
				   hidden:true,
				   dataIndex : 'provrId',
				   sortable : true
				  }, { 
				   header : '供应商类型',
				   width : 210,
				   dataIndex : 'provrTypOra',
				   sortable : true
				  }, { 
				   header : '供应商状态',
				   width : 210,
				   dataIndex : 'provrStatOra',
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
				   header : '供应商全称',
				   width : 210,
				   dataIndex : 'provrFullNm',
				   sortable : true
				  }, { 
				   header : '供应商来源',
				   width : 210,
				   dataIndex : 'provrSrcOra',
				   sortable : true
				  }, { 
				   header : '地址',
				   width : 210,
				   dataIndex : 'addr',
				   sortable : true
				  }, { 
				   header : '创建日期',
				   width : 210,
				   dataIndex : 'setupDt',
				   sortable : true
				  }, { 
				   header : '拥有人名称',
				   width : 210,
				   dataIndex : 'ownPersNm',
				   sortable : true
				  }, { 
				   header : '产品范围',
				   width : 210,
				   dataIndex : 'prodScop',
				   sortable : true
				  }, { 
				   header : '市场范围',
				   width : 210,
				   dataIndex : 'mktScop',
				   sortable : true
				  }, { 
				   header : '电话',
				   width : 210,
				   dataIndex : 'tel',
				   sortable : true
				  }, { 
				   header : '传真',
				   width : 210,
				   dataIndex : 'fax',
				   sortable : true
				  }, { 
				   header : '录入人编号',
				   width : 210,
				   dataIndex : 'inputPersId',
				   sortable : true
				  }, { 
				   header : '录入人',
				   width : 210,
				   dataIndex : 'inputPers',
				   sortable : true
				  }, { 
				   header : '录入日期',
				   width : 210,
				   dataIndex : 'inputDt',
				   sortable : true
				  }, { 
				   header : '最后修改人编号',
				   width : 210,
				   dataIndex : 'finalMdfrId',
				   sortable : true
				  }, { 
				   header : '最后修改人',
				   width : 210,
				   dataIndex : 'finalMdfr',
				   sortable : true
				  }, { 
				   header : '最后一次修改日期',
				   width : 210,
				   dataIndex : 'lastModiDt',
				   sortable : true
				  }, { 
				   header : '备注',
				   width : 210,
				   dataIndex : 'memo',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzPurcProvrMgmtCustQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'PROVR_ID',
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
											addXywzPurcProvrMgmtCustForm.getForm().reset();
											addXywzPurcProvrMgmtCustForm.getForm().findField('provrStat').setValue('0');
											addXywzPurcProvrMgmtCustForm.getForm().findField('setupDt').setValue(new Date());
											addXywzPurcProvrMgmtCustWindow.show();
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
												editXywzPurcProvrMgmtCustForm.getForm().loadRecord(selectRe);
												editXywzPurcProvrMgmtCustWindow.show();

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
												tempId = selectRe.data.provrId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzPurcProvrMgmtCustAction!batchDestroy.json?idStr='+ idStr,
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
							            url : basepath+'/XywzPurcProvrMgmtCustQueryAction.json'
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
												detailXywzPurcProvrMgmtCustForm
														.getForm().loadRecord(
																selectRe);
												detailXywzPurcProvrMgmtCustWindow.show();
											}
										}
									},'-',{
										text : '联系人和银行详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/purc/xywzPurcProvrMgmtCustDetail.jsp?'
												+ '&provrNum='+_record.data.provrNum; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
											}
										}
									},'-',{
										text : '快递公司和客户跟进详情',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												var _record = grid.getSelectionModel().getSelected();
												var viewUrl = basepath
												+ '/contents/pages/xywz/purc/xywzPurcProvrMgmtCustDetailAdd.jsp?'
												+ '&provrNum='+_record.data.provrNum; 
												operateWin.show();
												document.getElementById('mainFrame').src=viewUrl;
											}
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
			var addXywzPurcProvrMgmtCustForm = new Ext.form.FormPanel({
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
				            	     hiddenName : 'provrTyp',
									 fieldLabel : '<font color=red>*</font>供应商类型',
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
				            	     hiddenName : 'provrStat',
									 fieldLabel : '<font color=red>*</font>供应商状态',
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
					              name : 'provrNum',
					              fieldLabel : '<font color=red>*</font>供应商编号', 
					              allowBlank : false,
					              blankText : '供应商编号不能为空',
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
					              name : 'provrShtNm',
					              fieldLabel : '<font color=red>*</font>供应商简称', 
					              allowBlank : false,
					              blankText : '供应商简称不能为空',
					              maxLength : 50,
					              minLength : 1,
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
					             items : [ new Ext.form.ComboBox({
				            	     hiddenName : 'provrSrc',
									 fieldLabel : '<font color=red>*</font>供应商来源',
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
				                  })]
					            },{
					             columnWidth : .5,
					             layout : 'form',
					             items : [ {
					              xtype : 'textarea',
					              vtype : 'trim',
					              Width : '100',
					              name : 'provrFullNm',
					              fieldLabel : '<font color=red>*</font>供应商全称', 
					              allowBlank : false,
					              blankText : '供应商全称不能为空',
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
					              name : 'addr',
					              fieldLabel : '<font color=red>*</font>地址', 
					              allowBlank : false,
					              blankText : '地址不能为空',
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
					              name : 'setupDt',
					              fieldLabel : '<font color=red>*</font>创建日期', 
					              allowBlank : false,
					              blankText : '创建日期不能为空',
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
					              name : 'ownPersNm',
					              fieldLabel : '拥有人名称', 
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
					              name : 'prodScop',
					              fieldLabel : '产品范围', 
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
					              name : 'mktScop',
					              fieldLabel : '市场范围', 
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
					              name : 'tel',
					              fieldLabel : '电话', 
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
					              name : 'fax',
					              fieldLabel : '传真', 
					              maxLength : 20,
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
						           name : 'provrId',
				          		   hidden:true,
						           fieldLabel : '供应商ID', 
						           maxLength : 200,
						           minLength : 1,
						           anchor : '90%'
						           } ]				          
								} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzPurcProvrMgmtCustForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtCustAction.json',
								method : 'POST',
								form : addXywzPurcProvrMgmtCustForm.getForm().id,
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
							
							addXywzPurcProvrMgmtCustWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzPurcProvrMgmtCustWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzPurcProvrMgmtCustForm = new Ext.form.FormPanel({
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
				            	     hiddenName : 'provrTyp',
									 fieldLabel : '<font color=red>*</font>供应商类型',
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
				            	     hiddenName : 'provrStat',
									 fieldLabel : '<font color=red>*</font>供应商状态',
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
					              name : 'provrShtNm',
					              fieldLabel : '供应商简称', 
					              maxLength : 50,
					              minLength : 1,
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
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'provrSrc',
										 fieldLabel : '<font color=red>*</font>供应商来源',
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
					              name : 'provrFullNm',
					              fieldLabel : '<font color=red>*</font>供应商全称', 
					              allowBlank : false,
					              blankText : '供应商全称不能为空',
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
					              name : 'addr',
					              fieldLabel : '<font color=red>*</font>地址', 
					              allowBlank : false,
					              blankText : '地址不能为空',
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
					              name : 'setupDt',
					              fieldLabel : '<font color=red>*</font>创建日期', 
					              allowBlank : false,
					              blankText : '创建日期不能为空',
					              readOnly : true,
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
					              name : 'ownPersNm',
					              fieldLabel : '拥有人名称', 
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
					              name : 'prodScop',
					              fieldLabel : '产品范围', 
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
					              name : 'mktScop',
					              fieldLabel : '市场范围', 
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
					              name : 'tel',
					              fieldLabel : '电话', 
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
					              name : 'fax',
					              fieldLabel : '传真', 
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
					              name : 'inputPersId',
					              fieldLabel : '录入人编号', 
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
					              name : 'finalMdfrId',
					              fieldLabel : '最后修改人编号', 
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
					              name : 'inputPers',
					              fieldLabel : '录入人名称', 
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
					              name : 'finalMdfr',
					              fieldLabel : '最后修改人名称', 
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
					              fieldLabel : '录入日期', 
					              readOnly : true,
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
					              name : 'lastModiDt',
					              fieldLabel : '最后一次修改日期', 
					              readOnly : true,
					              anchor : '90%',
					              format:'Y-m-d'
					              } ]
					            },{
					             columnWidth : 1.06,
					             layout : 'form',
					             items : [ {
					              xtype : 'textarea',
					              vtype : 'trim',
					              Width : '100',
					              name : 'memo',
					              fieldLabel : '<font color=red>*</font>备注', 
					              allowBlank : false,
					              blankText : '备注不能为空',
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
						           name : 'provrId',
				          		   hidden:true,
						           fieldLabel : '供应商ID', 
						           maxLength : 200,
						           minLength : 1,
						           anchor : '90%'
					           } ]	
							} ]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!editXywzPurcProvrMgmtCustForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzPurcProvrMgmtCustAction.json',
								method : 'POST',
								form : editXywzPurcProvrMgmtCustForm.getForm().id,
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
							
							editXywzPurcProvrMgmtCustWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzPurcProvrMgmtCustWindow.hide();
						}
					} ]
				} ]
			});
			
			// 预览展示的from
			var detailXywzPurcProvrMgmtCustForm = new Ext.form.FormPanel({
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
				            	     hiddenName : 'provrTyp',
									 fieldLabel : '<font color=red>*</font>供应商类型',
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
				            	     hiddenName : 'provrStat',
									 fieldLabel : '<font color=red>*</font>供应商状态',
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
					              name : 'provrShtNm',
					              fieldLabel : '供应商简称', 
					              maxLength : 50,
					              minLength : 1,
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
						             items : [ new Ext.form.ComboBox({
					            	     hiddenName : 'provrSrc',
										 fieldLabel : '<font color=red>*</font>供应商来源',
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
					              name : 'provrFullNm',
					              fieldLabel : '<font color=red>*</font>供应商全称', 
					              allowBlank : false,
					              blankText : '供应商全称不能为空',
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
					              name : 'addr',
					              fieldLabel : '<font color=red>*</font>地址', 
					              allowBlank : false,
					              blankText : '地址不能为空',
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
					              name : 'setupDt',
					              fieldLabel : '<font color=red>*</font>创建日期', 
					              allowBlank : false,
					              blankText : '创建日期不能为空',
					              readOnly : true,
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
					              name : 'ownPersNm',
					              fieldLabel : '拥有人名称', 
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
					              name : 'prodScop',
					              fieldLabel : '产品范围', 
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
					              name : 'mktScop',
					              fieldLabel : '市场范围', 
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
					              name : 'tel',
					              fieldLabel : '电话', 
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
					              name : 'fax',
					              fieldLabel : '传真', 
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
					              name : 'inputPersId',
					              fieldLabel : '录入人编号', 
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
					              name : 'finalMdfrId',
					              fieldLabel : '最后修改人编号', 
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
					              name : 'inputPers',
					              fieldLabel : '录入人名称', 
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
					              name : 'finalMdfr',
					              fieldLabel : '最后修改人名称', 
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
					              fieldLabel : '录入日期', 
					              readOnly : true,
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
					              name : 'lastModiDt',
					              fieldLabel : '最后一次修改日期', 
					              readOnly : true,
					              anchor : '90%',
					              format:'Y-m-d'
					              } ]
					            },{
					             columnWidth : 1.06,
					             layout : 'form',
					             items : [ {
					              xtype : 'textarea',
					              vtype : 'trim',
					              Width : '100',
					              name : 'memo',
					              fieldLabel : '<font color=red>*</font>备注', 
					              allowBlank : false,
					              blankText : '备注不能为空',
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
						           name : 'provrId',
				          		   hidden:true,
						           fieldLabel : '供应商ID', 
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
					    	detailXywzPurcProvrMgmtCustWindow.hide();
						}
					} ]
				}
				]
			});


			// 定义新增窗口
			var addXywzPurcProvrMgmtCustWindow = new Ext.Window({
				title : '供应商信息新增',
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
				border : false,
				items : [ addXywzPurcProvrMgmtCustForm ]
			});

			// 定义修改窗口
			var editXywzPurcProvrMgmtCustWindow = new Ext.Window({
				title : '供应商信息修改',
				plain : true,
				layout : 'fit',
				width : 800,
				height : 550,
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
				items : [ editXywzPurcProvrMgmtCustForm ]
			});
			
			// 定义详情窗口
			var detailXywzPurcProvrMgmtCustWindow = new Ext.Window({
				title : '供应商信息预览',
				plain : true,
				layout : 'fit',
				width : 880,
				height :550,
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
				items : [ detailXywzPurcProvrMgmtCustForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '供应商信息列表',
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