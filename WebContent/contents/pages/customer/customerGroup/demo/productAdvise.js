
Ext.onReady(function() {
	
	Ext.ScriptLoader.loadScript({
		scripts: [basepath + '/contents/pages/com.yucheng.bcrm/com.yucheng.bcrm.js',
		          basepath + '/contents/pages/common/Com.yucheng.bcrm.common.ProductManage.js',
		          basepath + '/contents/pages/common/Com.yucheng.crm.common.OrgUserManage.js',
		          basepath + '/contents/pages/common/Com.yucheng.bcrm.common.OrgField.js',
		          basepath + '/contents/pages/common/Com.yucheng.bcrm.common.CustomerQueryField.js',
		          basepath + '/contents/pages/mktManage/mktBusOpportManage/myBusOpportSalesActiv.js',
		          basepath + '/contents/pages/mktManage/mktBusOpportManage/myBusOpportSalesActivView.js',
		          basepath + '/contents/pages/mktManage/mktBusOpportManage/myBusOpportForm.js'
		          ],
		finalCallback:function(){
		}
	});
	
    var productEditPanel = new Ext.FormPanel({ //产品信息formpanel
        frame:true,
        region:'north',
        bodyStyle:'padding:5px 5px 0',
        width: '100%',
        height:380,
        autoScroll : true,
        split:true,
        labelWidth:120,
        items: [
                {
                    items :[
                        {  
                            layout:'column',
                             items:[
                                {
                                columnWidth:.5,
                                layout: 'form',
                                items: [
                                {
                                    xtype:'textfield',
                                    labelStyle: 'text-align:right;',
                                    fieldLabel: '产品类别',
                                    name: 'catlName',
                                    anchor:'100%'
                                },
                                 {
                                     xtype:'textfield',
                                     labelStyle: 'text-align:right;',
                                     fieldLabel: '产品名称',
                                     name: 'productName',
                                     allowBlank : false,
                                     anchor:'100%'
                                 },
                                 {
                                     xtype:'datefield',
                                     fieldLabel: '产品发布日期',
                                     labelStyle: 'text-align:right;',
                                     name: 'productStartDate',
                                     id: 'productStartDate1',
                                     format:'Y-m-d',
                                     anchor:'100%'
                                 },{
                                     xtype:'datefield',
                                     fieldLabel: '产品有效截止日期',
                                     labelStyle: 'text-align:right;',
                                     name: 'productEndDate',
                                     id: 'productEndDate1',
                                     format:'Y-m-d',
                                     anchor:'100%'
                                 },{
                                     xtype:'textarea',
                                     labelStyle: 'text-align:right;',
                                  fieldLabel: '产品描述',
                                  name: 'productDescription',
                                  maxLength : 150,
                                  anchor:'100%'
                                 },{
                                     xtype:'textarea',
                                     labelStyle: 'text-align:right;',
                                     maxLength : 150,
                                      fieldLabel: '产品特点',
                                      name: 'prod_charact',
                                      anchor:'100%'
                                 },{ 
                                     xtype:'textarea',
                                     fieldLabel: '营销渠道描述',
                                     maxLength : 150,
                                      labelStyle: 'text-align:right;',
                                     name: 'channel_disc',
                                     anchor:'100%'
                                   }             
                                 ]
                             },{
                                 columnWidth:.5,
                                 layout: 'form',
                                 items: [
                                    {
                                        name:'productState',
                                        hiddenName:'productState',
                                        xtype:'combo',
                                        anchor:'100%',
                                        fieldLabel:'产品状态',
                                        labelStyle: 'text-align:right;',
                                        triggerAction:'all',
                                        mode:'local',
//                                        store: prodStatStore,
                                        resizable:true,
                                        forceSelection : true,
                                        valueField:'key',
                                        displayField:'value'
                                    }             ,
                                 {
                                     xtype:'textfield',
                                     fieldLabel: '费率(%)',
                                     //readOnly:true,
                                     labelStyle: 'text-align:right;',
                                     name: 'cost_rate',
                                     anchor:'100%'
                                 }     ,{
                                     xtype:'textfield',
                                     labelStyle: 'text-align:right;',
                                     fieldLabel: '期限',
                                     //readOnly:true,
                                     name: 'limit_time',
                                     anchor:'100%'
                                 },{
                                     xtype:'textfield',
                                     fieldLabel: '利率(%)',
                                     //readOnly:true,
                                     labelStyle: 'text-align:right;',
                                     name: 'rate',
                                     anchor:'100%'
                                 },{ 
                                     xtype:'textarea',
                                     fieldLabel: '客户准入规则',
                                      labelStyle: 'text-align:right;',
                                     hidden:true,
                                     name: 'custTarRule',
                                     anchor:'100%'
                                 },{ 
                                     xtype:'textarea',
                                     fieldLabel: '目标客户描述',
                                     maxLength : 150,
                                      labelStyle: 'text-align:right;',
                                     name: 'obj_cust_disc',
                                     anchor:'100%'
                                 },{
                                     xtype:'textarea',
                                     labelStyle: 'text-align:right;',
                                     maxLength : 150,
                                  fieldLabel: '担保要求描述',
                                  name: 'assure_disc',
                                  anchor:'100%'
                                 },{
                                     xtype:'textarea',
                                     labelStyle: 'text-align:right;',
                                     maxLength : 150,
                                      fieldLabel: '风险提示描述',
                                      name: 'danger_disc',
                                      anchor:'100%'
                                 }                          
                                ]
                             }
                            ]}
                            ]
                            },{
                        items :[
                                {  
                                    layout:'column',
                                     items:[
                                        {
                                        columnWidth:.5,
                                        layout: 'form',
                                        items: [
                                         {
                                             xtype:'textfield',
                                             fieldLabel: '隐藏Id',
                                             labelStyle: 'text-align:right;',
                                             hidden:true,
                                             name: 'productId',
                                             id:'productIdId',
                                             anchor:'100%'
                                         },{
                                             xtype:'textfield',
                                             fieldLabel: '隐藏catlCode',
                                             labelStyle: 'text-align:right;',
                                             hidden:true,
                                             name: 'catlCode',
                                             anchor:'100%'
                                         },{
                                             xtype:'textfield',
                                             fieldLabel: '创建人',
                                             labelStyle: 'text-align:right;',
                                             hidden:true,
                                             name: 'productCreator',
                                             anchor:'100%'
                                         }                                   
                                         ]
                                        }
                            ]}
                            ]
                            }         
                    ]
    }); 
    var prodTabs = new Ext.TabPanel({
        width:'100%',
        heignt:'100%',
        activeTab: 0,
        frame:true,
        defaults:{autoHeight: true},
        resizeTabs:true, // turn on tab resizing
        preferredTabWidth:150,	        
        items:[
        	{ 
				title: '<span style=\'text-align:center;\'>产品信息</span>',
				items:[productEditPanel]
			},
            { 
				title: '<span style=\'text-align:center;\' >产品介绍</span>',
				html:'',
		          listeners : {
					'activate' : function(o) {
						var nodeId = '198';
						
						
	        	  		o.el.dom.innerHTML = '<iframe id="content3" name="content3" style="width:100%;height:'
			  	  			+ 450
			  				+ 'px;" frameborder="no"" src=\"'
			  				+ basepath
			  				+ '/contents/pages/demo/docs/doc1.jsp?nodeId='+nodeId
			  				+ '\" "/> scrolling="auto"> ';
					}
				  }
			}
        ]
    });	

	var productInfo = new Ext.Window({//产品推荐window

		title : '产品详情',
		closable : true,
		plain : true,
		resizable : false,
		collapsible : false,
		height:400,
		width:620,
		draggable : false,
		closeAction : 'hide',
		modal : true, // 模态窗口 
		border : false,
		closable : true,
		animateTarget : Ext.getBody(),
		constrain : true,
		items:[prodTabs]
	});
//	// 列选择模型
	var sm = new Ext.grid.CheckboxSelectionModel();
//	// 定义自动当前页行号
	var rownum = new Ext.grid.RowNumberer({
		header : 'NO',
		width : 28
	});
	var productInfoColumns2 = new Ext.grid.ColumnModel([//gridtable中的列定义
		                                                sm,
		                                               rownum,
		                                               {header :'ID',dataIndex:'id2',id:"id2",width:150,sortable : true,hidden:true},
		                                               {header :'产品名称',dataIndex:'productId2',id:"productId2",width:150,sortable : true},
		                                               {header:'推荐方式',dataIndex:'productName2',id:'productName2',width:200,sortable : true},
		                                               {header:'购买意愿',dataIndex:'productType2',id:'productType2',width:150,sortable : true,hidden:true},	
		                                               {header:'是否成功',dataIndex:'order2',id:'order2',width:150,sortable : true},
		                                               {header:'后续计划',dataIndex:'fitRate2',id:'fitRate2',width:150,sortable : true}
		                                               ]);

	   var store2 = new Ext.data.Store({
			//restful:true,
//	        proxy : new Ext.data.HttpProxy({url:basepath+'/eventinformation.json?customerId='+tempUserId}),
	        reader: new Ext.data.JsonReader({
             //data:tb_memberData,

	           // successProperty: 'success',
	            root:'rows',
	            totalProperty: 'num'
	        }, [ {name:'id'},
             {name:'productId2'},
             {name:'productName2'},
             {name:'productType2'},
             {name:'order2'},
             {name:'fitRate2'}
			])
		});
	var tb_memberData2= {
	num:1,
	rows:[
	{"id":"1","productId2":"金创黄金","productName2":"网点","productType2":"十分强烈","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"2","productId2":"青花十二生肖","productName2":"短信","productType2":"有兴趣","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"3","productId2":"中华龙金","productName2":"电话","productType2":"有兴趣","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"4","productId2":"生肖聚宝盆","productName2":"电话","productType2":"十分强烈","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"5","productId2":"敦煌银条","productName2":"短信","productType2":"无兴趣","order2":"否","fitRate2":"推荐其他类别"},
	{"id":"6","productId2":"金条","productName2":"短信","productType2":"十分强烈","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"7","productId2":"聚宝盆","productName2":"网点","productType2":"十分强烈","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"8","productId2":"黄金五代","productName2":"网点","productType2":"有兴趣","order2":"是","fitRate2":"推荐相关产品"},
	{"id":"9","productId2":"富足天下","productName2":"邮件","productType2":"无兴趣","order2":"否","fitRate2":"推荐其他类别"},
	{"id":"0","productId2":"黄金麒麟","productName2":"邮件","productType2":"无兴趣","order2":"否","fitRate2":"推荐其他类别"}
	]
};
store2.loadData(tb_memberData2);

	 var advisePanel = new Ext.form.FormPanel({
			height:230,
			width:400,
			buttonAlign:'center',
			labelWidth:100,//label的宽度
			labelAlign:'right',
			frame:true,
			autoScroll : true,
			region:'north',
			split:true,
			items:[
			       {
			       layout:'column',
		    	   items:[
					{
					 columnWidth:.8,
					 layout:'form',
					 items:[{
				        		xtype:'textfield',
								name:'id',
								fieldLabel:'ID',
								anchor:'100%',
								hidden:true
							},
					        {
					        	xtype:'textfield',
									name:'accountName',
									fieldLabel:'产品名称',
									anchor:'100%'
								},
								 {
								     fieldLabel: '推荐方式',
								     name: 'COMPLAINTED_BUSINESS',
								     editable:false,
		                             forceSelection : true,
		                             xtype:'combo',
		                             labelStyle: 'text-align:right;',
		                             triggerAction:'all',
		                             mode:'local',
		                             store:new Ext.data.ArrayStore({
		                                 fields:['myId','displayText'],
		                                 data:[['电话','电话'],['网点','网点'],
		                                       ['邮件','邮件'],['短信','短信']]
		                             }),
		                             valueField:'myId',
		                             displayField:'displayText',
		                             emptyText:'请选择',
		                             anchor : '100%'
		                         },
									{
								     fieldLabel: '购买意愿',
								     name: 'COMPLAINTED_BUSINESS',
								     editable:false,
		                             forceSelection : true,
		                             xtype:'combo',
		                             labelStyle: 'text-align:right;',
		                             triggerAction:'all',
		                             mode:'local',
		                             store:new Ext.data.ArrayStore({
		                                 fields:['myId','displayText'],
		                                 data:[['十分强烈','十分强烈'],
		                                       ['有兴趣','有兴趣'],['无兴趣','无兴趣']]
		                             }),
		                             valueField:'myId',
		                             displayField:'displayText',
		                             emptyText:'请选择',
		                             anchor : '100%'
		                         },{
								     fieldLabel: '是否成功',
								     name: 'COMPLAINTED_BUSINESS',
								     editable:false,
		                             forceSelection : true,
		                             xtype:'combo',
		                             labelStyle: 'text-align:right;',
		                             triggerAction:'all',
		                             mode:'local',
		                             store:new Ext.data.ArrayStore({
		                                 fields:['myId','displayText'],
		                                 data:[['是','是'],
		                                       ['否','否']]
		                             }),
		                             valueField:'myId',
		                             displayField:'displayText',
		                             emptyText:'请选择',
		                             anchor : '100%'
		                         },{ 
                                  xtype:'textarea',
                                  fieldLabel: '后续计划',
                                  maxLength : 150,
                                   labelStyle: 'text-align:right;',
                                  name: 'obj_cust_disc',
                                  anchor:'100%'
                                          }   
								]
					}
						 ]
						}
			       ],
			       buttonAlign:'center',
			       buttons:[
			                {
			                	text:'推荐',
			                	handler:function(){
			                	productAdvise2.hide();
			                }
			                }
			                ]
		});
	var productAdvise2 = new Ext.Window({//产品推荐window

		title : '产品推荐',
		closable : true,
		plain : true,
		resizable : false,
		collapsible : false,
		height:250,
		width:400,
		draggable : false,
		closeAction : 'hide',
		modal : true, // 模态窗口 
		border : false,
		closable : true,
		animateTarget : Ext.getBody(),
		constrain : true,
//		tbar:tbar3,
		items:[advisePanel]
	});
	var tbar3 = new Ext.Toolbar({
	items : [
	         {
			text : '推荐',
			handler : function() {

	        	 productAdvise2.show();
				
	         }
	         }
	         ]
});
	var productGrid2 =  new Ext.grid.GridPanel({//用户列表数据grid
	frame:true,
	width:'100%',
	height:600,
	id:'productGrid2',
	autoScroll : true,
	tbar:tbar3,
//	bbar:bbar,
	stripeRows : true, // 斑马线
	store:store2,
	loadMask:true,
	cm :productInfoColumns2,
	sm :sm,
	viewConfig:{
		forceFit:false,
		autoScroll:true
	},
        loadMask : {
	msg : '正在加载表格数据,请稍等...'
}
});

	var productAdvise = new Ext.Window({//产品推荐window

		title : '产品推荐',
		closable : true,
		plain : true,
		resizable : false,
		collapsible : false,
		height:300,
		width:700,
		draggable : false,
		closeAction : 'hide',
		modal : true, // 模态窗口 
		border : false,
		closable : true,
		animateTarget : Ext.getBody(),
		constrain : true,
//		tbar:tbar3,
		items:[productGrid2]
	});
	var productDetail = new Ext.Window({//产品饼图展示window

		title : '产品销售展示图',
		closable : true,
		plain : true,
		resizable : false,
		collapsible : false,
		height:430,
		width:1050,
		draggable : false,
		 autoScroll:true,
		closeAction : 'hide',
		modal : true, // 模态窗口 
		border : false,
		closable : true,
		animateTarget : Ext.getBody(),
		constrain : true,
        layout:'border',
	       // border:false,
	        items:[{
	            xtype:'portal',
	            id:'center',
	            region:'center',
	            items:[
	            	{
	                columnWidth:.33333,
	                border:false,
	                autoHeight:true,
	                id:'cus',
	                //layout:'fit',
	                items:[{
	                    title: '产品销售统计图-年收入',
	                    collapsible:true,
	                    layout:'fit',
	                    style:'padding:0px 0px 0px 0px',
	                    height:200,
	                    html:'<iframe id="contentFrame" name="content" height="200" frameborder="no" width="100%" src=\"customerBaseInformation/fusionchartsDemo/contribute/aa.html\" "/> scrolling="no"> </iframe>'
	                },{
	                	layout:'fit',
	                	style:'padding:0px 0px 0px 0px',
	                	collapsible:true,
	                    title: '产品销售统计图-年龄段',
	                    height:200,
            		    html:'<iframe id="contentFrame4" name="content4" height="200" frameborder="no" width="100%" src=\"customerBaseInformation/fusionchartsDemo/contribute/bb.html\" "/> scrolling="no"> </iframe>'
	                }]
	            },{
	                columnWidth:.33333,
	                autoHeight:true,
	                //layout:'fit',
	                border:false,
	                items:[{
	                	layout:'fit',
	                	style:'padding:0px 0px 0px 0px',
	                	collapsible:true,
	                    title: '产品销售统计图-职位',
	                    height:200,
            		    html:'<iframe id="contentFrame1" name="content1" height="200" frameborder="no" width="100%" src=\"customerBaseInformation/fusionchartsDemo/contribute/dd.html\" "/> scrolling="no"> </iframe>'
	                },{
	                	layout:'fit',
	                	style:'padding:0px 0px 0px 0px',
	                	collapsible:true,
	                    title: '产品销售统计图-性别',
	                    height:200,
            		    html:'<iframe id="contentFrame3" name="content3" height="200" frameborder="no" width="100%" src=\"customerBaseInformation/fusionchartsDemo/contribute/ee.html\" "/> scrolling="no"> </iframe>'
	                }]
	                
	            },{
	                columnWidth:.33333,
	                autoHeight:true,
	                //layout:'fit',
	                border:false,
	                items:[{
	                	layout:'fit',
	                	style:'padding:0px 0px 0px 0px',
	                	collapsible:true,
	                    title: '产品销售统计图-总资产',
	                    height:200,
            		    html:'<iframe id="contentFrame2" name="content2" height="200" frameborder="no" width="100%" src=\"customerBaseInformation/fusionchartsDemo/contribute/cc.html\" "/> scrolling="no"> </iframe>'
	                }]
	                
	            }] 
	        }]
	});	


	var tbar = new Ext.Toolbar({
		items : [
//		         {
//				text : '产品详情',
//				handler : function() {
//
//		        	 productInfo.show();
//					
//		         }
//		         }
//		         ,'-',{
//		        	 text : '产品分布统计',
//		        	 handler : function() {
//		        	 productDetail.show();
//		         }
//		         }
//		         ,'-',{
//		        	 text : '产品推荐',
//		        	 handler : function() {
//		        	 productAdvise.show();
//		         }
//		         }
//		         //wzy，2013-02-20，南京银行POC，增加按钮
//		         ,
				{
					text : '创建商机',
					iconCls:'addIconCss',
					handler : function() {
					resetAddForm();
					addMyBusOpportInit02();	
					}
				},{
		            text : '生成营销活动',
		            iconCls:'addIconCss',
		            handler : function() {
		            	
					addActivityForm.form.reset();
					addActivityProdForm.form.reset();
					addActivityCustForm.form.reset();
					addActivityForm.form.findField('createUser').setValue(__userId);
					addActivityForm.form.findField('test').setValue(__userName);
					addActivityForm.form.findField('createDate').setValue(new Date());
					addActivityForm.form.findField('mktActiStat').setValue(1);
					addActivityForm.form.findField('mktActiName').setValue('小企业扶持贷款推广');
					addActivityForm.form.findField('mktActiType').setValue('推广活动');
					addActivityForm.form.findField('mktActiMode').setValue('宣传');
					addActivityForm.form.findField('mktActiTeam').setValue('小企业贷款组');
					addActivityForm.form.findField('mktActiCost').setValue('1000');
					addActivityForm.form.findField('mktActiAddr').setValue('南京市建邺区应天西路所叶路20号');
					addActivityForm.form.findField('mktActiCont').setValue('宣传小企业的扶持贷款政策，吸引贷款');
					addActivityForm.form.findField('actiCustDesc').setValue('该工业园区的小企业');
					addActivityForm.form.findField('actiOperDesc').setValue('本行支行客户经理');
					addActivityForm.form.findField('actiProdDesc').setValue('小企业扶持到款');
					addActivityForm.form.findField('mktActiAim').setValue('推广');
					addActivityForm.form.findField('actiRemark').setValue('无');
							 				
					addActivityWindow.show();

		            }}
		         ]
	});
//	// 列选择模型
	var sm = new Ext.grid.CheckboxSelectionModel();
//	// 定义自动当前页行号
	var rownum = new Ext.grid.RowNumberer({
		header : 'NO',
		width : 28
	});
	   var store = new Ext.data.Store({
			//restful:true,
//	        proxy : new Ext.data.HttpProxy({url:basepath+'/eventinformation.json?customerId='+tempUserId}),
	        reader: new Ext.data.JsonReader({
             //data:tb_memberData,

	           // successProperty: 'success',
	            root:'rows',
	            totalProperty: 'num'
	        }, [ {name:'id'},
             {name:'productId'},
             {name:'productName'},
             {name:'productType'},
             {name:'order'},
             {name:'fitRate'}
			])
		});
var tb_memberData= {
	num:1,
	rows:[
	{"id":"1","productId":"701","productName":"订单融资业务","productType":"贵金属","order":"1","fitRate":"90%"},
	{"id":"2","productId":"702","productName":"厂商银","productType":"基金","order":"2","fitRate":"80%"},
	{"id":"3","productId":"703","productName":"法人账户透支业务","productType":"贵金属","order":"3","fitRate":"70%"},
	{"id":"4","productId":"704","productName":"国内保理","productType":"理财","order":"4","fitRate":"60%"},
	{"id":"5","productId":"705","productName":"保兑仓","productType":"贵金属","order":"5","fitRate":"54%"},
	{"id":"6","productId":"706","productName":"动产质押融资","productType":"贵金属","order":"6","fitRate":"47%"},
	{"id":"7","productId":"707","productName":"专利权质押贷款","productType":"理财","order":"7","fitRate":"43%"},
	{"id":"8","productId":"708","productName":"政府采购贷","productType":"证券","order":"8","fitRate":"37%"},
	{"id":"9","productId":"709","productName":"知识产权质押贷款","productType":"贵金属","order":"9","fitRate":"28%"},
	{"id":"0","productId":"710","productName":"软件著作权质押贷款","productType":"贵金属","order":"10","fitRate":"13%"}
	]
};
store.loadData(tb_memberData);
	var productInfoColumns = new Ext.grid.ColumnModel([//gridtable中的列定义
	                                                sm,
	                                               rownum,
	                                               {header :'ID',dataIndex:'id',id:"id",width:150,sortable : true,hidden:true},
	                                               {header :'产品编号',dataIndex:'productId',id:"productId",width:150,sortable : true},
	                                               {header:'产品名称',dataIndex:'productName',id:'productName',width:200,sortable : true},
	                                               {header:'产品类别',dataIndex:'productType',id:'productType',width:150,sortable : true,hidden:true},	
	                                               {header:'排名',dataIndex:'order',id:'order',width:150,sortable : true,align : 'right'},
	                                               {header:'适合率',dataIndex:'fitRate',id:'fitRate',width:150,sortable : true,align : 'right'}
	                                               ]);


	// 每页显示条数下拉选择框
	var pagesize_combo = new Ext.form.ComboBox({
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
		value : '20',
		forceSelection : true,
		width : 85
	});

	var number = parseInt(pagesize_combo.getValue());
	pagesize_combo.on("select", function(comboBox) {
		bbar.pageSize = parseInt(pagesize_combo.getValue()),
		store.load({
			params : {
			start : 0,
			limit : parseInt(pagesize_combo.getValue())
		}
		});
	});
	var bbar = new Ext.PagingToolbar({
		pageSize : number,
		store : store,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		emptyMsg : "没有符合条件的记录",
		items : ['-', '&nbsp;&nbsp;', pagesize_combo]
	});
	var productGrid =  new Ext.grid.GridPanel({//用户列表数据grid
		frame:true,
		width:'100%',
		height:600,
		id:'productGrid',
		autoScroll : true,
		tbar:tbar,
		bbar:bbar,
		stripeRows : true, // 斑马线
		store:store,
		loadMask:true,
		cm :productInfoColumns,
		sm :sm,
		viewConfig:{
			forceFit:false,
			autoScroll:true
		},
	        loadMask : {
		msg : '正在加载表格数据,请稍等...'
	}
	});

	
	
	var view=new Ext.Panel({
//		 renderTo:'group_viewport_center',
		 renderTo:oCustInfo.view_source,	
		 height:document.body.scrollHeight-30,
		 layout : 'fit',
		 autoScroll:true,
		items:[{
            autoHeight:true,
            autoScroll:true,
            border:false,
            items:[{
            	width:document.body.scrollWidth,
                autoScroll:true,
            	collapsible:true,
                items:[productGrid]
            }]
        }]
	});
}) ;