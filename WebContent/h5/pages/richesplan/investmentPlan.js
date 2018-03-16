//保障需求计算
	    
function jisuan()
{
	var countWay = document.getElementById("shifou").value;//是否继续投资1是 2否
	//countWay=1
	var danbitouru = parseFloat(document.getElementById("danbitouru").value);//单笔投入金额
	var dingtoujine = parseFloat(document.getElementById("dingtoujine").value);//定期定额月投入金额
	var danbiqixian = document.getElementById("danbiqixian").value;//投资期限
	var dingtouqixian = parseFloat(document.getElementById("dingtouqixian").value);//定额定额投入期数
	var yujitouziRatio = parseFloat(document.getElementById("yujitouziRatio").value)/100;//投资回报率
	
	//countWay=2
	var jixutouziRatio = parseFloat(document.getElementById("jixutouziRatio").value)/100;//预计年通货膨胀率
	var lingquqishu = document.getElementById("lingquqishu").value;//收入增长率
	
	
	debugger;
	switch (countWay)
	{
		case "1"://等额还款
			result=ECorpus(danbitouru, dingtoujine, danbiqixian, danbiqixian, dingtouqixian, yujitouziRatio,
					jixutouziRatio, lingquqishu);
			break;
		case "2"://等本还款
			result=CalcLoanPay(danbitouru, dingtoujine, danbiqixian, danbiqixian, dingtouqixian, yujitouziRatio);
			break;
	}
	//return result;
}
		
//---------------------公用部分-----------------------------------------
/**
 * 单笔投资：PV							danbitouru
 * 定期定额投资：（年数：N，月金额：PMT）N<=T		PMT=dingtoujine		N=dingtouqixian
 * 投资期限 ： T						danbiqixian
 * 投资报酬率：R							yujitouziRatio
 * 继续投资报酬率  R1						jixutouziRatio
 * FV单=PV单*（1+R）的T次方				FV_1
 * FV定期结束=PMT*(（1+R/12）的12N次方-1）*（1+R/12）	FV_2
 * FV定期期末=FV定期结束*（1+R）的T-N次方		FV_3
 * FV单+FV定期期末=FV	规划到期资金
 * 
 * 是否继续投资
 * 否 FV/N1		未用到
 * 是 C=12*FV/R1[1-1/(1+R1/12)的N1次方]		每期可领取金额金额
 */
function CalcLoanPay(danbitouru, dingtoujine, danbiqixian, dingtouqixian, yujitouziRatio)
{
	//声明倍数变量
	var guihuadaoqizijin = 0;//规划到期资金
	if (danbitouru == '' || danbitouru == null) {
		danbitouru = 0;
		danbiqixian = 0;
	}
	if (dingtoujine == '' || dingtoujine == null) {
		dingtoujine = 0;
		dingtouqixian = 0;
	}
	
	var FV_1 = danbitouru*(Math.pow(1+yujitouziRatio, yujitouziRatio));
	var a = 1+yujitouziRatio/12;
	var b = Math.pow(a, 12*dingtouqixian)-1;
	var FV_2 = dingtoujine*b*a;
	var FV_3 = FV_2*Math.pow(1+yujitouziRatio, danbiqixian-dingtouqixian);
	guihuadaoqizijin = FV_1 + FV_3;
	
	document.getElementById("guihuadaoqizijin").value = Math.round(guihuadaoqizijin*100)/100;
	
}
	
/**
 * 单笔投资：PV							danbitouru
 * 定期定额投资：（年数：N，月金额：PMT）N<=T		PMT=dingtoujine		N=dingtouqixian
 * 投资期限 ： T						danbiqixian
 * 投资报酬率：R							yujitouziRatio
 * 继续投资报酬率  R1						jixutouziRatio
 * FV单=PV单*（1+R）的T次方				FV_1
 * FV定期结束=PMT*(（1+R/12）的12N次方-1）*（1+R/12）	FV_2
 * FV定期期末=FV定期结束*（1+R）的T-N次方		FV_3
 * FV单+FV定期期末=FV	规划到期资金
 * 
 * 是否继续投资
 * 否 FV/N1		未用到
 * 是 C=12*FV/R1*[1-1/(1+R1/12)的N1次方]		每期可领取金额金额		按先后顺序计算
 */
function ECorpus(danbitouru, dingtoujine, danbiqixian, dingtouqixian, yujitouziRatio,
		jixutouziRatio, lingquqishu)
{
	//声明倍数变量
	var guihuadaoqizijin = 0;//规划到期资金
	var meiqiallowmoney = 0;//每期可领取金额金额
	if (danbitouru == '' || danbitouru == null) {
		danbitouru = 0;
		danbiqixian = 0;
	}
	if (dingtoujine == '' || dingtoujine == null) {
		dingtoujine = 0;
		dingtouqixian = 0;
	}
	
	var FV_1 = danbitouru*(Math.pow(1+yujitouziRatio, yujitouziRatio));
	var a = 1+yujitouziRatio/12;
	var b = Math.pow(a, 12*dingtouqixian)-1;
	var FV_2 = dingtoujine*b*a;
	var FV_3 = FV_2*Math.pow(1+yujitouziRatio, danbiqixian-dingtouqixian);
	guihuadaoqizijin = FV_1 + FV_3;
	var d = 1+jixutouziRatio/12;
	var f = Math.pow(d, lingquqishu);
	var g = 1-1/f;
	var h = guihuadaoqizijin*12/jixutouziRatio;
	meiqiallowmoney = h*g;
	
	document.getElementById("guihuadaoqizijin").value = Math.round(guihuadaoqizijin*100)/100;
	document.getElementById("meiqiallowmoney").value = Math.round(meiqiallowmoney*100)/100;
	
}

