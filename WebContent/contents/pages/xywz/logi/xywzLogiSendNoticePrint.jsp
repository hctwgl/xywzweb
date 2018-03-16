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
			<TD height="40" align="center" colspan="10"  style="font-size:22px;FONT-FAMILY:\'Times New Roman\';">发运通知单</TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
		</TR>
		<TR>
		<TD colspan="4"><hr/></TD>
		
		</TR>
		
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
		url:basepath+"/XywzLogiSendNoticePrintAction!getInvInfo.json",
		method:'GET',
		async:false,	
		success:function (response){	
			var jsonData = Ext.decode(response.responseText);
			var ORDR_NUM=jsonData.ORDR_NUM;
			var SHIP_NAME=jsonData.SHIP_NAME;
			var LOAD_PORT=jsonData.LOAD_PORT;
			var UNLOAD_PORT=jsonData.UNLOAD_PORT;
			var EXPCT_TO_PORT_DAY=jsonData.EXPCT_TO_PORT_DAY;
			var CORP_NM=jsonData.CORP_NM;
			var SHIP_AGENT_CONTCR=jsonData.SHIP_AGENT_CONTCR;
			var GDS_AGENT=jsonData.GDS_AGENT;
			var GDS_AGENT_CONTCR=jsonData.GDS_AGENT_CONTCR;
			var MAK_DOC_PERS_NM=jsonData.MAK_DOC_PERS_NM;
			var LAST_GDS_SITU=jsonData.LAST_GDS_SITU;
			var QTY_POOR=jsonData.QTY_POOR;
			var WEIGHT_NGTV_POOR=jsonData.WEIGHT_NGTV_POOR;
			var SEND_GOODS_NOTICE=jsonData.SEND_GOODS_NOTICE;
			var IPE_DESC=jsonData.IPE_DESC;
			var UPN_DESC=jsonData.UPN_DESC;
			var DELV_ADDR=jsonData.DELV_ADDR;
			var DELV_PERS=jsonData.DELV_PERS;
			var DELV_PERS_TEL=jsonData.DELV_PERS_TEL;
			var MK_TAB_PERS_NM=jsonData.MK_TAB_PERS_NM;
			var MK_TAB_DT=jsonData.MK_TAB_DT;
			var contrNum=jsonData.CONTR_NUM;
			var custId=jsonData.CUST_ID;
			var totalSum=0;
			var totalWeight=0;
			//document.getElementById("contractNo").innerText='CONTRACT NO.'+CONTR_NUM;		
			var labelList=	jsonData.labelInfo;	
			var invList = jsonData.saleInvInfo;
			var htmlString='';
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">序号</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">船名</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">装港</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">卸港</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">预计到港日</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">船代</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">联系人</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">货代</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">联系人</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">国阳制单</TD>';
			htmlString+='</TR>';
			//htmlString+='</TABLE>';
			
			//htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+ORDR_NUM+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+SHIP_NAME+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+LOAD_PORT+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+UNLOAD_PORT+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+EXPCT_TO_PORT_DAY+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+CORP_NM+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+SHIP_AGENT_CONTCR+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+GDS_AGENT+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+GDS_AGENT_CONTCR+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+MAK_DOC_PERS_NM+'</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
						
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="7"  style="font-size:14px;">合同号: '+contrNum+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="7" style="font-size:14px;">量差：'+QTY_POOR+'</TD>';
			htmlString+='</TR>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="7" style="font-size:14px;">重量负差：'+WEIGHT_NGTV_POOR+'</TD>';
			htmlString+='</TR>';

			htmlString+='</TABLE>';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right"  style="font-size:14px;"></TD>';
			htmlString+='</TR>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">货源</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">品名</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">材质</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">规格型号</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">数量(件)</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">重量(吨)</TD>';
			htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">包装</TD>';
			htmlString+='</TR>';					
			for(var i=0;i<invList.length;i++){
				totalSum+=invList[i][4];
				totalWeight+=invList[i][5];				
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i][0]+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+invList[i][1]+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i][2]+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+invList[i][3]+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i][4]+'</TD>';
				htmlString+='<TD height="20" align="center" style="font-size:14px;">'+invList[i][5]+'</TD>';
				htmlString+='<TD height="20" align="center" colspan="2" style="font-size:14px;">'+invList[i][6]+'</TD>';
				htmlString+='</TR>';
			}
			htmlString+='<TR>';
			htmlString+='<TD height="20" colspan="6" align="center" style="font-size:14px;">合计</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+totalSum+'</TD>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;">'+totalWeight+'</TD>';
			htmlString+='<TD height="20" colspan="2" align="center" style="font-size:14px;"></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			

            htmlString+='<TABLE width="50%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" style="font-size:14px;">  </TD>';			
			htmlString+='</TR>';

			htmlString+='</TABLE>';

			for(var i=0;i<labelList.length;i++){
				htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;">&nbsp&nbsp&nbsp</TD>';
				htmlString+='</TR>';					
				htmlString+='</TABLE>';
				
				htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" colspan="10" style="font-size:14px;">'+labelList[i][12]+'，'+labelList[i][13]+'吨，'+'炉号以此为：'+labelList[i][4]+'</TD>';
				htmlString+='</TR>';					
				htmlString+='</TABLE>';
				
				htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;">&nbsp&nbsp&nbsp</TD>';
				htmlString+='</TR>';					
				htmlString+='</TABLE>';
				
				htmlString+='<TABLE width="70%" align=center valign="top" class="" id="PrintB"  border="1" cellpadding="0" cellspacing="0">';
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" colspan="10" style="font-size:14px;">'+ labelList[i][1]+'</br>SIZE（尺寸）：'+labelList[i][2]+'</br>QUALITY（材质） : '
				+labelList[i][3]+'</br>HEAT NUMBER（炉号）：'+labelList[i][4]+'</br>THICKNESS（厚度）：'+labelList[i][5]+'</br>MILL'+"'"+'S NAME：'+labelList[i][6]
	            +'</br>BUNDLE NUMBER：'+labelList[i][8]+'</br>NUMBER OF PCS/BUNDLE（支/件）：'+labelList[i][9]+'</br>'+labelList[i][11]+'</br>COLOUR（颜色）：'+labelList[i][10]+'</TD>';
				htmlString+='</TR>';			
				htmlString+='</TABLE>';
			}
			
           
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right" style="font-size:14px;">  </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
            htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="4" style="font-size:14px;">发货地址：'+DELV_ADDR+'</TD>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">发货人：'+DELV_PERS+'</TD>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">联系电话：'+DELV_PERS_TEL+'</TD>';
			htmlString+='</TR>';

			htmlString+='</TABLE>';

            htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right" style="font-size:14px;">  </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

            htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" colspan="4" style="font-size:14px;">制表：'+MK_TAB_PERS_NM+'</TD>';
			htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">制表日期：'+MK_TAB_DT+'</TD>';
			htmlString+='<TD height="20" align="center" colspan="3" style="font-size:14px;">审核：</TD>';
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