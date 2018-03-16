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
					url :basepath+'/lookup.json?name=XYWZ_SEND_TYPE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});
			
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "订舱查询",
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
							Width : '100',
							name : 'contrNum',
							labelWidth : 150,
							fieldLabel : '合同号 ',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							name : 'sellPersMem',
							hidden:true
						},new Com.xywz.common.UserManagerIdQuery(
							{
								fieldLabel : '销售人员',
								labelStyle : 'text-align:right;',
								//labelWidth : 100,
								//name : 'custShtNm',
								id : 'USER_NAME11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('USER_NAME11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('USER_NAME11').setValue(records[0].data.USER_NAME);
									qForm.getForm().findField('sellPersMem').setValue(records[0].data.ACCOUNT_NAME);
								}
							}) ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'shipName',
							fieldLabel : '船名',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'loadTraffPort',
							fieldLabel : '装运港',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'portofDischarge',
							fieldLabel : '目的港',
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
				   name : 'bookShipId',
				   mapping : 'BOOK_SHIP_ID'
				  }, {
				  name : 'contrNum',
				   mapping : 'CONTR_NUM'
				  }, {
				  name : 'sellPersMemId',
				   mapping : 'SELL_PERS_MEM_ID'
				  }, {
				  name : 'sellPersMem',
				   mapping : 'SELL_PERS_MEM'
				  }, {
				  name : 'shipName',
				   mapping : 'SHIP_NAME'
				  }, {
				  name : 'loadTraffPort',
				   mapping : 'LOAD_TRAFF_PORT'
				  }, {
				  name : 'portofDischarge',
				   mapping : 'PORTOF_DISCHARGE'
				  }, {
				  name : 'expctToPortDay',
				   mapping : 'EXPCT_TO_PORT_DAY'
				  }, {
				  name : 'traffMode',
				   mapping : 'TRAFF_MODE'
				  }, {
				   name : 'traffModeOra',
				   mapping : 'TRAFF_MODE_ORA'
				  }, {
				  name : 'prc',
				   mapping : 'PRC'
				  }, {
				  name : 'qty',
				   mapping : 'QTY'
				  }, {
				  name : 'totlPrc',
				   mapping : 'TOTL_PRC'
				  }, {
				  name : 'shipCorpId',
				   mapping : 'SHIP_CORP_ID'
				  }, {
				  name : 'shipAgentNm',
				   mapping : 'SHIP_AGENT_NM'
				  }, {
				  name : 'shipAgentContcr',
				   mapping : 'SHIP_AGENT_CONTCR'
				  }, {
				  name : 'shipAgentContTel',
				   mapping : 'SHIP_AGENT_CONT_TEL'
				  }, {
				  name : 'gdsAgentNm',
				   mapping : 'GDS_AGENT_NM'
				  }, {
				  name : 'gdsAgentContcr',
				   mapping : 'GDS_AGENT_CONTCR'
				  }, {
				  name : 'gdsAgentContTel',
				   mapping : 'GDS_AGENT_CONT_TEL'
				  }, {
				  name : 'contcrId',
				   mapping : 'CONTCR_ID'
				  }, {
				  name : 'contcr',
				   mapping : 'CONTCR'
				  }, {
				  name : 'makDocPersId',
				   mapping : 'MAK_DOC_PERS_ID'
				  }, {
				  name : 'makDoc',
				   mapping : 'MAK_DOC'
				  }, {
				  name : 'gdsDesc',
				   mapping : 'GDS_DESC'
				  }]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '订舱ID',
				   width : 210,
				   dataIndex : 'bookShipId',
				   sortable : true
				  }, {
				  header : '合同号',
				   width : 210,
				   dataIndex : 'contrNum',
				   sortable : true
				  }, {
				  header : '销售人员编号',
				   width : 210,
				   dataIndex : 'sellPersMemId',
				   sortable : true
				  }, {
				  header : '销售人员',
				   width : 210,
				   dataIndex : 'sellPersMem',
				   sortable : true
				  }, {
				  header : '船名',
				   width : 210,
				   dataIndex : 'shipName',
				   sortable : true
				  }, {
				  header : '装运港',
				   width : 210,
				   dataIndex : 'loadTraffPort',
				   sortable : true
				  }, {
				  header : '目的港港',
				   width : 210,
				   dataIndex : 'portofDischarge',
				   sortable : true
				  }, {
				  header : '预计到港日',
				   width : 210,
				   dataIndex : 'expctToPortDay',
				   sortable : true
				  }, {
				  header : '运输方式',
				   width : 210,
				   dataIndex : 'traffModeOra',
				   sortable : true
				  }, {
				  header : '价格',
				   width : 210,
				   dataIndex : 'prc',
				   sortable : true
				  }, {
				  header : '数量',
				   width : 210,
				   dataIndex : 'qty',
				   sortable : true
				  }, {
				  header : '总价',
				   width : 210,
				   dataIndex : 'totlPrc',
				   sortable : true
				  }, {
				  header : '船务公司ID',
				   width : 210,
				   dataIndex : 'shipCorpId',
				   sortable : true
				  }, {
				  header : '船代名称',
				   width : 210,
				   dataIndex : 'shipAgentNm',
				   sortable : true
				  }, {
				  header : '船代联系人',
				   width : 210,
				   dataIndex : 'shipAgentContcr',
				   sortable : true
				  }, {
				  header : '船代联系电话',
				   width : 210,
				   dataIndex : 'shipAgentContTel',
				   sortable : true
				  }, {
				  header : '货代名称',
				   width : 210,
				   dataIndex : 'gdsAgentNm',
				   sortable : true
				  }, {
				  header : '货代联系人',
				   width : 210,
				   dataIndex : 'gdsAgentContcr',
				   sortable : true
				  }, {
				  header : '货代联系电话',
				   width : 210,
				   dataIndex : 'gdsAgentContTel',
				   sortable : true
				  }, {
				  header : '联系人编号',
				   width : 210,
				   dataIndex : 'contcrId',
				   sortable : true
				  }, {
				  header : '联系人',
				   width : 210,
				   dataIndex : 'contcr',
				   sortable : true
				  }, {
				  header : '国阳制单人编号',
				   width : 210,
				   dataIndex : 'makDocPersId',
				   sortable : true
				  }, {
				  header : '国阳制单',
				   width : 210,
				   dataIndex : 'makDoc',
				   sortable : true
				  }, {
				  header : '货物描述',
				   width : 210,
				   dataIndex : 'gdsDesc',
				   sortable : true
				  }]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiBookShipMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'BOOK_SHIP_ID',
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
											addXywzLogiBookShipMgmtForm.getForm().reset();											
											addXywzLogiBookShipMgmtWindow.show();
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
												editXywzLogiBookShipMgmtForm.getForm().loadRecord(selectRe);
												editXywzLogiBookShipMgmtWindow.show();

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
												tempId = selectRe.data.bookShipId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiBookShipMgmtAction!batchDestroy.json?idStr='+ idStr,
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
									},'-',{
										text : '预览',
										iconCls : 'detailIconCss',
										handler : function() {
											var selectLength = grid.getSelectionModel().getSelections().length;

											var selectRe = grid.getSelectionModel().getSelections()[0];

											if (selectLength != 1) {
												Ext.Msg.alert('提示','请选择一条记录!');
											} else {
												detailXywzLogiBookShipMgmtForm.getForm().loadRecord(selectRe);
												detailXywzLogiBookShipMgmtWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiBookShipMgmtQueryAction.json'
							        })]
					});
			
			var detailXywzLogiBookShipMgmtForm = new Ext.form.FormPanel({
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
		            name : 'sellPersMem',
		            fieldLabel : '销售人员名称',
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
		            name : 'shipName',
		            fieldLabel : '船名',
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
		            name : 'loadTraffPort',
		            fieldLabel : '装运港',
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
		            name : 'portofDischarge',
		            fieldLabel : '目的港港',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%',
		            readOnly:true
		           } ]
		          },{
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
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'traffModeOra',
			            fieldLabel : '运输方式',
			            allowBlank : false,
			            blankText : '价格不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            readOnly:true
			           }]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'prc',
		            fieldLabel : '价格',
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
		            name : 'qty',
		            fieldLabel : '数量',
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
		            name : 'totlPrc',
		            fieldLabel : '总价',
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
		            name : 'shipAgentNm',
		            fieldLabel : '船代名称',
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
		            name : 'shipAgentContcr',
		            fieldLabel : '船代联系人',
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
		            name : 'shipAgentContTel',
		            fieldLabel : '船代联系电话',
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
		            name : 'gdsAgentNm',
		            fieldLabel : '货代名称',
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
		            name : 'gdsAgentContcr',
		            fieldLabel : '货代联系人',
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
		            name : 'gdsAgentContTel',
		            fieldLabel : '货代联系电话',
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
		            name : 'contcr',
		            fieldLabel : '<font color=red>*</font>联系人',
		            allowBlank : false,
		            blankText : '联系人不能为空',
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
		            name : 'makDoc',
		            fieldLabel : '国阳制单人名称',
		            allowBlank : false,
		            blankText : '国阳制单人编号不能为空',
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
		            name : 'gdsDesc',
		            fieldLabel : '货物描述',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%',
		            readOnly:true
		           } ]
                 }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [{
						text : '取  消',
						handler : function() {
							detailXywzLogiBookShipMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzLogiBookShipMgmtForm = new Ext.form.FormPanel({
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
		            name : 'contrNum',
		            fieldLabel : '<font color=red>*</font>合同号',
		            allowBlank : false,
		            blankText : '合同号不能为空',
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
		            name : 'sellPersMemId',
		            fieldLabel : '<font color=red>*</font>销售人员编号',
		            allowBlank : false,
		            blankText : '销售人员编号不能为空',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%',
		            hidden : true
		           } ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ new Com.xywz.common.UserManagerIdQuery(
							{
								fieldLabel : '销售人员名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'sellPersMem',
								id : 'USER_NAME22',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('USER_NAME22').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('USER_NAME22').setValue(records[0].data.USER_NAME);
									addXywzLogiBookShipMgmtForm.getForm().findField('sellPersMemId').setValue(records[0].data.ACCOUNT_NAME);
								}
							}) ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'shipName',
		            fieldLabel : '<font color=red>*</font>船名',
		            allowBlank : false,
		            blankText : '船名不能为空',
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
		            name : 'loadTraffPort',
		            fieldLabel : '<font color=red>*</font>装运港',
		            allowBlank : false,
		            blankText : '装运港不能为空',
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
		            name : 'portofDischarge',
		            fieldLabel : '<font color=red>*</font>目的港港',
		            allowBlank : false,
		            blankText : '目的港港不能为空',
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
		            name : 'expctToPortDay',
		            fieldLabel : '<font color=red>*</font>预计到港日',
		            allowBlank : false,
		            blankText : '预计到港日不能为空',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%',
		            format:'Y-m-d'
		           } ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ new Ext.form.ComboBox({
						hiddenName : 'traffMode',
						fieldLabel : '运输方式',
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
						anchor : '90%'
					}) ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'prc',
		            fieldLabel : '<font color=red>*</font>价格',
		            allowBlank : false,
		            blankText : '价格不能为空',
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
		            fieldLabel : '<font color=red>*</font>数量',
		            allowBlank : false,
		            blankText : '数量不能为空',
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
		            name : 'totlPrc',
		            fieldLabel : '<font color=red>*</font>总价',
		            allowBlank : false,
		            blankText : '总价不能为空',
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
		            name : 'shipCorpId',
		            fieldLabel : '<font color=red>*</font>船务公司ID',
		            allowBlank : false,
		            blankText : '船务公司ID不能为空',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%'
		           } ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ new Com.xywz.common.LogiShipCorpQuery(
							{
								fieldLabel : '船代名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'shipAgentNm',
								id : 'CORP_NM11',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('CORP_NM11').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('CORP_NM11').setValue(records[0].data.CORP_NM);
									addXywzLogiBookShipMgmtForm.getForm().findField('shipCorpId').setValue(parseInt(records[0].data.SHIP_CORP_ID));
									
								}
							}) ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'shipAgentContcr',
		            fieldLabel : '<font color=red>*</font>船代联系人',
		            allowBlank : false,
		            blankText : '船代联系人不能为空',
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
		            name : 'shipAgentContTel',
		            fieldLabel : '<font color=red>*</font>船代联系电话',
		            allowBlank : false,
		            blankText : '船代联系电话不能为空',
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
		            name : 'gdsAgentNm',
		            fieldLabel : '<font color=red>*</font>货代名称',
		            allowBlank : false,
		            blankText : '货代名称不能为空',
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
		            name : 'gdsAgentContcr',
		            fieldLabel : '<font color=red>*</font>货代联系人',
		            allowBlank : false,
		            blankText : '货代联系人不能为空',
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
		            name : 'gdsAgentContTel',
		            fieldLabel : '<font color=red>*</font>货代联系电话',
		            allowBlank : false,
		            blankText : '货代联系电话不能为空',
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
		            name : 'contcrId',
		            fieldLabel : '<font color=red>*</font>联系人编号',
		            allowBlank : false,
		            blankText : '联系人编号不能为空',
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
		            name : 'contcr',
		            fieldLabel : '<font color=red>*</font>联系人',
		            allowBlank : false,
		            blankText : '联系人不能为空',
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
		            name : 'makDocPersId',
		            fieldLabel : '<font color=red>*</font>国阳制单人编号',
		            allowBlank : false,
		            blankText : '国阳制单人编号不能为空',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%',
		            hidden : true
		           } ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ new Com.xywz.common.UserManagerIdQuery(
							{
								fieldLabel : '国阳制单人名称',
								labelStyle : 'text-align:left;',
								//labelWidth : 100,
								name : 'makDoc',
								id : 'USER_NAME44',
								singleSelected : false,
								// 单选复选标志
								editable : false,
								allowBlank : false,
								// 不允许为空
								blankText : "不能为空，请填写",
								anchor : '90%',
								callback : function(a, b) {
									var records = Ext.getCmp('USER_NAME44').oCustomerQueryGrid.getSelectionModel().selections.items;
									Ext.getCmp('USER_NAME44').setValue(records[0].data.USER_NAME);
									addXywzLogiBookShipMgmtForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
								}
							}) ]
		          },{
		           columnWidth : .5,
		           layout : 'form',
		           items : [ {
		            xtype : 'textfield',
		            vtype : 'trim',
		            Width : '100',
		            name : 'gdsDesc',
		            fieldLabel : '<font color=red>*</font>货物描述',
		            allowBlank : false,
		            blankText : '货物描述不能为空',
		            maxLength : 200,
		            minLength : 1,
		            anchor : '90%'
		           } ]
                 }]
				}, {
					layout : 'form',
					buttonAlign : 'center',

					buttons : [ {
						text : '保  存',
						handler : function() {
							if(!addXywzLogiBookShipMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiBookShipMgmtAction.json',
								method : 'POST',
								form : addXywzLogiBookShipMgmtForm.getForm().id,
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
							
							addXywzLogiBookShipMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiBookShipMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiBookShipMgmtForm = new Ext.form.FormPanel({
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
			            name : 'bookShipId',
			            fieldLabel : '<font color=red>*</font>订舱ID',
			            allowBlank : false,
			            blankText : '订舱ID不能为空',
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
			            name : 'contrNum',
			            fieldLabel : '<font color=red>*</font>合同号',
			            allowBlank : false,
			            blankText : '合同号不能为空',
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
			            name : 'sellPersMemId',
			            fieldLabel : '<font color=red>*</font>销售人员编号',
			            allowBlank : false,
			            blankText : '销售人员编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden : true
			           } ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '销售人员名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'sellPersMem',
									id : 'USER_NAME33',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME33').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME33').setValue(records[0].data.USER_NAME);
										editXywzLogiBookShipMgmtForm.getForm().findField('sellPersMemId').setValue(records[0].data.ACCOUNT_NAME);
									}
								}) ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipName',
			            fieldLabel : '<font color=red>*</font>船名',
			            allowBlank : false,
			            blankText : '船名不能为空',
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
			            name : 'loadTraffPort',
			            fieldLabel : '<font color=red>*</font>装运港',
			            allowBlank : false,
			            blankText : '装运港不能为空',
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
			            name : 'portofDischarge',
			            fieldLabel : '<font color=red>*</font>目的港港',
			            allowBlank : false,
			            blankText : '目的港港不能为空',
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
			            name : 'expctToPortDay',
			            fieldLabel : '<font color=red>*</font>预计到港日',
			            allowBlank : false,
			            blankText : '预计到港日不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            format:'Y-m-d'
			           } ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Ext.form.ComboBox({
							hiddenName : 'traffMode',
							fieldLabel : '运输方式',
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
							anchor : '90%'
						}) ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'prc',
			            fieldLabel : '<font color=red>*</font>价格',
			            allowBlank : false,
			            blankText : '价格不能为空',
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
			            fieldLabel : '<font color=red>*</font>数量',
			            allowBlank : false,
			            blankText : '数量不能为空',
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
			            name : 'totlPrc',
			            fieldLabel : '<font color=red>*</font>总价',
			            allowBlank : false,
			            blankText : '总价不能为空',
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
			            name : 'shipCorpId',
			            fieldLabel : '<font color=red>*</font>船务公司ID',
			            allowBlank : false,
			            blankText : '船务公司ID不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%'
			           } ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Com.xywz.common.LogiShipCorpQuery(
								{
									fieldLabel : '船代名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'shipAgentNm',
									id : 'CORP_NM22',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('CORP_NM22').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('CORP_NM22').setValue(records[0].data.CORP_NM);
										editXywzLogiBookShipMgmtForm.getForm().findField('shipCorpId').setValue(parseInt(records[0].data.SHIP_CORP_ID));
										
									}
								})  ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'shipAgentContcr',
			            fieldLabel : '<font color=red>*</font>船代联系人',
			            allowBlank : false,
			            blankText : '船代联系人不能为空',
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
			            name : 'shipAgentContTel',
			            fieldLabel : '<font color=red>*</font>船代联系电话',
			            allowBlank : false,
			            blankText : '船代联系电话不能为空',
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
			            name : 'gdsAgentNm',
			            fieldLabel : '<font color=red>*</font>货代名称',
			            allowBlank : false,
			            blankText : '货代名称不能为空',
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
			            name : 'gdsAgentContcr',
			            fieldLabel : '<font color=red>*</font>货代联系人',
			            allowBlank : false,
			            blankText : '货代联系人不能为空',
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
			            name : 'gdsAgentContTel',
			            fieldLabel : '<font color=red>*</font>货代联系电话',
			            allowBlank : false,
			            blankText : '货代联系电话不能为空',
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
			            name : 'contcrId',
			            fieldLabel : '<font color=red>*</font>联系人编号',
			            allowBlank : false,
			            blankText : '联系人编号不能为空',
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
			            name : 'contcr',
			            fieldLabel : '<font color=red>*</font>联系人',
			            allowBlank : false,
			            blankText : '联系人不能为空',
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
			            name : 'makDocPersId',
			            fieldLabel : '<font color=red>*</font>国阳制单人编号',
			            allowBlank : false,
			            blankText : '国阳制单人编号不能为空',
			            maxLength : 200,
			            minLength : 1,
			            anchor : '90%',
			            hidden : true
			           } ]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ new Com.xywz.common.UserManagerIdQuery(
								{
									fieldLabel : '国阳制单人名称',
									labelStyle : 'text-align:left;',
									//labelWidth : 100,
									name : 'makDoc',
									id : 'USER_NAME55',
									singleSelected : false,
									// 单选复选标志
									editable : false,
									allowBlank : false,
									// 不允许为空
									blankText : "不能为空，请填写",
									anchor : '90%',
									callback : function(a, b) {
										var records = Ext.getCmp('USER_NAME55').oCustomerQueryGrid.getSelectionModel().selections.items;
										Ext.getCmp('USER_NAME55').setValue(records[0].data.USER_NAME);
										editXywzLogiBookShipMgmtForm.getForm().findField('makDocPersId').setValue(records[0].data.ACCOUNT_NAME);
									}
								})]
			          },{
			           columnWidth : .5,
			           layout : 'form',
			           items : [ {
			            xtype : 'textfield',
			            vtype : 'trim',
			            Width : '100',
			            name : 'gdsDesc',
			            fieldLabel : '<font color=red>*</font>货物描述',
			            allowBlank : false,
			            blankText : '货物描述不能为空',
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
							if(!editXywzLogiBookShipMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiBookShipMgmtAction.json',
								method : 'POST',
								form : editXywzLogiBookShipMgmtForm.getForm().id,
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
							
							editXywzLogiBookShipMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiBookShipMgmtWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzLogiBookShipMgmtWindow = new Ext.Window({
				title : '客户银行信息详情',
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
				items : [ detailXywzLogiBookShipMgmtForm ]
			});

			// 定义新增窗口
			var addXywzLogiBookShipMgmtWindow = new Ext.Window({
				title : '订舱信息新增',
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
				items : [ addXywzLogiBookShipMgmtForm ]
			});

			// 定义修改窗口
			var editXywzLogiBookShipMgmtWindow = new Ext.Window({
				title : '订舱信息修改',
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
				items : [ editXywzLogiBookShipMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '订舱信息列表',
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