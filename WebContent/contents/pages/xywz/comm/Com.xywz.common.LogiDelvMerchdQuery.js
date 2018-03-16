Ext.ns('Com.xywz.common');
/**
 *发货商品明细信息选择放大镜
 * @author zyx
 * @since 2016-01-08
 */
 Com.xywz.common.LogiDelvMerchdQuery = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.SearchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    onRender : function(ct, position){
    	Com.xywz.common.LogiDelvMerchdQuery.superclass.onRender.call(this, ct, position);
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
    id:'',
    sendSheetAdvsNum:'',
    contrNum:'',
    custId:'',
    custNm:'',
    hsCode:'',
    spcMode:'',
    len:'',
    zhiCnt:'',
    qty:'',
    remZhiCnt:'',
    weight:'',
    materials:'',
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    hiddenName:false, //用于存隐藏ID字段
    oLogiDelvMerchdQueryWindow : false,

    onTrigger2Click : function(){
    	var _this=this;
    	if(_this.oLogiDelvMerchdQueryWindow){
    		_this.oLogiDelvMerchdQueryWindow.show();
    		return;
    	}
    	if(this.disabled){
    		return;
    	}
    	var oThisSearchField=_this;
  	
    	_this.oLogiDelvMerchdQueryForm = new Ext.form.FormPanel({
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
						fieldLabel : '发运通知单编号',
						name : 'sendSheetAdvsNum',
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
					_this.oLogiDelvMerchdQueryStore.on('beforeload', function() {
						var conditionStr =  _this.oLogiDelvMerchdQueryForm.getForm().getValues(false);
						this.baseParams = {
								"condition":Ext.encode(conditionStr)
						};
					});
					_this.oLogiDelvMerchdQueryStore.reload({
						params : {
							start : 0,
							limit : _this.oLogiDelvMerchdQueryBbar.pageSize
						}
					});
				}
			},{
				text : '重置',
				handler : function() {
					_this.oLogiDelvMerchdQueryForm.getForm().reset();  
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
    	    {header : '发货商品明细ID',dataIndex : 'ID',sortable : true,width : 150},
    	    {header : '发运通知单编号',dataIndex : 'SEND_SHEET_ADVS_NUM',width : 200,sortable : true},
    	    {header : '合同号',dataIndex : 'CONTR_NUM',sortable : true,width : 150},
    	    {header : '客户号',dataIndex : 'CUST_ID',width : 200,sortable : true},
    	    {header : '客户名称',dataIndex : 'CUST_SHT_NM',width : 200,sortable : true},
    	    {header : '品名',dataIndex : 'HS_CODE',width : 200,sortable : true},
    	    {header : '规格型号',dataIndex : 'SPC_MODEL',sortable : true,width : 150},
    	    {header : '材质',dataIndex : 'MATERIALS',sortable : true,width : 150},
    	    {header : '定尺长度',dataIndex : 'LEN',width : 200,sortable : true},
    	    {header : '支数',dataIndex : 'ZHI_CNT',width : 200,sortable : true},
    	    {header : '件数',dataIndex : 'QTY',sortable : true,width : 150},
    	    {header : '零支',dataIndex : 'REM_ZHI_CNT',sortable : true,width : 150},
    	    {header : '重量(吨)',dataIndex : 'WEIGHT',width : 200,sortable : true}
    	]);
    	/**
    	 * 数据存储
    	 */
    	_this.oLogiDelvMerchdQueryStore = new Ext.data.Store({
    		restful:true,	
    		proxy : new Ext.data.HttpProxy(
											{
												url : basepath + '/XywzLogiDelvMerchdNewQueryAction.json'}),
    		reader: new Ext.data.JsonReader({
    			totalProperty : 'json.count',
    			root:'json.data'
    		}, [
    		    {name: 'ID'},
    		    {name: 'SEND_SHEET_ADVS_NUM'},
    		    {name: 'CONTR_NUM'},
    		    {name: 'CUST_ID'},
    		    {name: 'CUST_SHT_NM'},
    		    {name: 'HS_CODE'},
    		    {name: 'SPC_MODEL'},
    		    {name: 'LEN'},
    		    {name: 'ZHI_CNT'},
    		    {name: 'QTY'},
    		    {name: 'REM_ZHI_CNT'},
    		    {name: 'WEIGHT'},
    		    {name: 'MATERIALS'}
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
    		_this.oLogiDelvMerchdQueryBbar.pageSize = parseInt(_this.oPagesizeCombo.getValue()),
    		_this.oLogiDelvMerchdQueryStore.load({
    			params : {
    				start : 0,
    				limit : parseInt(_this.oPagesizeCombo.getValue())
    			}
    		});
    	});
    	_this.oLogiDelvMerchdQueryBbar = new Ext.PagingToolbar({
    		pageSize : _this.number,
    		store : _this.oLogiDelvMerchdQueryStore,
    		displayInfo : true,
    		displayMsg : '显示{0}条到{1}条,共{2}条',
    		emptyMsg : "没有符合条件的记录",
    		items : ['-', '&nbsp;&nbsp;', _this.oPagesizeCombo]
    	});
		// 表格实例
    	_this.oLogiDelvMerchdQueryGrid = new Ext.grid.GridPanel({
    		height : 275,
			width:1000,
			region:'center',
			frame : true,
			autoScroll : true,
			store : _this.oLogiDelvMerchdQueryStore, // 数据存储
			stripeRows : true, // 斑马线
			cm : _this.cm, // 列模型
			sm : _this.sm, // 复选框
			bbar:_this.oLogiDelvMerchdQueryBbar,
			viewConfig:{
    			forceFit:false,
    			autoScroll:true
    		},
    		loadMask : {
    			msg : '正在加载表格数据,请稍等...'
    		}
    	});

    	_this.oLogiDelvMerchdQueryWindow=new Ext.Window({
    		title : '发货商品明细信息查询',
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
					_this.oLogiDelvMerchdQueryForm.form.reset();
					_this.oLogiDelvMerchdQueryStore.removeAll();
					if(_this.autoLoadFlag)
						_this.oLogiDelvMerchdQueryStore.load();
    			}    			
    		},
    		items : [_this.oLogiDelvMerchdQueryForm,_this.oLogiDelvMerchdQueryGrid],
    		buttonAlign:'center',
    		buttons:[{
    			text:'确定',
    			handler:function(){
    				var sName='';
    				var checkedNodes;
    				if(!(_this.oLogiDelvMerchdQueryGrid.getSelectionModel().selections==null)){
    					if(oThisSearchField.hiddenField){
    						checkedNodes = _this.oLogiDelvMerchdQueryGrid.getSelectionModel().selections.items;
						if(oThisSearchField.singleSelected&&checkedNodes.length>1){
							Ext.Msg.alert('提示', '您只能选择一个客户');
							return ;
						}
						for(var i=0;i<checkedNodes.length;i++){
							if(i==0){
								sName=checkedNodes[i].data.ID;
								oThisSearchField.hiddenField.setValue(checkedNodes[i].data.SEND_SHEET_ADVS_NUM);
							}else{
								sName=sName+','+checkedNodes[i].data.ID;
								oThisSearchField.hiddenField.setValue(_this.hiddenField.value+','+checkedNodes[i].data.SEND_SHEET_ADVS_NUM);
							}
						}
						oThisSearchField.setRawValue(sName);
						if(checkedNodes.length==1){//如果单选，则设置该客户相应的附属属性
							oThisSearchField.id=checkedNodes[0].data.ID;
							oThisSearchField.sendSheetAdvsNum=checkedNodes[0].data.SEND_SHEET_ADVS_NUM;
							oThisSearchField.contrNum=checkedNodes[0].data.CONTR_NUM;
							oThisSearchField.custId=checkedNodes[0].data.CUST_ID;
							oThisSearchField.custNm=checkedNodes[0].data.CUST_SHT_NM;
							oThisSearchField.hsCode=checkedNodes[0].data.HS_CODE;
							oThisSearchField.spcMode=checkedNodes[0].data.SPC_MODEL;
							oThisSearchField.len=checkedNodes[0].data.LEN;
							oThisSearchField.zhiCnt=checkedNodes[0].data.ZHI_CNT;
							oThisSearchField.qty=checkedNodes[0].data.QTY;
							oThisSearchField.remZhiCnt=checkedNodes[0].data.REM_ZHI_CNT;
							oThisSearchField.weight=checkedNodes[0].data.WEIGHT;
							oThisSearchField.materials=checkedNodes[0].data.MATERIALS;
						}
					}
				}
				if (typeof oThisSearchField.callback == 'function') {
					oThisSearchField.callback(oThisSearchField,checkedNodes);
				}
				_this.oLogiDelvMerchdQueryWindow.hide();
			}
    	},{
    		text: '取消',
    		handler:function(){
				_this.oLogiDelvMerchdQueryWindow.hide();
    		}
    	}]	
    });
	_this.oLogiDelvMerchdQueryWindow.show();
    return;
    }
});
Ext.reg('LogiDelvMerchdquery',Com.xywz.common.LogiDelvMerchdQuery);