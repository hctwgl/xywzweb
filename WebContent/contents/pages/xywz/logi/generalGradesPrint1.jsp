<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>
<html>
<head>
<style media="print">
<!--
.Noprint{display:none;}
.PageNext{page-break-after:always;}
-->
</style>
<style type="text/css">
<!--
.STYLE1 {font-size: 12px}
--> 
</style>

<style type="text/css">
.Noprint{
    color: #0D4770;
    background-image:url(images/button_bg2.gif);
	border:1px solid #86B2D1;
    height: 21px;
	line-height:18px;
    font-size:12px;
	padding:0px 6px 0px 6px;
	*padding:0px 6px 0px 6px;
	_padding:0px;
    text-align:center;
	margin:10px 0px 0px 0px;
	cursor:hand;
}

.contentTableTd{
	border:1px solid #bbbbbb;
}
#cardInfo>TD{
	border:1px solid #bbbbbb;
}
table { 
 	border-collapse: separate;
	empty-cells: show; 
} 

</style>

<script type="text/javascript" >
var hkey_root,hkey_path,hkey_key;
hkey_root="HKEY_CURRENT_USER";
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup";
//设置网页打印的页眉页脚为空
function pagesetup_null()
{
	try
	{
		var RegWsh = new ActiveXObject("WScript.Shell");
		hkey_key="\\header";
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
		hkey_key="\\footer";
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
	}catch(e)
	{
		
	}
}
//设置网页打印的页眉页脚为默认值
function pagesetup_default()
{
	try
	{
		var RegWsh = new ActiveXObject("WScript.Shell");
		hkey_key="\\header" ;
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&w&b页码,&p/&P");
		hkey_key="\\footer";
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&u&b&d");
	}catch(e)
	{}
}
function printsetup()
{  
	wb.execwb(8,1); // 打印页面设置
} 
function printpreview()
{ 
	wb.execwb(7,1);// 打印页面预览
}
function printit()
{ 
 if (confirm('确定打印吗？'))
 { 
	pagesetup_null();
	wb.execwb(6,1);
 } 
}
function closeWindows(){
	if(confirm('确定关闭吗?')){
		this.window.close();
		self.close();
	}
}

function AllAreaExcel(tableName){
	if(tableName==null||tableName==""||tableName=="undefined"){
		alert("执行异常请刷新页面，再试一次！");
		return false;
	}
	
	var submittable;
	var tablelist = document.getElementsByTagName("table");
	for(var i=0;i<tablelist.length;i++){
		if(tablelist[i].name == tableName){
			submittable = tablelist[i];
			break;
		}
	}
	
//	var submittable =document.getElementById("table");
	
	if(submittable==null||submittable=="undefined"){
		alert("执行异常请刷新页面，再试一次！2");
		return false;
	}
	try{
	    var oXL = new ActiveXObject("Excel.Application"); 
	    var oWB = oXL.Workbooks.Add(); 
	    var oSheet = oWB.ActiveSheet;  
	    var sel=document.body.createTextRange();
	    sel.moveToElementText(submittable);
	    sel.select();
	    sel.execCommand("Copy");
	    oSheet.Paste();
	    oXL.Visible = true;
	}catch(err){
		alert("不能导出到Excel：解决方法如下：1.如果你没有安装Excel请安装!2.将浏览器安全设置的-安全模式设置成\"中\"，还应将IE的安全设置\"不允许运行未标记为安全的activeX控件\"启用即可。");
	}    
}
<%--
	String groupNo = request.getParameter("groupNo")+"";;
	String batchNo = request.getParameter("batchNo")+"";
	
	out.println(" var groupNo = \""+groupNo+"\""	);
	out.println(" var batchNo = \""+batchNo+"\""	);
--%>
</script>
</head>
<body >

<div width="1024px">
<OBJECT id=wb height=0 width=0 classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 name=wb></OBJECT>
<DIV align=left>
<!--希望打印时不显示的内容设置class="Noprint"样式-->


<INPUT onclick=javascript:printsetup(); type=button value=打印页面设置 name=button_setup class="Noprint" /> 
<INPUT onclick=javascript:printpreview(); type=button value=打印预览 name=button_show class="Noprint" /> 
<!-- 
<input type="button" value="清空页码" onclick=javascript:pagesetup_null() class="Noprint">
<input type="button" value="恢复页码" onclick=javascript:pagesetup_default() class="Noprint">
<input type="button" width=150 value="  关 闭   " onclick=javascript:closeWindows() class="Noprint">
 -->
<INPUT onclick=javascript:printit() type=button  width=150 value="   打  印   " name=button_print class="Noprint"/>  
<input type="button" value="导出到Excel"  onClick="AllAreaExcel('cardInfo')" class="Noprint">


</DIV>
<div id="grades" width="100%" text-align="center">

</div>
<script type="text/javascript" >

function moneyFourDigit(moneyValue){
	 return Ext.util.Format.number(moneyValue, "0,000.00");
}
function moneyFourDigit1(moneyValue){
	 return Ext.util.Format.number(moneyValue, "0.00");
}
function moneyFourDigit2(moneyValue){
	 return Ext.util.Format.number(moneyValue, "0.0000");
}
<%
String cardNo = request.getParameter("cardNo")+"";

out.println(" var cardNo = \""+cardNo+"\""	);
%>	
	Ext.Ajax.request({
		params:{
			'condition':'{"cardNo":"'+cardNo+'"}'
		},		
		url:basepath+"/cardGradesPrint.json",
		method:'GET',
		success:checkResult,
		failure:checkResult
		
	});

	function checkResult(response){
		
		var jsonData = Ext.decode(response.responseText);
		var jsonMap = jsonData.cardMap;
		var jsonLength = jsonData.json.data.length;
		var system_ftp_h = jsonData.json.data[0].SYSTEM_FTP_RMBPRICE;
		var system_ftp_no_h = jsonData.json.data[0].SYSTEM_FTP_NO;
		var system_ftp_d = jsonData.json.data[1].SYSTEM_FTP_RMBPRICE;
		var system_ftp_no_d = jsonData.json.data[1].SYSTEM_FTP_NO;
		var system_ftp_q = jsonData.json.data[2].SYSTEM_FTP_RMBPRICE;
		var system_ftp_no_q = jsonData.json.data[2].SYSTEM_FTP_NO;
		var jsonData = jsonData.json.data[0];
		var hvalueArray = jsonData.USPRD.split(';');
		var payc = jsonMap.pay;
		var rvcc = jsonMap.rvc;
		var ysxinc = jsonMap.ysx;
		//贷款定价器申请日期
		var today =  jsonData.CREATE_DT;
		var crm_dt_y;//已实现
		var crm_dt_w;//未来预期
		var qn_sy_ts;//全年剩余天数
		var months = today.split("-")[1];
    	if(months-1>=3&&months-1<6){
    		crm_dt_y = today.split("-")[0]+"年1-3月";
    		crm_dt_w = today.split("-")[0]+"年4-12月";
    		qn_sy_ts = 270;
		}
		if(months-1>=6&&months-1<9){
			crm_dt_y = today.split("-")[0]+"年1-6月";
			crm_dt_w = today.split("-")[0]+"年7-12月";
			qn_sy_ts = 180;
		}
		if(months-1>=9&&months-1<12){
			crm_dt_y = today.split("-")[0]+"年1-9月";
			crm_dt_w = today.split("-")[0]+"年10-12月";
			qn_sy_ts = 90;
		}
		if(months-1==12){
			crm_dt_y = today.split("-")[0]+"年1-12月";
			crm_dt_w = (parseInt(today.split("-")[0])+1)+"年1-12月";
			qn_sy_ts = 360;
		}
		if(months-1<3){
			crm_dt_y = (parseInt(today.split("-")[0])-1)+"年1-12月";
			crm_dt_w = today.split("-")[0]+"年1-12月";
			qn_sy_ts = 360;
		}

		//产品个数
		var proCount=0;
		//产品系数
		var proFactor =0;
    	var array = new Array();
    	for(var i=0;i<hvalueArray.length;i++){
    		if("无"!=hvalueArray[i]){
    			array.push(hvalueArray[i]);
    		}
    	}		
		if(array.length!='0'){
			
			proCount = array.length;
      		if(array.length>=5){
      			proFactor='1.05';
      		}else{
      			proFactor='1.0'+array.length;
      		}
      	}

		var QYGM;
		if(jsonData.FLG=='CRM_QYGM_001'){
			QYGM = '大型';
		}else if(jsonData.FLG=='CRM_QYGM_002'){
			QYGM = '中型';
		}else if(jsonData.FLG=='CRM_QYGM_003'){
			QYGM = '小型';
		}else if(jsonData.FLG=='CRM_QYGM_004'){
			QYGM = '微型';
		}else{
			QYGM = '';	
		}

		var JJZBZYID;//经济资本占用
		var JJZBCBID;//经济资本成本
		var YKPHDRATEID;//盈亏平衡点利率
		var RATEFDBLID;//利率浮动比率
		var APPLYAMTID = jsonData.APPLY_AMT;//贷款金额
		var provisionRate = jsonData.IMPAIRMENT_PROVISION_RATE;//减值准备计提比率
		var baseRateValue = jsonData.BASERATEVALUE;//基础比率
		var mbsylValue = jsonData.MBSYLVALUE;//目标收益率
		var jjzbcblValue = jsonData.COE_VALUE;//经济资本成本率
		
		if(jsonData.HYTP=='房地产业'){//所属行业 = 房地产，公式为：经济资本占用 = 基础比率×贷款金额×(1-减值准备计提比率)×行业系数；
			var HYTPVALUEID = jsonData.HYTPVALUE;//行业系数
			JJZBZYID = (baseRateValue/100) * APPLYAMTID * (1-provisionRate/100) * (HYTPVALUEID/100);
		}else{
			var VOUCHTYPEVALUEID = jsonData.VOUCHTYPEVALUE;//担保方式系数
			if(VOUCHTYPEVALUEID!=""&&VOUCHTYPEVALUEID!=null){
				//if(jsonData.VOUCHTYPE=='信用'){//担保方式 = 信用，公式为：经济资本占用 = 基础比率×贷款金额×(1-减值准备计提比率)×客户评级系数；
				//	var noReLoanCustLvView = jsonData.IMPAIRMENT_PROVISION_RATE_VIEW;//客户评级系数
				//	JJZBZYID = (baseRateValue/100) * APPLYAMTID * (1-provisionRate/100) * noReLoanCustLvView;
				//}else{
					//公式为：经济资本占用 = 基础比率×贷款金额×(1-减值准备计提比率)×担保系数；
					JJZBZYID = (baseRateValue/100) * APPLYAMTID * (1-provisionRate/100) * (VOUCHTYPEVALUEID/100);
				//}
			}else{
				var noReLoanCustLvView = jsonData.IMPAIRMENT_PROVISION_RATE_VIEW;//客户评级系数
				JJZBZYID = (baseRateValue/100) * APPLYAMTID * (1-provisionRate/100) * (noReLoanCustLvView/100);
			}
		}

		JJZBCBID = JJZBZYID * (jjzbcblValue/100);//经济资本成本 = 经济资本占用×经济资本成本率
		var ftpvalue = jsonData.FTP_VALUE;//FTP价格
		YKPHDRATEID = (JJZBCBID/APPLYAMTID + ftpvalue/100)/0.945*100;//盈亏平衡点利率 = (经济资本占用成本÷贷款金额+ FTP价格)÷94.5%
	
		var referenceRate = jsonData.DT_RATE;//基准利率
		RATEFDBLID = (YKPHDRATEID/referenceRate - 1)*100;//利率浮动比率 = 盈亏平衡点利率÷基准利率-1

		
		//调整后模拟利润贡献值(新产品系数调整后)=模拟利润贡献值×新产品系数
		var adjustMCON = jsonData.MCON * proFactor;
		//计算公式：调整后模拟利润贡献值(年化后)=调整后模拟利润贡献值(新产品系数调整后)	× 年化系数
		var adjustMCONNHH = adjustMCON;//年化系数怎么取值待定
		//计算公式：目标收益 = 贷款金额×目标收益率（扣除经济资本成本）
		var mbsyValue = APPLYAMTID * (mbsylValue/100);

		var wlyqcksyHj = parseFloat(jsonData.DEP_AVG_BAL_H_ED)+parseFloat(jsonData.DEP_AVG_BAL_D_ED)+parseFloat(jsonData.DEP_AVG_BAL_O_ED);//未来预期存款收益合计
		var ysxcksyHj = parseFloat(jsonData.DEP_AVG_BAL_H_YJ)+parseFloat(jsonData.DEP_AVG_BAL_D_YJ)+parseFloat(jsonData.DEP_AVG_BAL_O_YJ);
		var wlyqckLr = (parseFloat(jsonData.DEP_AVG_BAL_H_ED * (system_ftp_h/100-jsonData.DEP_RATE_H_ED/100))
				       +parseFloat(jsonData.DEP_AVG_BAL_D_ED * (system_ftp_d/100-jsonData.DEP_RATE_D_ED/100))
				       +parseFloat(jsonData.DEP_AVG_BAL_O_ED * (system_ftp_q/100-jsonData.DEP_RATE_O_ED/100)))/360*qn_sy_ts;
		var nullString = '	<TD height="20" align="center">——</TD>'+'	<TD height="20" align="center">——</TD>';
		var htmlString= '<TABLE width="100%" align=center valign="top" class="" id="PrintA" border=0  cellpadding="0" cellspacing="0">'
	+'<TR>'
	+'	<TD height="40" align="center" style="font-size:24px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">公司贷款综合收益定价器</TD>'
	+'</TR>'
	/**
	+'<TR>'
	+'<TD height="20" align="right" style="font-size:14px;" >填报日期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年 &nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</TD>'
	+'</TR>	'
	**/
	+'<TR>'
	+'<TD height="20" align="right" style="font-size:14px;" >单位：万元</TD>'
	+'</TR>	'
	+'</TABLE> '
	+'<table  border=0  width="100%" cellpadding="0" cellspacing="0">'
	/**
	+'<TR>'
	+'	<TD  height="20" style="FONT-FAMILY:\'黑体\';">管理部/分行名称：</TD>'
	+'  <TD  height="20" style="FONT-FAMILY:\'黑体\';">支行名称：</TD>'
	+'</TR>'
	**/
	+'</table>'
	+'<table id="cardInfo" name="cardInfo" width="100%" border="1"  style="font-size:14px;" cellspacing="0" cellpadding="0"> '
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">贷款基本信息</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:16px;FONT-FAMILY:\'黑体\';">本次申请贷款信息</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" width = "30%" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">客户名称</TD>'
	+'	<TD height="20" width = "20%" align="center">'
	+jsonData.CUST_NAME
	+'</TD>'
	+'	<TD height="20" width = "30%" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">企业规模</TD>'
	+'	<TD height="20" width = "20%" align="center">';
		if(QYGM==null||QYGM==""){
			 htmlString=htmlString+'－－';
			}
		else{
			htmlString=htmlString+QYGM;
			}
			htmlString=htmlString+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">贷款金额(万元)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.APPLY_AMT)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">基准利率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.DT_RATE)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">贷款期限</TD>'
	+'	<TD height="20" align="center">'
	+jsonData.DT_LEN
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">FTP价格(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit2(jsonData.FTP_VALUE)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">五级分类</TD>'
	+'	<TD height="20" align="center">'
	+jsonData.FIVETYPE
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">减值准备计提比率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.IMPAIRMENT_PROVISION_RATE)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">所属行业</TD>'
	+'	<TD height="20" align="center">'
	+jsonData.HYTP
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">行业系数(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.HYTPVALUE)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">担保方式</TD>'
	+'	<TD height="20" align="center">';
	 if(jsonData.VOUCHTYPE==null||jsonData.VOUCHTYPE==""){
		 htmlString=htmlString+'－－';
		}
	else{
		htmlString=htmlString+jsonData.VOUCHTYPE;
		}
		htmlString=htmlString+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">担保系数(%)</TD>'
	+'	<TD height="20" align="center">';
	  if(moneyFourDigit(jsonData.VOUCHTYPEVALUE)==null||moneyFourDigit(jsonData.VOUCHTYPEVALUE)==""){
		  htmlString=htmlString+'－－';
		  }
	  else{
		  htmlString=htmlString+moneyFourDigit(jsonData.VOUCHTYPEVALUE);
		  }
		  htmlString=htmlString+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">信用评级</TD>'
	+'	<TD height="20" align="center">';
	 if(jsonData.NO_RE_LOAN_CUST_LV==null||jsonData.NO_RE_LOAN_CUST_LV==""){
		 htmlString=htmlString+'－－';
		 }
	 else{
		 htmlString=htmlString+jsonData.NO_RE_LOAN_CUST_LV;
		 }
		 htmlString=htmlString+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">客户评级系数(%)</TD>'
	+'	<TD height="20" align="center">';
	 if(moneyFourDigit(jsonData.IMPAIRMENT_PROVISION_RATE_VIEW)==null||moneyFourDigit(jsonData.IMPAIRMENT_PROVISION_RATE_VIEW)==""){
		 htmlString=htmlString+'－－';
		 }
	 else{ 
		 htmlString=htmlString+moneyFourDigit(jsonData.IMPAIRMENT_PROVISION_RATE_VIEW);
		 }
		 htmlString=htmlString+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:16px;FONT-FAMILY:\'黑体\';">整体贷款情况</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">在我行现有贷款余额(不含此次申请金额)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.BAL)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">贷款总额(本次贷款发放后)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(jsonData.AMT)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">扣除经济资本后盈亏平衡点利率测算(单一贷款)</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">经济资本占用</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(JJZBZYID)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">经济资本成本</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(JJZBCBID)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">盈亏平衡点利率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(YKPHDRATEID)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">利率浮动比率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(RATEFDBLID)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">目标收益(单一贷款)</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">目标收益(扣除经济资本成本)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(mbsyValue)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">目标收益率(扣除经济资本成本,%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit(mbsylValue)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">客户综合收益</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">已实现存款收益<br>【'+crm_dt_y+'】</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款日均</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款利率(%)</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款利润</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">活期存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_H_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RATE_H_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RCV_H_YJ)+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">定期存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_D_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RATE_D_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RCV_D_YJ)+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">其他存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_O_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RATE_O_YJ)+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RCV_O_YJ)+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">合计</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(ysxcksyHj)+'</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_RCV_SUM)+'</TD>'
	+'</TR>'

	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">未来预期存款收益<br>【'+crm_dt_w+'】</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款日均</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款利率(%)</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">存款利润</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">活期存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_H_ED)+'</TD>';
	var strDEP_RATE_H_ED = "";
	if(null==jsonData.DEP_RATE_H_ED||jsonData.DEP_RATE_H_ED==""){
		strDEP_RATE_H_ED = "——";
	}else{
		strDEP_RATE_H_ED = moneyFourDigit(jsonData.DEP_RATE_H_ED);
	}	
	htmlString+='	<TD height="20" align="center">'+strDEP_RATE_H_ED+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_H_ED * (system_ftp_h/100-jsonData.DEP_RATE_H_ED/100))+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">定期存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_D_ED)+'</TD>';
	var strDEP_RATE_D_ED = "";
	if(null==jsonData.DEP_RATE_D_ED||jsonData.DEP_RATE_D_ED==""){
		strDEP_RATE_D_ED = "——";
	}else{
		strDEP_RATE_D_ED = moneyFourDigit(jsonData.DEP_RATE_D_ED);
	}	
	htmlString+='	<TD height="20" align="center">'+strDEP_RATE_D_ED+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_D_ED * (system_ftp_d/100-jsonData.DEP_RATE_D_ED/100))+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center">其他存款</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_O_ED)+'</TD>';
	var strDEP_RATE_O_ED = "";
	if(null==jsonData.DEP_RATE_O_ED||jsonData.DEP_RATE_O_ED==""){
		strDEP_RATE_O_ED = "——";
	}else{
		strDEP_RATE_O_ED = moneyFourDigit(jsonData.DEP_RATE_O_ED);
	}	
	htmlString+='	<TD height="20" align="center">'+strDEP_RATE_O_ED+'</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.DEP_AVG_BAL_O_ED * (system_ftp_q/100-jsonData.DEP_RATE_O_ED/100))+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">合计</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(wlyqcksyHj)+'</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(wlyqckLr)+'</TD>'
	+'</TR>'
	
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">已实现中间业务收入<br>【'+crm_dt_y+'】</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">实现收入</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">中间业务类别</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">实现收入</TD>'
	+'</TR>';
		for(var i=0; i<ysxinc.length&&i<4; i+=2){
			if(i+1==ysxinc.length){
				if(moneyFourDigit(jsonData.NI_RCV_F)==0.00){
					ysxinc[i].niIncome="";
				}
				else{
					htmlString=htmlString+'<TR>'
					+'	<TD height="20" align="center">'+ysxinc[i].prdName+'</TD>'
					+'	<TD height="20" align="center">'+moneyFourDigit(ysxinc[i].niIncome/10000)+'</TD>'
					+'	<TD height="20" align="center">——</TD>'
					+'	<TD height="20" align="center">——</TD>'
					+'</TR>';
					}
				
			}else{
				if(moneyFourDigit(jsonData.NI_RCV_F)==0.00){
					ysxinc[i].niIncome="";
					}
				else{
					htmlString=htmlString+'<TR>'
					+'	<TD height="20" align="center">'+ysxinc[i].prdName+'</TD>'
					+'	<TD height="20" align="center">'+moneyFourDigit(ysxinc[i].niIncome/10000)+'</TD>'
					+'	<TD height="20" align="center">'+ysxinc[i+1].prdName+'</TD>'
					+'	<TD height="20" align="center">'+moneyFourDigit(ysxinc[i+1].niIncome/10000)+'</TD>'
					+'</TR>';
					}
					
			}
		};
	htmlString=htmlString+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">合计</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.NI_RCV_F)+'</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'</TR>'

	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">未来预期中间业务收入<br>【'+crm_dt_w+'】</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">实现收入</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">中间业务类别</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">实现收入</TD>'
	+'</TR>';
		for(var i=0; i<rvcc.length&&i<2; i+=2){
			if(i+1==rvcc.length){
				htmlString=htmlString+'<TR>'
				+'	<TD height="20" align="center">'+rvcc[i].RCV_TYPE+'</TD>'
				+'	<TD height="20" align="center">'+moneyFourDigit(rvcc[i].RCV/10000)+'</TD>'
				+'	<TD height="20" align="center">——</TD>'
				+'	<TD height="20" align="center">——</TD>'
				+'</TR>';
			}else{
				htmlString=htmlString+'<TR>'
				+'	<TD height="20" align="center">'+rvcc[i].RCV_TYPE+'</TD>'
				+'	<TD height="20" align="center">'+moneyFourDigit(rvcc[i].RCV/10000)+'</TD>'
				+'	<TD height="20" align="center">'+rvcc[i+1].RCV_TYPE+'</TD>'
				+'	<TD height="20" align="center">'+moneyFourDigit(rvcc[i+1].RCV/10000)+'</TD>'
				+'</TR>';
			}
		};
	htmlString=htmlString+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">合计</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.NI_RCV)+'</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'</TR>'
	
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">支出类别</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">支出</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">支出类别</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">支出</TD>'
	+'</TR>';
	for(var i=0; i<payc.length; i+=2){
		if(i+1==payc.length){
			htmlString=htmlString+'<TR>'
			+'	<TD height="20" align="center">'+payc[i].PAY_TYPE+'</TD>'
			+'	<TD height="20" align="center">'+moneyFourDigit(payc[i].PAY/10000)+'</TD>'
			+'	<TD height="20" align="center">——</TD>'
			+'	<TD height="20" align="center">——</TD>'
			+'</TR>';
		}else{
			htmlString=htmlString+'<TR>'
			+'	<TD height="20" align="center">'+payc[i].PAY_TYPE+'</TD>'
			+'	<TD height="20" align="center">'+moneyFourDigit(payc[i].PAY/10000)+'</TD>'
			+'	<TD height="20" align="center">'+payc[i+1].PAY_TYPE+'</TD>'
			+'	<TD height="20" align="center">'+moneyFourDigit(payc[i+1].PAY/10000)+'</TD>'
			+'</TR>';
		}
	};
	htmlString=htmlString+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">合计</TD>'
	+'	<TD height="20" align="center">'+moneyFourDigit(jsonData.PAY)+'</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'	<TD height="20" align="center">——</TD>'
	+'</TR>';
	
	
	
	htmlString=htmlString+'<TR>'
	+'	<TD colspan="3" height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">模拟利润贡献值(存款考核利润+中间业务收入-主要支出)：</TD>'
	+'	<TD height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">'+moneyFourDigit(jsonData.MCON)+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="3" height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">新产品系数：</TD>'
	+'	<TD height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">'+proFactor+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="3" height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">使用新产品个数：</TD>'
	+'	<TD height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">'+proCount+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">使用新产品明细：</TD>'
	+'	<TD colspan="3" height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">';
	if(jsonData.USPRD==null||jsonData.USPRD==""){
		 htmlString=htmlString+'－－';
		 }
	 else{
		 htmlString=htmlString+jsonData.USPRD;
		 }
		 htmlString=htmlString+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="3" height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">调整后模拟利润贡献值(新产品系数调整后)：</TD>'
	+'	<TD height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">'+moneyFourDigit(adjustMCON)+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="3" height="20" align="left" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">调整后模拟利润贡献值(年化后)：</TD>'
	+'	<TD height="30" align="center" style="font-size:14px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">'+moneyFourDigit(adjustMCONNHH)+'</TD>'
	+'</TR>'

	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">贷款定价结果</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">折算后利率(不低于,%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit1(jsonData.ZS_RATE_NO)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">折算后利率浮动(不低于,%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit1(jsonData.ZS_RATE_FD_NO)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">利率定价下限(%)</TD>'
	+'	<TD height="20" align="center">';
		 if(jsonData.RATE_TJ_MIN=="基准"){
			 htmlString=htmlString+'基准';
			 }
		 else{
			 htmlString=htmlString+moneyFourDigit1(jsonData.RATE_TJ_MIN);
			 }
			 htmlString=htmlString+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">最终定价利率浮动水平(%)</TD>'
	+'	<TD height="20" align="center">';
	if(jsonData.FINAL_TJ_RATE_FD=="基准"){
		 htmlString=htmlString+'基准';
		 }
	 else{
		 htmlString=htmlString+moneyFourDigit1(jsonData.FINAL_TJ_RATE_FD);
		 }
		 htmlString=htmlString+'</TD>'
	+'</TR>'

	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">拟申请利率综合收益测算</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">拟申请贷款利率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit2(jsonData.LON_RATE)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">每万元贷款利润贡献值(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit1(jsonData.BILLONCON)
	+'</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">折算后综合利率(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit1(jsonData.ZS_RATE)
	+'</TD>'
	+'	<TD height="20" align="center" style="FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">折算后综合利率浮动情况(%)</TD>'
	+'	<TD height="20" align="center">'
	+moneyFourDigit1(jsonData.ZSFD_RATE)
	+'</TD>'
	+'</TR>'

	/**
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">下一步合作计划及未来综合收益情况</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="60" align="left" >'+jsonData.NEXT_DESC+'</TD>'
	+'</TR>'
	+'<TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">此笔贷款发放后，派生存款及吸收其他关联存款情况</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="60" align="left" >'+jsonData.PS_DESC+'</TD>'
	+'</TR>'
	+'<TR>'
	+'<TR>'
	+'	<TD colspan="4" height="30" align="center" style="font-size:18px;FONT-WEIGHT:bold;FONT-FAMILY:\'黑体\';">其他需说明情况</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD colspan="4" height="60" align="left">'+jsonData.OTHER_DESC+'</TD>'
	+'</TR>'
	**/
	+'</table>'
	+'<TABLE width="100%" border=0  cellpadding="0" cellspacing="0">'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'	
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">填表人:</TD>'
	+' <TD height="20" align="left" style="font-size:16px;">联系方式(座机及手机):</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">支行负责人签字盖条章:</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'	
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">管理部/分行负责人签字盖公章:</TD>'
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'
	+'<TR>'
	+'	<TD height="20" align="left" style="font-size:16px;">&nbsp;</TD>'	
	+'</TR>'	
	+'</TABLE>';
		document.getElementById("grades").innerHTML=htmlString;
	}

	
</script>
</div>

</body>
</html>