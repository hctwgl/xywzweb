var goBack = function(){
	mobileUtils.goPage("riskAssessment.html");
};

var cancelRisk = function(){
	mobileUtils.goPage("riskAssessment.html");
}; 

var saveRisk = function(){
	alert(1);
	var _c= $(window.frames["resetRiskframe"].document).find("#signatureCanvas");
	alert(_c);
//	var image = new Image(); 
//	image.src = _c[0].toDataURL("image/png"); 
//	alert(image.src);
	
//	$.ui.popup( {
//	   title:"评估详情",
//	   message:"您的得分：21分<br/>评测风险等级为：稳健性<br/>评估时间：2015-01-13<br/>有效期：2015-07-13",
//	   cancelText:"确定",
//	   cancelCallback: function(){
//	   	mobileUtils.goPage("riskAssessment.html");
//	   },
//	   doneText:"确定",
//	   doneCallback: function(){
//	   mobileUtils.goPage("riskAssessment.html");
//		},
//    cancelOnly:true
    });
};