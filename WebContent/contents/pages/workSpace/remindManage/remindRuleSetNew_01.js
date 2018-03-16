/**
 * 提醒规则设置JS文件，wzy，20130314
 */

Ext.onReady(function() {
			Ext.QuickTips.init();
			// 提醒方式
			var remindTypeStore = util.form
					._store('/lookup.json?name=REMIND_MOD');
			remindTypeStore.load();
			// 是否启用
			var stsStore = util.form._store('/lookup.json?name=GROUP_STS');
			stsStore.load();
			// 客户级别
			var custLevStore = util.form._store('/lookup.json?name=P_CUST_LEV');
			custLevStore.load();

			// 提醒角色
			var roleStore;
			if (__roleType == 2) {
				roleStore = new Ext.data.ArrayStore({
					fields : [ 'key', 'value' ],
					data : [ [ '[公司]总行主管行长', '1001' ],
							[ '[公司]中心支行主管行长', '1006' ],
							[ '[公司]营销机构主管行长', '1010' ],
							[ '[公司]营销机构客户经理', '1014' ] ]
				});
			} else {
				roleStore = new Ext.data.ArrayStore(
						{
							fields : [ 'key', 'value' ],
							data : [ [ '[零售]理财中心业务主管', '1024' ],
									[ '[零售]理财中心理财经理', '1025' ],
									[ '[零售]网点业务主管', '1026' ],
									[ '[零售]网点客户经理', '1027' ] ]
						});
			}
			var accountExpireForm = null;

			var roleCombo = new Ext.form.ComboBox({
				fieldLabel : '提醒角色',
				name:'RULE_ROLE',
				hiddenName : 'RULE_ROLE',
				store : roleStore,
				labelStyle : 'text-align:right;',
				forceSelection : true,
				valueField : 'value',
				displayField : 'key',
				triggerAction : 'all',
				mode : 'local',
				editable : false,
				allowBlank : false,
				emptyText : '请选择',
				labelStyle : 'text-align:right;',
				anchor : '60%',
				listeners : {
					'select' : function(combo, record, index) {
						var sectionType = accountExpireForm.getForm().findField('SECTION_TYPE').getValue();
						accountExpireForm.getForm().load({
							restful : true,
							url : basepath + '/queryremindrule.json',
							method : 'GET',
							params : {
								'sectionType' : sectionType,
								'ruleRole' : record.data.value
							}
						});
					},
					'beforeselect' : function() {
						// 保存规则类型
						var sectionType = accountExpireForm.getForm().findField('SECTION_TYPE').getValue();
						// 重置
						accountExpireForm.form.reset();
						accountExpireForm.getForm().findField('SECTION_TYPE').setValue(sectionType);
						return true;
					}
				}
			});
			// --------------
			var ruleInfoRecord = new Ext.data.Record.create([ {
				name : 'RULE_ID',
				mapping : 'RULE_ID'
			}, {
				name : 'CHANGE_AMOUNT',
				mapping : 'CHANGE_AMOUNT'
			}, {
				name : 'BEFOREHEAD_DAY',
				mapping : 'BEFOREHEAD_DAY'
			}, {
				name : 'REMIND_MODE',
				mapping : 'REMIND_MODE'
			}, {
				name : 'THRESHHOLD',
				mapping : 'THRESHHOLD'
			}, {
				name : 'SECTION_TYPE',
				mapping : 'SECTION_TYPE'
			}, {
				name : 'CUST_LEVEL',
				mapping : 'CUST_LEVEL'
			}, {
				name : 'RULE_ROLE',
				mapping : 'RULE_ROLE'
			}, {
				name : 'IS_VALID',
				mapping : 'IS_VALID'
			} ,{
				name:'BASE_CUS_LEVEL',
				mapping:'BASE_CUS_LEVEL'
			}]);
			var ruleInfoReader = new Ext.data.JsonReader({// 读取json数据的panel
				idProperties : 'RULE_ID',
				root : 'json.data'
			}, ruleInfoRecord);

			accountExpireForm = new Ext.form.FormPanel({
				frame : true,
				reader : ruleInfoReader,
				labelWidth : 150,
				title : '账户到期类提醒规则设置',
				labelAlign : 'right',
				labelAlign : 'right',
				items : [ roleCombo,
				{
					xtype : 'fieldset',
					title : '提醒阀值设置',
					autoHeight : true,
					anchor : '100%',
					layout : 'form',
					items : [{
						fieldLabel : '基线客户层级',
						allowBlank : false,
						forceSelection : true,
						editable : false,
						xtype : 'combo',
						name : 'BASE_CUS_LEVEL',
						hiddenName : 'BASE_CUS_LEVEL',
						triggerAction : 'all',
						mode : 'local',
						store : custLevStore,
						valueField : 'key',
						displayField : 'value',
						emptyText : '请选择',
						anchor : '60%',
						hidden : false
					}  , {
						xtype : 'numberfield',
						fieldLabel : '变动金额(万)',
						minValue : 1,
						maxValue : 10000,
						allowDecimal : false,
						allowBlank : false,
						hidden : false,
						labelStyle : 'text-align:right;',
						name : 'CHANGE_AMOUNT',
						hiddenName : 'CHANGE_AMOUNT',
						anchor : '60%',
						hidden : true	
					}, {
						xtype : 'numberfield',
						fieldLabel : '提醒提前天数',
						blankText : '请输入提醒提前天数',
						maxValue : 90,
						minValue : 15,
						allowDecimal : false,
						allowBlank : false,
						labelStyle : 'text-align:right;',
						name : 'BEFOREHEAD_DAY',
						hiddenName : 'BEFOREHEAD_DAY',
						id:'BEFOREHEAD_DAY',
						anchor : '60%'
					}, {
						xtype : 'numberfield',
						fieldLabel : '提醒持续天数',
						blankText : '请输入提醒持续天数',
						maxValue : 90,
						minValue : 15,
						allowDecimal : false,
						allowBlank : false,
						labelStyle : 'text-align:right;',
						name : 'THRESHHOLD',
						hiddenName : 'THRESHHOLD',
						anchor : '60%'
					}, {
						fieldLabel : '提醒方式', // 标签
						allowBlank : false,
						forceSelection : true,
						editable : false,
						xtype : 'combo',
						name : 'REMIND_MODE',
						hiddenName : 'REMIND_MODE',
						triggerAction : 'all',
						mode : 'local',
						store : remindTypeStore,
						valueField : 'key',
						displayField : 'value',
						emptyText : '请选择',
						anchor : '60%'// 宽度百分比
					}, {
						fieldLabel : '启用状态', // 标签
						allowBlank : false,
						forceSelection : true,
						editable : false,
						xtype : 'combo',
						name : 'IS_VALID',
						hiddenName : 'IS_VALID',
						triggerAction : 'all',
						mode : 'local',
						store : stsStore,
						valueField : 'key',
						displayField : 'value',
						emptyText : '请选择',
						anchor : '60%'// 宽度百分比
					}, {
						xtype : 'textfield',
						fieldLabel : '事件类型', // 标签
						name : 'SECTION_TYPE',
						hiddenName : 'SECTION_TYPE',
						hidden : true
					}, {
						xtype : 'textfield',
						hiddenName : 'RULE_ID',
						hidden : true
					} ]
				} ]
			});

			var cardPanel = new Ext.Panel(
					{
						region : 'center',
						layout : 'fit',
						frame : true, // 渲染面板
						height : 300,
						width : 650,
						buttonAlign : 'center',
						items : [ accountExpireForm ],
						buttons : [
								{
									text : '保存',
									handler : function() {
										if (!accountExpireForm.getForm().isValid()) {
											Ext.Msg.alert('提示', '输入数据格式不正确');
											return;
										}
										debugger;
										Ext.Ajax.request({
													url : basepath+ '/workplatremindrule!saveData.json',
													method : 'POST',
													form : accountExpireForm.getForm().id,
													success : function() {
														Ext.Msg.alert('提示','保存成功');
													},
													failure : function() {
														Ext.Msg.alert('提示','保存失败');
													}
												});
									}
								},
								{
									text : '重置',
									handler : function() {
										// 保存规则类型
										var sectionType = accountExpireForm.getForm().findField('SECTION_TYPE').getValue();
										// 重置
										accountExpireForm.form.reset();
										accountExpireForm.getForm().findField('SECTION_TYPE').setValue(sectionType);
									}
								} ]
					});

			function showForm(nodeArra) {
				var childArray = [];
				if (Ext.isArray(nodeArra)) {
					Ext.each(nodeArra, function(a) {
						var node = {};
						node.leaf = true;
						node.id = a.key, node.text = a.value, childArray
								.push(node);
					});
				}
				var root = new Ext.tree.TreeNode({
					id : "root",
					text : "提醒规则类型",
					expanded : true
				});
				root.appendChild(childArray);
				var tree = new Ext.tree.TreePanel(
						{
							id : 'treePanel',
							region : 'west',
							root : root,
							width : 300,
							split : true,
							listeners : {
								'click' : function(node) {
									if (node.id == 'root') {
										return;
									}
									accountExpireForm.form.reset();
									accountExpireForm.setTitle(node.text);
									accountExpireForm.getForm().findField('SECTION_TYPE').setValue(node.id);
									// 隐藏所有的控件，除SECTION_TYPE和RULE_ID外
									var values = accountExpireForm.getForm().getValues(true);
									if (values != null && values != "") {
										var values_arr = values.split("&");
										if (values_arr != null&& values_arr.length > 0) {
											var fieldName = "";
											for ( var i = 0; i < values_arr.length; i++) {
												fieldName = values_arr[i].substring(0,values_arr[i].indexOf("="));
												if (fieldName != null&& fieldName != ""&&fieldName != "SECTION_TYPE"&&fieldName != "RULE_ID") {
													accountExpireForm.getForm().findField(fieldName).disable();
													accountExpireForm.getForm().findField(fieldName).hide();
												}
											}
										}
									}
									// 根据不同的情况，显示不同的字段
									var fields = null;
									if (node.id == '101') {// 客户生日提醒
										fields = "RULE_ROLE,BASE_CUS_LEVEL,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '102') {// 客户升降级提醒
										fields = "RULE_ROLE,BASE_CUS_LEVEL,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '301'|| node.id == '303'|| node.id == '302') {// 理财产品到期提醒/贷款产品到期提醒/定期存款到期
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '304') {// 客户账户大额变动提醒
										fields = "RULE_ROLE,CHANGE_AMOUNT,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '305') {// 贷款逾期提醒
										fields = "RULE_ROLE,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '103') {// 信用卡逾期提醒
										fields = "RULE_ROLE,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '104') {// 睡眠客户提醒
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '105') {// 未维护客户提醒
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									} else if (node.id == '106') {// 客户服务提醒
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									}else if (node.id == '107') {// 贷款欠息提醒
										fields = "RULE_ROLE,THRESHHOLD,REMIND_MODE,IS_VALID";
									} else if (node.id == '108') {// 日常工作任务提醒
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									} else if (node.id == '109') {// 商机提醒
										fields = "RULE_ROLE,THRESHHOLD,REMIND_MODE,IS_VALID";
									} else if (node.id == '110') {// 预约提醒
										fields = "RULE_ROLE,BEFOREHEAD_DAY,THRESHHOLD,REMIND_MODE,IS_VALID";
									}
									showField(fields,node.id);
								}
							}
						});

				// 表单默认界面数据设置
				accountExpireForm.setTitle(childArray[0].text);
				accountExpireForm.getForm().findField('SECTION_TYPE').setValue(childArray[0].id);
				if (childArray[0].id == '304') {
					accountExpireForm.getForm().findField('CHANGE_AMOUNT').show();
					accountExpireForm.getForm().findField('CHANGE_AMOUNT').enable();
				} else {
					accountExpireForm.getForm().findField('CHANGE_AMOUNT').hide();
					accountExpireForm.getForm().findField('CHANGE_AMOUNT').disable();
				}
				// ------- end
				new Ext.Viewport({
					layout : 'border',
					items : [ tree, cardPanel ]
				});

			}

			// 根据传入的字段集合（字段名称之间用英文逗号分隔），显示控件
			function showField(fields, id) {
				if (fields != null && fields != "") {
					var fields_arr = fields.split(",");
					if (fields_arr != null && fields_arr.length > 0) {
						var fieldName = null;
						for ( var i = 0; i < fields_arr.length; i++) {
							fieldName = fields_arr[i];
							if (fieldName != null && fieldName != "") {
								if(fieldName=='BEFOREHEAD_DAY'){
									if(id=='104'){
										Ext.DomQuery.selectNode('label[for=BEFOREHEAD_DAY]').innerHTML = '睡眠天数:';
										accountExpireForm.getForm().findField(fieldName).blankText = '请输入睡眠天数';
									}else if(id=='105'){
										Ext.DomQuery.selectNode('label[for=BEFOREHEAD_DAY]').innerHTML = '未维护天数:';
										accountExpireForm.getForm().findField(fieldName).blankText = '请输入未维护天数';
									}else{
										Ext.DomQuery.selectNode('label[for=BEFOREHEAD_DAY]').innerHTML = '提醒提前天数:';
										accountExpireForm.getForm().findField(fieldName).blankText = '请输入提醒提前天数';
									}
								}
								accountExpireForm.getForm().findField(fieldName).show();
								accountExpireForm.getForm().findField(fieldName).enable();
							}
							}
						}
					}
				}

			// 获取提醒规则类型
			Ext.Ajax
					.request({
						url : basepath
								+ '/lookup.json?name='
								+ (__roleType == 2 ? 'REMIND_COM_TYPE'
										: 'REMIND_TYPE'),
						method : 'GET',
						success : function(response) {
							var nodeArra = Ext.util.JSON
									.decode(response.responseText).JSON;
							showForm(nodeArra);

						},
						failure : function(a, b, c) {
						}
					});

		});