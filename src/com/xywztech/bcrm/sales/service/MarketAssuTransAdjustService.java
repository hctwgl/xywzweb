package com.xywztech.bcrm.sales.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bob.vo.AuthUser;

/**
 * @描述：营销任务下达和调整功能Service
 * @author wzy
 * @date:2013-05-07
 */
@Service
@Transactional(value = "postgreTransactionManager")
public class MarketAssuTransAdjustService {

	private EntityManager em;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	public void assuTrans(AuthUser auth, String cbid) {
		JSONObject jsonObject = null;
		JSONArray jsonArray = null;
		if (cbid == null || "".equals(cbid)) {
			return;
		}
		jsonObject = JSONObject.fromObject(cbid);
		jsonArray = jsonObject.getJSONArray("id");
		if (jsonArray != null && jsonArray.size() > 0) {
			for (int i = 0; i < jsonArray.size(); i++) {
				this.doAssuTransById(auth, jsonArray.get(i));
			}
		}
	}

	private void doAssuTransById(AuthUser auth, Object taskId) {
		StringBuffer sql = null;
		if (taskId == null || "".equals(taskId)) {
			return;
		}
		sql = new StringBuffer("");
		sql.append("update ocrm_f_mm_task t");
		sql.append("   set t.task_dist_date = sysdate,");// 下达时间：系统当前时间
		sql.append("       t.task_stat      = '2',");// 营销任务状态，2：执行中
		sql.append("       t.dist_user      = '" + auth.getUserId() + "',");// 下达人ID
		sql.append("       t.dist_org       = '" + auth.getUnitId() + "',");// 下达机构ID
		sql.append("       t.dist_user_name = '" + auth.getUsername() + "',");// 下达人名称
		sql.append("       t.dist_org_name  = '" + auth.getUnitName() + "'");// 下达机构名称
		sql.append(" where t.task_id in");
		sql.append("       (select a.task_id");
		sql.append("          from ocrm_f_mm_task a");
		sql.append("         start with a.task_id = " + taskId);
		sql.append("        connect by prior a.task_id = a.task_parent_id)");
		em.createNativeQuery(sql.toString()).executeUpdate();
	}
}
