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
	<TABLE width="90%" align=left id="PrintA" border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="40" align="center" colspan="12" style="font-size:16px;FONT-FAMILY:\'Times New Roman\';">QINHUANGDAO GUOYANG IMPORT AND EXPORT TRADE CO.,LTD</TD>
	    </TR>
	</TABLE>
	<TABLE width="90%" align=left id="PrintA" border=0  cellpadding="0" cellspacing="0">
	    <TR>
			<TD height="40" align="center" colspan="12" style="font-size:16px;FONT-FAMILY:\'Times New Roman\';">1515 WANZHONG PLAZA,6 TIANTAISHAN ROAD ECONOMIC  AND </TD>
		</TR>
	</TABLE>
	<TABLE width="90%" align=left id="PrintA" border=0  cellpadding="0" cellspacing="0">
	    <TR>
			<TD height="40" align="center" colspan="12" style="font-size:16px;FONT-FAMILY:\'Times New Roman\';">TECHNOLOGICAL DEVELOPMENT ZONE QINHUANGDAO CITY,CHINA</TD>
		</TR>
	</TABLE>
	<TABLE width="50%" align=center id="PrintA" border=0  cellpadding="0" cellspacing="0">
	   <TR>
			<TD height="40" align="left" colspan="8" style="font-size:16px;FONT-FAMILY:\'Times New Roman\';">TEL：86-335 8060898</TD>
			<TD height="40" align="left" colspan="4" style="font-size:16px;FONT-FAMILY:\'Times New Roman\';">FAX：86-335 8066108</TD>
		</TR>		
	</TABLE>
	
	<TABLE width="90%" align=left id="PrintA" border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="40" align="center" colspan="12" style="font-size:22px;FONT-FAMILY:\'Times New Roman\';">COMMERCIAL INVOICE</TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=left valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">
											
	</TABLE>
	<script type="text/javascript" >
	<%
	String cstmPacklistId = request.getParameter("cstmPacklistId")+"";
	
	out.println(" var cstmPacklistId = \""+cstmPacklistId+"\""	);
	%>
    //alert(cstmPacklistId);
	Ext.Ajax.request({
		params:{
			'cstmPacklistId':cstmPacklistId
		},		
		url:basepath+"/XywzSaleInvInfoPrintAction!getInvInfo.json",
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var INV_NUM=jsonData.INV_NUM;
			var CHKS_PERS=jsonData.CHKS_PERS;
			var INV_DT=jsonData.INV_DT;
			var S_CNO=jsonData.S_CNO;
			var PAYMENTS=jsonData.PAYMENTS;
			var PORTOFLOADING=jsonData.PORTOFLOADING;
			var PORTOFDESTINATION=jsonData.PORTOFDESTINATION;
			var SHIPPINGMARKS =jsonData.SHIPPINGMARKS;
			var totalWeight=0;	
			var totalBundles=0;
			var totalPcs=0;
			var uprc='';
			var model='';
			var hsCode='';
			//document.getElementById("contractNo").innerText='CONTRACT NO.'+CONTR_NUM;				
			var invList = jsonData.saleInvInfo;
			//lert("aaaaaaa:"+invList[0].size);
			//Ext.Msg.alert("aaaaaaa:"+invList[0].size);
			var htmlString='';
			htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" rowspan="4" colspan="3"  align="left" style="font-size:14px;">TO:</TD>';
			htmlString+='<TD height="20" rowspan="4" align="left" colspan="5" style="font-size:14px;">'+CHKS_PERS+'</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">INVOICE NO.:</TD>';
			htmlString+='<TD height="20" align="left" colspan="2" style="font-size:14px;">'+INV_NUM+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">DATE</TD>';
			htmlString+='<TD height="20" align="left" colspan="2" style="font-size:14px;">'+INV_DT+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">S/C NO.:</TD>';
			htmlString+='<TD height="20" align="left" colspan="2" style="font-size:14px;">'+S_CNO+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">PAYMENTS:</TD>';
			htmlString+='<TD height="20" align="left" colspan="2" style="font-size:14px;">'+PAYMENTS+'</TD>';
			htmlString+='</TR>';

			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">  PORT OF LOADING:</TD>';
			htmlString+='<TD height="20" align="left" colspan="9" style="font-size:14px;">'+PORTOFLOADING+'</TD>';
			htmlString+='</TR>';

			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">PORT OF DESTINATION:</TD>';
			htmlString+='<TD height="20" align="left" colspan="9" style="font-size:14px;">'+PORTOFDESTINATION+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=left valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" style="font-size:14px;"></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="12" style="font-size:14px;">DESCRIPTION OF GOODS &/OR SERVICES</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">HS CODE</TD>';
			htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">SIZE(MM)</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">QTY</TD>';
			htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">UNIT PRICE (USD/MT)</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">AMOUNT(USD)</TD>';
			htmlString+='</TR>';

			for(var i=0;i<invList.length;i++){
				uprc=invList[i].uprc;
				if(uprc==0){
					uprc='';
				}
				model=invList[i].model;
				if (model=="SUB TOTAL"){
					hsCode='SUB TOTAL';
					model='';
				}else{
					hsCode=invList[i].hsCode;
					totalWeight+=invList[i].qty;	
					totalBundles+=invList[i].qty*invList[i].uprc;
				}
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+hsCode+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">'+model+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+invList[i].qty.toFixed(3)+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">'+uprc+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+invList[i].amt+'</TD>';
				htmlString+='</TR>';
			}
			
			htmlString+='</TABLE>';
			htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;"></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';	
			
			htmlString+='</TABLE>';
			htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="12" style="font-size:14px;">TOTAL WEIGHT:   '+totalWeight.toFixed(3)+'</TD>';
			htmlString+='</TR>';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="12" style="font-size:14px;">TOTAL BUNDLES:   '+totalBundles.toFixed(3)+'</TD>';
			htmlString+='</TR>';

			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="12" style="font-size:14px;">SHIPPING MARKS: '+SHIPPINGMARKS+'</TD>';
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