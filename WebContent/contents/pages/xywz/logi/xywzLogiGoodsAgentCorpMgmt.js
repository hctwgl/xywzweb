Ext.onReady(function() {
			Ext.QuickTips.init(); 
			var qForm = new Ext.form.FormPanel({
				id : "searchCondition",
				title : "货代公司查询",
				frame : true, // 是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				buttonAlign : 'center',
				region:'north',
				split:true,
				height : 120,
				items : [ {
					layout : 'column',
					items : [{
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'agentNamr',
							fieldLabel : '货代公司名称',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							labelWidth : 90,
							Width : '100',
							name : 'contactPer',
							fieldLabel : '联系人名称',
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
				  name : 'agentId',
				   mapping : 'AGENT_ID'
				          },{
				  name : 'agentNum',
				   mapping : 'AGENT_NUM'
				          },{
				  name : 'agentNamr',
				   mapping : 'AGENT_NAMR'
				          },{
				  name : 'addr',
				   mapping : 'ADDR'
				          },{
				  name : 'contactPer',
				   mapping : 'CONTACT_PER'
				          },{
				  name : 'contactPhone',
				   mapping : 'CONTACT_PHONE'
				          },{
				  name : 'contactMobile',
				   mapping : 'CONTACT_MOBILE'
				          },{
				  name : 'contactEmail',
				   mapping : 'CONTACT_EMAIL'
			}]);

			// 定义列模型			

			var cm = new Ext.grid.ColumnModel([ rownum, sm, {
				  header : '货代公司ID',
				   width : 210,
				   dataIndex : 'agentId',
				   sortable : true,
				   hidden:true
				          },{
				  header : '货代公司编号',
				   width : 210,
				   dataIndex : 'agentNum',
				   sortable : true
				          },{
				  header : '货代公司名称',
				   width : 210,
				   dataIndex : 'agentNamr',
				   sortable : true
				          },{
				  header : '公司地址',
				   width : 210,
				   dataIndex : 'addr',
				   sortable : true
				          },{
				  header : '联系人名称',
				   width : 210,
				   dataIndex : 'contactPer',
				   sortable : true
				          },{
				  header : '联系人固定电话',
				   width : 210,
				   dataIndex : 'contactPhone',
				   sortable : true
				          },{
				  header : '联系人手机',
				   width : 210,
				   dataIndex : 'contactMobile',
				   sortable : true
				          },{
				  header : '联系人email',
				   width : 210,
				   dataIndex : 'contactEmail',
				   sortable : true
			}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/XywzLogiGoodsAgentCorpMgmtQueryAction.json'
				}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					idProperty : 'AGENT_ID',
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
											addXywzLogiGoodsAgentCorpMgmtForm.getForm().reset();											
											addXywzLogiGoodsAgentCorpMgmtWindow.show();
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
												editXywzLogiGoodsAgentCorpMgmtForm.getForm().loadRecord(selectRe);
												editXywzLogiGoodsAgentCorpMgmtWindow.show();

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
												tempId = selectRe.data.agentId;
												idStr += tempId;
												if (i != selectLength - 1)
													idStr += ',';
												}
												Ext.Ajax.request({
														url : basepath+ '/XywzLogiGoodsAgentCorpMgmtAction!batchDestroy.json?idStr='+ idStr,
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
												detailXywzLogiGoodsAgentCorpMgmtForm.getForm().loadRecord(selectRe);
												detailXywzLogiGoodsAgentCorpMgmtWindow.show();
											}
										}
									},'-',new Com.yucheng.bob.ExpButton({
							            formPanel : 'searchCondition',
							            iconCls:'exportIconCss',
							            url : basepath+'/XywzLogiGoodsAgentCorpMgmtQueryAction.json'
							        })]
					});
			
			var detailXywzLogiGoodsAgentCorpMgmtForm = new Ext.form.FormPanel({
				labelWidth : 150,
				height : 150,
				frame : true,
				region : 'center',
				autoScroll : true,
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [{
					           columnWidth : .5,
					            layout : 'form',
					            items : [ {
					            xtype : 'textfield',
					            vtype : 'trim',
					            Width : '100',
					            name : 'agentNamr',
					            fieldLabel : '货代公司名称',
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
					            name : 'addr',
					            fieldLabel : '公司地址',
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
					            name : 'contactPer',
					            fieldLabel : '联系人名称',
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
					            name : 'contactPhone',
					            fieldLabel : '联系人固定电话',
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
					            name : 'contactMobile',
					            fieldLabel : '联系人手机',
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
					            name : 'contactEmail',
					            fieldLabel : '联系人email',
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
							detailXywzLogiGoodsAgentCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 新增窗口展示的from
			var addXywzLogiGoodsAgentCorpMgmtForm = new Ext.form.FormPanel({
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
					            name : 'agentId',
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
					            name : 'agentNum',
					            fieldLabel : '<font color=red>*</font>货代公司编号',
					            allowBlank : false,
					            blankText : '货代公司编号不能为空',
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
					            name : 'agentNamr',
					            fieldLabel : '<font color=red>*</font>货代公司名称',
					            allowBlank : false,
					            blankText : '货代公司名称不能为空',
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
					            name : 'addr',
					            fieldLabel : '<font color=red>*</font>公司地址',
					            allowBlank : false,
					            blankText : '公司地址不能为空',
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
					            name : 'contactPer',
					            fieldLabel : '<font color=red>*</font>联系人名称',
					            allowBlank : false,
					            blankText : '联系人名称不能为空',
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
					            name : 'contactPhone',
					            fieldLabel : '<font color=red>*</font>联系人固定电话',
					            allowBlank : false,
					            blankText : '联系人固定电话不能为空',
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
					            name : 'contactMobile',
					            fieldLabel : '<font color=red>*</font>联系人手机',
					            allowBlank : false,
					            blankText : '联系人手机不能为空',
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
					            name : 'contactEmail',
					            fieldLabel : '<font color=red>*</font>联系人email',
					            allowBlank : false,
					            blankText : '联系人email不能为空',
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
							if(!addXywzLogiGoodsAgentCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiGoodsAgentCorpMgmtAction.json',
								method : 'POST',
								form : addXywzLogiGoodsAgentCorpMgmtForm.getForm().id,
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
							
							addXywzLogiGoodsAgentCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							addXywzLogiGoodsAgentCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			// 修改窗口展示的from
			var editXywzLogiGoodsAgentCorpMgmtForm = new Ext.form.FormPanel({
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
					            name : 'agentId',
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
					            name : 'agentNum',
					            fieldLabel : '<font color=red>*</font>货代公司编号',
					            allowBlank : false,
					            blankText : '货代公司编号不能为空',
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
					            name : 'agentNamr',
					            fieldLabel : '<font color=red>*</font>货代公司名称',
					            allowBlank : false,
					            blankText : '货代公司名称不能为空',
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
					            name : 'addr',
					            fieldLabel : '<font color=red>*</font>公司地址',
					            allowBlank : false,
					            blankText : '公司地址不能为空',
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
					            name : 'contactPer',
					            fieldLabel : '<font color=red>*</font>联系人名称',
					            allowBlank : false,
					            blankText : '联系人名称不能为空',
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
					            name : 'contactPhone',
					            fieldLabel : '<font color=red>*</font>联系人固定电话',
					            allowBlank : false,
					            blankText : '联系人固定电话不能为空',
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
					            name : 'contactMobile',
					            fieldLabel : '<font color=red>*</font>联系人手机',
					            allowBlank : false,
					            blankText : '联系人手机不能为空',
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
					            name : 'contactEmail',
					            fieldLabel : '<font color=red>*</font>联系人email',
					            allowBlank : false,
					            blankText : '联系人email不能为空',
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
							if(!editXywzLogiGoodsAgentCorpMgmtForm.getForm().isValid())
							{ 
								Ext.Msg.alert('提示','输入格式有误，请重新输入!');
								return false;
							}
							Ext.Ajax.request({
								url : basepath + '/XywzLogiGoodsAgentCorpMgmtAction.json',
								method : 'POST',
								form : editXywzLogiGoodsAgentCorpMgmtForm.getForm().id,
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
							
							editXywzLogiGoodsAgentCorpMgmtWindow.hide();
						}
					}, {
						text : '取  消',
						handler : function() {
							editXywzLogiGoodsAgentCorpMgmtWindow.hide();
						}
					} ]
				} ]
			});

			var detailXywzLogiGoodsAgentCorpMgmtWindow = new Ext.Window({
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
				items : [ detailXywzLogiGoodsAgentCorpMgmtForm ]
			});
			// 定义新增窗口
			var addXywzLogiGoodsAgentCorpMgmtWindow = new Ext.Window({
				title : '货代公司新增',
				plain : true,
				layout : 'fit',
				width : 800,
				height :260,
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
				items : [ addXywzLogiGoodsAgentCorpMgmtForm ]
			});

			// 定义修改窗口
			var editXywzLogiGoodsAgentCorpMgmtWindow = new Ext.Window({
				title : '货代公司修改',
				plain : true,
				layout : 'fit',
				width : 880,
				height : 260,
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
				items : [ editXywzLogiGoodsAgentCorpMgmtForm ]
			});
			

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				title : '货代公司信息列表',
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