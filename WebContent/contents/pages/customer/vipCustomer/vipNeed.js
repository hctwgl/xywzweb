Ext.onReady(function() {
			Ext.QuickTips.init(); 
	var search_cust = new Com.yucheng.bcrm.common.CustomerQueryField({ 
		fieldLabel : '客户姓名', 
		labelStyle: 'text-align:right;',
		labelWidth : 100,
		name : 'custName',
		id:'custName',
		custtype :'1',//客户类型：  1：对私, 2:对公,  不设默认全部
//		    custStat:'1',//客户状态: 1:正式 2：潜在     , 不设默认全部
	    singleSelected:true,//单选复选标志
		editable : false,
		allowBlank:false,//不允许为空
		blankText:"不能为空，请填写",
		anchor : '95%',
		hiddenName:'abcd',
		callback :function(){
			var cust_id = null;
			var cust_name = null;
			var cert_type = null;
			var cert_num = null; 
			var mobile_num = null; 
			
			cust_name = Ext.getCmp('custName').getValue();
			if (cust_name != null && cust_name != '') {
				cust_id = Ext.getCmp('custName').customerId;
				cert_type = Ext.getCmp('custName').certType;
				cert_num = Ext.getCmp('custName').certNum;
				mobile_num = Ext.getCmp('custName').mobileNum;
				listPanel.fp.getForm().findField('custId').setValue(cust_id);
				listPanel.fp.getForm().findField('certNum').setValue(cert_num);
				listPanel.fp.getForm().findField('certType').setValue(cert_type);
				listPanel.fp.getForm().findField('mobileNum').setValue(mobile_num);
			}
		}
	});
	  /***********************************数据字典store*****************************/
    //是否接受彩信
    var isMessageStore = new Ext.data.Store({  
        restful:true,   
        autoLoad :true,
        proxy : new Ext.data.HttpProxy({
                url :basepath+'/lookup.json?name=IS_CREA_CHANCE'
            }),
            reader : new Ext.data.JsonReader({
                root : 'JSON'
            }, [ 'key', 'value' ])
        });
        
        //服务状态
        var serviceStore = new Ext.data.Store({  
            restful:true,   
            autoLoad :true,
            proxy : new Ext.data.HttpProxy({
                    url :basepath+'/lookup.json?name=SERVICE_FLAG'
                }),
                reader : new Ext.data.JsonReader({
                    root : 'JSON'
                }, [ 'key', 'value' ])
            });
	var temp = '';	
			//最终展现的panel
			var listPanel = new Mis.Ext.CrudPanel({
				id : "listPanel",
				title : "客户增值服务",
				stUrl : basepath + '/ValueAddServiceQuery.json?optype=0',
				addUrl : basepath + '/ValueAddService.json',
				updateUrl : basepath + '/ValueAddService.json',
				deUrl : basepath+ '/ValueAddService!batchDestroy.json',
				primary : "id",
				checkbox : true,
				winWidth : 700,
				winHeight: 380,
				seFormHeight :0,
				gclms : [
						{name : 'id',header:'ID',mapping : 'ID'},
						{name : 'serverId',header:'',mapping : 'SERVER_ID'},
						{name : 'serverName',header:'',mapping : 'SERVER_NAME'},
				        {name : 'custId',header:'客户号',mapping : 'CUST_ID'},
				        {name : 'custName',header:'客户名称',mapping : 'CUST_NAME'},
//				        {name : 'custGrade',header:'',mapping : 'CUST_GRADE'},
//				        {name : 'requestment',header:'需求要点',mapping : 'REQUESTMENT'},
				        {name : 'certType',header:'证件类型',mapping : 'CERT_TYPE'},
				        {name : 'certNum',header:'证件号',mapping : 'CERT_NUM'},
				        {name : 'mobileNum',header:'手机号',mapping : 'MOBILE_NUM'},
				        {name : 'isMessage',header:'是否接收彩信',mapping : 'IS_MESSAGE'},
				        {name : 'serviceChannel',header:'服务渠道',mapping : 'SERVICE_CHANNEL'},
				        {name : 'serviceDistribute',header:'服务需求描述',mapping : 'SERVICE_DISTRIBUTE'},
				        {name : 'serviceStat',header:'服务状态',mapping : 'SERVICE_STAT'},
				        {name : 'serviceAppraisement',header:'服务评价',mapping : 'SERVICE_APPRAISEMENT'},
				        {name : 'createUser',header:'创建人',mapping : 'CREATE_USER'},
				        {name : 'createDate',header:'创建日期',mapping : 'CREATE_DATE'},
				        {name : 'feedback',header:'',mapping : 'FEEDBACK'},
				        {name : 'barterCon',header:'',mapping : 'BARTER_CON'},
				        {name : 'createOrg',header:'',mapping : 'CREATE_ORG'}
				        ],
				pagesize : 20,
				//from的字段
				fclms:[{
		            items :[{ layout:'column',
		                buttonAlign : 'center',
		                labelWidth:80,
		                labelStyle: 'text-align:right;',
		                     items:[{
		                         columnWidth:.49,
		                         layout: 'form',
		                         items: [
                                { 
                                xtype:'textfield',
 								name :'id',
 								hidden:true},
		                        search_cust,	
                                {  
								fieldLabel : '客户号',
								name : 'custId',
								allowBlank : false,
								readOnly:true,
								xtype:'textfield',
								 labelStyle: 'text-align:right;',
								anchor : '95%'},
								
		                         {
		                             xtype:'textfield',
		                             maxLength:100,
		                             fieldLabel: '证件类型',
		                             name: 'certType',
		                             readOnly:true,
//		                             allowBlank : false,
		                              labelStyle: 'text-align:right;',
		                             anchor:'95%'
		                         },
		                         {
		                             xtype:'textfield',
		                             maxLength:100,
		                             fieldLabel: '证件号',
		                             readOnly:true,
		                             allowBlank : false,
		                             name: 'certNum',
		                              labelStyle: 'text-align:right;',
		                             anchor:'95%'
		                         }
								]
		                     },
		                     {
		                         columnWidth:.49,
		                         layout: 'form',
		                         items: [
									{
									xtype:'textfield',
									maxLength:100,
									fieldLabel: '手机号',
									name: 'mobileNum',
									allowBlank : false,
									 labelStyle: 'text-align:right;',
									anchor:'95%'
									},
									{
									 xtype : 'combo',
		                             fieldLabel : '是否接收彩信',
		                             name: 'isMessage',
		                             store: isMessageStore,
		                             labelStyle: 'text-align:right;',
		                             valueField:'key',
		                             displayField:'value',
		                             mode : 'local',
		                             typeAhead: true,
		                             editable:true,
		                             forceSelection: true,
		                             triggerAction: 'all',
		                             emptyText:'请选择',
		                             selectOnFocus:true,
		                             width : '100',
		                             anchor : '95%'
									},
									{
										 xtype : 'combo',	
			                             fieldLabel : '增值服务状态',
			                             store: serviceStore,
			                             name: 'serviceStat',
			                             labelStyle: 'text-align:right;',
			                             valueField:'key',
			                             displayField:'value',
			                             mode : 'local',
			                             typeAhead: true,
			                             editable:true,
			                             forceSelection: true,
			                             triggerAction: 'all',
			                             emptyText:'请选择',
			                             selectOnFocus:true,
			                             width : '100',
			                             anchor : '95%'
										},
									{
									    xtype:'textfield',
									    maxLength:100,
									    fieldLabel: '增值服务评价',
									    name: 'serviceAppraisement',
									    allowBlank : false,
									     labelStyle: 'text-align:right;',
									    anchor:'95%'
									}
										,
									{
									    xtype:'textfield',
									    maxLength:100,
									    fieldLabel: '创建人',
									    hidden:true,
									    name: 'createUser',
									     labelStyle: 'text-align:right;',
									    anchor:'95%'
									},
			                         {
			                             xtype:'datefield',
			                             format:'Y-m-d', //日期格式化
			                             fieldLabel: '创建日期',
			                             hidden:true,
			                             editable:false,
			                             name: 'createDate',
			                             labelStyle: 'text-align:right;',
			                             anchor:'95%'
			                         }
									]
		                     },
		                     {

		                         columnWidth:.99,
		                         layout: 'form',
		                         items: [
										{
											xtype : 'textarea',
//											width : 800,
											 labelStyle: 'text-align:right;',
											fieldLabel : '增值服务需求描述',
											allowBlank : false,
											name : 'serviceDistribute',
											anchor : '95%'
										}
									]
		                     
		                     },
		                     
		                     {	columnWidth : .99,
		 						layout : 'form',
		 						items: [{
		 				            xtype: 'fieldset',
		 				            title: '增值服务渠道',
		 				            autoHeight:true,
		 				            defaultType: 'checkbox',
		 				            hideLabels: true,
		 				            layout : 'column',
		 				           anchor : '95%',
		 				            items: [
		 				                {columnWidth : .16,boxLabel: '客户经理', name: 'checkbox', inputValue: '1', checked: true},
		 				                {columnWidth : .16,boxLabel: 'CC', name: 'checkbox', inputValue: '2'},
		 				                {columnWidth : .16,boxLabel: '柜面', name: 'checkbox', inputValue: '3'},
		 				                {columnWidth : .16,boxLabel: '手机银行', name: 'checkbox', inputValue: '4'},
		 				                {columnWidth : .16,boxLabel: '短信', name: 'checkbox', inputValue: '5'},
		 				                {columnWidth : .16,boxLabel: '邮件', name: 'checkbox', inputValue: '6'},
		 				                {columnWidth : .16,boxLabel: 'ATM', name: 'checkbox', inputValue: '7'},
		 				                {columnWidth : .16,boxLabel: 'VTM', name: 'checkbox', inputValue: '8'},
		 				                {columnWidth : .16,boxLabel: '网银', name: 'checkbox', inputValue: '9'}
		 				            ]
		 				        }]
		 						
		 					}
		                     
		                     
		                ]}
		                ]}]
						});
			
			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [ listPanel ]
			});
		});