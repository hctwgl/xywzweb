package com.xywztech.bcrm.custmanager.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xywztech.bcrm.custmanager.model.OcrmFWpWorklog;
import com.xywztech.bcrm.model.OcrmFWpWorklogMDetail;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;

/**
 * 月工作记录管理service
 * @author lixb
 * @serial 2012-11-16
 */
@Service
public class MonthWorkService extends CommonService{
	public MonthWorkService(){
		   JPABaseDAO<OcrmFWpWorklogMDetail, Long>  baseDAO=new JPABaseDAO<OcrmFWpWorklogMDetail, Long>(OcrmFWpWorklogMDetail.class);  
		   super.setBaseDAO(baseDAO);
	   }
	/**
	 * 保存主表信息
	 * @param weekTy
	 * @return
	 */
	public Object saveWorkLog(String weekTy,String workDate) {	
		OcrmFWpWorklog ocrmFWpWorklog=new OcrmFWpWorklog();
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String currenUserId = auth.getUserId();
        String currenOrgId = auth.getUnitId();
        String unitName = auth.getUnitName();
        Date date = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
			date = df.parse(workDate);
		} catch (ParseException e) {
			e.printStackTrace();
		} 
		ocrmFWpWorklog.setCreateDate(date);					//录入日期
		ocrmFWpWorklog.setOrgId(currenOrgId);				//客户经理所在机构ID
		ocrmFWpWorklog.setOrgName(unitName);				//客户经理所在机构名称	
		ocrmFWpWorklog.setUserId(currenUserId);				//客户经理ID
		ocrmFWpWorklog.setUserName(auth.getUsername());		//客户经理名称
		ocrmFWpWorklog.setWorklogDate(weekTy);				//工作周期
		ocrmFWpWorklog.setWorklogStat("0");					//工作日志状态
		ocrmFWpWorklog.setWorklogType("W");					//周期类型
		return super.save(ocrmFWpWorklog);
	}
	
	/**
	 * 没有写完，待续了额……
	 * @param mainIdshow  主表ID
	 * @param jarray1     从表月ID
	 * @param jarray2  关联主表外键
	 * @param jarray3  类型
	 * @param jarray4  项目（中文）
	 * @param jarray5  序号
	 * @param jarray6  月工作计划
	 * @param jarray7  实际完成情况
	 */
	public void batchSave(String mainIdshow,JSONArray jarray1,JSONArray jarray2,JSONArray jarray3,
			JSONArray jarray4,JSONArray jarray5,JSONArray jarray6,JSONArray jarray7) {
//		//如果主表ID为空时，则执行新增一条主表的记录	
//		if (null == mainIdshow || mainIdshow.equals("")) {
//			******未写***********
//		}else{
//			
//		}
		   	for (int i = 0; i < jarray3.size(); i++) {
		   		OcrmFWpWorklogMDetail ocrmFWpWorklogMDetail=new OcrmFWpWorklogMDetail();
		   		String workId = jarray1.get(i).toString();		//从表月ID
		   		String workLogId = jarray2.get(i).toString();		//关联主表外键
		   		String workType = jarray3.get(i).toString(); 	//类型
		   		String work = jarray4.get(i).toString(); 	//项目（中文）
		   		String workOrder = jarray5.get(i).toString(); 	//序号
		   		String workPlan = jarray6.get(i).toString(); 	//月工作计划
		   		String workExecute = jarray7.get(i).toString(); 	//实际完成情况
		   		
//		   		//如果获取的ID为空值则执行新增操作，否则执行更新操作
//		   		if (null == workId || workId.equals("")) {
//		   			if (this.getWorkLogDate(weekTy)==0) {
//				   		this.saveWorkLog(weekTy,workDate);
//				   	}
		   		ocrmFWpWorklogMDetail.setWork(work);
		   		ocrmFWpWorklogMDetail.setWorkExecute(workExecute);
		   		ocrmFWpWorklogMDetail.setWorkOrder(i);
		   		ocrmFWpWorklogMDetail.setWorkPlan(workPlan);
					if (null == workId || workId.equals("")) {//新增
						ocrmFWpWorklogMDetail.setWorklogId(getPrimaryKey()-1);
					}
					else
					{
//						ocrmFWpWorklogMDetail.setWorklogId(Long.parseLong(id.get(0).toString())-1);
					}
		   			
		   			super.save(ocrmFWpWorklogMDetail);
		   		} 
//		   	else {
//		   			String jql = " update OcrmFWpWorklogMDetail  set "
//		   						+ " workType = '"+workType 			+ "',"
//		   						+ " workPlan = '" + workPlan 		+ "',"
//		   						+ " workExecute = '" + workExecute  + "'," 
//		   						+ " workOrder = '" + workType 		+ "'"
//		   						+ "  where id = " + id.get(i);
//		   		Query query = em.createQuery(jql.toString()); 
//		   		query.executeUpdate();
		   	}
//	}
	
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
			return list.get(0)+1;	
		}
	}
	
	@SuppressWarnings("unchecked")
	public int getWorkLogDate(String workLogDate) {
		String JQL = "select count(c) from OcrmFWpWorklog c where 1>0 and c.worklogDate='"+workLogDate+"'";
		Query query = em.createQuery(JQL);
		List list = query.getResultList();
		return Integer.parseInt(list.get(0)+"");
	}
}


