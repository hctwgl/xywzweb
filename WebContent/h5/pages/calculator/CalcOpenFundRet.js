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
{   //１、赎回总额（元）＝赎回份数（份）×基金单位净值（元）；
	//２、赎回费用（元）＝赎回总额（元）*赎回费率（%）；
	//３、净赎回金额（元）＝赎回总额（元）－赎回费用(元)；


	var valprice; //基金单位净值(元)
	var valunit; //赎回份数
	var valrate; //赎回费率(%)
	var valsum;
	var valfeiy;
	var valjsh;

	valprice=document.getElementById("edprice").value;
	valunit=document.getElementById("edunit").value;//赎回份数
	valrate=document.getElementById("edrate").value/100;
	
    valsum=valunit*valprice; //赎回总额（元）
    valfeiy=valsum*valrate; //赎回费用（元）
    valjsh=valsum-valfeiy; //净赎回金额
   
    //return Round(price*unit*(1-rate/100));
    
    document.getElementById("edsum").value=round(valsum,2);//aiai 保留两位小数
    document.getElementById("edfeiy").value=round(valfeiy,2);//aiai 保留两位小数
    document.getElementById("edjsh").value=round(valjsh,2);//aiai 保留两位小数

}