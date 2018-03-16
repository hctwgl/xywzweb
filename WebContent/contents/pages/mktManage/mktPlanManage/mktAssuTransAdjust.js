/**
 * 营销管理-->营销任务管理：任务下达和任务调整功能JS，wzy，2013-05-06
 */
// 下达任务，支持批量下达
function transTask(listPanel_in, store_in) {
	var checkedNodes = listPanel_in.getSelectionModel().selections.items;
	var selectLength = listPanel_in.getSelectionModel().getSelections().length;
	// 选中的任务ID对象
	var json = {
		'id' : []
	};
	// 1、判断是否选择了要下达的任务
	if (selectLength < 1) {
		Ext.Msg.alert('提示', '请选择需要下达的记录！');
		return false;
	}
	// 2、判断选中的任务是否全是“暂存”状态，判断当前用户是否是任务创建人
	for (var i = 0; i < checkedNodes.length; i++) {
		// 2.1、判断状态
		if (checkedNodes[i].data.taskStat != "暂存") {
			Ext.Msg.alert('提示', '只能下达【暂存】状态的营销任务！');
			return false;
		}
		// 2.2、判断创建人是否是当前用户
		if (checkedNodes[i].data.createUser != __userId) {
			Ext.Msg.alert('提示', '您选择的任务中，有不是您创建的，不能提交！');
			return false;
		}
		json.id.push(checkedNodes[i].data.taskId);// 增加选中的任务ID
	}
	Ext.MessageBox.confirm('提示', '您确定要下达选中的任务吗？', function(buttonId) {
		if (buttonId.toLowerCase() == "no") {
			return false;
		}
		Ext.Ajax.request({
					url : basepath
							+ '/marketAssuTransAdjustAction!assuTrans.json',
					method : 'POST',
					params : {
						cbid : Ext.encode(json)
					},
					waitMsg : '正在保存数据,请等待...',
					success : function() {
						Ext.Msg.alert('提示', '操作成功！');
						store_in.reload();
					},
					failure : function(response) {
						var resultArray = Ext.util.JSON.decode(response.status);
						if (resultArray == 403) {
							Ext.Msg.alert('提示', response.responseText);
						} else {

							Ext.Msg.alert('提示', '操作失败，失败原因：'
											+ response.responseText);
							store_in.reload();
						}
					}
				});

	});
}

// 调整任务指标
var taskId = null;// 任务ID
function adjustTask(listPanel_in, store_in) {
	var checkedNodes = listPanel_in.getSelectionModel().selections.items;
	var selectLength = listPanel_in.getSelectionModel().getSelections().length;
	// 1、判断是否选择了要调整指标的任务
	if (selectLength < 1) {
		Ext.Msg.alert('提示', '请选择需要调整的记录！');
		return false;
	} else if (selectLength > 1) {
		Ext.Msg.alert('提示', '只能选择一条记录！');
		return false;
	}
	// 2、判断选中的任务是否全是“执行中”状态
	if (checkedNodes[0].data.taskStat != "执行中") {
		Ext.Msg.alert('提示', '只能调整【执行中】状态的营销任务！');
		return false;
	}
	// 3、判断创建人是否是当前用户
	if (checkedNodes[0].data.createUser != __userId) {
		Ext.Msg.alert('提示', '您不是任务的创建人，不能调整！');
		return false;
	}
	taskId = checkedNodes[0].data.taskId;// 选中的任务ID
	// 4、打开调整任务指标窗体
	addBusiOpporWindow.show();
	// 5、查询任务指标列表数据
	mktRelateTargetStore_adjust.reload({
				params : {
					start : 0,
					limit : parseInt(mktRelateTarget_combo_adjust.getValue())
				}
			});
}

var rowNo1_adjust = -1;
// 指标信息
var searchIndex_adjust = new Com.yucheng.crm.common.IndexField({
	xtype : 'userchoose',
	fieldLabel : '指标列表',
	id : 'searchIndex_adjust',
	name : 'searchIndex_adjust',
	hiddenName : 'searchIndex_adjust',
	labelStyle : 'text-align:right;',
	singleSelect : false,
	anchor : '90%',
	callback : function(a, b, c, d) {
		var mgr_namess = null;
		records1 = mktRelateTargetGrid_adjust.getSelectionModel().selection;
		var mgrIds1 = '';
		mgr_namess = Ext.getCmp('searchIndex_adjust').getValue();
		if (mgr_namess != null && mgr_namess != '') {
			mktRelateTargetStore_adjust.getAt(rowNo1_adjust).data.targetCode = this.ID;
			mktRelateTargetStore_adjust.getAt(rowNo1_adjust).data.targetName = this.NAME;
			mktRelateTargetStore_adjust.getAt(rowNo1_adjust).data.targetMark = this.CONTENT;
			mktRelateTargetGrid_adjust.getView().refresh(false);
		}
	}
});

var mktRelateTargetRecord_adjust = Ext.data.Record.create([{
			name : 'achievePercent',
			mapping : 'ACHIEVE_PERCENT'
		}, {
			name : 'targetNo',
			mapping : 'TARGET_NO'
		}, {
			name : 'targetCode',
			mapping : 'TARGET_CODE'
		}, {
			name : 'targetName',
			mapping : 'TARGET_NAME'
		}, {
			name : 'targetMark',
			mapping : 'TARGET_MARK'
		}, {
			name : 'originalValue',
			mapping : 'ORIGINAL_VALUE'
		}, {
			name : 'targetValue',
			mapping : 'TARGET_VALUE'
		}, {
			name : 'achieveValue',
			mapping : 'ACHIEVE_VALUE'
		}]);

// 读取jsonReader
var mktRelateTargetReader_adjust = new Ext.data.JsonReader({
			successProperty : 'success',
			idProperty : 'ID',
			totalProperty : 'json.count',
			root : 'json.data'
		}, mktRelateTargetRecord_adjust);

var mktRelateTargetStore_adjust = new Ext.data.Store({
			restful : true,
			proxy : new Ext.data.HttpProxy({
						url : basepath + '/marketassudetailinfo.json',
						method : 'get'
					}),
			reader : mktRelateTargetReader_adjust

		});

// 每页显示条数下拉选择框
var mktRelateTarget_combo_adjust = new Ext.form.ComboBox({
			name : 'pagesize',
			triggerAction : 'all',
			mode : 'local',
			store : new Ext.data.ArrayStore({
						fields : ['value', 'text'],
						data : [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'],
								[100, '100条/页'], [250, '250条/页'],
								[500, '500条/页']]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '100',
			resizable : true,
			width : 85
		});

// 指标信息store
mktRelateTargetStore_adjust.on('beforeload', function() {
			this.baseParams = {
				querysign : 'target',
				taskId : taskId
			};
		});

// 改变每页显示条数reload数据
mktRelateTarget_combo_adjust.on("select", function(comboBox) {
			mktRelateTargetBbar_adjust.pageSize = parseInt(mktRelateTarget_combo_adjust
					.getValue()), mktRelateTargetStore_adjust.reload({
						params : {
							start : 0,
							limit : parseInt(mktRelateTarget_combo_adjust
									.getValue())
						}
					});
		});

var mktRelateTargetBbar_adjust = new Ext.PagingToolbar({// gridTable 底部工具栏
	pageSize : parseInt(mktRelateTarget_combo_adjust.getValue()),
	store : mktRelateTargetStore_adjust,
	displayInfo : true,
	displayMsg : '显示{0}条到{1}条,共{2}条',
	emptyMsg : "没有符合条件的记录",
	items : ['-', '&nbsp;&nbsp;', mktRelateTarget_combo_adjust]
});

var mktRelateTargetSm_adjust = new Ext.grid.CheckboxSelectionModel();

// 定义自动当前页行号
var prod_rownum_adjust = new Ext.grid.RowNumberer({
			header : 'No.',
			width : 28
		});

var mktRelateTargetColumns_adjust = new Ext.grid.ColumnModel({
			columns : [{
						header : 'ID',
						width : 100,
						hidden : true,
						dataIndex : 'targetNo',
						sortable : true,
						editor : new Ext.form.Field()
					}, {
						header : '指标编号',
						width : 200,
						hidden : true,
						dataIndex : 'targetCode',
						sortable : true
					}, {
						header : '指标名称',
						width : 200,
						dataIndex : 'targetName',
						sortable : true,
						editor : searchIndex_adjust
					}, {
						header : '指标描述',
						width : 200,
						dataIndex : 'targetMark',
						sortable : true,
						editor : new Ext.form.Field()
					}, {
						header : '初始值',
						width : 100,
						dataIndex : 'originalValue',
						sortable : true,
						renderer : money('0,000.00'),
						align : 'right',
						editor : new Ext.form.NumberField()
					}, {
						header : '目标值',
						width : 100,
						dataIndex : 'targetValue',
						sortable : true,
						renderer : money('0,000.00'),
						align : 'right',
						editor : new Ext.form.NumberField()
					}, {
						header : '达成值',
						width : 100,
						dataIndex : 'achieveValue',
						sortable : true,
						renderer : money('0,000.00'),
						align : 'right',
						editor : new Ext.form.NumberField()
					}, {
						header : '达成率',
						width : 100,
						dataIndex : 'achievePercent',
						sortable : true,
						align : 'right',
						editor : new Ext.form.NumberField()
					}]
		});

var taskAdd_adjust = function() {
	var u = new mktRelateTargetStore_adjust.recordType({
				"targetNo" : "",
				"targetCode" : "",
				"targetName" : "",
				"targetMark" : "",
				"originalValue" : "",
				"targetValue" : "",
				"achieveValue" : "",
				"achievePercent" : ""
			});
	mktRelateTargetGrid_adjust.stopEditing();
	mktRelateTargetStore_adjust.insert(0, u);
	mktRelateTargetGrid_adjust.startEditing(0, 0);
};

var onDelete_adjust = function() {
	var index = mktRelateTargetGrid_adjust.getSelectionModel()
			.getSelectedCell();
	if (!index) {
		Ext.Msg.alert('提示', '请先选择一条记录！');
		return false;
	}
	Ext.MessageBox.confirm('提示', '您确定要删除吗？', function(buttonId) {
				if (buttonId.toLowerCase() == "no") {
					return false;
				}
				var rec = mktRelateTargetStore_adjust.getAt(index[0]);
				mktRelateTargetStore_adjust.remove(rec);
			});
};

var mktRelateTargetGrid_adjust = new Ext.grid.EditorGridPanel({
			tbar : [{
						text : '新增',
						iconCls : 'addIconCss',
						handler : function() {
							mktRelateTargetInfo_adjust.buttons[0]
									.setDisabled(false);
							taskAdd_adjust();
						}
					}, '-', {
						text : '删除',
						iconCls : 'deleteIconCss',
						handler : function() {
							mktRelateTargetInfo_adjust.buttons[0]
									.setDisabled(false);
							onDelete_adjust();
						},
						scope : this
					}],
			store : mktRelateTargetStore_adjust,
			frame : true,
			height : 300,
			stripeRows : true,
			clicksToEdit : 1,
			cm : mktRelateTargetColumns_adjust,
			// sm:mktRelateTargetSm_adjust,
			bbar : mktRelateTargetBbar_adjust,
			viewConfig : {}
		});

// 获取编辑的行数，从0开始，
mktRelateTargetGrid_adjust.on('cellclick', function(grid, row, col) {
			rowNo1_adjust = row;
		});

var mktRelateTargetInfo_adjust = new Ext.Panel({
			autoScroll : true,
			height : 300,
			id : 'info3',
			layout : 'fit',
			items : [mktRelateTargetGrid_adjust],
			buttonAlign : 'center',
			buttons : [{
				text : '保存',
				handler : function() {
					var json0 = {
						'targetNo' : []
					};
					var json1 = {
						'targetCode' : []
					};
					var json2 = {
						'originalValue' : []
					};
					var json3 = {
						'targetValue' : []
					};
					var json4 = {
						'achieveValue' : []
					};
					var json5 = {
						'achievePercent' : []
					};
					for (var i = 0; i < mktRelateTargetStore_adjust.getCount(); i++) {
						var temp = mktRelateTargetStore_adjust.getAt(i);
						if (temp.data.targetCode != '') {
							json0.targetNo.push(temp.data.targetNo);
							json1.targetCode.push(temp.data.targetCode);
							json2.originalValue.push(temp.data.originalValue);
							json3.targetValue.push(temp.data.targetValue);
							json4.achieveValue.push(temp.data.achieveValue);
							json5.achievePercent.push(temp.data.achievePercent);
						} else {
							Ext.Msg.alert('提示', '请选择指标!');
							return false;
						}
					}
					Ext.Msg.wait('正在保存，请稍后......', '提示');
					Ext.Ajax.request({
								url : basepath
										+ '/marketassudetailinfo!saveData.json',
								method : 'POST',
								waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
								params : {
									'targetNo' : Ext.encode(json0),
									'targetCode' : Ext.encode(json1),
									'originalValue' : Ext.encode(json2),
									'targetValue' : Ext.encode(json3),
									'achieveValue' : Ext.encode(json4),
									'achievePercent' : Ext.encode(json5),
									'taskId' : taskId,
									'querysign' : 'target'
								},
								success : function() {
									Ext.Msg.alert('提示', '操作成功！');
								},
								failure : function(response) {
									Ext.Msg.alert('提示', '操作失败，失败原因：'
													+ response.responseText);
								}
							});
				}
			}, {
				text : '重置',
				handler : function() {
					mktRelateTargetStore_adjust.reload({
								params : {
									start : 0,
									limit : parseInt(mktRelateTarget_combo_adjust
											.getValue())
								}
							});
				}
			}, {
				text : '关闭',
				handler : function() {
					addBusiOpporWindow.hide();
				}
			}]
		});

// 定义任务指标调整窗口
var addBusiOpporWindow = new Ext.Window({
			title : '指标调整',
			plain : true,
			layout : 'fit',
			width : 850,
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
			items : [mktRelateTargetInfo_adjust]
		});