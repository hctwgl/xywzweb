	Ext.onReady(function() {
		Ext.QuickTips.init();
		var instanceid = '';
		if(window.location.href.split("instanceid=")[1]!=undefined){
			instanceid = window.location.href.split("instanceid=")[1];
		}
		/** ********客户品牌大类******* */
		var p_cust_grade = new Ext.data.Store( {
			restful : true,
			sortInfo : {
				field : 'key',
				direction : 'ASC'
			},
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=P_CUST_GRADE'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON',
				totalProperty : 'list'
			}, [ 'key', 'value' ])
		});
		p_cust_grade.load();
		//证件类型
		var certTypStore = new Ext.data.Store( {
			restful : true,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy( {
				url : basepath + '/lookup.json?name=PAR0100006'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'JSON'
			},['key','value'])
		});
		certTypStore.load();
		/**
		 * 数据存储
		 */
		var TopicRecord = Ext.data.Record.create( [ {
			name : 'id',
			mapping : 'id'
		}, {
			name : 'applyDate',
			mapping : 'applyDate'
		}, {
			name : 'applyOrg',
			mapping : 'applyOrg'
		}, {
			name : 'applyUser',
			mapping : 'applyUser'
		}, {
			name : 'certCode',
			mapping : 'certCode'
		}, {
			name : 'certType',
			mapping : 'certType'
		}, {
			name : 'currentGrade',
			mapping : 'currentGrade'
		}, {
			name : 'custId',
			mapping : 'custId'
		}, {
			name : 'custName',
			mapping : 'custName'
		}, {
			name : 'position',
			mapping : 'position'
		}, {
			name : 'reason',
			mapping : 'reason'
		}, {
			name : 'salary',
			mapping : 'salary'
		}, {
			name : 'status',
			mapping : 'status'
		}, {
			name : 'telphone',
			mapping : 'telphone'
		}, {
			name : 'toGrade',
			mapping : 'toGrade'
		}, {
			name : 'workUnit',
			mapping : 'workUnit'
		} ]);
	    var store = new Ext.data.Store({
						restful:true,	
				        proxy : new Ext.data.HttpProxy(
				        		{
				        			url:basepath+'/ocrmFCiGradeApply-info!indexPage.json?id='+instanceid
				        		}),
				        reader: new Ext.data.JsonReader({
				            successProperty: 'success',
				        root:'json.data',
	                    totalProperty: 'json.count'
				        }, TopicRecord)
					});
	    var panel2 = new Ext.FormPanel({ 
	        formId:'panel2',
			frame:true,
			autoScroll:true,
			bodyStyle:'padding:5px 5px 0',
			title : '<span style="font-weight:normal">评级申请信息</span>',
			width: '100%',
//		    height:380,
			items: [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : [ {
						name : 'custName',
						fieldLabel : '客户姓名',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						maxLength : 200,
						readOnly : true,
						anchor : '90%'
					} ]
				}, {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : [ {
						id : 'custId_1',
						name : 'custId',
						fieldLabel : '客户编号',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						maxLength : 200,
						readOnly : true,
						anchor : '90%'
					} ]
				  	} ]
			},{
				layout : 'column',
				items : [ {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
					id:'certType_1',
					store : certTypStore,
					xtype : 'combo',
					resizable : true,
					fieldLabel : '证件类型',
					name : 'certType',
					hiddenName : 'certType',
					valueField : 'key',
					displayField : 'value',
					mode : 'local',
					typeAhead : true,
					forceSelection : true,
					triggerAction : 'all',
					emptyText : '请选择',
					selectOnFocus : true,
					readOnly : true,
					width : '100',
					anchor : '90%'
				}
				}, {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						id : 'certCode_1',
						name : 'certCode',
						fieldLabel : '证件号码',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						readOnly : true,
						maxLength : 200,
						anchor : '90%'
			       }
				} ]
			}, {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						id : 'workUnit_1',
						name : 'workUnit',
						fieldLabel : '工作单位',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						readOnly : true,
						maxLength : 200,
						anchor : '90%'
					}
				}, {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						id : 'position_1',
						name : 'position',
						fieldLabel : '职务',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						readOnly : true,
						maxLength : 200,
						anchor : '90%'
					}
				}, {// 特别注意：须放置隐藏域的主键
							name : 'id',
							xtype : 'hidden'
						} ]
			}, {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						id : 'salary_1',
						name : 'salary',
						fieldLabel : '年收入',
						xtype : 'numberfield', 
						width : 100,
						//allowBlank : false,
						readOnly : true,
						maxLength : 200,
						anchor : '90%'
					}
				}, {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						id : 'telphone_1',
						name : 'telphone',
						fieldLabel : '联系电话',
						xtype : 'textfield',
						width : 100,
						//allowBlank : false,
						readOnly : true,
						maxLength : 200,
						anchor : '90%'
					}
				} ]
			   }, {
				layout : 'column',
				items : [  {
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
						store : p_cust_grade,
						id:'currentGrade_1',
						xtype : 'combo',
						resizable : true,
						fieldLabel : '现有评级',
						name : 'currentGrade',
						hiddenName : 'currentGrade',
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						typeAhead : true,
						forceSelection : true,
						readOnly : true,
						triggerAction : 'all',
						emptyText : '请选择',
						selectOnFocus : true,
						width : '100',
						anchor : '90%'
					}
				},{
					columnWidth : .5,
					labelWidth : 60,
					layout : 'form',
					items : {
					store : p_cust_grade,
					xtype : 'combo',
					resizable : true,
					fieldLabel : '申请评级',
					name : 'toGrade',
					hiddenName : 'toGrade',
					valueField : 'key',
					displayField : 'value',
					mode : 'local',
					typeAhead : true,
					forceSelection : true,
					readOnly : true,
					triggerAction : 'all',
					emptyText : '请选择',
					selectOnFocus : true,
					width : '100',
					anchor : '90%'
				}
				} ]
			}, {
				layout : 'form',
				columnWidth : .5,
				labelWidth : 60,
				items : [ {
					id : '1123',
					name : 'reason',
					fieldLabel : '申请原因',
					xtype : 'textarea',
					width : 200,
					//allowBlank : false,
					readOnly : true,
					maxLength : 400,
					anchor : '95%'
				} ]
			} ]
			});
	    
//	    var addRoleWindow = new Ext.Window(
//	    		{
//	    			//layout : 'fit',
//	    	        height : 400,
//	    	        width:600,
//	    			draggable : true,//是否可以拖动
//	    			closable : true,// 是否可关闭
//	    			modal : true,
//	    	        autoScroll:true,
//	    			closeAction : 'hide',
//	    			// iconCls : 'page_addIcon',
//	    			//maximizable: true,
//	    			//maximized:true,
//	    			collapsible : true,// 是否可收缩
//	    			titleCollapse : true,
//	    			buttonAlign : 'center',
//	    			border : false,
//	    			animCollapse : true,
//	    			pageY : 20,
//	    			//pageX : document.body.clientWidth / 2 - 420 / 2,
//	    			animateTarget : Ext.getBody(),
//	    			constrain : true,
//	    			items : [panel2],
//	    			buttons : [
//	    	        { // 窗口底部按钮配置
//	    	            text : '关    闭', // 按钮文本
//	    	            handler : function() { // 按钮响应函数
//	    	                addRoleWindow.hide();
//	    	            }
//	    	        }]
//	    		});
			// 布局模型
			var viewport = new Ext.Viewport( {
				layout : 'fit',
				items : [ panel2 ]
			});
			
			store.load({callback:function(){
				panel2.getForm().loadRecord(store.getAt(0));
				viewport.render('info');
//				viewport.doLayout();    //如果render不正常，调用此方法
//				addRoleWindow.show();
			}});
		
		});