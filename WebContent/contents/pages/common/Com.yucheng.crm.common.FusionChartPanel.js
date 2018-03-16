Ext.ns('Com.yucheng.crm.common');
/**
 * FusionChart Panel，用户渲染fusionChart属性以及数据请求等；
 * @params: swfFile:调用的Flash文件；
 * @params：dataUrl：数据提供URL。
 */
Com.yucheng.crm.common.FusionChartPanel = Ext.extend(Ext.Panel, {
	swfFile:false,
	dataUrl:false,
	chartObject:false,
	initComponent : function(){
		Com.yucheng.crm.common.FusionChartPanel.superclass.initComponent.call(this);
	},
	onRender : function(ct, position){
		Com.yucheng.crm.common.FusionChartPanel.superclass.onRender.call(this, ct, position);
		if(typeof FusionCharts =="undefined"){
			this.html = "库文件错误，未引用FusionChart组件";
			return;
		}
		if(!this.swfFile ){
			this.html = '代码错误，无SWF文件设置';
			return;
		}
		if(!this.dataUrl){
			this.html = '代码错误，无DATAurl设置';
			return;
		}
		this.chartObject = new FusionCharts(this.swfFile,Ext.id(), "100%", "100%", "0", "0");
		this.chartObject.render(this.body.id);
		this.chartObject.setJSONUrl(this.dataUrl);
	}
});