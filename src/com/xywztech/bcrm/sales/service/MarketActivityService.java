package com.xywztech.bcrm.sales.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.action.JDBCQueryDefindAction;
import com.xywztech.bcrm.sales.model.OcrmFMkMktActivity;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
@Transactional(value="postgreTransactionManager")
public class MarketActivityService extends CommonService{

	   public MarketActivityService(){
		   JPABaseDAO<OcrmFMkMktActivity, Long>  baseDAO=new JPABaseDAO<OcrmFMkMktActivity, Long>(OcrmFMkMktActivity.class);  
		   super.setBaseDAO(baseDAO);
	   }	

//	// 查询营销活动列表
//	@SuppressWarnings("unchecked")
//	public List<OcrmFMkMktActivity> findAll() {
//		Query query = getEntityManager().createQuery(
//				"select ma FROM OcrmFMkMktActivity ma");
//		return query.getResultList();
//	}

//	// 根据mktActiId是否为空进行新增或者修改活动
//	public void save(OcrmFMkMktActivity ocrmfmkmktactivity) {
//		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();
//        Date date = new Date(); 
//        //MarketPlan marketPlan = marketPlanService.find(OcrmFMkMktActivity.getPlanId());
//        //OcrmFMkMktActivity.setPlanName(marketPlan.getPlanName());
//        ocrmfmkmktactivity.setUpdateUser(currenUserId);
//        ocrmfmkmktactivity.setUpdateDate(date);
//		if (ocrmfmkmktactivity.getMktActiId() == null) {
//			// 新增
////			ocrmfmkmktactivity.setApproveStat("1");
//			ocrmfmkmktactivity.setCreateUser(currenUserId);
//			ocrmfmkmktactivity.setCreateDate(date);
//			em.persist(ocrmfmkmktactivity);
//		} else {
//			// 修改
//			em.merge(ocrmfmkmktactivity);
//		}
//	}

//	//批量删除营销活动
//	public void batchRemove(String idStr) {
//		String[] strarray = idStr.split(",");
//		for (int i = 0; i < strarray.length; i++) {
//			long id = Long.parseLong(strarray[i]);
//			OcrmFMkMktActivity marketActivityService = find(id);
//			if (marketActivityService != null) {
//				em.remove(marketActivityService);
//			}
//		}
//	}
	
	// 删除营销活动
//	public void remove(long id) {
//		OcrmFMkMktActivity ocrmfmkmktactivity = find(id);
//		if (ocrmfmkmktactivity != null) {
//			em.remove(ocrmfmkmktactivity);
//		}
//	}

//	//关闭营销活动
//    public void closeActivity(OcrmFMkMktActivity ocrmfmkmktactivity)
//    {
//    	if (ocrmfmkmktactivity.getMktActiId() != null)
//    	{
//    		
//    	Date currDate = new Date();	
//    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();	
//        
//    	//设置为关闭状态
////        ocrmfmkmktactivity.setActiStatus("3");
//    	//设置关闭日期
////        ocrmfmkmktactivity.setActivityEndDate(currDate);
//    	
//        ocrmfmkmktactivity.setUpdateDate(currDate);
//        ocrmfmkmktactivity.setUpdateUser(currenUserId);
//    	em.merge(ocrmfmkmktactivity);
//    	}
//    }
//    
    //执行营销活动
    public void saveActivity(String idStr,String sign)
    {
    	//查询是否关联了目标客户
    	JDBCQueryDefindAction jdbcq = new JDBCQueryDefindAction();
    	jdbcq.create(idStr);
    	//END
    	
    	String[] strarray = idStr.split(",");
	for (int i = 0; i < strarray.length; i++) {
		long id = Long.parseLong(strarray[i]);
		OcrmFMkMktActivity ocrmfmkmktactivity = em.find(OcrmFMkMktActivity.class,id );
		if("close".equals(sign)){
				ocrmfmkmktactivity.setMktActiStat("4");	
				ocrmfmkmktactivity.setAendDate(new Date());
		}else{
			if("execute".equals(sign)){
				//更新关联客户表，将进展阶段更新为1：执行中
				String jql = "update OcrmFMkActiCustomer p set p.progressStep = '1' where p.mktActiId ='"+BigDecimal.valueOf(ocrmfmkmktactivity.getMktActiId())+"' ";
		    	Map<String,Object> values = new HashMap<String,Object>();
        		batchUpdateByName(jql, values);
        		//更新营销活动基本信息，更新营销活动状态为 3:执行中
				ocrmfmkmktactivity.setMktActiStat("3");
				ocrmfmkmktactivity.setAstartDate(new Date());
			}
		}
	
		em.merge(ocrmfmkmktactivity);
	}
}

    
    //审批通过营销活动
//    public void saveApprovePass(OcrmFMkMktActivity ocrmfmkmktactivity)
//    {
//    	if (ocrmfmkmktactivity.getMktActiId() != null)
//    	{
//    		
//    	Date currDate = new Date();	
//    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();	
//        
//    	//设置为执行中状态
////        ocrmfmkmktactivity.setActiStatus("2");
////        ocrmfmkmktactivity.setApproveStat("3");
//    	//设置执行日期
////        ocrmfmkmktactivity.setActivityStartDate(currDate);
//    	
//        ocrmfmkmktactivity.setUpdateDate(currDate);
//        ocrmfmkmktactivity.setUpdateUser(currenUserId);
//    	em.merge(ocrmfmkmktactivity);
//    	}
//    }
    
//    //审批未通过营销活动
//    public void saveApproveNotPass(OcrmFMkMktActivity ocrmfmkmktactivity)
//    {
//    	if (ocrmfmkmktactivity.getMktActiId() != null)
//    	{
//    		
//    	Date currDate = new Date();	
//    	AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String currenUserId = auth.getUserId();	
//        
//    	//设置为执行中状态
//       // ocrmfmkmktactivity.setActiStatus("2");
////        ocrmfmkmktactivity.setApproveStat("4");
//    	//设置执行日期
////        ocrmfmkmktactivity.setActivityStartDate(currDate);
//    	
//        ocrmfmkmktactivity.setUpdateDate(currDate);
//        ocrmfmkmktactivity.setUpdateUser(currenUserId);
//    	em.merge(ocrmfmkmktactivity);
//    	}
//    }

//	public OcrmFMkMktActivity find(long id) {
//		return em.find(OcrmFMkMktActivity.class, id);
//	}

}
