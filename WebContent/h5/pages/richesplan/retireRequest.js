
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
	   * 综合投资报酬率=（投资报酬率-通货膨胀率）/（1+投资报酬率）
	   * 退休时应有的财务准备合计= (退休后每年支出–退休后每年收入)
	   * R=综合投资报酬率，T=退休后还活几年
	   * * PPVIFA(报酬率（退休后）, 退休后还活几年)
	   * PPVIFA(R,T)=[1-1/(1+R)^T]/R
	   * 退休后还活几年=预计规划年龄-退休年龄+1
	   * PVIF(R,T)=1/(1+R)^T
	   * 
	   * 退休时准备不足金额=退休时应有的财务准备合计
	   * 单笔投资=退休金现值（单笔投资）=退休时准备不足金额*PVIF（综合报酬率/12，n年*12），n年=投资年限=预计退休年龄 – 当前年龄
	   * 定期定额投资=退休金现值（定期定额投资）=退休时准备不足金额/(PFVIFA（综合报酬率/12，n年*12）)，n年=投资年限=预计退休年龄 – 当前年龄
	   * PFVIFA(R,T)=[(1+R)^T-1]/R
	   */
	  
				var dangqianAge;//当前年龄
				var tuixiuAge; //退休年龄
				var guihuaToAge; //规划到年龄
				var yujitouziRatio;//预计投资报酬率
				var tonghuopengzhangRatio;//通货膨胀率
				var tuixiuOut;//退休后年支出
				var tuixiuIn;//退休后年收入
				
				var restLackMoney;//退休时准备不足金额
				var restSingleMoney;//单笔投资
				var restFixedMoney;//定期定额投资
				var zhFloat;//综合投资报酬率
				var lastYear;//退休后还活几年
				
				dangqianAge = document.getElementById("dangqianAge").value;
				tuixiuAge = document.getElementById("tuixiuAge").value;
				guihuaToAge = document.getElementById("guihuaToAge").value;
				tuixiuOut = parseFloat(document.getElementById("tuixiuOut").value);
				tuixiuIn = parseFloat(document.getElementById("tuixiuIn").value);
				yujitouziRatio = parseFloat(document.getElementById("yujitouziRatio").value)/100;
				tonghuopengzhangRatio = parseFloat(document.getElementById("tonghuopengzhangRatio").value)/100;
				debugger;
				zhFloat = (yujitouziRatio-tonghuopengzhangRatio)/(1+yujitouziRatio);//综合投资报酬率R
				lastYear = guihuaToAge - tuixiuAge + 1;
				restLackMoney=parseFloat(tuixiuOut-tuixiuIn)*PPVIFA(zhFloat, lastYear);
				restSingleMoney = restLackMoney*(PVIF(zhFloat/12, (tuixiuAge-dangqianAge)*12));
				restFixedMoney = restLackMoney/(PFVIFA(zhFloat/12, (tuixiuAge-dangqianAge)*12));
				
			    document.getElementById("restLackMoney").value=Math.round(restLackMoney*100)/100;//aiai 保留两位小数
			    document.getElementById("restSingleMoney").value=Math.round(restSingleMoney*100)/100;//aiai 保留两位小数
			    document.getElementById("restFixedMoney").value=Math.round(restFixedMoney*100)/100;//aiai 保留两位小数
			    
		   }