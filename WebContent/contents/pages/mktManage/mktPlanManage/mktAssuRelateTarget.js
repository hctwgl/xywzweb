			var rowNo1=-1;
		//指标信息		
		var searchIndex_mend = new Com.yucheng.crm.common.IndexField({ 
					xtype:'userchoose',
					fieldLabel : '指标列表', 
					id:'searchIndex_mend',
					name:'searchIndex_mend',
					hiddenName:'searchIndex_mend',
					labelStyle: 'text-align:right;',
					singleSelect:false,
					anchor : '90%',
					callback :function(a,b,c,d){
						debugger;
					var mgr_namess = null;
					records1 = mktRelateTargetGrid.getSelectionModel().selection;
					var mgrIds1 = '';
					mgr_namess = Ext.getCmp('searchIndex_mend').getValue();
					if (mgr_namess != null && mgr_namess != ''){
		            mktRelateTargetStore_mend.getAt(rowNo1).data.targetCode =this.ID;
		            mktRelateTargetStore_mend.getAt(rowNo1).data.targetName =this.NAME;
		            mktRelateTargetStore_mend.getAt(rowNo1).data.targetMark =this.CONTENT;
		            mktRelateTargetGrid.getView().refresh(false);
						}
						}
					});

    var mktRelateTargetRecord = Ext.data.Record.create(
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
    var mktRelateTargetReader = new Ext.data.JsonReader(//读取jsonReader
    		{
    			successProperty : 'success',
    			idProperty : 'ID',
    			totalProperty : 'json.count',
    			root:'json.data'
    		},mktRelateTargetRecord
	);
	var mktRelateTargetStore_mend = new Ext.data.Store({//产品对照关系store
	        restful : true, 
	        proxy : new Ext.data.HttpProxy({ 
	        	url:basepath+'/marketassudetailinfo.json',
	        	method:'get'
	        }),
			reader:mktRelateTargetReader
			
	});
	
	// 每页显示条数下拉选择框
	var mktRelateTarget_combo = new Ext.form.ComboBox({
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
    	mktRelateTargetStore_mend.on('beforeload', function() {
    		this.baseParams = {
    				querysign:'target',
    				taskId:mktAssEditInfoForm.form.findField('taskId').getValue()
    		};
    	});
//	mktRelateTargetStore_mend.reload({
//		params : {
//			start : 0,
//			limit : parseInt(mktRelateTarget_combo.getValue())
//		}
//	});
	// 改变每页显示条数reload数据
	mktRelateTarget_combo.on("select", function(comboBox) {
		mktRelateTargetBbar.pageSize = parseInt(mktRelateTarget_combo.getValue()),
		mktRelateTargetStore_mend.reload({
			params : {
				start : 0,
				limit : parseInt(mktRelateTarget_combo.getValue())
			}
		});
	});

	var mktRelateTargetBbar= new Ext.PagingToolbar({//gridTable 底部工具栏	
			pageSize : parseInt(mktRelateTarget_combo.getValue()),
			store : mktRelateTargetStore_mend,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', mktRelateTarget_combo ]
	});
	 var mktRelateTargetSm = new Ext.grid.CheckboxSelectionModel();
	// 定义自动当前页行号
	 var prod_rownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	    });
	 var mktRelateTargetColumns = new Ext.grid.ColumnModel({
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
	                sortable : true,
 					editor : searchIndex_mend
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
                    sortable : true,
                    editor : new Ext.form.Field()
             		},{
                    header : '目标值',
                    width : 100,
                    align : 'right',
                    dataIndex : 'targetValue',
                    sortable : true,
                    editor : new Ext.form.Field()
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

//	 var searchmktRelateTarget = new Ext.form.FormPanel({
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
//                items : [searchIndex_mend]
//            }]
//        });
	 
	    	var taskAdd_mend = function(){
	    		debugger;
            var u = new mktRelateTargetStore_mend.recordType({
            	"targetNo" :"",             
				"targetCode" :"",
				"targetName" :"",
				"targetMark":"",
				"originalValue" :"",
				"targetValue" :"",
				"achieveValue" :"",
				"achievePercent":""
            });
            mktRelateTargetGrid.stopEditing();
            mktRelateTargetStore_mend.insert(0, u);
            mktRelateTargetGrid.startEditing(0, 0);
        };
        
    	var onDelete_mend = function(){
        var index = mktRelateTargetGrid.getSelectionModel().getSelectedCell();
        if (!index) {
        	alert("请选择一条记录");
            return false;
        }
        var rec = mktRelateTargetStore_mend.getAt(index[0]);
        mktRelateTargetStore_mend.remove(rec);
    	};

	 var mktRelateTargetGrid = new Ext.grid.EditorGridPanel({	
	 		tbar:[{
		            text : '新增',
		            iconCls:'addIconCss',
		            handler:function() {
		            mktRelateTargetInfo.buttons[0].setDisabled(false);
		            taskAdd_mend();
		        }},{
                text : '删除',
                iconCls:'deleteIconCss',
                handler:function() {
                	 mktRelateTargetInfo.buttons[0].setDisabled(false);
                    onDelete_mend();
                },
                scope: this
                }/*new Ext.form.Label({
				text:'搜索对象->>:'
				}),operateUser,operateOrg*/
			 ],
			store:mktRelateTargetStore_mend, 
			frame:true,
			height : 300,
			stripeRows : true,
			clicksToEdit : 1,
			cm:mktRelateTargetColumns,
//			sm:mktRelateTargetSm,
		      bbar:mktRelateTargetBbar,
		      viewConfig : {// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
 			  }
	 });
	 
	 	 mktRelateTargetGrid.on('cellclick',function(grid,row,col){//获取编辑的行数，从0开始，
				rowNo1=row;	
			});
	 
	 var mktRelateTargetInfo = new Ext.Panel({
		autoScroll:true,
		height:300,
		id:'info3',
		layout : 'fit',
		items : [mktRelateTargetGrid],
		buttonAlign:'center',
		buttons:[{
		text:'保存',
		disabled:true,
		handler:function(){
		if(''==mktAssEditInfoForm.form.findField('taskId').getValue()||null==mktAssEditInfoForm.form.findField('taskId').getValue()){
		Ext.Msg.alert('系统提示','请完善基本信息再执行此操作!');
		return false;
		}
		 var json0 = {'targetNo':[]};
		 var json1 = {'targetCode':[]};
		 var json2 = {'originalValue':[]};
		 var json3 = {'targetValue':[]};
		 var json4 = {'achieveValue':[]};
		 var json5 = {'achievePercent':[]};
	for(var i=0;i<mktRelateTargetStore_mend.getCount();i++){
    var temp=mktRelateTargetStore_mend.getAt(i);
    if(temp.data.targetCode!=''){
    	json0.targetNo.push(temp.data.targetNo);
        json1.targetCode.push(temp.data.targetCode);
        json2.originalValue.push(temp.data.originalValue);
        json3.targetValue.push(temp.data.targetValue);
        json4.achieveValue.push(temp.data.achieveValue);
        json5.achievePercent.push(temp.data.achievePercent);
    	}else{
    	Ext.Msg.alert('系统提示','请选择指标!');
    		return false;
    	}
	}
    Ext.Msg.wait('正在保存，请稍后......','系统提示');
    Ext.Ajax.request({
        url : basepath + '/marketassudetailinfo!saveData.json',
        method : 'POST',
        waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
        params:{
            'targetNo':Ext.encode(json0),
            'targetCode':Ext.encode(json1),
            'originalValue':Ext.encode(json2),
            'targetValue':Ext.encode(json3),
            'achieveValue':Ext.encode(json4),
            'achievePercent':Ext.encode(json5),
            'taskId':mktAssEditInfoForm.form.findField('taskId').getValue(),
            'querysign':'target'
        },
        success : function() {
            Ext.Msg.alert('提示', '操作成功');
            mktRelateTargetInfo.buttons[0].setDisabled(true);
        },
        failure : function(response) {
            Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
        }
    });
		}},{
		text:'重置',
		handler:function(){
		mktRelateTargetStore_mend.reload({
			params : {
				start : 0,
				limit : parseInt(mktRelateTarget_combo.getValue())
			}
		});
		}
		}]
	});