package com.xywz.logi.service;



import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.logi.model.XywzLogiDelvMerchd;
import com.xywz.logi.model.XywzLogiDelvMerchdHis;
import com.xywz.ware.model.XywzWareInvtyOut;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 银行管理Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzLogiDelvMerchdService extends CommonService {
   
	public XywzLogiDelvMerchdService(){
		JPABaseDAO<XywzLogiDelvMerchd, Long>  baseDAO = new JPABaseDAO<XywzLogiDelvMerchd, Long>();  
		super.setBaseDAO(baseDAO);
	}
	
	//仓库出库
	public void distriWare(String outId,String sendSheetAdvsId,String gdsSrc,String cnt,String remZhi,String weight,String prdId,String materials,String totalZhiCnt){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		XywzWareInvtyOut xywzWareInvtyOut=em.find(XywzWareInvtyOut.class, Long.parseLong(outId));
		System.out.print("prdId::"+prdId);
		//System.out.print(zhi);
		//BigDecimal mid_cnt=BigDecimal.valueOf(Double.parseDouble(cnt));
		//BigDecimal live_cnt=xywzWareInvtyOut.getJianCnt();
		/*需要根据您出库ID号-outId找出出运商品表的ID，根据ID是否存在来决定新增或者更新*/
		XywzLogiDelvMerchd xywzLogiDelvMerchd;
		List<XywzLogiDelvMerchd> list = loadId(prdId,sendSheetAdvsId);
		System.out.print("aaaaaaaaaaaaaaaaaaaa:::::::"+list.size());
		
		if ( list.size() == 0 ){
			xywzLogiDelvMerchd = new XywzLogiDelvMerchd();
			xywzLogiDelvMerchd.setQty(BigDecimal.valueOf(Double.parseDouble(cnt)));//件数
			xywzLogiDelvMerchd.setRemZhiCnt(BigDecimal.valueOf(Double.parseDouble(remZhi)));
			System.out.println("weight::::::::"+weight);
			xywzLogiDelvMerchd.setWeight(BigDecimal.valueOf(Double.parseDouble(weight)));
			Date date = new Date();
			DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss");
			String insertDt=format.format(date);
			xywzLogiDelvMerchd.setModifyDt(insertDt);
			xywzLogiDelvMerchd.setZhiCnt(BigDecimal.valueOf(Double.valueOf(xywzWareInvtyOut.getZhiCnt().toString())));
		}else {
			String id=list.get(0).getId().toString();
			System.out.print("bbbbbbbbbbbbbb:::::::"+id);
			insertHistoryMerchd(id);
			xywzLogiDelvMerchd=em.find(XywzLogiDelvMerchd.class,Long.parseLong(id));
			/*计算新增之前产品的总支数*/
			Double befTotalZhi=Double.valueOf(xywzLogiDelvMerchd.getZhiCnt().toString())*Double.valueOf(xywzLogiDelvMerchd.getQty().toString())+Double.valueOf(xywzLogiDelvMerchd.getRemZhiCnt().toString());
			//Double totalZhi=0;
//			Double cnt1 = Double.valueOf(xywzLogiDelvMerchd.getQty().toString());
			Double allZhi=befTotalZhi+Double.valueOf(totalZhiCnt);
			Double zhiOfJian=Double.valueOf(xywzLogiDelvMerchd.getZhiCnt().toString()); //每件支数			
			Double cnt2 = Math.floor(allZhi/zhiOfJian);
			xywzLogiDelvMerchd.setQty(BigDecimal.valueOf(cnt2));
			Double remZhiCnt=allZhi%zhiOfJian;
			xywzLogiDelvMerchd.setRemZhiCnt(BigDecimal.valueOf(remZhiCnt));
			Double cnt7 = Double.valueOf(xywzLogiDelvMerchd.getWeight().toString());
			Double cnt8 = Double.valueOf(weight);
			Double cnt9 = cnt7+cnt8;
			Date date = new Date();
			DateFormat format1=new SimpleDateFormat("yyyyMMddHHmmss");
			String modifyDt=format1.format(date);
			//xywzLogiDelvMerchd.setModifyDt(insertDt);
			xywzLogiDelvMerchd.setModifyDt(modifyDt);
			xywzLogiDelvMerchd.setWeight(BigDecimal.valueOf(cnt9));
			xywzLogiDelvMerchd.setZhiCnt(xywzLogiDelvMerchd.getZhiCnt());
		}
		BigDecimal weig=xywzWareInvtyOut.getWeight();
		///System.out.println("weigcuizggggg::::"+weig);
		if (weig == null){
			weig=BigDecimal.valueOf(0);
		}
		System.out.print("weigqwq:::::::::::::::::"+weig);
		System.out.print("weightqwqw:::::::::::::::::"+weight);
		Double all_weight=Double.valueOf(weig.toString()); //总重量
		Double rem_weight=all_weight-Double.valueOf(weight);
		System.out.print("rem_weight:::::::::::::::::"+rem_weight);
		xywzWareInvtyOut.setWeight(BigDecimal.valueOf(rem_weight));
		Double mid_cnt = Double.parseDouble(cnt);
		BigInteger jian=xywzWareInvtyOut.getJianCnt();
		if (jian == null){
			jian=BigInteger.valueOf(0);
		}
		
		Double l_cnt = Double.parseDouble(jian.toString());
		Double final_cnt = l_cnt - mid_cnt;  //剩余的库存
		String left_cnt = final_cnt.toString().split("\\.")[0];
		System.out.print("left_cnt::::::::::::qqqqqqqqqqqqqqqqq::::->"+left_cnt);
		
		BigInteger finall = new BigInteger(left_cnt);		
		xywzWareInvtyOut.setJianCnt(finall);
		BigInteger zhi = new BigInteger(remZhi.toString().split("\\.")[0]); //Double.parseDouble(remZhi);
		BigInteger re_zhi = xywzWareInvtyOut.getRemZhiCnt();
		if(re_zhi == null){
			re_zhi=BigInteger.valueOf(0);
		}
		System.out.print("re_zhi::::::::::::1111233333333333::::->"+re_zhi);
	    //re_zhi=new BigInteger(re_zhi.toString()); //BigDecimal.valueOf(Double.valueOf(re_zhi.toString()));
	    BigInteger re_lft_zhi = re_zhi.subtract(zhi);
	    System.out.print("re_lft_zhi::::::::::::qqq12333333333333333qq::::->"+re_lft_zhi);
		xywzWareInvtyOut.setRemZhiCnt(re_lft_zhi);
		//向出库表中插入数据
		
		xywzLogiDelvMerchd.setGdsSrc(gdsSrc);
		xywzLogiDelvMerchd.setMaterials(materials);
		xywzLogiDelvMerchd.setLen(xywzWareInvtyOut.getLen());
		xywzLogiDelvMerchd.setNgtvPoor(xywzWareInvtyOut.getNgtvPoor());        //负差
		xywzLogiDelvMerchd.setOutId(xywzWareInvtyOut.getOutId().toString());   
		xywzLogiDelvMerchd.setHsCode(xywzWareInvtyOut.getPrdName());//品名
		xywzLogiDelvMerchd.setSpcModel(xywzWareInvtyOut.getSpcModel());//规格型号
		xywzLogiDelvMerchd.setGdsLength(xywzWareInvtyOut.getLen());//长度
		xywzLogiDelvMerchd.setCustId((xywzWareInvtyOut.getOutCustId()));
		xywzLogiDelvMerchd.setContrNum(xywzWareInvtyOut.getContrNum());
		xywzLogiDelvMerchd.setSendSheetAdvsNum(sendSheetAdvsId);//发运通知ID
		super.save(xywzLogiDelvMerchd);
		super.save(xywzWareInvtyOut);
		
	}

	public void addWare(String outId,String jianCnt,String remZhi,String weight1,String totalZhi1){
		String [] outid =outId.split(",");
		String [] cnt=jianCnt.split(",");
		String [] rem=remZhi.split(",");
		String [] weights=weight1.split(",");
		String [] totalZhi = totalZhi1.split(",");
		System.out.print("weight1:::::::::::::qqqqq::"+weight1);
		for ( int i=0;i<outid.length; i++ ){
			XywzWareInvtyOut xywzWareInvtyOut=em.find(XywzWareInvtyOut.class, Long.parseLong(outid[i]));
			Double zhiCnt=Double.valueOf(xywzWareInvtyOut.getZhiCnt().toString());
			double addJian=Math.floor(Double.valueOf(totalZhi[i])/zhiCnt);
			Double remZhi1=Double.valueOf(totalZhi[i])%zhiCnt;
			Double jian=Double.valueOf(xywzWareInvtyOut.getJianCnt().toString())+Double.valueOf(addJian);
			Double remCnt=Double.valueOf(xywzWareInvtyOut.getRemZhiCnt().toString())+Double.valueOf(remZhi1);
			Double weight=Double.valueOf(xywzWareInvtyOut.getWeight().toString())+Double.valueOf(weights[i]);
			xywzWareInvtyOut.setWeight(BigDecimal.valueOf(weight));
//			xywzWareInvtyOut.setJianCnt(BigDecimal.valueOf(jian));
//			xywzWareInvtyOut.setRemZhiCnt(BigDecimal.valueOf(remCnt));
			BigInteger adJian=new BigInteger(jian.toString().split("\\.")[0]);
			xywzWareInvtyOut.setJianCnt(adJian);
			BigInteger rmCnt = new BigInteger(remCnt.toString().split("\\.")[0]);
			xywzWareInvtyOut.setRemZhiCnt(rmCnt);
			super.save(xywzWareInvtyOut);
		}
		
	}
	
	private List<XywzLogiDelvMerchd> loadId(String prdId,String sendSheetAdvsId) {
		Map<String,Object> values = new HashMap<String,Object>();
		String searchJQL = "select a from XywzLogiDelvMerchd a where a.insupdMod is null " +
				"and CONCAT(a.hsCode,a.spcModel,a.ngtvPoor,a.len,a.outId,a.gdsSrc)='"+prdId+"' "+"and a.sendSheetAdvsNum='"+sendSheetAdvsId+"'" ;
		List<XywzLogiDelvMerchd> invList = baseDAO.findWithNameParm(searchJQL, values);
		return invList;		
	}
	
	public void insertDelvMerchd(String id,Double jianCnt, Double remCnt, Double zhiCnt1 ){
		/*修改包装 --每件支数 将修改之前的数据保存到历史表中*/
		insertMerBefore(id,"MODIFY");
		XywzLogiDelvMerchd xywzLogiDelvMerchdIst = em.find(XywzLogiDelvMerchd.class,Long.parseLong(id));	
		xywzLogiDelvMerchdIst.setQty(BigDecimal.valueOf(jianCnt));		
		xywzLogiDelvMerchdIst.setZhiCnt(BigDecimal.valueOf(zhiCnt1));
		xywzLogiDelvMerchdIst.setRemZhiCnt(BigDecimal.valueOf(remCnt));
		DateFormat format2=new SimpleDateFormat("yyyyMMddHHmmss");
		Date date2 = new Date();
		String lastModifyTime2=format2.format(date2);
		xywzLogiDelvMerchdIst.setModifyDt(lastModifyTime2);
		super.save(xywzLogiDelvMerchdIst);
	}
	
	public void insertHistoryMerchd(String id){
		XywzLogiDelvMerchd xywzLogiDelvMerchd;
		XywzLogiDelvMerchdHis  xywzLogiDelvMerchdUpd = new XywzLogiDelvMerchdHis();
		xywzLogiDelvMerchd=em.find(XywzLogiDelvMerchd.class,Long.parseLong(id));
		xywzLogiDelvMerchdUpd.setGdsSrc(xywzLogiDelvMerchd.getGdsSrc());
		xywzLogiDelvMerchdUpd.setHsCode(xywzLogiDelvMerchd.getHsCode());
		xywzLogiDelvMerchdUpd.setMaterials(xywzLogiDelvMerchd.getMaterials());
		xywzLogiDelvMerchdUpd.setSpcModel(xywzLogiDelvMerchd.getSpcModel());
		xywzLogiDelvMerchdUpd.setQty(xywzLogiDelvMerchd.getQty());
		xywzLogiDelvMerchdUpd.setGdsLength(xywzLogiDelvMerchd.getGdsLength());
		xywzLogiDelvMerchdUpd.setSendSheetAdvsNum(xywzLogiDelvMerchd.getSendSheetAdvsNum());
		xywzLogiDelvMerchdUpd.setCustId(xywzLogiDelvMerchd.getCustId());
		xywzLogiDelvMerchdUpd.setWeight(xywzLogiDelvMerchd.getWeight());
		xywzLogiDelvMerchdUpd.setContrNum(xywzLogiDelvMerchd.getContrNum());
		xywzLogiDelvMerchdUpd.setZhiCnt(xywzLogiDelvMerchd.getZhiCnt());
		xywzLogiDelvMerchdUpd.setOutId(xywzLogiDelvMerchd.getOutId());
		xywzLogiDelvMerchdUpd.setRemZhiCnt(xywzLogiDelvMerchd.getRemZhiCnt());
		xywzLogiDelvMerchdUpd.setNgtvPoor(xywzLogiDelvMerchd.getNgtvPoor());
		xywzLogiDelvMerchdUpd.setLen(xywzLogiDelvMerchd.getLen());
		DateFormat format4=new SimpleDateFormat("yyyyMMddHHmmss");
		xywzLogiDelvMerchdUpd.setInsupdMod("INSERT");
		Date date4 = new Date();
		String lastModifyTime4=format4.format(date4);
		xywzLogiDelvMerchdUpd.setModifyDt(lastModifyTime4);
		super.save(xywzLogiDelvMerchdUpd);
		
	}
	public void insertDelMer(String idStr){
		String[] ids = idStr.split(",");
		System.out.print("idStr测试测试：：：：：：：：："+idStr);
		
		for (int i=0;i<ids.length;i++){
			System.out.print("idStr测试测试：：：：：：：：："+ids[i]);
			insertMerBefore(ids[i],"DELETE");
		}
	}
	
	public void insertMerBefore(String id,String mode){
		XywzLogiDelvMerchdHis xywzLogiDelvMerchdIst = new XywzLogiDelvMerchdHis();
		XywzLogiDelvMerchd xywzLogiDelvMerchd ;
		xywzLogiDelvMerchd=em.find(XywzLogiDelvMerchd.class,Long.parseLong(id));	
		
		xywzLogiDelvMerchdIst.setInsupdMod(mode);
		xywzLogiDelvMerchdIst.setGdsSrc(xywzLogiDelvMerchd.getGdsSrc());
		xywzLogiDelvMerchdIst.setHsCode(xywzLogiDelvMerchd.getHsCode());
		xywzLogiDelvMerchdIst.setMaterials(xywzLogiDelvMerchd.getMaterials());
		xywzLogiDelvMerchdIst.setSpcModel(xywzLogiDelvMerchd.getSpcModel());
		xywzLogiDelvMerchdIst.setQty(xywzLogiDelvMerchd.getQty());
		xywzLogiDelvMerchdIst.setGdsLength(xywzLogiDelvMerchd.getGdsLength());
		xywzLogiDelvMerchdIst.setSendSheetAdvsNum(xywzLogiDelvMerchd.getSendSheetAdvsNum());
		xywzLogiDelvMerchdIst.setCustId(xywzLogiDelvMerchd.getCustId());
		xywzLogiDelvMerchdIst.setWeight(xywzLogiDelvMerchd.getWeight());
		xywzLogiDelvMerchdIst.setContrNum(xywzLogiDelvMerchd.getContrNum());
		xywzLogiDelvMerchdIst.setZhiCnt(xywzLogiDelvMerchd.getZhiCnt());
		xywzLogiDelvMerchdIst.setOutId(xywzLogiDelvMerchd.getOutId());
		xywzLogiDelvMerchdIst.setRemZhiCnt(xywzLogiDelvMerchd.getRemZhiCnt());
		xywzLogiDelvMerchdIst.setNgtvPoor(xywzLogiDelvMerchd.getNgtvPoor());
		xywzLogiDelvMerchdIst.setLen(xywzLogiDelvMerchd.getLen());
		DateFormat format2=new SimpleDateFormat("yyyyMMddHHmmss");

		Date date = new Date();
		Date date2 = new Date();
		String lastModifyTime2=format2.format(date2);
		xywzLogiDelvMerchdIst.setModifyDt(lastModifyTime2);
		xywzLogiDelvMerchdIst.setInsertDt(date);
		super.save(xywzLogiDelvMerchdIst);
	}
	

}


