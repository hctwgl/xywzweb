
function PPVIFA(R, T) {
	var a = Math.pow(1+R, T);
	var b = 1 - 1/a;
	return b/R;
}
  
function PVIF(R, T) {
	var a = Math.pow(1+R, T);
	return 1/a;
}

function PFVIFA(R,T) {
	var a = Math.pow(1+R, T);
	return (a - 1)/R;
}

function calc()
		   {
	  /**
	   * 综合投资报酬率=（投资报酬率-通货膨胀率）/（1+投资报酬率） R
	   * T=教育年限
	   * 年支出*(PPVIFA(R,T)=[1-1/(1+R)^T]/R)=大学所需费用
	   * R=综合投资报酬率
	   * 大学单笔（一次性投入金额）=大学所需费用*PVIF（综合报酬率/12，n年*12）
	   * PVIF(R,T)=1/(1+R)^T
	   * 大学所需费用/(PFVIFA（综合报酬率/12，n年*12）)
	   * n年=投资年限=几年后上学
	   * PFVIFA(R,T)=[(1+R)^T-1]/R
	   * 
	   */
				var lastAge;//几年后上学
				var educateYear; //教育年限
				var eduJinOut; //教育金年支出
				var yujitouziRatio;//预计投资报酬率
				var tonghuopengzhangRatio;//通货膨胀率
				
				var restSingleMoney;//单笔投资
				var restFixedMoney;//定期定额投资
				var zhFloat;//综合投资报酬率
				
				lastAge = document.getElementById("lastAge").value;
				educateYear = document.getElementById("educateYear").value;
				eduJinOut = parseFloat(document.getElementById("eduJinOut").value);
				yujitouziRatio = parseFloat(document.getElementById("yujitouziRatio").value)/100;
				tonghuopengzhangRatio = parseFloat(document.getElementById("tonghuopengzhangRatio").value)/100;
				debugger;
				zhFloat = (yujitouziRatio-tonghuopengzhangRatio)/(1+yujitouziRatio);//综合投资报酬率R
				
				restSingleMoney = PPVIFA(zhFloat,educateYear)*eduJinOut*PVIF(zhFloat/12, lastAge*12);
				restFixedMoney = (PPVIFA(zhFloat,educateYear)*eduJinOut)/PFVIFA(zhFloat/12, lastAge*12);
				
			    document.getElementById("restSingleMoney").value=Math.round(restSingleMoney*100)/100;//aiai 保留两位小数
			    document.getElementById("restFixedMoney").value=Math.round(restFixedMoney*100)/100;//aiai 保留两位小数
			    
		   }