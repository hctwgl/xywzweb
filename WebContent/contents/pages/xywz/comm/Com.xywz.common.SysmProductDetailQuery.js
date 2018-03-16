Ext.ns('Com.xywz.common');
/**
 *国阳钢铁产品规格信息选择放大镜
 * @author zyx
 * @since 2015-10-18
 */
Com.xywz.common.SysmProductDetailQuery = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    onRender : function(ct, position){
    	Com.xywz.common.SysmProductDetailQuery.superclass.onRender.call(this, ct, position);
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
    hsCode:'',
    size:'',
    waistDepth:'',
    weight:'',
    sizeConcat:'',
    materials:'',
    size:'',
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    hiddenName:false, //用于存隐藏ID字段
    oSysmProductDetailQueryWindow : false,

    onTrigger2Click : function(){
    	var _this=this;
    	if(_this.oSysmProductDetailQueryWindow){
    		_this.oSysmProductDetailQueryWindow.show();
    		return;
    	}
    	if(this.disabled){
    		return;
    	}
    	var oThisSearchField=_this;
  	
    	_this.oSysmProductDetailQueryForm = new Ext.form.FormPanel({
			frame : true, //是否渲染表单面板背景色
			labelAlign : 'middle', // 标签对齐方式
			buttonAlign : 'center',
			region:'north',
			height : 97,
			width : 1000,
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .33,
					layout : 'form',
					labelWidth: 100, // 标签宽度
					defaultType : 'textfield',
					border : false,
					items : [{
						xtype : 'textfield',
						Width : '100',
						name : 'hsCode',
						labelWidth : 150,
						fieldLabel : '品名 ',
						anchor : '90%'
					}]
				},{
					columnWidth : .33,
					layout : 'form',
					labelWidth : 80, // 标签宽度
					defaultType : 'textfield',
					border : false,
					items : [{
						xtype : 'textfield',
						labelWidth : 90,
						Width : '100',
						name : 'size',
						fieldLabel : '规格型号',
						anchor : '95%'
					}]
				}]
			}],
			
			buttons : [{
				text : '查询',
				handler : function() {
					_this.oSysmProductDetailQueryStore.on('beforeload', function() {
						var conditionStr =  _this.oSysmProductDetailQueryForm.getForm().getValues(false);
						this.baseParams = {
								"condition":Ext.encode(conditionStr)
						};
					});
					_this.oSysmProductDetailQueryStore.reload({
						params : {
							start : 0,
							limit : _this.oSysmProductDetailQueryBbar.pageSize
						}
					});
				}
			},{
				text : '重置',
				handler : function() {
					_this.oSysmProductDetailQueryForm.getForm().reset();  
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
    	    {header : '产品ID',dataIndex : 'PROD_ID',sortable : true,width : 150},                                 
    	    {header : '品名',dataIndex : 'HS_CODE',sortable : true,width : 150},
    	    {header : '材质',dataIndex : 'MATERIALS',sortable : true,width : 150},
    	    {header : '规格型号',dataIndex : 'SIZE',width : 200,sortable : true},
    	    {header : '腰厚(MM)',dataIndex : 'WAIST_DEPTH',width : 200,sortable : true},
    	    {header : '理重(KG)',dataIndex : 'WEIGHT',width : 200,sortable : true},
    	    {header : '汇总',dataIndex : 'SIZE_CONCAT',width : 200,sortable : true,hidden:true}
    	]);
    	/**
    	 * 数据存储
    	 */
    	_this.oSysmProductDetailQueryStore = new Ext.data.Store({
    		restful:true,	
    		proxy : new Ext.data.HttpProxy({url:basepath+'/XywzSysmProductDetailQueryAction.json'}),
    		reader: new Ext.data.JsonReader({
    			totalProperty : 'json.count',
    			root:'json.data'
    		}, [
    		    {name: 'PROD_ID'},
    		    {name: 'HS_CODE'},
    		    {name: 'MATERIALS'},
    		    {name: 'SIZE'},
    		    {name: 'WAIST_DEPTH'},
    		    {name: 'WEIGHT'},
    		    {name: 'SIZE_CONCAT'}
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
    		_this.oSysmProductDetailQueryBbar.pageSize = parseInt(_this.oPagesizeCombo.getValue()),
    		_this.oSysmProductDetailQueryStore.load({
    			params : {
    				start : 0,
    				limit : parseInt(_this.oPagesizeCombo.getValue())
    			}
    		});
    	});
    	_this.oSysmProductDetailQueryBbar = new Ext.PagingToolbar({
    		pageSize : _this.number,
    		store : _this.oSysmProductDetailQueryStore,
    		displayInfo : true,
    		displayMsg : '显示{0}条到{1}条,共{2}条',
    		emptyMsg : "没有符合条件的记录",
    		items : ['-', '&nbsp;&nbsp;', _this.oPagesizeCombo]
    	});
		// 表格实例
    	_this.oSysmProductDetailQueryGrid = new Ext.grid.GridPanel({
    		height : 275,
			width:1000,
			region:'center',
			frame : true,
			autoScroll : true,
			store : _this.oSysmProductDetailQueryStore, // 数据存储
			stripeRows : true, // 斑马线
			cm : _this.cm, // 列模型
			sm : _this.sm, // 复选框
			bbar:_this.oSysmProductDetailQueryBbar,
			viewConfig:{
    			forceFit:false,
    			autoScroll:true
    		},
    		loadMask : {
    			msg : '正在加载表格数据,请稍等...'
    		}
    	});

    	_this.oSysmProductDetailQueryWindow=new Ext.Window({
    		title : '国阳产品规格查询',
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
					_this.oSysmProductDetailQueryForm.form.reset();
					_this.oSysmProductDetailQueryStore.removeAll();
					if(_this.autoLoadFlag)
						_this.oSysmProductDetailQueryStore.load();
    			}    			
    		},
    		items : [_this.oSysmProductDetailQueryForm,_this.oSysmProductDetailQueryGrid],
    		buttonAlign:'center',
    		buttons:[{
    			text:'确定',
    			handler:function(){
    				var sName='';
    				var checkedNodes;
    				if(!(_this.oSysmProductDetailQueryGrid.getSelectionModel().selections==null)){
    					if(oThisSearchField.hiddenField){
    						checkedNodes = _this.oSysmProductDetailQueryGrid.getSelectionModel().selections.items;
						if(oThisSearchField.singleSelected&&checkedNodes.length>1){
							Ext.Msg.alert('提示', '您只能选择一个客户');
							return ;
						}
						for(var i=0;i<checkedNodes.length;i++){
							if(i==0){
								sName=checkedNodes[i].data.SIZE;
								oThisSearchField.hiddenField.setValue(checkedNodes[i].data.PROD_ID);
							}else{
								sName=sName+','+checkedNodes[i].data.SIZE;
								oThisSearchField.hiddenField.setValue(_this.hiddenField.value+','+checkedNodes[i].data.PROD_ID);
							}
						}
						oThisSearchField.setRawValue(sName);
						if(checkedNodes.length==1){//如果单选，则设置该客户相应的附属属性
							oThisSearchField.hsCode=checkedNodes[0].data.HS_CODE;
							oThisSearchField.waistDepth=checkedNodes[0].data.WAIST_DEPTH;
							oThisSearchField.weight=checkedNodes[0].data.WEIGHT;
							oThisSearchField.sizeConcat=checkedNodes[0].data.SIZE_CONCAT;
							oThisSearchField.materials=checkedNodes[0].data.MATERIALS;
							oThisSearchField.size=checkedNodes[0].data.SIZE;
						}
					}
				}
				if (typeof oThisSearchField.callback == 'function') {
					oThisSearchField.callback(oThisSearchField,checkedNodes);
				}
				_this.oSysmProductDetailQueryWindow.hide();
			}
    	},{
    		text: '取消',
    		handler:function(){
				_this.oSysmProductDetailQueryWindow.hide();
    		}
    	}]	
    });
	_this.oSysmProductDetailQueryWindow.show();
    return;
    }
});
Ext.reg('SysmProductDetailQuery',Com.xywz.common.SysmProductDetailQuery);