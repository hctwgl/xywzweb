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
	//alert(tablelist.length);
	submittable = tablelist.PrintA;
	//alert(submittable);
	for(var i=0;i<tablelist.length;i++){
		if(tablelist[i].name == tableName){
			submittable = tablelist[i];
			//break;
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
<INPUT onclick=javascript:printit() type=button  width=150 value="   外贸合同  打 印   " name=button_print class="Noprint"/>
<input type="button" value="导出到Excel"  onClick="AllAreaExcel('cardInfo')" class="Noprint">
<INPUT type="button" width=150 value="  关 闭   " onclick=javascript:closeWindows() class="Noprint">  



</DIV>
<DIV align=left name="cardInfo" id="PrintA">

	<TABLE width="90%" align=center id="PrintA" border=0  cellpadding="0" cellspacing="0" >
		<TR>
			<TD height="40" align="center" colspan="15" style="font-size:22px;FONT-FAMILY:\'Times New Roman\';"><b>SALES CONTRACT</B></TD>
		</TR>		
	</TABLE>

	<div id="grades" width="100%" text-align="center"></div>
	<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">

		<TR>
			<TD height="20" align="right" colspan="8" style="font-size:14px;"></TD>
			<TD height="20" align="right" colspan="7" style="font-size:14px;"></TD>
		</TR>
		<TR>
		<TD colspan="15"><hr/></TD>
		
		</TR>
			
		<TR>
			<TD height="20" align="left" style="font-size:14px;"  colspan="15" id = 'filecontract'>FILE CONTACT:&nbsp;&nbsp;</TD>
		
		</TR>		
		<TR>
		<B>
			<TD height="20" align="left" style="font-size:14px;" id ='contrNum' colspan="15">合同号 CONTRACT NO签约日期</TD>
		</B>
		</TR>
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id= 'seller' colspan="15" >卖方：秦皇岛市国阳进出口贸易有限公司</br></TD>
       </TR>
        <TR>
            <TD height="20" align="left" style="font-size:14px;" id= 'seller_en' colspan="15">The Seller：</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id = 'buyer' colspan="15">买方:&nbsp;&nbsp;</TD>
		</TR>		
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id ='CUST_FULL_NM' colspan="15">The Buyer: &nbsp;&nbsp;</TD>
		</TR>
					
	<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="15">
		
		本合同由双方订立。根据本合同规定的条款，买方同意购买下列货物：	</br>			
This Contract is made by and between the Seller and the buyer ,where by agrees to sell and the </br>				
Buyer agrees to buy the under mentioned commodity according to the terms and conditions		</br>		
stipulated below: 	
&nbsp;&nbsp;</TD>			
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id="hscodes" colspan="15">1.商品名称  Material: &nbsp;&nbsp;</TD>
		</TR>		
			<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="15">

            2.货物描述	 </br>	
   见附页1,	附页为本合同的一个组成部分	</br>
   According addendum No.1 Which is an integral part of the present contract	
             &nbsp;&nbsp;
             </TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id ="totalSum" colspan="15">3. 重量  &nbsp;&nbsp;</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id="ngtvPoor" colspan="15"></TD>
		</TR>	
		
				<TR>
			<TD height="20" align="left" style="font-size:14px;" id="pkg" colspan="15">5. 包装Packing：  &nbsp;&nbsp;</TD>
		</TR>	
				<TR>
			<TD height="20" align="left" style="font-size:14px;" id ="shipmark" colspan="15">6. 唛头　Shipping Mark:  &nbsp;&nbsp;</TD>
		</TR>	
				<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="15">7. 单价 UNIT PRICE：SEE ADDENDUM NO.1  &nbsp;&nbsp;</TD>
		</TR>	
		
					<TR>
			<TD height="20" align="left" style="font-size:14px;" id="payment" colspan="15">8. 付款方式 PAYMENT:  &nbsp;&nbsp;</TD>
		</TR>	
		
					<TR>
			<TD height="20" align="left" style="font-size:14px;" id="timeshipment" colspan="15">9. 装运期Time of Shipment：  &nbsp;&nbsp;</TD>
		</TR>	
		
					<TR>
			<TD height="20" align="left" style="font-size:14px;" id="loadport" colspan="15">10. 装运港Port of Loading：ANY PORT, CHINA   &nbsp;&nbsp;</TD>
		</TR>	
		
					<TR>
			<TD height="20" align="left" style="font-size:14px;" id="dischargeport" colspan="15">11.目的港 Port of Destination:  &nbsp;&nbsp;</TD>
		</TR>	
					
					<TR>
			<TD height="20" align="left" style="font-size:14px;" id="advisbank" colspan="15">12.通知行Advising Bank :  &nbsp;&nbsp;</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id="moreless" colspan="15">13.溢短装 More or Less: Shipment Quantity +/-10% More or Less Allowed  &nbsp;&nbsp;</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" id="needdoc" colspan="15">
			14.所须单证, Documents	</br>		
 -Commercial Invoice			</br>
 -Full Set (3/3) Clean on Board B/L		</br>	
 -Packing List			</br>
 -Mill Test Certificate 			</br>
 -Certificate of Origin By CCPIT		</br>	
 -CIQ certificate			</br>
About Insurance:seller should manage insurance all risk,claim payble in uae,currency usd.	</br>		
Remarks:Third party inspection allowed			
 &nbsp;&nbsp;</TD>

		</TR>	
		
       <TR class="PageNext"></TR>
       
		
		<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="15">
15. 不可抗力Force Majcure:			</br>
卖方由于不可抗力，未能在本合同规定期限内装运或不能交货，则不承担责任。卖方应立即		</br>	
以电传或传真通知买方，如果买方提出要求，卖方应以挂号函件向买方提供由中国国际贸易	</br>		
促进委员会或有关机关出具的证明，证明上述事故的存在			</br>
The Seller shall not be held responsible if they owing to Force Majeure cause fail to make delivery </br>			
within the time stipulated in the contract or cannot deliver the goods.However in such case,the 	</br>		
Seller shall inform the Buyer immediately by telex or fax and if it is requested by the Buyer.shall </br>			
also deliver to the Buyer by registered letter,a certificate attacsting the existence of such a cause 	</br>		
issued by the China Council for the Promotion if International Trade or by a compectent autbority	</br>		
16.异议索赔：Discrepancy And Claim:			</br>
如果货到目的口岸后买方对数量/品质有异议，可以凭卖方同意的公证机构出具的检验报告，</br>
在货到目的口岸45天内向买方提出异议。如果买方不能在合同规定期限内将信用证开到。</br>
或者开来的信用证不符合合同规定，而在接到卖方通知后不能及时办妥修正，卖方可以撤消</br>
合同或延期交货，并有权提出索赔要求。</br>
In case discrepancy on the quantity/quality of the goods is found by the Buyer after arrival of the </br>
goods at the port of distination,the Buyer may within 45days after arrival of the goods at the port </br>
of desination,Lodge with Seller a claim  which should be supported by an inspection Certificate issued</br>
 by a public surveyor approved by the Seller.In case the Letter of Credit dose not correspond to the </br>
Contract terms and the Buyer fails to amend in time after its receipt of the notification form the </br>
Seller sha6ll have the Right to cancel the Contract or to delay the deliver of the goods and shall have</br>
also the right to claim for compensation of losses against the Buyer.</br>			
17. 仲裁：Arbitration:			</br>
凡因执行本合同或有关本合同所发生的一切争执，双方协商解决。如果协商不能解决，应提		</br>	
交北京中国国际经济贸易仲裁委员会，根据其仲裁规则进行仲裁，仲裁裁决是终局的，对双	</br>		
方均有约束力。除非另有规定外。仲裁费用均有败诉方负担。		</br>	
All disputes arising form the execution of this contract,or in connection with this Contract,shall be </br>			
settled through negotiation incase no settlement can be reached through negotiation,the case shall 	</br>		
then be submitted to the China international Economic & trade Arbitration commission,Beijing,for </br>			
arbitration in accordance with the Commission’s Rules of Procedure.The award rendered by the </br>		
Commission shall be final and binding on both parties.		</br>	
18. 本合同正本共两份，采用中英文书就，两种文字具有同等效力，签字后双方各执一份为			</br>
凭。任何一方在未取得书面同意前，无权将本合同规定之权利及义务转让给第三者。			</br>
This Contract is made in two originals in both Chinese and English,both versions being equally 	</br>		
authentic .Each party keeps one original of the two after signing the Contract .Neither party is </br>			
entitiled to teansfer its right and obligation under this Contract to a third party before obtaining a 	</br>		
written consent forth the other party.		</br>	


  &nbsp;&nbsp;</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="15">19.备注 REMARK	</br>		
由于国家政策变动而产生的不可抗力（征税政策调整），导致成本增加，价格变化，		</br>	
双方各承担50%，如协商不一致，合同将自动失效。			</br>
Any risk caused by the government changing the policy(increase the tax duty rate during our contract being</br>  			
processed),the cost and the price will change accordingly,the case shall be settled through negotiation	</br>		
50% by seller and buyer separately in case no settlement can be reached through negotiation,	</br>		
the contract will  cease to have effect.	</br>		
  &nbsp;&nbsp;</TD>
		</TR>	
		<TR>
			<TD height="20" align="left" style="font-size:14px;" colspan="7">   卖方： The Seller：
  &nbsp;&nbsp;</TD>
  <TD height="20" align="left" style="font-size:14px;" colspan="8">   	买方：The Buyer：
  &nbsp;&nbsp;</TD>
		</TR>
					
	</TABLE>
<div id="addendum" width="100%" text-align="center"></div>


<script type="text/javascript" >

	<%
	String sheetId = request.getParameter("sheetId")+"";
	
	out.println(" var sheetId = \""+sheetId+"\""	);
	%>
	
		Ext.Ajax.request({
		params:{
			'sheetId':sheetId
		},		
		  url:basepath+"/XywzSaleFrgnOrdrContrprintAction!xywzSaleFrgnOrdrContrPrint.json",
		method:'GET',
		async:false,
		success:function (response){	
		var jsonData = Ext.decode(response.responseText);
			var CONTR_NUM=jsonData.CONTR_NUM;
			var EMAIL=jsonData.EMAIL;
			var SIGNDT=jsonData.SIGN_DT;
			var SELLER=jsonData.F_VALUE;
			var CUST_SHT_NM=jsonData.CUST_SHT_NM;
			var F_COMMENT=jsonData.F_COMMENT;
			var CUST_FULL_NM=jsonData.CUST_FULL_NM;

			var invList=jsonData.xywzSaleInvMerchdDtl;
			var ngtvPoor=jsonData.NGTV_POOR;
			var pkg=jsonData.PKG;
			var shipmark=jsonData.SHIPPINGMARKS;
			var brgnMode=jsonData.BRGN_MODE;
			var brgnModeDetail=jsonData.BRGN_MODE_DETAIL;
			var payment=jsonData.PAY_MD;
			var finalday=jsonData.FINAL_TRAFF_DAY;//最后装运日
			var timeshipment=jsonData.FINAL_TRAFF_DETAIL;//最后装运描述
			var loadport=jsonData.LOAD_TRAFF_PORT;
			var dischargeport=jsonData.DISCHARGE_PORT;
			var advisbank=jsonData.ADVIS_BANK;
			var moreless=jsonData.MORE_OR_LESS;
			var needdoc=jsonData.NEED_DOC;
			var cur=jsonData.CUR;
			var merchdnm=jsonData.MERCHD_NM;
			var bizhong='';
			if(cur=='USD'){
			  bizhong='US$';
			}else if(cur=='CNY'){
			  bizhong='CN￥';
			}
			
			
			var htmlString='';
			var totalSum=0;
			var totalAmt=0;
            var subSum=0;
            var subAmt=0;
            var hscodes='';
            var singleMerch=0;
            var merchChange=0; //商品类型变化标志 
            
			
			
			document.getElementById("contrNum").innerText='合同号 CONTRACT NO. '+CONTR_NUM+'   签约日期 DATE:'+SIGNDT;
			document.getElementById("filecontract").innerText='FILE CONTACT:'+EMAIL;			
			document.getElementById("seller").innerText='卖方  : '+SELLER;	
			document.getElementById("buyer").innerText='买方: '+CUST_SHT_NM;	
			document.getElementById("seller_en").innerText='The Seller: '+F_COMMENT;
			document.getElementById("CUST_FULL_NM").innerText='The Buyer: '+CUST_FULL_NM;
			document.getElementById("ngtvPoor").innerText='4.'+ngtvPoor;
			document.getElementById("pkg").innerText='5.包装Packing:'+pkg;
			document.getElementById("shipmark").innerText='6. 唛头　Shipping Mark:'+shipmark;
			document.getElementById("payment").innerText='8. 付款方式 PAYMENT:\r'+payment;
			document.getElementById("timeshipment").innerText='9. 装运期Time of Shipment：\r'+timeshipment;
			document.getElementById("loadport").innerText='10. 装运港Port of Loading：'+loadport;
			document.getElementById("dischargeport").innerText='11. 目的港Port of Destination：'+dischargeport;
			document.getElementById("advisbank").innerHTML='12.通知行Advising Bank : </br>'+advisbank;
			document.getElementById("moreless").innerText='13.溢短装 More or Less:'+moreless;
			document.getElementById("needdoc").innerText='14.所须单证, Documents:\r '+needdoc;

    		htmlString+='<div class="PageNext"></div>';
    		htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">';	
			htmlString+='<TR>';
			htmlString+='<TD height="20" align="center" style="font-size:14px;" colspan="15"><B>ADDENDUM NO.1 TO CONTRACT '+CONTR_NUM+'</B></TD>';
			htmlString+='</TR>';
    		htmlString+='</TABLE>';
    		
    		htmlString+='<TABLE width="90%" align=center valign="top" class="" id="PrintC" border=0  cellpadding="0" cellspacing="0">';		

            
            			htmlString+='<TR>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6"><B>SIZE</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3"><B>QTY(TON)</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3"><B>UNIT PRICE(USD/TON)</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3"><B>AMOUNT</B></TD>';
						htmlString+='</TR>';
						htmlString+='<TR>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6"></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3"></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3"><B>'+brgnMode+' '+brgnModeDetail+'</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+cur+'</TD>';
						htmlString+='</TR>';
				
			for(var i=0;i<invList.length;i++){
		        totalSum+=invList[i].qty;
				totalAmt+=invList[i].qty*invList[i].uprc*invList[i].usdRat;

				if(merchChange==0){
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="15">'+invList[i].hsCode+'</TD>';
				htmlString+='</TR>';
				
				if (invList[i].weightTolerance!=''){
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="15">'+invList[i].weightTolerance+'</TD>';
				htmlString+='</TR>';
				}
				
				if (invList[i].lengthTolerance!=''){
					htmlString+='<TR>';
					htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="15">'+invList[i].lengthTolerance+'</TD>';
					htmlString+='</TR>';
				}
				if (invList[i].depthTolerance != ''){
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="15">'+invList[i].depthTolerance+'</TD>';
				htmlString+='</TR>';
				}
				}
				//每种只有第一轮打印  
				merchChange=1;
				
				htmlString+='<TR>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6">'+invList[i].model+'X'+invList[i].len+'M'+'</TD>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+invList[i].qty+'</TD>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+bizhong+invList[i].uprc*invList[i].usdRat+'</TD>';
				htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+bizhong+invList[i].qty*invList[i].uprc*invList[i].usdRat+'</TD>';
			    htmlString+='</TR>';
			    
			    
			    //品名负差变换则重新计算分支的汇总
			    subSum+=invList[i].qty;
				subAmt+=invList[i].qty*invList[i].uprc*invList[i].usdRat;
                if(invList[i+1] != null){
					if(invList[i].hsCode != invList[i+1].hsCode){
						htmlString+='<TR>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6"><B>SUB TOTAL</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+subSum+'</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">-</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+bizhong+subAmt+'</TD>';
						htmlString+='</TR>';
						
						subSum=0;
						subAmt=0;
						//计算商品名称
						hscodes+=invList[i].hsCode+',';
						singleMerch+=1;
						merchChange=0; //新商品恢复打印 
					}
				 }else{
				        if(singleMerch>0){
				 		htmlString+='<TR>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6"><B>SUB TOTAL</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+subSum+'</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">-</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+bizhong+subAmt+'</TD>';
						htmlString+='</TR>';
				       }
						//计算商品名称
						hscodes+=invList[i].hsCode;
				 
				 }
			}
		
						htmlString+='<TR>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="6"><B>TOTAL</B></TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+totalSum+'</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">-</TD>';
						htmlString+='<TD height="20" align="left" style="font-size:14px;" colspan="3">'+bizhong+totalAmt+'</TD>';
						htmlString+='</TR>';
			htmlString+='</TABLE>';
			
			document.getElementById("totalSum").innerText='3.重量： QUANTITY:'+totalSum+'MT';
			if(merchdnm != null){
				document.getElementById("hscodes").innerText='1.商品名称  Material: '+merchdnm;
			}else{
			    document.getElementById("hscodes").innerText='1.商品名称  Material: '+hscodes;
				}
			
			document.getElementById("addendum").innerHTML=htmlString;
					
		}
	});

	</script>
</div>
</DIV>
</body>
</html>