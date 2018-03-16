/***
 * 功能描述：行内资讯
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,opt={},tName,titleName,riskOption,riskOptions,generatedCount = 0;

/**
 *查询客户签约状态（100300），如果未签约，评估终止，提示客户未评估。
查询风险问卷试题（100372），客户答完以后提交。
计算评估结果接口（100353），把此次评估结果展示给客户。
修改客户风险等级接口（100010），把此次评估结果修改为最新有效的风险等级。
 */


function nextJiaoyan(docName,url2,url3,url4) {
		var i = 0;
		var titleNum = docName.substr(7);//得到第几题
		opt[titleNum] = '';
		var obj = document.getElementsByName(docName);
		for (i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				opt[titleNum] = obj[i].id.substr(obj[i].id.length-1);//得到选项
				tName = $("#titleId"+titleNum).text().split(".")[1];//不要题号，只要题目的内容
				riskOption = $("#label"+titleNum+opt[titleNum]).text();
				if(titleNum == 1){
					titleName = tName;
					riskOptions = riskOption;
				}else{
					titleName = titleName+"~"+tName;
					riskOptions = riskOptions+"~"+riskOption;
				}
				break;
			}
		}
		if (i == obj.length && titleNum != "12") {
			mesUtil.alert('请选择本题再选择下一题');
			return false;
		}
		if(titleNum == "12"){//最后一题，签完名之后，提交时
			var optStr = '';
			for(var j=1;j<=11;j++){
				if(j != 11){
					optStr += opt[j] + ',';
				}else{
					optStr += opt[j];
				}
			}
			
			$.ajax({
				type : "GET",
				url : url2+'&answerStr='+optStr,
				cache: false, 
				dataType: 'json',
				async: false,
				success : function(resp){
					if(resp.errorNo=="AAAAAAA"){
						
						var lscore = resp.lastScore*1;
						var riskLev = resp.riskLevel;
						if(riskLev =="1"){
							riskLev = '保守型';
						}else if(riskLev =="2"){
							riskLev = '谨慎型';
						}else if(riskLev =="3"){
							riskLev = '稳健型';
						}else if(riskLev =="4"){
							riskLev = '进取型';
						}else if(riskLev =="5"){
							riskLev = '激进型';
						}
						
						
						$.ajax({
							type : "GET",
							url : url3+'&riskLevel='+resp.riskLevel,
							cache: false, 
							dataType: 'json',
							async: false,
							success : function(resp){
								if(resp.errorNo == 'AAAAAAA'){
									var clientName = resp.custName;
									var riskDate = resp.riskDate;
									var _c= $(window.frames["resetRiskframe"].document).find("#signatureCanvas");
									var dataURL = _c[0].toDataURL();
								
									$.ajax({
										type : "POST",
										url : url4,
										cache: false, 
										async: false,
										data: {"titleName":titleName,"riskOptions":riskOptions,"clientName":clientName,"lastScore":lscore,"riskLev":riskLev,"riskDate":riskDate,"qianming":dataURL},
										dataType : "json",
										success : function(resp){
											
											mesUtil.alert('您的分数：'+lscore+',您的等级:'+riskLev);
										},
										error:function(){
											mesUtil.alert('保存评估过程失败!');
										}
									});
								}else{
									mesUtil.alert('保存风险等级接口出现异常，异常信息：'+resp.errorInfo);
								}
								
							},
							error:function(){
								mesUtil.alert('保存风险等级失败!');
							}
							
						});
						
					}else{
						mesUtil.alert('计算风险等级异常!');
					}
					
				},
				error:function(){
					mesUtil.alert('评估失败!');
				}
			});
			
		}
		
}
function loadData(id,coreId,queuenum,searchUrl,url1,url2,url3,url4) {
	var li={};
	

	$.ajax({//查询题目
		type : "GET",
		url : url1,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(res){
			for(var i=0;i<res.count;i++ ){
				var subject = res.data[i];
				var titleName = subject.titleName;
				var answer = subject.titleIdL;
				var titleId = subject.titleId;
				//拼接试题
				li[i] = '';
				li[i] += '<a name="'+i+'"></a>'
				+'	<div class="top">'
				+'		<p class="logo">'
				+'			<img src="../../themes/hbbank/images/logo_top.png" />'
				+'		</p>'
				
				+'		<div class="zDh">'
				+'			<p class="zDhLeft">'
				+'				<a href="#" name="backBtn"><img src="../../themes/hbbank/images/fanhui.png" /></a><span>风险评估</span>'
				+'			</p>'
			
				+'			<div class="zDhRight">'
				+'				<a href="#" name="goHomeBtn"><img src="../../themes/hbbank/images/zhuye.png" /></a> '
//				+'				<a href="#"><img src="../../themes/hbbank/images/gerenzhongxin.png" /></a>'
				+'			</div>'
			
				+'		</div>'
				+'	</div>'
				+'	<div class="topLine">'
				+'		<img src="../../themes/hbbank/images/zhanwei.png" width="100%" height="2" />'
				+'	</div>'
				
				+'	<div class="botm bxBox" id="botm'+titleId+'">'
				+ '<div class="qutBox" id="option'+titleId+'">'
				+ '<h1>风险评估</h1>'
				+ '	<div class="qutTitle" id="titleId'+titleId+'">'+titleId+'.'+titleName+'</div>'
				+ '	<div class="qutContent">';
				
				//拼接选项
				for(var j=0;j<answer.length;j++){
					li[i] +=  '		<div class="qutList">'
						+ '			<input type="radio" name="optionA'+titleId+'" id="optionA'+titleId+answer[j].riskOption+'" /><label id="label'+titleId+answer[j].riskOption+'" for="optionA'+titleId+answer[j].riskOption+'">'+answer[j].subject+'</label>'
						+ '		</div>'
						;
				}
				if(i == 0){	
					li[i] += '	</div>'
						+ '<div class="btBox">'
						+ '<a href="#'+(i*1+1)+'" onclick="return nextJiaoyan(\'optionA'+titleId+'\',\''+url2+'\',\''+url3+'\',\''+url4+'\')"><input value="下一题" type="button" /></a>'
						+ '</div>'
						+ '<div class="pageNub">'+titleId+'/'+res.count+'</div>'
						+ '</div>'
						+ '</div>'
						;
				}else if(i == res.count -1){
					li[i] += '	</div>'
						+ '<div class="btBox">'
						+ '<a href="#'+(i*1-1)+'"><input value="上一题" type="button"></input></a>'
						+ '<a href="#'+(i*1+1)+'" onclick="return nextJiaoyan(\'optionA'+titleId+'\',\''+url2+'\',\''+url3+'\',\''+url4+'\')"><input value="签名" type="button" /></a>'
						+ '</div>'
						+ '<div class="pageNub">'+titleId+'/'+res.count+'</div>'
						+ '</div>'
						+ '</div>'
						;
				}else{
					li[i] += '	</div>'
						+ '<div class="btBox">'
						+ '<a href="#'+(i*1-1)+'"><input value="上一题" type="button"></input></a>'
						+ '<a href="#'+(i*1+1)+'" onclick="return nextJiaoyan(\'optionA'+titleId+'\',\''+url2+'\',\''+url3+'\',\''+url4+'\')"><input value="下一题" type="button" /></a>'
						+ '</div>'
						+ '<div class="pageNub">'+titleId+'/'+res.count+'</div>'
						+ '</div>'
						+ '</div>'
						;
				}
				$("#content1").append($(li[i]));
				
			}
			
			//电子签名
			li[res.count] = '';
			li[res.count] += '<a name="'+res.count+'"></a>'
			+'<div class="top">'
			+'<p class="logo">'
			+'<img src="../../themes/hbbank/images/logo_top.png" />'
			+'</p>'
			+'<div class="zDh">'
			+'<p class="zDhLeft">'
			+'<a href="#" name="backBtn"><img src="../../themes/hbbank/images/fanhui.png" /></a><span>风险评估</span>'
			+'</p>'
			+'<div class="zDhRight">'
			+'<a href="#" name="goHomeBtn"><img src="../../themes/hbbank/images/zhuye.png" /></a>'
//			+'<a href="#"><img src="../../themes/hbbank/images/gerenzhongxin.png" /></a>'
			+'</div>'
			+'</div>'
			+'</div>'
			+'<div class="topLine">'
			+'<img src="../../themes/hbbank/images/zhanwei.png" width="100%" height="2" />'
			+'</div>'
			+'<div class="botm bxBox" id="botm">'
			+'<div class="qutBox" id="qutBox">'
			+'<h1>风险评估</h1>'
			+'<div class="qutContent">'
			+'<div class="pbCon">'
			+'<div class="radlcTitle" style="line-height: 50px;">请在这里签名：</div>'
			+'<iframe style="height:220px;width:80%" id="resetRiskframe" name="resetRiskframe" src="signature.html"></iframe>'
			+'</div>'
			+'</div>'
			+'<div class="btBox">'
			+'<a href="#'+(res.count*1-1)+'"><input value="上一题" type="button"></input></a>'
			+'<input id="clearId" type="button" value="清除"/>'
			+'<a href="#" onclick="return nextJiaoyan(\'optionA12\',\''+url2+'\',\''+url3+'\',\''+url4+'\')"><input value="提交" type="button" /></a>'
			+'</div>'
			+'</div>'
			+'</div>';

			debugger;
			$("#content1").append($(li[res.count]));
		},
		error:function(){
			mesUtil.alert('评估失败!');
		}
	});

	
    var clear = document.getElementById("clearId");  
    clear.addEventListener("click", function() {  
    	var _c= $(window.frames["resetRiskframe"].document).find("#signatureCanvas");
    	var context=_c[0].getContext('2d');
    	context.clearRect(0,0,_c.width(),_c.height());
    });  
	
	$("a[name='backBtn']").each(function (){
		$(this).bind('click', function(){
			goPage('keHuXinXi.html?id='+id+'&coreId='+coreId+'&queuenum='+queuenum);
		});
	});
	$("a[name='goHomeBtn']").each(function (){
		$(this).bind('click', function(){
			goPage('../../index.html');
		});
	});
	
	
}

