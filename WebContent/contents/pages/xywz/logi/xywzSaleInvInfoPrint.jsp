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
	var tablelist = document.getElementsByTagName("table");
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
	<TABLE width="90%" align=center id="PrintA" border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="40" align="center" style="font-size:22px;FONT-FAMILY:\'Times New Roman\';">QINGHUANGDAO GUOYANG STEEL CO.,LTD</TD>
		</TR>
		<TR>
			<TD height="40" align="center" style="font-size:26px;FONT-FAMILY:\'Times New Roman\';">MILL TEST CERTIFICATE(MTC)</TD>
		</TR>
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id ='contractNo'></TD>
		</TR>
		<TR>
			<TD height="20" align="left" style="font-size:14px;">INVOICE NO.: </TD>
		</TR>
		<TR>
			<TD height="20" align="left" style="font-size:14px;">GRADE:</TD>
			<TD height="20" align="right" style="font-size:14px;">TOTAL QUANTITY:</TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">
		<TR>
			<TD height="20" align="left" colspan="4" style="font-size:14px;">MANUFACTURER: QINHUANGDAO GUOYANG STEEL CO., LTD</TD>
		</TR>
		<TR>
			<TD height="20" align="left" colspan="2" style="font-size:14px;">SHIPPING MARKS:</TD>
			<TD height="20" align="right"  style="font-size:14px;">批次号：&nbsp;&nbsp;&nbsp;</TD>
			<TD height="20" align="right"  style="font-size:14px;"></TD>
		</TR>
		<TR>
			<TD height="20" align="left" colspan="2" style="font-size:14px;"></TD>
			<TD height="20" align="right"  style="font-size:14px;">生产日期：</TD>
			<TD height="20" align="right"  style="font-size:14px;"></TD>
		</TR>
		<TR>
			<TD height="20" align="right" colspan="2" style="font-size:14px;">Signature:</TD>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
		</TR>
		<TR>
		<TD colspan="4"><hr/></TD>
		
		</TR>
		
		<TR>
			<TD height="20" align="left" style="font-size:14px;">Director of quality: Li zichen&nbsp;&nbsp;</TD>
			<TD height="20" align="left" style="font-size:14px;">Monitor of inspection: Li yongheng&nbsp;&nbsp;</TD>
			<TD height="20" align="left" style="font-size:14px;">Inspectior: Hao zhenhai&nbsp;&nbsp;</TD>
			<TD height="20" align="left" style="font-size:14px;">Date of inspection and issue:&nbsp;&nbsp;</TD>
		</TR>												
	</TABLE>
	<script type="text/javascript" >
	<%
	String invId = request.getParameter("invId")+"";

	out.println(" var invId = \""+invId+"\""	);
	%>
	alert(invId);
	Ext.Ajax.request({
		params:{
			'invId':invId
		},		
		url:basepath+"/XywzSaleInvInfoPrintAction!getInvInfo.json",
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var CONTR_NUM=jsonData.CONTR_NUM;
			document.getElementById("contractNo").innerText='CONTRACT NO.'+CONTR_NUM;				
			var invList = jsonData.saleInvInfo;
			var htmlString='';
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Grade</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Heat        No.</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Product</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Size</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Bundles</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">PCS</TD>';
			htmlString+='<TD height="20" rowspan="2" align="center" style="font-size:14px;">Weight  MT</TD>';
			htmlString+='<TD height="20" colspan="6" align="center" style="font-size:14px;">Chemical composition of each heat and bundle(%)</TD>';
			htmlString+='<TD height="20" colspan="4" align="center" style="font-size:14px;">Physical and Mechanical properties of each heat and bundle</TD>';
			htmlString+='</TR>';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">C</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Si</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Mn</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">P</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">B</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">S</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Yield point Mpa</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Tensile strength Mpa</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Elong-ation   %</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">Cold bending-test   180° d=1a</TD>';
			htmlString+='</TR>';					
			for(var i=0;i<invList.length;i++){
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].cur+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].contrNum+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].hsCode+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i].invId+'</TD>';
				htmlString+='</TR>';
			}
			htmlString+='</TABLE>';
			
			document.getElementById("grades").innerHTML=htmlString;
			
		}
		
	});
	</script>
</div>

</body>
</html>