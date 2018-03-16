package com.xywztech.bcrm.custmanager.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklog;
import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklogWDetail;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
@Service
public class WeekWorkService extends CommonService{
	public WeekWorkService(){
		   JPABaseDAO<OcrmFWpWorklogWDetail, Long>  baseDAO=new JPABaseDAO<OcrmFWpWorklogWDetail, Long>(OcrmFWpWorklogWDetail.class);  
		   super.setBaseDAO(baseDAO);
	   }
	/**
	 * 保存主表信息
	 * @param weekLogDate
	 * @return
	 */
	public Object saveWorkLog(String createDateNews,String weekLogDate) {	
		OcrmFWpWorklog ocrmFWpWorklog=new OcrmFWpWorklog();
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
        String unitName = auth.getUnitName();
        Date date = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
        	date = df.parse(createDateNews);
        } catch (java.text.ParseException e) {
        	e.printStackTrace();
        }
		ocrmFWpWorklog.setCreateDate(date);       			//录入日期
		ocrmFWpWorklog.setOrgId(currenOrgId);				//客户经理所在机构ID
		ocrmFWpWorklog.setOrgName(unitName);				//客户经理所在机构名称	
		ocrmFWpWorklog.setUserId(currenUserId);				//客户经理ID
		ocrmFWpWorklog.setUserName(auth.getUsername());		//客户经理名称
		ocrmFWpWorklog.setWorklogDate(weekLogDate);			//工作周期
		ocrmFWpWorklog.setWorklogStat("0");					//工作日志状态
		ocrmFWpWorklog.setWorklogType("W");					//周期类型
		return super.save(ocrmFWpWorklog);
	}
	
	/**
	 * 保存周记录信息
	 * @param workLogId  主表ID                                                                                                  
	 * @param plan   工作计划     
	 * @param execute 完成情况
	 * @param workOrder 类别
	 * @param id   从表ID 
	 * @param workLogDates  主表周期
	 */
	public void saveWeekLogDetail(String workLogId,String plan ,String execute ,String workOrder,String id,
			String workLogDates,String createDateNews) {
		OcrmFWpWorklogWDetail ocrmFWpWorklogWDetail=new OcrmFWpWorklogWDetail();
		//如果主表中存在ID
		if (null != workLogId && !workLogId.equals("") && this.getWorkLogDate(workLogId)==1){
			this.updatOrSaveWDetail(id, plan, execute, workOrder,workLogId, ocrmFWpWorklogWDetail);
		}else{
//			this.saveWorkLog(createDateNews,workLogDates);
			this.updatOrSaveWDetail(id, plan, execute, workOrder, getPrimaryKey()+"",ocrmFWpWorklogWDetail);
		}
	} 
	
	/**
	 * 更新或者保存周记录信息
	 * @param id
	 * @param plan
	 * @param execute
	 * @param workOrder
	 * @param workLogId
	 * @param ocrmFWpWorklogWDetail
	 */
	public void updatOrSaveWDetail (String id,String plan,String execute,String workOrder,
			String workLogId,OcrmFWpWorklogWDetail ocrmFWpWorklogWDetail){
		//如果周工作记录表中的ID为空，则新增一条记录
		if (null == id || id.equals("")) {
			ocrmFWpWorklogWDetail.setWorkPlan(plan);
			ocrmFWpWorklogWDetail.setWorkExecute(execute);
			ocrmFWpWorklogWDetail.setWorkOrder(workOrder);
			ocrmFWpWorklogWDetail.setWorkType(workOrder);
			if (null != workLogId && !workLogId.equals("")) {
				ocrmFWpWorklogWDetail.setWorklogId(Long.parseLong(workLogId));
			} else {
				ocrmFWpWorklogWDetail.setWorklogId(getPrimaryKey());
			}
			em.persist(ocrmFWpWorklogWDetail);
		}else {
   			String jql = " update OcrmFWpWorklogWDetail  set "
					+ " workPlan = '"	+ plan		+ "',"
					+ " workExecute = '" + execute  + "'" 
					+ "  where id = "	+ id;
   			Query query = em.createQuery(jql.toString()); 
   			query.executeUpdate();
		}
	}
	
	/**
	 * 获取工作记录主表最大的ID值
	 * @return ID
	 */
	@SuppressWarnings("unchecked")
	public Long getPrimaryKey() {
		String JQL = " select max(w.id) from OcrmFWpWorklog w ";
		Query query = em.createQuery(JQL);
		List<Long> list = query.getResultList();
		if (list.get(0).equals("")) {
			return 1l;
		} else {
			return list.get(0);	
		}
	}
	
	/**
	 * 获取主表ID
	 * @param workLogId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int getWorkLogDate(String workLogId) {
		String JQL = "select count(c) from OcrmFWpWorklog c where 1>0 and c.id='"+workLogId+"'";
		Query query = em.createQuery(JQL);
		List list = query.getResultList();
		return Integer.parseInt(list.get(0)+"");
	}
}


