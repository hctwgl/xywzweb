Ext.onReady(function(){

	
	var leftTreeForShow = new Ext.tree.TreePanel({//左边的树
		title:'投资理财箱',
		width:200,
		autoScroll:true,
		root: new Ext.tree.AsyncTreeNode({//树的定义
			id:'root',
			expanded:true,
			text:'投资理财箱',
			autoScroll:true,
			children:[
				{
					text:'整存零取计数器',
					leaf:true,//标记 是叶子
					listeners:{
					click:function()
						{
							jumpToCon('Lingcunzhengqu.jsp');
						}
								
					}
				},
				{
					text:'债券到期收益率计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							jumpToCon('zhaijiandaoqushouyilu.jsp');
						}
				}
				},
				{
					text:'债券认购收益率计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('zhaijianrengoushouyilu.jsp');
						}
					}
				},
				{
					text:'债券买卖比较器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('zhaijianmaimaibijiaoqu.jsp');
						}
					}
				},
				{
					text:'开基赎回金额计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('kaijishuhuijijin.jsp');
						}
					}
				},
				{
					text:'开放式基金申购计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('kaifangshijijinshengou.jsp');
						}
					}
				},
				{
					text:'封基投资损益计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('fengzhitouzhishunyi.jsp');
						}
					}
				},
				{
					text:'股票交易手续费计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('gupiaojiaoyishoushufei.jsp');
						}
					}
				},
				{
					text:'贷款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('daikuan.jsp');
						}
					}
				},
				{
					text:'公积金贷款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('gongjijindaikuan.jsp');
						}
					}
				},
				{
					text:'商贷和公积金贷款比较器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('shangdaihegongjijindaikuanbijiaoqi.jsp');
						}
					}
				},
				{
					text:'提前还款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('tiqianhuankuan.jsp');
						}
					}
				},
				{
					text:'购房与租房净资产比较器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('goufangyufangzhijinzhichan.jsp');
						}
					}
				},
				{
					text:'利率变动后还款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('lilubiandonghouhuankuan.jsp');
						}
					}
				},
				{
					text:'等比累进还款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('dengbileijihuankuan.jsp');
						}
					}
				},
				{
					text:'等额累进还款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('dengerleijinhuankuan.jsp');
						}
					}
				},
				{
					text:'存款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('cunkuanjisuanqi.jsp');
						}
					}
				},
				{
					text:'外币兑换计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('waibituohuanjisuanqi.jsp');
						}
					}
				},
				{
					text:'最佳存款组合计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('zuijiacunkuanzhuhe.jsp');
						}
					}
				},
				{
					text:'通知存款计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('tongzhichunkuan.jsp');
						}
					}
				},
				{
					text:'定活两便计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('dinghuoliangbian.jsp');
						}
					}
				},
				{
					text:'存本取息计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('cunbenquxi.jsp');
						}
					}
				},
				{
					text:'活期储蓄计算器',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('huoqishuxu.jsp');
						}
					}
				},
				{
					text:'部分提支与全额提支比较',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('bufengtiquyuquanertiqu.jsp');
						}
					}
				},
				{
					text:'人民币存款利率表',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('renmingbicunkuan.jsp');
						}
					}
				},
				{
					text:'外币存款利率表',
					leaf:true,//标记 是叶子
					listeners:{
						click:function()
						{
							
							jumpToCon('waibichunkuanlilubiao.jsp');
						}
					}
				}
			]
		 
		}),
		region:'west',
//		collapsible:true,
//		loader:new Ext.tree.TreeLoader(),
		split:true
	});
	
	var conPanel = new Ext.Panel({
        collapsible:true,
//        renderTo: 'pan',
        width:'100%',
        html:'<iframe id="conFrame"  height="100%" frameborder="no" width="100%" src="" scrolling="auto"> </iframe>'
    });

	var view = new Ext.Viewport({//页面展示
		layout:'border',
		items:[
			leftTreeForShow,
			{
					region:'center',
					layout:'fit',
					items:[conPanel]				
			}
		
		]

	});	

});