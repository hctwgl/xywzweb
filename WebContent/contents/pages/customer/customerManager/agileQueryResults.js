/**
 *查询结果展示界面
 *
 */

//分组字段下拉框数据源
var _groupStore = new Ext.data.Store({
	reader:new Ext.data.JsonReader({
		successProperty: 'success',
		messageProperty: 'message',
		fields : [{
			name:"textName"
		},{
			name:"nodeId"
		}]
	})
});
//统计字段下拉框数据源
var _sumStore = new Ext.data.Store({
	reader:new Ext.data.JsonReader({
		successProperty: 'success',
		messageProperty: 'message',
		fields : [{
			name:"textName"
		},{
			name:"nodeId"
		}]
	})
});

var LovCombo1 = new Ext.form.ComboBox({
	fieldLabel : '第一分组字段',
	editable : false,
	triggerAction:'all',
	mode:'local',
	store : _groupStore,
	valueField : 'nodeId',
	displayField : 'textName',
	anchor:'90%',
	name : 'LovCombo1'
});
var LovCombo2 = new Ext.form.ComboBox({
	fieldLabel : '第二分组字段',
	editable : false,
	triggerAction:'all',
	mode:'local',
	store : _groupStore,
	valueField : 'nodeId',
	displayField : 'textName',
	anchor:'90%',
	name : 'LovCombo2'
});
var LovCombo3 = new Ext.form.ComboBox({
	fieldLabel : '第三分组字段',
	editable : false,
	triggerAction:'all',
	mode:'local',
	store : _groupStore,
	valueField : 'nodeId',
	displayField : 'textName',
	anchor:'90%',
	name : 'LovCombo3'
});     
var LovCombo4 = new Ext.ux.form.LovCombo({
	fieldLabel: '汇总字段',
	name:'LovCombo4',
	valueField : 'nodeId',
	displayField : 'textName',
	hideOnSelect:false,
	store : _sumStore,
	triggerAction:'all',
	mode:'local',
	anchor:'90%',
	editable:false
});
	
//查询结果列模型
var cmres = new Ext.grid.ColumnModel(simple2.getResultColumnHeaders());
cmres.on("configchange",function(){
	resultGrid.view.refresh(true);
}); 
/**
 * 查询结果分页
 */ 
var _lpagesize_combo = new Ext.form.ComboBox({
	  	name : 'pagesize',
	  	triggerAction : 'all',
	  	mode : 'local',
	  	store : new Ext.data.ArrayStore({
	  				fields : ['value', 'text'],
	  				data : [ 
	  						[ 20, '20条/页' ],[ 50, '50条/页' ],[ 100, '100条/页' ], [ 250, '250条/页' ],
	  						[ 500, '500条/页' ] ]
	  			}),
	  	valueField : 'value',
	  	displayField : 'text',
	  	value : '20',
	  	editable : false,
	  	width : 85,
	  	listeners : {
			select : function(combo){
				_lbbar.pageSize = parseInt(_lpagesize_combo.getValue());
				resultstore2.reload({
					params : {
						start : 0,
						limit : parseInt(_lpagesize_combo.getValue())
					}
				});
			}
		}
	});
	//查询结果数据源
	var resultstore2 = new Ext.data.Store({
		restful : true,
		url:basepath+'/queryagileresult.json',
		reader:new Ext.data.JsonReader({
			successProperty: 'success',
			messageProperty: 'message',
			fields : [{
				name:'CUST_ID'
			}]
		})
	});
	
	//分页工具栏
	var _lbbar = new Ext.PagingToolbar({
		pageSize : _lpagesize_combo.getValue(),
		store : resultstore2,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		//plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
		emptyMsg : "没有符合条件的记录",
		items : ['-', '&nbsp;&nbsp;', _lpagesize_combo]
	});
	 
	//查询结果列表面板
	var resultGrid = new Ext.grid.GridPanel({
		frame : true,
		region : 'center', // 返回给页面的div
		store : resultstore2, // 数据存储
		stripeRows : true, // 斑马线
		cm : cmres, // 列模型
		sm : simple2.selectModel,
		tbar : [{
			text : '客户视图',
			iconCls :'custGroupMemIconCss',
			handler : function(a,b,c,d){
				if(simple2.selectModel.getSelections().length == 0){
					Ext.Msg.alert("meixuan");
					return;
				}
				if(simple2.selectModel.getSelections().length > 1){
					Ext.Msg.alert("duoxuan");
				}
				
				/*******************************************************/
				var custId = simple2.selectModel.getSelections()[0].data.CUST_ID_BASE;
				var custTyp = simple2.selectModel.getSelections()[0].data.CUST_TYP_BASE;
				var custZhName = simple2.selectModel.getSelections()[0].data.CUST_ZH_NAME_BASE;
				var viewWindow = new Com.yucheng.crm.cust.ViewWindow({
					id:'viewWindow',
					custId:custId,
					custName:custZhName,
					custTyp:custTyp
				});
				
				Ext.Ajax.request({
					url : basepath + '/commsearch!isMainType.json',
					mothed : 'GET',
					params : {
					'mgrId' : __userId,
					'custId' : custId
				},
				success : function(response) {
					var anaExeArray = Ext.util.JSON.decode(response.responseText); 
				if(anaExeArray.json != null){
					if(anaExeArray.json.MAIN_TYPE=='1'){
						oCustInfo.omain_type=true;
					}else{
						oCustInfo.omain_type=false;
					}}
				else {
					oCustInfo.omain_type=false;
				}
					oCustInfo.cust_id = custId;
					oCustInfo.cust_name = custZhName;
					oCustInfo.cust_type = custTyp;
					viewWindow.show();
				
				},
				failure : function(form, action) {}
				});
				/*******************************************************/
			}
		},'-',{
			id:'__expResult',
			iconCls:'exportIconCss',
			text : '导出',
			formPanel : '',
			xtype: 'bob.expbutton',
			exParams : resultstore2.baseParams,
			url: basepath+'/queryagileresult.json'
		}], // 表格工具栏
		bbar : _lbbar,// 分页工具栏
		viewConfig : {
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
	//分组条件面板
	var _groupForm = new Ext.FormPanel({
		region:'north',
		labelWidth : 90,
		frame : true,
		autoScroll : true,
		buttonAlign:"center",
		height:80,
		width: '100%',
		labelAlign:'right',
		items:[{
			layout:'column',
	        items:[{
	        	columnWidth : .24,
	        	layout : 'form',
	        	items : [LovCombo1]
	        },{
	        	columnWidth : .24,
	        	layout : 'form',
	        	items : [LovCombo2]
	        },{
	        	columnWidth : .24,
	        	layout : 'form',
	        	items : [LovCombo3]
	        },{
	        	columnWidth : .24,
	        	layout : 'form',
	        	items : [LovCombo4]
	        }]
		}],
		buttons:[{
			text : '分组汇总统计',
			handler : function() {
				if(!LovCombo1.getValue() && !LovCombo2.getValue() && !LovCombo3.getValue()){
					Ext.Msg.alert("提示","请选择分组字段");
					return;
				}
				groupingPropere();
				groupingWindow.show();
			}
		},{
			text :'重置',
			handler : function(){
				_groupForm.getForm().reset();
			}
		}]
	});
	//查询结果窗口
	var resultWindow = new Ext.Window({
		layout : 'fit',
		maximized : true,
		closable : true,// 是否可关闭
        title : '查询结果展示',
		modal : true,
		closeAction : 'hide',
		titleCollapse : true,
		buttonAlign : 'center',
		border : false,
		animCollapse : true,
		animateTarget : Ext.getBody(),
		constrain : true,
		items : [{
			layout:'border',
			items:[
				_groupForm,resultGrid
			]
		}],
		buttons : [{
			text : '关闭',
			handler : function() {
				resultWindow.hide();
				//重置分组面板
    			_groupForm.getForm().reset();
    			//移除条件查询结果列表
    			resultstore2.removeAll();
			}
		}]
	});
	
//查询结果方法
var fnSearchResult = function(){
	if(simple2.resultColumns.length==0){
		Ext.Msg.alert('提示', '未加入任何显示列！');
		return;
	}
	if(simple.conditions.length==0){
		Ext.Msg.alert('提示', '未加入任何条件列！');
		return;
	}
	if(!simple.getForm().isValid()){
		Ext.Msg.alert('提示', '查询条件输入有误！');
		return;
	}
	
	//初始化客户ID、客户名称、客户类型字段节点，从数据集树上获取
	if(QUERYUTIL.custBaseInfo.dbNode === false){
		QUERYUTIL.custBaseInfo.dbNode = treeOfPoroduct.root.findChild('VALUE',QUERYUTIL.custBaseInfo.dbTable,true);
		QUERYUTIL.custBaseInfo.idNode = QUERYUTIL.custBaseInfo.dbNode.findChild('ENAME',QUERYUTIL.custBaseInfo.idColumn);
		QUERYUTIL.custBaseInfo.nameNode = QUERYUTIL.custBaseInfo.dbNode.findChild('ENAME',QUERYUTIL.custBaseInfo.nameColumn);
		QUERYUTIL.custBaseInfo.typeNode = QUERYUTIL.custBaseInfo.dbNode.findChild('ENAME',QUERYUTIL.custBaseInfo.typeColumn);
	}
	//如结果列中无客户ID、名称、类型字段，则自动添加隐藏字段；
	simple2.addItems(QUERYUTIL.custBaseInfo.idNode,'0',true,false);
	simple2.addItems(QUERYUTIL.custBaseInfo.nameNode,'0',true,false);
	simple2.addItems(QUERYUTIL.custBaseInfo.typeNode,'0',true,false);
	//弹出窗口
	resultWindow.show();
	//根据查询结果列配置，修改查询结果数据源reader字段
	resultGrid.store.reader.onMetaChange(simple2.getResultReaderMetas());
	//根据查询结果列配置，修改查询结果列表面板列模型
	resultGrid.colModel.setConfig(simple2.getResultColumnHeaders(), false) ;
	
	//初始化统计字段下拉框数据，排除隐藏字段
	var sumColumnsData = [];
	Ext.each(simple2.resultColumns,function(column){
		if(column.hidden !== true){
			sumColumnsData.push(column);
		}
	});
	_sumStore.loadData(sumColumnsData);
	
	//初始化分组字段下拉框数据，排除隐藏字段
	var groupColumnsData = [];
	Ext.each(simple2.resultColumns,function(column){
		if(column.nodeInfo.attributes.NOTES && column.hidden !== true){
			groupColumnsData.push(column);
		}
	});
	_groupStore.loadData(groupColumnsData);
	
	//获取动态查询所需要的各个数据参数
	resultGrid.store.baseParams = {
		conditionAttrs : Ext.encode(simple.getConditionsAttrs()),
		results :  Ext.encode(simple2.getResults()),
		radio : right_panel.conditionJoinType
	};
	
	//设置导出参数，同查询参数
	Ext.getCmp("__expResult").exParams = resultGrid.store.baseParams ;
	
	//查询数据
	resultGrid.store.load({
		params: {
			start : 0,
			limit : _lpagesize_combo.getValue()
		}
	});
};