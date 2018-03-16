			var rowNo1=-1;
		//指标信息		
		var searchIndex = new Com.yucheng.crm.common.IndexField({ 
					xtype:'userchoose',
					fieldLabel : '指标列表', 
					id:'searchIndex',
					name:'searchIndex',
					hiddenName:'searchIndex',
					labelStyle: 'text-align:right;',
					singleSelect:false,
					anchor : '90%',
					callback :function(a,b,c,d){
					var mgr_namess = null;
					records1 = mktCloseGrid.getSelectionModel().selection;
					var mgrIds1 = '';
					mgr_namess = Ext.getCmp('searchIndex').getValue();
					if (mgr_namess != null && mgr_namess != ''){
		            mktCloseStore.getAt(rowNo1).data.targetCode =this.ID;
		            mktCloseStore.getAt(rowNo1).data.targetName =this.NAME;
		            mktCloseGrid.getView().refresh(false);
						}
						}
					});

    var mktCloseRecord = Ext.data.Record.create(
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
    var mktCloseReader = new Ext.data.JsonReader(//读取jsonReader
    		{
    			successProperty : 'success',
    			idProperty : 'ID',
    			totalProperty : 'json.count',
    			root:'json.data'
    		},mktCloseRecord
	);
	var mktCloseStore = new Ext.data.Store({//产品对照关系store
	        restful : true, 
	        proxy : new Ext.data.HttpProxy({ 
	        	url:basepath+'/marketassudetailinfo.json',
	        	method:'get'
	        }),
			reader:mktCloseReader
			
	});
	
	// 每页显示条数下拉选择框
	var mktClose_combo = new Ext.form.ComboBox({
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
    	mktCloseStore.on('beforeload', function() {
    		this.baseParams = {
    				querysign:'target',
    				taskId:taskId
    		};
    	});
//	mktCloseStore.reload({
//		params : {
//			start : 0,
//			limit : parseInt(mktClose_combo.getValue())
//		}
//	});
	// 改变每页显示条数reload数据
	mktClose_combo.on("select", function(comboBox) {
		mktCloseBbar.pageSize = parseInt(mktClose_combo.getValue()),
		mktCloseStore.reload({
			params : {
				start : 0,
				limit : parseInt(mktClose_combo.getValue())
			}
		});
	});

	var mktCloseBbar= new Ext.PagingToolbar({//gridTable 底部工具栏	
			pageSize : parseInt(mktClose_combo.getValue()),
			store : mktCloseStore,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', mktClose_combo ]
	});
	 var mktCloseSm = new Ext.grid.CheckboxSelectionModel();
	// 定义自动当前页行号
	 var prod_rownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	    });
	 var mktCloseColumns = new Ext.grid.ColumnModel({
         columns : [{
                    header : 'ID',
                    width : 100,
                    hidden:true,
                    align : 'center',
                    dataIndex : 'targetNo',
                    sortable : true,
                    editor : new Ext.form.Field()
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
// 					editor : searchIndex
 					},{
                    header : '指标描述',
                    width : 100,
                    align : 'center',
                    dataIndex : 'targetMark',
                    sortable : true,
                    editor : new Ext.form.Field()
             		},{
                    header : '初始值',
                    width : 100,
                    align : 'right',
                    dataIndex : 'originalValue',
                    sortable : true
//                    editor : new Ext.form.Field()
             		},{
                    header : '目标值',
                    width : 100,
                    align : 'right',
                    dataIndex : 'targetValue',
                    sortable : true
//                    editor : new Ext.form.Field()
             		},{
                    header : '达成值',
                    width : 100,
                    align : 'right',
                    dataIndex : 'achieveValue',
                    sortable : true,
                    editor : new Ext.form.Field()
             		},{
                    header : '达成率',
                    width : 100,
                    align : 'right',
                    dataIndex : 'achievePercent',
                    sortable : true,
                    editor : new Ext.form.Field()
             		}]
 				});
	 /*************************************列模型***********************************************/

//	 var searchmktClose = new Ext.form.FormPanel({
//            labelWidth : 80,
//            hight:'50',
//            labelAlign : 'right',
//            frame : true,
//            region : 'north',
//            autoScroll : true,
//            layout : 'column',
//            items : [ {
//                columnWidth : .33,
//                layout : 'form',
//                items : [searchIndex]
//            }]
//        });
	 
	    	var taskAdd = function(){
	    		debugger;
            var u = new mktCloseStore.recordType({
            	"targetNo" :"",             
				"targetCode" :"",
				"targetName" :"",
				"targetMark":"",
				"originalValue" :"",
				"targetValue" :"",
				"achieveValue" :"",
				"achievePercent":""
            });
     mktCloseGrid.stopEditing();
            mktCloseStore.insert(0, u);
            mktCloseGrid.startEditing(0, 0);
        };
        
    	var onDelete = function(){
        var index = mktCloseGrid.getSelectionModel().getSelectedCell();
        if (!index) {
        	alert("请选择一条记录");
            return false;
        }
        var rec = mktCloseStore.getAt(index[0]);
        mktCloseStore.remove(rec);
    	};

	 var mktCloseGrid = new Ext.grid.EditorGridPanel({	
//	 		tbar:[{
//		            text : '新增',
//		            iconCls:'addIconCss',
//		            handler:function() {
//		            mktCloseInfo.buttons[0].setDisabled(false);
//		            taskAdd();
//		        }},{
//                text : '删除',
//                iconCls:'deleteIconCss',
//                handler:function() {
//                	 mktCloseInfo.buttons[0].setDisabled(false);
//                    onDelete();
//                },
//                scope: this
//                }/*new Ext.form.Label({
//				text:'搜索对象->>:'
//				}),operateUser,operateOrg*/
//			 ],
			store:mktCloseStore, 
			frame:true,
			height : 300,
			stripeRows : true,
			clicksToEdit : 1,
			cm:mktCloseColumns,
//			sm:mktCloseSm,
		      bbar:mktCloseBbar,
		      viewConfig : {// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
 			  }
	 });
	 
	 	 mktCloseGrid.on('cellclick',function(grid,row,col){//获取编辑的行数，从0开始，
				rowNo1=row;	
			});
	 
	 var mktCloseInfo = new Ext.Panel({
		autoScroll:true,
		height:300,
		id:'info3',
		layout : 'fit',
		items : [mktCloseGrid]
	});