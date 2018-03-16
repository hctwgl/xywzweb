package com.xywz.plan.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.xywz.plan.model.XywzPlanPrdcPlanAdvsSngl;
import com.xywz.sale.model.XywzSaleInlandMerchdDtl;
import com.xywz.sale.model.XywzSaleInvMerchdDtl;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 生产计划通知单Service
 * @author 
 * @since 2012-10-08 
 */
@Service
@Transactional(value="postgreTransactionManager")
public class XywzPlanPrdcPlanAdvsSnglService extends CommonService {
   
	public XywzPlanPrdcPlanAdvsSnglService(){
		JPABaseDAO<XywzPlanPrdcPlanAdvsSngl, Long>  baseDAO = new JPABaseDAO<XywzPlanPrdcPlanAdvsSngl, Long>(XywzPlanPrdcPlanAdvsSngl.class);  
		super.setBaseDAO(baseDAO);
	}
	
	public void updateInfo(Object model){
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = (XywzPlanPrdcPlanAdvsSngl)model;
		XywzPlanPrdcPlanAdvsSngl newSngl = em.find(XywzPlanPrdcPlanAdvsSngl.class, xywzPlanPrdcPlanAdvsSngl.getPlanId());		
		
		BigInteger sumZhi = newSngl.getSumZhi();
		BigInteger zhiCnt = xywzPlanPrdcPlanAdvsSngl.getZhiCnt();
		BigInteger jianCnt = sumZhi.divide(zhiCnt);
		BigInteger remZhiCnt = sumZhi.remainder(zhiCnt);
		newSngl.setZhiCnt(zhiCnt);
		newSngl.setJianCnt(jianCnt);
		newSngl.setRemZhiCnt(remZhiCnt);
		newSngl.setMemo(xywzPlanPrdcPlanAdvsSngl.getMemo());
		newSngl.setDenst(xywzPlanPrdcPlanAdvsSngl.getDenst());
		 super.save(newSngl);
	}
	
	//外贸
	public XywzSaleInvMerchdDtl findXywzSaleInvMerchdDtl(long id) {
		return em.find(XywzSaleInvMerchdDtl.class, id);
	}
	//内贸
	public XywzSaleInlandMerchdDtl findXywzSaleInlandMerchdDtl(long id) {
		return em.find(XywzSaleInlandMerchdDtl.class, id);
	}
	
	//任务单
	public XywzPlanPrdcPlanAdvsSngl findXywzPlanPrdcPlanAdvsSngl(long id) {
		return em.find(XywzPlanPrdcPlanAdvsSngl.class, id);
	}
	
	//更改计划通知单的状态
	public void saveTaskNew(String id,String type,String weight,String zhiCnt,String jianCnt,String remZhiCnt,String sumZhi,String planNum,String toleance){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = new XywzPlanPrdcPlanAdvsSngl(); 
		//外贸
		if(type.equals("0")){
			XywzSaleInvMerchdDtl xywzSaleInvMerchdDtl=findXywzSaleInvMerchdDtl(Long.parseLong(id));
			xywzPlanPrdcPlanAdvsSngl.setContrNum(xywzSaleInvMerchdDtl.getContrNum());//合同
			xywzPlanPrdcPlanAdvsSngl.setMerchdType("0");//商品类型
			xywzPlanPrdcPlanAdvsSngl.setChannalType("1");//渠道类型
			xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzSaleInvMerchdDtl.getHsCode());//品名
			xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzSaleInvMerchdDtl.getModel());//规格型号
			xywzPlanPrdcPlanAdvsSngl.setWeightTolerance(toleance); //重量负差
			xywzPlanPrdcPlanAdvsSngl.setLengthTolerance(xywzSaleInvMerchdDtl.getLengthTolerance()); //长度负差
			xywzPlanPrdcPlanAdvsSngl.setDepthTolerance(xywzSaleInvMerchdDtl.getDepthTolerance()); //厚度负差
			xywzPlanPrdcPlanAdvsSngl.setMaterials(xywzSaleInvMerchdDtl.getMaterials());//材质
			xywzPlanPrdcPlanAdvsSngl.setLen(xywzSaleInvMerchdDtl.getLen());//长度
			xywzPlanPrdcPlanAdvsSngl.setPlanNum(planNum);
			System.out.println("zhiCnt:::"+zhiCnt);
			System.out.println("jianCnt:::"+jianCnt);
			System.out.println("remZhiCnt:::"+remZhiCnt);
			System.out.println("sumZhi:::"+sumZhi);
			System.out.println("weight:::"+weight);
			if (zhiCnt == null || zhiCnt.equals("")){
				zhiCnt="0";
			}
			
			if (jianCnt == null || jianCnt.equals("")){
				jianCnt="0";
			}
			
			if (remZhiCnt == null || remZhiCnt.equals("")){
				remZhiCnt="0";
			}
			
			if (sumZhi == null || sumZhi.equals("")){
				sumZhi="0";
			}
			
			xywzPlanPrdcPlanAdvsSngl.setZhiCnt(new BigInteger(zhiCnt));//支/件
			xywzPlanPrdcPlanAdvsSngl.setJianCnt(new BigInteger(jianCnt));//件
			xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(new BigInteger(remZhiCnt));//零支
			xywzPlanPrdcPlanAdvsSngl.setSumZhi(new BigInteger(sumZhi));//总支数
			xywzPlanPrdcPlanAdvsSngl.setWeight(new BigDecimal(weight));//重量
			
		}else if(type.equals("1")){//内贸
			XywzSaleInlandMerchdDtl xywzSaleInlandMerchdDtl=findXywzSaleInlandMerchdDtl(Long.parseLong(id));
			xywzPlanPrdcPlanAdvsSngl.setContrNum(xywzSaleInlandMerchdDtl.getInlandOrdrNum());
			xywzPlanPrdcPlanAdvsSngl.setMerchdType("1");//商品类型
			xywzPlanPrdcPlanAdvsSngl.setChannalType("1");//渠道类型
			xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzSaleInlandMerchdDtl.getHsCode());//品名
			xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzSaleInlandMerchdDtl.getSpcModel());//规格型号
			xywzPlanPrdcPlanAdvsSngl.setMaterials(xywzSaleInlandMerchdDtl.getMaterials());//材质
			xywzPlanPrdcPlanAdvsSngl.setLen(xywzSaleInlandMerchdDtl.getLen());//长度
			xywzPlanPrdcPlanAdvsSngl.setPlanNum(planNum); //生产计划编号
			if (zhiCnt == null || zhiCnt.equals("")){
				zhiCnt="0";
			}
			
			if (jianCnt == null || jianCnt.equals("")){
				jianCnt="0";
			}
			
			if (remZhiCnt == null || remZhiCnt.equals("")){
				remZhiCnt="0";
			}
			
			if (sumZhi == null || sumZhi.equals("")){
				sumZhi="0";
			}
			xywzPlanPrdcPlanAdvsSngl.setZhiCnt(new BigInteger(zhiCnt));//支/件
			xywzPlanPrdcPlanAdvsSngl.setJianCnt(new BigInteger(jianCnt));//件
			xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(new BigInteger(remZhiCnt));//零支
			xywzPlanPrdcPlanAdvsSngl.setSumZhi(new BigInteger(sumZhi));//总支数
			xywzPlanPrdcPlanAdvsSngl.setWeight(new BigDecimal(weight));//重量
			xywzPlanPrdcPlanAdvsSngl.setWeightTolerance(toleance);
		}
//		xywzPlanPrdcPlanAdvsSngl.setWorkshop(workshop);//车间
		xywzPlanPrdcPlanAdvsSngl.setMerchdId(Long.parseLong(id));//商品ID
		xywzPlanPrdcPlanAdvsSngl.setIssuesDt(new Date());//下达日期
		xywzPlanPrdcPlanAdvsSngl.setIssuesUserid(auth.getUserId());//下达人
		xywzPlanPrdcPlanAdvsSngl.setIssuesUsername(auth.getUsername());//下达人名称
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("0");
		
		
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
		
	}
	
	//更改计划通知单的状态
	public void saveTask(String id,String type,String workshop){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = new XywzPlanPrdcPlanAdvsSngl(); 
		//外贸
		if(type.equals("0")){
			XywzSaleInvMerchdDtl xywzSaleInvMerchdDtl=findXywzSaleInvMerchdDtl(Long.parseLong(id));
			xywzPlanPrdcPlanAdvsSngl.setContrNum(xywzSaleInvMerchdDtl.getContrNum());//合同
			xywzPlanPrdcPlanAdvsSngl.setMerchdType("0");//商品类型
			xywzPlanPrdcPlanAdvsSngl.setChannalType("1");//渠道类型
			xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzSaleInvMerchdDtl.getHsCode());//品名
			xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzSaleInvMerchdDtl.getModel());//规格型号
			xywzPlanPrdcPlanAdvsSngl.setMaterials(xywzSaleInvMerchdDtl.getMaterials());//材质
//			xywzPlanPrdcPlanAdvsSngl.setTolerance(xywzSaleInvMerchdDtl.getWeightTolerance());//
//			xywzPlanPrdcPlanAdvsSngl.setDenst("");//密度
			xywzPlanPrdcPlanAdvsSngl.setLen(xywzSaleInvMerchdDtl.getLen());//长度
//			xywzPlanPrdcPlanAdvsSngl.setZhiCnt(zhiCnt);//支/件
//			xywzPlanPrdcPlanAdvsSngl.setJianCnt(jianCnt);//件
//			xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(remZhiCnt);//零支
			xywzPlanPrdcPlanAdvsSngl.setWeight(xywzSaleInvMerchdDtl.getQty());//重量
			
		}else if(type.equals("1")){//内贸
			XywzSaleInlandMerchdDtl xywzSaleInlandMerchdDtl=findXywzSaleInlandMerchdDtl(Long.parseLong(id));
			xywzPlanPrdcPlanAdvsSngl.setContrNum(xywzSaleInlandMerchdDtl.getInlandOrdrNum());
			xywzPlanPrdcPlanAdvsSngl.setMerchdType("1");//商品类型
			xywzPlanPrdcPlanAdvsSngl.setChannalType("1");//渠道类型
			xywzPlanPrdcPlanAdvsSngl.setPrdName(xywzSaleInlandMerchdDtl.getHsCode());//品名
			xywzPlanPrdcPlanAdvsSngl.setSpcModel(xywzSaleInlandMerchdDtl.getSpcModel());//规格型号
			xywzPlanPrdcPlanAdvsSngl.setMaterials(xywzSaleInlandMerchdDtl.getMaterials());//材质
//			xywzPlanPrdcPlanAdvsSngl.setDenst(denst);//密度
			xywzPlanPrdcPlanAdvsSngl.setLen(xywzSaleInlandMerchdDtl.getLen());//长度
//			xywzPlanPrdcPlanAdvsSngl.setZhiCnt(zhiCnt);//支/件
//			xywzPlanPrdcPlanAdvsSngl.setJianCnt(jianCnt);//件
//			xywzPlanPrdcPlanAdvsSngl.setRemZhiCnt(remZhiCnt);//零支
			xywzPlanPrdcPlanAdvsSngl.setWeight(xywzSaleInlandMerchdDtl.getQty());//重量
			
		}
		xywzPlanPrdcPlanAdvsSngl.setWorkshop(workshop);//车间
		xywzPlanPrdcPlanAdvsSngl.setMerchdId(Long.parseLong(id));//商品ID
		xywzPlanPrdcPlanAdvsSngl.setIssuesDt(new Date());//下达日期
		xywzPlanPrdcPlanAdvsSngl.setIssuesUserid(auth.getUserId());//下达人
		xywzPlanPrdcPlanAdvsSngl.setIssuesUsername(auth.getUsername());//下达人名称
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("0");
		
		
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
		
	}
	
	//排产
	public void giveScheduling(String id,String scheduNum){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = findXywzPlanPrdcPlanAdvsSngl(Long.parseLong(id)); 		
		xywzPlanPrdcPlanAdvsSngl.setScheduNum(scheduNum);//排产单据号
		xywzPlanPrdcPlanAdvsSngl.setScheduDate(new Date());
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("1");//排产状态设置为1已排产
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
		
	}
	//提交质检
	public void submitQuality(String id){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = findXywzPlanPrdcPlanAdvsSngl(Long.parseLong(id)); 		
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("2");//排产状态设置为1待质检
		super.save(xywzPlanPrdcPlanAdvsSngl);
		
		
	}
}


