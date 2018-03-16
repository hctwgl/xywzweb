Ext
		.onReady(function() {
			Ext.QuickTips.init();
			/** ************************************************************* */
			var today = new Date();
			var year = today.getYear();
			var mon = today.getMonth() + 1;
			var day = today.getDate();
			/** ******************************************************************************** */
			var remindType;
			/** ************************************************************************************** */
			var panel2 = new Ext.FormPanel(
					{
						frame : true,
						bodyStyle : 'padding:5px 5px 0',
						title : '<span style="font-weight:normal">信息提醒</span>',
						width : '100%',
						height : 380,
						items : [ {
							autoHeight : true,
							items : [
									{
										layout : 'column',
										buttonAlign : 'center',
										items : [
												{
													columnWidth : .3,
													labelWidth : 100, // 标签宽度
													defaultType : 'textfield',
													layout : 'form',
													items : [
															{
																id : 'msgType',
																xtype : 'combo',
																name : 'MSG_TYP',
																hiddenName : 'MSG_TYP',
																fieldLabel : '提醒类型',
																labelStyle : 'text-align:right;',
																anchor : '100%',
																mode : 'local',
																// editable:false,
																triggerAction : 'all',
																resizable : true,
																readOnly : true,
																store : new Ext.data.Store(
																		{
																			autoLoad : true,
																			sortInfo : {
																				field : 'key',
																				direction : 'ASC'
																			},
																			proxy : new Ext.data.HttpProxy(
																					{
																						url : basepath
																								+ '/lookup.json?name=REMIND_TYPE',
																						method : 'GET'
																					}),
																			reader : new Ext.data.JsonReader(
																					{
																						root : 'JSON'
																					},
																					[
																							'key',
																							'value' ]),
																			fields : [
																					'key',
																					'value' ],
																			listeners : {
																				'load' : function() {
																					Ext
																							.getCmp(
																									'msgType')
																							.setValue(
																									Ext
																											.getCmp(
																													'msgType')
																											.getValue());
																				}
																			}
																		}),
																valueField : 'key',
																displayField : 'value'
															},
															{
																id : 'comp1',
																fieldLabel : '客户名称',
																name : 'CUST_NAME',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp2',
																fieldLabel : '开户日',
																name : 'KH_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp3',
																fieldLabel : '到期日',
																name : 'DQ_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp8',
																fieldLabel : '客户名称',
																name : 'CUST_NAME1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp10',
																fieldLabel : '账号',
																name : 'ACCT_NO',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp16',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp17',
																fieldLabel : '客户姓名',
																name : 'MANAGER_NAME',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp21',
																fieldLabel : '客户名称',
																name : 'CUST_NAME2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp25',
																fieldLabel : '账号',
																name : 'ACCT_NO1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp24',
																fieldLabel : '借款金额',
																name : 'JK_AMT',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp30',
																fieldLabel : '客户名称',
																name : 'CUST_NAME3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp31',
																fieldLabel : '账号',
																name : 'ACCT_NO2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp36',
																fieldLabel : '所属机构',
																name : 'ACCT_ORGNO1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp39',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp40',
																fieldLabel : '客户名称',
																name : 'CUST_NAME4',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp41',
																fieldLabel : '客户号',
																name : 'CUST_ID',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp42',
																fieldLabel : '证件类型',
																name : 'CREDIT_TYP',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp49',
																fieldLabel : '客户名称',
																name : 'CUST_NAME5',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																width : 250,
																anchor : '100%'
															},
															{
																id : 'comp57',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp52',
																fieldLabel : '借款金额',
																name : 'JK_AMT1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp58',
																fieldLabel : '卡号',
																name : 'CARD_NO',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp59',
																fieldLabel : '户名',
																name : 'ACCT_NAME',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp64',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO4',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp65',
																fieldLabel : '账号',
																name : 'ACCT_NO3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp66',
																fieldLabel : '用户姓名',
																name : 'MANAGER_NAME1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp70',
																fieldLabel : '客户姓名',
																name : 'MANAGER_NAME2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp71',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO5',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															} ]
												},
												{
													columnWidth : .3,
													labelWidth : 100, // 标签宽度
													defaultType : 'textfield',
													layout : 'form',
													items : [
															{
																fieldLabel : '提醒到期日',
																labelStyle : 'text-align:right;',
																name : 'MSG_END_DATE',
																readOnly : true,
																width : 150,
																anchor : '100%'
															},
															{
																id : 'comp4',
																fieldLabel : '余额',
																name : 'ACCT_BAL',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp7',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO6',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp11',
																fieldLabel : '借款金额',
																name : 'JK_AMT2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp14',
																fieldLabel : '余额',
																name : 'ACCT_BAL1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp15',
																fieldLabel : '应缴利息',
																name : 'YJLX',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp18',
																fieldLabel : '阴历生日',
																name : 'BIRTHDAY1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp20',
																fieldLabel : '阳历生日',
																name : 'BIRTHDAY2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp28',
																fieldLabel : '余额',
																name : 'ACCT_BAL2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp29',
																fieldLabel : '未还期数',
																name : 'WHQS',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp26',
																fieldLabel : '发放日',
																name : 'FF_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp32',
																fieldLabel : '交易金额',
																name : 'ACCT_AMT',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp33',
																fieldLabel : '账户余额',
																name : 'ACCT_BAL3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp34',
																fieldLabel : '交易日期',
																name : 'JY_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp43',
																fieldLabel : '证件号码',
																name : 'CUST_ZZDM',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp44',
																fieldLabel : '证件签发日期',
																name : 'ZJQF_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp45',
																fieldLabel : '证件到期日期',
																name : 'ZJDQ_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp53',
																fieldLabel : '发放日',
																name : 'FF_DATE1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp54',
																fieldLabel : '到期日',
																name : 'DQ_DATE1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp55',
																fieldLabel : '余额',
																name : 'ACCT_BAL4',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp60',
																fieldLabel : '透支金额',
																name : 'TZ_AMT',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp61',
																fieldLabel : '最后还款日',
																name : 'LAST_HK_DATE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp67',
																fieldLabel : '当前余额',
																name : 'ACCT_BAL5',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp68',
																fieldLabel : '最后一笔交易日期',
																name : 'JY_DATE1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp72',
																fieldLabel : '阴历生日',
																name : 'BIRTHDAY11',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp73',
																fieldLabel : '阳历生日',
																name : 'BIRTHDAY22',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															} ]
												},
												{
													columnWidth : .3,
													labelWidth : 100, // 标签宽度
													defaultType : 'textfield',
													layout : 'form',
													items : [
															{
																xtype : 'textfield',
																fieldLabel : '提醒剩余天数',
																labelStyle : 'text-align:right;',
																name : 'MSG_LAST',
																readOnly : true,
																allowDecimal : false,
																anchor : '100%'
															},
															{
																id : 'comp5',
																fieldLabel : '联系地址',
																name : 'ADDR',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp6',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp12',
																fieldLabel : '发放日',
																name : 'FF_DATE2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp13',
																fieldLabel : '到期日',
																name : 'DQ_DATE2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp9',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp19',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp27',
																fieldLabel : '到期日',
																name : 'DQ_DATE3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp22',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp23',
																fieldLabel : '联系地址',
																name : 'ADDR1',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp35',
																fieldLabel : '交易类型',
																name : 'JY_TYP',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp37',
																fieldLabel : '联系地址',
																name : 'ADDR2',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp38',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE4',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp46',
																fieldLabel : '签发国家',
																name : 'QFGJ',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp47',
																fieldLabel : '签发机构',
																name : 'QF_ORG',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp48',
																fieldLabel : '年检标识',
																name : 'NJBZ',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp56',
																fieldLabel : '欠息金额',
																name : 'QX_AMT',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp50',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE5',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp51',
																fieldLabel : '联系地址',
																name : 'ADDR3',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp62',
																fieldLabel : '联系地址',
																name : 'ADDR4',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp63',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE6',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp69',
																fieldLabel : '开户机构',
																name : 'ACCT_ORGNO7',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															},
															{
																id : 'comp74',
																fieldLabel : '联系电话',
																name : 'MANAGER_PHONE7',
																labelStyle : 'text-align:right;',
																readOnly : true,
																hidden : true,
																anchor : '100%'
															} ]
												} ]
									},
									{
										layout : 'column',
										items : [ {
											columnWidth : .9,
											labelWidth : 100, // 标签宽度
											layout : 'form',
											items : [ {
												fieldLabel : '提醒备注',
												readOnly : true,
												xtype : 'textarea',
												labelStyle : 'text-align:right;',
												name : 'MSG_REMARK',
												height : 200,
												anchor : '100%'
											} ]
										} ]
									} ]
						} ]
					});

			// 定义“转商机”按钮
			var busiButton = {
				text : '转商机',
				id : 'busiButton',
				hidden : true,
				handler : busiOpportAddWindowInit
			};

			// 定义“转工作任务”按钮
			var workTaskButton = {
				text : '转工作任务',
				id : 'workTaskButton',
				hidden : true,
				handler : openToWorkTaskWindow
			};

			// 定义“转呼叫中心”按钮
			var callCenterButton = {
				text : '转呼叫中心',
				id : 'callCenterButton',
				hidden : true,
				handler : callCenterWindowInit
			};

			function setButton() {
				// type 信息提醒类型
				var infoRecord = grid.getSelectionModel().getSelected();
				var type = infoRecord.data.MSG_TYP;
				if (type == "101" || type == "301" || type == "303"
						|| type == "304" || type == "304") {
					Ext.getCmp('busiButton').show();
				} else {
					Ext.getCmp('busiButton').hide();
				}
				if (type == "105" || type == "106" || type == "110") {
					Ext.getCmp('workTaskButton').show();
				} else {
					Ext.getCmp('workTaskButton').hide();
				}
				if (type == "101") {
					Ext.getCmp('callCenterButton').show();
				} else {
					Ext.getCmp('callCenterButton').hide();
				}
			}

			var addRoleWindow = new Ext.Window({
				// layout : 'fit',
				height : 450,
				width : 850,
				buttonAlign : 'center',
				draggable : true,// 是否可以拖动
				closable : true,// 是否可关闭
				modal : true,
				autoScroll : true,
				closeAction : 'hide',
				// iconCls : 'page_addIcon',
				// maximizable: true,
				// maximized:true,
				collapsible : true,// 是否可收缩
				titleCollapse : true,
				border : false,
				animCollapse : true,
				pageY : 20,
				// pageX : document.body.clientWidth / 2 - 420 / 2,
				animateTarget : Ext.getBody(),
				constrain : true,
				listeners : {
					beforeshow : setButton
				},
				items : [ panel2 ],
				buttons : [ busiButton, workTaskButton, callCenterButton, {
					text : '关 闭',
					handler : function() {
						addRoleWindow.hide();
					}
				} ]
			});

			/** ************************************************************************************** */
			/** *************************查询条件*************************************** */
			var qForm = new Ext.form.FormPanel(
					{
						id : 'qform',
						// title : '<span
						// style="font-weight:normal">查询条件<span>',
						border : true,
						region : 'north',
						// autoScroll : true,
						frame : true, // 是否渲染表单面板背景色
						labelAlign : 'middle', // 标签对齐方式
						// bodyStyle : 'padding:3 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 80,
						width : document.body.scrollWidth,
						items : [ {
							layout : 'column',
							border : false,
							items : [
									{
										columnWidth : .25,
										layout : 'form',
										labelWidth : 100, // 标签宽度
										defaultType : 'textfield',
										border : false,
										items : [ {
											id : 'msg_type',
											xtype : 'combo',
											name : 'MSG_TYP',
											hiddenName : 'MSG_TYP',
											fieldLabel : '提醒类型',
											labelStyle : 'text-align:right;',
											anchor : '100%',
											mode : 'local',
											// editable:false,
											triggerAction : 'all',
											resizable : true,
											store : new Ext.data.Store(
													{
														autoLoad : true,
														sortInfo : {
															field : 'key',
															direction : 'ASC'
														},
														proxy : new Ext.data.HttpProxy(
																{
																	url : basepath
																			+ '/lookup.json?name=REMIND_TYPE',
																	method : 'GET'
																}),
														reader : new Ext.data.JsonReader(
																{
																	root : 'JSON'
																},
																[ 'key',
																		'value' ]),
														fields : [ 'key',
																'value' ]
													}),
											valueField : 'key',
											displayField : 'value'
										} ]
									},
									{
										columnWidth : .25,
										layout : 'form',
										labelWidth : 100, // 标签宽度
										defaultType : 'textfield',
										border : false,
										items : [ {
											xtype : 'numberfield',
											fieldLabel : '剩余天数',
											labelStyle : 'text-align:right;',
											name : 'MSG_LAST',
											allowDecimal : false,
											anchor : '100%'
										}, {
											hidden : true,
											name : 'MSG_LAST_DATE',
											id : 'msgLastDate'
										} ]
									},
									{
										columnWidth : .25,
										layout : 'form',
										labelWidth : 100, // 标签宽度
										defaultType : 'textfield',
										border : false,
										items : [ {
											fieldLabel : '信息状态',
											hiddenName : 'MSG_STS',
											resizable : true,
											forceSelection : true,
											xtype : 'combo',
											labelStyle : 'text-align:right;',
											triggerAction : 'all',
											mode : 'local',
											store : new Ext.data.ArrayStore({
												fields : [ 'myId',
														'displayText' ],
												data : [ [ '1', '已阅读' ],
														[ '0', '未阅读' ] ]
											}),
											valueField : 'myId',
											displayField : 'displayText',
											emptyText : '请选择',
											anchor : '100%'
										} ]
									}, {
										columnWidth : .25,
										layout : 'form',
										labelWidth : 100, // 标签宽度
										defaultType : 'textfield',
										border : false,
										items : [ {
											xtype : 'datefield',
											fieldLabel : '提醒到期日',
											labelStyle : 'text-align:right;',
											name : 'MSG_END_DATE',
											format : 'Y-m-d',
											allowDecimal : false,
											width : 150,
											anchor : '100%',
											editable : false

										} ]
									} ]
						} ],
						buttons : [
								{
									text : '查询',
									handler : function() {

										if (!qForm.getForm().isValid()) {
											Ext.Msg.alert('输入有误');
											return false;
										}
										var remainDay = qForm.getForm()
												.findField('MSG_LAST').value;
										if (remainDay != ''
												&& remainDay != undefined) {
											var remindDay = new Date(year,
													mon - 1,
													day + parseInt(remainDay))
													.format('Y-m-d');
											Ext.getCmp('msgLastDate').setValue(
													remindDay);
										}
										// debugger;
										var conditionStr = qForm.getForm()
												.getFieldValues();
										store.on('beforeload', function() {
											this.baseParams = {
												"condition" : Ext
														.encode(conditionStr)
											};
										});
										store.reload({
											params : {
												start : 0,
												limit : bbar.pageSize
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
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([
					rownum,
					sm,
					{
						header : 'ID',
						dataIndex : 'ID',
						hidden : true
					},
					{
						header : '提醒类型',
						dataIndex : 'MSG_TYP_ORA',
						sortable : true,
						align : 'left',
						width : 170
					},
					{
						id : 'row1',
						header : '客户名称',
						dataIndex : 'CUST_NAME',
						sortable : true,
						align : 'left',
						width : 250,
						hidden : false
					},
					{
						id : 'row2',
						header : '客户号',
						dataIndex : 'CUST_ID',
						sortable : true,
						align : 'left'
					},
					{
						id : 'row3',
						header : '账号',
						dataIndex : 'ACCT_NO',
						sortable : true,
						align : 'left'
					},
					{
						id : 'row4',
						header : '客户姓名',
						dataIndex : 'MANAGER_NAME',
						sortable : true,
						align : 'left'
					},
					{
						header : '信息状态',
						dataIndex : 'MSG_STS',
						sortable : true,
						align : 'left',
						renderer : function(value) {
							if (value == 1)
								value = '已阅读';
							else
								value = '未阅读';
							return value;
						}
					},
					{
						header : '提醒剩余天数',
						dataIndex : 'MSG_LAST',
						sortable : true,
						width : 110,
						align : 'right'
//						renderer : function(value) {
//							if (value != null && value != undefined) {
//								var today1 = new Date();
//								var value1 = new Date(value.split('-')[0],
//										value.split('-')[1] - 1, value
//												.split('-')[2]);
//								value = value1.format('z') - today1.format('z')
//										+ (value1.format('Y') - year)
//										* (365 + today1.format('L'));// 提醒提前日期不可能超过一年
//							} else
//								value = '未知';
//							return value;
//						}
					}, {
						header : '提醒到期日',
						dataIndex : 'MSG_END_DATE',
						sortable : true,
						width : 150,
						align : 'left'
					}, {
						header : '提醒备注',
						dataIndex : 'MSG_REMARK',
						sortable : true,
						align : 'left'
					}, {
						id : 'row5',
						header : '开户日',
						dataIndex : 'KH_DATE',
						sortable : true,
						align : 'left'
					}, // new added
					{
						id : 'row6',
						header : '到期日',
						dataIndex : 'DQ_DATE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row29',
						header : '账户余额',
						dataIndex : 'ACCT_BAL',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row7',
						header : '联系地址',
						dataIndex : 'ADDR',
						sortable : true,
						align : 'left'
					}, {
						id : 'row8',
						header : '联系电话',
						dataIndex : 'MANAGER_PHONE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row9',
						header : '开户机构',
						dataIndex : 'ACCT_ORGNO',
						sortable : true,
						align : 'left'
					}, {
						id : 'row10',
						header : '借款金额',
						dataIndex : 'JK_AMT',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row11',
						header : '发放日',
						dataIndex : 'FF_DATE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row12',
						header : '应缴利息',
						dataIndex : 'YJLX',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row13',
						header : '未还期数',
						dataIndex : 'WHQS',
						sortable : true,
						align : 'left'
					}, {
						id : 'row14',
						header : '欠息金额',
						dataIndex : 'QX_AMT',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row30',
						header : '交易金额',
						dataIndex : 'ACCT_AMT',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row15',
						header : '交易日期',
						dataIndex : 'JY_DATE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row16',
						header : '交易类型',
						dataIndex : 'JY_TYP',
						sortable : true,
						align : 'left'
					}, {
						id : 'row17',
						header : '阴历生日日期',
						dataIndex : 'BIRTHDAY1',
						sortable : true,
						align : 'left'
					}, {
						id : 'row18',
						header : '阳历生日日期',
						dataIndex : 'BIRTHDAY2',
						sortable : true,
						align : 'left'
					}, {
						id : 'row19',
						header : '证件类型',
						dataIndex : 'CREDIT_TYP',
						sortable : true,
						align : 'left'
					}, {
						id : 'row20',
						header : '证件号码',
						dataIndex : 'CUST_ZZDM',
						sortable : true,
						align : 'left'
					}, {
						id : 'row21',
						header : '证件签发日期',
						dataIndex : 'ZJQF_DATE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row22',
						header : '证件到期日期',
						dataIndex : 'ZJDQ_DATE',
						sortable : true,
						align : 'left'
					}, {
						id : 'row23',
						header : '签发国家',
						dataIndex : 'QFGJ',
						sortable : true,
						align : 'left'
					}, {
						id : 'row24',
						header : '签发机构',
						dataIndex : 'QF_ORG',
						sortable : true,
						align : 'left'
					}, {
						id : 'row25',
						header : '年检标识',
						dataIndex : 'NJBZ',
						sortable : true,
						align : 'left'
					}, {
						id : 'row31',
						header : '户名',
						dataIndex : 'ACCT_NAME',
						sortable : true,
						align : 'left'
					}, {
						id : 'row26',
						header : '卡号',
						dataIndex : 'CARD_NO',
						sortable : true,
						align : 'left'
					}, {
						id : 'row27',
						header : '透支金额',
						dataIndex : 'TZ_AMT',
						sortable : true,
						align : 'right',
						renderer : money('0,000.00')
					}, {
						id : 'row28',
						header : '最后还款日',
						dataIndex : 'LAST_HK_DATE',
						sortable : true,
						align : 'left'
					} ]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy(
						{
							url : basepath + '/queryremindlist.json',
							method : 'POST',
							failure : function(response) {
								var resultArray = Ext.util.JSON
										.decode(response.status);
								if (resultArray == 403) {
									Ext.Msg.alert('提示', response.responseText);
								}
							}
						}),
				reader : new Ext.data.JsonReader({
					successProperty : 'success',
					root : 'json.data',
					totalProperty : 'json.count'
				}, [ {
					name : 'ID'
				}, {
					name : 'MSG_TYP'
				}, {
					name : 'MSG_STS'
				}, {
					name : 'MSG_TYP_ORA'
				}, {
					name : 'CUST_ID'
				}, {
					name : 'CUST_NAME'
				}, {
					name : 'CUST_NAME1',
					mapping : 'CUST_NAME'
				}, {
					name : 'CUST_NAME2',
					mapping : 'CUST_NAME'
				}, {
					name : 'CUST_NAME3',
					mapping : 'CUST_NAME'
				}, {
					name : 'CUST_NAME4',
					mapping : 'CUST_NAME'
				}, {
					name : 'CUST_NAME5',
					mapping : 'CUST_NAME'
				}, {
					name : 'CUST_ZZDM'
				}, {
					name : 'ACCT_NO'
				}, {
					name : 'ACCT_NO1',
					mapping : 'ACCT_NO'
				}, {
					name : 'ACCT_NO2',
					mapping : 'ACCT_NO'
				}, {
					name : 'ACCT_NO3',
					mapping : 'ACCT_NO'
				}, {
					name : 'ACCT_NAME'
				}, {
					name : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO1',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO2',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO3',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO4',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO5',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO6',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_ORGNO7',
					mapping : 'ACCT_ORGNO'
				}, {
					name : 'ACCT_BAL'
				}, {
					name : 'ACCT_BAL1',
					mapping : 'ACCT_BAL'
				}, {
					name : 'ACCT_BAL2',
					mapping : 'ACCT_BAL'
				}, {
					name : 'ACCT_BAL3',
					mapping : 'ACCT_BAL'
				}, {
					name : 'ACCT_BAL4',
					mapping : 'ACCT_BAL'
				}, {
					name : 'ACCT_BAL5',
					mapping : 'ACCT_BAL'
				}, {
					name : 'ACCT_AMT'
				}, {
					name : 'MANAGER_NAME'
				}, {
					name : 'MANAGER_NAME1',
					mapping : 'MANAGER_NAME'
				}, {
					name : 'MANAGER_NAME2',
					mapping : 'MANAGER_NAME'
				}, {
					name : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE1',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE2',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE3',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE4',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE5',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE6',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'MANAGER_PHONE7',
					mapping : 'MANAGER_PHONE'
				}, {
					name : 'EVENT_NAME'
				}, {
					name : 'MSG_END_DATE'
				}, {
					name : 'MSG_LAST'
				}, {
					name : 'MSG_REMARK'
				}, {
					name : 'USER_NO'
				}, {
					name : 'MSG_CRT_DATE'
				}, {
					name : 'READ_DATE'
				}, {
					name : 'USER_UNITID'
				}, {
					name : 'KH_DATE'
				},// new added
				{
					name : 'DQ_DATE'
				}, {
					name : 'DQ_DATE1',
					mapping : 'DQ_DATE'
				}, {
					name : 'DQ_DATE2',
					mapping : 'DQ_DATE'
				}, {
					name : 'DQ_DATE3',
					mapping : 'DQ_DATE'
				}, {
					name : 'ADDR'
				}, {
					name : 'ADDR1',
					mapping : 'ADDR'
				}, {
					name : 'ADDR2',
					mapping : 'ADDR'
				}, {
					name : 'ADDR3',
					mapping : 'ADDR'
				}, {
					name : 'ADDR4',
					mapping : 'ADDR'
				}, {
					name : 'ACCT_ORGNO'
				}, {
					name : 'KH_ORG'
				}, {
					name : 'JK_AMT'
				}, {
					name : 'JK_AMT1',
					mapping : 'JK_AMT'
				}, {
					name : 'JK_AMT2',
					mapping : 'JK_AMT'
				}, {
					name : 'FF_DATE'
				}, {
					name : 'FF_DATE1',
					mapping : 'FF_DATE'
				}, {
					name : 'FF_DATE2',
					mapping : 'FF_DATE'
				}, {
					name : 'YJLX'
				}, {
					name : 'WHQS'
				}, {
					name : 'QX_AMT'
				}, {
					name : 'JY_DATE'
				}, {
					name : 'JY_DATE1',
					mapping : 'JY_DATE'
				}, {
					name : 'JY_TYP'
				}, {
					name : 'BIRTHDAY1'
				}, {
					name : 'BIRTHDAY2'
				}, {
					name : 'BIRTHDAY11',
					mapping : 'BIRTHDAY1'
				}, {
					name : 'BIRTHDAY22',
					mapping : 'BIRTHDAY2'
				}, {
					name : 'CREDIT_TYP'
				}, {
					name : 'CREDIT_NO'
				}, {
					name : 'ZJQF_DATE'
				}, {
					name : 'ZJDQ_DATE'
				}, {
					name : 'QFGJ'
				}, {
					name : 'QF_ORG'
				}, {
					name : 'NJBZ'
				}, {
					name : 'CARD_NO'
				}, {
					name : 'TZ_AMT'
				}, {
					name : 'LAST_HK_DATE'
				} ])
			});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
				items : [ {
					text : '查看详细信息',
					iconCls : 'editIconCss',
					handler : function() {
						viewInit();
					}

				}, '-', {
					text : '设为已读',
					iconCls : 'ReadIconCss',
					handler : function() {
						read();
					}

				} ]
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
				// editable : false,
				width : 85
			});
			var number = parseInt(pagesize_combo.getValue());
			// 改变每页显示条数reload数据
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(comboBox.getValue());
				number = parseInt(comboBox.getValue());
				store.reload({
					params : {
						start : 0,
						limit : bbar.pageSize
					}
				});
			});
			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				// plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				height : document.body.scrollHeight - 107,
				width : document.body.scrollWidth,
				frame : true,
				autoScroll : true,
				region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
				store : store, // 数据存储
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
				tbar : tbar, // 表格工具栏
				bbar : bbar,// 分页工具栏
				viewConfig : {
				// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				// forceFit : true
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});

			// 拖动IE时.翻页条自适应
			Ext.EventManager.onWindowResize(function() {
				grid.setHeight(document.body.scrollHeight - 107);
				grid.setWidth(document.body.scrollWidth);
				grid.getView().refresh();
			});
			var mainPanel = new Ext.Viewport({
				layout : 'fit',
				frame : true,
				items : [ {
					title : '信息提醒查询',
					layout : 'border',
					items : [ qForm, grid ]
				} ]
			});
			/** ******************************************************* */
			// 根据不同的提醒类型展示不同的form
			function showForm(type) {
				for ( var i = 1; i < 75; i++) {
					var comp = 'comp' + i;
					// addRoleWindow.findById(comp).hidden=true;
					addRoleWindow.findById(comp).hide();
				}
				if (type != undefined && type != null && type != '') {
					if (type == 101) {
						for ( var i = 1; i < 8; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 102) {
						for ( var i = 8; i < 17; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 103) {
						for ( var i = 17; i < 21; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 104) {
						for ( var i = 21; i < 30; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 105) {
						for ( var i = 30; i < 40; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 106) {
						for ( var i = 40; i < 49; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 107) {
						for ( var i = 49; i < 58; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 108) {
						for ( var i = 58; i < 65; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 109) {
						for ( var i = 65; i < 70; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else if (type == 110) {
						for ( var i = 70; i < 75; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					} else {
						for ( var i = 70; i < 75; i++) {
							var comp = 'comp' + i;
							// addRoleWindow.findById(comp).hidden=false;
							addRoleWindow.findById(comp).show();
						}
					}
				}
			}
			/** ******************************************************* */
			grid.on('rowdblclick', function(grid, rowIndex, event) {
				viewInit();
			});
			function viewInit() {
				var selectLength = grid.getSelectionModel().getSelections().length;

				if (selectLength > 1) {
					Ext.Msg.alert('请选择一条记录!');
				} else {
					var infoRecord = grid.getSelectionModel().getSelected();
					if (infoRecord == null || infoRecord == '') {
						Ext.Msg.alert('提示', '请选择一行数据');
					} else {
						panel2.getForm().loadRecord(infoRecord);
						var value = infoRecord.data.MSG_END_DATE;
						if (value != null && value != undefined) {
							var today1 = new Date();
							var value1 = new Date(value.split('-')[0], value
									.split('-')[1] - 1, value.split('-')[2]);
							value = value1.format('z') - today1.format('z')
									+ (value1.format('Y') - year)
									* (365 + today1.format('L'));// 提醒提前日期不可能超过一年
						} else
							value = '未知';
						panel2.getForm().findField('MSG_LAST').setValue(value);

						// type 信息提醒类型
						var type = infoRecord.data.MSG_TYP;
						showForm(type);
						// addRoleWindow.removeAll(false);
						// addRoleWindow.add({items:[panel2]});
						// panel2.doLayout();
						// addRoleWindow.doLayout();
						addRoleWindow.show();
					}
				}
			}

			function read() {
				var selectLength = grid.getSelectionModel().getSelections().length;

				if (selectLength < 1) {
					Ext.Msg.alert('提示', '请选择需要设为已读的记录!');
				}

				else {
					Ext.MessageBox
							.confirm(
									'提示',
									'确定设为已读吗?',
									function(buttonId) {
										if (buttonId.toLowerCase() == "no") {
											return;
										}
										var selectRe;
										var tempId;
										var idStr = '';
										for ( var i = 0; i < selectLength; i++) {
											selectRe = grid.getSelectionModel()
													.getSelections()[i];
											tempId = selectRe.data.ID;
											idStr += tempId;
											if (i != selectLength - 1)
												idStr += ',';
										}
										Ext.Ajax
												.request({
													url : basepath
															+ '/workplatremindlist!read.json?idStr='
															+ idStr,
													method : 'POST',
													waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
													success : checkResult,
													failure : checkResult
												});

									});
				}
			}

			function checkResult(response) {
				var resultArray = Ext.util.JSON.decode(response.status);
				var resultError = response.responseText;
				//        
				if ((resultArray == 200 || resultArray == 201)
						&& resultError == '') {
					Ext.Msg.alert('提示', '操作成功');
					store.reload({
						params : {
							start : 0,
							limit : bbar.pageSize
						}
					});
				} else {
					if (resultArray == 403) {
						Ext.Msg.alert('提示', response.responseText);
					} else {

						Ext.Msg.alert('提示', '操作失败,失败原因:' + resultError);
						store.reload({
							params : {
								start : 0,
								limit : bbar.pageSize
							}
						});
					}
				}
			}
			// 实现选择不同事件展现不同字段
			function showColumn(remindType) {
				debugger;
				if (remindType != undefined && remindType != null
						&& remindType != '') {
					for ( var i = 1; i < 32; i++) {
						var row = 'row' + i;
						cm.getColumnById(row).hidden = true;
					}

					if (remindType == 101) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row5').hidden = false;
						cm.getColumnById('row6').hidden = false;
						cm.getColumnById('row7').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.totalWidth = 1308;
					} else if (remindType == 102) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row3').hidden = false;
						cm.getColumnById('row10').hidden = false;
						cm.getColumnById('row11').hidden = false;
						cm.getColumnById('row6').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.getColumnById('row12').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.totalWidth = 1508;
					} else if (remindType == 103) {
						cm.getColumnById('row4').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row17').hidden = false;
						cm.getColumnById('row18').hidden = false;
						cm.totalWidth = 1008;
					} else if (remindType == 104) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row3').hidden = false;
						cm.getColumnById('row6').hidden = false;
						cm.getColumnById('row7').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row10').hidden = false;
						cm.getColumnById('row11').hidden = false;
						cm.getColumnById('row13').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.totalWidth = 1508;
					} else if (remindType == 105) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row3').hidden = false;
						cm.getColumnById('row7').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.getColumnById('row16').hidden = false;
						cm.getColumnById('row15').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.getColumnById('row30').hidden = false;
						cm.totalWidth = 1608;
					} else if (remindType == 106) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row2').hidden = false;
						cm.getColumnById('row23').hidden = false;
						cm.getColumnById('row24').hidden = false;
						cm.getColumnById('row25').hidden = false;
						cm.getColumnById('row19').hidden = false;
						cm.getColumnById('row20').hidden = false;
						cm.getColumnById('row21').hidden = false;
						cm.getColumnById('row22').hidden = false;
						cm.totalWidth = 1508;
					} else if (remindType == 107) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row10').hidden = false;
						cm.getColumnById('row11').hidden = false;
						cm.getColumnById('row14').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.getColumnById('row6').hidden = false;
						cm.getColumnById('row7').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.totalWidth = 1508;
					} else if (remindType == 108) {
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.getColumnById('row31').hidden = false;
						cm.getColumnById('row7').hidden = false;
						cm.getColumnById('row28').hidden = false;
						cm.getColumnById('row26').hidden = false;
						cm.getColumnById('row27').hidden = false;
						cm.totalWidth = 1308;
					} else if (remindType == 109) {
						cm.getColumnById('row15').hidden = false;
						cm.getColumnById('row29').hidden = false;
						cm.getColumnById('row3').hidden = false;
						cm.getColumnById('row4').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.totalWidth = 1108;
					} else if (remindType == 110) {
						cm.getColumnById('row1').hidden = false;
						cm.getColumnById('row8').hidden = false;
						cm.getColumnById('row9').hidden = false;
						cm.getColumnById('row17').hidden = false;
						cm.getColumnById('row18').hidden = false;
						cm.totalWidth = 1108;
					} else {
						for ( var i = 1; i < 32; i++) {
							var row = 'row' + i;
							cm.getColumnById(row).hidden = true;
						}
						cm.getColumnById('row1').hidden = false;
						cm.totalWidth = 1108;
					}
				} else {
					for ( var i = 1; i < 32; i++) {
						var row = 'row' + i;
						cm.getColumnById(row).hidden = true;
					}
					cm.getColumnById('row1').hidden = false;
					cm.totalWidth = 1108;
				}
				// cm.syncSize() ; //
			}
			/** ******************************************************* */
			var cb = Ext.getCmp('msg_type');
			// cb.addListener('select',function(){
			// alert(cb.getValue());
			// showColumn(cb.getValue());
			// });

			var msgSts = '';
			var remindTypes = '';
			if (window.location.href.split("msgTyp=")[1] != undefined) {
				remindType = window.location.href.split("msgTyp=")[1];
				remindTypes = remindType.split("&")[0];
				msgSts = 1;
				cb.setValue(remindTypes);
			}

			store.on('beforeload', function() {
				showColumn(cb.getValue());
			});

			store.load({
				params : {
					MSG_TYP : remindTypes,
					MSG_STS : msgSts,
					start : 0,
					limit : bbar.pageSize
				}
			});

			cb.store.load({
				callback : function() {
					cb.setValue(cb.getValue());
				}
			});

			// =====================================转工作任务==按钮功能定义=============================开始===========
			// 职能组下拉列表
			var groupIdStore = new Ext.data.Store({
				restful : true,
				sortInfo : {
					field : 'key',
					direction : 'ASC'
				},
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/lookup.json?name=GROUP_ID'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON',
					totalProperty : 'list'
				}, [ 'key', 'value' ])
			});

			// 完成状态下拉列表
			var finishStateStore = new Ext.data.Store({
				restful : true,
				sortInfo : {
					field : 'key',
					direction : 'ASC'
				},
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/lookup.json?name=FINISH_STATE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON',
					totalProperty : 'list'
				}, [ 'key', 'value' ])
			});

			var toWorkTaskForm = new Ext.FormPanel({
				formId : 'newNotice',
				frame : true,
				border : false,
				labelAlign : 'right',
				standardSubmit : false,
				layout : 'form',
				width : 530,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						labelWidth : 60,
						layout : 'form',
						items : [ new Com.yucheng.crm.common.OrgUserManage({
							xtype : 'userchoose',
							fieldLabel : '负责人',
							// id : 'burdenUser_1',
							labelStyle : 'text-align:right;',
							name : 'burdenUser',
							hiddenName : 'PUBLISHER',
							// searchRoleType:('127,47'), //指定查询角色属性
							searchType : 'SUBTREE',/*
													 * 指定查询机构范围属性
													 * SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH
													 * （所有父、祖机构）ALLORG（所有机构）
													 */
							singleSelect : true,
							anchor : '90%'
						}) ]
					}, {
						columnWidth : .5,
						labelWidth : 60,
						layout : 'form',
						items : [ new Com.yucheng.crm.common.OrgUserManage({
							xtype : 'userchoose',
							fieldLabel : '协办人',
							// id : 'assistUser_1',
							labelStyle : 'text-align:right;',
							name : 'assistUser',
							hiddenName : 'PUBLISHER',
							// searchRoleType:('127,47'), //指定查询角色属性
							searchType : 'SUBTREE',/*
													 * 指定查询机构范围属性
													 * SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH
													 * （所有父、祖机构）ALLORG（所有机构）
													 */
							singleSelect : true,
							anchor : '90%'
						}) ]
					}, {
						columnWidth : .5,
						layout : 'form',
						labelWidth : 60,
						defaultType : 'textfield',
						border : false,
						items : [ {
							// id : 'groupId_1',
							store : groupIdStore,
							xtype : 'combo',
							resizable : true,
							fieldLabel : '职能组',
							name : 'groupId',
							hiddenName : 'groupId',
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							typeAhead : true,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择',
							allowBlank : false,
							selectOnFocus : true,
							anchor : '90%'
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						labelWidth : 60,
						defaultType : 'textfield',
						border : false,
						items : [ {
							allowBlank : false,
							// id : 'wancheng_1',
							store : finishStateStore,
							xtype : 'combo',
							resizable : true,
							fieldLabel : '完成情况',
							name : 'finishState',
							hiddenName : 'finishState',
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							typeAhead : true,
							value : 1,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择',
							selectOnFocus : true,
							anchor : '90%'
						} ]
					} ]
				}, {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						labelWidth : 60,
						layout : 'form',
						items : {
							// id : 'start_Date',
							fieldLabel : '开始时间',
							xtype : 'datefield',
							format : 'Y-m-d',
							editable : false,
							name : 'startDate',
							anchor : '90%'
						}
					}, {
						columnWidth : .5,
						labelWidth : 60,
						layout : 'form',
						items : {
							// id : 'end_Date',
							xtype : 'datefield',
							resizable : true,
							// allowBlank : false,
							fieldLabel : '结束时间',
							name : 'endDate',
							format : 'Y-m-d',
							editable : false,
							anchor : '90%'
						}
					}, {// 特别注意：须放置隐藏域的主键
						name : 'id',
						xtype : 'hidden'
					} ]
				}, {
					layout : 'form',
					columnWidth : .5,
					labelWidth : 60,
					items : [ {
						// id : 'taskContent_1',
						name : 'taskContent',
						fieldLabel : '工作安排',
						xtype : 'textarea',
						width : 200,
						allowBlank : false,
						maxLength : 400,
						anchor : '95%'
					} ]
				} ]
			});

			var toWorkTaskWindow = new Ext.Window({
				// layout : 'fit',
				width : 550,
				height : 280,
				closable : true,
				resizable : true,
				draggable : true,
				closeAction : 'hide',
				title : '新增任务',
				collapsible : false,
				modal : true,
				animCollapse : false,
				maximizable : true,
				border : false,
				closable : true,
				animateTarget : Ext.getBody(),
				constrain : true,
				autoScroll : true,
				items : [ toWorkTaskForm ],
				buttonAlign : 'center',
				buttons : [ {
					text : '保存',
					handler : function() {
						Ext.MessageBox.alert('提示', '保存成功！');
						toWorkTaskWindow.hide();
					}
				}, {
					text : '清空',
					handler : function() {
						toWorkTaskForm.getForm().reset();
					}
				}, {
					text : '关闭',
					handler : function() {
						toWorkTaskWindow.hide();
					}
				} ],
				listeners : {
					'beforeshow' : function() {
						toWorkTaskForm.getForm().findField("burdenUser")
								.setValue(__userName);
					}
				}
			});

			function openToWorkTaskWindow() {
				toWorkTaskWindow.show();
			}
			// =====================================转工作任务==按钮功能定义=============================结束===========

			// =====================================转商机======按钮功能定义=============================开始===========
			// 客户选择组件
			var custSelectPartAdd = new Com.yucheng.bcrm.common.CustomerQueryField(
					{
						fieldLabel : '*客户名称',
						labelWidth : 100,
						name : 'custName',
						custtype : '',// 客户类型:1:对私,2:对公,不设默认全部
						custStat : '',// 客户状态:1:正式,2:潜在,不设默认全部
						singleSelected : true,// 单选复选标志
						editable : false,
						allowBlank : false,
						blankText : '此项为必填项，请检查！',
						anchor : '90%',
						hiddenName : 'custId',
						callback : function() {// 回调方法，给其它字段设置相关属性值
							// 客户类型
							addBusiOpporForm.form.findField('custCategory')
									.setValue(custSelectPartAdd.custtype);
							// 客户状态
							addBusiOpporForm.form.findField('custType')
									.setValue(custSelectPartAdd.custStat);
							// 客户联系人
							if (custSelectPartAdd.custtype == '1') {// 如果是对私客户，设置联系人
								addBusiOpporForm.form.findField(
										'custContactName').setValue(
										custSelectPartAdd.linkUser);
							} else if (custSelectPartAdd.custtype == '2') {// 如果是对公客户，弹出联系人选择框，供用户选择
								addBusiOpporForm.form.findField(
										'custContactName').setValue(
										custSelectPartAdd.linkUser);
							}
							// 主办客户经理
							addBusiOpporForm.form.findField('mainCustManager')
									.setValue(custSelectPartAdd.mgrName);
							// 主办机构
							addBusiOpporForm.form.findField('mainCustOrgname')
									.setValue(custSelectPartAdd.instName);
						}
					});

			var chanceTypeStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [ [ 2, '潜在客户' ], [ 1, '正式客户' ] ]
			});
			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

			var chanceCategoryStore = new Ext.data.ArrayStore({
				fields : [ 'key', 'value' ],
				data : [/* [1, '对私客户'], */[ 2, '对公客户' ] ]
			});

			var chanceStatStore = new Ext.data.Store({
				restful : true,
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
					url : basepath + '/lookup.json?name=BUSI_CHANCE_TYPE'
				}),
				reader : new Ext.data.JsonReader({
					root : 'JSON'
				}, [ 'key', 'value' ])
			});

			// 新增商机窗口From表单
			var addBusiOpporForm = new Ext.FormPanel({
				labelWidth : 100,
				height : 250,
				frame : true,
				autoScroll : true,
				labelAlign : 'right',
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '*商机名称',
							allowBlank : false,
							blankText : '此项为必填项，请检查！',
							name : 'opporName',
							anchor : '90%'
						}, new Com.yucheng.crm.common.ProductManage({
							xtype : 'productChoose',
							fieldLabel : '*商机产品',
							labelStyle : 'text-align:right;',
							name : 'prodName',
							hiddenName : 'prodId',
							singleSelect : false,
							allowBlank : false,
							blankText : '此项为必填项，请检查！',
							anchor : '90%'
						}), {
							xtype : 'datefield',
							fieldLabel : '*商机开始日期',
							format : 'Y-m-d',
							editable : true,
							name : 'opporStartDate',
							allowBlank : false,
							blankText : '此项为必填项，请检查！',
							anchor : '90%'
						}, {
							xtype : 'textfield',
							fieldLabel : '营销活动名称',
							name : 'mktActivName',
							anchor : '90%'
						}, custSelectPartAdd, new Ext.form.ComboBox({
							hiddenName : 'custType',
							fieldLabel : '客户状态',
							labelStyle : 'text-align:right;',
							triggerAction : 'all',
							store : chanceTypeStore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							emptyText : '请选择 ',
							resizable : true,
							readonly : true,
							anchor : '90%'
						}), {
							xtype : 'textfield',
							fieldLabel : '主办客户经理',
							name : 'mainCustManager',
							readonly : true,
							anchor : '90%'
						}, {
							xtype : 'numberfield',
							fieldLabel : '预计金额(元)',
							name : 'planAmount',
							labelStyle : 'text-align:right;',
							value : '0',
							anchor : '90%'
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							hiddenName : 'opporType',
							fieldLabel : '商机类型',
							labelStyle : 'text-align:right;',
							triggerAction : 'all',
							store : chanceStatStore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							emptyText : '请选择 ',
							resizable : true,
							anchor : '90%'
						}), {
							xtype : 'datefield',
							fieldLabel : '*商机有效期',
							format : 'Y-m-d',
							editable : true,
							name : 'opporDueDate',
							allowBlank : false,
							blankText : '此项为必填项，请检查！',
							anchor : '90%'
						}, {
							xtype : 'datefield',
							fieldLabel : '*商机完成日期',
							format : 'Y-m-d',
							editable : true,
							name : 'opporEndDate',
							allowBlank : false,
							blankText : '此项为必填项，请检查！',
							anchor : '90%'
						}, {
							xtype : 'textfield',
							fieldLabel : '营销任务指标',
							name : 'mktTargetId',
							anchor : '90%'
						}, new Ext.form.ComboBox({
							hiddenName : 'custCategory',
							fieldLabel : '客户类型',
							labelStyle : 'text-align:right;',
							triggerAction : 'all',
							store : chanceCategoryStore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							emptyText : '请选择 ',
							resizable : true,
							readonly : true,
							anchor : '90%'
						}), {
							xtype : 'textfield',
							fieldLabel : '客户联系人',
							name : 'custContactName',
							readonly : true,
							anchor : '90%'
						}, {
							xtype : 'textfield',
							fieldLabel : '主办机构',
							name : 'mainCustOrgname',
							readonly : true,
							anchor : '90%'
						}, {
							xtype : 'numberfield',
							fieldLabel : '费用预算(元)',
							name : 'planCost',
							value : '0',
							labelStyle : 'text-align:right;',
							anchor : '90%'
						} ]
					} ]
				}, {
					layout : 'form',
					items : [ {
						xtype : 'textarea',
						fieldLabel : '商机内容',
						name : 'opporContent',
						anchor : '95%'
					}, {
						xtype : 'textarea',
						fieldLabel : '商机备注',
						name : 'memo',
						anchor : '95%'
					} ]
				} ],
				buttons : [ {
					text : '保存',
					handler : saveAddBusiOppor
				}, {
					text : '提交',
					handler : submitAddBusiOppor
				}, {
					text : '关闭',
					handler : function() {
						addBusiOpporWindow.hide();
					}
				} ]
			});

			// 定义新增窗口
			var addBusiOpporWindow = new Ext.Window(
					{
						title : '商机新增',
						plain : true,
						layout : 'fit',
						width : 750,
						height : 440,
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
						constrain : true,
						items : [ addBusiOpporForm ],
						listeners : {
							"hide" : function() {
								addBusiOpporForm.getForm().reset();
							},
							"show" : function() {// 窗体显示时间，进行一些数据设置初始化操作
								addBusiOpporForm.getForm().reset();
								// 设置客户信息
								var infoRecord = grid.getSelectionModel()
										.getSelected();
								var custName = infoRecord.data.CUST_NAME;
								addBusiOpporForm.getForm()
										.findField("custName").setValue(
												custName);
							}
						}
					});

			// 保存商机
			// 对商机数据做临时存储，只控制必须输入“商机名称”，在提交时，判断必填项是否完全填写
			function saveAddBusiOppor() {
				Ext.Msg.alert('提示', '保存成功！');
				addBusiOpporWindow.hide();
			}

			// 提交商机
			function submitAddBusiOppor() {
				Ext.Msg.alert('提示', '提交成功！');
				addBusiOpporWindow.hide();
			}

			// 打开 新增商机 窗口
			function busiOpportAddWindowInit() {
				addBusiOpporWindow.show();
			}
			// =====================================转商机======按钮功能定义=============================结束===========

			// =====================================转呼叫中心==按钮功能定义=============================开始===========
			// 转呼叫中心窗口From表单
			var addCallCenterForm = new Ext.FormPanel({
				labelWidth : 100,
				height : 250,
				frame : true,
				autoScroll : true,
				labelAlign : 'right',
				buttonAlign : "center",
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '客户姓名',
							name : 'callCenterCustName',
							disabled : true,
							anchor : '90%'
						} ]
					}, {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'textarea',
							fieldLabel : '发送内容',
							name : 'callCenterContent',
							anchor : '90%'
						} ]
					} ]
				} ],
				buttons : [ {
					text : '发送',
					handler : sendCallCenter
				}, {
					text : '关闭',
					handler : function() {
						addCallCenterWindow.hide();
					}
				} ]
			});

			// 定义转呼叫中心窗口
			var addCallCenterWindow = new Ext.Window(
					{
						title : '转呼叫中心',
						plain : true,
						layout : 'fit',
						width : 550,
						height : 200,
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
						constrain : true,
						items : [ addCallCenterForm ],
						listeners : {
							"hide" : function() {
								addCallCenterForm.getForm().reset();
							},
							"show" : function() {// 窗体显示时间，进行一些数据设置初始化操作
								addCallCenterForm.getForm().reset();
								// 设置客户信息
								var infoRecord = grid.getSelectionModel()
										.getSelected();
								var custName = infoRecord.data.CUST_NAME;
								addCallCenterForm.getForm().findField(
										"callCenterCustName")
										.setValue(custName);
							}
						}
					});

			// 发送
			function sendCallCenter() {
				Ext.Msg.alert('提示', '发送成功！');
				addCallCenterWindow.hide();
			}

			// 打开 新增商机 窗口
			function callCenterWindowInit() {
				addCallCenterWindow.show();
			}
			// =====================================转呼叫中心==按钮功能定义=============================结束===========
		});