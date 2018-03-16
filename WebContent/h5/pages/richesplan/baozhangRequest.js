//保障需求计算
	    
function jisuan()
{
	var countWay = document.getElementById("ddlIncomeType").value;//计算方式 1年收入倍数法 2生命价值法 3家属需要法
	//countWay=1
	var age = document.getElementById("age").value;//年龄
	var tuixiuAge = document.getElementById("tuixiuAge").value;//退休年龄
	var yearIncome = parseFloat(document.getElementById("yearIncome").value);//年收入
	var yearOut = parseFloat(document.getElementById("yearOut").value);//年支出
	var yiyoubaozhang = parseFloat(document.getElementById("yiyoubaozhang").value);//已有保障
	
	//countWay=2
	var tonghuopengzhangRatio = parseFloat(document.getElementById("tonghuopengzhangRatio").value)/100;//预计年通货膨胀率
	var incomeAddRatio = parseFloat(document.getElementById("incomeAddRatio").value)/100;//收入增长率
	var touzihuibaoRatio = parseFloat(document.getElementById("touzihuibaoRatio").value)/100;//投资回报率
	
	//countWay=3
	var zinvEducation = parseFloat(document.getElementById("zinvEducation").value);//子女教育金现值
	var jiashutuixiu = parseFloat(document.getElementById("jiashutuixiu").value);//家属退休金缺口现值
	var jiashulifeque = parseFloat(document.getElementById("jiashulifeque").value);//家属生活费用年缺口
	var dangqianfuzhai = parseFloat(document.getElementById("dangqianfuzhai").value);//当前负债
	var weilaiOneOut = parseFloat(document.getElementById("weilaiOneOut").value);//未来一次性支出(丧葬费)
	var shouxianJin = parseFloat(document.getElementById("shouxianJin").value);//寿险现金价值
	var liudongZichan = parseFloat(document.getElementById("liudongZichan").value);//流动资产输入
	var touzixingZichan = parseFloat(document.getElementById("touzixingZichan").value);//投资性资产
	var jinjibeiyong = parseFloat(document.getElementById("jinjibeiyong").value);//紧急备用金(三个月的支出)
	var lifeFeiRatio = parseFloat(document.getElementById("lifeFeiRatio").value)/100;//生活费用成长率
	var baoxianjinRatio = parseFloat(document.getElementById("baoxianjinRatio").value)/100;//取得保险金后的报酬率
	
//	var kebianxian = document.getElementById("kebianxian").value;//可变现公允价值(不含寿险现金价值)
//	var jiashulifexian = document.getElementById("jiashulifexian").value;//家属生活费用现值
	
	debugger;
	switch (countWay)
	{
		case "1"://等额还款
			result=CalcLoanPay(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang);
			break;
		case "2"://等本还款
			result=ECorpus(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang, tonghuopengzhangRatio, incomeAddRatio,
					touzihuibaoRatio);
			break;
		case "3"://一次性还本付息
			result=CalcPayOnce(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang, zinvEducation, jiashutuixiu,
					jiashulifeque, dangqianfuzhai, weilaiOneOut, shouxianJin, liudongZichan, touzixingZichan,
					jinjibeiyong, jinjibeiyong, lifeFeiRatio, baoxianjinRatio);
			break;
	}
	//return result;
}
		
//---------------------公用部分-----------------------------------------
/**
 * 年收入倍数法
 * 保障需求 = 目前年收入 * 倍数
 * 保障不足额 = 保障需求 – 已备保障
 */
function CalcLoanPay(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang)
{
	//声明倍数变量
	var beishu=0;
	var needEnsure = 0;//保障需求
	var ensureInsufficient = 0;//保障不足额
	//倍数根据不同年龄，倍数不同	0-19 16, 20-29 14, 30-39 12, 40-49 10, 50-59 8, 60-- 6
	if(age >= 0 && age <= 19) {
		beishu = 16;
	} else if (age >= 20 && age <= 29) {
		beishu = 14;
	} else if (age >= 30 && age <= 39) {
		beishu = 12;
	} else if (age >= 40 && age <= 49) {
		beishu = 10;
	} else if (age >= 50 && age <= 59) {
		beishu = 8;
	} else if (age >= 60) {
		beishu = 6;
	}
	needEnsure = yearIncome*beishu;
	ensureInsufficient = needEnsure-yiyoubaozhang;
	document.getElementById("needEnsure").value = Math.round(needEnsure*100)/100;
	document.getElementById("ensureInsufficient").value = Math.round(ensureInsufficient*100)/100;
	
}
	
/**
 * 生命价值法
 * inv = (1+touzihuibaoRatio*0.01)的ageLimit次幂
 * inc = (1+incomeAddRatio*0.01)的ageLimit次幂
 * forY = (1+tonghuopengzhangRatio*0.01)的ageLimit次幂
 * evry = (yearIncome*inc-yearOut*forY)/inv
 * 保障需求 = evry从1到ageLimit求和
 * 保障不足额 = 保障需求 – 已备保障
 */
function ECorpus(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang, tonghuopengzhangRatio, incomeAddRatio,
		touzihuibaoRatio)
{debugger;
	//投资年限：退休年龄-目前年龄
	var ageLimit = tuixiuAge-age;
	var ensureInsufficient = "";//保障不足额
	var inc = new Number(1);
	var forY= new Number(1);
	var inv = new Number(1);
	var investRet = (1+touzihuibaoRatio);
	var incGrowRate = (1+incomeAddRatio); 
	var forYDepreforst = (1+tonghuopengzhangRatio);
	var evrySum = new Number(0);
	var evry = new Number(0);
	for(var i=1;i<=ageLimit;i++){
		inv = Math.pow(investRet,i);
		inc = Math.pow(incGrowRate,i);
		forY = Math.pow(forYDepreforst,i);
		evry = (yearIncome*inc-yearOut*forY)/inv;
		evrySum += evry;
	}
	document.getElementById("needEnsure").value = Math.round(evrySum*100)/100;
	ensureInsufficient = evrySum - yiyoubaozhang;
	document.getElementById("ensureInsufficient").value = Math.round(ensureInsufficient*100)/100;
}

/**
 * 家属需要法
 */
function CalcPayOnce(age, tuixiuAge, yearIncome, yearOut, yiyoubaozhang, zinvEducation, jiashutuixiu,
		jiashulifeque, dangqianfuzhai, weilaiOneOut, shouxianJin, liudongZichan, touzixingZichan,
		jinjibeiyong, jinjibeiyong, lifeFeiRatio, baoxianjinRatio)
{
	var fLiveNeed = yearOut-yearIncome;//家属生活费用年缺口L
	var urgentReserve = 3*yearOut/12;//紧急备用金G
	var reaAssFairVal = (touzixingZichan+liudongZichan-shouxianJin);//可变现公允价值P
	var dvalage = tuixiuAge-age;//离退休年限 
	var realityReturnRate = (1+baoxianjinRatio)/(1+lifeFeiRatio)-1;//保险金实际报酬率
	
	var Pv1 = Math.pow(1+realityReturnRate,dvalage);
	var fLiveCashVal = jiashulifeque*dvalage/Pv1;
	
	var needEnsure = zinvEducation+fLiveCashVal+urgentReserve+dangqianfuzhai+jiashutuixiu+weilaiOneOut-reaAssFairVal;
	var ensureInsufficient = needEnsure-yiyoubaozhang;
	
	document.getElementById("jiashulifexian").value = Math.round(fLiveCashVal*100)/100;
	document.getElementById("kebianxian").value = Math.round(reaAssFairVal*100)/100;
	document.getElementById("needEnsure").value = Math.round(needEnsure*100)/100;
	document.getElementById("ensureInsufficient").value = Math.round(ensureInsufficient*100)/100;
	
}
			
