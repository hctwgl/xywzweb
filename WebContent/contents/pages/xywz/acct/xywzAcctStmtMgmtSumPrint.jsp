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
			<TD height="40" align="center" colspan="15" style="font-size:22px;FONT-FAMILY:\'Times New Roman\';">秦皇岛市国阳进出口贸易有限公司出口货物汇算表</TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
			<TD height="20" align="right" colspan="2" style="font-size:14px;"></TD>
		</TR>
		<TR>
		
		<TR>
		</TR>												
	</TABLE>
	<script type="text/javascript" >
	Ext.Ajax.request({
		url:basepath+"/XywzAcctStmtMgmtSumPrintAction!getInvInfo.json",
		method:'GET',
		async:false,	
		success:function (response){	
		    var jsonData = Ext.decode(response.responseText);
		    var time = new Date( ); //获得当前时间
			var totalSum=0;
			var totalQty=0;	
			var totalAmt=0;	
			var totalSumAdd=0;
			var totalQtyAdd=0;	
			var totalAmtAdd=0;		
			var blank=' ';	
			var invList = jsonData.acctStmtMgmtSum;
			var htmlString='';
			var year = time.getYear( );//获得年
			var month = time.getMonth( )+1;//获得月
			var day = time.getDate( ); //获得日		
			//DecimalFormat df1 = new DecimalFormat("0.00");    				
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="15" style="font-size:14px;">截止到 '+year+'年'+month+'月'+day+'日</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]!='5') {
					totalSum+=invList[i][4];
					totalQty+=invList[i][5];
					totalAmt+=invList[i][7];
					if (invList[i][3]!='钢管支架') {
						totalSumAdd+=invList[i][4];
						totalQtyAdd+=invList[i][5];
						totalAmtAdd+=invList[i][7];
					}	
				}	
			}
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;">累计出口：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSum+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQty+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</u></TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmt+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">@&nbsp;&nbsp;</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+Math.round((totalAmt/totalQty)*100)/100+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">其中：</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>含钢管支架</u>：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSumAdd+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQtyAdd+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmtAdd+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="right"  style="font-size:14px;"> </TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			var totalSumAdd=0;
			var totalQtyAdd=0;	
			var totalAmtAdd=0;
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">一、已报关报检、提单未回：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]=='1') {
					htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
					htmlString+='<TR>';
					htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][2]+'</u>&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
					htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][4]+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][5]+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][7]+'</u></TD>';
					htmlString+='</TR>';
					htmlString+='</TABLE>';
					
					totalSumAdd+=invList[i][4];
					totalQtyAdd+=invList[i][5];
					totalAmtAdd+=invList[i][7];
				}	
			}
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>合计</u>：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSumAdd+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQtyAdd+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmtAdd+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			var totalSumAdd=0;
			var totalQtyAdd=0;	
			var totalAmtAdd=0;
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">二、已交单、未回款：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]=='2') {
					htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
					htmlString+='<TR>';
					htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][3]+'</u>&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
					htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][4]+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][5]+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][7]+'</u></TD>';
					htmlString+='</TR>';
					htmlString+='</TABLE>';
					
					totalSumAdd+=invList[i][4];
					totalQtyAdd+=invList[i][5];
					totalAmtAdd+=invList[i][7];
				}	
			}
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>合计</u>：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSumAdd+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQtyAdd+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmtAdd+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			var totalSumAdd=0;
			var totalQtyAdd=0;	
			var totalAmtAdd=0;
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">三、已押汇、未回款：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]=='3') {
					htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
					htmlString+='<TR>';
					htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;">'+invList[i][1]+'&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
					htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][5]+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][7]+'</u></TD>';
					htmlString+='</TR>';
					htmlString+='</TABLE>';
					
					totalSumAdd+=invList[i][4];
					totalQtyAdd+=invList[i][5];
					totalAmtAdd+=invList[i][7];
				}	
			}
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>合计</u>：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSumAdd+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQtyAdd+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmtAdd+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			var totalSumAdd=0;
			var totalQtyAdd=0;	
			var totalAmtAdd=0;
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">四、已回款、报关单未回：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]=='4') {
					htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
					htmlString+='<TR>';
					htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;">'+invList[i][1]+'&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
					htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][5]+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+invList[i][7]+'</u></TD>';
					htmlString+='</TR>';
					htmlString+='</TABLE>';
					
					totalSumAdd+=invList[i][4];
					totalQtyAdd+=invList[i][5];
					totalAmtAdd+=invList[i][7];
				}	
			}
			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
			htmlString+='<TR>';
			htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
			htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;"><u>合计</u>：</TD>';
			htmlString+='<TD width="5%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalSumAdd+'</u>&nbsp;&nbsp;&nbsp;票</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">重量：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalQtyAdd+'</u>&nbsp;&nbsp;&nbsp;吨</TD>';
			htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">金额：</TD>';
			htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;"><u>'+totalAmtAdd+'</u></TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';

			htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="left" colspan="3" style="font-size:14px;">五、预收货款：</TD>';
			htmlString+='</TR>';
			htmlString+='</TABLE>';
			for(var i=0;i<invList.length;i++){
				if (invList[i][0]=='5') {
					htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintB"  border="0" cellpadding="0" cellspacing="0">';
					htmlString+='<TR>';
					htmlString+='<TD width="10%" height="20" align="justify" colspan="3" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="25%" height="20" align="right" colspan="2" style="font-size:14px;">'+invList[i][1]+'&nbsp;&nbsp;&nbsp;&nbsp;</TD>';
					htmlString+='<TD width="5%" height="20" align="right" colspan="2"  style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="10%" height="20" align="right" colspan="2" style="font-size:14px;">&nbsp;</TD>';
					htmlString+='<TD width="20%" height="20" align="right" colspan="2" style="font-size:14px;">'+invList[i][6]+'</TD>';
					htmlString+='<TD width="10%" height="20" align="left" colspan="2" style="font-size:14px;">'+invList[i][7]+'</TD>';
					htmlString+='</TR>';
					htmlString+='</TABLE>';
				}	
			}

			document.getElementById("grades").innerHTML=htmlString;
			
		}
		
	});
	</script>
</div>
</DIV>
</body>
</html>