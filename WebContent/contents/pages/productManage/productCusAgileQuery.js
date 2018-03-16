/**
 * 灵活查询  
 *  
 * @author Sena
 * 
 */
    var pProductId='';
    var TID='';
    //区别是修改操作还是新增操作
	var updateCondition=false;
	//记录查询条件个数
	var id=0;
	//记录显示列个数
	var id2=0;
	//记录查询条件行的id
	var aParame=new Array();
	//记录显示列的id
	var aParame2=new Array();
	//判断显示的页签是哪一个
    var judgeSimple=true;
    //保存字段树里面的数据
    var nodeArrays=new Array();
    //保存表间关系数据
    var tableArra=new Array();
    //保存表别名
    var oAnoter = new Object();
    //保存查询表关系
    var queryTable='';
	var boxstore = new Ext.data.SimpleStore({
		fields : ['name', 'code'],
		data : [['包含', '0000'],['大于', '0001'], ['等于', '0002'], ['小于', '0003'], ['大于等于', '0004'], ['小于等于', '0005']]
			});
	var loader = new Com.yucheng.bcrm.ArrayTreeLoader( {
		// checked:true,
		// /**节点数组，可以改为从后台读取*/
		// nodeArray :nodeArra,
		/** 指向父节点的属性列 */
		parentAttr : 'PARENT_ID',
		/** 节点定位属性列，也是父属性所指向的列 */
		locateAttr : 'NODEID',
		/** 虚拟根节点id */
		rootValue : '0',
		/** 用于展示节点名称的属性列 */
		textField : 'NAME',
		/** 指定节点ID的属性列 */
		idProperties : 'NODEID',
		/** 节点点击事件句柄 */
		clickFn : function(node) {
		}
	});
	Ext.Ajax.request( {
		url : basepath + '/querytatgetcusquery.json',
		method : 'GET',
		success : function(response) {
			var nodeArra = Ext.util.JSON.decode(response.responseText);
			loader.nodeArray = nodeArra.JSON.data;
			nodeArrays=nodeArra.JSON.data;
			for ( var item in loader.nodeArray) {
				if (typeof loader.nodeArray[item] === 'object') {
					if (loader.nodeArray[item].TABLES == '2')
						//有重复数据
						loader.nodeArray[item].NODEID = 'b' + loader.nodeArray[item].NODEID;
				}
			}
			var children = loader.loadAll();
			treeOfPoroduct.appendChild(children);
			treeOfPoroduct.expandAll();
		}
	});
	//查询表的别名
	Ext.Ajax.request( {
		url : basepath + '/queryagilequery!queryTableRelation.json',
		method : 'GET',
		success : function(response) {
			var relationArra = Ext.util.JSON.decode(response.responseText);
			tableArra = relationArra.JSON.data;
			for(var cp in tableArra ){
				if (typeof 	tableArra[cp]==='object') {
					    eval("oAnoter["+tableArra[cp].JOIN_LEFT_TABLE+"]='"+tableArra[cp].JOIN_LEFT_ALIAS+"';"
					    	+"oAnoter["+tableArra[cp].JOIN_RIGHT_TABLE+"]='"+tableArra[cp].JOIN_RIGHT_ALIAS+"';");
				}
			}
		}
	});

	var treeOfPoroduct = new Com.yucheng.bcrm.TreePanel( {
		title : '条件字段',
		width : document.body.scrollWidth / 100*38-1,
		height : document.body.scrollHeight-63,
		autoScroll : true,
		rootVisible : false,
		ddGroup : 'rightPanel',
		split : true,
		enableDrag:true,
		//checkBox : true,
		/** 虚拟树形根节点 */
		root : new Ext.tree.AsyncTreeNode( {
			id : 'root',
			expanded : true,
			text : '客户视图',
			autoScroll : true,
			children : []
		}),
		resloader : loader,
		clickFn : function(node) {

		},
		listeners : {
			append:function(a,b,c,d){
			if(!c.leaf){
				return;
			}
		}
		}
	});
	
	
	var simple = new Ext.FormPanel( {
		height :400,
		labelAlign: 'top',
		bodyStyle:'padding:0px 0px 0px 5px',
		width : document.body.scrollWidth / 1000 * 609 - 20,
		autoHeight : true,
		autoWidth : false,
		items : [{
			layout : 'column',
			
			border : false,
			items : [{
				html:'<table><tr><td><span style= "text-align:center;width:188px;font-size:14px;">属性 </span></td><td><span style= "text-align:center;width:188px;font-size:14px;">操作符</span></td><td><span style= "text-align:center;width:188px;font-size:14px;">属性值</span></td><td></td></tr></table> '
			}]
		}]
		
			});
/*	var simple2 = new Ext.FormPanel( {
		height : 400,
		labelAlign: 'top',
		bodyStyle:'padding:0px 0px 0px 5px',
		width : document.body.scrollWidth / 100 * 48 - 20,
		autoHeight : true,
		autoWidth : false,
		items : [{
			layout : 'column',
			
			border : false,
			items : [{
				html:'<table><tr></td><td></td><td><td><span style= "text-align:center;width:170px;font-size:14px;">名称 </span></td><td></td></tr></table> '
			}]
		}]
		
			});*/
	var tabmain = new Ext.TabPanel( {
				autoScroll : true,
				id : 'tabmain',
				width : document.body.scrollWidth / 1000 * 609,
				height : document.body.scrollHeight-180,
				activeTab : 0,
				frame : true,
				defaults : {
					autoHeight : true
				},
				items : [ {
					title : '查询条件',
					items : [ simple ],
					listeners : {
						'activate' : function() {
							judgeSimple = true;
						}
					}
				}/*, {
					title : '显示列',
					items : [ simple2 ],
					listeners : {
						'activate' : function() {
							judgeSimple = false;
						}
					}
				}*/ ]
			});


		var radio = new Ext.Panel( {
			//labelAlign:'right',
			
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .09,
				layout : 'form',
				labelWidth : 8,
				//bodyStyle:'padding:0px 0px 0px 220px',
				border : false,
				items : [ new Ext.form.Radio( {
					boxLabel : "与",
					 labelStyle: 'text-align:right;',
					id : "Radio1",
					name : "a",
					checked : true
				}) ]
			}, {
				columnWidth : .09,
				layout : 'form',
				labelWidth :8,
				//bodyStyle:'padding:0px 220px 0px 0px',
				border : false,
				items : [ new Ext.form.Radio( {
					boxLabel : "或",
					 labelStyle: 'text-align:right;',
					id : "Radio2",
					name : "a"
				
				}) ]
			} ]
		});
/*		
		var search = new Ext.FormPanel({
	        frame:true,
	        width: 120,
	        items: [{
	           autoHeight:true,
	            items :[ {
					layout : 'column',
				items : [ {
					layout : 'form',
					columnWidth : .99,
					labelWidth : 80,
					items : [ {
						xtype : 'textfield',
						fieldLabel : '方案名称',
						name : 'solutionName',
						id:'solutionNameId',
						allowBlank : false,
						labelStyle : 'text-align:right;',
						anchor : '99%'
					} ]
				   } ]
			} ]}]
		});*/
	/*	var addSolutionWindow = new Ext.Window(
				{
					layout : 'fit',
					width : 260,
					height : 150,
					draggable : true,//是否可以拖动
					closable : true,// 是否可关闭
					modal : true,
					closeAction : 'hide',
					titleCollapse : true,
					buttonAlign : 'center',
					border : false,
					animCollapse : true,
					animateTarget : Ext.getBody(),
					constrain : true,
					items : [search],
					buttons : [ {
								text : '确认',
								handler : function() {
						if(!search.getForm().isValid()){
							Ext.Msg.alert('提示', '请输入名称！');
			                return;}
						
						        fnBatchSave();
								search.getForm().reset(); 
								addSolutionWindow.hide();
								}
							}, {
								text : '关闭',
								handler : function() {
								search.getForm().reset();
								addSolutionWindow.hide();
								}
							} ]
				});*/

		var right_panel = new Ext.Panel( {
			height : document.body.scrollHeight-60,
			width : document.body.scrollWidth / 100 * 62-1,
			frame : true,
			autoScroll : true,
			items : [ tabmain,radio],
			title : '查询设置',
			buttonAlign : 'center',
			buttons : [ {
				text : '保存',
				handler : function() {

			/*	if(aParame2.length==0){
					Ext.Msg.alert('提示', '未加入任何显示列！');
					return;
				}*/
				if(aParame.length==0){
					Ext.Msg.alert('提示', '未加入任何条件列！');
					return;
				}
				if(!simple.getForm().isValid()){
					Ext.Msg.alert('提示', '查询条件输入有误！');
	                return;}
				if(!updateCondition)
					fnBatchSave();
				//addSolutionWindow.show();
				else{
					fnBatchUpdate();
				}
			}
			}/*,{
				text : '查询结果',
				handler : function() {
				fnSearchResult();
				}
			}*/]
		});

		var view = new Ext.Panel( {
			renderTo : 'view',
			width : document.body.scrollWidth,
			height : document.body.scrollHeight-40,
			layout : 'column',
			items : [{
				columnWidth : .38,
				layout : 'form',
				border : false,
				items : [ treeOfPoroduct ]
			}, {
				columnWidth : .62,
				layout : 'form',
				border : false,
				items : [ right_panel ]
			} ]

		});
		var right_panelEl =  right_panel.body.dom;
		var right_panelElTarget = new Ext.dd.DropTarget(right_panelEl, {
				ddGroup : 'rightPanel',
				notifyDrop : function(ddSource, e, data) {
					if (!data.node.leaf) {
						return;
					}
					//判断是哪个页签judgeSimple为true是条件页签，false为结果页签
					if(judgeSimple){
						//日期型
						if(data.node.attributes.CTYPE=='DATE'){
							fnAddRow3();
							Ext.getCmp('attributeId_' + id).setRawValue(data.node.text);
							Ext.getCmp('nodeId_' + id).setRawValue(data.node.id);
							Ext.getCmp('attributeId_e_' + id).setRawValue(data.node.attributes.ENAME);
							Ext.getCmp('typeId_' + id).setRawValue(data.node.attributes.CTYPE);
							Ext.getCmp('tableId_' + id).setRawValue(data.node.attributes.PARENT_ID);
							aParame.push(id);
							id = id + 1;
						}
						//下拉框型
						else if(data.node.attributes.NOTES!=""){
							fnAddRow4(data.node.attributes.NOTES,'');
							Ext.getCmp('attributeId_' + id).setRawValue(data.node.text);
							Ext.getCmp('nodeId_' + id).setRawValue(data.node.id);
							Ext.getCmp('attributeId_e_' + id).setRawValue(data.node.attributes.ENAME);
							Ext.getCmp('typeId_' + id).setRawValue(data.node.attributes.CTYPE);
							Ext.getCmp('tableId_' + id).setRawValue(data.node.attributes.PARENT_ID);
							aParame.push(id);
							id = id + 1;
						}
						//输入框行
						else{
							fnAddRow();
							Ext.getCmp('attributeId_' + id).setRawValue(data.node.text);
							Ext.getCmp('nodeId_' + id).setRawValue(data.node.id);
							Ext.getCmp('attributeId_e_' + id).setRawValue(data.node.attributes.ENAME);
							Ext.getCmp('typeId_' + id).setRawValue(data.node.attributes.CTYPE);
							Ext.getCmp('tableId_' + id).setRawValue(data.node.attributes.PARENT_ID);
							aParame.push(id);
							id = id + 1;
						}
						
					}
					else{
						for(var l in aParame2 ){
							if (typeof 	aParame2[l]==='number') {
								if(data.node.id==Ext.getCmp("resultNodeId_"+aParame2[l]).getRawValue())
									{
									Ext.Msg.alert('提示', '该字段已经存在!');
									return;
									}
							}
						}
						fnAddRow2();
						Ext.getCmp('resultId_' + id2).setRawValue(data.node.text);
						Ext.getCmp('resultNodeId_' + id2).setRawValue(data.node.id);
						Ext.getCmp('resultId_e_' + id2).setRawValue(data.node.attributes.ENAME);
						Ext.getCmp('resultTableId_' + id2).setRawValue(data.node.attributes.PARENT_ID);
						aParame2.push(id2);
						id2 = id2 + 1;
					}
					return true;
				}
			});

		var fnAddRow= function(){
			//添加新的fieldSet 
			var fieldSet = new Ext.Panel( {
				id : 'fieldSet_' + id,
				items : [ {
					layout : 'column',
					border : false,
					items : [
					{
						columnWidth : .30,
						layout : 'form',
						labelWidth : 60,
						border : false,
						items : [ {
							emptyText : '',
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							// fieldLabel : '属性',
							id : 'attributeId_' + id,
							name : 'attributeName_' + id,
							anchor : '95%'
		
						}, {
							emptyText : '',
							hidden : true,
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							// fieldLabel : '节点id',
							id : 'nodeId_' + id,
							name : 'nodeName_' + id,
							anchor : '95%'
		
						}, {
							emptyText : '',
							hidden : true,
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							// fieldLabel : '英文名',
							id : 'attributeId_e_' + id,
							name : 'attributeName_e_' + id,
							anchor : '95%'
		
						}, {
							emptyText : '',
							hidden : true,
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							// fieldLabel : '类型',
							id : 'typeId_' + id,
							name : 'typeName_' + id,
							anchor : '95%'
		
						}, {
							emptyText : '',
							hidden : true,
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							xtype : 'textfield',
							labelStyle : 'text-align:right;',
							// fieldLabel : '表id',
							id : 'tableId_' + id,
							name : 'tableName_' + id,
							anchor : '95%'
		
						} ]
					}, {
						columnWidth : .30,
						layout : 'form',
						labelWidth : 60,
						border : false,
						items : [ new Ext.form.ComboBox( {
							id : 'operateId_' + id,
							hiddenName : 'operateName_' + id,
							hideLabel : true,
							allowBlank : false,
							// fieldLabel : '客户状态',
							labelStyle : 'text-align:right;',
							triggerAction : 'all',
							store : boxstore,
							displayField : 'name',
							valueField : 'code',
							mode : 'local',
							//listWidth : 192, // 下拉列表的宽度,默认为下拉选择框的宽度
							forceSelection : true,
							typeAhead : true,
							emptyText : '请选择',
							resizable : true,
							anchor : '95%'
						}) ]
					}, {
						columnWidth : .30,
						layout : 'form',
						labelWidth : 60,
						border : false,
						items : [ {
							emptyText : '',
							editable : false,
							triggerAction : 'all',
							allowBlank : false,
							hideLabel : true,
							id : 'attributeValueId_' + id,
							name : 'attributeValueName_' + id,
							labelStyle : 'text-align:right;',
							xtype : 'textfield',
							// fieldLabel : '属性值',
							anchor : '95%'
						} ]
					}, {
						columnWidth : .021,
						layout : 'form',
						labelWidth : 100,
						border : false,
						items : []
					}, {
						columnWidth : .079,
						layout : 'form',
						labelWidth : 100,
						border : false,
						items : [ {
		
							xtype : 'button',
							text : '删除',
							value : id,
							scope : this,
							handler : function(obj) {
								var del_id = obj.value;
								fnDeleteFieldSet(del_id);
		
							}
						} ]
					}
		
					]
				} ]
		
			});

		// 添加fieldSet
		simple.add(fieldSet);
		// 重新加载
		simple.doLayout();
		};
	    var fnAddRow2= function(){
			

			// 添加新的fieldSet
		var fieldSet2 = new Ext.Panel( {
			// column布局控件开始
			id : 'fieldSet2_' + id2,
			// labelAlign: 'top',
		
			items : [{
			layout : 'column',
			border : false,
			items : [//组件开始 
			{
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [ {
					emptyText : '',
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '属性',
					id : 'resultId_' + id2,
					name : 'resultName_' + id2,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '属性',
					id : 'resultId_e_' + id2,
					name : 'resultName_e_' + id2,
					anchor : '95%'

				},{
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'resultNodeId_' + id2,
					name : 'resultNodeName_' + id2,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'resultTableId_' + id2,
					name : 'resultTableName_' + id2,
					anchor : '95%'

				} ]
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : []
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : []
			}, {
				columnWidth : .021,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : []
			}, {
				columnWidth : .079,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : [{ 
                    
                    xtype: 'button', 
                    text: '删除', 
                    value: id2, 
                    scope: this, 
                    handler: function(obj){ 
                        var del_id = obj.value; 
                        fnDeleteFieldSet2(del_id);

                    } 
                }]
			}

			]}]

		});

		//添加fieldSet 
		simple2.add(fieldSet2);
		//重新剧新 
		simple2.doLayout();
		};
		var fnAddRow3= function(){
			

			//添加新的fieldSet 
		var fieldSet3 = new Ext.Panel( {
			//column布局控件开始                 
			id : 'fieldSet_' + id,
			//labelAlign: 'top',
		
			items : [{
			layout : 'column',
			border : false,
			items : [//组件开始 
			{
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [ {
					emptyText : '',
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '属性',
					id : 'attributeId_' + id,
					name : 'attributeName_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'nodeId_' + id,
					name : 'nodeName_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'attributeId_e_' + id,
					name : 'attributeName_e_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'typeId_' + id,
					name : 'typeName_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'tableId_' + id,
					name : 'tableName_' + id,
					anchor : '95%'

				}  ]
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [  new Ext.form.ComboBox({
					id : 'operateId_'+ id,
					hiddenName:'operateName_'+id,
					//hiddenName : 'area1',
					hideLabel:true,
					allowBlank : false,
					//fieldLabel : '客户状态',
					labelStyle: 'text-align:right;',
					triggerAction : 'all',
					store : boxstore,
					displayField : 'name',
					valueField : 'code',
					mode : 'local',
					//listWidth : 192, // 下拉列表的宽度,默认为下拉选择框的宽度
					forceSelection : true,
					typeAhead : true,
					emptyText:'请选择',
					//value : '0000',
					resizable : true,
					anchor : '95%'
				})]
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [ {
						    xtype:'datefield',
						   // fieldLabel: '客户群创建日期',
						    allowBlank : false,
							hideLabel:true,
						    labelStyle: 'text-align:right;',
						    format:'Y-m-d', //日期格式化
						    id : 'attributeValueId_' + id,
							name : 'attributeValueName_' + id,
						    anchor:'95%'
						}]
			}, {
				columnWidth : .021,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : []
			}, {
				columnWidth : .079,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : [{ 
                    
                    xtype: 'button', 
                    text: '删除', 
                    value: id, 
                    scope: this, 
                    handler: function(obj){ 
                        var del_id = obj.value; 
                        fnDeleteFieldSet(del_id);

                    } 
                }]
			}

			]}]

		});

		//添加fieldSet 
		simple.add(fieldSet3);
		//重新剧新 
		simple.doLayout();
		};
		var fnAddRow4= function(mappingName,callValue){
			if(callValue=='')
			{
			eval('var comboxStore_'+id+
					' = new Ext.data.Store({'+
					'restful:true,'+   
					'autoLoad :true,'+
					'proxy : new Ext.data.HttpProxy({'+
							'url :basepath+\'/lookup.json?name='+mappingName+
						'\'}),'+
						'reader : new Ext.data.JsonReader({'+
							'root : \'JSON\''+
						'}, [ \'key\', \'value\' ])'+
					'});');}
			else{
				eval('var comboxStore_'+id+
						' = new Ext.data.Store({'+
						'restful:true,'+   
						'autoLoad :true,'+
						'proxy : new Ext.data.HttpProxy({'+
								'url :basepath+\'/lookup.json?name='+mappingName+
							'\',success : function(response) {'
								+' setTimeout(function(){'+
								'Ext.getCmp(\'attributeValueId_' + id+'\').setValue(\''+callValue+'\');'
								+'  },8);'+
								'}}),'+
							'reader : new Ext.data.JsonReader({'+
								'root : \'JSON\''+
							'}, [ \'key\', \'value\' ])'+
						'});');
				
			}
			

			//添加新的fieldSet 
		var fieldSet4 = new Ext.Panel( {
			
			//column布局控件开始                 
			id : 'fieldSet_' + id,
			//labelAlign: 'top',
		
			items : [{
			layout : 'column',
			border : false,
			items : [//组件开始 
			{
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [ {
					emptyText : '',
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '属性',
					id : 'attributeId_' + id,
					name : 'attributeName_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'nodeId_' + id,
					name : 'nodeName_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'attributeId_e_' + id,
					name : 'attributeName_e_' + id,
					anchor : '95%'

				}, {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'typeId_' + id,
					name : 'typeName_' + id,
					anchor : '95%'

				} , {
					emptyText : '',
					hidden:true,
					editable : false,
					triggerAction : 'all',
					allowBlank : false,
					hideLabel:true,
					xtype : 'textfield',
					labelStyle : 'text-align:right;',
					//fieldLabel : '节点id',
					id : 'tableId_' + id,
					name : 'tableName_' + id,
					anchor : '95%'

				} ]
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [  new Ext.form.ComboBox({
					id : 'operateId_'+ id,
					hiddenName:'operateName_'+id,
					//hiddenName : 'area1',
					hideLabel:true,
					allowBlank : false,
					//fieldLabel : '客户状态',
					labelStyle: 'text-align:right;',
					triggerAction : 'all',
					store : boxstore,
					displayField : 'name',
					valueField : 'code',
					mode : 'local',
					//listWidth : 192, // 下拉列表的宽度,默认为下拉选择框的宽度
					forceSelection : true,
					typeAhead : true,
					emptyText:'请选择',
					//value : '0000',
					resizable : true,
					anchor : '95%'
				})]
			}, {
				columnWidth : .30,
				layout : 'form',
				labelWidth : 60,
				border : false,
				items : [new Ext.form.ComboBox({
							hiddenName : 'attributeValueName_' + id,
						    id : 'attributeValueId_' + id,
							//fieldLabel : '行业大类',
							hideLabel:true,
							labelStyle: 'text-align:right;',
							triggerAction : 'all',
							store : eval('comboxStore_'+id),
							displayField : 'value',
							valueField : 'key',
							mode : 'local',
							forceSelection : true,
							typeAhead : true,
							emptyText:'请选择',
							resizable : true,
							anchor : '95%'
						})]
			}, {
				columnWidth : .021,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : []
			}, {
				columnWidth : .079,
				layout : 'form',
				labelWidth : 100,
				border : false,
				items : [{ 
                    
                    xtype: 'button', 
                    text: '删除', 
                    value: id, 
                    scope: this, 
                    handler: function(obj){ 
                        var del_id = obj.value; 
                        fnDeleteFieldSet(del_id);

                    } 
                }]
			}

			]}]

		});

		//添加fieldSet 
		simple.add(fieldSet4);
		//重新剧新 
		simple.doLayout();
		};
		var fnDeleteFieldSet=function(del_id){
		    var fieldSet_n = Ext.getCmp('fieldSet_' + del_id); 
        	for ( var i in aParame) {
				if (typeof 	aParame[i]==='number') {
					if(aParame[i]==del_id){
						aParame.splice(i,1);
					}
				}
			}
            //删除一行 
            simple.remove(fieldSet_n, true); 
		};
		
		var fnDeleteFieldSet2=function(del_id){
		    var fieldSet_n2 = Ext.getCmp('fieldSet2_' + del_id); 
        	for ( var i in aParame2) {
				if (typeof 	aParame2[i]==='number') {
					if(aParame2[i]==del_id){
						aParame2.splice(i,1);
					}
				}
			}
            //删除一行 
            simple2.remove(fieldSet_n2, true); 
		};
	/*	var fnDeleteFieldSet3=function(del_id){
		    var fieldSet_n3 = Ext.getCmp('fieldSet3_' + del_id); 
        	for ( var i in aParame) {
				if (typeof 	aParame[i]==='number') {
					if(aParame[i]==del_id){
						aParame.splice(i,1);
					}
				}
			}
            //删除一行 
            simple.remove(fieldSet_n3, true); 
		};
		var fnDeleteFieldSet4=function(del_id){
		    var fieldSet_n4 = Ext.getCmp('fieldSet4_' + del_id); 
        	for ( var i in aParame) {
				if (typeof 	aParame[i]==='number') {
					if(aParame[i]==del_id){
						aParame.splice(i,1);
					}
				}
			}
            //删除一行 
            simple.remove(fieldSet_n4, true); 
		};*/
		var fnDeleteAllFieldSet=function(){
			for(var i in aParame ){
				if (typeof 	aParame[i]==='number') {
					 var fieldSet_n = Ext.getCmp('fieldSet_' + aParame[i]); 
					 simple.remove(fieldSet_n, true); 
				}
			}
		    aParame=new Array();
		};
		var fnDeleteAllFieldSet2=function(){
			for(var l in aParame2 ){
				if (typeof 	aParame2[l]==='number') {
					 var fieldSet_n2 = Ext.getCmp('fieldSet2_' + aParame2[l]); 
					 simple2.remove(fieldSet_n2, true); 
				}
			}
		    aParame2=new Array();
		};
		//保存方案
		var fnBatchSave= function(){
			/*if(aParame2.length==0){
				Ext.Msg.alert('提示', '未加入任何显示列！');
				return;
			}*/
			if(aParame.length==0){
				Ext.Msg.alert('提示', '未加入任何条件列！');
				return;
			}
			var json={'attribute':[]};
			         
		 	var json2={'operateSign':[]};
		 	var json3={'attributeValue':[]};
		 	var json4={'nodeId':[]};
		 	var json5={'attribute_e':[]};
		 	var json6={'conditionType':[]};
			for(var i in aParame ){
				if (typeof 	aParame[i]==='number') {
					Ext.getCmp("attributeId_"+aParame[i]);
					var conditionType = Ext.getCmp("typeId_"+aParame[i]).getValue();
					var operateCode   = Ext.getCmp("operateId_"+aParame[i]).value;
					if(conditionType=="VARCHAR"||conditionType=="CHAR"||conditionType=="VARCHAR2"){
						if(operateCode!='0002'&&operateCode!='0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是字符型只能选等于或包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
					}
					else if(conditionType=="DATE"){
						if(operateCode == '0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是日期型不能选包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue().format('Y-m-d'));
					}
					else if(conditionType=="INTEGER"||conditionType=="DECIMAL"||conditionType=="NUMBER"){
						if(operateCode == '0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是数值型不能选包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
						
					}

					json.attribute.push(Ext.getCmp("attributeId_"+aParame[i]).getRawValue());
					json2.operateSign.push(Ext.getCmp("operateId_"+aParame[i]).value);
					//json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
					json4.nodeId.push(Ext.getCmp("nodeId_"+aParame[i]).getValue());
					json5.attribute_e.push(Ext.getCmp("attributeId_e_"+aParame[i]).getValue());
					json6.conditionType.push(conditionType);
					
				}
			}
			Ext.Ajax.request({
						url:basepath+'/targetcussearch.json',
                        method: 'POST',
						success : function(response) {
							Ext.Msg.alert('提示', '操作成功');
							updateCondition = true;
							fnUpdateQuery();//每次添加完成后重新查询数据库表OCRM_F_PD_PROD_TC_SET 中数据，是否已经存在该产品的目标客户设定规则
						},
						failure : function(response) {
							  var resultArray = Ext.util.JSON.decode(response.status);
							   if(resultArray == 403) {
							      Ext.Msg.alert('提示','您没有此权限!');
							   } else {
								  Ext.Msg.alert('提示','操作失败!');
							   }
						},
						params : {
							'attribute': Ext.encode(json),
							'operateSign': Ext.encode(json2),
							'attributeValue': Ext.encode(json3),
							'nodeId': Ext.encode(json4),
							'attribute_e':Ext.encode(json5),
							'conditionType':Ext.encode(json6),
						//	'resultNodeId':Ext.encode(json5),
							'productId':pProductId,
							//'solutionName':solutionName,
							'radio':Ext.getCmp("Radio1").checked,
							'operate':'add'
						}});
		
			
		};
		//修改方案
		var fnBatchUpdate= function(){
			if(aParame.length==0){
				Ext.Msg.alert('提示', '未加入任何条件列！');
				return;
			}
		       
			var json={'attribute':[]};
		 	var json2={'operateSign':[]};
		 	var json3={'attributeValue':[]};
		 	var json4={'nodeId':[]};
		 	var json5={'attribute_e':[]};
		 	var json6={'conditionType':[]};
			for(var i in aParame ){
				if (typeof 	aParame[i]==='number') {
					Ext.getCmp("attributeId_"+aParame[i]);
					var conditionType = Ext.getCmp("typeId_"+aParame[i]).getValue();
					var operateCode   = Ext.getCmp("operateId_"+aParame[i]).value;
					if(conditionType=="VARCHAR"||conditionType=="CHAR"||conditionType=="VARCHAR2"){
						if(operateCode!='0002'&&operateCode!='0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是字符型只能选等于或包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
					}
					else if(conditionType=="DATE"){
						if(operateCode == '0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是日期型不能选包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue().format('Y-m-d'));
					}
					else if(conditionType=="INTEGER"||conditionType=="DECIMAL"||conditionType=="NUMBER"){
						if(operateCode == '0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是数值型不能选包含!');
							return;
						}
						json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
						
					}
					
					json.attribute.push(Ext.getCmp("attributeId_"+aParame[i]).getRawValue());
					json2.operateSign.push(Ext.getCmp("operateId_"+aParame[i]).value);
					//json3.attributeValue.push(Ext.getCmp("attributeValueId_"+aParame[i]).getValue());
					json4.nodeId.push(Ext.getCmp("nodeId_"+aParame[i]).getValue());
					json5.attribute_e.push(Ext.getCmp("attributeId_e_"+aParame[i]).getValue());
					json6.conditionType.push(conditionType);
				}
			}
			Ext.Ajax.request({
						url:basepath+'/targetcussearch.json',
                        method: 'POST',
						success : function(response) {
							Ext.Msg.alert('提示', '操作成功');
						},
						failure : function(response) {
							  var resultArray = Ext.util.JSON.decode(response.status);
							   if(resultArray == 403) {
							      Ext.Msg.alert('提示','您没有此权限!');
							   } else {
								  Ext.Msg.alert('提示','操作失败!');
							   }
						},
						params : {
							'attribute': Ext.encode(json),
							'operateSign': Ext.encode(json2),
							'attributeValue': Ext.encode(json3),
							'nodeId': Ext.encode(json4),
							'attribute_e':Ext.encode(json5),
							'conditionType':Ext.encode(json6),
							'solutionID':TID,
							'radio':Ext.getCmp("Radio1").checked,
							'operate':'update'
						}});
			
		};
		var fnUpdateQuery= function(){
			fnDeleteAllFieldSet();
			id=0;
			Ext.getCmp('tabmain').setActiveTab(0);
			Ext.Ajax.request({
						url:basepath+'/querytatgetcusquery!queryAgileCondition.json?SS_ID='+pProductId,
                        method: 'GET',
						success : function(response) {
							//Ext.Msg.alert('提示', '加入成功');
							var conditionData = Ext.util.JSON.decode(response.responseText);
							var conditionArray=conditionData.JSON.data;
							
							for(var i in conditionArray ){
								if (typeof 	conditionArray[i]==='object') {
									
									 for (var it=0;it<nodeArrays.length;it++)    
									 {
										 
										 if('b'+conditionArray[i].SS_COL_ITEM==nodeArrays[it].NODEID){
												if(nodeArrays[it].CTYPE=='DATE'){
													fnAddRow3();
													Ext.getCmp('attributeValueId_' + id).setRawValue(conditionArray[i].SS_COL_VALUE);
												}
												//下拉框型
												else if(nodeArrays[it].NOTES!=""){
													fnAddRow4(nodeArrays[it].NOTES,conditionArray[i].SS_COL_VALUE);
												}
												//输入框行
												else{
													fnAddRow();
													Ext.getCmp('attributeValueId_' + id).setRawValue(conditionArray[i].SS_COL_VALUE);
												}
										 }
							}
									Ext.getCmp('nodeId_' + id).setRawValue('b'+conditionArray[i].SS_COL_ITEM);
									Ext.getCmp('attributeId_' + id).setRawValue(conditionArray[i].COL_NAME_C);
									Ext.getCmp('attributeId_e_' + id).setRawValue(conditionArray[i].COL_NAME_E);
									Ext.getCmp('operateId_' + id).setValue(conditionArray[i].SS_COL_OP);
									//Ext.getCmp('attributeValueId_' + id).setRawValue(conditionArray[i].SS_COL_VALUE);
									Ext.getCmp('typeId_' + id).setRawValue(conditionArray[i].COL_TYPE);
									Ext.getCmp('tableId_' + id).setRawValue(conditionArray[i].TABLEID);
									if(conditionArray[i].SS_COL_JOIN=="false"){
										Ext.getCmp('Radio2').setValue(true);}
									else{
										Ext.getCmp('Radio1').setValue(true);
									}
									
									
									
									TID=conditionArray[i].TID;
									aParame.push(id);
									id = id + 1;
								}
							}
							if(id>0){
								updateCondition=true;
							}
						},
						failure : function(response) {
							  var resultArray = Ext.util.JSON.decode(response.status);
							   if(resultArray == 403) {
							      Ext.Msg.alert('提示','您没有此权限!');
							   } else {
								  Ext.Msg.alert('提示','操作失败!');
							   }
						}});
		};
		//删除方案
		var fnConditionDelete= function(){
			var selectLength = grid.getSelectionModel().getSelections().length;
		 	var checkedNodes = grid.getSelectionModel().selections.items;
				if(checkedNodes.length==0)
				{
					Ext.Msg.alert('提示', '未选择任何客户');
					return ;
				}
				var json={'solutionId':[]};
				for(var i=0;i<checkedNodes.length;i++)
				{
					json.solutionId.push(checkedNodes[i].data.ID);
				}
				Ext.Ajax.request({
					url:basepath+'/agilesearch.json',
                    method: 'POST',
					success : function(response) {
						Ext.Msg.alert('提示', '操作成功!');
						store.reload();
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
						'solutionId': Ext.encode(json),
						'operate':'delete'
					}});
		};
	    //查询结果
		var fnSearchResult= function(){
			if(aParame2.length==0){
				Ext.Msg.alert('提示', '未加入任何显示列！');
				return;
			}
			if(aParame.length==0){
				Ext.Msg.alert('提示', '未加入任何条件列！');
				return;
			}
			    //需要用到的表存入aTableId
			    var aTableId=new Array();
			    for ( var c1 in aParame) {
					if (typeof aParame[c1] === 'number') {
						var existId = false;
						for ( var c2 in aTableId) {
							if (typeof aTableId[c2] === 'string') {
								if (aTableId[c2] == Ext.getCmp('tableId_' + aParame[c1]).getValue()) 
								{
									existId = true;
									break;
								}
							}
						}
						if (!existId) {
							aTableId.push(Ext.getCmp('tableId_' + aParame[c1])
									.getValue());
						}
					}
				};
			    for ( var c4 in aParame2){
						if (typeof aParame2[c4] === 'number') {
							var existId = false;
							for ( var c5 in aTableId) {
								if (typeof aTableId[c5] === 'string') {
									if (aTableId[c5] == Ext.getCmp('resultTableId_' + aParame2[c4]).getValue()) 
									{
										existId = true;
										break;
									}
								}
							}
							if (!existId) {
								aTableId.push(Ext.getCmp('resultTableId_' + aParame2[c4])
										.getValue());
							}
						}
					};
					var aTableName='t1';
					var onlyTable=true;
				if(aTableId.length>1){
					//遍历拼表关系
					var returnValue=fnHandleTableRelation(aTableId);
					if(returnValue=='failure'){
						Ext.Msg.alert('提示', '要查询的表间关系不存在！');
 						return ;
					}
					onlyTable=false;
				}
				else{
					//debugger;
					 for (var cna=0;cna<nodeArrays.length;cna++)    
					 {
						if( nodeArrays[cna].id==aTableId[0]){
							if(nodeArrays[cna].VALUE.split())
							if(nodeArrays[cna].VALUE.split(" ").length>1){queryTable= nodeArrays[cna].VALUE;}
							else{
							queryTable= nodeArrays[cna].VALUE+' '+aTableName;}
						}
					 }
				};
			//条件
			var conditionString='';
			var radioValue='';
			if(Ext.getCmp("Radio1").checked){
				radioValue=' and ';
			}
			else{
				radioValue=' or ';
			}
			for(var i in aParame ){
				if (typeof 	aParame[i]==='number') {
					var conditionName=Ext.getCmp("attributeId_e_"+aParame[i]).getValue();
					var conditionType=Ext.getCmp("typeId_"+aParame[i]).getValue();
					var operateCode=Ext.getCmp("operateId_"+aParame[i]).value;
					var conditionValue= Ext.getCmp("attributeValueId_"+aParame[i]).getValue();
					var tableNameValue=Ext.getCmp('tableId_' + aParame[i]).getValue();
					if(onlyTable){
					    var anotherTableName=aTableName;
					}
					else
					{  var anotherTableName=oAnoter[tableNameValue];}
				  
					if(conditionType=="VARCHAR"||conditionType=="CHAR"||conditionType=="VARCHAR2"){
						if(operateCode!='0002'&&operateCode!='0000'){
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是字符型只能选等于或包含!');
							return;
						}
						if(operateCode=='0002'){
						if(i!=0){
						   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'='+'\''+conditionValue+'\'';
						}
						else{
							conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'='+'\''+conditionValue+'\'';
						}}
						else if(operateCode=='0000'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+' like '+'\'%'+conditionValue+'%\'';
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+' like '+'\'%'+conditionValue+'%\'';
								}
						}
						else{
							Ext.Msg.alert('提示','"'+ Ext.getCmp("attributeId_"+aParame[i]).getValue()+'"是字符型只能选等于或包含!');
							return;
						}
						
					}
					else if(conditionType=="DATE"){
						if(operateCode=='0002'){
							if(i!=0){
							   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'='+'\''+conditionValue+'\'';
							}
							else{
								conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'='+'\''+conditionValue+'\'';
							}
						}
						else if(operateCode=='0001'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'>'+'\''+conditionValue+'\'';
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'>'+'\''+conditionValue+'\'';
								}
						}
						else if(operateCode=='0003'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'<'+'\''+conditionValue+'\'';
								}
								else{
									conditionString=conditionString+conditionName+'<'+'\''+conditionValue+'\'';
								}
						}
						else if(operateCode=='0004'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'>='+'\''+conditionValue+'\'';
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'>='+'\''+conditionValue+'\'';
								}
						}
						else if(operateCode=='0005'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'<='+'\''+conditionValue+'\'';
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'<='+'\''+conditionValue+'\'';
								}
						}
						
						
					}
					else if(conditionType=="INTEGER"||conditionType=="DECIMAL"||conditionType=="NUMBER"){
				
						if(operateCode=='0002'){
						if(i!=0){
						   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'='+conditionValue;
						}
						else{
							conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'='+conditionValue;
						}}
						else if(operateCode=='0001'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'>'+conditionValue;
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'>'+conditionValue;
								}
						}
						else if(operateCode=='0003'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'<'+conditionValue;
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'<'+conditionValue;
								}
						}
						else if(operateCode=='0004'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'>='+conditionValue;
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'>='+conditionValue;
								}
						}
						else if(operateCode=='0005'){
							if(i!=0){
								   conditionString=conditionString+' '+radioValue+' '+anotherTableName+'.'+conditionName+'<='+conditionValue;
								}
								else{
									conditionString=conditionString+' '+anotherTableName+'.'+conditionName+'<='+conditionValue;
								}
						}
						
					}
				}
			}
			//显示列
			var columnNames='';
			var headers='';
			var readers='';
			for(var m in aParame2 ){
				
				if (typeof 	aParame2[m]==='number') {
					var tableNameValue2=Ext.getCmp('resultTableId_' + aParame2[m]).getValue();
					
					if(onlyTable){
					    var anotherTableName2=aTableName;
					}
					else
					{  var anotherTableName2=oAnoter[tableNameValue2];}
					if(m==0){
						headers=headers+'{header : \''+
						Ext.getCmp("resultId_"+aParame2[m]).getRawValue()+
						'\',dataIndex : \''+
						Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue()+
						'\',width : 100}';
						readers=readers+'{name : \''+
						Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue()+
						'\'}';
						columnNames=columnNames+anotherTableName2+'.'+Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue();
					}
					else{
						headers=headers+',{header : \''+
						Ext.getCmp("resultId_"+aParame2[m]).getRawValue()+
						'\',dataIndex : \''+
						Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue()+
						'\',width : 100}';
						readers=readers+',{name : \''+
						Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue()+
						'\'}';
						columnNames=columnNames+','+anotherTableName2+'.'+Ext.getCmp("resultId_e_"+aParame2[m]).getRawValue();
					}
				}
			}
			var lsm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
	    	var lrownum = new Ext.grid.RowNumberer({
						header : 'No.',
						width : 28
					});
			eval('var resultcm2 = new Ext.grid.ColumnModel(['+
                	   'lrownum,lsm,'+
                	    headers+
						'	]);');
			eval('var resultReader=new Ext.data.JsonReader({'+
						'totalProperty : \'json.count\','+
						' root:\'json.data\'}, ['+
						readers+
						']);');
		
       	var resultstore2 = new Ext.data.Store({
       		restful:true,	
               proxy : new Ext.data.HttpProxy({url:basepath+'/queryagileresult.json',
               	success : function(response) {
       				//Ext.Msg.alert('提示', response.responseText);
       			}
               }),
              reader: resultReader
       	});
       	resultstore2.on('beforeload', function() {
		       this.baseParams = {
		    		   cn:columnNames,
		    		   cs:conditionString,
		    		   qt:queryTable
		      };});
       	var _lpagesize_combo = new Ext.form.ComboBox({
    	  	name : 'pagesize',
    	  	triggerAction : 'all',
    	  	mode : 'local',
    	  	store : new Ext.data.ArrayStore({
    	  				fields : ['value', 'text'],
    	  				data : [ 
    	  						[ 100, '100条/页' ], [ 250, '250条/页' ],
    	  						[ 500, '500条/页' ] ]
    	  			}),
    	  	valueField : 'value',
    	  	displayField : 'text',
    	  	value : '100',
    	  	editable : false,
    	  	width : 85
    	  });
    	  var _lnumber = parseInt(_lpagesize_combo.getValue());
    	  // 改变每页显示条数reload数据
    	  _lpagesize_combo.on("select", function(comboBox) {
    		  _lbbar.pageSize = parseInt(_lpagesize_combo.getValue());
    		  resultstore2.reload({
    	  						params : {
    	  							start : 0,
    	  							limit : parseInt(_lpagesize_combo.getValue())
    	  						}
    	  					});
    	  		});
    	  		// 每页显示条数下拉选择框

    	  //分页工具栏
    	  var _lbbar = new Ext.PagingToolbar({
    	  			pageSize : _lnumber,
    	  			store : resultstore2,
    	  			displayInfo : true,
    	  			displayMsg : '显示{0}条到{1}条,共{2}条',
    	  			//plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
    	  			emptyMsg : "没有符合条件的记录",
    	  			items : ['-', '&nbsp;&nbsp;', _lpagesize_combo]
    	  		});
    	  
    		var _tbar = new Ext.Toolbar({

				items : [
					{
					text : '客户视图',
					handler : function() {
			
					}
				},{
					text : '导出',
					handler : function() {
					}
				}				
				
				]
			});
    	var resultGrid = new Ext.grid.GridPanel({
           // title : '<span style="font-weight:normal">查询结果展示</span>',
    		width : 1060,
    		height : 350,
    		//height:document.body.scrollHeight-59,
    		frame : true,
    		//region : 'center', // 返回给页面的div
    		store : resultstore2, // 数据存储
    		stripeRows : true, // 斑马线
    		cm : resultcm2, // 列模型
    		sm : lsm, // 复选框
    		tbar : _tbar, // 表格工具栏
    		bbar : _lbbar,// 分页工具栏
    		viewConfig : {
    		},
    		loadMask : {
    			msg : '正在加载表格数据,请稍等...'
    		}
    		
    	});
    	var resultWindow = new Ext.Window(
    			{
    				layout : 'fit',
    				width : 1060,
    				height : 350,
    				draggable : true,//是否可以拖动
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
    				items : [resultGrid],
    				buttons : [  {
    							text : '关闭',
    							handler : function() {
    							
    					resultWindow.hide();
    							}
    						} ]
    			});
      	resultWindow.show();
      	resultstore2.load();

		};
		
		//拼表间关系，aTableId为需要用的表。
		var fnHandleTableRelation = function(aTableId) {
			var tabArray = new Array();
			for ( var tNum = 0; tNum < aTableId.length; tNum++) {
				for ( var ct in tableArra) {
					if (typeof tableArra[ct] === 'object') {
						if (tableArra[ct].JOIN_LEFT_TABLE == aTableId[tNum]) {
							for ( var cz in aTableId) {
								if (typeof aTableId[cz] === 'string' && cz != tNum) {
									if (tableArra[ct].JOIN_RIGHT_TABLE == aTableId[cz]) {
										if (tabArray.length == 0) {
											tabArray.push(tableArra[ct]);
											haveTab = true;
										} else {
											for ( var cw = 0; cw < tabArray.length; cw++) {
												if (aTableId[tNum] == tabArray[cw].JOIN_LEFT_TABLE
														&& aTableId[cz] != tabArray[cw].JOIN_RIGHT_TABLE) {
													tabArray.splice(cw + 1, 0,
															tableArra[ct]);
													haveTab = true;
													break;
												} else if (aTableId[tNum] == tabArray[cw].JOIN_RIGHT_TABLE) {
													tabArray.splice(cw + 1, 0,
															tableArra[ct]);
													haveTab = true;
													break;
												} else if (aTableId[cz] == tabArray[cw].JOIN_LEFT_TABLE) {
													tabArray.splice(cw, 0,
															tableArra[ct]);
													haveTab = true;
													break;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			var aTableId2 = new Array();
			aTableId2 = aTableId;
			for ( var cu = 0; cu < tabArray.length; cu++) {
				for ( var tNum2 = 0; tNum2 < aTableId2.length; tNum2++) {
					if (tabArray[cu].JOIN_LEFT_TABLE == aTableId2[tNum2]) {
						aTableId2.splice(tNum2, 1);
						tNum2 = tNum2 - 1;
					}
					if (tabArray[cu].JOIN_RIGHT_TABLE == aTableId2[tNum2]) {
						aTableId2.splice(tNum2, 1);
						tNum2 = tNum2 - 1;
					}
				}
				if (cu == 0) {
					queryTable = '' + tabArray[cu].LEFTTABLE + ' '
							+ tabArray[cu].JOIN_LEFT_ALIAS + ' '
							+ tabArray[cu].SS_COL_LEFT + ' join '
							+ tabArray[cu].RIGHTTABLE + ' '
							+ tabArray[cu].JOIN_RIGHT_ALIAS + ' ON '
							+ tabArray[cu].JOIN_LEFT_ALIAS + '.'
							+ tabArray[cu].LEFTCODE + '='
							+ tabArray[cu].JOIN_RIGHT_ALIAS + '.'
							+ tabArray[cu].RIGHTCODE;
				} else {
					queryTable = queryTable + ' ' + tabArray[cu].SS_COL_LEFT + ' join '
							+ tabArray[cu].RIGHTTABLE + ' '
							+ tabArray[cu].JOIN_RIGHT_ALIAS + ' ON '
							+ tabArray[cu].JOIN_LEFT_ALIAS + '.'
							+ tabArray[cu].LEFTCODE + '='
							+ tabArray[cu].JOIN_RIGHT_ALIAS + '.'
							+ tabArray[cu].RIGHTCODE;
				}
			}
			if (aTableId2.length >= 1) {
				Ext.Msg.alert('提示', '要查询的表间关系不存在！');
				return 'failure';
			} else {
				return 'success';
			}
		};