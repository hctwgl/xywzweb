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
		if(tablelist[i].name == tableName){
			submittable = tablelist[i];
			break;
		}
	}

	
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


</script>
</head>
<body >

<div width="1024px">
<OBJECT id=wb height=0 width=0 classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 name=wb></OBJECT>
<DIV align=left>

<INPUT onclick=javascript:printsetup(); type=button value=打印页面设置 name=button_setup class="Noprint" /> 
<INPUT onclick=javascript:printpreview(); type=button value=打印预览 name=button_show class="Noprint" /> 
<INPUT onclick=javascript:printit() type=button  width=150 value="   打  印   " name=button_print class="Noprint"/>
<input type="button" value="导出到Excel"  onClick="AllAreaExcel('cardInfo')" class="Noprint">
<INPUT type="button" width=150 value="  关 闭   " onclick=javascript:closeWindows() class="Noprint">  



</DIV>
<DIV align=left name="cardInfo" id="PrintA">
	<TABLE width="90%" align=center id="PrintA" border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="40" align="center" colspan="8" style="font-size:22px;FONT-FAMILY:\'Times New Roman\';">工 矿 产 品 购 销 合 同</TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=center valign="top" class="" id="PrintA" border=0  cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
		</TR>
		<TR>
		
		<TR>
		</TR>												
	</TABLE>
	<script type="text/javascript" >
	<%
	String sheetId = request.getParameter("sheetId")+"";
	
	out.println(" var sheetId = \""+sheetId+"\""	);
	%>
	//alert(sheetId);
	Ext.Ajax.request({
		params:{
			'sheetId':sheetId
		},		
		url:basepath+"/XywzPurcOutPurcContractPrintAction!getInvInfo.json",
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var PROVR_FULL_NM=jsonData.PROVR_FULL_NM;
			var PUCH_SNGL_ID=jsonData.PUCH_SNGL_ID;
			var CONTR_DT=jsonData.CONTR_DT;
			var MEMO1=jsonData.MEMO1;
			var DELY_ADDR=jsonData.DELY_ADDR;
			var MEMO2=jsonData.MEMO2;
			var MEMO3=jsonData.MEMO3;
			var MEMO4=jsonData.MEMO4;
			var MEMO5=jsonData.MEMO5;
			var MEMO6=jsonData.MEMO6;
			var MEMO=jsonData.MEMO;
			var ADDR=jsonData.ADDR;
			var TEL=jsonData.TEL;
			var FAX=jsonData.FAX;
			var BANK_FULL_NM=jsonData.BANK_FULL_NM;
			var ACCT_NUM=jsonData.ACCT_NUM;
			var TOTAL_AMT=jsonData.TOTAL_AMT;
			var totalSum=0;
			var totalAmt=0;
			//document.getElementById("contractNo").innerText='CONTRACT NO.'+CONTR_NUM;				
			var invList = jsonData.provrMgmtProduct;
			var htmlString='';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';		
			htmlString+='<TR>';
			htmlString+='<TD width="70%" height="20" align="left" colspan="5" style="font-size:14px;">供方： '+PROVR_FULL_NM+'</TD>';
			htmlString+='<TD width="30%" height="20" align="left"  colspan="3" style="font-size:14px;">合同编号：'+PUCH_SNGL_ID+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';		
			htmlString+='<TR>';
			htmlString+='<TD width="70%" height="20" align="left" colspan="5" style="font-size:14px;">需方： 秦皇岛市国阳钢铁有限公司</TD>';
			htmlString+='<TD width="30%" height="20" align="left"  colspan="3" style="font-size:14px;">签订日期：'+CONTR_DT+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right"  style="font-size:14px;"> </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';		
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="7" style="font-size:14px;">一、产品标的：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">品名</TD>';
			htmlString+='<TD height="20" colspan="2" align="center" style="font-size:14px;">规格型号</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Kg/m</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">数量（吨）</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">支/件</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">件数</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">单价（元/吨）</TD>';
			htmlString+='</TR>';					
			for(var i=0;i<invList.length;i++){
				totalSum+=invList[i].qty;
				totalAmt+=invList[i].qty*invList[i].uprc;		
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].hsCode+'</TD>';
				htmlString+='<TD height="20" colspan="2" align="center" style="font-size:14px;">'+invList[i].model+'X'+invList[i].len+'M</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].kgM+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].qty+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].piecesCnt+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].pieces+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].uprc+'</TD>';
				htmlString+='</TR>';
			}
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">-</TD>';
			htmlString+='<TD height="20" colspan="2" align="center" style="font-size:14px;">合计</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">-</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+totalSum+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">-</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">-</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+totalAmt+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="1" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">合计人民币金额（大写）: '+TOTAL_AMT+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left"  colspan="8" style="font-size:14px;">二、质量技术标准要求：'+MEMO1+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">三、交（提）货地点、方式：'+DELY_ADDR+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">四、运输方式及到达站港和费用负担：'+MEMO2+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">五、合理损耗和计算方法：'+MEMO3+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">六、包装标准：'+MEMO4+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">七、验收标准、方法及提出异议期限： 按协议标准验收。</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">八、结算方式及期限：'+MEMO5+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">九、如需提供担保、另立合同担保书，作为本合同附件。 </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">十、违约责任: '+MEMO6+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">十一、解决合同纠纷的方式 ：双方协商，协商不成交需方所在地司法机关仲裁 。</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="8" style="font-size:14px;">十二、其它约定事项：'+MEMO+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right"  style="font-size:14px;"> </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintA"  border="1" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD width="50%" height="20" align="center" colspan="4" style="font-size:14px;">供方</TD>';
			htmlString+='<TD width="50%" height="20" align="center" colspan="4" style="font-size:14px;">需方</TD>';
			htmlString+='</TR>';
			htmlString+='<TR>';
			htmlString+='<TD width="50%" height="20" align="left" colspan="4" style="font-size:14px;">单位名称：'+PROVR_FULL_NM+'</br>地址：'+ADDR+'</br>法定代表人：</br>委托代理人：</br>电话：'+TEL+'</br>传真：'+FAX+'</br>开户银行：'+BANK_FULL_NM+'</br>帐号：'+ACCT_NUM+'</TD>';
			htmlString+='<TD width="50%" height="20" align="left" colspan="4" style="font-size:14px;">单位名称: 秦皇岛市国阳钢铁有限公司</br>地址: 秦皇岛市卢龙县刘家营南</br>法定代表人: </br>委托代理人: </br>电话: 0335--7398118   13903335447 </br>传真: 0335--7398088 </br>开户银行:卢龙县农行营业部</br>帐号: 828001040007633</TD>';
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