Ext.onReady(function(){
	
	var rowNo1=-1;
	var myData = [ ['CNJ2013021800024','圆胜电子科技(昆山)有限公司','营业执照','MW-098334','对公','3987','秦青','19908','南京银行光华支行'] 
		                ,['CNJ2013021800025','苏州宇鑫电子有限公司南京办事','营业执照','VFZ-03438384','对公','3987','秦青','19908','南京银行光华支行']
		                ,['CNJ2013021800026','南京新月桑拿泳池设备有限公司','营业执照','TT-0934384','对公','3987','秦青','19908','南京银行光华支行']
		                ,['CNJ2013021800027','南京策杰贸易有限公司','营业执照','PHZ-234384', '对公','3987','秦青','19908','南京银行光华支行']
		                ,['CNJ2013021800028','南京百世照明电器有限公司','营业执照','H7N9-098322','对公','3987','秦青','19908','南京银行光华支行' ]
		                ,['CNJ2013021800029','南京多美达广告展览有限责任公司','营业执照','AZJ-092280','对公','3987','秦青','19908','南京银行光华支行']
		                ,['CNJ2013021800030','南京望凯电光源有限公司','营业执照','HW-0393382', '对公','3987','秦青','19908','南京银行光华支行']
		                ];
				var cusStore = new Ext.data.ArrayStore({
		               fields: [
		                  {name: 'a1'},
		                  {name: 'a2'},
		                  {name: 'a3'},
		                  {name: 'a4'},
		                  {name: 'a5'},
		                  {name: 'a6'},
		                  {name: 'a7'},
		                  {name: 'a8'},
		                  {name: 'a9'}
		               ]
		           });
		            cusStore.loadData(myData);
		             var customergrid = new Ext.grid.GridPanel({
		             	layout:'fit',
		               store: cusStore,
		               title : '关联客户信息',
		               viewConfig:{
//						   forceFit:true,
						   autoScroll:true
						},
		               columns: [
						{header:'客户编号',width:100,dataIndex:'a1'},
						{header:'客户名称',width:120,dataIndex:'a2'},
						{header:'证件类型',width:80,dataIndex:'a3'},
						{header:'证件号码',width:120,dataIndex:'a4'},
						{header:'客户类型',width:80,dataIndex:'a5'},
						{header:'归属客户经理ID',width:120,dataIndex:'a6'},
						{header:'归属客户经理',width:100,dataIndex:'a7'},
						{header:'归属机构ID',width:100,dataIndex:'a8'},
						{header:'归属机构',width:120,dataIndex:'a9'}
		               ],
		               stripeRows: true,
		               width: '150%',
		               height : 450
		           });
	
	 // 试运算展示窗口
        var viewWindow = new Ext.Window( {
            title : '客户信息列表',
            plain : true,
            layout : 'fit',
            width : 1000,
            height : 350,
            resizable : true,
            draggable : true,
            closable : true,
            closeAction : 'hide',
            modal : true, // 模态窗口
            loadMask : true,
            maximizable : true,
            collapsible : true,
            titleCollapse : true,
            border : false,
            items : [ customergrid ]
        });
	
	var searchIndex1 = new Com.yucheng.crm.common.IndexField({ 
					xtype:'userchoose',
					fieldLabel : '指标列表', 
					id:'searchIndex1',
					name:'searchIndex1',
					hiddenName:'searchIndex11',
					labelStyle: 'text-align:right;',
					singleSelect:true,
					anchor : '90%',
					callback :function(a,b,c,d){
					var mgr_namess = null;
					records1 = tarDictListPanel1.getSelectionModel().selection;
					var mgrIds1 = '';
					mgr_namess = Ext.getCmp('searchIndex1').getValue();
					if (mgr_namess != null && mgr_namess != ''){
		            partitionRuleStore.getAt(rowNo1).data.indexId =this.ID;
		            partitionRuleStore.getAt(rowNo1).data.indexName =this.NAME;
		            tarDictListPanel1.getView().refresh(false);
						}
						}
					});

	var fiexibleSearchPanel = new Ext.form.FormPanel({
        labelWidth : 100,
        height : 50,
        frame : true,
        labelAlign:'right',
        region : 'north',
        autoScroll : true,
        items : [{
                layout : 'column',
                items : [ {
              	  columnWidth : .50,
                  layout : 'form',
                  items : [{
                    xtype : 'textfield',
                    labelStyle : {
                            width : '120px'
                    },
                    Width : '100',
                    name : 'shemeName',
                    fieldLabel : '客户群规则名称',
                    anchor : '90%'
                  }]
            }, {
                columnWidth : .50,
                layout : 'form',
                items : [{

                        xtype : 'combo',
                        name : 'yearNum',
                        fieldLabel : '公开级别',
                        labelStyle : {
                                width : '120px'
                        },
                        width : '100',
                        mode : 'local',
                        store : new Ext.data.ArrayStore({
                                fields : ['myId', 'displayText'],
                                data : [[1, '私有'], [2, '辖内'],
                                        [3, '全行']]
                                }),
                        valueField : 'myId',
                        displayField : 'displayText',
                        anchor : '90%'
                	}]
        	}]
        	}]
			}); 
			
			
var tarDictColumns = new Ext.grid.ColumnModel({
         columns : [{
                     header : '左括号',
                     width : 100,
                     align : 'center',
                     dataIndex : 'leftPartList',
                     editor : new Ext.form.ComboBox({
					 typeAhead : true,
					 triggerAction : 'all',
					 lazyRender : true,
					 listClass : 'x-combo-list-small',
					 mode : 'local',
					 valueField : 'myId1',
					 displayField : 'displayText1',
					 store : new Ext.data.ArrayStore({
						id : 'tarName',
						fields : ['myId1', 'displayText1'],
						data : [['(', '('],
						       ['((', '(('],
						       ['(((', '(((']
								]})
						}),
                     sortable : true
             	}, {
	                header : '指标',
	                width : 200,
	                align : 'center',
	                dataIndex : 'indexName',
	                sortable : true,
 					editor : searchIndex1}
 					,{
	                header : '指标ID',
	                width : 200,
	                hidden:true,
	                align : 'center',
	                dataIndex : 'indexId',
	                sortable : true},
					{
                    header : '条件',
                    width : 50,
                    align : 'center',
                    dataIndex : 'condition',
                    sortable : true,
     				editor : new Ext.form.ComboBox({
					typeAhead : true,
					triggerAction : 'all',
					lazyRender : true,
					listClass : 'x-combo-list-small',
					mode : 'local',
					valueField : 'myId1',
					displayField : 'displayText1',
					store : new Ext.data.ArrayStore({
						id : 'tarName',
						fields : ['myId1', 'displayText1'],
						data : [['>', '大于'],
						       ['<', '小于'],
						       ['=', '等于']
								]})
 					})},
 				 {
                  header : '值',
                  width : 100,
                  align : 'center',
                   dataIndex : 'threshold',
                  sortable : true,
                  editor : new Ext.form.Field()
             		},{
                 header : '右括号',
                 width : 100,
                 align : 'center',
                 dataIndex : 'rightPartList',
                 editor : new Ext.form.ComboBox({
				 typeAhead : true,
				 triggerAction : 'all',
				 lazyRender : true,
				 listClass : 'x-combo-list-small',
				 mode : 'local',
				 valueField : 'myId1',
				 displayField : 'displayText1',
				 store : new Ext.data.ArrayStore({
					id : 'tarName',
					fields : ['myId1', 'displayText1'],
					data : [[')', ')'],
					       ['))', '))'],
					       [')))', ')))']
							]})
				}),
                 sortable : true
              },{
                 header : '连接符',
                 width : 100,
                 align : 'center',
                 dataIndex : 'connector',
                 editor : new Ext.form.ComboBox({
					typeAhead : true,
					triggerAction : 'all',
					lazyRender : true,
					listClass : 'x-combo-list-small',
					mode : 'local',
					valueField : 'myId1',
					displayField : 'displayText1',
					store : new Ext.data.ArrayStore({
								id : 'tarName',
								fields : ['myId1', 'displayText1'],
								data : [['AND', 'AND'],
								       ['OR', 'OR']
										]})
						}),
                 sortable : true
                 }]
 				});			
			
	var partitionRuleStore = new Ext.data.Store({//数据存储
				  	restful:true,
				  	proxy : new Ext.data.HttpProxy({url:basepath+'/partitionruleedit.json'
				  	}),
				  	  reader: new Ext.data.JsonReader({
					  totalProperty : 'json.count',
					  root:'json.data'
				  },  [{name: 'id', mapping: 'ID'}
				      ,{name: 'condition', mapping: 'CONDITION'}
				      ,{name: 'connector', mapping: 'CONNECTOR'}
				      ,{name: 'createDate',mapping:'CUST_MANAGER_TYPE'}
				      ,{name: 'createOrg', mapping: 'CREATE_ORG'}
				      ,{name: 'createUserId', mapping: 'CREATE_USER_ID'}
				      ,{name: 'custBaseId', mapping: 'CUST_BASE_ID'}
				      ,{name: 'indexId',mapping:'INDEX_ID'}
				      ,{name: 'leftPartList',mapping:'LEFT_PART_LIST'}
				      ,{name: 'rightPartList',mapping:'RIGHT_PART_LIST'}
				      ,{name: 'sqlStr', mapping: 'SQL_STR'}
				      ,{name: 'threshold', mapping: 'THRESHOLD'}
				      ,{name: 'indexName', mapping: 'INDEX_NAME'}
				      ])
			 		  });
			 		  
			    partitionRuleStore.on('beforeload', function() {
				this.baseParams = {
					'groupId':oCustInfo.groupId
				  };
			    });
			    partitionRuleStore.load();
			
		var tarDictListPanel1 = new Ext.grid.EditorGridPanel({
				tbar : [{
		            text : '新增',
		            iconCls:'addIconCss',
		            handler:function() {
		            onAdd();
		        }},{
                text : '删除',
                iconCls:'deleteIconCss',
                handler:function() {
                    onDelete();
                },
                scope: this
                }
	  		],
			height : document.body.scrollHeight-80,
			store : partitionRuleStore,
			frame : true,
			cm : tarDictColumns,
			stripeRows : true,
			clicksToEdit : 1
			});
		
		var checkResult = function() {
				if(partitionRuleStore.getCount()<1){
					Ext.Msg.alert('系统提示','您没有添加任何规则');
					return;
				}else{
				for(var i=0;i<partitionRuleStore.getCount();i++){
	                    var temp=partitionRuleStore.getAt(i);
	                    	if(""!=temp.data.leftPartList&&null!=temp.data.leftPartList){
	                        }else{
	                        Ext.Msg.alert('系统提示','左括号不能为空');
	                        return false;
	                        }
	                        if(""!=temp.data.indexId&&null!=temp.data.indexId){
//				                         json2.INDEX_ID.push(temp.data.indexId);
	                        }else{
	                        Ext.Msg.alert('系统提示','指标不能为空');
	                        return false;
	                        }if(""!=temp.data.condition&&null!=temp.data.condition){
//				                          json3.CONDITION.push(temp.data.condition);
	                        }else{
	                        Ext.Msg.alert('系统提示','条件不能为空');
	                        return false;
	                        }if(""!=temp.data.threshold&&null!=temp.data.threshold){
//				                           json4.THRESHOLD.push(temp.data.threshold);
	                        }else{
	                        Ext.Msg.alert('系统提示','阈值不能为空');
	                        return false;
	                        }if(""!=temp.data.rightPartList&&null!=temp.data.rightPartList){
//				                          json5.RIGHT_PART_LIST.push(temp.data.rightPartList);
	                        }else{
	                        Ext.Msg.alert('系统提示','右括号不能为空');
	                        return false;
	                        }if(""!=temp.data.connector&&null!=temp.data.connector){
//				                           json6.CONNECTOR.push(temp.data.connector);
	                        }else{
	                        Ext.Msg.alert('系统提示','连接符不能为空');
	                        return false;
	                        }
	                        return true;
			                    
			                }
						}
						};
			
     // 设置指标展示的from
    	var editDictForm = new Ext.form.FormPanel({
    		labelWidth : 150,
    		height : document.body.scrollHeight-30,
    		frame : true,
    		autoScroll : true,
    		buttonAlign : "center",
    		items : [
    				tarDictListPanel1
    					],
    					buttons : [
    						{
    						text : '规则校验',
    						handler : function(){
    						if(checkResult()){
    						 Ext.Msg.alert('系统提示','校验通过');
    						};
    						}
    					},
    					{
    						text : '保  存',
    						handler : function() {
							 var json0 = {'ID':[]};
							 var json1 = {'LEFT_PART_LIST':[]};
							 var json2 = {'INDEX_ID':[]};
							 var json3 = {'CONDITION':[]};
							 var json4 = {'THRESHOLD':[]};
							 var json5 = {'RIGHT_PART_LIST':[]};
							 var json6 = {'CONNECTOR':[]};
							 var countNum=0;
							 var json7={'SQL_STR':[]};
							 var ss = checkResult();
							 if(ss){
							for(var i=0;i<partitionRuleStore.getCount();i++){
				                    var temp=partitionRuleStore.getAt(i);
				                    if(temp.data.leftPartList!=''){
				                        json1.LEFT_PART_LIST.push(temp.data.leftPartList);
				                        json2.INDEX_ID.push(temp.data.indexId);
				                        json3.CONDITION.push(temp.data.condition);
				                        json4.THRESHOLD.push(temp.data.threshold);
				                        json5.RIGHT_PART_LIST.push(temp.data.rightPartList);
				                        json6.CONNECTOR.push(temp.data.connector);
				                        json7.SQL_STR.push(temp.data.connector + ' '
											+ temp.data.leftPartList + ' '
											+ temp.data.indexId + ' ' + temp.data.condition
											+ ' ' + temp.data.threshold + ' '
											+ temp.data.rightPartList + ' ');
				                    }
				                }
				                Ext.Msg.wait('正在保存，请稍后......','系统提示');
							Ext.Ajax.request({
				                    url : basepath + '/partitionruleedit!saveData.json',
				                    method : 'POST',
				                    waitMsg : '正在保存数据,请等待...', // 显示读盘的动画效果，执行完成后效果消失
				                    params:{
				                        'LEFT_PART_LIST':Ext.encode(json1),
				                        'INDEX_ID':Ext.encode(json2),
				                        'CONDITION':Ext.encode(json3),
				                        'THRESHOLD':Ext.encode(json4),
				                        'RIGHT_PART_LIST':Ext.encode(json5),
				                        'CONNECTOR':Ext.encode(json6),
				                        'groupId':oCustInfo.groupId,
				                        'SQL_STR':Ext.encode(json7)
				                    },
				                    success : function() {
				                        Ext.Msg.alert('提示', '操作成功');
				                    },
				                    failure : function(response) {
				                        Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
				                    }
				                });
    						}else{
    						 Ext.Msg.alert('系统提示', '校验未通过，请检查');
    						}
							}

    					},{
    						text : '重    置',
    						handler : function() {
    							partitionRuleStore.load();
    						}
    					},{
    						text : '试运算',
    						handler : function(){
    						if(!checkResult()){
    						 Ext.Msg.alert('系统提示','未通过校验');
    						}else{
    						viewWindow.show();
    						};
    						}
    					} ]

    	});
        
        tarDictListPanel1.on('cellclick',function(grid,row,col){//获取编辑的行数，从0开始，
				rowNo1=row;	
			});

			var onDelete = function(){
            var index = tarDictListPanel1.getSelectionModel().getSelectedCell();
            if (!index) {
            	alert("请选择一条记录");
                return false;
            }
            var rec = partitionRuleStore.getAt(index[0]);
            partitionRuleStore.remove(rec);
        	};
    
            var onAdd = function(){
            var u = new partitionRuleStore.recordType({
            	"id" :"",             
				"condition" :"",
				"connector" :"",
				"createDate":"",
				"createOrg" :"",
				"createUserId" :"",
				"custBaseId" :"",
				"indexId":"",     
				"leftPartList":"",
				"rightPartList":"",
				"sqlStr" :"", 
				"threshold" :""
            });
            tarDictListPanel1.stopEditing();
            partitionRuleStore.insert(0, u);
            tarDictListPanel1.startEditing(0, 0);
        };

        var queryStr = '';
	 	  var batchAdd= function(){
		  var checkedNodes = customerInfoGrid.getSelectionModel().selections.items;
		  var json={'cust_id':[]};
		  var json1={'cust_zh_name':[]};
		  var json2={'mgr_id':[]};
		  var json3={'mgr_name':[]};
		  var json4={'institution':[]};
		  var json5={'institution_name':[]};
		  if(checkedNodes.length==0)
		  {
			  Ext.Msg.alert('提示', '未选择任何客户');
			  return false;
		  }
		  Ext.MessageBox.confirm('提示','确定将所选客户加入到该群吗?',function(buttonId){
			if(buttonId.toLowerCase() == "no"){
			return false;
			}else{
			for(var i=0;i<checkedNodes.length;i++)
		  {
			  json.cust_id.push(checkedNodes[i].data.CUST_ID);
			  json1.cust_zh_name.push(checkedNodes[i].data.CUST_ZH_NAME);
			  json2.mgr_id.push(checkedNodes[i].data.MGR_ID);
			  json3.mgr_name.push(checkedNodes[i].data.MGR_NAME);
			  json4.institution.push(checkedNodes[i].data.INSTITUTION);
			  json5.institution_name.push(checkedNodes[i].data.INSTITUTION_NAME);
		  }
		
		  Ext.Msg.wait('正在保存，请稍后......','系统提示');
		  Ext.Ajax.request({
			  url:basepath+'/groupmemberedit!saveData.json',
			  method: 'POST',
			  success : function(response) {
			  Ext.Msg.alert('提示', '加入成功');
			  groupLeaguerStore.reload({
		  		  params : {
				  start : 0,
				  limit : parseInt(groupLeaguerpagesize_combo.getValue())
				  }
				  });
			  customerInfoStore.reload({
				  params : {
				  start : 0,
				  limit : parseInt(customerInfopagesize_combo.getValue())
			      }
		});
		  },	
		  failure : function(response) {
			  var resultArray = Ext.util.JSON.decode(response.status);
			  if(resultArray == 403) {
				  Ext.Msg.alert('提示','您没有此权限!');
			  } else {
				  Ext.Msg.alert('提示','加入失败!');
			  }
		  },
		  params : {
			  'CUST_ID': Ext.encode(json),
			  'CUST_ZH_NAME': Ext.encode(json1),
			  'CUST_BASE_ID':oCustInfo.groupId,
			  'MGR_ID':Ext.encode(json2),
			  'MGR_NAME':Ext.encode(json3),
			  'INSTITUTION':Ext.encode(json4),
			  'INSTITUTION_NAME':Ext.encode(json5)
		  }});
			}});
		  
	  };	
	  
	  //客户群成员删除功能
	   var batchDelete=function(){
		  var checkedNodes = groupLeaguerGrid.getSelectionModel().selections.items;
				if(checkedNodes.length==0)
				{
					Ext.Msg.alert('提示', '未选择任何客户');
					return ;
				}
				var json={'id':[]};
				for(var i=0;i<checkedNodes.length;i++)
				{
					json.id.push(checkedNodes[i].data.ID);
				}
				var id =checkedNodes[0].data.ID;
				Ext.Ajax.request({url: basepath+'/groupmemberedit!dropData.json',
					method: 'POST',
					success : function(response) {
					Ext.Msg.alert('提示', '删除成功');
					groupLeaguerStore.reload({
							params : {
							start : 0,
							limit : parseInt(groupLeaguerpagesize_combo.getValue())
						}
						});
				},
				failure : function(response) {
					var resultArray = Ext.util.JSON.decode(response.status);
					if(resultArray == 403) {
						Ext.Msg.alert('提示','您没有此权限!');
					} else {
						Ext.Msg.alert('提示','删除失败!');
					}
				},
				params : {
					'delStr':Ext.encode(json)
				}
				});
	  };
	  
	//新增客户群成员的表格面板 
	var customerInfoTar = new Ext.Toolbar({
		items:[{
		    text:'归入客户群',
		    iconCls:'guiRuIconCss',
		    handler:function(){
		        batchAdd();
		    }
		}]
	});	
	
	//客户类型
	var customerTypeStore = new Ext.data.Store({
		restful:true,   
		autoLoad :true,
		proxy : new Ext.data.HttpProxy({
				url :basepath+'/lookup.json?name=PAR0100021'
		}),
		reader : new Ext.data.JsonReader({
			root : 'JSON'
		}, [ 'key', 'value' ])
	});	
var searchPanel1 = new Ext.form.FormPanel( {
//            title : "查询条件",
            labelWidth : 60,
            hight:'80',
            labelAlign : 'right',
            frame : true,
            region : 'north',
            autoScroll : true,
            layout : 'column',
            items : [ {
                columnWidth : .33,
                layout : 'form',
                items : [{
                    xtype : 'textfield',
                    fieldLabel : '客户名称',
                    name : 'CUST_ZH_NAME',
                    anchor : '99%'
                }]
            }, {
                columnWidth : .33,
                layout : 'form',
                items : [{
                    xtype : 'textfield',
                    fieldLabel : '客户编号',
                    name : 'CUST_ID',
                    anchor : '99%'
                } ]
            }, {
                columnWidth : .33,
                layout : 'form',
                items : [new Ext.form.ComboBox({
							hiddenName : 'CUST_TYP',
							name : 'CUST_TYP',
							fieldLabel : '客户类型',
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : customerTypeStore,
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '99%'
						})]
            }],
            buttonAlign : 'center',
            buttons : [ {
                text : '查询',
                handler : function() {
                if (!searchPanel1.getForm().isValid()) {
                    Ext.Msg.alert("提醒", "请填写必填项");
                    return false;
                }
                queryStr = searchPanel1.getForm().getValues(false);
	            customerInfoStore.load( {
	                params : {
	                    start : 0,
	                    limit : parseInt(customerInfopagesize_combo.getValue())
	                }
	            });
            }
            }, {
                text : '重置',
                handler : function() {
                    searchPanel1.getForm().reset();
                }
            } ]
        });
        
        //判定，当群成员类型为对公或对私时，客户类型不展示
        	if('1'==oCustInfo.groupMemberType){
        	 searchPanel1.form.findField('CUST_TYP').setVisible(false);
        }else if('2'==oCustInfo.groupMemberType){
        	 searchPanel1.form.findField('CUST_TYP').setVisible(false);
        	}else{
        	 searchPanel1.form.findField('CUST_TYP').setVisible(true);
        	};
        
	var custTypStore = new Ext.data.Store( {//客户类型代码
		restful : true,
		sortInfo : {
			field : 'key',
			direction : 'ASC'
		},
		autoLoad : true,
		proxy : new Ext.data.HttpProxy( {
			url : basepath + '/lookup.json?name=PAR0100021'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'JSON',
			totalProperty : 'list'
		}, [ 'key', 'value' ])
	});
	
	//客户群成员分页，列模型等
	var groupLeaguerSm = new Ext.grid.CheckboxSelectionModel();
	var groupLeaguerrownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	});

	// 定义列模型
	var groupLeaguerCm = new Ext.grid.ColumnModel([groupLeaguerrownum,groupLeaguerSm,
		{header : 'ID', dataIndex : 'ID',sortable : true,width : 150,hidden:true,hideable:false}, 
        {header : '客户号', dataIndex : 'CUST_ID',sortable : true,width : 150}, 
        {header : '客户名称', dataIndex : 'CUST_ZH_NAME',sortable : true,width : 150 }, 
        {header : '证件类型',dataIndex : 'CERT_TYPE',sortable : true,width : 150,hidden:true,hideable:false},
        {header : '证件类型',dataIndex : 'CERT_TYPE_ORA',sortable : true,width : 150},
        {header : '证件号码',dataIndex : 'CERT_NUM',sortable : true,width : 150}, 
        {header : '客户类型',dataIndex : 'CUST_TYP',sortable : true,width : 150,
            renderer : function(value){
            if(!value)
                return '';
            else if(custTypStore.query('key',value,false,true).first()==undefined)
                return '';
            else	
                return custTypStore.query('key',value,false,true).first().get('value');
            }
        }
    ]);

	/**
	 * 数据存储
	 */
	var groupLeaguerStore = new Ext.data.Store({
		restful:true,	
		proxy : new Ext.data.HttpProxy({
		url:basepath+'/groupmemberedit.json',
			failure : function(response) {
			var resultArray = Ext.util.JSON.decode(response.status);
			if(resultArray == 403) {
				Ext.Msg.alert('提示','您没有此权限!');
			} 
		}
		}),
		reader: new Ext.data.JsonReader({
			totalProperty : 'json.count',
			root:'json.data'
		}, [ 'ID','CUST_ID','CUST_ZH_NAME','CERT_TYPE','CERT_TYPE_ORA','CERT_NUM','CUST_LEV','CUST_TYP'])
	});
		
	    groupLeaguerStore.on('beforeload', function() {
		this.baseParams = {
				querySign:'queryGroupMember',
				groupId: oCustInfo.groupId
				
		  };
	    });
	
	// 每页显示条数下拉选择框
	var groupLeaguerpagesize_combo = new Ext.form.ComboBox({
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
	var groupLeaguernumber = parseInt(groupLeaguerpagesize_combo.getValue());
	groupLeaguerpagesize_combo.on("select", function(comboBox) {// 改变每页显示条数reload数据
		groupLeaguerBar.pageSize = parseInt(groupLeaguerpagesize_combo.getValue());
		groupLeaguerStore.reload({
			params : {
			start : 0,
			limit : parseInt(groupLeaguerpagesize_combo.getValue())
		}
		});
	});
	
	var groupLeaguerBar = new Ext.PagingToolbar({// 分页工具栏
		pageSize : groupLeaguernumber,
		store : groupLeaguerStore,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		emptyMsg : "没有符合条件的记录",
		items : ['-', '&nbsp;&nbsp;', groupLeaguerpagesize_combo]
	});
	//end
	
	//待加入成员列表
	var customerInfoSm = new Ext.grid.CheckboxSelectionModel();
	var customerInforownum = new Ext.grid.RowNumberer({
		header : 'No.',
		width : 28
	});

	// 定义列模型
	var customerInfoCm = new Ext.grid.ColumnModel([customerInforownum,customerInfoSm,
        {header : '客户号', dataIndex : 'CUST_ID',sortable : true,width : 150}, 
        {header : '客户名称', dataIndex : 'CUST_ZH_NAME',sortable : true,width : 150 }, 
        {header : '归属客户经理ID', dataIndex : 'MGR_ID',sortable : true,width : 150 ,hidden:true,hideable:false},
        {header : '归属客户经理', dataIndex : 'MGR_NAME',sortable : true,width : 150,hidden:true,hideable:false }, 
        {header : '归属机构ID', dataIndex : 'INSTITUTION',sortable : true,width : 150 ,hidden:true,hideable:false},       
        {header : '客户归属机构', dataIndex : 'INSTITUTION_NAME',sortable : true,width : 150 ,hidden:true,hideable:false},
        {header : '客户类型',dataIndex : 'CUST_TYP',sortable : true,width : 150,
            renderer : function(value){
            if(!value)
                return '';
            else if(custTypStore.query('key',value,false,true).first()==undefined)
                return '';
            else	
                return custTypStore.query('key',value,false,true).first().get('value');
            }
        }
    ]);

	/**
	 * 数据存储
	 */
	var customerInfoStore = new Ext.data.Store({
		restful:true,	
		proxy : new Ext.data.HttpProxy({
		url:basepath+'/groupmemberedit.json',
			failure : function(response) {
			var resultArray = Ext.util.JSON.decode(response.status);
			if(resultArray == 403) {
				Ext.Msg.alert('提示','您没有此权限!');
			} 
		}
		}),
		reader: new Ext.data.JsonReader({
			totalProperty : 'json.count',
			root:'json.data'
		}, [ 'CUST_ID','CUST_ZH_NAME','CERT_TYPE','CERT_NUM','CUST_LEV','CUST_TYP','MGR_ID','MGR_NAME','INSTITUTION','INSTITUTION_NAME'])
	});
	    customerInfoStore.on('beforeload', function() {
	    	if(''!=queryStr){
	    	__Str = Ext.encode(queryStr);	
	    	}else{
	    	__Str='';	
	    	}
		this.baseParams = {
				"condition":__Str,
				custType:oCustInfo.groupMemberType,
				querySign:'queryCustomer',
				groupId: oCustInfo.groupId
		  };
	    });
	
	// 每页显示条数下拉选择框
	var customerInfopagesize_combo = new Ext.form.ComboBox({
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
	var customerInfonumber = parseInt(customerInfopagesize_combo.getValue());
	customerInfopagesize_combo.on("select", function(comboBox) {// 改变每页显示条数reload数据
		customerInfoBar.pageSize = parseInt(customerInfopagesize_combo.getValue());
		customerInfoStore.reload({
			params : {
			start : 0,
			limit : parseInt(customerInfopagesize_combo.getValue())
		}
		});
	});
	
	var customerInfoBar = new Ext.PagingToolbar({// 分页工具栏
		pageSize : customerInfonumber,
		store : customerInfoStore,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		emptyMsg : "没有符合条件的记录",
		items : ['-', '&nbsp;&nbsp;', customerInfopagesize_combo]
	});
	//end

	var groupLeaguerGrid = new Ext.grid.GridPanel({
		height: document.body.scrollHeight-30,
		title : '客户群成员列表',
		frame : true,
		autoScroll : true,
		store : groupLeaguerStore, // 数据存储
		stripeRows : true, // 斑马线
		cm : groupLeaguerCm, // 列模型
		sm : groupLeaguerSm, // 复选框
		bbar : groupLeaguerBar,
		tbar:[{
					text : '客户视图',
					iconCls :'custGroupMemIconCss',
					handler : function() {
			        var checkedNodes = groupLeaguerGrid.getSelectionModel().selections.items;
						if(checkedNodes.length==0)
							{
								Ext.Msg.alert('提示', '未选择任何客户');
								return ;
							}
						else if(checkedNodes.length>1)
						{
							Ext.Msg.alert('提示', '您只能选中一个客户进行查看');
							return ;
						}
						var custViewWindow = new Com.yucheng.crm.cust.ViewWindow({
							id:'custViewWindow',
							custId:checkedNodes[0].data.CUST_ID,
							custName:checkedNodes[0].data.CUST_ZH_NAME,
							custTyp:checkedNodes[0].data.CUST_TYP
						});
						
						Ext.Ajax.request({
							url : basepath + '/commsearch!isMainType.json',
							mothed : 'GET',
							params : {
							'mgrId' : __userId,
							'custId' : checkedNodes[0].data.CUST_ID
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
							oCustInfo.cust_id = checkedNodes[0].data.CUST_ID;
							oCustInfo.cust_name = checkedNodes[0].data.CUST_ZH_NAME;
							oCustInfo.cust_type = checkedNodes[0].data.CUST_TYP;
							oCustInfo.view_source = 'viewport_center';
							custViewWindow.show();
						
						},
						failure : function(form, action) {}
						});
					
			
					}
				},{'text':'移除客户群',iconCls:'deleteIconCss',handler:function(){
			  batchDelete();
		  }}				 
		  ],
        viewConfig : {
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
	
	var customerInfoGrid = new Ext.grid.GridPanel({
		height: document.body.scrollHeight-110,
//		title : '待加入客户列表',
		frame : true,
		autoScroll : true,
		store : customerInfoStore, // 数据存储
		stripeRows : true, // 斑马线
		cm : customerInfoCm, // 列模型
		sm : customerInfoSm, // 复选框
		bbar : customerInfoBar,
        tbar:customerInfoTar,
        viewConfig : {
		},
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		}
	});
	
	groupLeaguerStore.load({
			params : {
			start : 0,
			limit : parseInt(groupLeaguerpagesize_combo.getValue())
		}
		});

		
        // 手动选择设置
        var replacePanel = new Ext.Panel( {
            layout : 'fit',
            autoScroll : true,
            buttonAlign : "center",
            items : [ {
			             region : 'north',
			             height : 80,
			             layout : 'fit',
			             items : [ searchPanel1 ]
			         		},{
			             region : 'center',
			             layout : 'fit',
			             items : [ customerInfoGrid]
			             	} ]
        });
        if(oCustInfo.custFrom=='2'){
       replacePanel = editDictForm;
        }
		
		var viewBlocBaseInfo = new Ext.Panel({
		renderTo:'group_viewport_center',//仅客户群视图使用
		autoScroll:true,
		height:document.body.scrollHeight-30,
		layout : 'fit',
		items : [{
				 layout : 'column',
				 border : false,
				 items : [{
		        	 columnWidth :__modelSign1,
		        	 layout : 'form',
		        	 hidden:__hiddeAble,
		        	 border : false,
		        	 items : [replacePanel]
				         	},{
			        	 columnWidth :__modelSign2,
			        	 layout : 'form',
			        	 border : false,
			        	 items : [{
			             region : 'center',
			             layout : 'fit',
			             items : [ groupLeaguerGrid ]
			             	}]
					         }
				         ]
					}]
	});
});