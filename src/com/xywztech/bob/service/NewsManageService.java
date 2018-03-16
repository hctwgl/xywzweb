package com.xywztech.bob.service;


import java.io.File;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xywztech.bcrm.workplat.model.WorkingplatformInfo;
import com.xywztech.bob.model.WorkingplatformAnnexe;
import com.xywztech.bob.upload.FileTypeConstance;
import com.xywztech.bob.vo.AuthUser;

@Service
@Transactional(value="postgreTransactionManager")
public class NewsManageService{
	
	private EntityManager em;	
	
	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	// 查询账户类型列表
	@SuppressWarnings("unchecked")
	public List<WorkingplatformInfo> findAll() {
		Query query = getEntityManager().createQuery("select wi FROM WorkingplatformInfo wi");
        return query.getResultList();
	}

	// 根据ID是否为空进行新增或者修改账户类型
	public void save(WorkingplatformInfo workingplatformInfo) {
		
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();				
		Long ID = workingplatformInfo.getMessageId();
		String messageType = "1";
		String publishUser = auth.getUsername();
		String publishOrg = auth.getUnitId();
		Date publishDate = new Date();
		
		workingplatformInfo.setMessageType(messageType);
		workingplatformInfo.setPublishUser(publishUser);
		workingplatformInfo.setPublishOrg(publishOrg);
		workingplatformInfo.setPublishDate(publishDate);
		
		if (ID == null) {
			//新增
			workingplatformInfo.setMessageType(messageType);
			workingplatformInfo.setPublishUser(publishUser);
			workingplatformInfo.setPublishOrg(publishOrg);
			workingplatformInfo.setPublishDate(publishDate);
			em.persist(workingplatformInfo);
		} else {
			//修改
			em.merge(workingplatformInfo);
		}
	}

	// 删除账户类型
    public void remove(long id) {
    	WorkingplatformInfo workingplatformInfo = find(id);
        	if (workingplatformInfo != null) {
            em.remove(workingplatformInfo);
		}
    }
    
	//批量删除账户类型
	@SuppressWarnings("unchecked")
	public void batchRemove(String idStr) {
		String filePath = FileTypeConstance.getUploadPath();
		String realPath ="";
		String sql = "";
		File file = null;
		String[] strarray = idStr.split(",");
		for (int i = 0; i < strarray.length; i++) {
			long id = Long.parseLong(strarray[i]);
			WorkingplatformAnnexe wpi = new WorkingplatformAnnexe();
			WorkingplatformInfo workingplatformInfo = find(id);
			wpi.setRelationInfo(id+"");
			sql = "select wf FROM WorkingplatformAnnexe wf where wf.relationInfo = "+wpi.getRelationInfo()+" and wf.relationMod = 'infomation'";
			List<WorkingplatformAnnexe> rsList = getEntityManager().createQuery(sql).getResultList();
			for(WorkingplatformAnnexe wpf : rsList){
				realPath = filePath+"/"+wpf.getPhysicalAddress();
				file = new File(realPath);
				if(realPath.length()>filePath.length()){
						file.delete();
				}
				em.remove(wpf);
			}
			
			if (workingplatformInfo != null) {
				em.remove(workingplatformInfo);
			}
		}
	}
    
	private EntityManager getEntityManager() {
		return em;
	}

	public  WorkingplatformInfo find(long id) {
		return em.find( WorkingplatformInfo.class, id);
	}

}
