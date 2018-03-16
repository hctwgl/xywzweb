// 定义自动当前页行号
var planRownum = new Ext.grid.RowNumberer({
				header : 'No.',
				width : 28
			});

var planProdColumns = new Ext.grid.ColumnModel([planRownum,
            {
                        header : '产品编号',
                        width : 120,
                        align : 'left',
                        dataIndex : 'productId',
                        sortable : true
                    },{
                        header : '产品名称',
                        width : 120,
                        align : 'left',
                        dataIndex : 'productName',
                        sortable : true
                    },{
                            header : '产品类型',
                            width : 120,
                            align : 'left',
                            dataIndex : 'productType',
                            sortable : true
//                    },{
//                        header : '创建人',
//                        width : 120,
//                        align : 'left',
//                        dataIndex : 'createUser',
//                        sortable : true
//                    }, {
//                        header : '创建日期',
//                        width : 120,
//                        align : 'left',
//                        dataIndex : 'createDate',
//                        sortable : true
                    }
        ]);

var planProdRecord = Ext.data.Record.create([{
            name : 'productDetailId',mapping : 'PPDE_ID'
        },{
            name : 'productId',mapping : 'PRODUCT_ID'
        },{
            name : 'productName',mapping : 'PRODUCT_NAME'
        },{
            name : 'productType',mapping : 'PRODUCT_TYPE'     	
        }, {
            name : 'createUser',mapping : 'USERNAME'
        }, {
            name : 'createDate',mapping : 'CREATE_DATE'
        },{
            name : 'planId',mapping : 'PLAN_ID'
        }]);

var planProdStore = new Ext.data.Store({
	restful : true,
	proxy : new Ext.data.HttpProxy({
		url : basepath + '/planProductQuery.json',
		failure : function(response) {
			var resultArray = Ext.util.JSON.decode(response.status);
			if(resultArray == 403) {
				Ext.Msg.alert('提示', response.responseText);
			}
		}
	}),
	reader : new Ext.data.JsonReader({
		totalProperty:'json.count',
		root : 'json.data'
	}, planProdRecord)
});

var addDetailProduct = new Ext.FormPanel({
	// layout:'fit',
	title : '产品查询',
	frame : true,
	border : false,
	labelAlign : 'right',
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .50,
			labelWidth : 100, // 标签宽度
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '产品名称',
				name : 'PRODUCT_NAME',
				anchor : '95%'
			} ]
		}, {
			columnWidth : .50,
			labelWidth : 100, // 标签宽度
			layout : 'form',
			items : [{
				xtype : 'textfield',
				fieldLabel : '产品编号',
				name : 'PRODUCT_ID',
				anchor : '95%'
			} ]
		} ]
	} ],
	buttonAlign : 'center',
	buttons : [ {
		text : '查询',
		handler : function() {
			var planId=Ext.getCmp('listPanel').getSelectionModel().getSelected().get('planId');
			planProdStore.reload({
				params : {
					start : 0,
					rollId : document.getElementById('planIdStr').value,
					limit : proDetailbbar.pageSize,
					planId : planId
				}
			});

		},
		width : 80
	}, {
		text : '重置',
		handler : function() {
			addDetailProduct.getForm().reset();
		}

	} ]
});

var proDetailpagesize_combo = new Ext.form.ComboBox({
	name : 'pagesize',
	triggerAction : 'all',
	mode : 'local',
	store : new Ext.data.ArrayStore({
		fields : [ 'value', 'text' ],
		data : [ [ 100, '100条/页' ], [ 200, '200条/页' ],
				[ 500, '500条/页' ],[ 1000, '1000条/页' ]  ]
	}),
	valueField : 'value',
	displayField : 'text',
	value : '100',
	resizable : true,
	width : 85
});

var proDetailnumber = parseInt(proDetailpagesize_combo.getValue());

planProdStore.on('beforeload', function() {
	   var conditionStr =  addDetailProduct.getForm().getValues(false);
this.baseParams = {
      "condition":Ext.encode(conditionStr),
      planId : document.getElementById('planIdStr').value
};});

proDetailpagesize_combo.on("select", function(comboBox) {
	proDetailbbar.pageSize = parseInt(proDetailpagesize_combo.getValue());
	// number = parseInt(comboBox.getValue());
	planProdStore.reload({
		params : {
			start : 0,
			rollId : document.getElementById('planIdStr').value,
			planId : document.getElementById('planIdStr').value,
			limit : proDetailbbar.pageSize
		}
	});
});

var proDetailbbar = new Ext.PagingToolbar({
	pageSize : proDetailnumber,
	store : planProdStore,
	displayInfo : true,
	displayMsg : '显示{0}条到{1}条,共{2}条',
	// plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
	emptyMsg : "没有符合条件的记录",
	items : [ '-', '&nbsp;&nbsp;', proDetailpagesize_combo ]
});

var planProdListPanel = new Ext.grid.GridPanel({
            height : 315,
            store : planProdStore,
            frame : true,
            cm : planProdColumns,
            stripeRows : true,
            bbar : proDetailbbar
        });
