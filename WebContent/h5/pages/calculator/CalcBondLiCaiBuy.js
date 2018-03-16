
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
//保留两位小数
function toDecimal2(x) {   
    var f = parseFloat(x);   
    if (isNaN(f)) {   
        return false;   
    }   
    var f = Math.round(x*100)/100;   
    var s = f.toString();   
    var rs = s.indexOf('.');   
    if (rs < 0) {   
        rs = s.length;   
        s += '.';   
    }   
    while (s.length <= rs + 2) {   
        s += '0';   
    }   
    return s;   
}
function CalcBondBuy(oDocument)
{
		// 认购金额额：元（正整数；无默认值）
		var Cost=0;
		
		//  年化收益率： %（正数，保留两位小数；债券种类为贴现，则不显示；无默认值）
		var Rate=0;
		
		// 计息基础：（正整数；无默认值）
		var BuyPrice=0;
		
		//期限：年（正整数）
		var Years=0;
		
		
		///	认购日期：年/月/日
		var BuyDate= new Date();
		/// 债券每年的利息支付频率: 　  次，正整数
		var Freq=0;
		/// options  1、贴现债券
		///		    2、到期一次还本付息债券 
		///         3、固定利率附息债券和浮动利率债券
var w,m;
var pv,x,s,e,isetp,ret=0;
var CurrDate=new Date();

		if(this.document.all.ddlIncomeType.value==0){
			options=0; //万
		}else if(this.document.all.ddlIncomeType.value==2){
			options=2; //千
		}else if(this.document.all.ddlIncomeType.value==3){
			options=3;  //全额
		}
		
		Cost=parseFloat(document.getElementById("edCost").value);
		BuyPrice=parseFloat(document.getElementById("edPrice").value);
		Years=parseInt(document.getElementById("edYear").value);
		Rate=parseFloat(document.getElementById("edRate").value)/100;
		
			switch(options)
			{
				case 0:   //万
					//ret=(Cost-BuyPrice*1.0)/(BuyPrice*Years);
					debugger;
					wr = (10000*Years*Rate*1.0)/BuyPrice;
					wret = round(wr,2);
					ret = (Cost/10000)*wret;
					break;
				case 2:    //千
					//ret= Math.pow((Cost+Years*Cost*Rate)/BuyPrice,1.0/Years)-1;
					qret = round((1000*Years*Rate)/BuyPrice,2);
					ret = (Cost/1000)*qret;
					break;
				case 3:
					ret = (Cost*Years*Rate)/BuyPrice; //全额
					break;
			}
			document.getElementById("lbResult").value = toDecimal2(round(ret,2));
		}
		
		function Calc(x,w,m,Cost,Rate,Freq)
		{
			var y=0;
			for (i=w;i<=w+m-1;i++)
				y=y+(Cost*Rate/Freq)/Math.pow((1+x/Freq),i);
			y=y+(Cost/Math.pow((1+x/Freq),(w+m-1)));
			return y;
		}