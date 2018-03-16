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
.PageNext{page-break-after:always;}
.kuang{border-collapse:collapse;border-spacing:0;border-left:2px solid #888;border-top:2px solid #888;border-right:2px solid #888;border-bottom:2px solid #888;}

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
	<div id="grades" width="100%" text-align="center"></div>
		<TABLE width="60%" align=center valign="top" class="" id="PrintC" cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20"  align="left" colspan="8" style="font-size:14px;" id = 'title'>炉号以此为：&nbsp;&nbsp;</TD>		
		</TR>		
	</TABLE>
			<TABLE width="60%" align=center valign="top" class="" id="PrintC" cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>		
		</TR>		
	</TABLE>
	<TABLE width="60%" align=center valign="top" class="kuang" id="PrintC" cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20"  align="left" colspan="8" style="font-size:14px;" id = 'shippingmarks'>shippingmarks&nbsp;&nbsp;</TD>
		
		</TR>		
		<TR>
		<B>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='size'>'SIZE（尺寸）'</TD>
		</B>
		</TR>
		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id= 'quality'>'QUALITY（材质）'</br></TD>
       </TR>
        <TR>
            <TD height="20" align="left" colspan="8" style="font-size:14px;" id= 'heatnumber'>HEAT NUMBER(炉号)：</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id = 'thickness'>THICKNESS（厚度）:&nbsp;&nbsp;</TD>
		</TR>		
		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='millsname'>MILL'S NAME: &nbsp;&nbsp;</TD>
		</TR>
				
	    <TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='bundlenumber'>BUNDLE NUMBER: &nbsp;&nbsp;</TD>
		</TR>	
	<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='pcsbundle'>NUMBER OF PCS/BUNDLE（支/件）：</TD>			
		</TR>	
		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='memo'>&nbsp;&nbsp;</TD>
		</TR>		
			
		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='colour'>COLOUR（颜色）:  &nbsp;&nbsp;</TD>
		</TR>				
	</TABLE>
			<TABLE width="60%" align=center valign="top" class="" id="PrintC" cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>	
			<TD height="20"  align="left" style="font-size:14px;" id = 'blank'>&nbsp;&nbsp;</TD>		
		</TR>		
	</TABLE>
	
	    <!--分页-->
    <div class="PageNext">
    </div>
    <div >
	<TABLE width="60%" height="150" align=center valign="top" class="kuang" id="PrintC" border=0  cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20" align="left" colspan="8" style="font-size:14px;" id ='backnote'>BACK_NOTE: &nbsp;&nbsp;</TD>
		</TR>		
	</TABLE>
	</div>
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
		  url:basepath+"/XywzSaleLabelMgmtprintAction!xywzSaleLabelMgmtprint.json",
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var SHIPPINGMARKS=jsonData.SHIPPINGMARKS;
			var SIZE=jsonData.SIZE;
			var QUALITY=jsonData.QUALITY;
			var HEAT_NUMBER=jsonData.HEAT_NUMBER;
			var THICKNESS=jsonData.THICKNESS;
			var MILLS_NAME=jsonData.MILLS_NAME;
			var BUNDLE_NUMBER=jsonData.BUNDLE_NUMBER;
			var PCS_BUNDLE=jsonData.PCS_BUNDLE;
			var COLOUR=jsonData.COLOUR;
			var MEMO=jsonData.MEMO;
			var BACK_NOTE=jsonData.BACK_NOTE;
			var HS_CODE=jsonData.HS_CODE;
			var QTY=jsonData.QTY;
			
			document.getElementById("title").innerText=HS_CODE+'，'+QTY+'吨，'+'炉号以此为：'+HEAT_NUMBER;
			document.getElementById("shippingmarks").innerText=' '+ SHIPPINGMARKS;
			document.getElementById("size").innerText=' SIZE（尺寸）：'+SIZE;			
			document.getElementById("quality").innerText=' QUALITY（材质） : '+QUALITY;	
			document.getElementById("heatnumber").innerText=' HEAT NUMBER（炉号）: '+HEAT_NUMBER;	
			document.getElementById("thickness").innerText=' THICKNESS（厚度）：'+THICKNESS;
			document.getElementById("millsname").innerText=' MILL'+"'"+'S NAME: '+MILLS_NAME;
			document.getElementById("bundlenumber").innerText=' BUNDLE NUMBER：'+BUNDLE_NUMBER;
			document.getElementById("pcsbundle").innerText=' NUMBER OF PCS/BUNDLE（支/件）：'+PCS_BUNDLE;
            document.getElementById("colour").innerText=' COLOUR（颜色）：'+COLOUR;
            document.getElementById("memo").innerText=' '+ MEMO;
            document.getElementById("backnote").innerText=' '+ BACK_NOTE;

			
			
		}
		
	});

	</script>
</div>
</DIV>
</body>
</html>