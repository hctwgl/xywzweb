 var executorRecord = Ext.data.Record.create(
    		[
    		 {name:'id',mapping:'ID'},
    		 {name:'createDate',mapping:'CREATE_DATE'},
    		 {name:'createUserId',mapping:'CREATE_USER_ID'},
    		 {name:'createUserName',mapping:'CREATE_USER_NAME'},
    		 {name:'operObjId',mapping:'OPER_OBJ_ID'},
    		 {name:'operObjName',mapping:'OPER_OBJ_NAME'},
    		 {name:'taskId',mapping:'TASK_ID'},
    		 {name:'distTaskType',mapping:'DIST_TASK_TYPE'}
    		 ]
    );
    var executorReader = new Ext.data.JsonReader(//读取jsonReader
    		{
    			successProperty : 'success',
    			idProperty : 'ID',
    			totalProperty : 'json.count',
    			root:'json.data'
    		},executorRecord
	);
	var executorStore = new Ext.data.Store({//产品对照关系store
	        restful : true, 
	        proxy : new Ext.data.HttpProxy({ 
	        	url:basepath+'/marketassudetailinfo.json',
	        	method:'get'
	        }),
			reader:executorReader
			
	});
	
    	executorStore.on('beforeload', function() {
    		this.baseParams = {
    			taskId:taskId,
    			querysign:'oper_obj'
    		};
    	});
	// 每页显示条数下拉选择框
	var executor_combo = new Ext.form.ComboBox({
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
		value : '100',
		resizable : true,
		width : 85
	});

	// 改变每页显示条数reload数据
	executor_combo.on("select", function(comboBox) {
		executorBbar.pageSize = parseInt(executor_combo.getValue()),
		executorStore.reload({
			params : {
				start : 0,
				limit : parseInt(executor_combo.getValue())
			}
		});
	});

	var executorBbar= new Ext.PagingToolbar({//gridTable 底部工具栏	
			pageSize : parseInt(executor_combo.getValue()),
			store : executorStore,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', executor_combo ]
	});
	// 定义自动当前页行号
	 var prod_rownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	    });
	 var executorColumns = new Ext.grid.ColumnModel(
				{
					columns:[prod_rownum,
					{ header:'ID',dataIndex:'id',sortable:true,hidden:true},
					{ header:'操作对象ID',dataIndex:'operObjId',sortable:true,hidden:true},
					{ header:'操作对象',dataIndex:'operObjName',sortable:true,width:100},
					{ header:'任务ID',dataIndex:'taskId',sortable:true,width:100,hidden:true},
					{ header:'任务类型',dataIndex:'distTaskType',width:100,sortable:true,hidden:true},
					{ header:'创建时间',dataIndex:'createDate',width:100,sortable:true},
					{ header:'创建人ID',dataIndex:'createUserId',width:100,sortable:true,hidden:true},
					{ header:'创建人',dataIndex:'createUserName',width:100,sortable:true}
					]
				}
	 );
//操作执行对象	 
var executorGrid = new Ext.grid.GridPanel({			
			store:executorStore, 
			frame:true,
			height : 300,
			cm:executorColumns,
			region:'center',
			      bbar:executorBbar,
			      viewConfig : {// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
	 			  },
	 			  loadMask : {
	 				  msg : '正在加载表格数据,请稍等...'
	 			  }
	 });

var targetRecord = Ext.data.Record.create(
		[
		 {name:'achievePercent',mapping:'ACHIEVE_PERCENT'},
		 {name:'targetNo',mapping:'TARGET_NO'},
		 {name:'targetCode',mapping:'TARGET_CODE'},
		 {name:'targetName',mapping:'TARGET_NAME'},
		 {name:'targetMark',mapping:'TARGET_MARK'},
		 {name:'originalValue',mapping:'ORIGINAL_VALUE'},
		 {name:'targetValue',mapping:'TARGET_VALUE'},
		 {name:'achieveValue',mapping:'ACHIEVE_VALUE'}
		 ]
);
var targetReader = new Ext.data.JsonReader(//读取jsonReader
		{
			successProperty : 'success',
			idProperty : 'ID',
			totalProperty : 'json.count',
			root:'json.data'
		},targetRecord
);
var targetStore = new Ext.data.Store({//产品对照关系store
        restful : true, 
        proxy : new Ext.data.HttpProxy({ 
        	url:basepath+'/marketassudetailinfo.json',
        	method:'get'
        }),
		reader:targetReader
		
});

// 每页显示条数下拉选择框
var target_combo = new Ext.form.ComboBox({
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
	value : '100',
	resizable : true,
	width : 85
});

//指标信息store
	targetStore.on('beforeload', function() {
		this.baseParams = {
				querysign:'target',
				taskId:taskId
		};
	});

// 改变每页显示条数reload数据
target_combo.on("select", function(comboBox) {
	targetBbar.pageSize = parseInt(target_combo.getValue()),
	targetStore.reload({
		params : {
			start : 0,
			limit : parseInt(target_combo.getValue())
		}
	});
});

var targetBbar= new Ext.PagingToolbar({//gridTable 底部工具栏	
		pageSize : parseInt(target_combo.getValue()),
		store : targetStore,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		emptyMsg : "没有符合条件的记录",
		items : [ '-', '&nbsp;&nbsp;', target_combo ]
});
 var targetSm = new Ext.grid.CheckboxSelectionModel();
// 定义自动当前页行号
 var prod_rownum = new Ext.grid.RowNumberer({
	header : 'No.',
	width : 28
    });
 var targetColumns = new Ext.grid.ColumnModel({
     columns : [{
                header : 'ID',
                width : 100,
                hidden:true,
                align : 'center',
                dataIndex : 'targetNo',
                sortable : true
         		},{
                header : '指标编号',
                width : 200,
                hidden:true,
                align : 'center',
                dataIndex : 'targetCode',
                sortable : true
                },{
                header : '指标名称',
                width : 200,
                align : 'center',
                dataIndex : 'targetName',
                sortable : true
					},{
                header : '指标描述',
                width : 100,
                align : 'center',
                dataIndex : 'targetMark',
                sortable : true
         		},{
                header : '初始值',
                width : 100,
                align : 'right',
                dataIndex : 'originalValue',
                sortable : true
         		},{
                header : '目标值',
                width : 100,
                align : 'right',
                dataIndex : 'targetValue',
                sortable : true
         		},{
                header : '达成值',
                width : 100,
                align : 'right',
                dataIndex : 'achieveValue',
                sortable : true
         		},{
                header : '达成率',
                width : 100,
                align : 'right',
                dataIndex : 'achievePercent',
                sortable : true
         		}]
				});

var targetGrid = new Ext.grid.GridPanel({	
	store:targetStore, 
	frame:true,
	height : 300,
	cm:targetColumns,
      bbar:targetBbar,
      viewConfig : {// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
		  }
});