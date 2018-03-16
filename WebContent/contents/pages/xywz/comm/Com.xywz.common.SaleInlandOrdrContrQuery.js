Ext.ns('Com.xywz.common');
/**
 *内贸合同信息选择放大镜
 * @author zyx
 * @since 2016-01-08
 */
 Com.xywz.common.SaleInlandOrdrContrQuery = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    onRender : function(ct, position){
    	Com.xywz.common.SaleInlandOrdrContrQuery.superclass.onRender.call(this, ct, position);
		if(this.hiddenName){
			var ownerForm = this;
			while(ownerForm.ownerCt && !Ext.instanceOf(ownerForm.ownerCt,'form')){				//根据条件查询放大镜控件的最外层容器
				ownerForm = ownerForm.ownerCt;
			};
			if(Ext.instanceOf(ownerForm.ownerCt,'form')){										//判断父容器是否为form类型
				ownerForm = ownerForm.ownerCt;
				if(ownerForm.getForm().findField(this.hiddenName)){								//如果已经创建隐藏域
					this.hiddenField = ownerForm.getForm().findField(this.hiddenName);
				}else {		//如果未创建隐藏域，则根据hiddenName属性创建隐藏域
					
					this.hiddenField = ownerForm.add({
						
						xtype : 'hidden',
						id:this.hiddenName,
						name: this.hiddenName
					});
				}
			}
		}
	},
	autoLoadFlag: false,
    singleSelected:false,//记录标志 true单选,false多选
    callback:false,
    inlandOrdrId:'',
    contrNum:'',
    chkStat:'',
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    hiddenName:false, //用于存隐藏ID字段
    oSaleInlandOrdrContrQueryWindow : false,

    onTrigger2Click : function(){
    	var _this=this;
    	if(_this.oSaleInlandOrdrContrQueryWindow){
    		_this.oSaleInlandOrdrContrQueryWindow.show();
    		return;
    	}
    	if(this.disabled){
    		return;
    	}
    	var oThisSearchField=_this;
  	
    	_this.oSaleInlandOrdrContrQueryForm = new Ext.form.FormPanel({
			frame : true, //是否渲染表单面板背景色
			labelAlign : 'middle', // 标签对齐方式
			buttonAlign : 'center',
			region:'north',
			height : 97,
			width : 1000,
			items : [{
				layout : 'column',
				border : false,
				items : [
				   {
					columnWidth : .33,
					layout : 'form',
					labelWidth: 100, // 标签宽度
					defaultType : 'textfield',
					border : false,
					items : [{
						fieldLabel : '报价单编号',
						name : 'quotnSnglNum',
						xtype : 'textfield', // 设置为数字输入框类型
						labelStyle: 'text-align:left;',
						anchor : '90%'
					} ]
				}]
			}],
			
			buttons : [{
				text : '查询',
				handler : function() {
				debugger;
					_this.oSaleInlandOrdrContrQueryStore.on('beforeload', function() {
						var conditionStr =  _this.oSaleInlandOrdrContrQueryForm.getForm().getValues(false);
						this.baseParams = {
								"condition":Ext.encode(conditionStr)
						};
					});
					_this.oSaleInlandOrdrContrQueryStore.reload({
						params : {
							start : 0,
							limit : _this.oSaleInlandOrdrContrQueryBbar.pageSize
						}
					});
				}
			},{
				text : '重置',
				handler : function() {
					_this.oSaleInlandOrdrContrQueryForm.getForm().reset();  
				}
			}]
		});
    	_this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:oThisSearchField.singleSelected});

    	// 定义自动当前页行号
    	_this.rownum = new Ext.grid.RowNumberer({
    		header : 'No.',
    		width : 28
    	});
    	// 定义列模型
    	_this.cm = new Ext.grid.ColumnModel([_this.rownum,_this.sm, 
    	    {header : '内贸合同ID',dataIndex : 'INLAND_ORDR_ID',sortable : true,width : 150},
    	    {header : '合同号',dataIndex : 'CONTR_NUM',width : 200,sortable : true},
    	    {header : '签约日期',dataIndex : 'CONTR_DT',width : 200,sortable : true},
    	    {header : '下达状态',dataIndex : 'CHK_STAT',width : 200,sortable : true}
    	]);
    	/**
    	 * 数据存储
    	 */
    	_this.oSaleInlandOrdrContrQueryStore = new Ext.data.Store({
    		restful:true,	
    		proxy : new Ext.data.HttpProxy(
											{
												url : basepath + '/XywzSaleInlandOrdrContrQueryAction.json'}),
    		reader: new Ext.data.JsonReader({
    			totalProperty : 'json.count',
    			root:'json.data'
    		}, [
    		    {name: 'INLAND_ORDR_ID'},
    		    {name: 'CONTR_NUM'},
    		    {name: 'CONTR_DT'},
    		    {name: 'CHK_STAT'}
    		    ])
    	});

    	_this.oPagesizeCombo = new Ext.form.ComboBox({
    		name : 'pagesize',
    		triggerAction : 'all',
    		mode : 'local',
    		store : new Ext.data.ArrayStore({
    			fields : ['value', 'text'],
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
    	_this.number = parseInt(_this.oPagesizeCombo.getValue());
    	_this.oPagesizeCombo.on("select", function(comboBox) {
    		_this.oSaleInlandOrdrContrQueryBbar.pageSize = parseInt(_this.oPagesizeCombo.getValue()),
    		_this.oSaleInlandOrdrContrQueryStore.load({
    			params : {
    				start : 0,
    				limit : parseInt(_this.oPagesizeCombo.getValue())
    			}
    		});
    	});
    	_this.oSaleInlandOrdrContrQueryBbar = new Ext.PagingToolbar({
    		pageSize : _this.number,
    		store : _this.oSaleInlandOrdrContrQueryStore,
    		displayInfo : true,
    		displayMsg : '显示{0}条到{1}条,共{2}条',
    		emptyMsg : "没有符合条件的记录",
    		items : ['-', '&nbsp;&nbsp;', _this.oPagesizeCombo]
    	});
		// 表格实例
    	_this.oSaleInlandOrdrContrQueryGrid = new Ext.grid.GridPanel({
    		height : 275,
			width:1000,
			region:'center',
			frame : true,
			autoScroll : true,
			store : _this.oSaleInlandOrdrContrQueryStore, // 数据存储
			stripeRows : true, // 斑马线
			cm : _this.cm, // 列模型
			sm : _this.sm, // 复选框
			bbar:_this.oSaleInlandOrdrContrQueryBbar,
			viewConfig:{
    			forceFit:false,
    			autoScroll:true
    		},
    		loadMask : {
    			msg : '正在加载表格数据,请稍等...'
    		}
    	});

    	_this.oSaleInlandOrdrContrQueryWindow=new Ext.Window({
    		title : '外贸合同信息查询',
    		closable : true,
    		resizable : true,
    		height:435,
    		width:1013,
    		draggable : true,
    		closeAction : 'hide',
    		modal : true, // 模态窗口 
    		border : false,
    		closable : true,
    		layout : 'border',
    		listeners : {
    			'show':function(){
					_this.oSaleInlandOrdrContrQueryForm.form.reset();
					_this.oSaleInlandOrdrContrQueryStore.removeAll();
					if(_this.autoLoadFlag)
						_this.oSaleInlandOrdrContrQueryStore.load();
    			}    			
    		},
    		items : [_this.oSaleInlandOrdrContrQueryForm,_this.oSaleInlandOrdrContrQueryGrid],
    		buttonAlign:'center',
    		buttons:[{
    			text:'确定',
    			handler:function(){
    				var sName='';
    				var checkedNodes;
    				if(!(_this.oSaleInlandOrdrContrQueryGrid.getSelectionModel().selections==null)){
    					if(oThisSearchField.hiddenField){
    						checkedNodes = _this.oSaleInlandOrdrContrQueryGrid.getSelectionModel().selections.items;
						if(oThisSearchField.singleSelected&&checkedNodes.length>1){
							Ext.Msg.alert('提示', '您只能选择一个客户');
							return ;
						}
						for(var i=0;i<checkedNodes.length;i++){
							if(i==0){
								sName=checkedNodes[i].data.CONTR_NUM;
								oThisSearchField.hiddenField.setValue(checkedNodes[i].data.INLAND_ORDR_ID);
							}else{
								sName=sName+','+checkedNodes[i].data.CONTR_NUM;
								oThisSearchField.hiddenField.setValue(_this.hiddenField.value+','+checkedNodes[i].data.INLAND_ORDR_ID);
							}
						}
						oThisSearchField.setRawValue(sName);
						if(checkedNodes.length==1){//如果单选，则设置该客户相应的附属属性
							oThisSearchField.contrNum=checkedNodes[0].data.CONTR_NUM;
							oThisSearchField.inlandOrdrId=checkedNodes[0].data.INLAND_ORDR_ID;
							oThisSearchField.chkStat=checkedNodes[0].data.CHK_STAT;
						}
					}
				}
				if (typeof oThisSearchField.callback == 'function') {
					oThisSearchField.callback(oThisSearchField,checkedNodes);
				}
				_this.oSaleInlandOrdrContrQueryWindow.hide();
			}
    	},{
    		text: '取消',
    		handler:function(){
				_this.oSaleInlandOrdrContrQueryWindow.hide();
    		}
    	}]	
    });
	_this.oSaleInlandOrdrContrQueryWindow.show();
    return;
    }
});
Ext.reg('SaleInlandOrdrContrquery',Com.xywz.common.SaleInlandOrdrContrQuery);