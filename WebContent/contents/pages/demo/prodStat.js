Ext.onReady(function() {
	var h= document.body.clientHeight;
	var qForm = new Ext.form.FormPanel({
		labelWidth : 90, // 标签宽度
		frame : true, //是否渲染表单面板背景色
		labelAlign : 'middle', // 标签对齐方式
		buttonAlign : 'center',
		height : 120,
		items : [{
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .25,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
											fieldLabel : '机构号',
											name : 'e1',
											xtype : 'textfield', // 设置为数字输入框类型
											labelStyle: 'text-align:right;',
											anchor : '80%'
										}]
							}, {
								columnWidth : .25,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									xtype:'datefield',
											fieldLabel : '统计日期', // 标签
											id : 'e4',
											name : 'e4', // name:后台根据此name属性取值
											allowBlank : true, // 是否允许为空
											labelStyle: 'text-align:right;',
											//maxLength : 6, // 可输入的最大文本长度,不区分中英文字符
											anchor : '80%' // 宽度百分比
										}]
							}, {
								columnWidth : .25,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									fieldLabel : '客户名称',
									name : 'e1',
									xtype : 'textfield', // 设置为数字输入框类型
									labelStyle: 'text-align:right;',
									anchor : '80%'
								}]
							}, {
								columnWidth : .25,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									fieldLabel : '产品类型',
									name : 'e1',
									xtype : 'textfield', // 设置为数字输入框类型
									labelStyle: 'text-align:right;',
									anchor : '80%'
								}]
							}]
				}],
		buttons : [{
					text : '查询'
					/*handler : function() {
						queryBalanceInfo(qForm.getForm());
					}*/
				}, {
					text : '重置'
					/*handler : function() {
						qForm.getForm().reset();
					}*/
				}]
	});
	 /*******************************************************************/
	var fields = [],
	    columns = [],
	    data = [];
	
	    
	    
	      fields =
	      [
	          {name:'a1'},
	{name:'a2'},
	{name:'a3'},
	{name:'a4'},
	{name:'a5'},
	{name:'a6'},
	{name:'a7'},
	{name:'a8'},
	{name:'a9'},
	{name:'a10'},
	{name:'a11'},
	{name:'a12'},
	{name:'a13'},
	{name:'a14'},
	{name:'a15'},
	{name:'a16'},
	{name:'a17'}
	      ];
	      
	      columns =
	      [
{dataIndex:'a1',header:'序号',sortable:true},
{dataIndex:'a2',header:'机构号',sortable:true},
{dataIndex:'a3',header:'统计日期',sortable:true},
{dataIndex:'a4',header:'机构名称',sortable:true},
{dataIndex:'a5',header:'客户名称',sortable:true},
{dataIndex:'a6',header:'组织机构代码',sortable:true},
{dataIndex:'a7',header:'产品1级分类',sortable:true},
{dataIndex:'a8',header:'产品2级分类',sortable:true},
{dataIndex:'a9',header:'产品3级分类',sortable:true},
{dataIndex:'a10',header:'产品4级分类',sortable:true},
{dataIndex:'a11',header:'产品名称',sortable:true},
{dataIndex:'a12',header:'产品编号',sortable:true},
{dataIndex:'a13',header:'时点余额',sortable:true},
{dataIndex:'a14',header:'日均余额',sortable:true},
{dataIndex:'a15',header:'销售金额',sortable:true},
{dataIndex:'a16',header:'利息收入',sortable:true},
{dataIndex:'a17',header:'非息收入',sortable:true}
	      ];
	      data = [
	              [1,'101','2012-06-28','某某银行1','XXXX',30,20,40,30,35,30,40,33,24,37,12,534,30,20,40,30],
[2,'102','2012-06-28','某某银行2','XXXX',60,40,80,60,34,65,12,3,55,37,12,534,60,40,80,60],
[3,'103','2012-06-28','某某银行3','XXXX',90,60,60,45,23,55,56,54,12,37,12,534,90,60,60,45],
[4,'104','2012-06-28','某某银行4','XXXX',15,10,20,15,75,23,23,12,73,37,12,534,15,10,20,15],
[5,'105','2012-06-28','某某银行5','XXXX',30,20,400,300,66,43,53,35,35,37,12,534,30,20,400,300],
[6,'106','2012-06-28','某某银行6','XXXX',30,20,200,150,87,23,12,8,23,37,12,534,30,20,200,150]
	              ];
	     
	    var grid = new Ext.grid.GridPanel({
	        height: h,
	        width:1800,
	        store: new Ext.data.ArrayStore({
	            fields: fields,
	            data: data
	        }),
	        stripeRows:true,
	        columns: columns,
	        viewConfig: {
	            forceFit: true
	        }
	    });
	 /*******************************************************************/
	// 布局模型
	var viewport = new Ext.Viewport({
				layout : 'border',
				items: [{   
					region: 'north',
				    id: 'north-panel',
				    title: "报表管理->对公报表->客户产品统计报表", 
				    height: 148,
				    hidden:false,
				    margins: '0 0 0 0',
				    //layout: 'fit',
					items:[qForm]
			     },{   
			    	region:'center',
			    	autoScroll:true,
				    id: 'center-panel',
				    margins: '0 0 0 0',
				    items : [grid]
			    }] 

			});
}); 