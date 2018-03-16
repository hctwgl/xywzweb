/**
 * 工作流前台封装类
 * @author xinzq
 * @since 2013-04-18
 */
	Ext.namespace("Mis.Echain");

/*
 * Echain面板基类
 */

	Mis.Echain.EchainPanel = Ext.extend(Ext.Panel,{
		closable : true,
		layout : "form",
		frame : true,
		//打开的窗口主键
		WindowIdclode:false,
		//流程实例号
		instanceID:'',
		//当前节点号
		nodeId:'',
		//流程意见默认加载，不需要加载此面板设置为false
		flowloadFalg:true,
		flowGridHeight :false,
		//是否需要输入流程意见和弹出按钮，，不需要加载此面板设置为false
		fOpinionFlag:true,
		//面板高度
		opinionFormHeight:200,
		//是否展示审批历史页面，一般不与流程办理同时展示
		approvalHistoryFlag:false,
        
		//保存按钮(下面后缀为Flag的都为按钮是否隐藏标识)
		saveHidden_Flag : true,   
		//签收
		signinHidden_Flag : true,
		//撤销签收
		signoffHidden_Flag : true,
		//放回任务池
		tasksignoffHidden_Flag : true,
		//提交
		submitHidden_Flag : true,
		//转办
		changeHidden_Flag : true,
		//抄送
		announceHidden_Flag :true,
		//审批协助
		assistHidden_Flag : true,
		//催办
		urgeHidden_Flag : true,
		//拿回
		againHidden_Flag : true,  
		//撤办
		cancelHidden_Flag : true,
		//退回
		returnbackHidden_Flag :true,
		//挂起
		hangHidden_Flag : true, 
		//唤醒
		wakeHidden_Flag : true,
		//打回
		callbackHidden_Flag :true,
		//跳转
		jumpHidden_Flag : true,
		//发起会办
		gatherHidden_Flag : true,
		//提交按钮点击之前的扩展方法,需有一个返回值，如果进行正常提交返回true，否则返回false
		submitBeforeFun:false,
		//提交成功之后的扩展方法
		submitAfterFun:false,
		//保存意见成功之后的扩展方法
		saveFun:false,
		//打回成功之后扩展方法
		callbackFun:false,
		//是否打回给固定节点，例如流程发起人等自定义打回到某一个节点，设定callbackCustomFun 参数格式为：'打回节点id##打回到的用户id##再次提交格式'， 1表示逐级提交，0表示提交给打回发起人  例如：'a_12##admin##1'
		callbackCustomFun:false,
		//催办成功之后扩展方法(催办功能暂时不可用)
		urgeAfterFun:false,
		//退回成功之后扩展方法
		returnbackFun:false,
		//挂起成功之后扩展方法
		hangFun:false,
		//签收之后扩展方法
		signFun:false,
		//撤销签收之后扩展方法
		signoffFun:false,
		//放回任务池扩展方法
		tasksignoffFun:false,
		//重办扩展方法
		againFun:false,
		//撤办扩展方法
		cancelFun:false,
		//唤醒扩展方法
		wakeFun:false,
		// 初始化GRID面板
		firstRequest: function(_this){
			  Ext.Ajax.request({
			    	url : basepath + '/EchainCommon!getInstanceInfo.json',
					method : 'GET',
					params:{
					instanceID:_this.instanceID,
					nodeID:_this.nodeId
					},
			        failure : function(form, action){
			            Ext.MessageBox.alert('加载流程', '流程加载失败!');
			        },
			        success:function(response){
			        	for(var i = 1;i<_this.opinionFlag.buttons.length; i++){
			        		_this.opinionFlag.buttons[i].hide();
			        	}
			        	var response_getNode = Ext.util.JSON.decode(response.responseText);
			        	if(response_getNode.getNodeControlFormAction!=null){
			        		if(response_getNode.getNodeControlFormAction.save!=null){
			        			_this.saveHidden_Flag = false;
			        			_this.opinionFlag.buttons[1].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.submit!=null){
			        			_this.submitHidden_Flag = false;
			        			_this.opinionFlag.buttons[2].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.signin!=null){
			        			_this.signinHidden_Flag = false;
			        			_this.opinionFlag.buttons[3].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.signoff!=null){
			        			_this.signoffHidden_Flag = false;
			        			_this.opinionFlag.buttons[4].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.tasksignoff!=null){
			        			_this.tasksignoffHidden_Flag = false;
			        			_this.opinionFlag.buttons[5].show();
			        		}
			        		
			        		if(response_getNode.getNodeControlFormAction.change!=null){
			        			_this.changeHidden_Flag = false;
			        			_this.opinionFlag.buttons[6].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.announce!=null){
			        			_this.announceHidden_Flag = false;
			        			_this.opinionFlag.buttons[7].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.assist!=null){
			        			_this.assistHidden_Flag = false;
			        			_this.opinionFlag.buttons[8].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.urge!=null){
			        			_this.urgeHidden_Flag = false;
			        			_this.opinionFlag.buttons[9].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.again!=null){
			        			_this.againHidden_Flag = false;
			        			_this.opinionFlag.buttons[10].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.cancel!=null){
			        			_this.cancelHidden_Flag = false;
			        			_this.opinionFlag.buttons[11].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.returnback!=null){
			        			_this.returnbackHidden_Flag = false;
			        			_this.opinionFlag.buttons[12].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.hang!=null){
			        			_this.hangHidden_Flag = false;
			        			_this.opinionFlag.buttons[13].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.wake!=null){
			        			_this.wakeHidden_Flag = false;
			        			_this.opinionFlag.buttons[14].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.callback!=null){
			        			_this.callbackHidden_Flag = false;
			        			_this.opinionFlag.buttons[15].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.jump!=null){
			        			_this.jumpHidden_Flag = false;
			        			_this.opinionFlag.buttons[16].show();
			        		}
			        		if(response_getNode.getNodeControlFormAction.gather!=null){
			        			_this.gatherHidden_Flag = false;
			        			_this.opinionFlag.buttons[17].show();
			        		}
			        	}
			        	
			        }
			    });
		},
		afterRender : function() {
			var _this=this;
			//**************加载流程意见面板****************//
		    if(_this.flowloadFalg){
		    	// 定义自动当前页行号
			_this.flowRownum = new Ext.grid.RowNumberer({
						header : 'No.',
						width : 28
					});
			// 定义列模型
			_this.flowCm = new Ext.grid.ColumnModel([_this.flowRownum, 
		        {header : '审批节点',dataIndex : 'nodeName',sortable : true},
			    {header : '意见时间',dataIndex : 'commentTime',sortable : true},
			    {header : '审批人',dataIndex : 'userName',sortable : true},
			    {header : '意见标识',dataIndex : 'commentSign',sortable : true},
			    {header : '流程意见',dataIndex : 'commentContent',sortable : true}
					]);
			_this.flowStore = new Ext.data.Store({
				restful : true,
				proxy : new Ext.data.HttpProxy({
					url :basepath + '/EchainCommon!getAllComments.json?instanceID='+_this.instanceID
				}),
				reader:new Ext.data.JsonReader({
					root : ''
				},[{name: 'nodeName'},//审批节点
				      {name: 'commentTime'},//意见时间
				      {name: 'userName'},//审批人
				      {name: 'commentSign'},//意见标识(没取到)
				      {name: 'commentContent'}//流程意见
				   ])
			});
		   _this.flowGrid = new Ext.grid.GridPanel({
			   height:150,
			 	store : _this.flowStore, // 数据存储
				stripeRows : true, // 斑马线
				autoScroll : true,
				cm : _this.flowCm, // 列模型
				trackMouseOver : false,
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
					});
		   _this.flowFieldSetGrid = new Ext.form.FieldSet({
			    animCollapse :true,
			    collapsible:true,
			    collapsed:true,
			    title: '流程意见列表',
			    items:[ _this.flowGrid]
		   }); 
			_this.add(_this.flowFieldSetGrid);
			_this.flowStore.load();
		    }
	    if(_this.fOpinionFlag){
	    	_this.firstRequest(_this);
	        _this.opinionFlagStore = new Ext.data.ArrayStore({
	            fields : ['key', 'value'],
	            data : [['请选择',''],['同意','同意'],['否决', '否决'],['打回', '打回'],['退回', '退回'],['再审', '再审']]
	        });
	    	_this.opinionFlag = new Ext.form.FormPanel({
	    			frame : true, //是否渲染表单面板背景色
	    			height:_this.opinionFormHeight,
	    			labelAlign : 'middle', // 标签对齐方式
	    			buttonAlign : 'center',
	    			items : [{
	    				layout:'column',
						border : false,
	    				items:[{      layout : 'form',
	    	                        	columnWidth : 1,
	    	        					labelWidth : 80, // 标签宽度
	    	                        	items:[new Ext.form.ComboBox({
	        								hiddenName : 'commentSign',
	        								fieldLabel : '流程意见标识',
	        								labelStyle: 'text-align:right;',
	        								triggerAction : 'all',
	        								store : _this.opinionFlagStore,
	        								displayField : 'value',
	        								valueField : 'key',
	        								mode : 'local',
	        								forceSelection : true,
	        								typeAhead : true,
	        								emptyText:'请选择',
	        								resizable : true,
	        								anchor : '30%'
	        							}),{
    	    	                        	xtype : 'textarea',
	        								fieldLabel : '流程意见内容',
	        								maxLength:200,
    	        							name : 'commentContent',
    	        							anchor : '50%'
	    	                        	},{
	    	                        		boxLabel: '所有流程参与者可读',
	        							    xtype: 'checkbox',
	        							    name:'commentReaders'
	        							
	        							}]
	    	                        }]
	    					}
		],
	    		buttons : [{
	    					text : '重置',
	    					handler : function() {
	    					_this.opinionFlag.getForm().reset();
	    					}
	    					},{
	    						text : '保存',
	    						hidden:_this.saveHidden_Flag,
	    					     handler : function() {
	    						if(_this.saveReader()){
	    							Ext.Msg.alert("系统提示信息", "保存成功!");
	    						};
	    					}
	    					},{
	        					text : '提交',
	    						hidden:_this.submitHidden_Flag,
	   					     handler : function() {
	    						var returnbefore = true;
	    						if(_this.submitBeforeFun){
	    							returnbefore = submitBeforeFun();
	    						}
	    						if(returnbefore){
	    							_this.saveselectNodeList();
		    						_this.saveReader();
	    						}
	    					}
		   					},{
		    					text : '签收',
		    					hidden:_this.signinHidden_Flag ,
							     handler : function() {
		   						_this.signFunction();
		   					}
							},{
		    					text : '撤销签收',
		    					hidden:_this.signoffHidden_Flag ,
							     handler : function() {
								_this.signoffFunction();
							}
							},{
		    					text : '放回任务池',
		    					hidden:_this.tasksignoffHidden_Flag ,
							     handler : function() {
								_this.tasksignoffFunction();
							}
							},{
		    					text : '转办',
		    					hidden:_this.changeHidden_Flag ,
							     handler : function() {}
							},{
		    					text : '抄送',
		    					hidden:_this.announceHidden_Flag ,  
							     handler : function() {}
							},{
		    					text : '审批协助',
		    					hidden:_this.assistHidden_Flag ,  
							     handler : function() {}
							},{
		    					text : '催办',
	    						hidden:_this.urgeHidden_Flag,
							     handler : function() {
								_this.urgeFunction();
							}
							},{
		    					text : '拿回',
		    					hidden:_this.againHidden_Flag ,  
							     handler : function() {
								_this.againFunction();
							}
							},{
		    					text : '撤办',
	    						hidden:_this.cancelHidden_Flag,
							     handler : function() {
								_this.cancelFunction();
							}
							},{
		    					text : '退回',
	    						hidden:_this.returnbackHidden_Flag,
							     handler : function() {
								_this.returnbackFunction();
							}
							},{
		    					text : '挂起',
		    					hidden:_this.hangHidden_Flag , 
							     handler : function() {
								_this.hangFunction();
							}
							},{
		    					text : '唤醒',
		    					hidden:_this.wakeHidden_Flag ,
							     handler : function() {
								_this.wakeFunction();
							}
							},{
		    					text : '打回',
		    					hidden:_this.callbackHidden_Flag,
							     handler : function() {
									_this.selectCallbackUser();	
							}
							},{
		    					text : '跳转',
		    					hidden:_this.jumpHidden_Flag ,
							     handler : function() {}
							},{
		    					text : '发起会办',
		    					hidden:_this.gatherHidden_Flag ,
							     handler : function() {}
							}]
	    	});
			   _this.opinionFieldSetGrid = new Ext.form.FieldSet({
				    animCollapse :true,
				    collapsible:true,
//				    collapsed:true,
				    title: '我的流程意见',
				    items:[ _this.opinionFlag]
			   }); 
	    	_this.add( _this.opinionFieldSetGrid);
	    }
		//**************加载流程审批历史****************//
	    if(_this.approvalHistoryFlag){
	    	// 定义自动当前页行号
		_this.flowRownum1 = new Ext.grid.RowNumberer({
					header : 'No.',
					width : 28
				});
		// 定义列模型
		_this.flowCm1 = new Ext.grid.ColumnModel([_this.flowRownum1, 
	        {header : '当前审批步骤',dataIndex : 'nodeName',sortable : true},
		    {header : '当前办理人',dataIndex : 'userName',sortable : true},
		    {header : '办理时间',dataIndex : 'nodeStartTime',sortable : true},
		    {header : '下一审批步骤',dataIndex : 'nextNodeName',sortable : true},
		    {header : '下一办理人',dataIndex : 'nextNodeUser',sortable : true},
		    {header : '办理描述',dataIndex : 'methods',sortable : true,width:700}
				]);
		_this.approvalHistoryStore = new Ext.data.Store({
			restful : true,
			proxy : new Ext.data.HttpProxy({
				url :basepath + '/EchainCommon!getWorkFlowHistory.json?instanceID='+_this.instanceID
			}),
			reader:new Ext.data.JsonReader({
				root : ''
			},[{name: 'nodeName'},//当前审批步骤
			      {name: 'userName'},//当前办理人
			      {name: 'nodeStartTime'},//办理时间
			      {name: 'nextNodeName'},//下一审批步骤
			      {name: 'nextNodeUser'},//下一办理人
			      {name: 'methods'}//办理描述
			   ])
		});
	   _this.approvalHistoryGrid = new Ext.grid.GridPanel({
		   height:200,
		 	store : _this.approvalHistoryStore, // 数据存储
			stripeRows : true, // 斑马线
			autoScroll : true,
			cm : _this.flowCm1, // 列模型
			trackMouseOver : false,
			loadMask : {
				msg : '正在加载表格数据,请稍等...'
			},
			buttonAlign:'center',
			buttons:[{
			    text: '图形跟踪',
			    iconCls:'youJiIconCss',
			    handler:function(){
				window.open(basepath+'/echain/studio/eChainMonitor.jsp?instanceid='+_this.instanceID,'name','left=0,top=0,width=1024,height=768,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');
			    }
			}]
				});
	   _this.approvalHistoryGrid = new Ext.form.FieldSet({
		    animCollapse :true,
		    collapsible:true,
//		    collapsed:true,
		    title: '流程审批历史',
		    items:[ _this.approvalHistoryGrid]
	   }); 
		_this.add(_this.approvalHistoryGrid);
		_this.approvalHistoryStore.load();
	    }
		Mis.Echain.EchainPanel.superclass.afterRender.call(_this);
	
	},
	//保存意见
	saveReader:function(){
		_this=this;
		var commentContent = _this.opinionFlag.getForm().findField('commentContent').getValue();
		if(commentContent!=null){
			var commentReaders_Flag =0;
			if(_this.opinionFlag.getForm().findField('commentReaders').getValue()){
				commentReaders_Flag=1;
			}
			Ext.Ajax.request( {
				url : basepath + '/EchainCommon!setComment.json',
				method : 'GET',
				params:{
				instanceID:_this.instanceID,
				nodeID:_this.nodeId,
				commentType:1,
				commentSign:_this.opinionFlag.getForm().findField('commentSign').getValue(),
				commentContent:_this.opinionFlag.getForm().findField('commentContent').getValue(),
				commentReaders:commentReaders_Flag
			    },
				success : function(response) {
					if(_this.saveFun){
						_this.saveFun();
					}
					_this.flowStore.reload();
					return true;
			    }
			});	
		}
	
	},
	//点击提交调用
	saveselectNodeList:function(){
		_this = this;
		var returnShowFlag=true;
		Ext.Ajax.request({
			url : basepath + '/EchainCommon!getNextNodeList.json',
			method : 'GET',
			params : {
			instanceID:_this.instanceID,
			nodeID : _this.nodeId
		},
			waitMsg : '正在提交申请,请等待...', // 显示读盘的动画效果，执行完成后效果消失
			success : function(a) {
			var radioName='radio';
			var nodeRouterTypeFlag ='CheckboxGroup';
			var nextNodeList = Ext.util.JSON.decode(a.responseText);
			if(nextNodeList.nextNodes.length>0){
				if(nextNodeList.nodeRouterType=='0'||nextNodeList.nodeRouterType=='1'||nextNodeList.nodeRouterType=='3'){
					//单选处理
					nodeRouterTypeFlag='RadioGroup';
				}
				var nextNodeListcheck = '';
				for(var i = 0; i<nextNodeList.nextNodes.length;i++){
					if(nodeRouterTypeFlag=='CheckboxGroup'){
						radioName=i;
					}
					if(i==0){
						nextNodeListcheck = '{name:\''+radioName+'\',inputValue:\''+nextNodeList.nextNodes[i].nodeid+'\',boxLabel:\''+nextNodeList.nextNodes[i].nodename+'\',checked:true}';
					}else{
						nextNodeListcheck = nextNodeListcheck+',{name:\''+radioName+'\',inputValue:\''+nextNodeList.nextNodes[i].nodeid+'\',boxLabel:\''+nextNodeList.nextNodes[i].nodename+'\'}';
					}
				}
				eval('var nextNodeListcheckbox = new Ext.form.'+nodeRouterTypeFlag+'({'+
						'allowBlank :\'false\','+
						'columns:2,'+
						'listeners:{change:function(el,checked){_this.rightSlectNextNodePanel.removeAll();if(nodeRouterTypeFlag==\'RadioGroup\'){_this.saveselectUserList(checked.inputValue,checked.boxLabel,nextNodeList.nextNodes.length);} else{for(var i=0;i<checked.length;i++){_this.saveselectUserList(checked[i].inputValue,checked[i].boxLabel,nextNodeList.nextNodes.length);}}}},'+
						'items : ['+nextNodeListcheck+']});');
				_this.leftSlectNextNodePanel.add(nextNodeListcheckbox);
				_this.rightSlectNextNodePanel.removeAll();
				_this.saveselectUserList(nextNodeList.nextNodes[0].nodeid,nextNodeList.nextNodes[0].nodename,nextNodeList.nextNodes.length);
			}else{
				Ext.Msg.alert('提示', '没有找到办理人!' );
			}
		},
			failure : function() {
				Ext.Msg.alert('提示', '操作失败!' );
			}
		});
		_this.leftSlectNextNodePanel = new Ext.FormPanel({
			height :120,
			title:'选择下一节点',
			frame : true,
			region : 'north',
			labelAlign:'right',
			items : []
		});
		_this.rightSlectNextNodePanel = new Ext.FormPanel({
			frame : true,
			region : 'center',
			autoScroll : true,
			title:'选择下一办理人',
			labelAlign:'right',
			items : []
		});
		_this.selectNextNodeWindow = new Ext.Window({
	        width : 500,
	        height :350,
	        layout:'border',
	        closable : true,
	        resizable : false,
	        collapsible : false,
	        draggable : true,
	        closeAction : 'hide',
	        title : '选择办理人',
	        modal : true, 
	        animCollapse : false,
	        maximizable : true,
	        border : false,
			animateTarget : Ext.getBody(),
	        closable : true,
	        constrain : true,
	        items : [_this.leftSlectNextNodePanel,_this.rightSlectNextNodePanel],
	        buttonAlign:'center',
	        buttons:[{
	            text:'提交',
	            handler:function(){
	        	if(!_this.rightSlectNextNodePanel.getForm().isValid()){
	                Ext.MessageBox.alert('保存操作', '请选择下一办理人！');
	                return false;
	            }
	        	var nextUserIDAll = '';
	        	var nextNodeAll = '';
	        	if(_this.leftSlectNextNodePanel.items.items[0].items.items.length>0){
	        		for(var j =0;j<_this.leftSlectNextNodePanel.items.items[0].items.items.length;j++){
	        			if(_this.leftSlectNextNodePanel.items.items[0].items.items[j].checked==true){
	        				if(nextNodeAll==''){
	        					nextNodeAll = 	_this.leftSlectNextNodePanel.items.items[0].items.items[j].inputValue;
	        				}else {
	        					nextNodeAll = nextNodeAll+'@'+	_this.leftSlectNextNodePanel.items.items[0].items.items[j].inputValue;
	        					nextUserIDAll = nextUserIDAll+'@';
	        				}
	        				if(_this.rightSlectNextNodePanel.items.items.length>0){//是否存在办理人
	        					for(var i=0;i<_this.rightSlectNextNodePanel.items.items.length;i++){//循环办理人列表
	        						if(_this.rightSlectNextNodePanel.items.items[i].fieldLabel==_this.leftSlectNextNodePanel.items.items[0].items.items[j].boxLabel){//如果节点下有办理人
	        							var ifselectnextnodeUser = false;
	        							var selectnextUserList = '';
	        							for(var m=0;m<_this.rightSlectNextNodePanel.items.items[i].items.items.length;m++){
	    		                			if(_this.rightSlectNextNodePanel.items.items[i].items.items[m].checked==true){
	    		                				ifselectnextnodeUser=true;
	    		                				if(selectnextUserList==''){
	    		                					selectnextUserList =_this.rightSlectNextNodePanel.items.items[i].items.items[m].inputValue;
	    		                				}else {
	    		                					selectnextUserList = selectnextUserList+';'+	_this.rightSlectNextNodePanel.items.items[i].items.items[m].inputValue;
	    		                				}
	    		                			}
	    		                		}
	        							nextUserIDAll=nextUserIDAll+selectnextUserList;
	        							if(!ifselectnextnodeUser){
	        								 Ext.MessageBox.alert('保存操作', _this.rightSlectNextNodePanel.items.items[i].fieldLabel+'下没有选择办理人!');
	        					                return false;
	        							}
	        						}
	        					}
	        				}
	        			}
	                		
	        		}
	        	}else {
	        		 Ext.MessageBox.alert('保存操作', '请选择下一办理人节点！');
		                return false;
	        	}
	        	_this.wfCompleteJob(nextNodeAll,nextUserIDAll);
	        }
	        },{
	            text: '取消',
	            handler:function(){
	        	_this.selectNextNodeWindow.hide();
	            }
	        }]  
	    
		});
	},
	//提交时候查询办理人列表
	saveselectUserList:function(nextnodeId,nextnodeName,nodeLength){
		Ext.Ajax.request({
			url : basepath + '/EchainCommon!getNodeUserList.json',
			method : 'GET',
			params : {
			InstanceID:_this.instanceID,
			nodeID : nextnodeId
		},
			waitMsg : '正在提交申请,请等待...', // 显示读盘的动画效果，执行完成后效果消失
			success : function(b) {
			debugger;
			var nextUserList = Ext.decode(b.responseText);
			if(nextUserList.nodeUsers.length>0){
				var radioName = nextnodeId+'RadioGroup';
				var nodemulteitFlagFlag = 'CheckboxGroup';
				if(nextUserList.multeitFlag!='n'){
					nodemulteitFlagFlag = 'RadioGroup';
				}
				for(var i = 0; i<nextUserList.nodeUsers.length;i++){
						if(nodemulteitFlagFlag=='CheckboxGroup'){
							radioName=nextnodeId+i;
						}
					if(i==0){
						nextUserListcheck = '{name:\''+radioName+'\',inputValue:\''+nextUserList.nodeUsers[i].userId+'\',boxLabel:\''+nextUserList.nodeUsers[i].userName+'\',checked:true}';
					}else{
						nextUserListcheck = nextUserListcheck+',{name:\''+radioName+'\',inputValue:\''+nextUserList.nodeUsers[i].userId+'\',boxLabel:\''+nextUserList.nodeUsers[i].userName+'\'}';
					}
				}
				eval('var nextUserListcheckbox = new Ext.form.'+nodemulteitFlagFlag+'({'+
						'allowBlank :\'false\','+
						'columns:2,'+
						'fieldLabel:\''+nextnodeName+'\','+
						'items : ['+nextUserListcheck+']});');
				_this.rightSlectNextNodePanel.add(nextUserListcheckbox);
			}
			_this.rightSlectNextNodePanel.doLayout();
			debugger;
			if(nodeLength==1&&nextUserList.nodeUsers.length==1){
				_this.OneWfCompleteJob(nextnodeId,nextUserList.nodeUsers[0].userId,nextUserList.nodeUsers[0].userName);
			}else if(nodeLength==1&&nextUserList.nodeUsers.length==0){
				_this.OneWfCompleteJob(nextnodeId,null,null);	
			}
			else {
				_this.selectNextNodeWindow.show();
			}
		},
			failure : function() {
				Ext.Msg.alert('提示', '未找到下一办理人!' );
			}
		});
	},
	//多节点选择提交节点
	wfCompleteJob:function(nexNodeID,nextNodeUser){
		_this=this;
		var commentReaders_Flag =0;
		if(_this.opinionFlag.getForm().findField('commentReaders').getValue()){
			commentReaders_Flag=1;
		}
		Ext.Ajax.request({
			url : basepath + '/EchainCommon!wfCompleteJob.json',
			method : 'GET',
			params : {
			instanceID:_this.instanceID,
			nodeID :_this.nodeId,
			nodeStatus:0,
			nextNodeID:nexNodeID,
			nextNodeUser:nextNodeUser
		},
			waitMsg : '正在提交申请,请等待...', // 显示读盘的动画效果，执行完成后效果消失
			success : function(a) {
				if(_this.submitAfterFun){
					_this.submitAfterFun();
				}
				Ext.Msg.alert('提示', '提交成功!' );
				_this.selectNextNodeWindow.close();
				Ext.getCmp(_this.WindowIdclode).close();
			},
			failure : function() {
				Ext.Msg.alert('提示', '提交申请失败!' );
			}
		});
	},
	//单节点单人提交
	OneWfCompleteJob:function(nexNodeID,nextNodeUser,nextNodeUserName){
		_this=this;
		var commentReaders_Flag =0;
		if(_this.opinionFlag.getForm().findField('commentReaders').getValue()){
			commentReaders_Flag=1;
		}
		Ext.Ajax.request({
			url : basepath + '/EchainCommon!wfCompleteJob.json',
			method : 'GET',
			params : {
			instanceID:_this.instanceID,
			nodeID :_this.nodeId,
			nodeStatus:0,
			nextNodeID:nexNodeID,
			nextNodeUser:nextNodeUser
		},
			waitMsg : '正在提交申请,请等待...', // 显示读盘的动画效果，执行完成后效果消失
			success : function(a) {
			if(nextNodeUserName==null){
				nextNodeUserName = '-';
			}
				if(_this.submitAfterFun){
					_this.submitAfterFun();
				}
				Ext.Msg.alert('提示', '提交成功!下一办理人:'+nextNodeUserName );
				Ext.getCmp(_this.WindowIdclode).close();
			},
			failure : function() {
				Ext.Msg.alert('提示', '提交申请失败!' );
			}
		});
	},
	//查询可打回用户列表
	selectCallbackUser:function(){
		_this= this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!getWFTreatedNodeList.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID,
			nodeID:_this.nodeId
		    },
			success : function(response) {
		    	var callbackUserList = Ext.decode(response.responseText);
		    	if(callbackUserList.length>0){
				if(_this.ccallbackCustomFun){
					var callbackCustomUser='';
					for(var i = 0; i<callbackUserList.length;i++){
						if(callbackUserList[i].nodeid==_this.callbackCustomFun.split('##')[0]){
							callbackCustomUser = callbackUserList[i].userid;
						}
					}
				  	Ext.Ajax.request( {
						url : basepath + '/EchainCommon!wfCallBack.json',
						method : 'GET',
						params:{
						instanceID:_this.instanceID,
						nodeID:_this.nodeId,
						nextNodeID:_this.callbackCustomFun.split('##')[0],
						nextNodeUser:callbackCustomUser,
						callBackModel:_this.callbackCustomFun.split('##')[1]
					    },
						success : function(response) {
					    	if(_this.callbackFun){
					    		_this.callbackFun();
					    	}
					    	_this.saveReader();
					    		Ext.Msg.alert('提示', '打回成功!' );
					    		Ext.getCmp(_this.WindowIdclode).close();
					    }
					});
				  	}else{
		    		var callbackNodeListcheck = '';
		    		for(var i = 0; i<callbackUserList.length;i++){
		    			if(callbackUserList[i].nodeid!=_this.nodeId){
						if(i==0){
							callbackNodeListcheck = '{name:\'RadioGroup\',inputValue:\''+callbackUserList[i].nodeid+'##'+callbackUserList[i].userid+'\',boxLabel:\''+callbackUserList[i].nodename+'-'+callbackUserList[i].username+'\',checked:true}';
						}else{
							callbackNodeListcheck = callbackNodeListcheck+',{name:\'RadioGroup\',inputValue:\''+callbackUserList[i].nodeid+'##'+callbackUserList[i].userid+'\',boxLabel:\''+callbackUserList[i].nodename+'-'+callbackUserList[i].username+'\'}';
						}
						}
					}
					eval('var callbackNodeListcheckbox = new Ext.form.RadioGroup({'+
							'columns:2,'+
							'items : ['+callbackNodeListcheck+']});');
					_this.SlectCallbackNodePanel.add(callbackNodeListcheckbox);
					_this.selectCallbackNodeWindow.show();
				  	}	}else{
		    		Ext.Msg.alert('提示', '没有找到可以打回的办理人列表!' );
		    	}
		    }
		});
		  _this.SlectCallbackNodePanel = new Ext.FormPanel({
			frame : true,
			height :250,
			region : 'north',
			layout:'fit',
			labelAlign:'right',
			items : []
		});
		  _this.callBackModelPanel = new Ext.Panel( {
			layout : 'column',
			region : 'center',
			frame : true,
			border : false,
			items : [ {
				columnWidth : .40,
				layout : 'form',
//				labelWidth : 8,
				border : false,
				items : [ new Ext.form.Radio( {
					boxLabel : "逐级提交",
					 labelStyle: 'text-align:right;',
					name : "callBackModel",
					checked : true
				}) ]
			}, {
				columnWidth : .60,
				layout : 'form',
//				labelWidth :8,
				border : false,
				items : [ new Ext.form.Radio( {
					boxLabel : "提交给打回发起人",
					 labelStyle: 'text-align:right;',
					name : "callBackModel"
				
				}) ]
			} ]
		});
		  _this.selectCallbackNodeWindow = new Ext.Window({
	        width : 500,
	        height :350,
	        layout:'border',
	        closable : true,
	        resizable : false,
	        collapsible : false,
	        draggable : true,
	        closeAction : 'hide',
	        title : '选择办理人',
	        modal : true, 
	        animCollapse : false,
	        maximizable : true,
	        border : false,
			animateTarget : Ext.getBody(),
	        closable : true,
	        constrain : true,
	        items : [_this.SlectCallbackNodePanel,_this.callBackModelPanel],
	        buttonAlign:'center',
	        buttons:[{
	            text:'打回',
	            handler:function(a){
	        	var callbacknodeid = '';
	        	var callbackuserid = '';
	        	var callBackModel ='1';
	        	for(var i = 0 ;i<_this.SlectCallbackNodePanel.items.items[0].items.items.length;i++){
	        		if(_this.SlectCallbackNodePanel.items.items[0].items.items[i].checked){
	        			callbacknodeid = _this.SlectCallbackNodePanel.items.items[0].items.items[i].inputValue.split('##')[0];
	        			callbackuserid = _this.SlectCallbackNodePanel.items.items[0].items.items[0].inputValue.split('##')[1];
	        		}
	        	}
	        	if(_this.callBackModelPanel.items.items[1].items.items[0].checked){
	        		callBackModel = '0';
	        	}
	        	Ext.Ajax.request( {
					url : basepath + '/EchainCommon!wfCallBack.json',
					method : 'GET',
					params:{
					instanceID:_this.instanceID,
					nodeID:_this.nodeId,
					nextNodeID:callbacknodeid,
					nextNodeUser:callbackuserid,
					callBackModel:callBackModel
				    },
					success : function(response) {
				    	if(_this.callbackFun){
				    		_this.callbackFun();
				    	}
				    	_this.saveReader();
				    		Ext.Msg.alert('提示', '打回成功!' );
				    		Ext.getCmp(_this.WindowIdclode).close();
				    		_this.selectCallbackNodeWindow.close();
				    }
				});
	        }
	        },{
	            text: '取消',
	            handler:function(){
	        	_this.selectCallbackNodeWindow.hide();
	            }
	        }]  
	    
		});
		
	},
	//催办按钮方法
	urgeFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfUrge.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", "催办成功!");
				_this.saveReader();
				if(_this.urgeAfterFun){
					_this.urgeAfterFun();
				}
		    }
		});
	},
	//退回方法
	returnbackFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfReturnBack.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", "退回成功!");
				_this.saveReader();
				if(_this.returnbackFun){
					_this.returnbackFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});
	},
	//挂起方法
	hangFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfHang.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", "流程挂起成功!");
				_this.saveReader();
				if(_this.hangFun){
					_this.hangFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});
	},
	//签收方法
	signFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!instanceSignIn.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
//			nodeID:_this.nodeId
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				_this.firstRequest(_this);
				if(_this.signFun){
					_this.signFun();
				}
		    }
		});	
	},
	//撤销签收方法
	signoffFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!instanceSignOff.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
//			nodeID:_this.nodeId
		    },
			success : function(response) {
		    	debugger;
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				if(_this.signoffFun){
					_this.signoffFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});	
	},
	//撤销任务认领方法
	tasksignoffFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!taskSignOff.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID
//			nodeID:_this.nodeId
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				if(_this.tasksignoffFun){
					_this.tasksignoffFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});	
	},
	//重办方法
	againFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfTakeBack.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID,
			nodeID:_this.nodeId
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				if(_this.againFun){
					_this.againFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});	
	},
	//撤办方法
	cancelFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfCancel.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID,
			nodeID:_this.nodeId
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				if(_this.cancelFun){
					_this.cancelFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});	
	},
	//唤醒
	wakeFunction:function(){
		_this=this;
		Ext.Ajax.request( {
			url : basepath + '/EchainCommon!wfCancel.json',
			method : 'GET',
			params:{
			instanceID:_this.instanceID,
			nodeID:_this.nodeId
		    },
			success : function(response) {
				Ext.Msg.alert("系统提示信息", Ext.util.JSON.decode(response.responseText).tip);
				_this.saveReader();
				if(_this.wakeFun){
					_this.wakeFun();
				}
				Ext.getCmp(_this.WindowIdclode).close();
		    }
		});	
	}
	
	
//在业务调用里面布局方式，具体参数请参照上面参数介绍
/*	var bussFieldSetGrid = new Ext.form.FieldSet({
	    animCollapse :true,
	    collapsible:true,
//	    collapsed:true,
	    title: '流程业务信息',
	    items:[panel2]
   }); 
		var EchainPanel = new Mis.Echain.EchainPanel({
			instanceID:instanceid,
			nodeId:nodeid,
			fOpinionFlag:true,
			WindowIdclode:curNodeObj.windowid
		});
	var view = new Ext.Panel( {
		renderTo : 'viewEChian',
		  frame : true,
		width : document.body.scrollWidth,
		height : document.body.scrollHeight-40,
		autoScroll : true,
		layout : 'form',
		items : [bussFieldSetGrid,EchainPanel]

	});*/
	});

