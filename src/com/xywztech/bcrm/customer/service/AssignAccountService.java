package com.xywztech.bcrm.customer.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.xywztech.bcrm.customer.model.OcrmFCiAccBelong;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;

@Service
public class AssignAccountService extends CommonService{
	
	private JPABaseDAO<OcrmFCiAccBelong, Long> baseDao;

	@SuppressWarnings("unchecked")
	public AssignAccountService(){
		this.baseDao = new JPABaseDAO(OcrmFCiAccBelong.class);
		super.setBaseDAO(this.baseDao);
	}
	public void save( JSONArray jarray){
		if (jarray.size() > 0){
			for (int i = 0; i < jarray.size(); ++i){
				JSONObject wa = (JSONObject)jarray.get(i);
				String t = (String)wa.get("id");
				if(!t.equals("")){
					OcrmFCiAccBelong wm = em.find(OcrmFCiAccBelong.class,Long.valueOf(t));
					if(wm!=null){
						BigDecimal bd = new BigDecimal(String.valueOf(wa.get("contributeRate")));
						wm.setMgrId((String)wa.get("mgrId"));
						wm.setMgrCode((String)wa.get("mgrCode"));
						wm.setMgrName((String)wa.get("mgrName"));
						wm.setContributeRate(bd);
						wm.setAssignUser((String)wa.get("assignUser"));
						wm.setAssignDate(new Date());
						wm.setOrgCode((String)wa.get("orgCode"));
		        		this.em.merge(wm);    
						
					}
				}else{
					OcrmFCiAccBelong ws = new OcrmFCiAccBelong();
					BigDecimal bd = new BigDecimal(String.valueOf(wa.get("contributeRate")));
					ws.setMgrId((String)wa.get("mgrId"));
					ws.setMgrCode((String)wa.get("mgrCode"));
					ws.setMgrName((String)wa.get("mgrName"));
					ws.setAccount((String)wa.get("account"));
					ws.setContributeRate(bd);
					ws.setAssignUser((String)wa.get("assignUser"));
					ws.setAssignDate(new Date());
					ws.setOrgCode((String)wa.get("orgCode"));
					ws.setCustId((String)wa.get("custId"));
					ws.setCustName((String)wa.get("custName"));
					this.em.persist(ws);

				}
			
        }
	}	
}


  public void remove(String idStr)
  {
    String[] strarray = idStr.split(",");
    for (int i = 0; i < strarray.length; ++i) {
      int tid = Integer.parseInt(strarray[i]);
      OcrmFCiAccBelong ws2 = this.em.find(OcrmFCiAccBelong.class,Long.valueOf(tid));
        if (ws2 != null){
        this.em.remove(ws2);}
      }
     
    }
  

  public OcrmFCiAccBelong find(String id)
  {
    return (this.em.find(OcrmFCiAccBelong.class, id));
  }

  @Override
public List<OcrmFCiAccBelong> findAll()
  {
    String wsFindAll = "select ws from OcrmFCiAccBelong ws";
    Query wsQuery = this.em.createQuery(wsFindAll);
    return wsQuery.getResultList();
  }
}