Ext.onReady(function(){
	
	var record = Ext.data.Record.create(
			  [{name: 'id', mapping: 'ID'}
		      ,{name: 'custBaseNumber', mapping: 'CUST_BASE_NUMBER'}
		      ,{name: 'custBaseName', mapping: 'CUST_BASE_NAME'}
		      ,{name: 'createName',mapping:'CREATENAME'}
		      ,{name: 'custBaseCreateDate', mapping: 'CUST_BASE_CREATE_DATE'}
		      ,{name: 'custBaseCreateName', mapping: 'CUST_BASE_CREATE_NAME'} 	
		      ,{name: 'customerBaseMemberNum', mapping: 'MEMBERSNUM'}
		      ,{name: 'custFrom', mapping: 'CUST_FROM'}
		      ,{name: 'custFromName', mapping: 'CUST_FROM_NAME'}
		      ,{name: 'custBaseDesc', mapping: 'CUST_BASE_DESC'}
		      ,{name: 'shareFlag',mapping :'SHARE_FLAG'}
		      ,{name: 'custBaseCreateOrg',mapping : 'CUST_BASE_CREATE_ORG'}
		      ,{name: 'custBaseCreateOrgName',mapping : 'CUST_BASE_CREATE_ORG_NAME'}
		      ,{name: 'mainUserName',mapping : 'MAIN_USER_NAME'}
		      ,{name: 'mainOrgName',mapping : 'MAIN_ORG_NAME'}
		      ,{name: 'recentUpdateUser',mapping : 'RECENT_UPDATE_USER'}
		      ,{name: 'recentUpdateOrg',mapping : 'RECENT_UPDATE_ORG'}
		      ,{name: 'recentUpdateDate',mapping : 'RECENT_UPDATE_DATE'}
		      ,{name: 'groupType',mapping : 'GROUP_TYPE'}
		      ,{name: 'groupMemberType',mapping : 'GROUP_MEMBER_TYPE'}
		      ,{name: 'GROUP_TYPE_ORA'}
		      ,{name: 'SHARE_FLAG_ORA'}
		      ,{name: 'CUST_FROM_ORA'}
		      ,{name: 'GROUP_MEMBER_TYPE_ORA'}
		      ]);
	
	var blocBaseInfo = new Ext.FormPanel({
		labelWidth : 120,
		height:document.body.scrollHeight-30,
		width : document.body.clientWidth-230,
		frame : true,
		split:true,
		labelAlign:'right',
		autoScroll : true,
		reader: new Ext.data.JsonReader({
            root:'json.data'
            },record),
		items : [{
				xtype:'fieldset',
	           	title: '客户群基本信息', 
	           	buttonAlign:"center" ,
                layout : 'column',
                items : [
                	{
                    columnWidth : .50,
                    layout : 'form',
                    items : [ {
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        fieldLabel : '客户群编号',
                        name : 'custBaseNumber',
                        anchor : '99%'
                    },{
						store : customerSourceTypeStore,
						xtype : 'combo', 
						resizable : true,
						fieldLabel : '客户来源',
						hiddenName : 'custFrom',
						name : 'custFrom',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						mode : 'local',
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					},{
						store : groupMemeberTypeStore,
						xtype : 'combo', 
						fieldLabel : '群成员类型',
						hiddenName : 'groupMemberType',
						name : 'groupMemberType',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						allowBlank : false,
						mode : 'local',
						readOnly:true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					},{
                        xtype : 'textfield',
                        fieldLabel : '群成员数',
                        readOnly:true,
                        disabled:true,
                        labelStyle : 'text-align:right;',
                        name : 'customerBaseMemberNum',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        fieldLabel : '创建人',
                        readOnly:true,
                        disabled:true,
                        labelStyle : 'text-align:right;',
                        name : 'createName',
                        anchor : '99%'
                    }]
                },{
                    columnWidth : .50,
                    layout : 'form',
                    items : [ {
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        fieldLabel : '客户群名称',
                        allowBlank : false,
                        name : 'custBaseName',
                        anchor : '99%'
                    },{
						store : customergroupTypeStore,
						xtype : 'combo', 
						resizable : true,
						fieldLabel : '客户群分类',
						hiddenName : 'groupType',
						name : 'groupType',
						valueField : 'key',
						allowBlank : false,
						labelStyle : 'text-align:right;',
						displayField : 'value',
						mode : 'local',
						editable :false,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					}, {
						store : shareFlagStore,
						xtype : 'combo', 
						resizable : true,
						fieldLabel : '共享范围',
						hiddenName : 'shareFlag',
						name : 'shareFlag',
						valueField : 'key',
						labelStyle : 'text-align:right;',
						displayField : 'value',
						allowBlank : false,
						mode : 'local',
						editable :false,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '99%'
					},{
                        xtype : 'textfield',
                        labelStyle : 'text-align:right;',
                        hidden:true,
                        fieldLabel : 'ID',
                        name : 'id',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        fieldLabel : '创建人',
                        hidden:true,
                        name : 'custBaseCreateName',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        fieldLabel : '创建机构',
                        hidden:true,
                        name : 'custBaseCreateOrg',
                        anchor : '99%'
                    },{
                        xtype : 'textfield',
                        readOnly:true,
                        fieldLabel : '创建机构',
                        name : 'custBaseCreateOrgName',
                        anchor : '99%'
                    },{
                        xtype : 'datefield',
                        fieldLabel : '创建时间',
                        format : 'Y-m-d',
                        readOnly:true,
                        labelStyle : 'text-align:right;',
                        name : 'custBaseCreateDate',
                        anchor : '99%'
                    }   ]
                },{
                    columnWidth : 1,
                    layout : 'form',
                    items : [ {
                        xtype : 'textarea',
                        labelStyle : 'text-align:right;',
                        fieldLabel : '客户群描述',
                        name : 'custBaseDesc',
                        anchor : '99%'
                    } ]
                } ],
            buttons:[
            {
    			text : '保存',
    			handler : function() {
    			if (!blocBaseInfo.getForm().isValid()) {
                    Ext.MessageBox.alert('提示','输入有误,请检查输入项');
                    return false;
                };
    			Ext.Ajax.request({
    				url : basepath + '/customergroupinfo.json',
    				params : {
    				operate:'add'
    				},
    				method : 'POST',
    				form : blocBaseInfo.getForm().id,
    				success : function() {
    					alert('保存成功');
    				},
    				failure : function(response) {
    					var resultArray = Ext.util.JSON.decode(response.status);
    				       if(resultArray == 403) {
    				           Ext.Msg.alert('系统提示', response.responseText);
    				  } else{
    					Ext.Msg.alert('提示', '操作失败,失败原因:' + response.responseText);
    				}}
    			});
    		}}]
            }]
	});
	blocBaseInfo.getForm().load({
	 restful:true,	
     url:basepath+'/customergroupinfo.json',
     method: 'GET',
     params:{
		'custBaseNumber':oCustInfo.groupId
	}
    });

	var viewBlocBaseInfo = new Ext.Panel({
		renderTo:'group_viewport_center',
		autoScroll:true,
		items:[blocBaseInfo]
	});
});