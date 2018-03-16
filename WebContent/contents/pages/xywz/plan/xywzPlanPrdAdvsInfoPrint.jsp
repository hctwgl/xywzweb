<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/contents/pages/common/includes.jsp"%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=mode" ></meta>
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
	var tablelist = document.getElementsByTagName("DIV");
	submittable = tablelist.PrintA;
	for(var i=0;i<tablelist.length;i++){
		if(tablelist[i].name == tableName ){
			submittable = tablelist[i];
			
		}
	}

	
	if(submittable==null||submittable=="undefined"){
		alert("执行异常请刷新页面，再试一次！！");
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

</script>
</head>
<body >

<div width="1024px">
<OBJECT id=wb height=0 width=0 classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 name=wb></OBJECT>
<DIV align=left>

<INPUT onclick=javascript:printsetup(); type=button value=打印页面设置 name=button_setup class="Noprint" /> 
<INPUT onclick=javascript:printpreview(); type=button value=打印预览 name=button_show class="Noprint" /> 
<INPUT onclick=javascript:printit() type=button  width=150 value="   打  印   " name=button_print class="Noprint"/>
<input type="button" value="导出到Excel"  onClick="AllAreaExcel('cardInfo')"  class="Noprint">
<INPUT type="button" width=150 value="  关 闭   " onclick=javascript:closeWindows() class="Noprint">  



</DIV>
<DIV align=left name="cardInfo" id="PrintA">
	<TABLE width="90%"  align=left  border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="40" align="center" colspan="4" style="font-size:14px;FONT-FAMILY:\'Times New Roman\';">秦皇岛市国阳钢铁有限公司</TD>
			<TD height="40" align="center" colspan="4" style="font-size:20px;FONT-FAMILY:\'Times New Roman\';">生 产 计 划 通 知 单</TD>
			<TD height="40" align="center" colspan="3" style="font-size:14px;FONT-FAMILY:\'Times New Roman\';">GY/ZJ--SCB--01</TD>
	    </TR>
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" name="cardInfo1" align=left valign="top" id="PrintA1"  class="" border=0  cellpadding="0" cellspacing="0">		
		<TR>
			<TD height="40" align="center" colspan="3" style="font-size:14px;"></TD>
		</TR>	
		<TR>
			<TD height="40" align="center" colspan="3" style="font-size:14px;">批准：</TD>
			<TD height="40" align="center" colspan="5" style="font-size:14px;">校对：</TD>
			<TD height="40" align="center" colspan="3" style="font-size:14px;">编制：</TD>
		</TR>												
	</TABLE>
	<script type="text/javascript" >
	<%
	String issuesDt = request.getParameter("issuesDt")+"";
	String planId = request.getParameter("planId")+"";
	
	out.println(" var issuesDt = \""+issuesDt+"\""	);
	out.println(" var planId = \""+planId+"\""	);
	%>
	//alert(issuesDt);
	Ext.Ajax.request({
		params:{
			'issuesDt':issuesDt,
			'planId':planId
		},		       
		url:basepath+"/XywzPlanPrdPrintDetailQueryAction.json?date="+new Date().getTime(),
		//url:basepath+"/XywzPlanPrdPrintQueryAction?date="+new Date().getTime(),
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var plan  = jsonData.json.data;

			var htmlString='';
			var totalWeight=0;
			var totalWeight1=0;
			var allTotalWeight=0;
			var scheduNum;
			var scheduDt;
			scheduNum=plan[0].PLAN_NUM;//生产计划编号，目前没有
			scheduDt=plan[0].ISSUES_DT;
			htmlString+='<TABLE width="90%" align=center  valign="top" class=""   border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TD height="40" align="left" colspan="8" style="font-size:14px;">生产计划编号：'+scheduNum+'</TD>';
			htmlString+='<TD height="20" align="right" colspan="4" style="font-size:14px;">生产计划日期：'+issuesDt+'</TD>';
			htmlString+='</TABLE>';
			htmlString+='<TABLE width="90%" align=center  valign="top" class=""  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">序号</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">销售合同号</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">品名</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">材质</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">规格型号</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">排产日期</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">长度(M)</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">数量(吨)</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">公差(%)</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">包   装</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">交货期</TD>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">订单人</TD>';
			htmlString+='</TR>';
			for(var i=0;i<plan.length;i++){
				totalWeight1=parseFloat(plan[i].WEIGHT);			
				contrNum=plan[i].CONTR_NUM;
				if (contrNum=="汇总"){
					allTotalWeight=plan[i].WEIGHT;
					totalWeight1=0;
				}				
				totalWeight+=totalWeight1;
				if (contrNum=="汇总"){
					continue;
				}
				htmlString+='<TR>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+(i+1)+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].CONTR_NUM+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].PRD_NAME+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].MATERIALS+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].SPC_MODEL+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].SCHEDU_DATE+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].LEN+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].WEIGHT+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].WEIGHT_TOLERANCE+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].PKG+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].FINAL_TRAFF_DAY+'</TD>';
				htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">'+plan[i].USER_NAME+'</TD>';
				htmlString+='</TR>';
			}
			htmlString+='<TR>';
			htmlString+='<TD height="20" width="90" align="center" style="font-size:14px;">说明</TD>';
			htmlString+='<TD height="20" align="center" colspan="11" style="font-size:14px;">本次下达'+ totalWeight+' 吨；累计下达未生产：' +allTotalWeight+ '吨。</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			document.getElementById("grades").innerHTML=htmlString;
			
		}
		
	});
	</script>
</div>
</DIV>
</body>
</html>