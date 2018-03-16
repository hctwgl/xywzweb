/***
 * 功能描述：贵金属产品
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,
	generatedCount = 0;

/**
 * 保留num的v位小数
 * @param num
 * @param v
 * @returns
 */
function decimal(num,v){
	if(num == ''){
		return '-';
	}else{
		num = parseFloat(num);
		return num.toFixed(v);
	}	
}

function loadData(id) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url : basePath+'goldProductQueryAction.json?id='+id,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResult = response.json.data[0];
			
var sql = "select PRODUCT_NAME,PIC_ADDR from OCRM_F_PD_PICLIB_MAINTENANCE where ISSUCSYNC=1 and STATUS=1 and TYPE=1 and PRODUCT_ID ='"+aResult.PROD_NO+"' ";
			query(crmApp,sql,function(res){

				var data = res.rows;			
				var li1  = '<div class="cpxqPic"><img src="'+data.item(0).PIC_ADDR+'"/></div>'
							;
				   $("#goldPrdDtlList_pic").append($(li1));
				
		});
			
			
			var li  = '<div class="fmList"><span>产品中文简称：</span>'+aResult.CN_NAME+'</div>'
					+'<div class="fmList"><span>是否可销售：</span>'+aResult.VAL_ID_YN_ORA+'</div>'
					+'<div class="fmList"><span>销售地区：</span>'+aResult.SELL_AREA+'</div>'
					+'<div class="fmList"><span>销售起始日：</span>'+aResult.STD_DT+'</div>'
					+'<div class="fmList"><span>销售终止日：</span>'+aResult.END_DT+'</div>'
					+'<div class="fmList"><span>产品价格：</span>'+decimal((aResult.PROD_PRICE),4)+'</div>'
					+'<div class="fmList"><span>规格：</span>'+aResult.SPECIFICATIONS+'</div>'
					+'<div class="fmList"><span>材质：</span>'+aResult.MATERIAL_+'</div>'
					+'<div class="fmList"><span>成色：</span>'+aResult.ROLEX+'</div>'
					+'<div class="fmList"><span>供应商：</span>'+aResult.SUPPLIER+'</div>'
					+'<div class="fmList"><span>产品特点：</span>'+aResult.PROD_GOLD_DES+'</div>'
					;
		   $("#goldPrdDtlList").append($(li));
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

