Ext.ns('Com.xywz.common');
/**
 * 发票选择放大镜
 * @author ww
 * @since 2015-10-17
 */
Com.xywz.common.XywzSaleInvInfoQuery = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    onRender : function(ct, position){
    	Com.xywz.common.XywzSaleInvInfoQuery.superclass.onRender.call(this, ct, position);
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
    invId:'',  
    invNum:'',
    invStat:'',
    contrNum:'',
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    hiddenName:false, //用于存隐藏ID字段
    oCustomerQueryWindow : false,

    onTrigger2Click : function(){
    	var _this=this;
    	if(_this.oCustomerQueryWindow){
    		_this.oCustomerQueryWindow.show();
    		return;
    	}
    	if(this.disabled){
    		return;
    	}
    	var oThisSearchField=_this;
    	

		_this.oSaleInvInfoQueryForm = new Ext.form.FormPanel({
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
//				{
//					columnWidth : .25,
//					layout : 'form',
//					items : [ {
//						xtype : 'textfield',
//						Width : '100',
//						name : 'invStat',
//						fieldLabel : '发票状态',
//						anchor : '90%'
//					} ]
//				}, 
//{
//					columnWidth : .25,
//					layout : 'form',
//					items : [ {
//						xtype : 'textfield',
//						Width : '100',
//						name : 'chkPers',
//						fieldLabel : '收票人',
//						anchor : '90%'
//					} ]
//				},
				{
					columnWidth : .25,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						Width : '100',
						name : 'invNum',
						fieldLabel : '发票号',
						anchor : '90%'
					} ]
				} ]
				} ],
			
			buttons : [{
				text : '查询',
				handler : function() {
					_this.oSaleInvInfoQueryStore.on('beforeload', function() {
						var conditionStr =  _this.oSaleInvInfoQueryForm.getForm().getValues(false);
						this.baseParams = {
								"condition":Ext.encode(conditionStr)
						};
					});
					_this.oSaleInvInfoQueryStore.reload({
						params : {
							start : 0,
							limit : _this.oSaleInvInfoQueryBbar.pageSize
						}
					});
				}
			},{
				text : '重置',
				handler : function() {
					_this.oSaleInvInfoQueryForm.getForm().reset();  
//					_this.oSaleInvInfoQueryForm.getForm().findField('CUST_MANAGER').setValue('');
//					_this.oSaleInvInfoQueryForm.getForm().findField('CUST_ORG').setValue('');
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
    	            
            	    {header : '发票状态',dataIndex : 'INV_STAT_ORA',width : 200,sortable : true},
            	    {header : '合同号',dataIndex : 'CONTR_NUM',width : 200,sortable : true},
            	    {header : '发票号',dataIndex : 'INV_NUM',width : 200,sortable : true},
            	    {header : '收票人',dataIndex : 'CUST_NM',width : 200,sortable : true},
            	    {header : '发票日期',dataIndex : 'INV_DT',width : 200,sortable : true},
            	    {header : '发票ID',dataIndex : 'INV_ID',sortable : true,width : 150}
    	]);
    	/**
    	 * 数据存储
    	 * 映射
    	 */
    	_this.oSaleInvInfoQueryStore = new Ext.data.Store({
    		restful:true,	
    		proxy : new Ext.data.HttpProxy({url:basepath+'/XywzSaleInvInfoQueryAction.json'}),
    		reader: new Ext.data.JsonReader({
    			totalProperty : 'json.count',
    			root:'json.data'
    		}, [
	    		    {name: 'INV_ID'},
	    		    {name: 'INV_STAT_ORA'},
	    		    {name: 'CONTR_NUM'},
	    		    {name: 'INV_NUM'},
	    		    {name: 'CUST_NM'},
	    		    {name: 'INV_DT'},    		       		    
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
    		_this.oSaleInvInfoQueryBbar.pageSize = parseInt(_this.oPagesizeCombo.getValue()),
    		_this.oSaleInvInfoQueryStore.load({
    			params : {
    				start : 0,
    				limit : parseInt(_this.oPagesizeCombo.getValue())
    			}
    		});
    	});
    	_this.oSaleInvInfoQueryBbar = new Ext.PagingToolbar({
    		pageSize : _this.number,
    		store : _this.oSaleInvInfoQueryStore,
    		displayInfo : true,
    		displayMsg : '显示{0}条到{1}条,共{2}条',
    		emptyMsg : "没有符合条件的记录",
    		items : ['-', '&nbsp;&nbsp;', _this.oPagesizeCombo]
    	});
		// 表格实例
    	_this.oSaleInvInfoQueryGrid = new Ext.grid.GridPanel({
    		height : 275,
			width:1000,
			region:'center',
			frame : true,
			autoScroll : true,
			store : _this.oSaleInvInfoQueryStore, // 数据存储
			stripeRows : true, // 斑马线
			cm : _this.cm, // 列模型
			sm : _this.sm, // 复选框
			bbar:_this.oSaleInvInfoQueryBbar,
			viewConfig:{
    			forceFit:false,
    			autoScroll:true
    		},
    		loadMask : {
    			msg : '正在加载表格数据,请稍等...'
    		}
    	});

    	_this.oSaleInvInfoQueryWindow=new Ext.Window({
    		title : '发票信息查询',
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
					_this.oSaleInvInfoQueryForm.form.reset();
					_this.oSaleInvInfoQueryStore.removeAll();
					if(_this.autoLoadFlag)
						_this.oSaleInvInfoQueryStore.load();
    			}    			
    		},
    		items : [_this.oSaleInvInfoQueryForm,_this.oSaleInvInfoQueryGrid],
    		buttonAlign:'center',
    		buttons:[{
    			text:'确定',
    			handler:function(){
//    				var sName='';
    				var checkedNodes;
    				if(!(_this.oSaleInvInfoQueryGrid.getSelectionModel().selections==null)){
    					if(_this.oSaleInvInfoQueryGrid.getSelectionModel().selections.items.length<1){
							Ext.Msg.alert('提示', '您需要选择一个发票');
							return ;
						}
    					if(oThisSearchField.hiddenField){
    						checkedNodes = _this.oSaleInvInfoQueryGrid.getSelectionModel().selections.items;
						if(oThisSearchField.singleSelected&&checkedNodes.length>1){
							Ext.Msg.alert('提示', '您只能选择一个发票');
							return ;
						}
						//多选
						for(var i=0;i<checkedNodes.length;i++){
							if(i==0){
								sName=checkedNodes[i].data.INV_NUM;
								oThisSearchField.hiddenField.setValue(checkedNodes[i].data.INV_ID);
							}else{
								sName=sName+','+checkedNodes[i].data.INV_NUM;
								oThisSearchField.hiddenField.setValue(_this.hiddenField.value+','+checkedNodes[i].data.INV_ID);
						}
						}
						oThisSearchField.setRawValue(sName);
						if(checkedNodes.length==1){//如果单选，则设置该客户相应的附属属性
							oThisSearchField.invId=checkedNodes[0].data.INV_ID;
							oThisSearchField.invNum=checkedNodes[0].data.INV_NUM;
							oThisSearchField.contrNum=checkedNodes[0].data.CONTR_NUM;
						}
					}
				}
				if (typeof oThisSearchField.callback == 'function') {
					oThisSearchField.callback(oThisSearchField,checkedNodes);
				}
				_this.oSaleInvInfoQueryWindow.hide();
			}
    	},{
    		text: '取消',
    		handler:function(){
				_this.oSaleInvInfoQueryWindow.hide();
    		}
    	}]	
    });
	_this.oSaleInvInfoQueryWindow.show();
    return;
    }
});
Ext.reg('customerquery',Com.xywz.common.XywzSaleInvInfoQuery);