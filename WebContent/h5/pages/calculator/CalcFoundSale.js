//四舍五入函数
function round(num,dec){ 
    var sNum = num + ''; 
    var idx = sNum.indexOf("."); 
    if(idx<0)  
        return num; 
    var n = sNum.length - idx -1; 
    if(dec < n){ 
        var e = Math.pow(10,dec); 
        return Math.round(num * e) / e; 
    }else{ 
        return num; 
    } 
}
  


function calc()
		   {
			
	  //１、	认购费用＝认购金额-认购金额/(1+认购费率)；
	  //２、	净认购金额＝认购金额－认购费用；
	  //３、	认购份数＝净认购金额/基金单位面值；
	  
	  
				var calamount;//认购金额
				var calone; //基金单位净值
				var calrate; //认购费率
				var calmoney;
				var calcmoney;
				var calnumber;
				
				calamount=parseInt(document.getElementById("sdamount").value);
				calone=parseFloat(document.getElementById("sdone").value);
				calrate=parseFloat(document.getElementById("sdrate").value)/100;
				calmoney=round(calamount-calamount/(1+calrate),2); //认购费用
		        calcmoney=calamount-(calamount-calamount/(1+calrate)); //净认购金额
			    calnumber=calcmoney/calone;
			    document.getElementById("sdmoney").value=round(calmoney,2);//aiai 保留两位小数
			    document.getElementById("sdcmoney").value=round(calcmoney,2);//aiai 保留两位小数
			    document.getElementById("sdnumber").value=round(calnumber,2);//aiai 保留两位小数
		   }