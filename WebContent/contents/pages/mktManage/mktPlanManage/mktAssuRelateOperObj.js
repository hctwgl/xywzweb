	//执行对象--个人
	var operateUser = new Com.yucheng.crm.common.OrgUserManage({ 
						xtype:'userchoose',
						fieldLabel : '执行人', 
						labelStyle: 'text-align:right;',
						name : 'CUST_MANAGER',
						id:'operateUser',
						hiddenName:'OPER_USER',
						//searchRoleType:('127,47'),  //指定查询角色属性
						searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
						singleSelect:false,
						anchor : '90%',
						callback:function(){
						Ext.MessageBox.confirm('提示','确定执行该操作吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
											return;
											}
			        			 Ext.Ajax.request({
										url : basepath + '/marketassudetailinfo!saveData.json',
										params : {
											'operUserId':searchmktRelateOperObj.form.findField('OPER_USER').getValue(),
											'operUserName':searchmktRelateOperObj.form.findField('CUST_MANAGER').getValue(),
											'taskId':mktAssEditInfoForm.form.findField('taskId').getValue(),
											'distTaskType':mktAssEditInfoForm.form.findField('distTaskType').getValue()
										},
										method : 'POST',
										form : searchmktRelateOperObj.getForm().id,
										waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
										success : function() {
											Ext.Msg.alert('提示', '操作成功!');
											mktRelateOperObjStore.reload({
												params : {
													start : 0,
													limit : parseInt(mktRelateOperObj_combo.getValue())
												}
												});
										},
										failure : function(response) {
											var resultArray = Ext.util.JSON.decode(response.status);
										       if(resultArray == 403) {
										           Ext.Msg.alert('提示', response.responseText);
										  } else{

											Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
										}
//											store.reload();
										}
									});	
						});
						}
						});
	//执行对象--机构
	var operateOrg = new Com.yucheng.bcrm.common.OrgField({
						searchType:'SUBTREE',/*指定查询机构范围属性  SUBTREE（子机构树）SUBORGS（直接子机构）PARENT（父机构）PARPATH （所有父、祖机构）ALLORG（所有机构）*/
						fieldLabel : '搜索对象->>',
						labelStyle : 'text-align:left;',
						id : 'operateOrg', //放大镜组件ID，用于在重置清空时获取句柄
						name : 'CUST_ORG', 
						hiddenName: 'instncode',   //后台获取的参数名称
						anchor : '90%',
						checkBox:true, //复选标志
						callback:function(){
						Ext.MessageBox.confirm('提示','确定执行该操作吗?',function(buttonId){
											if(buttonId.toLowerCase() == "no"){
											return;
											}						
			        			 Ext.Ajax.request({
										url : basepath + '/marketassudetailinfo!saveData.json',
										params : {
											'operUserId':searchmktRelateOperObj.form.findField('instncode').getValue(),
											'operUserName':searchmktRelateOperObj.form.findField('CUST_ORG').getValue(),
											'taskId':mktAssEditInfoForm.form.findField('taskId').getValue(),
											'distTaskType':mktAssEditInfoForm.form.findField('distTaskType').getValue()
										},
										method : 'POST',
										form : searchmktRelateOperObj.getForm().id,
										waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
										success : function() {
											Ext.Msg.alert('提示', '操作成功!');
											mktRelateOperObjStore.reload({
												params : {
													start : 0,
													limit : parseInt(mktRelateOperObj_combo.getValue())
												}
												});
										},
										failure : function(response) {
											var resultArray = Ext.util.JSON.decode(response.status);
										       if(resultArray == 403) {
										           Ext.Msg.alert('提示', response.responseText);
										  } else{

											Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
										}
//											store.reload();
										}
									});	 
						});
						}
						});

    var mktRelateOperObjRecord = Ext.data.Record.create(
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
    var mktRelateOperObjReader = new Ext.data.JsonReader(//读取jsonReader
    		{
    			successProperty : 'success',
    			idProperty : 'ID',
    			totalProperty : 'json.count',
    			root:'json.data'
    		},mktRelateOperObjRecord
	);
	var mktRelateOperObjStore = new Ext.data.Store({//产品对照关系store
	        restful : true, 
	        proxy : new Ext.data.HttpProxy({ 
	        	url:basepath+'/marketassudetailinfo.json',
	        	method:'get'
	        }),
			reader:mktRelateOperObjReader
			
	});
	
    	mktRelateOperObjStore.on('beforeload', function() {
    		this.baseParams = {
    			taskId:mktAssEditInfoForm.form.findField('taskId').getValue(),
    			querysign:'oper_obj'
    		};
    	});
	// 每页显示条数下拉选择框
	var mktRelateOperObj_combo = new Ext.form.ComboBox({
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

//	mktRelateOperObjStore.reload({
//		params : {
//			start : 0,
//			limit : parseInt(mktRelateOperObj_combo.getValue())
//		}
//	});
	// 改变每页显示条数reload数据
	mktRelateOperObj_combo.on("select", function(comboBox) {
		mktRelateOperObjBbar.pageSize = parseInt(mktRelateOperObj_combo.getValue()),
		mktRelateOperObjStore.reload({
			params : {
				start : 0,
				limit : parseInt(mktRelateOperObj_combo.getValue())
			}
		});
	});

	var mktRelateOperObjBbar= new Ext.PagingToolbar({//gridTable 底部工具栏	
			pageSize : parseInt(mktRelateOperObj_combo.getValue()),
			store : mktRelateOperObjStore,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', mktRelateOperObj_combo ]
	});
	 var mktRelateOperObjSm = new Ext.grid.CheckboxSelectionModel();
	// 定义自动当前页行号
	 var prod_rownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	    });
	 var mktRelateOperObjColumns = new Ext.grid.ColumnModel(
				{
					columns:[prod_rownum,mktRelateOperObjSm,
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
	 /*************************************列模型***********************************************/

	 var searchmktRelateOperObj = new Ext.form.FormPanel({
            labelWidth : 80,
            hight:'50',
            labelAlign : 'right',
            frame : true,
            region : 'north',
            autoScroll : true,
            layout : 'column',
            items : [ {
                columnWidth : .33,
                layout : 'form',
                items : [operateOrg,operateUser]
            }]
        });

	 var mktRelateOperObjGrid = new Ext.grid.EditorGridPanel({			
			store:mktRelateOperObjStore, 
			frame:true,
			height : 300,
//			width : 200,
			cm:mktRelateOperObjColumns,
			region:'center',
			sm:mktRelateOperObjSm,
//			tbar:[new Ext.form.Label({
//				text:'搜索对象->>:'
//				}),operateUser,operateOrg
//			      ],
			      bbar:mktRelateOperObjBbar,
			      viewConfig : {// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
	 			  },
	 			  loadMask : {
	 				  msg : '正在加载表格数据,请稍等...'
	 			  }
	 });
	 
	 var mktRelateOperObjInfo = new Ext.Panel({
		autoScroll:true,
//		height:300,
		id:'info2',
		layout : 'fit',
		items : [{
	        	 layout : 'form',
	        	 border : false,
	        	 items : [{
	                 region : 'north',
	                 hight:50,
	                 layout : 'fit',
	                 items : [ searchmktRelateOperObj ]
	             },{
	                 region : 'center',
	                 layout : 'fit',
	                 height:340,
	                 border : false,
	                 items : [ mktRelateOperObjGrid]
	             }]
				}]
	});
	 