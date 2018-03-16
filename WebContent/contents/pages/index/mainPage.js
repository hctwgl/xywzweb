Ext.onReady(function(){
    
	/**************************日程安排数据源**************************/
    var scheduleStore = new Ext.data.Store({
        id: 'schedule',
        restful : true,     
        proxy : new Ext.data.HttpProxy({
            url : basepath+'/scheduleforcal.json'
        }),
        reader : new Ext.data.JsonReader({
            successProperty: 'success',
            idProperty: 'SCHEDULE_ID',
            messageProperty: 'message',
            totalProperty: 'json.count',
            root : 'json.data'
        },Ext.data.Record.create([
            {name:'scheduleId', mapping:'SCHEDULE_ID'},
            {name:'scheduleTitle',mapping:'SCHEDULE_TITLE'},
            {name:'startDt',mapping:'START_DATE'} 
        ]))
    });
    
	 var crmPoStore = new Ext.data.ArrayStore({
	        fields:['myId','displayText'],
	        data:[['1','客户简称'],['2','客户号']]
	    });
	 
	 
//    scheduleStore.load({
//        params : {
//            start : 0,
//            limit : 5
//        }
//    });
    /***********************信息提醒数据源************************/
    
    var remindArray ;
    
    Ext.Ajax.request({
        url : basepath+'/queryremindinfoind.json',
        method : 'GET',
        success : function(response){
            var returns = Ext.util.JSON.decode(response.responseText);
            remindArray = returns.json.data;
            for(var i=0;i<remindArray.length;i++){

                switch(remindArray[i].REM_NAME){
                case '101' : 
                    document.getElementById('xinxitixing1').innerHTML = "<a href='"+basepath+"/contents/pages/xywz/sysm/xywzSysmMsgRmnd.jsp?msgTyp=101'>外贸单据处理提醒（"+remindArray[i].COUNT+"）</a>";
                    break;                        
                case '102' : 
                    document.getElementById('xinxitixing2').innerHTML = "<a href='"+basepath+"/contents/pages/xywz/sysm/xywzSysmMsgRmnd.jsp?msgTyp=102'>外贸单据下达提醒（"+remindArray[i].COUNT+"）</a>";
                    break;  
                case '103' : 
                    document.getElementById('xinxitixing3').innerHTML = "<a href='"+basepath+"/contents/pages/xywz/sysm/xywzSysmMsgRmnd.jsp?msgTyp=103'>生产排产提醒（"+remindArray[i].COUNT+"）</a>";
                    break;   
                case '104' : 
                    document.getElementById('xinxitixing4').innerHTML = "<a href='"+basepath+"/contents/pages/xywz/sysm/xywzSysmMsgRmnd.jsp?msgTyp=104'>发运通知提醒（"+remindArray[i].COUNT+"）</a>";
                    break;  
                case '105' : 
                    document.getElementById('xinxitixing5').innerHTML = "<a href='"+basepath+"/contents/pages/xywz/sysm/xywzSysmMsgRmnd.jsp?msgTyp=105'>外采合同处理提醒（"+remindArray[i].COUNT+"）</a>";
                    break;  
//                case '106' : 
//                    document.getElementById('xinxitixing6').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=106',"+remindArray[i].COUNT+");\">客户服务提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
//                case '107' : 
//                    document.getElementById('xinxitixing7').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=107',"+remindArray[i].COUNT+");\">贷款欠息提醒（"+remindArray[i].COUNT+"）</a>";
//                    break;                        
//                case '108' : 
//                    document.getElementById('xinxitixing8').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=108',"+remindArray[i].COUNT+");\">日常工作任务提醒（"+remindArray[i].COUNT+"）</a>";
//                    break;  
//                case '109' : 
//                    document.getElementById('xinxitixing9').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=109',"+remindArray[i].COUNT+");\">>商机提醒（"+remindArray[i].COUNT+"）</a>";
//                    break;   
//                case '110' : 
//                    document.getElementById('xinxitixing10').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=110',"+remindArray[i].COUNT+");\">>预约提醒（"+remindArray[i].COUNT+"）</a>";
//                    break;  
//                case '301' : 
//                    document.getElementById('xinxitixing11').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=301',"+remindArray[i].COUNT+");\">>理财产品到期提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
//                case '302' : 
//                    document.getElementById('xinxitixing12').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=302',"+remindArray[i].COUNT+");\">>定期存款到期提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
//                case '303' : 
//                    document.getElementById('xinxitixing13').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=303',"+remindArray[i].COUNT+");\">>贷款产品到期提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
//                case '304' : 
//                    document.getElementById('xinxitixing14').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=304',"+remindArray[i].COUNT+");\">>客户账户大额变动提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
//                case '305' : 
//                    document.getElementById('xinxitixing15').innerHTML = "<a href=\"javascript:;\" onclick=\"text('"+ basepath+"/contents/pages/workSpace/remindManage/remindListNew.jsp?msgTyp=305',"+remindArray[i].COUNT+");\">>贷款逾期提醒（"+remindArray[i].COUNT+"）</a>";
//                    break; 
                default :
                    break;                        
                }
            }
        },
        failure:function(){
            Ext.Msg.alert('提示','信息提醒数据查询失败');
        }
    });
    /**************************公告数据源*****************************/
    var noticeStore = new Ext.data.Store({
        id: 'notice',
        restful : true,     
        proxy : new Ext.data.HttpProxy({
            url : basepath+'/noticequery.json'
        }),
        reader : new Ext.data.JsonReader({
            successProperty: 'success',
            idProperty: 'NOTICE_ID',
            messageProperty: 'message',
            totalProperty: 'json.count',
            root : 'json.data'
        },Ext.data.Record.create([
            {name: 'noticeId', mapping: 'NOTICE_ID'},
            {name: 'noticeTitle', mapping: 'NOTICE_TITLE'},
            {name: 'noticeLevel', mapping: 'NOTICE_LEVEL'}
        ]))
    });
    var indexNotice = {isRead:'red002'};
    noticeStore.on('beforeload', function() {
        this.baseParams = {
                "condition":Ext.encode(indexNotice)
        };
    });  
//    noticeStore.load({
//        params : {
//            start : 0,
//            limit : 5  
//        }
//    });
    /************快捷功能区关闭工具***********************/
    var tools = [{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];
   /*************左边快捷功能区面板************************/
    var westpanel=new Ext.Panel({
        bodyStyle:'background-color:#fff',	
        items:[{
            title:'客户快速查询',
            tools:tools,
            frame:true,
            collapsible: true,
            items:[
                new Ext.FormPanel({
//                    defaultType: 'textfield',
//                    labelStyle : {
//						width : '10px'
//					},
                	columnWidth : .99,
					layout : 'form',
					labelWidth : 60, // 标签宽度
					defaultType : 'textfield',
					border : false,
                    items:[
   						{	
   	                        fieldLabel: '查询方式',
   	                        name: 'qStyle',
   	                        id:'qStyle',
   	                        forceSelection : true,
   							resizable:true,
   	                        xtype:'combo',
   	                        editable:false,
   	                        triggerAction:'all',
   	                        mode:'local',
   	                        value:1,
   	                        store:crmPoStore,
   	                        valueField:'myId',
   	                        displayField:'displayText',
   	                        emptyText:'请选择',
   	                        anchor : '90%',
   	                        labelStyle: 'text-align:right;'
   	                    },{
   	                        fieldLabel:"查询条件",
   	                        name:"name",
   	                        anchor:'90%',
   	                        labelStyle: 'text-align:right;'
   	                    }],
                    buttons:[
                        {
                            text : '快速查询',
                            handler: function(){
                                var condis = this.ownerCt.ownerCt.getForm().getValues(false);
                                if(!condis.name){
                                    Ext.Msg.alert('提示','请输入查询条件!'); 
                                    return false;
                                }
                                condis.mod = "quick";
                                var tempSign = Ext.getCmp('qStyle').getValue();    
                                if(tempSign =="1"){
                                	var url = basepath + "/contents/pages/xywz/cust/xywzCustCustInfo.jsp?condis="+condis.name;
                                	parent.booter.indexLocate(124925,url);
                                }
                                if(tempSign == "2"){
                                	 var url=basepath + "/contents/pages/xywz/cust/xywzCustCustInfo.jsp?qStyle="+condis.name;
                                	 parent.booter.indexLocate(124925,url);
                                }
                                	var conditionStr = Ext.encode(condis);
                            }
                        }
                    ]
                })
            ]
    	},
//    	{
//    	    title:'最新公告',
//    	    style:{marginTop:'0px'},
//    	    bodyStyle:'background-color:#fff',	
//    	    tools:tools,
//    	    frame:true,
//    	    collapsible: true,
//    	    items: [
//    	        new Ext.grid.GridPanel({
//    	            store : noticeStore,
//    	            height:100,
//    	            hideHeaders :true,
//    	            cm : new Ext.grid.ColumnModel([
//    	                {
//    	                    header : '公告ID', 
//    	                    dataIndex : 'noticeId', 
//    	                    sortable : true,
//    	                    width : 150,
//    	                    hidden:true
//    	                },{
//    	                    dataIndex : 'noticeTitle', 
//    	                    width : 170,
//    	                    renderer: function(v,p,record){
//    	                        var nl = record.data.noticeLevel;
//    	                        if(nl == 'lev001'){
//    	                            return '<font color="red"><b>'+v+'</b></font>';
//    	                        }else return v;
//    	                    }
//    	                }
//    	                ]),
//    	                stripeRows : true, 
//    	                loadMask : {
//    	                    msg : '正在加载表格数据,请稍等...'
//    	                },
//    	                listeners :{
//    	                    'rowdblclick' : function(){
//    	                        //window.location.href= basepath+'/contents/pages/workSpace/afficheManage/affiche.jsp';
//    	                		parent.booter.indexLocate(238);
//    	                	}
//    	                }
//    		    })
//    		 ]
//    	},
    	{
    	    title:'信息提醒',
    	    style:{
    	        margin:'0px 0 0px 0'
    	    },
    	    bodyStyle:'background-color:#fff',    		
    	    tools:tools,
    	    frame:true,
    	    collapsible:true,
    	    html:"<div class='info_box' style='height:250px'>"+
    	         "<ul>" +
    	         "<marquee onmouseover=stop(); onmouseout=start(); direction='up' align='top' style='height:250;' scrollamount=2>"+
    	         "<li id='xinxitixing1' >外贸单据处理提醒（0）</li>" +
    	         "<li id='xinxitixing2' >外贸单据下达提醒（0）</li>" +
    	         "<li id='xinxitixing3' >生产排产提醒（0）</li>" +
    	         "<li id='xinxitixing4' >发运通知提醒（0）</li>" +
    	         "<li id='xinxitixing5' >外采合同处理提醒（0）</li>" +
//    	         "<li id='xinxitixing6' >客户服务提醒（0）</li>" +
//    	         "<li id='xinxitixing7' >贷款欠息提醒（0）</li>" +
//    	         "<li id='xinxitixing8' >日常工作任务提醒（0）</li>" +
//    	         "<li id='xinxitixing9' >商机提醒（0）</li>" +
//    	        "<li id='xinxitixing10' >预约提醒（0）</li>" +
//    	        "<li id='xinxitixing11' >理财产品到期提醒（0）</li>" +
//    	         "<li id='xinxitixing12' >定期存款到期提醒（0）</li>" +
//    	         "<li id='xinxitixing13' >贷款产品到期提醒（0）</li>" +
//    	         "<li id='xinxitixing14' >客户账户大额变动提醒（0）</li>" +
//    	        "<li id='xinxitixing15' >贷款逾期提醒（0）</li>" +
    	         "</marquee>"+
    	         "</ul>" +
    	         "</div>"
    	}
//    	,{
//    	    title:'日程安排',
//    	    style:{marginTop:'0px'},
//    	    bodyStyle:'background-color:#fff',
//    	    frame:true,
//    	    tools:tools,
//    	    layout:'fit',
//    	    height:140,
//    	    collapsible: true,
//    	    items:[
//    	        new Ext.grid.GridPanel({
//    	            store : scheduleStore,
//    	            hideHeaders :true,
//    	            cm : new Ext.grid.ColumnModel([
//    	                {
//    	                    dataIndex : 'scheduleId',
//    	                    hidden:true
//    	                },{
//    	                    dataIndex : 'startDt',
//    	                    width : 70,
//    	                    renderer: function(v){
//	                        return v.substring(0,10);
//	                        
//	                    }
//    	                },{
//    	                    dataIndex : 'scheduleTitle',
//    	                    width : 120
//    	                }]),
//    	            stripeRows : true,
//    	            loadMask : {
//    	                msg : '正在加载表格数据,请稍等...'
//    	            },
//    	            listeners :{
//    	                'rowdblclick' : function(){
//    	                    //window.location.href= basepath+'/contents/pages/workSpace/calendarManager/schedulePlanIndex.jsp';
//    	                    parent.booter.indexLocate(13102);
//    	                }
//    	            }
//    	        })
//    	     ]
//    	}
    	]
    });
    
    
    /******************************首页整体布局*******************************/
    var viewport = new Ext.Viewport({
        layout:'border',
        autoScroll:true,
        items:[{
            xtype:'portal',
            region:'west',
            id:'west-panel',
            layout:'fit',
            title:'快捷功能',
            collapseMode: 'mini',
            frame:true,
            split:true,
            style:'background-color:#000;',
            width: 200,
            minSize: 175,
            maxSize: 200,
            collapsible: true,
            margins:'5 0 5 5 ',
            cmargins:'5 5 5 5',
            items:[westpanel]
        },
        new Com.yucheng.crm.index.MainViewPanel({
            id:'mainViewPanel',
            region:'center',
            width: document.body.clientWidth - 210,
            autoScroll:true
        })
        ]
    });
    /*****************功能概览区数据源*********************/
//    Ext.Ajax.request({
//        url : basepath+'/indexset.json',
//        method : "GET",
//        success : function(response){
//            userSetting = Ext.util.JSON.decode(response.responseText);
//            if(!userSetting.returns.layoutId){
//                /**
//                 * TODO default Layout.
//                 */
//                var _resultP = Ext.getCmp('mainViewPanel');
//                _resultP.doUserLayout();
//                return;
//            }else{
//                /**
//                 * TODO the UserSetted Layout.
//                 */
//                var userLayout = userSetting.returns.layoutId;
//                var userModule = userSetting.returns.data;
//                var _resultP = Ext.getCmp('mainViewPanel');
//                _resultP.userLayout = userLayout;
//                _resultP.userModule = userModule;                 
//                _resultP.doUserLayout();
//                return;
//            }
//        },
//        failure : function(action,form){
//            Ext.Msg.alert('提示','你的首页设置信息查询失败，将为您初始化默认配置'); 
//            /**
//             * TODO default layout.
//             */
//            var _resultP = Ext.getCmp('mainViewPanel');
//            _resultP.doUserLayout();
//        }
//    });
});